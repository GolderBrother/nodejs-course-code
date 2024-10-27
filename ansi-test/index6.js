import ansi from 'sisteransi';
// or const { cursor } = require('sisteransi');
 
const p = str => process.stdout.write(str);
 
// move cursor to 2, 1
p(ansi.cursor.to(2, 1));
 
// to up, one down
p(ansi.cursor.up(2)+ansi.cursor.down(1));