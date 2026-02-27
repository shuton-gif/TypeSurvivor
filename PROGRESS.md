# Progress Update

## Added
- Next.js app structure (`app/` directory with layout.tsx)
- Game component with player movement (WASD keys)
- CSS modules for styling (game.module.css, page.module.css)
- Font loading (@font-face for EnglishPixelFont, JapanesePF)
- Responsive units (rem/% instead of px)
- Player, TextBox, and BackGround components
- Game state management (player position, movement, typing mode)
- Keyboard event handlers (keydown/keyup)

## Changed
- Moved from src/ to app/ directory structure
- Updated tsconfig.json to include app directory
- Fixed font-family syntax and paths
- Converted pixel values to rem units
- Improved state management with useRef for event handlers

## Deleted
- SQLite dependencies (better-sqlite3, sqlite3) for now

## Next Functions to Implement
- Player collision with ground
- Gravity and jumping mechanics
- Enemy spawning system
- Text typing interface for game mechanics
- Background image/texture loading
- Audio system integration