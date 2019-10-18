const Node = require('./node');

class MaxHeap {
    constructor() {
        this.clear();
    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (!this.isEmpty()) {
            let result = this.detachRoot();
            this.restoreRootFromLastInsertedNode(result);
            this.shiftNodeDown(this.root);
            return result.data;
        }
    }

    detachRoot() {
        this._size--;

        let prevRoot = this.root;
        this.root = null;
        let idx = this.parentNodes.indexOf(prevRoot);
        if (idx !== -1) {
            this.parentNodes.splice(idx, 1);
        }
        return prevRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        let node = this.parentNodes.pop();
        if (!node) {
            return;
        } else if (!node.parent) {
            this.root = node;
            return;
        }
        else if (node._isRight()) {
            if (node.parent !== detached) this.parentNodes.unshift(node.parent);
        }

        node.remove();
        this.root = node;

        if (detached !== node.parent && detached.left) {
            node.appendChild(detached.left);
        }

        if (detached !== node.parent && detached.right) {
            node.appendChild(detached.right)
        }

        if (!node.right) {
            this.parentNodes.unshift(node);
        }
    }

    size() {
        return this._size;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this._size = 0;
    }

    insertNode(node) {
        this.parentNodes.push(node);

        this.isEmpty()
            ? this.root = node
            : this.parentNodes[0].appendChild(node);
        this._size++;

        if (this.parentNodes[0].left && this.parentNodes[0].right) {
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if (node.parent && node.priority > node.parent.priority) {
            let idxLast = this.parentNodes.length - 1;
            let last = this.parentNodes[idxLast];
            if (last === node) {
                if (this.parentNodes[0] === node.parent) {
                    this.parentNodes[0] = node;
                    this.parentNodes[idxLast] = node.parent;
                }
                else {
                    this.parentNodes[idxLast] = node.parent;
                }
            }
            else {
                this.parentNodes[0] = node.parent;
            }

            node.swapWithParent();
            this.shiftNodeUp(node);
        }

        if (!node.parent) {
            this.root = node;
        }
    }

    shiftNodeDown(node) {
        if (!node || !(node.left || node.right)) {
            return;
        }

        let child = (node.right && node.left)
                ? node.left.priority > node.right.priority ? node.left : node.right
                : node.left ? node.left : node.right;

        if (child.priority > node.priority) {
            let idxC = this.parentNodes.indexOf(child);
            let idxP = this.parentNodes.indexOf(node);
            if (idxC > -1) this.parentNodes[idxC]= node;
            if (idxP > -1) this.parentNodes[idxP] = child;

            if (node === this.root) this.root = child;

            child.swapWithParent();
            this.shiftNodeDown(node);
        }
    }
}

module.exports = MaxHeap;

