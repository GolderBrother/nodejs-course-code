const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
    fullUnicode: true
})

const lineChart = contrib.line({
    style: { 
        line: "yellow",
        text: "green",
        baseline: "blue"
    },
    label: "气温变化",
    xLabelPadding: 2,
    xPadding: 2,
    yPadding: 2,
})

const data = {
    x: ['10 月 1 日', '10 月 2 日', '10 月 3 日', '10 月 4 日'],
    y: [6, 13, 8, 10]
}

screen.append(lineChart)
lineChart.setData([data])

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    screen.destroy()
}); 

screen.render()