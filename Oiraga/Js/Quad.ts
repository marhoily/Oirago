class Quad {
    root = null;
    constructor(args) {
        this.root = new MyNode(args,
            args.minX, args.minY,
            args.maxX - args.minX,
            args.maxY - args.minY, 0);
    }

    internalSelector = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };

    insert(a) {
        this.root.insert(a);
    }
    retrieve(a, b) {
        this.root.retrieve(a, b);
    }
    retrieve2(a, b, c, d, callback) {
        this.internalSelector.x = a;
        this.internalSelector.y = b;
        this.internalSelector.w = c;
        this.internalSelector.h = d;
        this.root.retrieve(this.internalSelector, callback);
    }
    exists(a) {
        return this.root.exists(a);
    }
    clear() {
        this.root.clear();
    }
}