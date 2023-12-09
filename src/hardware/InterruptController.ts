import { Hardware} from "./Hardware";
import { Interrupt } from "./imp/Interrupt";
import { Queue } from "./utility/Queue";

export class InterruptController extends Hardware implements Interrupt {
    
    constructor() {
        super(0, "Interrupt Controller");
    }

    private hardware = new Array<string>(0xffff);

    inputBuffer: Queue;
    irq: number;
    outputBuffer: Queue;
    priority: number;
}