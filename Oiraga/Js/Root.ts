import * as gg from "Globals";
import {Cell} from "Cell";
import {Quad as MyNode} from "Quad";

var ctx;
var rawMouseX = 0;
var rawMouseY = 0;
var currX = -1;
var currY = -1;
var szoom = false;
var posX = gg.nodeX = ~~((gg.leftPos + gg.rightPos) / 2);
var posY = gg.nodeY = ~~((gg.topPos + gg.bottomPos) / 2);
var posSize = 1;
var drawLine = false;
var lineX = 0;
var lineY = 0;
var drawLineX = 0;
var drawLineY = 0;
var zoom = 1;
var oldX = -1;
var oldY = -1;

function handleWheel(event) {
    if (szoom) {
        zoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
        0.4 > zoom && (zoom = 0.4);
        zoom > 10 / gg.viewZoom && (zoom = 10 / gg.viewZoom);
    }
    else {
        zoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
        0.6 > zoom && (zoom = 0.6);
        zoom > 6 / gg.viewZoom && (zoom = 6 / gg.viewZoom);
    }
}

function calcBounds() {
    const res = {
        minX: Number.POSITIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
        size: 0
    };
    for (let i = 0; i < gg.nodelist.length; i++) {
        const node = gg.nodelist[i];
        if (node.shouldRender() && 20 < node.size * gg.viewZoom) {
            res.size = Math.max(node.size, res.size);
            res.minX = Math.min(node.x,    res.minX);
            res.minY = Math.min(node.y,    res.minY);
            res.maxX = Math.max(node.x,    res.maxX);
            res.maxY = Math.max(node.y,    res.maxY);
        }
    }
    return res;
}

function inflateToRect(bounds, d) {
    return {
        x: bounds.minX - d,
        y: bounds.minY - d,
        w: bounds.maxX + d - (bounds.minX - d),
        h: bounds.maxY + d - (bounds.minY - d)
    };
}

function buildQTree() {
    if (.4 > gg.viewZoom) {
        gg.qTree = null;
        return;
    }

    const b = calcBounds();
    const rect = inflateToRect(b, b.size + 100);
    gg.qTree = new MyNode(rect, 0, 2, 4);

    const w = gg.canvasWidth / 2 / gg.viewZoom;
    const h = gg.canvasHeight / 2 / gg.viewZoom;
    for (let i = 0; i < gg.nodelist.length; i++) {
        const cell = gg.nodelist[i];
        if (!cell.shouldRender() || 20 >= cell.size * gg.viewZoom)
            continue;
        for (let j = 0; j < cell.points.length; ++j) {
            const point = cell.points[j];
            b.minY = point.x;
            b.maxX = point.y;
            const x =
                b.minY < gg.nodeX - w ||
                b.maxX < gg.nodeY - h ||
                b.minY > gg.nodeX + w ||
                b.maxX > gg.nodeY + h;
            if (!x) gg.qTree.insert(point);
        }
    }
}

function mouseCoordinateChange() {
    currX = (rawMouseX - gg.canvasWidth / 2) / gg.viewZoom + gg.nodeX;
    currY = (rawMouseY - gg.canvasHeight / 2) / gg.viewZoom + gg.nodeY;
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
            gg.playerCells = [];
            gg.nodesOnScreen = [];
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
            gg.nodesOnScreen.push(msg.getUint32(offset, true));
            break;
        case 64: // set border
            gg.leftPos = msg.getFloat64(offset, true);
            offset += 8;
            gg.topPos = msg.getFloat64(offset, true);
            offset += 8;
            gg.rightPos = msg.getFloat64(offset, true);
            offset += 8;
            gg.bottomPos = msg.getFloat64(offset, true);
            posX = (gg.rightPos + gg.leftPos) / 2;
            posY = (gg.bottomPos + gg.topPos) / 2;
            posSize = 1;
            if (0 === gg.playerCells.length) {
                gg.nodeX = posX;
                gg.nodeY = posY;
                gg.viewZoom = posSize;
            }
            break;
    }
}

function updateNodes(view, offset) {
    gg.timestamp = +new Date;
    var code = Math.random();
    gg.ua = false;
    var queueLength = view.getUint16(offset, true);
    offset += 2;
    for (var i = 0; i < queueLength; ++i) {
        var killer = gg.nodes[view.getUint32(offset, true)],
            killedNode = gg.nodes[view.getUint32(offset + 4, true)];
        offset += 8;
        if (killer && killedNode) {
            killedNode.destroy();
            killedNode.ox = killedNode.x;
            killedNode.oy = killedNode.y;
            killedNode.oSize = killedNode.size;
            killedNode.nx = killer.x;
            killedNode.ny = killer.y;
            killedNode.nSize = killedNode.size;
            killedNode.updateTime = gg.timestamp;
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
        var r = view.getUint8(offset++);
        var g: number = view.getUint8(offset++);
        var b = view.getUint8(offset++);
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
        var node: Cell = null;
        if (gg.nodes.hasOwnProperty(nodeid)) {
            node = gg.nodes[nodeid];
            node.updatePos();
            node.ox = node.x;
            node.oy = node.y;
            node.oSize = node.size;
            node.color = colorstr;
        } else {
            node = new Cell(
                nodeid, posX, posY,
                size, colorstr, name);
            gg.nodelist.push(node);
            gg.nodes[nodeid] = node;
            //node.ka = posX;
            //node.la = posY;
        }
        node.isVirus = flagVirus;
        node.isAgitated = flagAgitated;
        node.nx = posX;
        node.ny = posY;
        node.nSize = size;
        node.updateCode = code;
        node.updateTime = gg.timestamp;
        node.flag = flags;
        // name && node.setName(name);
        if (-1 !== gg.nodesOnScreen.indexOf(nodeid) && -1 === gg.playerCells.indexOf(node)) {
            document.getElementById("overlays").style.display = "none";
            gg.playerCells.push(node);
            if (1 === gg.playerCells.length) {
                gg.nodeX = node.x;
                gg.nodeY = node.y;
            }
        }
    }
    queueLength = view.getUint32(offset, true);
    offset += 4;
    for (var i1 = 0; i1 < queueLength; i1++) {
        var nodeId = view.getUint32(offset, true);
        offset += 4;
        var node1 = gg.nodes[nodeId];
        null != node1 && node1.destroy();
    }
}

function sendMouseMove() {
    const x = rawMouseX - gg.canvasWidth / 2;
    const y = rawMouseY - gg.canvasHeight / 2;
    if (64 > x * x + y * y) return;
    const nx = .01 > Math.abs(oldX - currX);
    const ny = .01 > Math.abs(oldY - currY);
    if (nx && ny) return;
    oldX = currX;
    oldY = currY;
}

function viewRange() {
    return Math.max(
        gg.canvasHeight / 1080,
        gg.canvasWidth / 1920) * zoom;
}

function calcViewZoom() {
    if (0 !== gg.playerCells.length) {
        let newViewZoom = 0;
        for (let i = 0; i < gg.playerCells.length; i++)
            newViewZoom += gg.playerCells[i].size;
        newViewZoom = Math.pow(Math.min(64 / newViewZoom, 1), .4) * viewRange();
        gg.viewZoom = (9 * gg.viewZoom + newViewZoom) / 10;
    }
}

function drawGameScene() {
    const oldtime = Date.now();
    let cb = 0;
    ++cb;
    gg.timestamp = oldtime;
    if (0 < gg.playerCells.length) {
        calcViewZoom();
        let a = 0;
        let c = 0;
        for (let i1 = 0; i1 < gg.playerCells.length; i1++) {
            gg.playerCells[i1].updatePos();
            a += gg.playerCells[i1].x / gg.playerCells.length;
            c += gg.playerCells[i1].y / gg.playerCells.length;
        }
        posX = a;
        posY = c;
        posSize = gg.viewZoom;
        gg.nodeX = (gg.nodeX + a) / 2;
        gg.nodeY = (gg.nodeY + c) / 2;
    } else {
        gg.nodeX = (29 * gg.nodeX + posX) / 30;
        gg.nodeY = (29 * gg.nodeY + posY) / 30;
        gg.viewZoom = (9 * gg.viewZoom + posSize * viewRange()) / 10;
    }
    buildQTree();
    mouseCoordinateChange();

    gg.nodelist.sort((a, b) =>
        (a.size === b.size ? a.id - b.id : a.size - b.size));
    ctx.save();
    ctx.translate(gg.canvasWidth / 2, gg.canvasHeight / 2);
    ctx.scale(gg.viewZoom, gg.viewZoom);
    ctx.translate(-gg.nodeX, -gg.nodeY);
    for (let i2 = 0; i2 < gg.cells.length; i2++)
        gg.cells[i2].drawOneCell(ctx);

    for (let i3 = 0; i3 < gg.nodelist.length; i3++)
        gg.nodelist[i3].drawOneCell(ctx);
}
