import { Duplex } from 'stream'

// Duplex 是可读可写，同时实现 _read 和 _write 就可以了，也就是双工流
class MyDuplex extends Duplex {
    _read() {
        this.push('阿门阿前一棵葡萄树，')
        this.push('阿东阿东绿的刚发芽，');
        this.push('阿东背着那重重的的壳呀，');
        this.push('一步一步地往上爬。')
        this.push(null)
    }

    _write(data, encoding, next) {
        console.log(data.toString())
        setTimeout(next, 1000);
    }
}

const myDuplex = new MyDuplex();

myDuplex.on('data', data => {
    console.log(data.toString())
});
// 读取完成
myDuplex.on('end', data => {
    console.log('read done')
});

myDuplex.write('阿门阿前一棵葡萄树，');
myDuplex.write('阿东阿东绿的刚发芽，');
myDuplex.write('阿东背着那重重的的壳呀，');
myDuplex.write('一步一步地往上爬。');
myDuplex.end();

// 写入完成
myDuplex.on('finish', () => {
    console.log('write done')
})