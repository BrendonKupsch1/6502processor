import { System } from '../System';
import { Hardware } from './Hardware';
import { ClockListener } from './imp/ClockListener';
import { MMU } from './MMU';
import { Ascii } from './utility/Ascii';
import { InterruptController } from './InterruptController';

export class Cpu extends Hardware implements ClockListener {

    public cpuClockCount: number = 0;
    public pipeLine: number = 1;
    public programCounter: number = 0x0000;
    public xRegister: number = 0x00;
    public yRegister: number = 0x00;
    public zFlag: number = 0;
    private accNum: number;
    private instructionRegister: number = 0x00;
    public opcode: number;
    public operand: 0x00;
    private mode: number = 0;
    private InterruptController = new InterruptController();
    private logs : boolean = true;
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
        if (this.pipeLine == 0) {
            this.fetch();
        }

        if (this.pipeLine == 1) {
            this.decode();
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
        if ((this.instructionRegister == 0xA9) || (this.instructionRegister == 0xA2) || (this.instructionRegister == 0xD0))
        {
            this.mmu.setLowBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 1;
        }

        if ((this.instructionRegister == 0xAD) || (this.instructionRegister == 0x8D) || (this.instructionRegister == 0x6D) || (this.instructionRegister == 0xAE)
        || (this.instructionRegister == 0xAC) || (this.instructionRegister == 0xEC) || (this.instructionRegister == 0xEE))
        {
            this.mmu.setLowBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 2;
        }

        else if (this.pipeLine == 0) 
        {
            this.mmu.setHighBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 3;
        }
    }

    public execute(): void {
        if (this.instructionRegister == 0xA9) {
            // load constant with read now in acc
            this.accNum = this.mmu.readNow(this.programCounter);
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xAD) {
            // load acc from mem
            this.accNum = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0x8D) {
            // store acc in mem
            this.mmu.writeToMem(this.mmu.getLowBit(), this.mmu.getHighBit(), this.accNum);
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0x6D) {
            // add with carry
            this.accNum += this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xA2) {
            // load x register with constant
            this.xRegister = this.mmu.getLowBit();
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xAE) {
            // load x register from mem
            this.xRegister = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xA0) {
            // load y register with constant
            this.yRegister = this.mmu.getHighBit();
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xAC) {
            // load y register from mem
            this.yRegister = this.mmu.readNow(this.programCounter);
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xA8) {
            // load y register from acc
            this.yRegister = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;
        }
        else if (this.instructionRegister == 0xEA) {
            // no operation
        }
        else if (this.instructionRegister == 0xEC) {
            if (this.xRegister == this.mmu.readNow(this.programCounter)) {
                this.zFlag = 1;
                this.pipeLine = 5;
            }
        }
        else if (this.instructionRegister == 0xD0) {
            // branch if z flag is 0 
            if (this.zFlag == 0) {
                this.programCounter += this.mmu.readNow(this.programCounter);
                this.pipeLine = 5;
            }
        }
        else if (this.instructionRegister == 0xEE) {
            // increment value of byte
            if (this.pipeLine == 2) {
                this.accNum = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
                this.pipeLine = 3;
            }
            else if (this.pipeLine == 3) {
                this.accNum++;
                this.pipeLine = 4;
            }
        }
        else if (this.instructionRegister == 0xFF) {
            // system call
            if (this.xRegister == 0x01) {
                console.log(this.yRegister);
                this.programCounter++;
            }
            else if (this.xRegister == 0x02) {
                this.programCounter = this.mmu.readNow(this.programCounter);
                if (this.mmu.readNow(this.programCounter) != 0x00) {
                    console.log(Ascii.asciiCode(this.mmu.readNow(this.programCounter)));
                    this.pipeLine = 5;
                }
            }
        }
        else if (this.instructionRegister == 0x00) {
            // break
            process.exit();
        }

    }

    public interruptCheck(): void {
        // pops key presses into queue 
        this.log(this.InterruptController.outputBuffer.popQueue().toString());
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