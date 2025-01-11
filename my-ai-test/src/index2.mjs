import OpenAI from 'openai';
import fs from 'node:fs';
import { resolve, dirname } from 'node:path';

const client = new OpenAI({
  apiKey: '',
  baseURL: 'https://api.302.ai/v1'
});

async function main() {
  const __dirname = dirname(new URL(import.meta.url).pathname);
  const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {role: 'system', content: fs.readFileSync(resolve(__dirname, 'system.md'), 'utf-8')},
      {role: 'user', content: '生成一个 Table 的 React 组件'},
      {role: 'assistant', content: fs.readFileSync(resolve(__dirname, 'response1.md'), 'utf-8')},
      {role: 'user', content: '在这个基础上加上 sass 写下样式，并且不要用 table，有 name、age、email 三列，数据是参数传入的'}
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "getCode",
          description: "生成的组件代码",
          parameters: {
            type: "object",
            properties: {
              'index.ts': {
                type: "string",
                description: "生成的 index.ts 代码"
              },
              'types.ts': {
                type: "string",
                description: "生成的 types.ts 代码"
              },
              '[组件名].tsx': {
                type: "string",
                description: "生成的 [组件名].tsx 代码"
              },
              'style.less': {
                type: "string",
                description: "生成的 style.less 代码"
              },
            },
            required: ["index.ts", 'types.ts', '[组件名].tsx', 'style.less']
          }
        }
      },
    ],
    // stream: true
  });

  console.log(stream.choices[0].message.tool_calls[0].function)

}

main();