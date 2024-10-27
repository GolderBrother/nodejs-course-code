const blessed = require('blessed');

// Create a screen object.
const screen = blessed.screen({
    // 指定 fullUnicode: true 这样可以支持中文字符
    fullUnicode: true
});

const data = [
    "红楼梦",
    "西游记",
    "水浒传",
    "三国演义",
    "儒林外史",
    "金瓶梅",
    "聊斋志异",
    "白鹿原",
    "平凡的世界",
    "围城",
    "活着",
    "百年孤独",
    "围城",
    "红高粱家族",
    "梦里花落知多少",
    "倾城之恋",
    "悲惨世界",
    "哈利波特",
    "霍乱时期的爱情",
    "白夜行",
    "解忧杂货店",
    "挪威的森林",
    "追风筝的人",
    "小王子",
    "飘",
    "麦田里的守望者",
    "时间简史",
    "人类简史",
    "活着为了讲述",
    "白夜行",
    "百鬼夜行"
];

const list = blessed.list({
    width: '50%',
    height: '50%',
    border: 'line',
    label: '书籍列表',
    align: 'left',
    right: 0,
    bottom: 0,
    // 支持键盘控制
    keys: true,
    // 支持鼠标控制
    mouse: true,
    style: {
        fg: 'white',
        bg: 'default',
        selected: {
            bg: 'blue'
        }
    },
    items: data
})
list.select(0)
// 选中也就是按 enter 键的时候打印下选中的值
list.on('select', (item) => {
    screen.destroy()
    const selected = item.getText()
    console.log('selected', selected)
})
list.focus()
// 输入 Ctrl+C 时候退出
// screen.key('C-c', () => {
//     screen.destroy()
// })
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    screen.destroy()
    // return process.exit(0);
});
// 在 blessed 里根组件是 screen，所有的小组件都要 screen.append 来添加
screen.append(list)
// 渲染组件
screen.render()