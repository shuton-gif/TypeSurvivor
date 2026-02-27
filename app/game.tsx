'use client'
import styles from './game.module.css';
import { useState, useEffect, useRef } from "react";
//------------ CSS ---------------
//BACK GROUND
const BGTOP: number = 0
const BGHEIGHT: number = 450
//GROUND ------------------
const GTOP: number = 450
const GHEIGHT: number = 9.375 * 16
//TEXT BOX -----------------
const THEIGHT: number = 50
const TWIDTH: number = 200

//------------ ENERTIA -------------
const VELOCITY: number = 5;
const GRAVITY: number = 10;
const SLOW: number = 0.7; //30% slow

//----------- PLAYER -------------
const HEIGHT: number = 60;
const WIDTH: number = 30;
const HP: number = 10;


type Player = {
    x: number,
    y: number,
    height: number,
    width: number,
    HP: number,
}
type Movement = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    jump: boolean
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

export function Game() {
    const [state, setState] = useState<GameState>({
        player: {
            x: 0,
            y: GTOP - HEIGHT,
            height: HEIGHT,
            width: WIDTH,
            HP: HP,
        },
        scores: 0,
        typing: false,
        screen: { x: 0, y: 0 },
        scale: 1
    })
    const [movement, setMovement] = useState<Movement>({
        up: false,
        down: false,
        left: false,
        right: false,
        jump: false,
    })
    // const [input, setInput] = useState()

    const stateRef = useRef<GameState>(state)
    const movementRef = useRef<Movement>(movement)

    useEffect(() => {
        stateRef.current = state
        movementRef.current = movement
    })

    useEffect(() => {
        const movement = movementRef.current
        const state = stateRef.current
        const keyDOWN = (e: KeyboardEvent) => {
            if (e.code === 'KeyA') {
                setMovement({
                    ...movement,
                    left: true
                })
            }
            if (e.code === 'KeyD') {
                setMovement({
                    ...movement,
                    right: true
                })
            }
            if (e.code === 'Enter') {
                setState({
                    ...state,
                    typing: true ? !state.typing : false ? state.typing : false,
                })
            }
            if (e.code === 'Space') {
                setMovement(prev => prev.jump ? prev : ({ ...prev, jump: true }))
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

            // MOVEMENT ---------------------------------
            if (newMovement.left) {
                newState.player.x -= VELOCITY
            }
            if (newMovement.right) {
                newState.player.x += VELOCITY
            }
            if (!newMovement.jump) {
                if (newMovement.jump) {
                    newState = {
                        ...newState,
                        player: {
                            ...newState.player,
                            y: newState.player.y + VELOCITY
                        }
                    }
                }
            }
            console.log(toRem(newState.player.y))
            // console.log(newMovement.left)
            // console.log(newMovement.right)
            setState(newState)
            setMovement(newMovement)
        }

        window.addEventListener('keydown', keyDOWN)
        window.addEventListener('keyup', keyUP)

        const timerId = setInterval(handleInterval, 60)

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
        const TBpadding: number = 20
        if (state.typing) {
            return (
                <div
                    className={styles.textBox}
                    style={{
                        top: toRem(state.player.y - (TBpadding + THEIGHT)),
                        left: toRem(state.player.x),
                        height: toRem(THEIGHT),
                        width: toRem(TWIDTH),
                    }}
                >
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