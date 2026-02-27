# Progress Update

## Added
- Comprehensive vocabulary system (VOCAB array with 200+ entries)
- EHKKR type with En/Hi/Kan/Kat/Ro/level fields
- Katakana support for all vocabulary entries
- Level-based difficulty system (1-5 scale)
- handleRomaji function with multiple output types
- Romaji input toggle (Left Shift key)
- Complete physics system (gravity, jumping, friction)
- Japanese IME composition support
- Typing mode with text input display

## Changed
- Restructured vocabulary with frequency-based levels
- Added nullable Kan field for entries without kanji
- Enhanced handleRomaji with proper null handling
- Game state includes romaji boolean flag
- Input handling supports both English and Japanese

## Deleted
- Old incomplete RtoH/RtoE functions

## Next Functions to Implement
- Enemy spawning with vocabulary challenges
- Translation validation system
- Scoring based on accuracy and speed
- Visual feedback for correct/incorrect answers
- Progressive difficulty based on player level

## IDEA 
- maybe use spelling for making walls and weapons. ex: 前方十メートルに石の壁、鉄の剣２本
- simplied SOV grammar. ex: 私　壁　作る、　攻撃、　たね、　植える