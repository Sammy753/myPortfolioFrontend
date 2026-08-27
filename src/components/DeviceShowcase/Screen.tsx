import { Suspense } from 'react'
import { useVideoTexture } from '@react-three/drei'

interface VideoPlaneProps {
  videoUrl: string
  width: number
  height: number
}

function VideoPlane({ videoUrl, width, height }: VideoPlaneProps) {
  const texture = useVideoTexture(videoUrl, {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: 'anonymous'
  })
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

interface PlaceholderProps {
  width: number
  height: number
  color: string
}

function Placeholder({ width, height, color }: PlaceholderProps) {
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0} />
    </mesh>
  )
}

export interface ScreenProps {
  /** Video URL (import it, or point at any http(s) URL). Omit to show a plain placeholder screen. */
  videoUrl?: string
  width: number
  height: number
  placeholderColor?: string
}

export default function Screen({ videoUrl, width, height, placeholderColor = '#141519' }: ScreenProps) {
  if (!videoUrl) return <Placeholder width={width} height={height} color={placeholderColor} />

  // Each screen gets its own Suspense boundary — a slow-loading video on one device
  // shouldn't blank out the other two while it loads.
  return (
    <Suspense fallback={<Placeholder width={width} height={height} color={placeholderColor} />}>
      <VideoPlane videoUrl={videoUrl} width={width} height={height} />
    </Suspense>
  )
}
