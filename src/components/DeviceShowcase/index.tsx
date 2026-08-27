import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import DeviceShowcaseScene from './Scene'
import type { DeviceLayout, DeviceLayoutKey } from './layout'
import './styles.css'

export interface DeviceShowcaseProps {
  className?: string
  style?: React.CSSProperties

  /** Video for the desktop monitor screen. Import a local file or pass any http(s) URL. */
  desktopVideo?: string
  /** Video for the laptop screen. */
  laptopVideo?: string
  /** Video for the tablet screen. */
  tabletVideo?: string
  /** Video for the mobile screen. */
  mobileVideo?: string

  /** 'layered': desktop biggest/behind, laptop next, tablet+mobile beside each other in front. 'row': all four side-by-side. Default 'layered'. */
  layout?: DeviceLayoutKey
  /** Override any device's position/rotation/scale from the chosen layout's defaults — only the keys you pass are overridden. */
  layoutOverrides?: Partial<DeviceLayout>

  /** Toggle individual devices on/off. All default true. */
  showDesktop?: boolean
  showLaptop?: boolean
  showTablet?: boolean
  showMobile?: boolean

  /** Click-and-drag to rotate around the group (bounded, won't flip or clip). Default true — the devices overlap in this composition, so dragging is how visitors see the ones tucked behind. */
  interactive?: boolean
  hoverRadius?: number
  maxTiltY?: number
  maxTiltX?: number
  easeSpeed?: number

  /** Device body color. Default a light silver/aluminum. */
  bodyColor?: string

  /** Canvas background. A CSS color/gradient, or 'transparent' (default) to sit on your page's own background. */
  background?: string
}

const DEFAULT_STYLE: React.CSSProperties = { width: '100%', height: '100%', minHeight: 420 }

export default function DeviceShowcase({
  className,
  style,
  desktopVideo,
  laptopVideo,
  tabletVideo,
  mobileVideo,
  layout = 'layered',
  layoutOverrides,
  showDesktop = true,
  showLaptop = true,
  showTablet = true,
  showMobile = true,
  interactive = true,
  hoverRadius = 0.6,
  maxTiltY = 0.6,
  maxTiltX = 0.9,
  easeSpeed = 0.09,
  bodyColor = '#788d96',
  background = 'transparent'
}: DeviceShowcaseProps) {
  const transparent = background === 'transparent'

  return (
    <div className={className} style={{ ...DEFAULT_STYLE, ...style, position: 'relative' }}>
      <div className="ds-root" style={{ background: transparent ? 'transparent' : background }}>
        <div className="ds-canvas-wrap">
          <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            camera={{ position: [0, 0.3, 7.6], fov: 30 }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            frameloop="always"
          >
            <Suspense fallback={null}>
              <DeviceShowcaseScene
                layout={layout}
                layoutOverrides={layoutOverrides}
                desktopVideo={desktopVideo}
                laptopVideo={laptopVideo}
                tabletVideo={tabletVideo}
                mobileVideo={mobileVideo}
                showDesktop={showDesktop}
                showLaptop={showLaptop}
                showTablet={showTablet}
                showMobile={showMobile}
                interactive={interactive}
                hoverRadius={hoverRadius}
                maxTiltY={maxTiltY}
                maxTiltX={maxTiltX}
                easeSpeed={easeSpeed}
                bodyColor={bodyColor}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  )
}
