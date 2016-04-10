class MyNode {
    constructor(args, x, y, w, h, depth) {
        this.args = args;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.depth = depth;
        this.items = [];
        this.nodes = [];
    }
    args = null;
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    depth = 0;
    items = null;
    nodes = null;
    exists(selector) {
        for (let i = 0; i < this.items.length; ++i) {
            const item = this.items[i];
            if (item.x >= selector.x &&
                item.y >= selector.y &&
                item.x < selector.x + selector.w &&
                item.y < selector.y + selector.h) return true;
        }
        if (0 !== this.nodes.length) {
            return this.findOverlappingNodes(selector,
                dir => this.nodes[dir].exists(selector));
        }
        return false;
    };
    retrieve(item, callback) {
        for (let i = 0; i < this.items.length; ++i)
            callback(this.items[i]);
        if (0 !== this.nodes.length) {
            this.findOverlappingNodes(item,
                dir => {
                    this.nodes[dir].retrieve(item, callback);
                });
        }
    }
    insert(a) {
        if (0 !== this.nodes.length) {
            this.nodes[this.findInsertNode(a)].insert(a);
        } else {
            const c = this.args.maxChildren || 2;
            const d = this.args.maxDepth || 4;
            if (this.items.length >= c && this.depth < d) {
                this.devide();
                this.nodes[this.findInsertNode(a)].insert(a);
            } else {
                this.items.push(a);
            }
        }
    }
    findInsertNode(a) {
        return a.x < this.x + this.w / 2
            ? a.y < this.y + this.h / 2 ? 0 : 2
            : a.y < this.y + this.h / 2 ? 1 : 3;
    }
    findOverlappingNodes(a, b) {
        return a.x < this.x + this.w / 2 &&
            (a.y < this.y + this.h / 2 && b(0) || a.y >= this.y + this.h / 2 && b(2)) ||
            a.x >= this.x + this.w / 2 &&
            (a.y < this.y + this.h / 2 && b(1) || a.y >= this.y + this.h / 2 && b(3))
            ? true
            : false;
    }
    devide() {
        var a = this.depth + 1,
            c = this.w / 2,
            d = this.h / 2;
        this.nodes.push(new MyNode(this.args, this.x, this.y, c, d, a));
        this.nodes.push(new MyNode(this.args, this.x + c, this.y, c, d, a));
        this.nodes.push(new MyNode(this.args, this.x, this.y + d, c, d, a));
        this.nodes.push(new MyNode(this.args, this.x + c, this.y + d, c, d, a));
        var a2 = this.items;
        this.items = [];
        for (c = 0; c < a2.length; c++) this.insert(a2[c]);
    }
    clear() {
        for (var a = 0; a < this.nodes.length; a++) this.nodes[a].clear();
        this.items.length = 0;
        this.nodes.length = 0;
    }
}