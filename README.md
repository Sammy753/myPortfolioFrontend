# XylophoneWidget

The actual "WebGL Xylophone" (Codrops, MIT-licensed) — a helix conveyor of real
frosted-glass bars (a loaded GLB model, not a stylized approximation), with a
genuine GPU fluid simulation driving the hover-tint reveal, a Gaussian-blurred
frost/transmission pass, SSAO, SMAA, and a real recorded note sample pitched
per bar. This is a faithful port of the original, adapted only where it
assumed it owned the whole page, so it can be dropped into any container.

## Preview it standalone

```bash
npm install
npm run dev
```

`src/App.tsx` is a bare harness — it mounts nothing but the component
full-viewport.

## Use it in your own project

Everything lives in one folder:

```
src/components/XylophoneWidget/
  index.tsx        ← React wrapper (default export) — use this
  styles.css        ← scoped styles for the built-in sound-toggle button
  core/              ← the actual engine (vanilla TS + three.js, framework-agnostic)
  shaders/           ← all GLSL, copied verbatim from the original
  assets/            ← the real bar model (.glb) + note sample (.wav)
```

Copy the whole folder into your project (needs `react`, `three`, and
`postprocessing` — see `package.json` for the exact versions this was built
against; the shader/pass code is sensitive to `postprocessing`'s API, so
pin close to `^6.39`), then:

```tsx
import XylophoneCoil from './components/XylophoneWidget'

function Hero() {
  return (
    <div style={{ width: '100%', height: 560 }}>
      <XylophoneCoil />
    </div>
  )
}
```

Not using React? `core/XylophoneWidget.ts` is a plain class — mount it
directly:

```ts
import { XylophoneWidget } from './components/XylophoneWidget/core/XylophoneWidget'

const widget = new XylophoneWidget(document.querySelector('#hero-3d')!)
// later: widget.destroy()
```

### Props / options

| Option              | Default | What it does                                                        |
|----------------------|---------|-----------------------------------------------------------------------|
| `muted`              | `false` | Start muted, before any stored preference                             |
| `showSoundToggle`     | `true`  | Render the built-in "Sound on/off" pill button                        |
| `captureScroll`       | `true`  | Hovering the widget captures wheel/touch-drag to scroll the conveyor  |
| `background`          | —       | CSS color to recolor the backdrop panel, or `'transparent'` to remove it entirely (see below) |
| `onReady`             | —       | Called once the bar model + audio have loaded                         |

### Removing / changing the background

```tsx
<XylophoneCoil background="transparent" />   // no panel — widget sits on your page's own background
<XylophoneCoil background="#0e0e14" />        // recolor the gradient panel
```

The purple gradient isn't just decoration — the frosted bars sample it (blurred)
to get their "see-through glass" look. Setting `background="transparent"` removes
that panel and makes the canvas itself transparent, but since there's then
nothing behind the bars to refract, they automatically fall back to a flat
frosted look (transmission disabled) rather than sampling emptiness. The
fresnel edge-sheen and iridescent rainbow still work normally in this mode —
you lose the "glass over a blurred backdrop" effect, not the glassy look
overall.

Options are read once, on mount. Change them by remounting (e.g. give the
React component a different `key`).

**Only one instance at a time.** Like the original, this owns a few
module-level singletons (render clock, composer, input state) rather than
threading them through every constructor. Mounting a second instance while
the first is still alive will conflict — `destroy()` one before mounting
another.

## What's identical to the original, and what changed

Kept as-is: the helix layout math, the picking (ray-vs-oriented-box, no
per-triangle raycasting since the bars are one instanced draw), the damped
pendulum "strike swing," the real fluid sim (adapted from Pavel Dobryakov's
WebGL-Fluid-Simulation) that drives where the hover tint reveals, the
frost/transmission backdrop blur pass, the SSAO glass-normal buffer pass, the
iridescent/fresnel shader, and the pentatonic sample-pitching audio engine —
all copied verbatim or near-verbatim from the source you provided.

Adapted so it's an embeddable component instead of a full-page app:

- **Sizing**: was `window.innerWidth/innerHeight` + a `#sizer` DOM element on
  page resize; now `container.getBoundingClientRect()` behind a
  `ResizeObserver` on your container.
- **Canvas mount**: was `position: fixed` prepended to `<body>` with
  `pointer-events: none` (a decorative full-page background driven by
  document-level listeners); now `position: absolute; inset: 0` inside your
  container, with real pointer events, since it's the actual interactive
  surface rather than a backdrop.
- **Input**: was document/window-scoped (`mousemove` on `document`,
  `wheel` on `document`, coordinates normalized against
  `window.innerWidth/Height`); now scoped to the container element, with
  coordinates normalized against its bounding rect, so it doesn't read or
  react to pointer activity elsewhere on your page.
- **Sound toggle**: was a button expected to already exist in page HTML
  (`#sound-toggle`); now builds its own DOM node and appends it into the
  container, optional via `showSoundToggle`.
- **Loading/debug chrome**: the page's loading-screen CSS class and the
  dev-only lil-gui tuning panel were page-level conveniences, not part of the
  component's look — dropped in favor of an `onReady` callback.

Not ported: the marketing frame (title, "Article/All demos/GitHub" links,
tag pills) — that's page content, not the interactive piece.

## License

The original demo (Codrops, MIT) is included as `LICENSE-ORIGINAL`. This
port remains MIT.
