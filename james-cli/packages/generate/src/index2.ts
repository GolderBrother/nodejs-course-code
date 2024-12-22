import { select, input, confirm } from '@inquirer/prompts';

async function generate() {
    let componentDir = '';
    while(!componentDir) {
        componentDir = await input({
            message: '生成组件的目录',
            default: 'src/components'
        })
    }

    let componentDesc = ''
    while(!componentDesc) {
        componentDesc = await input({
            message: '请输入组件描述',
            default: '生成一个 Table 组件，有包含 name、age、email 属性的 data 数组参数'
        })
    }

    console.log('componentDir', componentDir)
    console.log('componentDesc', componentDesc)

}
generate()

export default generate