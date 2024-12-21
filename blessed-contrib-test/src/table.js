const blessed = require("blessed");
const contrib = require("blessed-contrib");

const screen = blessed.screen({
  fullUnicode: true,
});
// 指定样式、列的宽度，传入数据
const table = contrib.table({
  keys: true,
  label: "成绩单",
  width: "50%",
  height: "50%",
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  border: {
    type: "line",
    fg: "blue",
  },
  columnWidth: [10, 5, 5],
});

//allow control the table with the keyboard
table.focus();

table.setData({
  headers: ["姓名", "班级", "分数"],
  data: [
    ["东东", "一班", 88],
    ["光光", "二班", 98],
    ["小刚2", "三班", 68],
    ["东东2", "一班", 88],
    ["光光3", "二班", 98],
    ["小刚4", "三班", 68],
    ["东东5", "一班", 88],
    ["光光6", "二班", 98],
    ["小刚7", "三班", 68],
    ["东东8", "一班", 88],
    ["光光9", "二班", 98],
    ["小刚9", "三班", 68],
  ],
});
screen.append(table);
screen.key(["q", "C-c", "escape"], () => {
  screen.destroy();
});
screen.render();