/**
    Button A: play melody
    Button B: show led and turn on vibration motor
    Button A+B: increment by 1
    Shake: led scanner
*/

let a: number
a = 0
basic.forever(() => {
    basic.pause(100)
})

function showled()  {
    basic.clearScreen()
    basic.showIcon(IconNames.Square)
    basic.pause(100)
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(100)
    images.createImage(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `).showImage(0)
    basic.pause(100)
    led.unplot(2, 2)
}

input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
    music.beginMelody(music.getMelody(a), MelodyOptions.Once)
    basic.showNumber(a + 1)
})

input.onButtonPressed(Button.B, () => {
    showled()
    taibit.vibrationMotorPause(1000)
})

input.onButtonPressed(Button.AB, () => {
    basic.clearScreen()
    a = (a + 1) % 20
    basic.showNumber(a + 1)
})

input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
    taibit.delayleds(2)
})
