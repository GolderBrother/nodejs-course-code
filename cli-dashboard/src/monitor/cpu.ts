import contrib from "blessed-contrib";
import sf from 'systeminformation';
import { BaseMonitor } from "./base.js";

const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red'];

type CpuData = {
    title: string;
    style: {
        line: string;
    };
    x: number[];
    y: number[];
};

export class CpuMonitor extends BaseMonitor{
    lineChart: contrib.Widgets.PictureElement;
    cpuData: CpuData[] = [];
    interval: NodeJS.Timeout | null = null;

    constructor(lineChart: contrib.Widgets.PictureElement) {
        super()
        this.lineChart = lineChart;
    }

    init() {
        sf.currentLoad(data => {
            const { cpus = [] } = data;
            const cpuData = cpus.map((_, index) => {
                return {
                    title: `CPU-${index}`,
                    style: {
                        line: colors[index % colors.length],
                    },
                    x: new Array(60).fill(0).map((_, i) => 60 - i),
                    // nit 里刚开始在不同位置填充 60 个 0，渲染一次 Array(60).fill(0).map((_, i) => 60 - i),
                    y: new Array(60).fill(0)
                }
            })

            this.cpuData = cpuData;
            this.updateData(data)

            // 每秒更新一次：每一秒都前面 shift 一个、后面 push 一个
            const interval = setInterval(() => {
                sf.currentLoad(data => this.updateData(data))
            }, 1000)
            this.interval = interval;
        })
    }
    updateData(data: sf.Systeminformation.CurrentLoadData) {
        data.cpus.forEach((cpu, i) => {
            let loadString = cpu.load.toFixed(1).toString();

            while (loadString.length < 6) {
                loadString = ' ' + loadString;
            }

            loadString = loadString + '%';

            this.cpuData[i].title = 'CPU' + (i + 1) + loadString;
            // 实现不断左移效果
            this.cpuData[i].y.shift();
            this.cpuData[i].y.push(cpu.load);
        });

        this.lineChart.setData(this.cpuData);
        this.lineChart.screen.render();
    }
}
