export interface DeviceTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export interface DeviceLayout {
  desktop: DeviceTransform
  laptop: DeviceTransform
  tablet: DeviceTransform
  mobile: DeviceTransform
}

export type DeviceLayoutKey = 'layered' | 'row'

export const LAYOUTS: Record<DeviceLayoutKey, DeviceLayout> = {
  // Front-facing stack: desktop biggest and furthest back, laptop in front of it,
  // tablet + mobile beside each other in front of the laptop. Minimal rotation on every
  // device — they face the camera dead-on; only depth (z) and scale separate them.
  layered: {
    desktop: { position: [0, -1.15, -1.9], rotation: [0, 0, 0], scale: 1.55 },
    laptop: { position: [0.55, -1.05, -0.55], rotation: [0, 0, 0], scale: 1.4 },
    tablet: { position: [-0.95, -0.4, 0.55], rotation: [0, 0, 0], scale: 1.25 },
    mobile: { position: [-0.5, -0.65, 0.65], rotation: [0, 0, 0], scale: 1.3 }
  },
  // All four side-by-side at a similar scale.
  row: {
    desktop: { position: [-2.7, 0.35, 0], rotation: [0, 0, 0], scale: 0.85 },
    laptop: { position: [-0.8, 0, 0], rotation: [0, 0, 0], scale: 0.78 },
    tablet: { position: [0.7, -0.1, 0], rotation: [0, 0, 0], scale: 0.72 },
    mobile: { position: [1.85, -0.1, 0], rotation: [0, 0, 0], scale: 0.72 }
  }
}
