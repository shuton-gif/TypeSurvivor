'use client'
import { Game } from "./game"
import styles from '../page.module.css'

function GameContainer({ children }: { children?: React.ReactNode }) {
    return (
        <div className={styles.world}>{children}</div>
    )
}

export default function GamePage() {
    return (
        <GameContainer>
            <Game />
        </GameContainer>
    )
}