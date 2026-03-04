'use client'
import { JSX, useState } from 'react'
import styles from './animation.module.css'
import { GameState, toRem } from '../game/game'

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

export function PlayerAnimator({ gameState }: AnimatorProps) {
    //height 6
    //width 4.26
    //head 3
    //torso 3
    const {
        player: {
            x,
            y,
            height,
            width,
            HP,
            input,
            movement: {
                up,
                down,
                left,
                right,
                jump,
                airBorn,
                jumpVelocity,
                leftVelocity,
                rightVelocity,
            }
        },
        enemy,
        scores,
        typing,
        screen,
        scale,
        romaji,
    } = gameState;
    const CHARAC_CENTER_HEIGHT = height / 2;
    const CHARAC_CENTER_WIDTH = width / 2;
    // const [bone, setBone] = useState<BodyParts>({
    //     head: {
    //         boneStart: { x: 0, y: 0 },
    //         boneEnd: { x: 0, y: 0 }
    //     },
    //     torso: {
    //         boneStart: { x: 0, y: 0 },
    //         boneEnd: { x: 0, y: 0 }
    //     }
    // })

    function Head() {
        // const eyePosition = (headPosiotion: number, headSize: number): number[] => {
        //     const leftEye: number = headPosiotion / 2 - headSize * 0.2;
        //     const rightEye: number = headPosiotion / 2 + headSize * 0.2;
        //     return [leftEye, rightEye]
        // }
        // MOVING LEFT ------------------------------
        if (left) {
            return (
                <div className={`${styles.head} ${styles.headRockLeft}`} style={{
                    backgroundColor: 'white',
                    height: toRem(height / 2),
                    width: toRem(width),
                    top: toRem(y),
                }}>
                    <div className={styles.eyes}
                        style={{

                        }}
                    ></div>
                </div>
            )
            // MOVING RIGHT ------------------------------
        } else if (right) {
            return (
                <div className={`${styles.head} ${styles.headRockRight}`} style={{
                    backgroundColor: 'white',
                    height: toRem(height / 2),
                    width: toRem(width),
                    top: toRem(y),
                }}>
                    <div className={styles.eyes}>
                    </div>
                </div>
            )
            //　IDLE ------------------------------
        } else {
            return (
                <div style={{
                    backgroundColor: 'white',
                    
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
                backgroundColor: 'white',
                top: toRem(height/2), //middle of the body... head : torso = 1 : 1
                height: toRem(height/2),
                width: toRem(width)
            }}></div>
        )
    }

    function Player() {
        if (!airBorn) {
            if (left) {
                return (
                    <>
                        <Head />
                        <Torso />
                    </>
                )
            } else if (right) {
                return (
                    <>
                        <Head />
                        <Torso />
                    </>
                )
            } 
        }
    }

    return (
        <div
            className={styles.charContainer}
            style={{
                top: toRem(y),
                left: toRem(x),
                height: toRem(height),
                width: toRem(width),
                backgroundSize: toRem(height) + ' ' + toRem(width)
            }}>
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