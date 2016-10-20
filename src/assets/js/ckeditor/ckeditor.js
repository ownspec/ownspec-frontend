﻿/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
 */
(function () {
    window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function () {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, e = {
            timestamp: "G846",
            version: "4.5.11 (Full)",
            revision: "60d4db9",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {pending: [], basePathSrcPattern: a},
            status: "unloaded",
            basePath: function () {
                var b = window.CKEDITOR_BASEPATH || "";
                if (!b)for (var c = document.getElementsByTagName("script"), e = 0; e < c.length; e++) {
                    var f = c[e].src.match(a);
                    if (f) {
                        b = f[1];
                        break
                    }
                }
                -1 == b.indexOf(":/") && "//" !=
                b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
                if (!b)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return b
            }(),
            getUrl: function (a) {
                -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
                return a
            },
            domReady: function () {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (f) {
                    }
                }

                function b() {
                    for (var a; a = c.shift();)a()
                }

                var c = [];
                return function (b) {
                    function h() {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (g) {
                            setTimeout(h, 1);
                            return
                        }
                        a()
                    }

                    c.push(b);
                    "complete" === document.readyState && setTimeout(a, 1);
                    if (1 == c.length)if (document.addEventListener)document.addEventListener("DOMContentLoaded",
                        a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", a);
                        window.attachEvent("onload", a);
                        b = !1;
                        try {
                            b = !window.frameElement
                        } catch (k) {
                        }
                        document.documentElement.doScroll && b && h()
                    }
                }
            }()
        }, b = window.CKEDITOR_GETURL;
        if (b) {
            var c = e.getUrl;
            e.getUrl = function (a) {
                return b.call(e, a) || c.call(e, a)
            }
        }
        return e
    }()), CKEDITOR.event || (CKEDITOR.event = function () {
    }, CKEDITOR.event.implementOn = function (a) {
        var e = CKEDITOR.event.prototype, b;
        for (b in e)null == a[b] && (a[b] = e[b])
    },
        CKEDITOR.event.prototype = function () {
            function a(a) {
                var d = e(this);
                return d[a] || (d[a] = new b(a))
            }

            var e = function (a) {
                a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                return a.events || (a.events = {})
            }, b = function (a) {
                this.name = a;
                this.listeners = []
            };
            b.prototype = {
                getListenerIndex: function (a) {
                    for (var b = 0, e = this.listeners; b < e.length; b++)if (e[b].fn == a)return b;
                    return -1
                }
            };
            return {
                define: function (b, d) {
                    var e = a.call(this, b);
                    CKEDITOR.tools.extend(e, d, !0)
                }, on: function (b, d, e, m, f) {
                    function h(a, g, f, h) {
                        a = {
                            name: b, sender: this, editor: a,
                            data: g, listenerData: m, stop: f, cancel: h, removeListener: k
                        };
                        return !1 === d.call(e, a) ? !1 : a.data
                    }

                    function k() {
                        n.removeListener(b, d)
                    }

                    var g = a.call(this, b);
                    if (0 > g.getListenerIndex(d)) {
                        g = g.listeners;
                        e || (e = this);
                        isNaN(f) && (f = 10);
                        var n = this;
                        h.fn = d;
                        h.priority = f;
                        for (var p = g.length - 1; 0 <= p; p--)if (g[p].priority <= f)return g.splice(p + 1, 0, h), {removeListener: k};
                        g.unshift(h)
                    }
                    return {removeListener: k}
                }, once: function () {
                    var a = Array.prototype.slice.call(arguments), b = a[1];
                    a[1] = function (a) {
                        a.removeListener();
                        return b.apply(this,
                            arguments)
                    };
                    return this.on.apply(this, a)
                }, capture: function () {
                    CKEDITOR.event.useCapture = 1;
                    var a = this.on.apply(this, arguments);
                    CKEDITOR.event.useCapture = 0;
                    return a
                }, fire: function () {
                    var a = 0, b = function () {
                        a = 1
                    }, l = 0, m = function () {
                        l = 1
                    };
                    return function (f, h, k) {
                        var g = e(this)[f];
                        f = a;
                        var n = l;
                        a = l = 0;
                        if (g) {
                            var p = g.listeners;
                            if (p.length)for (var p = p.slice(0), u, v = 0; v < p.length; v++) {
                                if (g.errorProof)try {
                                    u = p[v].call(this, k, h, b, m)
                                } catch (t) {
                                } else u = p[v].call(this, k, h, b, m);
                                !1 === u ? l = 1 : "undefined" != typeof u && (h = u);
                                if (a || l)break
                            }
                        }
                        h =
                            l ? !1 : "undefined" == typeof h ? !0 : h;
                        a = f;
                        l = n;
                        return h
                    }
                }(), fireOnce: function (a, b, l) {
                    b = this.fire(a, b, l);
                    delete e(this)[a];
                    return b
                }, removeListener: function (a, b) {
                    var l = e(this)[a];
                    if (l) {
                        var m = l.getListenerIndex(b);
                        0 <= m && l.listeners.splice(m, 1)
                    }
                }, removeAllListeners: function () {
                    var a = e(this), b;
                    for (b in a)delete a[b]
                }, hasListeners: function (a) {
                    return (a = e(this)[a]) && 0 < a.listeners.length
                }
            }
        }()), CKEDITOR.editor || (CKEDITOR.editor = function () {
        CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire =
        function (a, e) {
            a in {instanceReady: 1, loaded: 1} && (this[a] = !0);
            return CKEDITOR.event.prototype.fire.call(this, a, e, this)
        }, CKEDITOR.editor.prototype.fireOnce = function (a, e) {
        a in {instanceReady: 1, loaded: 1} && (this[a] = !0);
        return CKEDITOR.event.prototype.fireOnce.call(this, a, e, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
        var a = navigator.userAgent.toLowerCase(), e = a.match(/edge[ \/](\d+.?\d*)/), b = -1 < a.indexOf("trident/"), b = !(!e && !b), b = {
            ie: b,
            edge: !!e,
            webkit: !b &&
            -1 < a.indexOf(" applewebkit/"),
            air: -1 < a.indexOf(" adobeair/"),
            mac: -1 < a.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
            mobile: -1 < a.indexOf("mobile"),
            iOS: /(ipad|iphone|ipod)/.test(a),
            isCustomDomain: function () {
                if (!this.ie)return !1;
                var a = document.domain, b = window.location.hostname;
                return a != b && a != "[" + b + "]"
            },
            secure: "https:" == location.protocol
        };
        b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
        b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
        var c = 0;
        b.ie && (c = e ? parseFloat(e[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
        b.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), c = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
        b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
        b.version = c;
        b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit &&
            534 > c);
        b.hidpi = 2 <= window.devicePixelRatio;
        b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
        b.needsNbspFiller = b.ie && 11 > c;
        b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
        b.quirks && (b.cssClass += " cke_browser_quirks");
        b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
        b.air && (b.cssClass += " cke_browser_air");
        b.iOS && (b.cssClass += " cke_browser_ios");
        b.hidpi && (b.cssClass += " cke_hidpi");
        return b
    }()), "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function () {
            if ("basic_ready" != CKEDITOR.status)CKEDITOR.loadFullCore._load = 1; else {
                delete CKEDITOR.loadFullCore;
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(a)
            }
        };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function (a) {
            (this._.pending || (this._.pending = [])).push(a)
        };
        (function () {
            CKEDITOR.domReady(function () {
                var a = CKEDITOR.loadFullCore, e = CKEDITOR.loadFullCoreTimeout;
                a && (CKEDITOR.status =
                    "basic_ready", a && a._load ? a() : e && setTimeout(function () {
                    CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                }, 1E3 * e))
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function (a, e) {
        CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
            type: "warn",
            errorCode: a,
            additionalData: e
        })
    }, CKEDITOR.error = function (a, e) {
        CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log",
            {type: "error", errorCode: a, additionalData: e})
    }, CKEDITOR.on("log", function (a) {
        if (window.console && window.console.log) {
            var e = console[a.data.type] ? a.data.type : "log", b = a.data.errorCode;
            if (a = a.data.additionalData)console[e]("[CKEDITOR] Error code: " + b + ".", a); else console[e]("[CKEDITOR] Error code: " + b + ".");
            console[e]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" + b)
        }
    }, null, null, 999), CKEDITOR.dom = {}, function () {
        var a = [], e = CKEDITOR.env.gecko ? "-moz-" :
            CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", b = /&/g, c = />/g, d = /</g, l = /"/g, m = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, f = {
            lt: "\x3c",
            gt: "\x3e",
            amp: "\x26",
            quot: '"',
            nbsp: " ",
            shy: "­"
        }, h = function (a, g) {
            return "#" == g[0] ? String.fromCharCode(parseInt(g.slice(1), 10)) : f[g]
        };
        CKEDITOR.on("reset", function () {
            a = []
        });
        CKEDITOR.tools = {
            arrayCompare: function (a, g) {
                if (!a && !g)return !0;
                if (!a || !g || a.length != g.length)return !1;
                for (var b = 0; b < a.length; b++)if (a[b] != g[b])return !1;
                return !0
            },
            getIndex: function (a, g) {
                for (var b =
                    0; b < a.length; ++b)if (g(a[b]))return b;
                return -1
            },
            clone: function (a) {
                var g;
                if (a && a instanceof Array) {
                    g = [];
                    for (var b = 0; b < a.length; b++)g[b] = CKEDITOR.tools.clone(a[b]);
                    return g
                }
                if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a)return a;
                g = new a.constructor;
                for (b in a)g[b] = CKEDITOR.tools.clone(a[b]);
                return g
            },
            capitalize: function (a, g) {
                return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase())
            },
            extend: function (a) {
                var g = arguments.length, b, f;
                "boolean" == typeof(b = arguments[g - 1]) ? g-- : "boolean" == typeof(b = arguments[g - 2]) && (f = arguments[g - 1], g -= 2);
                for (var c = 1; c < g; c++) {
                    var h = arguments[c], d;
                    for (d in h)if (!0 === b || null == a[d])if (!f || d in f)a[d] = h[d]
                }
                return a
            },
            prototypedCopy: function (a) {
                var g = function () {
                };
                g.prototype = a;
                return new g
            },
            copy: function (a) {
                var g = {}, b;
                for (b in a)g[b] = a[b];
                return g
            },
            isArray: function (a) {
                return "[object Array]" == Object.prototype.toString.call(a)
            },
            isEmpty: function (a) {
                for (var g in a)if (a.hasOwnProperty(g))return !1;
                return !0
            },
            cssVendorPrefix: function (a, g, b) {
                if (b)return e + a + ":" + g + ";" + a + ":" + g;
                b = {};
                b[a] = g;
                b[e + a] = g;
                return b
            },
            cssStyleToDomStyle: function () {
                var a = document.createElement("div").style, g = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
                return function (a) {
                    return "float" == a ? g : a.replace(/-./g, function (a) {
                        return a.substr(1).toUpperCase()
                    })
                }
            }(),
            buildStyleHtml: function (a) {
                a = [].concat(a);
                for (var g, b = [], f = 0; f < a.length; f++)if (g = a[f])/@import|[{}]/.test(g) ? b.push("\x3cstyle\x3e" +
                    g + "\x3c/style\x3e") : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + g + '"\x3e');
                return b.join("")
            },
            htmlEncode: function (a) {
                return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(d, "\x26lt;")
            },
            htmlDecode: function (a) {
                return a.replace(m, h)
            },
            htmlEncodeAttr: function (a) {
                return CKEDITOR.tools.htmlEncode(a).replace(l, "\x26quot;")
            },
            htmlDecodeAttr: function (a) {
                return CKEDITOR.tools.htmlDecode(a)
            },
            transformPlainTextToHtml: function (a, g) {
                var b = g == CKEDITOR.ENTER_BR,
                    f = this.htmlEncode(a.replace(/\r\n/g, "\n")), f = f.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), c = g == CKEDITOR.ENTER_P ? "p" : "div";
                if (!b) {
                    var h = /\n{2}/g;
                    if (h.test(f))var d = "\x3c" + c + "\x3e", e = "\x3c/" + c + "\x3e", f = d + f.replace(h, function () {
                            return e + d
                        }) + e
                }
                f = f.replace(/\n/g, "\x3cbr\x3e");
                b || (f = f.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + c + "\x3e)"), function (a) {
                    return CKEDITOR.tools.repeat(a, 2)
                }));
                f = f.replace(/^ | $/g, "\x26nbsp;");
                return f = f.replace(/(>|\s) /g, function (a, g) {
                    return g + "\x26nbsp;"
                }).replace(/ (?=<)/g,
                    "\x26nbsp;")
            },
            getNextNumber: function () {
                var a = 0;
                return function () {
                    return ++a
                }
            }(),
            getNextId: function () {
                return "cke_" + this.getNextNumber()
            },
            getUniqueId: function () {
                for (var a = "e", g = 0; 8 > g; g++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                return a
            },
            override: function (a, g) {
                var b = g(a);
                b.prototype = a.prototype;
                return b
            },
            setTimeout: function (a, g, b, f, c) {
                c || (c = window);
                b || (b = c);
                return c.setTimeout(function () {
                    f ? a.apply(b, [].concat(f)) : a.apply(b)
                }, g || 0)
            },
            trim: function () {
                var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (g) {
                    return g.replace(a, "")
                }
            }(),
            ltrim: function () {
                var a = /^[ \t\n\r]+/g;
                return function (g) {
                    return g.replace(a, "")
                }
            }(),
            rtrim: function () {
                var a = /[ \t\n\r]+$/g;
                return function (g) {
                    return g.replace(a, "")
                }
            }(),
            indexOf: function (a, g) {
                if ("function" == typeof g)for (var b = 0, f = a.length; b < f; b++) {
                    if (g(a[b]))return b
                } else {
                    if (a.indexOf)return a.indexOf(g);
                    b = 0;
                    for (f = a.length; b < f; b++)if (a[b] === g)return b
                }
                return -1
            },
            search: function (a, g) {
                var b = CKEDITOR.tools.indexOf(a, g);
                return 0 <= b ? a[b] : null
            },
            bind: function (a,
                            g) {
                return function () {
                    return a.apply(g, arguments)
                }
            },
            createClass: function (a) {
                var g = a.$, b = a.base, f = a.privates || a._, c = a.proto;
                a = a.statics;
                !g && (g = function () {
                    b && this.base.apply(this, arguments)
                });
                if (f)var h = g, g = function () {
                    var a = this._ || (this._ = {}), g;
                    for (g in f) {
                        var b = f[g];
                        a[g] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b
                    }
                    h.apply(this, arguments)
                };
                b && (g.prototype = this.prototypedCopy(b.prototype), g.prototype.constructor = g, g.base = b, g.baseProto = b.prototype, g.prototype.base = function () {
                    this.base = b.prototype.base;
                    b.apply(this, arguments);
                    this.base = arguments.callee
                });
                c && this.extend(g.prototype, c, !0);
                a && this.extend(g, a, !0);
                return g
            },
            addFunction: function (b, g) {
                return a.push(function () {
                        return b.apply(g || this, arguments)
                    }) - 1
            },
            removeFunction: function (b) {
                a[b] = null
            },
            callFunction: function (b) {
                var g = a[b];
                return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
            },
            cssLength: function () {
                var a = /^-?\d+\.?\d*px$/, g;
                return function (b) {
                    g = CKEDITOR.tools.trim(b + "") + "px";
                    return a.test(g) ? g : b || ""
                }
            }(),
            convertToPx: function () {
                var a;
                return function (g) {
                    a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
                    return /%$/.test(g) ? g : (a.setStyle("width", g), a.$.clientWidth)
                }
            }(),
            repeat: function (a, g) {
                return Array(g + 1).join(a)
            },
            tryThese: function () {
                for (var a, g = 0, b = arguments.length; g < b; g++) {
                    var f = arguments[g];
                    try {
                        a = f();
                        break
                    } catch (c) {
                    }
                }
                return a
            },
            genKey: function () {
                return Array.prototype.slice.call(arguments).join("-")
            },
            defer: function (a) {
                return function () {
                    var g = arguments, b = this;
                    window.setTimeout(function () {
                        a.apply(b, g)
                    }, 0)
                }
            },
            normalizeCssText: function (a, g) {
                var b = [], f, c = CKEDITOR.tools.parseCssText(a, !0, g);
                for (f in c)b.push(f + ":" + c[f]);
                b.sort();
                return b.length ? b.join(";") + ";" : ""
            },
            convertRgbToHex: function (a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, f, c) {
                    a = [b, f, c];
                    for (b = 0; 3 > b; b++)a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            },
            normalizeHex: function (a) {
                return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,
                    function (a, b, f, c) {
                        a = b.toLowerCase();
                        3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
                        return "#" + a + c
                    })
            },
            parseCssText: function (a, g, b) {
                var f = {};
                b && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
                a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
                if (!a || ";" == a)return f;
                a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, b, c) {
                    g && (b = b.toLowerCase(), "font-family" == b && (c = c.replace(/\s*,\s*/g,
                        ",")), c = CKEDITOR.tools.trim(c));
                    f[b] = c
                });
                return f
            },
            writeCssText: function (a, g) {
                var b, f = [];
                for (b in a)f.push(b + ":" + a[b]);
                g && f.sort();
                return f.join("; ")
            },
            objectCompare: function (a, g, b) {
                var f;
                if (!a && !g)return !0;
                if (!a || !g)return !1;
                for (f in a)if (a[f] != g[f])return !1;
                if (!b)for (f in g)if (a[f] != g[f])return !1;
                return !0
            },
            objectKeys: function (a) {
                var g = [], b;
                for (b in a)g.push(b);
                return g
            },
            convertArrayToObject: function (a, g) {
                var b = {};
                1 == arguments.length && (g = !0);
                for (var f = 0, c = a.length; f < c; ++f)b[a[f]] = g;
                return b
            },
            fixDomain: function () {
                for (var a; ;)try {
                    a =
                        window.parent.document.domain;
                    break
                } catch (g) {
                    a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
                    if (!a)break;
                    document.domain = a
                }
                return !!a
            },
            eventsBuffer: function (a, g, b) {
                function f() {
                    h = (new Date).getTime();
                    c = !1;
                    b ? g.call(b) : g()
                }

                var c, h = 0;
                return {
                    input: function () {
                        if (!c) {
                            var g = (new Date).getTime() - h;
                            g < a ? c = setTimeout(f, a - g) : f()
                        }
                    }, reset: function () {
                        c && clearTimeout(c);
                        c = h = 0
                    }
                }
            },
            enableHtml5Elements: function (a, g) {
                for (var b = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
                         f = b.length, c; f--;)c = a.createElement(b[f]), g && a.appendChild(c)
            },
            checkIfAnyArrayItemMatches: function (a, g) {
                for (var b = 0, f = a.length; b < f; ++b)if (a[b].match(g))return !0;
                return !1
            },
            checkIfAnyObjectPropertyMatches: function (a, g) {
                for (var b in a)if (b.match(g))return !0;
                return !1
            },
            transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
            getCookie: function (a) {
                a = a.toLowerCase();
                for (var g = document.cookie.split(";"), b, f, c = 0; c < g.length; c++)if (b = g[c].split("\x3d"),
                        f = decodeURIComponent(CKEDITOR.tools.trim(b[0]).toLowerCase()), f === a)return decodeURIComponent(1 < b.length ? b[1] : "");
                return null
            },
            setCookie: function (a, g) {
                document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(g) + ";path\x3d/"
            },
            getCsrfToken: function () {
                var a = CKEDITOR.tools.getCookie("ckCsrfToken");
                if (!a || 40 != a.length) {
                    var a = [], g = "";
                    if (window.crypto && window.crypto.getRandomValues)a = new Uint8Array(40), window.crypto.getRandomValues(a); else for (var b = 0; 40 > b; b++)a.push(Math.floor(256 * Math.random()));
                    for (b = 0; b < a.length; b++)var f = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[b] % 36), g = g + (.5 < Math.random() ? f.toUpperCase() : f);
                    a = g;
                    CKEDITOR.tools.setCookie("ckCsrfToken", a)
                }
                return a
            },
            escapeCss: function (a) {
                return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : ""
            }
        }
    }(), CKEDITOR.dtd = function () {
        var a = CKEDITOR.tools.extend, e = function (a, g) {
                for (var b = CKEDITOR.tools.clone(a), f = 1; f < arguments.length; f++) {
                    g = arguments[f];
                    for (var c in g)delete b[c]
                }
                return b
            },
            b = {}, c = {}, d = {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                details: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                hr: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                p: 1,
                pre: 1,
                section: 1,
                table: 1,
                ul: 1
            }, l = {command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1}, m = {}, f = {"#": 1}, h = {
                center: 1,
                dir: 1,
                noframes: 1
            };
        a(b, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            "var": 1,
            video: 1,
            wbr: 1
        }, f, {acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1});
        a(c, d, b, h);
        e = {
            a: e(b, {a: 1, button: 1}),
            abbr: b,
            address: c,
            area: m,
            article: c,
            aside: c,
            audio: a({source: 1, track: 1}, c),
            b: b,
            base: m,
            bdi: b,
            bdo: b,
            blockquote: c,
            body: c,
            br: m,
            button: e(b, {a: 1, button: 1}),
            canvas: b,
            caption: c,
            cite: b,
            code: b,
            col: m,
            colgroup: {col: 1},
            command: m,
            datalist: a({option: 1}, b),
            dd: c,
            del: b,
            details: a({summary: 1}, c),
            dfn: b,
            div: c,
            dl: {dt: 1, dd: 1},
            dt: c,
            em: b,
            embed: m,
            fieldset: a({legend: 1}, c),
            figcaption: c,
            figure: a({figcaption: 1}, c),
            footer: c,
            form: c,
            h1: b,
            h2: b,
            h3: b,
            h4: b,
            h5: b,
            h6: b,
            head: a({title: 1, base: 1}, l),
            header: c,
            hgroup: {h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1},
            hr: m,
            html: a({head: 1, body: 1}, c, l),
            i: b,
            iframe: f,
            img: m,
            input: m,
            ins: b,
            kbd: b,
            keygen: m,
            label: b,
            legend: b,
            li: c,
            link: m,
            main: c,
            map: c,
            mark: b,
            menu: a({li: 1}, c),
            meta: m,
            meter: e(b, {meter: 1}),
            nav: c,
            noscript: a({
                link: 1,
                meta: 1, style: 1
            }, b),
            object: a({param: 1}, b),
            ol: {li: 1},
            optgroup: {option: 1},
            option: f,
            output: b,
            p: b,
            param: m,
            pre: b,
            progress: e(b, {progress: 1}),
            q: b,
            rp: b,
            rt: b,
            ruby: a({rp: 1, rt: 1}, b),
            s: b,
            samp: b,
            script: f,
            section: c,
            select: {optgroup: 1, option: 1},
            small: b,
            source: m,
            span: b,
            strong: b,
            style: f,
            sub: b,
            summary: a({h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, b),
            sup: b,
            table: {caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1},
            tbody: {tr: 1},
            td: c,
            textarea: f,
            tfoot: {tr: 1},
            th: c,
            thead: {tr: 1},
            time: e(b, {time: 1}),
            title: f,
            tr: {th: 1, td: 1},
            track: m,
            u: b,
            ul: {li: 1},
            "var": b,
            video: a({source: 1, track: 1}, c),
            wbr: m,
            acronym: b,
            applet: a({param: 1}, c),
            basefont: m,
            big: b,
            center: c,
            dialog: m,
            dir: {li: 1},
            font: b,
            isindex: m,
            noframes: c,
            strike: b,
            tt: b
        };
        a(e, {
            $block: a({audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1}, d, h),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {script: 1, style: 1},
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                figcaption: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: b,
            $list: {dl: 1, ol: 1, ul: 1},
            $listItem: {dd: 1, dt: 1, li: 1},
            $nonBodyContent: a({body: 1, head: 1, html: 1}, e.head),
            $nonEditable: {
                applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1,
                option: 1, param: 1, script: 1, textarea: 1, video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: {a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1},
            $tableContent: {
                caption: 1, col: 1, colgroup: 1, tbody: 1,
                td: 1, tfoot: 1, th: 1, thead: 1, tr: 1
            },
            $transparent: {a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1},
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        });
        return e
    }(), CKEDITOR.dom.event = function (a) {
        this.$ = a
    }, CKEDITOR.dom.event.prototype = {
        getKey: function () {
            return this.$.keyCode || this.$.which
        }, getKeystroke: function () {
            var a = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey)a += CKEDITOR.CTRL;
            this.$.shiftKey && (a += CKEDITOR.SHIFT);
            this.$.altKey && (a += CKEDITOR.ALT);
            return a
        }, preventDefault: function (a) {
            var e = this.$;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            a && this.stopPropagation()
        }, stopPropagation: function () {
            var a = this.$;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }, getTarget: function () {
            var a = this.$.target || this.$.srcElement;
            return a ? new CKEDITOR.dom.node(a) : null
        }, getPhase: function () {
            return this.$.eventPhase || 2
        }, getPageOffset: function () {
            var a = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
            }
        }
    }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (a) {
        a && (this.$ = a)
    }, CKEDITOR.dom.domObject.prototype = function () {
        var a = function (a, b) {
            return function (c) {
                "undefined" != typeof CKEDITOR && a.fire(b,
                    new CKEDITOR.dom.event(c))
            }
        };
        return {
            getPrivate: function () {
                var a;
                (a = this.getCustomData("_")) || this.setCustomData("_", a = {});
                return a
            }, on: function (e) {
                var b = this.getCustomData("_cke_nativeListeners");
                b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
                b[e] || (b = b[e] = a(this, e), this.$.addEventListener ? this.$.addEventListener(e, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, b));
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (a) {
                CKEDITOR.event.prototype.removeListener.apply(this,
                    arguments);
                if (!this.hasListeners(a)) {
                    var b = this.getCustomData("_cke_nativeListeners"), c = b && b[a];
                    c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
                }
            }, removeAllListeners: function () {
                var a = this.getCustomData("_cke_nativeListeners"), b;
                for (b in a) {
                    var c = a[b];
                    this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
                    delete a[b]
                }
                CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }(),
        function (a) {
            var e = {};
            CKEDITOR.on("reset", function () {
                e = {}
            });
            a.equals = function (a) {
                try {
                    return a && a.$ === this.$
                } catch (c) {
                    return !1
                }
            };
            a.setCustomData = function (a, c) {
                var d = this.getUniqueId();
                (e[d] || (e[d] = {}))[a] = c;
                return this
            };
            a.getCustomData = function (a) {
                var c = this.$["data-cke-expando"];
                return (c = c && e[c]) && a in c ? c[a] : null
            };
            a.removeCustomData = function (a) {
                var c = this.$["data-cke-expando"], c = c && e[c], d, l;
                c && (d = c[a], l = a in c, delete c[a]);
                return l ? d : null
            };
            a.clearCustomData = function () {
                this.removeAllListeners();
                var a =
                    this.$["data-cke-expando"];
                a && delete e[a]
            };
            a.getUniqueId = function () {
                return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
            };
            CKEDITOR.event.implementOn(a)
        }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function (a) {
        return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
            "documentFragment" : "domObject"](a) : this
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (a, e) {
            a.append(this, e);
            return a
        }, clone: function (a, e) {
            function b(c) {
                c["data-cke-expando"] && (c["data-cke-expando"] = !1);
                if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)if (e || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) {
                    c = c.childNodes;
                    for (var d = 0; d < c.length; d++)b(c[d])
                }
            }

            function c(b) {
                if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d = b.getName();
                        ":" == d[0] && b.renameNode(d.substring(1))
                    }
                    if (a)for (d = 0; d <
                    b.getChildCount(); d++)c(b.getChild(d))
                }
            }

            var d = this.$.cloneNode(a);
            b(d);
            d = new CKEDITOR.dom.node(d);
            CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(d);
            return d
        }, hasPrevious: function () {
            return !!this.$.previousSibling
        }, hasNext: function () {
            return !!this.$.nextSibling
        }, insertAfter: function (a) {
            a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
            return a
        }, insertBefore: function (a) {
            a.$.parentNode.insertBefore(this.$, a.$);
            return a
        }, insertBeforeMe: function (a) {
            this.$.parentNode.insertBefore(a.$,
                this.$);
            return a
        }, getAddress: function (a) {
            for (var e = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
                var d = c.parentNode;
                d && e.unshift(this.getIndex.call({$: c}, a));
                c = d
            }
            return e
        }, getDocument: function () {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        }, getIndex: function (a) {
            function e(a, f) {
                var c = f ? a.nextSibling : a.previousSibling;
                return c && c.nodeType == CKEDITOR.NODE_TEXT ? b(c) ? e(c, f) : c : null
            }

            function b(a) {
                return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
            }

            var c = this.$, d = -1, l;
            if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !e(c) && !e(c, !0))return -1;
            do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (l || b(c)) || (d++, l = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
            return d
        }, getNextSourceNode: function (a, e, b) {
            if (b && !b.call) {
                var c = b;
                b = function (a) {
                    return !a.equals(c)
                }
            }
            a = !a && this.getFirst && this.getFirst();
            var d;
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0))return null;
                a = this.getNext()
            }
            for (; !a && (d = (d || this).getParent());) {
                if (b &&
                    !1 === b(d, !0))return null;
                a = d.getNext()
            }
            return !a || b && !1 === b(a) ? null : e && e != a.type ? a.getNextSourceNode(!1, e, b) : a
        }, getPreviousSourceNode: function (a, e, b) {
            if (b && !b.call) {
                var c = b;
                b = function (a) {
                    return !a.equals(c)
                }
            }
            a = !a && this.getLast && this.getLast();
            var d;
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0))return null;
                a = this.getPrevious()
            }
            for (; !a && (d = (d || this).getParent());) {
                if (b && !1 === b(d, !0))return null;
                a = d.getPrevious()
            }
            return !a || b && !1 === b(a) ? null : e && a.type != e ? a.getPreviousSourceNode(!1, e, b) :
                a
        }, getPrevious: function (a) {
            var e = this.$, b;
            do b = (e = e.previousSibling) && 10 != e.nodeType && new CKEDITOR.dom.node(e); while (b && a && !a(b));
            return b
        }, getNext: function (a) {
            var e = this.$, b;
            do b = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (b && a && !a(b));
            return b
        }, getParent: function (a) {
            var e = this.$.parentNode;
            return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || a && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null
        }, getParents: function (a) {
            var e = this, b = [];
            do b[a ? "push" : "unshift"](e); while (e = e.getParent());
            return b
        }, getCommonAncestor: function (a) {
            if (a.equals(this))return this;
            if (a.contains && a.contains(this))return a;
            var e = this.contains ? this : this.getParent();
            do if (e.contains(a))return e; while (e = e.getParent());
            return null
        }, getPosition: function (a) {
            var e = this.$, b = a.$;
            if (e.compareDocumentPosition)return e.compareDocumentPosition(b);
            if (e == b)return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                if (e.contains) {
                    if (e.contains(b))return CKEDITOR.POSITION_CONTAINS +
                        CKEDITOR.POSITION_PRECEDING;
                    if (b.contains(e))return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                }
                if ("sourceIndex" in e)return 0 > e.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            }
            e = this.getAddress();
            a = a.getAddress();
            for (var b = Math.min(e.length, a.length), c = 0; c < b; c++)if (e[c] != a[c])return e[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            return e.length < a.length ? CKEDITOR.POSITION_CONTAINS +
            CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (a, e) {
            var b = this.$, c, d;
            e || (b = b.parentNode);
            "function" == typeof a ? (d = !0, c = a) : (d = !1, c = function (b) {
                b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
                return "string" == typeof a ? b == a : b in a
            });
            for (; b;) {
                if (c(d ? new CKEDITOR.dom.node(b) : b))return new CKEDITOR.dom.node(b);
                try {
                    b = b.parentNode
                } catch (l) {
                    b = null
                }
            }
            return null
        }, hasAscendant: function (a, e) {
            var b = this.$;
            e || (b = b.parentNode);
            for (; b;) {
                if (b.nodeName &&
                    b.nodeName.toLowerCase() == a)return !0;
                b = b.parentNode
            }
            return !1
        }, move: function (a, e) {
            a.append(this.remove(), e)
        }, remove: function (a) {
            var e = this.$, b = e.parentNode;
            if (b) {
                if (a)for (; a = e.firstChild;)b.insertBefore(e.removeChild(a), e);
                b.removeChild(e)
            }
            return this
        }, replace: function (a) {
            this.insertBefore(a);
            a.remove()
        }, trim: function () {
            this.ltrim();
            this.rtrim()
        }, ltrim: function () {
            for (var a; this.getFirst && (a = this.getFirst());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var e = CKEDITOR.tools.ltrim(a.getText()), b = a.getLength();
                    if (e)e.length <
                    b && (a.split(b - e.length), this.$.removeChild(this.$.firstChild)); else {
                        a.remove();
                        continue
                    }
                }
                break
            }
        }, rtrim: function () {
            for (var a; this.getLast && (a = this.getLast());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var e = CKEDITOR.tools.rtrim(a.getText()), b = a.getLength();
                    if (e)e.length < b && (a.split(e.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else {
                        a.remove();
                        continue
                    }
                }
                break
            }
            CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
        }, isReadOnly: function (a) {
            var e =
                this;
            this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent());
            CKEDITOR.env.edge && e && e.is("textarea", "input") && (a = !0);
            if (!a && e && "undefined" != typeof e.$.isContentEditable)return !(e.$.isContentEditable || e.data("cke-editable"));
            for (; e;) {
                if (e.data("cke-editable"))return !1;
                if (e.hasAttribute("contenteditable"))return "false" == e.getAttribute("contenteditable");
                e = e.getParent()
            }
            return !0
        }
    }), CKEDITOR.dom.window = function (a) {
        CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject,
        CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function () {
                this.$.focus()
            }, getViewPaneSize: function () {
                var a = this.$.document, e = "CSS1Compat" == a.compatMode;
                return {
                    width: (e ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
                    height: (e ? a.documentElement.clientHeight : a.body.clientHeight) || 0
                }
            }, getScrollPosition: function () {
                var a = this.$;
                if ("pageXOffset" in a)return {x: a.pageXOffset || 0, y: a.pageYOffset || 0};
                a = a.document;
                return {
                    x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop ||
                    a.body.scrollTop || 0
                }
            }, getFrame: function () {
                var a = this.$.frameElement;
                return a ? new CKEDITOR.dom.element.get(a) : null
            }
        }), CKEDITOR.dom.document = function (a) {
        CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) {
            if (this.$.createStyleSheet)this.$.createStyleSheet(a); else {
                var e = new CKEDITOR.dom.element("link");
                e.setAttributes({
                    rel: "stylesheet", type: "text/css",
                    href: a
                });
                this.getHead().append(e)
            }
        }, appendStyleText: function (a) {
            if (this.$.createStyleSheet) {
                var e = this.$.createStyleSheet("");
                e.cssText = a
            } else {
                var b = new CKEDITOR.dom.element("style", this);
                b.append(new CKEDITOR.dom.text(a, this));
                this.getHead().append(b)
            }
            return e || b.$.sheet
        }, createElement: function (a, e) {
            var b = new CKEDITOR.dom.element(a, this);
            e && (e.attributes && b.setAttributes(e.attributes), e.styles && b.setStyles(e.styles));
            return b
        }, createText: function (a) {
            return new CKEDITOR.dom.text(a, this)
        }, focus: function () {
            this.getWindow().focus()
        },
        getActive: function () {
            var a;
            try {
                a = this.$.activeElement
            } catch (e) {
                return null
            }
            return new CKEDITOR.dom.element(a)
        }, getById: function (a) {
            return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
        }, getByAddress: function (a, e) {
            for (var b = this.$.documentElement, c = 0; b && c < a.length; c++) {
                var d = a[c];
                if (e)for (var l = -1, m = 0; m < b.childNodes.length; m++) {
                    var f = b.childNodes[m];
                    if (!0 !== e || 3 != f.nodeType || !f.previousSibling || 3 != f.previousSibling.nodeType)if (l++, l == d) {
                        b = f;
                        break
                    }
                } else b = b.childNodes[d]
            }
            return b ? new CKEDITOR.dom.node(b) :
                null
        }, getElementsByTag: function (a, e) {
            CKEDITOR.env.ie && 8 >= document.documentMode || !e || (a = e + ":" + a);
            return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
        }, getHead: function () {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        }, getBody: function () {
            return new CKEDITOR.dom.element(this.$.body)
        }, getDocumentElement: function () {
            return new CKEDITOR.dom.element(this.$.documentElement)
        }, getWindow: function () {
            return new CKEDITOR.dom.window(this.$.parentWindow ||
                this.$.defaultView)
        }, write: function (a) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
            this.$.write(a);
            this.$.close()
        }, find: function (a) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))
        }, findOne: function (a) {
            return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
        }, _getHtml5ShivFrag: function () {
            var a = this.getCustomData("html5ShivFrag");
            a ||
            (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
            return a
        }
    }), CKEDITOR.dom.nodeList = function (a) {
        this.$ = a
    }, CKEDITOR.dom.nodeList.prototype = {
        count: function () {
            return this.$.length
        }, getItem: function (a) {
            return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
        }
    }, CKEDITOR.dom.element = function (a, e) {
        "string" == typeof a && (a = (e ? e.$ : document).createElement(a));
        CKEDITOR.dom.domObject.call(this, a)
    }, CKEDITOR.dom.element.get = function (a) {
        return (a =
                "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (a, e) {
        var b = new CKEDITOR.dom.element("div", e);
        b.setHtml(a);
        return b.getFirst().remove()
    }, CKEDITOR.dom.element.setMarker = function (a, e, b, c) {
        var d = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), l = e.getCustomData("list_marker_names") ||
            e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        a[d] = e;
        l[b] = 1;
        return e.setCustomData(b, c)
    }, CKEDITOR.dom.element.clearAllMarkers = function (a) {
        for (var e in a)CKEDITOR.dom.element.clearMarkers(a, a[e], 1)
    }, CKEDITOR.dom.element.clearMarkers = function (a, e, b) {
        var c = e.getCustomData("list_marker_names"), d = e.getCustomData("list_marker_id"), l;
        for (l in c)e.removeCustomData(l);
        e.removeCustomData("list_marker_names");
        b && (e.removeCustomData("list_marker_id"), delete a[d])
    }, function () {
        function a(a,
                   b) {
            return -1 < (" " + a + " ").replace(l, " ").indexOf(" " + b + " ")
        }

        function e(a) {
            var b = !0;
            a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
            return function () {
                b || a.removeAttribute("id")
            }
        }

        function b(a, b) {
            var c = CKEDITOR.tools.escapeCss(a.$.id);
            return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ")
        }

        function c(a) {
            for (var b = 0, c = 0, g = m[a].length; c < g; c++)b += parseInt(this.getComputedStyle(m[a][c]) || 0, 10) || 0;
            return b
        }

        var d = document.createElement("_").classList, d = "undefined" !== typeof d && null !== String(d.add).match(/\[Native code\]/gi),
            l = /[\n\t\r]/g;
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT, addClass: d ? function (a) {
                this.$.classList.add(a);
                return this
            } : function (b) {
                var c = this.$.className;
                c && (a(c, b) || (c += " " + b));
                this.$.className = c || b;
                return this
            }, removeClass: d ? function (a) {
                var b = this.$;
                b.classList.remove(a);
                b.className || b.removeAttribute("class");
                return this
            } : function (b) {
                var c = this.getAttribute("class");
                c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" + b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class",
                    c) : this.removeAttribute("class"));
                return this
            }, hasClass: function (b) {
                return a(this.$.className, b)
            }, append: function (a, b) {
                "string" == typeof a && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a
            }, appendHtml: function (a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this)
                } else this.setHtml(a)
            }, appendText: function (a) {
                null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ?
                    this.$.text += a : this.append(new CKEDITOR.dom.text(a))
            }, appendBogus: function (a) {
                if (a || CKEDITOR.env.needsBrFiller) {
                    for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious();
                    a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
                }
            }, breakParent: function (a, b) {
                var c = new CKEDITOR.dom.range(this.getDocument());
                c.setStartAfter(this);
                c.setEndAfter(a);
                var g = c.extractContents(!1, b || !1), d;
                c.insertNode(this.remove());
                if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                    for (c = new CKEDITOR.dom.element("div"); d = g.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d);
                    c.insertAfter(this);
                    c.remove(!0)
                } else g.insertAfterNode(this)
            }, contains: document.compareDocumentPosition ? function (a) {
                return !!(this.$.compareDocumentPosition(a.$) & 16)
            } : function (a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
            }, focus: function () {
                function a() {
                    try {
                        this.$.focus()
                    } catch (b) {
                    }
                }

                return function (b) {
                    b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
                }
            }(), getHtml: function () {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
            }, getOuterHtml: function () {
                if (this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(!0));
                return a.innerHTML
            }, getClientRect: function () {
                var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height &&
                (a.height = a.bottom - a.top);
                return a
            }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                try {
                    var b = this.$;
                    if (this.getParent())return b.innerHTML = a;
                    var c = this.getDocument()._getHtml5ShivFrag();
                    c.appendChild(b);
                    b.innerHTML = a;
                    c.removeChild(b);
                    return a
                } catch (g) {
                    this.$.innerHTML = "";
                    b = new CKEDITOR.dom.element("body", this.getDocument());
                    b.$.innerHTML = a;
                    for (b = b.getChildren(); b.count();)this.append(b.getItem(0));
                    return a
                }
            } : function (a) {
                return this.$.innerHTML = a
            }, setText: function () {
                var a = document.createElement("p");
                a.innerHTML = "x";
                a = a.textContent;
                return function (b) {
                    this.$[a ? "textContent" : "innerText"] = b
                }
            }(), getAttribute: function () {
                var a = function (a) {
                    return this.$.getAttribute(a, 2)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                    switch (a) {
                        case "class":
                            a = "className";
                            break;
                        case "http-equiv":
                            a = "httpEquiv";
                            break;
                        case "name":
                            return this.$.name;
                        case "tabindex":
                            return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
                        case "checked":
                            return a = this.$.attributes.getNamedItem(a),
                                (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                        case "hspace":
                        case "value":
                            return this.$[a];
                        case "style":
                            return this.$.style.cssText;
                        case "contenteditable":
                        case "contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(), getAttributes: function (a) {
                var b = {}, c = this.$.attributes, g;
                a = CKEDITOR.tools.isArray(a) ? a : [];
                for (g = 0; g < c.length; g++)-1 === CKEDITOR.tools.indexOf(a, c[g].name) && (b[c[g].name] =
                    c[g].value);
                return b
            }, getChildren: function () {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) {
                var b = this.getWindow().$.getComputedStyle(this.$, null);
                return b ? b.getPropertyValue(a) : ""
            } : function (a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
            }, getDtd: function () {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd = function () {
                    return a
                };
                return a
            }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: function () {
                var a = this.$.tabIndex;
                return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1
            }, getText: function () {
                return this.$.textContent || this.$.innerText || ""
            }, getWindow: function () {
                return this.getDocument().getWindow()
            }, getId: function () {
                return this.$.id || null
            }, getNameAtt: function () {
                return this.$.name || null
            }, getName: function () {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && 8 >= document.documentMode) {
                    var b = this.$.scopeName;
                    "HTML" !=
                    b && (a = b.toLowerCase() + ":" + a)
                }
                this.getName = function () {
                    return a
                };
                return this.getName()
            }, getValue: function () {
                return this.$.value
            }, getFirst: function (a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
                return b
            }, getLast: function (a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
                return b
            }, getStyle: function (a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
            }, is: function () {
                var a = this.getName();
                if ("object" == typeof arguments[0])return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++)if (arguments[b] == a)return !0;
                return !1
            }, isEditable: function (a) {
                var b = this.getName();
                return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
            }, isIdentical: function (a) {
                var b = this.clone(0, 1);
                a = a.clone(0,
                    1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode)return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
                b = b.getOuterHtml();
                a = a.getOuterHtml();
                if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
                    var c = this.getParent();
                    c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml())
                }
                return b == a
            }, isVisible: function () {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, c;
                a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
                return !!a
            }, isEmptyInlineRemoveable: function () {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()])return !1;
                for (var a = this.getChildren(),
                         b = 0, c = a.count(); b < c; b++) {
                    var g = a.getItem(b);
                    if (g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark"))if (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText()))return !1
                }
                return !0
            }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                        case "class":
                            if (this.getAttribute("class"))return !0;
                        case "data-cke-expando":
                            continue;
                        default:
                            if (c.specified)return !0
                    }
                }
                return !1
            } :
                function () {
                    var a = this.$.attributes, b = a.length, c = {"data-cke-expando": 1, _moz_dirty: 1};
                    return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName])
                }, hasAttribute: function () {
                function a(b) {
                    var c = this.$.attributes.getNamedItem(b);
                    if ("input" == this.getName())switch (b) {
                        case "class":
                            return 0 < this.$.className.length;
                        case "checked":
                            return !!this.$.checked;
                        case "value":
                            return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value
                    }
                    return c ? c.specified : !1
                }

                return CKEDITOR.env.ie ?
                    8 > CKEDITOR.env.version ? function (b) {
                        return "name" == b ? !!this.$.name : a.call(this, b)
                    } : a : function (a) {
                    return !!this.$.attributes.getNamedItem(a)
                }
            }(), hide: function () {
                this.setStyle("display", "none")
            }, moveChildren: function (a, b) {
                var c = this.$;
                a = a.$;
                if (c != a) {
                    var g;
                    if (b)for (; g = c.lastChild;)a.insertBefore(c.removeChild(g), a.firstChild); else for (; g = c.firstChild;)a.appendChild(c.removeChild(g))
                }
            }, mergeSiblings: function () {
                function a(b, c, g) {
                    if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                        for (var f = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)if (f.push(c),
                                c = g ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT)return;
                        if (b.isIdentical(c)) {
                            for (var d = g ? b.getLast() : b.getFirst(); f.length;)f.shift().move(b, !g);
                            c.moveChildren(b, !g);
                            c.remove();
                            d && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings()
                        }
                    }
                }

                return function (b) {
                    if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a"))a(this, this.getNext(), !0), a(this, this.getPrevious())
                }
            }(), show: function () {
                this.setStyles({display: "", visibility: ""})
            }, setAttribute: function () {
                var a = function (a, b) {
                    this.$.setAttribute(a,
                        b);
                    return this
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) {
                    "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
                    return this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
                    if ("src" == b && c.match(/^http:\/\//))try {
                        a.apply(this, arguments)
                    } catch (g) {
                    } else a.apply(this, arguments);
                    return this
                } : a
            }(), setAttributes: function (a) {
                for (var b in a)this.setAttribute(b,
                    a[b]);
                return this
            }, setValue: function (a) {
                this.$.value = a;
                return this
            }, removeAttribute: function () {
                var a = function (a) {
                    this.$.removeAttribute(a)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                    "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
                    this.$.removeAttribute(a)
                } : a
            }(), removeAttributes: function (a) {
                if (CKEDITOR.tools.isArray(a))for (var b = 0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(),
                    a)a.hasOwnProperty(b) && this.removeAttribute(b)
            }, removeStyle: function (a) {
                var b = this.$.style;
                if (b.removeProperty || "border" != a && "margin" != a && "padding" != a)b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else {
                    var c = ["top", "left", "right", "bottom"], g;
                    "border" == a && (g = ["color", "style", "width"]);
                    for (var b = [], d = 0; d < c.length; d++)if (g)for (var e = 0; e < g.length; e++)b.push([a, c[d], g[e]].join("-")); else b.push([a, c[d]].join("-"));
                    for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                }
            }, setStyle: function (a, b) {
                this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this
            }, setStyles: function (a) {
                for (var b in a)this.setStyle(b, a[b]);
                return this
            }, setOpacity: function (a) {
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
            }, unselectable: function () {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                if (CKEDITOR.env.ie) {
                    this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++)a = b.getItem(c), a.setAttribute("unselectable", "on")
                }
            }, getPositionedAncestor: function () {
                for (var a = this; "html" != a.getName();) {
                    if ("static" != a.getComputedStyle("position"))return a;
                    a = a.getParent()
                }
                return null
            }, getDocumentPosition: function (a) {
                var b = 0, c = 0, g = this.getDocument(), d = g.getBody(), e = "BackCompat" == g.$.compatMode;
                if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                    8 !== CKEDITOR.env.version : 1)) {
                    var l = this.$.getBoundingClientRect(), m = g.$.documentElement, t = m.clientTop || d.$.clientTop || 0, r = m.clientLeft || d.$.clientLeft || 0, q = !0;
                    CKEDITOR.env.ie && (q = g.getDocumentElement().contains(this), g = g.getBody().contains(this), q = e && g || !e && q);
                    q && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || m.scrollLeft, c = d.$.scrollTop || m.scrollTop) : (c = e ? d.$ : m, b = c.scrollLeft, c = c.scrollTop), b = l.left + b - r, c = l.top + c - t)
                } else for (t = this, r = null; t && "body" != t.getName() &&
                "html" != t.getName();) {
                    b += t.$.offsetLeft - t.$.scrollLeft;
                    c += t.$.offsetTop - t.$.scrollTop;
                    t.equals(this) || (b += t.$.clientLeft || 0, c += t.$.clientTop || 0);
                    for (; r && !r.equals(t);)b -= r.$.scrollLeft, c -= r.$.scrollTop, r = r.getParent();
                    r = t;
                    t = (l = t.$.offsetParent) ? new CKEDITOR.dom.element(l) : null
                }
                a && (l = this.getWindow(), t = a.getWindow(), !l.equals(t) && l.$.frameElement && (a = (new CKEDITOR.dom.element(l.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
                document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                e || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
                return {x: b, y: c}
            }, scrollIntoView: function (a) {
                var b = this.getParent();
                if (b) {
                    do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
                        var c = b.getWindow();
                        try {
                            var g = c.$.frameElement;
                            g && (b = new CKEDITOR.dom.element(g))
                        } catch (d) {
                        }
                    } while (b = b.getParent())
                }
            }, scrollIntoParent: function (a, b, c) {
                var g, d, e, l;

                function m(b, g) {
                    /body|html/.test(a.getName()) ?
                        a.getWindow().$.scrollBy(b, g) : (a.$.scrollLeft += b, a.$.scrollTop += g)
                }

                function t(a, b) {
                    var g = {x: 0, y: 0};
                    if (!a.is(q ? "body" : "html")) {
                        var c = a.$.getBoundingClientRect();
                        g.x = c.left;
                        g.y = c.top
                    }
                    c = a.getWindow();
                    c.equals(b) || (c = t(CKEDITOR.dom.element.get(c.$.frameElement), b), g.x += c.x, g.y += c.y);
                    return g
                }

                function r(a, b) {
                    return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
                }

                !a && (a = this.getWindow());
                CKEDITOR.currentInstance && CKEDITOR.currentInstance._ && (CKEDITOR.currentInstance._.previousScrollTop = null);
                e = a.getDocument();
                var q = "BackCompat" == e.$.compatMode;
                a instanceof CKEDITOR.dom.window && (a = q ? e.getBody() : e.getDocumentElement());
                e = a.getWindow();
                d = t(this, e);
                var A = t(a, e), B = this.$.offsetHeight;
                g = this.$.offsetWidth;
                var w = a.$.clientHeight, y = a.$.clientWidth;
                e = d.x - r(this, "left") - A.x || 0;
                l = d.y - r(this, "top") - A.y || 0;
                g = d.x + g + r(this, "right") - (A.x + y) || 0;
                d = d.y + B + r(this, "bottom") - (A.y + w) || 0;
                (0 > l || 0 < d) && m(0, !0 === b ? l : !1 === b ? d : 0 > l ? l : d);
                c && (0 > e || 0 < g) && m(0 > e ? e : g, 0)
            }, setState: function (a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b +
                            "_on");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", !0);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", !0);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function () {
                var a = this.$;
                try {
                    a.contentWindow.document
                } catch (b) {
                    a.src = a.src
                }
                return a && new CKEDITOR.dom.document(a.contentWindow.document)
            }, copyAttributes: function (a, b) {
                var c = this.$.attributes;
                b = b || {};
                for (var g = 0; g < c.length; g++) {
                    var d = c[g], e = d.nodeName.toLowerCase(), l;
                    if (!(e in b))if ("checked" == e && (l = this.getAttribute(e)))a.setAttribute(e, l); else if (!CKEDITOR.env.ie || this.hasAttribute(e))l = this.getAttribute(e), null === l && (l = d.nodeValue), a.setAttribute(e, l)
                }
                "" !== this.$.style.cssText &&
                (a.$.style.cssText = this.$.style.cssText)
            }, renameNode: function (a) {
                if (this.getName() != a) {
                    var b = this.getDocument();
                    a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$;
                    delete this.getName
                }
            }, getChild: function () {
                function a(b, c) {
                    var g = b.childNodes;
                    if (0 <= c && c < g.length)return g[c]
                }

                return function (b) {
                    var c = this.$;
                    if (b.slice)for (b = b.slice(); 0 < b.length && c;)c = a(c,
                        b.shift()); else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(), getChildCount: function () {
                return this.$.childNodes.length
            }, disableContextMenu: function () {
                function a(b) {
                    return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu")
                }

                this.on("contextmenu", function (b) {
                    b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault()
                })
            }, getDirection: function (a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            }, data: function (a, b) {
                a = "data-" + a;
                if (void 0 === b)return this.getAttribute(a);
                !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null
            }, getEditor: function () {
                var a = CKEDITOR.instances, b, c;
                for (b in a)if (c = a[b], c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO)return c;
                return null
            }, find: function (a) {
                var c = e(this);
                a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this, a)));
                c();
                return a
            }, findOne: function (a) {
                var c = e(this);
                a = this.$.querySelector(b(this, a));
                c();
                return a ? new CKEDITOR.dom.element(a) : null
            }, forEach: function (a, b, c) {
                if (!(c || b && this.type != b))var g = a(this);
                if (!1 !== g) {
                    c = this.getChildren();
                    for (var d = 0; d < c.count(); d++)g = c.getItem(d), g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g)
                }
            }
        });
        var m = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        CKEDITOR.dom.element.prototype.setSize = function (a,
                                                           b, d) {
            "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px"))
        };
        CKEDITOR.dom.element.prototype.getSize = function (a, b) {
            var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            b && (d -= c.call(this, a));
            return d
        }
    }(), CKEDITOR.dom.documentFragment = function (a) {
        a = a || CKEDITOR.document;
        this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
        CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) {
                a = a.$;
                a.parentNode.insertBefore(this.$, a.nextSibling)
            }, getHtml: function () {
                var a = new CKEDITOR.dom.element("div");
                this.clone(1, 1).appendTo(a);
                return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
            }
        }, !0, {
            append: 1,
            appendBogus: 1,
            clone: 1,
            getFirst: 1,
            getHtml: 1,
            getLast: 1,
            getParent: 1,
            getNext: 1,
            getPrevious: 1,
            appendTo: 1,
            moveChildren: 1,
            insertBefore: 1,
            insertAfterNode: 1,
            replace: 1,
            trim: 1,
            type: 1,
            ltrim: 1,
            rtrim: 1,
            getDocument: 1,
            getChildCount: 1,
            getChild: 1,
            getChildren: 1
        }), function () {
        function a(a, b) {
            var g = this.range;
            if (this._.end)return null;
            if (!this._.start) {
                this._.start = 1;
                if (g.collapsed)return this.end(), null;
                g.optimize()
            }
            var c, d = g.startContainer;
            c = g.endContainer;
            var e = g.startOffset, f = g.endOffset, k, l = this.guard, h = this.type, n = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var m = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(), z = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(f) : c.getNext();
                this._.guardLTR = function (a,
                                            b) {
                    return (!b || !m.equals(a)) && (!z || !a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
                }
            }
            if (a && !this._.guardRTL) {
                var D = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), F = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious();
                this._.guardRTL = function (a, b) {
                    return (!b || !D.equals(a)) && (!F || !a.equals(F)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
                }
            }
            var E = a ? this._.guardRTL : this._.guardLTR;
            k = l ? function (a, b) {
                return !1 === E(a, b) ? !1 : l(a, b)
            } : E;
            this.current ? c = this.current[n](!1,
                h, k) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < f ? c.getChild(f - 1) : !1 === k(c, !0) ? null : c.getPreviousSourceNode(!0, h, k)) : (c = d, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(e)) || (c = !1 === k(d, !0) ? null : d.getNextSourceNode(!0, h, k)))), c && !1 === k(c) && (c = null));
            for (; c && !this._.end;) {
                this.current = c;
                if (!this.evaluator || !1 !== this.evaluator(c)) {
                    if (!b)return c
                } else if (b && this.evaluator)return !1;
                c = c[n](!1, h, k)
            }
            this.end();
            return this.current = null
        }

        function e(b) {
            for (var g, c = null; g = a.call(this, b);)c = g;
            return c
        }

        CKEDITOR.dom.walker =
            CKEDITOR.tools.createClass({
                $: function (a) {
                    this.range = a;
                    this._ = {}
                }, proto: {
                    end: function () {
                        this._.end = 1
                    }, next: function () {
                        return a.call(this)
                    }, previous: function () {
                        return a.call(this, 1)
                    }, checkForward: function () {
                        return !1 !== a.call(this, 0, 1)
                    }, checkBackward: function () {
                        return !1 !== a.call(this, 1, 1)
                    }, lastForward: function () {
                        return e.call(this)
                    }, lastBackward: function () {
                        return e.call(this, 1)
                    }, reset: function () {
                        delete this.current;
                        this._ = {}
                    }
                }
            });
        var b = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        }, c = {absolute: 1, fixed: 1};
        CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) {
            return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0
        };
        CKEDITOR.dom.walker.blockBoundary = function (a) {
            return function (b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
            }
        };
        CKEDITOR.dom.walker.listItemBoundary =
            function () {
                return this.blockBoundary({br: 1})
            };
        CKEDITOR.dom.walker.bookmark = function (a, b) {
            function g(a) {
                return a && a.getName && "span" == a.getName() && a.data("cke-bookmark")
            }

            return function (c) {
                var d, e;
                d = c && c.type != CKEDITOR.NODE_ELEMENT && (e = c.getParent()) && g(e);
                d = a ? d : d || g(c);
                return !!(b ^ d)
            }
        };
        CKEDITOR.dom.walker.whitespaces = function (a) {
            return function (b) {
                var g;
                b && b.type == CKEDITOR.NODE_TEXT && (g = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                return !!(a ^ g)
            }
        };
        CKEDITOR.dom.walker.invisible = function (a) {
            var b = CKEDITOR.dom.walker.whitespaces(), g = CKEDITOR.env.webkit ? 1 : 0;
            return function (c) {
                b(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = c.$.offsetWidth <= g);
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.nodeType = function (a, b) {
            return function (g) {
                return !!(b ^ g.type == a)
            }
        };
        CKEDITOR.dom.walker.bogus = function (a) {
            function b(a) {
                return !l(a) && !m(a)
            }

            return function (g) {
                var c = CKEDITOR.env.needsBrFiller ? g.is && g.is("br") : g.getText && d.test(g.getText());
                c && (c = g.getParent(),
                    g = g.getNext(b), c = c.isBlockBoundary() && (!g || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()));
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.temp = function (a) {
            return function (b) {
                b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                b = b && b.hasAttribute("data-cke-temp");
                return !!(a ^ b)
            }
        };
        var d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.whitespaces(), m = CKEDITOR.dom.walker.bookmark(), f = CKEDITOR.dom.walker.temp(), h = function (a) {
            return m(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)
        };
        CKEDITOR.dom.walker.ignored = function (a) {
            return function (b) {
                b = l(b) || m(b) || f(b);
                return !!(a ^ b)
            }
        };
        var k = CKEDITOR.dom.walker.ignored();
        CKEDITOR.dom.walker.empty = function (a) {
            return function (b) {
                for (var g = 0, c = b.getChildCount(); g < c; ++g)if (!k(b.getChild(g)))return !!a;
                return !a
            }
        };
        var g = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) {
            var b = {}, g;
            for (g in a)CKEDITOR.dtd[g]["#"] && (b[g] = 1);
            return b
        }(CKEDITOR.dtd.$block), {caption: 1, td: 1, th: 1});
        CKEDITOR.dom.walker.editable =
            function (a) {
                return function (b) {
                    b = k(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1;
                    return !!(a ^ b)
                }
            };
        CKEDITOR.dom.element.prototype.getBogus = function () {
            var a = this;
            do a = a.getPreviousSourceNode(); while (h(a));
            return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && d.test(a.getText())) ? a : !1
        }
    }(), CKEDITOR.dom.range = function (a) {
        this.endOffset = this.endContainer =
            this.startOffset = this.startContainer = null;
        this.collapsed = !0;
        var e = a instanceof CKEDITOR.dom.document;
        this.document = e ? a : a.getDocument();
        this.root = e ? a.getBody() : a
    }, function () {
        function a(a) {
            a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
        }

        function e(a, b, c, d, e) {
            function f(a, b, c, g) {
                var d = c ? a.getPrevious() : a.getNext();
                if (g && h)return d;
                w || g ? b.append(a.clone(!0, e), c) : (a.remove(), m && b.append(a));
                return d
            }

            function k() {
                var a, b, c, g = Math.min(O.length,
                    I.length);
                for (a = 0; a < g; a++)if (b = O[a], c = I[a], !b.equals(c))return a;
                return a - 1
            }

            function l() {
                var b = R - 1, c = E && J && !y.equals(C);
                b < P - 1 || b < T - 1 || c ? (c ? a.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START) : T == b + 1 && F ? a.moveToPosition(I[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(I[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = O[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b),
                    b.mergeSiblings(!1), a.moveToBookmark({startNode: c}))) : a.collapse(!0)
            }

            a.optimizeBookmark();
            var h = 0 === b, m = 1 == b, w = 2 == b;
            b = w || m;
            var y = a.startContainer, C = a.endContainer, x = a.startOffset, z = a.endOffset, D, F, E, J, G, M;
            if (w && C.type == CKEDITOR.NODE_TEXT && y.equals(C))y = a.document.createText(y.substring(x, z)), c.append(y); else {
                C.type == CKEDITOR.NODE_TEXT ? w ? M = !0 : C = C.split(z) : 0 < C.getChildCount() ? z >= C.getChildCount() ? (C = C.getChild(z - 1), F = !0) : C = C.getChild(z) : J = F = !0;
                y.type == CKEDITOR.NODE_TEXT ? w ? G = !0 : y.split(x) : 0 < y.getChildCount() ?
                    0 === x ? (y = y.getChild(x), D = !0) : y = y.getChild(x - 1) : E = D = !0;
                for (var O = y.getParents(), I = C.getParents(), R = k(), P = O.length - 1, T = I.length - 1, H = c, K, ca, W, U = -1, L = R; L <= P; L++) {
                    ca = O[L];
                    W = ca.getNext();
                    for (L != P || ca.equals(I[L]) && P < T ? b && (K = H.append(ca.clone(0, e))) : D ? f(ca, H, !1, E) : G && H.append(a.document.createText(ca.substring(x))); W;) {
                        if (W.equals(I[L])) {
                            U = L;
                            break
                        }
                        W = f(W, H)
                    }
                    H = K
                }
                H = c;
                for (L = R; L <= T; L++)if (c = I[L], W = c.getPrevious(), c.equals(O[L]))b && (H = H.getChild(0)); else {
                    L != T || c.equals(O[L]) && T < P ? b && (K = H.append(c.clone(0, e))) :
                        F ? f(c, H, !1, J) : M && H.append(a.document.createText(c.substring(0, z)));
                    if (L > U)for (; W;)W = f(W, H, !0);
                    H = K
                }
                w || l()
            }
        }

        function b() {
            var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), d = CKEDITOR.dom.walker.bogus();
            return function (e) {
                return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(l) ? !1 : !0
            }
        }

        function c(a) {
            var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1);
            return function (d) {
                return c(d) || b(d) ? !0 : !a && m(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
            }
        }

        function d(a) {
            return function () {
                var b;
                return this[a ? "getPreviousNode" : "getNextNode"](function (a) {
                    !b && k(a) && (b = a);
                    return h(a) && !(m(a) && a.equals(b))
                })
            }
        }

        var l = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1
            }, m = CKEDITOR.dom.walker.bogus(), f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            h = CKEDITOR.dom.walker.editable(), k = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function () {
                var a = new CKEDITOR.dom.range(this.root);
                a._setStartContainer(this.startContainer);
                a.startOffset = this.startOffset;
                a._setEndContainer(this.endContainer);
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            }, collapse: function (a) {
                a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset);
                this.collapsed = !0
            }, cloneContents: function (a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || e(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
                return b
            }, deleteContents: function (a) {
                this.collapsed || e(this, 0, null, a)
            }, extractContents: function (a, b) {
                var c = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || e(this, 1, c, a, "undefined" == typeof b ? !0 : b);
                return c
            }, createBookmark: function (a) {
                var b, c, d, e, f = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display",
                    "none");
                b.setHtml("\x26nbsp;");
                a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (f ? "C" : "S")));
                f || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(), e.collapse(), e.insertNode(c));
                e = this.clone();
                e.collapse(!0);
                e.insertNode(b);
                c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return {startNode: a ? d + (f ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: f}
            }, createBookmark2: function () {
                function a(b) {
                    var g =
                        b.container, d = b.offset, e;
                    e = g;
                    var f = d;
                    e = e.type != CKEDITOR.NODE_ELEMENT || 0 === f || f == e.getChildCount() ? 0 : e.getChild(f - 1).type == CKEDITOR.NODE_TEXT && e.getChild(f).type == CKEDITOR.NODE_TEXT;
                    e && (g = g.getChild(d - 1), d = g.getLength());
                    if (g.type == CKEDITOR.NODE_ELEMENT && 0 < d) {
                        a:{
                            for (e = g; d--;)if (f = e.getChild(d).getIndex(!0), 0 <= f) {
                                d = f;
                                break a
                            }
                            d = -1
                        }
                        d += 1
                    }
                    if (g.type == CKEDITOR.NODE_TEXT) {
                        e = g;
                        for (f = 0; (e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;)f += e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                        e = f;
                        g.getText() ? d += e : (f = g.getPrevious(c), e ? (d = e, g = f ? f.getNext() : g.getParent().getFirst()) : (g = g.getParent(), d = f ? f.getIndex(!0) + 1 : 0))
                    }
                    b.container = g;
                    b.offset = d
                }

                function b(a, c) {
                    var g = c.getCustomData("cke-fillingChar");
                    if (g) {
                        var d = a.container;
                        g.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent()))
                    }
                }

                var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                return function (c) {
                    var d = this.collapsed, e = {
                        container: this.startContainer,
                        offset: this.startOffset
                    }, f = {container: this.endContainer, offset: this.endOffset};
                    c && (a(e), b(e, this.root), d || (a(f), b(f, this.root)));
                    return {
                        start: e.container.getAddress(c),
                        end: d ? null : f.container.getAddress(c),
                        startOffset: e.offset,
                        endOffset: f.offset,
                        normalized: c,
                        collapsed: d,
                        is2: !0
                    }
                }
            }(), moveToBookmark: function (a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized);
                    a = a.endOffset;
                    this.setStart(b, c);
                    d ? this.setEnd(d, a) : this.collapse(!0)
                } else b =
                    (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
            }, getBoundaryNodes: function () {
                var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, e;
                if (a.type == CKEDITOR.NODE_ELEMENT)if (e = a.getChildCount(), e > c)a = a.getChild(c); else if (1 > e)a = a.getPreviousSourceNode(); else {
                    for (a = a.$; a.lastChild;)a = a.lastChild;
                    a = new CKEDITOR.dom.node(a);
                    a =
                        a.getNextSourceNode() || a
                }
                if (b.type == CKEDITOR.NODE_ELEMENT)if (e = b.getChildCount(), e > d)b = b.getChild(d).getPreviousSourceNode(!0); else if (1 > e)b = b.getPreviousSourceNode(); else {
                    for (b = b.$; b.lastChild;)b = b.lastChild;
                    b = new CKEDITOR.dom.node(b)
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return {startNode: a, endNode: b}
            }, getCommonAncestor: function (a, b) {
                var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) :
                    c : c.getCommonAncestor(d);
                return b && !c.is ? c.getParent() : c
            }, optimize: function () {
                var a = this.startContainer, b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            }, optimizeBookmark: function () {
                var a = this.startContainer, b = this.endContainer;
                a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            }, trim: function (a, b) {
                var c = this.startContainer, d = this.startOffset, e = this.collapsed;
                if ((!a || e) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d)if (d >= c.getLength())d = c.getIndex() + 1, c = c.getParent(); else {
                        var f = c.split(d), d = c.getIndex() + 1, c = c.getParent();
                        this.startContainer.equals(this.endContainer) ? this.setEnd(f, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
                    } else d = c.getIndex(), c = c.getParent();
                    this.setStart(c, d);
                    if (e) {
                        this.collapse(!0);
                        return
                    }
                }
                c = this.endContainer;
                d = this.endOffset;
                b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
            }, enlarge: function (a, b) {
                function c(a) {
                    return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
                }

                var d = new RegExp(/[^\s\ufeff]/);
                switch (a) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var e = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        var f = function (a, b) {
                            var c = new CKEDITOR.dom.range(l);
                            c.setStart(a, b);
                            c.setEndAt(l, CKEDITOR.POSITION_BEFORE_END);
                            var c = new CKEDITOR.dom.walker(c), g;
                            for (c.guard = function (a) {
                                return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
                            }; g = c.next();) {
                                if (g.type != CKEDITOR.NODE_TEXT)return !1;
                                D = g != a ? g.getText() : g.substring(b);
                                if (d.test(D))return !1
                            }
                            return !0
                        };
                        if (this.collapsed)break;
                        var k = this.getCommonAncestor(), l = this.root, h, m, w, y, C, x = !1, z, D;
                        z = this.startContainer;
                        var F = this.startOffset;
                        z.type == CKEDITOR.NODE_TEXT ? (F && (z = !CKEDITOR.tools.trim(z.substring(0, F)).length &&
                            z, x = !!z), z && ((y = z.getPrevious()) || (w = z.getParent()))) : (F && (y = z.getChild(F - 1) || z.getLast()), y || (w = z));
                        for (w = c(w); w || y;) {
                            if (w && !y) {
                                !C && w.equals(k) && (C = !0);
                                if (e ? w.isBlockBoundary() : !l.contains(w))break;
                                x && "inline" == w.getComputedStyle("display") || (x = !1, C ? h = w : this.setStartBefore(w));
                                y = w.getPrevious()
                            }
                            for (; y;)if (z = !1, y.type == CKEDITOR.NODE_COMMENT)y = y.getPrevious(); else {
                                if (y.type == CKEDITOR.NODE_TEXT)D = y.getText(), d.test(D) && (y = null), z = /[\s\ufeff]$/.test(D); else if ((y.$.offsetWidth > (CKEDITOR.env.webkit ? 1 :
                                        0) || b && y.is("br")) && !y.data("cke-bookmark"))if (x && CKEDITOR.dtd.$removeEmpty[y.getName()]) {
                                    D = y.getText();
                                    if (d.test(D))y = null; else for (var F = y.$.getElementsByTagName("*"), E = 0, J; J = F[E++];)if (!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]) {
                                        y = null;
                                        break
                                    }
                                    y && (z = !!D.length)
                                } else y = null;
                                z && (x ? C ? h = w : w && this.setStartBefore(w) : x = !0);
                                if (y) {
                                    z = y.getPrevious();
                                    if (!w && !z) {
                                        w = y;
                                        y = null;
                                        break
                                    }
                                    y = z
                                } else w = null
                            }
                            w && (w = c(w.getParent()))
                        }
                        z = this.endContainer;
                        F = this.endOffset;
                        w = y = null;
                        C = x = !1;
                        z.type == CKEDITOR.NODE_TEXT ?
                            CKEDITOR.tools.trim(z.substring(F)).length ? x = !0 : (x = !z.getLength(), F == z.getLength() ? (y = z.getNext()) || (w = z.getParent()) : f(z, F) && (w = z.getParent())) : (y = z.getChild(F)) || (w = z);
                        for (; w || y;) {
                            if (w && !y) {
                                !C && w.equals(k) && (C = !0);
                                if (e ? w.isBlockBoundary() : !l.contains(w))break;
                                x && "inline" == w.getComputedStyle("display") || (x = !1, C ? m = w : w && this.setEndAfter(w));
                                y = w.getNext()
                            }
                            for (; y;) {
                                z = !1;
                                if (y.type == CKEDITOR.NODE_TEXT)D = y.getText(), f(y, 0) || (y = null), z = /^[\s\ufeff]/.test(D); else if (y.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((0 < y.$.offsetWidth ||
                                        b && y.is("br")) && !y.data("cke-bookmark"))if (x && CKEDITOR.dtd.$removeEmpty[y.getName()]) {
                                        D = y.getText();
                                        if (d.test(D))y = null; else for (F = y.$.getElementsByTagName("*"), E = 0; J = F[E++];)if (!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]) {
                                            y = null;
                                            break
                                        }
                                        y && (z = !!D.length)
                                    } else y = null
                                } else z = 1;
                                z && x && (C ? m = w : this.setEndAfter(w));
                                if (y) {
                                    z = y.getNext();
                                    if (!w && !z) {
                                        w = y;
                                        y = null;
                                        break
                                    }
                                    y = z
                                } else w = null
                            }
                            w && (w = c(w.getParent()))
                        }
                        h && m && (k = h.contains(m) ? m : h, this.setStartBefore(k), this.setEndAfter(k));
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        w =
                            new CKEDITOR.dom.range(this.root);
                        l = this.root;
                        w.setStartAt(l, CKEDITOR.POSITION_AFTER_START);
                        w.setEnd(this.startContainer, this.startOffset);
                        w = new CKEDITOR.dom.walker(w);
                        var G, M, O = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {br: 1} : null), I = null, R = function (a) {
                            if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))if (I) {
                                if (I.equals(a)) {
                                    I = null;
                                    return
                                }
                            } else I = a; else if (I)return;
                            var b = O(a);
                            b || (G = a);
                            return b
                        }, e = function (a) {
                            var b = R(a);
                            !b && a.is && a.is("br") &&
                            (M = a);
                            return b
                        };
                        w.guard = R;
                        w = w.lastBackward();
                        G = G || l;
                        this.setStartAt(G, !G.is("br") && (!w && this.checkStartOfBlock() || w && G.contains(w)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                        if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                            w = this.clone();
                            w = new CKEDITOR.dom.walker(w);
                            var P = CKEDITOR.dom.walker.whitespaces(), T = CKEDITOR.dom.walker.bookmark();
                            w.evaluator = function (a) {
                                return !P(a) && !T(a)
                            };
                            if ((w = w.previous()) && w.type == CKEDITOR.NODE_ELEMENT && w.is("br"))break
                        }
                        w = this.clone();
                        w.collapse();
                        w.setEndAt(l,
                            CKEDITOR.POSITION_BEFORE_END);
                        w = new CKEDITOR.dom.walker(w);
                        w.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : R;
                        G = I = M = null;
                        w = w.lastForward();
                        G = G || l;
                        this.setEndAt(G, !w && this.checkEndOfBlock() || w && G.contains(w) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                        M && this.setEndAfter(M)
                }
            }, shrink: function (a, b, c) {
                if (!this.collapsed) {
                    a = a || CKEDITOR.SHRINK_TEXT;
                    var d = this.clone(), e = this.startContainer, f = this.endContainer, k = this.startOffset, l = this.endOffset, h = 1, m = 1;
                    e && e.type == CKEDITOR.NODE_TEXT && (k ?
                        k >= e.getLength() ? d.setStartAfter(e) : (d.setStartBefore(e), h = 0) : d.setStartBefore(e));
                    f && f.type == CKEDITOR.NODE_TEXT && (l ? l >= f.getLength() ? d.setEndAfter(f) : (d.setEndAfter(f), m = 0) : d.setEndBefore(f));
                    var d = new CKEDITOR.dom.walker(d), w = CKEDITOR.dom.walker.bookmark();
                    d.evaluator = function (b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                    };
                    var y;
                    d.guard = function (b, d) {
                        if (w(b))return !0;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(y) || !1 === c && b.type ==
                            CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable"))return !1;
                        d || b.type != CKEDITOR.NODE_ELEMENT || (y = b);
                        return !0
                    };
                    h && (e = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    m && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                    return !(!h && !m)
                }
            }, insertNode: function (a) {
                this.optimizeBookmark();
                this.trim(!1, !0);
                var b = this.startContainer, c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                this.setStartBefore(a)
            }, moveToPosition: function (a, b) {
                this.setStartAt(a, b);
                this.collapse(!0)
            }, moveToRange: function (a) {
                this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset)
            }, selectNodeContents: function (a) {
                this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            },
            setStart: function (b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
                this._setStartContainer(b);
                this.startOffset = c;
                this.endContainer || (this._setEndContainer(b), this.endOffset = c);
                a(this)
            }, setEnd: function (b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent());
                this._setEndContainer(b);
                this.endOffset = c;
                this.startContainer || (this._setStartContainer(b), this.startOffset = c);
                a(this)
            }, setStartAfter: function (a) {
                this.setStart(a.getParent(),
                    a.getIndex() + 1)
            }, setStartBefore: function (a) {
                this.setStart(a.getParent(), a.getIndex())
            }, setEndAfter: function (a) {
                this.setEnd(a.getParent(), a.getIndex() + 1)
            }, setEndBefore: function (a) {
                this.setEnd(a.getParent(), a.getIndex())
            }, setStartAt: function (b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(b)
                }
                a(this)
            }, setEndAt: function (b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(b)
                }
                a(this)
            }, fixBlock: function (a, b) {
                var c = this.createBookmark(), d = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(d);
                d.trim();
                this.insertNode(d);
                var e = d.getBogus();
                e && e.remove();
                d.appendBogus();
                this.moveToBookmark(c);
                return d
            }, splitBlock: function (a, b) {
                var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root), d = new CKEDITOR.dom.elementPath(this.endContainer, this.root), e = c.block, f = d.block, k = null;
                if (!c.blockLimit.equals(d.blockLimit))return null;
                "br" != a && (e || (e = this.fixBlock(!0, a), f = (new CKEDITOR.dom.elementPath(this.endContainer,
                    this.root)).block), f || (f = this.fixBlock(!1, a)));
                c = e && this.checkStartOfBlock();
                d = f && this.checkEndOfBlock();
                this.deleteContents();
                e && e.equals(f) && (d ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END), f = null) : c ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (f = this.splitElement(e, b || !1), e.is("ul", "ol") || e.appendBogus()));
                return {
                    previousBlock: e, nextBlock: f, wasStartOfBlock: c,
                    wasEndOfBlock: d, elementPath: k
                }
            }, splitElement: function (a, b) {
                if (!this.collapsed)return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var c = this.extractContents(!1, b || !1), d = a.clone(!1, b || !1);
                c.appendTo(d);
                d.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return d
            }, removeEmptyBlocksAtEnd: function () {
                function a(g) {
                    return function (a) {
                        return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || g.is("table") && a.is("caption") ? !1 : !0
                    }
                }

                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(!1);
                return function (b) {
                    for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), e = d.block || d.blockLimit, f; e && !e.equals(d.root) && !e.getFirst(a(e));)f = e.getParent(), this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = f;
                    this.moveToBookmark(c)
                }
            }(), startPath: function () {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
            }, endPath: function () {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
            }, checkBoundaryOfElement: function (a,
                                                 b) {
                var d = b == CKEDITOR.START, e = this.clone();
                e.collapse(d);
                e[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                e = new CKEDITOR.dom.walker(e);
                e.evaluator = c(d);
                return e[d ? "checkBackward" : "checkForward"]()
            }, checkStartOfBlock: function () {
                var a = this.startContainer, c = this.startOffset;
                CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), f.test(a) && this.trim(0, 1));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                c = this.clone();
                c.collapse(!0);
                c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkBackward()
            }, checkEndOfBlock: function () {
                var a = this.endContainer, c = this.endOffset;
                CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), f.test(a) && this.trim(1, 0));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                c = this.clone();
                c.collapse(!1);
                c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkForward()
            }, getPreviousNode: function (a, b, c) {
                var d = this.clone();
                d.collapse(1);
                d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.previous()
            }, getNextNode: function (a, b, c) {
                var d = this.clone();
                d.collapse();
                d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.next()
            }, checkReadOnly: function () {
                function a(b, c) {
                    for (; b;) {
                        if (b.type ==
                            CKEDITOR.NODE_ELEMENT) {
                            if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable"))return 0;
                            if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c)))break
                        }
                        b = b.getParent()
                    }
                    return 1
                }

                return function () {
                    var b = this.startContainer, c = this.endContainer;
                    return !(a(b, c) && a(c, b))
                }
            }(), moveToElementEditablePosition: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1))return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                    !0;
                for (var c = 0; a;) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        b && this.endContainer && this.checkEndOfBlock() && f.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        c = 1;
                        break
                    }
                    if (a.type == CKEDITOR.NODE_ELEMENT)if (a.isEditable())this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock())this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                    else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a), this.setEndAfter(a), !0;
                    var d = a, e = c, l = void 0;
                    d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (l = d[b ? "getLast" : "getFirst"](k));
                    e || l || (l = d[b ? "getPrevious" : "getNext"](k));
                    a = l
                }
                return !!c
            }, moveToClosestEditablePosition: function (a, b) {
                var c, d = 0, e, f, k = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, k[b ? 0 : 1])) : c = this.clone();
                if (a && !a.is(CKEDITOR.dtd.$block))d = 1; else if (e = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]())d = 1, (f = e.type == CKEDITOR.NODE_ELEMENT) && e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && f && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, k[b ? 1 : 0]);
                d && this.moveToRange(c);
                return !!d
            }, moveToElementEditStart: function (a) {
                return this.moveToElementEditablePosition(a)
            },
            moveToElementEditEnd: function (a) {
                return this.moveToElementEditablePosition(a, !0)
            }, getEnclosedNode: function () {
                var a = this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT)return null;
                var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0);
                a.evaluator = function (a) {
                    return c(a) && b(a)
                };
                var d = a.next();
                a.reset();
                return d && d.equals(a.previous()) ? d : null
            }, getTouchedStartNode: function () {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            }, getTouchedEndNode: function () {
                var a = this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            }, getNextEditableNode: d(), getPreviousEditableNode: d(1), scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, c, d, e = this.clone();
                e.optimize();
                (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(),
                    b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) : e.insertNode(a);
                a.scrollIntoView();
                d && (e.startContainer.setText(c), b.remove());
                a.remove()
            }, _setStartContainer: function (a) {
                this.startContainer = a
            }, _setEndContainer: function (a) {
                this.endContainer = a
            }, _find: function (a, b) {
                var c = this.getCommonAncestor(), d = this.getBoundaryNodes(), e = [], f, k;
                if (c && c.find)for (k = c.find(a), f = 0; f < k.count(); f++)c = k.getItem(f), (b || !c.isReadOnly()) && c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING && c.getPosition(d.endNode) &
                CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED && e.push(c);
                return e
            }
        }
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function () {
        function a(a) {
            1 > arguments.length || (this.range = a, this.forceBrBreak =
                0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
        }

        function e(a) {
            var b = [];
            a.forEach(function (a) {
                if ("true" == a.getAttribute("contenteditable"))return b.push(a), !1
            }, CKEDITOR.NODE_ELEMENT, !0);
            return b
        }

        function b(a, c, d, f) {
            a:{
                null == f && (f = e(d));
                for (var l; l = f.shift();)if (l.getDtd().p) {
                    f = {element: l, remaining: f};
                    break a
                }
                f = null
            }
            if (!f)return 0;
            if ((l = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !l.check(c))return b(a, c, d, f.remaining);
            c = new CKEDITOR.dom.range(f.element);
            c.selectNodeContents(f.element);
            c = c.createIterator();
            c.enlargeBr = a.enlargeBr;
            c.enforceRealBlocks = a.enforceRealBlocks;
            c.activeFilter = c.filter = l;
            a._.nestedEditable = {element: f.element, container: d, remaining: f.remaining, iterator: c};
            return 1
        }

        function c(a, b, c) {
            if (!b)return !1;
            a = a.clone();
            a.collapse(!c);
            return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
        }

        var d = /^[\r\n\t ]+$/, l = CKEDITOR.dom.walker.bookmark(!1, !0), m = CKEDITOR.dom.walker.whitespaces(!0), f = function (a) {
            return l(a) && m(a)
        }, h = {dd: 1, dt: 1, li: 1};
        a.prototype = {
            getNextParagraph: function (a) {
                var g,
                    e, m, u, v;
                a = a || "p";
                if (this._.nestedEditable) {
                    if (g = this._.nestedEditable.iterator.getNextParagraph(a))return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g;
                    this.activeFilter = this.filter;
                    if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining))return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
                    this._.nestedEditable = null
                }
                if (!this.range.root.getDtd()[a])return null;
                if (!this._.started) {
                    var t = this.range.clone();
                    e = t.startPath();
                    var r = t.endPath(), q = !t.collapsed && c(t, e.block), A = !t.collapsed && c(t, r.block, 1);
                    t.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
                    q && t.setStartAt(e.block, CKEDITOR.POSITION_BEFORE_END);
                    A && t.setEndAt(r.block, CKEDITOR.POSITION_AFTER_START);
                    e = t.endContainer.hasAscendant("pre", !0) || t.startContainer.hasAscendant("pre", !0);
                    t.enlarge(this.forceBrBreak && !e || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    t.collapsed || (e = new CKEDITOR.dom.walker(t.clone()), r = CKEDITOR.dom.walker.bookmark(!0,
                        !0), e.evaluator = r, this._.nextNode = e.next(), e = new CKEDITOR.dom.walker(t.clone()), e.evaluator = r, e = e.previous(), this._.lastNode = e.getNextSourceNode(!0, null, t.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (r = this.range.clone(), r.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), r.checkEndOfBlock() && (r = new CKEDITOR.dom.elementPath(r.endContainer, r.root), this._.lastNode = (r.block ||
                    r.blockLimit).getNextSourceNode(!0))), this._.lastNode && t.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = t.document.createText(""), this._.lastNode.insertAfter(e)), t = null);
                    this._.started = 1;
                    e = t
                }
                r = this._.nextNode;
                t = this._.lastNode;
                for (this._.nextNode = null; r;) {
                    var q = 0, A = r.hasAscendant("pre"), B = r.type != CKEDITOR.NODE_ELEMENT, w = 0;
                    if (B)r.type == CKEDITOR.NODE_TEXT && d.test(r.getText()) && (B = 0); else {
                        var y = r.getName();
                        if (CKEDITOR.dtd.$block[y] && "false" == r.getAttribute("contenteditable")) {
                            g =
                                r;
                            b(this, a, g);
                            break
                        } else if (r.isBlockBoundary(this.forceBrBreak && !A && {br: 1})) {
                            if ("br" == y)B = 1; else if (!e && !r.getChildCount() && "hr" != y) {
                                g = r;
                                m = r.equals(t);
                                break
                            }
                            e && (e.setEndAt(r, CKEDITOR.POSITION_BEFORE_START), "br" != y && (this._.nextNode = r));
                            q = 1
                        } else {
                            if (r.getFirst()) {
                                e || (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
                                r = r.getFirst();
                                continue
                            }
                            B = 1
                        }
                    }
                    B && !e && (e = this.range.clone(), e.setStartAt(r, CKEDITOR.POSITION_BEFORE_START));
                    m = (!q || B) && r.equals(t);
                    if (e && !q)for (; !r.getNext(f) && !m;) {
                        y =
                            r.getParent();
                        if (y.isBlockBoundary(this.forceBrBreak && !A && {br: 1})) {
                            q = 1;
                            B = 0;
                            m || y.equals(t);
                            e.setEndAt(y, CKEDITOR.POSITION_BEFORE_END);
                            break
                        }
                        r = y;
                        B = 1;
                        m = r.equals(t);
                        w = 1
                    }
                    B && e.setEndAt(r, CKEDITOR.POSITION_AFTER_END);
                    r = this._getNextSourceNode(r, w, t);
                    if ((m = !r) || q && e)break
                }
                if (!g) {
                    if (!e)return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    g = new CKEDITOR.dom.elementPath(e.startContainer, e.root);
                    r = g.blockLimit;
                    q = {div: 1, th: 1, td: 1};
                    g = g.block;
                    !g && r && !this.enforceRealBlocks && q[r.getName()] &&
                    e.checkStartOfBlock() && e.checkEndOfBlock() && !r.equals(e.root) ? g = r : !g || this.enforceRealBlocks && g.is(h) ? (g = this.range.document.createElement(a), e.extractContents().appendTo(g), g.trim(), e.insertNode(g), u = v = !0) : "li" != g.getName() ? e.checkStartOfBlock() && e.checkEndOfBlock() || (g = g.clone(!1), e.extractContents().appendTo(g), g.trim(), v = e.splitBlock(), u = !v.wasStartOfBlock, v = !v.wasEndOfBlock, e.insertNode(g)) : m || (this._.nextNode = g.equals(t) ? null : this._getNextSourceNode(e.getBoundaryNodes().endNode, 1, t))
                }
                u && (u =
                    g.getPrevious()) && u.type == CKEDITOR.NODE_ELEMENT && ("br" == u.getName() ? u.remove() : u.getLast() && "br" == u.getLast().$.nodeName.toLowerCase() && u.getLast().remove());
                v && (u = g.getLast()) && u.type == CKEDITOR.NODE_ELEMENT && "br" == u.getName() && (!CKEDITOR.env.needsBrFiller || u.getPrevious(l) || u.getNext(l)) && u.remove();
                this._.nextNode || (this._.nextNode = m || g.equals(t) || !t ? null : this._getNextSourceNode(g, 1, t));
                return g
            }, _getNextSourceNode: function (a, b, c) {
                function d(a) {
                    return !(a.equals(c) || a.equals(e))
                }

                var e = this.range.root;
                for (a = a.getNextSourceNode(b, null, d); !l(a);)a = a.getNextSourceNode(b, null, d);
                return a
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function () {
            return new a(this)
        }
    }(), CKEDITOR.command = function (a, e) {
        this.uiItems = [];
        this.exec = function (b) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed())return !1;
            this.editorFocus && a.focus();
            return !1 === this.fire("exec") ? !0 : !1 !== e.exec.call(this, a, b)
        };
        this.refresh = function (a, b) {
            if (!this.readOnly && a.readOnly)return !0;
            if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0))return this.disable(), !0;
            this.startDisabled || this.enable();
            this.modes && !this.modes[a.mode] && this.disable();
            return !1 === this.fire("refresh", {
                editor: a,
                path: b
            }) ? !0 : e.refresh && !1 !== e.refresh.apply(this, arguments)
        };
        var b;
        this.checkAllowed = function (c) {
            return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b
        };
        CKEDITOR.tools.extend(this, e, {
            modes: {wysiwyg: 1},
            editorFocus: 1,
            contextSensitive: !!e.context,
            state: CKEDITOR.TRISTATE_DISABLED
        });
        CKEDITOR.event.call(this)
    }, CKEDITOR.command.prototype =
    {
        enable: function () {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
        }, disable: function () {
        this.setState(CKEDITOR.TRISTATE_DISABLED)
    }, setState: function (a) {
        if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed())return !1;
        this.previousState = this.state;
        this.state = a;
        this.fire("state");
        return !0
    }, toggleState: function () {
        this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
        this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
    }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "\x3c!DOCTYPE html\x3e",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        contentsCss: CKEDITOR.getUrl("contents.css"),
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1E4,
        blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    }, function () {
        function a(a, b, c, d, e) {
            var g, f;
            a = [];
            for (g in b) {
                f = b[g];
                f = "boolean" == typeof f ? {} : "function" == typeof f ? {match: f} : E(f);
                "$" != g.charAt(0) && (f.elements = g);
                c && (f.featureName = c.toLowerCase());
                var k = f;
                k.elements = m(k.elements, /\s+/) || null;
                k.propertiesOnly = k.propertiesOnly || !0 === k.elements;
                var l = /\s*,\s*/, h = void 0;
                for (h in M) {
                    k[h] = m(k[h],
                            l) || null;
                    var w = k, n = O[h], t = m(k[O[h]], l), y = k[h], B = [], r = !0, C = void 0;
                    t ? r = !1 : t = {};
                    for (C in y)"!" == C.charAt(0) && (C = C.slice(1), B.push(C), t[C] = !0, r = !1);
                    for (; C = B.pop();)y[C] = y["!" + C], delete y["!" + C];
                    w[n] = (r ? !1 : t) || null
                }
                k.match = k.match || null;
                d.push(f);
                a.push(f)
            }
            b = e.elements;
            e = e.generic;
            var v;
            c = 0;
            for (d = a.length; c < d; ++c) {
                g = E(a[c]);
                f = !0 === g.classes || !0 === g.styles || !0 === g.attributes;
                k = g;
                h = n = l = void 0;
                for (l in M)k[l] = q(k[l]);
                w = !0;
                for (h in O) {
                    l = O[h];
                    n = k[l];
                    t = [];
                    y = void 0;
                    for (y in n)-1 < y.indexOf("*") ? t.push(new RegExp("^" +
                        y.replace(/\*/g, ".*") + "$")) : t.push(y);
                    n = t;
                    n.length && (k[l] = n, w = !1)
                }
                k.nothingRequired = w;
                k.noProperties = !(k.attributes || k.classes || k.styles);
                if (!0 === g.elements || null === g.elements)e[f ? "unshift" : "push"](g); else for (v in k = g.elements, delete g.elements, k)if (b[v])b[v][f ? "unshift" : "push"](g); else b[v] = [g]
            }
        }

        function e(a, c, d, g) {
            if (!a.match || a.match(c))if (g || f(a, c))if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles,
                    c.styles, d.validStyles)), !d.allClasses) {
                a = a.classes;
                c = c.classes;
                g = d.validClasses;
                if (a)if (!0 === a)a = !0; else {
                    for (var e = 0, k = c.length, l; e < k; ++e)l = c[e], g[l] || (g[l] = a(l));
                    a = !1
                } else a = !1;
                d.allClasses = a
            }
        }

        function b(a, b, c) {
            if (!a)return !1;
            if (!0 === a)return !0;
            for (var d in b)c[d] || (c[d] = a(d));
            return !1
        }

        function c(a, b, c) {
            if (!a.match || a.match(b)) {
                if (a.noProperties)return !1;
                c.hadInvalidAttribute = d(a.attributes, b.attributes) || c.hadInvalidAttribute;
                c.hadInvalidStyle = d(a.styles, b.styles) || c.hadInvalidStyle;
                a = a.classes;
                b = b.classes;
                if (a) {
                    for (var g = !1, e = !0 === a, f = b.length; f--;)if (e || a(b[f]))b.splice(f, 1), g = !0;
                    a = g
                } else a = !1;
                c.hadInvalidClass = a || c.hadInvalidClass
            }
        }

        function d(a, b) {
            if (!a)return !1;
            var c = !1, d = !0 === a, g;
            for (g in b)if (d || a(g))delete b[g], c = !0;
            return c
        }

        function l(a, b, c) {
            if (a.disabled || a.customConfig && !c || !b)return !1;
            a._.cachedChecks = {};
            return !0
        }

        function m(a, b) {
            if (!a)return !1;
            if (!0 === a)return a;
            if ("string" == typeof a)return a = J(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
            if (CKEDITOR.tools.isArray(a))return a.length ?
                CKEDITOR.tools.convertArrayToObject(a) : !1;
            var c = {}, d = 0, g;
            for (g in a)c[g] = a[g], d++;
            return d ? c : !1
        }

        function f(a, b) {
            if (a.nothingRequired)return !0;
            var c, d, g, e;
            if (g = a.requiredClasses)for (e = b.classes, c = 0; c < g.length; ++c)if (d = g[c], "string" == typeof d) {
                if (-1 == CKEDITOR.tools.indexOf(e, d))return !1
            } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(e, d))return !1;
            return h(b.styles, a.requiredStyles) && h(b.attributes, a.requiredAttributes)
        }

        function h(a, b) {
            if (!b)return !0;
            for (var c = 0, d; c < b.length; ++c)if (d = b[c], "string" == typeof d) {
                if (!(d in a))return !1
            } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d))return !1;
            return !0
        }

        function k(a) {
            if (!a)return {};
            a = a.split(/\s*,\s*/).sort();
            for (var b = {}; a.length;)b[a.shift()] = "cke-test";
            return b
        }

        function g(a) {
            var b, c, d, g, e = {}, f = 1;
            for (a = J(a); b = a.match(I);)(c = b[2]) ? (d = n(c, "styles"), g = n(c, "attrs"), c = n(c, "classes")) : d = g = c = null, e["$" + f++] = {
                elements: b[1],
                classes: c,
                styles: d,
                attributes: g
            }, a = a.slice(b[0].length);
            return e
        }

        function n(a, b) {
            var c = a.match(R[b]);
            return c ? J(c[1]) : null
        }

        function p(a) {
            var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"];
            a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1));
            a.classes || (a.classes = c ? c.split(/\s+/) : [])
        }

        function u(a, b, d, g) {
            var f = 0, k;
            g.toHtml && (b.name = b.name.replace(P, "$1"));
            if (g.doCallbacks && a.elementCallbacks) {
                a:{
                    k = a.elementCallbacks;
                    for (var l = 0, h = k.length, m; l < h; ++l)if (m = k[l](b)) {
                        k = m;
                        break a
                    }
                    k = void 0
                }
                if (k)return k
            }
            if (g.doTransform && (k = a._.transformations[b.name])) {
                p(b);
                for (l = 0; l < k.length; ++l)y(a, b, k[l]);
                t(b)
            }
            if (g.doFilter) {
                a:{
                    l =
                        b.name;
                    h = a._;
                    a = h.allowedRules.elements[l];
                    k = h.allowedRules.generic;
                    l = h.disallowedRules.elements[l];
                    h = h.disallowedRules.generic;
                    m = g.skipRequired;
                    var w = {
                        valid: !1,
                        validAttributes: {},
                        validClasses: {},
                        validStyles: {},
                        allAttributes: !1,
                        allClasses: !1,
                        allStyles: !1,
                        hadInvalidAttribute: !1,
                        hadInvalidClass: !1,
                        hadInvalidStyle: !1
                    }, n, B;
                    if (a || k) {
                        p(b);
                        if (l)for (n = 0, B = l.length; n < B; ++n)if (!1 === c(l[n], b, w)) {
                            a = null;
                            break a
                        }
                        if (h)for (n = 0, B = h.length; n < B; ++n)c(h[n], b, w);
                        if (a)for (n = 0, B = a.length; n < B; ++n)e(a[n], b, w, m);
                        if (k)for (n =
                                       0, B = k.length; n < B; ++n)e(k[n], b, w, m);
                        a = w
                    } else a = null
                }
                if (!a || !a.valid)return d.push(b), 1;
                B = a.validAttributes;
                var C = a.validStyles;
                k = a.validClasses;
                var l = b.attributes, q = b.styles, h = b.classes;
                m = b.classBackup;
                var v = b.styleBackup, I, u, x = [], w = [], A = /^data-cke-/;
                n = !1;
                delete l.style;
                delete l["class"];
                delete b.classBackup;
                delete b.styleBackup;
                if (!a.allAttributes)for (I in l)B[I] || (A.test(I) ? I == (u = I.replace(/^data-cke-saved-/, "")) || B[u] || (delete l[I], n = !0) : (delete l[I], n = !0));
                if (!a.allStyles || a.hadInvalidStyle) {
                    for (I in q)a.allStyles ||
                    C[I] ? x.push(I + ":" + q[I]) : n = !0;
                    x.length && (l.style = x.sort().join("; "))
                } else v && (l.style = v);
                if (!a.allClasses || a.hadInvalidClass) {
                    for (I = 0; I < h.length; ++I)(a.allClasses || k[h[I]]) && w.push(h[I]);
                    w.length && (l["class"] = w.sort().join(" "));
                    m && w.length < m.split(/\s+/).length && (n = !0)
                } else m && (l["class"] = m);
                n && (f = 1);
                if (!g.skipFinalValidation && !r(b))return d.push(b), 1
            }
            g.toHtml && (b.name = b.name.replace(T, "cke:$1"));
            return f
        }

        function v(a) {
            var b = [], c;
            for (c in a)-1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
            return b.length ?
                new RegExp("^(?:" + b.join("|") + ")$") : null
        }

        function t(a) {
            var b = a.attributes, c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, !0))b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }

        function r(a) {
            switch (a.name) {
                case "a":
                    if (!(a.children.length || a.attributes.name || a.attributes.id))return !1;
                    break;
                case "img":
                    if (!a.attributes.src)return !1
            }
            return !0
        }

        function q(a) {
            if (!a)return !1;
            if (!0 === a)return !0;
            var b = v(a);
            return function (c) {
                return c in a || b && c.match(b)
            }
        }

        function A() {
            return new CKEDITOR.htmlParser.element("br")
        }

        function B(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || F.$block[a.name])
        }

        function w(a, b, c) {
            var d = a.name;
            if (F.$empty[d] || !a.children.length)"hr" == d && "br" == b ? a.replaceWith(A()) : (a.parent && c.push({
                check: "it",
                el: a.parent
            }), a.remove()); else if (F.$block[d] || "tr" == d)if ("br" == b)a.previous && !B(a.previous) && (b = A(), b.insertBefore(a)), a.next && !B(a.next) && (b = A(), b.insertAfter(a)), a.replaceWithChildren(); else {
                var d = a.children, g;
                b:{
                    g = F[b];
                    for (var e = 0, f = d.length, k; e < f; ++e)if (k = d[e], k.type == CKEDITOR.NODE_ELEMENT && !g[k.name]) {
                        g = !1;
                        break b
                    }
                    g = !0
                }
                if (g)a.name = b, a.attributes = {}, c.push({check: "parent-down", el: a}); else {
                    g = a.parent;
                    for (var e = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, l, h, f = d.length; 0 < f;)k = d[--f], e && (k.type == CKEDITOR.NODE_TEXT || k.type == CKEDITOR.NODE_ELEMENT && F.$inline[k.name]) ? (l || (l = new CKEDITOR.htmlParser.element(b), l.insertAfter(a), c.push({
                        check: "parent-down",
                        el: l
                    })), l.add(k, 0)) : (l = null, h = F[g.name] || F.span, k.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || k.type != CKEDITOR.NODE_ELEMENT ||
                    h[k.name] || c.push({check: "el-up", el: k}));
                    a.remove()
                }
            } else d in {style: 1, script: 1} ? a.remove() : (a.parent && c.push({
                check: "it",
                el: a.parent
            }), a.replaceWithChildren())
        }

        function y(a, b, c) {
            var d, g;
            for (d = 0; d < c.length; ++d)if (g = c[d], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) {
                g.right(b, H);
                break
            }
        }

        function C(a, b) {
            var c = b.getDefinition(), d = c.attributes, g = c.styles, e, f, k, l;
            if (a.name != c.element)return !1;
            for (e in d)if ("class" == e)for (c = d[e].split(/\s+/), k = a.classes.join("|"); l = c.pop();) {
                if (-1 == k.indexOf(l))return !1
            } else if (a.attributes[e] !=
                d[e])return !1;
            for (f in g)if (a.styles[f] != g[f])return !1;
            return !0
        }

        function x(a, b) {
            var c, d;
            "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]);
            return [{
                element: c, left: d, right: function (a, c) {
                    c.transform(a, b)
                }
            }]
        }

        function z(a) {
            return function (b) {
                return C(b, a)
            }
        }

        function D(a) {
            return function (b, c) {
                c[a](b)
            }
        }

        var F = CKEDITOR.dtd, E = CKEDITOR.tools.copy, J = CKEDITOR.tools.trim, G = ["", "p", "br", "div"];
        CKEDITOR.FILTER_SKIP_TREE = 2;
        CKEDITOR.filter = function (a) {
            this.allowedContent = [];
            this.disallowedContent =
                [];
            this.elementCallbacks = null;
            this.disabled = !1;
            this.editor = null;
            this.id = CKEDITOR.tools.getNextNumber();
            this._ = {
                allowedRules: {elements: {}, generic: []},
                disallowedRules: {elements: {}, generic: []},
                transformations: {},
                cachedTests: {}
            };
            CKEDITOR.filter.instances[this.id] = this;
            if (a instanceof CKEDITOR.editor) {
                a = this.editor = a;
                this.customConfig = !0;
                var b = a.config.allowedContent;
                !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(G[a.enterMode] +
                    " " + G[a.shiftEnterMode], "default", 1), this.disallow(a.config.disallowedContent))
            } else this.customConfig = !1, this.allow(a, "default", 1)
        };
        CKEDITOR.filter.instances = {};
        CKEDITOR.filter.prototype = {
            allow: function (b, c, d) {
                if (!l(this, b, d))return !1;
                var e, f;
                if ("string" == typeof b)b = g(b); else if (b instanceof CKEDITOR.style) {
                    if (b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor), c, d);
                    e = b.getDefinition();
                    b = {};
                    d = e.attributes;
                    b[e.element] = e = {
                        styles: e.styles,
                        requiredStyles: e.styles && CKEDITOR.tools.objectKeys(e.styles)
                    };
                    d && (d = E(d), e.classes = d["class"] ? d["class"].split(/\s+/) : null, e.requiredClasses = e.classes, delete d["class"], e.attributes = d, e.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
                } else if (CKEDITOR.tools.isArray(b)) {
                    for (e = 0; e < b.length; ++e)f = this.allow(b[e], c, d);
                    return f
                }
                a(this, b, c, this.allowedContent, this._.allowedRules);
                return !0
            }, applyTo: function (a, b, c, d) {
                if (this.disabled)return !1;
                var g = this, e = [], f = this.editor && this.editor.config.protectedSource, k, l = !1, h = {
                    doFilter: !c,
                    doTransform: !0,
                    doCallbacks: !0,
                    toHtml: b
                };
                a.forEach(function (a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == a.attributes["data-cke-filter"])return !1;
                        if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))if (k = u(g, a, e, h), k & 1)l = !0; else if (k & 2)return !1
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a:{
                            var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                            c = [];
                            var m, w, n;
                            if (f)for (w = 0; w < f.length; ++w)if ((n = d.match(f[w])) && n[0].length == d.length) {
                                c = !0;
                                break a
                            }
                            d = CKEDITOR.htmlParser.fragment.fromHtml(d);
                            1 == d.children.length && (m = d.children[0]).type == CKEDITOR.NODE_ELEMENT && u(g, m, c, h);
                            c = !c.length
                        }
                        c || e.push(a)
                    }
                }, null, !0);
                e.length && (l = !0);
                var m;
                a = [];
                d = G[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
                for (var n; c = e.pop();)c.type == CKEDITOR.NODE_ELEMENT ? w(c, d, a) : c.remove();
                for (; m = a.pop();)if (c = m.el, c.parent)switch (n = F[c.parent.name] || F.span, m.check) {
                    case "it":
                        F.$removeEmpty[c.name] && !c.children.length ? w(c, d, a) : r(c) || w(c, d, a);
                        break;
                    case "el-up":
                        c.parent.type ==
                        CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || w(c, d, a);
                        break;
                    case "parent-down":
                        c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || w(c.parent, d, a)
                }
                return l
            }, checkFeature: function (a) {
                if (this.disabled || !a)return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent)
            }, disable: function () {
                this.disabled = !0
            }, disallow: function (b) {
                if (!l(this, b, !0))return !1;
                "string" == typeof b && (b = g(b));
                a(this, b, null, this.disallowedContent, this._.disallowedRules);
                return !0
            },
            addContentForms: function (a) {
                if (!this.disabled && a) {
                    var b, c, d = [], g;
                    for (b = 0; b < a.length && !g; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (g = c);
                    if (g) {
                        for (b = 0; b < a.length; ++b)d.push(x(a[b], g));
                        this.addTransformations(d)
                    }
                }
            }, addElementCallback: function (a) {
                this.elementCallbacks || (this.elementCallbacks = []);
                this.elementCallbacks.push(a)
            }, addFeature: function (a) {
                if (this.disabled || !a)return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
            }, addTransformations: function (a) {
                var b, c;
                if (!this.disabled && a) {
                    var d = this._.transformations, g;
                    for (g = 0; g < a.length; ++g) {
                        b = a[g];
                        var e = void 0, f = void 0, k = void 0, l = void 0, h = void 0, m = void 0;
                        c = [];
                        for (f = 0; f < b.length; ++f)k = b[f], "string" == typeof k ? (k = k.split(/\s*:\s*/), l = k[0], h = null, m = k[1]) : (l = k.check, h = k.left, m = k.right), e || (e = k, e = e.element ? e.element : l ? l.match(/^([a-z0-9]+)/i)[0] :
                            e.left.getDefinition().element), h instanceof CKEDITOR.style && (h = z(h)), c.push({
                            check: l == e ? null : l,
                            left: h,
                            right: "string" == typeof m ? D(m) : m
                        });
                        b = e;
                        d[b] || (d[b] = []);
                        d[b].push(c)
                    }
                }
            }, check: function (a, b, c) {
                if (this.disabled)return !0;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var d = a.length; d--;)if (this.check(a[d], b, c))return !0;
                    return !1
                }
                var e, f;
                if ("string" == typeof a) {
                    f = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
                    if (f in this._.cachedChecks)return this._.cachedChecks[f];
                    d = g(a).$1;
                    e = d.styles;
                    var l = d.classes;
                    d.name = d.elements;
                    d.classes = l = l ? l.split(/\s*,\s*/) : [];
                    d.styles = k(e);
                    d.attributes = k(d.attributes);
                    d.children = [];
                    l.length && (d.attributes["class"] = l.join(" "));
                    e && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
                    e = d
                } else d = a.getDefinition(), e = d.styles, l = d.attributes || {}, e && !CKEDITOR.tools.isEmpty(e) ? (e = E(e), l.style = CKEDITOR.tools.writeCssText(e, !0)) : e = {}, e = {
                    name: d.element,
                    attributes: l,
                    classes: l["class"] ? l["class"].split(/\s+/) : [],
                    styles: e,
                    children: []
                };
                var l = CKEDITOR.tools.clone(e), h = [], m;
                if (!1 !== b && (m = this._.transformations[e.name])) {
                    for (d =
                             0; d < m.length; ++d)y(this, e, m[d]);
                    t(e)
                }
                u(this, l, h, {doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c});
                b = 0 < h.length ? !1 : CKEDITOR.tools.objectCompare(e.attributes, l.attributes, !0) ? !0 : !1;
                "string" == typeof a && (this._.cachedChecks[f] = b);
                return b
            }, getAllowedEnterMode: function () {
                var a = ["p", "div", "br"], b = {p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR};
                return function (c, d) {
                    var e = a.slice(), g;
                    if (this.check(G[c]))return c;
                    for (d || (e = e.reverse()); g = e.pop();)if (this.check(g))return b[g];
                    return CKEDITOR.ENTER_BR
                }
            }(), destroy: function () {
                delete CKEDITOR.filter.instances[this.id];
                delete this._;
                delete this.allowedContent;
                delete this.disallowedContent
            }
        };
        var M = {styles: 1, attributes: 1, classes: 1}, O = {
                styles: "requiredStyles",
                attributes: "requiredAttributes",
                classes: "requiredClasses"
            }, I = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, R = {
                styles: /{([^}]+)}/,
                attrs: /\[([^\]]+)\]/,
                classes: /\(([^\)]+)\)/
            }, P = /^cke:(object|embed|param)$/,
            T = /^(object|embed|param)$/, H;
        H = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function (a) {
                this.lengthToStyle(a, "width");
                this.lengthToStyle(a, "height")
            }, sizeToAttribute: function (a) {
                this.lengthToAttribute(a, "width");
                this.lengthToAttribute(a, "height")
            }, lengthToStyle: function (a, b, c) {
                c = c || b;
                if (!(c in a.styles)) {
                    var d = a.attributes[b];
                    d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
                }
                delete a.attributes[b]
            }, lengthToAttribute: function (a, b, c) {
                c = c || b;
                if (!(c in a.attributes)) {
                    var d = a.styles[b], e = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                    e ? a.attributes[c] = e[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
                }
                delete a.styles[b]
            }, alignmentToStyle: function (a) {
                if (!("float" in a.styles)) {
                    var b = a.attributes.align;
                    if ("left" == b || "right" == b)a.styles["float"] = b
                }
                delete a.attributes.align
            }, alignmentToAttribute: function (a) {
                if (!("align" in a.attributes)) {
                    var b = a.styles["float"];
                    if ("left" == b || "right" == b)a.attributes.align = b
                }
                delete a.styles["float"]
            }, matchesStyle: C, transform: function (a, b) {
                if ("string" == typeof b)a.name = b; else {
                    var c = b.getDefinition(), d = c.styles,
                        e = c.attributes, g, f, k, l;
                    a.name = c.element;
                    for (g in e)if ("class" == g)for (c = a.classes.join("|"), k = e[g].split(/\s+/); l = k.pop();)-1 == c.indexOf(l) && a.classes.push(l); else a.attributes[g] = e[g];
                    for (f in d)a.styles[f] = d[f]
                }
            }
        }
    }(), function () {
        CKEDITOR.focusManager = function (a) {
            if (a.focusManager)return a.focusManager;
            this.hasFocus = !1;
            this.currentActive = null;
            this._ = {editor: a};
            return this
        };
        CKEDITOR.focusManager._ = {blurDelay: 200};
        CKEDITOR.focusManager.prototype = {
            focus: function (a) {
                this._.timer && clearTimeout(this._.timer);
                a && (this.currentActive = a);
                this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
            }, lock: function () {
                this._.locked = 1
            }, unlock: function () {
                delete this._.locked
            }, blur: function (a) {
                function e() {
                    if (this.hasFocus) {
                        this.hasFocus = !1;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus");
                        this._.editor.fire("blur")
                    }
                }

                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var b =
                        CKEDITOR.focusManager._.blurDelay;
                    a || !b ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
                        delete this._.timer;
                        e.call(this)
                    }, b, this)
                }
            }, add: function (a, e) {
                var b = a.getCustomData("focusmanager");
                if (!b || b != this) {
                    b && b.remove(a);
                    var b = "focus", c = "blur";
                    e && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
                    var d = {
                        blur: function () {
                            a.equals(this.currentActive) && this.blur()
                        }, focus: function () {
                            this.focus(a)
                        }
                    };
                    a.on(b, d.focus, this);
                    a.on(c, d.blur, this);
                    e && (CKEDITOR.event.useCapture =
                        0);
                    a.setCustomData("focusmanager", this);
                    a.setCustomData("focusmanager_handlers", d)
                }
            }, remove: function (a) {
                a.removeCustomData("focusmanager");
                var e = a.removeCustomData("focusmanager_handlers");
                a.removeListener("blur", e.blur);
                a.removeListener("focus", e.focus)
            }
        }
    }(), CKEDITOR.keystrokeHandler = function (a) {
        if (a.keystrokeHandler)return a.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = {editor: a};
        return this
    }, function () {
        var a, e = function (b) {
            b = b.data;
            var d = b.getKeystroke(), e = this.keystrokes[d],
                m = this._.editor;
            a = !1 === m.fire("key", {keyCode: d, domEvent: b});
            a || (e && (a = !1 !== m.execCommand(e, {from: "keystrokeHandler"})), a || (a = !!this.blockedKeystrokes[d]));
            a && b.preventDefault(!0);
            return !a
        }, b = function (b) {
            a && (a = !1, b.data.preventDefault(!0))
        };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function (a) {
                a.on("keydown", e, this);
                if (CKEDITOR.env.gecko && CKEDITOR.env.mac)a.on("keypress", b, this)
            }
        }
    }(), function () {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                "de-ch": 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                tt: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            }, rtl: {ar: 1, fa: 1, he: 1, ku: 1, ug: 1}, load: function (a, e, b) {
                a && CKEDITOR.lang.languages[a] || (a = this.detect(e, a));
                var c = this;
                e = function () {
                    c[a].dir = c.rtl[a] ? "rtl" : "ltr";
                    b(a, c[a])
                };
                this[a] ? e() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" +
                    a + ".js"), e, this)
            }, detect: function (a, e) {
                var b = this.languages;
                e = e || navigator.userLanguage || navigator.language || a;
                var c = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), d = c[1], c = c[2];
                b[d + "-" + c] ? d = d + "-" + c : b[d] || (d = null);
                CKEDITOR.lang.detect = d ? function () {
                    return d
                } : function (a) {
                    return a
                };
                return d || a
            }
        }
    }(), CKEDITOR.scriptLoader = function () {
        var a = {}, e = {};
        return {
            load: function (b, c, d, l) {
                var m = "string" == typeof b;
                m && (b = [b]);
                d || (d = CKEDITOR);
                var f = b.length, h = [], k = [], g = function (a) {
                    c && (m ? c.call(d, a) : c.call(d, h, k))
                };
                if (0 ===
                    f)g(!0); else {
                    var n = function (a, b) {
                        (b ? h : k).push(a);
                        0 >= --f && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), g(b))
                    }, p = function (b, c) {
                        a[b] = 1;
                        var d = e[b];
                        delete e[b];
                        for (var g = 0; g < d.length; g++)d[g](b, c)
                    }, u = function (b) {
                        if (a[b])n(b, !0); else {
                            var d = e[b] || (e[b] = []);
                            d.push(n);
                            if (!(1 < d.length)) {
                                var g = new CKEDITOR.dom.element("script");
                                g.setAttributes({type: "text/javascript", src: b});
                                c && (CKEDITOR.env.ie && 8 >= CKEDITOR.env.version ? g.$.onreadystatechange = function () {
                                    if ("loaded" == g.$.readyState || "complete" ==
                                        g.$.readyState)g.$.onreadystatechange = null, p(b, !0)
                                } : (g.$.onload = function () {
                                    setTimeout(function () {
                                        p(b, !0)
                                    }, 0)
                                }, g.$.onerror = function () {
                                    p(b, !1)
                                }));
                                g.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    };
                    l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var v = 0; v < f; v++)u(b[v])
                }
            }, queue: function () {
                function a() {
                    var b;
                    (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
                }

                var c = [];
                return function (d, e) {
                    var m = this;
                    c.push({
                        scriptUrl: d, callback: function () {
                            e && e.apply(this, arguments);
                            c.shift();
                            a.call(m)
                        }
                    });
                    1 == c.length && a.call(this)
                }
            }()
        }
    }(), CKEDITOR.resourceManager = function (a, e) {
        this.basePath = a;
        this.fileName = e;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = {waitingList: {}}
    }, CKEDITOR.resourceManager.prototype = {
        add: function (a, e) {
            if (this.registered[a])throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
            var b = this.registered[a] = e || {};
            b.name = a;
            b.path = this.getPath(a);
            CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
            return this.get(a)
        },
        get: function (a) {
            return this.registered[a] || null
        }, getPath: function (a) {
            var e = this.externals[a];
            return CKEDITOR.getUrl(e && e.dir || this.basePath + a + "/")
        }, getFilePath: function (a) {
            var e = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (e ? e.file : this.fileName + ".js"))
        }, addExternal: function (a, e, b) {
            a = a.split(",");
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                b || (e = e.replace(/[^\/]+$/, function (a) {
                    b = a;
                    return ""
                }));
                this.externals[d] = {dir: e, file: b || this.fileName + ".js"}
            }
        }, load: function (a, e, b) {
            CKEDITOR.tools.isArray(a) ||
            (a = a ? [a] : []);
            for (var c = this.loaded, d = this.registered, l = [], m = {}, f = {}, h = 0; h < a.length; h++) {
                var k = a[h];
                if (k)if (c[k] || d[k])f[k] = this.get(k); else {
                    var g = this.getFilePath(k);
                    l.push(g);
                    g in m || (m[g] = []);
                    m[g].push(k)
                }
            }
            CKEDITOR.scriptLoader.load(l, function (a, d) {
                if (d.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "' + m[d[0]].join(",") + '" was not found at "' + d[0] + '".');
                for (var g = 0; g < a.length; g++)for (var k = m[a[g]], l = 0; l < k.length; l++) {
                    var h = k[l];
                    f[h] = this.get(h);
                    c[h] = 1
                }
                e.call(b, f)
            }, this)
        }
    }, CKEDITOR.plugins =
        new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
        var e = {};
        return function (b, c, d) {
            var l = {}, m = function (b) {
                a.call(this, b, function (a) {
                    CKEDITOR.tools.extend(l, a);
                    var b = [], g;
                    for (g in a) {
                        var f = a[g], p = f && f.requires;
                        if (!e[g]) {
                            if (f.icons)for (var u = f.icons.split(","), v = u.length; v--;)CKEDITOR.skin.addIcon(u[v], f.path + "icons/" + (CKEDITOR.env.hidpi && f.hidpi ? "hidpi/" : "") + u[v] + ".png");
                            e[g] = 1
                        }
                        if (p)for (p.split && (p = p.split(",")), f = 0; f < p.length; f++)l[p[f]] ||
                        b.push(p[f])
                    }
                    if (b.length)m.call(this, b); else {
                        for (g in l)f = l[g], f.onLoad && !f.onLoad._called && (!1 === f.onLoad() && delete l[g], f.onLoad._called = 1);
                        c && c.call(d || window, l)
                    }
                }, this)
            };
            m.call(this, b)
        }
    }), CKEDITOR.plugins.setLang = function (a, e, b) {
        var c = this.get(a);
        a = c.langEntries || (c.langEntries = {});
        c = c.lang || (c.lang = []);
        c.split && (c = c.split(","));
        -1 == CKEDITOR.tools.indexOf(c, e) && c.push(e);
        a[e] = b
    }, CKEDITOR.ui = function (a) {
        if (a.ui)return a.ui;
        this.items = {};
        this.instances = {};
        this.editor = a;
        this._ = {handlers: {}};
        return this
    },
        CKEDITOR.ui.prototype = {
            add: function (a, e, b) {
                b.name = a.toLowerCase();
                var c = this.items[a] = {
                    type: e,
                    command: b.command || null,
                    args: Array.prototype.slice.call(arguments, 2)
                };
                CKEDITOR.tools.extend(c, b)
            }, get: function (a) {
                return this.instances[a]
            }, create: function (a) {
                var e = this.items[a], b = e && this._.handlers[e.type], c = e && e.command && this.editor.getCommand(e.command), b = b && b.create.apply(this, e.args);
                this.instances[a] = b;
                c && c.uiItems.push(b);
                b && !b.type && (b.type = e.type);
                return b
            }, addHandler: function (a, e) {
                this._.handlers[a] =
                    e
            }, space: function (a) {
                return CKEDITOR.document.getById(this.spaceId(a))
            }, spaceId: function (a) {
                return this.editor.id + "_" + a
            }
        }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
        function a(a, d, g) {
            CKEDITOR.event.call(this);
            a = a && CKEDITOR.tools.clone(a);
            if (void 0 !== d) {
                if (!(d instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!g)throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");
                if (!b(d, g))throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
                this.element = d;
                this.elementMode = g;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || e();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager =
                new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly", c);
            this.on("selectionChange", function (a) {
                l(this, a.data.path)
            });
            this.on("activeFilterChange", function () {
                l(this, this.elementPath(), !0)
            });
            this.on("mode", c);
            this.on("instanceReady", function () {
                this.config.startupFocus && this.focus()
            });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function () {
                    "destroyed" !== this.status ? f(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
                },
                0, this)
        }

        function e() {
            do var a = "editor" + ++u; while (CKEDITOR.instances[a]);
            return a
        }

        function b(a, b) {
            return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1
        }

        function c() {
            var a = this.commands, b;
            for (b in a)d(this, a[b])
        }

        function d(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
        }

        function l(a, b, c) {
            if (b) {
                var d, g, e = a.commands;
                for (g in e)d = e[g], (c || d.contextSensitive) &&
                d.refresh(a, b)
            }
        }

        function m(a) {
            var b = a.config.customConfig;
            if (!b)return !1;
            var b = CKEDITOR.getUrl(b), c = v[b] || (v[b] = {});
            c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && m(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () {
                c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {
                };
                m(a)
            });
            return !0
        }

        function f(a, b) {
            a.on("customConfigLoaded", function () {
                if (b) {
                    if (b.on)for (var c in b.on)a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, !0);
                    delete a.config.on
                }
                c =
                    a.config;
                a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
                a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") ||
                    0;
                a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                c.skin && (CKEDITOR.skinName = c.skin);
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = a.activeFilter = new CKEDITOR.filter(a);
                h(a)
            });
            b && null != b.customConfig && (a.config.customConfig = b.customConfig);
            m(a) || a.fireOnce("customConfigLoaded")
        }

        function h(a) {
            CKEDITOR.skin.loadPart("editor", function () {
                k(a)
            })
        }

        function k(a) {
            CKEDITOR.lang.load(a.config.language,
                a.config.defaultLanguage, function (b, c) {
                    var d = a.config.title;
                    a.langCode = b;
                    a.lang = CKEDITOR.tools.prototypedCopy(c);
                    a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
                    a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
                    a.fire("langLoaded");
                    g(a)
                })
        }

        function g(a) {
            a.getStylesSet(function (b) {
                a.once("loaded", function () {
                    a.fire("stylesSet", {styles: b})
                }, null, null, 1);
                n(a)
            })
        }

        function n(a) {
            var b = a.config,
                c = b.plugins, d = b.extraPlugins, g = b.removePlugins;
            if (d)var e = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(e, ""), c = c + ("," + d);
            if (g)var f = new RegExp("(?:^|,)(?:" + g.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(f, "");
            CKEDITOR.env.air && (c += ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function (c) {
                var d = [], g = [], e = [];
                a.plugins = c;
                for (var k in c) {
                    var l = c[k], h = l.lang, m = null, w = l.requires, n;
                    CKEDITOR.tools.isArray(w) && (w = w.join(","));
                    if (w && (n = w.match(f)))for (; w = n.pop();)CKEDITOR.error("editor-plugin-required",
                        {plugin: w.replace(",", ""), requiredBy: k});
                    h && !a.lang[k] && (h.split && (h = h.split(",")), 0 <= CKEDITOR.tools.indexOf(h, a.langCode) ? m = a.langCode : (m = a.langCode.replace(/-.*/, ""), m = m != a.langCode && 0 <= CKEDITOR.tools.indexOf(h, m) ? m : 0 <= CKEDITOR.tools.indexOf(h, "en") ? "en" : h[0]), l.langEntries && l.langEntries[m] ? (a.lang[k] = l.langEntries[m], m = null) : e.push(CKEDITOR.getUrl(l.path + "lang/" + m + ".js")));
                    g.push(m);
                    d.push(l)
                }
                CKEDITOR.scriptLoader.load(e, function () {
                    for (var c = ["beforeInit", "init", "afterInit"], e = 0; e < c.length; e++)for (var f =
                        0; f < d.length; f++) {
                        var k = d[f];
                        0 === e && g[f] && k.lang && k.langEntries && (a.lang[k.name] = k.langEntries[g[f]]);
                        if (k[c[e]])k[c[e]](a)
                    }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (f = 0; f < a.config.blockedKeystrokes.length; f++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[f]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }

        function p() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return !0
            }
            return !1
        }

        a.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = a;
        var u = 0, v = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function (a, b) {
                b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                this.mode && d(this, c);
                return this.commands[a] = c
            }, _attachToForm: function () {
                function a(b) {
                    c.updateElement();
                    c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
                }

                function b(a) {
                    return !!(a && a.call && a.apply)
                }

                var c = this, d = c.element, g = new CKEDITOR.dom.element(d.$.form);
                d.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function (b) {
                    return function () {
                        a();
                        b.apply ? b.apply(this) : b()
                    }
                })), c.on("destroy", function () {
                    g.removeListener("submit", a)
                }))
            }, destroy: function (a) {
                this.fire("beforeDestroy");
                !a && p.call(this);
                this.editable(null);
                this.filter && (this.filter.destroy(), delete this.filter);
                delete this.activeFilter;
                this.status =
                    "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            }, elementPath: function (a) {
                if (!a) {
                    a = this.getSelection();
                    if (!a)return null;
                    a = a.getStartElement()
                }
                return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            }, createRange: function () {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null
            }, execCommand: function (a, b) {
                var c = this.getCommand(a), d = {name: a, commandData: b, command: c};
                return c && c.state != CKEDITOR.TRISTATE_DISABLED &&
                !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
            }, getCommand: function (a) {
                return this.commands[a]
            }, getData: function (a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "");
                b = {dataValue: b};
                !a && this.fire("getData", b);
                return b.dataValue
            }, getSnapshot: function () {
                var a = this.fire("getSnapshot");
                "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
                return a
            }, loadSnapshot: function (a) {
                this.fire("loadSnapshot", a)
            }, setData: function (a, b, c) {
                var d = !0, g = b;
                b && "object" == typeof b && (c = b.internal, g = b.callback, d = !b.noSnapshot);
                !c && d && this.fire("saveSnapshot");
                if (g || !c)this.once("dataReady", function (a) {
                    !c && d && this.fire("saveSnapshot");
                    g && g.call(a.editor)
                });
                a = {dataValue: a};
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            }, setReadOnly: function (a) {
                a = null == a || a;
                this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
            }, insertHtml: function (a, b, c) {
                this.fire("insertHtml", {dataValue: a, mode: b, range: c})
            }, insertText: function (a) {
                this.fire("insertText", a)
            }, insertElement: function (a) {
                this.fire("insertElement", a)
            }, getSelectedHtml: function (a) {
                var b = this.editable(), c = this.getSelection(), c = c && c.getRanges();
                if (!b || !c || 0 === c.length)return null;
                for (var d = new CKEDITOR.dom.documentFragment, g, e, f, k = 0; k < c.length; k++) {
                    var l = c[k], h = l.startContainer;
                    h.getName && "tr" == h.getName() ? (g || (g = h.getAscendant("table").clone(), g.append(h.getAscendant("tbody").clone()), d.append(g), g = g.findOne("tbody")), e && e.equals(h) || (e = h, f = h.clone(), g.append(f)), f.append(l.cloneContents())) : d.append(l.cloneContents())
                }
                b = g ? d : b.getHtmlFromRange(c[0]);
                return a ? b.getHtml() : b
            }, extractSelectedHtml: function (a, b) {
                var c = this.editable(), d = this.getSelection().getRanges();
                if (!c || 0 ===
                    d.length)return null;
                d = d[0];
                c = c.extractHtmlFromRange(d, b);
                b || this.getSelection().selectRanges([d]);
                return a ? c.getHtml() : c
            }, focus: function () {
                this.fire("beforeFocus")
            }, checkDirty: function () {
                return "ready" == this.status && this._.previousValue !== this.getSnapshot()
            }, resetDirty: function () {
                this._.previousValue = this.getSnapshot()
            }, updateElement: function () {
                return p.call(this)
            }, setKeystroke: function () {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments,
                    0)], c, d, g = b.length; g--;)c = b[g], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
            }, addFeature: function (a) {
                return this.filter.addFeature(a)
            }, setActiveFilter: function (a) {
                a || (a = this.filter);
                this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
            }, setActiveEnterMode: function (a, b) {
                a = a ? this.blockless ? CKEDITOR.ENTER_BR :
                    a : this.enterMode;
                b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                if (this.activeEnterMode != a || this.activeShiftEnterMode != b)this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
            }, showNotification: function (a) {
                alert(a)
            }
        })
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3,CKEDITOR.htmlParser = function () {
        this._ = {htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}
    },
        function () {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, e = {
                checked: 1,
                compact: 1,
                declare: 1,
                defer: 1,
                disabled: 1,
                ismap: 1,
                multiple: 1,
                nohref: 1,
                noresize: 1,
                noshade: 1,
                nowrap: 1,
                readonly: 1,
                selected: 1
            };
            CKEDITOR.htmlParser.prototype = {
                onTagOpen: function () {
                }, onTagClose: function () {
                }, onText: function () {
                }, onCDATA: function () {
                }, onComment: function () {
                }, parse: function (b) {
                    for (var c, d, l = 0, m; c = this._.htmlPartsRegex.exec(b);) {
                        d = c.index;
                        if (d > l)if (l = b.substring(l, d), m)m.push(l); else this.onText(l);
                        l = this._.htmlPartsRegex.lastIndex;
                        if (d = c[1])if (d = d.toLowerCase(), m && CKEDITOR.dtd.$cdata[d] && (this.onCDATA(m.join("")), m = null), !m) {
                            this.onTagClose(d);
                            continue
                        }
                        if (m)m.push(c[0]); else if (d = c[3]) {
                            if (d = d.toLowerCase(), !/="/.test(d)) {
                                var f = {}, h, k = c[4];
                                c = !!c[5];
                                if (k)for (; h = a.exec(k);) {
                                    var g = h[1].toLowerCase();
                                    h = h[2] || h[3] || h[4] || "";
                                    f[g] = !h && e[g] ? g : CKEDITOR.tools.htmlDecodeAttr(h)
                                }
                                this.onTagOpen(d, f, c);
                                !m && CKEDITOR.dtd.$cdata[d] && (m = [])
                            }
                        } else if (d = c[2])this.onComment(d)
                    }
                    if (b.length > l)this.onText(b.substring(l,
                        b.length))
                }
            }
        }(),CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () {
            this._ = {output: []}
        }, proto: {
            openTag: function (a) {
                this._.output.push("\x3c", a)
            }, openTagClose: function (a, e) {
                e ? this._.output.push(" /\x3e") : this._.output.push("\x3e")
            }, attribute: function (a, e) {
                "string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e));
                this._.output.push(" ", a, '\x3d"', e, '"')
            }, closeTag: function (a) {
                this._.output.push("\x3c/", a, "\x3e")
            }, text: function (a) {
                this._.output.push(a)
            }, comment: function (a) {
                this._.output.push("\x3c!--",
                    a, "--\x3e")
            }, write: function (a) {
                this._.output.push(a)
            }, reset: function () {
                this._.output = [];
                this._.indent = !1
            }, getHtml: function (a) {
                var e = this._.output.join("");
                a && this.reset();
                return e
            }
        }
    }),"use strict",function () {
        CKEDITOR.htmlParser.node = function () {
        };
        CKEDITOR.htmlParser.node.prototype = {
            remove: function () {
                var a = this.parent.children, e = CKEDITOR.tools.indexOf(a, this), b = this.previous, c = this.next;
                b && (b.next = c);
                c && (c.previous = b);
                a.splice(e, 1);
                this.parent = null
            }, replaceWith: function (a) {
                var e = this.parent.children,
                    b = CKEDITOR.tools.indexOf(e, this), c = a.previous = this.previous, d = a.next = this.next;
                c && (c.next = a);
                d && (d.previous = a);
                e[b] = a;
                a.parent = this.parent;
                this.parent = null
            }, insertAfter: function (a) {
                var e = a.parent.children, b = CKEDITOR.tools.indexOf(e, a), c = a.next;
                e.splice(b + 1, 0, this);
                this.next = a.next;
                this.previous = a;
                a.next = this;
                c && (c.previous = this);
                this.parent = a.parent
            }, insertBefore: function (a) {
                var e = a.parent.children, b = CKEDITOR.tools.indexOf(e, a);
                e.splice(b, 0, this);
                this.next = a;
                (this.previous = a.previous) && (a.previous.next =
                    this);
                a.previous = this;
                this.parent = a.parent
            }, getAscendant: function (a) {
                var e = "function" == typeof a ? a : "string" == typeof a ? function (b) {
                    return b.name == a
                } : function (b) {
                    return b.name in a
                }, b = this.parent;
                for (; b && b.type == CKEDITOR.NODE_ELEMENT;) {
                    if (e(b))return b;
                    b = b.parent
                }
                return null
            }, wrapWith: function (a) {
                this.replaceWith(a);
                a.add(this);
                return a
            }, getIndex: function () {
                return CKEDITOR.tools.indexOf(this.parent.children, this)
            }, getFilterContext: function (a) {
                return a || {}
            }
        }
    }(),"use strict",CKEDITOR.htmlParser.comment =
        function (a) {
            this.value = a;
            this._ = {isBlockLike: !1}
        },CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function (a, e) {
            var b = this.value;
            if (!(b = a.onComment(e, b, this)))return this.remove(), !1;
            if ("string" != typeof b)return this.replaceWith(b), !1;
            this.value = b;
            return !0
        },
        writeHtml: function (a, e) {
            e && this.filter(e);
            a.comment(this.value)
        }
    }),"use strict",function () {
        CKEDITOR.htmlParser.text = function (a) {
            this.value = a;
            this._ = {isBlockLike: !1}
        };
        CKEDITOR.htmlParser.text.prototype =
            CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_TEXT, filter: function (a, e) {
                    if (!(this.value = a.onText(e, this.value, this)))return this.remove(), !1
                }, writeHtml: function (a, e) {
                    e && this.filter(e);
                    a.text(this.value)
                }
            })
    }(),"use strict",function () {
        CKEDITOR.htmlParser.cdata = function (a) {
            this.value = a
        };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function () {
            },
            writeHtml: function (a) {
                a.write(this.value)
            }
        })
    }(),"use strict",
        CKEDITOR.htmlParser.fragment = function () {
            this.children = [];
            this.parent = null;
            this._ = {isBlockLike: !0, hasInlineStarted: !1}
        },function () {
        function a(a) {
            return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
        }

        var e = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), b = {
            ol: 1,
            ul: 1
        }, c = CKEDITOR.tools.extend({}, {html: 1}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
            style: 1,
            script: 1
        }), d = {
            ul: "li",
            ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td"
        };
        CKEDITOR.htmlParser.fragment.fromHtml = function (l, m, f) {
            function h(a) {
                var b;
                if (0 < r.length)for (var c = 0; c < r.length; c++) {
                    var d = r[c], g = d.name, e = CKEDITOR.dtd[g], f = A.name && CKEDITOR.dtd[A.name];
                    f && !f[g] || a && e && !e[a] && CKEDITOR.dtd[a] ? g == A.name && (n(A, A.parent, 1), c--) : (b || (k(), b = 1), d = d.clone(), d.parent = A, A = d, r.splice(c, 1), c--)
                }
            }

            function k() {
                for (; q.length;)n(q.shift(), A)
            }

            function g(a) {
                if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                    var b =
                        a.children.length, c = a.children[b - 1], d;
                    c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1)
                }
            }

            function n(b, c, d) {
                c = c || A || t;
                var e = A;
                void 0 === b.previous && (p(c, b) && (A = c, v.onTagOpen(f, {}), b.returnPoint = c = A), g(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (w = !1), "textarea" == b.name && (B = !1));
                b.returnPoint ? (A = b.returnPoint, delete b.returnPoint) : A = d ? c : e
            }

            function p(a, b) {
                if ((a == t || "body" == a.name) && f && (!a.name || CKEDITOR.dtd[a.name][f])) {
                    var c, d;
                    return (c = b.attributes &&
                        (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            }

            function u(a, b) {
                return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1
            }

            var v = new CKEDITOR.htmlParser, t = m instanceof CKEDITOR.htmlParser.element ? m : "string" == typeof m ? new CKEDITOR.htmlParser.element(m) : new CKEDITOR.htmlParser.fragment, r = [], q = [], A = t, B = "textarea" == t.name, w = "pre" == t.name;
            v.onTagOpen =
                function (d, g, f, l) {
                    g = new CKEDITOR.htmlParser.element(d, g);
                    g.isUnknown && f && (g.isEmpty = !0);
                    g.isOptionalClose = l;
                    if (a(g))r.push(g); else {
                        if ("pre" == d)w = !0; else {
                            if ("br" == d && w) {
                                A.add(new CKEDITOR.htmlParser.text("\n"));
                                return
                            }
                            "textarea" == d && (B = !0)
                        }
                        if ("br" == d)q.push(g); else {
                            for (; !(l = (f = A.name) ? CKEDITOR.dtd[f] || (A._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, g.isUnknown || A.isUnknown || l[d]);)if (A.isOptionalClose)v.onTagClose(f); else if (d in b && f in b)f = A.children, (f = f[f.length - 1]) && "li" == f.name || n(f = new CKEDITOR.htmlParser.element("li"),
                                A), !g.returnPoint && (g.returnPoint = A), A = f; else if (d in CKEDITOR.dtd.$listItem && !u(d, f))v.onTagOpen("li" == d ? "ul" : "dl", {}, 0, 1); else if (f in e && !u(d, f))!g.returnPoint && (g.returnPoint = A), A = A.parent; else if (f in CKEDITOR.dtd.$inline && r.unshift(A), A.parent)n(A, A.parent, 1); else {
                                g.isOrphan = 1;
                                break
                            }
                            h(d);
                            k();
                            g.parent = A;
                            g.isEmpty ? n(g) : A = g
                        }
                    }
                };
            v.onTagClose = function (a) {
                for (var b = r.length - 1; 0 <= b; b--)if (a == r[b].name) {
                    r.splice(b, 1);
                    return
                }
                for (var c = [], d = [], g = A; g != t && g.name != a;)g._.isBlockLike || d.unshift(g), c.push(g),
                    g = g.returnPoint || g.parent;
                if (g != t) {
                    for (b = 0; b < c.length; b++) {
                        var e = c[b];
                        n(e, e.parent)
                    }
                    A = g;
                    g._.isBlockLike && k();
                    n(g, g.parent);
                    g == A && (A = A.parent);
                    r = r.concat(d)
                }
                "body" == a && (f = !1)
            };
            v.onText = function (a) {
                if (!(A._.hasInlineStarted && !q.length || w || B) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length))return;
                var b = A.name, g = b ? CKEDITOR.dtd[b] || (A._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
                if (!B && !g["#"] && b in e)v.onTagOpen(d[b] || ""), v.onText(a); else {
                    k();
                    h();
                    w || B || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                    a =
                        new CKEDITOR.htmlParser.text(a);
                    if (p(A, a))this.onTagOpen(f, {}, 0, 1);
                    A.add(a)
                }
            };
            v.onCDATA = function (a) {
                A.add(new CKEDITOR.htmlParser.cdata(a))
            };
            v.onComment = function (a) {
                k();
                h();
                A.add(new CKEDITOR.htmlParser.comment(a))
            };
            v.parse(l);
            for (k(); A != t;)n(A, A.parent, 1);
            g(t);
            return t
        };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                isNaN(b) && (b = this.children.length);
                var c = 0 < b ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value),
                        0 === c.value.length)) {
                        this.children.pop();
                        this.add(a);
                        return
                    }
                    c.next = a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
            }, filter: function (a, b) {
                b = this.getFilterContext(b);
                a.onRoot(b, this);
                this.filterChildren(a, !1, b)
            }, filterChildren: function (a, b, c) {
                if (this.childrenFilteredBy != a.id) {
                    c = this.getFilterContext(c);
                    if (b && !this.parent)a.onRoot(c, this);
                    this.childrenFilteredBy = a.id;
                    for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a, c) && b--
                }
            }, writeHtml: function (a, b) {
                b && this.filter(b);
                this.writeChildrenHtml(a)
            }, writeChildrenHtml: function (a, b, c) {
                var d = this.getFilterContext();
                if (c && !this.parent && b)b.onRoot(d, this);
                b && this.filterChildren(b, !1, d);
                b = 0;
                c = this.children;
                for (d = c.length; b < d; b++)c[b].writeHtml(a)
            }, forEach: function (a, b, c) {
                if (!(c || b && this.type != b))var d = a(this);
                if (!1 !== d) {
                    c = this.children;
                    for (var e = 0; e < c.length; e++)d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a,
                        b) : b && d.type != b || a(d)
                }
            }, getFilterContext: function (a) {
                return a || {}
            }
        }
    }(),"use strict",function () {
        function a() {
            this.rules = []
        }

        function e(b, c, d, e) {
            var m, f;
            for (m in c)(f = b[m]) || (f = b[m] = new a), f.add(c[m], d, e)
        }

        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (b) {
                this.id = CKEDITOR.tools.getNextNumber();
                this.elementNameRules = new a;
                this.attributeNameRules = new a;
                this.elementsRules = {};
                this.attributesRules = {};
                this.textRules = new a;
                this.commentRules = new a;
                this.rootRules = new a;
                b && this.addRules(b, 10)
            },
            proto: {
                addRules: function (a, c) {
                    var d;
                    "number" == typeof c ? d = c : c && "priority" in c && (d = c.priority);
                    "number" != typeof d && (d = 10);
                    "object" != typeof c && (c = {});
                    a.elementNames && this.elementNameRules.addMany(a.elementNames, d, c);
                    a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, d, c);
                    a.elements && e(this.elementsRules, a.elements, d, c);
                    a.attributes && e(this.attributesRules, a.attributes, d, c);
                    a.text && this.textRules.add(a.text, d, c);
                    a.comment && this.commentRules.add(a.comment, d, c);
                    a.root && this.rootRules.add(a.root,
                        d, c)
                }, applyTo: function (a) {
                    a.filter(this)
                }, onElementName: function (a, c) {
                    return this.elementNameRules.execOnName(a, c)
                }, onAttributeName: function (a, c) {
                    return this.attributeNameRules.execOnName(a, c)
                }, onText: function (a, c, d) {
                    return this.textRules.exec(a, c, d)
                }, onComment: function (a, c, d) {
                    return this.commentRules.exec(a, c, d)
                }, onRoot: function (a, c) {
                    return this.rootRules.exec(a, c)
                }, onElement: function (a, c) {
                    for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], e, m = 0; 3 > m; m++)if (e = d[m]) {
                        e =
                            e.exec(a, c, this);
                        if (!1 === e)return null;
                        if (e && e != c)return this.onNode(a, e);
                        if (c.parent && !c.name)break
                    }
                    return c
                }, onNode: function (a, c) {
                    var d = c.type;
                    return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null
                }, onAttribute: function (a, c, d, e) {
                    return (d = this.attributesRules[d]) ? d.exec(a, e, c, this) : e
                }
            }
        });
        CKEDITOR.htmlParser.filterRulesGroup = a;
        a.prototype =
        {
            add: function (a, c, d) {
                this.rules.splice(this.findIndex(c), 0, {value: a, priority: c, options: d})
            }, addMany: function (a, c, d) {
            for (var e = [this.findIndex(c), 0], m = 0, f = a.length; m < f; m++)e.push({
                value: a[m],
                priority: c,
                options: d
            });
            this.rules.splice.apply(this.rules, e)
        }, findIndex: function (a) {
            for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;)d--;
            return d + 1
        }, exec: function (a, c) {
            var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment, e = Array.prototype.slice.call(arguments, 1), m = this.rules,
                f = m.length, h, k, g, n;
            for (n = 0; n < f; n++)if (d && (h = c.type, k = c.name), g = m[n], !(a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) {
                g = g.value.apply(null, e);
                if (!1 === g || d && g && (g.name != k || g.type != h))return g;
                null != g && (e[0] = c = g)
            }
            return c
        }, execOnName: function (a, c) {
            for (var d = 0, e = this.rules, m = e.length, f; c && d < m; d++)f = e[d], a.nonEditable && !f.options.applyToAll || a.nestedEditable && f.options.excludeNestedEditable || (c = c.replace(f.value[0], f.value[1]));
            return c
        }
        }
    }(),function () {
        function a(a,
                   g) {
            function e(a) {
                return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {"data-cke-bogus": 1})
            }

            function f(a, d) {
                return function (g) {
                    if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var f = [], h = b(g), m, w;
                        if (h)for (k(h, 1) && f.push(h); h;)l(h) && (m = c(h)) && k(m) && ((w = c(m)) && !l(w) ? f.push(m) : (e(n).insertAfter(m), m.remove())), h = h.previous;
                        for (h = 0; h < f.length; h++)f[h].remove();
                        if (f = !a || !1 !== ("function" == typeof d ? d(g) : d))n || CKEDITOR.env.needsBrFiller || g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
                            n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem) ? (f = b(g), f = !f || "form" == g.name && "input" == f.name) : f = !1 : f = !1;
                        f && g.add(e(a))
                    }
                }
            }

            function k(a, b) {
                if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"])return !0;
                var c;
                return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(r)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller &&
                n && (!b || a.parent.name in B) || !n && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
            }

            var h = {elements: {}}, n = "html" == g, B = CKEDITOR.tools.extend({}, w), y;
            for (y in B)"#" in A[y] || delete B[y];
            for (y in B)h.elements[y] = f(n, a.config.fillEmptyBlocks);
            h.root = f(n, !1);
            h.elements.br = function (a) {
                return function (b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var g = b.attributes;
                        if ("data-cke-bogus" in g || "data-cke-eol" in g)delete g["data-cke-bogus"]; else {
                            for (g = b.next; g && d(g);)g = g.next;
                            var f = c(b);
                            !g && l(b.parent) ? m(b.parent,
                                e(a)) : l(g) && f && !l(f) && e(a).insertBefore(g)
                        }
                    }
                }
            }(n);
            return h
        }

        function e(a, b) {
            return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
        }

        function b(a) {
            for (a = a.children[a.children.length - 1]; a && d(a);)a = a.previous;
            return a
        }

        function c(a) {
            for (a = a.previous; a && d(a);)a = a.previous;
            return a
        }

        function d(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
        }

        function l(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
                w || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }

        function m(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            c && (c.next = b, b.previous = c)
        }

        function f(a) {
            a = a.attributes;
            "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false"
        }

        function h(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) {
                case "true":
                    a.contenteditable = "true";
                    break;
                case "1":
                    delete a.contenteditable
            }
        }

        function k(a) {
            return a.replace(D, function (a, b, c) {
                return "\x3c" + b + c.replace(F,
                        function (a, b) {
                            return E.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
                        }) + "\x3e"
            })
        }

        function g(a, b) {
            return a.replace(b, function (a, b, c) {
                0 === a.indexOf("\x3ctextarea") && (a = b + u(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
                return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
            })
        }

        function n(a) {
            return a.replace(M, function (a, b) {
                return decodeURIComponent(b)
            })
        }

        function p(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function (a) {
                    return "\x3c!--" + q + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e"
                })
        }

        function u(a) {
            return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) {
                return decodeURIComponent(b)
            })
        }

        function v(a, b) {
            var c = b._.dataStore;
            return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) {
                return decodeURIComponent(b)
            }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) {
                return c && c[b] || ""
            })
        }

        function t(a, b) {
            var c = [], d = b.config.protectedSource, g = b._.dataStore || (b._.dataStore =
                {id: 1}), e = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
            a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) {
                return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e"
            });
            for (var f = 0; f < d.length; f++)a = a.replace(d[f], function (a) {
                a = a.replace(e, function (a, b, d) {
                    return c[d]
                });
                return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e"
            });
            a = a.replace(e, function (a, b, d) {
                return "\x3c!--" + q + (b ? "{C}" :
                        "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
            });
            a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) {
                return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) {
                    g[g.id] = decodeURIComponent(b);
                    return "{cke_protected_" + g.id++ + "}"
                })
            });
            return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, d, g) {
                return "\x3c" + c + d + "\x3e" + v(u(g), b) + "\x3c/" + c + "\x3e"
            })
        }

        CKEDITOR.htmlDataProcessor = function (b) {
            var c,
                d, f = this;
            this.editor = b;
            this.dataFilter = c = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            c.addRules(y);
            c.addRules(C, {applyToAll: !0});
            c.addRules(a(b, "data"), {applyToAll: !0});
            d.addRules(x);
            d.addRules(z, {applyToAll: !0});
            d.addRules(a(b, "html"), {applyToAll: !0});
            b.on("toHtml", function (a) {
                a = a.data;
                var c = a.dataValue, d, c = t(c, b), c = g(c, G), c = k(c), c = g(c, J), c = c.replace(O, "$1cke:$2"), c = c.replace(R, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                    c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                d = a.context || b.editable().getName();
                var f;
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == d && (d = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", f = 1);
                d = b.document.createElement(d);
                d.setHtml("a" + c);
                c = d.getHtml().substr(1);
                c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
                f && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                c = c.replace(I, "$1$2");
                c = n(c);
                c = u(c);
                d = !1 === a.fixForBody ? !1 :
                    e(a.enterMode, b.config.autoParagraph);
                c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, d);
                d && (f = c, !f.children.length && CKEDITOR.dtd[f.name][d] && (d = new CKEDITOR.htmlParser.element(d), f.add(d)));
                a.dataValue = c
            }, null, null, 5);
            b.on("toHtml", function (a) {
                a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered")
            }, null, null, 6);
            b.on("toHtml", function (a) {
                a.data.dataValue.filterChildren(f.dataFilter, !0)
            }, null, null, 10);
            b.on("toHtml", function (a) {
                a = a.data;
                var b = a.dataValue,
                    c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(!0);
                a.dataValue = p(b)
            }, null, null, 15);
            b.on("toDataFormat", function (a) {
                var c = a.data.dataValue;
                a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
                a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, e(a.data.enterMode, b.config.autoParagraph))
            }, null, null, 5);
            b.on("toDataFormat", function (a) {
                a.data.dataValue.filterChildren(f.htmlFilter, !0)
            }, null, null, 10);
            b.on("toDataFormat", function (a) {
                a.data.filter.applyTo(a.data.dataValue,
                    !1, !0)
            }, null, null, 11);
            b.on("toDataFormat", function (a) {
                var c = a.data.dataValue, d = f.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(!0);
                c = u(c);
                c = v(c, b);
                a.data.dataValue = c
            }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (a, b, c, d) {
                var g = this.editor, e, f, k, h;
                b && "object" == typeof b ? (e = b.context, c = b.fixForBody, d = b.dontFilter, f = b.filter, k = b.enterMode, h = b.protectedWhitespaces) : e = b;
                e || null === e || (e = g.editable().getName());
                return g.fire("toHtml", {
                    dataValue: a, context: e, fixForBody: c, dontFilter: d,
                    filter: f || g.filter, enterMode: k || g.enterMode, protectedWhitespaces: h
                }).dataValue
            }, toDataFormat: function (a, b) {
                var c, d, g;
                b && (c = b.context, d = b.filter, g = b.enterMode);
                c || null === c || (c = this.editor.editable().getName());
                return this.editor.fire("toDataFormat", {
                    dataValue: a,
                    filter: d || this.editor.filter,
                    context: c,
                    enterMode: g || this.editor.enterMode
                }).dataValue
            }
        };
        var r = /(?:&nbsp;|\xa0)$/, q = "{cke_protected}", A = CKEDITOR.dtd, B = "caption colgroup col thead tfoot tbody".split(" "), w = CKEDITOR.tools.extend({}, A.$blockLimit,
            A.$block), y = {
            elements: {
                input: f,
                textarea: f
            }
        }, C = {attributeNames: [[/^on/, "data-cke-pa-on"], [/^data-cke-expando$/, ""]]}, x = {
            elements: {
                embed: function (a) {
                    var b = a.parent;
                    if (b && "object" == b.name) {
                        var c = b.attributes.width, b = b.attributes.height;
                        c && (a.attributes.width = c);
                        b && (a.attributes.height = b)
                    }
                }, a: function (a) {
                    var b = a.attributes;
                    if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"]))return !1
                }
            }
        }, z = {
            elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/,
                ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                $: function (a) {
                    var b = a.attributes;
                    if (b) {
                        if (b["data-cke-temp"])return !1;
                        for (var c = ["name", "href", "src"], d, g = 0; g < c.length; g++)d = "data-cke-saved-" + c[g], d in b && delete b[c[g]]
                    }
                    return a
                }, table: function (a) {
                    a.children.slice(0).sort(function (a, b) {
                        var c, d;
                        a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(B, a.name), d = CKEDITOR.tools.indexOf(B, b.name));
                        -1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
                        return c > d ?
                            1 : -1
                    })
                }, param: function (a) {
                    a.children = [];
                    a.isEmpty = !0;
                    return a
                }, span: function (a) {
                    "Apple-style-span" == a.attributes["class"] && delete a.name
                }, html: function (a) {
                    delete a.attributes.contenteditable;
                    delete a.attributes["class"]
                }, body: function (a) {
                    delete a.attributes.spellcheck;
                    delete a.attributes.contenteditable
                }, style: function (a) {
                    var b = a.children[0];
                    b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                    a.attributes.type || (a.attributes.type = "text/css")
                }, title: function (a) {
                    var b = a.children[0];
                    !b && m(a, b = new CKEDITOR.htmlParser.text);
                    b.value = a.attributes["data-cke-title"] || ""
                }, input: h, textarea: h
            }, attributes: {
                "class": function (a) {
                    return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
                }
            }
        };
        CKEDITOR.env.ie && (z.attributes.style = function (a) {
            return a.replace(/(^|;)([^\:]+)/g, function (a) {
                return a.toLowerCase()
            })
        });
        var D = /<(a|area|img|input|source)\b([^>]*)>/gi, F = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, E = /^(href|src|name)$/i, J = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            G = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, M = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, O = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, I = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, R = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(),"use strict",CKEDITOR.htmlParser.element = function (a, e) {
        this.name = a;
        this.attributes = e || {};
        this.children = [];
        var b = a || "", c = b.match(/^cke:(.*)/);
        c && (b = c[1]);
        b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] ||
        CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
        this.isEmpty = !!CKEDITOR.dtd.$empty[a];
        this.isUnknown = !CKEDITOR.dtd[a];
        this._ = {isBlockLike: b, hasInlineStarted: this.isEmpty || !b}
    },CKEDITOR.htmlParser.cssStyle = function (a) {
        var e = {};
        ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, c, d) {
            "font-family" == c && (d = d.replace(/["']/g, ""));
            e[c.toLowerCase()] = d
        });
        return {
            rules: e, populate: function (a) {
                var c =
                    this.toString();
                c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
            }, toString: function () {
                var a = [], c;
                for (c in e)e[c] && a.push(c, ":", e[c], ";");
                return a.join("")
            }
        }
    },function () {
        function a(a) {
            return function (b) {
                return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
            }
        }

        var e = function (a, b) {
            a = a[0];
            b = b[0];
            return a < b ? -1 : a > b ? 1 : 0
        }, b = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype =
            CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_ELEMENT, add: b.add, clone: function () {
                    return new CKEDITOR.htmlParser.element(this.name, this.attributes)
                }, filter: function (a, b) {
                    var e = this, m, f;
                    b = e.getFilterContext(b);
                    if (b.off)return !0;
                    if (!e.parent)a.onRoot(b, e);
                    for (; ;) {
                        m = e.name;
                        if (!(f = a.onElementName(b, m)))return this.remove(), !1;
                        e.name = f;
                        if (!(e = a.onElement(b, e)))return this.remove(), !1;
                        if (e !== this)return this.replaceWith(e), !1;
                        if (e.name == m)break;
                        if (e.type != CKEDITOR.NODE_ELEMENT)return this.replaceWith(e),
                            !1;
                        if (!e.name)return this.replaceWithChildren(), !1
                    }
                    m = e.attributes;
                    var h, k;
                    for (h in m) {
                        for (f = m[h]; ;)if (k = a.onAttributeName(b, h))if (k != h)delete m[h], h = k; else break; else {
                            delete m[h];
                            break
                        }
                        k && (!1 === (f = a.onAttribute(b, e, k, f)) ? delete m[k] : m[k] = f)
                    }
                    e.isEmpty || this.filterChildren(a, !1, b);
                    return !0
                }, filterChildren: b.filterChildren, writeHtml: function (a, b) {
                    b && this.filter(b);
                    var l = this.name, m = [], f = this.attributes, h, k;
                    a.openTag(l, f);
                    for (h in f)m.push([h, f[h]]);
                    a.sortAttributes && m.sort(e);
                    h = 0;
                    for (k = m.length; h < k; h++)f =
                        m[h], a.attribute(f[0], f[1]);
                    a.openTagClose(l, this.isEmpty);
                    this.writeChildrenHtml(a);
                    this.isEmpty || a.closeTag(l)
                }, writeChildrenHtml: b.writeChildrenHtml, replaceWithChildren: function () {
                    for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this);
                    this.remove()
                }, forEach: b.forEach, getFirst: function (b) {
                    if (!b)return this.children.length ? this.children[0] : null;
                    "function" != typeof b && (b = a(b));
                    for (var d = 0, e = this.children.length; d < e; ++d)if (b(this.children[d]))return this.children[d];
                    return null
                }, getHtml: function () {
                    var a =
                        new CKEDITOR.htmlParser.basicWriter;
                    this.writeChildrenHtml(a);
                    return a.getHtml()
                }, setHtml: function (a) {
                    a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
                    for (var b = 0, e = a.length; b < e; ++b)a[b].parent = this
                }, getOuterHtml: function () {
                    var a = new CKEDITOR.htmlParser.basicWriter;
                    this.writeHtml(a);
                    return a.getHtml()
                }, split: function (a) {
                    for (var b = this.children.splice(a, this.children.length - a), e = this.clone(), m = 0; m < b.length; ++m)b[m].parent = e;
                    e.children = b;
                    b[0] && (b[0].previous = null);
                    0 < a && (this.children[a -
                    1].next = null);
                    this.parent.add(e, this.getIndex() + 1);
                    return e
                }, addClass: function (a) {
                    if (!this.hasClass(a)) {
                        var b = this.attributes["class"] || "";
                        this.attributes["class"] = b + (b ? " " : "") + a
                    }
                }, removeClass: function (a) {
                    var b = this.attributes["class"];
                    b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
                }, hasClass: function (a) {
                    var b = this.attributes["class"];
                    return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1
                }, getFilterContext: function (a) {
                    var b =
                        [];
                    a || (a = {off: !1, nonEditable: !1, nestedEditable: !1});
                    a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
                    a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
                    if (b.length) {
                        a = CKEDITOR.tools.copy(a);
                        for (var e = 0; e < b.length; e += 2)a[b[e]] = b[e + 1]
                    }
                    return a
                }
            }, !0)
    }(),function () {
        var a = {}, e = /{([^}]+)}/g, b = /([\\'])/g, c = /\n/g, d = /\r/g;
        CKEDITOR.template = function (l) {
            if (a[l])this.output =
                a[l]; else {
                var m = l.replace(b, "\\$1").replace(c, "\\n").replace(d, "\\r").replace(e, function (a, b) {
                    return "',data['" + b + "']\x3d\x3dundefined?'{" + b + "}':data['" + b + "'],'"
                });
                this.output = a[l] = Function("data", "buffer", "return buffer?buffer.push('" + m + "'):['" + m + "'].join('');")
            }
        }
    }(),delete CKEDITOR.loadFullCore,CKEDITOR.instances = {},CKEDITOR.document = new CKEDITOR.dom.document(document),CKEDITOR.add = function (a) {
        CKEDITOR.instances[a.name] = a;
        a.on("focus", function () {
            CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance =
                a, CKEDITOR.fire("currentInstance"))
        });
        a.on("blur", function () {
            CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
        });
        CKEDITOR.fire("instance", null, a)
    },CKEDITOR.remove = function (a) {
        delete CKEDITOR.instances[a.name]
    },function () {
        var a = {};
        CKEDITOR.addTemplate = function (e, b) {
            var c = a[e];
            if (c)return c;
            c = {name: e, source: b};
            CKEDITOR.fire("template", c);
            return a[e] = new CKEDITOR.template(c.source)
        };
        CKEDITOR.getTemplate = function (e) {
            return a[e]
        }
    }(),function () {
        var a = [];
        CKEDITOR.addCss =
            function (e) {
                a.push(e)
            };
        CKEDITOR.getCss = function () {
            return a.join("\n")
        }
    }(),CKEDITOR.on("instanceDestroyed", function () {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    }),CKEDITOR.TRISTATE_ON = 1,CKEDITOR.TRISTATE_OFF = 2,CKEDITOR.TRISTATE_DISABLED = 0,function () {
        CKEDITOR.inline = function (a, e) {
            if (!CKEDITOR.env.isCompatible)return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor())throw'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var b = new CKEDITOR.editor(e,
                a, CKEDITOR.ELEMENT_MODE_INLINE), c = a.is("textarea") ? a : null;
            c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
            b.on("loaded", function () {
                b.fire("uiReady");
                b.editable(a);
                b.container = a;
                b.ui.contentsElement = a;
                b.setData(b.getData(1));
                b.resetDirty();
                b.fire("contentDom");
                b.mode = "wysiwyg";
                b.fire("mode");
                b.status = "ready";
                b.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, b)
            }, null, null, 1E4);
            b.on("destroy", function () {
                c && (b.container.clearCustomData(), b.container.remove(), c.show());
                b.element.clearCustomData();
                delete b.element
            });
            return b
        };
        CKEDITOR.inlineAll = function () {
            var a, e, b;
            for (b in CKEDITOR.dtd.$editable)for (var c = CKEDITOR.document.getElementsByTag(b), d = 0, l = c.count(); d < l; d++)a = c.getItem(d), "true" == a.getAttribute("contenteditable") && (e = {
                element: a,
                config: {}
            },
            !1 !== CKEDITOR.fire("inline", e) && CKEDITOR.inline(a, e.config))
        };
        CKEDITOR.domReady(function () {
            !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
        })
    }(),CKEDITOR.replaceClass = "ckeditor",function () {
        function a(a, d, l, m) {
            if (!CKEDITOR.env.isCompatible)return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor())throw'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var f = new CKEDITOR.editor(d, a, m);
            m == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), f._.required =
                a.hasAttribute("required"), a.removeAttribute("required"));
            l && f.setData(l, null, !0);
            f.on("loaded", function () {
                b(f);
                m == CKEDITOR.ELEMENT_MODE_REPLACE && f.config.autoUpdateElement && a.$.form && f._attachToForm();
                f.setMode(f.config.startupMode, function () {
                    f.resetDirty();
                    f.status = "ready";
                    f.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, f)
                })
            });
            f.on("destroy", e);
            return f
        }

        function e() {
            var a = this.container, b = this.element;
            a && (a.clearCustomData(), a.remove());
            b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE &&
            (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
        }

        function b(a) {
            var b = a.name, e = a.element, m = a.elementMode, f = a.fire("uiSpace", {
                space: "top",
                html: ""
            }).html, h = a.fire("uiSpace", {
                space: "bottom",
                html: ""
            }).html, k = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' :
                    "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'), b = CKEDITOR.dom.element.createFromHtml(k.output({
                id: a.id,
                name: b,
                langDir: a.lang.dir,
                langCode: a.langCode,
                voiceLabel: a.title,
                topHtml: f ? '\x3cspan id\x3d"' +
                a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + f + "\x3c/span\x3e" : "",
                contentId: a.ui.spaceId("contents"),
                bottomHtml: h ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + h + "\x3c/span\x3e" : "",
                outerEl: CKEDITOR.env.ie ? "span" : "div"
            }));
            m == CKEDITOR.ELEMENT_MODE_REPLACE ? (e.hide(), b.insertAfter(e)) : e.append(b);
            a.container = b;
            a.ui.contentsElement = a.ui.space("contents");
            f && a.ui.space("top").unselectable();
            h && a.ui.space("bottom").unselectable();
            e = a.config.width;
            m = a.config.height;
            e && b.setStyle("width", CKEDITOR.tools.cssLength(e));
            m && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(m));
            b.disableContextMenu();
            CKEDITOR.env.webkit && b.on("focus", function () {
                a.focus()
            });
            a.fireOnce("uiReady")
        }

        CKEDITOR.replace = function (b, d) {
            return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE)
        };
        CKEDITOR.appendTo = function (b, d, e) {
            return a(b, d, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
        };
        CKEDITOR.replaceAll = function () {
            for (var a =
                document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var e = null, m = a[b];
                if (m.name || m.id) {
                    if ("string" == typeof arguments[0]) {
                        if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(m.className))continue
                    } else if ("function" == typeof arguments[0] && (e = {}, !1 === arguments[0](m, e)))continue;
                    this.replace(m, e)
                }
            }
        };
        CKEDITOR.editor.prototype.addMode = function (a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function (a, b) {
            var e = this, m = this._.modes;
            if (a != e.mode && m && m[a]) {
                e.fire("beforeSetMode",
                    a);
                if (e.mode) {
                    var f = e.checkDirty(), m = e._.previousModeData, h, k = 0;
                    e.fire("beforeModeUnload");
                    e.editable(0);
                    e._.previousMode = e.mode;
                    e._.previousModeData = h = e.getData(1);
                    "source" == e.mode && m == h && (e.fire("lockSnapshot", {forceUpdate: !0}), k = 1);
                    e.ui.space("contents").setHtml("");
                    e.mode = ""
                } else e._.previousModeData = e.getData(1);
                this._.modes[a](function () {
                    e.mode = a;
                    void 0 !== f && !f && e.resetDirty();
                    k ? e.fire("unlockSnapshot") : "wysiwyg" == a && e.fire("saveSnapshot");
                    setTimeout(function () {
                            e.fire("mode");
                            b && b.call(e)
                        },
                        0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function (a, b, e, m) {
            var f = this.container, h = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
            m = m ? this.container.getFirst(function (a) {
                return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
            }) : f;
            m.setSize("width", a, !0);
            k && (k.style.width = "1%");
            var g = (m.$.offsetHeight || 0) - (h.$.clientHeight || 0), f = Math.max(b - (e ? 0 : g), 0);
            b = e ? b + g : b;
            h.setStyle("height", f + "px");
            k && (k.style.width = "100%");
            this.fire("resize", {
                outerHeight: b,
                contentsHeight: f, outerWidth: a || m.getSize("width")
            })
        };
        CKEDITOR.editor.prototype.getResizable = function (a) {
            return a ? this.ui.space("contents") : this.container
        };
        CKEDITOR.domReady(function () {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
        })
    }(),CKEDITOR.config.startupMode = "wysiwyg",function () {
        function a(a) {
            var b = a.editor, d = a.data.path, g = d.blockLimit, f = a.data.selection, k = f.getRanges()[0], h;
            if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)if (f = e(f, d))f.appendBogus(), h = CKEDITOR.env.ie;
            m(b, d.block, g) && k.collapsed && !k.getCommonAncestor().isReadOnly() && (d = k.clone(), d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(d), g.guard = function (a) {
                return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
            }, !g.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) && (b = k.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(),
                h = 1, a.cancel());
            h && k.select()
        }

        function e(a, b) {
            if (a.isFake)return 0;
            var d = b.block || b.blockLimit, e = d && d.getLast(c);
            if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus()))return d
        }

        function b(a) {
            var b = a.data.getTarget();
            b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
        }

        function c(a) {
            return g(a) && n(a)
        }

        function d(a, b) {
            return function (c) {
                var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
                (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
            }
        }

        function l(a) {
            function b(a) {
                return function (b, e) {
                    e && b.type == CKEDITOR.NODE_ELEMENT && b.is(g) && (d = b);
                    if (!(e || !c(b) || a && u(b)))return !1
                }
            }

            var d, e = a.getRanges()[0];
            a = a.root;
            var g = {table: 1, ul: 1, ol: 1, dl: 1};
            if (e.startPath().contains(g)) {
                var f = e.clone();
                f.collapse(1);
                f.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(f);
                a.guard = b();
                a.checkBackward();
                if (d)return f = e.clone(),
                    f.collapse(), f.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(f), a.guard = b(!0), d = !1, a.checkForward(), d
            }
            return null
        }

        function m(a, b, c) {
            return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
        }

        function f(a) {
            return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
        }

        function h(a) {
            var b = a.editor;
            b.getSelection().scrollIntoView();
            setTimeout(function () {
                b.fire("saveSnapshot")
            }, 0)
        }

        function k(a, b, c) {
            var d = a.getCommonAncestor(b);
            for (b = a = c ? b : a; (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();)b = a;
            b.remove()
        }

        var g, n, p, u, v, t, r, q, A;
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element, $: function (a, b) {
                this.base(b.$ || b);
                this.editor = a;
                this.status = "unloaded";
                this.hasFocus = !1;
                this.setup()
            }, proto: {
                focus: function () {
                    var a;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(),
                            this.contains(a))) {
                        a.focus();
                        return
                    }
                    CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
                    try {
                        !CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document) ? this.$.focus() : this.$.setActive()
                    } catch (b) {
                        if (!CKEDITOR.env.ie)throw b;
                    }
                    CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                },
                on: function (a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = d(b, this), c[0] = a, c[1] = b);
                    return CKEDITOR.dom.element.prototype.on.apply(this, c)
                }, attachListener: function (a) {
                    !this._.listeners && (this._.listeners = []);
                    var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b);
                    this._.listeners.push(b);
                    return b
                }, clearListeners: function () {
                    var a = this._.listeners;
                    try {
                        for (; a.length;)a.pop().removeListener()
                    } catch (b) {
                    }
                }, restoreAttrs: function () {
                    var a =
                        this._.attrChanges, b, c;
                    for (c in a)a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
                }, attachClass: function (a) {
                    var b = this.getCustomData("classes");
                    this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a))
                }, changeAttr: function (a, b) {
                    var c = this.getAttribute(a);
                    b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
                }, insertText: function (a) {
                    this.editor.focus();
                    this.insertHtml(this.transformPlainTextToHtml(a),
                        "text")
                }, transformPlainTextToHtml: function (a) {
                    var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                    return CKEDITOR.tools.transformPlainTextToHtml(a, b)
                }, insertHtml: function (a, b, c) {
                    var d = this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    c || (c = d.getSelection().getRanges()[0]);
                    t(this, b || "html", a, c);
                    c.select();
                    h(this);
                    this.editor.fire("afterInsertHtml", {})
                }, insertHtmlIntoRange: function (a, b, c) {
                    t(this, c || "html", a, b);
                    this.editor.fire("afterInsertHtml",
                        {intoRange: b})
                }, insertElement: function (a, b) {
                    var d = this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    var e = d.activeEnterMode, d = d.getSelection(), g = a.getName(), g = CKEDITOR.dtd.$block[g];
                    b || (b = d.getRanges()[0]);
                    this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), g && ((g = a.getNext(function (a) {
                        return c(a) && !u(a)
                    })) && g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$block) ? g.getDtd()["#"] ? b.moveToElementEditStart(g) : b.moveToElementEditEnd(a) : g || e == CKEDITOR.ENTER_BR || (g = b.fixBlock(!0,
                        e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(g))));
                    d.selectRanges([b]);
                    h(this)
                }, insertElementIntoSelection: function (a) {
                    this.insertElement(a)
                }, insertElementIntoRange: function (a, b) {
                    var c = this.editor, d = c.config.enterMode, e = a.getName(), g = CKEDITOR.dtd.$block[e];
                    if (b.checkReadOnly())return !1;
                    b.deleteContents(1);
                    b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({
                        tr: 1,
                        table: 1,
                        tbody: 1,
                        thead: 1,
                        tfoot: 1
                    }) && r(b);
                    var f, k;
                    if (g)for (; (f = b.getCommonAncestor(0, 1)) && (k = CKEDITOR.dtd[f.getName()]) &&
                                 (!k || !k[e]);)f.getName() in CKEDITOR.dtd.span ? b.splitElement(f) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(f), b.collapse(!0), f.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                    b.insertNode(a);
                    return !0
                }, setData: function (a, b) {
                    b || (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.fixInitialSelection();
                    "unloaded" == this.status && (this.status = "ready");
                    this.editor.fire("dataReady")
                }, getData: function (a) {
                    var b = this.getHtml();
                    a || (b = this.editor.dataProcessor.toDataFormat(b));
                    return b
                }, setReadOnly: function (a) {
                    this.setAttribute("contenteditable", !a)
                }, detach: function () {
                    this.removeClass("cke_editable");
                    this.status = "detached";
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                }, isInline: function () {
                    return this.getDocument().equals(CKEDITOR.document)
                }, fixInitialSelection: function () {
                    function a() {
                        var b = c.getDocument().$, d = b.getSelection(), e;
                        a:if (d.anchorNode && d.anchorNode == c.$)e = !0; else {
                            if (CKEDITOR.env.webkit && (e = c.getDocument().getActive()) && e.equals(c) && !d.anchorNode) {
                                e = !0;
                                break a
                            }
                            e = void 0
                        }
                        e && (e = new CKEDITOR.dom.range(c), e.moveToElementEditStart(c), b = b.createRange(), b.setStart(e.startContainer.$, e.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b))
                    }

                    function b() {
                        var a = c.getDocument().$, d = a.selection, e = c.getDocument().getActive();
                        "None" == d.type && e.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
                    }

                    var c = this;
                    if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks))this.hasFocus && (this.focus(), b()); else if (this.hasFocus)this.focus(), a(); else this.once("focus", function () {
                        a()
                    }, null, null, -999)
                }, getHtmlFromRange: function (a) {
                    if (a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);
                    a = {doc: this.getDocument(), range: a.clone()};
                    q.eol.detect(a, this);
                    q.bogus.exclude(a);
                    q.cell.shrink(a);
                    a.fragment = a.range.cloneContents();
                    q.tree.rebuild(a, this);
                    q.eol.fix(a, this);
                    return new CKEDITOR.dom.documentFragment(a.fragment.$)
                },
                extractHtmlFromRange: function (a, b) {
                    var c = A, d = {range: a, doc: a.document}, e = this.getHtmlFromRange(a);
                    if (a.collapsed)return a.optimize(), e;
                    a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                    c.table.detectPurge(d);
                    d.bookmark = a.createBookmark();
                    delete d.range;
                    var g = this.editor.createRange();
                    g.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
                    d.targetBookmark = g.createBookmark();
                    c.list.detectMerge(d, this);
                    c.table.detectRanges(d, this);
                    c.block.detectMerge(d, this);
                    d.tableContentsRanges ? (c.table.deleteRanges(d),
                        a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
                    a.moveToBookmark(d.targetBookmark);
                    a.optimize();
                    c.fixUneditableRangePosition(a);
                    c.list.merge(d, this);
                    c.table.purge(d, this);
                    c.block.merge(d, this);
                    if (b) {
                        c = a.startPath();
                        if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
                            a:{
                                var d = c.block.getElementsByTag("span"), g = 0, f;
                                if (d)for (; f = d.getItem(g++);)if (!n(f)) {
                                    d = !0;
                                    break a
                                }
                                d = !1
                            }
                            d = !d
                        }
                        d && (a.moveToPosition(c.block,
                            CKEDITOR.POSITION_BEFORE_START), c.block.remove())
                    } else c.autoParagraph(this.editor, a), p(a.startContainer) && a.startContainer.appendBogus();
                    a.startContainer.mergeSiblings();
                    return e
                }, setup: function () {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function () {
                        var b = this.getData();
                        this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(v, function (a, b) {
                            return b
                        }));
                        a.setData(b, null, 1)
                    }, this);
                    this.attachListener(a, "getSnapshot", function (a) {
                        a.data = this.getData(1)
                    }, this);
                    this.attachListener(a,
                        "afterSetData", function () {
                            this.setData(a.getData(1))
                        }, this);
                    this.attachListener(a, "loadSnapshot", function (a) {
                        this.setData(a.data, 1)
                    }, this);
                    this.attachListener(a, "beforeFocus", function () {
                        var b = a.getSelection();
                        (b = b && b.getNative()) && "Control" == b.type || this.focus()
                    }, this);
                    this.attachListener(a, "insertHtml", function (a) {
                        this.insertHtml(a.data.dataValue, a.data.mode, a.data.range)
                    }, this);
                    this.attachListener(a, "insertElement", function (a) {
                        this.insertElement(a.data)
                    }, this);
                    this.attachListener(a, "insertText",
                        function (a) {
                            this.insertText(a.data)
                        }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed");
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function () {
                        this.hasFocus = !1
                    }, null, null, -1);
                    this.on("focus", function () {
                        this.hasFocus = !0
                    }, null, null, -1);
                    if (CKEDITOR.env.webkit)this.on("scroll", function () {
                        a._.previousScrollTop = a.editable().$.scrollTop
                    }, null, null, -1);
                    if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                        var d = function () {
                            var b = a.editable();
                            null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
                        };
                        this.on("scroll", d)
                    }
                    a.focusManager.add(this);
                    this.equals(CKEDITOR.document.getActive()) &&
                    (this.hasFocus = !0, a.once("contentDom", function () {
                        a.focusManager.focus(this)
                    }, this));
                    this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document = this.getDocument();
                        a.window = this.getWindow();
                        var e = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var f = a.config.contentsLangDirection;
                        this.getDirection(1) != f && this.changeAttr("dir", f);
                        var h = CKEDITOR.getCss();
                        if (h) {
                            var f = e.getHead(), m = f.getCustomData("stylesheet");
                            m ? h != m.getText() && (CKEDITOR.env.ie &&
                            9 > CKEDITOR.env.version ? m.$.styleSheet.cssText = h : m.setText(h)) : (h = e.appendStyleText(h), h = new CKEDITOR.dom.element(h.ownerNode || h.owningElement), f.setCustomData("stylesheet", h), h.data("cke-temp", 1))
                        }
                        f = e.getCustomData("stylesheet_ref") || 0;
                        e.setCustomData("stylesheet_ref", f + 1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function (a) {
                            a = a.data;
                            var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                            b && 2 != a.$.button && b.isReadOnly() &&
                            a.preventDefault()
                        });
                        var n = {8: 1, 46: 1};
                        this.attachListener(a, "key", function (b) {
                            if (a.readOnly)return !0;
                            var c = b.data.domEvent.getKey(), d;
                            if (c in n) {
                                b = a.getSelection();
                                var e, f = b.getRanges()[0], k = f.startPath(), h, m, w, c = 8 == c;
                                CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (e = b.getSelectedElement()) || (e = l(b)) ? (a.fire("saveSnapshot"), f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), f.select(), a.fire("saveSnapshot"), d = 1) : f.collapsed && ((h = k.block) && (w = h[c ? "getPrevious" : "getNext"](g)) && w.type == CKEDITOR.NODE_ELEMENT &&
                                w.is("table") && f[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), f[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove(), f["moveToElementEdit" + (c ? "End" : "Start")](w), f.select(), a.fire("saveSnapshot"), d = 1) : k.blockLimit && k.blockLimit.is("td") && (m = k.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(m, c ? CKEDITOR.START : CKEDITOR.END) && (w = m[c ? "getPrevious" : "getNext"](g)) ? (a.fire("saveSnapshot"), f["moveToElementEdit" + (c ? "End" : "Start")](w), f.checkStartOfBlock() && f.checkEndOfBlock() ?
                                    w.remove() : f.select(), a.fire("saveSnapshot"), d = 1) : (m = k.contains(["td", "th", "caption"])) && f.checkBoundaryOfElement(m, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                            }
                            return !d
                        });
                        a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (b) {
                            b.data.getKeystroke() in n && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select())
                        });
                        this.attachListener(this, "dblclick", function (b) {
                            if (a.readOnly)return !1;
                            b = {element: b.data.getTarget()};
                            a.fire("doubleclick", b)
                        });
                        CKEDITOR.env.ie && this.attachListener(this, "click", b);
                        CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) {
                            var c = b.data.getTarget();
                            c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
                        });
                        CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) {
                            (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
                        });
                        CKEDITOR.env.gecko &&
                        this.attachListener(this, "mouseup", function (b) {
                            if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(v, ""))) {
                                var c = a.createRange();
                                c.moveToElementEditStart(b);
                                c.select(!0)
                            }
                        });
                        CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) {
                            a.data.getTarget().is("input", "select") && a.data.preventDefault()
                        }), this.attachListener(this, "mouseup", function (a) {
                            a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                        }));
                        CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                            if (a.readOnly)return !0;
                            b = b.data.domEvent.getKey();
                            if (b in n) {
                                var c = 8 == b, d = a.getSelection().getRanges()[0];
                                b = d.startPath();
                                if (d.collapsed)a:{
                                    var e = b.block;
                                    if (e && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
                                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                            var g = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                                            if (g && g.type == CKEDITOR.NODE_ELEMENT && g.is("hr")) {
                                                a.fire("saveSnapshot");
                                                g.remove();
                                                b = !0;
                                                break a
                                            }
                                        }
                                        d = d.startPath().block;
                                        if (!d || d && d.contains(e))b = void 0; else {
                                            a.fire("saveSnapshot");
                                            var f;
                                            (f = (c ? d : e).getBogus()) && f.remove();
                                            f = a.getSelection();
                                            g = f.createBookmarks();
                                            (c ? e : d).moveChildren(c ? d : e, !1);
                                            b.lastElement.mergeSiblings();
                                            k(e, d, !c);
                                            f.selectBookmarks(g);
                                            b = !0
                                        }
                                    } else b = !1
                                } else c = d, f = b.block, d = c.endPath().block, f && d && !f.equals(d) ? (a.fire("saveSnapshot"), (e = f.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(f, !1), b.lastElement.mergeSiblings(), k(f, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() &&
                                c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
                                if (!b)return;
                                a.getSelection().scrollIntoView();
                                a.fire("saveSnapshot");
                                return !1
                            }
                        }, this, null, 100)
                    }
                }
            }, _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes"))for (; a.length;)this.removeClass(a.pop());
                    if (!this.is("textarea")) {
                        a = this.getDocument();
                        var b = a.getHead();
                        if (b.getCustomData("stylesheet")) {
                            var c = a.getCustomData("stylesheet_ref");
                            --c ? a.setCustomData("stylesheet_ref",
                                c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
                        }
                    }
                    this.editor.fire("contentDomUnload");
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function (a) {
            var b = this._.editable;
            if (b && a)return 0;
            arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
            return b
        };
        CKEDITOR.on("instanceLoaded", function (b) {
            var c = b.editor;
            c.on("insertElement", function (a) {
                a = a.data;
                a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") ||
                a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
            });
            c.on("selectionChange", function (b) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
                }
            })
        });
        CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor;
            b.on("mode", function () {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = b.title;
                    a.changeAttr("role",
                        "textbox");
                    a.changeAttr("aria-label", c);
                    c && a.changeAttr("title", c);
                    var d = b.fire("ariaEditorHelpLabel", {}).label;
                    if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                        var e = CKEDITOR.tools.getNextId(), d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
                        c.append(d);
                        a.changeAttr("aria-describedby", e)
                    }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        g = CKEDITOR.dom.walker.whitespaces(!0);
        n = CKEDITOR.dom.walker.bookmark(!1, !0);
        p = CKEDITOR.dom.walker.empty();
        u = CKEDITOR.dom.walker.bogus();
        v = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
        t = function () {
            function a(b) {
                return b.type == CKEDITOR.NODE_ELEMENT
            }

            function b(c, d) {
                var e, g, f, k, h = [], m = d.range.startContainer;
                e = d.range.startPath();
                for (var m = l[m.getName()], n = 0, v = c.getChildren(), r = v.count(), q = -1, u = -1, y = 0, t = e.contains(l.$list); n <
                r; ++n)e = v.getItem(n), a(e) ? (f = e.getName(), t && f in CKEDITOR.dtd.$list ? h = h.concat(b(e, d)) : (k = !!m[f], "br" != f || !e.data("cke-eol") || n && n != r - 1 || (y = (g = n ? h[n - 1].node : v.getItem(n + 1)) && (!a(g) || !g.is("br")), g = g && a(g) && l.$block[g.getName()]), -1 != q || k || (q = n), k || (u = n), h.push({
                    isElement: 1,
                    isLineBreak: y,
                    isBlock: e.isBlockBoundary(),
                    hasBlockSibling: g,
                    node: e,
                    name: f,
                    allowed: k
                }), g = y = 0)) : h.push({isElement: 0, node: e, allowed: 1});
                -1 < q && (h[q].firstNotAllowed = 1);
                -1 < u && (h[u].lastNotAllowed = 1);
                return h
            }

            function d(b, c) {
                var e = [],
                    g = b.getChildren(), f = g.count(), k, h = 0, m = l[c], n = !b.is(l.$inline) || b.is("br");
                for (n && e.push(" "); h < f; h++)k = g.getItem(h), a(k) && !k.is(m) ? e = e.concat(d(k, c)) : e.push(k);
                n && e.push(" ");
                return e
            }

            function e(b) {
                return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1)
            }

            function g(b) {
                return b && a(b) && (b.is(l.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
            }

            function k(b, c, d, e) {
                var g = b.clone(), f, h;
                g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                (f = (new CKEDITOR.dom.walker(g)).next()) && a(f) && n[f.getName()] &&
                (h = f.getPrevious()) && a(h) && !h.getParent().equals(b.startContainer) && d.contains(h) && e.contains(f) && f.isIdentical(h) && (f.moveChildren(h), f.remove(), k(b, c, d, e))
            }

            function h(b, c) {
                function d(b, c) {
                    if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br"))return b.remove(), 1
                }

                var e = c.endContainer.getChild(c.endOffset), g = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, b[b.length - 1]);
                g && d(g, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
            }

            var l = CKEDITOR.dtd, n = {
                p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1,
                h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1
            }, v = {p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, r = CKEDITOR.tools.extend({}, l.$inline);
            delete r.br;
            return function (n, q, u, t) {
                var p = n.editor, A = !1;
                "unfiltered_html" == q && (q = "html", A = !0);
                if (!t.checkReadOnly()) {
                    var H = (new CKEDITOR.dom.elementPath(t.startContainer, t.root)).blockLimit || t.root;
                    n = {
                        type: q,
                        dontFilter: A,
                        editable: n,
                        editor: p,
                        range: t,
                        blockLimit: H,
                        mergeCandidates: [],
                        zombies: []
                    };
                    q = n.range;
                    t = n.mergeCandidates;
                    var K, E;
                    "text" == n.type && q.shrink(CKEDITOR.SHRINK_ELEMENT,
                        !0, !1) && (K = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", q.document), q.insertNode(K), q.setStartAfter(K));
                    A = new CKEDITOR.dom.elementPath(q.startContainer);
                    n.endPath = H = new CKEDITOR.dom.elementPath(q.endContainer);
                    if (!q.collapsed) {
                        var p = H.block || H.blockLimit, W = q.getCommonAncestor();
                        p && !p.equals(W) && !p.contains(W) && q.checkEndOfBlock() && n.zombies.push(p);
                        q.deleteContents()
                    }
                    for (; (E = e(q)) && a(E) && E.isBlockBoundary() && A.contains(E);)q.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                    k(q, n.blockLimit, A, H);
                    K && (q.setEndBefore(K), q.collapse(), K.remove());
                    K = q.startPath();
                    if (p = K.contains(g, !1, 1))q.splitElement(p), n.inlineStylesRoot = p, n.inlineStylesPeak = K.lastElement;
                    K = q.createBookmark();
                    (p = K.startNode.getPrevious(c)) && a(p) && g(p) && t.push(p);
                    (p = K.startNode.getNext(c)) && a(p) && g(p) && t.push(p);
                    for (p = K.startNode; (p = p.getParent()) && g(p);)t.push(p);
                    q.moveToBookmark(K);
                    if (K = u) {
                        K = n.range;
                        if ("text" == n.type && n.inlineStylesRoot) {
                            E = n.inlineStylesPeak;
                            q = E.getDocument().createText("{cke-peak}");
                            for (t =
                                     n.inlineStylesRoot.getParent(); !E.equals(t);)q = q.appendTo(E.clone()), E = E.getParent();
                            u = q.getOuterHtml().split("{cke-peak}").join(u)
                        }
                        E = n.blockLimit.getName();
                        if (/^\s+|\s+$/.test(u) && "span" in CKEDITOR.dtd[E]) {
                            var U = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
                            u = U + u + U
                        }
                        u = n.editor.dataProcessor.toHtml(u, {
                            context: null,
                            fixForBody: !1,
                            protectedWhitespaces: !!U,
                            dontFilter: n.dontFilter,
                            filter: n.editor.activeFilter,
                            enterMode: n.editor.activeEnterMode
                        });
                        E = K.document.createElement("body");
                        E.setHtml(u);
                        U && (E.getFirst().remove(), E.getLast().remove());
                        if ((U = K.startPath().block) && (1 != U.getChildCount() || !U.getBogus()))a:{
                            var L;
                            if (1 == E.getChildCount() && a(L = E.getFirst()) && L.is(v) && !L.hasAttribute("contenteditable")) {
                                U = L.getElementsByTag("*");
                                K = 0;
                                for (t = U.count(); K < t; K++)if (q = U.getItem(K), !q.is(r))break a;
                                L.moveChildren(L.getParent(1));
                                L.remove()
                            }
                        }
                        n.dataWrapper = E;
                        K = u
                    }
                    if (K) {
                        L = n.range;
                        K = L.document;
                        var N;
                        E = n.blockLimit;
                        t = 0;
                        var S, U = [], Q, Y;
                        u = p = 0;
                        var V, da;
                        q = L.startContainer;
                        var A = n.endPath.elements[0], Z, H = A.getPosition(q),
                            W = !!A.getCommonAncestor(q) && H != CKEDITOR.POSITION_IDENTICAL && !(H & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        q = b(n.dataWrapper, n);
                        for (h(q, L); t < q.length; t++) {
                            H = q[t];
                            if (N = H.isLineBreak) {
                                N = L;
                                V = E;
                                var X = void 0, fa = void 0;
                                H.hasBlockSibling ? N = 1 : (X = N.startContainer.getAscendant(l.$block, 1)) && X.is({
                                    div: 1,
                                    p: 1
                                }) ? (fa = X.getPosition(V), fa == CKEDITOR.POSITION_IDENTICAL || fa == CKEDITOR.POSITION_CONTAINS ? N = 0 : (V = N.splitElement(X), N.moveToPosition(V, CKEDITOR.POSITION_AFTER_START), N = 1)) : N = 0
                            }
                            if (N)u = 0 < t; else {
                                N =
                                    L.startPath();
                                !H.isBlock && m(n.editor, N.block, N.blockLimit) && (Y = f(n.editor)) && (Y = K.createElement(Y), Y.appendBogus(), L.insertNode(Y), CKEDITOR.env.needsBrFiller && (S = Y.getBogus()) && S.remove(), L.moveToPosition(Y, CKEDITOR.POSITION_BEFORE_END));
                                if ((N = L.startPath().block) && !N.equals(Q)) {
                                    if (S = N.getBogus())S.remove(), U.push(N);
                                    Q = N
                                }
                                H.firstNotAllowed && (p = 1);
                                if (p && H.isElement) {
                                    N = L.startContainer;
                                    for (V = null; N && !l[N.getName()][H.name];) {
                                        if (N.equals(E)) {
                                            N = null;
                                            break
                                        }
                                        V = N;
                                        N = N.getParent()
                                    }
                                    if (N)V && (da = L.splitElement(V),
                                        n.zombies.push(da), n.zombies.push(V)); else {
                                        V = E.getName();
                                        Z = !t;
                                        N = t == q.length - 1;
                                        V = d(H.node, V);
                                        for (var X = [], fa = V.length, ba = 0, ea = void 0, ga = 0, ha = -1; ba < fa; ba++)ea = V[ba], " " == ea ? (ga || Z && !ba || (X.push(new CKEDITOR.dom.text(" ")), ha = X.length), ga = 1) : (X.push(ea), ga = 0);
                                        N && ha == X.length && X.pop();
                                        Z = X
                                    }
                                }
                                if (Z) {
                                    for (; N = Z.pop();)L.insertNode(N);
                                    Z = 0
                                } else L.insertNode(H.node);
                                H.lastNotAllowed && t < q.length - 1 && ((da = W ? A : da) && L.setEndAt(da, CKEDITOR.POSITION_AFTER_START), p = 0);
                                L.collapse()
                            }
                        }
                        1 != q.length ? S = !1 : (S = q[0], S = S.isElement &&
                            "false" == S.node.getAttribute("contenteditable"));
                        S && (u = !0, N = q[0].node, L.setStartAt(N, CKEDITOR.POSITION_BEFORE_START), L.setEndAt(N, CKEDITOR.POSITION_AFTER_END));
                        n.dontMoveCaret = u;
                        n.bogusNeededBlocks = U
                    }
                    S = n.range;
                    var aa;
                    da = n.bogusNeededBlocks;
                    for (Z = S.createBookmark(); Q = n.zombies.pop();)Q.getParent() && (Y = S.clone(), Y.moveToElementEditStart(Q), Y.removeEmptyBlocksAtEnd());
                    if (da)for (; Q = da.pop();)CKEDITOR.env.needsBrFiller ? Q.appendBogus() : Q.append(S.document.createText(" "));
                    for (; Q = n.mergeCandidates.pop();)Q.mergeSiblings();
                    S.moveToBookmark(Z);
                    if (!n.dontMoveCaret) {
                        for (Q = e(S); Q && a(Q) && !Q.is(l.$empty);) {
                            if (Q.isBlockBoundary())S.moveToPosition(Q, CKEDITOR.POSITION_BEFORE_END); else {
                                if (g(Q) && Q.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    aa = null;
                                    break
                                }
                                aa = S.clone();
                                aa.moveToPosition(Q, CKEDITOR.POSITION_BEFORE_END)
                            }
                            Q = Q.getLast(c)
                        }
                        aa && S.moveToRange(aa)
                    }
                }
            }
        }();
        r = function () {
            function a(b) {
                b = new CKEDITOR.dom.walker(b);
                b.guard = function (a, b) {
                    if (b)return !1;
                    if (a.type == CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)
                };
                b.evaluator = function (a) {
                    return a.type ==
                        CKEDITOR.NODE_ELEMENT
                };
                return b
            }

            function b(a, c, d) {
                c = a.getDocument().createElement(c);
                a.append(c, d);
                return c
            }

            function c(a) {
                var b = a.count(), d;
                for (b; 0 < b--;)d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
            }

            return function (d) {
                var e = d.startContainer, g = e.getAscendant("table", 1), f = !1;
                c(g.getElementsByTag("td"));
                c(g.getElementsByTag("th"));
                g = d.clone();
                g.setStart(e, 0);
                g = a(g).lastBackward();
                g || (g = d.clone(), g.setEndAt(e,
                    CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), f = !0);
                g || (g = e);
                g.is("table") ? (d.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), g.remove()) : (g.is({
                    tbody: 1,
                    thead: 1,
                    tfoot: 1
                }) && (g = b(g, "tr", f)), g.is("tr") && (g = b(g, g.getParent().is("thead") ? "th" : "td", f)), (e = g.getBogus()) && e.remove(), d.moveToPosition(g, f ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }();
        q = {
            eol: {
                detect: function (a, b) {
                    var c = a.range, d = c.clone(), e = c.clone(), g = new CKEDITOR.dom.elementPath(c.startContainer, b), f = new CKEDITOR.dom.elementPath(c.endContainer,
                        b);
                    d.collapse(1);
                    e.collapse();
                    g.block && d.checkBoundaryOfElement(g.block, CKEDITOR.END) && (c.setStartAfter(g.block), a.prependEolBr = 1);
                    f.block && e.checkBoundaryOfElement(f.block, CKEDITOR.START) && (c.setEndBefore(f.block), a.appendEolBr = 1)
                }, fix: function (a, b) {
                    var c = b.getDocument(), d;
                    a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
                    !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c), 1)
                }, createEolBr: function (a) {
                    return a.createElement("br", {attributes: {"data-cke-eol": 1}})
                }
            },
            bogus: {
                exclude: function (a) {
                    var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode;
                    !b || !u(b) || c && c.equals(b) || a.range.setEndBefore(b)
                }
            }, tree: {
                rebuild: function (a, b) {
                    var c = a.range, d = c.getCommonAncestor(), e = new CKEDITOR.dom.elementPath(d, b), g = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), f;
                    d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
                    if (e.blockLimit.is({tr: 1, table: 1})) {
                        var k = e.contains("table").getParent();
                        f = function (a) {
                            return !a.equals(k)
                        }
                    } else if (e.block &&
                        e.block.is(CKEDITOR.dtd.$listItem) && (g = g.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !g.equals(c))) {
                        var h = e.contains(CKEDITOR.dtd.$list).getParent();
                        f = function (a) {
                            return !a.equals(h)
                        }
                    }
                    f || (f = function (a) {
                        return !a.equals(e.block) && !a.equals(e.blockLimit)
                    });
                    this.rebuildFragment(a, b, d, f)
                }, rebuildFragment: function (a, b, c, d) {
                    for (var e; c && !c.equals(b) && d(c);)e = c.clone(0, 1), a.fragment.appendTo(e), a.fragment = e, c = c.getParent()
                }
            }, cell: {
                shrink: function (a) {
                    a = a.range;
                    var b = a.startContainer, c = a.endContainer,
                        d = a.startOffset, e = a.endOffset;
                    b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT)
                }
            }
        };
        A = function () {
            function a(b, c) {
                var d = b.getParent();
                if (d.is(CKEDITOR.dtd.$inline))b[c ? "insertBefore" : "insertAfter"](d)
            }

            function b(c, d, e) {
                a(d);
                a(e, 1);
                for (var g; g = e.getNext();)g.insertAfter(d), d = g;
                p(c) && c.remove()
            }

            function c(a, b) {
                var d = new CKEDITOR.dom.range(a);
                d.setStartAfter(b.startNode);
                d.setEndBefore(b.endNode);
                return d
            }

            return {
                list: {
                    detectMerge: function (a, b) {
                        var d = c(b, a.bookmark),
                            e = d.startPath(), g = d.endPath(), f = e.contains(CKEDITOR.dtd.$list), k = g.contains(CKEDITOR.dtd.$list);
                        a.mergeList = f && k && f.getParent().equals(k.getParent()) && !f.equals(k);
                        a.mergeListItems = e.block && g.block && e.block.is(CKEDITOR.dtd.$listItem) && g.block.is(CKEDITOR.dtd.$listItem);
                        if (a.mergeList || a.mergeListItems)d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
                    }, merge: function (a, c) {
                        if (a.mergeListBookmark) {
                            var d = a.mergeListBookmark.startNode,
                                e = a.mergeListBookmark.endNode, g = new CKEDITOR.dom.elementPath(d, c), f = new CKEDITOR.dom.elementPath(e, c);
                            if (a.mergeList) {
                                var k = g.contains(CKEDITOR.dtd.$list), h = f.contains(CKEDITOR.dtd.$list);
                                k.equals(h) || (h.moveChildren(k), h.remove())
                            }
                            a.mergeListItems && (g = g.contains(CKEDITOR.dtd.$listItem), f = f.contains(CKEDITOR.dtd.$listItem), g.equals(f) || b(f, d, e));
                            d.remove();
                            e.remove()
                        }
                    }
                }, block: {
                    detectMerge: function (a, b) {
                        if (!a.tableContentsRanges && !a.mergeListBookmark) {
                            var c = new CKEDITOR.dom.range(b);
                            c.setStartBefore(a.bookmark.startNode);
                            c.setEndAfter(a.bookmark.endNode);
                            a.mergeBlockBookmark = c.createBookmark()
                        }
                    }, merge: function (a, c) {
                        if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                            var d = a.mergeBlockBookmark.startNode, e = a.mergeBlockBookmark.endNode, g = new CKEDITOR.dom.elementPath(d, c), f = new CKEDITOR.dom.elementPath(e, c), g = g.block, f = f.block;
                            g && f && !g.equals(f) && b(f, d, e);
                            d.remove();
                            e.remove()
                        }
                    }
                }, table: function () {
                    function a(c) {
                        var e = [], g, f = new CKEDITOR.dom.walker(c), k = c.startPath().contains(d), h = c.endPath().contains(d), l = {};
                        f.guard = function (a,
                                            f) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) {
                                var m = "visited_" + (f ? "out" : "in");
                                if (a.getCustomData(m))return;
                                CKEDITOR.dom.element.setMarker(l, a, m, 1)
                            }
                            if (f && k && a.equals(k))g = c.clone(), g.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), e.push(g); else if (!f && h && a.equals(h))g = c.clone(), g.setStartAt(h, CKEDITOR.POSITION_AFTER_START), e.push(g); else {
                                if (m = !f)m = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!k || b(a, k)) && (!h || b(a, h));
                                m && (g = c.clone(), g.selectNodeContents(a), e.push(g))
                            }
                        };
                        f.lastForward();
                        CKEDITOR.dom.element.clearAllMarkers(l);
                        return e
                    }

                    function b(a, c) {
                        var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, e = a.getPosition(c);
                        return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d)
                    }

                    var d = {td: 1, th: 1, caption: 1};
                    return {
                        detectPurge: function (a) {
                            var b = a.range, c = b.clone();
                            c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var c = new CKEDITOR.dom.walker(c), e = 0;
                            c.evaluator = function (a) {
                                a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e
                            };
                            c.checkForward();
                            if (1 < e) {
                                var c = b.startPath().contains("table"), g = b.endPath().contains("table");
                                c && g && b.checkBoundaryOfElement(c,
                                    CKEDITOR.START) && b.checkBoundaryOfElement(g, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(g), a.purgeTableBookmark = b.createBookmark())
                            }
                        }, detectRanges: function (e, g) {
                            var f = c(g, e.bookmark), k = f.clone(), h, l, m = f.getCommonAncestor();
                            m.is(CKEDITOR.dtd.$tableContent) && !m.is(d) && (m = m.getAscendant("table", !0));
                            l = m;
                            m = new CKEDITOR.dom.elementPath(f.startContainer, l);
                            l = new CKEDITOR.dom.elementPath(f.endContainer, l);
                            m = m.contains("table");
                            l = l.contains("table");
                            if (m || l)m && l && b(m, l) ? (e.tableSurroundingRange =
                                k, k.setStartAt(m, CKEDITOR.POSITION_AFTER_END), k.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), k = f.clone(), k.setEndAt(m, CKEDITOR.POSITION_AFTER_END), h = f.clone(), h.setStartAt(l, CKEDITOR.POSITION_BEFORE_START), h = a(k).concat(a(h))) : m ? l || (e.tableSurroundingRange = k, k.setStartAt(m, CKEDITOR.POSITION_AFTER_END), f.setEndAt(m, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange = k, k.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), f.setStartAt(l, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = h ? h : a(f)
                        }, deleteRanges: function (a) {
                            for (var b; b =
                                a.tableContentsRanges.pop();)b.extractContents(), p(b.startContainer) && b.startContainer.appendBogus();
                            a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                        }, purge: function (a) {
                            if (a.purgeTableBookmark) {
                                var b = a.doc, c = a.range.clone(), b = b.createElement("p");
                                b.insertBefore(a.purgeTableBookmark.startNode);
                                c.moveToBookmark(a.purgeTableBookmark);
                                c.deleteContents();
                                a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                    }
                }(), detectExtractMerge: function (a) {
                    return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) &&
                    a.range.endPath().contains(CKEDITOR.dtd.$listItem))
                }, fixUneditableRangePosition: function (a) {
                    a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0)
                }, autoParagraph: function (a, b) {
                    var c = b.startPath(), d;
                    m(a, c.block, c.blockLimit) && (d = f(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START))
                }
            }
        }()
    }(),function () {
        function a() {
            var a = this._.fakeSelection, b;
            a && (b = this.getSelection(1), b && b.isHidden() || (a.reset(), a = 0));
            if (!a && (a = b ||
                    this.getSelection(1), !a || a.getType() == CKEDITOR.SELECTION_NONE))return;
            this.fire("selectionCheck", a);
            b = this.elementPath();
            if (!b.compare(this._.selectionPreviousPath)) {
                var c = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(b.blockLimit);
                CKEDITOR.env.webkit && !c && (this._.previousActive = this.document.getActive());
                this._.selectionPreviousPath = b;
                this.fire("selectionChange", {selection: a, path: b})
            }
        }

        function e() {
            r = !0;
            t || (b.call(this), t = CKEDITOR.tools.setTimeout(b, 200, this))
        }

        function b() {
            t =
                null;
            r && (CKEDITOR.tools.setTimeout(a, 0, this), r = !1)
        }

        function c(a) {
            return q(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
        }

        function d(a) {
            function b(c, d) {
                return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1
            }

            if (!(a.root instanceof CKEDITOR.editable))return !1;
            var d = a.startContainer, e = a.getPreviousNode(c, null, d), g = a.getNextNode(c, null, d);
            return b(e) || b(g, 1) || !(e || g || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() && d.getBogus()) ? !0 : !1
        }

        function l(a) {
            m(a,
                !1);
            var b = a.getDocument().createText(u);
            a.setCustomData("cke-fillingChar", b);
            return b
        }

        function m(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (!1 !== b) {
                    var d = a.getDocument().getSelection().getNative(), e = d && "None" != d.type && d.getRangeAt(0), g = u.length;
                    if (c.getLength() > g && e && e.intersectsNode(c.$)) {
                        var k = [{node: d.anchorNode, offset: d.anchorOffset}, {
                            node: d.focusNode,
                            offset: d.focusOffset
                        }];
                        d.anchorNode == c.$ && d.anchorOffset > g && (k[0].offset -= g);
                        d.focusNode == c.$ && d.focusOffset > g && (k[1].offset -=
                            g)
                    }
                }
                c.setText(f(c.getText(), 1));
                k && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(k[0].node, k[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(k[1].node, k[1].offset))
            }
        }

        function f(a, b) {
            return b ? a.replace(v, function (a, b) {
                return b ? " " : ""
            }) : a.replace(u, "")
        }

        function h(a, b) {
            var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") +
                '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document);
            a.fire("lockSnapshot");
            a.editable().append(c);
            var d = a.getSelection(1), e = a.createRange(), g = d.root.on("selectionchange", function (a) {
                a.cancel()
            }, null, null, 0);
            e.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
            e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            d.selectRanges([e]);
            g.removeListener();
            a.fire("unlockSnapshot");
            a._.hiddenSelectionContainer = c
        }

        function k(a) {
            var b = {37: 1, 39: 1, 8: 1, 46: 1};
            return function (c) {
                var d = c.data.getKeystroke();
                if (b[d]) {
                    var e = a.getSelection().getRanges(),
                        g = e[0];
                    1 == e.length && g.collapsed && (d = g[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
                }
            }
        }

        function g(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
                if (!c.collapsed) {
                    if (c.startContainer.isReadOnly())for (var d = c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());)e && "false" ==
                    d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
                    d = c.startContainer;
                    e = c.endContainer;
                    var g = c.startOffset, f = c.endOffset, k = c.clone();
                    d && d.type == CKEDITOR.NODE_TEXT && (g >= d.getLength() ? k.setStartAfter(d) : k.setStartBefore(d));
                    e && e.type == CKEDITOR.NODE_TEXT && (f ? k.setEndAfter(e) : k.setEndBefore(e));
                    d = new CKEDITOR.dom.walker(k);
                    d.evaluator = function (d) {
                        if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
                            var e = c.clone();
                            c.setEndBefore(d);
                            c.collapsed && a.splice(b--, 1);
                            d.getPosition(k.endContainer) &
                            CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e));
                            return !0
                        }
                        return !1
                    };
                    d.next()
                }
            }
            return a
        }

        var n = "function" != typeof window.getSelection, p = 1, u = CKEDITOR.tools.repeat("​", 7), v = new RegExp(u + "( )?", "g"), t, r, q = CKEDITOR.dom.walker.invisible(1), A = function () {
            function a(b) {
                return function (a) {
                    var c = a.editor.createRange();
                    c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                    return !1
                }
            }

            function b(a) {
                return function (b) {
                    var c = b.editor, d = c.createRange(),
                        e;
                    (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a));
                    e && c.getSelection().selectRanges([d]);
                    c.fire("saveSnapshot");
                    b.selected.remove();
                    e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
                    c.fire("saveSnapshot");
                    return !1
                }
            }

            var c = a(), d = a(1);
            return {37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1)}
        }();
        CKEDITOR.on("instanceCreated", function (b) {
            function c() {
                var a = d.getSelection();
                a && a.removeAllRanges()
            }

            var d = b.editor;
            d.on("contentDom", function () {
                function b() {
                    w =
                        new CKEDITOR.dom.selection(d.getSelection());
                    w.lock()
                }

                function c() {
                    f.removeListener("mouseup", c);
                    q.removeListener("mouseup", c);
                    var a = CKEDITOR.document.$.selection, b = a.createRange();
                    "None" != a.type && b.parentElement().ownerDocument == g.$ && b.select()
                }

                var g = d.document, f = CKEDITOR.document, h = d.editable(), l = g.getBody(), q = g.getDocumentElement(), v = h.isInline(), r, w;
                CKEDITOR.env.gecko && h.attachListener(h, "focus", function (a) {
                    a.removeListener();
                    0 !== r && (a = d.getSelection().getNative()) && a.isCollapsed && a.anchorNode ==
                    h.$ && (a = d.createRange(), a.moveToElementEditStart(h), a.select())
                }, null, null, -2);
                h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                    r && CKEDITOR.env.webkit && (r = d._.previousActive && d._.previousActive.equals(g.getActive())) && null != d._.previousScrollTop && d._.previousScrollTop != h.$.scrollTop && (h.$.scrollTop = d._.previousScrollTop);
                    d.unlockSelection(r);
                    r = 0
                }, null, null, -1);
                h.attachListener(h, "mousedown", function () {
                    r = 0
                });
                if (CKEDITOR.env.ie || v)n ? h.attachListener(h, "beforedeactivate", b, null,
                    null, -1) : h.attachListener(d, "selectionCheck", b, null, null, -1), h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function () {
                    d.lockSelection(w);
                    r = 1
                }, null, null, -1), h.attachListener(h, "mousedown", function () {
                    r = 0
                });
                if (CKEDITOR.env.ie && !v) {
                    var u;
                    h.attachListener(h, "mousedown", function (a) {
                        2 == a.data.$.button && ((a = d.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (u = d.window.getScrollPosition()))
                    });
                    h.attachListener(h, "mouseup", function (a) {
                        2 == a.data.$.button && u && (d.document.$.documentElement.scrollLeft =
                            u.x, d.document.$.documentElement.scrollTop = u.y);
                        u = null
                    });
                    if ("BackCompat" != g.$.compatMode) {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                            var t, p;
                            q.on("mousedown", function (a) {
                                function b(a) {
                                    a = a.data.$;
                                    if (t) {
                                        var c = l.$.createTextRange();
                                        try {
                                            c.moveToPoint(a.clientX, a.clientY)
                                        } catch (d) {
                                        }
                                        t.setEndPoint(0 > p.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
                                        t.select()
                                    }
                                }

                                function c() {
                                    q.removeListener("mousemove", b);
                                    f.removeListener("mouseup", c);
                                    q.removeListener("mouseup", c);
                                    t.select()
                                }

                                a = a.data;
                                if (a.getTarget().is("html") && a.$.y < q.$.clientHeight && a.$.x < q.$.clientWidth) {
                                    t = l.$.createTextRange();
                                    try {
                                        t.moveToPoint(a.$.clientX, a.$.clientY)
                                    } catch (d) {
                                    }
                                    p = t.duplicate();
                                    q.on("mousemove", b);
                                    f.on("mouseup", c);
                                    q.on("mouseup", c)
                                }
                            })
                        }
                        if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version)q.on("mousedown", function (a) {
                            a.data.getTarget().is("html") && (f.on("mouseup", c), q.on("mouseup", c))
                        })
                    }
                }
                h.attachListener(h, "selectionchange", a, d);
                h.attachListener(h, "keyup", e, d);
                h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusIn" :
                    "focus", function () {
                    d.forceNextSelectionCheck();
                    d.selectionChange(1)
                });
                if (v && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                    var A;
                    h.attachListener(h, "mousedown", function () {
                        A = 1
                    });
                    h.attachListener(g.getDocumentElement(), "mouseup", function () {
                        A && e.call(d);
                        A = 0
                    })
                } else h.attachListener(CKEDITOR.env.ie ? h : g.getDocumentElement(), "mouseup", e, d);
                CKEDITOR.env.webkit && h.attachListener(g, "keydown", function (a) {
                        switch (a.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                m(h)
                        }
                    },
                    null, null, -1);
                h.attachListener(h, "keydown", k(d), null, null, -1)
            });
            d.on("setData", function () {
                d.unlockSelection();
                CKEDITOR.env.webkit && c()
            });
            d.on("contentDomUnload", function () {
                d.unlockSelection()
            });
            if (CKEDITOR.env.ie9Compat)d.on("beforeDestroy", c, null, null, 9);
            d.on("dataReady", function () {
                delete d._.fakeSelection;
                delete d._.hiddenSelectionContainer;
                d.selectionChange(1)
            });
            d.on("loadSnapshot", function () {
                var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = d.editable().getLast(a);
                b && b.hasAttribute("data-cke-hidden-sel") &&
                (b.remove(), CKEDITOR.env.gecko && (a = d.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
            }, null, null, 100);
            d.on("key", function (a) {
                if ("wysiwyg" == d.mode) {
                    var b = d.getSelection();
                    if (b.isFake) {
                        var c = A[a.data.keyCode];
                        if (c)return c({editor: d, selected: b.getSelectedElement(), selection: b, keyEvent: a})
                    }
                }
            })
        });
        if (CKEDITOR.env.webkit)CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor;
            b.on("selectionChange", function () {
                var a = b.editable(), c = a.getCustomData("cke-fillingChar");
                c && (c.getCustomData("ready") ? m(a) : c.setCustomData("ready", 1))
            }, null, null, -1);
            b.on("beforeSetMode", function () {
                m(b.editable())
            }, null, null, -1);
            b.on("getSnapshot", function (a) {
                a.data && (a.data = f(a.data))
            }, b, null, 20);
            b.on("toDataFormat", function (a) {
                a.data.dataValue = f(a.data.dataValue)
            }, null, null, 0)
        });
        CKEDITOR.editor.prototype.selectionChange = function (b) {
            (b ? a : e).call(this)
        };
        CKEDITOR.editor.prototype.getSelection = function (a) {
            return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" ==
            this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
        };
        CKEDITOR.editor.prototype.lockSelection = function (a) {
            a = a || this.getSelection(1);
            return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
        };
        CKEDITOR.editor.prototype.unlockSelection = function (a) {
            var b = this._.savedSelection;
            return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1
        };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath
        };
        CKEDITOR.dom.document.prototype.getSelection = function () {
            return new CKEDITOR.dom.selection(this)
        };
        CKEDITOR.dom.range.prototype.select = function () {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a
        };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        CKEDITOR.dom.selection = function (a) {
            if (a instanceof CKEDITOR.dom.selection) {
                var b = a;
                a = a.root
            }
            var c = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : p++;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = c ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = {cache: {}};
            if (b)return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
            a = this.getNative();
            var d, e;
            if (a)if (a.getRangeAt)d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer); else {
                try {
                    e = a.createRange()
                } catch (g) {
                }
                d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement())
            }
            if (!d ||
                d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d))this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
            return this
        };
        var B = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
            _removeFillingCharSequenceString: f,
            _createFillingCharSequenceNode: l, FILLING_CHAR_SEQUENCE: u
        });
        CKEDITOR.dom.selection.prototype = {
            getNative: function () {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = n ? this.document.$.selection : this.document.getWindow().$.getSelection()
            }, getType: n ? function () {
                var a = this._.cache;
                if (a.type)return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(), d = c.type;
                    "Text" == d && (b = CKEDITOR.SELECTION_TEXT);
                    "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
                    c.createRange().parentElement() &&
                    (b = CKEDITOR.SELECTION_TEXT)
                } catch (e) {
                }
                return a.type = b
            } : function () {
                var a = this._.cache;
                if (a.type)return a.type;
                var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
                if (!c || !c.rangeCount)b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) {
                    var c = c.getRangeAt(0), d = c.startContainer;
                    d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && B[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
                }
                return a.type = b
            }, getRanges: function () {
                var a = n ? function () {
                    function a(b) {
                        return (new CKEDITOR.dom.node(b)).getIndex()
                    }

                    var b = function (b, c) {
                        b = b.duplicate();
                        b.collapse(c);
                        var d = b.parentElement();
                        if (!d.hasChildNodes())return {container: d, offset: 0};
                        for (var e = d.children, g, f, k = b.duplicate(), h = 0, l = e.length - 1, m = -1, n, q; h <= l;)if (m = Math.floor((h + l) / 2), g = e[m], k.moveToElementText(g), n = k.compareEndPoints("StartToStart", b), 0 < n)l = m - 1; else if (0 > n)h = m + 1; else return {
                            container: d,
                            offset: a(g)
                        };
                        if (-1 == m || m == e.length - 1 && 0 > n) {
                            k.moveToElementText(d);
                            k.setEndPoint("StartToStart", b);
                            k = k.text.replace(/(\r\n|\r)/g, "\n").length;
                            e = d.childNodes;
                            if (!k)return g =
                                e[e.length - 1], g.nodeType != CKEDITOR.NODE_TEXT ? {
                                container: d,
                                offset: e.length
                            } : {container: g, offset: g.nodeValue.length};
                            for (d = e.length; 0 < k && 0 < d;)f = e[--d], f.nodeType == CKEDITOR.NODE_TEXT && (q = f, k -= f.nodeValue.length);
                            return {container: q, offset: -k}
                        }
                        k.collapse(0 < n ? !0 : !1);
                        k.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b);
                        k = k.text.replace(/(\r\n|\r)/g, "\n").length;
                        if (!k)return {container: d, offset: a(g) + (0 < n ? 0 : 1)};
                        for (; 0 < k;)try {
                            f = g[0 < n ? "previousSibling" : "nextSibling"], f.nodeType == CKEDITOR.NODE_TEXT && (k -= f.nodeValue.length,
                                q = f), g = f
                        } catch (r) {
                            return {container: d, offset: a(g)}
                        }
                        return {container: q, offset: 0 < n ? -k : q.nodeValue.length + k}
                    };
                    return function () {
                        var a = this.getNative(), c = a && a.createRange(), d = this.getType();
                        if (!a)return [];
                        if (d == CKEDITOR.SELECTION_TEXT)return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
                        a.collapse(), [a];
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var g = c.item(e), f = g.parentNode, k = 0, a = new CKEDITOR.dom.range(this.root); k < f.childNodes.length && f.childNodes[k] != g; k++);
                                a.setStart(new CKEDITOR.dom.node(f), k);
                                a.setEnd(new CKEDITOR.dom.node(f), k + 1);
                                d.push(a)
                            }
                            return d
                        }
                        return []
                    }
                }() : function () {
                    var a = [], b, c = this.getNative();
                    if (!c)return a;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        b = new CKEDITOR.dom.range(this.root);
                        b.setStart(new CKEDITOR.dom.node(e.startContainer),
                            e.startOffset);
                        b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                        a.push(b)
                    }
                    return a
                };
                return function (b) {
                    var c = this._.cache, d = c.ranges;
                    d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)));
                    return b ? g(new CKEDITOR.dom.rangeList(d.slice())) : d
                }
            }(), getStartElement: function () {
                var a = this._.cache;
                if (void 0 !== a.startElement)return a.startElement;
                var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var c = this.getRanges()[0];
                        if (c) {
                            if (c.collapsed)b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b);
                                b = c.startContainer;
                                if (b.type != CKEDITOR.NODE_ELEMENT)return b.getParent();
                                if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                            }
                            b = b.$
                        }
                }
                return a.startElement = b ?
                    new CKEDITOR.dom.element(b) : null
            }, getSelectedElement: function () {
                var a = this._.cache;
                if (void 0 !== a.selectedElement)return a.selectedElement;
                var b = this, c = CKEDITOR.tools.tryThese(function () {
                    return b.getNative().createRange().item(0)
                }, function () {
                    for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && B[c.getName()] && (d = c)); e--)a.shrink(CKEDITOR.SHRINK_ELEMENT);
                    return d && d.$
                });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            }, getSelectedText: function () {
                var a =
                    this._.cache;
                if (void 0 !== a.selectedText)return a.selectedText;
                var b = this.getNative(), b = n ? "Control" == b.type ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            }, lock: function () {
                this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1
            }, unlock: function (a) {
                if (this.isLocked) {
                    if (a)var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake;
                    this.isLocked = 0;
                    this.reset();
                    a && (a = b || c[0] && c[0].getCommonAncestor()) &&
                    a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                }
            }, reset: function () {
                this._.cache = {};
                this.isFake = 0;
                var a = this.root.editor;
                if (a && a._.fakeSelection)if (this.rev == a._.fakeSelection.rev) {
                    delete a._.fakeSelection;
                    var b = a._.hiddenSelectionContainer;
                    if (b) {
                        var c = a.checkDirty();
                        a.fire("lockSnapshot");
                        b.remove();
                        a.fire("unlockSnapshot");
                        !c && a.resetDirty()
                    }
                    delete a._.hiddenSelectionContainer
                } else CKEDITOR.warn("selection-fake-reset");
                this.rev = p++
            }, selectElement: function (a) {
                var b =
                    new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            }, selectRanges: function (a) {
                var b = this.root.editor, b = b && b._.hiddenSelectionContainer;
                this.reset();
                if (b)for (var b = this.root, c, e = 0; e < a.length; ++e)c = a[e], c.endContainer.equals(b) && (c.endOffset = Math.min(c.endOffset, b.getChildCount()));
                if (a.length)if (this.isLocked) {
                    var g = CKEDITOR.document.getActive();
                    this.unlock();
                    this.selectRanges(a);
                    this.lock();
                    g && !g.equals(this.root) && g.focus()
                } else {
                    var f;
                    a:{
                        var k, h;
                        if (1 == a.length && !(h = a[0]).collapsed && (f = h.getEnclosedNode()) && f.type == CKEDITOR.NODE_ELEMENT && (h = h.clone(), h.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (k = h.getEnclosedNode()) && k.type == CKEDITOR.NODE_ELEMENT && (f = k), "false" == f.getAttribute("contenteditable")))break a;
                        f = void 0
                    }
                    if (f)this.fake(f); else {
                        if (n) {
                            h = CKEDITOR.dom.walker.whitespaces(!0);
                            k = /\ufeff|\u00a0/;
                            b = {table: 1, tbody: 1, tr: 1};
                            1 < a.length && (f = a[a.length - 1], a[0].setEnd(f.endContainer, f.endOffset));
                            f = a[0];
                            a = f.collapsed;
                            var q, r, v;
                            if ((c = f.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT &&
                                c.getName() in B && (!c.is("a") || !c.getText()))try {
                                v = c.$.createControlRange();
                                v.addElement(c.$);
                                v.select();
                                return
                            } catch (u) {
                            }
                            if (f.startContainer.type == CKEDITOR.NODE_ELEMENT && f.startContainer.getName() in b || f.endContainer.type == CKEDITOR.NODE_ELEMENT && f.endContainer.getName() in b)f.shrink(CKEDITOR.NODE_ELEMENT, !0), a = f.collapsed;
                            v = f.createBookmark();
                            b = v.startNode;
                            a || (g = v.endNode);
                            v = f.document.$.body.createTextRange();
                            v.moveToElementText(b.$);
                            v.moveStart("character", 1);
                            g ? (k = f.document.$.body.createTextRange(),
                                k.moveToElementText(g.$), v.setEndPoint("EndToEnd", k), v.moveEnd("character", -1)) : (q = b.getNext(h), r = b.hasAscendant("pre"), q = !(q && q.getText && q.getText().match(k)) && (r || !b.hasPrevious() || b.getPrevious().is && b.getPrevious().is("br")), r = f.document.createElement("span"), r.setHtml("\x26#65279;"), r.insertBefore(b), q && f.document.createText("﻿").insertBefore(b));
                            f.setStartBefore(b);
                            b.remove();
                            a ? (q ? (v.moveStart("character", -1), v.select(), f.document.$.selection.clear()) : v.select(), f.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START),
                                r.remove()) : (f.setEndBefore(g), g.remove(), v.select())
                        } else {
                            g = this.getNative();
                            if (!g)return;
                            this.removeAllRanges();
                            for (v = 0; v < a.length; v++) {
                                if (v < a.length - 1 && (q = a[v], r = a[v + 1], k = q.clone(), k.setStart(q.endContainer, q.endOffset), k.setEnd(r.startContainer, r.startOffset), !k.collapsed && (k.shrink(CKEDITOR.NODE_ELEMENT, !0), f = k.getCommonAncestor(), k = k.getEnclosedNode(), f.isReadOnly() || k && k.isReadOnly()))) {
                                    r.setStart(q.startContainer, q.startOffset);
                                    a.splice(v--, 1);
                                    continue
                                }
                                f = a[v];
                                r = this.document.$.createRange();
                                f.collapsed && CKEDITOR.env.webkit && d(f) && (k = l(this.root), f.insertNode(k), (q = k.getNext()) && !k.getPrevious() && q.type == CKEDITOR.NODE_ELEMENT && "br" == q.getName() ? (m(this.root), f.moveToPosition(q, CKEDITOR.POSITION_BEFORE_START)) : f.moveToPosition(k, CKEDITOR.POSITION_AFTER_END));
                                r.setStart(f.startContainer.$, f.startOffset);
                                try {
                                    r.setEnd(f.endContainer.$, f.endOffset)
                                } catch (t) {
                                    if (0 <= t.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))f.collapse(1), r.setEnd(f.endContainer.$, f.endOffset); else throw t;
                                }
                                g.addRange(r)
                            }
                        }
                        this.reset();
                        this.root.fire("selectionchange")
                    }
                }
            }, fake: function (a, b) {
                var c = this.root.editor;
                void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
                this.reset();
                h(c, b);
                var d = this._.cache, e = new CKEDITOR.dom.range(this.root);
                e.setStartBefore(a);
                e.setEndAfter(a);
                d.ranges = new CKEDITOR.dom.rangeList(e);
                d.selectedElement = d.startElement = a;
                d.type = CKEDITOR.SELECTION_ELEMENT;
                d.selectedText = d.nativeSel = null;
                this.isFake = 1;
                this.rev = p++;
                c._.fakeSelection = this;
                this.root.fire("selectionchange")
            }, isHidden: function () {
                var a =
                    this.getCommonAncestor();
                a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
                return !(!a || !a.data("cke-hidden-sel"))
            }, createBookmarks: function (a) {
                a = this.getRanges().createBookmarks(a);
                this.isFake && (a.isFake = 1);
                return a
            }, createBookmarks2: function (a) {
                a = this.getRanges().createBookmarks2(a);
                this.isFake && (a.isFake = 1);
                return a
            }, selectBookmarks: function (a) {
                for (var b = [], c, d = 0; d < a.length; d++) {
                    var e = new CKEDITOR.dom.range(this.root);
                    e.moveToBookmark(a[d]);
                    b.push(e)
                }
                a.isFake && (c = b[0].getEnclosedNode(), c && c.type ==
                CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0));
                a.isFake ? this.fake(c) : this.selectRanges(b);
                return this
            }, getCommonAncestor: function () {
                var a = this.getRanges();
                return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null
            }, scrollIntoView: function () {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
            }, removeAllRanges: function () {
                if (this.getType() != CKEDITOR.SELECTION_NONE) {
                    var a = this.getNative();
                    try {
                        a && a[n ? "empty" : "removeAllRanges"]()
                    } catch (b) {
                    }
                    this.reset()
                }
            }
        }
    }(),
        "use strict",CKEDITOR.STYLE_BLOCK = 1,CKEDITOR.STYLE_INLINE = 2,CKEDITOR.STYLE_OBJECT = 3,function () {
        function a(a, b) {
            for (var c, d; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle"))c = a; else if (!d) {
                var e = a.getAttribute("contentEditable");
                "false" == e ? c = a : "true" == e && (d = 1)
            }
            return c
        }

        function e(a, b, c, d) {
            return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a))
        }

        function b(c) {
            var g = c.document;
            if (c.collapsed)g = q(this, g), c.insertNode(g), c.moveToPosition(g, CKEDITOR.POSITION_BEFORE_END); else {
                var f =
                    this.element, k = this._.definition, h, l = k.ignoreReadonly, m = l || k.includeReadonly;
                null == m && (m = c.root.getCustomData("cke_includeReadonly"));
                var n = CKEDITOR.dtd[f];
                n || (h = !0, n = CKEDITOR.dtd.span);
                c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                c.trim();
                var r = c.createBookmark(), u = r.startNode, t = r.endNode, p = u, A;
                if (!l) {
                    var w = c.getCommonAncestor(), l = a(u, w), w = a(t, w);
                    l && (p = l.getNextSourceNode(!0));
                    w && (t = w)
                }
                for (p.getPosition(t) == CKEDITOR.POSITION_FOLLOWING && (p = 0); p;) {
                    l = !1;
                    if (p.equals(t))p = null, l = !0; else {
                        var B = p.type == CKEDITOR.NODE_ELEMENT ?
                            p.getName() : null, w = B && "false" == p.getAttribute("contentEditable"), y = B && p.getAttribute("data-nostyle");
                        if (B && p.data("cke-bookmark")) {
                            p = p.getNextSourceNode(!0);
                            continue
                        }
                        if (w && m && CKEDITOR.dtd.$block[B])for (var C = p, x = d(C), z = void 0, D = x.length, ea = 0, C = D && new CKEDITOR.dom.range(C.getDocument()); ea < D; ++ea) {
                            var z = x[ea], ga = CKEDITOR.filter.instances[z.data("cke-filter")];
                            if (ga ? ga.check(this) : 1)C.selectNodeContents(z), b.call(this, C)
                        }
                        x = B ? !n[B] || y ? 0 : w && !m ? 0 : e(p, t, k, M) : 1;
                        if (x)if (z = p.getParent(), x = k, D = f, ea = h, !z || !(z.getDtd() ||
                            CKEDITOR.dtd.span)[D] && !ea || x.parentRule && !x.parentRule(z))l = !0; else {
                            if (A || B && CKEDITOR.dtd.$removeEmpty[B] && (p.getPosition(t) | M) != M || (A = c.clone(), A.setStartBefore(p)), B = p.type, B == CKEDITOR.NODE_TEXT || w || B == CKEDITOR.NODE_ELEMENT && !p.getChildCount()) {
                                for (var B = p, E; (l = !B.getNext(J)) && (E = B.getParent(), n[E.getName()]) && e(E, u, k, O);)B = E;
                                A.setEndAfter(B)
                            }
                        } else l = !0;
                        p = p.getNextSourceNode(y || w)
                    }
                    if (l && A && !A.collapsed) {
                        for (var l = q(this, g), w = l.hasAttributes(), y = A.getCommonAncestor(), B = {}, x = {}, z = {}, D = {}, aa, F, G; l &&
                        y;) {
                            if (y.getName() == f) {
                                for (aa in k.attributes)!D[aa] && (G = y.getAttribute(F)) && (l.getAttribute(aa) == G ? x[aa] = 1 : D[aa] = 1);
                                for (F in k.styles)!z[F] && (G = y.getStyle(F)) && (l.getStyle(F) == G ? B[F] = 1 : z[F] = 1)
                            }
                            y = y.getParent()
                        }
                        for (aa in x)l.removeAttribute(aa);
                        for (F in B)l.removeStyle(F);
                        w && !l.hasAttributes() && (l = null);
                        l ? (A.extractContents().appendTo(l), A.insertNode(l), v.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), A.extractContents().appendTo(l), A.insertNode(l),
                            v.call(this, l), l.remove(!0));
                        A = null
                    }
                }
                c.moveToBookmark(r);
                c.shrink(CKEDITOR.SHRINK_TEXT);
                c.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        }

        function c(a) {
            function b() {
                for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(l.getParent()), e = null, g = null, f = 0; f < a.elements.length; f++) {
                    var k = a.elements[f];
                    if (k == a.block || k == a.blockLimit)break;
                    m.checkElementRemovable(k, !0) && (e = k)
                }
                for (f = 0; f < c.elements.length; f++) {
                    k = c.elements[f];
                    if (k == c.block || k == c.blockLimit)break;
                    m.checkElementRemovable(k, !0) &&
                    (g = k)
                }
                g && l.breakParent(g);
                e && d.breakParent(e)
            }

            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var c = a.createBookmark(), d = c.startNode;
            if (a.collapsed) {
                for (var e = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, f = 0, k; f < e.elements.length && (k = e.elements[f]) && k != e.block && k != e.blockLimit; f++)if (this.checkElementRemovable(k)) {
                    var h;
                    a.collapsed && (a.checkBoundaryOfElement(k, CKEDITOR.END) || (h = a.checkBoundaryOfElement(k, CKEDITOR.START))) ? (g = k, g.match = h ? "start" : "end") : (k.mergeSiblings(), k.is(this.element) ? u.call(this,
                        k) : t(k, w(this)[k.getName()]))
                }
                if (g) {
                    k = d;
                    for (f = 0; ; f++) {
                        h = e.elements[f];
                        if (h.equals(g))break; else if (h.match)continue; else h = h.clone();
                        h.append(k);
                        k = h
                    }
                    k["start" == g.match ? "insertBefore" : "insertAfter"](g)
                }
            } else {
                var l = c.endNode, m = this;
                b();
                for (e = d; !e.equals(l);)g = e.getNextSourceNode(), e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e) && (e.getName() == this.element ? u.call(this, e) : t(e, w(this)[e.getName()]), g.type == CKEDITOR.NODE_ELEMENT && g.contains(d) && (b(), g = d.getNext())), e = g
            }
            a.moveToBookmark(c);
            a.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }

        function d(a) {
            var b = [];
            a.forEach(function (a) {
                if ("true" == a.getAttribute("contenteditable"))return b.push(a), !1
            }, CKEDITOR.NODE_ELEMENT, !0);
            return b
        }

        function l(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && A(a, this)
        }

        function m(a) {
            var b = a.getCommonAncestor(!0, !0);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition, c = b.attributes;
                if (c)for (var d in c)a.removeAttribute(d, c[d]);
                if (b.styles)for (var e in b.styles)b.styles.hasOwnProperty(e) && a.removeStyle(e)
            }
        }

        function f(a) {
            var b = a.createBookmark(!0), c = a.createIterator();
            c.enforceRealBlocks = !0;
            this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var d, e = a.document, g; d = c.getNextParagraph();)!d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (g = q(this, e, d), k(d, g));
            a.moveToBookmark(b)
        }

        function h(a) {
            var b = a.createBookmark(1), c = a.createIterator();
            c.enforceRealBlocks = !0;
            c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e; d = c.getNextParagraph();)this.checkElementRemovable(d) && (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), k(d, e)) : u.call(this, d));
            a.moveToBookmark(b)
        }

        function k(a, b) {
            var c = !b;
            c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
            var d = b && b.is("pre"), e = a.is("pre"), f = !d && e;
            if (d && !e) {
                e = b;
                (f = a.getBogus()) && f.remove();
                f = a.getHtml();
                f = n(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                f = f.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var k = a.getDocument().createElement("div");
                    k.append(e);
                    e.$.outerHTML = "\x3cpre\x3e" + f + "\x3c/pre\x3e";
                    e.copyAttributes(k.getFirst());
                    e = k.getFirst().remove()
                } else e.setHtml(f);
                b = e
            } else f ? b = p(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b, h;
                (h = c.getPrevious(G)) && h.type == CKEDITOR.NODE_ELEMENT &&
                h.is("pre") && (d = n(h.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" : c.setHtml(d), h.remove())
            } else c && r(b)
        }

        function g(a) {
            var b = [];
            n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) {
                return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e"
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) {
                b.push(c)
            });
            return b
        }

        function n(a, b, c) {
            var d = "", e = "";
            a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,
                function (a, b, c) {
                    b && (d = b);
                    c && (e = c);
                    return ""
                });
            return d + a.replace(b, c) + e
        }

        function p(a, b) {
            var c;
            1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = n(e, /^[ \t]*\n/, ""), e = n(e, /\n$/, ""), e = n(e, /^[ \t]+|[ \t]+$/g, function (a, b) {
                    return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
                }), e = e.replace(/\n/g, "\x3cbr\x3e"), e = e.replace(/[ \t]{2,}/g, function (a) {
                    return CKEDITOR.tools.repeat("\x26nbsp;",
                            a.length - 1) + " "
                });
                if (c) {
                    var g = b.clone();
                    g.setHtml(e);
                    c.append(g)
                } else b.setHtml(e)
            }
            return c || b
        }

        function u(a, b) {
            var c = this._.definition, d = c.attributes, c = c.styles, e = w(this)[a.getName()], g = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c), f;
            for (f in d)if ("class" != f && !this._.definition.fullMatch || a.getAttribute(f) == y(f, d[f]))b && "data-" == f.slice(0, 5) || (g = a.hasAttribute(f), a.removeAttribute(f));
            for (var k in c)this._.definition.fullMatch && a.getStyle(k) != y(k, c[k], !0) || (g = g || !!a.getStyle(k), a.removeStyle(k));
            t(a, e, z[a.getName()]);
            g && (this._.definition.alwaysRemoveElement ? r(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? r(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }

        function v(a) {
            for (var b = w(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;)d = c.getItem(e), d.isReadOnly() || u.call(this, d, !0);
            for (var g in b)if (g != this.element)for (c = a.getElementsByTag(g), e = c.count() - 1; 0 <= e; e--)d = c.getItem(e), d.isReadOnly() || t(d, b[g])
        }

        function t(a,
                   b, c) {
            if (b = b && b.attributes)for (var d = 0; d < b.length; d++) {
                var e = b[d][0], g;
                if (g = a.getAttribute(e)) {
                    var f = b[d][1];
                    (null === f || f.test && f.test(g) || "string" == typeof f && g == f) && a.removeAttribute(e)
                }
            }
            c || r(a)
        }

        function r(a, b) {
            if (!a.hasAttributes() || b)if (CKEDITOR.dtd.$block[a.getName()]) {
                var c = a.getPrevious(G), d = a.getNext(G);
                !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({br: 1}) || a.append("br", 1);
                !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({br: 1}) || a.append("br");
                a.remove(!0)
            } else c = a.getFirst(), d = a.getLast(),
                a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        }

        function q(a, b, c) {
            var d;
            d = a.element;
            "*" == d && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = A(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d
        }

        function A(a, b) {
            var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
            if (d)for (var e in d)a.setAttribute(e,
                d[e]);
            c && a.setAttribute("style", c);
            return a
        }

        function B(a, b) {
            for (var c in a)a[c] = a[c].replace(E, function (a, c) {
                return b[c]
            })
        }

        function w(a) {
            if (a._.overrides)return a._.overrides;
            var b = a._.overrides = {}, c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d], g, f;
                    "string" == typeof e ? g = e.toLowerCase() : (g = e.element ? e.element.toLowerCase() : a.element, f = e.attributes);
                    e = b[g] || (b[g] = {});
                    if (f) {
                        var e = e.attributes = e.attributes || [], k;
                        for (k in f)e.push([k.toLowerCase(),
                            f[k]])
                    }
                }
            }
            return b
        }

        function y(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }

        function C(a, b) {
            function c(a, b) {
                return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a
            }

            "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a));
            "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
            for (var d in a)if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d])return !1;
            return !0
        }

        function x(a, b, c) {
            var d = a.document, e = a.getRanges();
            b = b ? this.removeFromRange : this.applyToRange;
            for (var g, f = e.createIterator(); g = f.getNextRange();)b.call(this, g, c);
            a.selectRanges(e);
            d.removeCustomData("doc_processing_style")
        }

        var z = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        }, D = {
            a: 1,
            blockquote: 1,
            embed: 1,
            hr: 1,
            img: 1,
            li: 1,
            object: 1,
            ol: 1,
            table: 1,
            td: 1,
            tr: 1,
            th: 1,
            ul: 1,
            dl: 1,
            dt: 1,
            dd: 1,
            form: 1,
            audio: 1,
            video: 1
        }, F = /\s*(?:;\s*|$)/, E = /#\((.+?)\)/g, J = CKEDITOR.dom.walker.bookmark(0, 1), G = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function (a, b) {
            if ("string" == typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);
            var c = a.attributes;
            c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
            b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles, b));
            c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() :
                a.element : "*";
            this.type = a.type || (z[c] ? CKEDITOR.STYLE_BLOCK : D[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
            "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
            this._ = {definition: a}
        };
        CKEDITOR.style.prototype = {
            apply: function (a) {
                if (a instanceof CKEDITOR.dom.document)return x.call(this, a.getSelection());
                if (this.checkApplicable(a.elementPath(), a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    x.call(this, a.getSelection(), 0, a);
                    this._.enterMode = b
                }
            }, remove: function (a) {
                if (a instanceof CKEDITOR.dom.document)return x.call(this, a.getSelection(), 1);
                if (this.checkApplicable(a.elementPath(), a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    x.call(this, a.getSelection(), 1, a);
                    this._.enterMode = b
                }
            }, applyToRange: function (a) {
                this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? l : null;
                return this.applyToRange(a)
            }, removeFromRange: function (a) {
                this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ?
                    h : this.type == CKEDITOR.STYLE_OBJECT ? m : null;
                return this.removeFromRange(a)
            }, applyToObject: function (a) {
                A(a, this)
            }, checkActive: function (a, b) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var c = a.elements, d = 0, e; d < c.length; d++)if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
                            if (this.type == CKEDITOR.STYLE_OBJECT) {
                                var g = e.getName();
                                if (!("string" == typeof this.element ?
                                    g == this.element : g in this.element))continue
                            }
                            if (this.checkElementRemovable(e, !0, b))return !0
                        }
                }
                return !1
            }, checkApplicable: function (a, b, c) {
                b && b instanceof CKEDITOR.filter && (c = b);
                if (c && !c.check(this))return !1;
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return !!a.contains(this.element);
                    case CKEDITOR.STYLE_BLOCK:
                        return !!a.blockLimit.getDtd()[this.element]
                }
                return !0
            }, checkElementMatch: function (a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly())return !1;
                var d = a.getName();
                if ("string" == typeof this.element ?
                    d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes())return !0;
                    if (d = c._AC)c = d; else {
                        var d = {}, e = 0, g = c.attributes;
                        if (g)for (var f in g)e++, d[f] = g[f];
                        if (f = CKEDITOR.style.getStyleText(c))d.style || e++, d.style = f;
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var k in c)if ("_length" != k)if (d = a.getAttribute(k) || "", "style" == k ? C(c[k], d) : c[k] == d) {
                            if (!b)return !0
                        } else if (b)return !1;
                        if (b)return !0
                    } else return !0
                }
                return !1
            }, checkElementRemovable: function (a, b, c) {
                if (this.checkElementMatch(a, b, c))return !0;
                if (b = w(this)[a.getName()]) {
                    var d;
                    if (!(b = b.attributes))return !0;
                    for (c = 0; c < b.length; c++)if (d = b[c][0], d = a.getAttribute(d)) {
                        var e = b[c][1];
                        if (null === e)return !0;
                        if ("string" == typeof e) {
                            if (d == e)return !0
                        } else if (e.test(d))return !0
                    }
                }
                return !1
            }, buildPreview: function (a) {
                var b = this._.definition, c = [], d = b.element;
                "bdo" == d && (d = "span");
                var c = ["\x3c", d], e = b.attributes;
                if (e)for (var g in e)c.push(" ", g, '\x3d"', e[g], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"');
                c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
                return c.join("")
            }, getDefinition: function () {
                return this._.definition
            }
        };
        CKEDITOR.style.getStyleText = function (a) {
            var b = a._ST;
            if (b)return b;
            var b = a.styles, c = a.attributes && a.attributes.style || "", d = "";
            c.length && (c = c.replace(F, ";"));
            for (var e in b) {
                var g = b[e], f = (e + ":" + g).replace(F, ";");
                "inherit" == g ? d += f : c += f
            }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
            return a._ST = c + d
        };
        CKEDITOR.style.customHandlers = {};
        CKEDITOR.style.addCustomHandler = function (a) {
            var b = function (a) {
                this._ = {definition: a};
                this.setup && this.setup(a)
            };
            b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
                {assignedTo: CKEDITOR.STYLE_OBJECT}, a, !0);
            return this.customHandlers[a.type] = b
        };
        var M = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, O = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    }(),CKEDITOR.styleCommand = function (a, e) {
        this.requiredContent = this.allowedContent = this.style = a;
        CKEDITOR.tools.extend(this, e, !0)
    },CKEDITOR.styleCommand.prototype.exec = function (a) {
        a.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) :
        this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
    },CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"),CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet),CKEDITOR.loadStylesSet = function (a, e, b) {
        CKEDITOR.stylesSet.addExternal(a, e, "");
        CKEDITOR.stylesSet.load(a, b)
    },CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function (a, e) {
            var b = this._.styleStateChangeCallbacks;
            b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange",
                function (a) {
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d], m = e.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                        e.fn.call(this, m)
                    }
                }));
            b.push({style: a, fn: e})
        }, applyStyle: function (a) {
            a.apply(this)
        }, removeStyle: function (a) {
            a.remove(this)
        }, getStylesSet: function (a) {
            if (this._.stylesDefinitions)a(this._.stylesDefinitions); else {
                var e = this, b = e.config.stylesCombo_stylesSet || e.config.stylesSet;
                if (!1 === b)a(null); else if (b instanceof Array)e._.stylesDefinitions = b, a(b); else {
                    b || (b = "default");
                    var b = b.split(":"), c = b[0];
                    CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                    CKEDITOR.stylesSet.load(c, function (b) {
                        e._.stylesDefinitions = b[c];
                        a(e._.stylesDefinitions)
                    })
                }
            }
        }
    }),CKEDITOR.dom.comment = function (a, e) {
        "string" == typeof a && (a = (e ? e.$ : document).createComment(a));
        CKEDITOR.dom.domObject.call(this, a)
    },CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () {
            return "\x3c!--" +
                this.$.nodeValue + "--\x3e"
        }
    }),"use strict",function () {
        var a = {}, e = {}, b;
        for (b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list || (a[b] = 1);
        for (b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (e[b] = 1);
        CKEDITOR.dom.elementPath = function (b, d) {
            var l = null, m = null, f = [], h = b, k;
            d = d || b.getDocument().getBody();
            do if (h.type == CKEDITOR.NODE_ELEMENT) {
                f.push(h);
                if (!this.lastElement && (this.lastElement = h, h.is(CKEDITOR.dtd.$object) || "false" == h.getAttribute("contenteditable")))continue;
                if (h.equals(d))break;
                if (!m && (k = h.getName(), "true" == h.getAttribute("contenteditable") ? m = h : !l && e[k] && (l = h), a[k])) {
                    if (k = !l && "div" == k) {
                        a:{
                            k = h.getChildren();
                            for (var g = 0, n = k.count(); g < n; g++) {
                                var p = k.getItem(g);
                                if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) {
                                    k = !0;
                                    break a
                                }
                            }
                            k = !1
                        }
                        k = !k
                    }
                    k ? l = h : m = h
                }
            } while (h = h.getParent());
            m || (m = d);
            this.block = l;
            this.blockLimit = m;
            this.root = d;
            this.elements = f
        }
    }(),CKEDITOR.dom.elementPath.prototype = {
        compare: function (a) {
            var e = this.elements;
            a = a && a.elements;
            if (!a ||
                e.length != a.length)return !1;
            for (var b = 0; b < e.length; b++)if (!e[b].equals(a[b]))return !1;
            return !0
        }, contains: function (a, e, b) {
            var c;
            "string" == typeof a && (c = function (b) {
                return b.getName() == a
            });
            a instanceof CKEDITOR.dom.element ? c = function (b) {
                return b.equals(a)
            } : CKEDITOR.tools.isArray(a) ? c = function (b) {
                return -1 < CKEDITOR.tools.indexOf(a, b.getName())
            } : "function" == typeof a ? c = a : "object" == typeof a && (c = function (b) {
                return b.getName() in a
            });
            var d = this.elements, l = d.length;
            e && l--;
            b && (d = Array.prototype.slice.call(d, 0),
                d.reverse());
            for (e = 0; e < l; e++)if (c(d[e]))return d[e];
            return null
        }, isContextFor: function (a) {
            var e;
            return a in CKEDITOR.dtd.$block ? (e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!e.getDtd()[a]) : !0
        }, direction: function () {
            return (this.block || this.blockLimit || this.root).getDirection(1)
        }
    },CKEDITOR.dom.text = function (a, e) {
        "string" == typeof a && (a = (e ? e.$ : document).createTextNode(a));
        this.$ = a
    },CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,
        {
            type: CKEDITOR.NODE_TEXT, getLength: function () {
            return this.$.nodeValue.length
        }, getText: function () {
            return this.$.nodeValue
        }, setText: function (a) {
            this.$.nodeValue = a
        }, split: function (a) {
            var e = this.$.parentNode, b = e.childNodes.length, c = this.getLength(), d = this.getDocument(), l = new CKEDITOR.dom.text(this.$.splitText(a), d);
            e.childNodes.length == b && (a >= c ? (l = d.createText(""), l.insertAfter(this)) : (a = d.createText(""), a.insertAfter(l), a.remove()));
            return l
        }, substring: function (a, e) {
            return "number" != typeof e ? this.$.nodeValue.substr(a) :
                this.$.nodeValue.substring(a, e)
        }
        }),function () {
        function a(a, c, d) {
            var e = a.serializable, m = c[d ? "endContainer" : "startContainer"], f = d ? "endOffset" : "startOffset", h = e ? c.document.getById(a.startNode) : a.startNode;
            a = e ? c.document.getById(a.endNode) : a.endNode;
            m.equals(h.getPrevious()) ? (c.startOffset = c.startOffset - m.getLength() - a.getPrevious().getLength(), m = a.getNext()) : m.equals(a.getPrevious()) && (c.startOffset -= m.getLength(), m = a.getNext());
            m.equals(h.getParent()) && c[f]++;
            m.equals(a.getParent()) && c[f]++;
            c[d ? "endContainer" :
                "startContainer"] = m;
            return c
        }

        CKEDITOR.dom.rangeList = function (a) {
            if (a instanceof CKEDITOR.dom.rangeList)return a;
            a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
            return CKEDITOR.tools.extend(a, e)
        };
        var e = {
            createIterator: function () {
                var a = this, c = CKEDITOR.dom.walker.bookmark(), d = [], e;
                return {
                    getNextRange: function (m) {
                        e = void 0 === e ? 0 : e + 1;
                        var f = a[e];
                        if (f && 1 < a.length) {
                            if (!e)for (var h = a.length - 1; 0 <= h; h--)d.unshift(a[h].createBookmark(!0));
                            if (m)for (var k = 0; a[e + k + 1];) {
                                var g = f.document;
                                m = 0;
                                h = g.getById(d[k].endNode);
                                for (g = g.getById(d[k + 1].startNode); ;) {
                                    h = h.getNextSourceNode(!1);
                                    if (g.equals(h))m = 1; else if (c(h) || h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary())continue;
                                    break
                                }
                                if (!m)break;
                                k++
                            }
                            for (f.moveToBookmark(d.shift()); k--;)h = a[++e], h.moveToBookmark(d.shift()), f.setEnd(h.endContainer, h.endOffset)
                        }
                        return f
                    }
                }
            }, createBookmarks: function (b) {
                for (var c = [], d, e = 0; e < this.length; e++) {
                    c.push(d = this[e].createBookmark(b, !0));
                    for (var m = e + 1; m < this.length; m++)this[m] = a(d, this[m]), this[m] = a(d, this[m], !0)
                }
                return c
            }, createBookmarks2: function (a) {
                for (var c =
                    [], d = 0; d < this.length; d++)c.push(this[d].createBookmark2(a));
                return c
            }, moveToBookmarks: function (a) {
                for (var c = 0; c < this.length; c++)this[c].moveToBookmark(a[c])
            }
        }
    }(),function () {
        function a() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        }

        function e(b) {
            var c = CKEDITOR.skin["ua_" + b], d = CKEDITOR.env;
            if (c)for (var c = c.split(",").sort(function (a, b) {
                return a > b ? -1 : 1
            }), e = 0, f; e < c.length; e++)if (f = c[e], d.ie && (f.replace(/^ie/, "") == d.version || d.quirks && "iequirks" ==
                f) && (f = "ie"), d[f]) {
                b += "_" + c[e];
                break
            }
            return CKEDITOR.getUrl(a() + b + ".css")
        }

        function b(a, b) {
            l[a] || (CKEDITOR.document.appendStyleSheet(e(a)), l[a] = 1);
            b && b()
        }

        function c(a) {
            var b = a.getById(m);
            b || (b = a.getHead().append("style"), b.setAttribute("id", m), b.setAttribute("type", "text/css"));
            return b
        }

        function d(a, b, c) {
            var d, e, f;
            if (CKEDITOR.env.webkit)for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++)b[e] = b[e].split("{");
            for (var h = 0; h < a.length; h++)if (CKEDITOR.env.webkit)for (e = 0; e < b.length; e++) {
                f = b[e][1];
                for (d = 0; d <
                c.length; d++)f = f.replace(c[d][0], c[d][1]);
                a[h].$.sheet.addRule(b[e][0], f)
            } else {
                f = b;
                for (d = 0; d < c.length; d++)f = f.replace(c[d][0], c[d][1]);
                CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += f : a[h].$.innerHTML += f
            }
        }

        var l = {};
        CKEDITOR.skin = {
            path: a, loadPart: function (c, d) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () {
                    b(c, d)
                }) : b(c, d)
            }, getPath: function (a) {
                return CKEDITOR.getUrl(e(a))
            }, icons: {}, addIcon: function (a, b, c, d) {
                a =
                    a.toLowerCase();
                this.icons[a] || (this.icons[a] = {path: b, offset: c || 0, bgsize: d || "16px"})
            }, getIconStyle: function (a, b, c, d, e) {
                var f;
                a && (a = a.toLowerCase(), b && (f = this.icons[a + "-rtl"]), f || (f = this.icons[a]));
                a = c || f && f.path || "";
                d = d || f && f.offset;
                e = e || f && f.bgsize || "16px";
                a && (a = a.replace(/'/g, "\\'"));
                return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + e + ";"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () {
                return this.uiColor
            }, setUiColor: function (a) {
                var b =
                    c(CKEDITOR.document);
                return (this.setUiColor = function (a) {
                    this.uiColor = a;
                    var c = CKEDITOR.skin.chameleon, e = "", k = "";
                    "function" == typeof c && (e = c(this, "editor"), k = c(this, "panel"));
                    a = [[h, a]];
                    d([b], e, a);
                    d(f, k, a)
                }).call(this, a)
            }
        });
        var m = "cke_ui_color", f = [], h = /\$color/g;
        CKEDITOR.on("instanceLoaded", function (a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor;
                a = function (a) {
                    a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                    if (!a.getById("cke_ui_color")) {
                        a = c(a);
                        f.push(a);
                        var e = b.getUiColor();
                        e && d([a], CKEDITOR.skin.chameleon(b, "panel"), [[h, e]])
                    }
                };
                b.on("panelShow", a);
                b.on("menuShow", a);
                b.config.uiColor && b.setUiColor(b.config.uiColor)
            }
        })
    }(),function () {
        if (CKEDITOR.env.webkit)CKEDITOR.env.hc = !1; else {
            var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
            a.appendTo(CKEDITOR.document.getHead());
            try {
                var e = a.getComputedStyle("border-top-color"),
                    b = a.getComputedStyle("border-right-color");
                CKEDITOR.env.hc = !(!e || e != b)
            } catch (c) {
                CKEDITOR.env.hc = !1
            }
            a.remove()
        }
        CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (a = CKEDITOR._.pending)for (delete CKEDITOR._.pending, e = 0; e < a.length; e++)CKEDITOR.editor.prototype.constructor.apply(a[e][0], a[e][1]), CKEDITOR.add(a[e][0])
    }(),CKEDITOR.skin.name = "moono",CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko",
        CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8",CKEDITOR.skin.chameleon = function () {
        var a = function () {
            return function (a, b) {
                for (var e = a.match(/[^#]./g), m = 0; 3 > m; m++) {
                    var f = m, h;
                    h = parseInt(e[m], 16);
                    h = ("0" + (0 > b ? 0 | h * (1 + b) : 0 | h + (255 - h) * b).toString(16)).slice(-2);
                    e[f] = h
                }
                return "#" + e.join("")
            }
        }(), e = function () {
            var a = new CKEDITOR.template("background:#{to};background-image:linear-gradient(to bottom,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType\x3d0,startColorstr\x3d'{from}',endColorstr\x3d'{to}');");
            return function (b, e) {
                return a.output({from: b, to: e})
            }
        }(), b = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function (c, d) {
            var l = c.uiColor, l = {
                id: "." + c.id,
                defaultBorder: a(l, -.1),
                defaultGradient: e(a(l, .9), l),
                lightGradient: e(a(l, 1), a(l, .7)),
                mediumGradient: e(a(l, .8), a(l, .5)),
                ckeButtonOn: e(a(l, .6), a(l, .7)),
                ckeResizer: a(l, -.4),
                ckeToolbarSeparator: a(l, .5),
                ckeColorauto: a(l, .8),
                dialogBody: a(l, .7),
                dialogTabSelected: e("#FFFFFF", "#FFFFFF"),
                dialogTabSelectedBorder: "#FFF",
                elementsPathColor: a(l, -.6),
                elementsPathBg: l,
                menubuttonIcon: a(l, .5),
                menubuttonIconHover: a(l, .3)
            };
            return b[d].output(l).replace(/\[/g, "{").replace(/\]/g,
                "}")
        }
    }(),CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var a = function (a) {
                this._ || (this._ = {});
                this._["default"] = this._.initValue = a["default"] || "";
                this._.required = a.required || !1;
                for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]);
                b.push(!0);
                CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
                return this._
            }, e = {
                build: function (a, b, c) {
                    return new CKEDITOR.ui.dialog.textInput(a, b, c)
                }
            }, b = {
                build: function (a, b, c) {
                    return new CKEDITOR.ui.dialog[b.type](a, b, c)
                }
            }, c = {
                isChanged: function () {
                    return this.getValue() !=
                        this.getInitValue()
                }, reset: function (a) {
                    this.setValue(this.getInitValue(), a)
                }, setInitValue: function () {
                    this._.initValue = this.getValue()
                }, resetInitValue: function () {
                    this._.initValue = this._["default"]
                }, getInitValue: function () {
                    return this._.initValue
                }
            }, d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (a, b) {
                    this._.domOnChangeRegistered || (a.on("load", function () {
                        this.getInputElement().on("change", function () {
                                a.parts.dialog.isVisible() && this.fire("change", {value: this.getValue()})
                            },
                            this)
                    }, this), this._.domOnChangeRegistered = !0);
                    this.on("change", b)
                }
            }, !0), l = /^on([A-Z]\w+)/, m = function (a) {
                for (var b in a)(l.test(b) || "title" == b || "type" == b) && delete a[b];
                return a
            }, f = function (a) {
                a = a.data.getKeystroke();
                a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
            };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (b, c, d, e) {
                    if (!(4 > arguments.length)) {
                        var f = a.call(this, c);
                        f.labelId = CKEDITOR.tools.getNextId() +
                            "_label";
                        this._.children = [];
                        var l = {role: c.role || "presentation"};
                        c.includeLabel && (l["aria-labelledby"] = f.labelId);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "div", null, l, function () {
                            var a = [], d = c.required ? " cke_required" : "";
                            "horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" ', ' id\x3d"' + f.labelId + '"', f.inputId ? ' for\x3d"' + f.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', e.call(this, b, c), "\x3c/div\x3e") : (d = {
                                type: "hbox",
                                widths: c.widths,
                                padding: 0,
                                children: [{
                                    type: "html",
                                    html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" id\x3d"' + f.labelId + '" for\x3d"' + f.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e"
                                }, {
                                    type: "html",
                                    html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
                                    '"' : "") + "\x3e" + e.call(this, b, c) + "\x3c/span\x3e"
                                }]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, a));
                            return a.join("")
                        })
                    }
                }, textInput: function (b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", l = {
                            "class": "cke_dialog_ui_input_" + c.type,
                            id: e,
                            type: c.type
                        };
                        c.validate && (this.validate = c.validate);
                        c.maxLength && (l.maxlength = c.maxLength);
                        c.size && (l.size = c.size);
                        c.inputStyle && (l.style = c.inputStyle);
                        var m = this, v = !1;
                        b.on("load", function () {
                            m.getInputElement().on("keydown",
                                function (a) {
                                    13 == a.data.getKeystroke() && (v = !0)
                                });
                            m.getInputElement().on("keyup", function (a) {
                                13 == a.data.getKeystroke() && v && (b.getButton("ok") && setTimeout(function () {
                                    b.getButton("ok").click()
                                }, 0), v = !1);
                                m.bidi && f.call(m, a)
                            }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function () {
                            var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"'];
                            c.width && a.push('style\x3d"width:' + c.width + '" ');
                            a.push("\x3e\x3cinput ");
                            l["aria-labelledby"] = this._.labelId;
                            this._.required &&
                            (l["aria-required"] = this._.required);
                            for (var b in l)a.push(b + '\x3d"' + l[b] + '" ');
                            a.push(" /\x3e\x3c/div\x3e");
                            return a.join("")
                        })
                    }
                }, textarea: function (b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        var e = this, l = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", m = {};
                        c.validate && (this.validate = c.validate);
                        m.rows = c.rows || 5;
                        m.cols = c.cols || 20;
                        m["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || "");
                        "undefined" != typeof c.inputStyle && (m.style = c.inputStyle);
                        c.dir && (m.dir = c.dir);
                        if (e.bidi)b.on("load",
                            function () {
                                e.getInputElement().on("keyup", f)
                            }, e);
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function () {
                            m["aria-labelledby"] = this._.labelId;
                            this._.required && (m["aria-required"] = this._.required);
                            var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', l, '" '], b;
                            for (b in m)a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(m[b]) + '" ');
                            a.push("\x3e", CKEDITOR.tools.htmlEncode(e._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                            return a.join("")
                        })
                    }
                }, checkbox: function (b,
                                       c, d) {
                    if (!(3 > arguments.length)) {
                        var e = a.call(this, c, {"default": !!c["default"]});
                        c.validate && (this.validate = c.validate);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "span", null, null, function () {
                            var a = CKEDITOR.tools.extend({}, c, {id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"}, !0), d = [], g = CKEDITOR.tools.getNextId() + "_label", f = {
                                "class": "cke_dialog_ui_checkbox_input",
                                type: "checkbox",
                                "aria-labelledby": g
                            };
                            m(a);
                            c["default"] && (f.checked = "checked");
                            "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                            e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, f);
                            d.push(' \x3clabel id\x3d"', g, '" for\x3d"', f.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e");
                            return d.join("")
                        })
                    }
                }, radio: function (b, c, d) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]);
                        c.validate && (this.validate = c.validate);
                        var e = [], f = this;
                        c.role = "radiogroup";
                        c.includeLabel = !0;
                        CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, c, d, function () {
                                for (var a = [], d = [], g = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < c.items.length; l++) {
                                    var q = c.items[l], A = void 0 !== q[2] ? q[2] : q[0], B = void 0 !== q[1] ? q[1] : q[0], w = CKEDITOR.tools.getNextId() + "_radio_input", y = w + "_label", w = CKEDITOR.tools.extend({}, c, {
                                        id: w,
                                        title: null,
                                        type: null
                                    }, !0), A = CKEDITOR.tools.extend({}, w, {title: A}, !0), C = {
                                        type: "radio",
                                        "class": "cke_dialog_ui_radio_input",
                                        name: g,
                                        value: B,
                                        "aria-labelledby": y
                                    }, x = [];
                                    f._["default"] == B && (C.checked = "checked");
                                    m(w);
                                    m(A);
                                    "undefined" != typeof w.inputStyle &&
                                    (w.style = w.inputStyle);
                                    w.keyboardFocusable = !0;
                                    e.push(new CKEDITOR.ui.dialog.uiElement(b, w, x, "input", null, C));
                                    x.push(" ");
                                    new CKEDITOR.ui.dialog.uiElement(b, A, x, "label", null, {
                                        id: y,
                                        "for": C.id
                                    }, q[0]);
                                    a.push(x.join(""))
                                }
                                new CKEDITOR.ui.dialog.hbox(b, e, a, d);
                                return d.join("")
                            });
                        this._.children = e
                    }
                }, button: function (b, c, d) {
                    if (arguments.length) {
                        "function" == typeof c && (c = c(b.getParentEditor()));
                        a.call(this, c, {disabled: c.disabled || !1});
                        CKEDITOR.event.implementOn(this);
                        var e = this;
                        b.on("load", function () {
                            var a = this.getElement();
                            (function () {
                                a.on("click", function (a) {
                                    e.click();
                                    a.data.preventDefault()
                                });
                                a.on("keydown", function (a) {
                                    a.data.getKeystroke() in {32: 1} && (e.click(), a.data.preventDefault())
                                })
                            })();
                            a.unselectable()
                        }, this);
                        var f = CKEDITOR.tools.extend({}, c);
                        delete f.style;
                        var l = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, f, d, "a", null, {
                            style: c.style,
                            href: "javascript:void(0)",
                            title: c.label,
                            hidefocus: "true",
                            "class": c["class"],
                            role: "button",
                            "aria-labelledby": l
                        }, '\x3cspan id\x3d"' + l + '" class\x3d"cke_dialog_ui_button"\x3e' +
                            CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
                    }
                }, select: function (b, c, d) {
                    if (!(3 > arguments.length)) {
                        var e = a.call(this, c);
                        c.validate && (this.validate = c.validate);
                        e.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function () {
                            var a = CKEDITOR.tools.extend({}, c, {id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"}, !0), d = [], g = [], f = {
                                id: e.inputId,
                                "class": "cke_dialog_ui_input_select",
                                "aria-labelledby": this._.labelId
                            };
                            d.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                c.type, '" role\x3d"presentation"');
                            c.width && d.push('style\x3d"width:' + c.width + '" ');
                            d.push("\x3e");
                            void 0 !== c.size && (f.size = c.size);
                            void 0 !== c.multiple && (f.multiple = c.multiple);
                            m(a);
                            for (var l = 0, q; l < c.items.length && (q = c.items[l]); l++)g.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== q[1] ? q[1] : q[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(q[0]));
                            "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                            e.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null,
                                f, g.join(""));
                            d.push("\x3c/div\x3e");
                            return d.join("")
                        })
                    }
                }, file: function (b, c, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === c["default"] && (c["default"] = "");
                        var e = CKEDITOR.tools.extend(a.call(this, c), {definition: c, buttons: []});
                        c.validate && (this.validate = c.validate);
                        b.on("load", function () {
                            CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function () {
                            e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                e.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void('];
                            a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                            a.push(')"\x3e\x3c/iframe\x3e');
                            return a.join("")
                        })
                    }
                }, fileButton: function (b, c, d) {
                    var e = this;
                    if (!(3 > arguments.length)) {
                        a.call(this, c);
                        c.validate && (this.validate = c.validate);
                        var f = CKEDITOR.tools.extend({}, c), l = f.onClick;
                        f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button";
                        f.onClick = function (a) {
                            var d =
                                c["for"];
                            l && !1 === l.call(this, a) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
                        };
                        b.on("load", function () {
                            b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(e)
                        });
                        CKEDITOR.ui.dialog.button.call(this, b, f, d)
                    }
                }, html: function () {
                    var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/;
                    return function (d, e, f) {
                        if (!(3 > arguments.length)) {
                            var l = [], m = e.html;
                            "\x3c" != m.charAt(0) && (m = "\x3cspan\x3e" + m + "\x3c/span\x3e");
                            var r = e.focus;
                            if (r) {
                                var q = this.focus;
                                this.focus = function () {
                                    ("function" == typeof r ? r : q).call(this);
                                    this.fire("focus")
                                };
                                e.isFocusable && (this.isFocusable = this.isFocusable);
                                this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, d, e, l, "span", null, null, "");
                            l = l.join("").match(a);
                            m = m.match(b) || ["", "", ""];
                            c.test(m[1]) && (m[1] = m[1].slice(0, -1), m[2] = "/" + m[2]);
                            f.push([m[1], " ", l[1] || "", m[2]].join(""))
                        }
                    }
                }(), fieldset: function (a, b, c, d, e) {
                    var f = e.label;
                    this._ = {children: b};
                    CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function () {
                        var a = [];
                        f && a.push("\x3clegend" +
                            (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + f + "\x3c/legend\x3e");
                        for (var b = 0; b < c.length; b++)a.push(c[b]);
                        return a.join("")
                    })
                }
            }, !0);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (a) {
                    var b = CKEDITOR.document.getById(this._.labelId);
                    1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
                    return this
                }, getLabel: function () {
                    var a =
                        CKEDITOR.document.getById(this._.labelId);
                    return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText()
                }, eventProcessors: d
            }, !0);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () {
                    return this._.disabled ? !1 : this.fire("click", {dialog: this._.dialog})
                },
                enable: function () {
                    this._.disabled = !1;
                    var a = this.getElement();
                    a && a.removeClass("cke_disabled")
                },
                disable: function () {
                    this._.disabled = !0;
                    this.getElement().addClass("cke_disabled")
                },
                isVisible: function () {
                    return this.getElement().getFirst().isVisible()
                },
                isEnabled: function () {
                    return !this._.disabled
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function (a, b) {
                        this.on("click", function () {
                            b.apply(this, arguments)
                        })
                    }
                }, !0),
                accessKeyUp: function () {
                    this.click()
                },
                accessKeyDown: function () {
                    this.focus()
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return CKEDITOR.document.getById(this._.inputId)
                },
                focus: function () {
                    var a = this.selectParentTab();
                    setTimeout(function () {
                        var b = a.getInputElement();
                        b && b.$.focus()
                    }, 0)
                }, select: function () {
                    var a = this.selectParentTab();
                    setTimeout(function () {
                        var b = a.getInputElement();
                        b && (b.$.focus(), b.$.select())
                    }, 0)
                }, accessKeyUp: function () {
                    this.select()
                }, setValue: function (a) {
                    if (this.bidi) {
                        var b = a && a.charAt(0);
                        (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1));
                        this.setDirectionMarker(b)
                    }
                    a || (a = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                },
                getValue: function () {
                    var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                    if (this.bidi && a) {
                        var b = this.getDirectionMarker();
                        b && (a = ("ltr" == b ? "‪" : "‫") + a)
                    }
                    return a
                }, setDirectionMarker: function (a) {
                    var b = this.getInputElement();
                    a ? b.setAttributes({
                        dir: a,
                        "data-cke-dir-marker": a
                    }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
                }, getDirectionMarker: function () {
                    return this.getInputElement().data("cke-dir-marker")
                }, keyboardFocusable: !0
            }, c, !0);
            CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return this._.select.getElement()
                }, add: function (a, b, c) {
                    var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), e = this.getInputElement().$;
                    d.$.text = a;
                    d.$.value = void 0 === b || null === b ? a : b;
                    void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(d.$) : e.add(d.$, null) : e.add(d.$, c);
                    return this
                }, remove: function (a) {
                    this.getInputElement().$.remove(a);
                    return this
                }, clear: function () {
                    for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0);
                    return this
                }, keyboardFocusable: !0
            }, c, !0);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function () {
                    return this._.checkbox.getElement()
                }, setValue: function (a, b) {
                    this.getInputElement().$.checked = a;
                    !b && this.fire("change", {value: a})
                }, getValue: function () {
                    return this.getInputElement().$.checked
                }, accessKeyUp: function () {
                    this.setValue(!this.getValue())
                }, eventProcessors: {
                    onChange: function (a,
                                        b) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version)return d.onChange.apply(this, arguments);
                        a.on("load", function () {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function (b) {
                                b = b.data.$;
                                "checked" == b.propertyName && this.fire("change", {value: a.$.checked})
                            }, this)
                        }, this);
                        this.on("change", b);
                        return null
                    }
                }, keyboardFocusable: !0
            }, c, !0);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function (a, b) {
                    for (var c = this._.children, d, e = 0; e < c.length && (d = c[e]); e++)d.getElement().$.checked =
                        d.getValue() == a;
                    !b && this.fire("change", {value: a})
                }, getValue: function () {
                    for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked)return a[b].getValue();
                    return null
                }, accessKeyUp: function () {
                    var a = this._.children, b;
                    for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) {
                        a[b].getElement().focus();
                        return
                    }
                    a[0].getElement().focus()
                }, eventProcessors: {
                    onChange: function (a, b) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version)return d.onChange.apply(this, arguments);
                        a.on("load", function () {
                            for (var a =
                                this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) {
                                a = a.data.$;
                                "checked" == a.propertyName && this.$.checked && b.fire("change", {value: this.getAttribute("value")})
                            })
                        }, this);
                        this.on("change", b);
                        return null
                    }
                }
            }, c, !0);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
                getInputElement: function () {
                    var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
                        this.getElement()
                }, submit: function () {
                    this.getInputElement().getParent().$.submit();
                    return this
                }, getAction: function () {
                    return this.getInputElement().getParent().$.action
                }, registerEvents: function (a) {
                    var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) {
                        a.on("formLoaded", function () {
                            a.getInputElement().on(c, d, a)
                        })
                    }, e;
                    for (e in a)if (c = e.match(b))this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
                    return this
                }, reset: function () {
                    function a() {
                        c.$.open();
                        var h = "";
                        d.size && (h = d.size - (CKEDITOR.env.ie ? 7 : 0));
                        var A = b.frameId + "_input";
                        c.$.write(['\x3chtml dir\x3d"' + m + '" lang\x3d"' + r + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + m + '" lang\x3d"' + r + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', A, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label),
                            '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', A, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < h ? h : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + l + ")}", "\x3c/script\x3e"].join(""));
                        c.$.close();
                        for (h = 0; h < e.length; h++)e[h].enable()
                    }

                    var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, e = b.buttons, f = this.formLoadedNumber, l = this.formUnloadNumber, m = b.dialog._.editor.lang.dir, r = b.dialog._.editor.langCode;
                    f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () {
                        this.fire("formLoaded")
                    }, this), l = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () {
                        this.getInputElement().clearCustomData()
                    }, this), this.getDialog()._.editor.on("destroy", function () {
                        CKEDITOR.tools.removeFunction(f);
                        CKEDITOR.tools.removeFunction(l)
                    }));
                    CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                }, getValue: function () {
                    return this.getInputElement().$.value || ""
                }, setInitValue: function () {
                    this._.initValue = ""
                }, eventProcessors: {
                    onChange: function (a, b) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function () {
                            this.getInputElement().on("change", function () {
                                this.fire("change", {value: this.getValue()})
                            }, this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", b)
                    }
                }, keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.fileButton.prototype =
                new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", e);
            CKEDITOR.dialog.addUIElement("password", e);
            CKEDITOR.dialog.addUIElement("textarea", b);
            CKEDITOR.dialog.addUIElement("checkbox", b);
            CKEDITOR.dialog.addUIElement("radio", b);
            CKEDITOR.dialog.addUIElement("button", b);
            CKEDITOR.dialog.addUIElement("select", b);
            CKEDITOR.dialog.addUIElement("file", b);
            CKEDITOR.dialog.addUIElement("fileButton", b);
            CKEDITOR.dialog.addUIElement("html",
                b);
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function (a, b, c) {
                    for (var d = b.children, e, f = [], l = [], m = 0; m < d.length && (e = d[m]); m++) {
                        var r = [];
                        f.push(r);
                        l.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, r))
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, l, f, c, b)
                }
            })
        }
    }),CKEDITOR.DIALOG_RESIZE_NONE = 0,CKEDITOR.DIALOG_RESIZE_WIDTH = 1,CKEDITOR.DIALOG_RESIZE_HEIGHT = 2,CKEDITOR.DIALOG_RESIZE_BOTH = 3,CKEDITOR.DIALOG_STATE_IDLE = 1,CKEDITOR.DIALOG_STATE_BUSY = 2,function () {
        function a() {
            for (var a = this._.tabIdList.length,
                     b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
            return null
        }

        function e() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
            return null
        }

        function b(a, b) {
            for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) {
                var g = new CKEDITOR.dom.element(c[d]);
                "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") || ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", "")))
            }
        }

        function c(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", {valid: a, msg: b})
        }

        function d() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid")
        }

        function l(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", t).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: a.id,
                langDir: a.lang.dir,
                langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: a.lang.common.close,
                hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
            })), c = b.getChild([0, 0, 0, 0, 0]), d = c.getChild(0), e = c.getChild(1);
            a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
            !CKEDITOR.env.ie || CKEDITOR.env.quirks ||
            CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
            d.unselectable();
            e.unselectable();
            return {
                element: b,
                parts: {
                    dialog: b.getChild(0),
                    title: d,
                    close: e,
                    tabs: c.getChild(2),
                    contents: c.getChild([3, 0, 0, 0]),
                    footer: c.getChild([3, 0, 1, 0])
                }
            }
        }

        function m(a,
                   b, c) {
            this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function () {
                return !b.getAttribute("disabled") && b.isVisible()
            };
            this.focus = function () {
                a._.currentFocusIndex = this.focusIndex;
                this.element.focus()
            };
            b.on("keydown", function (a) {
                a.data.getKeystroke() in {32: 1, 13: 1} && this.fire("click")
            });
            b.on("focus", function () {
                this.fire("mouseover")
            });
            b.on("blur", function () {
                this.fire("mouseout")
            })
        }

        function f(a) {
            function b() {
                a.layout()
            }

            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function () {
                c.removeListener("resize",
                    b)
            })
        }

        function h(a, b) {
            this._ = {dialog: a};
            CKEDITOR.tools.extend(this, b)
        }

        function k(a) {
            function b(c) {
                var l = a.getSize(), k = CKEDITOR.document.getWindow().getViewPaneSize(), m = c.data.$.screenX, n = c.data.$.screenY, q = m - d.x, r = n - d.y;
                d = {x: m, y: n};
                e.x += q;
                e.y += r;
                a.move(e.x + h[3] < f ? -h[3] : e.x - h[1] > k.width - l.width - f ? k.width - l.width + ("rtl" == g.lang.dir ? 0 : h[1]) : e.x, e.y + h[0] < f ? -h[0] : e.y - h[2] > k.height - l.height - f ? k.height - l.height + h[2] : e.y, 1);
                c.data.preventDefault()
            }

            function c() {
                CKEDITOR.document.removeListener("mousemove",
                    b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = x.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c)
                }
            }

            var d = null, e = null, g = a.getParentEditor(), f = g.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0];
            "undefined" == typeof f && (f = 20);
            a.parts.title.on("mousedown", function (g) {
                d = {x: g.data.$.screenX, y: g.data.$.screenY};
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup", c);
                e = a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var f =
                        x.getChild(0).getFrameDocument();
                    f.on("mousemove", b);
                    f.on("mouseup", c)
                }
                g.data.preventDefault()
            }, a)
        }

        function g(a) {
            function b(c) {
                var n = "rtl" == g.lang.dir, q = m.width, r = m.height, v = q + (c.data.$.screenX - k.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2), A = r + (c.data.$.screenY - k.y) * (a._.moved ? 1 : 2), u = a._.element.getFirst(), u = n && u.getComputedStyle("right"), t = a.getPosition();
                t.y + A > l.height && (A = l.height - t.y);
                (n ? u : t.x) + v > l.width && (v = l.width - (n ? u : t.x));
                if (e == CKEDITOR.DIALOG_RESIZE_WIDTH || e == CKEDITOR.DIALOG_RESIZE_BOTH)q = Math.max(d.minWidth ||
                    0, v - f);
                if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT || e == CKEDITOR.DIALOG_RESIZE_BOTH)r = Math.max(d.minHeight || 0, A - h);
                a.resize(q, r);
                a._.moved || a.layout();
                c.data.preventDefault()
            }

            function c() {
                CKEDITOR.document.removeListener("mouseup", c);
                CKEDITOR.document.removeListener("mousemove", b);
                n && (n.remove(), n = null);
                if (CKEDITOR.env.ie6Compat) {
                    var a = x.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", c);
                    a.removeListener("mousemove", b)
                }
            }

            var d = a.definition, e = d.resizable;
            if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
                var g = a.getParentEditor(),
                    f, h, l, k, m, n, q = CKEDITOR.tools.addFunction(function (d) {
                        m = a.getSize();
                        var e = a.parts.contents;
                        e.$.getElementsByTagName("iframe").length && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(n));
                        h = m.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        f = m.width - a.parts.contents.getSize("width", 1);
                        k = {x: d.screenX, y: d.screenY};
                        l = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", b);
                        CKEDITOR.document.on("mouseup", c);
                        CKEDITOR.env.ie6Compat && (e = x.getChild(0).getFrameDocument(), e.on("mousemove", b), e.on("mouseup", c));
                        d.preventDefault && d.preventDefault()
                    });
                a.on("load", function () {
                    var b = "";
                    e == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + g.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(g.lang.common.resize) +
                        '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event )"\x3e' + ("ltr" == g.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
                    a.parts.footer.append(b, 1)
                });
                g.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(q)
                })
            }
        }

        function n(a) {
            a.data.preventDefault(1)
        }

        function p(a) {
            var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", e = c.dialog_backgroundCoverOpacity, g = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, e, g), f = C[c];
            f ? f.show() : (g = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ?
                "absolute" : "fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", g.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), g.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" +
                    d + "' );document.close();") + "})())"), g.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), g.push("\x3c/div\x3e"), f = CKEDITOR.dom.element.createFromHtml(g.join("")), f.setOpacity(void 0 !== e ? e : .5), f.on("keydown", n), f.on("keypress", n), f.on("keyup", n), f.appendTo(CKEDITOR.document.getBody()), C[c] = f);
            a.focusManager.add(f);
            x = f;
            a = function () {
                var a = b.getViewPaneSize();
                f.setStyles({
                    width: a.width + "px", height: a.height +
                    "px"
                })
            };
            var h = function () {
                var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
                f.setStyles({left: a.x + "px", top: a.y + "px"});
                if (c) {
                    do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
                }
            };
            y = a;
            b.on("resize", a);
            a();
            CKEDITOR.env.mac && CKEDITOR.env.webkit || f.focus();
            if (CKEDITOR.env.ie6Compat) {
                var l = function () {
                    h();
                    arguments.callee.prevScrollHandler.apply(this, arguments)
                };
                b.$.setTimeout(function () {
                    l.prevScrollHandler = window.onscroll || function () {
                        };
                    window.onscroll = l
                }, 0);
                h()
            }
        }

        function u(a) {
            x && (a.focusManager.remove(x),
                a = CKEDITOR.document.getWindow(), x.hide(), a.removeListener("resize", y), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
            }, 0), y = null)
        }

        var v = CKEDITOR.tools.cssLength, t = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function (b, f) {
            function h() {
                var a = x._.focusList;
                a.sort(function (a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                });
                for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c
            }

            function m(a) {
                var b = x._.focusList;
                a = a || 0;
                if (!(1 > b.length)) {
                    var c = x._.currentFocusIndex;
                    x._.tabBarMode && 0 > a && (c = 0);
                    try {
                        b[c].getInputElement().$.blur()
                    } catch (d) {
                    }
                    var e = c, g = 1 < x._.pageCount;
                    do {
                        e += a;
                        if (g && !x._.tabBarMode && (e == b.length || -1 == e)) {
                            x._.tabBarMode = !0;
                            x._.tabs[x._.currentTabId][0].focus();
                            x._.currentFocusIndex = -1;
                            return
                        }
                        e = (e + b.length) % b.length;
                        if (e == c)break
                    } while (a && !b[e].isFocusable());
                    b[e].focus();
                    "text" == b[e].type && b[e].select()
                }
            }

            function n(c) {
                if (x == CKEDITOR.dialog._.currentTop) {
                    var d = c.data.getKeystroke(), g = "rtl" == b.lang.dir, f = [37, 38, 39, 40];
                    B = y = 0;
                    if (9 == d || d == CKEDITOR.SHIFT + 9)m(d == CKEDITOR.SHIFT + 9 ? -1 : 1), B = 1; else if (d == CKEDITOR.ALT + 121 && !x._.tabBarMode && 1 < x.getPageCount())x._.tabBarMode = !0, x._.tabs[x._.currentTabId][0].focus(), x._.currentFocusIndex = -1, B = 1; else if (-1 != CKEDITOR.tools.indexOf(f,
                            d) && x._.tabBarMode)d = -1 != CKEDITOR.tools.indexOf([g ? 39 : 37, 38], d) ? a.call(x) : e.call(x), x.selectPage(d), x._.tabs[d][0].focus(), B = 1; else if (13 != d && 32 != d || !x._.tabBarMode)if (13 == d)d = c.data.getTarget(), d.is("a", "button", "select", "textarea") || d.is("input") && "button" == d.$.type || ((d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d), B = 1), y = 1; else if (27 == d)(d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : !1 !== this.fire("cancel", {hide: !0}).hide && this.hide(), y = 1; else return; else this.selectPage(this._.currentTabId),
                        this._.tabBarMode = !1, this._.currentFocusIndex = -1, m(1), B = 1;
                    q(c)
                }
            }

            function q(a) {
                B ? a.data.preventDefault(1) : y && a.data.stopPropagation()
            }

            var v = CKEDITOR.dialog._.dialogDefinitions[f], u = CKEDITOR.tools.clone(r), A = b.config.dialog_buttonsOrder || "OS", t = b.lang.dir, p = {}, B, y;
            ("OS" == A && CKEDITOR.env.mac || "rtl" == A && "ltr" == t || "ltr" == A && "rtl" == t) && u.buttons.reverse();
            v = CKEDITOR.tools.extend(v(b), u);
            v = CKEDITOR.tools.clone(v);
            v = new w(this, v);
            u = l(b);
            this._ = {
                editor: b,
                element: u.element,
                name: f,
                contentSize: {width: 0, height: 0},
                size: {width: 0, height: 0},
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            };
            this.parts = u.parts;
            CKEDITOR.tools.setTimeout(function () {
                b.fire("ariaWidget", this.parts.contents)
            }, 0, this);
            u = {position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden"};
            u["rtl" == t ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(u);
            CKEDITOR.event.call(this);
            this.definition = v = CKEDITOR.fire("dialogDefinition",
                {name: f, definition: v}, b).definition;
            if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) {
                u = b.config.removeDialogTabs.split(";");
                for (t = 0; t < u.length; t++)if (A = u[t].split(":"), 2 == A.length) {
                    var C = A[0];
                    p[C] || (p[C] = []);
                    p[C].push(A[1])
                }
                b._.removeDialogTabs = p
            }
            if (b._.removeDialogTabs && (p = b._.removeDialogTabs[f]))for (t = 0; t < p.length; t++)v.removeContents(p[t]);
            if (v.onLoad)this.on("load", v.onLoad);
            if (v.onShow)this.on("show", v.onShow);
            if (v.onHide)this.on("hide", v.onHide);
            if (v.onOk)this.on("ok", function (a) {
                b.fire("saveSnapshot");
                setTimeout(function () {
                    b.fire("saveSnapshot")
                }, 0);
                !1 === v.onOk.call(this, a) && (a.data.hide = !1)
            });
            this.state = CKEDITOR.DIALOG_STATE_IDLE;
            if (v.onCancel)this.on("cancel", function (a) {
                !1 === v.onCancel.call(this, a) && (a.data.hide = !1)
            });
            var x = this, z = function (a) {
                var b = x._.contents, c = !1, d;
                for (d in b)for (var e in b[d])if (c = a.call(this, b[d][e]))return
            };
            this.on("ok", function (a) {
                z(function (b) {
                    if (b.validate) {
                        var d = b.validate(this), e = "string" == typeof d || !1 === d;
                        e && (a.data.hide = !1, a.stop());
                        c.call(b, !e, "string" == typeof d ?
                            d : void 0);
                        return e
                    }
                })
            }, this, null, 0);
            this.on("cancel", function (a) {
                z(function (c) {
                    if (c.isChanged())return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0
                })
            }, this, null, 0);
            this.parts.close.on("click", function (a) {
                !1 !== this.fire("cancel", {hide: !0}).hide && this.hide();
                a.data.preventDefault()
            }, this);
            this.changeFocus = m;
            var D = this._.element;
            b.focusManager.add(D, 1);
            this.on("show", function () {
                D.on("keydown", n, this);
                if (CKEDITOR.env.gecko)D.on("keypress", q, this)
            });
            this.on("hide",
                function () {
                    D.removeListener("keydown", n);
                    CKEDITOR.env.gecko && D.removeListener("keypress", q);
                    z(function (a) {
                        d.apply(a)
                    })
                });
            this.on("iframeAdded", function (a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0)
            });
            this.on("show", function () {
                h();
                var a = 1 < x._.pageCount;
                b.config.dialog_startupFocusTab && a ? (x._.tabBarMode = !0, x._.tabs[x._.currentTabId][0].focus(), x._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, v.onFocus ?
                (a = v.onFocus.call(this)) && a.focus() : m(1))
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat)this.on("load", function () {
                var a = this.getElement(), b = a.getFirst();
                b.remove();
                b.appendTo(a)
            }, this);
            k(this);
            g(this);
            (new CKEDITOR.dom.text(v.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (t = 0; t < v.contents.length; t++)(p = v.contents[t]) && this.addPage(p);
            this.parts.tabs.on("click", function (a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, m(1)), a.data.preventDefault())
            }, this);
            t = [];
            p = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: v.buttons
            }, t).getChild();
            this.parts.footer.setHtml(t.join(""));
            for (t = 0; t < p.length; t++)this._.buttons[p[t].id] = p[t]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function () {
                this.hide();
                this._.element.remove()
            }, resize: function () {
                return function (a, b) {
                    this._.contentSize && this._.contentSize.width ==
                    a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
                        dialog: this,
                        width: a,
                        height: b
                    }, this._.editor), this.fire("resize", {
                        width: a,
                        height: b
                    }, this._.editor), this.parts.contents.setStyles({
                        width: a + "px",
                        height: b + "px"
                    }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                        width: a,
                        height: b
                    })
                }
            }(), getSize: function () {
                var a = this._.element.getFirst();
                return {width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0}
            }, move: function (a, b, c) {
                var d = this._.element.getFirst(), e = "rtl" == this._.editor.lang.dir, g = "fixed" == d.getComputedStyle("position");
                CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                g && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
                    x: a,
                    y: b
                }, g || (g = CKEDITOR.document.getWindow().getScrollPosition(), a += g.x, b += g.y), e && (g = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - a), b = {top: (0 < b ? b : 0) + "px"},
                    b[e ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1))
            }, getPosition: function () {
                return CKEDITOR.tools.extend({}, this._.position)
            }, show: function () {
                var a = this._.element, b = this.definition;
                a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
                a.on("keydown", D);
                a.on("keyup", F);
                this._.hasFocus = !1;
                for (var c in b.contents)if (b.contents[c]) {
                    var a = b.contents[c], d = this._.tabs[a.id], e = a.requiredContent, g = 0;
                    if (d) {
                        for (var h in this._.contents[a.id]) {
                            var l = this._.contents[a.id][h];
                            "hbox" != l.type && "vbox" != l.type && l.getInputElement() && (l.requiredContent && !this._.editor.activeFilter.check(l.requiredContent) ? l.disable() : (l.enable(), g++))
                        }
                        !g || e && !this._.editor.activeFilter.check(e) ? d[0].addClass("cke_dialog_tab_disabled") : d[0].removeClass("cke_dialog_tab_disabled")
                    }
                }
                CKEDITOR.tools.setTimeout(function () {
                    this.layout();
                    f(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function (a) {
                        a.setInitValue && a.setInitValue()
                    })
                }, 100, this)
            }, layout: function () {
                var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, e = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (0 < e ? e : 0) > c.height ||
                b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
            }, foreach: function (a) {
                for (var b in this._.contents)for (var c in this._.contents[b])a.call(this, this._.contents[b][c]);
                return this
            }, reset: function () {
                var a = function (a) {
                    a.reset && a.reset(1)
                };
                return function () {
                    this.foreach(a);
                    return this
                }
            }(), setupContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    b.setup && b.setup.apply(b, a)
                })
            },
            commitContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a)
                })
            }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (J(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else u(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog)CKEDITOR.dialog._.currentZIndex -= 10; else {
                        CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", D);
                        a.removeListener("keyup", F);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function () {
                            c.focusManager.unlock();
                            CKEDITOR.env.iOS && c.window.focus()
                        }, 0)
                    }
                    delete this._.parentDialog;
                    this.foreach(function (a) {
                        a.resetInitValue && a.resetInitValue()
                    });
                    this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                            type: "vbox",
                            className: "cke_dialog_page_contents",
                            children: a.elements,
                            expand: !!a.expand,
                            padding: a.padding,
                            style: a.style || "width: 100%;"
                        }, b), e = this._.contents[a.id] = {}, g = d.getChild(),
                             f = 0; d = g.shift();)d.notAllowed || "hbox" == d.type || "vbox" == d.type || f++, e[d.id] = d, "function" == typeof d.getChild && g.push.apply(g, d.getChild());
                    f || (a.hidden = !0);
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    d = CKEDITOR.env;
                    e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', e, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"',
                        ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join(""));
                    b.setAttribute("aria-labelledby", e);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    a.accessKey && (E(this, this, "CTRL+" + a.accessKey, M, G), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") &&
                    !1 !== this.fire("selectPage", {page: a, currentPage: this._.currentTabId})) {
                    for (var c in this._.tabs) {
                        var d = this._.tabs[c][0], e = this._.tabs[c][1];
                        c != a && (d.removeClass("cke_dialog_tab_selected"), e.hide());
                        e.setAttribute("aria-hidden", c != a)
                    }
                    var g = this._.tabs[a];
                    g[0].addClass("cke_dialog_tab_selected");
                    CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (b(g[1]), g[1].show(), setTimeout(function () {
                        b(g[1], 1)
                    }, 0)) : g[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            },
            updateStyle: function () {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
            }, hidePage: function (b) {
                var c = this._.tabs[b] && this._.tabs[b][0];
                c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), c.hide(), this._.pageCount--, this.updateStyle())
            }, showPage: function (a) {
                if (a = this._.tabs[a] && this._.tabs[a][0])a.show(), this._.pageCount++, this.updateStyle()
            }, getElement: function () {
                return this._.element
            }, getName: function () {
                return this._.name
            },
            getContentElement: function (a, b) {
                var c = this._.contents[a];
                return c && c[b]
            }, getValueOf: function (a, b) {
                return this.getContentElement(a, b).getValue()
            }, setValueOf: function (a, b, c) {
                return this.getContentElement(a, b).setValue(c)
            }, getButton: function (a) {
                return this._.buttons[a]
            }, click: function (a) {
                return this._.buttons[a].click()
            }, disableButton: function (a) {
                return this._.buttons[a].disable()
            }, enableButton: function (a) {
                return this._.buttons[a].enable()
            }, getPageCount: function () {
                return this._.pageCount
            }, getParentEditor: function () {
                return this._.editor
            },
            getSelectedElement: function () {
                return this.getParentEditor().getSelection().getSelectedElement()
            }, addFocusable: function (a, b) {
                if ("undefined" == typeof b)b = this._.focusList.length, this._.focusList.push(new m(this, a, b)); else {
                    this._.focusList.splice(b, 0, new m(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++
                }
            }, setState: function (a) {
                if (this.state != a) {
                    this.state = a;
                    if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                        if (!this.parts.spinner) {
                            var b = this.getParentEditor().lang.dir, c = {
                                attributes: {"class": "cke_dialog_spinner"},
                                styles: {"float": "rtl" == b ? "right" : "left"}
                            };
                            c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
                            this.parts.spinner = CKEDITOR.document.createElement("div", c);
                            this.parts.spinner.setHtml("\x26#8987;");
                            this.parts.spinner.appendTo(this.parts.title, 1)
                        }
                        this.parts.spinner.show();
                        this.getButton("ok").disable()
                    } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
                    this.fire("state", a)
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) {
                this._.dialogDefinitions[a] &&
                "function" != typeof b || (this._.dialogDefinitions[a] = b)
            }, exists: function (a) {
                return !!this._.dialogDefinitions[a]
            }, getCurrent: function () {
                return CKEDITOR.dialog._.currentTop
            }, isTabEnabled: function (a, b, c) {
                a = a.config.removeDialogTabs;
                return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
            }, okButton: function () {
                var a = function (a, b) {
                    b = b || {};
                    return CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function (a) {
                            a = a.data.dialog;
                            !1 !== a.fire("ok",
                                {hide: !0}).hide && a.hide()
                        }
                    }, b, !0)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c, b)
                    }, {type: "button"}, !0)
                };
                return a
            }(), cancelButton: function () {
                var a = function (a, b) {
                    b = b || {};
                    return CKEDITOR.tools.extend({
                        id: "cancel",
                        type: "button",
                        label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel",
                        onClick: function (a) {
                            a = a.data.dialog;
                            !1 !== a.fire("cancel", {hide: !0}).hide && a.hide()
                        }
                    }, b, !0)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c,
                            b)
                    }, {type: "button"}, !0)
                };
                return a
            }(), addUIElement: function (a, b) {
                this._.uiElementBuilders[a] = b
            }
        });
        CKEDITOR.dialog._ = {uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null};
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var r = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        }, q = function (a, b, c) {
            for (var d = 0, e; e = a[d]; d++)if (e.id == b || c && e[c] && (e = q(e[c],
                    b, c)))return e;
            return null
        }, A = function (a, b, c, d, e) {
            if (c) {
                for (var g = 0, f; f = a[g]; g++) {
                    if (f.id == c)return a.splice(g, 0, b), b;
                    if (d && f[d] && (f = A(f[d], b, c, d, !0)))return f
                }
                if (e)return null
            }
            a.push(b);
            return b
        }, B = function (a, b, c) {
            for (var d = 0, e; e = a[d]; d++) {
                if (e.id == b)return a.splice(d, 1);
                if (c && e[c] && (e = B(e[c], b, c)))return e
            }
            return null
        }, w = function (a, b) {
            this.dialog = a;
            for (var c = b.contents, d = 0, e; e = c[d]; d++)c[d] = e && new h(a, e);
            CKEDITOR.tools.extend(this, b)
        };
        w.prototype = {
            getContents: function (a) {
                return q(this.contents,
                    a)
            }, getButton: function (a) {
                return q(this.buttons, a)
            }, addContents: function (a, b) {
                return A(this.contents, a, b)
            }, addButton: function (a, b) {
                return A(this.buttons, a, b)
            }, removeContents: function (a) {
                B(this.contents, a)
            }, removeButton: function (a) {
                B(this.buttons, a)
            }
        };
        h.prototype = {
            get: function (a) {
                return q(this.elements, a, "children")
            }, add: function (a, b) {
                return A(this.elements, a, b, "children")
            }, remove: function (a) {
                B(this.elements, a, "children")
            }
        };
        var y, C = {}, x, z = {}, D = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c =
                a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            (b = z[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
        }, F = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            (b = z[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key),
                a.data.preventDefault()))
        }, E = function (a, b, c, d, e) {
            (z[c] || (z[c] = [])).push({
                uiElement: a,
                dialog: b,
                key: c,
                keyup: e || a.accessKeyUp,
                keydown: d || a.accessKeyDown
            })
        }, J = function (a) {
            for (var b in z) {
                for (var c = z[b], d = c.length - 1; 0 <= d; d--)c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1);
                0 === c.length && delete z[b]
            }
        }, G = function (a, b) {
            a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
        }, M = function () {
        };
        (function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (a, b, c, d, e, g, f) {
                    if (!(4 > arguments.length)) {
                        var h = (d.call ? d(b) : d) || "div",
                            l = ["\x3c", h, " "], k = (e && e.call ? e(b) : e) || {}, m = (g && g.call ? g(b) : g) || {}, n = (f && f.call ? f.call(this, a, b) : f) || "", q = this.domId = m.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (k.display = "none", this.notAllowed = !0);
                        m.id = q;
                        var r = {};
                        b.type && (r["cke_dialog_ui_" + b.type] = 1);
                        b.className && (r[b.className] = 1);
                        b.disabled && (r.cke_disabled = 1);
                        for (var v = m["class"] && m["class"].split ? m["class"].split(" ") : [], q = 0; q < v.length; q++)v[q] && (r[v[q]] = 1);
                        v = [];
                        for (q in r)v.push(q);
                        m["class"] = v.join(" ");
                        b.title && (m.title = b.title);
                        r = (b.style || "").split(";");
                        b.align && (v = b.align, k["margin-left"] = "left" == v ? 0 : "auto", k["margin-right"] = "right" == v ? 0 : "auto");
                        for (q in k)r.push(q + ":" + k[q]);
                        b.hidden && r.push("display:none");
                        for (q = r.length - 1; 0 <= q; q--)"" === r[q] && r.splice(q, 1);
                        0 < r.length && (m.style = (m.style ? m.style + "; " : "") + r.join("; "));
                        for (q in m)l.push(q + '\x3d"' + CKEDITOR.tools.htmlEncode(m[q]) + '" ');
                        l.push("\x3e", n, "\x3c/", h, "\x3e");
                        c.push(l.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        "boolean" == typeof b.isChanged && (this.isChanged = function () {
                            return b.isChanged
                        });
                        "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
                        "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
                            return function (c) {
                                a.call(this, b.setValue.call(this, c))
                            }
                        }));
                        "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) {
                            return function () {
                                return b.getValue.call(this, a.call(this))
                            }
                        }));
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && this.accessKeyDown && b.accessKey && E(this, a, "CTRL+" + b.accessKey);
                        var u = this;
                        a.on("load", function () {
                            var b = u.getInputElement();
                            if (b) {
                                var c = u.type in {
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function () {
                                    a._.tabBarMode = !1;
                                    a._.hasFocus = !0;
                                    u.fire("focus");
                                    c && this.addClass(c)
                                });
                                b.on("blur", function () {
                                    u.fire("blur");
                                    c && this.removeClass(c)
                                })
                            }
                        });
                        CKEDITOR.tools.extend(this, b);
                        this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex =
                            a._.focusList.push(this) - 1, this.on("focus", function () {
                            a._.currentFocusIndex = u.focusIndex
                        }))
                    }
                }, hbox: function (a, b, c, d, e) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b, f = e && e.widths || null, h = e && e.height || null, l, k = {role: "presentation"};
                        e && e.align && (k.align = e.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {type: "hbox"}, d, "table", {}, k, function () {
                            var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
                            for (l = 0; l < c.length; l++) {
                                var b = "cke_dialog_ui_hbox_child", d = [];
                                0 === l &&
                                (b = "cke_dialog_ui_hbox_first");
                                l == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
                                f ? f[l] && d.push("width:" + v(f[l])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                h && d.push("height:" + v(h));
                                e && void 0 !== e.padding && d.push("padding:" + v(e.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && g[l].align && d.push("text-align:" + g[l].align);
                                0 < d.length && a.push('style\x3d"' + d.join("; ") + '" ');
                                a.push("\x3e", c[l], "\x3c/td\x3e")
                            }
                            a.push("\x3c/tr\x3e\x3c/tbody\x3e");
                            return a.join("")
                        })
                    }
                },
                vbox: function (a, b, c, d, e) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b, f = e && e.width || null, l = e && e.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {type: "vbox"}, d, "div", null, {role: "presentation"}, function () {
                            var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                            b.push('style\x3d"');
                            e && e.expand && b.push("height:100%;");
                            b.push("width:" + v(f || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align\x3d"', CKEDITOR.tools.htmlEncode(e &&
                                e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                            b.push("\x3e\x3ctbody\x3e");
                            for (var d = 0; d < c.length; d++) {
                                var h = [];
                                b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
                                f && h.push("width:" + v(f || "100%"));
                                l ? h.push("height:" + v(l[d])) : e && e.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                                e && void 0 !== e.padding && h.push("padding:" + v(e.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && g[d].align && h.push("text-align:" + g[d].align);
                                0 < h.length && b.push('style\x3d"', h.join("; "), '" ');
                                b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e',
                                    c[d], "\x3c/td\x3e\x3c/tr\x3e")
                            }
                            b.push("\x3c/tbody\x3e\x3c/table\x3e");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () {
                return CKEDITOR.document.getById(this.domId)
            }, getInputElement: function () {
                return this.getElement()
            }, getDialog: function () {
                return this._.dialog
            }, setValue: function (a, b) {
                this.getInputElement().setValue(a);
                !b && this.fire("change", {value: a});
                return this
            }, getValue: function () {
                return this.getInputElement().getValue()
            }, isChanged: function () {
                return !1
            }, selectParentTab: function () {
                for (var a =
                    this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
                if (!a)return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this
            }, focus: function () {
                this.selectParentTab().getInputElement().focus();
                return this
            }, registerEvents: function (a) {
                var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) {
                    b.on("load", function () {
                        a.getInputElement().on(c, d, a)
                    })
                }, e;
                for (e in a)if (c = e.match(b))this.eventProcessors[e] ? this.eventProcessors[e].call(this,
                    this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
                return this
            }, eventProcessors: {
                onLoad: function (a, b) {
                    a.on("load", b, this)
                }, onShow: function (a, b) {
                    a.on("show", b, this)
                }, onHide: function (a, b) {
                    a.on("hide", b, this)
                }
            }, accessKeyDown: function () {
                this.focus()
            }, accessKeyUp: function () {
            }, disable: function () {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled")
            }, enable: function () {
                var a = this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            }, isEnabled: function () {
                return !this.getElement().hasClass("cke_disabled")
            }, isVisible: function () {
                return this.getInputElement().isVisible()
            }, isFocusable: function () {
                return this.isEnabled() && this.isVisible() ? !0 : !1
            }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function (a) {
                if (1 > arguments.length)return this._.children.concat();
                a.splice || (a = [a]);
                return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ?
                    this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, !0);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function () {
            var a = {
                build: function (a, b, c) {
                    for (var d = b.children, e, g = [], f = [], h = 0; h < d.length && (e = d[h]); h++) {
                        var l = [];
                        g.push(l);
                        f.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, l))
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, f, g, c, b)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox", a)
        })();
        CKEDITOR.dialogCommand = function (a, b) {
            this.dialogName = a;
            CKEDITOR.tools.extend(this, b, !0)
        };
        CKEDITOR.dialogCommand.prototype = {
            exec: function (a) {
                a.openDialog(this.dialogName)
            }, canUndo: !1, editorFocus: 1
        };
        (function () {
            var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, g = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function () {
                    var a = arguments;
                    return function () {
                        var b = this && this.getValue ? this.getValue() :
                            a[0], c, d = CKEDITOR.VALIDATE_AND, e = [], g;
                        for (g = 0; g < a.length; g++)if ("function" == typeof a[g])e.push(a[g]); else break;
                        g < a.length && "string" == typeof a[g] && (c = a[g], g++);
                        g < a.length && "number" == typeof a[g] && (d = a[g]);
                        var f = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (g = 0; g < e.length; g++)f = d == CKEDITOR.VALIDATE_AND ? f && e[g](b) : f || e[g](b);
                        return f ? !0 : c
                    }
                }, regex: function (a, b) {
                    return function (c) {
                        c = this && this.getValue ? this.getValue() : c;
                        return a.test(c) ? !0 : b
                    }
                }, notEmpty: function (b) {
                    return this.regex(a, b)
                }, integer: function (a) {
                    return this.regex(b,
                        a)
                }, number: function (a) {
                    return this.regex(c, a)
                }, cssLength: function (a) {
                    return this.functions(function (a) {
                        return e.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, htmlLength: function (a) {
                    return this.functions(function (a) {
                        return d.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, inlineStyle: function (a) {
                    return this.functions(function (a) {
                        return g.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, equals: function (a, b) {
                    return this.functions(function (b) {
                        return b == a
                    }, b)
                }, notEqual: function (a, b) {
                    return this.functions(function (b) {
                        return b != a
                    }, b)
                }
            };
            CKEDITOR.on("instanceDestroyed",
                function (a) {
                    if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                        for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide();
                        for (var c in C)C[c].remove();
                        C = {}
                    }
                    a = a.editor._.storedDialogs;
                    for (var d in a)a[d].destroy()
                })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function (a, b) {
                var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                null === CKEDITOR.dialog._.currentTop && p(this);
                if ("function" == typeof d)c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c,
                    c), c.show(); else {
                    if ("failed" == d)throw u(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a, b)
                    }, this, 0, 1)
                }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    }(),CKEDITOR.plugins.add("dialog", {
        requires: "dialogui", init: function (a) {
            a.on("doubleclick", function (e) {
                e.data.dialog &&
                a.openDialog(e.data.dialog)
            }, null, null, 999)
        }
    }),function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog",
            availableLangs: {
                af: 1,
                ar: 1,
                az: 1,
                bg: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                "de-ch": 1,
                el: 1,
                en: 1,
                "en-gb": 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                fr: 1,
                "fr-ca": 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                it: 1,
                ja: 1,
                kk: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lb: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                pt: 1,
                "pt-br": 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                sr: 1,
                "sr-latn": 1,
                sv: 1,
                th: 1,
                ti: 1,
                tr: 1,
                tt: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                zh: 1,
                "zh-cn": 1,
                "zh-tw": 1
            },
            init: function (a) {
                var e =
                    this;
                a.addCommand("a11yHelp", {
                    exec: function () {
                        var b = a.langCode, b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function () {
                            a.lang.a11yhelp = e.langEntries[b];
                            a.openDialog("a11yHelp")
                        })
                    }, modes: {wysiwyg: 1, source: 1}, readOnly: 1, canUndo: !1
                });
                a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
                a.on("ariaEditorHelpLabel", function (b) {
                    b.data.label =
                        a.lang.common.editorHelp
                })
            }
        })
    }(),CKEDITOR.plugins.add("about", {
        requires: "dialog", init: function (a) {
            var e = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            e.modes = {wysiwyg: 1, source: 1};
            e.canUndo = !1;
            e.readOnly = 1;
            a.ui.addButton && a.ui.addButton("About", {label: a.lang.about.title, command: "about", toolbar: "about"});
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    }),CKEDITOR.plugins.add("basicstyles", {
        init: function (a) {
            var e = 0, b = function (b, d, h, l) {
                if (l) {
                    l = new CKEDITOR.style(l);
                    var g = c[h];
                    g.unshift(l);
                    a.attachStyleStateChange(l, function (b) {
                        !a.readOnly && a.getCommand(h).setState(b)
                    });
                    a.addCommand(h, new CKEDITOR.styleCommand(l, {contentForms: g}));
                    a.ui.addButton && a.ui.addButton(b, {label: d, command: h, toolbar: "basicstyles," + (e += 10)})
                }
            }, c = {
                bold: ["strong", "b", ["span", function (a) {
                    a = a.styles["font-weight"];
                    return "bold" == a || 700 <= +a
                }]], italic: ["em", "i", ["span", function (a) {
                    return "italic" == a.styles["font-style"]
                }]], underline: ["u", ["span", function (a) {
                    return "underline" == a.styles["text-decoration"]
                }]], strike: ["s",
                    "strike", ["span", function (a) {
                        return "line-through" == a.styles["text-decoration"]
                    }]], subscript: ["sub"], superscript: ["sup"]
            }, d = a.config, l = a.lang.basicstyles;
            b("Bold", l.bold, "bold", d.coreStyles_bold);
            b("Italic", l.italic, "italic", d.coreStyles_italic);
            b("Underline", l.underline, "underline", d.coreStyles_underline);
            b("Strike", l.strike, "strike", d.coreStyles_strike);
            b("Subscript", l.subscript, "subscript", d.coreStyles_subscript);
            b("Superscript", l.superscript, "superscript", d.coreStyles_superscript);
            a.setKeystroke([[CKEDITOR.CTRL +
            66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }),CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    },CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    },CKEDITOR.config.coreStyles_underline = {element: "u"},CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    },CKEDITOR.config.coreStyles_subscript = {element: "sub"},CKEDITOR.config.coreStyles_superscript = {element: "sup"},function () {
        function a(a, b, c, d) {
            if (!a.isReadOnly() && !a.equals(c.editable())) {
                CKEDITOR.dom.element.setMarker(d,
                    a, "bidi_processed", 1);
                d = a;
                for (var e = c.editable(); (d = d.getParent()) && !d.equals(e);)if (d.getCustomData("bidi_processed")) {
                    a.removeStyle("direction");
                    a.removeAttribute("dir");
                    return
                }
                d = "useComputedState" in c.config ? c.config.useComputedState : 1;
                (d ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), d ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), c.forceNextSelectionCheck())
            }
        }

        function e(a,
                   b, c) {
            var d = a.getCommonAncestor(!1, !0);
            a = a.clone();
            a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
            if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
                for (var e; d && d.type == CKEDITOR.NODE_ELEMENT && (e = d.getParent()) && 1 == e.getChildCount() && !(d.getName() in b);)d = e;
                return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d
            }
        }

        function b(b) {
            return {
                context: "p", allowedContent: {
                    "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                        propertiesOnly: !0,
                        attributes: "dir"
                    }
                }, requiredContent: "p[dir]", refresh: function (a, b) {
                    var c = a.config.useComputedState, d, c = void 0 === c || c;
                    if (!c) {
                        d = b.lastElement;
                        for (var e = a.editable(); d && !(d.getName() in m || d.equals(e));) {
                            var g = d.getParent();
                            if (!g)break;
                            d = g
                        }
                    }
                    d = d || b.block || b.blockLimit;
                    d.equals(a.editable()) && (e = a.getSelection().getRanges()[0].getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && (d = e);
                    d && (c = c ? d.getComputedStyle("direction") : d.getStyle("direction") || d.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" ==
                    c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
                    c = (b.block || b.blockLimit || a.editable()).getDirection(1);
                    c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged", c))
                }, exec: function (c) {
                    var f = c.getSelection(), h = c.config.enterMode, k = f.getRanges();
                    if (k && k.length) {
                        for (var m = {}, r = f.createBookmarks(), k = k.createIterator(), q, A = 0; q = k.getNextRange(1);) {
                            var B = q.getEnclosedNode();
                            B && (!B || B.type == CKEDITOR.NODE_ELEMENT &&
                            B.getName() in l) || (B = e(q, d, h));
                            B && a(B, b, c, m);
                            var w = new CKEDITOR.dom.walker(q), y = r[A].startNode, C = r[A++].endNode;
                            w.evaluator = function (a) {
                                var b = h == CKEDITOR.ENTER_P ? "p" : "div", c;
                                if (c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in d) {
                                    if (b = a.is(b))b = (b = a.getParent()) ? b.type == CKEDITOR.NODE_ELEMENT : !1;
                                    c = !(b && a.getParent().is("blockquote"))
                                }
                                return !!(c && a.getPosition(y) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(C) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                            };
                            for (; B = w.next();)a(B, b, c, m);
                            q = q.createIterator();
                            for (q.enlargeBr = h != CKEDITOR.ENTER_BR; B = q.getNextParagraph(h == CKEDITOR.ENTER_P ? "p" : "div");)a(B, b, c, m)
                        }
                        CKEDITOR.dom.element.clearAllMarkers(m);
                        c.forceNextSelectionCheck();
                        f.selectBookmarks(r);
                        c.focus()
                    }
                }
            }
        }

        function c(a) {
            var b = a == f.setAttribute, c = a == f.removeAttribute, d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function (e, f) {
                if (!this.isReadOnly()) {
                    var h;
                    if (h = e == (b || c ? "dir" : "direction") || "style" == e && (c || d.test(f))) {
                        a:{
                            h = this;
                            for (var l = h.getDocument().getBody().getParent(); h;) {
                                if (h.equals(l)) {
                                    h = !1;
                                    break a
                                }
                                h = h.getParent()
                            }
                            h = !0
                        }
                        h = !h
                    }
                    if (h && (h = this.getDirection(1), l = a.apply(this, arguments), h != this.getDirection(1)))return this.getDocument().fire("dirChanged", this), l
                }
                return a.apply(this, arguments)
            }
        }

        var d = {table: 1, ul: 1, ol: 1, blockquote: 1, div: 1}, l = {}, m = {};
        CKEDITOR.tools.extend(l, d, {tr: 1, p: 1, div: 1, li: 1});
        CKEDITOR.tools.extend(m, l, {td: 1});
        CKEDITOR.plugins.add("bidi", {
            init: function (a) {
                function c(b, d, e, f, h) {
                    a.addCommand(e, new CKEDITOR.command(a, f));
                    a.ui.addButton && a.ui.addButton(b, {
                        label: d, command: e,
                        toolbar: "bidi," + h
                    })
                }

                if (!a.blockless) {
                    var d = a.lang.bidi;
                    c("BidiLtr", d.ltr, "bidiltr", b("ltr"), 10);
                    c("BidiRtl", d.rtl, "bidirtl", b("rtl"), 20);
                    a.on("contentDom", function () {
                        a.document.on("dirChanged", function (b) {
                            a.fire("dirChanged", {node: b.data, dir: b.data.getDirection(1)})
                        })
                    });
                    a.on("contentDirChanged", function (b) {
                        b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
                        var c = a.ui.space(a.config.toolbarLocation);
                        if (c)c[b]("cke_mixed_dir_content")
                    })
                }
            }
        });
        for (var f = CKEDITOR.dom.element.prototype, h = ["setStyle", "removeStyle",
            "setAttribute", "removeAttribute"], k = 0; k < h.length; k++)f[h[k]] = CKEDITOR.tools.override(f[h[k]], c)
    }(),function () {
        var a = {
            exec: function (a) {
                var b = a.getCommand("blockquote").state, c = a.getSelection(), d = c && c.getRanges()[0];
                if (d) {
                    var l = c.createBookmarks();
                    if (CKEDITOR.env.ie) {
                        var m = l[0].startNode, f = l[0].endNode, h;
                        if (m && "blockquote" == m.getParent().getName())for (h = m; h = h.getNext();)if (h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) {
                            m.move(h, !0);
                            break
                        }
                        if (f && "blockquote" == f.getParent().getName())for (h = f; h = h.getPrevious();)if (h.type ==
                            CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) {
                            f.move(h);
                            break
                        }
                    }
                    var k = d.createIterator();
                    k.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
                    if (b == CKEDITOR.TRISTATE_OFF) {
                        for (m = []; b = k.getNextParagraph();)m.push(b);
                        1 > m.length && (b = a.document.createElement(a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), f = l.shift(), d.insertNode(b), b.append(new CKEDITOR.dom.text("﻿", a.document)), d.moveToBookmark(f), d.selectNodeContents(b), d.collapse(!0), f = d.createBookmark(), m.push(b), l.unshift(f));
                        h = m[0].getParent();
                        d = [];
                        for (f =
                                 0; f < m.length; f++)b = m[f], h = h.getCommonAncestor(b.getParent());
                        for (b = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1}; b[h.getName()];)h = h.getParent();
                        for (f = null; 0 < m.length;) {
                            for (b = m.shift(); !b.getParent().equals(h);)b = b.getParent();
                            b.equals(f) || d.push(b);
                            f = b
                        }
                        for (; 0 < d.length;)if (b = d.shift(), "blockquote" == b.getName()) {
                            for (f = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();)f.append(b.getFirst().remove()), m.push(f.getLast());
                            f.replace(b)
                        } else m.push(b);
                        d = a.document.createElement("blockquote");
                        for (d.insertBefore(m[0]); 0 <
                        m.length;)b = m.shift(), d.append(b)
                    } else if (b == CKEDITOR.TRISTATE_ON) {
                        f = [];
                        for (h = {}; b = k.getNextParagraph();) {
                            for (m = d = null; b.getParent();) {
                                if ("blockquote" == b.getParent().getName()) {
                                    d = b.getParent();
                                    m = b;
                                    break
                                }
                                b = b.getParent()
                            }
                            d && m && !m.getCustomData("blockquote_moveout") && (f.push(m), CKEDITOR.dom.element.setMarker(h, m, "blockquote_moveout", !0))
                        }
                        CKEDITOR.dom.element.clearAllMarkers(h);
                        b = [];
                        m = [];
                        for (h = {}; 0 < f.length;)k = f.shift(), d = k.getParent(), k.getPrevious() ? k.getNext() ? (k.breakParent(k.getParent()), m.push(k.getNext())) :
                            k.remove().insertAfter(d) : k.remove().insertBefore(d), d.getCustomData("blockquote_processed") || (m.push(d), CKEDITOR.dom.element.setMarker(h, d, "blockquote_processed", !0)), b.push(k);
                        CKEDITOR.dom.element.clearAllMarkers(h);
                        for (f = m.length - 1; 0 <= f; f--) {
                            d = m[f];
                            a:{
                                h = d;
                                for (var k = 0, g = h.getChildCount(), n = void 0; k < g && (n = h.getChild(k)); k++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
                                    h = !1;
                                    break a
                                }
                                h = !0
                            }
                            h && d.remove()
                        }
                        if (a.config.enterMode == CKEDITOR.ENTER_BR)for (d = !0; b.length;)if (k = b.shift(), "div" == k.getName()) {
                            f =
                                new CKEDITOR.dom.documentFragment(a.document);
                            !d || !k.getPrevious() || k.getPrevious().type == CKEDITOR.NODE_ELEMENT && k.getPrevious().isBlockBoundary() || f.append(a.document.createElement("br"));
                            for (d = k.getNext() && !(k.getNext().type == CKEDITOR.NODE_ELEMENT && k.getNext().isBlockBoundary()); k.getFirst();)k.getFirst().remove().appendTo(f);
                            d && f.append(a.document.createElement("br"));
                            f.replace(k);
                            d = !1
                        }
                    }
                    c.selectBookmarks(l);
                    a.focus()
                }
            }, refresh: function (a, b) {
                this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote",
                    1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
        };
        CKEDITOR.plugins.add("blockquote", {
            init: function (e) {
                e.blockless || (e.addCommand("blockquote", a), e.ui.addButton && e.ui.addButton("Blockquote", {
                    label: e.lang.blockquote.toolbar,
                    command: "blockquote",
                    toolbar: "blocks,10"
                }))
            }
        })
    }(),"use strict",function () {
        function a(a, b, c) {
            b.type || (b.type = "auto");
            if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty())return !1;
            b.dataValue ||
            (b.dataValue = "");
            if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox)a.once("afterPaste", function () {
                a.toolbox.focus()
            });
            return a.fire("paste", b)
        }

        function e(b) {
            function c() {
                var a = b.editable();
                if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var d = function (a) {
                        b.readOnly && "cut" == a.name || z.initPasteDataTransfer(a, b);
                        a.data.preventDefault()
                    };
                    a.on("copy", d);
                    a.on("cut", d);
                    a.on("cut", function () {
                        b.readOnly || b.extractSelectedHtml()
                    }, null, null, 999)
                }
                a.on(z.mainPasteEvent, function (a) {
                    "beforepaste" == z.mainPasteEvent &&
                    D || y(a)
                });
                "beforepaste" == z.mainPasteEvent && (a.on("paste", function (a) {
                    F || (f(), a.data.preventDefault(), y(a), l("paste") || b.openDialog("paste"))
                }), a.on("contextmenu", h, null, null, 0), a.on("beforepaste", function (a) {
                    !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h()
                }, null, null, 0));
                a.on("beforecut", function () {
                    !D && k(b)
                });
                var e;
                a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function () {
                    e = setTimeout(function () {
                        C()
                    }, 0)
                });
                b.on("destroy", function () {
                    clearTimeout(e)
                });
                a.on("keyup", C)
            }

            function d(a) {
                return {
                    type: a,
                    canUndo: "cut" == a, startDisabled: !0, exec: function () {
                        "cut" == this.type && k();
                        var a;
                        var c = this.type;
                        if (CKEDITOR.env.ie)a = l(c); else try {
                            a = b.document.$.execCommand(c, !1, null)
                        } catch (d) {
                            a = !1
                        }
                        a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
                        return a
                    }
                }
            }

            function e() {
                return {
                    canUndo: !1, async: !0, exec: function (b, c) {
                        var d = this, e = function (c, e) {
                            c && a(b, c, !!e);
                            b.fire("afterCommandExec", {name: "paste", command: d, returnValue: !!c})
                        };
                        "string" == typeof c ? e({
                                dataValue: c,
                                method: "paste",
                                dataTransfer: z.initPasteDataTransfer()
                            },
                            1) : b.getClipboardData(e)
                    }
                }
            }

            function f() {
                F = 1;
                setTimeout(function () {
                    F = 0
                }, 100)
            }

            function h() {
                D = 1;
                setTimeout(function () {
                    D = 0
                }, 10)
            }

            function l(a) {
                var c = b.document, d = c.getBody(), e = !1, f = function () {
                    e = !0
                };
                d.on(a, f);
                7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
                d.removeListener(a, f);
                return e
            }

            function k() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var a = b.getSelection(), c, d, e;
                    a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], e = b.document.createText(""),
                        e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function () {
                        c.getParent() && (e.remove(), a.selectElement(c))
                    }, 0))
                }
            }

            function m(a, c) {
                var d = b.document, e = b.editable(), f = function (a) {
                    a.cancel()
                }, h;
                if (!d.getById("cke_pastebin")) {
                    var l = b.getSelection(), k = l.createBookmarks();
                    CKEDITOR.env.ie && l.root.fire("selectionchange");
                    var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
                    n.setAttributes({id: "cke_pastebin", "data-cke-temp": "1"});
                    var q = 0, d = d.getWindow();
                    CKEDITOR.env.webkit ? (e.append(n), n.addClass("cke_editable"), e.is("body") || (q = "static" != e.getComputedStyle("position") ? e : CKEDITOR.dom.element.get(e.$.offsetParent), q = q.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(n);
                    n.setStyles({
                        position: "absolute",
                        top: d.getScrollPosition().y - q + 10 + "px",
                        width: "1px",
                        height: Math.max(1, d.getViewPaneSize().height - 20) + "px",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    });
                    CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                        "text"));
                    (q = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px");
                    b.on("selectionChange", f, null, null, 0);
                    if (CKEDITOR.env.webkit || CKEDITOR.env.gecko)h = e.once("blur", f, null, null, -100);
                    q && n.focus();
                    q = new CKEDITOR.dom.range(n);
                    q.selectNodeContents(n);
                    var r = q.select();
                    CKEDITOR.env.ie && (h = e.once("blur", function () {
                        b.lockSelection(r)
                    }));
                    var v = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function () {
                        CKEDITOR.env.webkit &&
                        (CKEDITOR.document.getBody().$.scrollTop = v);
                        h && h.removeListener();
                        CKEDITOR.env.ie && e.focus();
                        l.selectBookmarks(k);
                        n.remove();
                        var a;
                        CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") && (n = a);
                        b.removeListener("selectionChange", f);
                        c(n.getHtml())
                    }, 0)
                }
            }

            function B() {
                if ("paste" == z.mainPasteEvent)return b.fire("beforePaste", {type: "auto", method: "paste"}), !1;
                b.focus();
                f();
                var a = b.focusManager;
                a.lock();
                if (b.editable().fire(z.mainPasteEvent) && !l("paste"))return a.unlock(), !1;
                a.unlock();
                return !0
            }

            function w(a) {
                if ("wysiwyg" == b.mode)switch (a.data.keyCode) {
                    case CKEDITOR.CTRL + 86:
                    case CKEDITOR.SHIFT + 45:
                        a = b.editable();
                        f();
                        "paste" == z.mainPasteEvent && a.fire("beforepaste");
                        break;
                    case CKEDITOR.CTRL + 88:
                    case CKEDITOR.SHIFT + 46:
                        b.fire("saveSnapshot"), setTimeout(function () {
                            b.fire("saveSnapshot")
                        }, 50)
                }
            }

            function y(c) {
                var d = {type: "auto", method: "paste", dataTransfer: z.initPasteDataTransfer(c)};
                d.dataTransfer.cacheData();
                var e = !1 !== b.fire("beforePaste", d);
                e && z.canClipboardApiBeTrusted(d.dataTransfer,
                    b) ? (c.data.preventDefault(), setTimeout(function () {
                    a(b, d)
                }, 0)) : m(c, function (c) {
                    d.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    e && a(b, d)
                })
            }

            function C() {
                if ("wysiwyg" == b.mode) {
                    var a = x("paste");
                    b.getCommand("cut").setState(x("cut"));
                    b.getCommand("copy").setState(x("copy"));
                    b.getCommand("paste").setState(a);
                    b.fire("pasteState", a)
                }
            }

            function x(a) {
                if (E && a in {paste: 1, cut: 1})return CKEDITOR.TRISTATE_DISABLED;
                if ("paste" == a)return CKEDITOR.TRISTATE_OFF;
                a = b.getSelection();
                var c = a.getRanges();
                return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            }

            var z = CKEDITOR.plugins.clipboard, D = 0, F = 0, E = 0;
            (function () {
                b.on("key", w);
                b.on("contentDom", c);
                b.on("selectionChange", function (a) {
                    E = a.data.selection.getRanges()[0].checkReadOnly();
                    C()
                });
                b.contextMenu && b.contextMenu.addListener(function (a, b) {
                    E = b.getRanges()[0].checkReadOnly();
                    return {cut: x("cut"), copy: x("copy"), paste: x("paste")}
                })
            })();
            (function () {
                function a(c, d, e, f, h) {
                    var l = b.lang.clipboard[d];
                    b.addCommand(d, e);
                    b.ui.addButton && b.ui.addButton(c, {label: l, command: d, toolbar: "clipboard," + f});
                    b.addMenuItems && b.addMenuItem(d, {label: l, command: d, group: "clipboard", order: h})
                }

                a("Cut", "cut", d("cut"), 10, 1);
                a("Copy", "copy", d("copy"), 20, 4);
                a("Paste", "paste", e(), 30, 8)
            })();
            b.getClipboardData = function (a, c) {
                function d(a) {
                    a.removeListener();
                    a.cancel();
                    c(a.data)
                }

                function e(a) {
                    a.removeListener();
                    a.cancel();
                    k = !0;
                    c({type: l, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste"})
                }

                function f() {
                    this.customTitle =
                        a && a.title
                }

                var h = !1, l = "auto", k = !1;
                c || (c = a, a = null);
                b.on("paste", d, null, null, 0);
                b.on("beforePaste", function (a) {
                    a.removeListener();
                    h = !0;
                    l = a.data.type
                }, null, null, 1E3);
                !1 === B() && (b.removeListener("paste", d), h && b.fire("pasteDialog", f) ? (b.on("pasteDialogCommit", e), b.on("dialogHide", function (a) {
                    a.removeListener();
                    a.data.removeListener("pasteDialogCommit", e);
                    setTimeout(function () {
                        k || c(null)
                    }, 10)
                })) : c(null))
            }
        }

        function b(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return "html"
            } else if (CKEDITOR.env.ie) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return "html"
            } else if (CKEDITOR.env.gecko) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return "html"
            } else return "html";
            return "htmlifiedtext"
        }

        function c(a, b) {
            function c(a) {
                return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
            }

            b = b.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
            b = b.replace(/<\/?[A-Z]+>/g, function (a) {
                return a.toLowerCase()
            });
            if (b.match(/^[^<]$/))return b;
            CKEDITOR.env.webkit &&
            -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) {
                    return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1)
                }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, ""));
            CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/,
                "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) {
                    return c(a.length / 4)
                }) + "\x3c/p\x3e"));
            return m(a, b)
        }

        function d() {
            function a() {
                var b = {}, c;
                for (c in CKEDITOR.dtd)"$" != c.charAt(0) && "div" != c && "span" != c && (b[c] = 1);
                return b
            }

            var b = {};
            return {
                get: function (c) {
                    return "plain-text" == c ? b.plainText || (b.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = b.semanticContent) || (c = new CKEDITOR.filter, c.allow({
                        $1: {
                            elements: a(),
                            attributes: !0,
                            styles: !1,
                            classes: !1
                        }
                    }),
                        c = b.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null
                }
            }
        }

        function l(a, b, c) {
            b = CKEDITOR.htmlParser.fragment.fromHtml(b);
            var d = new CKEDITOR.htmlParser.basicWriter;
            c.applyTo(b, !0, !1, a.activeEnterMode);
            b.writeHtml(d);
            return d.getHtml()
        }

        function m(a, b) {
            a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
                return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2)
            }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
            return b
        }

        function f(a) {
            a.data.preventDefault();
            a.data.$.dataTransfer.dropEffect = "none"
        }

        function h(b) {
            var c = CKEDITOR.plugins.clipboard;
            b.on("contentDom", function () {
                function d(c, e, f) {
                    e.select();
                    a(b, {dataTransfer: f, method: "drop"}, 1);
                    f.sourceEditor.fire("saveSnapshot");
                    f.sourceEditor.editable().extractHtmlFromRange(c);
                    f.sourceEditor.getSelection().selectRanges([c]);
                    f.sourceEditor.fire("saveSnapshot")
                }

                function e(d, f) {
                    d.select();
                    a(b, {dataTransfer: f, method: "drop"}, 1);
                    c.resetDragDataTransfer()
                }

                function f(a, c, d) {
                    var e = {$: a.data.$, target: a.data.getTarget()};
                    c && (e.dragRange = c);
                    d && (e.dropRange = d);
                    !1 === b.fire(a.name, e) && a.data.preventDefault()
                }

                function h(a) {
                    a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
                    return a.getChildCount()
                }

                var l = b.editable(), k = CKEDITOR.plugins.clipboard.getDropTarget(b), m = b.ui.space("top"), B = b.ui.space("bottom");
                c.preventDefaultDropOnElement(m);
                c.preventDefaultDropOnElement(B);
                l.attachListener(k, "dragstart", f);
                l.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1);
                l.attachListener(b, "dragstart", function (a) {
                    c.initDragDataTransfer(a,
                        b)
                }, null, null, 2);
                l.attachListener(b, "dragstart", function () {
                    var a = c.dragRange = b.getSelection().getRanges()[0];
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount = a ? h(a.startContainer) : null, c.dragEndContainerChildCount = a ? h(a.endContainer) : null)
                }, null, null, 100);
                l.attachListener(k, "dragend", f);
                l.attachListener(b, "dragend", c.initDragDataTransfer, c, null, 1);
                l.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100);
                l.attachListener(k, "dragover", function (a) {
                    var b = a.data.getTarget();
                    b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault()
                });
                l.attachListener(k, "drop", function (a) {
                    if (!a.data.$.defaultPrevented) {
                        a.data.preventDefault();
                        var d = a.data.getTarget();
                        if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) {
                            var d = c.getRangeAtDropPosition(a, b), e = c.dragRange;
                            d && f(a, e, d)
                        }
                    }
                }, null, null, 9999);
                l.attachListener(b, "drop", c.initDragDataTransfer, c, null,
                    1);
                l.attachListener(b, "drop", function (a) {
                    if (a = a.data) {
                        var f = a.dropRange, h = a.dragRange, l = a.dataTransfer;
                        l.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () {
                            c.internalDrop(h, f, l, b)
                        }, 0) : l.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(h, f, l) : e(f, l)
                    }
                }, null, null, 9999)
            })
        }

        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog", init: function (a) {
                var f, k = d();
                a.config.forcePasteAsPlainText ? f = "plain-text" : a.config.pasteFilter ? f = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in
                a.config || (f = "semantic-content");
                a.pasteFilter = k.get(f);
                e(a);
                h(a);
                CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                a.on("paste", function (b) {
                    b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
                    if (!b.data.dataValue) {
                        var c = b.data.dataTransfer, d = c.getData("text/html");
                        if (d)b.data.dataValue = d, b.data.type = "html"; else if (d = c.getData("text/plain"))b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text"
                    }
                }, null, null, 1);
                a.on("paste",
                    function (a) {
                        var b = a.data.dataValue, c = CKEDITOR.dtd.$block;
                        -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) {
                            return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;")
                        })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,
                            "$1"));
                        if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var d, e, f = new CKEDITOR.dom.element("div");
                            for (f.setHtml(b); 1 == f.getChildCount() && (d = f.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));)f = e = d;
                            e && (b = e.getHtml().replace(/<br>$/i, ""))
                        }
                        CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) {
                            return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b
                        }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, d) {
                            return d in
                            c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b
                        }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                        a.data.dataValue = b
                    }, null, null, 3);
                a.on("paste", function (d) {
                    d = d.data;
                    var e = d.type, f = d.dataValue, h, m = a.config.clipboard_defaultContentType || "html", n = d.dataTransfer.getTransferType(a);
                    h = "html" == e || "html" == d.preSniffing ? "html" : b(f);
                    "htmlifiedtext" == h && (f = c(a.config, f));
                    "text" == e && "html" == h ? f = l(a, f, k.get("plain-text")) : n == CKEDITOR.DATA_TRANSFER_EXTERNAL && a.pasteFilter && !d.dontFilter && (f = l(a, f, a.pasteFilter));
                    d.startsWithEOL && (f = '\x3cbr data-cke-eol\x3d"1"\x3e' + f);
                    d.endsWithEOL && (f += '\x3cbr data-cke-eol\x3d"1"\x3e');
                    "auto" == e && (e = "html" == h || "html" == m ? "html" : "text");
                    d.type = e;
                    d.dataValue = f;
                    delete d.preSniffing;
                    delete d.startsWithEOL;
                    delete d.endsWithEOL
                }, null, null, 6);
                a.on("paste", function (b) {
                    b = b.data;
                    b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () {
                        a.fire("afterPaste")
                    }, 0))
                }, null, null, 1E3);
                a.on("pasteDialog", function (b) {
                    setTimeout(function () {
                        a.openDialog("paste", b.data)
                    }, 0)
                })
            }
        });
        CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
            isCustomDataTypesSupported: !CKEDITOR.env.ie,
            isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
            mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
            canClipboardApiBeTrusted: function (a, b) {
                return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) ? !0 : !1
            },
            getDropTarget: function (a) {
                var b =
                    a.editable();
                return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document
            },
            fixSplitNodesAfterDrop: function (a, b, c, d) {
                function e(a, c, d) {
                    var f = a;
                    f.type == CKEDITOR.NODE_TEXT && (f = a.getParent());
                    if (f.equals(c) && d != c.getChildCount())return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0
                }

                var f = b.startContainer;
                "number" == typeof d && "number" == typeof c && f.type == CKEDITOR.NODE_ELEMENT && (e(a.startContainer, f, c) || e(a.endContainer, f, d))
            },
            isDropRangeAffectedByDragRange: function (a, b) {
                var c = b.startContainer, d = b.endOffset;
                return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1
            },
            internalDrop: function (b, c, d, e) {
                var f = CKEDITOR.plugins.clipboard, h = e.editable(), l, k;
                e.fire("saveSnapshot");
                e.fire("lockSnapshot", {dontUpdate: 1});
                CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, c, f.dragStartContainerChildCount, f.dragEndContainerChildCount);
                (k = this.isDropRangeAffectedByDragRange(b, c)) || (l = b.createBookmark(!1));
                f = c.clone().createBookmark(!1);
                k && (l = b.createBookmark(!1));
                b = l.startNode;
                c = l.endNode;
                k = f.startNode;
                c && b.getPosition(k) & CKEDITOR.POSITION_PRECEDING && c.getPosition(k) & CKEDITOR.POSITION_FOLLOWING && k.insertBefore(b);
                b = e.createRange();
                b.moveToBookmark(l);
                h.extractHtmlFromRange(b,
                    1);
                c = e.createRange();
                c.moveToBookmark(f);
                a(e, {dataTransfer: d, method: "drop", range: c}, 1);
                e.fire("unlockSnapshot")
            },
            getRangeAtDropPosition: function (a, b) {
                var c = a.data.$, d = c.clientX, e = c.clientY, f = b.getSelection(!0).getRanges()[0], h = b.createRange();
                if (a.data.testRange)return a.data.testRange;
                if (document.caretRangeFromPoint)c = b.document.$.caretRangeFromPoint(d, e), h.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), h.collapse(!0); else if (c.rangeParent)h.setStart(CKEDITOR.dom.node(c.rangeParent),
                    c.rangeOffset), h.collapse(!0); else {
                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && f && b.editable().hasFocus)return f;
                    if (document.body.createTextRange) {
                        b.focus();
                        c = b.document.getBody().$.createTextRange();
                        try {
                            for (var l = !1, k = 0; 20 > k && !l; k++) {
                                if (!l)try {
                                    c.moveToPoint(d, e - k), l = !0
                                } catch (m) {
                                }
                                if (!l)try {
                                    c.moveToPoint(d, e + k), l = !0
                                } catch (w) {
                                }
                            }
                            if (l) {
                                var y = "cke-temp-" + (new Date).getTime();
                                c.pasteHTML('\x3cspan id\x3d"' + y + '"\x3e​\x3c/span\x3e');
                                var C = b.document.getById(y);
                                h.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START);
                                C.remove()
                            } else {
                                var x = b.document.$.elementFromPoint(d, e), z = new CKEDITOR.dom.element(x), D;
                                if (z.equals(b.editable()) || "html" == z.getName())return f && f.startContainer && !f.startContainer.equals(b.editable()) ? f : null;
                                D = z.getClientRect();
                                d < D.left ? h.setStartAt(z, CKEDITOR.POSITION_AFTER_START) : h.setStartAt(z, CKEDITOR.POSITION_BEFORE_END);
                                h.collapse(!0)
                            }
                        } catch (F) {
                            return null
                        }
                    } else return null
                }
                return h
            },
            initDragDataTransfer: function (a, b) {
                var c = a.data.$ ? a.data.$.dataTransfer : null, d = new this.dataTransfer(c, b);
                c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d;
                a.data.dataTransfer = d
            },
            resetDragDataTransfer: function () {
                this.dragData = null
            },
            initPasteDataTransfer: function (a, b) {
                if (this.isCustomCopyCutSupported) {
                    if (a && a.data && a.data.$) {
                        var c = new this.dataTransfer(a.data.$.clipboardData, b);
                        this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = a.data.$.clipboardData) : this.copyCutData = c;
                        return c
                    }
                    return new this.dataTransfer(null, b)
                }
                return new this.dataTransfer(CKEDITOR.env.edge &&
                    a && a.data.$ && a.data.$.clipboardData || null, b)
            },
            preventDefaultDropOnElement: function (a) {
                a && a.on("dragover", f)
            }
        };
        var k = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
        CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
            a && (this.$ = a);
            this._ = {
                metaRegExp: /^<meta.*?>/i,
                bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
                fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
                data: {},
                files: [],
                normalizeType: function (a) {
                    a = a.toLowerCase();
                    return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" :
                        a
                }
            };
            this.id = this.getData(k);
            this.id || (this.id = "Text" == k ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
            if ("Text" != k)try {
                this.$.setData(k, this.id)
            } catch (c) {
            }
            b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == k || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
        };
        CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
        CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
        CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
        CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
            getData: function (a) {
                a =
                    this._.normalizeType(a);
                var b = this._.data[a];
                if (void 0 === b || null === b || "" === b)try {
                    b = this.$.getData(a)
                } catch (c) {
                }
                if (void 0 === b || null === b || "" === b)b = "";
                "text/html" == a ? (b = b.replace(this._.metaRegExp, ""), (a = this._.bodyRegExp.exec(b)) && a.length && (b = a[1], b = b.replace(this._.fragmentRegExp, ""))) : "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == b.substring(0, 7) && (b = "");
                return b
            }, setData: function (a, b) {
                a = this._.normalizeType(a);
                this._.data[a] = b;
                if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ||
                    "URL" == a || "Text" == a) {
                    "Text" == k && "Text" == a && (this.id = b);
                    try {
                        this.$.setData(a, b)
                    } catch (c) {
                    }
                }
            }, getTransferType: function (a) {
                return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
            }, cacheData: function () {
                function a(c) {
                    c = b._.normalizeType(c);
                    var d = b.getData(c);
                    d && (b._.data[c] = d)
                }

                if (this.$) {
                    var b = this, c, d;
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)for (c = 0; c < this.$.types.length; c++)a(this.$.types[c])
                    } else a("Text"),
                        a("URL");
                    d = this._getImageFromClipboard();
                    if (this.$ && this.$.files || d) {
                        this._.files = [];
                        if (this.$.files && this.$.files.length)for (c = 0; c < this.$.files.length; c++)this._.files.push(this.$.files[c]);
                        0 === this._.files.length && d && this._.files.push(d)
                    }
                }
            }, getFilesCount: function () {
                return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
            }, getFile: function (a) {
                return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ?
                    this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0
            }, isEmpty: function () {
                var a = {}, b;
                if (this.getFilesCount())return !1;
                for (b in this._.data)a[b] = 1;
                if (this.$)if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                    if (this.$.types)for (var c = 0; c < this.$.types.length; c++)a[this.$.types[c]] = 1
                } else a.Text = 1, a.URL = 1;
                "Text" != k && (a[k] = 0);
                for (b in a)if (a[b] && "" !== this.getData(b))return !1;
                return !0
            }, _getImageFromClipboard: function () {
                var a;
                if (this.$ && this.$.items && this.$.items[0])try {
                    if ((a = this.$.items[0].getAsFile()) &&
                        a.type)return a
                } catch (b) {
                }
            }
        }
    }(),function () {
        var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'), a = a + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
            e = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), b = CKEDITOR.addTemplate("button", a);
        CKEDITOR.plugins.add("button", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
            }
        });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function (a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label, click: a.click || function (b) {
                    b.execCommand(a.command)
                }
            });
            this._ = {}
        };
        CKEDITOR.ui.button.handler = {
            create: function (a) {
                return new CKEDITOR.ui.button(a)
            }
        };
        CKEDITOR.ui.button.prototype = {
            render: function (a, d) {
                function l() {
                    var b = a.mode;
                    b && (b = this.modes[b] ? void 0 !== t[b] ? t[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
                }

                var m = CKEDITOR.env, f = this._.id = CKEDITOR.tools.getNextId(), h = "", k = this.command, g;
                this._.editor = a;
                var n = {
                        id: f, button: this, editor: a, focus: function () {
                            CKEDITOR.document.getById(f).focus()
                        }, execute: function () {
                            this.button.click(a)
                        }, attach: function (a) {
                            this.button.attach(a)
                        }
                    },
                    p = CKEDITOR.tools.addFunction(function (a) {
                        if (n.onkey)return a = new CKEDITOR.dom.event(a), !1 !== n.onkey(n, a.getKeystroke())
                    }), u = CKEDITOR.tools.addFunction(function (a) {
                        var b;
                        n.onfocus && (b = !1 !== n.onfocus(n, new CKEDITOR.dom.event(a)));
                        return b
                    }), v = 0;
                n.clickFn = g = CKEDITOR.tools.addFunction(function () {
                    v && (a.unlockSelection(1), v = 0);
                    n.execute();
                    m.iOS && a.focus()
                });
                if (this.modes) {
                    var t = {};
                    a.on("beforeModeUnload", function () {
                        a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (t[a.mode] = this._.state)
                    }, this);
                    a.on("activeFilterChange",
                        l, this);
                    a.on("mode", l, this);
                    !this.readOnly && a.on("readOnly", l, this)
                } else k && (k = a.getCommand(k)) && (k.on("state", function () {
                    this.setState(k.state)
                }, this), h += k.state == CKEDITOR.TRISTATE_ON ? "on" : k.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                if (this.directional)a.on("contentDirChanged", function (b) {
                    var d = CKEDITOR.document.getById(this._.id), e = d.getFirst();
                    b = b.data;
                    b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl");
                    e.setAttribute("style", CKEDITOR.skin.getIconStyle(q,
                        "rtl" == b, this.icon, this.iconOffset))
                }, this);
                k || (h += "off");
                var r = this.name || this.command, q = r;
                this.icon && !/\./.test(this.icon) && (q = this.icon, this.icon = null);
                h = {
                    id: f,
                    name: r,
                    iconName: q,
                    label: this.label,
                    cls: this.className || "",
                    state: h,
                    ariaDisabled: "disabled" == h ? "true" : "false",
                    title: this.title,
                    titleJs: m.gecko && !m.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: p,
                    focusFn: u,
                    clickFn: g,
                    style: CKEDITOR.skin.getIconStyle(q, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ?
                        e.output() : ""
                };
                b.output(h, d);
                if (this.onRender)this.onRender();
                return n
            }, setState: function (a) {
                if (this._.state == a)return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ?
                    b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            }, getState: function () {
                return this._.state
            }, toFeature: function (a) {
                if (this._.feature)return this._.feature;
                var b = this;
                this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
                return this._.feature = b
            }
        };
        CKEDITOR.ui.prototype.addButton = function (a, b) {
            this.add(a, CKEDITOR.UI_BUTTON, b)
        }
    }(),CKEDITOR.plugins.add("panelbutton", {
        requires: "button", onLoad: function () {
            function a(a) {
                var b = this._;
                b.state != CKEDITOR.TRISTATE_DISABLED &&
                (this.createPanel(a), b.on ? b.panel.hide() : b.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
            }

            CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button, $: function (e) {
                    var b = e.panel || {};
                    delete e.panel;
                    this.base(e);
                    this.document = b.parent && b.parent.getDocument() || CKEDITOR.document;
                    b.block = {attributes: b.attributes};
                    this.hasArrow = b.toolbarRelated = !0;
                    this.click = a;
                    this._ = {panelDefinition: b}
                }, statics: {
                    handler: {
                        create: function (a) {
                            return new CKEDITOR.ui.panelButton(a)
                        }
                    }
                }, proto: {
                    createPanel: function (a) {
                        var b =
                            this._;
                        if (!b.panel) {
                            var c = this._.panelDefinition, d = this._.panelDefinition.block, l = c.parent || CKEDITOR.document.getBody(), m = this._.panel = new CKEDITOR.ui.floatPanel(a, l, c), c = m.addBlock(b.id, d), f = this;
                            m.onShow = function () {
                                f.className && this.element.addClass(f.className + "_panel");
                                f.setState(CKEDITOR.TRISTATE_ON);
                                b.on = 1;
                                f.editorFocus && a.focus();
                                if (f.onOpen)f.onOpen()
                            };
                            m.onHide = function (c) {
                                f.className && this.element.getFirst().removeClass(f.className + "_panel");
                                f.setState(f.modes && f.modes[a.mode] ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED);
                                b.on = 0;
                                if (!c && f.onClose)f.onClose()
                            };
                            m.onEscape = function () {
                                m.hide(1);
                                f.document.getById(b.id).focus()
                            };
                            if (this.onBlock)this.onBlock(m, c);
                            c.onHide = function () {
                                b.on = 0;
                                f.setState(CKEDITOR.TRISTATE_OFF)
                            }
                        }
                    }
                }
            })
        }, beforeInit: function (a) {
            a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
        }
    }),CKEDITOR.UI_PANELBUTTON = "panelbutton",function () {
        CKEDITOR.plugins.add("panel", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
            }
        });
        CKEDITOR.UI_PANEL =
            "panel";
        CKEDITOR.ui.panel = function (a, b) {
            b && CKEDITOR.tools.extend(this, b);
            CKEDITOR.tools.extend(this, {className: "", css: []});
            this.id = CKEDITOR.tools.getNextId();
            this.document = a;
            this.isFramed = this.forceIFrame || this.css.length;
            this._ = {blocks: {}}
        };
        CKEDITOR.ui.panel.handler = {
            create: function (a) {
                return new CKEDITOR.ui.panel(a)
            }
        };
        var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
            e = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), b = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
        CKEDITOR.ui.panel.prototype = {
            render: function (c,
                              d) {
                this.getHolderElement = function () {
                    var a = this._.holder;
                    if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"), c = a.getParent(), a = a.getFrameDocument();
                            CKEDITOR.env.iOS && c.setStyles({
                                overflow: "scroll",
                                "-webkit-overflow-scrolling": "touch"
                            });
                            c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
                                this.isLoaded = !0;
                                if (this.onLoad)this.onLoad()
                            }, this));
                            a.write(b.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" +
                                c + ");"
                            }, l)));
                            a.getWindow().$.CKEDITOR = CKEDITOR;
                            a.on("keydown", function (a) {
                                var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                            }, this);
                            a = a.getBody();
                            a.unselectable();
                            CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
                        } else a = this.document.getById(this.id);
                        this._.holder = a
                    }
                    return a
                };
                var l = {
                    editorId: c.id,
                    id: this.id,
                    langCode: c.langCode,
                    dir: c.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": c.config.baseFloatZIndex + 1
                };
                if (this.isFramed) {
                    var m = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                    l.frame = e.output({id: this.id + "_frame", src: m})
                }
                m = a.output(l);
                d && d.push(m);
                return m
            }, addBlock: function (a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
                    b);
                this._.currentBlock || this.showBlock(a);
                return b
            }, getBlock: function (a) {
                return this._.blocks[a]
            }, showBlock: function (a) {
                a = this._.blocks[a];
                var b = this._.currentBlock, e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                b && b.hide();
                this._.currentBlock = a;
                CKEDITOR.fire("ariaWidget", e);
                a._.focusIndex = -1;
                this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                a.show();
                return a
            }, destroy: function () {
                this.element && this.element.remove()
            }
        };
        CKEDITOR.ui.panel.block =
            CKEDITOR.tools.createClass({
                $: function (a, b) {
                    this.element = a.append(a.getDocument().createElement("div", {
                        attributes: {
                            tabindex: -1,
                            "class": "cke_panel_block"
                        }, styles: {display: "none"}
                    }));
                    b && CKEDITOR.tools.extend(this, b);
                    this.element.setAttributes({
                        role: this.attributes.role || "presentation",
                        "aria-label": this.attributes["aria-label"],
                        title: this.attributes.title || this.attributes["aria-label"]
                    });
                    this.keys = {};
                    this._.focusIndex = -1;
                    this.element.disableContextMenu()
                }, _: {
                    markItem: function (a) {
                        -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                            a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                    }
                }, proto: {
                    show: function () {
                        this.element.setStyle("display", "")
                    }, hide: function () {
                        this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
                    }, onKeyDown: function (a, b) {
                        var e = this.keys[a];
                        switch (e) {
                            case "next":
                                for (var m = this._.focusIndex, e = this.element.getElementsByTag("a"), f; f = e.getItem(++m);)if (f.getAttribute("_cke_focus") && f.$.offsetWidth) {
                                    this._.focusIndex = m;
                                    f.focus();
                                    break
                                }
                                return f ||
                                b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1));
                            case "prev":
                                m = this._.focusIndex;
                                for (e = this.element.getElementsByTag("a"); 0 < m && (f = e.getItem(--m));) {
                                    if (f.getAttribute("_cke_focus") && f.$.offsetWidth) {
                                        this._.focusIndex = m;
                                        f.focus();
                                        break
                                    }
                                    f = null
                                }
                                return f || b ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1));
                            case "click":
                            case "mouseup":
                                return m = this._.focusIndex, (f = 0 <= m && this.element.getElementsByTag("a").getItem(m)) && (f.$[e] ? f.$[e]() : f.$["on" + e]()), !1
                        }
                        return !0
                    }
                }
            })
    }(),CKEDITOR.plugins.add("floatpanel",
        {requires: "panel"}),function () {
        function a(a, c, d, l, m) {
            m = CKEDITOR.tools.genKey(c.getUniqueId(), d.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", m || "");
            var f = e[m];
            f || (f = e[m] = new CKEDITOR.ui.panel(c, l), f.element = d.append(CKEDITOR.dom.element.createFromHtml(f.render(a), c)), f.element.setStyles({
                display: "none",
                position: "absolute"
            }));
            return f
        }

        var e = {};
        CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (b, c, d, e) {
                function m() {
                    g.hide()
                }

                d.forceIFrame = 1;
                d.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
                (c = CKEDITOR.document.getById("cke_" + b.name));
                var f = c.getDocument();
                e = a(b, f, c, d, e || 0);
                var h = e.element, k = h.getFirst(), g = this;
                h.disableContextMenu();
                this.element = h;
                this._ = {
                    editor: b,
                    panel: e,
                    parentElement: c,
                    definition: d,
                    document: f,
                    iframe: k,
                    children: [],
                    dir: b.lang.dir,
                    showBlockParams: null
                };
                b.on("mode", m);
                b.on("resize", m);
                f.getWindow().on("resize", function () {
                    this.reposition()
                }, this)
            }, proto: {
                addBlock: function (a, c) {
                    return this._.panel.addBlock(a, c)
                }, addListBlock: function (a, c) {
                    return this._.panel.addListBlock(a,
                        c)
                }, getBlock: function (a) {
                    return this._.panel.getBlock(a)
                }, showBlock: function (a, c, d, e, m, f) {
                    var h = this._.panel, k = h.showBlock(a);
                    this._.showBlockParams = [].slice.call(arguments);
                    this.allowBlur(!1);
                    var g = this._.editor.editable();
                    this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                    this._.hideTimeout = 0;
                    var n = this.element, g = this._.iframe, g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow), p = n.getDocument(), u = this._.parentElement.getPositionedAncestor(),
                        v = c.getDocumentPosition(p), p = u ? u.getDocumentPosition(p) : {
                            x: 0,
                            y: 0
                        }, t = "rtl" == this._.dir, r = v.x + (e || 0) - p.x, q = v.y + (m || 0) - p.y;
                    !t || 1 != d && 4 != d ? t || 2 != d && 3 != d || (r += c.$.offsetWidth - 1) : r += c.$.offsetWidth;
                    if (3 == d || 4 == d)q += c.$.offsetHeight - 1;
                    this._.panel._.offsetParentId = c.getId();
                    n.setStyles({top: q + "px", left: 0, display: ""});
                    n.setOpacity(0);
                    n.getFirst().removeStyle("width");
                    this._.editor.focusManager.add(g);
                    this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function (a) {
                        function b() {
                            delete this._.returnFocus;
                            this.hide()
                        }

                        this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
                    }, this), g.on("focus", function () {
                        this._.focused = !0;
                        this.hideChild();
                        this.allowBlur(!0)
                    }, this), CKEDITOR.env.iOS && (g.on("touchstart", function () {
                        clearTimeout(this._.hideTimeout)
                    }, this), g.on("touchend", function () {
                        this._.hideTimeout = 0;
                        this.focus()
                    }, this)), CKEDITOR.event.useCapture = !1,
                        this._.blurSet = 1);
                    h.onEscape = CKEDITOR.tools.bind(function (a) {
                        if (this.onEscape && !1 === this.onEscape(a))return !1
                    }, this);
                    CKEDITOR.tools.setTimeout(function () {
                        var a = CKEDITOR.tools.bind(function () {
                            var a = n;
                            a.removeStyle("width");
                            if (k.autoSize) {
                                var b = k.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? k.element : b.getBody()).$.scrollWidth;
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3);
                                a.setStyle("width", b + 10 + "px");
                                b = k.element.$.scrollHeight;
                                CKEDITOR.env.ie &&
                                CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3);
                                a.setStyle("height", b + "px");
                                h._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else a.removeStyle("height");
                            t && (r -= n.$.offsetWidth);
                            n.setStyle("left", r + "px");
                            var b = h.element.getWindow(), a = n.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, e = t ? a.right : b.width - a.left, g = t ? b.width - a.right : a.left;
                            t ? e < c && (r = g > c ? r + c : b.width > c ? r - a.left : r - a.right + b.width) :
                            e < c && (r = g > c ? r - c : b.width > c ? r - a.right + b.width : r - a.left);
                            c = a.top;
                            b.height - a.top < d && (q = c > d ? q - d : b.height > d ? q - a.bottom + b.height : q - a.top);
                            CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (r = CKEDITOR.env.ie8Compat ? r - 2 * n.getDocument().getDocumentElement().$.scrollLeft : r - (a.$.scrollWidth - a.$.clientWidth)));
                            var a = n.getFirst(), l;
                            (l = a.getCustomData("activePanel")) && l.onHide && l.onHide.call(this, 1);
                            a.setCustomData("activePanel",
                                this);
                            n.setStyles({top: q + "px", left: r + "px"});
                            n.setOpacity(1);
                            f && f()
                        }, this);
                        h.isLoaded ? a() : h.onLoad = a;
                        CKEDITOR.tools.setTimeout(function () {
                            var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                            this.focus();
                            k.element.focus();
                            CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
                            this.allowBlur(!0);
                            this._.editor.fire("panelShow", this)
                        }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this);
                    this.visible = 1;
                    this.onShow && this.onShow.call(this)
                }, reposition: function () {
                    var a = this._.showBlockParams;
                    this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
                }, focus: function () {
                    if (CKEDITOR.env.webkit) {
                        var a = CKEDITOR.document.getActive();
                        a && !a.equals(this._.iframe) && a.$.blur()
                    }
                    (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                }, blur: function () {
                    var a = this._.iframe.getFrameDocument().getActive();
                    a && a.is("a") && (this._.lastFocused = a)
                }, hide: function (a) {
                    if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                        this.hideChild();
                        CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                        this.element.setStyle("display", "none");
                        this.visible = 0;
                        this.element.getFirst().removeCustomData("activePanel");
                        if (a = a && this._.returnFocus)CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
                        delete this._.lastFocused;
                        this._.showBlockParams = null;
                        this._.editor.fire("panelHide", this)
                    }
                }, allowBlur: function (a) {
                    var c = this._.panel;
                    void 0 !== a && (c.allowBlur = a);
                    return c.allowBlur
                }, showAsChild: function (a, c, d, e, m, f) {
                    if (this._.activeChild != a || a._.panel._.offsetParentId != d.getId())this.hideChild(), a.onHide =
                        CKEDITOR.tools.bind(function () {
                            CKEDITOR.tools.setTimeout(function () {
                                this._.focused || this.hide()
                            }, 0, this)
                        }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(c, d, e, m, f), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                        a.element.getChild(0).$.style.cssText += ""
                    }, 100)
                }, hideChild: function (a) {
                    var c = this._.activeChild;
                    c && (delete c.onHide, delete this._.activeChild, c.hide(), a && this.focus())
                }
            }
        });
        CKEDITOR.on("instanceDestroyed", function () {
            var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
                c;
            for (c in e) {
                var d = e[c];
                a ? d.destroy() : d.element.hide()
            }
            a && (e = {})
        })
    }(),CKEDITOR.plugins.add("colorbutton", {
        requires: "panelbutton,floatpanel", init: function (a) {
            function e(c, e, h, k) {
                var g = new CKEDITOR.style(d["colorButton_" + e + "Style"]), n = CKEDITOR.tools.getNextId() + "_colorBox";
                a.ui.add(c, CKEDITOR.UI_PANELBUTTON, {
                    label: h,
                    title: h,
                    modes: {wysiwyg: 1},
                    editorFocus: 0,
                    toolbar: "colors," + k,
                    allowedContent: g,
                    requiredContent: g,
                    panel: {
                        css: CKEDITOR.skin.getPath("editor"),
                        attributes: {role: "listbox", "aria-label": l.panelTitle}
                    },
                    onBlock: function (c, d) {
                        d.autoSize = !0;
                        d.element.addClass("cke_colorblock");
                        d.element.setHtml(b(c, e, n));
                        d.element.getDocument().getBody().setStyle("overflow", "hidden");
                        CKEDITOR.ui.fire("ready", this);
                        var g = d.keys, h = "rtl" == a.lang.dir;
                        g[h ? 37 : 39] = "next";
                        g[40] = "next";
                        g[9] = "next";
                        g[h ? 39 : 37] = "prev";
                        g[38] = "prev";
                        g[CKEDITOR.SHIFT + 9] = "prev";
                        g[32] = "click"
                    },
                    refresh: function () {
                        a.activeFilter.check(g) || this.setState(CKEDITOR.TRISTATE_DISABLED)
                    },
                    onOpen: function () {
                        var b = a.getSelection(), b = b && b.getStartElement(), b = a.elementPath(b),
                            c;
                        if (b) {
                            b = b.block || b.blockLimit || a.document.getBody();
                            do c = b && b.getComputedStyle("back" == e ? "background-color" : "color") || "transparent"; while ("back" == e && "transparent" == c && b && (b = b.getParent()));
                            c && "transparent" != c || (c = "#ffffff");
                            !1 !== d.colorButton_enableAutomatic && this._.panel._.iframe.getFrameDocument().getById(n).setStyle("background-color", c);
                            return c
                        }
                    }
                })
            }

            function b(b, e, h) {
                var k = [], g = d.colorButton_colors.split(","), n = a.plugins.colordialog && !1 !== d.colorButton_enableMore, p = g.length + (n ? 2 : 1), u = CKEDITOR.tools.addFunction(function (e,
                                                                                                                                                                                                    f) {
                    function g(a) {
                        this.removeListener("ok", g);
                        this.removeListener("cancel", g);
                        "ok" == a.name && h(this.getContentElement("picker", "selectedColor").getValue(), f)
                    }

                    var h = arguments.callee;
                    if ("?" == e)a.openDialog("colordialog", function () {
                        this.on("ok", g);
                        this.on("cancel", g)
                    }); else {
                        a.focus();
                        b.hide();
                        a.fire("saveSnapshot");
                        a.removeStyle(new CKEDITOR.style(d["colorButton_" + f + "Style"], {color: "inherit"}));
                        if (e) {
                            var l = d["colorButton_" + f + "Style"];
                            l.childRule = "back" == f ? function (a) {
                                return c(a)
                            } : function (a) {
                                return !(a.is("a") ||
                                    a.getElementsByTag("a").count()) || c(a)
                            };
                            a.applyStyle(new CKEDITOR.style(l, {color: e}))
                        }
                        a.fire("saveSnapshot")
                    }
                });
                !1 !== d.colorButton_enableAutomatic && k.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', l.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', u, ",null,'", e, "');return false;\" href\x3d\"javascript:void('", l.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', p, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"',
                    h, '"\x3e\x3c/span\x3e\x3c/td\x3e\x3ctd colspan\x3d7 align\x3dcenter\x3e', l.auto, "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e");
                k.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e');
                for (h = 0; h < g.length; h++) {
                    0 === h % 8 && k.push("\x3c/tr\x3e\x3ctr\x3e");
                    var v = g[h].split("/"), t = v[0], r = v[1] || t;
                    v[1] || (t = "#" + t.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
                    v = a.lang.colorbutton.colors[r] || r;
                    k.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
                        v, '" onclick\x3d"CKEDITOR.tools.callFunction(', u, ",'", t, "','", e, "'); return false;\" href\x3d\"javascript:void('", v, '\')" role\x3d"option" aria-posinset\x3d"', h + 2, '" aria-setsize\x3d"', p, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', r, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
                }
                n && k.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d8 align\x3dcenter\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', l.more, '" onclick\x3d"CKEDITOR.tools.callFunction(',
                    u, ",'?','", e, "');return false;\" href\x3d\"javascript:void('", l.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', p, '" aria-setsize\x3d"', p, '"\x3e', l.more, "\x3c/a\x3e\x3c/td\x3e");
                k.push("\x3c/tr\x3e\x3c/table\x3e");
                return k.join("")
            }

            function c(a) {
                return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle")
            }

            var d = a.config, l = a.lang.colorbutton;
            CKEDITOR.env.hc || (e("TextColor", "fore", l.textColorTitle, 10), e("BGColor", "back", l.bgColorTitle, 20))
        }
    }),CKEDITOR.config.colorButton_colors =
        "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF",CKEDITOR.config.colorButton_foreStyle = {
        element: "span",
        styles: {color: "#(color)"},
        overrides: [{element: "font", attributes: {color: null}}]
    },CKEDITOR.config.colorButton_backStyle = {
        element: "span",
        styles: {"background-color": "#(color)"}
    },CKEDITOR.plugins.colordialog =
    {
        requires: "dialog", init: function (a) {
        var e = new CKEDITOR.dialogCommand("colordialog");
        e.editorFocus = !1;
        a.addCommand("colordialog", e);
        CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
        a.getColorFromDialog = function (b, c) {
            var d = function (a) {
                this.removeListener("ok", d);
                this.removeListener("cancel", d);
                a = "ok" == a.name ? this.getValueOf("picker", "selectedColor") : null;
                b.call(c, a)
            }, e = function (a) {
                a.on("ok", d);
                a.on("cancel", d)
            };
            a.execCommand("colordialog");
            if (a._.storedDialogs && a._.storedDialogs.colordialog)e(a._.storedDialogs.colordialog);
            else CKEDITOR.on("dialogDefinition", function (a) {
                if ("colordialog" == a.data.name) {
                    var b = a.data.definition;
                    a.removeListener();
                    b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) {
                        return function () {
                            e(this);
                            b.onLoad = a;
                            "function" == typeof a && a.call(this)
                        }
                    })
                }
            })
        }
    }
    },CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog),CKEDITOR.plugins.add("menu", {
        requires: "floatpanel", beforeInit: function (a) {
            for (var e = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, d = 0; d < e.length; d++)b[e[d]] =
                d + 1;
            a.addMenuGroup = function (a, c) {
                b[a] = c || 100
            };
            a.addMenuItem = function (a, d) {
                b[d.group] && (c[a] = new CKEDITOR.menuItem(this, a, d))
            };
            a.addMenuItems = function (a) {
                for (var b in a)this.addMenuItem(b, a[b])
            };
            a.getMenuItem = function (a) {
                return c[a]
            };
            a.removeMenuItem = function (a) {
                delete c[a]
            }
        }
    }),function () {
        function a(a) {
            a.sort(function (a, b) {
                return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
            })
        }

        var e = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1"_cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked}';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var e = e + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'), b = CKEDITOR.addTemplate("menuItem", e + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e'),
            c = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function (a, b) {
                b = this._.definition = b || {};
                this.id = CKEDITOR.tools.getNextId();
                this.editor = a;
                this.items = [];
                this._.listeners = [];
                this._.level = b.level || 1;
                var c = CKEDITOR.tools.extend({}, b.panel, {
                    css: [CKEDITOR.skin.getPath("editor")],
                    level: this._.level - 1,
                    block: {}
                }), e = c.block.attributes = c.attributes || {};
                !e.role && (e.role = "menu");
                this._.panelDefinition =
                    c
            }, _: {
                onShow: function () {
                    var a = this.editor.getSelection(), b = a && a.getStartElement(), c = this.editor.elementPath(), e = this._.listeners;
                    this.removeAll();
                    for (var h = 0; h < e.length; h++) {
                        var k = e[h](b, a, c);
                        if (k)for (var g in k) {
                            var n = this.editor.getMenuItem(g);
                            !n || n.command && !this.editor.getCommand(n.command).state || (n.state = k[g], this.add(n))
                        }
                    }
                }, onClick: function (a) {
                    this.hide();
                    if (a.onClick)a.onClick(); else a.command && this.editor.execCommand(a.command)
                }, onEscape: function (a) {
                    var b = this.parent;
                    b ? b._.panel.hideChild(1) :
                    27 == a && this.hide(1);
                    return !1
                }, onHide: function () {
                    this.onHide && this.onHide()
                }, showSubMenu: function (a) {
                    var b = this._.subMenu, c = this.items[a];
                    if (c = c.getItems && c.getItems()) {
                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {level: this._.level + 1}, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
                        for (var e in c) {
                            var h = this.editor.getMenuItem(e);
                            h && (h.state = c[e], b.add(h))
                        }
                        var k = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                            String(a));
                        setTimeout(function () {
                            b.show(k, 2)
                        }, 0)
                    } else this._.panel.hideChild(1)
                }
            }, proto: {
                add: function (a) {
                    a.order || (a.order = this.items.length);
                    this.items.push(a)
                }, removeAll: function () {
                    this.items = []
                }, show: function (b, c, e, f) {
                    if (!this.parent && (this._.onShow(), !this.items.length))return;
                    c = c || ("rtl" == this.editor.lang.dir ? 2 : 1);
                    var h = this.items, k = this.editor, g = this._.panel, n = this._.element;
                    if (!g) {
                        g = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                        g.onEscape = CKEDITOR.tools.bind(function (a) {
                            if (!1 === this._.onEscape(a))return !1
                        }, this);
                        g.onShow = function () {
                            g._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
                        };
                        g.onHide = CKEDITOR.tools.bind(function () {
                            this._.onHide && this._.onHide()
                        }, this);
                        n = g.addBlock(this.id, this._.panelDefinition.block);
                        n.autoSize = !0;
                        var p = n.keys;
                        p[40] = "next";
                        p[9] = "next";
                        p[38] = "prev";
                        p[CKEDITOR.SHIFT + 9] = "prev";
                        p["rtl" == k.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                        p[32] = CKEDITOR.env.ie ? "mouseup" :
                            "click";
                        CKEDITOR.env.ie && (p[13] = "mouseup");
                        n = this._.element = n.element;
                        p = n.getDocument();
                        p.getBody().setStyle("overflow", "hidden");
                        p.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                        this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
                            clearTimeout(this._.showSubTimeout);
                            this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, k.config.menu_subMenuDelay || 400, this, [a])
                        }, this);
                        this._.itemOutFn = CKEDITOR.tools.addFunction(function () {
                            clearTimeout(this._.showSubTimeout)
                        }, this);
                        this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) {
                            var b = this.items[a];
                            if (b.state == CKEDITOR.TRISTATE_DISABLED)this.hide(1); else if (b.getItems)this._.showSubMenu(a); else this._.onClick(b)
                        }, this)
                    }
                    a(h);
                    for (var p = k.elementPath(), p = ['\x3cdiv class\x3d"cke_menu' + (p && p.direction() != k.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], u = h.length, v = u && h[0].group, t = 0; t < u; t++) {
                        var r = h[t];
                        v != r.group && (p.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
                            v = r.group);
                        r.render(this, t, p)
                    }
                    p.push("\x3c/div\x3e");
                    n.setHtml(p.join(""));
                    CKEDITOR.ui.fire("ready", this);
                    this.parent ? this.parent._.panel.showAsChild(g, this.id, b, c, e, f) : g.showBlock(this.id, b, c, e, f);
                    k.fire("menuShow", [g])
                }, addListener: function (a) {
                    this._.listeners.push(a)
                }, hide: function (a) {
                    this._.onHide && this._.onHide();
                    this._.panel && this._.panel.hide(a)
                }
            }
        });
        CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function (a, b, c) {
                CKEDITOR.tools.extend(this, c, {order: 0, className: "cke_menubutton__" + b});
                this.group =
                    a._.menuGroups[this.group];
                this.editor = a;
                this.name = b
            }, proto: {
                render: function (a, e, m) {
                    var f = a.id + String(e), h = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, k = "", g = h == CKEDITOR.TRISTATE_ON ? "on" : h == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                    this.role in {
                        menuitemcheckbox: 1,
                        menuitemradio: 1
                    } && (k = ' aria-checked\x3d"' + (h == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                    var n = this.getItems, p = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", u = this.name;
                    this.icon && !/\./.test(this.icon) && (u =
                        this.icon);
                    a = {
                        id: f,
                        name: this.name,
                        iconName: u,
                        label: this.label,
                        cls: this.className || "",
                        state: g,
                        hasPopup: n ? "true" : "false",
                        disabled: h == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label,
                        href: "javascript:void('" + (this.label || "").replace("'") + "')",
                        hoverFn: a._.itemOverFn,
                        moveOutFn: a._.itemOutFn,
                        clickFn: a._.itemClickFn,
                        index: e,
                        iconStyle: CKEDITOR.skin.getIconStyle(u, "rtl" == this.editor.lang.dir, u == this.icon ? null : this.icon, this.iconOffset),
                        arrowHtml: n ? c.output({label: p}) : "",
                        role: this.role ? this.role : "menuitem",
                        ariaChecked: k
                    };
                    b.output(a, m)
                }
            }
        })
    }(),CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu", {
        requires: "menu", onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (a) {
                    this.base.call(this, a, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {"aria-label": a.lang.contextmenu.options}
                        }
                    })
                }, proto: {
                    addTarget: function (a,
                                         e) {
                        a.on("contextmenu", function (a) {
                            a = a.data;
                            var c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                            if (!e || !c) {
                                a.preventDefault();
                                if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                    var c = this.editor, m = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function (a) {
                                        return a.hasAttribute("contenteditable")
                                    }, !0);
                                    m && "false" == m.getAttribute("contenteditable") && c.getSelection().fake(m)
                                }
                                var m = a.getTarget().getDocument(), f = a.getTarget().getDocument().getDocumentElement(), c = !m.equals(CKEDITOR.document),
                                    m = m.getWindow().getScrollPosition(), h = c ? a.$.clientX : a.$.pageX || m.x + a.$.clientX, k = c ? a.$.clientY : a.$.pageY || m.y + a.$.clientY;
                                CKEDITOR.tools.setTimeout(function () {
                                    this.open(f, null, h, k)
                                }, CKEDITOR.env.ie ? 200 : 0, this)
                            }
                        }, this);
                        if (CKEDITOR.env.webkit) {
                            var b, c = function () {
                                b = 0
                            };
                            a.on("keydown", function (a) {
                                b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
                            });
                            a.on("keyup", c);
                            a.on("contextmenu", c)
                        }
                    }, open: function (a, e, b, c) {
                        this.editor.focus();
                        a = a || CKEDITOR.document.getDocumentElement();
                        this.editor.selectionChange(1);
                        this.show(a, e, b, c)
                    }
                }
            })
        }, beforeInit: function (a) {
            var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
            a.on("contentDom", function () {
                e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl)
            });
            a.addCommand("contextMenu", {
                exec: function () {
                    a.contextMenu.open(a.document.getBody())
                }
            });
            a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
            a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    }),function () {
        function a(a) {
            var b = this.att;
            a = a && a.hasAttribute(b) && a.getAttribute(b) || "";
            void 0 !== a && this.setValue(a)
        }

        function e() {
            for (var a, b = 0; b < arguments.length; b++)if (arguments[b] instanceof CKEDITOR.dom.element) {
                a = arguments[b];
                break
            }
            if (a) {
                var b = this.att, e = this.getValue();
                e ? a.setAttribute(b, e) : a.removeAttribute(b, e)
            }
        }

        var b = {id: 1, dir: 1, classes: 1, styles: 1};
        CKEDITOR.plugins.add("dialogadvtab", {
            requires: "dialog", allowedContent: function (a) {
                a || (a = b);
                var d = [];
                a.id && d.push("id");
                a.dir && d.push("dir");
                var e = "";
                d.length && (e += "[" + d.join(",") + "]");
                a.classes && (e += "(*)");
                a.styles && (e += "{*}");
                return e
            }, createAdvancedTab: function (c,
                                            d, l) {
                d || (d = b);
                var m = c.lang.common, f = {
                    id: "advanced",
                    label: m.advancedTab,
                    title: m.advancedTab,
                    elements: [{type: "vbox", padding: 1, children: []}]
                }, h = [];
                if (d.id || d.dir)d.id && h.push({
                    id: "advId",
                    att: "id",
                    type: "text",
                    requiredContent: l ? l + "[id]" : null,
                    label: m.id,
                    setup: a,
                    commit: e
                }), d.dir && h.push({
                    id: "advLangDir",
                    att: "dir",
                    type: "select",
                    requiredContent: l ? l + "[dir]" : null,
                    label: m.langDir,
                    "default": "",
                    style: "width:100%",
                    items: [[m.notSet, ""], [m.langDirLTR, "ltr"], [m.langDirRTL, "rtl"]],
                    setup: a,
                    commit: e
                }), f.elements[0].children.push({
                    type: "hbox",
                    widths: ["50%", "50%"], children: [].concat(h)
                });
                if (d.styles || d.classes)h = [], d.styles && h.push({
                    id: "advStyles",
                    att: "style",
                    type: "text",
                    requiredContent: l ? l + "{cke-xyz}" : null,
                    label: m.styles,
                    "default": "",
                    validate: CKEDITOR.dialog.validate.inlineStyle(m.invalidInlineStyle),
                    onChange: function () {
                    },
                    getStyle: function (a, b) {
                        var c = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i"));
                        return c ? c[1] : b
                    },
                    updateStyle: function (a, b) {
                        var d = this.getValue(), e = c.document.createElement("span");
                        e.setAttribute("style",
                            d);
                        e.setStyle(a, b);
                        d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
                        this.setValue(d, 1)
                    },
                    setup: a,
                    commit: e
                }), d.classes && h.push({
                    type: "hbox",
                    widths: ["45%", "55%"],
                    children: [{
                        id: "advCSSClasses",
                        att: "class",
                        type: "text",
                        requiredContent: l ? l + "(cke-xyz)" : null,
                        label: m.cssClasses,
                        "default": "",
                        setup: a,
                        commit: e
                    }]
                }), f.elements[0].children.push({type: "hbox", widths: ["50%", "50%"], children: [].concat(h)});
                return f
            }
        })
    }(),function () {
        CKEDITOR.plugins.add("div", {
            requires: "dialog", init: function (a) {
                if (!a.blockless) {
                    var e =
                        a.lang.div, b = "div(*)";
                    CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
                    a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                        allowedContent: b,
                        requiredContent: "div",
                        contextSensitive: !0,
                        refresh: function (a, b) {
                            this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    }));
                    a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", {requiredContent: "div"}));
                    a.addCommand("removediv", {
                        requiredContent: "div",
                        exec: function (a) {
                            function b(d) {
                                (d = CKEDITOR.plugins.div.getSurroundDiv(a, d)) && !d.data("cke-div-added") && (k.push(d), d.data("cke-div-added"))
                            }

                            for (var e = a.getSelection(), m = e && e.getRanges(), f, h = e.createBookmarks(), k = [], g = 0; g < m.length; g++)f = m[g], f.collapsed ? b(e.getStartElement()) : (f = new CKEDITOR.dom.walker(f), f.evaluator = b, f.lastForward());
                            for (g = 0; g < k.length; g++)k[g].remove(!0);
                            e.selectBookmarks(h)
                        }
                    });
                    a.ui.addButton && a.ui.addButton("CreateDiv", {
                        label: e.toolbar,
                        command: "creatediv",
                        toolbar: "blocks,50"
                    });
                    a.addMenuItems && (a.addMenuItems({
                        editdiv: {
                            label: e.edit,
                            command: "editdiv",
                            group: "div",
                            order: 1
                        }, removediv: {label: e.remove, command: "removediv", group: "div", order: 5}
                    }), a.contextMenu && a.contextMenu.addListener(function (b) {
                        return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
                            editdiv: CKEDITOR.TRISTATE_OFF,
                            removediv: CKEDITOR.TRISTATE_OFF
                        } : null
                    }));
                    CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
                    CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                }
            }
        });
        CKEDITOR.plugins.div = {
            getSurroundDiv: function (a,
                                      e) {
                var b = a.elementPath(e);
                return a.elementPath(b.blockLimit).contains(function (a) {
                    return a.is("div") && !a.isReadOnly()
                }, 1)
            }
        }
    }(),function () {
        function a(a, b) {
            function m(b) {
                b = g.list[b];
                var c;
                b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (c = a.createRange(), c.selectNodeContents(b), c = c.select()) : (c = a.getSelection(), c.selectElement(b));
                CKEDITOR.env.ie && a.fire("selectionChange", {selection: c, path: new CKEDITOR.dom.elementPath(b)});
                a.focus()
            }

            function f() {
                k && k.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                delete g.list
            }

            var h = a.ui.spaceId("path"), k, g = a._.elementsPath, n = g.idBase;
            b.html += '\x3cspan id\x3d"' + h + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + h + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + h + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
            a.on("uiReady", function () {
                var b = a.ui.space("path");
                b && a.focusManager.add(b, 1)
            });
            g.onClick = m;
            var p = CKEDITOR.tools.addFunction(m), u = CKEDITOR.tools.addFunction(function (b,
                                                                                            c) {
                var e = g.idBase, f;
                c = new CKEDITOR.dom.event(c);
                f = "rtl" == a.lang.dir;
                switch (c.getKeystroke()) {
                    case f ? 39 : 37:
                    case 9:
                        return (f = CKEDITOR.document.getById(e + (b + 1))) || (f = CKEDITOR.document.getById(e + "0")), f.focus(), !1;
                    case f ? 37 : 39:
                    case CKEDITOR.SHIFT + 9:
                        return (f = CKEDITOR.document.getById(e + (b - 1))) || (f = CKEDITOR.document.getById(e + (g.list.length - 1))), f.focus(), !1;
                    case 27:
                        return a.focus(), !1;
                    case 13:
                    case 32:
                        return m(b), !1
                }
                return !0
            });
            a.on("selectionChange", function () {
                for (var b = [], e = g.list = [], f = [], l = g.filters, m =
                    !0, B = a.elementPath().elements, w, y = B.length; y--;) {
                    var C = B[y], x = 0;
                    w = C.data("cke-display-name") ? C.data("cke-display-name") : C.data("cke-real-element-type") ? C.data("cke-real-element-type") : C.getName();
                    (m = C.hasAttribute("contenteditable") ? "true" == C.getAttribute("contenteditable") : m) || C.hasAttribute("contenteditable") || (x = 1);
                    for (var z = 0; z < l.length; z++) {
                        var D = l[z](C, w);
                        if (!1 === D) {
                            x = 1;
                            break
                        }
                        w = D || w
                    }
                    x || (e.unshift(C), f.unshift(w))
                }
                e = e.length;
                for (l = 0; l < e; l++)w = f[l], m = a.lang.elementspath.eleTitle.replace(/%1/,
                    w), w = c.output({
                    id: n + l,
                    label: m,
                    text: w,
                    jsTitle: "javascript:void('" + w + "')",
                    index: l,
                    keyDownFn: u,
                    clickFn: p
                }), b.unshift(w);
                k || (k = CKEDITOR.document.getById(h));
                f = k;
                f.setHtml(b.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                a.fire("elementsPathUpdate", {space: f})
            });
            a.on("readOnly", f);
            a.on("contentDomUnload", f);
            a.addCommand("elementsPathFocus", e.toolbarFocus);
            a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        }

        var e = {
            toolbarFocus: {
                editorFocus: !1, readOnly: 1, exec: function (a) {
                    (a = CKEDITOR.document.getById(a._.elementsPath.idBase +
                        "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
                }
            }
        }, b = "";
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var c = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + b + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
        CKEDITOR.plugins.add("elementspath", {
            init: function (b) {
                b._.elementsPath = {idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: []};
                b.on("uiSpace", function (c) {
                    "bottom" == c.data.space && a(b, c.data)
                })
            }
        })
    }(),function () {
        function a(a, b, c) {
            c = a.config.forceEnterMode || c;
            "wysiwyg" == a.mode && (b || (b = a.activeEnterMode), a.elementPath().isContextFor("p") || (b = CKEDITOR.ENTER_BR, c = 1), a.fire("saveSnapshot"), b == CKEDITOR.ENTER_BR ? m(a, b, null, c) : f(a, b, null, c), a.fire("saveSnapshot"))
        }

        function e(a) {
            a = a.getSelection().getRanges(!0);
            for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents();
            return a[0]
        }

        function b(a) {
            var b = a.startContainer.getAscendant(function (a) {
                return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
            }, !0);
            if (a.root.equals(b))return a;
            b = new CKEDITOR.dom.range(b);
            b.moveToRange(a);
            return b
        }

        CKEDITOR.plugins.add("enterkey", {
            init: function (b) {
                b.addCommand("enter", {
                    modes: {wysiwyg: 1}, editorFocus: !1, exec: function (b) {
                        a(b)
                    }
                });
                b.addCommand("shiftEnter", {
                    modes: {wysiwyg: 1}, editorFocus: !1, exec: function (b) {
                        a(b,
                            b.activeShiftEnterMode, 1)
                    }
                });
                b.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
            }
        });
        var c = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function (a, f, l, p) {
                if (l = l || e(a)) {
                    l = b(l);
                    var u = l.document, v = l.checkStartOfBlock(), t = l.checkEndOfBlock(), r = a.elementPath(l.startContainer), q = r.block, A = f == CKEDITOR.ENTER_DIV ? "div" : "p", B;
                    if (v && t) {
                        if (q && (q.is("li") || q.getParent().is("li"))) {
                            q.is("li") || (q = q.getParent());
                            l = q.getParent();
                            B = l.getParent();
                            p = !q.hasPrevious();
                            var w = !q.hasNext(), A = a.getSelection(), y = A.createBookmarks(), v = q.getDirection(1), t = q.getAttribute("class"), C = q.getAttribute("style"), x = B.getDirection(1) != v;
                            a = a.enterMode != CKEDITOR.ENTER_BR || x || C || t;
                            if (B.is("li"))p || w ? (p && w && l.remove(), q[w ? "insertAfter" : "insertBefore"](B)) : q.breakParent(B); else {
                                if (a)if (r.block.is("li") ? (B = u.createElement(f == CKEDITOR.ENTER_P ? "p" : "div"), x && B.setAttribute("dir", v), C && B.setAttribute("style", C), t && B.setAttribute("class", t), q.moveChildren(B)) : B = r.block,
                                    p || w)B[p ? "insertBefore" : "insertAfter"](l); else q.breakParent(l), B.insertAfter(l); else if (q.appendBogus(!0), p || w)for (; u = q[p ? "getFirst" : "getLast"]();)u[p ? "insertBefore" : "insertAfter"](l); else for (q.breakParent(l); u = q.getLast();)u.insertAfter(l);
                                q.remove()
                            }
                            A.selectBookmarks(y);
                            return
                        }
                        if (q && q.getParent().is("blockquote")) {
                            q.breakParent(q.getParent());
                            q.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || q.getPrevious().remove();
                            q.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || q.getNext().remove();
                            l.moveToElementEditStart(q);
                            l.select();
                            return
                        }
                    } else if (q && q.is("pre") && !t) {
                        m(a, f, l, p);
                        return
                    }
                    if (v = l.splitBlock(A)) {
                        f = v.previousBlock;
                        q = v.nextBlock;
                        r = v.wasStartOfBlock;
                        a = v.wasEndOfBlock;
                        q ? (y = q.getParent(), y.is("li") && (q.breakParent(y), q.move(q.getNext(), 1))) : f && (y = f.getParent()) && y.is("li") && (f.breakParent(y), y = f.getNext(), l.moveToElementEditStart(y), f.move(f.getPrevious()));
                        if (r || a) {
                            if (f) {
                                if (f.is("li") || !h.test(f.getName()) && !f.is("pre"))B = f.clone()
                            } else q && (B = q.clone());
                            B ? p && !B.is("li") && B.renameNode(A) :
                                y && y.is("li") ? B = y : (B = u.createElement(A), f && (w = f.getDirection()) && B.setAttribute("dir", w));
                            if (u = v.elementPath)for (p = 0, A = u.elements.length; p < A; p++) {
                                y = u.elements[p];
                                if (y.equals(u.block) || y.equals(u.blockLimit))break;
                                CKEDITOR.dtd.$removeEmpty[y.getName()] && (y = y.clone(), B.moveChildren(y), B.append(y))
                            }
                            B.appendBogus();
                            B.getParent() || l.insertNode(B);
                            B.is("li") && B.removeAttribute("value");
                            !CKEDITOR.env.ie || !r || a && f.getChildCount() || (l.moveToElementEditStart(a ? f : B), l.select());
                            l.moveToElementEditStart(r && !a ?
                                q : B)
                        } else q.is("li") && (B = l.clone(), B.selectNodeContents(q), B = new CKEDITOR.dom.walker(B), B.evaluator = function (a) {
                            return !(d(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                        }, (y = B.next()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? u.createElement("br") : u.createText(" ")).insertBefore(y)), q && l.moveToElementEditStart(q);
                        l.select();
                        l.scrollIntoView()
                    }
                }
            }, enterBr: function (a, b, c, d) {
                if (c = c || e(a)) {
                    var l = c.document,
                        m = c.checkEndOfBlock(), t = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), r = t.block, q = r && t.block.getName();
                    d || "li" != q ? (!d && m && h.test(q) ? (m = r.getDirection()) ? (l = l.createElement("div"), l.setAttribute("dir", m), l.insertAfter(r), c.setStart(l, 0)) : (l.createElement("br").insertAfter(r), CKEDITOR.env.gecko && l.createText("").insertAfter(r), c.setStartAt(r.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == q && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ?
                        l.createText("\r") : l.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (l.createText("﻿").insertAfter(a), m && (r || t.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : f(a, b, c, d)
                }
            }
        };
        var l = CKEDITOR.plugins.enterkey, m = l.enterBr, f = l.enterBlock, h = /^h[1-6]$/
    }(),function () {
        function a(a, b) {
            var c = {}, d = [], l = {
                nbsp: " ", shy: "­", gt: "\x3e",
                lt: "\x3c", amp: "\x26", apos: "'", quot: '"'
            };
            a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, e) {
                var f = b ? "\x26" + e + ";" : l[e];
                c[f] = b ? l[e] : "\x26" + e + ";";
                d.push(f);
                return ""
            });
            if (!b && a) {
                a = a.split(",");
                var m = document.createElement("div"), f;
                m.innerHTML = "\x26" + a.join(";\x26") + ";";
                f = m.innerHTML;
                m = null;
                for (m = 0; m < f.length; m++) {
                    var h = f.charAt(m);
                    c[h] = "\x26" + a[m] + ";";
                    d.push(h)
                }
            }
            c.regex = d.join(b ? "|" : "");
            return c
        }

        CKEDITOR.plugins.add("entities", {
            afterInit: function (e) {
                function b(a) {
                    return h[a]
                }

                function c(a) {
                    return "force" !=
                    d.entities_processNumerical && m[a] ? m[a] : "\x26#" + a.charCodeAt(0) + ";"
                }

                var d = e.config;
                if (e = (e = e.dataProcessor) && e.htmlFilter) {
                    var l = [];
                    !1 !== d.basicEntities && l.push("nbsp,gt,lt,amp");
                    d.entities && (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                    d.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), d.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                    d.entities_additional && l.push(d.entities_additional));
                    var m = a(l.join(",")), f = m.regex ? "[" + m.regex + "]" : "a^";
                    delete m.regex;
                    d.entities && d.entities_processNumerical && (f = "[^ -~]|" + f);
                    var f = new RegExp(f, "g"), h = a("nbsp,gt,lt,amp,shy", !0), k = new RegExp(h.regex, "g");
                    e.addRules({
                        text: function (a) {
                            return a.replace(k, b).replace(f, c)
                        }
                    }, {applyToAll: !0, excludeNestedEditable: !0})
                }
            }
        })
    }(),CKEDITOR.config.basicEntities = !0,CKEDITOR.config.entities = !0,CKEDITOR.config.entities_latin = !0,CKEDITOR.config.entities_greek = !0,
        CKEDITOR.config.entities_additional = "#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (a, e, b, c) {
            e = e || "80%";
            b = b || "70%";
            "string" == typeof e && 1 < e.length && "%" == e.substr(e.length - 1, 1) && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10));
            "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
            640 > e && (e = 640);
            420 > b && (b = 420);
            var d = parseInt((window.screen.height - b) / 2, 10), l = parseInt((window.screen.width -
                e) / 2, 10);
            c = (c || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + e + ",height\x3d" + b + ",top\x3d" + d + ",left\x3d" + l;
            var m = window.open("", null, c, !0);
            if (!m)return !1;
            try {
                -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (m.moveTo(l, d), m.resizeTo(e, b)), m.focus(), m.location.href = a
            } catch (f) {
                window.open(a, null, c, !0)
            }
            return !0
        }
    }),function () {
        function a(a, b) {
            var c = [];
            if (b)for (var d in b)c.push(d +
                "\x3d" + encodeURIComponent(b[d])); else return a;
            return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26")
        }

        function e(a) {
            a += "";
            return a.charAt(0).toUpperCase() + a.substr(1)
        }

        function b() {
            var b = this.getDialog(), c = b.getParentEditor();
            c._.filebrowserSe = this;
            var d = c.config["filebrowser" + e(b.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%", b = c.config["filebrowser" + e(b.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%", f = this.filebrowser.params || {};
            f.CKEditor = c.name;
            f.CKEditorFuncNum =
                c._.filebrowserFn;
            f.langCode || (f.langCode = c.langCode);
            f = a(this.filebrowser.url, f);
            c.popup(f, d, b, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
        }

        function c() {
            var a = this.getDialog();
            a.getParentEditor()._.filebrowserSe = this;
            return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
        }

        function d(b, c, d) {
            var e = d.params || {};
            e.CKEditor = b.name;
            e.CKEditorFuncNum = b._.filebrowserFn;
            e.langCode ||
            (e.langCode = b.langCode);
            c.action = a(d.url, e);
            c.filebrowser = d
        }

        function l(a, f, g, m) {
            if (m && m.length)for (var p, u = m.length; u--;)if (p = m[u], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(a, f, g, p.children), p.filebrowser)if ("string" == typeof p.filebrowser && (p.filebrowser = {
                    action: "fileButton" == p.type ? "QuickUpload" : "Browse",
                    target: p.filebrowser
                }), "Browse" == p.filebrowser.action) {
                var v = p.filebrowser.url;
                void 0 === v && (v = a.config["filebrowser" + e(f) + "BrowseUrl"], void 0 === v && (v = a.config.filebrowserBrowseUrl));
                v && (p.onClick = b, p.filebrowser.url = v, p.hidden = !1)
            } else if ("QuickUpload" == p.filebrowser.action && p["for"] && (v = p.filebrowser.url, void 0 === v && (v = a.config["filebrowser" + e(f) + "UploadUrl"], void 0 === v && (v = a.config.filebrowserUploadUrl)), v)) {
                var t = p.onClick;
                p.onClick = function (a) {
                    var b = a.sender;
                    if (t && !1 === t.call(b, a))return !1;
                    if (c.call(b, a)) {
                        a = b.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement();
                        if (b = new CKEDITOR.dom.element(a.$.form))(a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) :
                            (a = new CKEDITOR.dom.element("input"), a.setAttributes({
                                name: "ckCsrfToken",
                                type: "hidden"
                            }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken());
                        return !0
                    }
                    return !1
                };
                p.filebrowser.url = v;
                p.hidden = !1;
                d(a, g.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
            }
        }

        function m(a, b, c) {
            if (-1 !== c.indexOf(";")) {
                c = c.split(";");
                for (var d = 0; d < c.length; d++)if (m(a, b, c[d]))return !0;
                return !1
            }
            return (a = a.getContents(b).get(c).filebrowser) && a.url
        }

        function f(a, b) {
            var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"],
                e = this._.filebrowserSe.filebrowser.onSelect;
            d && c.getContentElement(d[0], d[1]).reset();
            if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe))if (!e || !1 !== e.call(this._.filebrowserSe, a, b))if ("string" == typeof b && b && alert(b), a && (d = this._.filebrowserSe, c = d.getDialog(), d = d.filebrowser.target || null))if (d = d.split(":"), e = c.getContentElement(d[0], d[1]))e.setValue(a), c.selectPage(d[0])
        }

        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup", init: function (a) {
                a._.filebrowserFn = CKEDITOR.tools.addFunction(f, a);
                a.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function (a) {
            if (a.editor.plugins.filebrowser)for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)if (c = b.contents[d])l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !m(b, c.id, c.filebrowser))
        })
    }(),CKEDITOR.plugins.add("find", {
        requires: "dialog", init: function (a) {
            var e = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
            e.canUndo = !1;
            e.readOnly = 1;
            a.addCommand("replace",
                new CKEDITOR.dialogCommand("replace")).canUndo = !1;
            a.ui.addButton && (a.ui.addButton("Find", {
                label: a.lang.find.find,
                command: "find",
                toolbar: "find,10"
            }), a.ui.addButton("Replace", {label: a.lang.find.replace, command: "replace", toolbar: "find,20"}));
            CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
            CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
        }
    }),CKEDITOR.config.find_highlight = {
        element: "span",
        styles: {"background-color": "#004", color: "#fff"}
    },function () {
        function a(a, b) {
            var d = c.exec(a), e = c.exec(b);
            if (d) {
                if (!d[2] && "px" == e[2])return e[1];
                if ("px" == d[2] && !e[2])return e[1] + "px"
            }
            return b
        }

        var e = CKEDITOR.htmlParser.cssStyle, b = CKEDITOR.tools.cssLength, c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, d = {
            elements: {
                $: function (b) {
                    var c = b.attributes;
                    if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
                        var d = (new e(b)).rules;
                        b = c.attributes;
                        var h = d.width, d = d.height;
                        h && (b.width = a(b.width, h));
                        d && (b.height = a(b.height,
                            d))
                    }
                    return c
                }
            }
        };
        CKEDITOR.plugins.add("fakeobjects", {
            init: function (a) {
                a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
            }, afterInit: function (a) {
                (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(d, {applyToAll: !0})
            }
        });
        CKEDITOR.editor.prototype.createFakeElement = function (a, c, d, h) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown;
            c = {
                "class": c,
                "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                "data-cke-real-node-type": a.type,
                alt: k,
                title: k,
                align: a.getAttribute("align") ||
                ""
            };
            CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
            d && (c["data-cke-real-element-type"] = d);
            h && (c["data-cke-resizable"] = h, d = new e, h = a.getAttribute("width"), a = a.getAttribute("height"), h && (d.rules.width = b(h)), a && (d.rules.height = b(a)), d.populate(c));
            return this.document.createElement("img", {attributes: c})
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function (a, c, d, h) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown, g;
            g = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(g);
            g = g.getHtml();
            c =
            {
                "class": c,
                "data-cke-realelement": encodeURIComponent(g),
                "data-cke-real-node-type": a.type,
                alt: k,
                title: k,
                align: a.attributes.align || ""
            };
            CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
            d && (c["data-cke-real-element-type"] = d);
            h && (c["data-cke-resizable"] = h, h = a.attributes, a = new e, d = h.width, h = h.height, void 0 !== d && (a.rules.width = b(d)), void 0 !== h && (a.rules.height = b(h)), a.populate(c));
            return new CKEDITOR.htmlParser.element("img", c)
        };
        CKEDITOR.editor.prototype.restoreRealElement = function (b) {
            if (b.data("cke-real-node-type") !=
                CKEDITOR.NODE_ELEMENT)return null;
            var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
            if (b.data("cke-resizable")) {
                var d = b.getStyle("width");
                b = b.getStyle("height");
                d && c.setAttribute("width", a(c.getAttribute("width"), d));
                b && c.setAttribute("height", a(c.getAttribute("height"), b))
            }
            return c
        }
    }(),function () {
        function a(a) {
            a = a.attributes;
            return "application/x-shockwave-flash" == a.type || b.test(a.src || "")
        }

        function e(a, b) {
            return a.createFakeParserElement(b, "cke_flash",
                "flash", !0)
        }

        var b = /\.swf(?:$|\?)/i;
        CKEDITOR.plugins.add("flash", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
            }, init: function (a) {
                var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
                CKEDITOR.dialog.isTabEnabled(a,
                    "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
                CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)");
                a.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
                    allowedContent: b,
                    requiredContent: "embed"
                }));
                a.ui.addButton && a.ui.addButton("Flash", {
                    label: a.lang.common.flash,
                    command: "flash",
                    toolbar: "insert,20"
                });
                CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
                a.addMenuItems && a.addMenuItems({
                    flash: {
                        label: a.lang.flash.properties,
                        command: "flash", group: "flash"
                    }
                });
                a.on("doubleclick", function (a) {
                    var b = a.data.element;
                    b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash")
                });
                a.contextMenu && a.contextMenu.addListener(function (a) {
                    if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type"))return {flash: CKEDITOR.TRISTATE_OFF}
                })
            }, afterInit: function (b) {
                var d = b.dataProcessor;
                (d = d && d.dataFilter) && d.addRules({
                    elements: {
                        "cke:object": function (d) {
                            var m = d.attributes;
                            if (!(m.classid && String(m.classid).toLowerCase() ||
                                a(d))) {
                                for (m = 0; m < d.children.length; m++)if ("cke:embed" == d.children[m].name) {
                                    if (!a(d.children[m]))break;
                                    return e(b, d)
                                }
                                return null
                            }
                            return e(b, d)
                        }, "cke:embed": function (d) {
                            return a(d) ? e(b, d) : null
                        }
                    }
                }, 5)
            }
        })
    }(),CKEDITOR.tools.extend(CKEDITOR.config, {
        flashEmbedTagOnly: !1,
        flashAddEmbedTag: !0,
        flashConvertOnEdit: !1
    }),function () {
        function a(a) {
            var d = a.config, l = a.fire("uiSpace", {space: "top", html: ""}).html, m = function () {
                function f(a, c, d) {
                    h.setStyle(c, b(d));
                    h.setStyle("position", a)
                }

                function g(a) {
                    var b = k.getDocumentPosition();
                    switch (a) {
                        case "top":
                            f("absolute", "top", b.y - A - y);
                            break;
                        case "pin":
                            f("fixed", "top", x);
                            break;
                        case "bottom":
                            f("absolute", "top", b.y + (r.height || r.bottom - r.top) + y)
                    }
                    l = a
                }

                var l, k, t, r, q, A, B, w = d.floatSpaceDockedOffsetX || 0, y = d.floatSpaceDockedOffsetY || 0, C = d.floatSpacePinnedOffsetX || 0, x = d.floatSpacePinnedOffsetY || 0;
                return function (f) {
                    if (k = a.editable()) {
                        var n = f && "focus" == f.name;
                        n && h.show();
                        a.fire("floatingSpaceLayout", {show: n});
                        h.removeStyle("left");
                        h.removeStyle("right");
                        t = h.getClientRect();
                        r = k.getClientRect();
                        q = e.getViewPaneSize();
                        A = t.height;
                        B = "pageXOffset" in e.$ ? e.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                        l ? (A + y <= r.top ? g("top") : A + y > q.height - r.bottom ? g("pin") : g("bottom"), f = q.width / 2, f = d.floatSpacePreferRight ? "right" : 0 < r.left && r.right < q.width && r.width > t.width ? "rtl" == d.contentsLangDirection ? "right" : "left" : f - r.left > r.right - f ? "left" : "right", t.width > q.width ? (f = "left", n = 0) : (n = "left" == f ? 0 < r.left ? r.left : 0 : r.right < q.width ? q.width - r.right : 0, n + t.width > q.width && (f = "left" == f ? "right" : "left", n = 0)),
                            h.setStyle(f, b(("pin" == l ? C : w) + n + ("pin" == l ? 0 : "left" == f ? B : -B)))) : (l = "pin", g("pin"), m(f))
                    }
                }
            }();
            if (l) {
                var f = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' :
                        " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), h = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(f.output({
                    content: l,
                    id: a.id,
                    langDir: a.lang.dir,
                    langCode: a.langCode,
                    name: a.name,
                    style: "display:none;z-index:" + (d.baseFloatZIndex - 1),
                    topId: a.ui.spaceId("top"),
                    voiceLabel: a.title
                }))), k = CKEDITOR.tools.eventsBuffer(500, m), g = CKEDITOR.tools.eventsBuffer(100, m);
                h.unselectable();
                h.on("mousedown",
                    function (a) {
                        a = a.data;
                        a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                    });
                a.on("focus", function (b) {
                    m(b);
                    a.on("change", k.input);
                    e.on("scroll", g.input);
                    e.on("resize", g.input)
                });
                a.on("blur", function () {
                    h.hide();
                    a.removeListener("change", k.input);
                    e.removeListener("scroll", g.input);
                    e.removeListener("resize", g.input)
                });
                a.on("destroy", function () {
                    e.removeListener("scroll", g.input);
                    e.removeListener("resize", g.input);
                    h.clearCustomData();
                    h.remove()
                });
                a.focusManager.hasFocus && h.show();
                a.focusManager.add(h,
                    1)
            }
        }

        var e = CKEDITOR.document.getWindow(), b = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", {
            init: function (b) {
                b.on("loaded", function () {
                    a(this)
                }, null, null, 20)
            }
        })
    }(),CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), e = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
                b = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), c = /\'/g;
            CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) {
                return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
            };
            CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (a, b) {
                    b = b || {};
                    var c = b.attributes || (b.attributes = {});
                    (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0);
                    !c.role &&
                    (c.role = "listbox");
                    this.base.apply(this, arguments);
                    this.element.setAttribute("role", c.role);
                    c = this.keys;
                    c[40] = "next";
                    c[9] = "next";
                    c[38] = "prev";
                    c[CKEDITOR.SHIFT + 9] = "prev";
                    c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                    CKEDITOR.env.ie && (c[13] = "mouseup");
                    this._.pendingHtml = [];
                    this._.pendingList = [];
                    this._.items = {};
                    this._.groups = {}
                }, _: {
                    close: function () {
                        if (this._.started) {
                            var b = a.output({items: this._.pendingList.join("")});
                            this._.pendingList = [];
                            this._.pendingHtml.push(b);
                            delete this._.started
                        }
                    }, getClick: function () {
                        this._.click ||
                        (this._.click = CKEDITOR.tools.addFunction(function (a) {
                            var b = this.toggle(a);
                            if (this.onClick)this.onClick(a, b)
                        }, this));
                        return this._.click
                    }
                }, proto: {
                    add: function (a, b, m) {
                        var f = CKEDITOR.tools.getNextId();
                        this._.started || (this._.started = 1, this._.size = this._.size || 0);
                        this._.items[a] = f;
                        var h;
                        h = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'");
                        a = {
                            id: f,
                            val: h,
                            onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick",
                            clickFn: this._.getClick(),
                            title: CKEDITOR.tools.htmlEncodeAttr(m || a),
                            text: b || a
                        };
                        this._.pendingList.push(e.output(a))
                    }, startGroup: function (a) {
                        this._.close();
                        var c = CKEDITOR.tools.getNextId();
                        this._.groups[a] = c;
                        this._.pendingHtml.push(b.output({id: c, label: a}))
                    }, commit: function () {
                        this._.close();
                        this.element.appendHtml(this._.pendingHtml.join(""));
                        delete this._.size;
                        this._.pendingHtml = []
                    }, toggle: function (a) {
                        var b = this.isMarked(a);
                        b ? this.unmark(a) : this.mark(a);
                        return !b
                    }, hideGroup: function (a) {
                        var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                        a && (a.setStyle("display",
                            "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                    }, hideItem: function (a) {
                        this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
                    }, showAll: function () {
                        var a = this._.items, b = this._.groups, c = this.element.getDocument(), e;
                        for (e in a)c.getById(a[e]).setStyle("display", "");
                        for (var h in b)a = c.getById(b[h]), e = a.getNext(), a.setStyle("display", ""), e && "ul" == e.getName() && e.setStyle("display", "")
                    }, mark: function (a) {
                        this.multiSelect || this.unmarkAll();
                        a = this._.items[a];
                        var b = this.element.getDocument().getById(a);
                        b.addClass("cke_selected");
                        this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
                        this.onMark && this.onMark(b)
                    }, unmark: function (a) {
                        var b = this.element.getDocument();
                        a = this._.items[a];
                        var c = b.getById(a);
                        c.removeClass("cke_selected");
                        b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c)
                    }, unmarkAll: function () {
                        var a = this._.items, b = this.element.getDocument(), c;
                        for (c in a) {
                            var e = a[c];
                            b.getById(e).removeClass("cke_selected");
                            b.getById(e + "_option").removeAttribute("aria-selected")
                        }
                        this.onUnmark &&
                        this.onUnmark()
                    }, isMarked: function (a) {
                        return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
                    }, focus: function (a) {
                        this._.focusIndex = -1;
                        var b = this.element.getElementsByTag("a"), c, e = -1;
                        if (a)for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++e);) {
                            if (a.equals(c)) {
                                this._.focusIndex = e;
                                break
                            }
                        } else this.element.focus();
                        c && setTimeout(function () {
                            c.focus()
                        }, 0)
                    }
                }
            })
        }
    }),CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button", beforeInit: function (a) {
            a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
                CKEDITOR.ui.richCombo.handler)
        }
    }),function () {
        var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac &&
        (a += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
            (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), e = CKEDITOR.addTemplate("combo", a);
        CKEDITOR.UI_RICHCOMBO = "richcombo";
        CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function (a) {
                CKEDITOR.tools.extend(this, a, {canGroup: !1, title: a.label, modes: {wysiwyg: 1}, editorFocus: 1});
                a = this.panel || {};
                delete this.panel;
                this.id = CKEDITOR.tools.getNextNumber();
                this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                a.className = "cke_combopanel";
                a.block = {multiSelect: a.multiSelect, attributes: a.attributes};
                a.toolbarRelated = !0;
                this._ = {panelDefinition: a, items: {}}
            }, proto: {
                renderHtml: function (a) {
                    var c = [];
                    this.render(a, c);
                    return c.join("")
                }, render: function (a, c) {
                    function d() {
                        if (this.getState() != CKEDITOR.TRISTATE_ON) {
                            var c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED);
                            this.setState(c);
                            this.setValue("");
                            c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                        }
                    }

                    var l =
                        CKEDITOR.env, m = "cke_" + this.id, f = CKEDITOR.tools.addFunction(function (c) {
                        p && (a.unlockSelection(1), p = 0);
                        k.execute(c)
                    }, this), h = this, k = {
                        id: m, combo: this, focus: function () {
                            CKEDITOR.document.getById(m).getChild(1).focus()
                        }, execute: function (c) {
                            var d = h._;
                            if (d.state != CKEDITOR.TRISTATE_DISABLED)if (h.createPanel(a), d.on)d.panel.hide(); else {
                                h.commit();
                                var e = h.getValue();
                                e ? d.list.mark(e) : d.list.unmarkAll();
                                d.panel.showBlock(h.id, new CKEDITOR.dom.element(c), 4)
                            }
                        }, clickFn: f
                    };
                    a.on("activeFilterChange", d, this);
                    a.on("mode",
                        d, this);
                    a.on("selectionChange", d, this);
                    !this.readOnly && a.on("readOnly", d, this);
                    var g = CKEDITOR.tools.addFunction(function (c, d) {
                        c = new CKEDITOR.dom.event(c);
                        var e = c.getKeystroke();
                        if (40 == e)a.once("panelShow", function (a) {
                            a.data._.panel._.currentBlock.onKeyDown(40)
                        });
                        switch (e) {
                            case 13:
                            case 32:
                            case 40:
                                CKEDITOR.tools.callFunction(f, d);
                                break;
                            default:
                                k.onkey(k, e)
                        }
                        c.preventDefault()
                    }), n = CKEDITOR.tools.addFunction(function () {
                        k.onfocus && k.onfocus()
                    }), p = 0;
                    k.keyDownFn = g;
                    l = {
                        id: m,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: g,
                        focusFn: n,
                        clickFn: f
                    };
                    e.output(l, c);
                    if (this.onRender)this.onRender();
                    return k
                }, createPanel: function (a) {
                    if (!this._.panel) {
                        var c = this._.panelDefinition, d = this._.panelDefinition.block, e = c.parent || CKEDITOR.document.getBody(), m = "cke_combopanel__" + this.name, f = new CKEDITOR.ui.floatPanel(a, e, c), h = f.addListBlock(this.id, d), k = this;
                        f.onShow = function () {
                            this.element.addClass(m);
                            k.setState(CKEDITOR.TRISTATE_ON);
                            k._.on = 1;
                            k.editorFocus && !a.focusManager.hasFocus && a.focus();
                            if (k.onOpen)k.onOpen();
                            a.once("panelShow", function () {
                                h.focus(!h.multiSelect && k.getValue())
                            })
                        };
                        f.onHide = function (c) {
                            this.element.removeClass(m);
                            k.setState(k.modes && k.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            k._.on = 0;
                            if (!c && k.onClose)k.onClose()
                        };
                        f.onEscape = function () {
                            f.hide(1)
                        };
                        h.onClick = function (a, b) {
                            k.onClick && k.onClick.call(k, a, b);
                            f.hide()
                        };
                        this._.panel = f;
                        this._.list = h;
                        f.getBlock(this.id).onHide = function () {
                            k._.on =
                                0;
                            k.setState(CKEDITOR.TRISTATE_OFF)
                        };
                        this.init && this.init()
                    }
                }, setValue: function (a, c) {
                    this._.value = a;
                    var d = this.document.getById("cke_" + this.id + "_text");
                    d && (a || c ? d.removeClass("cke_combo_inlinelabel") : (c = this.label, d.addClass("cke_combo_inlinelabel")), d.setText("undefined" != typeof c ? c : a))
                }, getValue: function () {
                    return this._.value || ""
                }, unmarkAll: function () {
                    this._.list.unmarkAll()
                }, mark: function (a) {
                    this._.list.mark(a)
                }, hideItem: function (a) {
                    this._.list.hideItem(a)
                }, hideGroup: function (a) {
                    this._.list.hideGroup(a)
                },
                showAll: function () {
                    this._.list.showAll()
                }, add: function (a, c, d) {
                    this._.items[a] = d || a;
                    this._.list.add(a, c, d)
                }, startGroup: function (a) {
                    this._.list.startGroup(a)
                }, commit: function () {
                    this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
                    this._.committed = 1
                }, setState: function (a) {
                    if (this._.state != a) {
                        var c = this.document.getById("cke_" + this.id);
                        c.setState(a, "cke_combo");
                        a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled");
                        this._.state =
                            a
                    }
                }, getState: function () {
                    return this._.state
                }, enable: function () {
                    this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                }, disable: function () {
                    this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                }
            }, statics: {
                handler: {
                    create: function (a) {
                        return new CKEDITOR.ui.richCombo(a)
                    }
                }
            }
        });
        CKEDITOR.ui.prototype.addRichCombo = function (a, c) {
            this.add(a, CKEDITOR.UI_RICHCOMBO, c)
        }
    }(),function () {
        function a(a, c, d, l, m, f, h, k) {
            var g = a.config, n = new CKEDITOR.style(h),
                p = m.split(";");
            m = [];
            for (var u = {}, v = 0; v < p.length; v++) {
                var t = p[v];
                if (t) {
                    var t = t.split("/"), r = {}, q = p[v] = t[0];
                    r[d] = m[v] = t[1] || q;
                    u[q] = new CKEDITOR.style(h, r);
                    u[q]._.definition.name = q
                } else p.splice(v--, 1)
            }
            a.ui.addRichCombo(c, {
                label: l.label,
                title: l.panelTitle,
                toolbar: "styles," + k,
                allowedContent: n,
                requiredContent: n,
                panel: {
                    css: [CKEDITOR.skin.getPath("editor")].concat(g.contentsCss),
                    multiSelect: !1,
                    attributes: {"aria-label": l.panelTitle}
                },
                init: function () {
                    this.startGroup(l.panelTitle);
                    for (var a = 0; a < p.length; a++) {
                        var b =
                            p[a];
                        this.add(b, u[b].buildPreview(), b)
                    }
                },
                onClick: function (c) {
                    a.focus();
                    a.fire("saveSnapshot");
                    var d = this.getValue(), f = u[c];
                    if (d && c != d) {
                        var g = u[d], h = a.getSelection().getRanges()[0];
                        if (h.collapsed) {
                            var l = a.elementPath(), k = l.contains(function (a) {
                                return g.checkElementRemovable(a)
                            });
                            if (k) {
                                var m = h.checkBoundaryOfElement(k, CKEDITOR.START), q = h.checkBoundaryOfElement(k, CKEDITOR.END);
                                if (m && q) {
                                    for (m = h.createBookmark(); l = k.getFirst();)l.insertBefore(k);
                                    k.remove();
                                    h.moveToBookmark(m)
                                } else m ? h.moveToPosition(k,
                                    CKEDITOR.POSITION_BEFORE_START) : q ? h.moveToPosition(k, CKEDITOR.POSITION_AFTER_END) : (h.splitElement(k), h.moveToPosition(k, CKEDITOR.POSITION_AFTER_END), e(h, l.elements.slice(), k));
                                a.getSelection().selectRanges([h])
                            }
                        } else a.removeStyle(g)
                    }
                    a[d == c ? "removeStyle" : "applyStyle"](f);
                    a.fire("saveSnapshot")
                },
                onRender: function () {
                    a.on("selectionChange", function (c) {
                        var d = this.getValue();
                        c = c.data.path.elements;
                        for (var e = 0, g; e < c.length; e++) {
                            g = c[e];
                            for (var h in u)if (u[h].checkElementMatch(g, !0, a)) {
                                h != d && this.setValue(h);
                                return
                            }
                        }
                        this.setValue("", f)
                    }, this)
                },
                refresh: function () {
                    a.activeFilter.check(n) || this.setState(CKEDITOR.TRISTATE_DISABLED)
                }
            })
        }

        function e(a, c, d) {
            var l = c.pop();
            if (l) {
                if (d)return e(a, c, l.equals(d) ? null : d);
                d = l.clone();
                a.insertNode(d);
                a.moveToPosition(d, CKEDITOR.POSITION_AFTER_START);
                e(a, c)
            }
        }

        CKEDITOR.plugins.add("font", {
            requires: "richcombo", init: function (b) {
                var c = b.config;
                a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
                a(b, "FontSize", "size", b.lang.font.fontSize, c.fontSize_sizes,
                    c.fontSize_defaultLabel, c.fontSize_style, 40)
            }
        })
    }(),CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",CKEDITOR.config.font_defaultLabel = "",CKEDITOR.config.font_style =
    {
        element: "span",
        styles: {"font-family": "#(family)"},
        overrides: [{element: "font", attributes: {face: null}}]
    },CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",CKEDITOR.config.fontSize_defaultLabel = "",CKEDITOR.config.fontSize_style = {
        element: "span",
        styles: {"font-size": "#(size)"},
        overrides: [{element: "font", attributes: {size: null}}]
    },CKEDITOR.plugins.add("format", {
        requires: "richcombo", init: function (a) {
            if (!a.blockless) {
                for (var e =
                    a.config, b = a.lang.format, c = e.format_tags.split(";"), d = {}, l = 0, m = [], f = 0; f < c.length; f++) {
                    var h = c[f], k = new CKEDITOR.style(e["format_" + h]);
                    if (!a.filter.customConfig || a.filter.check(k))l++, d[h] = k, d[h]._.enterMode = a.config.enterMode, m.push(k)
                }
                0 !== l && a.ui.addRichCombo("Format", {
                    label: b.label,
                    title: b.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: m,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
                        multiSelect: !1,
                        attributes: {"aria-label": b.panelTitle}
                    },
                    init: function () {
                        this.startGroup(b.panelTitle);
                        for (var a in d) {
                            var c = b["tag_" + a];
                            this.add(a, d[a].buildPreview(c), c)
                        }
                    },
                    onClick: function (b) {
                        a.focus();
                        a.fire("saveSnapshot");
                        b = d[b];
                        var c = a.elementPath();
                        a[b.checkActive(c, a) ? "removeStyle" : "applyStyle"](b);
                        setTimeout(function () {
                            a.fire("saveSnapshot")
                        }, 0)
                    },
                    onRender: function () {
                        a.on("selectionChange", function (b) {
                            var c = this.getValue();
                            b = b.data.path;
                            this.refresh();
                            for (var e in d)if (d[e].checkActive(b, a)) {
                                e != c && this.setValue(e, a.lang.format["tag_" + e]);
                                return
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function () {
                        this.showAll();
                        for (var b in d)a.activeFilter.check(d[b]) || this.hideItem(b)
                    },
                    refresh: function () {
                        var b = a.elementPath();
                        if (b) {
                            if (b.isContextFor("p"))for (var c in d)if (a.activeFilter.check(d[c]))return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED)
                        }
                    }
                })
            }
        }
    }),CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p = {element: "p"},CKEDITOR.config.format_div = {element: "div"},CKEDITOR.config.format_pre = {element: "pre"},CKEDITOR.config.format_address = {element: "address"},CKEDITOR.config.format_h1 =
    {element: "h1"},CKEDITOR.config.format_h2 = {element: "h2"},CKEDITOR.config.format_h3 = {element: "h3"},CKEDITOR.config.format_h4 = {element: "h4"},CKEDITOR.config.format_h5 = {element: "h5"},CKEDITOR.config.format_h6 = {element: "h6"},CKEDITOR.plugins.add("forms", {
        requires: "dialog,fakeobjects", onLoad: function () {
            CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
            CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
        },
        init: function (a) {
            var e = a.lang, b = 0, c = {
                    email: 1,
                    password: 1,
                    search: 1,
                    tel: 1,
                    text: 1,
                    url: 1
                }, d = {
                    checkbox: "input[type,name,checked,required]",
                    radio: "input[type,name,checked,required]",
                    textfield: "input[type,name,value,size,maxlength,required]",
                    textarea: "textarea[cols,rows,name,required]",
                    select: "select[name,size,multiple,required]; option[value,selected]",
                    button: "input[type,name,value]",
                    form: "form[action,name,id,enctype,target,method]",
                    hiddenfield: "input[type,name,value]",
                    imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
                },
                l = {
                    checkbox: "input",
                    radio: "input",
                    textfield: "input",
                    textarea: "textarea",
                    select: "select",
                    button: "input",
                    form: "form",
                    hiddenfield: "input",
                    imagebutton: "input"
                }, m = function (c, f, h) {
                    var m = {allowedContent: d[f], requiredContent: l[f]};
                    "form" == f && (m.context = "form");
                    a.addCommand(f, new CKEDITOR.dialogCommand(f, m));
                    a.ui.addButton && a.ui.addButton(c, {
                        label: e.common[c.charAt(0).toLowerCase() + c.slice(1)],
                        command: f,
                        toolbar: "forms," + (b += 10)
                    });
                    CKEDITOR.dialog.add(f, h)
                }, f = this.path + "dialogs/";
            !a.blockless && m("Form", "form",
                f + "form.js");
            m("Checkbox", "checkbox", f + "checkbox.js");
            m("Radio", "radio", f + "radio.js");
            m("TextField", "textfield", f + "textfield.js");
            m("Textarea", "textarea", f + "textarea.js");
            m("Select", "select", f + "select.js");
            m("Button", "button", f + "button.js");
            var h = a.plugins.image;
            h && !a.plugins.image2 && m("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js");
            m("HiddenField", "hiddenfield", f + "hiddenfield.js");
            a.addMenuItems && (m = {
                checkbox: {
                    label: e.forms.checkboxAndRadio.checkboxTitle, command: "checkbox",
                    group: "checkbox"
                },
                radio: {label: e.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio"},
                textfield: {label: e.forms.textfield.title, command: "textfield", group: "textfield"},
                hiddenfield: {label: e.forms.hidden.title, command: "hiddenfield", group: "hiddenfield"},
                button: {label: e.forms.button.title, command: "button", group: "button"},
                select: {label: e.forms.select.title, command: "select", group: "select"},
                textarea: {label: e.forms.textarea.title, command: "textarea", group: "textarea"}
            }, h && (m.imagebutton = {
                label: e.image.titleButton,
                command: "imagebutton", group: "imagebutton"
            }), !a.blockless && (m.form = {
                label: e.forms.form.menu,
                command: "form",
                group: "form"
            }), a.addMenuItems(m));
            a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (a, b, c) {
                if ((a = c.contains("form", 1)) && !a.isReadOnly())return {form: CKEDITOR.TRISTATE_OFF}
            }), a.contextMenu.addListener(function (a) {
                if (a && !a.isReadOnly()) {
                    var b = a.getName();
                    if ("select" == b)return {select: CKEDITOR.TRISTATE_OFF};
                    if ("textarea" == b)return {textarea: CKEDITOR.TRISTATE_OFF};
                    if ("input" == b) {
                        var d =
                            a.getAttribute("type") || "text";
                        switch (d) {
                            case "button":
                            case "submit":
                            case "reset":
                                return {button: CKEDITOR.TRISTATE_OFF};
                            case "checkbox":
                                return {checkbox: CKEDITOR.TRISTATE_OFF};
                            case "radio":
                                return {radio: CKEDITOR.TRISTATE_OFF};
                            case "image":
                                return h ? {imagebutton: CKEDITOR.TRISTATE_OFF} : null
                        }
                        if (c[d])return {textfield: CKEDITOR.TRISTATE_OFF}
                    }
                    if ("img" == b && "hiddenfield" == a.data("cke-real-element-type"))return {hiddenfield: CKEDITOR.TRISTATE_OFF}
                }
            }));
            a.on("doubleclick", function (b) {
                var d = b.data.element;
                if (!a.blockless &&
                    d.is("form"))b.data.dialog = "form"; else if (d.is("select"))b.data.dialog = "select"; else if (d.is("textarea"))b.data.dialog = "textarea"; else if (d.is("img") && "hiddenfield" == d.data("cke-real-element-type"))b.data.dialog = "hiddenfield"; else if (d.is("input")) {
                    d = d.getAttribute("type") || "text";
                    switch (d) {
                        case "button":
                        case "submit":
                        case "reset":
                            b.data.dialog = "button";
                            break;
                        case "checkbox":
                            b.data.dialog = "checkbox";
                            break;
                        case "radio":
                            b.data.dialog = "radio";
                            break;
                        case "image":
                            b.data.dialog = "imagebutton"
                    }
                    c[d] && (b.data.dialog =
                        "textfield")
                }
            })
        }, afterInit: function (a) {
            var e = a.dataProcessor, b = e && e.htmlFilter, e = e && e.dataFilter;
            CKEDITOR.env.ie && b && b.addRules({
                elements: {
                    input: function (a) {
                        a = a.attributes;
                        var b = a.type;
                        b || (a.type = "text");
                        "checkbox" != b && "radio" != b || "on" != a.value || delete a.value
                    }
                }
            }, {applyToAll: !0});
            e && e.addRules({
                elements: {
                    input: function (b) {
                        if ("hidden" == b.attributes.type)return a.createFakeParserElement(b, "cke_hidden", "hiddenfield")
                    }
                }
            }, {applyToAll: !0})
        }
    }),function () {
        var a = {
            canUndo: !1, exec: function (a) {
                var b = a.document.createElement("hr");
                a.insertElement(b)
            }, allowedContent: "hr", requiredContent: "hr"
        };
        CKEDITOR.plugins.add("horizontalrule", {
            init: function (e) {
                e.blockless || (e.addCommand("horizontalrule", a), e.ui.addButton && e.ui.addButton("HorizontalRule", {
                    label: e.lang.horizontalrule.toolbar,
                    command: "horizontalrule",
                    toolbar: "insert,40"
                }))
            }
        })
    }(),CKEDITOR.plugins.add("htmlwriter", {
        init: function (a) {
            var e = new CKEDITOR.htmlWriter;
            e.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
            e.indentationChars = a.config.dataIndentationChars || "\t";
            a.dataProcessor.writer =
                e
        }
    }),CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base();
            this.indentationChars = "\t";
            this.selfClosingEnd = " /\x3e";
            this.lineBreakChars = "\n";
            this.sortAttributes = 1;
            this._.indent = 0;
            this._.indentation = "";
            this._.inPre = 0;
            this._.rules = {};
            var a = CKEDITOR.dtd, e;
            for (e in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent))this.setRules(e, {
                indent: !a[e]["#"],
                breakBeforeOpen: 1,
                breakBeforeClose: !a[e]["#"],
                breakAfterClose: 1,
                needsSpace: e in
                a.$block && !(e in {li: 1, dt: 1, dd: 1})
            });
            this.setRules("br", {breakAfterOpen: 1});
            this.setRules("title", {indent: 0, breakAfterOpen: 0});
            this.setRules("style", {indent: 0, breakBeforeClose: 1});
            this.setRules("pre", {breakAfterOpen: 1, indent: 0})
        }, proto: {
            openTag: function (a) {
                var e = this._.rules[a];
                this._.afterCloser && e && e.needsSpace && this._.needsSpace && this._.output.push("\n");
                this._.indent ? this.indentation() : e && e.breakBeforeOpen && (this.lineBreak(), this.indentation());
                this._.output.push("\x3c", a);
                this._.afterCloser = 0
            },
            openTagClose: function (a, e) {
                var b = this._.rules[a];
                e ? (this._.output.push(this.selfClosingEnd), b && b.breakAfterClose && (this._.needsSpace = b.needsSpace)) : (this._.output.push("\x3e"), b && b.indent && (this._.indentation += this.indentationChars));
                b && b.breakAfterOpen && this.lineBreak();
                "pre" == a && (this._.inPre = 1)
            }, attribute: function (a, e) {
                "string" == typeof e && (this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "\x26")), e = CKEDITOR.tools.htmlEncodeAttr(e));
                this._.output.push(" ", a, '\x3d"', e, '"')
            }, closeTag: function (a) {
                var e =
                    this._.rules[a];
                e && e.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
                this._.indent ? this.indentation() : e && e.breakBeforeClose && (this.lineBreak(), this.indentation());
                this._.output.push("\x3c/", a, "\x3e");
                "pre" == a && (this._.inPre = 0);
                e && e.breakAfterClose && (this.lineBreak(), this._.needsSpace = e.needsSpace);
                this._.afterCloser = 1
            }, text: function (a) {
                this._.indent && (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a)));
                this._.output.push(a)
            }, comment: function (a) {
                this._.indent &&
                this.indentation();
                this._.output.push("\x3c!--", a, "--\x3e")
            }, lineBreak: function () {
                !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
                this._.indent = 1
            }, indentation: function () {
                !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                this._.indent = 0
            }, reset: function () {
                this._.output = [];
                this._.indent = 0;
                this._.indentation = "";
                this._.afterCloser = 0;
                this._.inPre = 0;
                this._.needsSpace = 0
            }, setRules: function (a, e) {
                var b = this._.rules[a];
                b ? CKEDITOR.tools.extend(b, e, !0) : this._.rules[a] =
                    e
            }
        }
    }),function () {
        CKEDITOR.plugins.add("iframe", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
            }, init: function (a) {
                var e = a.lang.iframe, b = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
                a.plugins.dialogadvtab && (b += ";iframe" + a.plugins.dialogadvtab.allowedContent({
                        id: 1,
                        classes: 1, styles: 1
                    }));
                CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
                a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
                    allowedContent: b,
                    requiredContent: "iframe"
                }));
                a.ui.addButton && a.ui.addButton("Iframe", {label: e.toolbar, command: "iframe", toolbar: "insert,80"});
                a.on("doubleclick", function (a) {
                    var b = a.data.element;
                    b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe")
                });
                a.addMenuItems && a.addMenuItems({iframe: {label: e.title, command: "iframe", group: "image"}});
                a.contextMenu && a.contextMenu.addListener(function (a) {
                    if (a && a.is("img") && "iframe" == a.data("cke-real-element-type"))return {iframe: CKEDITOR.TRISTATE_OFF}
                })
            }, afterInit: function (a) {
                var e = a.dataProcessor;
                (e = e && e.dataFilter) && e.addRules({
                    elements: {
                        iframe: function (b) {
                            return a.createFakeParserElement(b, "cke_iframe", "iframe", !0)
                        }
                    }
                })
            }
        })
    }(),function () {
        function a(a, c) {
            c || (c = a.getSelection().getSelectedElement());
            if (c && c.is("img") && !c.data("cke-realelement") && !c.isReadOnly())return c
        }

        function e(a) {
            var c = a.getStyle("float");
            if ("inherit" == c || "none" == c)c = 0;
            c || (c = a.getAttribute("align"));
            return c
        }

        CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (b) {
                if (!b.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                    var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                    b.addCommand("image", new CKEDITOR.dialogCommand("image",
                        {
                            allowedContent: c,
                            requiredContent: "img[alt,src]",
                            contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]]
                        }));
                    b.ui.addButton && b.ui.addButton("Image", {
                        label: b.lang.common.image,
                        command: "image",
                        toolbar: "insert,10"
                    });
                    b.on("doubleclick", function (a) {
                        var b = a.data.element;
                        !b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image")
                    });
                    b.addMenuItems && b.addMenuItems({
                        image: {
                            label: b.lang.image.menu,
                            command: "image", group: "image"
                        }
                    });
                    b.contextMenu && b.contextMenu.addListener(function (c) {
                        if (a(b, c))return {image: CKEDITOR.TRISTATE_OFF}
                    })
                }
            }, afterInit: function (b) {
                function c(c) {
                    var l = b.getCommand("justify" + c);
                    if (l) {
                        if ("left" == c || "right" == c)l.on("exec", function (l) {
                            var f = a(b), h;
                            f && (h = e(f), h == c ? (f.removeStyle("float"), c == e(f) && f.removeAttribute("align")) : f.setStyle("float", c), l.cancel())
                        });
                        l.on("refresh", function (l) {
                            var f = a(b);
                            f && (f = e(f), this.setState(f == c ? CKEDITOR.TRISTATE_ON : "right" == c || "left" == c ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED), l.cancel())
                        })
                    }
                }

                b.plugins.image2 || (c("left"), c("right"), c("center"), c("block"))
            }
        })
    }(),CKEDITOR.config.image_removeLinkByEmptyURL = !0,function () {
        function a(a, d) {
            var l, m;
            d.on("refresh", function (a) {
                var c = [e], d;
                for (d in a.data.states)c.push(a.data.states[d]);
                this.setState(CKEDITOR.tools.search(c, b) ? b : e)
            }, d, null, 100);
            d.on("exec", function (b) {
                l = a.getSelection();
                m = l.createBookmarks(1);
                b.data || (b.data = {});
                b.data.done = !1
            }, d, null, 0);
            d.on("exec", function () {
                a.forceNextSelectionCheck();
                l.selectBookmarks(m)
            }, d, null, 100)
        }

        var e = CKEDITOR.TRISTATE_DISABLED, b = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function (b) {
                var d = CKEDITOR.plugins.indent.genericDefinition;
                a(b, b.addCommand("indent", new d(!0)));
                a(b, b.addCommand("outdent", new d));
                b.ui.addButton && (b.ui.addButton("Indent", {
                    label: b.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), b.ui.addButton("Outdent", {
                    label: b.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                }));
                b.on("dirChanged",
                    function (a) {
                        var d = b.createRange(), e = a.data.node;
                        d.setStartBefore(e);
                        d.setEndAfter(e);
                        for (var h = new CKEDITOR.dom.walker(d), k; k = h.next();)if (k.type == CKEDITOR.NODE_ELEMENT)if (!k.equals(e) && k.getDirection())d.setStartAfter(k), h = new CKEDITOR.dom.walker(d); else {
                            var g = b.config.indentClasses;
                            if (g)for (var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++)k.hasClass(g[p] + n[0]) && (k.removeClass(g[p] + n[0]), k.addClass(g[p] + n[1]));
                            g = k.getStyle("margin-right");
                            n = k.getStyle("margin-left");
                            g ? k.setStyle("margin-left",
                                g) : k.removeStyle("margin-left");
                            n ? k.setStyle("margin-right", n) : k.removeStyle("margin-right")
                        }
                    })
            }
        });
        CKEDITOR.plugins.indent = {
            genericDefinition: function (a) {
                this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            }, specificDefinition: function (a, b, e) {
                this.name = b;
                this.editor = a;
                this.jobs = {};
                this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
                this.isIndent = !!e;
                this.relatedGlobal = e ? "indent" : "outdent";
                this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
                this.database = {}
            }, registerCommands: function (a, b) {
                a.on("pluginsLoaded", function () {
                    for (var a in b)(function (a,
                                               b) {
                        var c = a.getCommand(b.relatedGlobal), d;
                        for (d in b.jobs)c.on("exec", function (c) {
                            c.data.done || (a.fire("lockSnapshot"), b.execJob(a, d) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                        }, this, null, d), c.on("refresh", function (c) {
                            c.data.states || (c.data.states = {});
                            c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path)
                        }, this, null, d);
                        a.addFeature(b)
                    })(this, b[a])
                })
            }
        };
        CKEDITOR.plugins.indent.genericDefinition.prototype = {
            context: "p", exec: function () {
            }
        };
        CKEDITOR.plugins.indent.specificDefinition.prototype =
        {
            execJob: function (a, b) {
                var l = this.jobs[b];
                if (l.state != e)return l.exec.call(this, a)
            }, refreshJob: function (a, b, l) {
            b = this.jobs[b];
            a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, l) : b.state = e;
            return b.state
        }, getContext: function (a) {
            return a.contains(this.context)
        }
        }
    }(),function () {
        function a(a, b, c) {
            if (!a.getCustomData("indent_processed")) {
                var d = this.editor, g = this.isIndent;
                if (b) {
                    d = a.$.className.match(this.classNameRegex);
                    c = 0;
                    d && (d = d[1], c = CKEDITOR.tools.indexOf(b, d) + 1);
                    if (0 > (c += g ? 1 : -1))return;
                    c = Math.min(c, b.length);
                    c = Math.max(c, 0);
                    a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, ""));
                    0 < c && a.addClass(b[c - 1])
                } else {
                    b = e(a, c);
                    c = parseInt(a.getStyle(b), 10);
                    var l = d.config.indentOffset || 40;
                    isNaN(c) && (c = 0);
                    c += (g ? 1 : -1) * l;
                    if (0 > c)return;
                    c = Math.max(c, 0);
                    c = Math.ceil(c / l) * l;
                    a.setStyle(b, c ? c + (d.config.indentUnit || "px") : "");
                    "" === a.getAttribute("style") && a.removeAttribute("style")
                }
                CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
            }
        }

        function e(a, b) {
            return "ltr" ==
            (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right"
        }

        var b = CKEDITOR.dtd.$listItem, c = CKEDITOR.dtd.$list, d = CKEDITOR.TRISTATE_DISABLED, l = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentblock", {
            requires: "indent", init: function (m) {
                function f() {
                    h.specificDefinition.apply(this, arguments);
                    this.allowedContent = {
                        "div h1 h2 h3 h4 h5 h6 ol p pre ul": {
                            propertiesOnly: !0,
                            styles: k ? null : "margin-left,margin-right",
                            classes: k || null
                        }
                    };
                    this.enterBr && (this.allowedContent.div = !0);
                    this.requiredContent = (this.enterBr ?
                            "div" : "p") + (k ? "(" + k.join(",") + ")" : "{margin-left}");
                    this.jobs = {
                        20: {
                            refresh: function (a, c) {
                                var f = c.block || c.blockLimit;
                                if (!f.is(b))var h = f.getAscendant(b), f = h && c.contains(h) || f;
                                f.is(b) && (f = f.getParent());
                                if (this.enterBr || this.getContext(c)) {
                                    if (k) {
                                        var h = k, f = f.$.className.match(this.classNameRegex), m = this.isIndent, h = f ? m ? f[1] != h.slice(-1) : !0 : m;
                                        return h ? l : d
                                    }
                                    return this.isIndent ? l : f ? CKEDITOR[0 >= (parseInt(f.getStyle(e(f)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : d
                                }
                                return d
                            }, exec: function (b) {
                                var d = b.getSelection(),
                                    d = d && d.getRanges()[0], e;
                                if (e = b.elementPath().contains(c))a.call(this, e, k); else for (d = d.createIterator(), b = b.config.enterMode, d.enforceRealBlocks = !0, d.enlargeBr = b != CKEDITOR.ENTER_BR; e = d.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");)e.isReadOnly() || a.call(this, e, k);
                                return !0
                            }
                        }
                    }
                }

                var h = CKEDITOR.plugins.indent, k = m.config.indentClasses;
                h.registerCommands(m, {
                    indentblock: new f(m, "indentblock", !0),
                    outdentblock: new f(m, "outdentblock")
                });
                CKEDITOR.tools.extend(f.prototype, h.specificDefinition.prototype, {
                    context: {
                        div: 1,
                        dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1
                    }, classNameRegex: k ? new RegExp("(?:^|\\s+)(" + k.join("|") + ")(?\x3d$|\\s)") : null
                })
            }
        })
    }(),function () {
        function a(a) {
            function c(e) {
                for (var h = u.startContainer, m = u.endContainer; h && !h.getParent().equals(e);)h = h.getParent();
                for (; m && !m.getParent().equals(e);)m = m.getParent();
                if (!h || !m)return !1;
                for (var v = h, h = [], t = !1; !t;)v.equals(m) && (t = !0), h.push(v), v = v.getNext();
                if (1 > h.length)return !1;
                v = e.getParents(!0);
                for (m = 0; m < v.length; m++)if (v[m].getName && l[v[m].getName()]) {
                    e =
                        v[m];
                    break
                }
                for (var v = d.isIndent ? 1 : -1, m = h[0], h = h[h.length - 1], t = CKEDITOR.plugins.list.listToArray(e, g), y = t[h.getCustomData("listarray_index")].indent, m = m.getCustomData("listarray_index"); m <= h.getCustomData("listarray_index"); m++)if (t[m].indent += v, 0 < v) {
                    var p = t[m].parent;
                    t[m].parent = new CKEDITOR.dom.element(p.getName(), p.getDocument())
                }
                for (m = h.getCustomData("listarray_index") + 1; m < t.length && t[m].indent > y; m++)t[m].indent += v;
                h = CKEDITOR.plugins.list.arrayToList(t, g, null, a.config.enterMode, e.getDirection());
                if (!d.isIndent) {
                    var x;
                    if ((x = e.getParent()) && x.is("li"))for (var v = h.listNode.getChildren(), z = [], D, m = v.count() - 1; 0 <= m; m--)(D = v.getItem(m)) && D.is && D.is("li") && z.push(D)
                }
                h && h.listNode.replace(e);
                if (z && z.length)for (m = 0; m < z.length; m++) {
                    for (D = e = z[m]; (D = D.getNext()) && D.is && D.getName() in l;)CKEDITOR.env.needsNbspFiller && !e.getFirst(b) && e.append(u.document.createText(" ")), e.append(D);
                    e.insertAfter(x)
                }
                h && a.fire("contentDomInvalidated");
                return !0
            }

            for (var d = this, g = this.database, l = this.context, m = a.getSelection(),
                     m = (m && m.getRanges()).createIterator(), u; u = m.getNextRange();) {
                for (var v = u.getCommonAncestor(); v && (v.type != CKEDITOR.NODE_ELEMENT || !l[v.getName()]);) {
                    if (a.editable().equals(v)) {
                        v = !1;
                        break
                    }
                    v = v.getParent()
                }
                v || (v = u.startPath().contains(l)) && u.setEndAt(v, CKEDITOR.POSITION_BEFORE_END);
                if (!v) {
                    var t = u.getEnclosedNode();
                    t && t.type == CKEDITOR.NODE_ELEMENT && t.getName() in l && (u.setStartAt(t, CKEDITOR.POSITION_AFTER_START), u.setEndAt(t, CKEDITOR.POSITION_BEFORE_END), v = t)
                }
                v && u.startContainer.type == CKEDITOR.NODE_ELEMENT &&
                u.startContainer.getName() in l && (t = new CKEDITOR.dom.walker(u), t.evaluator = e, u.startContainer = t.next());
                v && u.endContainer.type == CKEDITOR.NODE_ELEMENT && u.endContainer.getName() in l && (t = new CKEDITOR.dom.walker(u), t.evaluator = e, u.endContainer = t.previous());
                if (v)return c(v)
            }
            return 0
        }

        function e(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
        }

        function b(a) {
            return c(a) && d(a)
        }

        var c = CKEDITOR.dom.walker.whitespaces(!0), d = CKEDITOR.dom.walker.bookmark(!1, !0), l = CKEDITOR.TRISTATE_DISABLED, m = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (b) {
                function c(b) {
                    d.specificDefinition.apply(this, arguments);
                    this.requiredContent = ["ul", "ol"];
                    b.on("key", function (a) {
                        if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey) {
                            var c = this.getContext(b.elementPath());
                            !c || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, b.elementPath(), c) || (b.execCommand(this.relatedGlobal), a.cancel())
                        }
                    }, this);
                    this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function (a, b) {
                            var c =
                                this.getContext(b), d = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c);
                            return c && this.isIndent && !d ? m : l
                        } : function (a, b) {
                            return !this.getContext(b) || this.isIndent ? l : m
                        }, exec: CKEDITOR.tools.bind(a, this)
                    }
                }

                var d = CKEDITOR.plugins.indent;
                d.registerCommands(b, {indentlist: new c(b, "indentlist", !0), outdentlist: new c(b, "outdentlist")});
                CKEDITOR.tools.extend(c.prototype, d.specificDefinition.prototype, {context: {ol: 1, ul: 1}})
            }
        });
        CKEDITOR.plugins.indentList = {};
        CKEDITOR.plugins.indentList.firstItemInPath =
            function (a, b, c) {
                var d = b.contains(e);
                c || (c = b.contains(a));
                return c && d && d.equals(c.getFirst(e))
            }
    }(),function () {
        function a(a, b) {
            b = void 0 === b || b;
            var e;
            if (b)e = a.getComputedStyle("text-align"); else {
                for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
                    e = a.getParent();
                    if (!e)break;
                    a = e
                }
                e = a.getStyle("text-align") || a.getAttribute("align") || ""
            }
            e && (e = e.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
            !e && b && (e = "rtl" == a.getComputedStyle("direction") ? "right" : "left");
            return e
        }

        function e(a,
                   b, e) {
            this.editor = a;
            this.name = b;
            this.value = e;
            this.context = "p";
            b = a.config.justifyClasses;
            var m = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
            if (b) {
                switch (e) {
                    case "left":
                        this.cssClassName = b[0];
                        break;
                    case "center":
                        this.cssClassName = b[1];
                        break;
                    case "right":
                        this.cssClassName = b[2];
                        break;
                    case "justify":
                        this.cssClassName = b[3]
                }
                this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?\x3d$|\\s)");
                this.requiredContent = m + "(" + this.cssClassName + ")"
            } else this.requiredContent = m + "{text-align}";
            this.allowedContent =
            {
                "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                    propertiesOnly: !0,
                    styles: this.cssClassName ? null : "text-align",
                    classes: this.cssClassName || null
                }
            };
            a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
        }

        function b(a) {
            var b = a.editor, e = b.createRange();
            e.setStartBefore(a.data.node);
            e.setEndAfter(a.data.node);
            for (var m = new CKEDITOR.dom.walker(e), f; f = m.next();)if (f.type == CKEDITOR.NODE_ELEMENT)if (!f.equals(a.data.node) && f.getDirection())e.setStartAfter(f), m = new CKEDITOR.dom.walker(e); else {
                var h =
                    b.config.justifyClasses;
                h && (f.hasClass(h[0]) ? (f.removeClass(h[0]), f.addClass(h[2])) : f.hasClass(h[2]) && (f.removeClass(h[2]), f.addClass(h[0])));
                h = f.getStyle("text-align");
                "left" == h ? f.setStyle("text-align", "right") : "right" == h && f.setStyle("text-align", "left")
            }
        }

        e.prototype = {
            exec: function (b) {
                var d = b.getSelection(), e = b.config.enterMode;
                if (d) {
                    for (var m = d.createBookmarks(), f = d.getRanges(), h = this.cssClassName, k, g, n = b.config.useComputedState, n = void 0 === n || n, p = f.length - 1; 0 <= p; p--)for (k = f[p].createIterator(),
                                                                                                                                                                                                   k.enlargeBr = e != CKEDITOR.ENTER_BR; g = k.getNextParagraph(e == CKEDITOR.ENTER_P ? "p" : "div");)if (!g.isReadOnly()) {
                        g.removeAttribute("align");
                        g.removeStyle("text-align");
                        var u = h && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))), v = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(g, !0) != this.value);
                        h ? v ? g.addClass(h) : u || g.removeAttribute("class") : v && g.setStyle("text-align", this.value)
                    }
                    b.focus();
                    b.forceNextSelectionCheck();
                    d.selectBookmarks(m)
                }
            }, refresh: function (b, d) {
                var e = d.block ||
                    d.blockLimit;
                this.setState("body" != e.getName() && a(e, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("justify", {
            init: function (a) {
                if (!a.blockless) {
                    var d = new e(a, "justifyleft", "left"), l = new e(a, "justifycenter", "center"), m = new e(a, "justifyright", "right"), f = new e(a, "justifyblock", "justify");
                    a.addCommand("justifyleft", d);
                    a.addCommand("justifycenter", l);
                    a.addCommand("justifyright", m);
                    a.addCommand("justifyblock", f);
                    a.ui.addButton && (a.ui.addButton("JustifyLeft",
                        {
                            label: a.lang.justify.left,
                            command: "justifyleft",
                            toolbar: "align,10"
                        }), a.ui.addButton("JustifyCenter", {
                        label: a.lang.justify.center,
                        command: "justifycenter",
                        toolbar: "align,20"
                    }), a.ui.addButton("JustifyRight", {
                        label: a.lang.justify.right,
                        command: "justifyright",
                        toolbar: "align,30"
                    }), a.ui.addButton("JustifyBlock", {
                        label: a.lang.justify.block,
                        command: "justifyblock",
                        toolbar: "align,40"
                    }));
                    a.on("dirChanged", b)
                }
            }
        })
    }(),CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var a = function (a) {
                var b =
                    this._, c = b.menu;
                b.state !== CKEDITOR.TRISTATE_DISABLED && (b.on && c ? c.hide() : (b.previousState = b.state, c || (c = b.menu = new CKEDITOR.menu(a, {
                    panel: {
                        className: "cke_menu_panel",
                        attributes: {"aria-label": a.lang.common.options}
                    }
                }), c.onHide = CKEDITOR.tools.bind(function () {
                    var c = this.command ? a.getCommand(this.command).modes : this.modes;
                    this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED);
                    b.on = 0
                }, this), this.onMenu && c.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), b.on = 1, setTimeout(function () {
                    c.show(CKEDITOR.document.getById(b.id),
                        4)
                }, 0)))
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button, $: function (e) {
                    delete e.panel;
                    this.base(e);
                    this.hasArrow = !0;
                    this.click = a
                }, statics: {
                    handler: {
                        create: function (a) {
                            return new CKEDITOR.ui.menuButton(a)
                        }
                    }
                }
            })
        }, beforeInit: function (a) {
            a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
        }
    }),CKEDITOR.UI_MENUBUTTON = "menubutton","use strict",function () {
        CKEDITOR.plugins.add("language", {
            requires: "menubutton", init: function (a) {
                var e = a.config.language_list || ["ar:Arabic:rtl",
                        "fr:French", "es:Spanish"], b = this, c = a.lang.language, d = {}, l, m, f, h;
                a.addCommand("language", {
                    allowedContent: "span[!lang,!dir]",
                    requiredContent: "span[lang,dir]",
                    contextSensitive: !0,
                    exec: function (a, b) {
                        var c = d["language_" + b];
                        if (c)a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style)
                    },
                    refresh: function (a) {
                        this.setState(b.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    }
                });
                for (h = 0; h < e.length; h++)l = e[h].split(":"), m = l[0], f = "language_" + m, d[f] = {
                    label: l[1], langId: m, group: "language",
                    order: h, ltr: "rtl" != ("" + l[2]).toLowerCase(), onClick: function () {
                        a.execCommand("language", this.langId)
                    }, role: "menuitemcheckbox"
                }, d[f].style = new CKEDITOR.style({
                    element: "span",
                    attributes: {lang: m, dir: d[f].ltr ? "ltr" : "rtl"}
                });
                d.language_remove = {
                    label: c.remove,
                    group: "language_remove",
                    state: CKEDITOR.TRISTATE_DISABLED,
                    order: d.length,
                    onClick: function () {
                        var c = b.getCurrentLangElement(a);
                        c && a.execCommand("language", c.getAttribute("lang"))
                    }
                };
                a.addMenuGroup("language", 1);
                a.addMenuGroup("language_remove");
                a.addMenuItems(d);
                a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                    label: c.button,
                    allowedContent: "span[!lang,!dir]",
                    requiredContent: "span[lang,dir]",
                    toolbar: "bidi,30",
                    command: "language",
                    onMenu: function () {
                        var c = {}, e = b.getCurrentLangElement(a), f;
                        for (f in d)c[f] = CKEDITOR.TRISTATE_OFF;
                        c.language_remove = e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                        e && (c["language_" + e.getAttribute("lang")] = CKEDITOR.TRISTATE_ON);
                        return c
                    }
                })
            }, getCurrentLangElement: function (a) {
                var e = a.elementPath();
                a = e && e.elements;
                var b;
                if (e)for (var c = 0; c <
                a.length; c++)e = a[c], !b && "span" == e.getName() && e.hasAttribute("dir") && e.hasAttribute("lang") && (b = e);
                return b
            }
        })
    }(),"use strict",function () {
        function a(a) {
            return a.replace(/'/g, "\\$\x26")
        }

        function e(a) {
            for (var b, c = a.length, d = [], e = 0; e < c; e++)b = a.charCodeAt(e), d.push(b);
            return "String.fromCharCode(" + d.join(",") + ")"
        }

        function b(b, c) {
            var d = b.plugins.link, e = d.compiledProtectionFunction.params, f, g;
            g = [d.compiledProtectionFunction.name, "("];
            for (var h = 0; h < e.length; h++)d = e[h].toLowerCase(), f = c[d], 0 < h && g.push(","),
                g.push("'", f ? a(encodeURIComponent(c[d])) : "", "'");
            g.push(")");
            return g.join("")
        }

        function c(a) {
            a = a.config.emailProtection || "";
            var b;
            a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, c, d) {
                b.name = c;
                b.params = [];
                d.replace(/[^,\s]+/g, function (a) {
                    b.params.push(a)
                })
            }));
            return b
        }

        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects", onLoad: function () {
                function a(b) {
                    return c.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
                }

                var b = "background:url(" + CKEDITOR.getUrl(this.path +
                        "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                CKEDITOR.addCss(a("ltr") + a("rtl"))
            }, init: function (a) {
                var b = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (b = b.replace("]",
                    ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
                CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]"));
                a.addCommand("link", new CKEDITOR.dialogCommand("link", {
                    allowedContent: b,
                    requiredContent: "a[href]"
                }));
                a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                    allowedContent: "a[!name,id]",
                    requiredContent: "a[name]"
                }));
                a.addCommand("unlink", new CKEDITOR.unlinkCommand);
                a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                a.setKeystroke(CKEDITOR.CTRL +
                    76, "link");
                a.ui.addButton && (a.ui.addButton("Link", {
                    label: a.lang.link.toolbar,
                    command: "link",
                    toolbar: "links,10"
                }), a.ui.addButton("Unlink", {
                    label: a.lang.link.unlink,
                    command: "unlink",
                    toolbar: "links,20"
                }), a.ui.addButton("Anchor", {
                    label: a.lang.link.anchor.toolbar,
                    command: "anchor",
                    toolbar: "links,30"
                }));
                CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                a.on("doubleclick", function (b) {
                    var c = CKEDITOR.plugins.link.getSelectedLink(a) || b.data.element;
                    c.isReadOnly() || (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", b.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor"))
                }, null, null, 0);
                a.on("doubleclick", function (b) {
                    b.data.dialog in {link: 1, anchor: 1} && b.data.link && a.getSelection().selectElement(b.data.link)
                }, null, null, 20);
                a.addMenuItems && a.addMenuItems({
                    anchor: {label: a.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1},
                    removeAnchor: {
                        label: a.lang.link.anchor.remove,
                        command: "removeAnchor", group: "anchor", order: 5
                    },
                    link: {label: a.lang.link.menu, command: "link", group: "link", order: 1},
                    unlink: {label: a.lang.link.unlink, command: "unlink", group: "link", order: 5}
                });
                a.contextMenu && a.contextMenu.addListener(function (b) {
                    if (!b || b.isReadOnly())return null;
                    b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
                    if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a)))return null;
                    var c = {};
                    b.getAttribute("href") && b.getChildCount() && (c = {
                        link: CKEDITOR.TRISTATE_OFF,
                        unlink: CKEDITOR.TRISTATE_OFF
                    });
                    b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF);
                    return c
                });
                this.compiledProtectionFunction = c(a)
            }, afterInit: function (a) {
                a.dataProcessor.dataFilter.addRules({
                    elements: {
                        a: function (b) {
                            return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null
                        }
                    }
                });
                var b = a._.elementsPath && a._.elementsPath.filters;
                b && b.push(function (b, c) {
                    if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount())))return "anchor"
                })
            }
        });
        var d = /^javascript:/, l = /^mailto:([^?]+)(?:\?(.+))?$/, m = /subject=([^;?:@&=$,\/]*)/i, f = /body=([^;?:@&=$,\/]*)/i, h = /^#(.*)$/, k = /^((?:http|https|ftp|news):\/\/)?(.*)$/, g = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, p = /^javascript:([^(]+)\(([^)]+)\)$/, u = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, v = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, t = {
            id: "advId",
            dir: "advLangDir",
            accessKey: "advAccessKey",
            name: "advName",
            lang: "advLangCode",
            tabindex: "advTabIndex",
            title: "advTitle",
            type: "advContentType",
            "class": "advCSSClasses",
            charset: "advCharset",
            style: "advStyles",
            rel: "advRel"
        };
        CKEDITOR.plugins.link = {
            getSelectedLink: function (a) {
                var b = a.getSelection(), c = b.getSelectedElement();
                return c && c.is("a") ? c : (b = b.getRanges()[0]) ? (b.shrink(CKEDITOR.SHRINK_TEXT), a.elementPath(b.getCommonAncestor()).contains("a", 1)) : null
            }, getEditorAnchors: function (a) {
                for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ?
                    a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), d = [], e = 0, f; f = b.getItem(e++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && d.push({
                    name: f.data("cke-saved-name") || f.getAttribute("name"),
                    id: f.getAttribute("id")
                });
                for (e = 0; f = c.getItem(e++);)(f = this.tryRestoreFakeAnchor(a, f)) && d.push({
                    name: f.getAttribute("name"),
                    id: f.getAttribute("id")
                });
                return d
            }, fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) {
                if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
                    var c =
                        a.restoreRealElement(b);
                    if (c.data("cke-saved-name"))return c
                }
            }, parseLinkAttributes: function (a, b) {
                var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", e = a.plugins.link.compiledProtectionFunction, w = a.config.emailProtection, y, C = {};
                c.match(d) && ("encode" == w ? c = c.replace(n, function (a, b, c) {
                    c = c || "";
                    return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'")
                }) : w && c.replace(p, function (a, b, c) {
                    if (b == e.name) {
                        C.type = "email";
                        a = C.email = {};
                        b = /(^')|('$)/g;
                        c = c.match(/[^,\s]+/g);
                        for (var d =
                            c.length, f, g, h = 0; h < d; h++)f = decodeURIComponent, g = c[h].replace(b, "").replace(/\\'/g, "'"), g = f(g), f = e.params[h].toLowerCase(), a[f] = g;
                        a.address = [a.name, a.domain].join("@")
                    }
                }));
                if (!C.type)if (w = c.match(h))C.type = "anchor", C.anchor = {}, C.anchor.name = C.anchor.id = w[1]; else if (w = c.match(l)) {
                    y = c.match(m);
                    c = c.match(f);
                    C.type = "email";
                    var x = C.email = {};
                    x.address = w[1];
                    y && (x.subject = decodeURIComponent(y[1]));
                    c && (x.body = decodeURIComponent(c[1]))
                } else c && (y = c.match(k)) && (C.type = "url", C.url = {}, C.url.protocol = y[1], C.url.url =
                    y[2]);
                if (b) {
                    if (c = b.getAttribute("target"))C.target = {
                        type: c.match(g) ? c : "frame",
                        name: c
                    }; else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(u))for (C.target = {
                        type: "popup",
                        name: c[1]
                    }; w = v.exec(c[2]);)"yes" != w[2] && "1" != w[2] || w[1] in {
                        height: 1,
                        width: 1,
                        top: 1,
                        left: 1
                    } ? isFinite(w[2]) && (C.target[w[1]] = w[2]) : C.target[w[1]] = !0;
                    var c = {}, z;
                    for (z in t)(w = b.getAttribute(z)) && (c[t[z]] = w);
                    if (z = b.data("cke-saved-name") || c.advName)c.advName = z;
                    CKEDITOR.tools.isEmpty(c) || (C.advanced = c)
                }
                return C
            }, getLinkAttributes: function (c,
                                            d) {
                var f = c.config.emailProtection || "", g = {};
                switch (d.type) {
                    case "url":
                        var f = d.url && void 0 !== d.url.protocol ? d.url.protocol : "http://", h = d.url && CKEDITOR.tools.trim(d.url.url) || "";
                        g["data-cke-saved-href"] = 0 === h.indexOf("/") ? h : f + h;
                        break;
                    case "anchor":
                        f = d.anchor && d.anchor.id;
                        g["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || f || "");
                        break;
                    case "email":
                        var l = d.email, h = l.address;
                        switch (f) {
                            case "":
                            case "encode":
                                var k = encodeURIComponent(l.subject || ""), m = encodeURIComponent(l.body || ""), l = [];
                                k && l.push("subject\x3d" +
                                    k);
                                m && l.push("body\x3d" + m);
                                l = l.length ? "?" + l.join("\x26") : "";
                                "encode" == f ? (f = ["javascript:void(location.href\x3d'mailto:'+", e(h)], l && f.push("+'", a(l), "'"), f.push(")")) : f = ["mailto:", h, l];
                                break;
                            default:
                                f = h.split("@", 2), l.name = f[0], l.domain = f[1], f = ["javascript:", b(c, l)]
                        }
                        g["data-cke-saved-href"] = f.join("")
                }
                if (d.target)if ("popup" == d.target.type) {
                    for (var f = ["window.open(this.href, '", d.target.name || "", "', '"], v = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), h = v.length,
                             k = function (a) {
                                 d.target[a] && v.push(a + "\x3d" + d.target[a])
                             }, l = 0; l < h; l++)v[l] += d.target[v[l]] ? "\x3dyes" : "\x3dno";
                    k("width");
                    k("left");
                    k("height");
                    k("top");
                    f.push(v.join(","), "'); return false;");
                    g["data-cke-pa-onclick"] = f.join("")
                } else"notSet" != d.target.type && d.target.name && (g.target = d.target.name);
                if (d.advanced) {
                    for (var n in t)(f = d.advanced[t[n]]) && (g[n] = f);
                    g.name && (g["data-cke-saved-name"] = g.name)
                }
                g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]);
                n = {
                    target: 1, onclick: 1, "data-cke-pa-onclick": 1,
                    "data-cke-saved-name": 1
                };
                d.advanced && CKEDITOR.tools.extend(n, t);
                for (var u in g)delete n[u];
                return {set: g, removed: CKEDITOR.tools.objectKeys(n)}
            }, showDisplayTextForElement: function (a, b) {
                var c = {img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1};
                return b.widgets && b.widgets.focused ? !1 : !a || !a.getName || !a.is(c)
            }
        };
        CKEDITOR.unlinkCommand = function () {
        };
        CKEDITOR.unlinkCommand.prototype = {
            exec: function (a) {
                var b = new CKEDITOR.style({element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1});
                a.removeStyle(b)
            },
            refresh: function (a, b) {
                var c = b.lastElement && b.lastElement.getAscendant("a", !0);
                c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]"
        };
        CKEDITOR.removeAnchorCommand = function () {
        };
        CKEDITOR.removeAnchorCommand.prototype = {
            exec: function (a) {
                var b = a.getSelection(), c = b.createBookmarks(), d;
                if (b && (d = b.getSelectedElement()) && (d.getChildCount() ? d.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
                        d)))d.remove(1); else if (d = CKEDITOR.plugins.link.getSelectedLink(a))d.hasAttribute("href") ? (d.removeAttributes({
                    name: 1,
                    "data-cke-saved-name": 1
                }), d.removeClass("cke_anchor")) : d.remove(1);
                b.selectBookmarks(c)
            }, requiredContent: "a[name]"
        };
        CKEDITOR.tools.extend(CKEDITOR.config, {linkShowAdvancedTab: !0, linkShowTargetTab: !0})
    }(),function () {
        function a(a, b, c) {
            function d(c) {
                if (!(!(k = l[c ? "getFirst" : "getLast"]()) || k.is && k.isBlockBoundary() || !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) ||
                    m.is && m.isBlockBoundary({br: 1})))a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](k)
            }

            for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
                var h = b.contents[g];
                (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0))
            }
            h = null;
            for (g = 0; g < f.length; g++)h = f[g].getCustomData("listarray_index"), e[h].indent = -1;
            for (g = h + 1; g < e.length; g++)if (e[g].indent > e[g - 1].indent + 1) {
                f = e[g - 1].indent +
                    1 - e[g].indent;
                for (h = e[g].indent; e[g] && e[g].indent >= h;)e[g].indent += f, g++;
                g--
            }
            var l = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, k, m;
            d(!0);
            d();
            l.replace(b.root);
            a.fire("contentDomInvalidated")
        }

        function e(a, b) {
            this.name = a;
            this.context = this.type = b;
            this.allowedContent = b + " li";
            this.requiredContent = b
        }

        function b(a, b, c, d) {
            for (var e, f; e = a[d ? "getLast" : "getFirst"](u);)(f = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", f), e.remove(), c ? e[d ? "insertBefore" :
                "insertAfter"](c) : b.append(e, d)
        }

        function c(a) {
            function c(d) {
                var e = a[d ? "getPrevious" : "getNext"](g);
                e && e.type == CKEDITOR.NODE_ELEMENT && e.is(a.getName()) && (b(a, e, null, !d), a.remove(), a = e)
            }

            c();
            c(1)
        }

        function d(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
        }

        function l(a, d, e) {
            a.fire("saveSnapshot");
            e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var f = e.extractContents();
            d.trim(!1, !0);
            var h = d.createBookmark(),
                l = new CKEDITOR.dom.elementPath(d.startContainer), k = l.block, l = l.lastElement.getAscendant("li", 1) || k, u = new CKEDITOR.dom.elementPath(e.startContainer), p = u.contains(CKEDITOR.dtd.$listItem), u = u.contains(CKEDITOR.dtd.$list);
            k ? (k = k.getBogus()) && k.remove() : u && (k = u.getPrevious(g)) && n(k) && k.remove();
            (k = f.getLast()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br") && k.remove();
            (k = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(k) : d.startContainer.append(f);
            p && (f = m(p)) && (l.contains(p) ? (b(f, p.getParent(), p),
                f.remove()) : l.append(f));
            for (; e.checkStartOfBlock() && e.checkEndOfBlock();) {
                u = e.startPath();
                f = u.block;
                if (!f)break;
                f.is("li") && (l = f.getParent(), f.equals(l.getLast(g)) && f.equals(l.getFirst(g)) && (f = l));
                e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
                f.remove()
            }
            e = e.clone();
            f = a.editable();
            e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
            e = new CKEDITOR.dom.walker(e);
            e.evaluator = function (a) {
                return g(a) && !n(a)
            };
            (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && c(e);
            d.moveToBookmark(h);
            d.select();
            a.fire("saveSnapshot")
        }

        function m(a) {
            return (a = a.getLast(g)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in f ? a : null
        }

        var f = {
            ol: 1,
            ul: 1
        }, h = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), g = function (a) {
            return !(h(a) || k(a))
        }, n = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function (a, b, c, d, e) {
                if (!f[a.getName()])return [];
                d || (d = 0);
                c || (c = []);
                for (var g = 0, h = a.getChildCount(); g < h; g++) {
                    var l = a.getChild(g);
                    l.type == CKEDITOR.NODE_ELEMENT && l.getName() in CKEDITOR.dtd.$list &&
                    CKEDITOR.plugins.list.listToArray(l, b, c, d + 1);
                    if ("li" == l.$.nodeName.toLowerCase()) {
                        var k = {parent: a, indent: d, element: l, contents: []};
                        e ? k.grandparent = e : (k.grandparent = a.getParent(), k.grandparent && "li" == k.grandparent.$.nodeName.toLowerCase() && (k.grandparent = k.grandparent.getParent()));
                        b && CKEDITOR.dom.element.setMarker(b, l, "listarray_index", c.length);
                        c.push(k);
                        for (var m = 0, n = l.getChildCount(), u; m < n; m++)u = l.getChild(m), u.type == CKEDITOR.NODE_ELEMENT && f[u.getName()] ? CKEDITOR.plugins.list.listToArray(u, b, c,
                            d + 1, k.grandparent) : k.contents.push(u)
                    }
                }
                return c
            }, arrayToList: function (a, b, c, d, e) {
                c || (c = 0);
                if (!a || a.length < c + 1)return null;
                for (var h, l = a[c].parent.getDocument(), m = new CKEDITOR.dom.documentFragment(l), n = null, u = c, p = Math.max(a[c].indent, 0), D = null, F, E, J = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var G = a[u];
                    h = G.grandparent;
                    F = G.element.getDirection(1);
                    if (G.indent == p) {
                        n && a[u].parent.getName() == n.getName() || (n = a[u].parent.clone(!1, 1), e && n.setAttribute("dir", e), m.append(n));
                        D = n.append(G.element.clone(0, 1));
                        F != n.getDirection(1) &&
                        D.setAttribute("dir", F);
                        for (h = 0; h < G.contents.length; h++)D.append(G.contents[h].clone(1, 1));
                        u++
                    } else if (G.indent == Math.max(p, 0) + 1)G = a[u - 1].element.getDirection(1), u = CKEDITOR.plugins.list.arrayToList(a, null, u, d, G != F ? F : null), !D.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= l.$.documentMode && D.append(l.createText(" ")), D.append(u.listNode), u = u.nextIndex; else if (-1 == G.indent && !c && h) {
                        f[h.getName()] ? (D = G.element.clone(!1, !0), F != h.getDirection(1) && D.setAttribute("dir", F)) : D = new CKEDITOR.dom.documentFragment(l);
                        var n = h.getDirection(1) != F, M = G.element, O = M.getAttribute("class"), I = M.getAttribute("style"), R = D.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || n || I || O), P, T = G.contents.length, H;
                        for (h = 0; h < T; h++)if (P = G.contents[h], k(P) && 1 < T)R ? H = P.clone(1, 1) : D.append(P.clone(1, 1)); else if (P.type == CKEDITOR.NODE_ELEMENT && P.isBlockBoundary()) {
                            n && !P.getDirection() && P.setAttribute("dir", F);
                            E = P;
                            var K = M.getAttribute("style");
                            K && E.setAttribute("style", K.replace(/([^;])$/, "$1;") + (E.getAttribute("style") || ""));
                            O &&
                            P.addClass(O);
                            E = null;
                            H && (D.append(H), H = null);
                            D.append(P.clone(1, 1))
                        } else R ? (E || (E = l.createElement(J), D.append(E), n && E.setAttribute("dir", F)), I && E.setAttribute("style", I), O && E.setAttribute("class", O), H && (E.append(H), H = null), E.append(P.clone(1, 1))) : D.append(P.clone(1, 1));
                        H && ((E || D).append(H), H = null);
                        D.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && u != a.length - 1 && (CKEDITOR.env.needsBrFiller && (F = D.getLast()) && F.type == CKEDITOR.NODE_ELEMENT && F.is("br") && F.remove(), (F = D.getLast(g)) && F.type == CKEDITOR.NODE_ELEMENT &&
                        F.is(CKEDITOR.dtd.$block) || D.append(l.createElement("br")));
                        F = D.$.nodeName.toLowerCase();
                        "div" != F && "p" != F || D.appendBogus();
                        m.append(D);
                        n = null;
                        u++
                    } else return null;
                    E = null;
                    if (a.length <= u || Math.max(a[u].indent, 0) < p)break
                }
                if (b)for (a = m.getFirst(); a;) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, l = e = d = void 0, d = c.getDirection()))) {
                        for (e = c.getParent(); e && !(l = e.getDirection());)e = e.getParent();
                        d == l && c.removeAttribute("dir")
                    }
                    a = a.getNextSourceNode()
                }
                return {
                    listNode: m,
                    nextIndex: u
                }
            }
        };
        var p = /^h[1-6]$/, u = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        e.prototype = {
            exec: function (b) {
                this.refresh(b, b.elementPath());
                var d = b.config, e = b.getSelection(), h = e && e.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var l = b.editable();
                    if (l.getFirst(g)) {
                        var k = 1 == h.length && h[0];
                        (d = k && k.getEnclosedNode()) && d.is && this.type == d.getName() && this.setState(CKEDITOR.TRISTATE_ON)
                    } else d.enterMode == CKEDITOR.ENTER_BR ? l.appendBogus() : h[0].fixBlock(1, d.enterMode == CKEDITOR.ENTER_P ? "p" : "div"),
                        e.selectRanges(h)
                }
                for (var d = e.createBookmarks(!0), l = [], m = {}, h = h.createIterator(), n = 0; (k = h.getNextRange()) && ++n;) {
                    var u = k.getBoundaryNodes(), x = u.startNode, z = u.endNode;
                    x.type == CKEDITOR.NODE_ELEMENT && "td" == x.getName() && k.setStartAt(u.startNode, CKEDITOR.POSITION_AFTER_START);
                    z.type == CKEDITOR.NODE_ELEMENT && "td" == z.getName() && k.setEndAt(u.endNode, CKEDITOR.POSITION_BEFORE_END);
                    k = k.createIterator();
                    for (k.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; u = k.getNextParagraph();)if (!u.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(m,
                            u, "list_block", 1);
                        for (var D = b.elementPath(u), x = D.elements, z = 0, D = D.blockLimit, F, E = x.length - 1; 0 <= E && (F = x[E]); E--)if (f[F.getName()] && D.contains(F)) {
                            D.removeCustomData("list_group_object_" + n);
                            (x = F.getCustomData("list_group_object")) ? x.contents.push(u) : (x = {
                                root: F,
                                contents: [u]
                            }, l.push(x), CKEDITOR.dom.element.setMarker(m, F, "list_group_object", x));
                            z = 1;
                            break
                        }
                        z || (z = D, z.getCustomData("list_group_object_" + n) ? z.getCustomData("list_group_object_" + n).contents.push(u) : (x = {
                            root: z,
                            contents: [u]
                        }, CKEDITOR.dom.element.setMarker(m,
                            z, "list_group_object_" + n, x), l.push(x)))
                    }
                }
                for (F = []; 0 < l.length;)if (x = l.shift(), this.state == CKEDITOR.TRISTATE_OFF)if (f[x.root.getName()]) {
                    h = b;
                    n = x;
                    x = m;
                    k = F;
                    z = CKEDITOR.plugins.list.listToArray(n.root, x);
                    D = [];
                    for (u = 0; u < n.contents.length; u++)E = n.contents[u], (E = E.getAscendant("li", !0)) && !E.getCustomData("list_item_processed") && (D.push(E), CKEDITOR.dom.element.setMarker(x, E, "list_item_processed", !0));
                    for (var E = n.root.getDocument(), J = void 0, G = void 0, u = 0; u < D.length; u++) {
                        var M = D[u].getCustomData("listarray_index"),
                            J = z[M].parent;
                        J.is(this.type) || (G = E.createElement(this.type), J.copyAttributes(G, {
                            start: 1,
                            type: 1
                        }), G.removeStyle("list-style-type"), z[M].parent = G)
                    }
                    x = CKEDITOR.plugins.list.arrayToList(z, x, null, h.config.enterMode);
                    z = void 0;
                    D = x.listNode.getChildCount();
                    for (u = 0; u < D && (z = x.listNode.getChild(u)); u++)z.getName() == this.type && k.push(z);
                    x.listNode.replace(n.root);
                    h.fire("contentDomInvalidated")
                } else {
                    z = b;
                    k = x;
                    u = F;
                    D = k.contents;
                    h = k.root.getDocument();
                    n = [];
                    1 == D.length && D[0].equals(k.root) && (x = h.createElement("div"),
                    D[0].moveChildren && D[0].moveChildren(x), D[0].append(x), D[0] = x);
                    k = k.contents[0].getParent();
                    for (E = 0; E < D.length; E++)k = k.getCommonAncestor(D[E].getParent());
                    J = z.config.useComputedState;
                    z = x = void 0;
                    J = void 0 === J || J;
                    for (E = 0; E < D.length; E++)for (G = D[E]; M = G.getParent();) {
                        if (M.equals(k)) {
                            n.push(G);
                            !z && G.getDirection() && (z = 1);
                            G = G.getDirection(J);
                            null !== x && (x = x && x != G ? null : G);
                            break
                        }
                        G = M
                    }
                    if (!(1 > n.length)) {
                        D = n[n.length - 1].getNext();
                        E = h.createElement(this.type);
                        u.push(E);
                        for (J = u = void 0; n.length;)u = n.shift(), J = h.createElement("li"),
                            G = u, G.is("pre") || p.test(G.getName()) || "false" == G.getAttribute("contenteditable") ? u.appendTo(J) : (u.copyAttributes(J), x && u.getDirection() && (J.removeStyle("direction"), J.removeAttribute("dir")), u.moveChildren(J), u.remove()), J.appendTo(E);
                        x && z && E.setAttribute("dir", x);
                        D ? E.insertBefore(D) : E.appendTo(k)
                    }
                } else this.state == CKEDITOR.TRISTATE_ON && f[x.root.getName()] && a.call(this, b, x, m);
                for (E = 0; E < F.length; E++)c(F[E]);
                CKEDITOR.dom.element.clearAllMarkers(m);
                e.selectBookmarks(d);
                b.focus()
            }, refresh: function (a,
                                  b) {
                var c = b.contains(f, 1), d = b.blockLimit || b.root;
                c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indentlist", init: function (a) {
                a.blockless || (a.addCommand("numberedlist", new e("numberedlist", "ol")), a.addCommand("bulletedlist", new e("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", {
                    label: a.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }),
                    a.ui.addButton("BulletedList", {
                        label: a.lang.list.bulletedlist,
                        command: "bulletedlist",
                        directional: !0,
                        toolbar: "list,20"
                    })), a.on("key", function (b) {
                    var c = b.data.domEvent.getKey(), e;
                    if ("wysiwyg" == a.mode && c in {8: 1, 46: 1}) {
                        var h = a.getSelection().getRanges()[0], k = h && h.startPath();
                        if (h && h.collapsed) {
                            var u = 8 == c, p = a.editable(), C = new CKEDITOR.dom.walker(h.clone());
                            C.evaluator = function (a) {
                                return g(a) && !n(a)
                            };
                            C.guard = function (a, b) {
                                return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
                            };
                            c = h.clone();
                            if (u) {
                                var x;
                                (x = k.contains(f)) && h.checkBoundaryOfElement(x, CKEDITOR.START) && (x = x.getParent()) && x.is("li") && (x = m(x)) ? (e = x, x = x.getPrevious(g), c.moveToPosition(x && n(x) ? x : e, CKEDITOR.POSITION_BEFORE_START)) : (C.range.setStartAt(p, CKEDITOR.POSITION_AFTER_START), C.range.setEnd(h.startContainer, h.startOffset), (x = C.previous()) && x.type == CKEDITOR.NODE_ELEMENT && (x.getName() in f || x.is("li")) && (x.is("li") || (C.range.selectNodeContents(x), C.reset(), C.evaluator = d, x = C.previous()), e = x, c.moveToElementEditEnd(e), c.moveToPosition(c.endPath().block,
                                    CKEDITOR.POSITION_BEFORE_END)));
                                if (e)l(a, c, h), b.cancel(); else {
                                    var z = k.contains(f);
                                    z && h.checkBoundaryOfElement(z, CKEDITOR.START) && (e = z.getFirst(g), h.checkBoundaryOfElement(e, CKEDITOR.START) && (x = z.getPrevious(g), m(e) ? x && (h.moveToElementEditEnd(x), h.select()) : a.execCommand("outdent"), b.cancel()))
                                }
                            } else if (e = k.contains("li")) {
                                if (C.range.setEndAt(p, CKEDITOR.POSITION_BEFORE_END), u = (p = e.getLast(g)) && d(p) ? p : e, k = 0, (x = C.next()) && x.type == CKEDITOR.NODE_ELEMENT && x.getName() in f && x.equals(p) ? (k = 1, x = C.next()) : h.checkBoundaryOfElement(u,
                                        CKEDITOR.END) && (k = 2), k && x) {
                                    h = h.clone();
                                    h.moveToElementEditStart(x);
                                    if (1 == k && (c.optimize(), !c.startContainer.equals(e))) {
                                        for (e = c.startContainer; e.is(CKEDITOR.dtd.$inline);)z = e, e = e.getParent();
                                        z && c.moveToPosition(z, CKEDITOR.POSITION_AFTER_END)
                                    }
                                    2 == k && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), h.endPath().block && h.moveToPosition(h.endPath().block, CKEDITOR.POSITION_AFTER_START));
                                    l(a, c, h);
                                    b.cancel()
                                }
                            } else C.range.setEndAt(p, CKEDITOR.POSITION_BEFORE_END), (x = C.next()) && x.type == CKEDITOR.NODE_ELEMENT &&
                            x.is(f) && (x = x.getFirst(g), k.block && h.checkStartOfBlock() && h.checkEndOfBlock() ? (k.block.remove(), h.moveToElementEditStart(x), h.select()) : m(x) ? (h.moveToElementEditStart(x), h.select()) : (h = h.clone(), h.moveToElementEditStart(x), l(a, c, h)), b.cancel());
                            setTimeout(function () {
                                a.selectionChange(1)
                            })
                        }
                    }
                }))
            }
        })
    }(),function () {
        CKEDITOR.plugins.liststyle = {
            requires: "dialog,contextmenu", init: function (a) {
                if (!a.blockless) {
                    var e;
                    e = new CKEDITOR.dialogCommand("numberedListStyle", {
                        requiredContent: "ol",
                        allowedContent: "ol{list-style-type}[start]"
                    });
                    e = a.addCommand("numberedListStyle", e);
                    a.addFeature(e);
                    CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                    e = new CKEDITOR.dialogCommand("bulletedListStyle", {
                        requiredContent: "ul",
                        allowedContent: "ul{list-style-type}"
                    });
                    e = a.addCommand("bulletedListStyle", e);
                    a.addFeature(e);
                    CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
                    a.addMenuGroup("list", 108);
                    a.addMenuItems({
                        numberedlist: {
                            label: a.lang.liststyle.numberedTitle,
                            group: "list",
                            command: "numberedListStyle"
                        },
                        bulletedlist: {
                            label: a.lang.liststyle.bulletedTitle,
                            group: "list",
                            command: "bulletedListStyle"
                        }
                    });
                    a.contextMenu.addListener(function (a) {
                        if (!a || a.isReadOnly())return null;
                        for (; a;) {
                            var c = a.getName();
                            if ("ol" == c)return {numberedlist: CKEDITOR.TRISTATE_OFF};
                            if ("ul" == c)return {bulletedlist: CKEDITOR.TRISTATE_OFF};
                            a = a.getParent()
                        }
                        return null
                    })
                }
            }
        };
        CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
    }(),"use strict",function () {
        function a(a, b, c) {
            return n(b) && n(c) && c.equals(b.getNext(function (a) {
                    return !(Z(a) ||
                    X(a) || p(a))
                }))
        }

        function e(a) {
            this.upper = a[0];
            this.lower = a[1];
            this.set.apply(this, a.slice(2))
        }

        function b(a) {
            var b = a.element;
            if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
                var c = m(b);
                if ("true" == c.getAttribute("contenteditable"))return b;
                if (c.is(a.triggers))return c
            }
            return null
        }

        function c(a, b, c) {
            w(a, b);
            w(a, c);
            a = b.size.bottom;
            c = c.size.top;
            return a && c ? 0 | (a + c) / 2 : a || c
        }

        function d(a, b, c) {
            return b = b[c ? "getPrevious" : "getNext"](function (b) {
                return b && b.type == CKEDITOR.NODE_TEXT && !Z(b) ||
                    n(b) && !p(b) && !g(a, b)
            })
        }

        function l(a, b, c) {
            return a > b && a < c
        }

        function m(a, b) {
            if (a.data("cke-editable"))return null;
            for (b || (a = a.getParent()); a && !a.data("cke-editable");) {
                if (a.hasAttribute("contenteditable"))return a;
                a = a.getParent()
            }
            return null
        }

        function f(a) {
            var b = a.doc, c = F('\x3cspan contenteditable\x3d"false" style\x3d"' + Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), d = CKEDITOR.getUrl(this.path + "images/" + (E.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
            z(c, {
                attach: function () {
                    this.wrap.getParent() ||
                    this.wrap.appendTo(a.editable, !0);
                    return this
                },
                lineChildren: [z(F('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', b), {
                    base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (E.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (E.hidpi ? "background-size: 9px 10px;" : ""),
                    looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;",
                        "top:-1px; border-radius: 0px 0px 2px 2px;"]
                }), z(F(V, b), {
                    base: Y + "left:0px;border-left-color:" + a.boxColor + ";",
                    looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                }), z(F(V, b), {
                    base: Y + "right:0px;border-right-color:" + a.boxColor + ";",
                    looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
                })],
                detach: function () {
                    this.wrap.getParent() && this.wrap.remove();
                    return this
                },
                mouseNear: function () {
                    w(a,
                        this);
                    var b = a.holdDistance, c = this.size;
                    return c && l(a.mouse.y, c.top - b, c.bottom + b) && l(a.mouse.x, c.left - b, c.right + b) ? !0 : !1
                },
                place: function () {
                    var b = a.view, c = a.editable, d = a.trigger, e = d.upper, f = d.lower, g = e || f, h = g.getParent(), k = {};
                    this.trigger = d;
                    e && w(a, e, !0);
                    f && w(a, f, !0);
                    w(a, h, !0);
                    a.inInlineMode && y(a, !0);
                    h.equals(c) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left +
                        g.size.margin.right + b.scroll.x, k.right = "");
                    e && f ? k.top = e.size.margin.bottom === f.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < f.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - f.size.margin.top : e ? f || (k.top = e.size.bottom + e.size.margin.bottom) : k.top = f.size.top - f.size.margin.top;
                    d.is(T) || l(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(T)) : d.is(H) || l(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ?
                    b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(H)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top), this.look(K));
                    a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left);
                    for (var m in k)k[m] = CKEDITOR.tools.cssLength(k[m]);
                    this.setStyles(k)
                },
                look: function (a) {
                    if (this.oldLook != a) {
                        for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                        this.oldLook = a
                    }
                },
                wrap: new D("span",
                    a.doc)
            });
            for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c);
            c.look(K);
            c.appendTo(c.wrap);
            c.unselectable();
            c.lineChildren[0].on("mouseup", function (b) {
                c.detach();
                h(a, function (b) {
                    var c = a.line.trigger;
                    b[c.is(O) ? "insertBefore" : "insertAfter"](c.is(O) ? c.lower : c.upper)
                }, !0);
                a.editor.focus();
                E.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                b.data.preventDefault(!0)
            });
            c.on("mousedown", function (a) {
                a.data.preventDefault(!0)
            });
            a.line = c
        }

        function h(a, b, c) {
            var d = new CKEDITOR.dom.range(a.doc),
                e = a.editor, f;
            E.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(ca) : (f = (f = m(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new D(M[f], a.doc), f.is("br") || a.doc.createText(ca).appendTo(f));
            c && e.fire("saveSnapshot");
            b(f);
            d.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
            e.getSelection().selectRanges([d]);
            a.hotNode = f;
            c && e.fire("saveSnapshot")
        }

        function k(a, c) {
            return {
                canUndo: !0, modes: {wysiwyg: 1}, exec: function () {
                    function e(b) {
                        var d = E.ie && 9 > E.version ? " " : ca, f = a.hotNode && a.hotNode.getText() ==
                            d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
                        h(a, function (d) {
                            f && a.hotNode && a.hotNode.remove();
                            d[c ? "insertAfter" : "insertBefore"](b);
                            d.setAttributes({"data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c});
                            a.lastCmdDirection = !!c
                        });
                        E.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                        a.line.detach()
                    }

                    return function (f) {
                        f = f.getSelection().getStartElement();
                        var g;
                        f = f.getAscendant(N, 1);
                        if (!t(a, f) && f && !f.equals(a.editable) && !f.contains(a.editable)) {
                            (g = m(f)) && "false" == g.getAttribute("contenteditable") &&
                            (f = g);
                            a.element = f;
                            g = d(a, f, !c);
                            var h;
                            n(g) && g.is(a.triggers) && g.is(L) && (!d(a, g, !c) || (h = d(a, g, !c)) && n(h) && h.is(a.triggers)) ? e(g) : (h = b(a, f), n(h) && (d(a, h, !c) ? (f = d(a, h, !c)) && n(f) && f.is(a.triggers) && e(h) : e(h)))
                        }
                    }
                }()
            }
        }

        function g(a, b) {
            if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$)return !1;
            var c = a.line;
            return c.wrap.equals(b) || c.wrap.contains(b)
        }

        function n(a) {
            return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
        }

        function p(a) {
            if (!n(a))return !1;
            var b;
            (b = u(a)) || (n(a) ? (b = {
                left: 1,
                right: 1,
                center: 1
            }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1);
            return b
        }

        function u(a) {
            return !!{absolute: 1, fixed: 1}[a.getComputedStyle("position")]
        }

        function v(a, b) {
            return n(b) ? b.is(a.triggers) : null
        }

        function t(a, b) {
            if (!b)return !1;
            for (var c = b.getParents(1), d = c.length; d--;)for (var e = a.tabuList.length; e--;)if (c[d].hasAttribute(a.tabuList[e]))return !0;
            return !1
        }

        function r(a, b, c) {
            b = b[c ? "getLast" : "getFirst"](function (b) {
                return a.isRelevant(b) && !b.is(U)
            });
            if (!b)return !1;
            w(a, b);
            return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
        }

        function q(a) {
            var b =
                a.editable, c = a.mouse, d = a.view, f = a.triggerOffset;
            y(a);
            var h = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2), b = b[h ? "getLast" : "getFirst"](function (a) {
                return !(Z(a) || X(a))
            });
            if (!b)return null;
            g(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function (a) {
                return !(Z(a) || X(a))
            }));
            if (!n(b) || p(b) || !v(a, b))return null;
            w(a, b);
            return !h && 0 <= b.size.top && l(c.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === d.scroll.y ? T : K, new e([null, b, O, P, a])) : h && b.size.bottom <= d.pane.height &&
            l(c.y, b.size.bottom - f, d.pane.height) ? (a = a.inInlineMode || l(b.size.bottom, d.pane.height - f, d.pane.height) ? H : K, new e([b, null, I, P, a])) : null
        }

        function A(a) {
            var c = a.mouse, f = a.view, g = a.triggerOffset, h = b(a);
            if (!h)return null;
            w(a, h);
            var g = Math.min(g, 0 | h.size.outerHeight / 2), k = [], m, q;
            if (l(c.y, h.size.top - 1, h.size.top + g))q = !1; else if (l(c.y, h.size.bottom - g, h.size.bottom + 1))q = !0; else return null;
            if (p(h) || r(a, h, q) || h.getParent().is(W))return null;
            var t = d(a, h, !q);
            if (t) {
                if (t && t.type == CKEDITOR.NODE_TEXT)return null;
                if (n(t)) {
                    if (p(t) || !v(a, t) || t.getParent().is(W))return null;
                    k = [t, h][q ? "reverse" : "concat"]().concat([R, P])
                }
            } else h.equals(a.editable[q ? "getLast" : "getFirst"](a.isRelevant)) ? (y(a), q && l(c.y, h.size.bottom - g, f.pane.height) && l(h.size.bottom, f.pane.height - g, f.pane.height) ? m = H : l(c.y, 0, h.size.top + g) && (m = T)) : m = K, k = [null, h][q ? "reverse" : "concat"]().concat([q ? I : O, P, m, h.equals(a.editable[q ? "getLast" : "getFirst"](a.isRelevant)) ? q ? H : T : K]);
            return 0 in k ? new e(k) : null
        }

        function B(a, b, c, d) {
            for (var e = b.getDocumentPosition(), f = {}, g = {}, h = {},
                     l = {}, k = ba.length; k--;)f[ba[k]] = parseInt(b.getComputedStyle.call(b, "border-" + ba[k] + "-width"), 10) || 0, h[ba[k]] = parseInt(b.getComputedStyle.call(b, "padding-" + ba[k]), 10) || 0, g[ba[k]] = parseInt(b.getComputedStyle.call(b, "margin-" + ba[k]), 10) || 0;
            c && !d || C(a, d);
            l.top = e.y - (c ? 0 : a.view.scroll.y);
            l.left = e.x - (c ? 0 : a.view.scroll.x);
            l.outerWidth = b.$.offsetWidth;
            l.outerHeight = b.$.offsetHeight;
            l.height = l.outerHeight - (h.top + h.bottom + f.top + f.bottom);
            l.width = l.outerWidth - (h.left + h.right + f.left + f.right);
            l.bottom = l.top + l.outerHeight;
            l.right = l.left + l.outerWidth;
            a.inInlineMode && (l.scroll = {top: b.$.scrollTop, left: b.$.scrollLeft});
            return z({border: f, padding: h, margin: g, ignoreScroll: c}, l, !0)
        }

        function w(a, b, c) {
            if (!n(b))return b.size = null;
            if (!b.size)b.size = {}; else if (b.size.ignoreScroll == c && b.size.date > new Date - S)return null;
            return z(b.size, B(a, b, c), {date: +new Date}, !0)
        }

        function y(a, b) {
            a.view.editable = B(a, a.editable, b, !0)
        }

        function C(a, b) {
            a.view || (a.view = {});
            var c = a.view;
            if (!(!b && c && c.date > new Date - S)) {
                var d = a.win, c = d.getScrollPosition(),
                    d = d.getViewPaneSize();
                z(a.view, {
                    scroll: {
                        x: c.x,
                        y: c.y,
                        width: a.doc.$.documentElement.scrollWidth - d.width,
                        height: a.doc.$.documentElement.scrollHeight - d.height
                    }, pane: {width: d.width, height: d.height, bottom: d.height + c.y}, date: +new Date
                }, !0)
            }
        }

        function x(a, b, c, d) {
            for (var f = d, g = d, h = 0, l = !1, k = !1, m = a.view.pane.height, n = a.mouse; n.y + h < m && 0 < n.y - h;) {
                l || (l = b(f, d));
                k || (k = b(g, d));
                !l && 0 < n.y - h && (f = c(a, {x: n.x, y: n.y - h}));
                !k && n.y + h < m && (g = c(a, {x: n.x, y: n.y + h}));
                if (l && k)break;
                h += 2
            }
            return new e([f, g, null, null])
        }

        CKEDITOR.plugins.add("magicline",
            {
                init: function (a) {
                    var c = a.config, l = c.magicline_triggerOffset || 30, m = {
                        editor: a,
                        enterMode: c.enterMode,
                        triggerOffset: l,
                        holdDistance: 0 | l * (c.magicline_holdDistance || .5),
                        boxColor: c.magicline_color || "#ff0000",
                        rtl: "rtl" == c.contentsLangDirection,
                        tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
                        triggers: c.magicline_everywhere ? N : {
                            table: 1,
                            hr: 1,
                            div: 1,
                            ul: 1,
                            ol: 1,
                            dl: 1,
                            form: 1,
                            blockquote: 1
                        }
                    }, v, r, w;
                    m.isRelevant = function (a) {
                        return n(a) && !g(m, a) && !p(a)
                    };
                    a.on("contentDom", function () {
                        var l = a.editable(),
                            n = a.document, p = a.window;
                        z(m, {editable: l, inInlineMode: l.isInline(), doc: n, win: p, hotNode: null}, !0);
                        m.boundary = m.inInlineMode ? m.editable : m.doc.getDocumentElement();
                        l.is(G.$inline) || (m.inInlineMode && !u(l) && l.setStyles({
                            position: "relative",
                            top: null,
                            left: null
                        }), f.call(this, m), C(m), l.attachListener(a, "beforeUndoImage", function () {
                            m.line.detach()
                        }), l.attachListener(a, "beforeGetData", function () {
                                m.line.wrap.getParent() && (m.line.detach(), a.once("getData", function () {
                                    m.line.attach()
                                }, null, null, 1E3))
                            }, null, null,
                            0), l.attachListener(m.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                            if ("wysiwyg" == a.mode)if (m.inInlineMode) {
                                var c = b.data.$.clientX;
                                b = b.data.$.clientY;
                                C(m);
                                y(m, !0);
                                var d = m.view.editable, e = m.view.scroll;
                                c > d.left - e.x && c < d.right - e.x && b > d.top - e.y && b < d.bottom - e.y || (clearTimeout(w), w = null, m.line.detach())
                            } else clearTimeout(w), w = null, m.line.detach()
                        }), l.attachListener(l, "keyup", function () {
                            m.hiddenMode = 0
                        }), l.attachListener(l, "keydown", function (b) {
                            if ("wysiwyg" == a.mode)switch (b.data.getKeystroke()) {
                                case 2228240:
                                case 16:
                                    m.hiddenMode =
                                        1, m.line.detach()
                            }
                        }), l.attachListener(m.inInlineMode ? l : n, "mousemove", function (b) {
                            r = !0;
                            if ("wysiwyg" == a.mode && !a.readOnly && !w) {
                                var c = {x: b.data.$.clientX, y: b.data.$.clientY};
                                w = setTimeout(function () {
                                    m.mouse = c;
                                    w = m.trigger = null;
                                    C(m);
                                    r && !m.hiddenMode && a.focusManager.hasFocus && !m.line.mouseNear() && (m.element = da(m, !0)) && ((m.trigger = q(m) || A(m) || fa(m)) && !t(m, m.trigger.upper || m.trigger.lower) ? m.line.attach().place() : (m.trigger = null, m.line.detach()), r = !1)
                                }, 30)
                            }
                        }), l.attachListener(p, "scroll", function () {
                            "wysiwyg" ==
                            a.mode && (m.line.detach(), E.webkit && (m.hiddenMode = 1, clearTimeout(v), v = setTimeout(function () {
                                m.mouseDown || (m.hiddenMode = 0)
                            }, 50)))
                        }), l.attachListener(J ? n : p, "mousedown", function () {
                            "wysiwyg" == a.mode && (m.line.detach(), m.hiddenMode = 1, m.mouseDown = 1)
                        }), l.attachListener(J ? n : p, "mouseup", function () {
                            m.hiddenMode = 0;
                            m.mouseDown = 0
                        }), a.addCommand("accessPreviousSpace", k(m)), a.addCommand("accessNextSpace", k(m, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, "accessPreviousSpace"], [c.magicline_keystrokeNext, "accessNextSpace"]]),
                            a.on("loadSnapshot", function () {
                                var b, c, d, e;
                                for (e in{
                                    p: 1,
                                    br: 1,
                                    div: 1
                                })for (b = a.document.getElementsByTag(e), d = b.count(); d--;)if ((c = b.getItem(d)).data("cke-magicline-hot")) {
                                    m.hotNode = c;
                                    m.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1;
                                    return
                                }
                            }), this.backdoor = {
                            accessFocusSpace: h,
                            boxTrigger: e,
                            isLine: g,
                            getAscendantTrigger: b,
                            getNonEmptyNeighbour: d,
                            getSize: B,
                            that: m,
                            triggerEdge: A,
                            triggerEditable: q,
                            triggerExpand: fa
                        })
                    }, this)
                }
            });
        var z = CKEDITOR.tools.extend, D = CKEDITOR.dom.element, F = D.createFromHtml,
            E = CKEDITOR.env, J = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, G = CKEDITOR.dtd, M = {}, O = 128, I = 64, R = 32, P = 16, T = 4, H = 2, K = 1, ca = " ", W = G.$listItem, U = G.$tableContent, L = z({}, G.$nonEditable, G.$empty), N = G.$block, S = 100, Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", Y = Q + "border-color:transparent;display:block;border-style:solid;", V = "\x3cspan\x3e" + ca + "\x3c/span\x3e";
        M[CKEDITOR.ENTER_BR] = "br";
        M[CKEDITOR.ENTER_P] = "p";
        M[CKEDITOR.ENTER_DIV] =
            "div";
        e.prototype = {
            set: function (a, b, c) {
                this.properties = a + b + (c || K);
                return this
            }, is: function (a) {
                return (this.properties & a) == a
            }
        };
        var da = function () {
            function a(b, c) {
                var d = b.$.elementFromPoint(c.x, c.y);
                return d && d.nodeType ? new CKEDITOR.dom.element(d) : null
            }

            return function (b, c, d) {
                if (!b.mouse)return null;
                var e = b.doc, f = b.line.wrap;
                d = d || b.mouse;
                var h = a(e, d);
                c && g(b, h) && (f.hide(), h = a(e, d), f.show());
                return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || E.ie && 9 > E.version && !b.boundary.equals(h) && !b.boundary.contains(h) ?
                    null : h
            }
        }(), Z = CKEDITOR.dom.walker.whitespaces(), X = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), fa = function () {
            function b(e) {
                var f = e.element, g, h, k;
                if (!n(f) || f.contains(e.editable) || f.isReadOnly())return null;
                k = x(e, function (a, b) {
                    return !b.equals(a)
                }, function (a, b) {
                    return da(a, !0, b)
                }, f);
                g = k.upper;
                h = k.lower;
                if (a(e, g, h))return k.set(R, 8);
                if (g && f.contains(g))for (; !g.getParent().equals(f);)g = g.getParent(); else g = f.getFirst(function (a) {
                    return d(e, a)
                });
                if (h && f.contains(h))for (; !h.getParent().equals(f);)h =
                    h.getParent(); else h = f.getLast(function (a) {
                    return d(e, a)
                });
                if (!g || !h)return null;
                w(e, g);
                w(e, h);
                if (!l(e.mouse.y, g.size.top, h.size.bottom))return null;
                for (var f = Number.MAX_VALUE, m, q, t, v; h && !h.equals(g) && (q = g.getNext(e.isRelevant));)m = Math.abs(c(e, g, q) - e.mouse.y), m < f && (f = m, t = g, v = q), g = q, w(e, g);
                if (!t || !v || !l(e.mouse.y, t.size.top, v.size.bottom))return null;
                k.upper = t;
                k.lower = v;
                return k.set(R, 8)
            }

            function d(a, b) {
                return !(b && b.type == CKEDITOR.NODE_TEXT || X(b) || p(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ &&
                b.is("br"))
            }

            return function (c) {
                var d = b(c), e;
                if (e = d) {
                    e = d.upper;
                    var f = d.lower;
                    e = !e || !f || p(f) || p(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : v(c, e) && v(c, f) && a(c, e, f) ? !0 : !1
                }
                return e ? d : null
            }
        }(), ba = ["top", "left", "right", "bottom"]
    }(),CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51,CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52,function () {
        function a(a) {
            if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName())return [];
            for (var b = [], c = ["style",
                "className"], d = 0; d < c.length; d++) {
                var e = a.$.elements.namedItem(c[d]);
                e && (e = new CKEDITOR.dom.element(e), b.push([e, e.nextSibling]), e.remove())
            }
            return b
        }

        function e(a, b) {
            if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length)for (var c = b.length - 1; 0 <= c; c--) {
                var d = b[c][0], e = b[c][1];
                e ? d.insertBefore(e) : d.appendTo(a)
            }
        }

        function b(b, c) {
            var d = a(b), h = {}, k = b.$;
            c || (h["class"] = k.className || "", k.className = "");
            h.inline = k.style.cssText || "";
            c || (k.style.cssText = "position: static; overflow: visible");
            e(d);
            return h
        }

        function c(b, c) {
            var d = a(b), h = b.$;
            "class" in c && (h.className = c["class"]);
            "inline" in c && (h.style.cssText = c.inline);
            e(d)
        }

        function d(a) {
            if (!a.editable().isInline()) {
                var b = CKEDITOR.instances, c;
                for (c in b) {
                    var d = b[c];
                    "wysiwyg" != d.mode || d.readOnly || (d = d.document.getBody(), d.setAttribute("contentEditable", !1), d.setAttribute("contentEditable", !0))
                }
                a.editable().hasFocus && (a.toolbox.focus(), a.focus())
            }
        }

        CKEDITOR.plugins.add("maximize", {
            init: function (a) {
                function e() {
                    var b = k.getViewPaneSize();
                    a.resize(b.width,
                        b.height, null, !0)
                }

                if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = a.lang, h = CKEDITOR.document, k = h.getWindow(), g, n, p, u = CKEDITOR.TRISTATE_OFF;
                    a.addCommand("maximize", {
                        modes: {wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS},
                        readOnly: 1,
                        editorFocus: !1,
                        exec: function () {
                            var v = a.container.getFirst(function (a) {
                                return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
                            }), t = a.ui.space("contents");
                            if ("wysiwyg" == a.mode) {
                                var r = a.getSelection();
                                g = r && r.getRanges();
                                n = k.getScrollPosition()
                            } else {
                                var q = a.editable().$;
                                g = !CKEDITOR.env.ie && [q.selectionStart, q.selectionEnd];
                                n = [q.scrollLeft, q.scrollTop]
                            }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                k.on("resize", e);
                                p = k.getScrollPosition();
                                for (r = a.container; r = r.getParent();)r.setCustomData("maximize_saved_styles", b(r)), r.setStyle("z-index", a.config.baseFloatZIndex - 5);
                                t.setCustomData("maximize_saved_styles", b(t, !0));
                                v.setCustomData("maximize_saved_styles", b(v, !0));
                                t = {overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0};
                                h.getDocumentElement().setStyles(t);
                                !CKEDITOR.env.gecko &&
                                h.getDocumentElement().setStyle("position", "fixed");
                                CKEDITOR.env.gecko && CKEDITOR.env.quirks || h.getBody().setStyles(t);
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    k.$.scrollTo(0, 0)
                                }, 0) : k.$.scrollTo(0, 0);
                                v.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                v.$.offsetLeft;
                                v.setStyles({"z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px"});
                                v.addClass("cke_maximized");
                                e();
                                t = v.getDocumentPosition();
                                v.setStyles({left: -1 * t.x + "px", top: -1 * t.y + "px"});
                                CKEDITOR.env.gecko && d(a)
                            } else if (this.state ==
                                CKEDITOR.TRISTATE_ON) {
                                k.removeListener("resize", e);
                                for (var r = [t, v], A = 0; A < r.length; A++)c(r[A], r[A].getCustomData("maximize_saved_styles")), r[A].removeCustomData("maximize_saved_styles");
                                for (r = a.container; r = r.getParent();)c(r, r.getCustomData("maximize_saved_styles")), r.removeCustomData("maximize_saved_styles");
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    k.$.scrollTo(p.x, p.y)
                                }, 0) : k.$.scrollTo(p.x, p.y);
                                v.removeClass("cke_maximized");
                                CKEDITOR.env.webkit && (v.setStyle("display", "inline"), setTimeout(function () {
                                    v.setStyle("display",
                                        "block")
                                }, 0));
                                a.fire("resize", {
                                    outerHeight: a.container.$.offsetHeight,
                                    contentsHeight: t.$.offsetHeight,
                                    outerWidth: a.container.$.offsetWidth
                                })
                            }
                            this.toggleState();
                            if (r = this.uiItems[0])t = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, r = CKEDITOR.document.getById(r._.id), r.getChild(1).setHtml(t), r.setAttribute("title", t), r.setAttribute("href", 'javascript:void("' + t + '");');
                            "wysiwyg" == a.mode ? g ? (CKEDITOR.env.gecko && d(a), a.getSelection().selectRanges(g), (q = a.getSelection().getStartElement()) &&
                            q.scrollIntoView(!0)) : k.$.scrollTo(n.x, n.y) : (g && (q.selectionStart = g[0], q.selectionEnd = g[1]), q.scrollLeft = n[0], q.scrollTop = n[1]);
                            g = n = null;
                            u = this.state;
                            a.fire("maximize", this.state)
                        },
                        canUndo: !1
                    });
                    a.ui.addButton && a.ui.addButton("Maximize", {
                        label: f.maximize.maximize,
                        command: "maximize",
                        toolbar: "tools,10"
                    });
                    a.on("mode", function () {
                        var b = a.getCommand("maximize");
                        b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : u)
                    }, null, null, 100)
                }
            }
        })
    }(),CKEDITOR.plugins.add("newpage", {
        init: function (a) {
            a.addCommand("newpage",
                {
                    modes: {wysiwyg: 1, source: 1}, exec: function (a) {
                    var b = this;
                    a.setData(a.config.newpage_html || "", function () {
                        a.focus();
                        setTimeout(function () {
                            a.fire("afterCommandExec", {name: "newpage", command: b});
                            a.selectionChange()
                        }, 200)
                    })
                }, async: !0
                });
            a.ui.addButton && a.ui.addButton("NewPage", {
                label: a.lang.newpage.toolbar,
                command: "newpage",
                toolbar: "document,20"
            })
        }
    }),"use strict",function () {
        function a(a) {
            return {
                "aria-label": a,
                "class": "cke_pagebreak",
                contenteditable: "false",
                "data-cke-display-name": "pagebreak",
                "data-cke-pagebreak": 1,
                style: "page-break-after: always",
                title: a
            }
        }

        CKEDITOR.plugins.add("pagebreak", {
            requires: "fakeobjects", onLoad: function () {
                var a = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;");
                CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
            }, init: function (a) {
                a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton &&
                a.ui.addButton("PageBreak", {
                    label: a.lang.pagebreak.toolbar,
                    command: "pagebreak",
                    toolbar: "insert,70"
                }), CKEDITOR.env.webkit && a.on("contentDom", function () {
                    a.document.on("click", function (b) {
                        b = b.data.getTarget();
                        b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b)
                    })
                }))
            }, afterInit: function (e) {
                function b(b) {
                    CKEDITOR.tools.extend(b.attributes, a(e.lang.pagebreak.alt), !0);
                    b.children.length = 0
                }

                var c = e.dataProcessor, d = c && c.dataFilter, c = c && c.htmlFilter, l = /page-break-after\s*:\s*always/i, m =
                    /display\s*:\s*none/i;
                c && c.addRules({
                    attributes: {
                        "class": function (a, b) {
                            var c = a.replace("cke_pagebreak", "");
                            if (c != a) {
                                var d = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
                                b.children.length = 0;
                                b.add(d);
                                d = b.attributes;
                                delete d["aria-label"];
                                delete d.contenteditable;
                                delete d.title
                            }
                            return c
                        }
                    }
                }, {applyToAll: !0, priority: 5});
                d && d.addRules({
                    elements: {
                        div: function (a) {
                            if (a.attributes["data-cke-pagebreak"])b(a); else if (l.test(a.attributes.style)) {
                                var c =
                                    a.children[0];
                                c && "span" == c.name && m.test(c.attributes.style) && b(a)
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.plugins.pagebreakCmd = {
            exec: function (e) {
                var b = e.document.createElement("div", {attributes: a(e.lang.pagebreak.alt)});
                e.insertElement(b)
            }, context: "div", allowedContent: {
                div: {styles: "!page-break-after"}, span: {
                    match: function (a) {
                        return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"]
                    }, styles: "display"
                }
            }, requiredContent: "div{page-break-after}"
        }
    }(),function () {
        function a(a, c, d) {
            var e = CKEDITOR.cleanWord;
            e ? d() :
                (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || c + "filter/default.js"), CKEDITOR.scriptLoader.load(a, d, null, !0));
            return !e
        }

        function e(a) {
            a.data.type = "html"
        }

        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard", init: function (b) {
                var c = 0, d = this.path;
                b.addCommand("pastefromword", {
                    canUndo: !1, async: !0, exec: function (a) {
                        var b = this;
                        c = 1;
                        a.once("beforePaste", e);
                        a.getClipboardData({title: a.lang.pastefromword.title}, function (c) {
                            c && a.fire("paste", {
                                type: "html",
                                dataValue: c.dataValue,
                                method: "paste",
                                dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer()
                            });
                            a.fire("afterCommandExec", {name: "pastefromword", command: b, returnValue: !!c})
                        })
                    }
                });
                b.ui.addButton && b.ui.addButton("PasteFromWord", {
                    label: b.lang.pastefromword.toolbar,
                    command: "pastefromword",
                    toolbar: "clipboard,50"
                });
                b.on("pasteState", function (a) {
                    b.getCommand("pastefromword").setState(a.data)
                });
                b.on("paste", function (e) {
                    var m = e.data, f = m.dataValue;
                    if (f && (c || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(f))) {
                        m.dontFilter = !0;
                        var h = a(b, d, function () {
                            if (h)b.fire("paste", m); else if (!b.config.pasteFromWordPromptCleanup ||
                                c || confirm(b.lang.pastefromword.confirmCleanup))m.dataValue = CKEDITOR.cleanWord(f, b);
                            c = 0
                        });
                        h && e.cancel()
                    }
                }, null, null, 3)
            }
        })
    }(),function () {
        var a = {
            canUndo: !1, async: !0, exec: function (e) {
                e.getClipboardData({title: e.lang.pastetext.title}, function (b) {
                    b && e.fire("paste", {
                        type: "text",
                        dataValue: b.dataValue,
                        method: "paste",
                        dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer()
                    });
                    e.fire("afterCommandExec", {name: "pastetext", command: a, returnValue: !!b})
                })
            }
        };
        CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard",
            init: function (e) {
                e.addCommand("pastetext", a);
                e.ui.addButton && e.ui.addButton("PasteText", {
                    label: e.lang.pastetext.button,
                    command: "pastetext",
                    toolbar: "clipboard,40"
                });
                if (e.config.forcePasteAsPlainText)e.on("beforePaste", function (a) {
                    "html" != a.data.type && (a.data.type = "text")
                });
                e.on("pasteState", function (a) {
                    e.getCommand("pastetext").setState(a.data)
                })
            }
        })
    }(),function () {
        var a, e = {
            modes: {wysiwyg: 1, source: 1}, canUndo: !1, readOnly: 1, exec: function (b) {
                var c, d = b.config, e = d.baseHref ? '\x3cbase href\x3d"' + d.baseHref +
                '"/\x3e' : "";
                if (d.fullPage)c = b.getData().replace(/<head>/, "$\x26" + e).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + b.lang.preview.preview); else {
                    var d = "\x3cbody ", m = b.document && b.document.getBody();
                    m && (m.getAttribute("id") && (d += 'id\x3d"' + m.getAttribute("id") + '" '), m.getAttribute("class") && (d += 'class\x3d"' + m.getAttribute("class") + '" '));
                    d += "\x3e";
                    c = b.config.docType + '\x3chtml dir\x3d"' + b.config.contentsLangDirection + '"\x3e\x3chead\x3e' + e + "\x3ctitle\x3e" + b.lang.preview.preview + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) +
                        "\x3c/head\x3e" + d + b.getData() + "\x3c/body\x3e\x3c/html\x3e"
                }
                e = 640;
                d = 420;
                m = 80;
                try {
                    var f = window.screen, e = Math.round(.8 * f.width), d = Math.round(.7 * f.height), m = Math.round(.1 * f.width)
                } catch (h) {
                }
                if (!1 === b.fire("contentPreview", b = {dataValue: c}))return !1;
                var f = "", k;
                CKEDITOR.env.ie && (window._cke_htmlToLoad = b.dataValue, k = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )",
                    f = "");
                CKEDITOR.env.gecko && (window._cke_htmlToLoad = b.dataValue, f = CKEDITOR.getUrl(a + "preview.html"));
                f = window.open(f, null, "toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d" + e + ",height\x3d" + d + ",left\x3d" + m);
                CKEDITOR.env.ie && f && (f.location = k);
                CKEDITOR.env.ie || CKEDITOR.env.gecko || (k = f.document, k.open(), k.write(b.dataValue), k.close());
                return !0
            }
        };
        CKEDITOR.plugins.add("preview", {
            init: function (b) {
                b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a = this.path,
                    b.addCommand("preview", e), b.ui.addButton && b.ui.addButton("Preview", {
                    label: b.lang.preview.preview,
                    command: "preview",
                    toolbar: "document,40"
                }))
            }
        })
    }(),CKEDITOR.plugins.add("print", {
        init: function (a) {
            a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", {
                label: a.lang.print.toolbar,
                command: "print",
                toolbar: "document,50"
            }))
        }
    }),CKEDITOR.plugins.print = {
        exec: function (a) {
            CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print")
        },
        canUndo: !1, readOnly: 1, modes: {wysiwyg: 1}
    },CKEDITOR.plugins.add("removeformat", {
        init: function (a) {
            a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
            a.ui.addButton && a.ui.addButton("RemoveFormat", {
                label: a.lang.removeformat.toolbar,
                command: "removeFormat",
                toolbar: "cleanup,10"
            })
        }
    }),CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (a) {
                    for (var e = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$",
                            "i")), b = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, d = a.getSelection().getRanges(), l = d.createIterator(), m = function (a) {
                        return a.type == CKEDITOR.NODE_ELEMENT
                    }, f; f = l.getNextRange();) {
                        f.collapsed || f.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var h = f.createBookmark(), k = h.startNode, g = h.endNode, n = function (b) {
                            for (var d = a.elementPath(b), f = d.elements, g = 1, h; (h = f[g]) && !h.equals(d.block) && !h.equals(d.blockLimit); g++)e.test(h.getName()) &&
                            c(a, h) && b.breakParent(h)
                        };
                        n(k);
                        if (g)for (n(g), k = k.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); k && !k.equals(g);)if (k.isReadOnly()) {
                            if (k.getPosition(g) & CKEDITOR.POSITION_CONTAINS)break;
                            k = k.getNext(m)
                        } else n = k.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == k.getName() && k.data("cke-realelement") || !c(a, k) || (e.test(k.getName()) ? k.remove(1) : (k.removeAttributes(b), a.fire("removeFormatCleanup", k))), k = n;
                        f.moveToBookmark(h)
                    }
                    a.forceNextSelectionCheck();
                    a.getSelection().selectRanges(d)
                }
            }
        }, filter: function (a,
                             e) {
            for (var b = a._.removeFormatFilters || [], c = 0; c < b.length; c++)if (!1 === b[c](e))return !1;
            return !0
        }
    },CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) {
        this._.removeFormatFilters || (this._.removeFormatFilters = []);
        this._.removeFormatFilters.push(a)
    },CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize",
        {
            init: function (a) {
                function e(b) {
                    var d = h.width, e = h.height, m = d + (b.data.$.screenX - f.x) * ("rtl" == l ? -1 : 1);
                    b = e + (b.data.$.screenY - f.y);
                    k && (d = Math.max(c.resize_minWidth, Math.min(m, c.resize_maxWidth)));
                    g && (e = Math.max(c.resize_minHeight, Math.min(b, c.resize_maxHeight)));
                    a.resize(k ? d : null, e)
                }

                function b() {
                    CKEDITOR.document.removeListener("mousemove", e);
                    CKEDITOR.document.removeListener("mouseup", b);
                    a.document && (a.document.removeListener("mousemove", e), a.document.removeListener("mouseup", b))
                }

                var c = a.config, d = a.ui.spaceId("resizer"),
                    l = a.element ? a.element.getDirection(1) : "ltr";
                !c.resize_dir && (c.resize_dir = "vertical");
                void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3E3);
                void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3E3);
                void 0 === c.resize_minWidth && (c.resize_minWidth = 750);
                void 0 === c.resize_minHeight && (c.resize_minHeight = 250);
                if (!1 !== c.resize_enabled) {
                    var m = null, f, h, k = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth, g = ("both" == c.resize_dir || "vertical" == c.resize_dir) && c.resize_minHeight !=
                        c.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (d) {
                        m || (m = a.getResizable());
                        h = {width: m.$.offsetWidth || 0, height: m.$.offsetHeight || 0};
                        f = {x: d.screenX, y: d.screenY};
                        c.resize_minWidth > h.width && (c.resize_minWidth = h.width);
                        c.resize_minHeight > h.height && (c.resize_minHeight = h.height);
                        CKEDITOR.document.on("mousemove", e);
                        CKEDITOR.document.on("mouseup", b);
                        a.document && (a.document.on("mousemove", e), a.document.on("mouseup", b));
                        d.preventDefault && d.preventDefault()
                    });
                    a.on("destroy", function () {
                        CKEDITOR.tools.removeFunction(n)
                    });
                    a.on("uiSpace", function (b) {
                        if ("bottom" == b.data.space) {
                            var c = "";
                            k && !g && (c = " cke_resizer_horizontal");
                            !k && g && (c = " cke_resizer_vertical");
                            var e = '\x3cspan id\x3d"' + d + '" class\x3d"cke_resizer' + c + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == l ? "◢" : "◣") + "\x3c/span\x3e";
                            "ltr" == l && "ltr" == c ? b.data.html += e : b.data.html = e + b.data.html
                        }
                    }, a, null, 100);
                    a.on("maximize", function (b) {
                        a.ui.space("resizer")[b.data ==
                        CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                    })
                }
            }
        }),function () {
        var a = {
            readOnly: 1, exec: function (a) {
                if (a.fire("save") && (a = a.element.$.form))try {
                    a.submit()
                } catch (b) {
                    a.submit.click && a.submit.click()
                }
            }
        };
        CKEDITOR.plugins.add("save", {
            init: function (e) {
                e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.addCommand("save", a).modes = {wysiwyg: !!e.element.$.form}, e.ui.addButton && e.ui.addButton("Save", {
                    label: e.lang.save.toolbar,
                    command: "save",
                    toolbar: "document,10"
                }))
            }
        })
    }(),"use strict",CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog",
        tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) {
            CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime()
        }, init: function (a) {
            var e = this, b = CKEDITOR.plugins.scayt;
            this.bindEvents(a);
            this.parseConfig(a);
            this.addRule(a);
            CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
            this.addMenuItems(a);
            var c = a.lang.scayt, d = CKEDITOR.env;
            a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                label: c.text_title, title: a.plugins.wsc ? a.lang.wsc.title : c.text_title, modes: {
                    wysiwyg: !(d.ie &&
                    (8 > d.version || d.quirks))
                }, toolbar: "spellchecker,20", refresh: function () {
                    var c = a.ui.instances.Scayt.getState();
                    a.scayt && (c = b.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                    a.fire("scaytButtonState", c)
                }, onRender: function () {
                    var b = this;
                    a.on("scaytButtonState", function (a) {
                        void 0 !== typeof a.data && b.setState(a.data)
                    })
                }, onMenu: function () {
                    var c = a.scayt;
                    a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state.scayt[a.name] ? "btn_disable" : "btn_enable"];
                    c = {
                        scaytToggle: CKEDITOR.TRISTATE_OFF,
                        scaytOptions: c ?
                            CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytDict: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                    };
                    a.config.scayt_uiTabs[0] || delete c.scaytOptions;
                    a.config.scayt_uiTabs[1] || delete c.scaytLangs;
                    a.config.scayt_uiTabs[2] || delete c.scaytDict;
                    return c
                }
            });
            a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b,
                                                                                    c) {
                var d = a.scayt, h, k;
                d && (k = d.getSelectionNode()) && (h = e.menuGenerator(a, k), d.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
                return h
            }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) {
                return function () {
                    var c = a.scayt;
                    c && c.hideBanner();
                    return b.apply(this)
                }
            }))
        }, addMenuItems: function (a) {
            var e = this, b = CKEDITOR.plugins.scayt;
            a.addMenuGroup("scaytButton");
            for (var c = a.config.scayt_contextMenuItemsOrder.split("|"), d = 0; d < c.length; d++)c[d] = "scayt_" +
                c[d];
            if ((c = ["grayt_description", "grayt_suggest", "grayt_control"].concat(c)) && c.length)for (d = 0; d < c.length; d++)a.addMenuGroup(c[d], d - 10);
            a.addCommand("scaytToggle", {
                exec: function (a) {
                    var c = a.scayt;
                    b.state.scayt[a.name] = !b.state.scayt[a.name];
                    !0 === b.state.scayt[a.name] ? c || b.createScayt(a) : c && b.destroy(a)
                }
            });
            a.addCommand("scaytAbout", {
                exec: function (a) {
                    a.scayt.tabToOpen = "about";
                    a.lockSelection();
                    a.openDialog(e.dialogName)
                }
            });
            a.addCommand("scaytOptions", {
                exec: function (a) {
                    a.scayt.tabToOpen = "options";
                    a.lockSelection();
                    a.openDialog(e.dialogName)
                }
            });
            a.addCommand("scaytLangs", {
                exec: function (a) {
                    a.scayt.tabToOpen = "langs";
                    a.lockSelection();
                    a.openDialog(e.dialogName)
                }
            });
            a.addCommand("scaytDict", {
                exec: function (a) {
                    a.scayt.tabToOpen = "dictionaries";
                    a.lockSelection();
                    a.openDialog(e.dialogName)
                }
            });
            c = {
                scaytToggle: {label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle"},
                scaytAbout: {label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout"},
                scaytOptions: {
                    label: a.lang.scayt.btn_options, group: "scaytButton",
                    command: "scaytOptions"
                },
                scaytLangs: {label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs"},
                scaytDict: {label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict"}
            };
            a.plugins.wsc && (c.WSC = {
                label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () {
                    var b = CKEDITOR.plugins.scayt, c = a.scayt, d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                    (d = d.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0),
                        a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
                }
            });
            a.addMenuItems(c)
        }, bindEvents: function (a) {
            var e = CKEDITOR.plugins.scayt, b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, c = function () {
                e.destroy(a)
            };
            a.on("drop", function (a) {
                var b = a.data.dragRange ? a.data.dragRange.root.editor.editable().isInline() : !1;
                !a.data.dropRange.root.editor.editable().isInline() && b && a.data.dragRange.root.editor.document.getDocumentElement().fire("mouseup", new CKEDITOR.dom.event)
            });
            var d = function () {
                !e.state.scayt[a.name] ||
                a.readOnly || a.scayt || e.createScayt(a)
            }, l = function () {
                var c = a.editable();
                c.attachListener(c, "focus", function (c) {
                    CKEDITOR.plugins.scayt && !a.scayt && setTimeout(d, 0);
                    c = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt;
                    var e, f;
                    if ((b || c) && a._.savedSelection) {
                        c = a._.savedSelection.getSelectedElement();
                        c = !c && a._.savedSelection.getRanges();
                        for (var m = 0; m < c.length; m++)f = c[m], "string" === typeof f.startContainer.$.nodeValue && (e = f.startContainer.getText().length, (e < f.startOffset || e < f.endOffset) &&
                        a.unlockSelection(!1))
                    }
                }, this, null, -10)
            }, m = function () {
                b ? a.config.scayt_inlineModeImmediateMarkup ? d() : (a.on("blur", function () {
                    setTimeout(c, 0)
                }), a.on("focus", d), a.focusManager.hasFocus && d()) : d();
                l();
                var e = a.editable();
                e.attachListener(e, "mousedown", function (b) {
                    b = b.data.getTarget();
                    var c = a.widgets && a.widgets.getByElement(b);
                    c && (c.wrapper = b.getAscendant(function (a) {
                        return a.hasAttribute("data-cke-widget-wrapper")
                    }, !0))
                }, this, null, -10)
            };
            a.on("contentDom", m);
            a.on("beforeCommandExec", function (b) {
                var c = a.scayt,
                    d = null, g = !1, m = !0;
                b.data.name in e.options.disablingCommandExec && "wysiwyg" == a.mode ? c && (e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !c || ("cut" === b.data.name && (m = !1, g = !0), "language" === b.data.name && (d = (d = a.plugins.language.getCurrentLangElement(a)) && d.$, g = !0),
                    a.fire("reloadMarkupScayt", {
                        removeOptions: {removeInside: m, forceBookmark: g, selectionNode: d},
                        timeout: 0
                    }))
            });
            a.on("beforeSetMode", function (b) {
                if ("source" == b.data) {
                    if (b = a.scayt)e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED);
                    a.document && a.document.getBody().removeAttribute("_jquid")
                }
            });
            a.on("afterCommandExec", function (b) {
                "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () {
                    e.reloadMarkup(a.scayt)
                }, 250)
            });
            a.on("readOnly", function (b) {
                var c;
                b && (c = a.scayt,
                    !0 === b.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? e.reloadMarkup(c) : "wysiwyg" == b.editor.mode && !0 === e.state.scayt[b.editor.name] && (e.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
            });
            a.on("beforeDestroy", c);
            a.on("setData", function () {
                c();
                (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && m()
            }, this, null, 50);
            a.on("reloadMarkupScayt", function (b) {
                var c = b.data && b.data.removeOptions;
                b = b.data && b.data.timeout;
                var d = a.scayt;
                d && setTimeout(function () {
                    d.removeMarkupInSelectionNode(c);
                    e.reloadMarkup(d)
                }, b || 0)
            });
            a.on("insertElement", function () {
                a.fire("reloadMarkupScayt", {removeOptions: {forceBookmark: !0}})
            }, this, null, 50);
            a.on("insertHtml", function () {
                a.fire("reloadMarkupScayt")
            }, this, null, 50);
            a.on("insertText", function () {
                a.fire("reloadMarkupScayt")
            }, this, null, 50);
            a.on("scaytDialogShown", function (b) {
                b.data.selectPage(a.scayt.tabToOpen)
            })
        }, parseConfig: function (a) {
            var e = CKEDITOR.plugins.scayt;
            e.replaceOldOptionsNames(a.config);
            "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1);
            e.state.scayt[a.name] = a.config.scayt_autoStartup;
            "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1);
            "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1);
            e.state.grayt[a.name] = a.config.grayt_autoStartup;
            a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignore|ignoreall|add");
            a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
            a.config.scayt_sLang ||
            (a.config.scayt_sLang = "en_US");
            if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions = 5;
            if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength)a.config.scayt_minWordLength = 4;
            if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds = "";
            if (void 0 === a.config.scayt_userDictionaryName ||
                "string" !== typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName = null;
            if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                var b = [], c = [];
                a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(",");
                CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) {
                    1 === Number(a) || 0 === Number(a) ? (c.push(!0), b.push(Number(a))) : c.push(!1)
                });
                null === CKEDITOR.tools.search(c, !1) ? a.config.scayt_uiTabs = b : a.config.scayt_uiTabs = [1, 1, 1]
            } else a.config.scayt_uiTabs = [1, 1, 1];
            "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null);
            "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null);
            "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null);
            "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null);
            a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on");
            "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
            "string" !== typeof a.config.scayt_srcUrl && (e = document.location.protocol, e = -1 != e.search(/https?:/) ? e : "http:", a.config.scayt_srcUrl = e + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");
            "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0);
            "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0);
            CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1;
            "boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1);
            "object" !== typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {});
            a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1);
            a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1);
            a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases &&
            (a.config.scayt_ignoreWordsWithMixedCases = !1);
            a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1);
            if (a.config.scayt_disableOptionsStorage) {
                var e = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0, d = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
                    l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], m = CKEDITOR.tools.search, f = CKEDITOR.tools.indexOf;
                a.config.scayt_disableOptionsStorage = function (a) {
                    for (var b = [], c = 0; c < a.length; c++) {
                        var e = a[c], p = !!m(a, "options");
                        if (!m(d, e) || p && m(l, function (a) {
                                if ("lang" === a)return !1
                            }))return;
                        m(l, e) && l.splice(f(l, e), 1);
                        if ("all" === e || p && m(a, "lang"))return [];
                        "options" === e && (l = ["lang"])
                    }
                    return b = b.concat(l)
                }(e)
            }
        }, addRule: function (a) {
            var e = CKEDITOR.plugins.scayt,
                b = a.dataProcessor, c = b && b.htmlFilter, d = a._.elementsPath && a._.elementsPath.filters, b = b && b.dataFilter, l = a.addRemoveFormatFilter, m = function (b) {
                    if (a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute)))return !1
                }, f = function (b) {
                    var c = !0;
                    a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute)) && (c = !1);
                    return c
                };
            d && d.push(m);
            b && b.addRules({
                elements: {
                    span: function (a) {
                        var b = a.hasClass(e.options.misspelled_word_class) &&
                            a.attributes[e.options.data_attribute_name], c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute];
                        e && (b || c) && delete a.name;
                        return a
                    }
                }
            });
            c && c.addRules({
                elements: {
                    span: function (a) {
                        var b = a.hasClass(e.options.misspelled_word_class) && a.attributes[e.options.data_attribute_name], c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute];
                        e && (b || c) && delete a.name;
                        return a
                    }
                }
            });
            l && l.call(a, f)
        }, scaytMenuDefinition: function (a) {
            var e =
                this;
            a = a.scayt;
            return {
                scayt: {
                    scayt_ignore: {
                        label: a.getLocal("btn_ignore"),
                        group: "scayt_control",
                        order: 1,
                        exec: function (a) {
                            a.scayt.ignoreWord()
                        }
                    },
                    scayt_ignoreall: {
                        label: a.getLocal("btn_ignoreAll"),
                        group: "scayt_control",
                        order: 2,
                        exec: function (a) {
                            a.scayt.ignoreAllWords()
                        }
                    },
                    scayt_add: {
                        label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (a) {
                            var c = a.scayt;
                            setTimeout(function () {
                                c.addWordToUserDictionary()
                            }, 10)
                        }
                    },
                    scayt_option: {
                        label: a.getLocal("btn_options"), group: "scayt_control", order: 4,
                        exec: function (a) {
                            a.scayt.tabToOpen = "options";
                            a.lockSelection();
                            a.openDialog(e.dialogName)
                        }, verification: function (a) {
                            return 1 == a.config.scayt_uiTabs[0] ? !0 : !1
                        }
                    },
                    scayt_language: {
                        label: a.getLocal("btn_langs"),
                        group: "scayt_control",
                        order: 5,
                        exec: function (a) {
                            a.scayt.tabToOpen = "langs";
                            a.lockSelection();
                            a.openDialog(e.dialogName)
                        },
                        verification: function (a) {
                            return 1 == a.config.scayt_uiTabs[1] ? !0 : !1
                        }
                    },
                    scayt_dictionary: {
                        label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) {
                            a.scayt.tabToOpen =
                                "dictionaries";
                            a.lockSelection();
                            a.openDialog(e.dialogName)
                        }, verification: function (a) {
                            return 1 == a.config.scayt_uiTabs[2] ? !0 : !1
                        }
                    },
                    scayt_about: {
                        label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) {
                            a.scayt.tabToOpen = "about";
                            a.lockSelection();
                            a.openDialog(e.dialogName)
                        }
                    }
                }, grayt: {
                    grayt_problemdescription: {
                        label: "Grammar problem description",
                        group: "grayt_description",
                        order: 1,
                        state: CKEDITOR.TRISTATE_DISABLED,
                        exec: function (a) {
                        }
                    }, grayt_ignore: {
                        label: a.getLocal("btn_ignore"), group: "grayt_control",
                        order: 2, exec: function (a) {
                            a.scayt.ignorePhrase()
                        }
                    }
                }
            }
        }, buildSuggestionMenuItems: function (a, e, b) {
            var c = {}, d = {}, l = b ? "word" : "phrase", m = b ? "startGrammarCheck" : "startSpellCheck", f = a.scayt;
            if (0 < e.length && "no_any_suggestions" !== e[0])if (b)for (b = 0; b < e.length; b++) {
                var h = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_");
                a.addCommand(h, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, m));
                b < a.config.scayt_maxSuggestions ? (a.addMenuItem(h, {
                    label: e[b], command: h, group: "scayt_suggest",
                    order: b + 1
                }), c[h] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(h, {
                    label: e[b],
                    command: h,
                    group: "scayt_moresuggest",
                    order: b + 1
                }), d[h] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
                    label: f.getLocal("btn_moreSuggestions"),
                    group: "scayt_moresuggest",
                    order: 10,
                    getItems: function () {
                        return d
                    }
                }), c.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
            } else for (b = 0; b < e.length; b++)h = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"), a.addCommand(h, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],
                l, m)), a.addMenuItem(h, {
                label: e[b],
                command: h,
                group: "grayt_suggest",
                order: b + 1
            }), c[h] = CKEDITOR.TRISTATE_OFF; else c.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", {
                exec: function () {
                }
            }), a.addMenuItem("no_scayt_suggest", {
                label: f.getLocal("btn_noSuggestions") || "no_scayt_suggest",
                command: "no_scayt_suggest",
                group: "scayt_suggest",
                order: 0
            });
            return c
        }, menuGenerator: function (a, e) {
            var b = a.scayt, c = this.scaytMenuDefinition(a), d = {}, l = a.config.scayt_contextCommands.split("|"), m = e.getAttribute(b.getLangAttribute()) ||
                b.getLang(), f, h;
            f = b.isScaytNode(e);
            h = b.isGraytNode(e);
            f ? (c = c.scayt, d = e.getAttribute(b.getScaytNodeAttributeName()), b.fire("getSuggestionsList", {
                lang: m,
                word: d
            }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, f)) : h && (c = c.grayt, d = e.getAttribute(b.getGraytNodeAttributeName()), h = b.getProblemDescriptionText(d, m), c.grayt_problemdescription && h && (c.grayt_problemdescription.label = h), b.fire("getGrammarSuggestionsList", {
                lang: m,
                phrase: d
            }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions,
                f));
            if (f && "off" == a.config.scayt_contextCommands)return d;
            for (var k in c)f && -1 == CKEDITOR.tools.indexOf(l, k.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || (d[k] = "undefined" != typeof c[k].state ? c[k].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof c[k].verification || c[k].verification(a) || delete d[k], a.addCommand(k, {exec: c[k].exec}), a.addMenuItem(k, {
                label: a.lang.scayt[c[k].label] || c[k].label,
                command: k,
                group: c[k].group,
                order: c[k].order
            }));
            return d
        }, createCommand: function (a, e, b) {
            return {
                exec: function (c) {
                    c =
                        c.scayt;
                    var d = {};
                    d[e] = a;
                    c.replaceSelectionNode(d);
                    "startGrammarCheck" === b && c.removeMarkupInSelectionNode({grammarOnly: !0});
                    c.fire(b)
                }
            }
        }
    }),CKEDITOR.plugins.scayt = {
        charsToObserve: [{
            charName: "cke-fillingChar", charCode: function () {
                var a = CKEDITOR.version.match(/^\d(\.\d*)*/), a = a && a[0], e;
                if (a) {
                    e = "4.5.7";
                    var b, a = a.replace(/\./g, "");
                    e = e.replace(/\./g, "");
                    b = a.length - e.length;
                    b = 0 <= b ? b : 0;
                    e = parseInt(a) >= parseInt(e) * Math.pow(10, b)
                }
                return e ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
            }()
        }],
        onLoadTimestamp: "",
        state: {scayt: {}, grayt: {}},
        warningCounter: 0,
        suggestions: [],
        options: {
            disablingCommandExec: {source: !0, newpage: !0, templates: !0},
            data_attribute_name: "data-scayt-word",
            misspelled_word_class: "scayt-misspell-word",
            problem_grammar_data_attribute: "data-grayt-phrase",
            problem_grammar_class: "gramm-problem"
        },
        backCompatibilityMap: {
            scayt_service_protocol: "scayt_serviceProtocol",
            scayt_service_host: "scayt_serviceHost",
            scayt_service_port: "scayt_servicePort",
            scayt_service_path: "scayt_servicePath",
            scayt_customerid: "scayt_customerId"
        },
        alarmCompatibilityMessage: function () {
            5 > this.warningCounter && (console.warn("Note: You are using latest version of SCAYT plug-in. It is recommended to upgrade WebSpellChecker.net application to version v4.8.3.Contact us by e-mail at support@webspellchecker.net."), this.warningCounter += 1)
        },
        reloadMarkup: function (a) {
            var e;
            a && (e = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), e && e.ltr && e.rtl && a.fire("startSpellCheck, startGrammarCheck")))
        },
        replaceOldOptionsNames: function (a) {
            for (var e in a)e in this.backCompatibilityMap && (a[this.backCompatibilityMap[e]] = a[e], delete a[e])
        },
        createScayt: function (a) {
            var e = this, b = CKEDITOR.plugins.scayt;
            this.loadScaytLibrary(a, function (a) {
                function d(a) {
                    return new SCAYT.CKSCAYT(a, function () {
                    }, function () {
                    })
                }

                var l = a.window && a.window.getFrame() || a.editable();
                if (l) {
                    l = {
                        lang: a.config.scayt_sLang,
                        container: l.$,
                        customDictionary: a.config.scayt_customDictionaryIds,
                        userDictionaryName: a.config.scayt_userDictionaryName,
                        localization: a.langCode,
                        customer_id: a.config.scayt_customerId,
                        debug: a.config.scayt_debug,
                        data_attribute_name: e.options.data_attribute_name,
                        misspelled_word_class: e.options.misspelled_word_class,
                        problem_grammar_data_attribute: e.options.problem_grammar_data_attribute,
                        problem_grammar_class: e.options.problem_grammar_class,
                        "options-to-restore": a.config.scayt_disableOptionsStorage,
                        focused: a.editable().hasFocus,
                        ignoreElementsRegex: a.config.scayt_elementsToIgnore,
                        minWordLength: a.config.scayt_minWordLength,
                        multiLanguageMode: a.config.scayt_multiLanguageMode,
                        multiLanguageStyles: a.config.scayt_multiLanguageStyles,
                        graytAutoStartup: b.state.grayt[a.name],
                        charsToObserve: b.charsToObserve
                    };
                    a.config.scayt_serviceProtocol && (l.service_protocol = a.config.scayt_serviceProtocol);
                    a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost);
                    a.config.scayt_servicePort && (l.service_port = a.config.scayt_servicePort);
                    a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath);
                    "boolean" === typeof a.config.scayt_ignoreAllCapsWords &&
                    (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
                    "boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames);
                    "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases);
                    "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers);
                    var m;
                    try {
                        m = d(l)
                    } catch (f) {
                        e.alarmCompatibilityMessage(), delete l.charsToObserve,
                            m = d(l)
                    }
                    m.subscribe("suggestionListSend", function (a) {
                        for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++)b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
                        CKEDITOR.plugins.scayt.suggestions = c
                    });
                    m.subscribe("selectionIsChanged", function (b) {
                        a.getSelection().isLocked && a.lockSelection()
                    });
                    m.subscribe("graytStateChanged", function (d) {
                        b.state.grayt[a.name] = d.state
                    });
                    m.addMarkupHandler && m.addMarkupHandler(function (b) {
                        var d = a.editable(), e = d.getCustomData(b.charName);
                        e && (e.$ = b.node, d.setCustomData(b.charName, e))
                    });
                    a.scayt = m;
                    a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                } else b.state.scayt[a.name] = !1
            })
        },
        destroy: function (a) {
            a.scayt && a.scayt.destroy();
            delete a.scayt;
            a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF)
        },
        loadScaytLibrary: function (a, e) {
            var b, c = function () {
                CKEDITOR.fireOnce("scaytReady");
                a.scayt || "function" === typeof e && e(a)
            };
            "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (b = a.config.scayt_srcUrl +
                "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(b, function (a) {
                a && c()
            })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && c()
        }
    },CKEDITOR.on("dialogDefinition", function (a) {
        var e = a.data.name;
        a = a.data.definition.dialog;
        if ("scaytDialog" === e)a.on("cancel", function (a) {
            return !1
        }, this, null, -1);
        if ("checkspell" === e)a.on("cancel", function (a) {
                a = a.sender && a.sender.getParentEditor();
                var c = CKEDITOR.plugins.scayt, d = a.scayt;
                d && c.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1);
                a.unlockSelection()
            },
            this, null, -2);
        if ("link" === e)a.on("ok", function (a) {
            var c = a.sender && a.sender.getParentEditor();
            c && setTimeout(function () {
                c.fire("reloadMarkupScayt", {removeOptions: {removeInside: !0, forceBookmark: !0}, timeout: 0})
            }, 0)
        })
    }),CKEDITOR.on("scaytReady", function () {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
            var a = CKEDITOR.editor.prototype;
            a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
                return function () {
                    var c = null, d = this.scayt;
                    if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] &&
                        this.scayt) {
                        if (c = "ready" == this.status)var e = d.removeMarkupFromString(this.getSnapshot()), d = d.removeMarkupFromString(this._.previousValue), c = c && d !== e
                    } else c = a.call(this);
                    return c
                }
            });
            a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) {
                return function () {
                    var c = this.scayt;
                    CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = c.removeMarkupFromString(this.getSnapshot()) : a.call(this)
                }
            })
        }
        if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var a = CKEDITOR.plugins.undo.Image.prototype,
                e = "function" == typeof a.equalsContent ? "equalsContent" : "equals";
            a[e] = CKEDITOR.tools.override(a[e], function (a) {
                return function (c) {
                    var d = c.editor.scayt, e = this.contents, m = c.contents, f = null;
                    CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[c.editor.name] && c.editor.scayt && (this.contents = d.removeMarkupFromString(e) || "", c.contents = d.removeMarkupFromString(m) || "");
                    f = a.apply(this, arguments);
                    this.contents = e;
                    c.contents = m;
                    return f
                }
            })
        }
    }),function () {
        CKEDITOR.plugins.add("selectall", {
            init: function (a) {
                a.addCommand("selectAll",
                    {
                        modes: {wysiwyg: 1, source: 1}, exec: function (a) {
                        var b = a.editable();
                        if (b.is("textarea"))a = b.$, CKEDITOR.env.ie ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus(); else {
                            if (b.is("body"))a.document.$.execCommand("SelectAll", !1, null); else {
                                var c = a.createRange();
                                c.selectNodeContents(b);
                                c.select()
                            }
                            a.forceNextSelectionCheck();
                            a.selectionChange()
                        }
                    }, canUndo: !1
                    });
                a.ui.addButton && a.ui.addButton("SelectAll", {
                    label: a.lang.selectall.toolbar,
                    command: "selectAll",
                    toolbar: "selection,10"
                })
            }
        })
    }(),
        function () {
            var a = {
                readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) {
                    this.toggleState();
                    this.refresh(a)
                }, refresh: function (a) {
                    if (a.document) {
                        var b = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass";
                        a.editable()[b]("cke_show_blocks")
                    }
                }
            };
            CKEDITOR.plugins.add("showblocks", {
                onLoad: function () {
                    var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), b, c, d, l, m = CKEDITOR.getUrl(this.path), f = !(CKEDITOR.env.ie &&
                    9 > CKEDITOR.env.version), h = f ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", k, g;
                    for (b = c = d = l = ""; k = a.pop();)g = a.length ? "," : "", b += ".cke_show_blocks " + k + h + g, d += ".cke_show_blocks.cke_contents_ltr " + k + h + g, l += ".cke_show_blocks.cke_contents_rtl " + k + h + g, c += ".cke_show_blocks " + k + h + "{background-image:url(" + CKEDITOR.getUrl(m + "images/block_" + k + ".png") + ")}";
                    CKEDITOR.addCss((b + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(c, d + "{background-position:top left;padding-left:8px}",
                        l + "{background-position:top right;padding-right:8px}"));
                    f || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                }, init: function (e) {
                    function b() {
                        c.refresh(e)
                    }

                    if (!e.blockless) {
                        var c = e.addCommand("showblocks", a);
                        c.canUndo = !1;
                        e.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON);
                        e.ui.addButton && e.ui.addButton("ShowBlocks", {
                            label: e.lang.showblocks.toolbar,
                            command: "showblocks",
                            toolbar: "tools,20"
                        });
                        e.on("mode", function () {
                            c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e)
                        });
                        e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (e.on("focus", b), e.on("blur", b));
                        e.on("contentDom", function () {
                            c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e)
                        })
                    }
                }
            })
        }(),function () {
        var a =
        {
            preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) {
            this.toggleState();
            this.refresh(a)
        }, refresh: function (a) {
            if (a.document) {
                var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                a.editable()[b]("cke_show_borders")
            }
        }
        };
        CKEDITOR.plugins.add("showborders", {
            modes: {wysiwyg: 1}, onLoad: function () {
                var a;
                a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders ");
                CKEDITOR.addCss(a)
            }, init: function (e) {
                var b = e.addCommand("showborders", a);
                b.canUndo = !1;
                !1 !== e.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
                e.on("mode", function () {
                    b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
                }, null, null, 100);
                e.on("contentDom", function () {
                    b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
                });
                e.on("removeFormatCleanup", function (a) {
                    a = a.data;
                    e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                    0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                })
            }, afterInit: function (a) {
                var b = a.dataProcessor;
                a = b && b.dataFilter;
                b = b && b.htmlFilter;
                a && a.addRules({
                    elements: {
                        table: function (a) {
                            a = a.attributes;
                            var b = a["class"], e = parseInt(a.border, 10);
                            e && !(0 >= e) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border")
                        }
                    }
                });
                b && b.addRules({
                    elements: {
                        table: function (a) {
                            a = a.attributes;
                            var b = a["class"];
                            b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function (a) {
            var b = a.data.name;
            if ("table" == b || "tableProperties" == b)if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) {
                    return function (b, e) {
                        a.apply(this, arguments);
                        var m = parseInt(this.getValue(), 10);
                        e[!m || 0 >= m ? "addClass" : "removeClass"]("cke_show_border")
                    }
                }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses"))a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                return function () {
                    a.apply(this,
                        arguments);
                    this.setValue(this.getValue().replace(/cke_show_border/, ""))
                }
            }), a.commit = CKEDITOR.tools.override(a.commit, function (a) {
                return function (b, e) {
                    a.apply(this, arguments);
                    parseInt(e.getAttribute("border"), 10) || e.addClass("cke_show_border")
                }
            })
        })
    }(),CKEDITOR.plugins.add("smiley", {
        requires: "dialog", init: function (a) {
            a.config.smiley_path = a.config.smiley_path || this.path + "images/";
            a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
                allowedContent: "img[alt,height,!src,title,width]",
                requiredContent: "img"
            }));
            a.ui.addButton && a.ui.addButton("Smiley", {
                label: a.lang.smiley.toolbar,
                command: "smiley",
                toolbar: "insert,50"
            });
            CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
        }
    }),CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"),function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (e) {
                function b() {
                    var a = d && this.equals(CKEDITOR.document.getActive());
                    this.hide();
                    this.setStyle("height", this.getParent().$.clientHeight + "px");
                    this.setStyle("width", this.getParent().$.clientWidth + "px");
                    this.show();
                    a && this.focus()
                }

                if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var c =
                        CKEDITOR.plugins.sourcearea;
                    e.addMode("source", function (c) {
                        var d = e.ui.space("contents").getDocument().createElement("textarea");
                        d.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4)));
                        d.setAttribute("dir", "ltr");
                        d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
                        e.ui.space("contents").append(d);
                        d = e.editable(new a(e,
                            d));
                        d.setData(e.getData(1));
                        CKEDITOR.env.ie && (d.attachListener(e, "resize", b, d), d.attachListener(CKEDITOR.document.getWindow(), "resize", b, d), CKEDITOR.tools.setTimeout(b, 0, d));
                        e.fire("ariaWidget", this);
                        c()
                    });
                    e.addCommand("source", c.commands.source);
                    e.ui.addButton && e.ui.addButton("Source", {
                        label: e.lang.sourcearea.toolbar,
                        command: "source",
                        toolbar: "mode,10"
                    });
                    e.on("mode", function () {
                        e.getCommand("source").setState("source" == e.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    });
                    var d = CKEDITOR.env.ie && 9 ==
                        CKEDITOR.env.version
                }
            }
        });
        var a = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (a) {
                    this.setValue(a);
                    this.status = "ready";
                    this.editor.fire("dataReady")
                }, getData: function () {
                    return this.getValue()
                }, insertHtml: function () {
                }, insertElement: function () {
                }, insertText: function () {
                }, setReadOnly: function (a) {
                    this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
                }, detach: function () {
                    a.baseProto.detach.call(this);
                    this.clearCustomData();
                    this.remove()
                }
            }
        })
    }(),CKEDITOR.plugins.sourcearea = {
        commands: {
            source: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                }, editorFocus: !1, readOnly: 1, exec: function (a) {
                    "wysiwyg" == a.mode && a.fire("saveSnapshot");
                    a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                    a.setMode("source" == a.mode ? "wysiwyg" : "source")
                }, canUndo: !1
            }
        }
    },CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            af: 1,
            ar: 1,
            az: 1,
            bg: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            da: 1,
            de: 1,
            "de-ch": 1,
            el: 1,
            en: 1,
            "en-gb": 1,
            eo: 1,
            es: 1,
            et: 1,
            eu: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            "fr-ca": 1,
            gl: 1,
            he: 1,
            hr: 1,
            hu: 1,
            id: 1,
            it: 1,
            ja: 1,
            km: 1,
            ko: 1,
            ku: 1,
            lt: 1,
            lv: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt: 1,
            "pt-br": 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            sv: 1,
            th: 1,
            ti: 1,
            tr: 1,
            tt: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            zh: 1,
            "zh-cn": 1,
            "zh-tw": 1
        }, requires: "dialog", init: function (a) {
            var e = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
            a.addCommand("specialchar", {
                exec: function () {
                    var b = a.langCode, b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function () {
                        CKEDITOR.tools.extend(a.lang.specialchar, e.langEntries[b]);
                        a.openDialog("specialchar")
                    })
                },
                modes: {wysiwyg: 1}, canUndo: !1
            });
            a.ui.addButton && a.ui.addButton("SpecialChar", {
                label: a.lang.specialchar.toolbar,
                command: "specialchar",
                toolbar: "insert,50"
            })
        }
    }),CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
        function () {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo", init: function (a) {
                    var e = a.config, b = a.lang.stylescombo, c = {}, d = [], l = [];
                    a.on("stylesSet", function (b) {
                        if (b = b.data.styles) {
                            for (var f, h, k, g = 0, n = b.length; g < n; g++)(f = b[g], a.blockless && f.element in CKEDITOR.dtd.$block || (h = f.name, f = new CKEDITOR.style(f), a.filter.customConfig && !a.filter.check(f))) || (f._name = h, f._.enterMode = e.enterMode, f._.type = k = f.assignedTo || f.type, f._.weight = g + 1E3 * (k == CKEDITOR.STYLE_OBJECT ? 1 : k == CKEDITOR.STYLE_BLOCK ? 2 : 3), c[h] =
                                f, d.push(f), l.push(f));
                            d.sort(function (a, b) {
                                return a._.weight - b._.weight
                            })
                        }
                    });
                    a.ui.addRichCombo("Styles", {
                        label: b.label,
                        title: b.panelTitle,
                        toolbar: "styles,10",
                        allowedContent: l,
                        panel: {
                            css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),
                            multiSelect: !0,
                            attributes: {"aria-label": b.panelTitle}
                        },
                        init: function () {
                            var a, c, e, k, g, l;
                            g = 0;
                            for (l = d.length; g < l; g++)a = d[g], c = a._name, k = a._.type, k != e && (this.startGroup(b["panelTitle" + String(k)]), e = k), this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c);
                            this.commit()
                        },
                        onClick: function (b) {
                            a.focus();
                            a.fire("saveSnapshot");
                            b = c[b];
                            var d = a.elementPath();
                            a[b.checkActive(d, a) ? "removeStyle" : "applyStyle"](b);
                            a.fire("saveSnapshot")
                        },
                        onRender: function () {
                            a.on("selectionChange", function (b) {
                                var d = this.getValue();
                                b = b.data.path.elements;
                                for (var e = 0, k = b.length, g; e < k; e++) {
                                    g = b[e];
                                    for (var l in c)if (c[l].checkElementRemovable(g, !0, a)) {
                                        l != d && this.setValue(l);
                                        return
                                    }
                                }
                                this.setValue("")
                            }, this)
                        },
                        onOpen: function () {
                            var d = a.getSelection().getSelectedElement(), d = a.elementPath(d),
                                e = [0, 0, 0, 0];
                            this.showAll();
                            this.unmarkAll();
                            for (var h in c) {
                                var k = c[h], g = k._.type;
                                k.checkApplicable(d, a, a.activeFilter) ? e[g]++ : this.hideItem(h);
                                k.checkActive(d, a) && this.mark(h)
                            }
                            e[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]);
                            e[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
                            e[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                        },
                        refresh: function () {
                            var b = a.elementPath();
                            if (b) {
                                for (var d in c)if (c[d].checkApplicable(b,
                                        a, a.activeFilter))return;
                                this.setState(CKEDITOR.TRISTATE_DISABLED)
                            }
                        },
                        reset: function () {
                            c = {};
                            d = []
                        }
                    })
                }
            })
        }(),function () {
        function a(a) {
            return {
                editorFocus: !1, canUndo: !1, modes: {wysiwyg: 1}, exec: function (b) {
                    if (b.editable().hasFocus) {
                        var c = b.getSelection(), e;
                        if (e = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                                td: 1,
                                th: 1
                            }, 1)) {
                            var c = b.createRange(), h = CKEDITOR.tools.tryThese(function () {
                                var b = e.getParent().$.cells[e.$.cellIndex + (a ? -1 : 1)];
                                b.parentNode.parentNode;
                                return b
                            }, function () {
                                var b =
                                    e.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                                return b.cells[a ? b.cells.length - 1 : 0]
                            });
                            if (h || a)if (h)h = new CKEDITOR.dom.element(h), c.moveToElementEditStart(h), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(h); else return !0; else {
                                for (var k = e.getAscendant("table").$, h = e.getParent().$.cells, k = new CKEDITOR.dom.element(k.insertRow(-1), b.document), g = 0, n = h.length; g < n; g++)k.append((new CKEDITOR.dom.element(h[g], b.document)).clone(!1, !1)).appendBogus();
                                c.moveToElementEditStart(k)
                            }
                            c.select(!0);
                            return !0
                        }
                    }
                    return !1
                }
            }
        }

        var e = {editorFocus: !1, modes: {wysiwyg: 1, source: 1}}, b = {
            exec: function (a) {
                a.container.focusNext(!0, a.tabIndex)
            }
        }, c = {
            exec: function (a) {
                a.container.focusPrevious(!0, a.tabIndex)
            }
        };
        CKEDITOR.plugins.add("tab", {
            init: function (d) {
                for (var l = !1 !== d.config.enableTabKeyTools, m = d.config.tabSpaces || 0, f = ""; m--;)f += " ";
                if (f)d.on("key", function (a) {
                    9 == a.data.keyCode && (d.insertText(f), a.cancel())
                });
                if (l)d.on("key", function (a) {
                    (9 == a.data.keyCode && d.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT +
                    9 && d.execCommand("selectPreviousCell")) && a.cancel()
                });
                d.addCommand("blur", CKEDITOR.tools.extend(b, e));
                d.addCommand("blurBack", CKEDITOR.tools.extend(c, e));
                d.addCommand("selectNextCell", a());
                d.addCommand("selectPreviousCell", a(!0))
            }
        })
    }(),CKEDITOR.dom.element.prototype.focusNext = function (a, e) {
        var b = void 0 === e ? this.getTabIndex() : e, c, d, l, m, f, h;
        if (0 >= b)for (f = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); f;) {
            if (f.isVisible() && 0 === f.getTabIndex()) {
                l = f;
                break
            }
            f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
        } else for (f =
                        this.getDocument().getBody().getFirst(); f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!c)if (!d && f.equals(this)) {
                if (d = !0, a) {
                    if (!(f = f.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;
                    c = 1
                }
            } else d && !this.contains(f) && (c = 1);
            if (f.isVisible() && !(0 > (h = f.getTabIndex()))) {
                if (c && h == b) {
                    l = f;
                    break
                }
                h > b && (!l || !m || h < m) ? (l = f, m = h) : l || 0 !== h || (l = f, m = h)
            }
        }
        l && l.focus()
    },CKEDITOR.dom.element.prototype.focusPrevious = function (a, e) {
        for (var b = void 0 === e ? this.getTabIndex() : e, c, d, l, m = 0, f, h = this.getDocument().getBody().getLast(); h =
            h.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!c)if (!d && h.equals(this)) {
                if (d = !0, a) {
                    if (!(h = h.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;
                    c = 1
                }
            } else d && !this.contains(h) && (c = 1);
            if (h.isVisible() && !(0 > (f = h.getTabIndex())))if (0 >= b) {
                if (c && 0 === f) {
                    l = h;
                    break
                }
                f > m && (l = h, m = f)
            } else {
                if (c && f == b) {
                    l = h;
                    break
                }
                f < b && (!l || f > m) && (l = h, m = f)
            }
        }
        l && l.focus()
    },CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (a) {
            function e(a) {
                return CKEDITOR.tools.extend(a || {}, {
                    contextSensitive: 1, refresh: function (a,
                                                            b) {
                        this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }

            if (!a.blockless) {
                var b = a.lang.table;
                a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"]]
                }));
                a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e()));
                a.addCommand("tableDelete", e({
                    exec: function (a) {
                        var b = a.elementPath().contains("table", 1);
                        if (b) {
                            var e = b.getParent(), m = a.editable();
                            1 != e.getChildCount() || e.is("td", "th") || e.equals(m) || (b = e);
                            a = a.createRange();
                            a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                            b.remove();
                            a.select()
                        }
                    }
                }));
                a.ui.addButton && a.ui.addButton("Table", {label: b.toolbar, command: "table", toolbar: "insert,30"});
                CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                a.addMenuItems && a.addMenuItems({
                    table: {
                        label: b.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    }, tabledelete: {label: b.deleteTable, command: "tableDelete", group: "table", order: 1}
                });
                a.on("doubleclick", function (a) {
                    a.data.element.is("table") && (a.data.dialog = "tableProperties")
                });
                a.contextMenu && a.contextMenu.addListener(function () {
                    return {tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF}
                })
            }
        }
    }),function () {
        function a(a) {
            function b(a) {
                0 <
                c.length || a.type != CKEDITOR.NODE_ELEMENT || !p.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(d, a, "selected_cell", !0), c.push(a))
            }

            a = a.getRanges();
            for (var c = [], d = {}, e = 0; e < a.length; e++) {
                var f = a[e];
                if (f.collapsed)f = f.getCommonAncestor(), (f = f.getAscendant("td", !0) || f.getAscendant("th", !0)) && c.push(f); else {
                    var f = new CKEDITOR.dom.walker(f), g;
                    for (f.guard = b; g = f.next();)g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.table) || (g = g.getAscendant("td", !0) || g.getAscendant("th",
                            !0)) && !g.getCustomData("selected_cell") && (CKEDITOR.dom.element.setMarker(d, g, "selected_cell", !0), c.push(g))
                }
            }
            CKEDITOR.dom.element.clearAllMarkers(d);
            return c
        }

        function e(b, c) {
            for (var d = a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[k]), h = c ? h : k, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), k = 0; f[k] && k < d; k++) {
                var l;
                1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), e.append(l), l = l.$);
                k += l.colSpan - 1
            }
            c ? e.insertBefore(g) : e.insertAfter(g)
        }

        function b(c) {
            if (c instanceof CKEDITOR.dom.selection) {
                var d = a(c), e = d[0].getAscendant("table"), f = CKEDITOR.tools.buildTableMap(e);
                c = d[0].getParent().$.rowIndex;
                for (var d = d[d.length - 1], g = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], h = c; h <= g; h++) {
                    for (var k = f[h], l = new CKEDITOR.dom.element(e.$.rows[h]),
                             m = 0; m < k.length; m++) {
                        var n = new CKEDITOR.dom.element(k[m]), p = n.getParent().$.rowIndex;
                        1 == n.$.rowSpan ? n.remove() : (--n.$.rowSpan, p == h && (p = f[h + 1], p[m - 1] ? n.insertAfter(new CKEDITOR.dom.element(p[m - 1])) : (new CKEDITOR.dom.element(e.$.rows[h + 1])).append(n, 1)));
                        m += n.$.colSpan - 1
                    }
                    d.push(l)
                }
                f = e.$.rows;
                e = new CKEDITOR.dom.element(f[g + 1] || (0 < c ? f[c - 1] : null) || e.$.parentNode);
                for (h = d.length; 0 <= h; h--)b(d[h]);
                return e
            }
            c instanceof CKEDITOR.dom.element && (e = c.getAscendant("table"), 1 == e.$.rows.length ? e.remove() : c.remove());
            return null
        }

        function c(a, b) {
            for (var c = b ? Infinity : 0, d = 0; d < a.length; d++) {
                var e;
                e = a[d];
                for (var f = b, g = e.getParent().$.cells, h = 0, k = 0; k < g.length; k++) {
                    var l = g[k], h = h + (f ? 1 : l.colSpan);
                    if (l == e.$)break
                }
                e = h - 1;
                if (b ? e < c : e > c)c = e
            }
            return c
        }

        function d(b, d) {
            for (var e = a(b), f = e[0].getAscendant("table"), g = c(e, 1), e = c(e), g = d ? g : e, h = CKEDITOR.tools.buildTableMap(f), f = [], e = [], k = h.length, l = 0; l < k; l++)f.push(h[l][g]), e.push(d ? h[l][g - 1] : h[l][g + 1]);
            for (l = 0; l < k; l++)f[l] && (1 < f[l].colSpan && e[l] == f[l] ? (g = f[l], g.colSpan += 1) : (g = (new CKEDITOR.dom.element(f[l])).clone(),
                g.removeAttribute("colSpan"), g.appendBogus(), g[d ? "insertBefore" : "insertAfter"].call(g, new CKEDITOR.dom.element(f[l])), g = g.$), l += g.rowSpan - 1)
        }

        function l(a, b) {
            var c = a.getStartElement();
            if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) {
                var d = c.clone();
                d.appendBogus();
                b ? d.insertBefore(c) : d.insertAfter(c)
            }
        }

        function m(b) {
            if (b instanceof CKEDITOR.dom.selection) {
                b = a(b);
                var c = b[0] && b[0].getAscendant("table"), d;
                a:{
                    var e = 0;
                    d = b.length - 1;
                    for (var g = {}, h, k; h = b[e++];)CKEDITOR.dom.element.setMarker(g, h, "delete_cell",
                        !0);
                    for (e = 0; h = b[e++];)if ((k = h.getPrevious()) && !k.getCustomData("delete_cell") || (k = h.getNext()) && !k.getCustomData("delete_cell")) {
                        CKEDITOR.dom.element.clearAllMarkers(g);
                        d = k;
                        break a
                    }
                    CKEDITOR.dom.element.clearAllMarkers(g);
                    k = b[0].getParent();
                    (k = k.getPrevious()) ? d = k.getLast() : (k = b[d].getParent(), d = (k = k.getNext()) ? k.getChild(0) : null)
                }
                for (k = b.length - 1; 0 <= k; k--)m(b[k]);
                d ? f(d, !0) : c && c.remove()
            } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
        }

        function f(a,
                   b) {
            var c = a.getDocument(), d = CKEDITOR.document;
            CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus());
            c = new CKEDITOR.dom.range(c);
            c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0));
            c.select(!0)
        }

        function h(a, b, c) {
            a = a[b];
            if ("undefined" == typeof c)return a;
            for (b = 0; a && b < a.length; b++) {
                if (c.is && a[b] == c.$)return b;
                if (b == c)return new CKEDITOR.dom.element(a[b])
            }
            return c.is ? -1 : null
        }

        function k(b, c, d) {
            var e = a(b), f;
            if ((c ? 1 != e.length : 2 > e.length) || (f = b.getCommonAncestor()) &&
                f.type == CKEDITOR.NODE_ELEMENT && f.is("table"))return !1;
            var g;
            b = e[0];
            f = b.getAscendant("table");
            var k = CKEDITOR.tools.buildTableMap(f), l = k.length, m = k[0].length, n = b.getParent().$.rowIndex, p = h(k, n, b);
            if (c) {
                var z;
                try {
                    var D = parseInt(b.getAttribute("rowspan"), 10) || 1;
                    g = parseInt(b.getAttribute("colspan"), 10) || 1;
                    z = k["up" == c ? n - D : "down" == c ? n + D : n]["left" == c ? p - g : "right" == c ? p + g : p]
                } catch (F) {
                    return !1
                }
                if (!z || b.$ == z)return !1;
                e["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(z))
            }
            c = b.getDocument();
            var E = n,
                D = z = 0, J = !d && new CKEDITOR.dom.documentFragment(c), G = 0;
            for (c = 0; c < e.length; c++) {
                g = e[c];
                var M = g.getParent(), O = g.getFirst(), I = g.$.colSpan, R = g.$.rowSpan, M = M.$.rowIndex, P = h(k, M, g), G = G + I * R, D = Math.max(D, P - p + I);
                z = Math.max(z, M - n + R);
                d || (I = g, (R = I.getBogus()) && R.remove(), I.trim(), g.getChildren().count() && (M == E || !O || O.isBlockBoundary && O.isBlockBoundary({br: 1}) || (E = J.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !E || E.is && E.is("br") || J.append("br")), g.moveChildren(J)), c ? g.remove() : g.setHtml(""));
                E = M
            }
            if (d)return z *
                D == G;
            J.moveChildren(b);
            b.appendBogus();
            D >= m ? b.removeAttribute("rowSpan") : b.$.rowSpan = z;
            z >= l ? b.removeAttribute("colSpan") : b.$.colSpan = D;
            d = new CKEDITOR.dom.nodeList(f.$.rows);
            e = d.count();
            for (c = e - 1; 0 <= c; c--)f = d.getItem(c), f.$.cells.length || (f.remove(), e++);
            return b
        }

        function g(b, c) {
            var d = a(b);
            if (1 < d.length)return !1;
            if (c)return !0;
            var d = d[0], e = d.getParent(), f = e.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(f), k = e.$.rowIndex, l = h(g, k, d), m = d.$.rowSpan, n;
            if (1 < m) {
                n = Math.ceil(m / 2);
                for (var m = Math.floor(m /
                    2), e = k + n, f = new CKEDITOR.dom.element(f.$.rows[e]), g = h(g, e), p, e = d.clone(), k = 0; k < g.length; k++)if (p = g[k], p.parentNode == f.$ && k > l) {
                    e.insertBefore(new CKEDITOR.dom.element(p));
                    break
                } else p = null;
                p || f.append(e)
            } else for (m = n = 1, f = e.clone(), f.insertAfter(e), f.append(e = d.clone()), p = h(g, k), l = 0; l < p.length; l++)p[l].rowSpan++;
            e.appendBogus();
            d.$.rowSpan = n;
            e.$.rowSpan = m;
            1 == n && d.removeAttribute("rowSpan");
            1 == m && e.removeAttribute("rowSpan");
            return e
        }

        function n(b, c) {
            var d = a(b);
            if (1 < d.length)return !1;
            if (c)return !0;
            var d =
                d[0], e = d.getParent(), f = e.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(f), g = h(f, e.$.rowIndex, d), k = d.$.colSpan;
            if (1 < k)e = Math.ceil(k / 2), k = Math.floor(k / 2); else {
                for (var k = e = 1, l = [], m = 0; m < f.length; m++) {
                    var n = f[m];
                    l.push(n[g]);
                    1 < n[g].rowSpan && (m += n[g].rowSpan - 1)
                }
                for (f = 0; f < l.length; f++)l[f].colSpan++
            }
            f = d.clone();
            f.insertAfter(d);
            f.appendBogus();
            d.$.colSpan = e;
            f.$.colSpan = k;
            1 == e && d.removeAttribute("colSpan");
            1 == k && f.removeAttribute("colSpan");
            return f
        }

        var p = /^(?:td|th)$/;
        CKEDITOR.plugins.tabletools =
        {
            requires: "table,dialog,contextmenu", init: function (c) {
            function h(a) {
                return CKEDITOR.tools.extend(a || {}, {
                    contextSensitive: 1, refresh: function (a, b) {
                        this.setState(b.contains({
                            td: 1,
                            th: 1
                        }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }

            function p(a, b) {
                var d = c.addCommand(a, b);
                c.addFeature(d)
            }

            var r = c.lang.table;
            p("cellProperties", new CKEDITOR.dialogCommand("cellProperties", h({
                allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                requiredContent: "table"
            })));
            CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
            p("rowDelete", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    f(b(a))
                }
            }));
            p("rowInsertBefore", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    e(a, !0)
                }
            }));
            p("rowInsertAfter", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    e(a)
                }
            }));
            p("columnDelete", h({
                requiredContent: "table", exec: function (b) {
                    b = b.getSelection();
                    b = a(b);
                    var c = b[0], d = b[b.length - 1];
                    b = c.getAscendant("table");
                    for (var e = CKEDITOR.tools.buildTableMap(b), g, h, k = [], l = 0, m = e.length; l < m; l++)for (var n = 0, p = e[l].length; n < p; n++)e[l][n] == c.$ && (g = n), e[l][n] == d.$ && (h = n);
                    for (l = g; l <= h; l++)for (n = 0; n < e.length; n++)d = e[n], c = new CKEDITOR.dom.element(b.$.rows[n]), d = new CKEDITOR.dom.element(d[l]), d.$ && (1 == d.$.colSpan ? d.remove() : --d.$.colSpan, n += d.$.rowSpan - 1, c.$.cells.length || k.push(c));
                    h = b.$.rows[0] && b.$.rows[0].cells;
                    g = new CKEDITOR.dom.element(h[g] || (g ? h[g - 1] : b.$.parentNode));
                    k.length == m && b.remove();
                    g && f(g, !0)
                }
            }));
            p("columnInsertBefore",
                h({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        d(a, !0)
                    }
                }));
            p("columnInsertAfter", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    d(a)
                }
            }));
            p("cellDelete", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    m(a)
                }
            }));
            p("cellMerge", h({
                allowedContent: "td[colspan,rowspan]",
                requiredContent: "td[colspan,rowspan]",
                exec: function (a) {
                    f(k(a.getSelection()), !0)
                }
            }));
            p("cellMergeRight", h({
                allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) {
                    f(k(a.getSelection(),
                        "right"), !0)
                }
            }));
            p("cellMergeDown", h({
                allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) {
                    f(k(a.getSelection(), "down"), !0)
                }
            }));
            p("cellVerticalSplit", h({
                allowedContent: "td[rowspan]",
                requiredContent: "td[rowspan]",
                exec: function (a) {
                    f(n(a.getSelection()))
                }
            }));
            p("cellHorizontalSplit", h({
                allowedContent: "td[colspan]",
                requiredContent: "td[colspan]",
                exec: function (a) {
                    f(g(a.getSelection()))
                }
            }));
            p("cellInsertBefore", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    l(a, !0)
                }
            }));
            p("cellInsertAfter", h({
                requiredContent: "table", exec: function (a) {
                    a = a.getSelection();
                    l(a)
                }
            }));
            c.addMenuItems && c.addMenuItems({
                tablecell: {
                    label: r.cell.menu, group: "tablecell", order: 1, getItems: function () {
                        var b = c.getSelection(), d = a(b);
                        return {
                            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                            tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                            tablecell_delete: CKEDITOR.TRISTATE_OFF,
                            tablecell_merge: k(b, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            tablecell_merge_right: k(b, "right", !0) ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED,
                            tablecell_merge_down: k(b, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            tablecell_split_vertical: n(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            tablecell_split_horizontal: g(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            tablecell_properties: 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                        }
                    }
                },
                tablecell_insertBefore: {
                    label: r.cell.insertBefore,
                    group: "tablecell",
                    command: "cellInsertBefore",
                    order: 5
                },
                tablecell_insertAfter: {
                    label: r.cell.insertAfter,
                    group: "tablecell", command: "cellInsertAfter", order: 10
                },
                tablecell_delete: {label: r.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15},
                tablecell_merge: {label: r.cell.merge, group: "tablecell", command: "cellMerge", order: 16},
                tablecell_merge_right: {
                    label: r.cell.mergeRight,
                    group: "tablecell",
                    command: "cellMergeRight",
                    order: 17
                },
                tablecell_merge_down: {
                    label: r.cell.mergeDown,
                    group: "tablecell",
                    command: "cellMergeDown",
                    order: 18
                },
                tablecell_split_horizontal: {
                    label: r.cell.splitHorizontal, group: "tablecell",
                    command: "cellHorizontalSplit", order: 19
                },
                tablecell_split_vertical: {
                    label: r.cell.splitVertical,
                    group: "tablecell",
                    command: "cellVerticalSplit",
                    order: 20
                },
                tablecell_properties: {
                    label: r.cell.title,
                    group: "tablecellproperties",
                    command: "cellProperties",
                    order: 21
                },
                tablerow: {
                    label: r.row.menu, group: "tablerow", order: 1, getItems: function () {
                        return {
                            tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                            tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                            tablerow_delete: CKEDITOR.TRISTATE_OFF
                        }
                    }
                },
                tablerow_insertBefore: {
                    label: r.row.insertBefore,
                    group: "tablerow", command: "rowInsertBefore", order: 5
                },
                tablerow_insertAfter: {
                    label: r.row.insertAfter,
                    group: "tablerow",
                    command: "rowInsertAfter",
                    order: 10
                },
                tablerow_delete: {label: r.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15},
                tablecolumn: {
                    label: r.column.menu, group: "tablecolumn", order: 1, getItems: function () {
                        return {
                            tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                            tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                            tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                        }
                    }
                },
                tablecolumn_insertBefore: {
                    label: r.column.insertBefore,
                    group: "tablecolumn", command: "columnInsertBefore", order: 5
                },
                tablecolumn_insertAfter: {
                    label: r.column.insertAfter,
                    group: "tablecolumn",
                    command: "columnInsertAfter",
                    order: 10
                },
                tablecolumn_delete: {
                    label: r.column.deleteColumn,
                    group: "tablecolumn",
                    command: "columnDelete",
                    order: 15
                }
            });
            c.contextMenu && c.contextMenu.addListener(function (a, b, c) {
                return (a = c.contains({td: 1, th: 1}, 1)) && !a.isReadOnly() ? {
                    tablecell: CKEDITOR.TRISTATE_OFF,
                    tablerow: CKEDITOR.TRISTATE_OFF,
                    tablecolumn: CKEDITOR.TRISTATE_OFF
                } : null
            })
        }, getSelectedCells: a
        };
        CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(),CKEDITOR.tools.buildTableMap = function (a) {
        a = a.$.rows;
        for (var e = -1, b = [], c = 0; c < a.length; c++) {
            e++;
            !b[e] && (b[e] = []);
            for (var d = -1, l = 0; l < a[c].cells.length; l++) {
                var m = a[c].cells[l];
                for (d++; b[e][d];)d++;
                for (var f = isNaN(m.colSpan) ? 1 : m.colSpan, m = isNaN(m.rowSpan) ? 1 : m.rowSpan, h = 0; h < m; h++) {
                    b[e + h] || (b[e + h] = []);
                    for (var k = 0; k < f; k++)b[e + h][d + k] = a[c].cells[l]
                }
                d += f - 1
            }
        }
        return b
    },function () {
        CKEDITOR.plugins.add("templates", {
            requires: "dialog", init: function (a) {
                CKEDITOR.dialog.add("templates",
                    CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
                a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
                a.ui.addButton && a.ui.addButton("Templates", {
                    label: a.lang.templates.button,
                    command: "templates",
                    toolbar: "doctools,10"
                })
            }
        });
        var a = {}, e = {};
        CKEDITOR.addTemplates = function (b, c) {
            a[b] = c
        };
        CKEDITOR.getTemplates = function (b) {
            return a[b]
        };
        CKEDITOR.loadTemplates = function (a, c) {
            for (var d = [], l = 0, m = a.length; l < m; l++)e[a[l]] || (d.push(a[l]), e[a[l]] = 1);
            d.length ? CKEDITOR.scriptLoader.load(d, c) : setTimeout(c,
                0)
        }
    }(),CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")],CKEDITOR.config.templates_replaceContent = !0,function () {
        function a(a) {
            function b() {
                for (var g = c(), h = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), k = 0; k < h.length; k++) {
                    var l = h[k];
                    if ("/" != l) {
                        "string" == typeof l && (l = h[k] = {name: l});
                        var t, r = l.groups;
                        if (r)for (var q = 0; q < r.length; q++)t = r[q], (t = g[t]) && f(l, t);
                        (t = g[l.name]) && f(l, t)
                    }
                }
                return h
            }

            function c() {
                var b = {}, e, f, g;
                for (e in a.ui.items)f = a.ui.items[e], g = f.toolbar ||
                    "others", g = g.split(","), f = g[0], g = parseInt(g[1] || -1, 10), b[f] || (b[f] = []), b[f].push({
                    name: e,
                    order: g
                });
                for (f in b)b[f] = b[f].sort(function (a, b) {
                    return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1
                });
                return b
            }

            function f(b, c) {
                if (c.length) {
                    b.items ? b.items.push(a.ui.create("-")) : b.items = [];
                    for (var e; e = c.shift();)e = "string" == typeof e ? e : e.name, k && -1 != CKEDITOR.tools.indexOf(k, e) || (e = a.ui.create(e)) && a.addFeature(e) && b.items.push(e)
                }
            }

            function h(a) {
                var b = [], c, d, e;
                for (c = 0; c < a.length; ++c)d = a[c],
                    e = {}, "/" == d ? b.push(d) : CKEDITOR.tools.isArray(d) ? (f(e, CKEDITOR.tools.clone(d)), b.push(e)) : d.items && (f(e, CKEDITOR.tools.clone(d.items)), e.name = d.name, b.push(e));
                return b
            }

            var k = a.config.removeButtons, k = k && k.split(","), g = a.config.toolbar;
            "string" == typeof g && (g = a.config["toolbar_" + g]);
            return a.toolbar = g ? h(g) : b()
        }

        function e(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {name: "clipboard", groups: ["clipboard", "undo"]}, {
                    name: "editing", groups: ["find",
                        "selection", "spellchecker"]
                }, {name: "forms"}, "/", {name: "basicstyles", groups: ["basicstyles", "cleanup"]}, {
                    name: "paragraph",
                    groups: ["list", "indent", "blocks", "align", "bidi"]
                }, {name: "links"}, {name: "insert"}, "/", {name: "styles"}, {name: "colors"}, {name: "tools"}, {name: "others"}, {name: "about"}])
        }

        var b = function () {
            this.toolbars = [];
            this.focusCommandExecuted = !1
        };
        b.prototype.focus = function () {
            for (var a = 0, b; b = this.toolbars[a++];)for (var c = 0, e; e = b.items[c++];)if (e.focus) {
                e.focus();
                return
            }
        };
        var c = {
            modes: {wysiwyg: 1, source: 1},
            readOnly: 1, exec: function (a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () {
                    a.toolbox.focus()
                }, 100) : a.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button", init: function (d) {
                var e, m = function (a, b) {
                    var c, g = "rtl" == d.lang.dir, n = d.config.toolbarGroupCycling, p = g ? 37 : 39, g = g ? 39 : 37, n = void 0 === n || n;
                    switch (b) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !c || !c.items.length;)if (c = 9 == b ? (c ? c.next : a.toolbar.next) || d.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) ||
                                d.toolbox.toolbars[d.toolbox.toolbars.length - 1], c.items.length)for (a = c.items[e ? c.items.length - 1 : 0]; a && !a.focus;)(a = e ? a.previous : a.next) || (c = 0);
                            a && a.focus();
                            return !1;
                        case p:
                            c = a;
                            do c = c.next, !c && n && (c = a.toolbar.items[0]); while (c && !c.focus);
                            c ? c.focus() : m(a, 9);
                            return !1;
                        case 40:
                            return a.button && a.button.hasArrow ? (d.once("panelShow", function (a) {
                                a.data._.panel._.currentBlock.onKeyDown(40)
                            }), a.execute()) : m(a, 40 == b ? p : g), !1;
                        case g:
                        case 38:
                            c = a;
                            do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length -
                            1]); while (c && !c.focus);
                            c ? c.focus() : (e = 1, m(a, CKEDITOR.SHIFT + 9), e = 0);
                            return !1;
                        case 27:
                            return d.focus(), !1;
                        case 13:
                        case 32:
                            return a.execute(), !1
                    }
                    return !0
                };
                d.on("uiSpace", function (c) {
                    if (c.data.space == d.config.toolbarLocation) {
                        c.removeListener();
                        d.toolbox = new b;
                        var e = CKEDITOR.tools.getNextId(), k = ['\x3cspan id\x3d"', e, '" class\x3d"cke_voice_label"\x3e', d.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + d.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', e, '" onmousedown\x3d"return false;"\x3e'],
                            e = !1 !== d.config.toolbarStartupExpanded, g, l;
                        d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && k.push('\x3cspan class\x3d"cke_toolbox_main"' + (e ? "\x3e" : ' style\x3d"display:none"\x3e'));
                        for (var p = d.toolbox.toolbars, u = a(d), v = 0; v < u.length; v++) {
                            var t, r = 0, q, A = u[v], B;
                            if (A)if (g && (k.push("\x3c/span\x3e"), l = g = 0), "/" === A)k.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                B = A.items || A;
                                for (var w = 0; w < B.length; w++) {
                                    var y = B[w], C;
                                    if (y) {
                                        var x = function (a) {
                                            a = a.render(d, k);
                                            z = r.items.push(a) -
                                                1;
                                            0 < z && (a.previous = r.items[z - 1], a.previous.next = a);
                                            a.toolbar = r;
                                            a.onkey = m;
                                            a.onfocus = function () {
                                                d.toolbox.focusCommandExecuted || d.focus()
                                            }
                                        };
                                        if (y.type == CKEDITOR.UI_SEPARATOR)l = g && y; else {
                                            C = !1 !== y.canGroup;
                                            if (!r) {
                                                t = CKEDITOR.tools.getNextId();
                                                r = {id: t, items: []};
                                                q = A.name && (d.lang.toolbar.toolbarGroups[A.name] || A.name);
                                                k.push('\x3cspan id\x3d"', t, '" class\x3d"cke_toolbar"', q ? ' aria-labelledby\x3d"' + t + '_label"' : "", ' role\x3d"toolbar"\x3e');
                                                q && k.push('\x3cspan id\x3d"', t, '_label" class\x3d"cke_voice_label"\x3e',
                                                    q, "\x3c/span\x3e");
                                                k.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                                                var z = p.push(r) - 1;
                                                0 < z && (r.previous = p[z - 1], r.previous.next = r)
                                            }
                                            C ? g || (k.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), g = 1) : g && (k.push("\x3c/span\x3e"), g = 0);
                                            l && (x(l), l = 0);
                                            x(y)
                                        }
                                    }
                                }
                                g && (k.push("\x3c/span\x3e"), l = g = 0);
                                r && k.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                            }
                        }
                        d.config.toolbarCanCollapse && k.push("\x3c/span\x3e");
                        if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var D =
                                CKEDITOR.tools.addFunction(function () {
                                    d.execCommand("toolbarCollapse")
                                });
                            d.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(D)
                            });
                            d.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (a) {
                                    var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), e = c.getParent(), f = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
                                    h ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(),
                                        b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                                    b.getFirst().setText(h ? "▲" : "◀");
                                    d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
                                    a.fire("resize", {
                                        outerHeight: a.container.$.offsetHeight,
                                        contentsHeight: d.$.offsetHeight,
                                        outerWidth: a.container.$.offsetWidth
                                    })
                                }, modes: {wysiwyg: 1, source: 1}
                            });
                            d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            k.push('\x3ca title\x3d"' + (e ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) +
                                '" id\x3d"' + d.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                            e || k.push(" cke_toolbox_collapser_min");
                            k.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + D + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                        }
                        k.push("\x3c/span\x3e");
                        c.data.html += k.join("")
                    }
                });
                d.on("destroy", function () {
                    if (this.toolbox) {
                        var a, b = 0, c, d, e;
                        for (a = this.toolbox.toolbars; b < a.length; b++)for (d = a[b].items, c = 0; c < d.length; c++)e = d[c], e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn),
                        e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn)
                    }
                });
                d.on("uiReady", function () {
                    var a = d.ui.space("toolbox");
                    a && d.focusManager.add(a, 1)
                });
                d.addCommand("toolbarFocus", c);
                d.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                d.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                d.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function () {
                        return {
                            render: function (a, b) {
                                b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
                                return {}
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function (a, b,
                                                          c) {
            var f = e(this.editor), h = 0 === b, k = {name: a};
            if (c) {
                if (c = CKEDITOR.tools.search(f, function (a) {
                        return a.name == c
                    })) {
                    !c.groups && (c.groups = []);
                    if (b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) {
                        c.groups.splice(b + 1, 0, a);
                        return
                    }
                    h ? c.groups.splice(0, 0, a) : c.groups.push(a);
                    return
                }
                b = null
            }
            b && (b = CKEDITOR.tools.indexOf(f, function (a) {
                return a.name == b
            }));
            h ? f.splice(0, 0, a) : "number" == typeof b ? f.splice(b + 1, 0, k) : f.push(a)
        }
    }(),CKEDITOR.UI_SEPARATOR = "separator",CKEDITOR.config.toolbarLocation = "top","use strict",function () {
        var a =
            [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], e = {8: 1, 46: 1};
        CKEDITOR.plugins.add("undo", {
            init: function (c) {
                function d(a) {
                    g.enabled && !1 !== a.data.command.canUndo && g.save()
                }

                function e() {
                    g.enabled = c.readOnly ? !1 : "wysiwyg" == c.mode;
                    g.onChange()
                }

                var g = c.undoManager = new b(c), m = g.editingHandler = new l(g), p = c.addCommand("undo", {
                    exec: function () {
                        g.undo() && (c.selectionChange(), this.fire("afterUndo"))
                    }, startDisabled: !0, canUndo: !1
                }), u = c.addCommand("redo", {
                    exec: function () {
                        g.redo() && (c.selectionChange(),
                            this.fire("afterRedo"))
                    }, startDisabled: !0, canUndo: !1
                });
                c.setKeystroke([[a[0], "undo"], [a[1], "redo"], [a[2], "redo"]]);
                g.onChange = function () {
                    p.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    u.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                };
                c.on("beforeCommandExec", d);
                c.on("afterCommandExec", d);
                c.on("saveSnapshot", function (a) {
                    g.save(a.data && a.data.contentOnly)
                });
                c.on("contentDom", m.attachListeners, m);
                c.on("instanceReady", function () {
                    c.fire("saveSnapshot")
                });
                c.on("beforeModeUnload", function () {
                    "wysiwyg" == c.mode && g.save(!0)
                });
                c.on("mode", e);
                c.on("readOnly", e);
                c.ui.addButton && (c.ui.addButton("Undo", {
                    label: c.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), c.ui.addButton("Redo", {label: c.lang.undo.redo, command: "redo", toolbar: "undo,20"}));
                c.resetUndo = function () {
                    g.reset();
                    c.fire("saveSnapshot")
                };
                c.on("updateSnapshot", function () {
                    g.currentImage && g.update()
                });
                c.on("lockSnapshot", function (a) {
                    a = a.data;
                    g.lock(a && a.dontUpdate, a && a.forceUpdate)
                });
                c.on("unlockSnapshot",
                    g.unlock, g)
            }
        });
        CKEDITOR.plugins.undo = {};
        var b = CKEDITOR.plugins.undo.UndoManager = function (a) {
            this.strokesRecorded = [0, 0];
            this.locked = null;
            this.previousKeyGroup = -1;
            this.limit = a.config.undoStackSize || 20;
            this.strokesLimit = 25;
            this.editor = a;
            this.reset()
        };
        b.prototype = {
            type: function (a, c) {
                var d = b.getKeyGroup(a), e = this.strokesRecorded[d] + 1;
                c = c || e >= this.strokesLimit;
                this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
                c ? (e = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
                this.strokesRecorded[d] =
                    e;
                this.previousKeyGroup = d
            }, keyGroupChanged: function (a) {
                return b.getKeyGroup(a) != this.previousKeyGroup
            }, reset: function () {
                this.snapshots = [];
                this.index = -1;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = !1;
                this.locked = null;
                this.resetType()
            }, resetType: function () {
                this.strokesRecorded = [0, 0];
                this.typing = !1;
                this.previousKeyGroup = -1
            }, refreshState: function () {
                this.hasUndo = !!this.getNextImage(!0);
                this.hasRedo = !!this.getNextImage(!1);
                this.resetType();
                this.onChange()
            }, save: function (a, b, d) {
                var e = this.editor;
                if (this.locked ||
                    "ready" != e.status || "wysiwyg" != e.mode)return !1;
                var l = e.editable();
                if (!l || "ready" != l.status)return !1;
                l = this.snapshots;
                b || (b = new c(e));
                if (!1 === b.contents)return !1;
                if (this.currentImage)if (b.equalsContent(this.currentImage)) {
                    if (a || b.equalsSelection(this.currentImage))return !1
                } else!1 !== d && e.fire("change");
                l.splice(this.index + 1, l.length - this.index - 1);
                l.length == this.limit && l.shift();
                this.index = l.push(b) - 1;
                this.currentImage = b;
                !1 !== d && this.refreshState();
                return !0
            }, restoreImage: function (a) {
                var b = this.editor,
                    c;
                a.bookmarks && (b.focus(), c = b.getSelection());
                this.locked = {level: 999};
                this.editor.loadSnapshot(a.contents);
                a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
                this.locked = null;
                this.index = a.index;
                this.currentImage = this.snapshots[this.index];
                this.update();
                this.refreshState();
                b.fire("change")
            }, getNextImage: function (a) {
                var b = this.snapshots, c = this.currentImage, d;
                if (c)if (a)for (d = this.index - 1; 0 <= d; d--) {
                    if (a = b[d], !c.equalsContent(a))return a.index =
                        d, a
                } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a))return a.index = d, a;
                return null
            }, redoable: function () {
                return this.enabled && this.hasRedo
            }, undoable: function () {
                return this.enabled && this.hasUndo
            }, undo: function () {
                if (this.undoable()) {
                    this.save(!0);
                    var a = this.getNextImage(!0);
                    if (a)return this.restoreImage(a), !0
                }
                return !1
            }, redo: function () {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var a = this.getNextImage(!1);
                    if (a)return this.restoreImage(a), !0
                }
                return !1
            }, update: function (a) {
                if (!this.locked) {
                    a ||
                    (a = new c(this.editor));
                    for (var b = this.index, d = this.snapshots; 0 < b && this.currentImage.equalsContent(d[b - 1]);)--b;
                    d.splice(b, this.index - b + 1, a);
                    this.index = b;
                    this.currentImage = a
                }
            }, updateSelection: function (a) {
                if (!this.snapshots.length)return !1;
                var b = this.snapshots, c = b[b.length - 1];
                return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
            }, lock: function (a, b) {
                if (this.locked)this.locked.level++; else if (a)this.locked = {level: 1}; else {
                    var d = null;
                    if (b)d = !0; else {
                        var e = new c(this.editor,
                            !0);
                        this.currentImage && this.currentImage.equalsContent(e) && (d = e)
                    }
                    this.locked = {update: d, level: 1}
                }
            }, unlock: function () {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update;
                    this.locked = null;
                    if (!0 === a)this.update(); else if (a) {
                        var b = new c(this.editor, !0);
                        a.equalsContent(b) || this.update()
                    }
                }
            }
        };
        b.navigationKeyCodes = {37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1};
        b.keyGroups = {PRINTABLE: 0, FUNCTIONAL: 1};
        b.isNavigationKey = function (a) {
            return !!b.navigationKeyCodes[a]
        };
        b.getKeyGroup = function (a) {
            var c = b.keyGroups;
            return e[a] ? c.FUNCTIONAL : c.PRINTABLE
        };
        b.getOppositeKeyGroup = function (a) {
            var c = b.keyGroups;
            return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL
        };
        b.ieFunctionalKeysBug = function (a) {
            return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL
        };
        var c = CKEDITOR.plugins.undo.Image = function (a, b) {
                this.editor = a;
                a.fire("beforeUndoImage");
                var c = a.getSnapshot();
                CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                this.contents = c;
                b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
                a.fire("afterUndoImage")
            },
            d = /\b(?:href|src|name)="[^"]*?"/gi;
        c.prototype = {
            equalsContent: function (a) {
                var b = this.contents;
                a = a.contents;
                CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(d, ""), a = a.replace(d, ""));
                return b != a ? !1 : !0
            }, equalsSelection: function (a) {
                var b = this.bookmarks;
                a = a.bookmarks;
                if (b || a) {
                    if (!b || !a || b.length != a.length)return !1;
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c], e = a[c];
                        if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end,
                                e.end))return !1
                    }
                }
                return !0
            }
        };
        var l = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) {
            this.undoManager = a;
            this.ignoreInputEvent = !1;
            this.keyEventsStack = new m;
            this.lastKeydownImage = null
        };
        l.prototype = {
            onKeydown: function (d) {
                var e = d.data.getKey();
                if (229 !== e)if (-1 < CKEDITOR.tools.indexOf(a, d.data.getKeystroke()))d.data.preventDefault(); else if (this.keyEventsStack.cleanUp(d), d = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new c(d.editor), b.isNavigationKey(e) ||
                    this.undoManager.keyGroupChanged(e))if (d.strokesRecorded[0] || d.strokesRecorded[1])d.save(!1, this.lastKeydownImage, !1), d.resetType()
            }, onInput: function () {
                if (this.ignoreInputEvent)this.ignoreInputEvent = !1; else {
                    var a = this.keyEventsStack.getLast();
                    a || (a = this.keyEventsStack.push(0));
                    this.keyEventsStack.increment(a.keyCode);
                    this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
                }
            }, onKeyup: function (a) {
                var d = this.undoManager;
                a = a.data.getKey();
                var e = this.keyEventsStack.getTotalInputs();
                this.keyEventsStack.remove(a);
                if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(d.editor, !0))))if (0 < e)d.type(a); else if (b.isNavigationKey(a))this.onNavigationKey(!0)
            }, onNavigationKey: function (a) {
                var b = this.undoManager;
                !a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor));
                b.resetType()
            }, ignoreInputEventListener: function () {
                this.ignoreInputEvent = !0
            }, attachListeners: function () {
                var a = this.undoManager.editor,
                    c = a.editable(), d = this;
                c.attachListener(c, "keydown", function (a) {
                    d.onKeydown(a);
                    if (b.ieFunctionalKeysBug(a.data.getKey()))d.onInput()
                }, null, null, 999);
                c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", d.onInput, d, null, 999);
                c.attachListener(c, "keyup", d.onKeyup, d, null, 999);
                c.attachListener(c, "paste", d.ignoreInputEventListener, d, null, 999);
                c.attachListener(c, "drop", d.ignoreInputEventListener, d, null, 999);
                c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function () {
                        d.onNavigationKey()
                    },
                    null, null, 999);
                c.attachListener(this.undoManager.editor, "blur", function () {
                    d.keyEventsStack.remove(9)
                }, null, null, 999)
            }
        };
        var m = CKEDITOR.plugins.undo.KeyEventsStack = function () {
            this.stack = []
        };
        m.prototype = {
            push: function (a) {
                a = this.stack.push({keyCode: a, inputs: 0});
                return this.stack[a - 1]
            }, getLastIndex: function (a) {
                if ("number" != typeof a)return this.stack.length - 1;
                for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a)return b;
                return -1
            }, getLast: function (a) {
                a = this.getLastIndex(a);
                return -1 != a ? this.stack[a] :
                    null
            }, increment: function (a) {
                this.getLast(a).inputs++
            }, remove: function (a) {
                a = this.getLastIndex(a);
                -1 != a && this.stack.splice(a, 1)
            }, resetInputs: function (a) {
                if ("number" == typeof a)this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0
            }, getTotalInputs: function () {
                for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs;
                return b
            }, cleanUp: function (a) {
                a = a.data.$;
                a.ctrlKey || a.metaKey || this.remove(17);
                a.shiftKey || this.remove(16);
                a.altKey || this.remove(18)
            }
        }
    }(),CKEDITOR.plugins.add("wsc",
        {
            requires: "dialog", parseApi: function (a) {
            a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function () {
            };
            a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function () {
            }
        }, parseConfig: function (a) {
            a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
            a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds ||
                "";
            a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
            a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
            a.config.wsc_interfaceLang = a.config.wsc_interfaceLang;
            CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
            CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
            CKEDITOR.config.wsc_removeGlobalVariable = !0
        }, init: function (a) {
            var e = CKEDITOR.env;
            this.parseConfig(a);
            this.parseApi(a);
            a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(e.ie && (8 > e.version || e.quirks))};
            "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
                label: a.lang.wsc.toolbar, click: function (a) {
                    var c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                    (c = c.replace(/\s/g, "")) ? a.execCommand("checkspell") : alert("Nothing to check!")
                },
                toolbar: "spellchecker,10"
            });
            CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
        }),function () {
        function a(a) {
            function b(a) {
                var c = !1;
                g.attachListener(g, "keydown", function () {
                    var b = f.getBody().getElementsByTag(a);
                    if (!c) {
                        for (var d = 0; d < b.count(); d++)b.getItem(d).setCustomData("retain", !0);
                        c = !0
                    }
                }, null, null, 1);
                g.attachListener(g, "keyup", function () {
                    var b = f.getElementsByTag(a);
                    c && (1 != b.count() || b.getItem(0).getCustomData("retain") ||
                    b.getItem(0).hasAttribute("data-cke-temp") || b.getItem(0).remove(1), c = !1)
                })
            }

            var c = this.editor, f = a.document, h = f.body, k = f.getElementById("cke_actscrpt");
            k && k.parentNode.removeChild(k);
            (k = f.getElementById("cke_shimscrpt")) && k.parentNode.removeChild(k);
            (k = f.getElementById("cke_basetagscrpt")) && k.parentNode.removeChild(k);
            h.contentEditable = !0;
            CKEDITOR.env.ie && (h.hideFocus = !0, h.disabled = !0, h.removeAttribute("disabled"));
            delete this._.isLoadingData;
            this.$ = h;
            f = new CKEDITOR.dom.document(f);
            this.setup();
            this.fixInitialSelection();
            var g = this;
            CKEDITOR.env.ie && !CKEDITOR.env.edge && f.getDocumentElement().addClass(f.$.compatMode);
            CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_DIV && b("div");
            if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version)f.getDocumentElement().on("mousedown", function (a) {
                a.data.getTarget().is("html") && setTimeout(function () {
                    c.editable().focus()
                })
            });
            e(c);
            try {
                c.document.$.execCommand("2D-position", !1, !0)
            } catch (n) {
            }
            (CKEDITOR.env.gecko ||
            CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                var b = a.data.getKeystroke();
                if (33 == b || 34 == b)if (CKEDITOR.env.ie)setTimeout(function () {
                    c.getSelection().scrollIntoView()
                }, 0); else if (c.window.$.innerHeight > this.$.offsetHeight) {
                    var d = c.createRange();
                    d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    d.select();
                    a.data.preventDefault()
                }
            });
            CKEDITOR.env.ie && this.attachListener(f, "blur", function () {
                try {
                    f.$.selection.empty()
                } catch (a) {
                }
            });
            CKEDITOR.env.iOS &&
            this.attachListener(f, "touchend", function () {
                a.focus()
            });
            h = c.document.getElementsByTag("title").getItem(0);
            h.data("cke-title", h.getText());
            CKEDITOR.env.ie && (c.document.$.title = this._.docTitle);
            CKEDITOR.tools.setTimeout(function () {
                "unloaded" == this.status && (this.status = "ready");
                c.fire("contentDom");
                this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1);
                setTimeout(function () {
                    c.fire("dataReady")
                }, 0)
            }, 0, this)
        }

        function e(a) {
            function b() {
                var e;
                a.editable().attachListener(a, "selectionChange", function () {
                    var b =
                        a.getSelection().getSelectedElement();
                    b && (e && (e.detachEvent("onresizestart", c), e = null), b.$.attachEvent("onresizestart", c), e = b.$)
                })
            }

            function c(a) {
                a.returnValue = !1
            }

            if (CKEDITOR.env.gecko)try {
                var e = a.document.$;
                e.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
                e.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
            } catch (h) {
            } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
        }

        function b() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
                var b = [], c;
                for (c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]");
                a.push(b.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }

        var c;
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                });
                a.addMode("wysiwyg", function (b) {
                    function e(f) {
                        f && f.removeListener();
                        a.editable(new c(a, h.$.contentWindow.document.body));
                        a.setData(a.getData(1), b)
                    }

                    var f = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", f = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "", h = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + f + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
                    h.setStyles({width: "100%", height: "100%"});
                    h.addClass("cke_wysiwyg_frame").addClass("cke_reset");
                    f = a.ui.space("contents");
                    f.append(h);
                    var k = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                    if (k)h.on("load", e);
                    var g = a.title, n = a.fire("ariaEditorHelpLabel", {}).label;
                    g && (CKEDITOR.env.ie && n && (g += ", " + n), h.setAttribute("title", g));
                    if (n) {
                        var g = CKEDITOR.tools.getNextId(), p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e");
                        f.append(p, 1);
                        h.setAttribute("aria-describedby",
                            g)
                    }
                    a.on("beforeModeUnload", function (a) {
                        a.removeListener();
                        p && p.remove()
                    });
                    h.setAttributes({tabIndex: a.tabIndex, allowTransparency: "true"});
                    !k && e();
                    a.fire("ariaWidget", h)
                })
            }
        });
        CKEDITOR.editor.prototype.addContentsCss = function (a) {
            var b = this.config, c = b.contentsCss;
            CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []);
            b.contentsCss.push(a)
        };
        c = CKEDITOR.tools.createClass({
            $: function () {
                this.base.apply(this, arguments);
                this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) {
                    CKEDITOR.tools.setTimeout(a,
                        0, this, b)
                }, this);
                this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (a, c) {
                    var e = this.editor;
                    if (c)this.setHtml(a), this.fixInitialSelection(), e.fire("dataReady"); else {
                        this._.isLoadingData = !0;
                        e._.dataStore = {id: 1};
                        var f = e.config, h = f.fullPage, k = f.docType, g = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
                        h || (g += CKEDITOR.tools.buildStyleHtml(e.config.contentsCss));
                        var n = f.baseHref ? '\x3cbase href\x3d"' +
                        f.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
                        h && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
                            e.docType = k = a;
                            return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function (a) {
                            e.xmlDeclaration = a;
                            return ""
                        }));
                        a = e.dataProcessor.toHtml(a);
                        h ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
                        n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = k + a) : a = f.docType + '\x3chtml dir\x3d"' + f.contentsLangDirection + '" lang\x3d"' + (f.contentsLanguage || e.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (f.bodyId ? ' id\x3d"' + f.bodyId + '"' : "") + (f.bodyClass ? ' class\x3d"' + f.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
                        CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version &&
                        (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
                        f = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
                        a = a.replace(/(?=\s*<\/(:?head)>)/, f);
                        this.clearCustomData();
                        this.clearListeners();
                        e.fire("contentDomUnload");
                        var p = this.getDocument();
                        try {
                            p.write(a)
                        } catch (u) {
                            setTimeout(function () {
                                p.write(a)
                            }, 0)
                        }
                    }
                }, getData: function (a) {
                    if (a)return this.getHtml();
                    a = this.editor;
                    var b = a.config, c = b.fullPage, e = c && a.docType, h = c && a.xmlDeclaration,
                        k = this.getDocument(), c = c ? k.getDocumentElement().getOuterHtml() : k.getBody().getHtml();
                    CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                    c = a.dataProcessor.toDataFormat(c);
                    h && (c = h + "\n" + c);
                    e && (c = e + "\n" + c);
                    return c
                }, focus: function () {
                    this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this)
                }, detach: function () {
                    var a = this.editor, b = a.document, e;
                    try {
                        e = a.window.getFrame()
                    } catch (f) {
                    }
                    c.baseProto.detach.call(this);
                    this.clearCustomData();
                    b.getDocumentElement().clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                    e && e.getParent() ? (e.clearCustomData(), (a = e.removeCustomData("onResize")) && a.removeListener(), e.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    }(),CKEDITOR.config.disableObjectResizing = !1,CKEDITOR.config.disableNativeTableHandles = !0,CKEDITOR.config.disableNativeSpellChecker = !0,CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wsc,wysiwygarea",
        CKEDITOR.config.skin = "moono",function () {
        var a = function (a, b) {
            var c = CKEDITOR.getUrl("plugins/" + b);
            a = a.split(",");
            for (var d = 0; d < a.length; d++)CKEDITOR.skin.icons[a[d]] = {path: c, offset: -a[++d], bgsize: a[++d]}
        };
        CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,creatediv,432,,find-rtl,456,,find,480,,replace,504,,flash,528,,button,552,,checkbox,576,,form,600,,hiddenfield,624,,imagebutton,648,,radio,672,,select-rtl,696,,select,720,,textarea-rtl,744,,textarea,768,,textfield-rtl,792,,textfield,816,,horizontalrule,840,,iframe,864,,image,888,,indent-rtl,912,,indent,936,,outdent-rtl,960,,outdent,984,,justifyblock,1008,,justifycenter,1032,,justifyleft,1056,,justifyright,1080,,language,1104,,anchor-rtl,1128,,anchor,1152,,link,1176,,unlink,1200,,bulletedlist-rtl,1224,,bulletedlist,1248,,numberedlist-rtl,1272,,numberedlist,1296,,maximize,1320,,newpage-rtl,1344,,newpage,1368,,pagebreak-rtl,1392,,pagebreak,1416,,pastefromword-rtl,1440,,pastefromword,1464,,pastetext-rtl,1488,,pastetext,1512,,preview-rtl,1536,,preview,1560,,print,1584,,removeformat,1608,,save,1632,,scayt,1656,,selectall,1680,,showblocks-rtl,1704,,showblocks,1728,,smiley,1752,,source-rtl,1776,,source,1800,,specialchar,1824,,table,1848,,templates-rtl,1872,,templates,1896,,redo-rtl,1920,,redo,1944,,undo-rtl,1968,,undo,1992,,spellchecker,2016,",
            "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,creatediv,432,auto,find-rtl,456,auto,find,480,auto,replace,504,auto,flash,528,auto,button,552,auto,checkbox,576,auto,form,600,auto,hiddenfield,624,auto,imagebutton,648,auto,radio,672,auto,select-rtl,696,auto,select,720,auto,textarea-rtl,744,auto,textarea,768,auto,textfield-rtl,792,auto,textfield,816,auto,horizontalrule,840,auto,iframe,864,auto,image,888,auto,indent-rtl,912,auto,indent,936,auto,outdent-rtl,960,auto,outdent,984,auto,justifyblock,1008,auto,justifycenter,1032,auto,justifyleft,1056,auto,justifyright,1080,auto,language,1104,auto,anchor-rtl,1128,auto,anchor,1152,auto,link,1176,auto,unlink,1200,auto,bulletedlist-rtl,1224,auto,bulletedlist,1248,auto,numberedlist-rtl,1272,auto,numberedlist,1296,auto,maximize,1320,auto,newpage-rtl,1344,auto,newpage,1368,auto,pagebreak-rtl,1392,auto,pagebreak,1416,auto,pastefromword-rtl,1440,auto,pastefromword,1464,auto,pastetext-rtl,1488,auto,pastetext,1512,auto,preview-rtl,1536,auto,preview,1560,auto,print,1584,auto,removeformat,1608,auto,save,1632,auto,scayt,1656,auto,selectall,1680,auto,showblocks-rtl,1704,auto,showblocks,1728,auto,smiley,1752,auto,source-rtl,1776,auto,source,1800,auto,specialchar,1824,auto,table,1848,auto,templates-rtl,1872,auto,templates,1896,auto,redo-rtl,1920,auto,redo,1944,auto,undo-rtl,1968,auto,undo,1992,auto,spellchecker,2016,auto",
            "icons.png")
    }())
})();
