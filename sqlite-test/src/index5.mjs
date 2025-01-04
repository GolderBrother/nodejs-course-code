import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main(params) {
  const db = await open({
    filename: 'data.db',
    driver: sqlite3.Database
  })

  // 新增
  const insert = await db.prepare(`INSERT INTO student (id, name, age) VALUES (?, ?, ?)`);
  insert.run(4, 'pony', 50)
  insert.run(5, 'richard', 56)
  insert.finalize()

  // 更新
  const update = await db.prepare(`UPDATE student set name = ? WHERE id = ?`)
  update.run('richard', 52)
  update.finalize()

  // 删除
  const del = await db.prepare(`DELETE FROM student WHERE id = ?`)
  del.run(5)
  del.finalize()

  // 查找
  const allData = await db.all(`SELECT * from student ORDER BY id`)
  console.log('allData', allData)
}
main()