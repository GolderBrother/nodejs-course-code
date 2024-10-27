const blessed = require('blessed');

// 创建一个屏幕
const screen = blessed.screen({
    fullUnicode: true
});

// 创建提示框
const prompt = blessed.prompt({
    border: 'line',
    height: 'shrink',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}登录{/blue-fg} ',
    tags: true
});

// 创建消息框
const msg = blessed.message({
    border: 'line',
    width: 'half',
    height: 'shrink',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}提示{/blue-fg} ',
    tags: true,
    hidden: true // 初始隐藏
});

// 将组件添加到屏幕
// 这里确保在调用 prompt.input 之前，prompt 和 msg 组件已经被添加到屏幕上
screen.append(prompt);
screen.append(msg);

// 询问用户名
prompt.input('你的用户名?', '', function (err, username) {
    if (err) return screen.destroy(); // 处理错误

    // 询问密码
    prompt.input('你的密码?', '', function (err, password) {
        if (err) return screen.destroy(); // 处理错误

        // 定义回调函数
        const callback = function () {
            screen.destroy();
        };

        // 验证用户名和密码
        if (username !== 'james' || password !== 'abc123') {
            msg.display('用户名或者密码不正确!', 1, callback);
        } else {
            msg.display('登录成功!', 1, callback);
        }
    });
});

// 监听退出事件
prompt.key(['escape', 'q', 'C-c'], () => {
    screen.destroy();
});

// 渲染屏幕
screen.render();