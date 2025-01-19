import os from 'node:os'
console.log(`aaa${os.EOL}bbb${os.EOL}`)
console.log(os.cpus())

// [
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 1340100, nice: 0, sys: 1050890, idle: 3739330, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 1335920, nice: 0, sys: 1024370, idle: 3806630, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 867830, nice: 0, sys: 444300, idle: 5036980, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 666480, nice: 0, sys: 312370, idle: 5394550, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 427400, nice: 0, sys: 197440, idle: 5762720, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 309200, nice: 0, sys: 142370, idle: 5942210, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 231330, nice: 0, sys: 113240, idle: 6060020, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 153820, nice: 0, sys: 67870, idle: 6187630, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 106590, nice: 0, sys: 42100, idle: 6263910, irq: 0 }
//     },
//     {
//       model: 'Apple M1 Pro',
//       speed: 2400,
//       times: { user: 85370, nice: 0, sys: 31050, idle: 6297580, irq: 0 }
//     }
//   ]

// 系统类型
console.log(os.type());
// 当前用户相关的信息
console.log(`userInfo: `, os.userInfo())
console.log(os.freemem(), os.totalmem());

console.log(`os.homedir(): `, os.homedir());
console.log(`networkInterfaces: `, os.networkInterfaces())