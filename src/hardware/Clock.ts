import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Clock extends Hardware {

    public listenersList: Array<ClockListener> = [];

    constructor() {
        super(0, 'Clock')
    }

    public initClockListeners(clock: ClockListener) {
        this.listenersList.push(clock);
    }

    public startClock(interval: number) {
        var that = this;
        setInterval(function () {
            return that.pulseOut();
        }, interval);
    }

    public pulseOut() {
        console.log("Clock pulsing");
        for (let clock of this.listenersList) {
            clock.pulse();
        }
    }
}
