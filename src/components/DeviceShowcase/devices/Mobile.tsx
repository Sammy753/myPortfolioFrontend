import { RoundedBox } from '@react-three/drei'
import Screen from '../Screen'

export interface MobileProps {
  videoUrl?: string
  bodyColor?: string
}

const P_W = 0.55
const P_H = 1.15
const P_T = 0.035
const BEZEL = 0.045

export default function Mobile({ videoUrl, bodyColor = '#e4e4e2' }: MobileProps) {
  return (
    <group>
      <RoundedBox args={[P_W, P_H, P_T]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={bodyColor} metalness={0.65} roughness={0.32} />
      </RoundedBox>

      <group position={[0, 0, P_T / 2 + 0.001]}>
        <Screen videoUrl={videoUrl} width={P_W - BEZEL * 1} height={P_H - BEZEL * 1} />
      </group>

      {/* notch */}
      <mesh position={[0, P_H / 2 - BEZEL * 1, P_T / 1 + 0.002]} >
        <planeGeometry args={[0.16, 0.028]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  )
}
