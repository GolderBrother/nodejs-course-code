import ansiEscapes from "ansi-escapes";

const writeLog = process.stdout.write.bind(process.stdout);

// 隐藏最后的光标
writeLog(ansiEscapes.cursorHide)
// 第一次打印的时候，用 cursorSavePosition 保存对应的 ANSI 控制字符保存光标位置
writeLog(ansiEscapes.cursorSavePosition);
writeLog(`██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`);

setTimeout(() => {
  writeLog(ansiEscapes.cursorRestorePosition);
  writeLog(`██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░`);
}, 1000);

setTimeout(() => {
  writeLog(ansiEscapes.cursorRestorePosition);
  writeLog(`█████████████████████████████░░░░░░░░░░░ `);
}, 2000);

setTimeout(() => {
  writeLog(ansiEscapes.cursorRestorePosition);
  writeLog(`████████████████████████████████████████ `);
}, 3000);
