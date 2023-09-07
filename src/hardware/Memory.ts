import Hardware from './Hardware';

class Memory extends Hardware {
    private _memory: [number, number] = [0x00, 0x00];
}

function iterateThroughArrayHex(array: [number, number]): string {
    let hexString: string = '';
    for (let i = 0; i < array.length; i++) {
        hexString += array[i].toString(16);
    }
    return hexString;
}
console.log(iterateThroughArrayHex([0x0a, 0x00]));