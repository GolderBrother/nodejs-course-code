# Node 的内置数据库：sqlite

## Node 的内置数据库：sqlite

写 Node.js 工具难免要存储一些数据，简单的数据直接存在 json 文件里就行，但存一些复杂的关系数据的时候就需要用到关系型数据库了。

sqlite 就是一个小型的关系型数据库，可以在内存、单个文件里存储所有的数据，在手机 APP 里用的非常多。

我们分别用了下 node 内置的 sqlite 模块、第三方的 sqlite3、sqlite 包，还有 GUI 工具 DB Browser。

内置的 node:sqlite 模块是 node 22 加入的，还在实验阶段，不够稳定，需要 node --experimental-sqlite 才能跑，所以可以直接用三方的包。

sqlite3 是驱动包，而 sqlite 是封装了一层的包，是 promise 版本的 sqlite3。

当然，这些 api 用起来都很简单。

## sqlite 存储一对多、多对多关系

我们学了用 sqlite 存储复杂关系，也就是一对多、多对多关系。

我们创建了部门、员工表，并在员工表添加了引用部门 id 的外键 department_id 来保存这种一对多关系。

创建了文章表、标签表、文章标签表来保存多对多关系，多对多不需要在双方保存彼此的外键，只要在中间表里维护这种关系即可。

关联多个表的查询需要用 join on，多对多的 join 需要连接 3 个表来查询。

当你用 sqlite 存储复杂的关系数据的时候，就可以用 sql 来做 CRUD 了。

等之后 node:sqlite 这个内置模块稳定了，就可以不用三方包来写了，但用法一样