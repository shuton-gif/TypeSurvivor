'use client'
import { useState } from "react"
import { toRem } from "../game/game"
import { GAME_CONFIG as GC } from "../game/game"

type Shape = {
    color: string,
    points: Array<{ x: number, y: number }>
}

type Charactor = {
    model: Shape[]
    hitBox?: Array<{ x: number, y: number }>
    joint?: { x: number, y: number }
}

type Editor = {
    grids: string[][],
    layerView: number, // 0: HEAD, 1: TORSO, 2: BONE
}

export function CharacterMaker({ height, width }: {
    height: number,
    width: number
}) {
    const initGrid = Array.from({ length: height }, () => Array(width).fill(''))

    const [edit, setEdit] = useState<Editor>({
        grids: initGrid,
        layerView: 0
    })

    const validateDrawing = (edit: string[][]): boolean => {
        const hasTop = edit[0].some(cell => cell !== '')
        const hasBottom = edit[edit.length - 1].some(cell => cell !== '')
        const hasLeft = edit.some(row => row[0] !== '')
        const hasRight = edit.some(row => row[row.length - 1] !== '')

        return hasTop && hasBottom && hasLeft && hasRight
    }


    const shapeCoverter = (grids: Editor): Charactor => {
        const shapes: Shape[] = []

        grids.grids.forEach((row, r) => {
            row.forEach((color, c) => {
                if (color) {
                    shapes.push({
                        color: color,
                        points: [{ x: c, y: r }]
                    })
                }
            })
        })

        return { model: shapes }
    }

    const setHitBox = (character: Charactor): Charactor => {
        const hitBox: Array<{ x: number, y: number }> = []

        edit.grids.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell) {
                    const hasEmptyAdjacent =
                        (r === 0 || edit.grids[r - 1][c] === '') ||
                        (r === edit.grids.length - 1 || edit.grids[r + 1][c] === '') ||
                        (c === 0 || edit.grids[r][c - 1] === '') ||
                        (c === row.length - 1 || edit.grids[r][c + 1] === '')

                    if (hasEmptyAdjacent) {
                        hitBox.push({ x: c, y: r })
                    }
                }
            })
        })

        return { ...character, hitBox }
    }

    const setFinal = () => {
        if (validateDrawing(edit.grids) && height === GC.HEIGHT && width === GC.WIDTH) {
            console.log('Valid character created!')
            const character = shapeCoverter(edit)
            const finalCharacter = setHitBox(character)
            console.log('Character data:', finalCharacter)
        } else {
            console.log('Character must touch all edges and match GC dimensions')
        }
    }

    return (
        <div>
            <div>
                {edit.grids.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                style={{
                                    border: 'solid 0.0625rem white',
                                    backgroundColor: cell || 'transparent',
                                    width: toRem(50),
                                    height: toRem(50),
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    setEdit(prev => ({
                                        ...prev,
                                        grids: prev.grids.map((row, r) =>
                                            row.map((cell, c) => r == rowIndex && c == colIndex ? '#ff0000' : cell)
                                        )
                                    }))
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>
                CHANGE LAYER
                <ul>
                    <li onClick={() => setEdit(prev => ({...prev, layerView: 0}))}>HEAD</li>
                    <li onClick={() => setEdit(prev => ({...prev, layerView: 1}))}>TORSO</li>
                    <li onClick={() => setEdit(prev => ({...prev, layerView: 2}))}>BONE</li>
                </ul>
            </div>
            <div onClick={() => setFinal()}>SAVE</div>
        </div>
    )
}
