// Transform 也是 Duplex 双工流，只不过它会对写入的内容做一些转换之后提供给消费者来读

import { Transform } from 'node:stream';

class ReverseStream extends Transform {

    // 在 _transform 方法里用 push 来产生可读流数据，然后 next 是消费下一个写入的数据。
  _transform(buf, enc, next) {
    const res = buf.toString().split('').reverse().join('');
    this.push(res);

    next()
  }
}

var transformStream = new ReverseStream();

transformStream.on('data', data => console.log(data.toString()))
transformStream.on('end', data => console.log('read done'));

transformStream.write('阿门阿前一棵葡萄树');
transformStream.write('阿东阿东绿的刚发芽');
transformStream.write('阿东背着那重重的的壳呀');
transformStream.write('一步一步地往上爬');
transformStream.end()

transformStream.on('finish', data => console.log('write done'));