function handleWheel(event) {
    if (szoom) {
        zoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
        0.4 > zoom && (zoom = 0.4);
        zoom > 10 / viewZoom && (zoom = 10 / viewZoom);
    }
    else {
        zoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
        0.6 > zoom && (zoom = 0.6);
        zoom > 6 / viewZoom && (zoom = 6 / viewZoom);
    }
}

function buildQTree() {
    if (.4 > viewZoom) qTree = null;
    else {
        let a = Number.POSITIVE_INFINITY;
        let b = Number.POSITIVE_INFINITY;
        let c = Number.NEGATIVE_INFINITY;
        let d = Number.NEGATIVE_INFINITY;
        let e = 0;
        let i: number;
        let node;
        for (i = 0; i < nodelist.length; i++) {
            node = nodelist[i];
            if (node.shouldRender() && !node.prepareData && 20 < node.size * viewZoom) {
                e = Math.max(node.size, e);
                a = Math.min(node.x, a);
                b = Math.min(node.y, b);
                c = Math.max(node.x, c);
                d = Math.max(node.y, d);
            }
        }
        qTree = new Quad({
            minX: a - (e + 100),
            minY: b - (e + 100),
            maxX: c + (e + 100),
            maxY: d + (e + 100),
            maxChildren: 2,
            maxDepth: 4
        });
        for (i = 0; i < nodelist.length; i++) {
            node = nodelist[i];
            if (node.shouldRender() && !(20 >= node.size * viewZoom)) {
                for (a = 0; a < node.points.length; ++a) {
                    b = node.points[a].x;
                    c = node.points[a].y;
                    b < nodeX - canvasWidth / 2 / viewZoom || c < nodeY - canvasHeight / 2 / viewZoom || b > nodeX + canvasWidth / 2 / viewZoom || c > nodeY + canvasHeight / 2 / viewZoom || qTree.insert(node.points[a]);
                }
            }
        }
    }
}

function mouseCoordinateChange() {
    currX = (rawMouseX - canvasWidth / 2) / viewZoom + nodeX;
    currY = (rawMouseY - canvasHeight / 2) / viewZoom + nodeY;
}

function handleWsMessage(msg) {
    var offset = 0;
    240 === msg.getUint8(offset) && (offset += 5);
    switch (msg.getUint8(offset++)) {
        case 16: // update nodes
            updateNodes(msg, offset);
            break;
        case 17: // update position
            posX = msg.getFloat32(offset, true);
            offset += 4;
            posY = msg.getFloat32(offset, true);
            offset += 4;
            posSize = msg.getFloat32(offset, true);
            break;
        case 20: // clear nodes
            playerCells = [];
            nodesOnScreen = [];
            break;
        case 21: // draw line
            lineX = msg.getInt16(offset, true);
            offset += 2;
            lineY = msg.getInt16(offset, true);
            if (!drawLine) {
                drawLine = true;
                drawLineX = lineX;
                drawLineY = lineY;
            }
            break;
        case 32: // add node
            nodesOnScreen.push(msg.getUint32(offset, true));
            break;
        case 64: // set border
            leftPos = msg.getFloat64(offset, true);
            offset += 8;
            topPos = msg.getFloat64(offset, true);
            offset += 8;
            rightPos = msg.getFloat64(offset, true);
            offset += 8;
            bottomPos = msg.getFloat64(offset, true);
            posX = (rightPos + leftPos) / 2;
            posY = (bottomPos + topPos) / 2;
            posSize = 1;
            if (0 === playerCells.length) {
                nodeX = posX;
                nodeY = posY;
                viewZoom = posSize;
            }
            break;
    }
}

function updateNodes(view, offset) {
    timestamp = +new Date;
    var code = Math.random();
    ua = false;
    var queueLength = view.getUint16(offset, true);
    offset += 2;
    for (var i = 0; i < queueLength; ++i) {
        var killer = nodes[view.getUint32(offset, true)],
            killedNode = nodes[view.getUint32(offset + 4, true)];
        offset += 8;
        if (killer && killedNode) {
            killedNode.destroy();
            killedNode.ox = killedNode.x;
            killedNode.oy = killedNode.y;
            killedNode.oSize = killedNode.size;
            killedNode.nx = killer.x;
            killedNode.ny = killer.y;
            killedNode.nSize = killedNode.size;
            killedNode.updateTime = timestamp;
        }
    }
    var i2 = 0;
    while (true) {
        var nodeid = view.getUint32(offset, true);
        offset += 4;
        if (0 === nodeid) break;
        ++i2;
        var size: number, posY: number,
            posX = view.getInt16(offset, true);
        offset += 2;
        posY = view.getInt16(offset, true);
        offset += 2;
        size = view.getInt16(offset, true);
        offset += 2;
        var r = view.getUint8(offset++),
            g = view.getUint8(offset++),
            b = view.getUint8(offset++);
        var color = (r << 16 | g << 8 | b).toString(16);
        for (; 6 > color.length;) color = `0${color}`;
        var colorstr = `#${color}`,
            flags = view.getUint8(offset++),
            flagVirus = !!(flags & 1),
            flagAgitated = !!(flags & 16);
        flags & 2 && (offset += 4);
        flags & 4 && (offset += 8);
        flags & 8 && (offset += 16);
        var name = "";
        for (; ;) {
            var char = view.getUint16(offset, true);
            offset += 2;
            if (0 === char) break;
            name += String.fromCharCode(char);
        }
        var node = null;
        if (nodes.hasOwnProperty(nodeid)) {
            node = nodes[nodeid];
            node.updatePos();
            node.ox = node.x;
            node.oy = node.y;
            node.oSize = node.size;
            node.color = colorstr;
        } else {
            node = new Cell(
                nodeid, posX, posY,
                size, colorstr, name);
            nodelist.push(node);
            nodes[nodeid] = node;
            node.ka = posX;
            node.la = posY;
        }
        node.isVirus = flagVirus;
        node.isAgitated = flagAgitated;
        node.nx = posX;
        node.ny = posY;
        node.nSize = size;
        node.updateCode = code;
        node.updateTime = timestamp;
        node.flag = flags;
        name && node.setName(name);
        if (-1 !== nodesOnScreen.indexOf(nodeid) && -1 === playerCells.indexOf(node)) {
            document.getElementById("overlays").style.display = "none";
            playerCells.push(node);
            if (1 === playerCells.length) {
                nodeX = node.x;
                nodeY = node.y;
            }
        }
    }
    queueLength = view.getUint32(offset, true);
    offset += 4;
    for (var i1 = 0; i1 < queueLength; i1++) {
        var nodeId = view.getUint32(offset, true);
        offset += 4;
        var node1 = nodes[nodeId];
        null != node1 && node1.destroy();
    }

}

function sendMouseMove() {
    if (true) {
        var msg = rawMouseX - canvasWidth / 2;
        var b = rawMouseY - canvasHeight / 2;
        if (64 <= msg * msg + b * b) {
            if (!(.01 > Math.abs(oldX - currX) && .01 > Math.abs(oldY - currY))) {
                oldX = currX;
                oldY = currY;
            }
        }
    }
}

function viewRange() {
    const ratio = Math.max(
        canvasHeight / 1080,
        canvasWidth / 1920);
    return ratio * zoom;
}

function calcViewZoom() {
    if (0 !== playerCells.length) {
        let newViewZoom = 0;
        for (let i = 0; i < playerCells.length; i++)
            newViewZoom += playerCells[i].size;
        newViewZoom = Math.pow(Math.min(64 / newViewZoom, 1), .4) * viewRange();
        viewZoom = (9 * viewZoom + newViewZoom) / 10;
    }
}

function drawGameScene() {
    var a, oldtime = Date.now();
    ++cb;
    timestamp = oldtime;
    if (0 < playerCells.length) {
        calcViewZoom();
        var c = a = 0;
        for (var i1 = 0; i1 < playerCells.length; i1++) {
            playerCells[i1].updatePos();
            a += playerCells[i1].x / playerCells.length;
            c += playerCells[i1].y / playerCells.length;
        }
        posX = a;
        posY = c;
        posSize = viewZoom;
        nodeX = (nodeX + a) / 2;
        nodeY = (nodeY + c) / 2;
    } else {
        nodeX = (29 * nodeX + posX) / 30;
        nodeY = (29 * nodeY + posY) / 30;
        viewZoom = (9 * viewZoom + posSize * viewRange()) / 10;
    }
    buildQTree();
    mouseCoordinateChange();
    xa || ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (xa) {
        if (showDarkTheme) {
            ctx.fillStyle = '#111111';
            ctx.globalAlpha = .05;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.globalAlpha = 1;
        } else {
            ctx.fillStyle = '#F2FBFF';
            ctx.globalAlpha = .05;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.globalAlpha = 1;
        }
    }
    nodelist.sort((a, b) =>
        (a.size === b.size ? a.id - b.id : a.size - b.size));
    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.scale(viewZoom, viewZoom);
    ctx.translate(-nodeX, -nodeY);
    for (var i2 = 0; i2 < cells.length; i2++)
        cells[i2].drawOneCell(ctx);

    if (transparentRender) {
        ctx.globalAlpha = 0.6;
    } else {
        ctx.globalAlpha = 1;
    }

    for (var i3 = 0; i3 < nodelist.length; i3++)
        nodelist[i3].drawOneCell(ctx);
}


var nCanvas;
var ctx;
var mainCanvas;
var canvasWidth;
var canvasHeight;
var qTree = null;
var nodeX = 0;
var nodeY = 0;
var nodesOnScreen = [];
var playerCells = [];
var nodes = {};
var nodelist = [];
var cells = [];
var rawMouseX = 0;
var rawMouseY = 0;
var currX = -1;
var currY = -1;
var cb = 0;
var timestamp = 0;
var leftPos = 0;
var topPos = 0;
var rightPos = 1E4;
var bottomPos = 1E4;
var viewZoom = 1;
var w = null;
var showSkin = true;
var showName = true;
var showColor = false;
var szoom = false;
var ua = false;
var showDarkTheme = false;
var showMass = false;
var smoothRender = .4;
var transparentRender = false;
var posX = nodeX = ~~((leftPos + rightPos) / 2);
var posY = nodeY = ~~((topPos + bottomPos) / 2);
var posSize = 1;
var gameMode = "";
var ma = false;
var drawLine = false;
var lineX = 0;
var lineY = 0;
var drawLineX = 0;
var drawLineY = 0;
var ra = 0;
var xa = false;
var zoom = 1;

setTimeout(() => { }, 3E5);

//This part is for loading custon skins
var data = { "action": "test" };
var response = null;

var oldX = -1;
var oldY = -1;
var z = 1;
var skins = {};
var knownNameDict =
    "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";");
var knownNameDictNoDisp = ["8", "nasa"];
var ib = ["_canvas'blob"];

class Cell {
    id = 0;
    points = null;
    pointsAcc = null;
    name = null;
    nameCache = null;
    sizeCache = null;
    x = 0;
    y = 0;
    size = 0;
    ox = 0;
    oy = 0;
    oSize = 0;
    nx = 0;
    ny = 0;
    nSize = 0;
    flag = 0; //what does this mean
    updateTime = 0;
    updateCode = 0;
    drawTime = 0;
    destroyed = false;
    isVirus = false;
    isAgitated = false;
    wasSimpleDrawing = true;
    color = null;
    uname = null;
    constructor(uid, ux, uy, usize, ucolor, uname) {
        this.id = uid;
        this.ox = this.x = ux;
        this.oy = this.y = uy;
        this.oSize = this.size = usize;
        this.color = ucolor;
        this.uname = uname;
        this.points = [];
        this.pointsAcc = [];
        this.createPoints();
    }

    destroy() {
        var tmp;
        for (tmp = 0; tmp < nodelist.length; tmp++)
            if (nodelist[tmp] === this) {
                nodelist.splice(tmp, 1);
                break;
            }
        delete nodes[this.id];
        tmp = playerCells.indexOf(this);
        if (-1 !== tmp) {
            ua = true;
            playerCells.splice(tmp, 1);
        }
        tmp = nodesOnScreen.indexOf(this.id);
        if (-1 !== tmp) {
            nodesOnScreen.splice(tmp, 1);
        }
        this.destroyed = true;
        cells.push(this);
    }
    getNameSize() {
        return Math.max(~~(.3 * this.size), 24);
    }
    createPoints() {
        var samplenum = this.getNumPoints();
        for (; this.points.length > samplenum;) {
            const rand = ~~(Math.random() * this.points.length);
            this.points.splice(rand, 1);
            this.pointsAcc.splice(rand, 1);
        }
        if (0 === this.points.length && 0 < samplenum) {
            this.points.push({
                ref: this,
                size: this.size,
                x: this.x,
                y: this.y
            });
            this.pointsAcc.push(Math.random() - .5);
        }
        while (this.points.length < samplenum) {
            var rand2 = ~~(Math.random() * this.points.length),
                point = this.points[rand2];
            this.points.splice(rand2, 0, {
                ref: this,
                size: point.size,
                x: point.x,
                y: point.y
            });
            this.pointsAcc.splice(rand2, 0, this.pointsAcc[rand2]);
        }
    }
    getNumPoints() {
        if (0 === this.id) return 16;
        var a = 10;
        if (20 > this.size) a = 0;
        if (this.isVirus) a = 30;
        var b = this.size;
        if (!this.isVirus) (b *= viewZoom);
        b *= z;
        if (this.flag & 32) (b *= .25);
        return ~~Math.max(b, a);
    }
    movePoints() {
        this.createPoints();
        var points = this.points;
        var numpoints = points.length;
        var pointsacc = this.pointsAcc;
        for (var i = 0; i < numpoints; ++i) {
            var pos1 = pointsacc[(i - 1 + numpoints) % numpoints],
                pos2 = pointsacc[(i + 1) % numpoints];
            pointsacc[i] += (Math.random() - .5) * (this.isAgitated ? 3 : 1);
            pointsacc[i] *= .7;
            10 < pointsacc[i] && (pointsacc[i] = 10);
            -10 > pointsacc[i] && (pointsacc[i] = -10);
            pointsacc[i] = (pos1 + pos2 + 8 * pointsacc[i]) / 10;
        }
        for (var ref = this, isvirus = this.isVirus ? 0 : (this.id / 1E3 + timestamp / 1E4) % (2 * Math.PI), j = 0; j < numpoints; ++j) {
            var f = points[j].size,
                e = points[(j - 1 + numpoints) % numpoints].size,
                m = points[(j + 1) % numpoints].size;
            if (15 < this.size && null != qTree && 20 < this.size * viewZoom && 0 !== this.id) {
                var l = false;
                var n = points[j].x;
                var q = points[j].y;
                qTree.retrieve2(n - 5, q - 5, 10, 10, function (a) {
                    if (a.ref !== ref && 25 >
                        (n - a.x) * (n - a.x) +
                        (q - a.y) * (q - a.y)) { l = true; }
                });
                if (!l && points[j].x < leftPos || points[j].y < topPos || points[j].x > rightPos || points[j].y > bottomPos) {
                    l = true;
                }
                if (l) {
                    if (0 < this.pointsAcc[j]) {
                        (this.pointsAcc[j] = 0);
                    }
                    pointsacc[j] -= 1;
                }
            }
            f += pointsacc[j];
            0 > f && (f = 0);
            f = this.isAgitated ? (19 * f + this.size) / 20 : (12 * f + this.size) / 13;
            points[j].size = (e + m + 8 * f) / 10;
            e = 2 * Math.PI / numpoints;
            m = this.points[j].size;
            this.isVirus && 0 === j % 2 && (m += 5);
            points[j].x = this.x + Math.cos(e * j + isvirus) * m;
            points[j].y = this.y + Math.sin(e * j + isvirus) * m;
        }
    }
    updatePos() {
        if (0 === this.id) return 1;
        var aaa = (timestamp - this.updateTime) / 120;
        var a = 0 > aaa ? 0 : 1 < aaa ? 1 : aaa;
        const b = 0 > a ? 0 : 1 < a ? 1 : a;
        this.getNameSize();
        if (this.destroyed && 1 <= b) {
            const c = cells.indexOf(this);
            -1 !== c && cells.splice(c, 1);
        }
        this.x = a * (this.nx - this.ox) + this.ox;
        this.y = a * (this.ny - this.oy) + this.oy;
        this.size = b * (this.nSize - this.oSize) + this.oSize;
        return b;
    }
    shouldRender() {
        if (0 === this.id) {
            return true;
        } else {
            return !(this.x + this.size + 40 < nodeX - canvasWidth / 2 / viewZoom || this.y + this.size + 40 < nodeY - canvasHeight / 2 / viewZoom || this.x - this.size - 40 > nodeX + canvasWidth / 2 / viewZoom || this.y - this.size - 40 > nodeY + canvasHeight / 2 / viewZoom);
        }
    }
    drawOneCell(ctx) {
        if (this.shouldRender()) {
            var b = (0 !== this.id
                && !this.isVirus
                && !this.isAgitated
                && smoothRender > viewZoom);

            if (5 > this.getNumPoints()) b = true;
            if (this.wasSimpleDrawing && !b)
                for (var c = 0; c < this.points.length; c++) this.points[c].size = this.size;
            this.wasSimpleDrawing = b;
            ctx.save();
            this.drawTime = timestamp;
            var c5 = this.updatePos();
            this.destroyed && (ctx.globalAlpha *= 1 - c5);
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.lineJoin = this.isVirus ? "miter" : "round";
            if (showColor) {
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = "#AAAAAA";
            } else {
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
            }
            if (b) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
            }
            else {
                this.movePoints();
                ctx.beginPath();
                var d = this.getNumPoints();
                ctx.moveTo(this.points[0].x, this.points[0].y);
                for (var c4 = 1; c4 <= d; ++c4) {
                    var e = c4 % d;
                    ctx.lineTo(this.points[e].x, this.points[e].y);
                }
            }
            ctx.closePath();
            var skinName = this.name.toLowerCase();
            if (skinName.indexOf('[') !== -1) {
                var clanStart = skinName.indexOf('[');
                var clanEnd = skinName.indexOf(']');
                skinName = skinName.slice(clanStart + 1, clanEnd);
            }
            var c3;
            if (!this.isAgitated && showSkin && ':teams' !== gameMode) {
                if (-1 !== knownNameDict.indexOf(skinName)) {
                    if (!skins.hasOwnProperty(skinName)) {
                        skins[skinName] = new Image;
                        skins[skinName].src = "SKIN_URL" + skinName + '.png';
                    }
                    if (0 !== skins[skinName].width && skins[skinName].complete) {
                        c3 = skins[skinName];
                    } else {
                        c3 = null;
                    }
                } else {
                    c3 = null;
                }
            } else {
                c3 = null;
            }
            var e1 = c3;
            var c2 = e1 ? -1 !== ib.indexOf(skinName) : false;
            b || ctx.stroke();
            ctx.fill();
            if (!(null == e1 || c2)) {
                ctx.save();
                ctx.clip();
                ctx.drawImage(e1, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                ctx.restore();
            }
            if ((showColor || 15 < this.size) && !b) {
                ctx.strokeStyle = '#000000';
                ctx.globalAlpha *= .1;
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            if (null != e1 && c2) {
                ctx.drawImage(e1, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
            }
            var c1 = -1 !== playerCells.indexOf(this);
            //draw name
            if (0 !== this.id) {
                var b1 = ~~this.y;
                if ((showName || c1) && this.name && this.nameCache && (null == e1 || -1 === knownNameDictNoDisp.indexOf(skinName))) {
                    var ncache = this.nameCache;
                    ncache.setValue(this.name);
                    ncache.setSize(this.getNameSize());
                    var ratio = Math.ceil(10 * viewZoom) / 10;
                    ncache.setScale(ratio);
                    var rnchache = ncache.render(),
                        m = ~~(rnchache.width / ratio),
                        h = ~~(rnchache.height / ratio);
                    ctx.drawImage(rnchache, ~~this.x - ~~(m / 2), b1 - ~~(h / 2), m, h);
                    b1 += rnchache.height / 2 / ratio + 4;
                }

                //draw mass
                if (showMass && (c1 || 0 === playerCells.length && (!this.isVirus || this.isAgitated) && 20 < this.size)) {
                    var c6 = this.sizeCache;
                    c6.setSize(this.getNameSize() / 2);
                    c6.setValue(~~(this.size * this.size / 100));
                    var ratio1 = Math.ceil(10 * viewZoom) / 10;
                    c6.setScale(ratio1);
                    var e2 = c6.render();
                    var m1 = ~~(e2.width / ratio1);
                    var h1 = ~~(e2.height / ratio1);
                    ctx.drawImage(e2, ~~this.x - ~~(m1 / 2), b1 - ~~(h1 / 2), m1, h1);
                }
            }
            ctx.restore();
        }
    }
};
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
};

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
