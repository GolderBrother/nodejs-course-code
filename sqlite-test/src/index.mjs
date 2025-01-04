import { DatabaseSync } from 'node:sqlite';
// 创建 DatabaseSync 的实例，指定存储的文件位置。
const database = new DatabaseSync('data.db');

// exec 方法是执行 sql
database.exec(`
    CREATE TABLE student(
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INT
    ) STRICT
  `);

// prepare 方法也是准备 sql，其中 ? 是占位符，后面调用 run 方法传入具体的值才会执行。
const insert = database.prepare(`INSERT INTO student(id, name, age) VALUES(?, ?, ?)`)

// 插入数据
insert.run(1, 'John Doe', 20)
insert.run(2, 'james', 29)
insert.run(3, 'robin', 49)

// 查询数据
const query = database.prepare(`SELECT * FROM student ORDER BY id`)
console.log(query.all())

