import contrib from 'blessed-contrib'
import sf from "systeminformation";
import { formatSizeToGB } from "../utils/index.js";
import { BaseMonitor } from "./base.js";
type ChartType = contrib.Widgets.PictureElement;

type FsSizeData = sf.Systeminformation.FsSizeData;
export class DiskMonitor extends BaseMonitor {
    donut: ChartType;

    interval: NodeJS.Timeout | null = null;

    constructor(donut: ChartType) {
        super()
        this.donut = donut;
    }
    init() {
        const getFsData = () => {
            sf.fsSize('', data => {
                this.updateData(data)
            })
        }
        getFsData();

        this.interval = setInterval(getFsData, 10000);
    }
    updateData(data: FsSizeData[]) {
        const disk = data[0];

        const label =
            formatSizeToGB(disk.used) +
            ' of ' +
            formatSizeToGB(disk.size);
      
        this.donut.setData([
            {
                percent: disk.use / 100,
                label: label,
                color: 'green',
            }
        ]);
        this.donut.screen.render();
    }
}