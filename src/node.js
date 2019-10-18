class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    appendChild(node) {
        if (node === null) {
            return;
        }
        if (this.left === null) {
            node.parent = this;
            this.left = node;
            return;
        }
        if (this.right === null) {
            node.parent = this;
            this.right = node;
        }
    }

    removeChild(node) {
        if (node != null && this.left === node) {
            node.parent = null;
            this.left = null;
            return;
        }
        if (node != null && this.right === node) {
            node.parent = null;
            this.right = null;
            return;
        }
        throw "NOT A CHILD: " + node
    }

    remove() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }


    swapWithParent() {
        if (this.parent === null) {
            return;
        }
        let p = this.parent;
        let n = this;

        if (p.parent !== null) {
            if (p.parent.left === p)
                p.parent.left = this;
            else
                p.parent.right = this;
        }
        n.parent = p.parent;

        let tl = n.left;
        let tr = n.right;

        if (p.left === this) {
            n.left = p;
            n.right = p.right;
        } else {
            n.left = p.left;
            n.right = p;
        }
        p.left = tl;
        p.right = tr;

        if (p.left != null) p.left.parent = p;
        if (p.right != null) p.right.parent = p;
        if (n.left != null) n.left.parent = n;
        if (n.right != null) n.right.parent = n;
    }

    _isRight() {
        return this.parent && this.parent.right === this;
    }

    _isRelatives(node) {
        if (!node) {
            return false;
        }
        return node.left !== this && node.right !== this && this.left !== node && this.right !== node;
    }
}

module.exports = Node;
