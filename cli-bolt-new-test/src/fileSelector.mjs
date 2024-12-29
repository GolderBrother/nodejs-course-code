import blessed from 'blessed';

const screen = blessed.screen({
    fullUnicode: true
})

const fm = blessed.filemanager({
    parent: screen,
    border: 'line',
    height: 'half',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}%path{/blue-fg} ',
    cwd: process.cwd(),
    keys: true,
    style: {
        selected: {
            bg: 'blue'
        }
    },
    scrollbar: {
        bg: 'white'
    }
})

// 选中文件，拿到路径之后，就是读取文件内容，调用 AI 接口来生成代码
fm.on('file', (file) => {
    screen.destroy();
    console.log(file);
})

screen.key(['escape', 'q', 'C-c'], () => {
    screen.destroy();
})

fm.refresh();

screen.render();