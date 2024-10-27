const blessed = require('blessed')

// 1、创建屏幕实例
const screen = blessed.screen({
    fullUnicode: true
})
// 2、创建 progressBar 组件实例
const progressBar = blessed.progressbar({
    top: '50%',
    left: '50%',
    height: 2,
    width: 20,
    style: {
        bg: 'gray',
        bar: {
            bg: 'green'
        }
    }
})
// 3、将progressBar 组件实例 添加到屏幕里
screen.append(progressBar)

// 4、定时更新进度条进度

let total = 0;
const timer = setInterval(() => {
    if (total >= 100) {
        clearInterval(timer);
        console.log('success')
        screen.destroy()
    }

    progressBar.setProgress(total)
    screen.render();

    total += parseInt((Math.random()) * 10);
}, 100);

// 5、监听退出键
screen.key(['q', 'escape', 'C-c'], () => {
    screen.destroy()
})
// 6、渲染屏幕
screen.render()