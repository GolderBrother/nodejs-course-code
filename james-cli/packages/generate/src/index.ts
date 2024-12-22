import { select, input, confirm } from "@inquirer/prompts";
import OpenAI from "openai";
import fse from 'fs-extra';
import { remark } from "remark";
import path from "path";
import ora from 'ora';

// baseURL: 'https://api.302.ai/v1'

const client = new OpenAI({
    apiKey: "xxx", // your api key
    baseURL: "https://api.302.ai/v1",
});
const systemContent = `
# Role: 前端工程师

## Profile

- author: james
- language: 中文
- description: 你非常擅长写 React 组件

## Goals

- 根据用户需求生成组件代码

## Skills

- 熟练掌握 typescript

- 会写高质量的 React 组件

## Constraints

- 用到的组件来源于 antd

- 样式用 scss 写

## Workflows

根据用户描述生成的组件，规范如下：

组件包含 4 类文件:

    1、index.ts
    这个文件中的内容如下：
    export { default as [组件名] } from './[组件名]';
    export type { [组件名]Props } from './interface';

    2、interface.ts
    这个文件中的内容如下，请把组件的props内容补充完整：
    interface [组件名]Props {}
    export type { [组件名]Props };

    4、[组件名].tsx
    这个文件中存放组件的真正业务逻辑，不能编写内联样式，如果需要样式必须在 5、styles.ts 中编写样式再导出给本文件用

    5、styles.scss
    这个文件中必须用 scss 给组件写样式，导出提供给 4、[组件名].tsx

    每个文件之间通过这样的方式分隔：

    # [目录名]/[文件名]

    目录名是用户给出的组件名

## Initialization

作为前端工程师，你知道你的[Goals]，掌握技能[Skills]，记住[Constraints], 与用户对话，并按照[Workflows]进行回答，提供组件生成服务
`;

async function generate() {
    let componentDir = '';
    while (!componentDir) {
        componentDir = await input({
            message: '生成组件的目录',
            default: 'src/components'
        })
    }

    let componentDesc = ''
    while (!componentDesc) {
        componentDesc = await input({
            message: '请输入组件描述',
            default: '生成一个 Table 组件，有包含 name、age、email 属性的 data 数组参数'
        })
    }
    const spinner = ora('AI代码生成中，请稍等...').start();
    const res = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: systemContent },
            { role: "user", content: `描述：${componentDesc}` },
            { role: "user", content: `目录：${componentDir}` },
        ],
    });
    const markdownContent = res.choices[0].message.content || '';

    spinner.stop();
    await remark().use((...args) => {
        return (tree: any) => {
            let curPath = '';
            for (const node of tree.children) {
                const { type, children, value } = node
                if (type === 'heading') {
                    const [child] = children;
                    if (child) {
                        const { value } = child
                        // 这里要判断，如果value包含了componentDir，那么就不要重复拼接，比如下面这样
                        // componentDir src/components
                        // value src/components/Table/Table.tsx
                        // 判断 value 是否包含 componentDir
                        if (value.includes(componentDir)) {
                            // 如果包含，直接使用 value
                            curPath = value;
                        } else {
                            // 如果不包含，拼接 componentDir 和 value
                            curPath = path.join(componentDir, value);
                        }
                    }
                } else {
                    try {
                        fse.ensureFileSync(curPath);
                        fse.writeFileSync(curPath, value);
                        console.log('文件创建成功：', curPath)
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        }
    }).process(markdownContent)

}
generate();

export default generate;
