/**
 * Taibit blocks
 */
//% weight=10 color=#0fbc11 icon=""
namespace taibit {
    /** function - delay led */
    function delay_LED(item: number) {
        led.plot(item, 2)
        basic.pause(200)
        led.unplot(item, 2)
    }

    /**
      * Show LED Matrix to back and forth for n times
      * @param ns describe parameter here, eg: 2
      */
    //% blockId="delay_leds" block="delay leds (ns)| %ns"
    export function delayleds(ns: number) {
        while (ns > 0) {
            for (let i = 0; i <= 4; i++) {
                delay_LED(i)
            }
            for (let i = 4; i >= 0; i--) {
                delay_LED(i)
            }
            ns--
        }
    }

    /** function - Vibration Motor */
    function vibration_Motor(sw: number) {
        if (sw > 1) {
            return
        }
        pins.digitalWritePin(DigitalPin.P12, sw)
    }

    /**
      * Control Vibration Motor (pin12) => on | off
      * @param sw describe parameter here, eg: 0
    */
    //% blockId="vibration_motor" block="vibration motor (sw)| %sw"
    export function vibrationMotor(sw: number) {
        vibration_Motor(sw)
    }

    /**
      * Control Vibration Motor (pin12) => pause millisecond
      * @param ms describe parameter here, eg: 100
    */
    //% blockId="vibration_motor_pause" block="vibration motor pause (ms)| %ms"
    export function vibrationMotorPause(ms: number) {
        vibration_Motor(1)
        basic.pause(ms)
        vibration_Motor(0)
    }

} 
