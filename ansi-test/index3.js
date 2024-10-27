import ansiEscapes from 'ansi-escapes';

// console.log 会打印一个换行符，所以我们用 process.stdout.write 打印
const log = process.stdout.write.bind(process.stdout);

log(ansiEscapes.cursorTo(10, 1) + '111');
log(ansiEscapes.cursorTo(7, 2) + '222');
log(ansiEscapes.cursorTo(5, 3) + '333');

setTimeout(() => {
    log(ansiEscapes.cursorTo(0, 2) + ansiEscapes.eraseEndLine);
    log(ansiEscapes.cursorTo(5, 3) + '444')
}, 1000)
