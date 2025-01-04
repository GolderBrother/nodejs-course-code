// import {  DatabaseSync } from 'node:sqlite';
// // 将数据存在内存里，可以使用 :memory:，不过重新跑就没有了
// const database = new DatabaseSync(':memory:');

import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    // run 方法是执行 sql
    db.run(`
        CREATE TABLE student(
            id INTEGER PRIMARY KEY,
            name TEXT,
            age INTEGER
        ) STRICT   
    `)
    // prepare 方法是准备 sql，其中 ? 是占位符，后面调用 run 方法传入具体的值才会执行
    const insert = db.prepare(`INSERT INTO student(id, name, age) VALUES(?, ?, ?)`)
    insert.run(1, 'John Doe', 20)
    insert.run(2, 'james', 29)
    insert.run(3, 'robin', 49)
    insert.finalize()
    const querySql = `SELECT * FROM student ORDER BY id`;
    // each 方法是查询列表数据，然后依次调用回调函数。
    db.each(querySql, (err, row) => {
        console.log(row.id, row.name, row.age);
    })
});
db.close();