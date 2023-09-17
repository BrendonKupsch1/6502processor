export default class Hardware {
    name: string;
    id:number;
    debug: boolean = true;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    // hexadecimal number output
    hexLog(num: number, length: number) {
        let hexOutput = num.toString(16).toUpperCase();
        while (hexOutput.length < length) {
            hexOutput = '0' + hexOutput;
        }
        this.log(hexOutput)
    }

    log(message: string): void {
        if (this.debug) {
            const currentTime = new Date().getTime();
            console.log(`[HW - ${this.name} id: ${this.id} - ${currentTime}]: ${message}`); 
        }
    }

    
    
    getInfo(): string {
        return 'Name: ${this.name}, ID: ${this.id}';
    }
}