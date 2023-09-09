import Hardware from './Hardware';

class Memory {
    debug: boolean = true;
    name: string;

    private memory: string[] = []; // create private array for memory
  
    constructor(size: number) {
      const length = size * 2; // each element stores 2 hex digits
      const hexValue = "00".repeat(length); // create hex string of all 0x00
      for (let i = 0; i < length; i+=2) {
        this.memory.push(hexValue.substring(i, i+2)); // split hex string into 2 digit chunks and push to memory array
      }
    }
  
    public initializeMemory() {
      const length = this.memory.length;
      for (let i = 0; i < length; i++) {
        this.memory[i] = "00"; // set each element to 0x00
      }
    }
  
    log(message: string): void {
        if (this.debug) {
            const currentTime = new Date().getTime();
            console.log(256); // enter output of hex iteration here to test
        }
    }
  }

export default Memory;