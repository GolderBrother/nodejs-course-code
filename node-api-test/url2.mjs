import http from 'node:http';
import url from 'node:url';


// const options = {
//     method: 'GET',
//     host: 'www.baidu.com',
//     port: 80,
//     path: '/'
// };
const options = url.urlToHttpOptions(new URL('http://www.baidu.com:80/'));
// 调用 http.request 发请求，返回的 res 是个可读流，监听 data 事件，打印返回的内容。
const req = http.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    })
});

req.on('error', (error) => {
    console.error(error);
});

req.end();