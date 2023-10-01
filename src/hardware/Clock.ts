import Hardware from "./Hardware";
import { CloockListener } from "./imp/ClockListener";

export class Clock extends Hardware {

    public listenersList: Array<CloockListener> = [];

    constructor() {
        super("Clock", 0);
    }

    public initClockListeners(clock: CloockListener) {
        this.listenersList.push(clock);
    }

    public sendPulse() {
        console.log("pulsing");

        for (let clock of this.listenersList) {
            clock.pulse();
        }
    }

    public startClock(interval: number) {

        setInterval(() => {
            return this.sendPulse();
        }, interval);
    }
    
}
