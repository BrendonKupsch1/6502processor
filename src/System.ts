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
        this._MMU.writeImediate(0x0000, 0xA9);
        this._MMU.writeImediate(0x0001, 0x00);
        this._MMU.writeImediate(0x0002, 0x8D);
        this._MMU.writeImediate(0x0003, 0x10);
        this._MMU.writeImediate(0x0004, 0x00);
        this._MMU.writeImediate(0x0005, 0xA9);
        this._MMU.writeImediate(0x0006, 0x01);
        this._MMU.writeImediate(0x0007, 0x8D);
        this._MMU.writeImediate(0x0008, 0x10);
        this._MMU.writeImediate(0x0009, 0x01);
        this._MMU.writeImediate(0x000A, 0xA2);
        this._MMU.writeImediate(0x000B, 0x00);
        this._MMU.writeImediate(0x000C, 0xAD);
        this._MMU.writeImediate(0x000D, 0x10);
        this._MMU.writeImediate(0x000E, 0x00);
        this._MMU.writeImediate(0x000F, 0x6D);
        this._MMU.writeImediate(0x0010, 0x10);
        this._MMU.writeImediate(0x0011, 0x01);
        this._MMU.writeImediate(0x0012, 0x8D);
        this._MMU.writeImediate(0x0013, 0x10);
        this._MMU.writeImediate(0x0014, 0x02);
        this._MMU.writeImediate(0x0015, 0xAD);
        this._MMU.writeImediate(0x0016, 0x10);
        this._MMU.writeImediate(0x0017, 0x01);
        this._MMU.writeImediate(0x0018, 0x8D);
        this._MMU.writeImediate(0x0019, 0x10);
        this._MMU.writeImediate(0x001A, 0x00);
        this._MMU.writeImediate(0x001B, 0xAD);
        this._MMU.writeImediate(0x001C, 0x10);
        this._MMU.writeImediate(0x001D, 0x02);
        this._MMU.writeImediate(0x001E, 0x8D);
        this._MMU.writeImediate(0x001F, 0x10);
        this._MMU.writeImediate(0x0020, 0x01);
        this._MMU.writeImediate(0x0021, 0xAD);
        this._MMU.writeImediate(0x0022, 0x10);
        this._MMU.writeImediate(0x0023, 0x00);
        this._MMU.writeImediate(0x0024, 0x95);
        this._MMU.writeImediate(0x0025, 0x00);
        this._MMU.writeImediate(0x0026, 0xE8);
        this._MMU.writeImediate(0x0027, 0xE0);
        this._MMU.writeImediate(0x0028, 0x0A);
        this._MMU.writeImediate(0x0029, 0xD0);
        this._MMU.writeImediate(0x002A, 0xF4);
        this._MMU.writeImediate(0x002B, 0x60);
        */

        /*
        // powersProgram()

        */

        this._MMU.memoryDump(0x00, 0x0A);

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