// Modified from https://github.com/trekhleb/trekhleb.github.io/blob/7b151f8ac9024c24b1df818f9308bcaf2d354943/src/posts/2021/gyro-web/components/GryoCube.tsx

'use client'

import React from 'react'
import { useDeviceOrientation } from './useDeviceOrientation'
import OrientationSwitcher from './OrientationSwitcher'
import styles from './GyroCube.module.css'

const GyroCube = (): React.ReactElement | null => {
  const {
    orientation,
    requestAccess,
    revokeAccess,
    cssTransformInverse,
  } = useDeviceOrientation()

  const onToggle = (toggleState: boolean): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = toggleState ? requestAccess() : revokeAccess()
  }

  return (
    <div>
      <OrientationSwitcher
        onToggle={onToggle}
        labelOff="Turn the Gyro-Cube ON"
        labelOn="Turn the Gyro-Cube OFF"
      />

      <ul>
        <li>α/z: {orientation?.alpha?.toFixed(2)}</li>
        <li>β/x': {orientation?.beta?.toFixed(2)}</li>
        <li>γ/y'': {orientation?.gamma?.toFixed(2)}</li>
      </ul>

      <div className={styles.container}>
        <div className={styles.cube} style={cssTransformInverse}>
          <div className={styles.front}>Front</div>
          <div className={styles.back}>Back</div>
          <div className={styles.left}>Left</div>
          <div className={styles.right}>Right</div>
          <div className={styles.top}>Top</div>
          <div className={styles.bottom}>Bottom</div>
        </div>
      </div>
    </div>
  )
}

export default GyroCube
