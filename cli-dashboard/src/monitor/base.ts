import contrib from "blessed-contrib";

type ChartType = contrib.Widgets.PictureElement;

export class BaseMonitor {
    // lineChart: ChartType;
    interval: NodeJS.Timeout | null = null;
    constructor() { }

    init(){
        throw new Error('please implement init method')
    }
    // updateData(){}
    dispose() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null;
        }
    }

}