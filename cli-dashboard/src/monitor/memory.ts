import contrib from "blessed-contrib";
import sf from "systeminformation";
import { formatSizeToGB } from "../utils/index.js";
import { BaseMonitor } from "./base.js";
const colors = ["magenta", "cyan", "blue", "yellow", "green", "red"];

type ChartType = contrib.Widgets.PictureElement;
type MemData = {
  title: string;
  style: {
    line: string;
  };
  x: number[];
  y: number[];
};

export class MemoryMonitor extends BaseMonitor {
  lineChart: ChartType;
  memDonut: ChartType;
  swapDonut: ChartType;

  interval: NodeJS.Timeout | null = null;
  memData: MemData[] = [];

  constructor(lineChart: ChartType, memDonut: ChartType, swapDonut: ChartType) {
    super();
    this.lineChart = lineChart;
    this.memDonut = memDonut;
    this.swapDonut = swapDonut;
  }

  init() {
    sf.mem((data) => {
      const [MemoryColor, SwapColor] = colors;
      this.memData = [
        {
          title: "Memory",
          style: {
            line: MemoryColor,
          },
          x: Array(60)
            .fill(0)
            .map((_, i) => 60 - i),
          y: Array(60).fill(0),
        },
        {
          title: "Swap",
          style: {
            line: SwapColor,
          },
          x: Array(60)
            .fill(0)
            .map((_, i) => 60 - i),
          y: Array(60).fill(0),
        },
      ];

      this.updateData(data);

      this.interval = setInterval(() => {
        sf.mem((data) => {
          this.updateData(data);
        });
      }, 1000);
    });
  }
  updateData(data: sf.Systeminformation.MemData) {
    // 内存占用率
    let memPer = +(100 * (1 - data.available / data.total)).toFixed();
    // 置换率
    let swapPer = +(100 * (1 - data.swapfree / data.swaptotal)).toFixed();

    swapPer = isNaN(swapPer) ? 0 : swapPer;

    this.memData[0].y.shift();
    this.memData[0].y.push(memPer);

    this.memData[1].y.shift();
    this.memData[1].y.push(swapPer);

    this.lineChart.setData(this.memData);

    const memTitle =
      formatSizeToGB(data.total - data.available) +
      ' of ' +
      formatSizeToGB(data.total);

    const swapTitle =
      formatSizeToGB(data.swaptotal - data.swapfree) +
      ' of ' +
      formatSizeToGB(data.swaptotal);

    this.memDonut.setData([
      {
        percent: memPer / 100,
        label: memTitle,
        color: colors[0],
      },
    ]);
    this.swapDonut.setData([
      {
        percent: swapPer / 100,
        label: swapTitle,
        color: colors[1],
      },
    ]);
    this.lineChart.screen.render();
  }
}
