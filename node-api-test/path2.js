const path = require('node:path');

// path.join 可以把多个路径连接起来，解析其中的 ../ ./，合并成一个路径。
const filePath = path.join('../', 'node-api-test', './', 'path2.js')

console.log('filePath', filePath);

// path.resolve 也是连接多个路径，但最后会返回一个绝对路径。
const filePath2 = path.resolve('../', 'node-api-test', './', 'path2.js')
console.log('filePath2', filePath2);

const relativePath = path.relative('/a/b/c', '/a/d');
console.log('relativePath', relativePath);

const parsePath = path.parse(__dirname);
console.log(parsePath);
