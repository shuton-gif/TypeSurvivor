'use client'
import { useState } from 'react'
import styles from './animation.module.css'
import { GameState } from './game'

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

export function Animator({ gameState }: AnimatorProps) {
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
        return (
            <div style={{
                backgroundColor: 'red',
                top: `${gameState.player.y}px`,
                left: `${gameState.player.x}px`,
                position: 'absolute'
            }}>
                <div className={styles.eyes}>
                </div>
            </div>
        )
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
        <div className={styles.animation}>
            <div className={styles.body}>
                <Head />

            </div>
        </div>
    )
}