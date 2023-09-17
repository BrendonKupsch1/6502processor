import Hardware from "./Hardware";
import { System } from "../System";


export class Memory extends Hardware {
    private hexList = new Array<number>(0x10000);
    private _MAR: number = 0x0000;
    private _MDR: number = 0x00;
    private _Memory = new Array<number>(0xffff);


    constructor() {
        super("Memory", 0);
        this.log("Memory length: " + this._Memory.length.toString());
    }

    public getMAR() {
        return this._MAR;
    }

    public setMAR(mAR: number) {
        this._MAR = mAR;
    }

    public getMDR() {
        return this._MDR;
    }

    public setMDR(mDR: number) {
        this._MDR = mDR;
    }

    public getMemory() {
        return this._Memory;
    }

    public setMemory(mem: Array<number>) {
        this._Memory = mem;
    }


    public reset(): void {
        this._MAR = 0x00;
        this._MAR = 0x0000;
        this._MDR = 0x00;

        // Clear memory
        for (let i = 0x00; i < this._Memory.length; i++) {
            this._Memory = [i];
        }
    }

    public read(): void {
        this.setMDR(this._Memory[this.getMAR()]);
    }

    public write(): void {
        this._Memory[this.getMAR()] = this.getMDR();
    }

    public initMemory(): void {
        for (let i = 0x00; i < this.hexList.length; i++) {
            this.hexList[i] = 0x00;
        }
    }

    // displays memory in hex
    public displayMemory(length: number, padding: number): void {
        for (let i = 0x00; i < length; i++) {
            if (i < 0x10000) {
                this.hexLog(this.hexList[i], padding);
            }
            else {
                console.log("[HW - " + this.name + "id:" + this.id + " - " + new Date() + "]:Address : " + i + "contains Value: ERR [hexValue conversion]: number undefined");
                break;
            }
        }
    }
}