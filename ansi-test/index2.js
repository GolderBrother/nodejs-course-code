import readline from 'node:readline';

const repeatCount = process.stdout.rows - 2;
const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
console.log(blank);
// 移动光标和清空下面的内容
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
