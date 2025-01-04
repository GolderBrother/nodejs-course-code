import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('data.db');

const query = database.prepare(`SELECT * FROM student ORDER BY id`);
console.log(query.all());