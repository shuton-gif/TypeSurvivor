'use client'
import { toRem } from "../../game/game"
import styles from '../objectMaker.module.css'

interface ColorSetterProps {
    color: string
    isActive: boolean
    onSelect: (color: string) => void
}

export function ColorSetter({ color, isActive, onSelect }: ColorSetterProps) {
    return (
        <div
            className={styles.colorSetter}
            style={{
                height: toRem(25),
                width: toRem(25),
                backgroundColor: `${color === 'transparent' ? 'gray' : color}`,
                border: isActive ? '2px solid black' : 'none'
            }}
            onClick={() => onSelect(color)}
        />
    )
}