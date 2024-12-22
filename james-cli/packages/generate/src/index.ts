import { select, input, confirm } from "@inquirer/prompts";
import OpenAI from "openai";
import fse from 'fs-extra';
import { remark } from "remark";
import path from "path";
import ora from 'ora';
import { cosmiconfig } from "cosmiconfig";
import { ConfigOptions } from "./configType.js";

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
    const explorer = cosmiconfig('generate');
    // const result = await explorer.search(path.join(import.meta.dirname, '../'))
    const result = await explorer.search(process.cwd());
    const config: ConfigOptions = result?.config
    if (!config) {
        spinner.fail('未找到配置文件 generate.config.js');
        process.exit(1);
    }
    const client = new OpenAI({
        apiKey: config.apiKey, // your api key
        baseURL: config.baseUrl,
    });
    const res = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: config.systemSetting || '' },
            { role: "user", content: `描述：${componentDesc}` },
            { role: "user", content: `目录：${componentDir}` }
        ],
    });
    const markdownContent = res.choices[0].message.content || '';
    console.log('markdownContent', markdownContent)
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
                            // curPath = path.join(componentDir, value);
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
// generate();

export default generate;
