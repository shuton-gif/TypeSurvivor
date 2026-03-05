'use client'
import { stat } from 'fs';
import styles from './game.module.css';
import { VOCAB, handleRomaji } from './spells';
import { useState, useEffect, useRef } from "react";
//------------ CSS ---------------
//SCREEN
const S_WIDTH: number = 1200
const S_HEIGHT: number = 600
//BACK GROUND
const BG_TOP: number = 0
const BG_HEIGHT: number = 450
const BG_WIDTH: number = 2400
//GROUND ------------------
const GTOP: number = 450
const G_HEIGHT: number = 150
const G_WIDTH: number = 2400
//TEXT BOX -----------------
const THEIGHT: number = 100
const TWIDTH: number = 300

//------------ ENERTIA -------------
const TOPSPEED: number = 8;
const ACCELERATION: number = 10 * 0.06
const VELOCITY: number = 2;
const JUMPPOWER: number = 4;
const FRICTION: number = 10 * 0.06;
const GRAVITY: number = 10 * 0.1;
const SLOW: number = 0.7; //30% slow

//----------- PLAYER -------------
const HEIGHT_RATIO: number = 75;
const WIDTH_RATIO: number = 53;
const HEIGHT: number = HEIGHT_RATIO / 1.5;
const WIDTH: number = WIDTH_RATIO / 1.5;
const INITIALX: number = 300;
const GROUNDED: number = GTOP - HEIGHT;
const HP: number = 10;

export const GAME_CONFIG = {
    BG_TOP, BG_HEIGHT, GTOP, G_HEIGHT, THEIGHT, TWIDTH,
    TOPSPEED, ACCELERATION, VELOCITY, JUMPPOWER, FRICTION, GRAVITY, SLOW,
    HEIGHT_RATIO, WIDTH_RATIO, HEIGHT, WIDTH, INITIALX, GROUNDED, HP
} as const

type Movement = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    jump: boolean,
    airBorn: boolean,
    jumpVelocity: number,
    leftVelocity: number,
    rightVelocity: number,
}
type Player = {
    x: number,
    y: number,
    height: number,
    width: number,
    HP: number,
    input: string,
    movement: Movement
}
type Enemy = {
    x: number,
    y: number,
    HP: number,
    level: number,
    problem: string,
}

type Screen = {
    x: number,
    y: number,
    left: number,
    right: number
}

export type GameState = {
    player: Player,
    enemy?: Enemy[],
    scores: number,
    typing: boolean,
    screen: Screen,
    scale: number,
    romaji: boolean,
}


const intersected = function (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number) {
    const ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
    const tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
    const tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
    const td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
    return tc * td <= 0 && ta * tb <= 0;
}
export const toRem = (param: number, scale?: number): string => {
    return scale != null ? `${(param / 16) * scale}rem` : `${param / 16}rem`
}

// const absolute = (param: number): number => {
//     return param < 0 ? -param : param
// }

export function Game() {
    const [state, setState] = useState<GameState>({
        player: {
            x: INITIALX,
            y: GROUNDED,
            height: HEIGHT,
            width: WIDTH,
            HP: HP,
            input: '',
            movement: {
                up: false,
                down: false,
                left: false,
                right: false,
                jump: false,
                airBorn: false,
                jumpVelocity: 0,
                leftVelocity: 0,
                rightVelocity: 0,
            }
        },
        scores: 0,
        typing: false,
        screen: { x: - BG_WIDTH / 2, y: 0, left: WIDTH + WIDTH, right: S_WIDTH - WIDTH },
        scale: 1,
        romaji: false,
    })
    const stateRef = useRef<GameState>(state)

    useEffect(() => {
        stateRef.current = state
    })

    useEffect(() => {
        const keyDOWN = (e: KeyboardEvent) => {
            const state = stateRef.current
            let newState = {
                ...state,
            }

            if (state.typing) {
                if (e.key.length === 1) {
                    setState(prev => ({
                        ...prev,
                        player: { ...prev.player, input: prev.player.input + e.key }
                    }))
                } else if (e.code === 'Backspace') {
                    setState(prev => ({
                        ...prev,
                        player: { ...prev.player, input: prev.player.input.slice(0, -1) }
                    }))
                }
                if (e.code === 'LShift') {
                    setState(prev => {
                        const newRomaji = !prev.romaji
                        return { ...prev, romaji: newRomaji }
                    })
                }
            }

            if (!state.typing) {
                if (e.code === 'KeyA') {
                    setState(prev => {
                        if (!prev.player.movement.left && !state.player.movement.airBorn) {
                            return {
                                ...prev,
                                player: {
                                    ...prev.player,
                                    movement: {
                                        ...prev.player.movement,
                                        left: true,
                                        right: false
                                    }
                                }
                            }
                        }
                        return prev
                    })
                }
                if (e.code === 'KeyD') {
                    setState(prev => {
                        if (!prev.player.movement.right && !state.player.movement.airBorn) {
                            return {
                                ...prev,
                                player: {
                                    ...prev.player,
                                    movement: {
                                        ...prev.player.movement,
                                        right: true,
                                        left: false
                                    }
                                }
                            }
                        }
                        return prev
                    })
                }

                if (e.code === 'Space') {
                    setState(prev => (prev.player.movement.up || prev.player.movement.airBorn) ? prev : ({
                        ...prev,
                        player: {
                            ...prev.player,
                            movement: {
                                ...prev.player.movement,
                                up: true
                            }
                        }
                    }))
                }
            }

            if (e.code === 'Enter') {
                setState(prev => {
                    const newTyping = !prev.typing
                    return { ...prev, typing: newTyping }
                })
                setState(prev => ({
                    ...prev,
                    player: {
                        ...prev.player,
                        movement: {
                            ...prev.player.movement,
                            up: false,
                            left: false,
                            right: false
                        }
                    }
                }))
            }
        }

        const keyUP = (e: KeyboardEvent) => {
            if (e.code === 'KeyA') {
                setState(prev => ({
                    ...prev,
                    player: {
                        ...prev.player,
                        movement: {
                            ...prev.player.movement,
                            left: false
                        }
                    }
                }))
            }
            if (e.code === 'KeyD') {
                setState(prev => ({
                    ...prev,
                    player: {
                        ...prev.player,
                        movement: {
                            ...prev.player.movement,
                            right: false
                        }
                    }
                }))
            }
        }

        const handleInterval = () => {
            const state = stateRef.current
            let newState = {
                ...state,
            }
            let s: number = newState.scale;
            let move = newState.player.movement
            // let inScreenX: number = newState.screen.x - newState.player.x

            if (newState.player.x <= newState.screen.left) {
                if (move.left && !move.airBorn) {
                    move.leftVelocity += VELOCITY
                    if (move.leftVelocity < TOPSPEED) {
                        move.leftVelocity += ACCELERATION
                    } else {
                        move.leftVelocity = TOPSPEED
                    }
                    newState.screen.x -= move.leftVelocity * s
                } else {
                    if (move.leftVelocity > 0) {
                        if (!move.airBorn) {
                            move.leftVelocity -= FRICTION
                        }
                        if (move.leftVelocity < 0.25) {
                            move.leftVelocity = 0
                        } else {
                            newState.screen.x -= move.leftVelocity * s
                        }
                    }
                }
            } else {
                if (move.left && !move.airBorn) {
                    move.leftVelocity += VELOCITY
                    if (move.leftVelocity < TOPSPEED) {
                        move.leftVelocity += ACCELERATION
                    } else {
                        move.leftVelocity = TOPSPEED
                    }
                    newState.player.x -= move.leftVelocity * s
                } else {
                    if (move.leftVelocity > 0) {
                        if (!move.airBorn) {
                            move.leftVelocity -= FRICTION
                        }
                        if (move.leftVelocity < 0.25) {
                            move.leftVelocity = 0
                        } else {
                            newState.player.x -= move.leftVelocity * s
                        }
                    }
                }
            }

            if (newState.player.x >= newState.screen.right) {
                if (move.right && !move.airBorn) {
                    move.rightVelocity += VELOCITY
                    if (move.rightVelocity < TOPSPEED) {
                        move.rightVelocity += ACCELERATION
                    } else {
                        move.rightVelocity = TOPSPEED
                    }
                    newState.screen.x += move.rightVelocity * s
                } else {
                    if (move.rightVelocity > 0) {
                        if (!move.airBorn) {
                            move.rightVelocity -= FRICTION
                        }
                        if (move.rightVelocity < 0.25) {
                            move.rightVelocity = 0
                        } else {
                            newState.screen.x += move.rightVelocity * s
                        }
                    }
                }
            } else {
                if (move.right && !move.airBorn) {
                    move.rightVelocity += VELOCITY
                    if (move.rightVelocity < TOPSPEED) {
                        move.rightVelocity += ACCELERATION
                    } else {
                        move.rightVelocity = TOPSPEED
                    }
                    newState.player.x += move.rightVelocity * s
                } else {
                    if (move.rightVelocity > 0) {
                        if (!move.airBorn) {
                            move.rightVelocity -= FRICTION
                        }
                        if (move.rightVelocity < 0.25) {
                            move.rightVelocity = 0
                        } else {
                            newState.player.x += move.rightVelocity * s
                        }
                    }
                }
            }


            // console.log('Left vel:', move.leftVelocity, 'Right vel:', move.rightVelocity)

            // JUMPING ---------------------------------
            if (!move.airBorn && newState.player.y === GROUNDED && move.up) {
                move.airBorn = true
                move.jumpVelocity = JUMPPOWER * 2
            }

            if (move.airBorn) {
                if (move.up) {
                    newState.player.y -= move.jumpVelocity
                    move.jumpVelocity -= GRAVITY * s
                    if (move.jumpVelocity <= 0) {
                        move.up = false
                    }
                }
                if (!move.up) {
                    move.jumpVelocity += GRAVITY * s
                    newState.player.y += move.jumpVelocity
                    if (newState.player.y >= GROUNDED) {
                        newState.player.y = GROUNDED
                        move.airBorn = false
                        move.up = false
                    }
                }
            }
            setState(newState)
        }

        window.addEventListener('keydown', keyDOWN)
        window.addEventListener('keyup', keyUP)

        const timerId = setInterval(handleInterval, 32)

        return () => {
            window.removeEventListener('keydown', keyDOWN)
            window.removeEventListener('keyup', keyUP)
            clearInterval(timerId)
        }
    }, [])


    const Player = () => {
        return (
            <>
                <TextBox />
                <div
                    className={styles.player}
                    style={{
                        top: `${toRem(state.player.y)}`,
                        left: toRem(state.player.x),
                        height: toRem(state.player.height),
                        width: toRem(state.player.width),
                        backgroundSize: toRem(state.player.height) + ' ' + toRem(state.player.width)
                    }}
                >
                </div>
            </>
        )
    }
    const TextBox = () => {
        const TBmargin: number = 50
        if (state.typing) {
            return (
                <div
                    className={styles.textBox}
                    style={{
                        top: toRem(state.player.y - TBmargin - THEIGHT),
                        left: toRem(state.player.x - TWIDTH / 2),
                        height: toRem(THEIGHT),
                        width: toRem(TWIDTH),
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left',
                        fontSize: '1rem',
                        color: 'black',
                        padding: '1rem'
                    }}
                >
                    {/* <input type="text" /> */}
                    {state.player.input}
                </div>
            )
        }
    }

    const BackGround = () => {
        return (
            <div className={styles.BGcontainer}
                style={{
                    left: toRem(state.screen.x)
                }}>
                <div
                    className={styles.backGround}
                    style={{
                        top: toRem(BG_TOP),
                        height: toRem(BG_HEIGHT)
                    }}
                >
                </div>
                <div
                    className={styles.ground}
                    style={{
                        top: toRem(GTOP),
                        height: toRem(G_HEIGHT),
                    }}
                >
                </div>
            </div>

        )
    }

    return (
        <div>
            <div className={styles.gameScene}>
                <Player />
                <BackGround />
            </div>
            <div style={{
                position: 'relative',
                left: '0',
                float: 'left',
                display: 'flex',
                gap: '20px'
            }}>
                <div>pX:{state.player.x}</div>
                <div>pY:{state.player.y}</div>
                <div>lv:{state.player.movement.leftVelocity}</div>
                <div>rv:{state.player.movement.rightVelocity}</div>
                <div>sX:{state.screen.x}</div>
                <div>GR:{GROUNDED}</div>
                <div>HE:{HEIGHT}</div>
            </div>
        </div>

    )
}