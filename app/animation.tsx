'use client'
import { JSX, useState } from 'react'
import styles from './animation.module.css'
import { GameState, toRem, GTOP } from './game'

type Bone = {
    boneStart: { x: number, y: number },
    boneEnd: { x: number, y: number }
}

type BodyParts = {
    head: Bone,
    torso: Bone,
    leftArm?: Bone,
    rightArm?: Bone
}

type AnimatorProps = {
    gameState: GameState
}

function QuadTyle(top: number, height: number, width: number, color: string = 'black') {
    return (
        <div style={{
            position: 'absolute',
            backgroundColor: color,
            top: toRem(top),
            height: toRem(height),
            width: toRem(width)
        }}></div>
    )
}

function Grid() {
    // ex) player 
    // const HEIGHT: number = 60; 
    // const WIDTH: number = 42.6;
    // if i want 10 x grids that i can put pixels onto
    // and 10 y grids 
    // one grid will be the size of
    //  6 : 4.26 
}

export function Charactor({ gameState }: AnimatorProps) {
    const [bone, setBone] = useState<BodyParts>({
        head: {
            boneStart: { x: 0, y: 0 },
            boneEnd: { x: 0, y: 0 }
        },
        torso: {
            boneStart: { x: 0, y: 0 },
            boneEnd: { x: 0, y: 0 }
        }
    })

    function Head() {
        const eyePosition = (headPosiotion: number, headSize: number): number[] => {
            const leftEye: number = headPosiotion / 2 - headSize * 0.2;
            const rightEye: number = headPosiotion / 2 + headSize * 0.2;
            return [leftEye, rightEye]
        }
        // MOVING LEFT ------------------------------
        if (gameState.player.movement.left) {
            return (
                <div style={{
                    backgroundColor: 'red',
                    height: toRem(gameState.player.height / 2),
                    top: toRem(gameState.player.y)
                }}>
                    <div className={styles.eyes}
                        style={{

                        }}
                    ></div>
                </div>
            )
            // MOVING RIGHT ------------------------------
        } else if (gameState.player.movement.right) {
            return (
                <div style={{
                    backgroundColor: 'red'
                }}>
                    <div className={styles.eyes}>
                    </div>
                </div>
            )
            //　IDLE ------------------------------
        } else {
            return (
                <div style={{
                    backgroundColor: 'red'
                }}>
                    <div className={styles.eyes}>
                    </div>
                </div>
            )
        }
    }

    function Torso() {
        return (
            <div style={{
                backgroundColor: 'blue',
                position: 'absolute'
            }}>
            </div>
        )
    }

    return (
        <div
            className={styles.charContainer}
            style={{
                top: `${toRem(gameState.player.y)}`,
                left: toRem(gameState.player.x),
                height: toRem(gameState.player.height),
                width: toRem(gameState.player.width),
                backgroundSize: toRem(gameState.player.height) + ' ' + toRem(gameState.player.width)
            }}>
            <div className={styles.body}>
                <Head />

            </div>
        </div>
    )
}

export function GrassAnimator(playSpeed: number) {
    function GrassStrip(height: number, width: number, color: string) {
        return (
            <>
                <div style={{
                    position: 'absolute',
                    width: toRem(width),
                    height: toRem(height),
                    backgroundColor: `${color}`
                }}></div>
            </>
        )
    }


    function Grass(offsets: number) {
        let grass: Array<JSX.Element> = []
        for (let i = 0; i < offsets; i++) {
            grass.push(GrassStrip(10, 10, 'green'))
        }
        return <>{grass}</>
    }
}