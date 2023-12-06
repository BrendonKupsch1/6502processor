import Hardware from "./Hardware";
import { Memory } from "./Memory";

export class MMU extends Hardware {
    private memory: Memory = null;
    private _lowBit: number = null;
    private _highBit: number = null;

    constructor(id: number, name: string, debug: boolean, memory: Memory) {
        super(name, id);
        this.memory = memory;
    }

    // getters and setters
    public getLowBit(): number {
        return this._lowBit;
    }
    
    public setLowBit(value: number) {
        this._lowBit = value;
    }

    public getHighBitL(): number {
        return this._highBit;
    }

    public setHighBitL(value: number) {
        this._highBit = value;
    }

    public memoryDump(first: number, second: number) {
        this.memory.log("Initialized Memory");
        this.memory.log("Memory Dump Debug");
        this.memory.log("------------------------")
        let count = first;
        while (count <= second) {
            let mem = this.memory.getMemory();

            this.memory.log("ADDR: " + '000' + count.toString(16).toUpperCase() + ": | :" + mem[count].toString(16).toUpperCase());
            count += 0x01;
        }
        this.memory.log("------------------------")
        this.memory.log("Memory Dump Finished")
    }

    public writeImediate(address: number, op: number) {
        this.memory.setMAR(address);
        this.memory.setMDR(op);
        this.memory.write();
    }

    public endian(first: number, second: number): string {
        let out = second << 8;
        out = out + first;
        let endian = "0x" + out.toString(16).toUpperCase();
        return (endian);
    }

    public readNow(address: number): number {
        this.memory.setMAR(address);
        return this.memory.getMDR();
    }

    public readSep() {
        let number = this.endian(this._lowBit, this._highBit);
        let addr = parseInt(number);
        return this.memory.getMDR();
    }

    public writeToMem(lowBit: number, highBit: number, is: number) {
        var temp: number = parseInt(this.endian(lowBit, highBit), 16);
        this.writeImediate(temp, is);
    }

    public readFromMem(lowBit: number, highBit: number) {
        var temp: number = parseInt(this.endian(lowBit, highBit));
        return this.readNow(temp);
    }

}