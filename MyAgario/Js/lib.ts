﻿
class TimeSeries {
    Ma: boolean;

    constructor(p: { Ma: boolean }) { return; }
}
var gapi;
var SSA_CORE;


class SmoothieChart {
    private res;

    constructor(res) {
        this.res = res;
    }
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

var excludes: string[];
var input: { AF: string; AX: string; AL: string; DZ: string; AS: string; AD: string; AO: string; AI: string; AG: string; AR: string; AM: string; AW: string; AU: string; AT: string; AZ: string; BS: string; BH: string; BD: string; BB: string; BY: string; BE: string; BZ: string; BJ: string; BM: string; BT: string; BO: string; BQ: string; BA: string; BW: string; BR: string; IO: string; VG: string; BN: string; BG: string; BF: string; BI: string; KH: string; CM: string; CA: string; CV: string; KY: string; CF: string; TD: string; CL: string; CN: string; CX: string; CC: string; CO: string; KM: string; CD: string; CG: string; CK: string; CR: string; CI: string; HR: string; CU: string; CW: string; CY: string; CZ: string; DK: string; DJ: string; DM: string; DO: string; EC: string; EG: string; SV: string; GQ: string; ER: string; EE: string; ET: string; FO: string; FK: string; FJ: string; FI: string; FR: string; GF: string; PF: string; GA: string; GM: string; GE: string; DE: string; GH: string; GI: string; GR: string; GL: string; GD: string; GP: string; GU: string; GT: string; GG: string; GN: string; GW: string; GY: string; HT: string; VA: string; HN: string; HK: string; HU: string; IS: string; IN: string; ID: string; IR: string; IQ: string; IE: string; IM: string; IL: string; IT: string; JM: string; JP: string; JE: string; JO: string; KZ: string; KE: string; KI: string; KP: string; KR: string; KW: string; KG: string; LA: string; LV: string; LB: string; LS: string; LR: string; LY: string; LI: string; LT: string; LU: string; MO: string; MK: string; MG: string; MW: string; MY: string; MV: string; ML: string; MT: string; MH: string; MQ: string; MR: string; MU: string; YT: string; MX: string; FM: string; MD: string; MC: string; MN: string; ME: string; MS: string; MA: string; MZ: string; MM: string; NA: string; NR: string; NP: string; NL: string; NC: string; NZ: string; NI: string; NE: string; NG: string; NU: string; NF: string; MP: string; NO: string; OM: string; PK: string; PW: string; PS: string; PA: string; PG: string; PY: string; PE: string; PH: string; PN: string; PL: string; PT: string; PR: string; QA: string; RE: string; RO: string; RU: string; RW: string; BL: string; SH: string; KN: string; LC: string; MF: string; PM: string; VC: string; WS: string; SM: string; ST: string; SA: string; SN: string; RS: string; SC: string; SL: string; SG: string; SX: string; SK: string; SI: string; SB: string; SO: string; ZA: string; SS: string; ES: string; LK: string; SD: string; SR: string; SJ: string; SZ: string; SE: string; CH: string; SY: string; TW: string; TJ: string; TZ: string; TH: string; TL: string; TG: string; TK: string; TO: string; TT: string; TN: string; TR: string; TM: string; TC: string; TV: string; UG: string; UA: string; AE: string; GB: string; US: string; UM: string; VI: string; UY: string; UZ: string; VU: string; VE: string; VN: string; WF: string; EH: string; YE: string; ZM: string; ZW: string };
var timer: number;