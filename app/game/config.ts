// Screen Configuration
export const SCREEN = {
  WIDTH: 1440, // display width(1920) * 0.9
  HEIGHT: 600, // display height(1080) * 0.9
  LEFT: 500,
  RIGHT: 940
} as const;

// Background Configuration
export const BACKGROUND = {
  TOP: 0,
  HEIGHT: 450,
  WIDTH: 2400
} as const;

// Ground Configuration
export const GROUND = {
  TOP: 450,
  HEIGHT: 150,
  WIDTH: 2400
} as const;

// Text Box Configuration
export const TEXTBOX = {
  HEIGHT: 100,
  WIDTH: 300
} as const;

// Physics Configuration
export const PHYSICS = {
  TOPSPEED: 8,
  ACCELERATION: 10 * 0.06,
  VELOCITY: 2,
  JUMPPOWER: 4,
  FRICTION: 10 * 0.06,
  GRAVITY: 10 * 0.1,
  SLOW: 0.7 // 30% slow
} as const;

// Player Configuration
export const PLAYER = {
  HEIGHT_RATIO: 600, // 6
  WIDTH_RATIO: 420, // 4.2
  HEIGHT: 600 / 12,
  WIDTH: 420 / 12,
  INITIALX: SCREEN.WIDTH / 2 - (420 / 12),
  GROUNDED: GROUND.TOP - (600 / 12),
  HP: 10
} as const;

// Legacy export for backward compatibility
export const GAME_CONFIG = {
  BG_TOP: BACKGROUND.TOP,
  BG_HEIGHT: BACKGROUND.HEIGHT,
  GTOP: GROUND.TOP,
  G_HEIGHT: GROUND.HEIGHT,
  THEIGHT: TEXTBOX.HEIGHT,
  TWIDTH: TEXTBOX.WIDTH,
  TOPSPEED: PHYSICS.TOPSPEED,
  ACCELERATION: PHYSICS.ACCELERATION,
  VELOCITY: PHYSICS.VELOCITY,
  JUMPPOWER: PHYSICS.JUMPPOWER,
  FRICTION: PHYSICS.FRICTION,
  GRAVITY: PHYSICS.GRAVITY,
  SLOW: PHYSICS.SLOW,
  HEIGHT_RATIO: PLAYER.HEIGHT_RATIO,
  WIDTH_RATIO: PLAYER.WIDTH_RATIO,
  HEIGHT: PLAYER.HEIGHT,
  WIDTH: PLAYER.WIDTH,
  INITIALX: PLAYER.INITIALX,
  GROUNDED: PLAYER.GROUNDED,
  HP: PLAYER.HP
} as const;