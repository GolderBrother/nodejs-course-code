import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: '1-many.db',
        driver: sqlite3.Database
    })

    const departmentInsert = await db.prepare(`INSERT INTO department (id, name) VALUES (?, ?)`);
    departmentInsert.run(1, '人事部');
    departmentInsert.run(2, '财务部'),
    departmentInsert.run(3, '市场部'),
    departmentInsert.run(4, '技术部'),
    departmentInsert.run(5, '销售部'),
    departmentInsert.run(6, '客服部'),
    departmentInsert.run(7, '采购部'),
    departmentInsert.run(8, '行政部'),
    departmentInsert.run(9, '品控部'),
    departmentInsert.run(10, '研发部');
    departmentInsert.finalize();

    const employeeInsert = await db.prepare(`INSERT INTO employee (id, name, department_id) VALUES (?, ?, ?)`);
    employeeInsert.run(1, '张三', 1);
    employeeInsert.run(2, '李四', 2);
    employeeInsert.run(3, '王五', 3);
    employeeInsert.run(4, '赵六', 4);
    employeeInsert.run(5, '钱七', 5);
    employeeInsert.run(6, '孙八', 6);
    employeeInsert.run(7, '周九', 7);
    employeeInsert.run(8, '吴十', 8);
    employeeInsert.run(9, '郑十一', 9);
    employeeInsert.run(10, '王十二', 10);
    employeeInsert.finalize(); 
}

main();


