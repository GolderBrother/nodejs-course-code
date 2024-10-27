import { Bar } from 'cli-progress'
import { ProgressBar } from './ProgressBar.js'

// const bar = new Bar({
//     format: '进度：{bar} | {percentage}% || {value}/{total} || 速度: {speed}',
//     barCompleteChar: '\u2588',
//     barIncompleteChar: '\u2591',
//     hideCursor: true
// })
const bar = new ProgressBar({
    format: '进度：{bar} | {percentage}% || {value}/{total} || 速度: {speed}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
})

bar.start(200, 0, {
    // speed: "N/A"
    speed: "0"
});

let value = 0;

// 模拟一个耗时的任务
const interval = setInterval(() => {

    value++;

    bar.update(value, {
        speed: (60 * Math.random()).toFixed(2) + "Mb/s"
    });

    if (value >= bar.getTotal()) {
        clearInterval(interval);
        bar.stop();
        console.log('任务完成！');
    }

}, 100); // 每 100 毫秒更新一次