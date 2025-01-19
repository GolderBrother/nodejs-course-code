const path = require('node:path');

const filePath = __filename

console.log(filePath)

// 目录名
console.log(path.dirname(filePath));
// 文件名
console.log(path.basename(filePath));
// 扩展名
console.log(path.extname(filePath));
console.log(path.parse(filePath));