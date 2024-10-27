import https from 'node:https'
import fs from 'node:fs'
import { ProgressBar } from './ProgressBar.js';
import chalk from 'chalk';
const downloadURLs = {
    linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
    darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
    win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
    win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
};

const bar = new ProgressBar()
https.get(downloadURLs.darwin, (response) => {
    let value = 0;
    const files = fs.createWriteStream('./chromium.zip')
    // 把响应流写入文件
    response.pipe(files)

    const contentSize = response.headers['content-length'];
    let totalBytes = 0;
    if (contentSize) {
        totalBytes = parseInt(contentSize, 10)
        bar.start(totalBytes, 0)

    }
    response.on('data', (chunk) => {
        const chunkSize = chunk.length
        value += chunkSize;
        bar.update(value)
        if (value >= bar.getTotal()) {
            bar.stop()
            console.log(chalk.green('下载完成'))
        }
    })

})

