export interface IPoint {
    x: number;
    y: number;
}
export interface IRect extends IPoint {
    w: number;
    h: number;
}
export class Quad {
    private maxDepth: number;
    private maxChildren: number;
    private bounds: IRect;
    private depth: number;
    private items: IRect[] = [];
    private nodes: Quad[] = [];

    constructor(bounds: IRect, depth: number,
        maxChildren: number, maxDepth: number) {
        this.maxDepth = maxDepth;
        this.maxChildren = maxChildren;
        this.depth = depth;
    }

    insert(point) {
        if (this.nodes.length !== 0) {
            this.nodes[this.findInsertNode(point)].insert(point);
        } else {
            const c = this.maxChildren || 2;
            const d = this.maxDepth || 4;
            if (this.items.length >= c && this.depth < d) {
                this.devide();
                this.nodes[this.findInsertNode(point)].insert(point);
            } else {
                this.items.push(point);
            }
        }
    }
    retrieve(x, y, w, h, callback) { this.retrieveInner({ x: x, y: y, w: w, h: h }, callback); }

    private retrieveInner(item: IRect, callback: (rect: IRect) => void) {
        for (let i = 0; i < this.items.length; ++i)
            callback(this.items[i]);

        if (this.nodes.length > 0)
            this.findOverlappingNodes(item,
                dir => this.nodes[dir].retrieveInner(item, callback));
    }
    private findOverlappingNodes(point: IPoint, inner: (index: number) => void) {
        const x = point.x < this.bounds.x + this.bounds.w / 2;
        const y = point.y < this.bounds.y + this.bounds.h / 2;
        return !!(x && (y && inner(0) || !y && inner(2))
            || !x && (y && inner(1) || !y && inner(3)));
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
        const bounds = { x: x, y: y, w: w, h: h };
        return new Quad(bounds,
            this.depth + 1, this.maxChildren, this.maxDepth);
    }
}