// ReSharper disable MissingHasOwnPropertyInForeach
// ReSharper disable InconsistentNaming
// ReSharper disable CoercedEqualsUsing

var old: any;
var url: string;
var from: boolean;
var proto: { init: (params: any) => { va: (val: any) => void; Ga: (memory: any, a: any, array: any, offset: any, func: any) => void } };
var Aa: boolean;
var selector: boolean;
var result: Result;
var ssl: boolean;
var success: any;
var img: any;
var d: number;
var a1: number;
var exports;

var pauseText: number;
var qw: number;
var qz: number;
var ty: number;
var tx: number;
var valueAccessor: () => void;
var a: typeof undefined[];
var col: string;
var aux: number;
var count: number;
var path: number;
var backoff: number;
var browser;


function playerCalc() {
    /**
     * @param {Object} evt
     * @return {undefined}
     */
    browser.onkeydown = evt => {
        if (!(32 != evt.keyCode)) {
            if (!firing) {
                if ("nick" != evt.target.id) {
                    evt.preventDefault();
                }
                splitCommand();
                /** @type {boolean} */
                firing = true;
            }
        }
        if (81 == evt.keyCode) {
            sendCommand(18);
            /** @type {boolean} */
            memory = true;
        }
        if (!(87 != evt.keyCode)) {
            if (!stack) {
                ejectCommand();
                /** @type {boolean} */
                stack = true;
            }
        }
        if (27 == evt.keyCode) {
            evt.preventDefault();
            showError(300);
            if ($("#oferwallContainer").is(":visible")) {
                browser.closeOfferwall();
            }
            if ($("#videoContainer").is(":visible")) {
                browser.closeVideoContainer();
            }
        }
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    browser.onkeyup = event => {
        if (32 == event.keyCode) {
            /** @type {boolean} */
            firing = false;
        }
        if (87 == event.keyCode) {
            /** @type {boolean} */
            stack = false;
        }
        if (81 == event.keyCode) {
            if (memory) {
                sendCommand(19);
                /** @type {boolean} */
                memory = false;
            }
        }
    };
}
function createObjects() {
    if (0.4 > mousAdjustedWorldZoom) {
        /** @type {null} */
        context = null;
    } else {
        /** @type {number} */
        var j = Number.POSITIVE_INFINITY;
        /** @type {number} */
        var left = Number.POSITIVE_INFINITY;
        /** @type {number} */
        var maxY = Number.NEGATIVE_INFINITY;
        /** @type {number} */
        var bottom = Number.NEGATIVE_INFINITY;
        /** @type {number} */
        var i = 0;
        var p1;
        for (; i < parts.length; i++) {
            p1 = parts[i];
            if (!!p1.P()) {
                if (!p1.V) {
                    if (!(20 >= p1.size * mousAdjustedWorldZoom)) {
                        /** @type {number} */
                        j = Math.min(p1.x - p1.size, j);
                        /** @type {number} */
                        left = Math.min(p1.y - p1.size, left);
                        /** @type {number} */
                        maxY = Math.max(p1.x + p1.size, maxY);
                        /** @type {number} */
                        bottom = Math.max(p1.y + p1.size, bottom);
                    }
                }
            }
        }
        context = proto.init({
            Ba: j - 10,
            Ca: left - 10,
            za: maxY + 10,
            Aa: bottom + 10,
            Ja: 2,
            Ka: 4
        });
        /** @type {number} */
        i = 0;
        for (; i < parts.length; i++) {
            var p = parts[i];
            if (p.P() && !(20 >= p.size * mousAdjustedWorldZoom)) {
                /** @type {number} */
                j = 0;
                for (; j < p.a.length; ++j) {
                    left = p.a[j].x;
                    maxY = p.a[j].y;
                    if (!(left < ballsCenterX - width / 2 / mousAdjustedWorldZoom)) {
                        if (!(maxY < ballsCenterY - height / 2 / mousAdjustedWorldZoom)) {
                            if (!(left > ballsCenterX + width / 2 / mousAdjustedWorldZoom)) {
                                if (!(maxY > ballsCenterY + height / 2 / mousAdjustedWorldZoom)) {
                                    context.va(p.a[j]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function run() {
    if (null == old) {
        old = {};
        $("#region").children().each(function () {
            var option = $(this);
            var name = option.val();
            if (name) {
                old[name] = option.text();
            }
        });
    }
    $.get(url + "info", b => {
        var testSource = {};
        var name;
        for (name in b.regions) {
            var sourceName = name.split(":")[0];
            testSource[sourceName] = testSource[sourceName] || 0;
            testSource[sourceName] += b.regions[name].numPlayers;
        }
        for (name in testSource) {
            $(`#region option[value="${name}"]`).text(old[name] + " (" + testSource[name] + " players)");
        }
    }, "json");
}
function _init() {
    $("#adsBottom").hide();
    $("#overlays").hide();
    $("#stats").hide();
    $("#mainPanel").hide();
    /** @type {boolean} */
    from = to = false;
    save();
    browser.destroyAd(browser.adSlots.aa);
    browser.destroyAd(browser.adSlots.ac);
}
function reset(hash) {
    if (hash) {
        if (hash == newValue) {
            $(".btn-needs-server").prop("disabled", false);
        } else {
            if ($("#region").val() != hash) {
                $("#region").val(hash);
            }
            newValue = browser.localStorage.location = hash;
            $(".region-message").hide();
            $(`.region-message.${hash}`).show();
            $(".btn-needs-server").prop("disabled", false);
            if (ab) {
                next();
            }
        }
    }
}
function showError(expectedHashCode) {
    if (!to) {
        if (!from) {
            if (Aa) {
                $(".btn-spectate").prop("disabled", true);
            } else {
                $(".btn-spectate").prop("disabled", false);
            }
            /** @type {boolean} */
            isConnected = false;
            /** @type {null} */
            b = null;
            if (!selector) {
                $("#adsBottom").show();
                $("#g300x250").hide();
                $("#a300x250").show();
                $("#g728x90").hide();
                $("#a728x90").show();
            }
            browser.refreshAd(selector ? browser.adSlots.ac : browser.adSlots.aa);
            /** @type {boolean} */
            selector = false;
            if (1E3 > expectedHashCode) {
                /** @type {number} */
                alpha = 1;
            }
            /** @type {boolean} */
            to = true;
            $("#mainPanel").show();
            if (0 < expectedHashCode) {
                $("#overlays").fadeIn(expectedHashCode);
            } else {
                $("#overlays").show();
            }
        }
    }
}
function save() {
    if ($("#region").val()) {
        browser.localStorage.location = $("#region").val();
    } else {
        if (browser.localStorage.location) {
            $("#region").val(browser.localStorage.location);
        }
    }
    if ($("#region").val()) {
        $("#locationKnown").append($("#region"));
    } else {
        $("#locationUnknown").append($("#region"));
    }
}
function show(path) {
    $("#helloContainer").attr("data-gamemode", path);
    /** @type {number} */
    actual = path;
    $("#gamemode").val(path);
}
function resolve(id) {
    if ("env_local" in EnvConfig) {
        if ("true" == EnvConfig.load_local_configuration) {
            browser.MC.updateConfigurationID("base");
        } else {
            browser.MC.updateConfigurationID(EnvConfig.configID);
        }
    } else {
        browser.MC.updateConfigurationID(id);
    }
}
function startServer() {
    if ("configID" in result) {
        resolve(result.configID);
    } else {
        $.get(url + "getLatestID", newId => {
            resolve(newId);
            /** @type {string} */
            browser.localStorage.last_config_id = newId;
        }).fail(() => {
            var data: boolean | string;
            if (data = "last_config_id" in browser.localStorage) {
                data = browser.localStorage.last_config_id;
                /** @type {boolean} */
                data = !(null == data || ("" === data));
            }
            if (data) {
                data = browser.localStorage.last_config_id;
                console.log(`Fallback to stored configID: ${data}`);
                resolve(data);
            }
        });
    }
}
function postLink() {
    $.get(base + "//gc.agar.io", prop => {
        var name = prop.split(" ");
        prop = name[0];
        name = name[1] || "";
        if (-1 == ["UA"].indexOf(prop)) {
            excludes.push("ussr");
        }
        if (input.hasOwnProperty(prop)) {
            if ("string" == typeof input[prop]) {
                if (!newValue) {
                    reset(input[prop]);
                }
            } else {
                if (input[prop].hasOwnProperty(name)) {
                    if (!newValue) {
                        reset(input[prop][name]);
                    }
                }
            }
        }
    }, "text");
}


function set(caption) {
    if ("auto" === caption.toLowerCase()) {
        /** @type {boolean} */
        opts.auto = true;
    } else {
        options.renderSettings.selected = options.renderSettings[caption.toLowerCase()];
        /** @type {boolean} */
        opts.auto = false;
    }
}
function mouseWheelZoomAjusted() {
    return Math.max(height / 1080, width / 1920) * mouseWheelZoom;
}
function updateScale() {
    if (0 != balls.length) {
        var totalSize = 0;
        for (var i = 0; i < balls.length; i++) {
            totalSize += balls[i].size;
        }
        mousAdjustedWorldZoom = (9 * mousAdjustedWorldZoom +
            Math.pow(Math.min(64 / totalSize, 1), 0.4)
            * mouseWheelZoomAjusted()) / 10;
    }
}

function next() {
    if (ab) {
        if (newValue) {
            $("#connecting").show();
            makeRequest();
        }
    }
}
function bind() {
    if (socket) {
        /** @type {null} */
        socket.onopen = null;
        /** @type {null} */
        socket.onmessage = null;
        /** @type {null} */
        socket.onclose = null;
        try {
            socket.close();
        } catch (a) {
        }
        /** @type {null} */
        socket = null;
    }
}
function open1(url, a) {
    bind();
    if (result.ip) {
        /** @type {string} */
        url = `ws${ssl ? "s" : ""}://${result.ip}`;
    }
    if (null != success) {
        var callback = success;
        /**
         * @return {undefined}
         */
        success = () => {
            callback(a);
        };
    }
    if (ssl && (!EnvConfig.env_development && !EnvConfig.env_local)) {
        var attrList = url.split(":");
        /** @type {string} */
        url = `wss://ip-${attrList[1].replace(/\./g, "-").replace(/\//g, "")}.tech.agar.io:${+attrList[2]}`;
    }
    /** @type {Array} */
    that = [];
    /** @type {Array} */
    balls = [];
    args = {};
    /** @type {Array} */
    parts = [];
    /** @type {Array} */
    chars = [];
    /** @type {Array} */
    list = [];
    /** @type {null} */
    img = angles = null;
    /** @type {number} */
    closingAnimationTime = 0;
    /** @type {boolean} */
    matchEnd = false;
    /** @type {boolean} */
    options.cache.sentGameServerLogin = false;
    /** @type {WebSocket} */
    socket = new WebSocket(url);
    /** @type {string} */
    socket.binaryType = "arraybuffer";
    /**
     * @return {undefined}
     */
    socket.onopen = () => {
        var data: DataView;
        /** @type {number} */
        j = t = Date.now();
        /** @type {number} */
        d = 120;
        /** @type {number} */
        a1 = 0;
        console.log("socket open1");
        data = createBuffer(5);
        data.setUint8(0, 254);
        data.setUint32(1, 5, true);
        send(data);
        data = createBuffer(5);
        data.setUint8(0, 255);
        data.setUint32(1, 154669603, true);
        send(data);
        data = createBuffer(1 + a.length);
        data.setUint8(0, 80);
        /** @type {number} */
        var i = 0;
        for (; i < a.length; ++i) {
            data.setUint8(i + 1, a.charCodeAt(i));
        }
        send(data);
        options.core.proxy.onSocketOpen();
    };
    /** @type {function (MessageEvent): undefined} */
    socket.onmessage = onmessage1;
    /** @type {function (): undefined} */
    socket.onclose = listener;
    /**
     * @return {undefined}
     */
    socket.onerror = function () {
        console.log(exports.la() + " socket error", arguments);
    };
}
function createBuffer(expectedNumberOfNonCommentArgs) {
    return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
}
function send(data) {
    socket.send(data.buffer);
}
function listener() {
    if (matchEnd) {
        /** @type {number} */
        backoff = 500;
    }
    options.core.proxy.onSocketClosed();
    console.log(exports.la() + " socket close");
    setTimeout(next, backoff);
    backoff *= 2;
}

var max: number;


    function _(name) {
        return browser.i18n[name] || (browser.i18n_dict.en[name] || name);
    }
    function makeRequest() {
        /** @type {number} */
        var uid = ++resizeUID;
        bind();
        $.ajax(url + "findServer", {
             success(data) {
                if (uid == resizeUID) {
                    if (data.alert) {
                        alert(data.alert);
                    }
                    var method = data.ip;
                    if ("game_server_port" in EnvConfig) {
                        /** @type {string} */
                        method = browser.location.hostname + ":" + EnvConfig.game_server_port;
                    }
                    open1(`ws${ssl ? "s" : ""}://${method}`, data.token);
                }
            },
            dataType: "json",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: (newValue + actual || "?") + "\n154669603"
        });
    }

    var name1: number;

    function init(dataView, offset) {
        function read() {
            /** @type {string} */
            var str = "";
            for (; ;) {
                var b = dataView.getUint16(offset, true);
                offset += 2;
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        function randomString() {
            /** @type {string} */
            var str = "";
            for (; ;) {
                var b = dataView.getUint8(offset++);
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        /** @type {number} */
        t = Date.now();
        /** @type {number} */
        var x = t - j;
        /** @type {number} */
        j = t;
        /** @type {number} */
        d = qw * d + qz * x;
        /** @type {number} */
        a1 = tx * a1 + ty * Math.abs(x - d);
        if (options.core.debug) {
            options.debug.updateChart("networkUpdate", t, x);
            options.debug.updateChart("rttMean", t, d);
            options.debug.updateChart("rttSDev", t, a1);
        }
        if (!matchEnd) {
            /** @type {boolean} */
            matchEnd = true;
            $("#connecting").hide();
            connectResponseCommand();
            if (success) {
                success();
                /** @type {null} */
                success = null;
            }
        }
        /** @type {boolean} */
        ub = false;
        x = dataView.getUint16(offset, true);
        offset += 2;
        /** @type {number} */
        var i = 0;
        var c;
        for (; i < x; ++i) {
            var pos12 = args[dataView.getUint32(offset, true)];
            c = args[dataView.getUint32(offset + 4, true)];
            offset += 8;
            if (pos12) {
                if (c) {
                    c.ca();
                    c.s = c.x;
                    c.u = c.y;
                    c.o = c.size;
                    c.pa(pos12.x, pos12.y);
                    c.g = c.size;
                    /** @type {number} */
                    c.T = t;
                    hasClass(pos12, c);
                }
            }
        }
        var pos: number;
        /** @type {number} */
        i = 0;
        var data;
        for (; ;) {
            var a2 = dataView.getUint32(offset, true);
            offset += 4;
            if (0 == a2) {
                break;
            }
            ++i;
            var g: number;
            pos = dataView.getInt32(offset, true);
            offset += 4;
            c = dataView.getInt32(offset, true);
            offset += 4;
            g = dataView.getInt16(offset, true);
            offset += 2;
            data = dataView.getUint8(offset++);
            var color = dataView.getUint8(offset++);
            var key = dataView.getUint8(offset++);
            color = isArray(data << 16 | color << 8 | key);
            key = dataView.getUint8(offset++);
            /** @type {boolean} */
            var source = !!(key & 1);
            /** @type {boolean} */
            var h = !!(key & 16);
            /** @type {null} */
            var type = null;
            if (key & 2) {
                offset += 4 + dataView.getUint32(offset, true);
            }
            if (key & 4) {
                type = randomString();
            }
            var content = read();
            /** @type {null} */
            data = null;
            if (args.hasOwnProperty(a2)) {
                data = args[a2];
                data.S();
                data.s = data.a2;
                data.u = data.y;
                data.o = data.size;
                data.color = color;
            } else {
                data = new Node1(a2, pos, c, g, color, content);
                parts.push(data);
                args[a2] = data;
            }
            /** @type {boolean} */
            data.c = source;
            /** @type {boolean} */
            data.h = h;
            data.pa(pos, c);
            data.g = g;
            /** @type {number} */
            data.T = t;
            data.ea = key;
            if (type) {
                data.C = type;
            }
            if (content) {
                data.A(content);
            }
            if (-1 != that.indexOf(a2)) {
                if (-1 == balls.indexOf(data)) {
                    balls.push(data);
                    /** @type {boolean} */
                    data.I = true;
                    if (1 == balls.length) {
                        /** @type {boolean} */
                        data.wa = true;
                        ballsCenterX = data.a2;
                        ballsCenterY = data.y;
                        valueAccessor();
                        /** @type {string} */
                        document.getElementById("overlays").style.display = "none";
                        /** @type {Array} */
                        a = [];
                        /** @type {number} */
                        pauseText = 0;
                        col = balls[0].color;
                        /** @type {boolean} */
                        Aa = true;
                        /** @type {number} */
                        aux = Date.now();
                        /** @type {number} */
                        count = path = name1 = 0;
                    }
                }
            }
        }
        pos = dataView.getUint32(offset, true);
        offset += 4;
        /** @type {number} */
        i = 0;
        for (; i < pos; i++) {
            a1 = dataView.getUint32(offset, true);
            offset += 4;
            data = args[a1];
            if (null != data) {
                data.ca();
            }
        }
        if (ub) {
            if (0 == balls.length) {
                if (0 == browser.MC.isUserLoggedIn()) {
                    handlePlayerDeath();
                } else {
                    /** @type {number} */
                    timer = setTimeout(handlePlayerDeath, 2E3);
                }
            }
        }
    }


    var cc: boolean;
    var HALF_PI: number;
    var _arg: any;
    var Oa: number;
    var Pa: number;

    function render() {
        /** @type {number} */
        var n = Date.now();
        ++Mc;
        if (cc) {
            ++HALF_PI;
            if (180 < HALF_PI) {
                /** @type {number} */
                HALF_PI = 0;
            }
        }
        t = n;
        if (0 < balls.length) {
            updateScale();

            var newCenterX = 0;
            var newCenterY = 0;
            for (var i = 0; i < balls.length; i++) {
                balls[i].S();
                newCenterX += balls[i].x / balls.length;
                newCenterY += balls[i].y / balls.length;
            }
            ballsCenterWhenNoBallsX = newCenterX;
            ballsCenterWhenNoBallsY = newCenterY;
            worldZoom = mousAdjustedWorldZoom;
            ballsCenterX = (ballsCenterX + newCenterX) / 2;
            ballsCenterY = (ballsCenterY + newCenterY) / 2;
        } else {
            ballsCenterX = (5 * ballsCenterX + ballsCenterWhenNoBallsX) / 6;
            ballsCenterY = (5 * ballsCenterY + ballsCenterWhenNoBallsY) / 6;
            mousAdjustedWorldZoom = (9 * mousAdjustedWorldZoom + worldZoom * mouseWheelZoomAjusted()) / 10;
        }
        createObjects();
        updateLead();
        if (!$timeout) {
            ctx.clearRect(0, 0, width, height);
        }
        if ($timeout) {
            /** @type {string} */
            ctx.fillStyle = color ? "#111111" : "#F2FBFF";
            /** @type {number} */
            ctx.globalAlpha = 0.05;
            ctx.fillRect(0, 0, width, height);
            /** @type {number} */
            ctx.globalAlpha = 1;
        } else {
            redraw();
        }
        parts.sort((a, b) => (a.size == b.size ? a.id - b.id : a.size - b.size));
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(mousAdjustedWorldZoom, mousAdjustedWorldZoom);
        ctx.translate(-ballsCenterX, -ballsCenterY);
        /** @type {number} */
        var b3 = 0;
        for (; b3 < chars.length; b3++) {
            chars[b3].w(ctx);
        }
        /** @type {number} */
        var b4 = 0;
        for (; b4 < parts.length; b4++) {
            parts[b4].w(ctx);
        }
        if (nb) {
            /** @type {number} */
            xr = (3 * xr + matches) / 4;
            /** @type {number} */
            pos = (3 * pos + s) / 4;
            ctx.save();
            /** @type {string} */
            ctx.strokeStyle = "#FFAAAA";
            /** @type {number} */
            ctx.lineWidth = 10;
            /** @type {string} */
            ctx.lineCap = "round";
            /** @type {string} */
            ctx.lineJoin = "round";
            /** @type {number} */
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            /** @type {number} */
            var b5 = 0;
            for (; b5 < balls.length; b5++) {
                ctx.moveTo(balls[b5].x, balls[b5].y);
                ctx.lineTo(xr, pos);
            }
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
        if (img) {
            if (img.width) {
                ctx.drawImage(img, width - img.width - 10, 10);
            }
        }
        /** @type {number} */
        closingAnimationTime = Math.max(closingAnimationTime, pick());
        if (0 != closingAnimationTime) {
            if (null == _arg) {
                _arg = new setFillAndStroke(24, "#FFFFFF", true, "#000000");
            }
            _arg.B(_("score") + ": " + ~~(closingAnimationTime / 100));
            var a11 = _arg.N();
            newCenterX = a11.width;
            /** @type {number} */
            ctx.globalAlpha = 0.2;
            /** @type {string} */
            ctx.fillStyle = "#000000";
            ctx.fillRect(10, height - 10 - 24 - 10, newCenterX + 10, 34);
            /** @type {number} */
            ctx.globalAlpha = 1;
            ctx.drawImage(a11, 15, height - 10 - 24 - 5);
        }
        drawBackground();
        /** @type {number} */
        n = Date.now() - n;
        if (n > 1E3 / 60) {
            opts.detail -= 0.01;
        } else {
            if (n < 1E3 / 65) {
                opts.detail += 0.001;
            }
        }
        if (opts.detail < opts.selected.minDetail) {
            if (opts.auto) {
                opts.downgrade();
            }
            opts.detail = opts.selected.minDetail;
        }
        if (opts.detail > opts.selected.maxDetail) {
            if (opts.auto) {
                opts.upgrade();
            }
            opts.detail = opts.selected.maxDetail;
        }
        /** @type {number} */
        n = t - tOffset;
        if (!socketIsOpen() || (to || from)) {
            alpha += n / 2E3;
            if (1 < alpha) {
                /** @type {number} */
                alpha = 1;
            }
        } else {
            alpha -= n / 300;
            if (0 > alpha) {
                /** @type {number} */
                alpha = 0;
            }
        }
        if (0 < alpha) {
            /** @type {string} */
            ctx.fillStyle = "#000000";
            if (fc) {
                ctx.globalAlpha = alpha;
                ctx.fillRect(0, 0, width, height);
                if (image.complete) {
                    if (image.width) {
                        if (image.width / image.height < width / height) {
                            n = width;
                            /** @type {number} */
                            newCenterX = image.height * width / image.width;
                        } else {
                            /** @type {number} */
                            n = image.width * height / image.height;
                            newCenterX = height;
                        }
                        ctx.drawImage(image, (width - n) / 2, (height - newCenterX) / 2, n, newCenterX);
                        /** @type {number} */
                        ctx.globalAlpha = 0.5 * alpha;
                        ctx.fillRect(0, 0, width, height);
                    }
                }
            } else {
                /** @type {number} */
                ctx.globalAlpha = 0.5 * alpha;
                ctx.fillRect(0, 0, width, height);
            }
            /** @type {number} */
            ctx.globalAlpha = 1;
        } else {
            /** @type {boolean} */
            fc = false;
        }
        if (opts.selected.ma) {
            if (isConnected) {
                Oa++;
                if (Oa > 10 * opts.selected.warnFps) {
                    /** @type {boolean} */
                    opts.selected.ma = false;
                    /** @type {number} */
                    Oa = -1;
                    /** @type {number} */
                    Pa = 0;
                } else {
                    draw();
                }
            }
        }
        /** @type {number} */
        tOffset = t;
    }

    function draw() {
        /** @type {Element} */
        var map = document.createElement("canvas");
        var context = map.getContext("2d");
        /** @type {number} */
        var d = Math.min(800, 0.6 * width) / 800;
        /** @type {number} */
        map.width = 800 * d;
        /** @type {number} */
        map.height = 60 * d;
        /** @type {number} */
        context.globalAlpha = 0.3;
        /** @type {string} */
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 800, 60);
        /** @type {number} */
        context.globalAlpha = 1;
        /** @type {string} */
        context.fillStyle = "#FFFFFF";
        context.scale(d, d);
        /** @type {string} */
        var d1 = "Your computer is running slow,";
        /** @type {string} */
        context.font = "18px Ubuntu";
        context.fillText(d1, 400 - context.measureText(d1).width / 2, 25);
        /** @type {string} */
        d1 = "please close other applications or tabs in your browser for better game performance.";
        context.fillText(d1, 400 - context.measureText(d1).width / 2, 45);
        ctx.drawImage(map, (width - map.width) / 2, height - map.height - 10);
    }

    function redraw() {
        /** @type {string} */
        ctx.fillStyle = color ? "#111111" : "#F2FBFF";
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        /** @type {string} */
        ctx.strokeStyle = color ? "#AAAAAA" : "#000000";
        /** @type {number} */
        ctx.globalAlpha = 0.2 * mousAdjustedWorldZoom;
        /** @type {number} */
        var x = width / mousAdjustedWorldZoom;
        /** @type {number} */
        var y2 = height / mousAdjustedWorldZoom;
        /** @type {number} */
        var y1 = (-ballsCenterX + x / 2) % 50;
        for (; y1 < x; y1 += 50) {
            ctx.beginPath();
            ctx.moveTo(y1 * mousAdjustedWorldZoom - 0.5, 0);
            ctx.lineTo(y1 * mousAdjustedWorldZoom - 0.5, y2 * mousAdjustedWorldZoom);
            ctx.stroke();
        }
        /** @type {number} */
        y1 = (-ballsCenterY + y2 / 2) % 50;
        for (; y1 < y2; y1 += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y1 * mousAdjustedWorldZoom - 0.5);
            ctx.lineTo(x * mousAdjustedWorldZoom, y1 * mousAdjustedWorldZoom - 0.5);
            ctx.stroke();
        }
        ctx.restore();
    }
    function drawBackground() {
        if (gc && copy.width) {
            /** @type {number} */
            var dim = width / 5;
            ctx.drawImage(copy, 5, 5, dim, dim);
        }
    }

    function pick() {
        /** @type {number} */
        var result = 0;
        /** @type {number} */
        var i = 0;
        for (; i < balls.length; i++) {
            result += balls[i].g * balls[i].g;
        }
        return result;
    }

    function create() {
        /** @type {null} */
        img = null;
        if (null != angles || 0 != list.length) {
            if (null != angles || text) {
                /** @type {Element} */
                img = document.createElement("canvas");
                var ctx = img.getContext("2d");
                /** @type {number} */
                var i = 60;
                /** @type {number} */
                i = null == angles ? i + 24 * list.length : i + 180;
                /** @type {number} */
                var d = Math.min(200, 0.3 * width) / 200;
                /** @type {number} */
                img.width = 200 * d;
                /** @type {number} */
                img.height = i * d;
                ctx.scale(d, d);
                /** @type {number} */
                ctx.globalAlpha = 0.4;
                /** @type {string} */
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 200, i);
                /** @type {number} */
                ctx.globalAlpha = 1;
                /** @type {string} */
                ctx.fillStyle = "#FFFFFF";
                /** @type {null} */
                d = null;
                d = _("leaderboard");
                /** @type {string} */
                ctx.font = "30px Ubuntu";
                ctx.fillText(d, 100 - ctx.measureText(d).width / 2, 40);
                var top;
                var originalWidth: number;
                if (null == angles) {
                    /** @type {string} */
                    ctx.font = "20px Ubuntu";
                    /** @type {number} */
                    i = 0;
                    for (; i < list.length; ++i) {
                        var d3 = list[i].name || _("unnamed_cell");
                        if (!text) {
                            d3 = _("unnamed_cell");
                        }
                        if (1 == list[i].id || -1 != that.indexOf(list[i].id)) {
                            if (balls[0].name) {
                                d3 = balls[0].name;
                            }
                            /** @type {string} */
                            ctx.fillStyle = "#FFAAAA";
                        } else {
                            /** @type {string} */
                            ctx.fillStyle = "#FFFFFF";
                        }
                        /** @type {string} */
                        var d2 = i + 1 + ". " + d2;
                        originalWidth = ctx.measureText(d2).width;
                        /** @type {number} */
                        top = 70 + 24 * i;
                        if (200 < originalWidth) {
                            ctx.fillText(d2, 10, top);
                        } else {
                            ctx.fillText(d2, (200 - originalWidth) / 2, top);
                        }
                    }
                } else {
                    /** @type {number} */
                    i = d = 0;
                    for (; i < angles.length; ++i) {
                        /** @type {number} */
                        top = d + angles[i] * Math.PI * 2;
                        ctx.fillStyle = cs[i + 1];
                        ctx.beginPath();
                        ctx.moveTo(100, 140);
                        ctx.arc(100, 140, 80, d, top, false);
                        ctx.fill();
                        /** @type {number} */
                        d = top;
                    }
                }
            }
        }
    }
    function tryIt(f) {
        if (null == f || 0 == f.length) {
            return null;
        }
        if ("%" == f[0]) {
            if (!browser.MC || !browser.MC.getSkinInfo) {
                return null;
            }
            f = browser.MC.getSkinInfo(`skin_${f.slice(1)}`);
            if (null == f) {
                return null;
            }
            /** @type {string} */
            f = (+f.color).toString(16);
            for (; 6 > f.length;) {
                /** @type {string} */
                f = `0${f}`;
            }
            return `#${f}`;
        }
        return null;
    }

    var results: {};
   
    function loop(x) {
        if (null == x || 0 == x.length) {
            return null;
        }
        if (!results.hasOwnProperty(x)) {
            /** @type {Image} */
            var t = new Image;
            if (":" == x[0]) {
                t.src = x.slice(1);
            } else {
                if ("%" == x[0]) {
                    if (!browser.MC || !browser.MC.getSkinInfo) {
                        return null;
                    }
                    var data = browser.MC.getSkinInfo(`skin_${x.slice(1)}`);
                    if (null == data) {
                        return null;
                    }
                    t.src = browser.ASSETS_ROOT + data.url;
                }
            }
            /** @type {Image} */
            results[x] = t;
        }
        return 0 != results[x].width && results[x].complete ? results[x] : null;
    }
    
    function Player(client, x, y, f, opt_vars) {
        /** @type {(Object|string)} */
        this.$ = client;
        /** @type {number} */
        this.x = x;
        /** @type {number} */
        this.y = y;
        /** @type {number} */
        this.f = f;
        /** @type {number} */
        this.b = opt_vars;
    }

    
    function Node1(id, opt_parent, $0, size, value, c) {
        /** @type {number} */
        this.id = id;
        this.s = this.x = this.L = this.J = opt_parent;
        this.u = this.y = this.M = this.K = $0;
        this.o = this.size = size;
        /** @type {number} */
        this.color = value;
        /** @type {Array} */
        this.a = [];
        this.ba();
        this.A(c);
    }

    function isArray(val) {
        val = val.toString(16);
        for (; 6 > val.length;) {
            /** @type {string} */
            val = `0${val}`;
        }
        return `#${val}`;
    }

    function setFillAndStroke(val, dataAndEvents, params, o) {
        if (val) {
            /** @type {number} */
            this.v = val;
        }
        if (dataAndEvents) {
            /** @type {number} */
            this.W = dataAndEvents;
        }
        /** @type {boolean} */
        this.Y = !!params;
        if (o) {
            /** @type {number} */
            this.Z = o;
        }
    }

    function shuffle(arr) {
        var total = arr.length;
        var tmp1;
        var rnd: number;
        for (; 0 < total;) {
            /** @type {number} */
            rnd = Math.floor(Math.random() * total);
            total--;
            tmp1 = arr[total];
            arr[total] = arr[rnd];
            arr[rnd] = tmp1;
        }
    }

  
    var data: { context: any;defaultProvider: string;loginIntent: string;userInfo: { socialToken: any;tokenExpires: string;level: string;xp: string;xpNeeded: string;name: string;picture: string;displayName: string;loggedIn: string;socialId: string } };
    var tmp: { context: any;defaultProvider: string;loginIntent: string;userInfo: { socialToken: any;tokenExpires: string;level: string;xp: string;xpNeeded: string;name: string;picture: string;displayName: string;loggedIn: string;socialId: string } };

    function compassResult() {
        data = tmp;
    }

   
    function template(text) {
        /** @type {string} */
        data.context = "google" == text ? "google" : "facebook";
        callback();
    }

    /**
     * @return {undefined}
     */
    function callback() {
        /** @type {string} */
        browser.localStorage.storeObjectInfo = JSON.stringify(data);
        /** @type {*} */
        data = JSON.parse(browser.localStorage.storeObjectInfo);
        /** @type {*} */
        browser.storageInfo = data;
        if ("google" == data.context) {
            $("#gPlusShare").show();
            $("#fbShare").hide();
        } else {
            $("#gPlusShare").hide();
            $("#fbShare").show();
        }
    }

    /**
     * @param {Object} item
     * @return {undefined}
     */
    function apply(item) {
        $("#helloContainer").attr("data-has-account-data");
        if ("" != item.displayName) {
            item.name = item.displayName;
        }
        if (null == item.name || void 0 == item.name) {
            /** @type {string} */
            item.name = "";
        }
        var index = item.name.lastIndexOf("_");
        if (-1 != index) {
            item.name = item.name.substring(0, index);
        }
        $("#helloContainer").attr("data-has-account-data", "1");
        $("#helloContainer").attr("data-logged-in", "1");
        $(".agario-profile-panel .progress-bar-star").text(item.level);
        $(".agario-exp-bar .progress-bar-text").text(item.xp + "/" + item.xpNeeded + " XP");
        $(".agario-exp-bar .progress-bar").css("width", (88 * item.xp / item.xpNeeded).toFixed(2) + "%");
        $(".agario-profile-name").text(item.name);
        if ("" != item.picture) {
            $(".agario-profile-picture").attr("src", item.picture);
        }
        f();
        data.userInfo.level = item.level;
        data.userInfo.xp = item.xp;
        data.userInfo.xpNeeded = item.xpNeeded;
        data.userInfo.displayName = item.name;
        /** @type {string} */
        data.userInfo.loggedIn = "1";
        browser.updateStorage();
    }

    /**
     * @param {string} args
     * @param {Function} render
     * @return {undefined}
     */
    function start(args, render) {
        /** @type {string} */
        var options = args;
        if (data.userInfo.loggedIn) {
            var xpgen = $("#helloContainer")
                .is(":visible") && "1" == $("#helloContainer")
                    .attr("data-has-account-data");
            if (null == options) {
                options = data.userInfo;
            }
            if (xpgen) {
                /** @type {number} */
                var val = +$(".agario-exp-bar .progress-bar-text").first().text().split("/")[0];
                /** @type {number} */
                var a3 = +$(".agario-exp-bar .progress-bar-text")
                    .first().text().split("/")[1].split(" ")[0];
                var level = $(".agario-profile-panel .progress-bar-star").first().text();
                if (level != options.level) {
                    start({
                        xp: a3,
                        xpNeeded: a3,
                        level: level
                    }, () => {
                        $(".agario-profile-panel .progress-bar-star").text(options.level);
                        $(".agario-exp-bar .progress-bar").css("width", "100%");
                        $(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            () => {
                                $(".progress-bar-star").removeClass("animated tada");
                            });
                        setTimeout(() => {
                            $(".agario-exp-bar .progress-bar-text").text(options.xpNeeded + "/" + options.xpNeeded + " XP");
                            start({
                                xp: 0,
                                xpNeeded: options.xpNeeded,
                                level: options.level
                            }, "function () {start(options);}");
                        }, 1E3);
                    });
                } else {
                    /** @type {number} */
                    var f = Date.now();
                    /**
                     * @return {undefined}
                     */
                    var update = () => {
                        var t: number;
                        /** @type {number} */
                        t = (Date.now() - f) / 1E3;
                        /** @type {number} */
                        t = 0 > t ? 0 : 1 < t ? 1 : t;
                        /** @type {number} */
                        t = t * t * (3 - 2 * t);
                        $(".agario-exp-bar .progress-bar-text").text(~~(val + (options.xp - val) * t) + "/" + options.xpNeeded + " XP");
                        $(".agario-exp-bar .progress-bar").css("width", (88 * (val + (options.xp - val) * t) / options.xpNeeded).toFixed(2) + "%");
                        if (render) {
                            render();
                        }
                        if (1 > t) {
                            browser.requestAnimationFrame1(update);
                        }
                    };
                    browser.requestAnimationFrame1(update);
                }
            }
        }
    }

    /**
     * @return {undefined}
     */
    function f() {
        var force;
        if ("undefined" !== typeof force ||
            "none" == $("#settings").css("display") &&
            "none" == $("#socialLoginContainer").css("display")) {
            $("#instructions").show();
        }
    }

    /**
     * @param {Object} response
     * @return {undefined}
     */
    var lc: number;
    var h: () => void;

    function error(response) {
        if ("connected" == response.status) {
            var actualAria = response.authResponse.accessToken;
            if (null == actualAria || ("undefined" == actualAria || "" == actualAria)) {
                if (3 > lc) {
                    lc++;
                    browser.facebookRelogin();
                }
                browser.logout();
            } else {
                browser.MC.doLoginWithFB(actualAria);
                /** @type {Array} */
                options.cache.login_info = [actualAria, "facebook"];
                browser.FB.api("/me/picture?width=180&height=180",
                    messageEvent => {
                    data.userInfo.picture = messageEvent.data.url;
                    browser.updateStorage();
                    $(".agario-profile-picture").attr("src", messageEvent.data.url);
                    data.userInfo.socialId = response.authResponse.userID;
                    h();
                });
                $("#helloContainer").attr("data-logged-in", "1");
                /** @type {string} */
                data.context = "facebook";
                /** @type {string} */
                data.loginIntent = "1";
                browser.updateStorage();
            }
        }
    }

    /**
     * @param {string} param
     * @return {undefined}
     */
    function request(param) {
        show(":party");
        $("#helloContainer").attr("data-party-state", "4");
        /** @type {string} */
        param = decodeURIComponent(param).replace(/.*#/gim, "");
        cb(`#${browser.encodeURIComponent(param)}`);
        $.ajax(url + "getToken", {
            /**
             * @return {undefined}
             */
            error: function () {
                $("#helloContainer").attr("data-party-state", "6");
            },
            /**
             * @param {string} status
             * @return {undefined}
             */ success(status) {
                status = status.split("\n");
                $(".partyToken").val(`agar.io/#${browser.encodeURIComponent(param)}`);
                $("#helloContainer").attr("data-party-state", "5");
                show(":party");
                open1(`ws://${status[0]}`, param);
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: param
        });
    }

    /**
     * @param {string} path
     * @return {undefined}
     */
    function cb(path) {
        if (browser.history) {
            if (browser.history.replaceState) {
                browser.history.replaceState({}, browser.document.title, path);
            }
        }
    }


    /**
     * @param {Element} params
     * @param {Object} self1
     * @return {undefined}
     */
    function hasClass(params, self1) {
        /** @type {boolean} */
        var d = -1 != that.indexOf(params.id);
        /** @type {boolean} */
        var c = -1 != that.indexOf(self1.id);
        /** @type {boolean} */
        var e = 30 > self1.size;
        if (d) {
            if (e) {
                ++pauseText;
            }
        }
        if (!e) {
            if (d) {
                if (!c) {
                    if (!(self1.ea & 32)) {
                        ++path;
                    }
                }
            }
        }
    }

    /**
     * @param {number} i
     * @return {?}
     */
    function fill(i) {
        /** @type {number} */
        i = ~~i;
        /** @type {string} */
        var lineNumber = (i % 60).toString();
        /** @type {string} */
        i = (~~(i / 60)).toString();
        if (2 > lineNumber.length) {
            /** @type {string} */
            lineNumber = `0${lineNumber}`;
        }
        return i + ":" + lineNumber;
    }

    /**
     * @return {?}
     */
    function objEquiv() {
        if (null == list) {
            return 0;
        }
        /** @type {number} */
        var p = 0;
        for (; p < list.length; ++p) {
            if (list[p].id & 1) {
                return p + 1;
            }
        }
        return 0;
    }

    /**
     * @return {undefined}
     */
    function DrawPolyline() {
        $(".stats-food-eaten").text(pauseText);
        $(".stats-time-alive").text(fill((max - aux) / 1E3));
        $(".stats-leaderboard-time").text(fill(name));
        $(".stats-highest-mass").text(~~(closingAnimationTime / 100));
        $(".stats-cells-eaten").text(path);
        $(".stats-top-position").text(0 == count ? ":(" : count);
        /** @type {(HTMLElement|null)} */
        var h1 = <HTMLCanvasElement>document.getElementById("statsGraph");
        if (h1) {
            var ctx = h1.getContext("2d");
            var width = h1.width;
            var h2 = h2.height;
            ctx.clearRect(0, 0, width, h2);
            if (2 < a.length) {
                /** @type {number} */
                var n = 200;
                /** @type {number} */
                var i = 0;
                for (; i < a.length; i++) {
                    /** @type {number} */
                    n = Math.max(a[i], n);
                }
                /** @type {number} */
                ctx.lineWidth = 3;
                /** @type {string} */
                ctx.lineCap = "round";
                /** @type {string} */
                ctx.lineJoin = "round";
                ctx.strokeStyle = col;
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, h2 - a[0] / n * (h2 - 10) + 10);
                /** @type {number} */
                i = 1;
                for (; i < a.length; i += Math.max(~~(a.length / width), 1)) {
                    /** @type {number} */
                    var x = i / (a.length - 1) * width;
                    /** @type {Array} */
                    var r = [];
                    /** @type {number} */
                    var offset = -20;
                    for (; 20 >= offset; ++offset) {
                        if (!(0 > i + offset)) {
                            if (!(i + offset >= a.length)) {
                                r.push(a[i + offset]);
                            }
                        }
                    }
                    /** @type {number} */
                    var r2 = r.reduce((far, near) => (far + near)) / r.length / n;
                    ctx.lineTo(x, h2 - r2 * (h2 - 10) + 10);
                }
                ctx.stroke();
                /** @type {number} */
                ctx.globalAlpha = 0.5;
                ctx.lineTo(width, h2);
                ctx.lineTo(0, h2);
                ctx.fill();
                /** @type {number} */
                ctx.globalAlpha = 1;
            }
        }
    }

    var id = true;
/**
     * @return {undefined}
     */
    function setPosition() {
        if (!to) {
            if (!from) {
                if (id) {
                    browser.refreshAd(browser.adSlots.ab);
                    DrawPolyline();
                    /** @type {boolean} */
                    from = true;
                    setTimeout(function () {
                        $("#overlays").fadeIn(500, start);
                        $("#stats").show();
                        var onComplete = trigger("g_plus_share_stats");
                        browser.fillSocialValues(onComplete, "gPlusShare");
                    }, 1500);
                } else {
                    showError(500);
                }
            }
        }
    }

    /**
     * @param {string} data
     * @return {?}
     */
    function trigger(data) {
        var uHostName = $(".stats-time-alive").text();
        return browser.parseString(data, "%@", [uHostName.split(":")[0], uHostName.split(":")[1], $(".stats-highest-mass").text()]);
    }

    /**
     * @return {undefined}
     */
    function onMouseMove() {
        browser.open1("https://plus.google.com/share?url=www.agar.io&hl=en-US", "Agar.io", `width=484,height=580,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=${browser.screenX + browser.innerWidth / 2 - 242},top=${(browser.innerHeight - 580) / 2}`);
    }
function main(self1, $) {

    /** @type {Element} */
    var test_canvas = document.createElement("canvas");
    if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self1.localStorage))))) {
        alert("You browser does not support this game, we recommend you to use Firefox to play this");
    } else {
        result = new Result();
        (function () {
            /** @type {string} */
            var params = self1.location.search;
            if ("?" == params.charAt(0)) {
                /** @type {string} */
                params = params.slice(1);
            }
            /** @type {Array.<string>} */
            params = params.split("&");
            /** @type {number} */
            var i = 0;
            for (; i < params.length; i++) {
                /** @type {Array.<string>} */
                var both = params[i].split("=");
                /** @type {string} */
                result[both[0]] = both[1];
            }
        })();
        self1.queryString = result;
        /** @type {boolean} */
        var fb = "fb" in result;
        /** @type {boolean} */
        var miniclip = "miniclip" in result;
        var settings = {
            skinsEnabled: false,
            namesEnabled: false,
            noColors: false,
            blackTheme: false,
            showMass: false,
            statsEnabled: false
        };
        /**
         * @return {undefined}
         */
        var after = () => {
            setCookie("", -1);
        };
        /** @type {boolean} */
        var _tryInitOnFocus = "http:" != self1.location.protocol;
        /** @type {boolean} */
        var _isFocused = "1" == fnReadCookie();
        /** @type {boolean} */
        var sc = false;
        if (!fb) {
            if (!miniclip) {
                if (_tryInitOnFocus && !_isFocused) {
                    setCookie("1", 1);
                    /** @type {string} */
                    self1.location.href = `http:${self1.location.href.substring(self1.location.protocol.length)}`;
                    /** @type {boolean} */
                    sc = true;
                } else {
                    setCookie("", -1);
                }
            }
        }
        if (!_tryInitOnFocus) {
            setCookie("", -1);
        }
        if (!sc) {
            setTimeout(after, 3E3);
        }
        if (!self1.agarioNoInit) {
            /** @type {boolean} */
            ssl = "https:" == base;
            if (result.master) {
                EnvConfig.master_url = result.master;
            }
            /** @type {string} */
            url = base + "//" + EnvConfig.master_url + "/";
            /** @type {string} */
            var userAgent = self1.navigator.userAgent;
            if (-1 != userAgent.indexOf("Android")) {
                if (self1.ga) {
                    self1.ga("send", "event", "MobileRedirect", "PlayStore");
                }
                setTimeout(function () {
                    /** @type {string} */
                    self1.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io";
                }, 1E3);
            } else {
                if (-1 != userAgent.indexOf("iPhone") || (-1 != userAgent.indexOf("iPad") || -1 != userAgent.indexOf("iPod"))) {
                    if (self1.ga) {
                        self1.ga("send", "event", "MobileRedirect", "AppStore");
                    }
                    setTimeout(function () {
                        /** @type {string} */
                        self1.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp";
                    }, 1E3);
                } else {
                    self1.agarApp = options;
                    if ("gamepad" in result) {
                        setInterval(function () {
                            if (Xa) {
                                mouseX = val.ha(mouseX, k);
                                mouseY = val.ha(mouseY, oldconfig);
                            }
                        }, 25);
                    }
                    /**
                     * @param {number} dataAndEvents
                     * @param {number} m3
                     * @return {undefined}
                     */
                    self1.gamepadAxisUpdate = (dataAndEvents, m3) => {
                        /** @type {boolean} */
                        var d = 0.1 > m3 * m3;
                        if (0 == dataAndEvents) {
                            if (d) {
                                /** @type {number} */
                                k = width / 2;
                            } else {
                                /** @type {number} */
                                k = (m3 + 1) / 2 * width;
                                /** @type {boolean} */
                                Xa = true;
                            }
                        }
                        if (1 == dataAndEvents) {
                            if (d) {
                                /** @type {number} */
                                oldconfig = height / 2;
                            } else {
                                /** @type {number} */
                                oldconfig = (m3 + 1) / 2 * height;
                                /** @type {boolean} */
                                Xa = true;
                            }
                        }
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.agarioInit = () => {
                        /** @type {boolean} */
                        ab = true;
                        postLink();
                        startServer();
                        options.core.init();
                        if (null != self1.localStorage.settings) {
                            /** @type {*} */
                            settings = JSON.parse(self1.localStorage.settings);
                            metadata = settings.showMass;
                            color = settings.blackTheme;
                            text = settings.namesEnabled;
                            type = settings.noColors;
                            id = settings.statsEnabled;
                            root = settings.skinsEnabled;
                        }
                        $("#showMass").prop("checked", settings.showMass);
                        $("#noSkins").prop("checked", !settings.skinsEnabled);
                        $("#skipStats").prop("checked", !settings.statsEnabled);
                        $("#noColors").prop("checked", settings.noColors);
                        $("#noNames").prop("checked", !settings.namesEnabled);
                        $("#darkTheme").prop("checked", settings.blackTheme);
                        run();
                        setInterval(run, 18E4);
                        /** @type {(HTMLElement|null)} */
                        canvas = alsoCanvas = <HTMLCanvasElement>document.getElementById("canvas");
                        if (null != canvas) {
                            ctx = canvas.getContext("2d");

                            canvas.onmousedown = mouseDownHandler;
                            canvas.onmousemove = mouseDownHandler;
                            
                            /**
                             * @return {undefined}
                             */
                            canvas.onmouseup = function () {
                            };
                            if (/firefox/i.test(navigator.userAgent)) {
                                document.addEventListener("DOMMouseScroll", handleMousewheel, false);
                            } else {
                                /** @type {function (Event): undefined} */
                                document.body.onmousewheel = handleMousewheel;
                            }
                            /**
                             * @return {undefined}
                             */
                            self1.onblur = function () {
                                sendCommand(19);
                                /** @type {boolean} */
                                stack = memory = firing = false;
                            };
                            /** @type {function (): undefined} */
                            self1.onresize = onResize;
                            self1.requestAnimationFrame1(which);
                            setInterval(sendMoveCommand, 40);
                            if (newValue) {
                                $("#region").val(newValue);
                            }
                            save();
                            reset($("#region").val());
                            if (0 == resizeUID) {
                                if (newValue) {
                                    next();
                                }
                            }
                            showError(0);
                            onResize();
                            if (self1.location.hash) {
                                if (6 <= self1.location.hash.length) {
                                    request(self1.location.hash);
                                }
                            }
                        }
                    };
                    /** @type {null} */
                    old = null;
                    /**
                     * @param {Function} v
                     * @return {undefined}
                     */
                    self1.setNick = function (v) {
                        if (self1.ga) {
                            self1.ga("send", "event", "Nick", v.toLowerCase());
                        }
                        _init();
                        /** @type {Function} */
                        b = v;
                        connectResponseCommand();
                        /** @type {number} */
                        closingAnimationTime = 0;
                        settings.skinsEnabled = root;
                        settings.namesEnabled = text;
                        settings.noColors = type;
                        settings.blackTheme = color;
                        settings.showMass = metadata;
                        settings.statsEnabled = id;
                        /** @type {string} */
                        self1.localStorage.settings = JSON.stringify(settings);
                        playerCalc();
                    };
                    /**
                     * @param {string} part
                     * @return {undefined}
                     */
                    self1.setSkins = function (part) {
                        /** @type {string} */
                        root = part;
                    };
                    /**
                     * @param {string} textAlt
                     * @return {undefined}
                     */
                    self1.setNames = function (textAlt) {
                        /** @type {string} */
                        text = textAlt;
                    };
                    /**
                     * @param {boolean} newColor
                     * @return {undefined}
                     */
                    self1.setDarkTheme = function (newColor) {
                        /** @type {boolean} */
                        color = newColor;
                    };
                    /**
                     * @param {string} color
                     * @return {undefined}
                     */
                    self1.setColors = color => {
                        /** @type {string} */
                        type = color;
                    };
                    /**
                     * @param {string} response
                     * @return {undefined}
                     */
                    self1.setShowMass = response => {
                        /** @type {string} */
                        metadata = response;
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.spectate = () => {
                        /** @type {null} */
                        b = null;
                        playerCalc();
                        sendCommand(1);
                        _init();
                    };
                    /** @type {function ((Object|string)): undefined} */
                    self1.setRegion = reset;
                    /** @type {boolean} */
                    selector = true;
                    /**
                     * @param {string} expected
                     * @return {undefined}
                     */
                    self1.setGameMode = expected => {
                        if (expected != actual) {
                            if (":party" == actual) {
                                $("#helloContainer").attr("data-party-state", "0");
                            }
                            show(expected);
                            if (":party" != expected) {
                                next();
                            }
                        }
                    };
                    /**
                     * @param {boolean} _$timeout_
                     * @return {undefined}
                     */
                    self1.setAcid = _$timeout_ => {
                        /** @type {boolean} */
                        $timeout = _$timeout_;
                    };
                    var POST = function (self1) {
                        var $window = {};
                        /** @type {boolean} */
                        var text = false;
                        var skipDraw = {
                            skipDraw: true,
                            predictionModifier: 1.1
                        };
                        /**
                         * @return {undefined}
                         */
                        self1.init = function () {
                            options.account.init();
                            options.google.xa();
                            options.fa.init();
                            if (text = "debug" in self1.queryString) {
                                options.debug.showDebug();
                            }
                        };
                        /**
                         * @param {string} event_name
                         * @param {Function} callback
                         * @return {undefined}
                         */
                        self1.bind = function (event_name, callback) {
                            $($window).bind(event_name, callback);
                        };
                        /**
                         * @param {?} callback
                         * @param {?} cb
                         * @return {undefined}
                         */
                        self1.unbind = function (callback, cb) {
                            $($window).unbind(callback, cb);
                        };
                        /**
                         * @param {string} type
                         * @param {?} extra
                         * @return {undefined}
                         */
                        self1.trigger = function (type, extra) {
                            $($window).trigger(type, extra);
                        };
                        self1.__defineGetter__("debug", function () {
                            return text;
                        });
                        self1.__defineSetter__("debug", function (textAlt) {
                            return text = textAlt;
                        });
                        self1.__defineGetter__("proxy", function () {
                            return self1.MC;
                        });
                        self1.__defineGetter__("config", function () {
                            return skipDraw;
                        });
                        return self1;
                    } ({});
                    options.core = POST;
                    options.cache = {};
                    var debug = function (Child) {
                        /**
                         * @param {number} id
                         * @param {Array} data
                         * @param {Array} res
                         * @param {Array} s
                         * @return {undefined}
                         */
                        function success(id, data, res, s) {
                            /** @type {string} */
                            id = id + "Canvas";
                            var j = $("<canvas>", {
                                id: id
                            });
                            input.append(j);
                            res = new SmoothieChart(res);
                            /** @type {number} */
                            j = 0;
                            for (; j < data.length; j++) {
                                var pixel = data[j];
                                var encoding = "_.extend(deep, s[j])";
                                res.addTimeSeries(pixel, encoding);
                            }
                            res.streamTo(document.getElementById(id), 0);
                        }

                        /**
                         * @param {?} name
                         * @param {Array} xhr
                         * @return {undefined}
                         */
                        function done(name, xhr) {
                            obj[name] = decodeURIComponent();
                            success(name, [obj[name]], xhr, [
                                {
                                    strokeStyle: "rgba(0, 255, 0, 1)",
                                    fillStyle: "rgba(0, 255, 0, 0.2)",
                                    lineWidth: 2
                                }
                            ]);
                        }

                        /**
                         * @return {?}
                         */
                        function decodeURIComponent() {
                            return new TimeSeries({
                                Ma: false
                            });
                        }

                        /** @type {boolean} */
                        var g = false;
                        var input;
                        /** @type {boolean} */
                        var text = false;
                        var obj = new Obj1();
                        var deep = {
                            strokeStyle: "rgba(0, 255, 0, 1)",
                            fillStyle: "rgba(0, 255, 0, 0.2)",
                            lineWidth: 2
                        };
                        /**
                         * @return {undefined}
                         */
                        Child.showDebug = function () {
                            if (!g) {
                                input = $("#debug-overlay");
                                done("networkUpdate", {
                                    name: "network updates",
                                    minValue: 0,
                                    maxValue: 120
                                });
                                done("fps", {
                                    name: "fps",
                                    minValue: 0,
                                    maxValue: 120
                                });
                                obj.rttSDev = decodeURIComponent();
                                obj.rttMean = decodeURIComponent();
                                success("rttMean", [obj.rttSDev, obj.rttMean], {
                                    name: "rtt",
                                    minValue: 0,
                                    maxValue: 120
                                }, [
                                        {
                                            strokeStyle: "rgba(255, 0, 0, 1)",
                                            fillStyle: "rgba(0, 255, 0, 0.2)",
                                            lineWidth: 2
                                        }, {
                                            strokeStyle: "rgba(0, 255, 0, 1)",
                                            fillStyle: "rgba(0, 255, 0, 0)",
                                            lineWidth: 2
                                        }
                                    ]);
                                /** @type {boolean} */
                                g = true;
                            }
                            /** @type {boolean} */
                            options.core.debug = true;
                            input.show();
                        };
                        /**
                         * @return {undefined}
                         */
                        Child.hideDebug = function () {
                            input.hide();
                            /** @type {boolean} */
                            options.core.debug = false;
                        };
                        /**
                         * @param {string} name
                         * @param {number} a
                         * @param {number} data
                         * @return {undefined}
                         */
                        Child.updateChart = function (name, a, data) {
                            if (g) {
                                if (name in obj) {
                                    obj[name].append(a, data);
                                }
                            }
                        };
                        Child.__defineGetter__("showPrediction", function () {
                            return text;
                        });
                        Child.__defineSetter__("showPrediction", function (textAlt) {
                            return text = textAlt;
                        });
                        return Child;
                    } ({});
                    options.debug = debug;
                    input = {
                        AF: "JP-Tokyo",
                        AX: "EU-London",
                        AL: "EU-London",
                        DZ: "EU-London",
                        AS: "SG-Singapore",
                        AD: "EU-London",
                        AO: "EU-London",
                        AI: "US-Atlanta",
                        AG: "US-Atlanta",
                        AR: "BR-Brazil",
                        AM: "JP-Tokyo",
                        AW: "US-Atlanta",
                        AU: "SG-Singapore",
                        AT: "EU-London",
                        AZ: "JP-Tokyo",
                        BS: "US-Atlanta",
                        BH: "JP-Tokyo",
                        BD: "JP-Tokyo",
                        BB: "US-Atlanta",
                        BY: "EU-London",
                        BE: "EU-London",
                        BZ: "US-Atlanta",
                        BJ: "EU-London",
                        BM: "US-Atlanta",
                        BT: "JP-Tokyo",
                        BO: "BR-Brazil",
                        BQ: "US-Atlanta",
                        BA: "EU-London",
                        BW: "EU-London",
                        BR: "BR-Brazil",
                        IO: "JP-Tokyo",
                        VG: "US-Atlanta",
                        BN: "JP-Tokyo",
                        BG: "EU-London",
                        BF: "EU-London",
                        BI: "EU-London",
                        KH: "JP-Tokyo",
                        CM: "EU-London",
                        CA: "US-Atlanta",
                        CV: "EU-London",
                        KY: "US-Atlanta",
                        CF: "EU-London",
                        TD: "EU-London",
                        CL: "BR-Brazil",
                        CN: "CN-China",
                        CX: "JP-Tokyo",
                        CC: "JP-Tokyo",
                        CO: "BR-Brazil",
                        KM: "EU-London",
                        CD: "EU-London",
                        CG: "EU-London",
                        CK: "SG-Singapore",
                        CR: "US-Atlanta",
                        CI: "EU-London",
                        HR: "EU-London",
                        CU: "US-Atlanta",
                        CW: "US-Atlanta",
                        CY: "JP-Tokyo",
                        CZ: "EU-London",
                        DK: "EU-London",
                        DJ: "EU-London",
                        DM: "US-Atlanta",
                        DO: "US-Atlanta",
                        EC: "BR-Brazil",
                        EG: "EU-London",
                        SV: "US-Atlanta",
                        GQ: "EU-London",
                        ER: "EU-London",
                        EE: "EU-London",
                        ET: "EU-London",
                        FO: "EU-London",
                        FK: "BR-Brazil",
                        FJ: "SG-Singapore",
                        FI: "EU-London",
                        FR: "EU-London",
                        GF: "BR-Brazil",
                        PF: "SG-Singapore",
                        GA: "EU-London",
                        GM: "EU-London",
                        GE: "JP-Tokyo",
                        DE: "EU-London",
                        GH: "EU-London",
                        GI: "EU-London",
                        GR: "EU-London",
                        GL: "US-Atlanta",
                        GD: "US-Atlanta",
                        GP: "US-Atlanta",
                        GU: "SG-Singapore",
                        GT: "US-Atlanta",
                        GG: "EU-London",
                        GN: "EU-London",
                        GW: "EU-London",
                        GY: "BR-Brazil",
                        HT: "US-Atlanta",
                        VA: "EU-London",
                        HN: "US-Atlanta",
                        HK: "JP-Tokyo",
                        HU: "EU-London",
                        IS: "EU-London",
                        IN: "JP-Tokyo",
                        ID: "JP-Tokyo",
                        IR: "JP-Tokyo",
                        IQ: "JP-Tokyo",
                        IE: "EU-London",
                        IM: "EU-London",
                        IL: "JP-Tokyo",
                        IT: "EU-London",
                        JM: "US-Atlanta",
                        JP: "JP-Tokyo",
                        JE: "EU-London",
                        JO: "JP-Tokyo",
                        KZ: "JP-Tokyo",
                        KE: "EU-London",
                        KI: "SG-Singapore",
                        KP: "JP-Tokyo",
                        KR: "JP-Tokyo",
                        KW: "JP-Tokyo",
                        KG: "JP-Tokyo",
                        LA: "JP-Tokyo",
                        LV: "EU-London",
                        LB: "JP-Tokyo",
                        LS: "EU-London",
                        LR: "EU-London",
                        LY: "EU-London",
                        LI: "EU-London",
                        LT: "EU-London",
                        LU: "EU-London",
                        MO: "JP-Tokyo",
                        MK: "EU-London",
                        MG: "EU-London",
                        MW: "EU-London",
                        MY: "JP-Tokyo",
                        MV: "JP-Tokyo",
                        ML: "EU-London",
                        MT: "EU-London",
                        MH: "SG-Singapore",
                        MQ: "US-Atlanta",
                        MR: "EU-London",
                        MU: "EU-London",
                        YT: "EU-London",
                        MX: "US-Atlanta",
                        FM: "SG-Singapore",
                        MD: "EU-London",
                        MC: "EU-London",
                        MN: "JP-Tokyo",
                        ME: "EU-London",
                        MS: "US-Atlanta",
                        MA: "EU-London",
                        MZ: "EU-London",
                        MM: "JP-Tokyo",
                        NA: "EU-London",
                        NR: "SG-Singapore",
                        NP: "JP-Tokyo",
                        NL: "EU-London",
                        NC: "SG-Singapore",
                        NZ: "SG-Singapore",
                        NI: "US-Atlanta",
                        NE: "EU-London",
                        NG: "EU-London",
                        NU: "SG-Singapore",
                        NF: "SG-Singapore",
                        MP: "SG-Singapore",
                        NO: "EU-London",
                        OM: "JP-Tokyo",
                        PK: "JP-Tokyo",
                        PW: "SG-Singapore",
                        PS: "JP-Tokyo",
                        PA: "US-Atlanta",
                        PG: "SG-Singapore",
                        PY: "BR-Brazil",
                        PE: "BR-Brazil",
                        PH: "JP-Tokyo",
                        PN: "SG-Singapore",
                        PL: "EU-London",
                        PT: "EU-London",
                        PR: "US-Atlanta",
                        QA: "JP-Tokyo",
                        RE: "EU-London",
                        RO: "EU-London",
                        RU: "RU-Russia",
                        RW: "EU-London",
                        BL: "US-Atlanta",
                        SH: "EU-London",
                        KN: "US-Atlanta",
                        LC: "US-Atlanta",
                        MF: "US-Atlanta",
                        PM: "US-Atlanta",
                        VC: "US-Atlanta",
                        WS: "SG-Singapore",
                        SM: "EU-London",
                        ST: "EU-London",
                        SA: "EU-London",
                        SN: "EU-London",
                        RS: "EU-London",
                        SC: "EU-London",
                        SL: "EU-London",
                        SG: "JP-Tokyo",
                        SX: "US-Atlanta",
                        SK: "EU-London",
                        SI: "EU-London",
                        SB: "SG-Singapore",
                        SO: "EU-London",
                        ZA: "EU-London",
                        SS: "EU-London",
                        ES: "EU-London",
                        LK: "JP-Tokyo",
                        SD: "EU-London",
                        SR: "BR-Brazil",
                        SJ: "EU-London",
                        SZ: "EU-London",
                        SE: "EU-London",
                        CH: "EU-London",
                        SY: "EU-London",
                        TW: "JP-Tokyo",
                        TJ: "JP-Tokyo",
                        TZ: "EU-London",
                        TH: "JP-Tokyo",
                        TL: "JP-Tokyo",
                        TG: "EU-London",
                        TK: "SG-Singapore",
                        TO: "SG-Singapore",
                        TT: "US-Atlanta",
                        TN: "EU-London",
                        TR: "TK-Turkey",
                        TM: "JP-Tokyo",
                        TC: "US-Atlanta",
                        TV: "SG-Singapore",
                        UG: "EU-London",
                        UA: "EU-London",
                        AE: "EU-London",
                        GB: "EU-London",
                        US: "US-Atlanta",
                        UM: "SG-Singapore",
                        VI: "US-Atlanta",
                        UY: "BR-Brazil",
                        UZ: "JP-Tokyo",
                        VU: "SG-Singapore",
                        VE: "BR-Brazil",
                        VN: "JP-Tokyo",
                        WF: "SG-Singapore",
                        EH: "EU-London",
                        YE: "JP-Tokyo",
                        ZM: "EU-London",
                        ZW: "EU-London"
                    };
                    /** @type {number} */
                    d = 0;
                    /** @type {number} */
                    a1 = 0;
                    /** @type {null} */
                    success = null;
                    /** @type {boolean} */
                    isConnected = false;
                    /** @type {function (string, string): undefined} */
                    self1.connect = open1;
                    /** @type {number} */
                    backoff = 500;
                    /** @type {number} */
                    qw = 0.875;
                    /** @type {number} */
                    tx = 0.75;
                    /** @type {number} */
                    ty = 0.25;
                    /** @type {number} */
                    qz = 0.125;
                    self1.sendMitosis = splitCommand;
                    /** @type {function (): undefined} */
                    self1.sendEject = ejectCommand;
                    options.networking = function (opt_attributes) {
                        opt_attributes.loginRealm = {
                            GG: "google",
                            FB: "facebook"
                        };
                        /**
                         * @param {string} data
                         * @return {undefined}
                         */
                        opt_attributes.sendMessage = function (data) {
                            if (socketIsOpen()) {
                                var codeSegments = data.byteView;
                                if (null != codeSegments) {
                                    data = createBuffer(1 + data.length);
                                    data.setUint8(0, 102);
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < codeSegments.length; ++i) {
                                        data.setUint8(1 + i, codeSegments[i]);
                                    }
                                    send(data);
                                }
                            }
                        };
                        return opt_attributes;
                    } ({});
                    /** @type {null} */
                    img = null;
                    /** @type {null} */
                    _arg = null;

                    /** @type {number} */
                    var pdataCur = 0;
                    /** @type {number} */
                    Pa = 0;
                    /** @type {number} */
                    Oa = 0;
                    var which = function () {
                        /** @type {number} */
                        var d = Date.now();
                        /** @type {number} */
                        var b = 1E3 / 60;
                        return function () {
                            self1.requestAnimationFrame1(which);
                            /** @type {number} */
                            var x = Date.now();
                            /** @type {number} */
                            var a = x - d;
                            if (a > b) {
                                /** @type {number} */
                                d = x - a % b;
                                /** @type {number} */
                                var length = Date.now();
                                if (!socketIsOpen() || (240 > length - j || !options.core.config.skipDraw)) {
                                    render();
                                } else {
                                    console.warn("Skipping draw");
                                }
                                throttledUpdate();
                                /** @type {number} */
                                pdataCur = 1E3 / a;
                                options.debug.updateChart("fps", x, pdataCur);
                                if (pdataCur < opts.selected.warnFps) {
                                    if (0 == Oa) {
                                        Pa++;
                                        if (Pa > 2 * opts.selected.warnFps) {
                                            /** @type {boolean} */
                                            opts.selected.ma = true;
                                        }
                                    }
                                } else {
                                    /** @type {number} */
                                    Pa = 0;
                                }
                            }
                        };
                    } ();
                    /** @type {function (Object): undefined} */
                    self1.setQuality = set;
                    var images = {};
                    /** @type {Array.<string>} */
                    excludes = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump;underwood".split(";");
                    /** @type {Array.<string>} */
                    var names = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump;underwood".split(";");
                    results = {};
                    Player.prototype = {
                        $: null,
                        x: 0,
                        y: 0,
                        f: 0,
                        b: 0
                    };
                    /** @type {number} */
                    HALF_PI = -1;
                    /** @type {boolean} */
                    cc = false;
                    Node.prototype = {
                        id: 0,
                        a: null,
                        name: null,
                        i: null,
                        R: null,
                        x: 0,
                        y: 0,
                        size: 0,
                        s: 0,
                        u: 0,
                        o: 0,
                        ja: 0,
                        ka: 0,
                        g: 0,
                        L: 0,
                        M: 0,
                        J: 0,
                        K: 0,
                        ea: 0,
                        T: 0,
                        ta: 0,
                        G: false,
                        c: false,
                        h: false,
                        V: true,
                        da: 0,
                        C: null,
                        ia: 0,
                        wa: false,
                        I: false,
                        /**
                         * @return {undefined}
                         */
                        ca: function () {
                            var i: number;
                            /** @type {number} */
                            i = 0;
                            for (; i < parts.length; i++) {
                                if (parts[i] == this) {
                                    parts.splice(i, 1);
                                    break;
                                }
                            }
                            delete args[this.id];
                            i = balls.indexOf(this);
                            if (-1 != i) {
                                /** @type {boolean} */
                                ub = true;
                                balls.splice(i, 1);
                            }
                            i = that.indexOf(this.id);
                            if (-1 != i) {
                                that.splice(i, 1);
                            }
                            /** @type {boolean} */
                            this.G = true;
                            if (0 < this.da) {
                                chars.push(this);
                            }
                        },
                        /**
                         * @return {?}
                         */
                        m: function () {
                            return Math.max(~~(0.3 * this.size), 24);
                        },
                        /**
                         * @param {?} n
                         * @return {undefined}
                         */
                        A: function (n) {
                            if (this.name = n) {
                                if (null == this.i) {
                                    this.i = new setFillAndStroke(this.m(), "#FFFFFF", true, "#000000");
                                } else {
                                    this.i.O(this.m());
                                }
                                this.i.B(this.name);
                            }
                        },
                        /**
                         * @return {undefined}
                         */
                        ba: function () {
                            var a = this.H();
                            for (; this.a.length > a;) {
                                /** @type {number} */
                                var data = ~~(Math.random() * this.a.length);
                                this.a.splice(data, 1);
                            }
                            if (0 == this.a.length) {
                                if (0 < a) {
                                    this.a.push(new Player(this, this.x, this.y, this.size, Math.random() - 0.5));
                                }
                            }
                            for (; this.a.length < a;) {
                                /** @type {number} */
                                var a5 = ~~(Math.random() * this.a.length);
                                var a12 = this.a[a5];
                                this.a.push(new Player(this, a12.x, a12.y, a12.f, a12.b));
                            }
                        },
                        /**
                         * @return {?}
                         */
                        H: function () {
                            /** @type {number} */
                            var rh = 10;
                            if (20 > this.size) {
                                /** @type {number} */
                                rh = 0;
                            }
                            if (this.c) {
                                rh = options.renderSettings.selected.U;
                            }
                            var minimumCellWidth = this.size;
                            if (!this.c) {
                                minimumCellWidth *= mousAdjustedWorldZoom;
                            }
                            minimumCellWidth *= opts.detail;
                            return ~~Math.max(minimumCellWidth, rh);
                        },
                        /**
                         * @return {undefined}
                         */
                        Da: function () {
                            this.ba();
                            var items = this.a;
                            var n = items.length;
                            var ELEMENT_NODE = this;
                            /** @type {number} */
                            var sa = this.c ? 0 : (this.id / 1E3 + t / 1E4) % (2 * Math.PI);
                            /** @type {number} */
                            var closingAnimationTime = 0;
                            /** @type {number} */
                            var i = 0;
                            for (; i < n; ++i) {
                                var width = items[(i - 1 + n) % n].b;
                                var delta = items[(i + 1) % n].b;
                                var pos = items[i];
                                pos.b += (Math.random() - 0.5) * (this.h ? 3 : 1);
                                pos.b *= 0.7;
                                if (10 < pos.b) {
                                    /** @type {number} */
                                    pos.b = 10;
                                }
                                if (-10 > pos.b) {
                                    /** @type {number} */
                                    pos.b = -10;
                                }
                                /** @type {number} */
                                pos.b = (width + delta + 8 * pos.b) / 10;
                                var y = pos.f;
                                width = items[(i - 1 + n) % n].f;
                                delta = items[(i + 1) % n].f;
                                if (15 < this.size && (null != context && (20 < this.size * mousAdjustedWorldZoom && 0 < this.id))) {
                                    /** @type {boolean} */
                                    var k = false;
                                    var x = pos.x;
                                    var offset = pos.y;
                                    context.Ga(x - 5, offset - 5, 10, 10, function (node) {
                                        if (node.$ != ELEMENT_NODE) {
                                            if (25 > (x - node.x) * (x - node.x) + (offset - node.y) * (offset - node.y)) {
                                                /** @type {boolean} */
                                                k = true;
                                            }
                                        }
                                    });
                                    if (!k) {
                                        if (pos.x < minX || (pos.y < minY || (pos.x > maxX || pos.y > maxY))) {
                                            /** @type {boolean} */
                                            k = true;
                                        }
                                    }
                                    if (k) {
                                        if (0 < pos.b) {
                                            /** @type {number} */
                                            pos.b = 0;
                                        }
                                        --pos.b;
                                    }
                                }
                                y += pos.b;
                                if (0 > y) {
                                    /** @type {number} */
                                    y = 0;
                                }
                                /** @type {number} */
                                y = this.h ? (19 * y + this.size) / 20 : (12 * y + this.size) / 13;
                                /** @type {number} */
                                pos.f = (width + delta + 8 * y) / 10;
                                /** @type {number} */
                                width = 2 * Math.PI / n;
                                /** @type {number} */
                                delta = pos.f;
                                if (this.c) {
                                    if (0 == i % 2) {
                                        delta += 5;
                                    }
                                }
                                pos.x = this.x + Math.cos(width * i + sa) * delta;
                                pos.y = this.y + Math.sin(width * i + sa) * delta;
                                /** @type {number} */
                                closingAnimationTime = Math.max(closingAnimationTime, delta);
                            }
                            /** @type {number} */
                            this.ia = closingAnimationTime;
                        },
                        /**
                         * @param {?} pos
                         * @param {?} v22
                         * @return {undefined}
                         */
                        pa: function (pos, v22) {
                            this.L = pos;
                            this.M = v22;
                            this.J = pos;
                            this.K = v22;
                            this.ja = pos;
                            this.ka = v22;
                        },
                        /**
                         * @return {?}
                         */
                        S: function () {
                            if (0 >= this.id) {
                                return 1;
                            }
                            var s = val.ra((t - this.T) / 120, 0, 1);
                            if (this.G && 1 <= s) {
                                var idx = chars.indexOf(this);
                                if (-1 != idx) {
                                    chars.splice(idx, 1);
                                }
                            }
                            this.x = s * (this.ja - this.s) + this.s;
                            this.y = s * (this.ka - this.u) + this.u;
                            this.size = s * (this.g - this.o) + this.o;
                            if (0.01 > Math.abs(this.size - this.g)) {
                                this.size = this.g;
                            }
                            return s;
                        },
                        /**
                         * @return {?}
                         */
                        P: function () {
                            return 0 >= this.id ? true : this.x + this.size + 40 < ballsCenterX - width / 2 / mousAdjustedWorldZoom || (this.y + this.size + 40 < ballsCenterY - height / 2 / mousAdjustedWorldZoom || (this.x - this.size - 40 > ballsCenterX + width / 2 / mousAdjustedWorldZoom || this.y - this.size - 40 > ballsCenterY + height / 2 / mousAdjustedWorldZoom)) ? false : true;
                        },
                        /**
                         * @param {CanvasRenderingContext2D} ctx
                         * @return {undefined}
                         */
                        sa: function (ctx) {
                            ctx.beginPath();
                            var len = this.H();
                            ctx.moveTo(this.a[0].x, this.a[0].y);
                            /** @type {number} */
                            var i = 1;
                            for (; i <= len; ++i) {
                                /** @type {number} */
                                var index = i % len;
                                ctx.lineTo(this.a[index].x, this.a[index].y);
                            }
                            ctx.closePath();
                            ctx.stroke();
                        },
                        /**
                         * @param {CanvasRenderingContext2D} ctx
                         * @return {undefined}
                         */
                        w: function (ctx) {
                            if (this.P()) {
                                ++this.da;
                                var y_position = 0 < this.id && (!this.c && (!this.h && 0.4 > mousAdjustedWorldZoom)) || opts.selected.simpleDraw && !this.c;
                                if (5 > this.H()) {
                                    if (0 < this.id) {
                                        /** @type {boolean} */
                                        y_position = true;
                                    }
                                }
                                if (this.V && !y_position) {
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < this.a.length; i++) {
                                        this.a[i].f = this.size;
                                    }
                                }
                                this.V = y_position;
                                ctx.save();
                                this.ta = t;
                                i = this.S();
                                if (this.G) {
                                    ctx.globalAlpha *= 1 - i;
                                }
                                /** @type {number} */
                                ctx.lineWidth = 10;
                                /** @type {string} */
                                ctx.lineCap = "round";
                                /** @type {string} */
                                ctx.lineJoin = this.c ? "miter" : "round";
                                var key = this.name.toLowerCase();
                                /** @type {null} */
                                var map = null;
                                /** @type {null} */
                                var glockBottomWidth = null;
                                /** @type {boolean} */
                                var a6 = false;
                                var fs = this.color;
                                /** @type {boolean} */
                                var l = false;
                                if (!this.h) {
                                    if (!!root) {
                                        if (!started) {
                                            if (-1 != excludes.indexOf(key)) {
                                                if (!images.hasOwnProperty(key)) {
                                                    /** @type {Image} */
                                                    images[key] = new Image;
                                                    /** @type {string} */
                                                    images[key].src = self1.ASSETS_ROOT + "skins/" + key + ".png";
                                                }
                                                map = 0 != images[key].width && images[key].complete ? images[key] : null;
                                            } else {
                                                /** @type {null} */
                                                map = null;
                                            }
                                            if (null != map) {
                                                if (-1 != names.indexOf(key)) {
                                                    /** @type {boolean} */
                                                    a6 = true;
                                                }
                                            } else {
                                                if (this.I) {
                                                    if ("%starball" == this.C) {
                                                        if ("shenron" == key) {
                                                            if (7 <= balls.length) {
                                                                /** @type {boolean} */
                                                                cc = a6 = true;
                                                                glockBottomWidth = loop("%starball1");
                                                            }
                                                        }
                                                    }
                                                }
                                                map = loop(this.C);
                                                if (null != map) {
                                                    /** @type {boolean} */
                                                    l = true;
                                                    fs = tryIt(this.C) || fs;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (options.core.debug) {
                                    if (options.debug.showPrediction) {
                                        if (this.I) {
                                            /** @type {string} */
                                            ctx.strokeStyle = "#0000FF";
                                            ctx.beginPath();
                                            ctx.arc(this.L, this.M, this.size + 5, 0, 2 * Math.PI, false);
                                            ctx.closePath();
                                            ctx.stroke();
                                            /** @type {string} */
                                            ctx.strokeStyle = "#00FF00";
                                            ctx.beginPath();
                                            ctx.arc(this.J, this.K, this.size + 5, 0, 2 * Math.PI, false);
                                            ctx.closePath();
                                            ctx.stroke();
                                        }
                                    }
                                }
                                if (type && !started) {
                                    /** @type {string} */
                                    ctx.fillStyle = "#FFFFFF";
                                    /** @type {string} */
                                    ctx.strokeStyle = "#AAAAAA";
                                } else {
                                    ctx.fillStyle = fs;
                                    ctx.strokeStyle = fs;
                                }
                                if (y_position) {
                                    ctx.beginPath();
                                    ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                    ctx.closePath();
                                } else {
                                    this.Da();
                                    this.sa(ctx);
                                }
                                if (!l) {
                                    ctx.fill();
                                }
                                if (null != map) {
                                    this.na(ctx, map);
                                    if (null != glockBottomWidth) {
                                        this.na(ctx, glockBottomWidth, {
                                            alpha: Math.sin(0.0174 * HALF_PI)
                                        });
                                    }
                                }
                                if (type || 20 < this.size) {
                                    if (!y_position) {
                                        /** @type {string} */
                                        ctx.strokeStyle = "#000000";
                                        ctx.globalAlpha *= 0.1;
                                        ctx.stroke();
                                    }
                                }
                                /** @type {number} */
                                ctx.globalAlpha = 1;
                                /** @type {boolean} */
                                key = -1 != balls.indexOf(this);
                                /** @type {number} */
                                var a8 = ~~this.y;
                                if (0 != this.id) {
                                    if (text || key) {
                                        if (this.name) {
                                            if (this.a6) {
                                                if (!a6) {
                                                    map = this.a6;
                                                    map.B(this.name);
                                                    map.O(this.m());
                                                    /** @type {number} */
                                                    var a7 = 0 >= this.id ? 1 : Math.ceil(10 * mousAdjustedWorldZoom) / 10;
                                                    map.oa(a7);
                                                    map = map.N();
                                                    /** @type {number} */
                                                    glockBottomWidth = Math.ceil(map.width / a7);
                                                    /** @type {number} */
                                                    fs = Math.ceil(map.height / a7);
                                                    ctx.drawImage(map, ~~this.x - ~~(glockBottomWidth / 2), a8 - ~~(fs / 2), glockBottomWidth, fs);
                                                    a8 += map.height / 2 / a7 + 4;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (0 < this.id) {
                                    if (metadata) {
                                        if (key || 0 == balls.length && ((!this.c || this.h) && 20 < this.size)) {
                                            if (null == this.R) {
                                                this.R = new setFillAndStroke(this.m() / 2, "#FFFFFF", true, "#000000");
                                            }
                                            key = this.R;
                                            key.O(this.m() / 2);
                                            key.B(~~(this.size * this.size / 100));
                                            /** @type {number} */
                                            var a9 = Math.ceil(10 * mousAdjustedWorldZoom) / 10;
                                            key.oa(a9);
                                            map = key.N();
                                            /** @type {number} */
                                            glockBottomWidth = Math.ceil(map.width / a9);
                                            /** @type {number} */
                                            fs = Math.ceil(map.height / a9);
                                            ctx.drawImage(map, ~~this.x - ~~(glockBottomWidth / 2), a8 - ~~(fs / 2), glockBottomWidth, fs);
                                        }
                                    }
                                }
                                ctx.restore();
                            }
                        },
                        /**
                         * @param {CanvasRenderingContext2D} ctx
                         * @param {Array} map
                         * @param {Object} o
                         * @return {undefined}
                         */
                        na: function (ctx, map, o) {
                            ctx.save();
                            ctx.clip();
                            /** @type {number} */
                            var value = Math.max(this.size, this.ia);
                            if (null != o) {
                                if (null != o.alpha) {
                                    ctx.globalAlpha = o.alpha;
                                }
                            }
                            ctx.drawImage(map, this.x - value - 5, this.y - value - 5, 2 * value + 10, 2 * value + 10);
                            ctx.restore();
                        }
                    };
                    var val = function (item) {
                        /**
                         * @param {number} value
                         * @param {number} min
                         * @param {number} max
                         * @return {?}
                         */
                        function clamp(value, min, max) {
                            return value < min ? min : value > max ? max : value;
                        }

                        /**
                         * @param {number} a
                         * @param {number} b
                         * @return {?}
                         */
                        item.ha = function (a, b) {
                            var x;
                            x = clamp(0.5, 0, 1);
                            return a + x * (b - a);
                        };
                        /** @type {function (number, number, number): ?} */
                        item.ra = clamp;
                        /**
                         * @param {number} d
                         * @param {?} n
                         * @return {?}
                         */
                        item.fixed = function (d, n) {
                            /** @type {number} */
                            var base = Math.pow(10, n);
                            return ~~(d * base) / base;
                        };
                        return item;
                    } ({});
                    self1.Maths = val;
                    exports = function (opt_attributes) {
                        /**
                         * @return {?}
                         */
                        opt_attributes.la = function () {
                            /** @type {Date} */
                            var c = new Date;
                            /** @type {Array} */
                            var UNICODE_SPACES = [c.getMonth() + 1, c.getDate(), c.getFullYear()];
                            /** @type {Array} */
                            var c2 = [c.getHours().toString(), c.getMinutes(), c.getSeconds()];
                            /** @type {number} */
                            var eventName = 1;
                            for (; 3 > eventName; eventName++) {
                                if (10 > c2[eventName]) {
                                    c2[eventName] = `0${c2[eventName]}`;
                                }
                            }
                            return `[${UNICODE_SPACES.join("/")} ${c2.join(":")}]`;
                        };
                        return opt_attributes;
                    } ({});
                    self1.Utils = exports;
                    setFillAndStroke.prototype = {
                        F: "",
                        W: "#000000",
                        Y: false,
                        Z: "#000000",
                        v: 16,
                        j: null,
                        X: null,
                        l: false,
                        D: 1,
                        /**
                         * @param {number} v
                         * @return {undefined}
                         */
                        O: function (v) {
                            if (this.v != v) {
                                /** @type {number} */
                                this.v = v;
                                /** @type {boolean} */
                                this.l = true;
                            }
                        },
                        /**
                         * @param {?} d
                         * @return {undefined}
                         */
                        oa: function (d) {
                            if (this.D != d) {
                                this.D = d;
                                /** @type {boolean} */
                                this.l = true;
                            }
                        },
                        /**
                         * @param {number} err
                         * @return {undefined}
                         */
                        B: function (err) {
                            if (err != this.F) {
                                /** @type {number} */
                                this.F = err;
                                /** @type {boolean} */
                                this.l = true;
                            }
                        },
                        /**
                         * @return {?}
                         */
                        N: function () {
                            if (null == this.j) {
                                /** @type {Element} */
                                this.j = document.createElement("canvas");
                                this.X = this.j.getContext("2d");
                            }
                            if (this.l) {
                                /** @type {boolean} */
                                this.l = false;
                                var j = this.j;
                                var canvas = this.X;
                                var caracter = this.F;
                                var quality = this.D;
                                var y = this.v;
                                /** @type {string} */
                                var s = y + "px Ubuntu";
                                /** @type {string} */
                                canvas.font = s;
                                /** @type {number} */
                                var height = ~~(0.2 * y);
                                /** @type {number} */
                                j.width = (canvas.measureText(caracter).width + 6) * quality;
                                /** @type {number} */
                                j.height = (y + height) * quality;
                                /** @type {string} */
                                canvas.font = s;
                                canvas.scale(quality, quality);
                                /** @type {number} */
                                canvas.globalAlpha = 1;
                                /** @type {number} */
                                canvas.lineWidth = 3;
                                canvas.strokeStyle = this.Z;
                                canvas.fillStyle = this.W;
                                if (this.Y) {
                                    canvas.strokeText(caracter, 3, y - height / 2);
                                }
                                canvas.fillText(caracter, 3, y - height / 2);
                            }
                            return this.j;
                        }
                    };
                    if (!Date.now) {
                        /**
                         * @return {number}
                         */
                        Date.now = function () {
                            return (new Date).getTime();
                        };
                    }
                    (function () {
                        /** @type {Array} */
                        var vendors = ["ms", "moz", "webkit", "o"];
                        /** @type {number} */
                        var x = 0;
                        for (; x < vendors.length && !self1.requestAnimationFrame1; ++x) {
                            self1.requestAnimationFrame1 = self1[vendors[x] + "RequestAnimationFrame"];
                            self1.cancelAnimationFrame = self1[vendors[x] + "CancelAnimationFrame"] || self1[vendors[x] + "CancelRequestAnimationFrame"];
                        }
                        if (!self1.requestAnimationFrame1) {
                            /**
                             * @param {function (number): ?} callback
                             * @return {number}
                             */
                            self1.requestAnimationFrame1 = function (callback) {
                                return setTimeout(callback, 1E3 / 60);
                            };
                            /**
                             * @param {number} id
                             * @return {?}
                             */
                            self1.cancelAnimationFrame = function (id) {
                                clearTimeout(id);
                            };
                        }
                    })();
                    proto = {
                        /**
                         * @param {?} params
                         * @return {?}
                         */
                        init: function (params) {
                            /**
                             * @param {?} data
                             * @return {?}
                             */
                            function fire(data) {
                                if (data < tmp) {
                                    data = tmp;
                                }
                                if (data > type) {
                                    data = type;
                                }
                                return ~~((data - tmp) / 32);
                            }

                            /**
                             * @param {?} d
                             * @return {?}
                             */
                            function b(d) {
                                if (d < c) {
                                    d = c;
                                }
                                if (d > a) {
                                    d = a;
                                }
                                return ~~((d - c) / 32);
                            }

                            var tmp = params.Ba;
                            var c = params.Ca;
                            var type = params.za;
                            var a = params.Aa;
                            /** @type {number} */
                            var cols = ~~((type - tmp) / 32) + 1;
                            /** @type {number} */
                            var klength = ~~((a - c) / 32) + 1;
                            /** @type {Array} */
                            var result = Array(cols * klength);
                            return {
                                /**
                                 * @param {?} val
                                 * @return {undefined}
                                 */
                                va: function (val) {
                                    var key = fire(val.x) + b(val.y) * cols;
                                    if (null == result[key]) {
                                        result[key] = val;
                                    } else {
                                        if (Array.isArray(result[key])) {
                                            result[key].push(val);
                                        } else {
                                            /** @type {Array} */
                                            result[key] = [result[key], val];
                                        }
                                    }
                                },
                                /**
                                 * @param {number} memory
                                 * @param {number} a
                                 * @param {number} array
                                 * @param {number} offset
                                 * @param {Function} func
                                 * @return {undefined}
                                 */
                                Ga: function (memory, a, array, offset, func) {
                                    var currentOffset = fire(memory);
                                    var r = b(a);
                                    memory = fire(memory + array);
                                    a = b(a + offset);
                                    if (0 > currentOffset || (currentOffset >= cols || (0 > r || r >= klength))) {
                                        debugger;
                                    }
                                    for (; r <= a; ++r) {
                                        offset = currentOffset;
                                        for (; offset <= memory; ++offset) {
                                            if (array = result[offset + r * cols], null != array) {
                                                if (Array.isArray(array)) {
                                                    /** @type {number} */
                                                    var i = 0;
                                                    for (; i < array.length; i++) {
                                                        func(array[i]);
                                                    }
                                                } else {
                                                    func(array);
                                                }
                                            }
                                        }
                                    }
                                }
                            };
                        }
                    };
                    valueAccessor = function () {
                        var that = new Node1(0, 0, 0, 32, "#ED1C24", "");
                        /** @type {Element} */
                        var canvas = document.createElement("canvas");
                        /** @type {number} */
                        canvas.width = 32;
                        /** @type {number} */
                        canvas.height = 32;
                        var renderer = canvas.getContext("2d");
                        return function () {
                            if (0 < balls.length) {
                                that.color = balls[0].color;
                                that.A(balls[0].name);
                            }
                            renderer.clearRect(0, 0, 32, 32);
                            renderer.save();
                            renderer.translate(16, 16);
                            renderer.scale(0.4, 0.4);
                            that.w(renderer);
                            renderer.restore();
                            /** @type {(HTMLElement|null)} */
                            var originalFavicon = document.getElementById("favicon");
                            /** @type {Element} */
                            var newNode = <Element>originalFavicon.cloneNode(true);
                            newNode.setAttribute("href", canvas.toDataURL("image/png"));
                            originalFavicon.parentNode.replaceChild(newNode, originalFavicon);
                        };
                    } ();
                    $(function () {
                        valueAccessor();
                    });
                    tmp = {
                        context: null,
                        defaultProvider: "facebook",
                        loginIntent: "0",
                        userInfo: {
                            socialToken: null,
                            tokenExpires: "",
                            level: "",
                            xp: "",
                            xpNeeded: "",
                            name: "",
                            picture: "",
                            displayName: "",
                            loggedIn: "0",
                            socialId: ""
                        }
                    };
                    data = self1.defaultSt = tmp;
                    self1.storageInfo = data;
                    /** @type {function (): undefined} */
                    self1.createDefaultStorage = compassResult;
                    /** @type {function (): undefined} */
                    self1.updateStorage = callback;
                    $(function () {
                        if (null != self1.localStorage.storeObjectInfo) {
                            /** @type {*} */
                            data = JSON.parse(self1.localStorage.storeObjectInfo);
                        }
                        if ("1" == data.loginIntent) {
                            template(data.context);
                        }
                        if (!("" == data.userInfo.name && "" == data.userInfo.displayName)) {
                            apply(data.userInfo);
                        }
                    });
                    /**
                     * @return {undefined}
                     */
                    self1.checkLoginStatus = function () {
                        if ("1" == data.loginIntent) {
                            h();
                            template(data.context);
                        }
                    };
                    /**
                     * @return {undefined}
                     */
                    h = function () {
                        self1.MC.setProfilePicture(data.userInfo.picture);
                        self1.MC.setSocialId(data.userInfo.socialId);
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.logout = function () {
                        data = tmp;
                        delete self1.localStorage.storeObjectInfo;
                        /** @type {string} */
                        self1.localStorage.storeObjectInfo = JSON.stringify(tmp);
                        callback();
                        disconnect();
                        /** @type {boolean} */
                        options.cache.sentGameServerLogin = false;
                        delete options.cache.login_info;
                        $("#helloContainer").attr("data-logged-in", "0");
                        $("#helloContainer").attr("data-has-account-data", "0");
                        $(".timer").text("");
                        $("#gPlusShare").hide();
                        $("#fbShare").show();
                        $("#user-id-tag").text("");
                        next();
                        self1.MC.doLogout();
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.toggleSocialLogin = function () {
                        $("#socialLoginContainer").toggle();
                        $("#settings").hide();
                        $("#instructions").hide();
                        f();
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.toggleSettings = function () {
                        $("#settings").toggle();
                        $("#socialLoginContainer").hide();
                        $("#instructions").hide();
                        f();
                    };
                    options.account = function (doc) {
                        /**
                         * @return {undefined}
                         */
                        function restoreScript() {
                        }

                        /**
                         * @param {?} cause
                         * @param {(Object|string)} player
                         * @return {undefined}
                         */
                        function onError(cause, player) {
                            if (null == p || p.id != player.id) {
                                /** @type {(Object|string)} */
                                p = player;
                                if (null != self1.ssa_json) {
                                    /** @type {string} */
                                    self1.ssa_json.applicationUserId = `${player.id}`;
                                    /** @type {string} */
                                    self1.ssa_json.custom_user_id = `${player.id}`;
                                }
                                if ("undefined" != typeof SSA_CORE) {
                                    SSA_CORE.start();
                                }
                            }
                        }

                        /** @type {null} */
                        var p = null;
                        /**
                         * @return {undefined}
                         */
                        doc.init = function () {
                            options.core.bind("user_login", onError);
                            options.core.bind("user_logout", restoreScript);
                        };
                        /**
                         * @param {Object} value
                         * @return {undefined}
                         */
                        doc.setUserData = function (value) {
                            apply(value);
                        };
                        /**
                         * @param {Object} options
                         * @param {?} b
                         * @return {undefined}
                         */
                        doc.setAccountData = function (options, b) {
                            var a = $("#helloContainer").attr("data-has-account-data", "1");
                            data.userInfo.xp = options.xp;
                            data.userInfo.xpNeeded = options.xpNeeded;
                            data.userInfo.level = options.level;
                            callback();
                            if (a && b) {
                                start(options, "");
                            } else {
                                $(".agario-profile-panel .progress-bar-star").text(options.level);
                                $(".agario-exp-bar .progress-bar-text").text(options.xp + "/" + options.xpNeeded + " XP");
                                $(".agario-exp-bar .progress-bar").css("width", (88 * options.xp / options.xpNeeded).toFixed(2) + "%");
                            }
                        };
                        /**
                         * @param {string} count
                         * @return {undefined}
                         */
                        doc.Ia = function (count) {
                            start(count, "");
                        };
                        return doc;
                    } ({});
                    /** @type {number} */
                    lc = 0;
                    /**
                     * @return {undefined}
                     */
                    self1.fbAsyncInit = function () {
                        /**
                         * @return {undefined}
                         */
                        function submitForm() {
                            if (null == self1.FB) {
                                alert("You seem to have something blocking Facebook on your browser, please check for any extensions");
                            } else {
                                /** @type {string} */
                                data.loginIntent = "1";
                                self1.updateStorage();
                                self1.FB.login(function (e) {
                                    error(e);
                                }, {
                                        scope: "public_profile, email"
                                    });
                            }
                        }

                        self1.FB.init({
                            appId: EnvConfig.fb_app_id,
                            cookie: true,
                            xfbml: true,
                            status: true,
                            version: "v2.2"
                        });
                        if ("1" == self1.storageInfo.loginIntent && "facebook" == self1.storageInfo.context || fb) {
                            self1.FB.getLoginStatus(function (response) {
                                if ("connected" === response.status) {
                                    error(response);
                                } else {
                                    if ("not_authorized" === response.status) {
                                        self1.logout();
                                        submitForm();
                                    } else {
                                        self1.logout();
                                    }
                                }
                            });
                        }
                        /** @type {function (): undefined} */
                        self1.facebookRelogin = submitForm;
                        /** @type {function (): undefined} */
                        self1.facebookLogin = submitForm;
                    };
                    /** @type {boolean} */
                    var Kb = false;
                    (function (optionsString) {
                        /**
                         * @return {undefined}
                         */
                        function injectScript() {
                            /** @type {Element} */
                            var ga = document.createElement("script");
                            /** @type {string} */
                            ga.type = "text/javascript";
                            /** @type {boolean} */
                            ga.async = true;
                            /** @type {string} */
                            ga.src = "//apis.google.com/js/client:platform.js?onload=gapiAsyncInit";
                            var insertAt = document.getElementsByTagName("script")[0];
                            insertAt.parentNode.insertBefore(ga, insertAt);
                            /** @type {boolean} */
                            f = true;
                        }

                        var $window = {};
                        /** @type {boolean} */
                        var f = false;
                        /**
                         * @return {undefined}
                         */
                        self1.gapiAsyncInit = function () {
                            $($window).trigger("initialized");
                        };
                        optionsString.google = {
                            /**
                             * @return {undefined}
                             */
                            xa: function () {
                                injectScript();
                            },
                            /**
                             * @param {?} results
                             * @param {Function} cb
                             * @return {undefined}
                             */
                            ua: function (results, cb) {
                                self1.gapi.client.load("plus", "v1", function () {
                                    console.log("fetching me profile");
                                    gapi.client.plus.people.get({
                                        userId: "me"
                                    }).execute(function (outErr) {
                                        cb(outErr);
                                    });
                                });
                            }
                        };
                        /**
                         * @param {Function} method
                         * @return {undefined}
                         */
                        optionsString.Fa = function (method) {
                            if (!f) {
                                injectScript();
                            }
                            if ("undefined" !== typeof gapi) {
                                method();
                            } else {
                                $($window).bind("initialized", method);
                            }
                        };
                        return optionsString;
                    })(options);
                    var app = function (optionsString) {
                        /**
                         * @param {?} callback
                         * @return {undefined}
                         */
                        function ajax(callback) {
                            self1.MC.doLoginWithGPlus(callback);
                            /** @type {Array} */
                            options.cache.login_info = [callback, "google"];
                        }

                        /**
                         * @param {number} newVal
                         * @return {undefined}
                         */
                        function handler(newVal) {
                            /** @type {number} */
                            data.userInfo.picture = newVal;
                            $(".agario-profile-picture").attr("src", newVal);
                        }

                        /** @type {null} */
                        var api = null;
                        var params = {
                            client_id: EnvConfig.gplus_client_id,
                            cookie_policy: "single_host_origin",
                            scope: "profile email"
                        };
                        optionsString.fa = {
                            /**
                             * @return {?}
                             */
                            qa: function () {
                                return api;
                            },
                            /**
                             * @return {undefined}
                             */
                            init: function () {
                                var handler = this;
                                var hasDisclosureProperty = data && ("1" == data.loginIntent && "google" == data.context);
                                options.Fa(function () {
                                    self1.gapi.ytsubscribe.go("agarYoutube");
                                    self1.gapi.load("auth2", function () {
                                        api = self1.gapi.auth2.init(params);
                                        api.attachClickHandler(document.getElementById("gplusLogin"), {}, function (reply) {
                                            console.log(`googleUser : ${reply}`);
                                        }, function (err) {
                                            console.log("failed to login in google plus: ", JSON.stringify(err, void 0, 2));
                                        });
                                        api.currentUser.listen(_.bind(handler.Ea, handler));
                                        if (hasDisclosureProperty) {
                                            if (1 == api.isSignedIn.get()) {
                                                api.signIn();
                                            }
                                        }
                                    });
                                });
                            },
                            /**
                             * @param {number} newVal
                             * @return {undefined}
                             */
                            Ea: function (newVal) {
                                if (api && (newVal && (api.isSignedIn.get() && !Kb))) {
                                    /** @type {boolean} */
                                    Kb = true;
                                    /** @type {string} */
                                    data.loginIntent = "1";
                                    var extra = newVal.getAuthResponse();
                                    var restoreScript = extra.access_token;
                                    self1.qa = extra;
                                    console.log("loggedIn with G+!");
                                    var record = newVal.getBasicProfile();
                                    newVal = record.getImageUrl();
                                    if (void 0 == newVal) {
                                        options.google.ua(extra, function (r) {
                                            if (r.result.isPlusUser) {
                                                if (r) {
                                                    handler(r.image.url);
                                                }
                                                ajax(restoreScript);
                                                if (r) {
                                                    data.userInfo.picture = r.image.url;
                                                }
                                                data.userInfo.socialId = record.getId();
                                                h();
                                            } else {
                                                alert("Please add Google+ to your Google account and try again.\nOr you can login with another account.");
                                                self1.logout();
                                            }
                                        });
                                    } else {
                                        handler(newVal);
                                        /** @type {number} */
                                        data.userInfo.picture = newVal;
                                        data.userInfo.socialId = record.getId();
                                        h();
                                        ajax(restoreScript);
                                    }
                                    /** @type {string} */
                                    data.context = "google";
                                    self1.updateStorage();
                                }
                            },
                            /**
                             * @return {undefined}
                             */
                            ya: function () {
                                if (api) {
                                    api.signOut();
                                    /** @type {boolean} */
                                    Kb = false;
                                }
                            }
                        };
                        return optionsString;
                    } (options);
                    self1.gplusModule = app;
                    /**
                     * @return {undefined}
                     */
                    var disconnect = function () {
                        options.fa.ya();
                    };
                    /** @type {function (): undefined} */
                    self1.logoutGooglePlus = disconnect;
                    var throttledUpdate = function () {
                        /**
                         * @param {Object} l
                         * @param {number} map
                         * @param {string} indent
                         * @param {number} size
                         * @param {number} data
                         * @return {undefined}
                         */
                        function render(l, map, indent, size, data) {
                            var cctx = map.getContext("2d");
                            var len = map.width;
                            map = map.height;
                            /** @type {number} */
                            l.color = data;
                            l.A(indent);
                            /** @type {number} */
                            l.size = size;
                            cctx.save();
                            cctx.translate(len / 2, map / 2);
                            l.w(cctx);
                            cctx.restore();
                        }

                        var data = new Node1(-1, 0, 0, 32, "#5bc0de", "");
                        var n = new Node1(-1, 0, 0, 32, "#5bc0de", "");
                        /** @type {Array.<string>} */
                        var codeSegments = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" ");
                        /** @type {Array} */
                        var items = [];
                        /** @type {number} */
                        var i = 0;
                        for (; i < codeSegments.length; ++i) {
                            /** @type {number} */
                            var bisection = i / codeSegments.length * 12;
                            /** @type {number} */
                            var radius = 30 * Math.sqrt(i / codeSegments.length);
                            items.push(new Node1(-1, Math.cos(bisection) * radius, Math.sin(bisection) * radius, 10, codeSegments[i], ""));
                        }
                        shuffle(items);
                        /** @type {Element} */
                        var map = document.createElement("canvas");
                        map.getContext("2d");
                        /** @type {number} */
                        map.width = map.height = 70;
                        render(n, map, "", 26, "#ebc0de");
                        return function () {
                            $(".cell-spinner").filter(":visible").each(function () {
                                var body = $(this);
                                /** @type {number} */
                                var x = Date.now();
                                var width = this.width;
                                var height = this.height;
                                var context = this.getContext("2d");
                                context.clearRect(0, 0, width, height);
                                context.save();
                                context.translate(width / 2, height / 2);
                                /** @type {number} */
                                var y = 0;
                                for (; 10 > y; ++y) {
                                    context.drawImage(map, (0.1 * x + 80 * y) % (width + 140) - width / 2 - 70 - 35, height / 2 * Math.sin((0.001 * x + y) % Math.PI * 2) - 35, 70, 70);
                                }
                                context.restore();
                                if (body = body.attr("data-itr")) {
                                    body = _(body);
                                }
                                render(data, this, body || "", +$(this).attr("data-size"), "#5bc0de");
                            });
                            $("#statsPellets").filter(":visible").each(function () {
                                $(this);
                                var i = this.width;
                                var height = this.height;
                                this.getContext("2d").clearRect(0, 0, i, height);
                                /** @type {number} */
                                i = 0;
                                for (; i < items.length; i++) {
                                    render(items[i], this, "", items[i].size, items[i].color);
                                }
                            });
                        };
                    } ();
                    /**
                     * @return {undefined}
                     */
                    self1.createParty = function () {
                        show(":party");
                        /**
                         * @param {string} content
                         * @return {undefined}
                         */
                        success = function (content) {
                            cb(`/#${self1.encodeURIComponent(content)}`);
                            $(".partyToken").val(`agar.io/#${self1.encodeURIComponent(content)}`);
                            $("#helloContainer").attr("data-party-state", "1");
                        };
                        next();
                    };
                    /** @type {function (string): undefined} */
                    self1.joinParty = request;
                    /**
                     * @return {undefined}
                     */
                    self1.cancelParty = function () {
                        cb("/");
                        $("#helloContainer").attr("data-party-state", "0");
                        show("");
                        next();
                    };
                    /** @type {Array} */
                    a = [];
                    /** @type {number} */
                    pauseText = 0;
                    /** @type {string} */
                    col = "#000000";
                    /** @type {boolean} */
                    from = false;
                    /** @type {boolean} */
                    Aa = false;
                    /** @type {number} */
                    aux = 0;
                    /** @type {number} */
                    max = 0;
                    /** @type {number} */
                    name1 = 0;
                    /** @type {number} */
                    path = 0;
                    /** @type {number} */
                    count = 0;
                    /** @type {function (): undefined} */
                    self1.onPlayerDeath = handlePlayerDeath;
                    setInterval(function () {
                        if (Aa) {
                            a.push(pick() / 100);
                        }
                    }, 1E3 / 60);
                    setInterval(function () {
                        var tempCount = objEquiv();
                        if (0 != tempCount) {
                            ++name1;
                            if (0 == count) {
                                count = tempCount;
                            }
                            /** @type {number} */
                            count = Math.min(count, tempCount);
                        }
                    }, 1E3);
                    /**
                     * @return {undefined}
                     */
                    self1.closeStats = function () {
                        /** @type {boolean} */
                        from = false;
                        $("#stats").hide();
                        self1.destroyAd(self1.adSlots.ab);
                        showError(0);
                    };
                    /**
                     * @param {?} dataAndEvents
                     * @return {undefined}
                     */
                    self1.setSkipStats = function (dataAndEvents) {
                        /** @type {boolean} */
                        id = !dataAndEvents;
                    };
                    /** @type {function (string): ?} */
                    self1.getStatsString = trigger;
                    /** @type {function (): undefined} */
                    self1.gPlusShare = onMouseMove;
                    /**
                     * @return {undefined}
                     */
                    self1.twitterShareStats = function () {
                        var url = self1.getStatsString("tt_share_stats");
                        self1.open1(`https://twitter.com/intent/tweet?text=${url}`, "Agar.io", `width=660,height=310,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=${self1.screenX + self1.innerWidth / 2 - 330},top=${(self1.innerHeight - 310) / 2}`);
                    };
                    /**
                     * @return {undefined}
                     */
                    self1.fbShareStats = function () {
                        var groupDescription = self1.getStatsString("fb_matchresults_subtitle");
                        self1.FB.ui({
                            method: "feed",
                            display: "iframe",
                            name: _("fb_matchresults_title"),
                            caption: _("fb_matchresults_description"),
                            description: groupDescription,
                            link: "http://agar.io",
                            La: "http://static2.miniclipcdn.com/mobile/agar/Agar.io_matchresults_fb_1200x630.png",
                            Ha: {
                                name: "play now!",
                                link: "http://agar.io"
                            }
                        });
                    };
                    /**
                     * @param {?} onComplete
                     * @param {string} ctxt
                     * @return {undefined}
                     */
                    self1.fillSocialValues = function (onComplete, ctxt) {
                        if (1 == self1.isChrome) {
                            if ("google" == self1.storageInfo.context) {
                                self1.gapi.interactivepost.render(ctxt, {
                                    contenturl: EnvConfig.game_url,
                                    clientid: EnvConfig.gplus_client_id,
                                    cookiepolicy: "http://agar.io",
                                    prefilltext: onComplete,
                                    calltoactionlabel: "BEAT",
                                    calltoactionurl: EnvConfig.game_url
                                });
                            }
                        }
                    };
                    $(function () {
                        if ("MAsyncInit" in self1) {
                            self1.MAsyncInit();
                        }
                    });
                }
            }
        }
    }
}