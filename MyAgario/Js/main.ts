// ReSharper disable InconsistentNaming
// ReSharper disable CoercedEqualsUsing

var gapi;
var SSA_CORE;

class TimeSeries {
    Ma: boolean;

    constructor(p: { Ma: boolean }) { return; }
}

class SmoothieChart {
    constructor(res) { return; }
}

class Obj1 {
    rttSDev;
    rttMean;
}

interface IEnvConfig {
    load_local_configuration;
    configID;
    master_url;
    game_server_port;
    env_development;
    env_local;
    gplus_client_id;
    game_url;
    fb_app_id;
}

class Result {
    configID;
    master;
    ip;
}

class Options {
    core;
    cache;
    debug;
    renderSettings: RenderingSettings;
    networking;
    account;
    google;
    fa;

    Fa(p: () => void) { throw new Error("Not implemented"); }
}

class RenderingSettings {
    constructor(high: OneRenSett, medium: OneRenSett, low: OneRenSett) {
        this.high = high;
        this.medium = medium;
        this.low = low;
        this.selected = high;
    }

    high: OneRenSett;
    medium: OneRenSett;
    low: OneRenSett;

    selected: OneRenSett;
    /** @type {number} */
    detail = 1;
    /** @type {boolean} */
    auto = false;

    /**
     * @return {undefined}
     */
    upgrade() {
        if (this.selected == this.low) {
            this.selected = this.medium;
            /** @type {number} */
            this.detail = this.medium.maxDetail;
        } else {
            if (this.selected == this.medium) {
                this.selected = this.high;
                /** @type {number} */
                this.detail = this.high.maxDetail;
            }
        }
    }

    /**
     * @return {undefined}
     */
    downgrade() {
        if (this.selected == this.high) {
            this.selected = this.medium;
        } else {
            if (this.selected == this.medium) {
                this.selected = this.low;
            }
        }
    };

}

class OneRenSett {
    constructor(warnFps: number, simpleDraw: boolean,
        maxDetail: number, minDetail: number, U: number) {
        this.warnFps = warnFps;
        this.simpleDraw = simpleDraw;
        this.maxDetail = maxDetail;
        this.minDetail = minDetail;
        this.U = U;
    }

    warnFps: number;
    simpleDraw;
    maxDetail: number;
    minDetail: number;
    U: number;
    ma: boolean;
}

var EnvConfig: IEnvConfig;

/**
 * @param {string} value
 * @param {number} expectedNumberOfNonCommentArgs
 * @return {undefined}
 */
function setCookie(value, expectedNumberOfNonCommentArgs) {
    var expires1: string;
    if (expectedNumberOfNonCommentArgs) {
        /** @type {Date} */
        var expires = new Date;
        expires.setTime(expires.getTime() + 864E5 * expectedNumberOfNonCommentArgs);
        /** @type {string} */
        expires1 = `; expires=${expires.toUTCString()}`;
    } else {
        /** @type {string} */
        expires1 = "";
    }
    /** @type {string} */
    document.cookie = `agario_redirect=${value}${expires1}; path=/`;
}


/**
 * @return {?}
 */
function fnReadCookie() {
    /** @type {Array.<string>} */
    var codeSegments = document.cookie.split(";");
    /** @type {number} */
    var i = 0;
    for (; i < codeSegments.length; i++) {
        /** @type {string} */
        var thisCookie = codeSegments[i];
        for (; " " == thisCookie.charAt(0);) {
            /** @type {string} */
            thisCookie = thisCookie.substring(1, thisCookie.length);
        }
        if (0 == thisCookie.indexOf("agario_redirect=")) {
            return thisCookie.substring(16, thisCookie.length);
        }
    }
    return null;
}

var ratio: number;
var scale: number;

function handleMousewheel(e: MouseWheelEvent) {
    e.preventDefault();
    ratio *= Math.pow(0.9, e.wheelDelta / -120 || (e.detail || 0));
    if (1 > ratio) {
        ratio = 1;
    }
    if (ratio > 4 / scale) {
        ratio = 4 / scale;
    }
}

var ctx: CanvasRenderingContext2D;
var options = new Options();
var cv: HTMLCanvasElement;
var canvas: HTMLCanvasElement;
var width: number;
var height: number;
var context = null;
var ws = null;
var px: number = 0;
var y: number = 0;
var that = [];
var items = [];


var args = {};
var parts = [];
var chars = [];
var list = [];
var cx = 0;
var cy = 0;
var value = -1;
var t2 = -1;
var Mc = 0;
var t = 0;
var tOffset = 0;
var b = null;


var minX = 0;
var minY = 0;
var maxX = 1E4;
var maxY = 1E4;
var scale = 1;
var newValue = null;
var root = true;
var text = true;
var type = false;
var ub = false;
var closingAnimationTime = 0;


var color = false;
var metadata = false;
var chunk = px = ~~((minX + maxX) / 2);
var x = y = ~~((minY + maxY) / 2);
var argumentOffset = 1;
var actual = "";
var angles = null;
var ab = false;
var nb = false;
var matches = 0;
var s = 0;
var xr = 0;
var pos = 0;
var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
var $timeout = false;
var matchEnd = false;

var j = 0;
var ratio = 1;
var alpha = 1;
var to = false;
var resizeUID = 0;
var fc = true;
var passes = null;
var started = false;
var image = new Image;
image.src = "/img/background.png";
var gc = "ontouchstart" in self && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(self.navigator.userAgent);
var copy = new Image;
copy.src = "/img/split.png";
var firing = false;
var memory = false;
var stack = false;
var Xa = false;
var k: number;
var oldconfig: number;


var h1 = new OneRenSett(30, false, 1, 0.6, 30);
var m = new OneRenSett(30, false, .5, 0.3, 25);
var l = new OneRenSett(30, true, .3, 0.2, 25);
var opts = options.renderSettings =
    new RenderingSettings(h1, m, l);

var base = self.location.protocol;

function main(self, $) {

    function playerCalc() {
        /**
         * @param {Object} evt
         * @return {undefined}
         */
        self.onkeydown = evt => {
            if (!(32 != evt.keyCode)) {
                if (!firing) {
                    if ("nick" != evt.target.id) {
                        evt.preventDefault();
                    }
                    end();
                    /** @type {boolean} */
                    firing = true;
                }
            }
            if (81 == evt.keyCode) {
                emit(18);
                /** @type {boolean} */
                memory = true;
            }
            if (!(87 != evt.keyCode)) {
                if (!stack) {
                    emitter();
                    /** @type {boolean} */
                    stack = true;
                }
            }
            if (27 == evt.keyCode) {
                evt.preventDefault();
                showError(300);
                if ($("#oferwallContainer").is(":visible")) {
                    self.closeOfferwall();
                }
                if ($("#videoContainer").is(":visible")) {
                    self.closeVideoContainer();
                }
            }
        };
        /**
         * @param {?} event
         * @return {undefined}
         */
        self.onkeyup = function (event) {
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
                    emit(19);
                    /** @type {boolean} */
                    memory = false;
                }
            }
        };
    }

    function createObjects() {
        if (0.4 > scale) {
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
            for (; i < parts.length; i++) {
                var p = parts[i];
                if (!!p.P()) {
                    if (!p.V) {
                        if (!(20 >= p.size * scale)) {
                            /** @type {number} */
                            j = Math.min(p.x - p.size, j);
                            /** @type {number} */
                            left = Math.min(p.y - p.size, left);
                            /** @type {number} */
                            maxY = Math.max(p.x + p.size, maxY);
                            /** @type {number} */
                            bottom = Math.max(p.y + p.size, bottom);
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
                if (p = parts[i], p.P() && !(20 >= p.size * scale)) {
                    /** @type {number} */
                    j = 0;
                    for (; j < p.a.length; ++j) {
                        left = p.a[j].x;
                        maxY = p.a[j].y;
                        if (!(left < px - width / 2 / scale)) {
                            if (!(maxY < y - height / 2 / scale)) {
                                if (!(left > px + width / 2 / scale)) {
                                    if (!(maxY > y + height / 2 / scale)) {
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

    function preventDefault() {
        value = (cx - width / 2) / scale + px;
        t2 = (cy - height / 2) / scale + y;
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
        $.get(url + "info", function (b) {
            var testSource = {};
            var name;
            for (name in b.regions) {
                /** @type {string} */
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
        self.destroyAd(self.adSlots.aa);
        self.destroyAd(self.adSlots.ac);
    }

    /**
     * @param {(Object|string)} hash
     * @return {undefined}
     */
    function reset(hash) {
        if (hash) {
            if (hash == newValue) {
                $(".btn-needs-server").prop("disabled", false);
            } else {
                if ($("#region").val() != hash) {
                    $("#region").val(hash);
                }
                newValue = self.localStorage.location = hash;
                $(".region-message").hide();
                $(`.region-message.${hash}`).show();
                $(".btn-needs-server").prop("disabled", false);
                if (ab) {
                    next();
                }
            }
        }
    }

    /**
     * @param {number} expectedHashCode
     * @return {undefined}
     */
    function showError(expectedHashCode) {
        if (!to) {
            if (!from) {
                if (Aa) {
                    $(".btn-spectate").prop("disabled", true);
                } else {
                    $(".btn-spectate").prop("disabled", false);
                }
                /** @type {boolean} */
                Ba = false;
                /** @type {null} */
                b = null;
                if (!selector) {
                    $("#adsBottom").show();
                    $("#g300x250").hide();
                    $("#a300x250").show();
                    $("#g728x90").hide();
                    $("#a728x90").show();
                }
                self.refreshAd(selector ? self.adSlots.ac : self.adSlots.aa);
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

    /**
     * @param {number} path
     * @return {undefined}
     */
    function show(path) {
        $("#helloContainer").attr("data-gamemode", path);
        /** @type {number} */
        actual = path;
        $("#gamemode").val(path);
    }

    /**
     * @return {undefined}
     */
    function save() {
        if ($("#region").val()) {
            self.localStorage.location = $("#region").val();
        } else {
            if (self.localStorage.location) {
                $("#region").val(self.localStorage.location);
            }
        }
        if ($("#region").val()) {
            $("#locationKnown").append($("#region"));
        } else {
            $("#locationUnknown").append($("#region"));
        }
    }

    /**
     * @param {string} id
     * @return {undefined}
     */
    function resolve(id) {
        if ("env_local" in EnvConfig) {
            if ("true" == EnvConfig.load_local_configuration) {
                self.MC.updateConfigurationID("base");
            } else {
                self.MC.updateConfigurationID(EnvConfig.configID);
            }
        } else {
            self.MC.updateConfigurationID(id);
        }
    }

    /**
     * @return {undefined}
     */
    function startServer() {
        if ("configID" in result) {
            resolve(result.configID);
        } else {
            $.get(url + "getLatestID", function (newId) {
                resolve(newId);
                /** @type {string} */
                self.localStorage.last_config_id = newId;
            }).fail(function () {
                var data: boolean | string;
                if (data = "last_config_id" in self.localStorage) {
                    data = self.localStorage.last_config_id;
                    /** @type {boolean} */
                    data = !(null == data || (void 0 == data || "" === data));
                }
                if (data) {
                    data = self.localStorage.last_config_id;
                    console.log(`Fallback to stored configID: ${data}`);
                    resolve(data);
                }
            });
        }
    }

    /**
     * @return {undefined}
     */
    function postLink() {
        $.get(base + "//gc.agar.io", function (prop) {
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

    /**
     * @param {string} name
     * @return {?}
     */
    function _(name) {
        return self.i18n[name] || (self.i18n_dict.en[name] || name);
    }

    /**
     * @return {undefined}
     */
    function makeRequest() {
        /** @type {number} */
        var uid = ++resizeUID;
        bind();
        $.ajax(url + "findServer", {
            /**
             * @return {undefined}
             */
            error: function () {
                console.log("Failed to get server. Will retry in 30 seconds");
                setTimeout(makeRequest, 3E4);
            },
            /**
             * @param {Object} data
             * @return {undefined}
             */
            success: function (data) {
                if (uid == resizeUID) {
                    if (data.alert) {
                        alert(data.alert);
                    }
                    var method = data.ip;
                    if ("game_server_port" in EnvConfig) {
                        /** @type {string} */
                        method = self.location.hostname + ":" + EnvConfig.game_server_port;
                    }
                    open(`ws${ssl ? "s" : ""}://${method}`, data.token);
                }
            },
            dataType: "json",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: (newValue + actual || "?") + "\n154669603"
        });
    }

    /**
     * @return {undefined}
     */
    function next() {
        if (ab) {
            if (newValue) {
                $("#connecting").show();
                makeRequest();
            }
        }
    }

    /**
     * @return {undefined}
     */
    function bind() {
        if (ws) {
            /** @type {null} */
            ws.onopen = null;
            /** @type {null} */
            ws.onmessage = null;
            /** @type {null} */
            ws.onclose = null;
            try {
                ws.close();
            } catch (a) {
            }
            /** @type {null} */
            ws = null;
        }
    }

    /**
     * @param {string} url
     * @param {string} a
     * @return {undefined}
     */
    function open(url, a) {
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
            success = function () {
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
        items = [];
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
        ws = new WebSocket(url);
        /** @type {string} */
        ws.binaryType = "arraybuffer";
        /**
         * @return {undefined}
         */
        ws.onopen = function () {
            var data: DataView;
            /** @type {number} */
            j = t = Date.now();
            /** @type {number} */
            d = 120;
            /** @type {number} */
            a1 = 0;
            console.log("socket open");
            data = stringify(5);
            data.setUint8(0, 254);
            data.setUint32(1, 5, true);
            log(data);
            data = stringify(5);
            data.setUint8(0, 255);
            data.setUint32(1, 154669603, true);
            log(data);
            data = stringify(1 + a.length);
            data.setUint8(0, 80);
            /** @type {number} */
            var i = 0;
            for (; i < a.length; ++i) {
                data.setUint8(i + 1, a.charCodeAt(i));
            }
            log(data);
            options.core.proxy.onSocketOpen();
        };
        /** @type {function (MessageEvent): undefined} */
        ws.onmessage = onmessage;
        /** @type {function (): undefined} */
        ws.onclose = listener;
        /**
         * @return {undefined}
         */
        ws.onerror = function () {
            console.log(exports.la() + " socket error", arguments);
        };
    }

    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    function stringify(expectedNumberOfNonCommentArgs) {
        return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
    }

    /**
     * @param {Object} data
     * @return {undefined}
     */
    function log(data) {
        ws.send(data.buffer);
    }

    /**
     * @return {undefined}
     */
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

    /**
     * @param {MessageEvent} a
     * @return {undefined}
     */
    function onmessage(a) {
        parse(new DataView(a.data));
    }

    /**
     * @param {DataView} data
     * @return {undefined}
     */
    function parse(data) {
        /**
         * @return {?}
         */
        function encode() {
            /** @type {string} */
            var str = "";
            for (; ;) {
                var b = data.getUint16(offset, true);
                offset += 2;
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        /** @type {number} */
        var offset = 0;
        if (240 == data.getUint8(offset)) {
            fn();
        } else {
            switch (data.getUint8(offset++)) {
                case 16:
                    init(data, offset);
                    break;
                case 17:
                    chunk = data.getFloat32(offset, true);
                    offset += 4;
                    x = data.getFloat32(offset, true);
                    offset += 4;
                    argumentOffset = data.getFloat32(offset, true);
                    offset += 4;
                    break;
                case 18:
                    /** @type {Array} */
                    that = [];
                    /** @type {Array} */
                    items = [];
                    args = {};
                    /** @type {Array} */
                    parts = [];
                    break;
                case 20:
                    /** @type {Array} */
                    items = [];
                    /** @type {Array} */
                    that = [];
                    break;
                case 21:
                    matches = data.getInt16(offset, true);
                    offset += 2;
                    s = data.getInt16(offset, true);
                    offset += 2;
                    if (!nb) {
                        /** @type {boolean} */
                        nb = true;
                        xr = matches;
                        pos = s;
                    }
                    break;
                case 32:
                    that.push(data.getUint32(offset, true));
                    offset += 4;
                    break;
                case 49:
                    if (null != angles) {
                        break;
                    }
                    var b = data.getUint32(offset, true);
                    offset = offset + 4;
                    /** @type {Array} */
                    list = [];
                    /** @type {number} */
                    var a = 0;
                    for (; a < b; ++a) {
                        var token = data.getUint32(offset, true);
                        offset = offset + 4;
                        list.push({
                            id: token,
                            name: encode()
                        });
                    }
                    create();
                    break;
                case 50:
                    /** @type {Array} */
                    angles = [];
                    b = data.getUint32(offset, true);
                    offset += 4;
                    /** @type {number} */
                    a = 0;
                    for (; a < b; ++a) {
                        angles.push(data.getFloat32(offset, true));
                        offset += 4;
                    }
                    create();
                    break;
                case 64:
                    minX = data.getFloat64(offset, true);
                    offset += 8;
                    minY = data.getFloat64(offset, true);
                    offset += 8;
                    maxX = data.getFloat64(offset, true);
                    offset += 8;
                    maxY = data.getFloat64(offset, true);
                    offset += 8;
                    if (data.byteLength > offset) {
                        b = data.getUint32(offset, true);
                        offset += 4;
                        /** @type {boolean} */
                        started = !!(b & 1);
                        passes = encode();
                        self.MC.updateServerVersion(passes);
                        console.log(`Server version ${passes}`);
                    }
                    break;
                case 102:
                    b = data.buffer.slice(offset);
                    options.core.proxy.forwardProtoMessage(b);
                    break;
                case 104:
                    self.logout();
            }
        }
    }

    /**
     * @param {DataView} dataView
     * @param {number} offset
     * @return {undefined}
     */
    var timer: number;

    function init(dataView, offset) {
        /**
         * @return {?}
         */
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

        /**
         * @return {?}
         */
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
            destroy();
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
            var data = dataView.getUint8(offset++);
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
                data = new Node(a2, pos, c, g, color, content);
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
                if (-1 == items.indexOf(data)) {
                    items.push(data);
                    /** @type {boolean} */
                    data.I = true;
                    if (1 == items.length) {
                        /** @type {boolean} */
                        data.wa = true;
                        px = data.a2;
                        y = data.y;
                        valueAccessor();
                        /** @type {string} */
                        document.getElementById("overlays").style.display = "none";
                        /** @type {Array} */
                        a = [];
                        /** @type {number} */
                        pauseText = 0;
                        col = items[0].color;
                        /** @type {boolean} */
                        Aa = true;
                        /** @type {number} */
                        aux = Date.now();
                        /** @type {number} */
                        count = path = name = 0;
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
            if (0 == items.length) {
                if (0 == self.MC.isUserLoggedIn()) {
                    fn();
                } else {
                    /** @type {number} */
                    timer = setTimeout(fn, 2E3);
                }
            }
        }
    }

    var closest: number;

    /**
     * @return {undefined}
     */

    function read() {
        if (forEach()) {
            /** @type {number} */
            var x = cx - width / 2;
            /** @type {number} */
            var y = cy - height / 2;
            if (!(64 > x * x + y * y)) {
                if (!(0.01 > Math.abs(closest - value) && 0.01 > Math.abs(t1 - t2))) {
                    closest = value;
                    t1 = t2;
                    var buff = stringify(13);
                    buff.setUint8(0, 16);
                    buff.setInt32(1, value, true);
                    buff.setInt32(5, t2, true);
                    buff.setUint32(9, 0, true);
                    log(buff);
                }
            }
        }
    }

    /**
     * @return {undefined}
     */
    function destroy() {
        if (forEach() && (matchEnd && null != b)) {
            var data = stringify(1 + 2 * b.length);
            data.setUint8(0, 0);
            /** @type {number} */
            var bi = 0;
            for (; bi < b.length; ++bi) {
                data.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);
            }
            log(data);
            /** @type {null} */
            b = null;
            /** @type {boolean} */
            Ba = true;
        }
    }

    /**
     * @return {undefined}
     */
    function end() {
        read();
        emit(17);
    }

    /**
     * @return {undefined}
     */
    function emitter() {
        read();
        emit(21);
    }

    /**
     * @return {?}
     */
    function forEach() {
        return null != ws && ws.readyState == ws.OPEN;
    }

    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {undefined}
     */
    function emit(expectedNumberOfNonCommentArgs) {
        if (forEach()) {
            var data = stringify(1);
            data.setUint8(0, expectedNumberOfNonCommentArgs);
            log(data);
        }
    }

    /**
     * @param {Object} caption
     * @return {undefined}
     */
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

    /**
     * @return {undefined}
     */
    function update() {
        /** @type {number} */
        width = 1 * self.innerWidth;
        /** @type {number} */
        height = 1 * self.innerHeight;
        /** @type {number} */
        cv.width = canvas.width = width;
        /** @type {number} */
        cv.height = canvas.height = height;
        var $this = $("#helloContainer");
        $this.css("transform", "none");
        var maxHeight = $this.height();
        /** @type {number} */
        var win = self.innerHeight;
        if (0 != maxHeight / 2 % 2) {
            maxHeight++;
            $this.height(maxHeight);
        }
        if (maxHeight > win / 1.1) {
            $this.css("transform", `translate(-50%, -50%) scale(${win / maxHeight / 1.1})`);
        } else {
            $this.css("transform", "translate(-50%, -50%)");
        }
        render();
    }

    /**
     * @return {?}
     */
    function requestAnimationFrame() {
        var setSize: number;
        /** @type {number} */
        setSize = 1 * Math.max(height / 1080, width / 1920);
        return setSize *= ratio;
    }

    /**
     * @return {undefined}
     */
    function frame() {
        if (0 != items.length) {
            /** @type {number} */
            var imgWidth = 0;
            /** @type {number} */
            var i = 0;
            for (; i < items.length; i++) {
                imgWidth += items[i].size;
            }
            /** @type {number} */
            scale = (9 * scale + Math.pow(Math.min(64 / imgWidth, 1), 0.4) * requestAnimationFrame()) / 10;
        }
    }

    /**
     * @return {undefined}
     */
    function render() {
        var size: number;
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
        /** @type {number} */
        t = n;
        if (0 < items.length) {
            frame();
            /** @type {number} */
            var a = size = 0;
            /** @type {number} */
            var i = 0;
            for (; i < items.length; i++) {
                items[i].S();
                size += items[i].x / items.length;
                a += items[i].y / items.length;
            }
            /** @type {number} */
            chunk = size;
            /** @type {number} */
            x = a;
            argumentOffset = scale;
            /** @type {number} */
            px = (px + size) / 2;
            /** @type {number} */
            y = (y + a) / 2;
        } else {
            /** @type {number} */
            px = (5 * px + chunk) / 6;
            /** @type {number} */
            y = (5 * y + x) / 6;
            /** @type {number} */
            scale = (9 * scale + argumentOffset * requestAnimationFrame()) / 10;
        }
        createObjects();
        preventDefault();
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
        parts.sort(function (a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size;
        });
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-px, -y);
        /** @type {number} */
        i = 0;
        for (; i < chars.length; i++) {
            chars[i].w(ctx);
        }
        /** @type {number} */
        i = 0;
        for (; i < parts.length; i++) {
            parts[i].w(ctx);
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
            i = 0;
            for (; i < items.length; i++) {
                ctx.moveTo(items[i].x, items[i].y);
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
            size = a11.width;
            /** @type {number} */
            ctx.globalAlpha = 0.2;
            /** @type {string} */
            ctx.fillStyle = "#000000";
            ctx.fillRect(10, height - 10 - 24 - 10, size + 10, 34);
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
        if (!forEach() || (to || from)) {
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
                            size = image.height * width / image.width;
                        } else {
                            /** @type {number} */
                            n = image.width * height / image.height;
                            size = height;
                        }
                        ctx.drawImage(image, (width - n) / 2, (height - size) / 2, n, size);
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
            if (Ba) {
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

    /**
     * @return {undefined}
     */
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

    /**
     * @return {undefined}
     */
    function redraw() {
        /** @type {string} */
        ctx.fillStyle = color ? "#111111" : "#F2FBFF";
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        /** @type {string} */
        ctx.strokeStyle = color ? "#AAAAAA" : "#000000";
        /** @type {number} */
        ctx.globalAlpha = 0.2 * scale;
        /** @type {number} */
        var x = width / scale;
        /** @type {number} */
        var y2 = height / scale;
        /** @type {number} */
        var y1 = (-px + x / 2) % 50;
        for (; y1 < x; y1 += 50) {
            ctx.beginPath();
            ctx.moveTo(y1 * scale - 0.5, 0);
            ctx.lineTo(y1 * scale - 0.5, y2 * scale);
            ctx.stroke();
        }
        /** @type {number} */
        y1 = (-y + y2 / 2) % 50;
        for (; y1 < y2; y1 += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y1 * scale - 0.5);
            ctx.lineTo(x * scale, y1 * scale - 0.5);
            ctx.stroke();
        }
        ctx.restore();
    }

    /**
     * @return {undefined}
     */
    function drawBackground() {
        if (gc && copy.width) {
            /** @type {number} */
            var dim = width / 5;
            ctx.drawImage(copy, 5, 5, dim, dim);
        }
    }

    /**
     * @return {?}
     */
    function pick() {
        /** @type {number} */
        var result = 0;
        /** @type {number} */
        var i = 0;
        for (; i < items.length; i++) {
            result += items[i].g * items[i].g;
        }
        return result;
    }

    /**
     * @return {undefined}
     */
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
                            if (items[0].name) {
                                d3 = items[0].name;
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

    /**
     * @param {string} f
     * @return {?}
     */
    function tryIt(f) {
        if (null == f || 0 == f.length) {
            return null;
        }
        if ("%" == f[0]) {
            if (!self.MC || !self.MC.getSkinInfo) {
                return null;
            }
            f = self.MC.getSkinInfo(`skin_${f.slice(1)}`);
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
                    if (!self.MC || !self.MC.getSkinInfo) {
                        return null;
                    }
                    var data = self.MC.getSkinInfo(`skin_${x.slice(1)}`);
                    if (null == data) {
                        return null;
                    }
                    t.src = self.ASSETS_ROOT + data.url;
                }
            }
            /** @type {Image} */
            results[x] = t;
        }
        return 0 != results[x].width && results[x].complete ? results[x] : null;
    }

    /**
     * @param {(Object|string)} client
     * @param {number} x
     * @param {number} y
     * @param {number} f
     * @param {number} opt_vars
     * @return {undefined}
     */
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

    /**
     * @param {number} id
     * @param {?} opt_parent
     * @param {?} $0
     * @param {number} size
     * @param {number} value
     * @param {?} c
     * @return {undefined}
     */
    function Node(id, opt_parent, $0, size, value, c) {
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

    /**
     * @param {?} val
     * @return {?}
     */
    function isArray(val) {
        val = val.toString(16);
        for (; 6 > val.length;) {
            /** @type {string} */
            val = `0${val}`;
        }
        return `#${val}`;
    }

    /**
     * @param {number} val
     * @param {number} dataAndEvents
     * @param {?} params
     * @param {number} o
     * @return {undefined}
     */
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

    /**
     * @param {Array} arr
     * @return {undefined}
     */
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

    /**
     * @return {undefined}
     */
    var data: { context: any;defaultProvider: string;loginIntent: string;userInfo: { socialToken: any;tokenExpires: string;level: string;xp: string;xpNeeded: string;name: string;picture: string;displayName: string;loggedIn: string;socialId: string } };

    function compassResult() {
        data = tmp;
    }

    /**
     * @param {string} text
     * @return {undefined}
     */
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
        self.localStorage.storeObjectInfo = JSON.stringify(data);
        /** @type {*} */
        data = JSON.parse(self.localStorage.storeObjectInfo);
        /** @type {*} */
        self.storageInfo = data;
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
        self.updateStorage();
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
            if (null == options || void 0 == options) {
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
                    }, function () {
                        $(".agario-profile-panel .progress-bar-star").text(options.level);
                        $(".agario-exp-bar .progress-bar").css("width", "100%");
                        $(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(".progress-bar-star").removeClass("animated tada");
                        });
                        setTimeout(function () {
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
                    var update = function () {
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
                            self.requestAnimationFrame(update);
                        }
                    };
                    self.requestAnimationFrame(update);
                }
            }
        }
    }

    /**
     * @return {undefined}
     */
    function f() {
        var force;
        if ("undefined" !== typeof force && force || "none" == $("#settings").css("display") && "none" == $("#socialLoginContainer").css("display")) {
            $("#instructions").show();
        }
    }

    /**
     * @param {Object} response
     * @return {undefined}
     */
    function error(response) {
        if ("connected" == response.status) {
            var actualAria = response.authResponse.accessToken;
            if (null == actualAria || ("undefined" == actualAria || "" == actualAria)) {
                if (3 > lc) {
                    lc++;
                    self.facebookRelogin();
                }
                self.logout();
            } else {
                self.MC.doLoginWithFB(actualAria);
                /** @type {Array} */
                options.cache.login_info = [actualAria, "facebook"];
                self.FB.api("/me/picture?width=180&height=180", function (messageEvent) {
                    data.userInfo.picture = messageEvent.data.url;
                    self.updateStorage();
                    $(".agario-profile-picture").attr("src", messageEvent.data.url);
                    data.userInfo.socialId = response.authResponse.userID;
                    h();
                });
                $("#helloContainer").attr("data-logged-in", "1");
                /** @type {string} */
                data.context = "facebook";
                /** @type {string} */
                data.loginIntent = "1";
                self.updateStorage();
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
        cb(`#${self.encodeURIComponent(param)}`);
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
             */
            success: function (status) {
                status = status.split("\n");
                $(".partyToken").val(`agar.io/#${self.encodeURIComponent(param)}`);
                $("#helloContainer").attr("data-party-state", "5");
                show(":party");
                open(`ws://${status[0]}`, param);
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
        if (self.history) {
            if (self.history.replaceState) {
                self.history.replaceState({}, self.document.title, path);
            }
        }
    }

    /**
     * @return {undefined}
     */
    function fn() {
        /** @type {boolean} */
        Ba = false;
        clearTimeout(timer);
        if (null == self.storageInfo) {
            self.createDefaultStorage();
        }
        /** @type {number} */
        max = Date.now();
        if (0 >= aux) {
            /** @type {number} */
            aux = max;
        }
        /** @type {boolean} */
        Aa = false;
        setPosition();
    }

    /**
     * @param {Element} params
     * @param {Object} self
     * @return {undefined}
     */
    function hasClass(params, self) {
        /** @type {boolean} */
        var d = -1 != that.indexOf(params.id);
        /** @type {boolean} */
        var c = -1 != that.indexOf(self.id);
        /** @type {boolean} */
        var e = 30 > self.size;
        if (d) {
            if (e) {
                ++pauseText;
            }
        }
        if (!e) {
            if (!!d) {
                if (!c) {
                    if (!(self.ea & 32)) {
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
                    var r2 = r.reduce(function (far, near) {
                        return far + near;
                    }) / r.length / n;
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

    /**
     * @return {undefined}
     */
    function setPosition() {
        if (!to) {
            if (!from) {
                if (id) {
                    self.refreshAd(self.adSlots.ab);
                    DrawPolyline();
                    /** @type {boolean} */
                    from = true;
                    setTimeout(function () {
                        $("#overlays").fadeIn(500, start);
                        $("#stats").show();
                        var onComplete = trigger("g_plus_share_stats");
                        self.fillSocialValues(onComplete, "gPlusShare");
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
        return self.parseString(data, "%@", [uHostName.split(":")[0], uHostName.split(":")[1], $(".stats-highest-mass").text()]);
    }

    /**
     * @return {undefined}
     */
    function onMouseMove() {
        self.open("https://plus.google.com/share?url=www.agar.io&hl=en-US", "Agar.io", `width=484,height=580,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=${self.screenX + self.innerWidth / 2 - 242},top=${(self.innerHeight - 580) / 2}`);
    }

    /** @type {Element} */
    var test_canvas = document.createElement("canvas");
    if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {
        alert("You browser does not support this game, we recommend you to use Firefox to play this");
    } else {
        var result = new Result();
        (function () {
            /** @type {string} */
            var params = self.location.search;
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
        self.queryString = result;
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
        var _tryInitOnFocus = "http:" != self.location.protocol;
        /** @type {boolean} */
        var _isFocused = "1" == fnReadCookie();
        /** @type {boolean} */
        var sc = false;
        if (!fb) {
            if (!miniclip) {
                if (_tryInitOnFocus && !_isFocused) {
                    setCookie("1", 1);
                    /** @type {string} */
                    self.location.href = `http:${self.location.href.substring(self.location.protocol.length)}`;
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
        if (!self.agarioNoInit) {
            /** @type {boolean} */
            var ssl = "https:" == base;
            if (result.master) {
                EnvConfig.master_url = result.master;
            }
            /** @type {string} */
            var url = base + "//" + EnvConfig.master_url + "/";
            /** @type {string} */
            var userAgent = self.navigator.userAgent;
            if (-1 != userAgent.indexOf("Android")) {
                if (self.ga) {
                    self.ga("send", "event", "MobileRedirect", "PlayStore");
                }
                setTimeout(function () {
                    /** @type {string} */
                    self.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io";
                }, 1E3);
            } else {
                if (-1 != userAgent.indexOf("iPhone") || (-1 != userAgent.indexOf("iPad") || -1 != userAgent.indexOf("iPod"))) {
                    if (self.ga) {
                        self.ga("send", "event", "MobileRedirect", "AppStore");
                    }
                    setTimeout(function () {
                        /** @type {string} */
                        self.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp";
                    }, 1E3);
                } else {
                    self.agarApp = options;
                    if ("gamepad" in result) {
                        setInterval(function () {
                            if (Xa) {
                                cx = val.ha(cx, k);
                                cy = val.ha(cy, oldconfig);
                            }
                        }, 25);
                    }
                    /**
                     * @param {number} dataAndEvents
                     * @param {number} m3
                     * @return {undefined}
                     */
                    self.gamepadAxisUpdate = function (dataAndEvents, m3) {
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
                    self.agarioInit = function () {
                        /** @type {boolean} */
                        ab = true;
                        postLink();
                        startServer();
                        options.core.init();
                        if (null != self.localStorage.settings) {
                            /** @type {*} */
                            settings = JSON.parse(self.localStorage.settings);
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
                        canvas = cv = <HTMLCanvasElement>document.getElementById("canvas");
                        if (null != canvas) {
                            ctx = canvas.getContext("2d");
                            /**
                             * @param {Event} e
                             * @return {undefined}
                             */
                            canvas.onmousedown = function (e) {
                                if (gc) {
                                    /** @type {number} */
                                    var z0 = e.clientX - (5 + width / 5 / 2);
                                    /** @type {number} */
                                    var z1 = e.clientY - (5 + width / 5 / 2);
                                    if (Math.sqrt(z0 * z0 + z1 * z1) <= width / 5 / 2) {
                                        end();
                                        return;
                                    }
                                }
                                /** @type {number} */
                                cx = 1 * e.clientX;
                                /** @type {number} */
                                cy = 1 * e.clientY;
                                preventDefault();
                                read();
                            };
                            /**
                             * @param {Event} e
                             * @return {undefined}
                             */
                            canvas.onmousemove = function (e) {
                                /** @type {boolean} */
                                Xa = false;
                                /** @type {number} */
                                cx = 1 * e.clientX;
                                /** @type {number} */
                                cy = 1 * e.clientY;
                                preventDefault();
                            };
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
                            self.onblur = function () {
                                emit(19);
                                /** @type {boolean} */
                                stack = memory = firing = false;
                            };
                            /** @type {function (): undefined} */
                            self.onresize = update;
                            self.requestAnimationFrame(which);
                            setInterval(read, 40);
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
                            update();
                            if (self.location.hash) {
                                if (6 <= self.location.hash.length) {
                                    request(self.location.hash);
                                }
                            }
                        }
                    };
                    /** @type {null} */
                    var old = null;
                    /**
                     * @param {Function} v
                     * @return {undefined}
                     */
                    self.setNick = function (v) {
                        if (self.ga) {
                            self.ga("send", "event", "Nick", v.toLowerCase());
                        }
                        _init();
                        /** @type {Function} */
                        b = v;
                        destroy();
                        /** @type {number} */
                        closingAnimationTime = 0;
                        settings.skinsEnabled = root;
                        settings.namesEnabled = text;
                        settings.noColors = type;
                        settings.blackTheme = color;
                        settings.showMass = metadata;
                        settings.statsEnabled = id;
                        /** @type {string} */
                        self.localStorage.settings = JSON.stringify(settings);
                        playerCalc();
                    };
                    /**
                     * @param {string} part
                     * @return {undefined}
                     */
                    self.setSkins = function (part) {
                        /** @type {string} */
                        root = part;
                    };
                    /**
                     * @param {string} textAlt
                     * @return {undefined}
                     */
                    self.setNames = function (textAlt) {
                        /** @type {string} */
                        text = textAlt;
                    };
                    /**
                     * @param {boolean} newColor
                     * @return {undefined}
                     */
                    self.setDarkTheme = function (newColor) {
                        /** @type {boolean} */
                        color = newColor;
                    };
                    /**
                     * @param {string} color
                     * @return {undefined}
                     */
                    self.setColors = function (color) {
                        /** @type {string} */
                        type = color;
                    };
                    /**
                     * @param {string} response
                     * @return {undefined}
                     */
                    self.setShowMass = function (response) {
                        /** @type {string} */
                        metadata = response;
                    };
                    /**
                     * @return {undefined}
                     */
                    self.spectate = function () {
                        /** @type {null} */
                        b = null;
                        playerCalc();
                        emit(1);
                        _init();
                    };
                    /** @type {function ((Object|string)): undefined} */
                    self.setRegion = reset;
                    /** @type {boolean} */
                    var selector = true;
                    /**
                     * @param {string} expected
                     * @return {undefined}
                     */
                    self.setGameMode = function (expected) {
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
                    self.setAcid = function (_$timeout_) {
                        /** @type {boolean} */
                        $timeout = _$timeout_;
                    };
                    var POST = function (self) {
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
                        self.init = function () {
                            options.account.init();
                            options.google.xa();
                            options.fa.init();
                            if (text = "debug" in self.queryString) {
                                options.debug.showDebug();
                            }
                        };
                        /**
                         * @param {string} event_name
                         * @param {Function} callback
                         * @return {undefined}
                         */
                        self.bind = function (event_name, callback) {
                            $($window).bind(event_name, callback);
                        };
                        /**
                         * @param {?} callback
                         * @param {?} cb
                         * @return {undefined}
                         */
                        self.unbind = function (callback, cb) {
                            $($window).unbind(callback, cb);
                        };
                        /**
                         * @param {string} type
                         * @param {?} extra
                         * @return {undefined}
                         */
                        self.trigger = function (type, extra) {
                            $($window).trigger(type, extra);
                        };
                        self.__defineGetter__("debug", function () {
                            return text;
                        });
                        self.__defineSetter__("debug", function (textAlt) {
                            return text = textAlt;
                        });
                        self.__defineGetter__("proxy", function () {
                            return self.MC;
                        });
                        self.__defineGetter__("config", function () {
                            return skipDraw;
                        });
                        return self;
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
                    var input = {
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
                    var d = 0;
                    /** @type {number} */
                    var a1 = 0;
                    /** @type {null} */
                    var success = null;
                    /** @type {boolean} */
                    var Ba = false;
                    /** @type {function (string, string): undefined} */
                    self.connect = open;
                    /** @type {number} */
                    var backoff = 500;
                    /** @type {number} */
                    var qw = 0.875;
                    /** @type {number} */
                    var tx = 0.75;
                    /** @type {number} */
                    var ty = 0.25;
                    /** @type {number} */
                    var qz = 0.125;
                    /** @type {number} */
                    closest = -1;
                    /** @type {number} */
                    var t1 = -1;
                    /** @type {function (): undefined} */
                    self.sendMitosis = end;
                    /** @type {function (): undefined} */
                    self.sendEject = emitter;
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
                            if (forEach()) {
                                var codeSegments = data.byteView;
                                if (null != codeSegments) {
                                    data = stringify(1 + data.length);
                                    data.setUint8(0, 102);
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < codeSegments.length; ++i) {
                                        data.setUint8(1 + i, codeSegments[i]);
                                    }
                                    log(data);
                                }
                            }
                        };
                        return opt_attributes;
                    } ({});
                    /** @type {null} */
                    var img = null;
                    /** @type {null} */
                    var _arg = null;

                    /** @type {number} */
                    var pdataCur = 0;
                    /** @type {number} */
                    var Pa = 0;
                    /** @type {number} */
                    var Oa = 0;
                    var which = function () {
                        /** @type {number} */
                        var d = Date.now();
                        /** @type {number} */
                        var b = 1E3 / 60;
                        return function () {
                            self.requestAnimationFrame(which);
                            /** @type {number} */
                            var x = Date.now();
                            /** @type {number} */
                            var a = x - d;
                            if (a > b) {
                                /** @type {number} */
                                d = x - a % b;
                                /** @type {number} */
                                var length = Date.now();
                                if (!forEach() || (240 > length - j || !options.core.config.skipDraw)) {
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
                    self.setQuality = set;
                    var images = {};
                    /** @type {Array.<string>} */
                    var excludes = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump;underwood".split(";");
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
                    var HALF_PI = -1;
                    /** @type {boolean} */
                    var cc = false;
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
                            i = items.indexOf(this);
                            if (-1 != i) {
                                /** @type {boolean} */
                                ub = true;
                                items.splice(i, 1);
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
                                minimumCellWidth *= scale;
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
                                if (15 < this.size && (null != context && (20 < this.size * scale && 0 < this.id))) {
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
                            return 0 >= this.id ? true : this.x + this.size + 40 < px - width / 2 / scale || (this.y + this.size + 40 < y - height / 2 / scale || (this.x - this.size - 40 > px + width / 2 / scale || this.y - this.size - 40 > y + height / 2 / scale)) ? false : true;
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
                                var y_position = 0 < this.id && (!this.c && (!this.h && 0.4 > scale)) || opts.selected.simpleDraw && !this.c;
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
                                                    images[key].src = self.ASSETS_ROOT + "skins/" + key + ".png";
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
                                                            if (7 <= items.length) {
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
                                key = -1 != items.indexOf(this);
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
                                                    var a7 = 0 >= this.id ? 1 : Math.ceil(10 * scale) / 10;
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
                                        if (key || 0 == items.length && ((!this.c || this.h) && 20 < this.size)) {
                                            if (null == this.R) {
                                                this.R = new setFillAndStroke(this.m() / 2, "#FFFFFF", true, "#000000");
                                            }
                                            key = this.R;
                                            key.O(this.m() / 2);
                                            key.B(~~(this.size * this.size / 100));
                                            /** @type {number} */
                                            var a9 = Math.ceil(10 * scale) / 10;
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
                    self.Maths = val;
                    var exports = function (opt_attributes) {
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
                    self.Utils = exports;
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
                        for (; x < vendors.length && !self.requestAnimationFrame; ++x) {
                            self.requestAnimationFrame = self[vendors[x] + "RequestAnimationFrame"];
                            self.cancelAnimationFrame = self[vendors[x] + "CancelAnimationFrame"] || self[vendors[x] + "CancelRequestAnimationFrame"];
                        }
                        if (!self.requestAnimationFrame) {
                            /**
                             * @param {function (number): ?} callback
                             * @return {number}
                             */
                            self.requestAnimationFrame = function (callback) {
                                return setTimeout(callback, 1E3 / 60);
                            };
                            /**
                             * @param {number} id
                             * @return {?}
                             */
                            self.cancelAnimationFrame = function (id) {
                                clearTimeout(id);
                            };
                        }
                    })();
                    var proto = {
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
                    var valueAccessor = function () {
                        var that = new Node(0, 0, 0, 32, "#ED1C24", "");
                        /** @type {Element} */
                        var canvas = document.createElement("canvas");
                        /** @type {number} */
                        canvas.width = 32;
                        /** @type {number} */
                        canvas.height = 32;
                        var renderer = canvas.getContext("2d");
                        return function () {
                            if (0 < items.length) {
                                that.color = items[0].color;
                                that.A(items[0].name);
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
                    var tmp = {
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
                    data = self.defaultSt = tmp;
                    self.storageInfo = data;
                    /** @type {function (): undefined} */
                    self.createDefaultStorage = compassResult;
                    /** @type {function (): undefined} */
                    self.updateStorage = callback;
                    $(function () {
                        if (null != self.localStorage.storeObjectInfo) {
                            /** @type {*} */
                            data = JSON.parse(self.localStorage.storeObjectInfo);
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
                    self.checkLoginStatus = function () {
                        if ("1" == data.loginIntent) {
                            h();
                            template(data.context);
                        }
                    };
                    /**
                     * @return {undefined}
                     */
                    var h = function () {
                        self.MC.setProfilePicture(data.userInfo.picture);
                        self.MC.setSocialId(data.userInfo.socialId);
                    };
                    /**
                     * @return {undefined}
                     */
                    self.logout = function () {
                        data = tmp;
                        delete self.localStorage.storeObjectInfo;
                        /** @type {string} */
                        self.localStorage.storeObjectInfo = JSON.stringify(tmp);
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
                        self.MC.doLogout();
                    };
                    /**
                     * @return {undefined}
                     */
                    self.toggleSocialLogin = function () {
                        $("#socialLoginContainer").toggle();
                        $("#settings").hide();
                        $("#instructions").hide();
                        f();
                    };
                    /**
                     * @return {undefined}
                     */
                    self.toggleSettings = function () {
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
                                if (null != self.ssa_json) {
                                    /** @type {string} */
                                    self.ssa_json.applicationUserId = `${player.id}`;
                                    /** @type {string} */
                                    self.ssa_json.custom_user_id = `${player.id}`;
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
                    var lc = 0;
                    /**
                     * @return {undefined}
                     */
                    self.fbAsyncInit = function () {
                        /**
                         * @return {undefined}
                         */
                        function submitForm() {
                            if (null == self.FB) {
                                alert("You seem to have something blocking Facebook on your browser, please check for any extensions");
                            } else {
                                /** @type {string} */
                                data.loginIntent = "1";
                                self.updateStorage();
                                self.FB.login(function (e) {
                                    error(e);
                                }, {
                                        scope: "public_profile, email"
                                    });
                            }
                        }

                        self.FB.init({
                            appId: EnvConfig.fb_app_id,
                            cookie: true,
                            xfbml: true,
                            status: true,
                            version: "v2.2"
                        });
                        if ("1" == self.storageInfo.loginIntent && "facebook" == self.storageInfo.context || fb) {
                            self.FB.getLoginStatus(function (response) {
                                if ("connected" === response.status) {
                                    error(response);
                                } else {
                                    if ("not_authorized" === response.status) {
                                        self.logout();
                                        submitForm();
                                    } else {
                                        self.logout();
                                    }
                                }
                            });
                        }
                        /** @type {function (): undefined} */
                        self.facebookRelogin = submitForm;
                        /** @type {function (): undefined} */
                        self.facebookLogin = submitForm;
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
                        self.gapiAsyncInit = function () {
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
                                self.gapi.client.load("plus", "v1", function () {
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
                            self.MC.doLoginWithGPlus(callback);
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
                                    self.gapi.ytsubscribe.go("agarYoutube");
                                    self.gapi.load("auth2", function () {
                                        api = self.gapi.auth2.init(params);
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
                                    self.qa = extra;
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
                                                self.logout();
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
                                    self.updateStorage();
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
                    self.gplusModule = app;
                    /**
                     * @return {undefined}
                     */
                    var disconnect = function () {
                        options.fa.ya();
                    };
                    /** @type {function (): undefined} */
                    self.logoutGooglePlus = disconnect;
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

                        var data = new Node(-1, 0, 0, 32, "#5bc0de", "");
                        var n = new Node(-1, 0, 0, 32, "#5bc0de", "");
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
                            items.push(new Node(-1, Math.cos(bisection) * radius, Math.sin(bisection) * radius, 10, codeSegments[i], ""));
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
                    self.createParty = function () {
                        show(":party");
                        /**
                         * @param {string} content
                         * @return {undefined}
                         */
                        success = function (content) {
                            cb(`/#${self.encodeURIComponent(content)}`);
                            $(".partyToken").val(`agar.io/#${self.encodeURIComponent(content)}`);
                            $("#helloContainer").attr("data-party-state", "1");
                        };
                        next();
                    };
                    /** @type {function (string): undefined} */
                    self.joinParty = request;
                    /**
                     * @return {undefined}
                     */
                    self.cancelParty = function () {
                        cb("/");
                        $("#helloContainer").attr("data-party-state", "0");
                        show("");
                        next();
                    };
                    /** @type {Array} */
                    var a = [];
                    /** @type {number} */
                    var pauseText = 0;
                    /** @type {string} */
                    var col = "#000000";
                    /** @type {boolean} */
                    var from = false;
                    /** @type {boolean} */
                    var Aa = false;
                    /** @type {number} */
                    var aux = 0;
                    /** @type {number} */
                    var max = 0;
                    /** @type {number} */
                    var name = 0;
                    /** @type {number} */
                    var path = 0;
                    /** @type {number} */
                    var count = 0;
                    /** @type {boolean} */
                    var id = true;
                    /** @type {function (): undefined} */
                    self.onPlayerDeath = fn;
                    setInterval(function () {
                        if (Aa) {
                            a.push(pick() / 100);
                        }
                    }, 1E3 / 60);
                    setInterval(function () {
                        var tempCount = objEquiv();
                        if (0 != tempCount) {
                            ++name;
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
                    self.closeStats = function () {
                        /** @type {boolean} */
                        from = false;
                        $("#stats").hide();
                        self.destroyAd(self.adSlots.ab);
                        showError(0);
                    };
                    /**
                     * @param {?} dataAndEvents
                     * @return {undefined}
                     */
                    self.setSkipStats = function (dataAndEvents) {
                        /** @type {boolean} */
                        id = !dataAndEvents;
                    };
                    /** @type {function (string): ?} */
                    self.getStatsString = trigger;
                    /** @type {function (): undefined} */
                    self.gPlusShare = onMouseMove;
                    /**
                     * @return {undefined}
                     */
                    self.twitterShareStats = function () {
                        var url = self.getStatsString("tt_share_stats");
                        self.open(`https://twitter.com/intent/tweet?text=${url}`, "Agar.io", `width=660,height=310,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=${self.screenX + self.innerWidth / 2 - 330},top=${(self.innerHeight - 310) / 2}`);
                    };
                    /**
                     * @return {undefined}
                     */
                    self.fbShareStats = function () {
                        var groupDescription = self.getStatsString("fb_matchresults_subtitle");
                        self.FB.ui({
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
                    self.fillSocialValues = function (onComplete, ctxt) {
                        if (1 == self.isChrome) {
                            if ("google" == self.storageInfo.context) {
                                self.gapi.interactivepost.render(ctxt, {
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
                        if ("MAsyncInit" in self) {
                            self.MAsyncInit();
                        }
                    });
                }
            }
        }
    }
}