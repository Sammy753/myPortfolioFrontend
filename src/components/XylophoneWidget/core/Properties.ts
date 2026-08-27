import { EffectComposer } from "postprocessing"
import { Vector2, WebGLRenderer } from "three"
import { QUALITY } from "./XylophoneConfig"

/**
 * Shared render state and the uniform objects every material reads by reference.
 *
 * A static singleton, same as the original: there is exactly one renderer, one clock
 * and one composer per widget. This means only one `XylophoneWidget` can be mounted
 * at a time on a page — mounting a second one while the first is still alive will
 * stomp on this state. Always `destroy()` one instance before mounting another.
 */
export class Properties {
  static viewportWidth = 0
  static viewportHeight = 0
  static dpr = Math.min(QUALITY.maxDpr, window.devicePixelRatio || 1)
  static reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

  static gl?: WebGLRenderer
  static composer = new EffectComposer()

  // clock
  static time = 0
  static deltaTime = 0

  // shared by reference into materials — assigning `.value` updates every consumer
  static globalUniforms = {
    u_time: { value: 0 },
    u_deltaTime: { value: 0 },
    u_resolution: { value: new Vector2() }
  }

  /** Resets per-instance state so a fresh mount doesn't inherit a disposed composer. */
  static reset() {
    this.gl = undefined
    this.composer = new EffectComposer()
    this.time = 0
    this.deltaTime = 0
  }
}
