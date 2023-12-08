export class Queue {
    privateQueue: Array<[number, number]> = [];

    isQueueEmpty():boolean {
        if (this.privateQueue.length == 0) {
            return true;
        } else {
            return false;
        }
    }



    
}