'use client'

import Webcam from 'react-webcam'

export default function Camera() {
    return (
        <Webcam videoConstraints={{ facingMode: "environment" }} />
    )
}
