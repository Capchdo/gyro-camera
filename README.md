# Gyro-Camera

A camera with orientation, leveraging Web APIs.

## Technical notes

Currently, there are two sets of Web APIs about orientation.

- [**Device orientation events**](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events) and [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)

  - Early 2010s standard; [only partially supported (≈ deprecated)](https://caniuse.com/deviceorientation) in 2020s.

    It precedes the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API), and Safari use a nonstandard `requestPermission()` static method to solve the problem.

  - It gives [Euler angles](https://en.wikipedia.org/wiki/Euler_angles).

- [**Sensor APIs**](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs) and [`RelativeOrientationSensor`](https://developer.mozilla.org/en-US/docs/Web/API/RelativeOrientationSensor)

    - Late 2010s standard; [not supported by Firefox and Safari](https://caniuse.com/orientation-sensor) yet.

    - It gives [quaternion](https://en.wikipedia.org/wiki/Quaternion).

This project uses `DeviceOrientationEvent`.
