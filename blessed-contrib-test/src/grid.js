const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
    fullUnicode: true
})

// 创建 grid，指定行和列都分为 12 份。
const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

//grid.set(row, col, rowSpan, colSpan, obj, opts)
// const map = grid.set(0, 0, 4, 4, contrib.map, {label: 'World Map'})
// const box = grid.set(4, 4, 4, 4, blessed.box, {content: 'My Box'})

// 在 0、0 的位置渲染宽高占 6 份的 gauge 组件
const gauge = grid.set(0, 0, 6, 6, contrib.gauge, {
    label: '下载进度', 
    width: 'half',
    stroke: 'green',
    fill: 'white',
    percent: 0.3
})

// 组件的位置为 6、6，就会在右下角渲染，渲染宽高占 6 份的 donut 组件
const donut = grid.set(6, 6, 6, 6, contrib.donut, {
    label: '进度',
    radius: 10,
    arcWidth: 2,
    remainColor: 'black',
    data: [
        { percent: 0.3, label: 'aaa 进度', color: 'green' },
        { percent: 0.5, label: 'bbb 进度', color: 'red' },
    ]
})


// screen.append(grid)
screen.on(['q', 'escape', 'C-c'], () => {
    screen.destroy()
})
screen.render();