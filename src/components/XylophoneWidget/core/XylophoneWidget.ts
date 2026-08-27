import { EffectPass, RenderPass, SMAAEffect, SMAAPreset, SSAOEffect } from "postprocessing"
import {
  Color,
  DoubleSide,
  NoToneMapping,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  WebGLRenderer
} from "three"
import glassNormalFrag from "../shaders/xylophone/glassNormalFrag.glsl?raw"
import xylophoneVert from "../shaders/xylophone/xylophoneVert.glsl?raw"
import { FBOHelper } from "./FBOHelper"
import { FluidSim } from "./FluidSim"
import { Xylophone } from "./Xylophone"
import { XylophoneBg } from "./XylophoneBg"
import { FLUID, FROST, QUALITY, SSAO, applyResponsiveXylophoneConfig } from "./XylophoneConfig"
import { FrostBackdropPass } from "./FrostBackdropPass"
import { GlassBufferPass } from "./GlassBufferPass"
import { SoundToggle } from "./SoundToggle"
import { Input } from "./Input"
import { Properties } from "./Properties"
import { RAFCollection } from "./RAFCollection"

const MAX_DELTA = 1 / 20 // clamp long frames (tab restore) so nothing integrates a huge step

export interface XylophoneWidgetOptions {
  /** Muted on mount, before any stored preference / user toggle. Default: false. */
  muted?: boolean
  /** Render the built-in "Sound on/off" button inside the container. Default: true. */
  showSoundToggle?: boolean
  /** Let hovering the widget capture wheel/touch-drag to scroll the bar conveyor. Default: true. */
  captureScroll?: boolean
  /** Drive the conveyor from the page's own scroll instead of hover+wheel. Default false. */
  autoScrollWithPage?: boolean
  /**
   * Controls the panel behind the bars. Default: the original's purple gradient (`'#a391d3'`).
   * - Any CSS color string: recolors the gradient's base tone.
   * - `'transparent'`: removes the background panel entirely and makes the canvas itself
   *   transparent, so the widget sits directly on your page's own background. The bars fall
   *   back to a flat frosted look (no "see-through" transmission) since there's nothing behind
   *   them to refract — the fresnel/iridescent sheen still works normally.
   */
  background?: string
  /** Called once the bar model + audio sample have loaded and the first frame is about to render. */
  onReady?: () => void
}

/**
 * Mounts the interactive glass-bar helix into `container`. One instance owns the
 * module-level render singletons (`Properties`, `Input`, `RAFCollection`) — call
 * `destroy()` before mounting a second instance on the same page.
 */
export class XylophoneWidget {
  private readonly container: HTMLElement
  private readonly gl: WebGLRenderer
  private readonly scene = new Scene()
  private readonly camera: PerspectiveCamera

  // components
  private readonly xylophone = new Xylophone()
  private readonly xylophoneBg = new XylophoneBg()
  private readonly fluid: FluidSim

  // passes — composited in this order
  private readonly frostBackdropPass: FrostBackdropPass
  private readonly renderPass: RenderPass
  private readonly glassBufferPass: GlassBufferPass
  private readonly glassNormalMaterial: ShaderMaterial
  private readonly ssaoEffect: SSAOEffect
  private readonly ssaoPass: EffectPass
  private readonly aaPass: EffectPass

  // ui
  private readonly soundToggle: SoundToggle
  private readonly options: XylophoneWidgetOptions

  // frame
  private size = { width: 0, height: 0 }
  private dateTime = performance.now()
  private isContextLost = false
  private rafId = 0
  private destroyed = false
  private resizeObserver: ResizeObserver

  private readonly boundUpdate = this.update.bind(this)

  /* ---------------------------------- setup --------------------------------- */
  private createRenderer(): WebGLRenderer {
    const transparent = this.options.background === "transparent"

    const gl = new WebGLRenderer({
      alpha: transparent,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false
    })
    gl.outputColorSpace = SRGBColorSpace
    gl.toneMapping = NoToneMapping
    gl.setPixelRatio(Properties.dpr)
    if (transparent) gl.setClearColor(0x000000, 0)

    const canvas = gl.domElement
    canvas.setAttribute("aria-hidden", "true")
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    const blocksNativeScroll = this.options.captureScroll !== false && !(this.options.autoScrollWithPage ?? false)
    canvas.style.touchAction = blocksNativeScroll ? "none" : "auto"
    this.container.appendChild(canvas)

    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault()
      this.isContextLost = true
      console.warn("[XylophoneWidget] WebGL context lost — pausing render")
    })
    canvas.addEventListener("webglcontextrestored", () => {
      this.isContextLost = false
      console.warn("[XylophoneWidget] WebGL context restored — resuming render")
    })

    return gl
  }

  /** One bg render -> Gaussian-blurred backdrop the frosted bars transmit through. */
  private createFrostPass() {
    const pass = new FrostBackdropPass(this.scene, this.camera)
    pass.blurRadius = FROST.strength * FROST.maxBlurPx
    this.xylophone.uniforms.u_tBackdrop.value = pass.blurredTexture

    return pass
  }

  /**
   * View-space normals for SSAO. three's NormalPass can't reproduce our instanced helix pose,
   * so we re-render the bars with the same vertex shader and share the animation uniforms —
   * the buffer then tracks the live pose. Depth comes from the main render pass.
   */
  private createGlassNormalMaterial() {
    const u = this.xylophone.uniforms

    return new ShaderMaterial({
      vertexShader: xylophoneVert,
      fragmentShader: glassNormalFrag,
      side: DoubleSide,
      uniforms: {
        u_time: u.u_time,
        u_spinSpeed: u.u_spinSpeed,
        u_swingScale: u.u_swingScale,
        u_swingAxis: u.u_swingAxis
      }
    })
  }

  /* ---------------------------------- main ---------------------------------- */
  constructor(container: HTMLElement, options: XylophoneWidgetOptions = {}) {
    this.container = container
    this.options = options

    const rect = container.getBoundingClientRect()
    applyResponsiveXylophoneConfig(rect.width)   // add this line

    Properties.reset()

    Properties.viewportWidth = Math.max(1, rect.width)
    Properties.viewportHeight = Math.max(1, rect.height)

    this.gl = this.createRenderer()
    Properties.gl = this.gl
    Properties.composer.setRenderer(this.gl)

    this.camera = new PerspectiveCamera(45, Properties.viewportWidth / Properties.viewportHeight, 0.1, 200)
    this.camera.position.set(0, 0, 5)

    Input.init(container, options.captureScroll ?? true, options.autoScrollWithPage ?? false)
    FBOHelper.init()

    // setup components
    this.scene.add(this.xylophone.group)

    // constructor — replace this.scene.add(this.xylophoneBg.build())
    const transparent = options.background === "transparent"
    if (!transparent) {
      this.scene.add(this.xylophoneBg.build())
      if (options.background) {
        this.xylophoneBg.uniforms.u_color.value = new Color(options.background)
      }
    } else {
      this.xylophone.uniforms.u_transmission.value = 0
    }

    this.fluid = new FluidSim(FLUID)
    this.xylophone.setFluid(this.fluid.uniforms.velocity)

    // setup passes
    // frostBackdrop -> render -> glassBuffer -> ssao -> aa
    this.frostBackdropPass = this.createFrostPass()
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.glassNormalMaterial = this.createGlassNormalMaterial()
    this.glassBufferPass = new GlassBufferPass(
      this.scene,
      this.camera,
      this.glassNormalMaterial,
      QUALITY.glassBufferScale
    )
    this.ssaoEffect = new SSAOEffect(this.camera, this.glassBufferPass.glassTexture, SSAO)
    this.ssaoPass = new EffectPass(this.camera, this.ssaoEffect)
    this.aaPass = new EffectPass(
      this.camera,
      new SMAAEffect({ preset: QUALITY.isMobile ? SMAAPreset.MEDIUM : SMAAPreset.ULTRA })
    )

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      Properties.composer.addPass(pass)
    }

    this.xylophone.setMuted(options.muted ?? false)

    this.soundToggle = new SoundToggle((muted) => this.xylophone.setMuted(muted))
    if (options.showSoundToggle ?? true) {
      this.soundToggle.mount(container)
    }

    // post update
    this.resize()
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)

    // void this.xylophone.load().then(() => options.onReady?.())
    void this.xylophone.load().then(() => {
      if (this.destroyed) return
      options.onReady?.()
    })

    this.update()
  }

  /* --------------------------------- public --------------------------------- */
  setMuted(muted: boolean) {
    this.xylophone.setMuted(muted)
  }

  /** The Three.js group holding the bars — animate its .scale/.position/.rotation directly (e.g. with GSAP) whenever you want. */
  getGroup() {
    return this.xylophone.group
  }

  /* --------------------------------- update --------------------------------- */
  private resize() {
    const rect = this.container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    if (width === 0 || height === 0) return
    if (this.size.width === width && this.size.height === height) return
    this.size = { width, height }

    Properties.viewportWidth = width
    Properties.viewportHeight = height
    Properties.globalUniforms.u_resolution.value.set(width * Properties.dpr, height * Properties.dpr)

    this.gl.setSize(width, height)
    Properties.composer.setSize(width, height)

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  private update() {
    if (this.destroyed) return
    this.rafId = window.requestAnimationFrame(this.boundUpdate)
    if (this.isContextLost) return

    const now = performance.now()
    const delta = Math.min((now - this.dateTime) / 1e3, MAX_DELTA)
    this.dateTime = now

    Properties.deltaTime = delta
    Properties.time += delta
    Properties.globalUniforms.u_deltaTime.value = delta
    Properties.globalUniforms.u_time.value = Properties.time

    RAFCollection.forEach((callback) => callback(delta))
    this.xylophone.update(delta, this.camera)

    Properties.composer.render(delta)
    Input.postUpdate()
  }

  destroy() {
    this.destroyed = true
    window.cancelAnimationFrame(this.rafId)
    this.resizeObserver.disconnect()
    Input.destroy()
    this.soundToggle.destroy()

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      Properties.composer.removePass(pass)
      pass.dispose()
    }

    this.glassNormalMaterial.dispose()
    this.fluid.dispose()
    this.xylophone.dispose()
    this.xylophoneBg.dispose()
    Properties.composer.dispose()
    this.gl.dispose()
    this.gl.domElement.remove()
  }
}
