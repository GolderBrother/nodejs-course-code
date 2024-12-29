import blessed from 'blessed';
import contrib from 'blessed-contrib';

import fs from 'node:fs';
import { highlight } from 'cli-highlight';

async function main() {
    const screen = blessed.screen({
        fullUnicode: true
    })

    const grid = new contrib.grid({ rows: 12, cols: 12, screen });
    const tree = grid.set(0, 0, 12, 3, contrib.tree, {
        label: '目录', 
        fg: 'green',
        mouse: true
    })


    tree.setData({
        extended: true,
        children: {
            src: { 
                children:
                { 
                    'aaa.ts': {},
                    'bbb.ts': {},
                    components: {
                        children: {
                            'xxx.tsx': {},
                            'yyy.tsx': {}
                        }
                    }
                }
            }, 
            'index.js': {},
        }
    });

    // box 用来展示代码，设置 scrollable
    const code = grid.set(0, 3, 12, 9, blessed.box, {
        label: '文件内容',
        fg: "green",
        selectedFg: "white",
        fg: 'white',
        mouse: true,
        keys: true,
        scrollable: true
    })

    const fileContent = {
        'index.js': fs.readFileSync('./src/index.mjs', 'utf-8'),
        'src/aaa.ts': fs.readFileSync('./src/fileSelector.mjs', 'utf-8'),
        'src/bbb.ts': fs.readFileSync('./src/test.js', 'utf-8'),
        'src/components/xxx.tsx': fs.readFileSync('./package.json', 'utf-8'),
        'src/components/yyy.tsx': fs.readFileSync('./src/editor.mjs', 'utf-8')
    };

    tree.on('select', (node) => {
        console.log('node', node)
        let filePathArr = [node.name];
        let curNode = node;
        while(curNode.parent !== null) {
            curNode = curNode.parent;

            filePathArr.unshift(curNode.name);
        }

        const filePath = filePathArr.filter(Boolean).join('/')

        // 然后内容用 cli-highlight 高亮下
        code.content = highlight(fileContent[filePath] || '', {
            language: 'javascript',
            ignoreIllegals: true
        });

        screen.render();

    })

    screen.key(['escape', 'q', 'C-c'], () => {
        screen.destroy()
    })

    screen.render()

    tree.focus()
}

main()