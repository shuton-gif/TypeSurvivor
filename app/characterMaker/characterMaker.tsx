'use client'
import { useState } from "react"
import { toRem } from "../game/game"
import { GAME_CONFIG as GC } from "../game/game"

type Grid = {
    isPainted: boolean
    color: string,
    points: Array<{ x: number, y: number }>
}

type Charactor = {
    model: Grid[]
    hitBox?: Array<{ x: number, y: number }>
    joint?: Array<{ x: number, y: number }>
}

type Editor = {
    grids: string[][],
    smallGrids?: string[][]
    gridX: number,
    gridY: number,
    layerView: number, // 0: HEAD, 1: TORSO, 2: BONE
    smallGrid: boolean
}


export function CharacterMaker({ height, width }: {
    height: number,
    width: number
}) {

    const initGrid = Array.from({ length: height }, () => Array(width).fill(''))
    const initSmall = Array.from({ length: 10 }, () => Array(10).fill(''))

    const [edit, setEdit] = useState<Editor>({
        grids: initGrid,
        smallGrids: initSmall,
        gridX: GC.HEIGHT,
        gridY: GC.WIDTH,
        layerView: 0,
        smallGrid: false,
    })


    const smallGrid = () => {
        if (edit.smallGrid) {
            return (
                <div>
                    {edit.smallGrids?.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    style={{
                                        border: 'solid 0.0625rem black',
                                        backgroundColor: cell || 'transparent',
                                        width: toRem(25),
                                        height: toRem(25),
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
            )
        } else {
            return (
                <div>
                    {edit.grids.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    style={{
                                        border: 'solid 0.0625rem black',
                                        backgroundColor: cell || 'transparent',
                                        width: toRem(10),
                                        height: toRem(10),
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
            )
        }


    }

    return (
        <div>
            {/* <input type="text" onInput={(input) => setEdit({
                ...edit,
                gridX: handleInput(input),
            })} /> */}
            {/* <input type="submit" onSubmit={() => setEdit({
                ...edit,
                gridY: 10,
            })} /> */}
            <button onClick={() => setEdit({
                ...edit,
                smallGrid: true
            })}>edit.smallGrid: true</button>
            <button onClick={() => setEdit({
                ...edit,
                smallGrid: false
            })}>edit.smallGrid: false</button>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {smallGrid()}
            </div>
            <div>
                CHANGE LAYER
                <ul>
                    <li onClick={() => setEdit(prev => ({ ...prev, layerView: 0 }))}>HEAD</li>
                    <li onClick={() => setEdit(prev => ({ ...prev, layerView: 1 }))}>TORSO</li>
                    <li onClick={() => setEdit(prev => ({ ...prev, layerView: 2 }))}>BONE</li>
                </ul>
            </div>
            {/* <div onClick={() => setFinal()}>SAVE</div> */}
        </div>
    )
}
