var Wb = function () { throw new Error("Not implemented"); };
var P;
var r;
var ia;
var z;
var xc;
var ra;
var sa;
var A;
var B;
var q;
var u;

var va;
var wa;
var Y;
var Z;

var xa;
var ya;
var EnvConfig;
interface IMyWindow extends Window {
    destroyAd: any;
    adSlots: any;
    MC: any;
    closeOfferwall: any;
    closeVideoContainer: any;
    refreshAd: any;
    ASSETS_ROOT;
    updateStorage();
    encodeURIComponent(object);
    i18n;
    i18n_dict;
    logout();
    fillSocialValues(object, gplusshare: string);
    storageInfo;
    parseString(object, string: string, array: string[]);
    createDefaultStorage();
    facebookRelogin();
}
var c: IMyWindow;

import $ = require("jquery");

var e = $;

function qa(a, b) {
    var a1;
    if (b) {
        var d = new Date;
        d.setTime(d.getTime() + 864E5 * b);
        a1 = "; expires=" + d.toUTCString();
    }
    else
        a1 = "";
    document.cookie = "agario_redirect=" + a + a1 + "; path=/";
}
function vc() {
    var a1 = "";
    for (var a = document.cookie.split(";"), b = 0; b < a.length; b++) {
        for (var d = a[b]; " " === d.charAt(0);)
            a1 = d.substring(1, d.length);
        if (0 === a1.indexOf("agario_redirect="))
            return a1.substring(16, a1.length);
    }
    return null;
}

var ta;
function Lb() {
    c.onkeydown = a => {
        32 !== a.keyCode || ra ||
            ("nick" !== a.target.id && a.preventDefault(),
                Za(), ra = true);
        81 === a.keyCode && (X(18), sa = true);
        87 !== a.keyCode || ta || (Mb(), ta = true);
        27 === a.keyCode && (a.preventDefault(),
            ua(300), e("#oferwallContainer")
                .is(":visible") && c.closeOfferwall(),
            e("#videoContainer").is(":visible")
            && c.closeVideoContainer());
    };
    c.onkeyup = a => {
        32 === a.keyCode && (ra = false);
        87 === a.keyCode && (ta = false);
        81 === a.keyCode && sa && (X(19), sa = false);
    };
}
function Nb(a) {
    a.preventDefault();
    P *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
    1 > P && (P = 1);
    P > 4 / r && (P = 4 / r);
}
function wc() {
    if (.4 > r)
        ia = null;
    else {
        for (var a = Number.POSITIVE_INFINITY,
            b = Number.POSITIVE_INFINITY,
            d = Number.NEGATIVE_INFINITY,
            c = Number.NEGATIVE_INFINITY,
            g = 0; g < z.length; g++) {
            var e = z[g];
            !e.P() || e.V || 20 >= e.size * r
                || (a = Math.min(e.x - e.size, a),
                    b = Math.min(e.y - e.size, b),
                    d = Math.max(e.x + e.size, d),
                    c = Math.max(e.y + e.size, c));
        }
        ia = xc.init({
            Ba: a - 10,
            Ca: b - 10,
            za: d + 10,
            Aa: c + 10,
            Ja: 2,
            Ka: 4
        });
        for (g = 0; g < z.length; g++)
            if (e = z[g], e.P() && !(20 >= e.size * r))
                for (a = 0; a < e.a.length; ++a)
                    b = e.a[a].x,
                        d = e.a[a].y,
                        b < A - q / 2 / r ||
                        d < B - u / 2 / r ||
                        b > A + q / 2 / r ||
                        d > B + u / 2 / r ||
                        ia.va(e.a[a]);
    }
}
function $a() {
    va = (Y - q / 2) / r + A;
    wa = (Z - u / 2) / r + B;
}
function Ob() {
    null == xa && (xa = {}, e("#region").children().each(function () {
        var a = e(this), b = a.val();
        b && (xa[b] = a.text());
    }));
    e.get(ya + "info", a => {
        var b = {}, d;
        for (d in a.regions) {
            var c = d.split(":")[0];
            b[c] = b[c] || 0;
            b[c] += a.regions[d].numPlayers;
        }
        for (d in b)
            e('#region option[value="' + d + '"]').text(xa[d] + " (" + b[d] + " players)");
    }, "json");
}

var aa: boolean;
var ja: boolean;

function Pb() {
    e("#adsBottom").hide();
    e("#overlays").hide();
    e("#stats").hide();
    e("#mainPanel").hide();
    aa = ja = false;
    Qb();
    c.destroyAd(c.adSlots.aa);
    c.destroyAd(c.adSlots.ac);
}
var K;
var ab;
function za(a) {
    a && (a == K ? e(".btn-needs-server")
        .prop("disabled", false)
        : (e("#region").val() != a
            && e("#region").val(a),
            K = c.localStorage.location = a,
            e(".region-message").hide(),
            e(".region-message." + a).show(),
            e(".btn-needs-server").prop("disabled", false),
            ab && Q()));
}
var Aa;
var Ba, N, bb, C;

function ua(a) {
    ja || aa || (Aa ? e(".btn-spectate")
        .prop("disabled", true) : e(".btn-spectate")
            .prop("disabled", false),
        Ba = false, N = null, bb || (e("#adsBottom").show(),
            e("#g300x250").hide(), e("#a300x250").show(),
            e("#g728x90").hide(), e("#a728x90").show()),
        c.refreshAd(bb ? c.adSlots.ac : c.adSlots.aa),
        bb = false, 1E3 > a && (C = 1), ja = true,
        e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a)
            : e("#overlays").show());
}

var Ca;
function ka(a) {
    e("#helloContainer").attr("data-gamemode", a);
    Ca = a;
    e("#gamemode").val(a);
}
function Qb() {
    e("#region").val()
        ? c.localStorage.location = e("#region").val()
        : c.localStorage.location
        && e("#region").val(c.localStorage.location);
    e("#region").val()
        ? e("#locationKnown").append(e("#region"))
        : e("#locationUnknown").append(e("#region"));
}
function cb(a) {
    "env_local" in EnvConfig
        ? "true" == EnvConfig.load_local_configuration
            ? c.MC.updateConfigurationID("base")
            : c.MC.updateConfigurationID(EnvConfig.configID)
        : c.MC.updateConfigurationID(a);
}

var E;
function yc() {
    "configID" in E ? cb(E.configID)
        : e.get(ya + "getLatestID", a => {
            cb(a);
            c.localStorage.last_config_id = a;
        });
}

var db, Rb, la;
function zc() {
    e.get(db + "//gc.agar.io", a => {
        var b = a.split(" ");
        a = b[0];
        b = b[1] || "";
        -1 === ["UA"].indexOf(a) && Rb.push("ussr");
        la.hasOwnProperty(a) && ("string" == typeof la[a] ? K
            || za(la[a]) : la[a].hasOwnProperty(b) &&
            (K || za(la[a][b])));
    }, "text");
}
function R(a) {
    return c.i18n[a] || c.i18n_dict.en[a] || a;
}

var eb, gb;
function Sb() {
    var a = ++eb;
    Tb();
    e.ajax(ya + "findServer", {
        error() {
            console.log("Failed to get server. Will retry in 30 seconds");
            setTimeout(Sb, 3E4);
        },
        success(b) {
            if (a == eb) {
                b.alert && alert(b.alert);
                var d = b.ip;
                "game_server_port" in EnvConfig &&
                    (d = c.location.hostname + ":" +
                        EnvConfig.game_server_port);
                fb("ws" + (gb ? "s" : "") + "://" + d, b.token);
            }
        },
        dataType: "json", method: "POST", cache: false,
        crossDomain: true, data: (K + Ca || "?") + "\n154669603"
    });
}
function Q() {
    ab && K && (e("#connecting").show(), Sb());
}
var x;
function Tb() {
    if (x) {
        x.onopen = null;
        x.onmessage = null;
        x.onclose = null;
        try {
            x.close();
        }
        catch (a) {
        }
        x = null;
    }
}
var S, G, t, L, ba, D, H, I, T, ma, m, Da, y, na, Ea, hb;
function fb(a, b) {
    Tb();
    E.ip && (a = "ws" + (gb ? "s" : "") + "://" + E.ip);
    if (null != S) {
        var d = S;
        S = () => {
            d(b);
        };
    }
    if (gb && !EnvConfig.env_development && !EnvConfig.env_local) {
        var c = a.split(":");
        a = "wss://ip-" + c[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + +c[2];
    }
    G = [];
    t = [];
    L = {};
    z = [];
    ba = [];
    D = [];
    H = I = null;
    T = 0;
    ma = false;
    m.cache.sentGameServerLogin = false;
    x = new WebSocket(a);
    x.binaryType = "arraybuffer";
    x.onopen = () => {
        var a;
        Da = y = Date.now();
        na = 120;
        Ea = 0;
        console.log("socket open");
        a = U(5);
        a.setUint8(0, 254);
        a.setUint32(1, 5, true);
        V(a);
        a = U(5);
        a.setUint8(0, 255);
        a.setUint32(1, 154669603, true);
        V(a);
        a = U(1 + b.length);
        a.setUint8(0, 80);
        for (var d = 0; d < b.length; ++d)
            a.setUint8(d + 1, b.charCodeAt(d));
        V(a);
        m.core.proxy.onSocketOpen();
    };
    x.onmessage = Ac;
    x.onclose = Bc;
    x.onerror = function () {
        console.log(hb.la() + " socket error", arguments);
    };
}
function U(a) {
    return new DataView(new ArrayBuffer(a));
}
function V(a) {
    x.send(a.buffer);
}

var Fa: number;
function Bc() {
    ma && (Fa = 500);
    m.core.proxy.onSocketClosed();
    console.log(hb.la() + " socket close");
    setTimeout(Q, Fa);
    Fa *= 2;
}
function Ac(a) {
    Cc(new DataView(a.data));
}
var ib, jb, kb, lb, mb, nb, Ha, Ia, ob, pb, qb, rb, sb, tb;
function Cc(a) {
    function b() {
        for (var b = ""; ;) {
            var c = a.getUint16(d, true);
            d += 2;
            if (0 == c)
                break;
            b += String.fromCharCode(c);
        }
        return b;
    }
    var d = 0;
    if (240 == a.getUint8(d))
        Ga();
    else
        switch (a.getUint8(d++)) {
            case 16:
                Dc(a, d);
                break;
            case 17:
                ib = a.getFloat32(d, true);
                d += 4;
                jb = a.getFloat32(d, true);
                d += 4;
                kb = a.getFloat32(d, true);
                d += 4;
                break;
            case 18:
                G = [];
                t = [];
                L = {};
                z = [];
                break;
            case 20:
                t = [];
                G = [];
                break;
            case 21:
                lb = a.getInt16(d, true);
                d += 2;
                mb = a.getInt16(d, true);
                d += 2;
                nb || (nb = true, Ha = lb, Ia = mb);
                break;
            case 32:
                G.push(a.getUint32(d, true));
                d += 4;
                break;
            case 49:
                if (null != I)
                    break;
                var v = a.getUint32(d, true), d = d + 4;
                D = [];
                for (var g = 0; g < v; ++g) {
                    var e = a.getUint32(d, true), d = d + 4;
                    D.push({ id: e, name: b() });
                }
                Ub();
                break;
            case 50:
                I = [];
                v = a.getUint32(d, true);
                d += 4;
                for (g = 0; g < v; ++g)
                    I.push(a.getFloat32(d, true)), d += 4;
                Ub();
                break;
            case 64:
                ob = a.getFloat64(d, true);
                d += 8;
                pb = a.getFloat64(d, true);
                d += 8;
                qb = a.getFloat64(d, true);
                d += 8;
                rb = a.getFloat64(d, true);
                d += 8;
                a.byteLength > d && (v = a.getUint32(d, true),
                    d += 4, sb = !!(v & 1), tb = b(),
                    c.MC.updateServerVersion(tb),
                    console.log("Server version " + tb));
                break;
            case 102:
                v = a.buffer.slice(d);
                m.core.proxy.forwardProtoMessage(v);
                break;
            case 104: c.logout();
        }
}

var Ec, Fc, Gc, Hc, ub, Xb;
var F, wb, xb, Ja, W, yb, zb;
function Dc(a, b) {
    function d() {
        for (var d = ""; ;) {
            var c = a.getUint16(b, true);
            b += 2;
            if (0 == c)
                break;
            d += String.fromCharCode(c);
        }
        return d;
    }
    function v() {
        for (var d = ""; ;) {
            var c = a.getUint8(b++);
            if (0 == c)
                break;
            d += String.fromCharCode(c);
        }
        return d;
    }
    y = Date.now();
    var g = y - Da;
    Da = y;
    na = Ec * na + Fc * g;
    Ea = Gc * Ea + Hc * Math.abs(g - na);
    m.core.debug && (m.debug.updateChart("networkUpdate", y, g),
        m.debug.updateChart("rttMean", y, na),
        m.debug.updateChart("rttSDev", y, Ea));
    ma || (ma = true, e("#connecting").hide(),
        Vb(), S && (S(), S = null));
    ub = false;
    g = a.getUint16(b, true);
    b += 2;
    for (var p = 0; p < g; ++p) {
        var M = L[a.getUint32(b, true)],
            l = L[a.getUint32(b + 4, true)];
        b += 8;
        M && l && (l.ca(), l.s = l.x, l.u = l.y,
            l.o = l.size, l.pa(M.x, M.y), l.g = l.size,
            l.T = y, Ic(M, l));
    }
    for (p = 0; ;) {
        g = a.getUint32(b, true);
        b += 4;
        if (0 == g)
            break;
        ++p;
        var vb, M = a.getInt32(b, true);
        b += 4;
        l = a.getInt32(b, true);
        b += 4;
        vb = a.getInt16(b, true);
        b += 2;
        var n = a.getUint8(b++), f = a.getUint8(b++),
            h = a.getUint8(b++), f = Jc(n << 16 | f << 8 | h),
            h = a.getUint8(b++), k = !!(h & 1), r = !!(h & 16),
            q = null;
        h & 2 && (b += 4 + a.getUint32(b, true));
        h & 4 && (q = v());
        var u = d(), n = null;
        L.hasOwnProperty(g) ? (n = L[g], n.S(),
            n.s = n.x, n.u = n.y, n.o = n.size, n.color = f)
            : (n = new ca(g, M, l, vb, f, u), z.push(n), L[g] = n);
        n.c = k;
        n.h = r;
        n.pa(M, l);
        n.g = vb;
        n.T = y;
        n.ea = h;
        q && (n.C = q);
        u && n.A(u);
        -1 != G.indexOf(g) && -1 == t.indexOf(n)
            && (t.push(n), n.I = true, 1 == t.length
                && (n.wa = true, A = n.x, B = n.y,
                    Wb(), document.getElementById("overlays")
                        .style.display = "none",
                    F = [], wb = 0, xb = t[0].color,
                    Aa = true, Ja = Date.now(), W = yb = zb = 0));
    }
    M = a.getUint32(b, true);
    b += 4;
    for (p = 0; p < M; p++)
        g = a.getUint32(b, true), b += 4, n = L[g], null != n && n.ca();
    ub && 0 == t.length && (0 == c.MC.isUserLoggedIn()
        ? Ga() : Xb = setTimeout(Ga, 2E3));
}
var Yb, Zb;
function Ka() {
    if (da()) {
        var a = Y - q / 2, b = Z - u / 2;
        if (64 > a * a + b * b) return;
        if (.01 > Math.abs(Yb - va) && .01 > Math.abs(Zb - wa)) return;
        Yb = va; Zb = wa;
        var a1 = U(13);
        a1.setUint8(0, 16);
        a1.setInt32(1, va, true);
        a1.setInt32(5, wa, true);
        a1.setUint32(9, 0, true);
        V(a1);
    }
}
function Vb() {
    if (da() && ma && null != N) {
        var a = U(1 + 2 * N.length);
        a.setUint8(0, 0);
        for (var b = 0; b < N.length; ++b)
            a.setUint16(1 + 2 * b, N.charCodeAt(b), true);
        V(a);
        N = null;
        Ba = true;
    }
}
function Za() {
    Ka();
    X(17);
}
function Mb() {
    Ka();
    X(21);
}
function da() {
    return null != x && x.readyState == x.OPEN;
}
function X(a) {
    if (da()) {
        var b = U(1);
        b.setUint8(0, a);
        V(b);
    }
}

var h;
function Kc(a) {
    "auto" == a.toLowerCase() ? h.auto = true
        : (m.renderSettings.selected =
            m.renderSettings[a.toLowerCase()], h.auto = false);
}

var Ab, O;
function $b() {
    q = 1 * c.innerWidth;
    u = 1 * c.innerHeight;
    Ab.width = O.width = q;
    Ab.height = O.height = u;
    var a = e("#helloContainer");
    a.css("transform", "none");
    var b = a.height(), d = c.innerHeight;
    0 != b / 2 % 2 && (b++ , a.height(b));
    b > d / 1.1 ? a.css("transform",
        "translate(-50%, -50%) scale(" + d / b / 1.1 + ")")
        : a.css("transform", "translate(-50%, -50%)");
    ac();
}
function bc() {
    var a;
    a = 1 * Math.max(u / 1080, q / 1920);
    return a *= P;
}
function Lc() {
    if (0 != t.length) {
        for (var a = 0, b = 0; b < t.length; b++)
            a += t[b].size;
        r = (9 * r + Math.pow(Math.min(64 / a, 1), .4) * bc()) / 10;
    }
}

var Mc, cc, La, Bb, f, ea, Ma, ec, fc, Oa, Pa, J;
function ac() {
    var a, b = Date.now();
    ++Mc;
    cc && (++La, 180 < La && (La = 0));
    y = b;
    if (0 < t.length) {
        Lc();
        for (var d = a = 0, c = 0; c < t.length; c++)
            t[c].S(), a += t[c].x
                / t.length, d += t[c].y / t.length;
        ib = a;
        jb = d;
        kb = r;
        A = (A + a) / 2;
        B = (B + d) / 2;
    }
    else
        A = (5 * A + ib) / 6, B = (5 * B + jb)
            / 6, r = (9 * r + kb * bc()) / 10;
    wc();
    $a();
    Bb || f.clearRect(0, 0, q, u);
    Bb ? (f.fillStyle = ea ? "#111111" : "#F2FBFF",
        f.globalAlpha = .05, f.fillRect(0, 0, q, u),
        f.globalAlpha = 1) : Nc();
    z.sort((a, b) => (a.size === b.size
        ? a.id - b.id : a.size - b.size));
    f.save();
    f.translate(q / 2, u / 2);
    f.scale(r, r);
    f.translate(-A, -B);
    for (c = 0; c < ba.length; c++)
        ba[c].w(f);
    for (c = 0; c < z.length; c++)
        z[c].w(f);
    if (nb) {
        Ha = (3 * Ha + lb) / 4;
        Ia = (3 * Ia + mb) / 4;
        f.save();
        f.strokeStyle = "#FFAAAA";
        f.lineWidth = 10;
        f.lineCap = "round";
        f.lineJoin = "round";
        f.globalAlpha = .5;
        f.beginPath();
        for (c = 0; c < t.length; c++)
            f.moveTo(t[c].x, t[c].y), f.lineTo(Ha, Ia);
        f.stroke();
        f.restore();
    }
    f.restore();
    H && H.width && f.drawImage(H, q - H.width - 10, 10);
    T = Math.max(T, dc());
    0 != T && (null == Ma && (Ma = new Na(24, "#FFFFFF")),
        Ma.B(R("score") + ": " + ~~(T / 100)),
        d = Ma.N(), a = d.width, f.globalAlpha = .2,
        f.fillStyle = "#000000",
        f.fillRect(10, u - 10 - 24 - 10, a + 10, 34),
        f.globalAlpha = 1, f.drawImage(d, 15, u - 10 - 24 - 5));
    Oc();
    b = Date.now() - b;
    b > 1E3 / 60 ? h.detail -= .01 : b < 1E3 / 65
        && (h.detail += .001);
    h.detail < h.selected.minDetail
        && (h.auto && h.downgrade(), h.detail = h.selected.minDetail);
    h.detail > h.selected.maxDetail
        && (h.auto && h.upgrade(), h.detail = h.selected.maxDetail);
    b = y - ec;
    !da() || ja || aa ? (C += b / 2E3, 1 < C && (C = 1))
        : (C -= b / 300, 0 > C && (C = 0));
    0 < C ? (f.fillStyle = "#000000", fc
        ? (f.globalAlpha = C, f.fillRect(0, 0, q, u),
            J.complete && J.width
            && (J.width / J.height < q / u ?
                (b = q, a = J.height * q / J.width)
                : (b = J.width * u / J.height, a = u),
                f.drawImage(J, (q - b) / 2, (u - a) / 2, b, a),
                f.globalAlpha = .5 * C, f.fillRect(0, 0, q, u)))
        : (f.globalAlpha = .5 * C, f.fillRect(0, 0, q, u)),
        f.globalAlpha = 1) : fc = false;
    h.selected.ma && Ba &&
        (Oa++ , Oa > 10 * h.selected.warnFps
            ? (h.selected.ma = false, Oa = -1, Pa = 0) : Pc());
    ec = y;
}
function Pc() {
    var a = document.createElement("canvas"), b = a.getContext("2d"), d = Math.min(800, .6 * q) / 800;
    a.width = 800 * d;
    a.height = 60 * d;
    b.globalAlpha = .3;
    b.fillStyle = "#000000";
    b.fillRect(0, 0, 800, 60);
    b.globalAlpha = 1;
    b.fillStyle = "#FFFFFF";
    b.scale(d, d);
    d = null;
    d = "Your computer is running slow,";
    b.font = "18px Ubuntu";
    b.fillText(d, 400 - b.measureText(d).width / 2, 25);
    d = "please close other applications or tabs in your browser for better game performance.";
    b.fillText(d, 400 - b.measureText(d).width / 2, 45);
    f.drawImage(a, (q - a.width) / 2, u - a.height - 10);
}
function Nc() {
    f.fillStyle = ea ? "#111111" : "#F2FBFF";
    f.fillRect(0, 0, q, u);
    f.save();
    f.strokeStyle = ea ? "#AAAAAA" : "#000000";
    f.globalAlpha = .2 * r;
    for (var a = q / r, b = u / r, d = (-A + a / 2) % 50; d < a; d += 50)
        f.beginPath(), f.moveTo(d * r - .5, 0), f.lineTo(d * r - .5, b * r), f.stroke();
    for (d = (-B + b / 2) % 50; d < b; d += 50)
        f.beginPath(), f.moveTo(0, d * r - .5), f.lineTo(a * r, d * r - .5), f.stroke();
    f.restore();
}

var gc, Cb;
function Oc() {
    if (gc && Cb.width) {
        var a = q / 5;
        f.drawImage(Cb, 5, 5, a, a);
    }
}
function dc() {
    for (var a = 0, b = 0; b < t.length; b++)
        a += t[b].g * t[b].g;
    return a;
}
var fa, Qc;
function Ub() {
    H = null;
    if (null != I || 0 != D.length)
        if (null != I || fa) {
            H = document.createElement("canvas");
            var a = H.getContext("2d"), b = 60, b = null == I
                ? b + 24 * D.length : b + 180, d = Math.min(200, .3 * q) / 200;
            H.width = 200 * d;
            H.height = b * d;
            a.scale(d, d);
            a.globalAlpha = .4;
            a.fillStyle = "#000000";
            a.fillRect(0, 0, 200, b);
            a.globalAlpha = 1;
            a.fillStyle = "#FFFFFF";
            d = null;
            d = R("leaderboard");
            a.font = "30px Ubuntu";
            a.fillText(d, 100 - a.measureText(d).width / 2, 40);
            var c, e;
            if (null == I)
                for (a.font = "20px Ubuntu", b = 0; b < D.length; ++b)
                    d = D[b].name || R("unnamed_cell"),
                        fa || (d = R("unnamed_cell")),
                        1 == D[b].id || -1 != G.indexOf(D[b].id)
                            ? (t[0].name && (d = t[0].name),
                                a.fillStyle = "#FFAAAA")
                            : a.fillStyle = "#FFFFFF",
                        d = b + 1 + ". " + d,
                        e = a.measureText(d).width,
                        c = 70 + 24 * b, 200 < e ? a.fillText(d, 10, c)
                            : a.fillText(d, (200 - e) / 2, c);
            else
                for (b = d = 0; b < I.length; ++b)
                    c = d + I[b] * Math.PI * 2, a.fillStyle = Qc[b + 1],
                        a.beginPath(), a.moveTo(100, 140),
                        a.arc(100, 140, 80, d, c, false), a.fill(), d = c;
        }
}

function Rc(a) {
    if (null == a || 0 == a.length)
        return null;
    if ("%" == a[0]) {
        if (!c.MC || !c.MC.getSkinInfo)
            return null;
        a = c.MC.getSkinInfo("skin_" + a.slice(1));
        if (null == a)
            return null;
        for (a = (+a.color).toString(16); 6 > a.length;)
            a = "0" + a;
        return "#" + a;
    }
    return null;
}

var oa;
function hc(a) {
    if (null == a || 0 == a.length)
        return null;
    if (!oa.hasOwnProperty(a)) {
        var b = new Image;
        if (":" == a[0])
            b.src = a.slice(1);
        else if ("%" == a[0]) {
            if (!c.MC || !c.MC.getSkinInfo)
                return null;
            var d = c.MC.getSkinInfo("skin_" + a.slice(1));
            if (null == d)
                return null;
            b.src = c.ASSETS_ROOT + d.url;
        }
        oa[a] = b;
    }
    return 0 != oa[a].width && oa[a].complete ? oa[a] : null;
}
function Db(a, b, d, c, e) {
    this.$ = a;
    this.x = b;
    this.y = d;
    this.f = c;
    this.b = e;
}
function ca(a, b, d, c, e, p) {
    this.id = a;
    this.s = this.x = this.L = this.J = b;
    this.u = this.y = this.M = this.K = d;
    this.o = this.size = c;
    this.color = e;
    this.a = [];
    this.ba();
    this.A(p);
}
function Jc(a) {
    for (a = a.toString(16); 6 > a.length;)
        a = "0" + a;
    return "#" + a;
}
function Na(a, b, d, c) {
    a && (this.v = a);
    b && (this.W = b);
    this.Y = !!d;
    c && (this.Z = c);
}
function Sc(a) {
    for (var b = a.length, d, c; 0 < b;)
        c = Math.floor(Math.random() * b), b-- , d = a[b], a[b] = a[c], a[c] = d;
}

var k, Qa;
function Tc() {
    k = Qa;
}
function ic(a) {
    k.context = "google" == a ? "google" : "facebook";
    Ra();
}
function Ra() {
    c.localStorage.storeObjectInfo = JSON.stringify(k);
    k = JSON.parse(c.localStorage.storeObjectInfo);
    c.storageInfo = k;
    "google" == k.context ? (e("#gPlusShare").show(), e("#fbShare").hide()) : (e("#gPlusShare").hide(), e("#fbShare").show());
}
function jc(a) {
    e("#helloContainer").attr("data-has-account-data");
    "" != a.displayName && (a.name = a.displayName);
    if (null == a.name || void 0 == a.name)
        a.name = "";
    var b = a.name.lastIndexOf("_");
    -1 != b && (a.name = a.name.substring(0, b));
    e("#helloContainer").attr("data-has-account-data", "1");
    e("#helloContainer").attr("data-logged-in", "1");
    e(".agario-profile-panel .progress-bar-star")
        .text(a.level);
    e(".agario-exp-bar .progress-bar-text")
        .text(a.xp + "/" + a.xpNeeded + " XP");
    e(".agario-exp-bar .progress-bar")
        .css("width", (88 * a.xp / a.xpNeeded).toFixed(2) + "%");
    e(".agario-profile-name").text(a.name);
    "" != a.picture && e(".agario-profile-picture")
        .attr("src", a.picture);
    Eb();
    k.userInfo.level = a.level;
    k.userInfo.xp = a.xp;
    k.userInfo.xpNeeded = a.xpNeeded;
    k.userInfo.displayName = a.name;
    k.userInfo.loggedIn = "1";
    c.updateStorage();
}
function ga(a, b) {
    var d = a;
    if (k.userInfo.loggedIn) {
        var v = e("#helloContainer").is(":visible")
            && "1" == e("#helloContainer")
                .attr("data-has-account-data");
        if (null == d || void 0 == d)
            d = k.userInfo;
        if (v) {
            var g = +e(".agario-exp-bar .progress-bar-text")
                .first().text().split("/")[0],
                v = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0], p = e(".agario-profile-panel .progress-bar-star").first().text();
            if (p != d.level)
                ga({ xp: v, xpNeeded: v, level: p },
                    function () {
                        e(".agario-profile-panel .progress-bar-star")
                            .text(d.level);
                        e(".agario-exp-bar .progress-bar")
                            .css("width", "100%");
                        e(".progress-bar-star")
                            .addClass("animated tada")
                            .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            function () {
                                e(".progress-bar-star")
                                    .removeClass("animated tada");
                            });
                        setTimeout(function () {
                            e(".agario-exp-bar .progress-bar-text").text(d.xpNeeded + "/" + d.xpNeeded + " XP");
                            ga({ xp: 0, xpNeeded: d.xpNeeded, level: d.level }, function () {
                                ga(d);
                            });
                        }, 1E3);
                    });
            else {
                var f = Date.now(), l = function () {
                    var a;
                    a = (Date.now() - f) / 1E3;
                    a = 0 > a ? 0 : 1 < a ? 1 : a;
                    a = a * a * (3 - 2 * a);
                    e(".agario-exp-bar .progress-bar-text")
                        .text(~~(g + (d.xp - g) * a) + "/"
                        + d.xpNeeded + " XP");
                    e(".agario-exp-bar .progress-bar")
                        .css("width", (88 * (g + (d.xp - g) * a)
                            / d.xpNeeded).toFixed(2) + "%");
                    b && b();
                    1 > a && c.requestAnimationFrame(l);
                };
                c.requestAnimationFrame(l);
            }
        }
    }
}
function Eb() {
    var a;
    ("undefined" !== typeof a && a || "none" == e("#settings")
        .css("display") && "none" == e("#socialLoginContainer")
            .css("display")) && e("#instructions").show();
}

var lc;
function kc(a) {
    if ("connected" == a.status) {
        var b = a.authResponse.accessToken;
        null == b || "undefined" == b || "" == b ?
            (3 > lc && (lc++ , c.facebookRelogin()), c.logout())
            : (c.MC.doLoginWithFB(b),
                m.cache.login_info = [b, "facebook"],
                c.FB.api("/me/picture?width=180&height=180",
                    function (b) {
                        k.userInfo.picture = b.data.url;
                        c.updateStorage();
                        e(".agario-profile-picture").attr("src", b.data.url);
                        k.userInfo.socialId = a.authResponse.userID;
                        Sa();
                    }), e("#helloContainer").attr("data-logged-in", "1"), k.context = "facebook", k.loginIntent = "1", c.updateStorage());
    }
}
function mc(a) {
    ka(":party");
    e("#helloContainer").attr("data-party-state", "4");
    a = decodeURIComponent(a).replace(/.*#/gim, "");
    Fb("#" + c.encodeURIComponent(a));
    e.ajax(ya + "getToken", {
        error: function () {
            e("#helloContainer").attr("data-party-state", "6");
        }, success: function (b) {
            b = b.split("\n");
            e(".partyToken").val("agar.io/#" +
                c.encodeURIComponent(a));
            e("#helloContainer").attr("data-party-state", "5");
            ka(":party");
            fb("ws://" + b[0], a);
        }, dataType: "text", method: "POST",
        cache: false, crossDomain: true, data: a
    });
}
function Fb(a) {
    c.history && c.history.replaceState && c.history.replaceState({}, c.document.title, a);
}

var Gb;
function Ga() {
    Ba = false;
    clearTimeout(Xb);
    null == c.storageInfo && c.createDefaultStorage();
    Gb = Date.now();
    0 >= Ja && (Ja = Gb);
    Aa = false;
    Uc();
}
function Ic(a, b) {
    var d = -1 != G.indexOf(a.id),
        c = -1 != G.indexOf(b.id), e = 30 > b.size;
    d && e && ++wb;
    e || !d || c || b.ea & 32 || ++yb;
}
function nc(a) {
    a = ~~a;
    var b = (a % 60).toString();
    a = (~~(a / 60)).toString();
    2 > b.length && (b = "0" + b);
    return a + ":" + b;
}
function Vc() {
    if (null == D)
        return 0;
    for (var a = 0; a < D.length; ++a)
        if (D[a].id & 1)
            return a + 1;
    return 0;
}
function Wc() {
    e(".stats-food-eaten").text(wb);
    e(".stats-time-alive").text(nc((Gb - Ja) / 1E3));
    e(".stats-leaderboard-time").text(nc(zb));
    e(".stats-highest-mass").text(~~(T / 100));
    e(".stats-cells-eaten").text(yb);
    e(".stats-top-position").text(0 == W ? ":(" : W);
    var a = document.getElementById("statsGraph");
    if (a) {
        var b = a.getContext("2d"), d = a.width, a = a.height;
        b.clearRect(0, 0, d, a);
        if (2 < F.length) {
            for (var c = 200, g = 0; g < F.length; g++)
                c = Math.max(F[g], c);
            b.lineWidth = 3;
            b.lineCap = "round";
            b.lineJoin = "round";
            b.strokeStyle = xb;
            b.fillStyle = xb;
            b.beginPath();
            b.moveTo(0, a - F[0] / c * (a - 10) + 10);
            for (g = 1; g < F.length; g += Math.max(~~(F.length / d), 1)) {
                for (var p = g / (F.length - 1) * d, f = [], l = -20; 20 >= l; ++l)
                    0 > g + l || g + l >= F.length || f.push(F[g + l]);
                f = f.reduce(function (a, b) {
                    return a + b;
                }) / f.length / c;
                b.lineTo(p, a - f * (a - 10) + 10);
            }
            b.stroke();
            b.globalAlpha = .5;
            b.lineTo(d, a);
            b.lineTo(0, a);
            b.fill();
            b.globalAlpha = 1;
        }
    }
}

var Ta;
function Uc() {
    ja || aa || (Ta ? (c.refreshAd(c.adSlots.ab),
        Wc(), aa = true, setTimeout(function () {
            e("#overlays").fadeIn(500, function () {
                ga();
            });
            e("#stats").show();
            var a = oc("g_plus_share_stats");
            c.fillSocialValues(a, "gPlusShare");
        }, 1500)) : ua(500));
}
function oc(a) {
    var b = e(".stats-time-alive").text();
    return c.parseString(a, "%@",
        [b.split(":")[0], b.split(":")[1],
            e(".stats-highest-mass").text()]);
}
function Xc() {
    c.open("https://plus.google.com/share?url=www.agar.io&hl=en-US",
        "Agar.io", "width=484,height=580,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=" +
        (c.screenX + c.innerWidth / 2 - 242) + ",top=" + (c.innerHeight - 580) / 2);
}
