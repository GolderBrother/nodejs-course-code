# Node 的内置数据库：sqlite

写 Node.js 工具难免要存储一些数据，简单的数据直接存在 json 文件里就行，但存一些复杂的关系数据的时候就需要用到关系型数据库了。

sqlite 就是一个小型的关系型数据库，可以在内存、单个文件里存储所有的数据，在手机 APP 里用的非常多。

我们分别用了下 node 内置的 sqlite 模块、第三方的 sqlite3、sqlite 包，还有 GUI 工具 DB Browser。

内置的 node:sqlite 模块是 node 22 加入的，还在实验阶段，不够稳定，需要 node --experimental-sqlite 才能跑，所以可以直接用三方的包。

sqlite3 是驱动包，而 sqlite 是封装了一层的包，是 promise 版本的 sqlite3。

当然，这些 api 用起来都很简单。

