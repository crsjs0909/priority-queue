const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        maxSize = maxSize ? maxSize : 30;
        this.maxSize = maxSize;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.size() < this.maxSize) {
            this.heap.push(data, priority);
        } else {
            throw "ERROR";
        }
    }

    shift() {

        if (!this.isEmpty()) {
            return this.heap.pop();
        } else {
            throw "ERROR";
        }

    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.size()===0;
    }
}

module.exports = PriorityQueue;
