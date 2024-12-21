import { Readable } from 'node:stream'

class MyReadable extends Readable {
    constructor(iterator) {
        super()
        this.iterator = iterator
    }

    _read() {
        const { value, done } = this.iterator.next()
        if (done) {
            return this.push(null)
        }
        this.push(value)
    }
}

function *songGenerator() {
    yield '阿门阿前一棵葡萄树，'
    yield '阿东阿东绿的刚发芽，'
    yield '阿东背着那重重的的壳呀，'
    yield '一步一步地往上爬。'
}
const myReadable = new MyReadable(songGenerator())

myReadable.on('data', data => {
    console.log(data.toString())
}) 

myReadable.on('end', data => {
    console.log('done')
})