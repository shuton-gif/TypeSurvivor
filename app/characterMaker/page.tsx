'use client'
import { CharacterMaker } from "./characterMaker"
import { GAME_CONFIG as GC } from "../game/game"
const { HEIGHT, WIDTH } = GC


export default function CharactorMakerPage() {
    return (
        <CharacterMaker height={HEIGHT} width={WIDTH} />
    )
}