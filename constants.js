export const BG = '#e8e2d4';
export const FOV = 28;
// Isometric-style view: far away, narrow FOV
export const ISO = { position: [7.0, 5.7, 8.0], target: [0, 1.45, 0] };
export const DESK_TOP_Y = 1.0;

// CRT screen (world units) and the 2D UI size (CSS px) mapped onto it
export const SCREEN = { w: 1.5, h: 1.125 };
export const UI_PX = { w: 800, h: 600 };
export const MONITOR_POS = [0, 1.05, -0.3];
export const SCREEN_LOCAL = [0, 1.18, 0.476];
export const SCREEN_CENTER = [
  MONITOR_POS[0] + SCREEN_LOCAL[0],
  MONITOR_POS[1] + SCREEN_LOCAL[1],
  MONITOR_POS[2] + SCREEN_LOCAL[2],
];
// drei <Html transform>: 1 CSS px = distanceFactor / 400 world units
export const HTML_DISTANCE_FACTOR = (400 * SCREEN.w) / UI_PX.w;
