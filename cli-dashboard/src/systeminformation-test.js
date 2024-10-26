import sf from 'systeminformation';

sf.currentLoad(data => {
    console.log('currentLoad data', data)
})

// 文件系统
// sf.fsSize(data => {
//     console.log('文件系统 data', data)
// })

// 内存信息
// sf.mem(data => {
//     console.log('内存信息 data', data)
// })

/** 网络信息 */
// sf.networkInterfaceDefault(iface => {
//     console.log(iface);
//     sf.networkStats(iface, data => {
//         console.log(data);
//     });
// })

/** 进程信息 */
// sf.processes(data => {
//     console.log('processes data', data);
// })