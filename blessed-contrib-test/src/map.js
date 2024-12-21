// https://www.npmjs.com/package/blessed-contrib
const blessed = require('blessed')
const contrib = require('blessed-contrib')

const screen = blessed.screen({
    fullUnicode: true
})

const map = contrib.map({
    label:' james的世界地图'
})
screen.append(map)

// map.addMarker({"lon" : "-79.0000", "lat" : "37.5000", color: "red", char: "X" })
map.addMarker({
    lon : "-79.0000",
    lat : "37.5000",
    color: "red",
    char: "❌" 
})

map.addMarker({
    lon : "-59.0000",
    lat : "20.5000",
    color: "red",
    char: "✅"
})
screen.key(['escape', 'C-c', 'q'], () => {
    screen.destroy()
})

screen.render();