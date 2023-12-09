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
        var stdin = process.stdin;

        stdin.setRawMode(true);

        stdin.setEncoding(null);

        stdin.on('data', function (key) {
            let keyPressed: String = key.toString();
            this.log("Key Pressed: " + keyPressed);
            if (key.toString === '\u0003') {
                process.exit();
            }
            this.InterruptController.acceptInterrupt(this);
        }.bind(this));
    }
}