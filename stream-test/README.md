# node 流

stream 是 Node.js 的非常常用 API，也是面试必问的点。

流就是分段的传输内容，比如从服务端向浏览器返回响应数据的流，读取文件的流

流和流之间可以通过管道(`pipe`)连接，上个流的输出作为下个流的输入

我们每天敲的 `shell` 命令，就是基于流的概念，上个进程的输出可以做为下个进程的输入。

写 Node.js 代码的时候，文件读写、网络通信等都是基于流。

虽然各种流有很多，但底层的 stream 只有 4 种：

- `Readable`：实现 `_read` 方法，通过 `push` 传入内容
- `Writable`：实现 `_write` 方法，通过 `next` 消费内容
- `Duplex`：实现 `_read、``_write`，可读可写
- `Transform`：实现 `_transform`，对写入的内容做转换再传出去，继承自 `Duplex`
面试问的话，除了说出这 4 种 `stream` 外，最好举一个具体的 `api` 来说明。

比如 
- (1) `fs.createReadStream`、`http` 的 `request` 是 `Readable` 的实现
- (2) `fs.createWriteStream`、`http` 的 `response` 是 `Writable` 的实现
- (3) `net` 的 `Socket` 是 `Duplex` 的实现
- (4) `zlib.createGzip` 是 `Transform` 的实现。

理解这 4 种 `stream`，能自己实现，也能知道哪些 `api` 是哪种流，就算掌握的差不多了。