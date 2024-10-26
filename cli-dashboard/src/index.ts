import blessed from "blessed";
import contrib from "blessed-contrib";
import { CpuMonitor } from "./monitor/cpu.js";
import { MemoryMonitor } from "./monitor/memory.js";
import { NetMonitor } from "./monitor/net.js";
import { DiskMonitor } from "./monitor/disk.js";
import { ProcessMonitor } from "./monitor/process.js";

const screen = blessed.screen({
  fullUnicode: true,
});

const grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen,
});

const cpuLineChart = grid.set(0, 0, 4, 12, contrib.line, {
  label: "CPU 占用",
  showLegend: true,
});

const memLineChart = grid.set(4, 0, 4, 8, contrib.line, {
  label: "内存和交换分区占用",
  showLegend: true,
});

const memDonut = grid.set(4, 8, 2, 4, contrib.donut, {
  radius: 4,
  arcWidth: 2,
  label: "内存占用",
});

const swapDonut = grid.set(6, 8, 2, 4, contrib.donut, {
  radius: 4,
  arcWidth: 2,
  label: "交换分区",
});

const netSpark = grid.set(8, 0, 2, 6, contrib.sparkline, {
  label: "网络使用情况",
  tags: true,
  style: {
    fg: "blue",
  },
});

const diskDonut = grid.set(10, 0, 2, 6, contrib.donut, {
  // 半径为 4，圆环宽度为 2
  radius: 4,
  arcWidth: 2,
  label: "磁盘使用",
});

const processTable = grid.set(8, 6, 4, 6, contrib.table, {
  keys: true,
  label: "进程列表",
  columnSpacing: 1,
  columnWidth: [7, 24, 7, 7],
});

processTable.focus();

screen.render();

screen.key("C-c", function () {
  screen.destroy();
});

function start() {
  new CpuMonitor(cpuLineChart).init();
  new MemoryMonitor(cpuLineChart, memDonut, swapDonut).init();
  new NetMonitor(netSpark).init();
  new DiskMonitor(diskDonut).init();
  new ProcessMonitor(processTable).init();
}

start()
