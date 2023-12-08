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

        this._MMU.writeImediate(0x0000, 0xA9);
        this._MMU.writeImediate(0x0001, 0x0D);
        this._MMU.writeImediate(0x0002, 0xA9);
        this._MMU.writeImediate(0x0003, 0x1D);
        this._MMU.writeImediate(0x0004, 0xA9);
        this._MMU.writeImediate(0x0005, 0x2D);
        this._MMU.writeImediate(0x0006, 0xA9);
        this._MMU.writeImediate(0x0007, 0x3F);
        this._MMU.writeImediate(0x0008, 0xA9);
        this._MMU.writeImediate(0x0009, 0xFF);
        this._MMU.writeImediate(0x000A, 0x00);
        
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