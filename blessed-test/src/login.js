const blessed = require('blessed');

// 创建一个屏幕
const screen = blessed.screen({
  smartCSR: true
});

// 设置屏幕标题
screen.title = 'Login Form';

// 创建一个表单
const form = blessed.form({
  keys: true,
  vi: true,
  top: 'center',
  left: 'center',
  width: '30%',
  height: '30%',
  border: {
    type: 'line',
  },
  style: {
    border: {
      fg: 'cyan',
    },
    label: {
      fg: 'white',
      bg: 'blue',
    },
  },
});

// 创建用户名输入框
const usernameInput = blessed.textbox({
  top: 1,
  left: 1,
  width: '90%',
  height: 3,
  label: ' Username ',
  border: {
    type: 'line',
  },
  style: {
    border: {
      fg: 'cyan',
    },
  },
});

// 创建密码输入框
const passwordInput = blessed.textbox({
  top: 5,
  left: 1,
  width: '90%',
  height: 3,
  label: ' Password ',
  border: {
    type: 'line',
  },
  inputType: 'password', // 设置为密码输入
  style: {
    border: {
      fg: 'cyan',
    },
  },
});

// 创建提交按钮
const submitButton = blessed.button({
  top: 9,
  left: 'center',
  shrink: true,
  padding: { left: 1, right: 1 },
  content: 'Submit',
  style: {
    bg: 'green',
    hover: {
      bg: 'lightgreen',
    },
  },
});

// 创建消息框
const msg = blessed.box({
  top: 12,
  left: 'center',
  width: '90%',
  height: 3,
  content: '',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    border: {
      fg: 'cyan',
    },
    bg: 'black',
    fg: 'white',
  },
});

// 将输入框和按钮添加到表单
form.append(usernameInput);
form.append(passwordInput);
form.append(submitButton);
form.append(msg);

// 将表单添加到屏幕
screen.append(form);

// 聚焦到用户名输入框
usernameInput.focus();

// 提交表单的处理逻辑
submitButton.on('press', () => {
  const username = usernameInput.getValue();
  const password = passwordInput.getValue();

  // 验证用户名和密码
  if (username === 'james' && password === 'abc123') {
    msg.setContent('{green-fg}Login successful!{/green-fg}');
  } else {
    msg.setContent('{red-fg}Username or password incorrect.{/red-fg}');
  }

  // 显示消息并在1秒后清除
  screen.append(msg);
  screen.render();
  setTimeout(() => {
    msg.setContent('');
    screen.render();
  }, 1000);
});

// 监听表单提交事件
form.on('submit', () => {
  submitButton.emit('press');
});

// 监听退出事件
screen.key(['escape', 'q', 'C-c'], () => {
  return process.exit(0);
});

// 渲染屏幕
screen.render();