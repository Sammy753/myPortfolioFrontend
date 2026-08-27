import { RoundedBox } from '@react-three/drei'
import Screen from '../Screen'

export interface DesktopProps {
  videoUrl?: string
  bodyColor?: string
}

const D_W = 2.7
const D_H = 1.62
const D_T = 0.05
const BEZEL = 0.07
const STAND_W = 0.16
const STAND_H = 0.4
const STAND_T = 0.06
const BASE_W = 0.75
const BASE_D = 0.4
const BASE_H = 0.035

export default function Desktop({ videoUrl, bodyColor = '#e4e4e2' }: DesktopProps) {
  return (
    <group>
      {/* screen panel */}
      <group position={[0, STAND_H + BASE_H + D_H / 2, 0]}>
        <RoundedBox args={[D_W, D_H, D_T]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.35} />
        </RoundedBox>
        <group position={[0, 0, D_T / 2 + 0.001]}>
          <Screen videoUrl={videoUrl} width={D_W - BEZEL * 1} height={D_H - BEZEL * 1} />
        </group>
        {/* camera */}
        <mesh position={[0, D_H / 2 - BEZEL / 1, D_T / 2 + 0.002]}>
          <circleGeometry args={[0.023, 16]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      </group>

      {/* stand neck */}
      <mesh position={[0, BASE_H + STAND_H / 2, -0.03]}>
        <boxGeometry args={[STAND_W, STAND_H, STAND_T]} />
        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* base */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.01} smoothness={4} position={[0, BASE_H / 2, 0]}>
        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
      </RoundedBox>
    </group>
  )
}
