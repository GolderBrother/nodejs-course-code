import contrib from "blessed-contrib";
import sf from 'systeminformation'
import { BaseMonitor } from "./base.js";

const parts: Record<string, any> = {
    p: 'pid',
    c: 'cpu',
    m: 'mem',
  };
  

export class ProcessMonitor extends BaseMonitor{
    table: contrib.Widgets.TableElement;

    interval: NodeJS.Timeout | null = null;
  
    // pSort 是根据哪个字段排序，默认是 cpu
    pSort: string = parts.c;
    reIndex: boolean = false;
    reverse: boolean = false;

    constructor(table: contrib.widget.Table) {
        super();
        this.table = table
    }

    init(): void {
        const getData = () => {
            sf.processes(data => {
                this.updateData(data)
            })
        }
        getData()
        
        this.interval = setInterval(getData, 3000);

        this.table.screen.key(['m', 'c', 'p'], (ch) => {
            // 如果已经按过了，就设置 reverse，也就是正序还是倒序
          if (parts[ch] == this.pSort) {
            this.reverse = !this.reverse;
          } else {
            // 记录 pSort，也就是根据什么排序
            this.pSort = parts[ch] || this.pSort;
          }
      
          this.reIndex = true;
          getData();
        });
    }

    updateData(data: sf.Systeminformation.ProcessesData) {
        const part = this.pSort;

        const list = data.list
          .sort(function(a: any, b: any) {
            return b[part] - a[part];
          })
          .map(p => {
            // 首先根据选中的字段来排下序，取出要渲染的字段
            return [
              p.pid + '',
              p.command,
              ' ' + p.cpu.toFixed(1),
              p.mem.toFixed(1),
            ];
          });
    
        const headers = ['PID', 'Command', '%CPU', '%MEM'];
    
        const position = {
          pid: 0,
          cpu: 2,
          mem: 3,
        }[this.pSort]!
    
        headers[position] += this.reverse ? '▲' : '▼';
    
        // 设置 data
        this.table.setData({
          headers: headers,
          data: this.reverse ? list.reverse() : list,
        });
    
        if (this.reIndex) {
            // 并且根据是否需要翻转来切换选中的 index 为 0
          (this.table as any).rows.select(0);
          this.reIndex = false;
        }
    
        this.table.screen.render();
    }
}