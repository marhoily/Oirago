(function (c, e) {
    var pc = document.createElement("canvas");
    if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == pc || null == pc.getContext || null == c.localStorage)
        alert("You browser does not support this game, we recommend you to use Firefox to play this");
    else {
        var E = {};
        (() => {
            var a = c.location.search;
            "?" == a.charAt(0) && (a = a.slice(1));
            for (var a = a.split("&"), b = 0; b < a.length; b++) {
                var d = a[b].split("=");
                E[d[0]] = d[1];
            }
        })();
        c.queryString = E;
        var qc = "fb" in E, Yc = "miniclip" in E, w = { skinsEnabled: "0", namesEnabled: "0", noColors: "0", blackTheme: "0", showMass: "0", statsEnabled: "0" }, Zc = function () {
            qa("", -1);
        }, rc = "http:" != c.location.protocol, $c = "1" == vc(), sc = !1;
        qc || Yc || (rc && !$c ? (qa("1", 1), c.location.href = "http:" + c.location.href.substring(c.location.protocol.length), sc = !0) : qa("", -1));
        rc || qa("", -1);
        sc || setTimeout(Zc, 3E3);
        if (!c.agarioNoInit) {
            var db = c.location.protocol, gb = "https:" == db;
            E.master && (EnvConfig.master_url = E.master);
            var ya = db + "//" + EnvConfig.master_url + "/", Ua = c.navigator.userAgent;
            if (-1 != Ua.indexOf("Android"))
                c.ga && c.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function () {
                    c.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io";
                }, 1E3);
            else if (-1 != Ua.indexOf("iPhone") || -1 != Ua.indexOf("iPad") || -1 != Ua.indexOf("iPod"))
                c.ga && c.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function () {
                    c.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp";
                }, 1E3);
            else {
                var m = {};
                c.agarApp = m;
                var Ab, f, O, q, u, ia = null, x = null, A = 0, B = 0, G = [], t = [], L = {}, z = [], ba = [], D = [], Y = 0, Z = 0, va = -1, wa = -1, Mc = 0, y = 0, ec = 0, N = null, ob = 0, pb = 0, qb = 1E4, rb = 1E4, r = 1, K = null, Va = !0, fa = !0, pa = !1, ub = !1, T = 0, ea = !1, Wa = !1, ib = A = ~~((ob + qb) / 2), jb = B = ~~((pb + rb) / 2), kb = 1, Ca = "", I = null, ab = !1, nb = !1, lb = 0, mb = 0, Ha = 0, Ia = 0, Qc = ["#333333", "#FF3333", "#33FF33", "#3333FF"], Bb = !1, ma = !1, Da = 0, P = 1, C = 1, ja = !1, eb = 0, fc = !0, tb = null, sb = !1, J = new Image;
                J.src = "/img/background.png";
                var gc = "ontouchstart" in c && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(c.navigator.userAgent), Cb = new Image;
                Cb.src = "/img/split.png";
                var ra = !1, sa = !1, ta = !1, Xa = !1, Hb, Ib;
                "gamepad" in E && setInterval(function () {
                    Xa && (Y = Ya.ha(Y, Hb), Z = Ya.ha(Z, Ib));
                }, 25);
                c.gamepadAxisUpdate = function (a, b) {
                    var d = .1 > b * b;
                    0 == a && (d ? Hb = q / 2 : (Hb = (b + 1) / 2 * q, Xa = !0));
                    1 == a && (d ? Ib = u / 2 : (Ib = (b + 1) / 2 * u, Xa = !0));
                };
                c.agarioInit = function () {
                    ab = !0;
                    zc();
                    yc();
                    m.core.init();
                    null != c.localStorage.settings && (w = JSON.parse(c.localStorage.settings), Wa = w.showMass, ea = w.blackTheme, fa = w.namesEnabled, pa = w.noColors, Ta = w.statsEnabled, Va = w.skinsEnabled);
                    e("#showMass").prop("checked", w.showMass);
                    e("#noSkins").prop("checked", !w.skinsEnabled);
                    e("#skipStats").prop("checked", !w.statsEnabled);
                    e("#noColors").prop("checked", w.noColors);
                    e("#noNames").prop("checked", !w.namesEnabled);
                    e("#darkTheme").prop("checked", w.blackTheme);
                    Ob();
                    setInterval(Ob, 18E4);
                    O = Ab = document.getElementById("canvas");
                    null != O && (f = O.getContext("2d"), O.onmousedown = function (a) {
                        if (gc) {
                            var b = a.clientX - (5 + q / 5 / 2), d = a.clientY - (5 + q / 5 / 2);
                            if (Math.sqrt(b * b + d * d) <= q / 5 / 2) {
                                Za();
                                return;
                            }
                        }
                        Y = 1 * a.clientX;
                        Z = 1 * a.clientY;
                        $a();
                        Ka();
                    }, O.onmousemove = function (a) {
                        Xa = !1;
                        Y = 1 * a.clientX;
                        Z = 1 * a.clientY;
                        $a();
                    }, O.onmouseup = function () {
                    }, /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", Nb, !1) : document.body.onmousewheel = Nb, c.onblur = function () {
                        X(19);
                        ta = sa = ra = !1;
                    }, c.onresize = $b, c.requestAnimationFrame(tc), setInterval(Ka, 40), K && e("#region").val(K), Qb(), za(e("#region").val()), 0 == eb && K && Q(), ua(0), $b(), c.location.hash && 6 <= c.location.hash.length && mc(c.location.hash));
                };
                var xa = null;
                c.setNick = function (a) {
                    c.ga && c.ga("send", "event", "Nick", a.toLowerCase());
                    Pb();
                    N = a;
                    Vb();
                    T = 0;
                    w.skinsEnabled = Va;
                    w.namesEnabled = fa;
                    w.noColors = pa;
                    w.blackTheme = ea;
                    w.showMass = Wa;
                    w.statsEnabled = Ta;
                    c.localStorage.settings = JSON.stringify(w);
                    Lb();
                };
                c.setSkins = function (a) {
                    Va = a;
                };
                c.setNames = function (a) {
                    fa = a;
                };
                c.setDarkTheme = function (a) {
                    ea = a;
                };
                c.setColors = function (a) {
                    pa = a;
                };
                c.setShowMass = function (a) {
                    Wa = a;
                };
                c.spectate = function () {
                    N = null;
                    Lb();
                    X(1);
                    Pb();
                };
                c.setRegion = za;
                var bb = !0;
                c.setGameMode = function (a) {
                    a != Ca && (":party" == Ca && e("#helloContainer").attr("data-party-state", "0"), ka(a), ":party" != a && Q());
                };
                c.setAcid = function (a) {
                    Bb = a;
                };
                var ad = function (a) {
                    var b = {}, d = !1, v = { skipDraw: !0, predictionModifier: 1.1 };
                    a.init = function () {
                        m.account.init();
                        m.google.xa();
                        m.fa.init();
                        (d = "debug" in c.queryString) && m.debug.showDebug();
                    };
                    a.bind = function (a, d) {
                        e(b).bind(a, d);
                    };
                    a.unbind = function (a, d) {
                        e(b).unbind(a, d);
                    };
                    a.trigger = function (a, d) {
                        e(b).trigger(a, d);
                    };
                    a.__defineGetter__("debug", function () {
                        return d;
                    });
                    a.__defineSetter__("debug", function (a) {
                        return d = a;
                    });
                    a.__defineGetter__("proxy", function () {
                        return c.MC;
                    });
                    a.__defineGetter__("config", function () {
                        return v;
                    });
                    return a;
                } ({});
                m.core = ad;
                m.cache = {};
                var bd = function (a) {
                    function b(a, b, d, c) {
                        a = a + "Canvas";
                        var g = e("<canvas>", { id: a });
                        p.append(g);
                        d = new SmoothieChart(d);
                        for (g = 0; g < b.length; g++) {
                            var v = b[g], f = _.extend(h, c[g]);
                            d.addTimeSeries(v, f);
                        }
                        d.streamTo(document.getElementById(a), 0);
                    }
                    function d(a, d) {
                        l[a] = c();
                        b(a, [l[a]], d, [{ strokeStyle: "rgba(0, 255, 0, 1)", fillStyle: "rgba(0, 255, 0, 0.2)", lineWidth: 2 }]);
                    }
                    function c() {
                        return new TimeSeries({ Ma: !1 });
                    }
                    var g = !1, p, f = !1, l = {}, h = { strokeStyle: "rgba(0, 255, 0, 1)", fillStyle: "rgba(0, 255, 0, 0.2)", lineWidth: 2 };
                    a.showDebug = function () {
                        g || (p = e("#debug-overlay"), d("networkUpdate", { name: "network updates", minValue: 0, maxValue: 120 }), d("fps", { name: "fps", minValue: 0, maxValue: 120 }), l.rttSDev = c(), l.rttMean = c(), b("rttMean", [l.rttSDev, l.rttMean], { name: "rtt", minValue: 0, maxValue: 120 }, [{ strokeStyle: "rgba(255, 0, 0, 1)", fillStyle: "rgba(0, 255, 0, 0.2)", lineWidth: 2 }, { strokeStyle: "rgba(0, 255, 0, 1)", fillStyle: "rgba(0, 255, 0, 0)", lineWidth: 2 }]), g = !0);
                        m.core.debug = !0;
                        p.show();
                    };
                    a.hideDebug = function () {
                        p.hide();
                        m.core.debug = !1;
                    };
                    a.updateChart = function (a, b, d) {
                        g && a in l && l[a].append(b, d);
                    };
                    a.__defineGetter__("showPrediction", function () {
                        return f;
                    });
                    a.__defineSetter__("showPrediction", function (a) {
                        return f = a;
                    });
                    return a;
                } ({});
                m.debug = bd;
                var la = { AF: "JP-Tokyo", AX: "EU-London", AL: "EU-London", DZ: "EU-London", AS: "SG-Singapore", AD: "EU-London", AO: "EU-London", AI: "US-Atlanta", AG: "US-Atlanta", AR: "BR-Brazil", AM: "JP-Tokyo", AW: "US-Atlanta", AU: "SG-Singapore", AT: "EU-London", AZ: "JP-Tokyo", BS: "US-Atlanta", BH: "JP-Tokyo", BD: "JP-Tokyo", BB: "US-Atlanta", BY: "EU-London", BE: "EU-London", BZ: "US-Atlanta", BJ: "EU-London", BM: "US-Atlanta", BT: "JP-Tokyo", BO: "BR-Brazil", BQ: "US-Atlanta", BA: "EU-London", BW: "EU-London", BR: "BR-Brazil", IO: "JP-Tokyo", VG: "US-Atlanta", BN: "JP-Tokyo", BG: "EU-London", BF: "EU-London", BI: "EU-London", KH: "JP-Tokyo", CM: "EU-London", CA: "US-Atlanta", CV: "EU-London", KY: "US-Atlanta", CF: "EU-London", TD: "EU-London", CL: "BR-Brazil", CN: "CN-China", CX: "JP-Tokyo", CC: "JP-Tokyo", CO: "BR-Brazil", KM: "EU-London", CD: "EU-London", CG: "EU-London", CK: "SG-Singapore", CR: "US-Atlanta", CI: "EU-London", HR: "EU-London", CU: "US-Atlanta", CW: "US-Atlanta", CY: "JP-Tokyo", CZ: "EU-London", DK: "EU-London", DJ: "EU-London", DM: "US-Atlanta", DO: "US-Atlanta", EC: "BR-Brazil", EG: "EU-London", SV: "US-Atlanta", GQ: "EU-London", ER: "EU-London", EE: "EU-London", ET: "EU-London", FO: "EU-London", FK: "BR-Brazil", FJ: "SG-Singapore", FI: "EU-London", FR: "EU-London", GF: "BR-Brazil", PF: "SG-Singapore", GA: "EU-London", GM: "EU-London", GE: "JP-Tokyo", DE: "EU-London", GH: "EU-London", GI: "EU-London", GR: "EU-London", GL: "US-Atlanta", GD: "US-Atlanta", GP: "US-Atlanta", GU: "SG-Singapore", GT: "US-Atlanta", GG: "EU-London", GN: "EU-London", GW: "EU-London", GY: "BR-Brazil", HT: "US-Atlanta", VA: "EU-London", HN: "US-Atlanta", HK: "JP-Tokyo", HU: "EU-London", IS: "EU-London", IN: "JP-Tokyo", ID: "JP-Tokyo", IR: "JP-Tokyo", IQ: "JP-Tokyo", IE: "EU-London", IM: "EU-London", IL: "JP-Tokyo", IT: "EU-London", JM: "US-Atlanta", JP: "JP-Tokyo", JE: "EU-London", JO: "JP-Tokyo", KZ: "JP-Tokyo", KE: "EU-London", KI: "SG-Singapore", KP: "JP-Tokyo", KR: "JP-Tokyo", KW: "JP-Tokyo", KG: "JP-Tokyo", LA: "JP-Tokyo", LV: "EU-London", LB: "JP-Tokyo", LS: "EU-London", LR: "EU-London", LY: "EU-London", LI: "EU-London", LT: "EU-London", LU: "EU-London", MO: "JP-Tokyo", MK: "EU-London", MG: "EU-London", MW: "EU-London", MY: "JP-Tokyo", MV: "JP-Tokyo", ML: "EU-London", MT: "EU-London", MH: "SG-Singapore", MQ: "US-Atlanta", MR: "EU-London", MU: "EU-London", YT: "EU-London", MX: "US-Atlanta", FM: "SG-Singapore", MD: "EU-London", MC: "EU-London", MN: "JP-Tokyo", ME: "EU-London", MS: "US-Atlanta", MA: "EU-London", MZ: "EU-London", MM: "JP-Tokyo", NA: "EU-London", NR: "SG-Singapore", NP: "JP-Tokyo", NL: "EU-London", NC: "SG-Singapore", NZ: "SG-Singapore", NI: "US-Atlanta", NE: "EU-London", NG: "EU-London", NU: "SG-Singapore", NF: "SG-Singapore", MP: "SG-Singapore", NO: "EU-London", OM: "JP-Tokyo", PK: "JP-Tokyo", PW: "SG-Singapore", PS: "JP-Tokyo", PA: "US-Atlanta", PG: "SG-Singapore", PY: "BR-Brazil", PE: "BR-Brazil", PH: "JP-Tokyo", PN: "SG-Singapore", PL: "EU-London", PT: "EU-London", PR: "US-Atlanta", QA: "JP-Tokyo", RE: "EU-London", RO: "EU-London", RU: "RU-Russia", RW: "EU-London", BL: "US-Atlanta", SH: "EU-London", KN: "US-Atlanta", LC: "US-Atlanta", MF: "US-Atlanta", PM: "US-Atlanta", VC: "US-Atlanta", WS: "SG-Singapore", SM: "EU-London", ST: "EU-London", SA: "EU-London", SN: "EU-London", RS: "EU-London", SC: "EU-London", SL: "EU-London", SG: "JP-Tokyo", SX: "US-Atlanta", SK: "EU-London", SI: "EU-London", SB: "SG-Singapore", SO: "EU-London", ZA: "EU-London", SS: "EU-London", ES: "EU-London", LK: "JP-Tokyo", SD: "EU-London", SR: "BR-Brazil", SJ: "EU-London", SZ: "EU-London", SE: "EU-London", CH: "EU-London", SY: "EU-London", TW: "JP-Tokyo", TJ: "JP-Tokyo", TZ: "EU-London", TH: "JP-Tokyo", TL: "JP-Tokyo", TG: "EU-London", TK: "SG-Singapore", TO: "SG-Singapore", TT: "US-Atlanta", TN: "EU-London", TR: "TK-Turkey", TM: "JP-Tokyo", TC: "US-Atlanta", TV: "SG-Singapore", UG: "EU-London", UA: "EU-London", AE: "EU-London", GB: "EU-London", US: "US-Atlanta", UM: "SG-Singapore", VI: "US-Atlanta", UY: "BR-Brazil", UZ: "JP-Tokyo", VU: "SG-Singapore", VE: "BR-Brazil", VN: "JP-Tokyo", WF: "SG-Singapore", EH: "EU-London", YE: "JP-Tokyo", ZM: "EU-London", ZW: "EU-London" }, na = 0, Ea = 0, S = null, Ba = !1, Xb;
                c.connect = fb;
                var Fa = 500, Ec = .875, Gc = .75, Hc = .25, Fc = .125, Yb = -1, Zb = -1;
                c.sendMitosis = Za;
                c.sendEject = Mb;
                m.networking = function (a) {
                    a.loginRealm = { GG: "google", FB: "facebook" };
                    a.sendMessage = function (a) {
                        if (da()) {
                            var d = a.byteView;
                            if (null != d) {
                                a = U(1 + a.length);
                                a.setUint8(0, 102);
                                for (var c = 0; c < d.length; ++c)
                                    a.setUint8(1 + c, d[c]);
                                V(a);
                            }
                        }
                    };
                    return a;
                } ({});
                var H = null, Ma = null, h = m.renderSettings = {
                    high: { warnFps: 30, simpleDraw: !1, maxDetail: 1, minDetail: .6, U: 30 }, medium: { warnFps: 30, simpleDraw: !1, maxDetail: .5, minDetail: .3, U: 25 }, low: { warnFps: 30, simpleDraw: !0, maxDetail: .3, minDetail: .2, U: 25 }, upgrade: function () {
                        h.selected == h.low ? (h.selected = h.medium, h.detail = h.medium.maxDetail) : h.selected == h.medium && (h.selected = h.high, h.detail = h.high.maxDetail);
                    }, downgrade: function () {
                        h.selected == h.high ? h.selected = h.medium : h.selected == h.medium && (h.selected = h.low);
                    }
                };
                h.selected = h.high;
                h.detail = 1;
                h.auto = !1;
                var Jb = 0, Pa = 0, Oa = 0, tc = function () {
                    var a = Date.now(), b = 1E3 / 60;
                    return function () {
                        c.requestAnimationFrame(tc);
                        var d = Date.now(), e = d - a;
                        if (e > b) {
                            a = d - e % b;
                            var g = Date.now();
                            !da() || 240 > g - Da || !m.core.config.skipDraw ? ac() : console.warn("Skipping draw");
                            cd();
                            Jb = 1E3 / e;
                            m.debug.updateChart("fps", d, Jb);
                            Jb < h.selected.warnFps ? 0 == Oa && (Pa++ , Pa > 2 * h.selected.warnFps && (h.selected.ma = !0)) : Pa = 0;
                        }
                    };
                } ();
                c.setQuality = Kc;
                var ha = {}, Rb = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump;underwood".split(";"), dd = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump;underwood".split(";"), oa = {};
                Db.prototype = { $: null, x: 0, y: 0, f: 0, b: 0 };
                var La = -1, cc = !1;
                ca.prototype = {
                    id: 0, a: null, name: null, i: null, R: null, x: 0, y: 0, size: 0, s: 0, u: 0, o: 0, ja: 0, ka: 0, g: 0, L: 0, M: 0, J: 0, K: 0, ea: 0, T: 0, ta: 0, G: !1, c: !1, h: !1, V: !0, da: 0, C: null, ia: 0, wa: !1, I: !1, ca: function () {
                        var a;
                        for (a = 0; a < z.length; a++)
                            if (z[a] == this) {
                                z.splice(a, 1);
                                break;
                            }
                        delete L[this.id];
                        a = t.indexOf(this);
                        -1 != a && (ub = !0, t.splice(a, 1));
                        a = G.indexOf(this.id);
                        -1 != a && G.splice(a, 1);
                        this.G = !0;
                        0 < this.da && ba.push(this);
                    }, m: function () {
                        return Math.max(~~(.3 * this.size), 24);
                    }, A: function (a) {
                        if (this.name = a)
                            null == this.i ? this.i = new Na(this.m(), "#FFFFFF", !0, "#000000") : this.i.O(this.m()), this.i.B(this.name);
                    }, ba: function () {
                        for (var a = this.H(); this.a.length > a;) {
                            var b = ~~(Math.random() * this.a.length);
                            this.a.splice(b, 1);
                        }
                        for (0 == this.a.length && 0 < a && this.a.push(new Db(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;)
                            b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new Db(this, b.x, b.y, b.f, b.b));
                    }, H: function () {
                        var a = 10;
                        20 > this.size && (a = 0);
                        this.c && (a = m.renderSettings.selected.U);
                        var b = this.size;
                        this.c || (b *= r);
                        b *= h.detail;
                        return ~~Math.max(b, a);
                    }, Da: function () {
                        this.ba();
                        for (var a = this.a, b = a.length, d = this, c = this.c ? 0 : (this.id / 1E3 + y / 1E4) % (2 * Math.PI), e = 0, p = 0; p < b; ++p) {
                            var f = a[(p - 1 + b) % b].b, l = a[(p + 1) % b].b, h = a[p];
                            h.b += (Math.random() - .5) * (this.h ? 3 : 1);
                            h.b *= .7;
                            10 < h.b && (h.b = 10);
                            -10 > h.b && (h.b = -10);
                            h.b = (f + l + 8 * h.b) / 10;
                            var n = h.f, f = a[(p - 1 + b) % b].f, l = a[(p + 1) % b].f;
                            if (15 < this.size && null != ia && 20 < this.size * r && 0 < this.id) {
                                var k = !1, m = h.x, q = h.y;
                                ia.Ga(m - 5, q - 5, 10, 10, function (a) {
                                    a.$ != d && 25 > (m - a.x) * (m - a.x) + (q - a.y) * (q - a.y) && (k = !0);
                                });
                                !k && (h.x < ob || h.y < pb || h.x > qb || h.y > rb) && (k = !0);
                                k && (0 < h.b && (h.b = 0), --h.b);
                            }
                            n += h.b;
                            0 > n && (n = 0);
                            n = this.h ? (19 * n + this.size) / 20 : (12 * n + this.size) / 13;
                            h.f = (f + l + 8 * n) / 10;
                            f = 2 * Math.PI / b;
                            l = h.f;
                            this.c && 0 == p % 2 && (l += 5);
                            h.x = this.x + Math.cos(f * p + c) * l;
                            h.y = this.y + Math.sin(f * p + c) * l;
                            e = Math.max(e, l);
                        }
                        this.ia = e;
                    }, pa: function (a, b) {
                        this.L = a;
                        this.M = b;
                        this.J = a;
                        this.K = b;
                        this.ja = a;
                        this.ka = b;
                    }, S: function () {
                        if (0 >= this.id)
                            return 1;
                        var a = Ya.ra((y - this.T) / 120, 0, 1);
                        if (this.G && 1 <= a) {
                            var b = ba.indexOf(this);
                            -1 != b && ba.splice(b, 1);
                        }
                        this.x = a * (this.ja - this.s) + this.s;
                        this.y = a * (this.ka - this.u) + this.u;
                        this.size = a * (this.g - this.o) + this.o;
                        .01 > Math.abs(this.size - this.g) && (this.size = this.g);
                        return a;
                    }, P: function () {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < A - q / 2 / r || this.y + this.size + 40 < B - u / 2 / r || this.x - this.size - 40 > A + q / 2 / r || this.y - this.size - 40 > B + u / 2 / r ? !1 : !0;
                    }, sa: function (a) {
                        a.beginPath();
                        var b = this.H();
                        a.moveTo(this.a[0].x, this.a[0].y);
                        for (var d = 1; d <= b; ++d) {
                            var c = d % b;
                            a.lineTo(this.a[c].x, this.a[c].y);
                        }
                        a.closePath();
                        a.stroke();
                    }, w: function (a) {
                        if (this.P()) {
                            ++this.da;
                            var b = 0 < this.id && !this.c && !this.h && .4 > r || h.selected.simpleDraw && !this.c;
                            5 > this.H() && 0 < this.id && (b = !0);
                            if (this.V && !b)
                                for (var d = 0; d < this.a.length; d++)
                                    this.a[d].f = this.size;
                            this.V = b;
                            a.save();
                            this.ta = y;
                            d = this.S();
                            this.G && (a.globalAlpha *= 1 - d);
                            a.lineWidth = 10;
                            a.lineCap = "round";
                            a.lineJoin = this.c ? "miter" : "round";
                            var e = this.name.toLowerCase(), g = null, p = null, d = !1, f = this.color, l = !1;
                            this.h || !Va || sb || (-1 != Rb.indexOf(e) ? (ha.hasOwnProperty(e) || (ha[e] = new Image, ha[e].src = c.ASSETS_ROOT + "skins/" + e + ".png"), g = 0 != ha[e].width && ha[e].complete ? ha[e] : null) : g = null, null != g ? -1 != dd.indexOf(e) && (d = !0) : (this.I && "%starball" == this.C && "shenron" == e && 7 <= t.length && (cc = d = !0, p = hc("%starball1")), g = hc(this.C), null != g && (l = !0, f = Rc(this.C) || f)));
                            m.core.debug && m.debug.showPrediction && this.I && (a.strokeStyle = "#0000FF", a.beginPath(), a.arc(this.L, this.M, this.size + 5, 0, 2 * Math.PI, !1), a.closePath(), a.stroke(), a.strokeStyle = "#00FF00", a.beginPath(), a.arc(this.J, this.K, this.size + 5, 0, 2 * Math.PI, !1), a.closePath(), a.stroke());
                            pa && !sb ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = f, a.strokeStyle = f);
                            b ? (a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1), a.closePath()) : (this.Da(), this.sa(a));
                            l || a.fill();
                            null != g && (this.na(a, g), null != p && this.na(a, p, { alpha: Math.sin(.0174 * La) }));
                            (pa || 20 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            e = -1 != t.indexOf(this);
                            b = ~~this.y;
                            0 != this.id && (fa || e) && this.name && this.i && !d && (g = this.i, g.B(this.name), g.O(this.m()), d = 0 >= this.id ? 1 : Math.ceil(10 * r) / 10, g.oa(d), g = g.N(), p = Math.ceil(g.width / d), f = Math.ceil(g.height / d), a.drawImage(g, ~~this.x - ~~(p / 2), b - ~~(f / 2), p, f), b += g.height / 2 / d + 4);
                            0 < this.id && Wa && (e || 0 == t.length && (!this.c || this.h) && 20 < this.size) && (null == this.R && (this.R = new Na(this.m() / 2, "#FFFFFF", !0, "#000000")), e = this.R, e.O(this.m() / 2), e.B(~~(this.size * this.size / 100)), d = Math.ceil(10 * r) / 10, e.oa(d), g = e.N(), p = Math.ceil(g.width / d), f = Math.ceil(g.height / d), a.drawImage(g, ~~this.x - ~~(p / 2), b - ~~(f / 2), p, f));
                            a.restore();
                        }
                    }, na: function (a, b, d) {
                        a.save();
                        a.clip();
                        var c = Math.max(this.size, this.ia);
                        null != d && null != d.alpha && (a.globalAlpha = d.alpha);
                        a.drawImage(b, this.x - c - 5, this.y - c - 5, 2 * c + 10, 2 * c + 10);
                        a.restore();
                    }
                };
                var Ya = function (a) {
                    function b(a, b, c) {
                        return a < b ? b : a > c ? c : a;
                    }
                    a.ha = function (a, c) {
                        var e;
                        e = b(.5, 0, 1);
                        return a + e * (c - a);
                    };
                    a.ra = b;
                    a.fixed = function (a, b) {
                        var c = Math.pow(10, b);
                        return ~~(a * c) / c;
                    };
                    return a;
                } ({});
                c.Maths = Ya;
                var hb = function (a) {
                    a.la = function () {
                        for (var a = new Date, d = [a.getMonth() + 1, a.getDate(), a.getFullYear()], a = [a.getHours(), a.getMinutes(), a.getSeconds()], c = 1; 3 > c; c++)
                            10 > a[c] && (a[c] = "0" + a[c]);
                        return "[" + d.join("/") + " " + a.join(":") + "]";
                    };
                    return a;
                } ({});
                c.Utils = hb;
                Na.prototype = {
                    F: "", W: "#000000", Y: !1, Z: "#000000", v: 16, j: null, X: null, l: !1, D: 1, O: function (a) {
                        this.v != a && (this.v = a, this.l = !0);
                    }, oa: function (a) {
                        this.D != a && (this.D = a, this.l = !0);
                    }, B: function (a) {
                        a != this.F && (this.F = a, this.l = !0);
                    }, N: function () {
                        null == this.j && (this.j = document.createElement("canvas"), this.X = this.j.getContext("2d"));
                        if (this.l) {
                            this.l = !1;
                            var a = this.j, b = this.X, c = this.F, e = this.D, g = this.v, f = g + "px Ubuntu";
                            b.font = f;
                            var h = ~~(.2 * g);
                            a.width = (b.measureText(c).width + 6) * e;
                            a.height = (g + h) * e;
                            b.font = f;
                            b.scale(e, e);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this.Z;
                            b.fillStyle = this.W;
                            this.Y && b.strokeText(c, 3, g - h / 2);
                            b.fillText(c, 3, g - h / 2);
                        }
                        return this.j;
                    }
                };
                Date.now || (Date.now = function () {
                    return (new Date).getTime();
                });
                (function () {
                    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !c.requestAnimationFrame; ++b)
                        c.requestAnimationFrame = c[a[b] + "RequestAnimationFrame"], c.cancelAnimationFrame = c[a[b] + "CancelAnimationFrame"] || c[a[b] + "CancelRequestAnimationFrame"];
                    c.requestAnimationFrame || (c.requestAnimationFrame = function (a) {
                        return setTimeout(a, 1E3 / 60);
                    }, c.cancelAnimationFrame = function (a) {
                        clearTimeout(a);
                    });
                })();
                var xc = {
                    init: function (a) {
                        function b(a) {
                            a < e && (a = e);
                            a > f && (a = f);
                            return ~~((a - e) / 32);
                        }
                        function c(a) {
                            a < g && (a = g);
                            a > h && (a = h);
                            return ~~((a - g) / 32);
                        }
                        var e = a.Ba, g = a.Ca, f = a.za, h = a.Aa, l = ~~((f - e) / 32) + 1, k = ~~((h - g) / 32) + 1, n = Array(l * k);
                        return {
                            va: function (a) {
                                var e = b(a.x) + c(a.y) * l;
                                null == n[e] ? n[e] = a : Array.isArray(n[e]) ? n[e].push(a) : n[e] = [n[e], a];
                            }, Ga: function (a, e, g, f, h) {
                                var p = b(a), v = c(e);
                                a = b(a + g);
                                e = c(e + f);
                                if (0 > p || p >= l || 0 > v || v >= k)
                                    debugger;
                                for (; v <= e; ++v)
                                    for (f = p; f <= a; ++f)
                                        if (g = n[f + v * l], null != g)
                                            if (Array.isArray(g))
                                                for (var m = 0; m < g.length; m++)
                                                    h(g[m]);
                                            else
                                                h(g);
                            }
                        };
                    }
                }, Wb = function () {
                    var a = new ca(0, 0, 0, 32, "#ED1C24", ""), b = document.createElement("canvas");
                    b.width = 32;
                    b.height = 32;
                    var c = b.getContext("2d");
                    return function () {
                        0 < t.length && (a.color = t[0].color, a.A(t[0].name));
                        c.clearRect(0, 0, 32, 32);
                        c.save();
                        c.translate(16, 16);
                        c.scale(.4, .4);
                        a.w(c);
                        c.restore();
                        var e = document.getElementById("favicon"), g = e.cloneNode(!0);
                        g.setAttribute("href", b.toDataURL("image/png"));
                        e.parentNode.replaceChild(g, e);
                    };
                } ();
                e(function () {
                    Wb();
                });
                var Qa = { context: null, defaultProvider: "facebook", loginIntent: "0", userInfo: { socialToken: null, tokenExpires: "", level: "", xp: "", xpNeeded: "", name: "", picture: "", displayName: "", loggedIn: "0", socialId: "" } }, k = c.defaultSt = Qa;
                c.storageInfo = k;
                c.createDefaultStorage = Tc;
                c.updateStorage = Ra;
                e(function () {
                    null != c.localStorage.storeObjectInfo && (k = JSON.parse(c.localStorage.storeObjectInfo));
                    "1" == k.loginIntent && ic(k.context);
                    "" == k.userInfo.name && "" == k.userInfo.displayName || jc(k.userInfo);
                });
                c.checkLoginStatus = function () {
                    "1" == k.loginIntent && (Sa(), ic(k.context));
                };
                var Sa = function () {
                    c.MC.setProfilePicture(k.userInfo.picture);
                    c.MC.setSocialId(k.userInfo.socialId);
                };
                c.logout = function () {
                    k = Qa;
                    delete c.localStorage.storeObjectInfo;
                    c.localStorage.storeObjectInfo = JSON.stringify(Qa);
                    Ra();
                    uc();
                    m.cache.sentGameServerLogin = !1;
                    delete m.cache.login_info;
                    e("#helloContainer").attr("data-logged-in", "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    e(".timer").text("");
                    e("#gPlusShare").hide();
                    e("#fbShare").show();
                    e("#user-id-tag").text("");
                    Q();
                    c.MC.doLogout();
                };
                c.toggleSocialLogin = function () {
                    e("#socialLoginContainer").toggle();
                    e("#settings").hide();
                    e("#instructions").hide();
                    Eb();
                };
                c.toggleSettings = function () {
                    e("#settings").toggle();
                    e("#socialLoginContainer").hide();
                    e("#instructions").hide();
                    Eb();
                };
                m.account = function (a) {
                    function b() {
                    }
                    function d(a, b) {
                        if (null == f || f.id != b.id)
                            f = b, null != c.ssa_json && (c.ssa_json.applicationUserId = "" + b.id, c.ssa_json.custom_user_id = "" + b.id), "undefined" != typeof SSA_CORE && SSA_CORE.start();
                    }
                    var f = null;
                    a.init = function () {
                        m.core.bind("user_login", d);
                        m.core.bind("user_logout", b);
                    };
                    a.setUserData = function (a) {
                        jc(a);
                    };
                    a.setAccountData = function (a, b) {
                        var c = e("#helloContainer").attr("data-has-account-data", "1");
                        k.userInfo.xp = a.xp;
                        k.userInfo.xpNeeded = a.xpNeeded;
                        k.userInfo.level = a.level;
                        Ra();
                        c && b ? ga(a) : (e(".agario-profile-panel .progress-bar-star").text(a.level), e(".agario-exp-bar .progress-bar-text").text(a.xp + "/" + a.xpNeeded + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.xp / a.xpNeeded).toFixed(2) + "%"));
                    };
                    a.Ia = function (a) {
                        ga(a);
                    };
                    return a;
                } ({});
                var lc = 0;
                c.fbAsyncInit = function () {
                    function a() {
                        null == c.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : (k.loginIntent = "1", c.updateStorage(), c.FB.login(function (a) {
                            kc(a);
                        }, { scope: "public_profile, email" }));
                    }
                    c.FB.init({ appId: EnvConfig.fb_app_id, cookie: !0, xfbml: !0, status: !0, version: "v2.2" });
                    ("1" == c.storageInfo.loginIntent && "facebook" == c.storageInfo.context || qc) && c.FB.getLoginStatus(function (b) {
                        "connected" === b.status ? kc(b) : "not_authorized" === b.status ? (c.logout(), a()) : c.logout();
                    });
                    c.facebookRelogin = a;
                    c.facebookLogin = a;
                };
                var Kb = !1;
                (function (a) {
                    function b() {
                        var a = document.createElement("script");
                        a.type = "text/javascript";
                        a.async = !0;
                        a.src = "//apis.google.com/js/client:platform.js?onload=gapiAsyncInit";
                        var b = document.getElementsByTagName("script")[0];
                        b.parentNode.insertBefore(a, b);
                        f = !0;
                    }
                    var d = {}, f = !1;
                    c.gapiAsyncInit = function () {
                        e(d).trigger("initialized");
                    };
                    a.google = {
                        xa: function () {
                            b();
                        }, ua: function (a, b) {
                            c.gapi.client.load("plus", "v1", function () {
                                console.log("fetching me profile");
                                gapi.client.plus.people.get({ userId: "me" }).execute(function (a) {
                                    b(a);
                                });
                            });
                        }
                    };
                    a.Fa = function (a) {
                        f || b();
                        "undefined" !== typeof gapi ? a() : e(d).bind("initialized", a);
                    };
                    return a;
                })(m);
                var ed = function (a) {
                    function b(a) {
                        c.MC.doLoginWithGPlus(a);
                        m.cache.login_info = [a, "google"];
                    }
                    function d(a) {
                        k.userInfo.picture = a;
                        e(".agario-profile-picture").attr("src", a);
                    }
                    var f = null, g = { client_id: EnvConfig.gplus_client_id, cookie_policy: "single_host_origin", scope: "profile email" };
                    a.fa = {
                        qa: function () {
                            return f;
                        }, init: function () {
                            var a = this, b = k && "1" == k.loginIntent && "google" == k.context;
                            m.Fa(function () {
                                c.gapi.ytsubscribe.go("agarYoutube");
                                c.gapi.load("auth2", function () {
                                    f = c.gapi.auth2.init(g);
                                    f.attachClickHandler(document.getElementById("gplusLogin"), {}, function (a) {
                                        console.log("googleUser : " + a);
                                    }, function (a) {
                                        console.log("failed to login in google plus: ", JSON.stringify(a, void 0, 2));
                                    });
                                    f.currentUser.listen(_.bind(a.Ea, a));
                                    b && 1 == f.isSignedIn.get() && f.signIn();
                                });
                            });
                        }, Ea: function (a) {
                            if (f && a && f.isSignedIn.get() && !Kb) {
                                Kb = !0;
                                k.loginIntent = "1";
                                var e = a.getAuthResponse(), g = e.access_token;
                                c.qa = e;
                                console.log("loggedIn with G+!");
                                var h = a.getBasicProfile();
                                a = h.getImageUrl();
                                void 0 == a ? m.google.ua(e, function (a) {
                                    a.result.isPlusUser ? (a && d(a.image.url), b(g), a && (k.userInfo.picture = a.image.url), k.userInfo.socialId = h.getId(), Sa()) : (alert("Please add Google+ to your Google account and try again.\nOr you can login with another account."), c.logout());
                                }) : (d(a), k.userInfo.picture = a, k.userInfo.socialId = h.getId(), Sa(), b(g));
                                k.context = "google";
                                c.updateStorage();
                            }
                        }, ya: function () {
                            f && (f.signOut(), Kb = !1);
                        }
                    };
                    return a;
                } (m);
                c.gplusModule = ed;
                var uc = function () {
                    m.fa.ya();
                };
                c.logoutGooglePlus = uc;
                var cd = function () {
                    function a(a, b, c, d, e) {
                        var f = b.getContext("2d"), g = b.width;
                        b = b.height;
                        a.color = e;
                        a.A(c);
                        a.size = d;
                        f.save();
                        f.translate(g / 2, b / 2);
                        a.w(f);
                        f.restore();
                    }
                    for (var b = new ca(-1, 0, 0, 32, "#5bc0de", ""), c = new ca(-1, 0, 0, 32, "#5bc0de", ""), f = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), g = [], h = 0; h < f.length; ++h) {
                        var k = h / f.length * 12, l = 30 * Math.sqrt(h / f.length);
                        g.push(new ca(-1, Math.cos(k) * l, Math.sin(k) * l, 10, f[h], ""));
                    }
                    Sc(g);
                    var m = document.createElement("canvas");
                    m.getContext("2d");
                    m.width = m.height = 70;
                    a(c, m, "", 26, "#ebc0de");
                    return function () {
                        e(".cell-spinner").filter(":visible").each(function () {
                            var c = e(this), d = Date.now(), f = this.width, g = this.height, h = this.getContext("2d");
                            h.clearRect(0, 0, f, g);
                            h.save();
                            h.translate(f / 2, g / 2);
                            for (var k = 0; 10 > k; ++k)
                                h.drawImage(m, (.1 * d + 80 * k) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                            h.restore();
                            (c = c.attr("data-itr")) && (c = R(c));
                            a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de");
                        });
                        e("#statsPellets").filter(":visible").each(function () {
                            e(this);
                            var b = this.width, c = this.height;
                            this.getContext("2d").clearRect(0, 0, b, c);
                            for (b = 0; b < g.length; b++)
                                a(g[b], this, "", g[b].size, g[b].color);
                        });
                    };
                } ();
                c.createParty = function () {
                    ka(":party");
                    S = function (a) {
                        Fb("/#" + c.encodeURIComponent(a));
                        e(".partyToken").val("agar.io/#" + c.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1");
                    };
                    Q();
                };
                c.joinParty = mc;
                c.cancelParty = function () {
                    Fb("/");
                    e("#helloContainer").attr("data-party-state", "0");
                    ka("");
                    Q();
                };
                var F = [], wb = 0, xb = "#000000", aa = !1, Aa = !1, Ja = 0, Gb = 0, zb = 0, yb = 0, W = 0, Ta = !0;
                c.onPlayerDeath = Ga;
                setInterval(function () {
                    Aa && F.push(dc() / 100);
                }, 1E3 / 60);
                setInterval(function () {
                    var a = Vc();
                    0 != a && (++zb, 0 == W && (W = a), W = Math.min(W, a));
                }, 1E3);
                c.closeStats = function () {
                    aa = !1;
                    e("#stats").hide();
                    c.destroyAd(c.adSlots.ab);
                    ua(0);
                };
                c.setSkipStats = function (a) {
                    Ta = !a;
                };
                c.getStatsString = oc;
                c.gPlusShare = Xc;
                c.twitterShareStats = function () {
                    var a = c.getStatsString("tt_share_stats");
                    c.open("https://twitter.com/intent/tweet?text=" + a, "Agar.io", "width=660,height=310,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=" + (c.screenX + c.innerWidth / 2 - 330) + ",top=" + (c.innerHeight - 310) / 2);
                };
                c.fbShareStats = function () {
                    var a = c.getStatsString("fb_matchresults_subtitle");
                    c.FB.ui({ method: "feed", display: "iframe", name: R("fb_matchresults_title"), caption: R("fb_matchresults_description"), description: a, link: "http://agar.io", La: "http://static2.miniclipcdn.com/mobile/agar/Agar.io_matchresults_fb_1200x630.png", Ha: { name: "play now!", link: "http://agar.io" } });
                };
                c.fillSocialValues = function (a, b) {
                    1 == c.isChrome && "google" == c.storageInfo.context && c.gapi.interactivepost.render(b, { contenturl: EnvConfig.game_url, clientid: EnvConfig.gplus_client_id, cookiepolicy: "http://agar.io", prefilltext: a, calltoactionlabel: "BEAT", calltoactionurl: EnvConfig.game_url });
                };
                e(function () {
                    "MAsyncInit" in c && c.MAsyncInit();
                });
            }
        }
    }
})(window, window.jQuery);
