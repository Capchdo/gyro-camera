import styles from './page.module.css'

import GyroCube from '@/components/gyro/GyroCube'
import Camera from '@/components/camera/camera'

export default function Home() {
  return (
    <main className={styles.main}>
      <GyroCube />
      <Camera />
    </main>
  )
}
