const blessed = require('blessed')

const screen = blessed.screen({
    fullUnicode: true
})
const table = blessed.table({
    width: '80%',
    height: 'shrink',
    top: 'center',
    left: 'center',
    data: null,
    border: 'line',
    align: 'center',
    tags: true,
    style: {
        border: {
            fg: 'white'
        },
        header: {
            fg: 'blue',
            bold: true
        },
        cell: {
            fg: 'green'
        }
    }

})

screen.append(table)


const data = [
    ['姓名', '性别', '年龄', '电话号码'],
    ['james', '男', '20', '13233334444'],
    ['zhang', '男', '20', '13233332222'],
    ['小红', '女', '21', '13233335555'],
    ['小刚', '男', '22', '13233336666']
];

data[1][0] = '{red-fg}' + data[1][0] + '{/red-fg}';
data[2][0] = '{blue-fg}' + data[2][0] + '{/blue-fg}';
data[3][0] = '{yellow-fg}' + data[3][0] + '{/yellow-fg}';
data[4][0] = '{green-fg}' + data[4][0] + '{/green-fg}';
table.setData(data)

// 退出快捷键
screen.key(['C-c', 'q', 'escape'], () => {
    screen.destroy()
})
// 渲染屏幕
screen.render()
