// Brendon Kupsch's notes are at the bottom of README.md
// import statements for hardware
import { Hardware } from './hardware/Hardware';
import { Cpu } from "./hardware/Cpu";
import { Memory } from "./hardware/Memory";
// import { toUnicode } from 'punycode';
import { ClockListener } from './hardware/imp/ClockListener';
import { Clock } from './hardware/Clock';
import { MMU } from './hardware/MMU';

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware {
    private _CPU : Cpu = null;
    private _Memory : Memory = null;
    private _Clock : Clock = null;
    private _MMU: MMU = null;

    public running: boolean = false;

    constructor() {
        super(0, 'System');

        this._CPU = new Cpu();

        this._Memory = new Memory();

        this._Clock = new Clock();

        this._MMU = new MMU(0, "MMU", true, this._Memory);

        // testing programs
        // remove "/* */" to test programs

        /*
        // Brendon's lab 2 program
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x00);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x01);
        this._MMU.writeImmediate(0x0007, 0x8D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x01);
        this._MMU.writeImmediate(0x000A, 0xA2);
        this._MMU.writeImmediate(0x000B, 0x00);
        this._MMU.writeImmediate(0x000C, 0xAD);
        this._MMU.writeImmediate(0x000D, 0x10);
        this._MMU.writeImmediate(0x000E, 0x00);
        this._MMU.writeImmediate(0x000F, 0x6D);
        this._MMU.writeImmediate(0x0010, 0x10);
        this._MMU.writeImmediate(0x0011, 0x01);
        this._MMU.writeImmediate(0x0012, 0x8D);
        this._MMU.writeImmediate(0x0013, 0x10);
        this._MMU.writeImmediate(0x0014, 0x02);
        this._MMU.writeImmediate(0x0015, 0xAD);
        this._MMU.writeImmediate(0x0016, 0x10);
        this._MMU.writeImmediate(0x0017, 0x01);
        this._MMU.writeImmediate(0x0018, 0x8D);
        this._MMU.writeImmediate(0x0019, 0x10);
        this._MMU.writeImmediate(0x001A, 0x00);
        this._MMU.writeImmediate(0x001B, 0xAD);
        this._MMU.writeImmediate(0x001C, 0x10);
        this._MMU.writeImmediate(0x001D, 0x02);
        this._MMU.writeImmediate(0x001E, 0x8D);
        this._MMU.writeImmediate(0x001F, 0x10);
        this._MMU.writeImmediate(0x0020, 0x01);
        this._MMU.writeImmediate(0x0021, 0xAD);
        this._MMU.writeImmediate(0x0022, 0x10);
        this._MMU.writeImmediate(0x0023, 0x00);
        this._MMU.writeImmediate(0x0024, 0x95);
        this._MMU.writeImmediate(0x0025, 0x00);
        this._MMU.writeImmediate(0x0026, 0xE8);
        this._MMU.writeImmediate(0x0027, 0xE0);
        this._MMU.writeImmediate(0x0028, 0x0A);
        this._MMU.writeImmediate(0x0029, 0xD0);
        this._MMU.writeImmediate(0x002A, 0xF4);
        this._MMU.writeImmediate(0x002B, 0x60);
        */

        
        // powersProgram()
        // load constant 0
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x40);
        this._MMU.writeImmediate(0x0004, 0x00);
        // load constant 1
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x40);
        this._MMU.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this._MMU.writeImmediate(0x000A, 0x8D);
        this._MMU.writeImmediate(0x000B, 0x40);
        this._MMU.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this._MMU.writeImmediate(0x000D, 0xAC);
        this._MMU.writeImmediate(0x000E, 0x40);
        this._MMU.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this._MMU.writeImmediate(0x0010, 0xA2);
        this._MMU.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this._MMU.writeImmediate(0x0013, 0xA2);
        this._MMU.writeImmediate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0015, 0xFF);
        this._MMU.writeImmediate(0x0016, 0x50);
        this._MMU.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xRegcontains B2)
        this._MMU.writeImmediate(0x0018, 0xD0);
        this._MMU.writeImmediate(0x0019, 0xED);
        // globals
        this._MMU.writeImmediate(0x0050, 0x2C);
        this._MMU.writeImmediate(0x0052, 0x00);
        this._MMU.memoryDump(0x0000, 0x001A);
        this.log("------------------------");
        this._MMU.memoryDump(0x0050, 0x0053);
        

        /*
        // systemCallProgram()
        // load constant 3
        this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x0A);
        // write acc (3) to 0040
        this.writeImmediate(0x0002, 0x8D);
        this.writeImmediate(0x0003, 0x40);
        this.writeImmediate(0x0004, 0x00);
        // :loop
        // Load y from memory (3)
        this.writeImmediate(0x0005, 0xAC);
        this.writeImmediate(0x0006, 0x40);
        this.writeImmediate(0x0007, 0x00);
        // Load x with constant (1) (to make the first system call)
        this.writeImmediate(0x0008, 0xA2);
        this.writeImmediate(0x0009, 0x01);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x000A, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this.writeImmediate(0x000B, 0xA2);
        this.writeImmediate(0x000C, 0x03);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x000D, 0xFF);
        this.writeImmediate(0x000E, 0x50);
        this.writeImmediate(0x000F, 0x00);
        // load the string
        // 0A 48 65 6c 6c 6f 20 57 6f 72 6c 64 21
        this.writeImmediate(0x0050, 0x0A);
        this.writeImmediate(0x0051, 0x48);
        this.writeImmediate(0x0052, 0x65);
        this.writeImmediate(0x0053, 0x6C);
        this.writeImmediate(0x0054, 0x6C);
        this.writeImmediate(0x0055, 0x6F);
        this.writeImmediate(0x0056, 0x20);
        this.writeImmediate(0x0057, 0x57);
        this.writeImmediate(0x0058, 0x6F);
        this.writeImmediate(0x0059, 0x72);
        this.writeImmediate(0x005A, 0x6C);
        this.writeImmediate(0x005B, 0x64);
        this.writeImmediate(0x005C, 0x21);
        this.writeImmediate(0x005D, 0x0A);
        this.writeImmediate(0x005E, 0x00);
        this.memoryDump(0x0000, 0x0010);
        this.altLog("---------------------------")
        this.memoryDump(0x0040, 0x0043);
        this.altLog("---------------------------")
        this.memoryDump(0x0050, 0x005C);
        */
        


        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();

    }

    public startSystem(): boolean {
        this.log('created');

        // commented line below enables and disables cpu
        // this._CPU.debug = false;

        // logs hardware
        this._CPU.log('created');
        this._Memory.log('created');
        this._Clock.log('created');

        //initializes memory
        this._Memory.initMemory();
        // uncomment line below to test memory
        // this._Memory.displayMemory(0x14, 2);

        //inialize clock listeners
        this._Clock.initClockListeners(this._CPU);
        this._Clock.initClockListeners(this._Memory);

        //starts clock
        this._Clock.startClock(CLOCK_INTERVAL);

        this._CPU.setDebug(false);
        this.setDebug(false);

        super.log('started');
        
        return true;
    }

    public stopSystem(): boolean {
        return false;
    }
}

let system: System = new System();