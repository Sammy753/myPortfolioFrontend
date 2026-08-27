import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import Screen from '../Screen'

export interface LaptopProps {
  videoUrl?: string
  bodyColor?: string
  /** Screen recline angle from vertical, in degrees — small values look more "face-on". */
  tiltDeg?: number
}

const BASE_W = 2.2
const BASE_D = 1.5
const BASE_H = 0.07
const LID_W = 2.2
const LID_H = 1.4
const LID_T = 0.045
const BEZEL = 0.075

export default function Laptop({ videoUrl, bodyColor = '#e4e4e2', tiltDeg = 15 }: LaptopProps) {
  // const tilt = -THREE.MathUtils.degToRad(tiltDeg)

  return (
    <group>
      {/* base / keyboard deck */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.025} smoothness={4} position={[0, -BASE_H / 2, 0]}>
        <meshStandardMaterial color={bodyColor} metalness={0.65} roughness={0.32} />
      </RoundedBox>

      {/* keyboard deck detail */}
      <mesh position={[0, 0.0006, -0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BASE_W * 0.8, BASE_D * 0.52]} />
        <meshStandardMaterial color="#0c0d0f" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.0007, BASE_D * 0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BASE_W * 0.34, BASE_D * 0.22]} />
        <meshStandardMaterial color="#141517" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* lid, hinged at the base's back edge */}
      <group position={[0, 0, -BASE_D / 2]} rotation={[-0.1, 0, 0]}>
        <RoundedBox
          args={[LID_W, LID_H, LID_T]}
          radius={0.035}
          smoothness={4}
          position={[0, LID_H / 2, LID_T / 2]}
        >
          <meshStandardMaterial color={bodyColor} metalness={0.65} roughness={0.32} />
        </RoundedBox>

        <group position={[0, LID_H / 2, LID_T + 0.001]}>
          <Screen videoUrl={videoUrl} width={LID_W - BEZEL * 1} height={LID_H - BEZEL * 1} />
        </group>

        {/* camera */}
        <mesh position={[0, LID_H - BEZEL / 1, LID_T + 0.002]}>
          <circleGeometry args={[0.022, 16]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      </group>
    </group>
  )
}
