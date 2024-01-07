import styles from './page.module.css'

import GyroCube from '@/components/gyro/GyroCube'

export default function Home() {
  return (
    <main className={styles.main}>
      <GyroCube/>
    </main>
  )
}
