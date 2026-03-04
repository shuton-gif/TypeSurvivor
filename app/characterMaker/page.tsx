'use client'
import { CharacterMaker } from "./characterMaker"
import { GAME_CONFIG as GC } from "../game/game"
const { HEIGHT_RATIO, WIDTH_RATIO } = GC


export default function CharactorMakerPage() {
    return (
        <CharacterMaker height={HEIGHT_RATIO} width={WIDTH_RATIO} />
    )
}