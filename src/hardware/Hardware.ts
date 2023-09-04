export default class Hardware {
    name: string;
    id:number;
    debug: boolean = true;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    log(message: string): void {
        if (this.debug) {
            const currentTime = new Date().getTime();
            console.log('[HW - ${this.name} id: ${this.id} - ${currenttime}]: ${message}'); 
        }
    }
    
    getInfo(): string {
        return 'Name: ${this.name}, ID: ${this.id}';
    }
}