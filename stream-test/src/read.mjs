// ls | grep pack | node ./src/read.mjs
// ls 的输出流，作为grep的输入流，grep的输出流，再作为node的输入流
process.stdin.on('readable', () => {
    const buf = process.stdin.read();
    if (buf) {
        console.log(buf.toString('utf8'))
    } 
})