const dgram = require('node:dgram')
function copyBuffer(src, offset, dst) {
    for(let i = 0; i < src.length; i++) {
        dst.writeUInt8(src.readUInt8(i), offset + i)
    }
}
function resolve(server, msg, rinfo) {
    const queryInfo = msg.subarray(12)
    const response = Buffer.alloc(28 + queryInfo.length)
    let offset = 0


    // Transaction ID
    const id  = msg.subarray(0, 2)
    copyBuffer(id, 0, response)  
    offset += id.length
    
    // Flags
    response.writeUInt16BE(0x8180, offset)  
    offset += 2

    // Questions
    response.writeUInt16BE(1, offset)  
    offset += 2

    // Answer RRs
    response.writeUInt16BE(1, offset)  
    offset += 2

    // Authority RRs & Additional RRs
    response.writeUInt32BE(0, offset)  
    offset += 4
    copyBuffer(queryInfo, offset, response)
    offset += queryInfo.length

     // offset to domain name
    response.writeUInt16BE(0xC00C, offset) 
    offset += 2
    const typeAndClass = msg.subarray(msg.length - 4)
    copyBuffer(typeAndClass, offset, response)
    offset += typeAndClass.length

    // TTL, in seconds
    response.writeUInt32BE(600, offset)  
    offset += 4

    // Length of IP
    response.writeUInt16BE(4, offset)  
    offset += 2
    '11.22.33.44'.split('.').forEach(value => {
      response.writeUInt8(parseInt(value), offset)
      offset += 1
    })
    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.log(err)
        server.close()
      }
    })
}
// 192.168.31.1

/**
 * 转发到别的 DNS 服务器，那就是创建一个 UDP 的客户端，把收到的消息传给它，收到消息后再转给客户端。
 */
function forward (server, msg, rinfo) {
    const client = dgram.createSocket('udp4')

    client.on('message', (fbMsg, fbRinfo) => {
        // 收到消息后再转给客户端: 收到其他 DNS服务返回的消息之后用 server.send 转给客户端，这里只做中转
        server.send(fbMsg, rinfo.port, rinfo.address)
        client.close()
    })

    // 监听消息，把 msg 转发给目标 DNS 服务器
    client.send(msg, 53, '202.96.128.68',err => {
        if (err) {
            console.log(err)
            client.close()
          }
    } )
}

module.exports = {
    copyBuffer,
    resolve,
    forward
}