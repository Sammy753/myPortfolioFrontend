import { MathUtils, Vector2 } from "three"
import { normalizeWheelY } from "./normalizeWheel"

const MAX_SCROLL_PER_EVENT = 200 // one violent wheel notch shouldn't jump the whole helix
const DRAG_AXIS_LOCK_PX = 8 // travel before a touch drag commits to an axis
const DRAG_SCALE = 3

/**
 * Pointer + wheel state, scoped to the widget's own container element rather than
 * the whole document/window — this is what makes the widget safe to embed inline
 * in an arbitrary page instead of owning the full viewport.
 *
 * Deltas accumulate across every event in a frame and are cleared in `postUpdate()`,
 * so a consumer reading `deltaScrollY` sees the whole frame's scroll regardless of how
 * many events fired.
 */
export class Input {
  /** NDC, -1..1 — raycasting */
  static mouseXY = new Vector2()
  /** 0..1 from the bottom-left — fluid splats */
  static mouseScreenXY = new Vector2()
  /** scroll pixels this frame, from the wheel or a vertical touch drag */
  static deltaScrollY = 0
  /** false until the first pointer event over the container */
  static hasPointer = false
  /** whether hovering the widget captures wheel/touch-drag to scroll the helix */
  static captureScroll = true
  /** When true, the page's own scroll position drives the conveyor instead of hover+wheel. */
  static pageScrollMode = false
  private static lastPageScrollY = 0

  private static el: HTMLElement | null = null

  // touch drag — `wheel` never fires for touch, so a vertical drag drives the same scroll
  private static dragStartXY = new Vector2()
  private static dragPrevY = 0
  private static dragAxis: "none" | "x" | "y" = "none"

  /* -------------------------------- handlers -------------------------------- */
  private static readonly onPointerMove = (e: PointerEvent) => this.onMove(e)
  private static readonly onPointerLeave = () => {
    this.hasPointer = false
  }
  private static readonly onWheel = (e: WheelEvent) => {
    if (!this.captureScroll) return
    e.preventDefault()
    this.deltaScrollY += MathUtils.clamp(normalizeWheelY(e), -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT)
  }

  private static readonly onPageScroll = () => {
    const y = window.scrollY
    const delta = y - this.lastPageScrollY
    this.lastPageScrollY = y
    this.deltaScrollY += MathUtils.clamp(delta, -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT)
  }

  private static readonly onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return

    this.dragStartXY.set(touch.clientX, touch.clientY)
    this.dragPrevY = touch.clientY
    this.dragAxis = "none"
    this.onMove(touch)
  }

  private static readonly onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0] ?? e.changedTouches[0]
    if (this.captureScroll && !this.pageScrollMode) this.updateDrag(touch)

    this.onMove(touch)
    if (this.captureScroll) this.updateDrag(touch)
  }

  private static readonly onTouchEnd = () => {
    this.dragAxis = "none"
  }

  /* --------------------------------- public --------------------------------- */
  static init(container: HTMLElement, captureScroll = true, pageScrollMode = false) {
  this.el = container
  this.captureScroll = captureScroll
  this.pageScrollMode = pageScrollMode

  container.addEventListener("pointermove", this.onPointerMove, { passive: true })
  container.addEventListener("pointerleave", this.onPointerLeave, { passive: true })

  if (pageScrollMode) {
    this.lastPageScrollY = window.scrollY
    window.addEventListener("scroll", this.onPageScroll, { passive: true })
  } else {
    container.addEventListener("wheel", this.onWheel, { passive: false })
  }

  container.addEventListener("touchstart", this.onTouchStart, { passive: true })
  container.addEventListener("touchmove", this.onTouchMove, { passive: true })
  container.addEventListener("touchend", this.onTouchEnd, { passive: true })
  container.addEventListener("touchcancel", this.onTouchEnd, { passive: true })
}

  
  /** Clears per-frame deltas. Call after every consumer has read them. */
  static postUpdate() {
    this.deltaScrollY = 0
  }

  static destroy() {
  if (!this.el) return
  this.el.removeEventListener("pointermove", this.onPointerMove)
  this.el.removeEventListener("pointerleave", this.onPointerLeave)
  this.el.removeEventListener("wheel", this.onWheel)
  window.removeEventListener("scroll", this.onPageScroll)
  this.el.removeEventListener("touchstart", this.onTouchStart)
  this.el.removeEventListener("touchmove", this.onTouchMove)
  this.el.removeEventListener("touchend", this.onTouchEnd)
  this.el.removeEventListener("touchcancel", this.onTouchEnd)
  this.el = null
  this.hasPointer = false
}

  /* -------------------------------- internal -------------------------------- */
  private static onMove(e: PointerEvent | Touch) {
    if (!this.el) return
    const rect = this.el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    this.mouseXY.set(x * 2 - 1, 1 - y * 2)
    this.mouseScreenXY.set(x, 1 - y)
    this.hasPointer = true
  }

  /**
   * Axis-locked vertical drag. The first `DRAG_AXIS_LOCK_PX` of travel decide whether the
   * gesture is a scroll or a horizontal sweep across the bars; once locked it stays locked
   * for the rest of the touch, so a diagonal sweep doesn't also spin the helix.
   */
  private static updateDrag(touch: Touch) {
    if (this.dragAxis === "none") {
      const dx = touch.clientX - this.dragStartXY.x
      const dy = touch.clientY - this.dragStartXY.y
      if (Math.hypot(dx, dy) < DRAG_AXIS_LOCK_PX) return

      this.dragAxis = Math.abs(dy) > Math.abs(dx) ? "y" : "x"
      this.dragPrevY = touch.clientY // drop the pre-lock travel so the helix doesn't jump
    }

    if (this.dragAxis !== "y") return

    // dragging up scrolls forward, matching the wheel's sign
    const delta = (this.dragPrevY - touch.clientY) * DRAG_SCALE
    this.deltaScrollY += MathUtils.clamp(delta, -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT)
    this.dragPrevY = touch.clientY
  }
}
