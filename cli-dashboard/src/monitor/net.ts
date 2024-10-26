import contrib from "blessed-contrib";
import sf from 'systeminformation'
import { BaseMonitor } from "./base.js";
import { formatSize } from "../utils/index.js";

type ChartType = contrib.Widgets.PictureElement;


export class NetMonitor extends BaseMonitor{
    sparkline: ChartType;

    interval: NodeJS.Timeout | null = null;
    netData: number[] = []

    constructor(sparkline: ChartType ) {
        super()
        this.sparkline = sparkline;
    }

    init(): void {
        this.netData = Array(60).fill(0)

        sf.networkInterfaceDefault(iface => {
            const updater = () => {
                sf.networkStats(iface, data => {
                    this.updateData(data[0]);
                });
            };

            updater();
        
            this.interval = setInterval(updater, 1000);
        });
    }

    updateData(data: sf.Systeminformation.NetworkStatsData[]) {
        const rx_sec = Math.max(0, Number(data['rx_sec']));
      
        this.netData.shift();
        this.netData.push(rx_sec);
      
        const rx_label =`Receiving:      ${formatSize(rx_sec)}\nTotal received: ${formatSize(data['rx_bytes'])}`

        this.sparkline.setData([rx_label], [this.netData]);
        this.sparkline.screen.render();
    }
}