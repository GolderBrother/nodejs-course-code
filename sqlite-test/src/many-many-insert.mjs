import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: '1-many.db',
        driver: sqlite3.Database
    })

    const articleInsert = await db.prepare(`INSERT INTO article (id, title, content) VALUES (?, ?, ?)`)
    articleInsert.run(1, 'title1', 'content1')
    articleInsert.run(2, 'title2', 'content2')
    articleInsert.run(3, 'title3', 'content3')
    articleInsert.run(4, 'title4', 'content4')
    articleInsert.run(5, 'title5', 'content5')
    articleInsert.finalize()

    const tagInsert = await db.prepare(`INSERT into tag (id, name) VALUES (?, ?)`)
    tagInsert.run('1', 'tag1')
    tagInsert.run('2', 'tag2')
    tagInsert.run('3', 'tag3')
    tagInsert.run('4', 'tag4')
    tagInsert.run('5', 'tag5')
    tagInsert.finalize()

    const articleTagInsert = await db.prepare(`INSERT INTO article_tag (article_id, tag_id) VALUES (?, ?)`);
    [
        [1,1], [1,2], [1,3],
        [2,2], [2,3], [2,4],
        [3,3], [3,4], [3,5],
        [4,4], [4,5], [4,1],
        [5,5], [5,1], [5,2]
    ].forEach(item => {
        articleTagInsert.run(item[0], item[1]);
    })
    articleTagInsert.finalize()
}

main()