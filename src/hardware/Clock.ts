import Hardware from "./Hardware";
import { CloockListener } from "./imp/ClockListener";

export class Clock extends Hardware {

    public listeners: CloockListener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private clockInterval: number;

    constructor(clockInterval: number) {
        super("Clock", 0);
        this.clockInterval = clockInterval;
    }

    public initClockListeners(clock: CloockListener) {
        this.listenersList.push(clock);
    }

    public startClock(interval: number) {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => this.tick(), this.clockInterval)
        }
    }

    public stopClock() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private tick(): void {
        for (const listener of this.listeners) {
            listener.pulse();
        }
    }
    
}
