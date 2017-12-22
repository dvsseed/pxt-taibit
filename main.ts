
/******************************************
*                                         *
*  Custom blocks by Javier Piay (12-2017) *
*                                         *
* *****************************************/

//% weight=130 color=#0fbc11 icon="\uf26c"
namespace taibit {
    //% weight=100 blockId="id_setdisplay" block="set mode %mode | background color %bc | foreground color %fc"
    export function fn_setDisplay(mode: number, bc: number, fc: number): void {
        serial.writeString("\x1B[" + mode + ";" + bc + ";" + fc + "m");
    }
    //% weight=95 blockId="id_moveto" block="move to x %x | y %y"
    export function fn_moveTo(x: number, y: number): void {
        serial.writeString("\x1B[" + y + ";" + x + "H");
    }
    //% weight=90 blockId="id_showtext" block="show text %s"
    export function fn_showText(s: string): void {
        serial.writeString(s);
    }
    //% weight=85 blockId="id_shownumber" block="show number %n"
    export function fn_showNumber(n: number): void {
        serial.writeString(n.toString());
    }
    //% weight=80 blockId="id_showascii" block="show ascci %n"
    export function fn_showAscii(n: number): void {
        serial.writeString(String.fromCharCode(n));
    }
    //% weight=75 blockId="id_hidecursor" block="hide cursor"
    export function fn_hideCursor(): void {
        serial.writeString("\x1B[?25l");
    }
    //% weight=70 blockId="id_showcursor" block="show cursor"
    export function fn_showCursor(): void {
        serial.writeString("\x1B[?25h");
    }
    //% weight=65 blockId="id_erasescreen" block="erase terminal"
    export function fn_eraseScreen(): void {
        serial.writeString("\x1B[2J");
    }
    //% weight=60 blockId="id_eraseup" block="erase up"
    export function fn_eraseUp(): void {
        serial.writeString("\x1B[1J");
    }
    //% weight=55 blockId="id_erasedown" block="erase down"
    export function fn_eraseDown(): void {
        serial.writeString("\x1B[J");
    }
    //% weight=50 blockId="id_eraseline" block="erase line"
    export function fn_eraseLine(): void {
        serial.writeString("\x1B[2K");
    }
    //% weight=45 blockId="id_eraseright" block="erase right"
    export function fn_eraseRight(): void {
        serial.writeString("\x1B[K");
    }
    //% weight=40 blockId="id_eraseleft" block="erase left"
    export function fn_eraseLeft(): void {
        serial.writeString("\x1B[1K");
    }
}
//% weight=120 color=#0fbc11 icon="\uf009"
namespace Two_digits {
    let off = 0
    let pos = 0
    let digit = 0
    let x = 0
    let y = 0
    let scroll = 0
    let br = 0
    let n_scroll = 0
    let t_scroll = 0
    let num = 0
    let arr_digits: number[] = []
    let arr_leds: number[] = []
    function fn_set_digit() {
        for (let index = 0; index <= 9; index++) {
            if (index == digit) {
                arr_digits[index] = 0
            } else {
                arr_digits[index] = 1
            }
        }
        arr_leds[0] = arr_digits[1]
        arr_leds[1] = arr_digits[4]
        arr_leds[2] = arr_digits[1] * (arr_digits[2] * (arr_digits[3] * arr_digits[7]))
        arr_leds[3] = arr_digits[4] * (arr_digits[5] * arr_digits[6])
        arr_leds[4] = arr_digits[1] * (arr_digits[7] * arr_digits[8])
        arr_leds[5] = arr_digits[8]
        arr_leds[6] = arr_digits[1] * (arr_digits[3] * (arr_digits[4] * (arr_digits[5] * (arr_digits[7] * arr_digits[9]))))
        arr_leds[7] = arr_digits[2]
        arr_leds[8] = arr_digits[1] * (arr_digits[4] * arr_digits[7])
        arr_leds[9] = 1
    }
    function fn_show_sign() {
        led.plotBrightness(1, 2, br)
        led.plotBrightness(2, 2, br)
        led.plotBrightness(3, 2, br)
    }
    function fn_show_digit() {
        for (let index = 0; index <= 9; index++) {
            y = index / 2
            x = index % 2
            if (arr_leds[index] == 1) {
                led.plotBrightness(x + pos, y, br)
            }
        }
    }
    //% blockId="fn_show_num" block="show number %_num | brightness %_br | scroll (if > 2 digits) %_n_scroll | scroll delay %_t_scroll"
    export function fn_show_num(_num: number, _br: number, _n_scroll: number, _t_scroll: number) {
        num = _num
        br = _br
        n_scroll = _n_scroll
        t_scroll = _t_scroll
        arr_digits = []
        arr_leds = []
        for (let index = 0; index <= 9; index++) {
            arr_digits.push(0)
            arr_leds.push(0)
        }
        if (Math.abs(num) < 100) {
            scroll = 0
        } else {
            scroll = 1
        }
        for (let index2 = 0; index2 <= (n_scroll - 1) * scroll; index2++) {
            off = 5 * scroll
            if (num < 0) {
                basic.clearScreen()
                fn_show_sign()
                basic.pause(500)
            }
            for (let index = 0; index <= 20 * scroll; index++) {
                basic.clearScreen()
                off = (5 - index) * scroll
                pos = off - 0
                if (Math.abs(num) >= 1000) {
                    pos = pos + 0
                    digit = Math.abs(num) / 1000
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) / 100 % 10
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) / 10 % 10
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) % 10
                    fn_set_digit()
                    fn_show_digit()
                } else if (Math.abs(num) >= 100) {
                    pos = pos + 0
                    digit = Math.abs(num) / 100 % 10
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) / 10 % 10
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) % 10
                    fn_set_digit()
                    fn_show_digit()
                } else {
                    pos = pos + 0
                    digit = Math.abs(num) / 10 % 10
                    fn_set_digit()
                    fn_show_digit()
                    pos = pos + 3
                    digit = Math.abs(num) % 10
                    fn_set_digit()
                    fn_show_digit()
                }
                basic.pause(t_scroll)
            }
        }
    }
}
//% weight=110 color=#0fbc11 icon="\uf10c"
namespace Bits {
    enum digit_value {
        //% block="zero"
        zero,
        //% block="one"
        one,
        //% block="complement"
        com
    }
    let hex_arr = "0123456789abcdef"
    let dec_num = 0
    //% weight=100 blockId="id_raiseto" block="%base | raised to %exp"
    export function fn_raiseto(base: number, exp: number): number {
        return Math.pow(base, exp)
    }
    //% weight=90 blockId="id_getbit" block="get bit %pos | in %num"
    export function fn_getbit(pos: number, num: number): number {
        return (num >> pos) & 1
    }
    //% weight=80 blockId="id_setbit" block="set bit %pos | in %num | to %dv"
    export function fn_setbit(pos: number, num: number, dv: digit_value): number {
        if (dv == digit_value.zero)
            return num & ((1 << pos) ^ 0xffff)
        else if (dv == digit_value.one)
            return num | (1 << pos)
        else
            return num ^ (1 << pos)
    }
    //% weight=70 blockId="id_hextodec" block="convert hexadecimal %hex_num | to decimal"
    export function fn_hextodec(hex_num: string): number {
        dec_num = 0
        for (let index = 0; index <= hex_num.length - 1; index++) {
            let char = hex_num.charAt(hex_num.length - 1 - index)
            for (let index2 = 0; index2 <= 15; index2++) {
                if (char.compare(hex_arr.charAt(index2)) == 0) {
                    dec_num = dec_num + index2 * Math.pow(16, index)
                }
            }
        }
        return dec_num
    }
    //% weight=60 blockId="id_bintodec" block="convert binary %bin_num | to decimal"
    export function fn_bintodec(bin_num: string): number {
        dec_num = 0
        for (let index = 0; index <= bin_num.length - 1; index++) {
            let char = bin_num.charAt(bin_num.length - 1 - index)
            if (char.compare("1") == 0) {
                dec_num = dec_num + Math.pow(2, index)
            }
        }
        return dec_num
    }
}
