import * as prompts from '@clack/prompts';
import chalk from 'chalk';

async function main() {
    console.clear()
    prompts.intro(chalk.bgCyan.black(' cli 网站生成器 '))
    const info = await prompts.group({
        path: () => prompts.password({
            message: '请输入你的 API KEY',
            validate: (value) => {
                if (!value) return 'API KEY 不能为空';
            },
        }),
        password: () => prompts.text({
            message: '请输入 BASE URL',
            placeholder: 'https://api.openai.com/v1',
            validate: (value) => {
                if (!value) return 'BASE URL 不能为空';
            }
        })
    }, {
        onCancel: () => {
            prompts.cancel('下次再见')
            process.exit(0)
        }
    })
    console.log('info', info)
}
main()