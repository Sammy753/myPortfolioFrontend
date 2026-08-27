import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import type { Group } from "three"
import { XylophoneWidget, type XylophoneWidgetOptions } from "./core/XylophoneWidget"
import "./styles.css"

export interface XylophoneCoilProps extends XylophoneWidgetOptions {
  className?: string
  style?: React.CSSProperties
}

export interface XylophoneCoilHandle {
  /** The bars' Three.js group — pass its .scale (or .position/.rotation) straight into gsap.to(). */
  getGroup: () => Group | null
}

const DEFAULT_STYLE: React.CSSProperties = { width: "100%", height: "100%", minHeight: 360 }

const XylophoneCoil = forwardRef<XylophoneCoilHandle, XylophoneCoilProps>(function XylophoneCoil(
  { className, style, ...options },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<XylophoneWidget | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const widget = new XylophoneWidget(container, options)
    widgetRef.current = widget

    return () => {
      widgetRef.current = null
      widget.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      getGroup: () => widgetRef.current?.getGroup() ?? null
    }),
    []
  )

  return <div ref={containerRef} className={className} style={{ ...DEFAULT_STYLE, ...style }} />
})

export default XylophoneCoil