import { Writable } from "stream";  

class MyWritable extends Writable {
    constructor(iterator) {
        super();
        this.iterator = iterator;
    }
    // Writable 的特点是可以自己控制消费数据的频率，只有调用 next 方法的时候，才会处理下一部分数据
    _write(chunk, encoding, next) {
        console.log(chunk.toString())
        next();
        // 每 1s 处理一次写入。
        setTimeout(next, 1000);
    }
}

function createWriteStream() {
    return new MyWritable();
} 

const writeStream = createWriteStream();
writeStream.on('finish', () => {
    console.log('done')
})

writeStream.write('阿门阿前一棵葡萄树，');
writeStream.write('阿东阿东绿的刚发芽，');
writeStream.write('阿东背着那重重的的壳呀，');
writeStream.write('一步一步地往上爬。');
writeStream.end();