export class Queue {
    privateQueue: Array<[number, number]> = [];

    isQueueEmpty():boolean {
        if (this.privateQueue.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    pushToQueue(Position: number, Priority: number) {
        if (this.privateQueue.length > 0) {
            for (var i = 0; i < this.privateQueue.length; i++) {
                if (Priority > this.privateQueue[i][0]) {
                    this.privateQueue.splice(i, 0, [Priority, Position]);
                    return;
                }
            }
            this.privateQueue.push([Position, Priority]);
        }
        else {
            this.privateQueue.push([Position, Priority]);
        }
    }

    popQueue(): number {
        if (this.privateQueue.length > 0) {
            return this.privateQueue.shift()[1];
        }
        else {
            return -1;
        }
    }
}