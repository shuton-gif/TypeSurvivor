'use client'
import { toRem } from "../../game/game"
import styles from '../objectMaker.module.css'

interface ColorSetterProps {
    color: string
    isActive: boolean
    isEraser?: boolean
    onSelect: (color: string) => void
}

export function ColorSetter({ color, isActive, onSelect, isEraser }: ColorSetterProps) {
    return (
        <div
            className={styles.colorSetter}
            style={{
                height: toRem(25),
                width: toRem(25),
                backgroundImage: isEraser ? 'url(/assets/eraser.webp)' : undefined,
                backgroundSize: isEraser ? 'cover' : undefined,
                backgroundPosition: isEraser ? 'center' : undefined,
                backgroundRepeat: isEraser ? 'no-repeat' : undefined,
                backgroundColor: !isEraser ? (color === 'transparent' ? 'gray' : color) : 'transparent',
                border: isActive ? '2px solid black' : '1px solid #ccc',
                cursor: 'pointer'
            }}
            onClick={() => onSelect(color)}
        />
    )
}