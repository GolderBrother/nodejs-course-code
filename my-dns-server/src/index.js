const dgram = require('node:dgram')
// 接收 DNS 协议数据需要启 UDP 服务
const server = dgram.createSocket('udp4')
const { resolve,
    forward } = require('./utils.js')

/**
 * 解析域名
 * 问题的最开始就是域名，我们只要把域名解析出来就行。
 * 我们表示域名是通过 . 来区分，但是存储的时候不是，是通过
 * 当前域长度 + 当前域内容 + 当前域长度 + 当前域内容 + 当前域长度 + 当前域内容 + 0
 * 这样的格式，以 0 作为域名的结束
 * @param {*} msg 
 */
function parseHost(msg) {
    let num = msg.readUInt8(0)
    let offset = 1;
    let host = "";
    while (num !== 0) {
        // 通过 Buffer 的 readUInt8 方法来读取一个无符号整数，通过 Buffer 的 subarray 方法来截取某一段内容。
        host += msg.subarray(offset, offset + num).toString();
        offset += num;

        num = msg.readUInt8(offset);
        offset += 1;

        if (num !== 0) {
            host += '.'
        }
    }
    return host;
}


server.on('message', (msg, rinfo) => {
    console.log('msg', msg)
    const host = parseHost(msg.subarray(12))
    console.log(`query111: ${host}`)
    // 解析出的域名如果包含 jamesjamesjames，那就自己处理，构造对应的 DNS 协议消息返回。
    if (/jamesjamesjames/.test(host)) {
        resolve(server, msg, rinfo)
    } else {
        // 否则就转发到别的本地 DNS 服务器处理，把结果返回给客户端。
        forward(server, msg, rinfo)
    }
})

server.on('error', err => {
    console.log(`server error: ${err.stack}`)
})

server.on('listening', () => {
    const addressInfo = server.address()
    const { address, port } = addressInfo;
    console.log(`server listening as ${address}:${port}`)
})

// 启动在 53 端口
server.bind(53)