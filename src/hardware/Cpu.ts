import Hardware from './Hardware';
import { CloockListener } from './imp/ClockListener';

class Cpu extends Hardware implements CloockListener {

    public cpuClockCount: number = 0;

    constructor(id: number) {
       super('Cpu', id);
    }

    pulse() {
        let time: number = new Date().getTime();
        this.cpuClockCount++;
        console.log("HW " + this.name + " id " + this.id + " " + time + " Received clock pulse - CPU CLock Count: " + this.cpuClockCount);
    }
 
    log(message: string): void {
        super.log(message);
    }

    getInfo(): string {
        return '${super.getInfo()}';
    }
}

export default Cpu;