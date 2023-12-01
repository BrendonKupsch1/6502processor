import Hardware from "./Hardware";
import { CloockListener } from "./imp/ClockListener";

export class Clock extends Hardware {

    public listenersList: Array<CloockListener> = [];
    private inervalId: NodeJS.Timeout | null = null;
    private clockInterval: number;

    constructor(clockInterval: number) {
        super("Clock", 0);
        this.clockInterval = clockInterval;
    }

    public initClockListeners(clock: CloockListener) {
        this.listenersList.push(clock);
    

    public startClock(interval: number) {

        setInterval(() => {
            return this.sendPulse();
        }, interval);
    }
    
}
