import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
(async () => {
    // open the database
    // open 是打开数据库存储的文件，指定刚才的 filename，以及用 sqlite3 作为驱动
    const db = await open({
      filename: 'data.db',
      driver: sqlite3.Database
    })
    console.log('db', db)
    // const result = await db.get('SELECT * FROM student WHERE name = ?', 'james')
    // console.log('result', result)

    // const person = await db.get('select * from student WHERE name = :name', {
    //     ':name': 'james'
    // })
    const person = await db.get('select * from student WHERE name = ?', 'james')
    console.log('person', person);
    const allData = await db.all('SELECT * FROM student')
    console.log('allData', allData)
})()