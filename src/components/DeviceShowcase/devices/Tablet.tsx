import { RoundedBox } from '@react-three/drei'
import Screen from '../Screen'

export interface TabletProps {
  videoUrl?: string
  bodyColor?: string
}

const T_W = 1.0
const T_H = 1.4
const T_T = 0.045
const BEZEL = 0.06

export default function Tablet({ videoUrl, bodyColor = '#e4e4e2' }: TabletProps) {
  return (
    <group>
      <RoundedBox args={[T_W, T_H, T_T]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color={bodyColor} metalness={0.65} roughness={0.32} />
      </RoundedBox>

      <group position={[0, 0, T_T / 2 + 0.001]}>
        <Screen videoUrl={videoUrl} width={T_W - BEZEL * 1} height={T_H - BEZEL * 1} />
      </group>

      <mesh position={[0, T_H / 2.05 - BEZEL / 2, T_T / 2 + 0.002]}>
        <circleGeometry args={[0.015, 10]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  )
}
