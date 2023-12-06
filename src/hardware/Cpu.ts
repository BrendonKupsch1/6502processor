import { System } from '../System';
import Hardware from './Hardware';
import { CloockListener } from './imp/ClockListener';
import { MMU } from './MMU';

class Cpu extends Hardware implements CloockListener {

    public cpuClockCount: number = 0;
    public pipeLine: number = 1;
    public programCounter: number = 0x0000;
    public xRegister: number = 0x00;
    public yRegister: number = 0x00;
    public zFlag: number = 0;
    private accNum; number;

    constructor() {
       super(0, "CPU");

       this.log("CPU Initialized");
    }

    pulse() {
        let time: number = new Date().getTime();
        this.cpuClockCount++;
        console.log("[HW - " + this.name + " id: " + this.id + " - " + time + "] Received clock pulse - CPU CLock Count: " + this.cpuClockCount);
    }
 
    log(message: string): void {
        super.log(message);
    }

    getInfo(): string {
        return '${super.getInfo()}';
    }
}

export default Cpu;