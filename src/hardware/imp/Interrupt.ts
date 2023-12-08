import { Queue } from "../utility/Queue";

export interface Interrupt {
    inputBuffer: Queue;
    irq: number;
    outputBuffer: Queue;
    priority: number;
}