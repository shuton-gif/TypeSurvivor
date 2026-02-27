'use client'
import styles from './game.module.css';
import { VOCAB, handleRomaji } from './spells';
import { useState, useEffect, useRef } from "react";
//------------ CSS ---------------
//BACK GROUND
const BGTOP: number = 0
const BGHEIGHT: number = 450
//GROUND ------------------
const GTOP: number = 450
const GHEIGHT: number = 150
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
const HEIGHT: number = 60;
const WIDTH: number = 42.6;
const INITIALX: number = 300;
const GROUNDED: number = GTOP - HEIGHT;
const HP: number = 10;

type Player = {
    x: number,
    y: number,
    height: number,
    width: number,
    HP: number,
    input: string,
}
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
type Enemy = {
    x: number,
    y: number,
    HP: number,
    level: number,
    problem: string,
}

type Screen = {
    x: number,
    y: number
}

type GameState = {
    player: Player,
    enemy?: Enemy[],
    scores: number,
    typing: boolean,
    screen?: Screen,
    scale: number,
    romaji: boolean
}


const intersected = function (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number) {
    const ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
    const tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
    const tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
    const td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
    return tc * td <= 0 && ta * tb <= 0;
}
const toRem = (param: number, scale?: number): string => {
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
        },
        scores: 0,
        typing: false,
        screen: { x: 0, y: 0 },
        scale: 1,
        romaji: false,
    })
    const [movement, setMovement] = useState<Movement>({
        up: false,
        down: false,
        left: false,
        right: false,
        jump: false,
        airBorn: false,
        jumpVelocity: 0,
        leftVelocity: 0,
        rightVelocity: 0,
    })

    const stateRef = useRef<GameState>(state)
    const movementRef = useRef<Movement>(movement)

    useEffect(() => {
        stateRef.current = state
        movementRef.current = movement
    })

    useEffect(() => {
        const movement = movementRef.current
        const keyDOWN = (e: KeyboardEvent) => {
            const state = stateRef.current

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
                    setMovement(prev => {
                        if (!prev.left && !movement.airBorn) {
                            return { ...prev, left: true, right: false }
                        }
                        return prev
                    })
                }
                if (e.code === 'KeyD') {
                    setMovement(prev => {
                        if (!prev.right && !movement.airBorn) {
                            return { ...prev, right: true, left: false }
                        }
                        return prev
                    })
                }

                if (e.code === 'Space') {
                    setMovement(prev => (prev.up || prev.airBorn) ? prev : ({ ...prev, up: true }))
                }
            }

            if (e.code === 'Enter') {
                setState(prev => {
                    const newTyping = !prev.typing
                    return { ...prev, typing: newTyping }
                })
                setMovement(prev => ({ ...prev, up: false, left: false, right: false }))
            }
        }

        const keyUP = (e: KeyboardEvent) => {
            if (e.code === 'KeyA') {
                setMovement(prev => ({ ...prev, left: false }))
            }
            if (e.code === 'KeyD') {
                setMovement(prev => ({ ...prev, right: false }))
            }
        }

        const handleInterval = () => {
            const state = stateRef.current
            const movement = movementRef.current
            let newState = {
                ...state,
            }
            let newMovement = {
                ...movement,
            }
            let s: number = newState.scale;

            if (newMovement.left && !newMovement.airBorn) {
                newMovement.leftVelocity += VELOCITY
                if (newMovement.leftVelocity < TOPSPEED) {
                    newMovement.leftVelocity += ACCELERATION
                } else {
                    newMovement.leftVelocity = TOPSPEED
                }
                newState.player.x -= newMovement.leftVelocity * s
            } else {
                if (newMovement.leftVelocity > 0) {
                    if (!newMovement.airBorn) {
                        newMovement.leftVelocity -= FRICTION
                    }
                    if (newMovement.leftVelocity < 0.25) {
                        newMovement.leftVelocity = 0
                    } else {
                        newState.player.x -= newMovement.leftVelocity * s
                    }
                }
            }

            if (newMovement.right && !newMovement.airBorn) {
                newMovement.rightVelocity += VELOCITY
                if (newMovement.rightVelocity < TOPSPEED) {
                    newMovement.rightVelocity += ACCELERATION
                } else {
                    newMovement.rightVelocity = TOPSPEED
                }
                newState.player.x += newMovement.rightVelocity * s
            } else {
                if (newMovement.rightVelocity > 0) {
                    if (!newMovement.airBorn) {
                        newMovement.rightVelocity -= FRICTION
                    }
                    if (newMovement.rightVelocity < 0.25) {
                        newMovement.rightVelocity = 0
                    } else {
                        newState.player.x += newMovement.rightVelocity * s
                    }
                }
            }

            // console.log('Left vel:', newMovement.leftVelocity, 'Right vel:', newMovement.rightVelocity)

            // JUMPING ---------------------------------
            if (!newMovement.airBorn && newState.player.y === GROUNDED && newMovement.up) {
                newMovement.airBorn = true
                newMovement.jumpVelocity = JUMPPOWER * 2
            }

            if (newMovement.airBorn) {
                if (newMovement.up) {
                    newState.player.y -= newMovement.jumpVelocity
                    newMovement.jumpVelocity -= GRAVITY * s
                    if (newMovement.jumpVelocity <= 0) {
                        newMovement.up = false
                    }
                }
                if (!newMovement.up) {
                    newMovement.jumpVelocity += GRAVITY * s
                    newState.player.y += newMovement.jumpVelocity
                    if (newState.player.y >= GROUNDED) {
                        newState.player.y = GROUNDED
                        newMovement.airBorn = false
                        newMovement.up = false
                    }
                }
            }
            // console.log(newState.typing)
            // console.log(newMovement.left)
            // console.log(newMovement.right)
            // console.log(toRem(newState.player.y))
            // console.log(newMovement.left)
            // console.log(newMovement.right)
            setState(newState)
            setMovement(newMovement)
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
            <div className={styles.BGcontainer}>
                <div
                    className={styles.backGround}
                    style={{
                        top: toRem(BGTOP),
                        height: toRem(BGHEIGHT)
                    }}
                >
                </div>
                <div
                    className={styles.ground}
                    style={{
                        top: toRem(GTOP),
                        height: toRem(GHEIGHT),
                    }}
                >
                </div>
            </div>

        )
    }

    return (
        <>
            <Player />
            <BackGround />
        </>
    )
}