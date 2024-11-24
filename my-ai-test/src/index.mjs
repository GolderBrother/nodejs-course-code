import OpenAI from 'openai';

const client = new OpenAI({
    // apiKey: '',
    // baseURL: 'https://api.302.ai/v1'
    // 本地模型
    apiKey: '',
    baseURL: 'http://localhost:8080/api/application/8b3ec0b8-aa21-11ef-a104-0242ac110002'
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
    //   { role: 'user', content: '今天早上吃什么，给我一些推荐一些有营养而且清淡点的菜' },
      // { role: 'user', content: '我在11月23日那天做了什么事情？' },
      // { role: 'user', content: '李晓静和张宇有什么故事' },
      // { role: 'user', content: '樱花下的心跳' },
      // { role: 'user', content: '艾米莉和卢卡斯有什么故事' },
      // { role: 'user', content: '艾米莉和卢卡斯是什么关系' },
      // { role: 'user', content: '艾米莉和卢卡斯后续会发生啥，请绪写一段故事' },
      { role: 'user', content: '苏妍和李晨是什么关系' },
      
    ],
    stream: true
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();

// curl http://localhost:11434/api/chat -d '{
//   "model": "qwen2.5:1.5b",
//   "messages": [
//     { "role": "user", "content": "介绍下西游记" }
//   ]
// }'