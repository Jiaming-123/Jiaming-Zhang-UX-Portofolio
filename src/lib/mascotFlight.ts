export const MASCOT_CONFIG = {
  flightMs: 5000,
  returnMs: 650,
  idlePoseMs: 2400,
  flyingPoseMs: 650,
  cooldownMs: 900,
} as const

export const FLIGHT_STYLES = ['slalom', 'spin', 'flip', 'swoop'] as const
export type FlightStyle = typeof FLIGHT_STYLES[number]
export type Point = { x: number; y: number }
export type FlightPoint = Point & { offset: number }
export type Viewport = { width: number; height: number }
export type MascotSize = { width: number; height: number }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function mascotHome(viewport: Viewport, size: MascotSize, navBottom = 0): Point {
  const mobile = viewport.width <= 760
  const right = mobile ? 12 : 28
  const top = Math.max(mobile ? 80 : 88, navBottom + 12)
  return {
    x: Math.max(0, viewport.width - size.width - right),
    y: clamp(top, 0, Math.max(0, viewport.height - size.height - 16)),
  }
}

// Keep even a fully rotated sprite within the viewport, not just its centre.
export function mascotFlightBounds(viewport: Viewport, size: MascotSize) {
  const diagonal = Math.hypot(size.width, size.height)
  const paddingX = (diagonal - size.width) / 2 + 12
  const paddingY = (diagonal - size.height) / 2 + 12
  return {
    minX: Math.min(paddingX, Math.max(0, (viewport.width - size.width) / 2)),
    maxX: Math.max(paddingX, viewport.width - size.width - paddingX),
    minY: Math.min(paddingY, Math.max(0, (viewport.height - size.height) / 2)),
    maxY: Math.max(paddingY, viewport.height - size.height - paddingY),
  }
}

export function createMascotFlight(home: Point, viewport: Viewport, size: MascotSize, random = Math.random): FlightPoint[] {
  const bounds = mascotFlightBounds(viewport, size)
  // Alternate left/right and upper/lower zones, with a new target in each zone.
  // This explores the whole screen rather than making tiny random jumps.
  const zones = [[0.08, 0.3], [0.74, 0.82], [0.16, 0.88], [0.86, 0.16], [0.42, 0.57], [0.52, 0.08]]
  const points: Point[] = [home, ...zones.map(([x, y]) => ({
    x: bounds.minX + clamp(x + (random() - .5) * .22, 0, 1) * Math.max(0, bounds.maxX - bounds.minX),
    y: bounds.minY + clamp(y + (random() - .5) * .22, 0, 1) * Math.max(0, bounds.maxY - bounds.minY),
  }))]
  const result: FlightPoint[] = [{ ...home, offset: 0 }]
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[Math.max(0, i - 1)]
    const b = points[i]
    const c = points[i + 1]
    const d = points[Math.min(points.length - 1, i + 2)]
    for (let step = 1; step <= 12; step++) {
      const t = step / 12
      const curve = (key: keyof Point) => .5 * ((2 * b[key]) + (-a[key] + c[key]) * t + (2 * a[key] - 5 * b[key] + 4 * c[key] - d[key]) * t ** 2 + (-a[key] + 3 * b[key] - 3 * c[key] + d[key]) * t ** 3)
      // The departure starts at home; all later curves stay inside safe bounds.
      result.push({
        x: clamp(curve('x'), bounds.minX, Math.max(bounds.maxX, i === 0 ? home.x : 0)),
        y: clamp(curve('y'), Math.min(bounds.minY, i === 0 ? home.y : bounds.minY), bounds.maxY),
        offset: (i + t) / (points.length - 1),
      })
    }
  }
  return result
}

export function mascotOrientation(style: FlightStyle, direction: number): Keyframe[] {
  const poses: Record<FlightStyle, [number, number][]> = {
    slalom: [[0, 0], [-18, 0], [18, 180], [-22, 0], [20, 180], [-16, 0], [0, 0]],
    spin: [[0, 0], [0, 0], [180, 0], [360, 0], [540, 0], [720, 0], [720, 0]],
    flip: [[0, 0], [-12, 0], [12, 180], [-12, 360], [12, 540], [-12, 720], [0, 720]],
    swoop: [[0, 0], [-38, 0], [28, 0], [-45, 180], [35, 180], [-20, 0], [0, 0]],
  }
  return poses[style].map(([roll, yaw], i, all) => ({
    transform: `rotate(${roll * direction}deg) rotateY(${yaw}deg)`,
    offset: i / (all.length - 1),
  }))
}
