import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: '1-many.db',
        driver: sqlite3.Database
    })
    const allData = await db.all(`
        select * from article a
        JOIN article_tag at on a.id = at.article_id
        JOIN tag t on t.id = at.tag_id
        WHERE a.id = 1    
    `)
    console.log('allData', allData)
}

main()