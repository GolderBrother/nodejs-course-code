const blessed = require('blessed')

const screen = blessed.screen({
    fullUnicode: true
})

const file = blessed.filemanager({
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

screen.append(file)

file.on('file', file => {
    screen.destroy()
    console.log('file', file)
})

file.refresh()

screen.key(['C-c', 'escape', 'q'], (key) => {
    console.log(`key in ${key}`)
    screen.destroy()
})

screen.render()