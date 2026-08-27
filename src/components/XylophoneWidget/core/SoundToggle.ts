const STORAGE_KEY = "xylophone-widget:sound"

// localStorage throws in some privacy modes — a lost preference is not worth breaking the page over
function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "off"
  } catch {
    return false
  }
}

function writeStoredMuted(muted: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, muted ? "off" : "on")
  } catch {
    // preference just won't persist
  }
}

const ICON_SVG = `
  <svg class="xw-sound-toggle__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path class="xw-sound-toggle__wave" d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4" />
    <path class="xw-sound-toggle__wave" d="M19.2 6.1a8.5 8.5 0 0 1 0 11.8" />
    <path class="xw-sound-toggle__slash" d="M3.5 3.5l17 17" />
  </svg>
`

/* -------------------------------------------------------------------------- */
/*                                    main                                    */
/* -------------------------------------------------------------------------- */
export class SoundToggle {
  muted = readStoredMuted()

  readonly el: HTMLButtonElement
  private readonly label: HTMLSpanElement
  private readonly onClick = () => this.set(!this.muted)

  constructor(private readonly onToggle: (muted: boolean) => void) {
    this.el = document.createElement("button")
    this.el.type = "button"
    this.el.className = "xw-sound-toggle"
    this.el.setAttribute("aria-pressed", "true")
    this.el.innerHTML = ICON_SVG
    this.label = document.createElement("span")
    this.label.className = "xw-sound-toggle__text"
    this.el.appendChild(this.label)
  }

  mount(container: HTMLElement) {
    container.appendChild(this.el)
    this.el.addEventListener("click", this.onClick)
    this.render()
    this.onToggle(this.muted) // apply the restored preference
  }

  destroy() {
    this.el.removeEventListener("click", this.onClick)
    this.el.remove()
  }

  private set(muted: boolean) {
    this.muted = muted
    writeStoredMuted(muted)
    this.render()
    this.onToggle(muted)
  }

  private render() {
    this.el.setAttribute("aria-pressed", String(!this.muted))
    this.el.classList.toggle("is-muted", this.muted)
    this.label.textContent = this.muted ? "Sound off" : "Sound on"
  }
}
