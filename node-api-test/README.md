# 一些 node 常用的 api。

有这些模块：

- `events`：提供了 EventEmitter 类，可以用 on、once 注册监听器，用 emit 触发事件
- `path`：用来处理文件路径的，dirname、basename、extname 方法分别拿到目录名、文件名、后缀名，而 join、resolve、relative、parse 等方法是用来连接、解析路径的
- `import.meta`：在 commonjs 里用 __dirname、__filename 等变量来拿到当前文件名、当前目录，而在 es module 里是用 import.- meta.dirname、import.meta.filename，这要 node 20 以上才有，低版本可以用 url.fileURLToPath(import.meta.url)
- `url`：用来解析 URL 的，可以 new URL 来拿到各部分的内容，还可以 new URLSearchParams 来处理 query string
- `os`：拿到系统信息，比如 cpu、内存、homedir、网卡信息、EOL 等。