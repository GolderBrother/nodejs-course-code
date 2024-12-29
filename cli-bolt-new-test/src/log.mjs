// 生成代码后的构建日志展示
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { spawn } from 'child_process'

async function main() {
    const screen  = blessed.screen({
        fullUnicode: true
    })

    const grid = new contrib.grid({ rows: 12, cols: 12, screen });

    const box = grid.set(0, 0, 12, 12, blessed.box, {
        label: '构建日志',
        fg: 'green',
        mouse: true
    })

    const server = spawn('npx', ['http-server', '.'], {
        // 用 child_process 的 spawn 跑的进程，默认的日志是没有颜色的，需要加上 FORCE_COLOR 环境变量才可以
        env: { ...process.env, FORCE_COLOR: true },
    })

    // 获取控制台内容
    let content = ''
    server.stdout.on('data', (data) => {
        content += data.toString()
        box.content = content
        screen.render()
    })

    // 退出
    screen.key(['escape', 'q', 'C-c'], () => {
        screen.destroy();
    })

    // 渲染
    screen.render()
}

main()