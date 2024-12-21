import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'stream'
  
const gzip = createGzip();
const source = createReadStream(import.meta.dirname + '/data.txt');
// 这个 gzip 是用于 http 的压缩传输的,很常用,所以 Node.js 内置了这个模块。
const destination = createWriteStream('data.txt.gz');

// 从文件的 ReadStream，pipe 到 Gzip 转换流，然后 pipe 到文件的 WriteStream。
// source.pipe(gzip).pipe(destination);
// 这里的多次 pipe 也可以用 stream 的 pipeline 的 api 简化
pipeline(source, gzip, destination, (err) => {
    console.error('err', err)
})