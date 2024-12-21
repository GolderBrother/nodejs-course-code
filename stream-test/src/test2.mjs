import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async function (req, res) {
    // 从 request 的流中读出的内容写入了文件的 WriteStream
    const writeStream = fs.createWriteStream('aaa.txt', 'utf-8');
    req.pipe(writeStream);
    res.end('done');
});

server.listen(8000);