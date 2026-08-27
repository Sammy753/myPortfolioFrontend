import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import Desktop from './devices/Desktop'
import Laptop from './devices/Laptop'
import Mobile from './devices/Mobile'
import Tablet from './devices/Tablet'
import { LAYOUTS, type DeviceLayout, type DeviceLayoutKey } from './layout'

export interface DeviceShowcaseSceneProps {
  layout: DeviceLayoutKey
  layoutOverrides?: Partial<DeviceLayout>
  desktopVideo?: string
  laptopVideo?: string
  tabletVideo?: string
  mobileVideo?: string
  showDesktop: boolean
  showLaptop: boolean
  showTablet: boolean
  showMobile: boolean
  interactive: boolean
  hoverRadius: number
  maxTiltY: number
  maxTiltX: number
  easeSpeed: number
  bodyColor: string
}

export default function DeviceShowcaseScene({
  layout,
  layoutOverrides,
  desktopVideo,
  laptopVideo,
  tabletVideo,
  mobileVideo,
  showDesktop,
  showLaptop,
  showTablet,
  showMobile,
  interactive,
  hoverRadius,
  maxTiltY,
  maxTiltX,
  easeSpeed,
  bodyColor
}: DeviceShowcaseSceneProps) {
  const { invalidate } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const positions = useMemo(
    () => ({
      desktop: { ...LAYOUTS[layout].desktop, ...layoutOverrides?.desktop },
      laptop: { ...LAYOUTS[layout].laptop, ...layoutOverrides?.laptop },
      tablet: { ...LAYOUTS[layout].tablet, ...layoutOverrides?.tablet },
      mobile: { ...LAYOUTS[layout].mobile, ...layoutOverrides?.mobile }
    }),
    [layout, layoutOverrides]
  )

  useFrame((state) => {
    if (!interactive || !groupRef.current) return

    const distFromCenter = Math.hypot(state.pointer.x, state.pointer.y)
    const isNear = distFromCenter <= hoverRadius

    const targetY = isNear ? state.pointer.x * maxTiltY : 0
    const targetX = isNear ? -state.pointer.y * maxTiltX : 0

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, easeSpeed)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, easeSpeed)
    invalidate()
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#a9c4ff" />
      {/* soft light from below/front — the "product shot" rim/base glow look */}
      <pointLight position={[0, -1.5, 2.5]} intensity={8} color="#ffffff" distance={8} decay={2} />

      <group ref={groupRef}>
        {showDesktop && (
          <group
            position={positions.desktop.position}
            rotation={positions.desktop.rotation}
            scale={positions.desktop.scale}
          >
            <Desktop videoUrl={desktopVideo} bodyColor={bodyColor} />
          </group>
        )}
        {showLaptop && (
          <group
            position={positions.laptop.position}
            rotation={positions.laptop.rotation}
            scale={positions.laptop.scale}
          >
            <Laptop videoUrl={laptopVideo} bodyColor={bodyColor} />
          </group>
        )}
        {showTablet && (
          <group
            position={positions.tablet.position}
            rotation={positions.tablet.rotation}
            scale={positions.tablet.scale}
          >
            <Tablet videoUrl={tabletVideo} bodyColor={bodyColor} />
          </group>
        )}
        {showMobile && (
          <group
            position={positions.mobile.position}
            rotation={positions.mobile.rotation}
            scale={positions.mobile.scale}
          >
            <Mobile videoUrl={mobileVideo} bodyColor={bodyColor} />
          </group>
        )}
      </group>
    </>
  )
}