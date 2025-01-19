// 而在 es module 模块里，是用 import.meta

// 在 commonjs 模块里，可以用 __dirname、__filename 来拿到目录名、文件名
import url from 'node:url'

// import.meta.url 是拿到当前文件以 file:// 开头的路径。
const metaUrl = import.meta.url;
console.log('metaUrl', metaUrl);

// import.meta.resolve 是基于当前目录和传入的路径来解析路径。
console.log(import.meta.resolve('./a.js'))

const dirname = import.meta.dirname
const filename = import.meta.filename

console.log('dirname', dirname)
console.log('filename', filename)

console.log(url.fileURLToPath(import.meta.url))
