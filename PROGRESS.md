# Progress Update

## Added
- Character maker component with grid-based editor
- Shape and Character type definitions
- Layer view system (HEAD/TORSO/BONE)
- Grid validation for edge requirements
- Shape converter from grid to character model
- HitBox generation from shape outlines
- Click-to-paint functionality (#ff0000)

## Changed
- Moved game files to app/game/ directory
- Updated Editor type with layerView instead of boneView
- Fixed TypeScript errors in setGrid function
- Refactored shapeCoverter to use forEach instead of for loops
- Enhanced setHitBox to detect edge cells with empty adjacents

## Deleted
- Old boneView property from Editor type
- Broken syntax in shapeCoverter function

## Next Functions to Implement
- Color palette selection for character painting
- Layer switching functionality implementation
- Character export/save system
- Character preview visualization
- Multiple shape combination logic

## IDEA 
- add npc that can understand easy commands ex:　芋　掘れ
- maybe use spelling for making walls and weapons. ex: 前方十メートルに石の壁、鉄の剣２本
- simplied SOV grammar. ex: 私　壁　作る、　攻撃、　たね、　植える
- make Player animation in css
- maybe rename to TypeKingdom 略して　タイキン