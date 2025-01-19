import path from 'node:path';
import { fileURLToPath } from 'node:url';

// __dirname、__filename 只在 commonjs 的模块里有，如果是 es module 就要用 import.meta.url
const filePath = fileURLToPath(import.meta.url);

console.log(filePath)

// 目录名
console.log(path.dirname(filePath));
// 文件名
console.log(path.basename(filePath));
// 扩展名
console.log(path.extname(filePath));
console.log(path.parse(filePath));