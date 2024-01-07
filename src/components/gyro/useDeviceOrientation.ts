// Modified from https://github.com/trekhleb/trekhleb.github.io/blob/7b151f8ac9024c24b1df818f9308bcaf2d354943/src/posts/2021/gyro-web/components/useDeviceOrientation.ts

import {
  CSSProperties,
  useCallback,
  useEffect,
  useState,
} from 'react'

// @see: https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
export type DeviceOrientation = {
  absolute: boolean,
  alpha: number | null,
  beta: number | null,
  gamma: number | null,
}

type UseDeviceOrientationData = {
  orientation: DeviceOrientation | null,
  error: Error | null,
  cssTransformInverse: CSSProperties,
  // The requestAccess() could only be called on a user gesture (e.g. on click).
  // @see: https://developer.apple.com/forums/thread/128376
  requestAccess: () => Promise<boolean>,
  revokeAccess: () => Promise<void>,
}

export const useDeviceOrientation = (): UseDeviceOrientationData => {
  const [error, setError] = useState<Error | null>(null)
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null)
  const [cssTransformInverse, setCssTransformInverse] = useState<CSSProperties>({})

  const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
    const {
      alpha,
      beta,
      gamma,
      absolute
    } = event
    setOrientation({
      alpha,
      beta,
      gamma,
      absolute
    })

    if (typeof alpha === 'number'
      && typeof beta === 'number'
      && typeof gamma === 'number'
    ) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Using_device_orientation_with_3D_transforms#using_orientation_to_rotate_an_element
      setCssTransformInverse({
        transform: `rotateY(${-gamma}deg) rotateX(${beta}deg) rotateZ(${alpha}deg)`,
      })
    }
  }

  const revokeAccessAsync = async (): Promise<void> => {
    window.removeEventListener('deviceorientation', onDeviceOrientation)
    setOrientation(null)
    setCssTransformInverse({})
  }

  const requestAccessAsync = async (): Promise<boolean> => {
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'))
      return false
    }

    // Requesting the permission to access device orientation in iOS.
    // @see: https://developer.apple.com/forums/thread/128376
    if (
      // @ts-ignore
      DeviceOrientationEvent.requestPermission
      // @ts-ignore
      && typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      let permission: PermissionState
      try {
        // @ts-ignore
        permission = await DeviceOrientationEvent.requestPermission()
      } catch (err) {
        // @ts-ignore
        const e = new Error((err && err.message) || 'unknown error')
        setError(e)
        return false
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'))
        return false
      }
    }

    window.addEventListener('deviceorientation', onDeviceOrientation)

    return true
  }

  const requestAccess = useCallback(requestAccessAsync, [])
  const revokeAccess = useCallback(revokeAccessAsync, [])

  useEffect(() => {
    return (): void => {
      revokeAccess()
    }
  }, [revokeAccess])

  return {
    orientation,
    error,
    requestAccess,
    revokeAccess,
    cssTransformInverse,
  }
}
