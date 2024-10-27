import ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import { Options } from "cli-progress";
import { EOL } from "os";

const write = process.stdout.write.bind(process.stdout)
export class ProgressBar {
    total: number = 0;
    value: number = 0;
    barCompleteChar: string = chalk.blue('█');
    barIncompleteChar: string = chalk.blue('░');
    hideCursor: boolean = true;
    constructor(opts?: Options) {
        if (opts?.barCompleteChar) this.barCompleteChar = opts.barCompleteChar;
        if (opts?.barIncompleteChar) this.barIncompleteChar = opts.barIncompleteChar;
        if (opts?.hideCursor) this.hideCursor = opts.hideCursor;
     }
    start(total: number, value: number, payload?: object) {
        this.total = total;
        this.value = value;
        // 隐藏最后的光标
        if (this.hideCursor) {
            write(ansiEscapes.cursorHide)
        }
        // 第一次打印的时候，用 cursorSavePosition 保存对应的 ANSI 控制字符保存光标位置
        write(ansiEscapes.cursorSavePosition)
        this.render()
    }
    render() {
        // 计算 progress，算出完成的和未完成的字符的个数，然后打印
        // 1、获取当前进度
        let progress = this.value / this.total;
        // 2、进度最小值是0，超过1的话，需要制0
        if (progress < 0) {
            progress = 0
        } else if (progress > 1) {
            progress = 1
            this.value = this.total
        }
        const barSize = 40
        const completeSize = Math.floor(progress * barSize);
        const inCompleteSize = barSize - completeSize
        // 计算 progress，算出完成的和未完成的字符的个数，然后打印
        write(ansiEscapes.cursorRestorePosition);
        write(this.barCompleteChar.repeat(completeSize))
        write(this.barIncompleteChar.repeat(inCompleteSize))
        write(` ${this.value} / ${this.total}`)

    }

    /** 更新 value，render 当前进度条 */
    update(value: number, payload?: object) {
        this.value = value
        this.render()
    }
    stop(){
        // 要打印 cursorShow，不然代码跑完了还是没有光标
        write(ansiEscapes.cursorShow)
        // 打印一个换行
        write(EOL)
    }
    getTotal() {
        return this.total
    }

}