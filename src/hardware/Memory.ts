import Hardware from "./Hardware";


export class Memory extends Hardware {
    private hexList = new Array<number>(0x10000);
    private address: number = 0x0000;
    private data: number = 0x00;
    private _Memory = new Array<number>(0xffff);


    constructor() {
        super("Memory", 0);
        this.log("Memory length: " + this._Memory.length.toString());
    }

    public getAdress() {
        return this.address;
    }

    public setAdress(Adress: number) {
        this.address = Adress;
    }

    public getData() {
        return this.data;
    }

    public setData(Data: number) {
        this.data = Data;
    }

    public getMemory() {
        return this._Memory;
    }

    public setMemory(Memory: Array<number>) {
        this._Memory = Memory;
    }


    public reset(): void {
        this.address = 0x00;
        this.address = 0x0000;
        this.data = 0x00;

        // Clear memory
        for (let i = 0x00; i < this._Memory.length; i++) {
            this._Memory = [i];
        }
    }

    public read(): void {
        this.setData(this._Memory[this.getAdress()]);
    }

    public write(): void {
        this._Memory[this.getAdress()] = this.getData();
    }

    public initMemory(): void {
        for (let i = 0x00; i < this.hexList.length; i++) {
            this.hexList[i] = 0x00;
        }
    }

    // displays address in memory
    public displayMemory(length: number, padding: number): void {
        for (let i = 0x00; i < length; i++) {
            if (i < 0x10000) {
                this.hexLog(this.hexList[i], padding);
            }
            else {
                console.log("[HW - " + this.name + "id:" + this.id + " - " + new Date() + "]:Adress : " + i + " is out of range");
                break;
            }
        }
    }


}