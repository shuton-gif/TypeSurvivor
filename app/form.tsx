'use client'
import { useRouter } from 'next/navigation'
import styles from './form.module.css'

export default function Form() {
    const router = useRouter()

    return (
        <div className={styles.formContainer}>
            <div className={styles.gameFont} onClick={() => router.push('/game')}>GAME</div>
            <div className={styles.CMakerFont} onClick={() => router.push('/characterMaker')}>MAKE CHARACTOR</div>
            <div className={styles.CMakerFont} onClick={() => router.push('/objectMaker')}>MAKE OBJECT</div>
        </div>
    )
}