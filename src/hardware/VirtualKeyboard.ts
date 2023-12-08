import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";
import { Queue } from "./utility/Queue";
import { InterruptController } from "./InterruptController";

export class VirtualKeyboard extends Hardware implements Interrupt {
    
    constructor(interruptController: InterruptController) {
        super(0, "Keyboard");
        this.isExecuting = false;
        this.irq = -1;
        this.priority = 1;

        this.InterruptController = interruptController;

        this.monitorKeys();
    }
    public isExecuting: boolean;

    private InterruptController: InterruptController;

    irq: number;
    priority: 1;
    public outputBuffer: Queue;
    public inputBuffer: Queue;

    name: String;

    private monitorKeys() {
        
    }

}