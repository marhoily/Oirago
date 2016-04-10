var ctx;
var rawMouseX = 0;
var rawMouseY = 0;
var currX = -1;
var currY = -1;
var szoom = false;
var showDarkTheme = false;
var posX = nodeX = ~~((leftPos + rightPos) / 2);
var posY = nodeY = ~~((topPos + bottomPos) / 2);
var posSize = 1;
var drawLine = false;
var lineX = 0;
var lineY = 0;
var drawLineX = 0;
var drawLineY = 0;
var xa = false;
var zoom = 1;
var oldX = -1;
var oldY = -1;

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
    var cb = 0;
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
var timestamp = 0;
var leftPos = 0;
var topPos = 0;
var rightPos = 1E4;
var bottomPos = 1E4;
var viewZoom = 1;
var ua = false;
