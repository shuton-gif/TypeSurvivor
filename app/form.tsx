'use client'
import { useRouter } from 'next/navigation'
import styles from './form.module.css'
import { GameState } from './game/game'

export default function Form() {
    const router = useRouter()


    return (
        <div className={styles.formContainer}>
            <div onClick={() => router.push('/game')}>GAME</div>
            <div onClick={() => router.push('/chacterMaker')}>MAKE CHARACTOR</div>
        </div>
    )
}