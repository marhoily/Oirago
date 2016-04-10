var showSkin = true;
var showName = true;
var showColor = false;
var showMass = false;
var smoothRender = .4;
var transparentRender = false;
var gameMode = "";

var z = 1;
var skins = {};
var knownNameDict =
    "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";");
var knownNameDictNoDisp = ["8", "nasa"];
var ib = ["_canvas'blob"];;;

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
}