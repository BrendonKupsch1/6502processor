export default class Hardware {
    public id: number;
    public name: String;
    private debug: boolean = true;

    public constructor(iD, name) {
        this.id = iD;
        this.name = name;
    }

    // hexadecimal number output
    hexLog(num: number, length: number) {
        let hexOutput = num.toString(16).toUpperCase();
        while (hexOutput.length < length) {
            hexOutput = 0x00 + hexOutput;
        }
        return hexOutput;
    }

    log(message: string): void {
        if (this.debug) {
            const currentTime = new Date().getTime();
            console.log(`[HW - ${this.name} id: ${this.id} - ${currentTime}]: ${message}`); 
        }
    }

    
    
    getInfo(): string {
        return `NameL ${this.name}, id: ${this.id}`;
    }
}