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
    private accNum: number;
    private instructionRegister: number = 0x00;
    private mmu: MMU = null;

    constructor() {
       super(0, "CPU");

       this.log("CPU Initialized");
    }

    pulse() {
        let time: number = new Date().getTime();
        this.cpuClockCount++;
        console.log("[HW - " + this.name + " id: " + this.id + " - " + time + "] Received clock pulse - CPU CLock Count: " + this.cpuClockCount);

        // pipeline logic
        if (this.pipeLine == 1) {
            this.fetch();
        }

        if (this.pipeLine == 2) {
            this.decode();
        }

        if (this.pipeLine == 3) {
            this.execute();
        }

        if (this.pipeLine == 4) {
            this.writeBack();
        }

        else if (this.pipeLine == 5) {
            this.interruptCheck();
        }
        this.writeBack();
    }

    public fetch(): void {
        this.instructionRegister = this.mmu.readNow(this.programCounter);
        this.programCounter++;
    }

    public decode(): void {
        if ((this.instructionRegister == 0xA9)
        {

        }

        if ((this.instructionRegister == 0xAD)
        {

        }

        else if (this.pipeLine == 0) {
            
        }
    }

    public execute(): void {
    }

    public interruptCheck(): void {
        
    }

    public writeBack(): void {
    }
 
    log(message: string): void {
        super.log(message);
    }

    getInfo(): string {
        return '${super.getInfo()}';
    }
}

export default Cpu;