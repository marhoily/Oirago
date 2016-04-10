export interface IRect {
    x: number;
    y: number;
    w: number;
    h: number;
}
export class MyNode {
    private maxDepth: number;
    private maxChildren: number;
    private bounds: IRect;
    private depth: number;
    private items: IRect[] = [];
    private nodes: MyNode[] = [];

    constructor(bounds: IRect, depth: number,
        maxChildren: number, maxDepth: number) {
        this.maxDepth = maxDepth;
        this.maxChildren = maxChildren;
        this.depth = depth;
    }

    insert(a) {
        if (this.nodes.length !== 0) {
            this.nodes[this.findInsertNode(a)].insert(a);
        } else {
            const c = this.maxChildren || 2;
            const d = this.maxDepth || 4;
            if (this.items.length >= c && this.depth < d) {
                this.devide();
                this.nodes[this.findInsertNode(a)].insert(a);
            } else {
                this.items.push(a);
            }
        }
    }
    retrieve(x, y, w, h, callback) { this.retrieveInner({ x: x, y: y, w: w, h: h }, callback); }

    private retrieveInner(item, callback) {
        for (let i = 0; i < this.items.length; ++i)
            callback(this.items[i]);
        if (0 !== this.nodes.length) {
            this.findOverlappingNodes(item,
                dir => this.nodes[dir].retrieveInner(item, callback));
        }
    }
    private findOverlappingNodes(point, b) {
        const x = point.x < this.bounds.x + this.bounds.w / 2;
        const y = point.y < this.bounds.y + this.bounds.h / 2;
        return !!(x && (y && b(0) || !y && b(2))
            || !x && (y && b(1) || !y && b(3)));
    }
    private findInsertNode(point) {
        const y = point.y < this.bounds.y + this.bounds.h / 2;
        const x = point.x < this.bounds.x + this.bounds.w / 2;
        return x ? (y ? 0 : 2) : (y ? 1 : 3);
    }
    private devide() {
        const midW = this.bounds.w / 2;
        const midH = this.bounds.h / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;
        this.nodes.push(this.childNode(x, y, midW, midH));
        this.nodes.push(this.childNode(x + midW, y, midW, midH));
        this.nodes.push(this.childNode(x, y + midH, midW, midH));
        this.nodes.push(this.childNode(x + midW, y + midH, midW, midH));

        this.items = [];
        for (let i = 0; i < this.items.length; i++)
            this.insert(this.items[i]);
    }
    private childNode(x, y, w, h) {
        return new MyNode(
            { x: x, y: y, w: w, h: h },
            this.depth + 1,
            this.maxChildren,
            this.maxDepth);
    }
}