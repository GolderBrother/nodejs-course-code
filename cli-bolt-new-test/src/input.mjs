import blessed from 'blessed';
import contrib from 'blessed-contrib';

async function main() {
    const screen = blessed.screen({
        fullUnicode: true
    })

    const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

    // grid.set(row, col, rowSpan, colSpan, obj, opts)
    // 前两个参数是位置，也就是行号、列号,后两个参数是大小
    // 设置了行、列都分为 12 份，行分为 4 份，列分为 3 份
    const textarea = grid.set(8, 2, 4, 8, blessed.textarea, {
        label: '描述下你想生成什么样的网站',
        fg: 'green',
        mouse: true
    })

    textarea.readInput((err, value) => {
        screen.destroy();
        console.log(textarea.value);
    })

    screen.key(['escape', 'q', 'C-c'], () => {
        screen.destroy();
    })
    screen.render()
}

main();