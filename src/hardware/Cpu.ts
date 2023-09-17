import Hardware from './Hardware';

class Cpu extends Hardware {
    constructor(id: number) {
       super('Cpu', id);
    }
 
    log(message: string): void {
        super.log(message);
    }

    getInfo(): string {
        return '${super.getInfo()}';
    }
}

export default Cpu;