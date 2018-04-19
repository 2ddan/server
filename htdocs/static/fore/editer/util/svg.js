/* svg.js 1.0.1-3-g6b0c1d2 - svg selector inventor polyfill regex default color array pointarray patharray number viewbox bbox rbox element parent container fx relative event defs group arrange mask clip gradient pattern doc shape symbol use rect ellipse line poly path image text textpath nested hyperlink marker sugar set data memory loader helpers - svgjs.com/license */
(function (e, t) {
    typeof define == "function" && define.amd ? define(t) : typeof exports == "object" ? module.exports = t() : e.SVG = t()
})(this, function () {
    function r(e) {
        return e.toLowerCase().replace(/-(.)/g, function (e, t) {
            return t.toUpperCase()
        })
    }

    function i(e) {
        return e.length == 4 ? ["#", e.substring(1, 2), e.substring(1, 2), e.substring(2, 3), e.substring(2, 3), e.substring(3, 4), e.substring(3, 4)].join("") : e
    }

    function s(e) {
        var t = e.toString(16);
        return t.length == 1 ? "0" + t : t
    }

    function o(e, t, n) {
        if (t == null || n == null)n == null ? n = e.height / e.width * t : t == null && (t = e.width / e.height * n);
        return {width: t, height: n}
    }

    function u(t, n) {
        return typeof t.from == "number" ? t.from + (t.to - t.from) * n : t instanceof e.Color || t instanceof e.Number ? t.at(n) : n < 1 ? t.from : t.to
    }

    function a(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++)r += e[t][0], e[t][1] != null && (r += e[t][1], e[t][2] != null && (r += " ", r += e[t][2], e[t][3] != null && (r += " ", r += e[t][3], r += " ", r += e[t][4], e[t][5] != null && (r += " ", r += e[t][5], r += " ", r += e[t][6], e[t][7] != null && (r += " ", r += e[t][7])))));
        return r + " "
    }

    function f(e) {
        e.x2 = e.x + e.width, e.y2 = e.y + e.height, e.cx = e.x + e.width / 2, e.cy = e.y + e.height / 2
    }

    function l(e) {
        if (e.matrix) {
            var t = e.matrix.replace(/\s/g, "").split(",");
            t.length == 6 && (e.a = parseFloat(t[0]), e.b = parseFloat(t[1]), e.c = parseFloat(t[2]), e.d = parseFloat(t[3]), e.e = parseFloat(t[4]), e.f = parseFloat(t[5]))
        }
        return e
    }

    function c(t) {
        var n = t.toString().match(e.regex.reference);
        if (n)return n[1]
    }

    var e = this.SVG = function (t,n) {
        if (e.supported)return t = new e.Doc(t), e.parser || e.prepare(t,n), t
    };
    e.ns = "http://www.w3.org/2000/svg", e.xmlns = "http://www.w3.org/2000/xmlns/", e.xlink = "http://www.w3.org/1999/xlink", e.did = 1e3, e.eid = function (t) {
        return "Svgjs" + t.charAt(0).toUpperCase() + t.slice(1) + e.did++
    }, e.create = function (e) {
        var t = window.document.createElementNS(this.ns, e);
        return t.setAttribute("id", this.eid(e)), t
    }, e.extend = function () {
        var t, n, r, i;
        t = [].slice.call(arguments), n = t.pop();
        for (i = t.length - 1; i >= 0; i--)if (t[i])for (r in n)t[i].prototype[r] = n[r];
        e.Set && e.Set.inherit && e.Set.inherit()
    }, e.prepare = function (t,n) {
        var r = (n ? new e.Doc(n) : t.nested()).size(2, 0), i = e.create("path");
        r.node.appendChild(i), e.parser = {
            body: n || t.parent,
            draw: r.style("opacity:0;position:fixed;left:100%;top:100%;overflow:hidden"),
            poly: r.polyline().node,
            path: i
        }
    }, e.supported = function () {
        return !!document.createElementNS && !!document.createElementNS(e.ns, "svg").createSVGRect
    }();
    if (!e.supported)return !1;
    e.get = function (e) {
        var t = window.document.getElementById(c(e) || e);
        if (t)return t.instance
    }, e.invent = function (t) {
        var n = typeof t.create == "function" ? t.create : function () {
            this.constructor.call(this, e.create(t.create))
        };
        return t.inherit && (n.prototype = new t.inherit), t.extend && e.extend(n, t.extend), t.construct && e.extend(t.parent || e.Container, t.construct), n
    };
    if (typeof t != "function") {
        function t(e, t) {
            t = t || {bubbles: !1, cancelable: !1, detail: undefined};
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        }

        t.prototype = window.Event.prototype, window.CustomEvent = t
    }
    e.regex = {
        unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
        hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
        rgb: /rgb\((\d+),(\d+),(\d+)\)/,
        reference: /#([a-z0-9\-_]+)/i,
        isHex: /^#[a-f0-9]{3,6}$/i,
        isRgb: /^rgb\(/,
        isCss: /[^:]+:[^;]+;?/,
        isBlank: /^(\s+)?$/,
        isNumber: /^-?[\d\.]+$/,
        isPercent: /^-?[\d\.]+%$/,
        isImage: /\.(jpg|jpeg|png|gif)(\?[^=]+.*)?/i,
        isEvent: /^[\w]+:[\w]+$/
    }, e.defaults = {
        matrix: "1 0 0 1 0 0",
        attrs: {
            "fill-opacity": 1,
            "stroke-opacity": 1,
            "stroke-width": 0,
            "stroke-linejoin": "miter",
            "stroke-linecap": "butt",
            fill: "#000000",
            stroke: "#000000",
            opacity: 1,
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            width: 0,
            height: 0,
            r: 0,
            rx: 0,
            ry: 0,
            offset: 0,
            "stop-opacity": 1,
            "stop-color": "#000000",
            "font-size": 16,
            "font-family": "Helvetica, Arial, sans-serif",
            "text-anchor": "start"
        },
        trans: function () {
            return {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                skewX: 0,
                skewY: 0,
                matrix: this.matrix,
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            }
        }
    }, e.Color = function (t) {
        var n;
        this.r = 0, this.g = 0, this.b = 0, typeof t == "string" ? e.regex.isRgb.test(t) ? (n = e.regex.rgb.exec(t.replace(/\s/g, "")), this.r = parseInt(n[1]), this.g = parseInt(n[2]), this.b = parseInt(n[3])) : e.regex.isHex.test(t) && (n = e.regex.hex.exec(i(t)), this.r = parseInt(n[1], 16), this.g = parseInt(n[2], 16), this.b = parseInt(n[3], 16)) : typeof t == "object" && (this.r = t.r, this.g = t.g, this.b = t.b)
    }, e.extend(e.Color, {
        toString: function () {
            return this.toHex()
        }, toHex: function () {
            return "#" + s(this.r) + s(this.g) + s(this.b)
        }, toRgb: function () {
            return "rgb(" + [this.r, this.g, this.b].join() + ")"
        }, brightness: function () {
            return this.r / 255 * .3 + this.g / 255 * .59 + this.b / 255 * .11
        }, morph: function (t) {
            return this.destination = new e.Color(t), this
        }, at: function (t) {
            return this.destination ? (t = t < 0 ? 0 : t > 1 ? 1 : t, new e.Color({
                r: ~~(this.r + (this.destination.r - this.r) * t),
                g: ~~(this.g + (this.destination.g - this.g) * t),
                b: ~~(this.b + (this.destination.b - this.b) * t)
            })) : this
        }
    }), e.Color.test = function (t) {
        return t += "", e.regex.isHex.test(t) || e.regex.isRgb.test(t)
    }, e.Color.isRgb = function (e) {
        return e && typeof e.r == "number" && typeof e.g == "number" && typeof e.b == "number"
    }, e.Color.isColor = function (t) {
        return e.Color.isRgb(t) || e.Color.test(t)
    }, e.Array = function (e, t) {
        e = (e || []).valueOf(), e.length == 0 && t && (e = t.valueOf()), this.value = this.parse(e)
    }, e.extend(e.Array, {
        morph: function (e) {
            this.destination = this.parse(e);
            if (this.value.length != this.destination.length) {
                var t = this.value[this.value.length - 1], n = this.destination[this.destination.length - 1];
                while (this.value.length > this.destination.length)this.destination.push(n);
                while (this.value.length < this.destination.length)this.value.push(t)
            }
            return this
        }, settle: function () {
            for (var e = 0, t = this.value.length, n = []; e < t; e++)n.indexOf(this.value[e]) == -1 && n.push(this.value[e]);
            return this.value = n
        }, at: function (t) {
            if (!this.destination)return this;
            for (var n = 0, r = this.value.length, i = []; n < r; n++)i.push(this.value[n] + (this.destination[n] - this.value[n]) * t);
            return new e.Array(i)
        }, toString: function () {
            return this.value.join(" ")
        }, valueOf: function () {
            return this.value
        }, parse: function (e) {
            return e = e.valueOf(), Array.isArray(e) ? e : this.split(e)
        }, split: function (e) {
            return e.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ")
        }, reverse: function () {
            return this.value.reverse(), this
        }
    }), e.PointArray = function () {
        this.constructor.apply(this, arguments)
    }, e.PointArray.prototype = new e.Array, e.extend(e.PointArray, {
        toString: function () {
            for (var e = 0, t = this.value.length, n = []; e < t; e++)n.push(this.value[e].join(","));
            return n.join(" ")
        }, at: function (t) {
            if (!this.destination)return this;
            for (var n = 0, r = this.value.length, i = []; n < r; n++)i.push([this.value[n][0] + (this.destination[n][0] - this.value[n][0]) * t, this.value[n][1] + (this.destination[n][1] - this.value[n][1]) * t]);
            return new e.PointArray(i)
        }, parse: function (e) {
            e = e.valueOf();
            if (Array.isArray(e))return e;
            e = this.split(e);
            for (var t = 0, n = e.length, r, i = []; t < n; t++)r = e[t].split(","), i.push([parseFloat(r[0]), parseFloat(r[1])]);
            return i
        }, move: function (e, t) {
            var n = this.bbox();
            e -= n.x, t -= n.y;
            if (!isNaN(e) && !isNaN(t))for (var r = this.value.length - 1; r >= 0; r--)this.value[r] = [this.value[r][0] + e, this.value[r][1] + t];
            return this
        }, size: function (e, t) {
            var n, r = this.bbox();
            for (n = this.value.length - 1; n >= 0; n--)this.value[n][0] = (this.value[n][0] - r.x) * e / r.width + r.x, this.value[n][1] = (this.value[n][1] - r.y) * t / r.height + r.y;
            return this
        }, bbox: function () {
            return e.parser.poly.setAttribute("points", this.toString()), e.parser.poly.getBBox()
        }
    }), e.PathArray = function (e, t) {
        this.constructor.call(this, e, t)
    }, e.PathArray.prototype = new e.Array, e.extend(e.PathArray, {
        toString: function () {
            return a(this.value)
        }, move: function (e, t) {
            var n = this.bbox();
            e -= n.x, t -= n.y;
            if (!isNaN(e) && !isNaN(t))for (var r, i = this.value.length - 1; i >= 0; i--)r = this.value[i][0], r == "M" || r == "L" || r == "T" ? (this.value[i][1] += e, this.value[i][2] += t) : r == "H" ? this.value[i][1] += e : r == "V" ? this.value[i][1] += t : r == "C" || r == "S" || r == "Q" ? (this.value[i][1] += e, this.value[i][2] += t, this.value[i][3] += e, this.value[i][4] += t, r == "C" && (this.value[i][5] += e, this.value[i][6] += t)) : r == "A" && (this.value[i][6] += e, this.value[i][7] += t);
            return this
        }, size: function (e, t) {
            var n, r, i = this.bbox();
            for (n = this.value.length - 1; n >= 0; n--)r = this.value[n][0], r == "M" || r == "L" || r == "T" ? (this.value[n][1] = (this.value[n][1] - i.x) * e / i.width + i.x, this.value[n][2] = (this.value[n][2] - i.y) * t / i.height + i.y) : r == "H" ? this.value[n][1] = (this.value[n][1] - i.x) * e / i.width + i.x : r == "V" ? this.value[n][1] = (this.value[n][1] - i.y) * t / i.height + i.y : r == "C" || r == "S" || r == "Q" ? (this.value[n][1] = (this.value[n][1] - i.x) * e / i.width + i.x, this.value[n][2] = (this.value[n][2] - i.y) * t / i.height + i.y, this.value[n][3] = (this.value[n][3] - i.x) * e / i.width + i.x, this.value[n][4] = (this.value[n][4] - i.y) * t / i.height + i.y, r == "C" && (this.value[n][5] = (this.value[n][5] - i.x) * e / i.width + i.x, this.value[n][6] = (this.value[n][6] - i.y) * t / i.height + i.y)) : r == "A" && (this.value[n][1] = this.value[n][1] * e / i.width, this.value[n][2] = this.value[n][2] * t / i.height, this.value[n][6] = (this.value[n][6] - i.x) * e / i.width + i.x, this.value[n][7] = (this.value[n][7] - i.y) * t / i.height + i.y);
            return this
        }, parse: function (t) {
            if (t instanceof e.PathArray)return t.valueOf();
            var n, r, i, s, o, u, f, l, c, h, p, d = 0, v = 0;
            e.parser.path.setAttribute("d", typeof t == "string" ? t : a(t)), p = e.parser.path.pathSegList;
            for (n = 0, r = p.numberOfItems; n < r; ++n) {
                h = p.getItem(n), c = h.pathSegTypeAsLetter;
                if (c == "M" || c == "L" || c == "H" || c == "V" || c == "C" || c == "S" || c == "Q" || c == "T" || c == "A")"x"in h && (d = h.x), "y"in h && (v = h.y); else {
                    "x1"in h && (o = d + h.x1), "x2"in h && (f = d + h.x2), "y1"in h && (u = v + h.y1), "y2"in h && (l = v + h.y2), "x"in h && (d += h.x), "y"in h && (v += h.y);
                    if (c == "m")p.replaceItem(e.parser.path.createSVGPathSegMovetoAbs(d, v), n); else if (c == "l")p.replaceItem(e.parser.path.createSVGPathSegLinetoAbs(d, v), n); else if (c == "h")p.replaceItem(e.parser.path.createSVGPathSegLinetoHorizontalAbs(d), n); else if (c == "v")p.replaceItem(e.parser.path.createSVGPathSegLinetoVerticalAbs(v), n); else if (c == "c")p.replaceItem(e.parser.path.createSVGPathSegCurvetoCubicAbs(d, v, o, u, f, l), n); else if (c == "s")p.replaceItem(e.parser.path.createSVGPathSegCurvetoCubicSmoothAbs(d, v, f, l), n); else if (c == "q")p.replaceItem(e.parser.path.createSVGPathSegCurvetoQuadraticAbs(d, v, o, u), n); else if (c == "t")p.replaceItem(e.parser.path.createSVGPathSegCurvetoQuadraticSmoothAbs(d, v), n); else if (c == "a")p.replaceItem(e.parser.path.createSVGPathSegArcAbs(d, v, h.r1, h.r2, h.angle, h.largeArcFlag, h.sweepFlag), n); else if (c == "z" || c == "Z")d = i, v = s
                }
                if (c == "M" || c == "m")i = d, s = v
            }
            t = [], p = e.parser.path.pathSegList;
            for (n = 0, r = p.numberOfItems; n < r; ++n)h = p.getItem(n), c = h.pathSegTypeAsLetter, d = [c], c == "M" || c == "L" || c == "T" ? d.push(h.x, h.y) : c == "H" ? d.push(h.x) : c == "V" ? d.push(h.y) : c == "C" ? d.push(h.x1, h.y1, h.x2, h.y2, h.x, h.y) : c == "S" ? d.push(h.x2, h.y2, h.x, h.y) : c == "Q" ? d.push(h.x1, h.y1, h.x, h.y) : c == "A" && d.push(h.r1, h.r2, h.angle, h.largeArcFlag | 0, h.sweepFlag | 0, h.x, h.y), t.push(d);
            return t
        }, bbox: function () {
            return e.parser.path.setAttribute("d", this.toString()), e.parser.path.getBBox()
        }
    }), e.Number = function (t) {
        this.value = 0, this.unit = "";
        if (typeof t == "number")this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -3.4e38 : 3.4e38; else if (typeof t == "string") {
            var n = t.match(e.regex.unit);
            n && (this.value = parseFloat(n[1]), n[2] == "%" ? this.value /= 100 : n[2] == "s" && (this.value *= 1e3), this.unit = n[2])
        } else t instanceof e.Number && (this.value = t.value, this.unit = t.unit)
    }, e.extend(e.Number, {
        toString: function () {
            return (this.unit == "%" ? ~~(this.value * 1e8) / 1e6 : this.unit == "s" ? this.value / 1e3 : this.value) + this.unit
        }, valueOf: function () {
            return this.value
        }, plus: function (t) {
            return this.value = this + new e.Number(t), this
        }, minus: function (t) {
            return this.plus(-(new e.Number(t)))
        }, times: function (t) {
            return this.value = this * new e.Number(t), this
        }, divide: function (t) {
            return this.value = this / new e.Number(t), this
        }, to: function (e) {
            return typeof e == "string" && (this.unit = e), this
        }, morph: function (t) {
            return this.destination = new e.Number(t), this
        }, at: function (t) {
            return this.destination ? (new e.Number(this.destination)).minus(this).times(t).plus(this) : this
        }
    }), e.ViewBox = function (t) {
        var n, r, i, s, o = 1, u = 1, a = t.bbox(), f = (t.attr("viewBox") || "").match(/-?[\d\.]+/g), l = t, c = t;
        i = new e.Number(t.width()), s = new e.Number(t.height());
        while (i.unit == "%")o *= i.value, i = new e.Number(l instanceof e.Doc ? l.parent.offsetWidth : l.parent.width()), l = l.parent;
        while (s.unit == "%")u *= s.value, s = new e.Number(c instanceof e.Doc ? c.parent.offsetHeight : c.parent.height()), c = c.parent;
        this.x = a.x, this.y = a.y, this.width = i * o, this.height = s * u, this.zoom = 1, f && (n = parseFloat(f[0]), r = parseFloat(f[1]), i = parseFloat(f[2]), s = parseFloat(f[3]), this.zoom = this.width / this.height > i / s ? this.height / s : this.width / i, this.x = n, this.y = r, this.width = i, this.height = s)
    }, e.extend(e.ViewBox, {
        toString: function () {
            return this.x + " " + this.y + " " + this.width + " " + this.height
        }
    }), e.BBox = function (e) {
        var t;
        this.x = 0, this.y = 0, this.width = 0, this.height = 0;
        if (e) {
            try {
                t = e.node.getBBox()
            } catch (n) {
                t = {x: e.node.clientLeft, y: e.node.clientTop, width: e.node.clientWidth, height: e.node.clientHeight}
            }
            this.x = t.x + e.trans.x, this.y = t.y + e.trans.y, this.width = t.width * e.trans.scaleX, this.height = t.height * e.trans.scaleY
        }
        f(this)
    }, e.extend(e.BBox, {
        merge: function (t) {
            var n = new e.BBox;
            return n.x = Math.min(this.x, t.x), n.y = Math.min(this.y, t.y), n.width = Math.max(this.x + this.width, t.x + t.width) - n.x, n.height = Math.max(this.y + this.height, t.y + t.height) - n.y, f(n), n
        }
    }), e.RBox = function (e) {
        var t, n, r = {};
        this.x = 0, this.y = 0, this.width = 0, this.height = 0;
        if (e) {
            t = e.doc().parent, n = e.doc().viewbox().zoom, r = e.node.getBoundingClientRect(), this.x = r.left, this.y = r.top, this.x -= t.offsetLeft, this.y -= t.offsetTop;
            while (t = t.offsetParent)this.x -= t.offsetLeft, this.y -= t.offsetTop;
            t = e;
            while (t = t.parent)t.type == "svg" && t.viewbox && (n *= t.viewbox().zoom, this.x -= t.x() || 0, this.y -= t.y() || 0)
        }
        this.x /= n, this.y /= n, this.width = r.width /= n, this.height = r.height /= n, this.x += typeof window.scrollX == "number" ? window.scrollX : window.pageXOffset, this.y += typeof window.scrollY == "number" ? window.scrollY : window.pageYOffset, f(this)
    }, e.extend(e.RBox, {
        merge: function (t) {
            var n = new e.RBox;
            return n.x = Math.min(this.x, t.x), n.y = Math.min(this.y, t.y), n.width = Math.max(this.x + this.width, t.x + t.width) - n.x, n.height = Math.max(this.y + this.height, t.y + t.height) - n.y, f(n), n
        }
    }), e.Element = e.invent({
        create: function (t) {
            this._stroke = e.defaults.attrs.stroke, this.trans = e.defaults.trans();
            if (this.node = t)this.type = t.nodeName, this.node.instance = this
        }, extend: {
            x: function (t) {
                return t != null && (t = new e.Number(t), t.value /= this.trans.scaleX), this.attr("x", t)
            }, y: function (t) {
                return t != null && (t = new e.Number(t), t.value /= this.trans.scaleY), this.attr("y", t)
            }, cx: function (e) {
                return e == null ? this.x() + this.width() / 2 : this.x(e - this.width() / 2)
            }, cy: function (e) {
                return e == null ? this.y() + this.height() / 2 : this.y(e - this.height() / 2)
            }, move: function (e, t) {
                return this.x(e).y(t)
            }, center: function (e, t) {
                return this.cx(e).cy(t)
            }, width: function (e) {
                return this.attr("width", e)
            }, height: function (e) {
                return this.attr("height", e)
            }, size: function (t, n) {
                var r = o(this.bbox(), t, n);
                return this.width(new e.Number(r.width)).height(new e.Number(r.height))
            }, clone: function () {
                var e, t, n = this.type;
                return e = n == "rect" || n == "ellipse" ? this.parent[n](0, 0) : n == "line" ? this.parent[n](0, 0, 0, 0) : n == "image" ? this.parent[n](this.src) : n == "text" ? this.parent[n](this.content) : n == "path" ? this.parent[n](this.attr("d")) : n == "polyline" || n == "polygon" ? this.parent[n](this.attr("points")) : n == "g" ? this.parent.group() : this.parent[n](), t = this.attr(), delete t.id, e.attr(t), e.trans = this.trans, e.transform({})
            }, remove: function () {
                return this.parent && this.parent.removeElement(this), this
            }, replace: function (e) {
                return this.after(e).remove(), e
            }, addTo: function (e) {
                return e.put(this)
            }, putIn: function (e) {
                return e.add(this)
            }, doc: function (t) {
                return this._parent(t || e.Doc)
            }, attr: function (t, n, r) {
                if (t == null) {
                    t = {}, n = this.node.attributes;
                    for (r = n.length - 1; r >= 0; r--)t[n[r].nodeName] = e.regex.isNumber.test(n[r].nodeValue) ? parseFloat(n[r].nodeValue) : n[r].nodeValue;
                    return t
                }
                if (typeof t == "object")for (n in t)this.attr(n, t[n]); else if (n === null)this.node.removeAttribute(t); else {
                    if (n == null)return n = this.node.attributes[t], n == null ? e.defaults.attrs[t] : e.regex.isNumber.test(n.nodeValue) ? parseFloat(n.nodeValue) : n.nodeValue;
                    if (t == "style")return this.style(n);
                    t == "stroke-width" ? this.attr("stroke", parseFloat(n) > 0 ? this._stroke : null) : t == "stroke" && (this._stroke = n);
                    if (t == "fill" || t == "stroke")e.regex.isImage.test(n) && (n = this.doc().defs().image(n, 0, 0)), n instanceof e.Image && (n = this.doc().defs().pattern(0, 0, function () {
                        this.add(n)
                    }));
                    typeof n == "number" ? n = new e.Number(n) : e.Color.isColor(n) ? n = new e.Color(n) : Array.isArray(n) && (n = new e.Array(n)), t == "leading" ? this.leading && this.leading(n) : typeof r == "string" ? this.node.setAttributeNS(r, t, n.toString()) : this.node.setAttribute(t, n.toString()), this.rebuild && (t == "font-size" || t == "x") && this.rebuild(t, n)
                }
                return this
            }, transform: function (t, n) {
                if (arguments.length == 0)return this.trans;
                if (typeof t == "string") {
                    if (arguments.length < 2)return this.trans[t];
                    var r = {};
                    return r[t] = n, this.transform(r)
                }
                var r = [];
                t = l(t);
                for (n in t)t[n] != null && (this.trans[n] = t[n]);
                return this.trans.matrix = this.trans.a + " " + this.trans.b + " " + this.trans.c + " " + this.trans.d + " " + this.trans.e + " " + this.trans.f, t = this.trans, t.matrix != e.defaults.matrix && r.push("matrix(" + t.matrix + ")"), t.rotation != 0 && r.push("rotate(" + t.rotation + " " + (t.cx == null ? this.bbox().cx : t.cx) + " " + (t.cy == null ? this.bbox().cy : t.cy) + ")"), (t.scaleX != 1 || t.scaleY != 1) && r.push("scale(" + t.scaleX + " " + t.scaleY + ")"), t.skewX != 0 && r.push("skewX(" + t.skewX + ")"), t.skewY != 0 && r.push("skewY(" + t.skewY + ")"), (t.x != 0 || t.y != 0) && r.push("translate(" + new e.Number(t.x / t.scaleX) + " " + new e.Number(t.y / t.scaleY) + ")"), r.length == 0 ? this.node.removeAttribute("transform") : this.node.setAttribute("transform", r.join(" ")), this
            }, style: function (t, n) {
                if (arguments.length == 0)return this.node.style.cssText || "";
                if (arguments.length < 2)if (typeof t == "object")for (n in t)this.style(n, t[n]); else {
                    if (!e.regex.isCss.test(t))return this.node.style[r(t)];
                    t = t.split(";");
                    for (var i = 0; i < t.length; i++)n = t[i].split(":"), this.style(n[0].replace(/\s+/g, ""), n[1])
                } else this.node.style[r(t)] = n === null || e.regex.isBlank.test(n) ? "" : n;
                return this
            }, id: function (e) {
                return this.attr("id", e)
            }, bbox: function () {
                return new e.BBox(this)
            }, rbox: function () {
                return new e.RBox(this)
            }, inside: function (e, t) {
                var n = this.bbox();
                return e > n.x && t > n.y && e < n.x + n.width && t < n.y + n.height
            }, show: function () {
                return this.style("display", "")
            }, hide: function () {
                return this.style("display", "none")
            }, visible: function () {
                return this.style("display") != "none"
            }, toString: function () {
                return this.attr("id")
            }, classes: function () {
                var e = this.node.getAttribute("class");
                return e === null ? [] : e.trim().split(/\s+/)
            }, hasClass: function (e) {
                return this.classes().indexOf(e) != -1
            }, addClass: function (e) {
                var t;
                return this.hasClass(e) || (t = this.classes(), t.push(e), this.node.setAttribute("class", t.join(" "))), this
            }, removeClass: function (e) {
                var t;
                return this.hasClass(e) && (t = this.classes().filter(function (t) {
                    return t != e
                }), this.node.setAttribute("class", t.join(" "))), this
            }, toggleClass: function (e) {
                return this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this
            }, reference: function (t) {
                return e.get(this.attr()[t])
            }, _parent: function (e) {
                var t = this;
                while (t != null && !(t instanceof e))t = t.parent;
                return t
            }
        }
    }), e.Parent = e.invent({
        create: function (e) {
            this.constructor.call(this, e)
        }, inherit: e.Element, extend: {
            children: function () {
                return this._children || (this._children = [])
            }, add: function (e, t) {
                return this.has(e) || (t = t == null ? this.children().length : t, e.parent && e.parent.children().splice(e.parent.index(e), 1), this.children().splice(t, 0, e), this.node.insertBefore(e.node, this.node.childNodes[t] || null), e.parent = this), this._defs && (this.node.removeChild(this._defs.node), this.node.appendChild(this._defs.node)), this
            }, put: function (e, t) {
                return this.add(e, t), e
            }, has: function (e) {
                return this.index(e) >= 0
            }, index: function (e) {
                return this.children().indexOf(e)
            }, get: function (e) {
                return this.children()[e]
            }, first: function () {
                return this.children()[0]
            }, last: function () {
                return this.children()[this.children().length - 1]
            }, each: function (t, n) {
                var r, i, s = this.children();
                for (r = 0, i = s.length; r < i; r++)s[r]instanceof e.Element && t.apply(s[r], [r, s]), n && s[r]instanceof e.Container && s[r].each(t, n);
                return this
            }, removeElement: function (e) {
                return this.children().splice(this.index(e), 1), this.node.removeChild(e.node), e.parent = null, this
            }, clear: function () {
                for (var e = this.children().length - 1; e >= 0; e--)this.removeElement(this.children()[e]);
                return this._defs && this._defs.clear(), this
            }, defs: function () {
                return this.doc().defs()
            }
        }
    }), e.Container = e.invent({
        create: function (e) {
            this.constructor.call(this, e)
        }, inherit: e.Parent, extend: {
            viewbox: function (t) {
                return arguments.length == 0 ? new e.ViewBox(this) : (t = arguments.length == 1 ? [t.x, t.y, t.width, t.height] : [].slice.call(arguments), this.attr("viewBox", t))
            }
        }
    }), e.FX = e.invent({
        create: function (e) {
            this.target = e
        }, extend: {
            animate: function (t, n, r) {
                var i, s, o, a, f = this.target, l = this;
                return typeof t == "object" && (r = t.delay, n = t.ease, t = t.duration), t = t == "=" ? t : t == null ? 1e3 : (new e.Number(t)).valueOf(), n = n || "<>", l.to = function (e) {
                    var t;
                    e = e < 0 ? 0 : e > 1 ? 1 : e;
                    if (i == null) {
                        i = [];
                        for (a in l.attrs)i.push(a);
                        if (f.morphArray && (l._plot || i.indexOf("points") > -1)) {
                            var r, c = new f.morphArray(l._plot || l.attrs.points || f.array);
                            l._size && c.size(l._size.width.to, l._size.height.to), r = c.bbox(), l._x ? c.move(l._x.to, r.y) : l._cx && c.move(l._cx.to - r.width / 2, r.y), r = c.bbox(), l._y ? c.move(r.x, l._y.to) : l._cy && c.move(r.x, l._cy.to - r.height / 2), delete l._x, delete l._y, delete l._cx, delete l._cy, delete l._size, l._plot = f.array.morph(c)
                        }
                    }
                    if (s == null) {
                        s = [];
                        for (a in l.trans)s.push(a)
                    }
                    if (o == null) {
                        o = [];
                        for (a in l.styles)o.push(a)
                    }
                    e = n == "<>" ? -Math.cos(e * Math.PI) / 2 + .5 : n == ">" ? Math.sin(e * Math.PI / 2) : n == "<" ? -Math.cos(e * Math.PI / 2) + 1 : n == "-" ? e : typeof n == "function" ? n(e) : e, l._plot ? f.plot(l._plot.at(e)) : (l._x ? f.x(l._x.at(e)) : l._cx && f.cx(l._cx.at(e)), l._y ? f.y(l._y.at(e)) : l._cy && f.cy(l._cy.at(e)), l._size && f.size(l._size.width.at(e), l._size.height.at(e))), l._viewbox && f.viewbox(l._viewbox.x.at(e), l._viewbox.y.at(e), l._viewbox.width.at(e), l._viewbox.height.at(e)), l._leading && f.leading(l._leading.at(e));
                    for (t = i.length - 1; t >= 0; t--)f.attr(i[t], u(l.attrs[i[t]], e));
                    for (t = s.length - 1; t >= 0; t--)f.transform(s[t], u(l.trans[s[t]], e));
                    for (t = o.length - 1; t >= 0; t--)f.style(o[t], u(l.styles[o[t]], e));
                    l._during && l._during.call(f, e, function (t, n) {
                        return u({from: t, to: n}, e)
                    })
                }, typeof t == "number" && (this.timeout = setTimeout(function () {
                    var i = (new Date).getTime();
                    l.situation = {
                        interval: 1e3 / 60,
                        start: i,
                        play: !0,
                        finish: i + t,
                        duration: t
                    }, l.render = function () {
                        if (l.situation.play === !0) {
                            var i = (new Date).getTime(), s = i > l.situation.finish ? 1 : (i - l.situation.start) / t;
                            l.to(s), i > l.situation.finish ? (l._plot && f.plot((new e.PointArray(l._plot.destination)).settle()), l._loop === !0 || typeof l._loop == "number" && l._loop > 1 ? (typeof l._loop == "number" && --l._loop, l.animate(t, n, r)) : l._after ? l._after.apply(f, [l]) : l.stop()) : requestAnimFrame(l.render)
                        } else requestAnimFrame(l.render)
                    }, l.render()
                }, (new e.Number(r)).valueOf())), this
            }, bbox: function () {
                return this.target.bbox()
            }, attr: function (t, n) {
                if (typeof t == "object")for (var r in t)this.attr(r, t[r]); else {
                    var i = this.target.attr(t);
                    this.attrs[t] = e.Color.isColor(i) ? (new e.Color(i)).morph(n) : e.regex.unit.test(i) ? (new e.Number(i)).morph(n) : {
                        from: i,
                        to: n
                    }
                }
                return this
            }, transform: function (e, t) {
                if (arguments.length == 1) {
                    e = l(e), delete e.matrix;
                    for (t in e)this.trans[t] = {from: this.target.trans[t], to: e[t]}
                } else {
                    var n = {};
                    n[e] = t, this.transform(n)
                }
                return this
            }, style: function (e, t) {
                if (typeof e == "object")for (var n in e)this.style(n, e[n]); else this.styles[e] = {
                    from: this.target.style(e),
                    to: t
                };
                return this
            }, x: function (t) {
                return this._x = (new e.Number(this.target.x())).morph(t), this
            }, y: function (t) {
                return this._y = (new e.Number(this.target.y())).morph(t), this
            }, cx: function (t) {
                return this._cx = (new e.Number(this.target.cx())).morph(t), this
            }, cy: function (t) {
                return this._cy = (new e.Number(this.target.cy())).morph(t), this
            }, move: function (e, t) {
                return this.x(e).y(t)
            }, center: function (e, t) {
                return this.cx(e).cy(t)
            }, size: function (t, n) {
                if (this.target instanceof e.Text)this.attr("font-size", t); else {
                    var r = this.target.bbox();
                    this._size = {width: (new e.Number(r.width)).morph(t), height: (new e.Number(r.height)).morph(n)}
                }
                return this
            }, plot: function (e) {
                return this._plot = e, this
            }, leading: function (t) {
                return this.target._leading && (this._leading = (new e.Number(this.target._leading)).morph(t)), this
            }, viewbox: function (t, n, r, i) {
                if (this.target instanceof e.Container) {
                    var s = this.target.viewbox();
                    this._viewbox = {
                        x: (new e.Number(s.x)).morph(t),
                        y: (new e.Number(s.y)).morph(n),
                        width: (new e.Number(s.width)).morph(r),
                        height: (new e.Number(s.height)).morph(i)
                    }
                }
                return this
            }, update: function (t) {
                return this.target instanceof e.Stop && (t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new e.Number(t.offset))), this
            }, during: function (e) {
                return this._during = e, this
            }, after: function (e) {
                return this._after = e, this
            }, loop: function (e) {
                return this._loop = e || !0, this
            }, stop: function (e) {
                return e === !0 ? (this.animate(0), this._after && this._after.apply(this.target, [this])) : (clearTimeout(this.timeout), this.attrs = {}, this.trans = {}, this.styles = {}, this.situation = {}, delete this._x, delete this._y, delete this._cx, delete this._cy, delete this._size, delete this._plot, delete this._loop, delete this._after, delete this._during, delete this._leading, delete this._viewbox), this
            }, pause: function () {
                return this.situation.play === !0 && (this.situation.play = !1, this.situation.pause = (new Date).getTime()), this
            }, play: function () {
                if (this.situation.play === !1) {
                    var e = (new Date).getTime() - this.situation.pause;
                    this.situation.finish += e, this.situation.start += e, this.situation.play = !0
                }
                return this
            }
        }, parent: e.Element, construct: {
            animate: function (t, n, r) {
                return (this.fx || (this.fx = new e.FX(this))).stop().animate(t, n, r)
            }, stop: function (e) {
                return this.fx && this.fx.stop(e), this
            }, pause: function () {
                return this.fx && this.fx.pause(), this
            }, play: function () {
                return this.fx && this.fx.play(), this
            }
        }
    }), e.extend(e.Element, e.FX, {
        dx: function (e) {
            return this.x((this.target || this).x() + e)
        }, dy: function (e) {
            return this.y((this.target || this).y() + e)
        }, dmove: function (e, t) {
            return this.dx(e).dy(t)
        }
    }), ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].forEach(function (t) {
        e.Element.prototype[t] = function (e) {
            var n = this;
            return this.node["on" + t] = typeof e == "function" ? function () {
                return e.apply(n, arguments)
            } : null, this
        }
    }), e.events = {}, e.listeners = {}, e.registerEvent = function (n) {
        e.events[n] || (e.events[n] = new t(n))
    }, e.on = function (t, n, r) {
        var i = r.bind(t.instance || t);
        e.listeners[t] = e.listeners[t] || {}, e.listeners[t][n] = e.listeners[t][n] || {}, e.listeners[t][n][r] = i, t.addEventListener(n, i, !1)
    }, e.off = function (t, n, r) {
        if (r)e.listeners[t] && e.listeners[t][n] && (t.removeEventListener(n, e.listeners[t][n][r], !1), delete e.listeners[t][n][r]); else if (n) {
            if (e.listeners[t][n]) {
                for (r in e.listeners[t][n])e.off(t, n, r);
                delete e.listeners[t][n]
            }
        } else if (e.listeners[t]) {
            for (n in e.listeners[t])e.off(t, n);
            delete e.listeners[t]
        }
    }, e.extend(e.Element, {
        on: function (t, n) {
            return e.on(this.node, t, n), this
        }, off: function (t, n) {
            return e.off(this.node, t, n), this
        }, fire: function (t, n) {
            return e.events[t].detail = n, this.node.dispatchEvent(e.events[t]), delete e.events[t].detail, this
        }
    }), e.Defs = e.invent({create: "defs", inherit: e.Container}), e.G = e.invent({
        create: "g",
        inherit: e.Container,
        extend: {
            x: function (e) {
                return e == null ? this.trans.x : this.transform("x", e)
            }, y: function (e) {
                return e == null ? this.trans.y : this.transform("y", e)
            }, cx: function (e) {
                return e == null ? this.bbox().cx : this.x(e - this.bbox().width / 2)
            }, cy: function (e) {
                return e == null ? this.bbox().cy : this.y(e - this.bbox().height / 2)
            }
        },
        construct: {
            group: function () {
                return this.put(new e.G)
            }
        }
    }), e.extend(e.Element, {
        siblings: function () {
            return this.parent.children()
        }, position: function () {
            return this.parent.index(this)
        }, next: function () {
            return this.siblings()[this.position() + 1]
        }, previous: function () {
            return this.siblings()[this.position() - 1]
        }, forward: function () {
            var e = this.position();
            return this.parent.removeElement(this).put(this, e + 1)
        }, backward: function () {
            var e = this.position();
            return e > 0 && this.parent.removeElement(this).add(this, e - 1), this
        }, front: function () {
            return this.parent.removeElement(this).put(this)
        }, back: function () {
            return this.position() > 0 && this.parent.removeElement(this).add(this, 0), this
        }, before: function (e) {
            e.remove();
            var t = this.position();
            return this.parent.add(e, t), this
        }, after: function (e) {
            e.remove();
            var t = this.position();
            return this.parent.add(e, t + 1), this
        }
    }), e.Mask = e.invent({
        create: function () {
            this.constructor.call(this, e.create("mask")), this.targets = []
        }, inherit: e.Container, extend: {
            remove: function () {
                for (var e = this.targets.length - 1; e >= 0; e--)this.targets[e] && this.targets[e].unmask();
                return delete this.targets, this.parent.removeElement(this), this
            }
        }, construct: {
            mask: function () {
                return this.defs().put(new e.Mask)
            }
        }
    }), e.extend(e.Element, {
        maskWith: function (t) {
            return this.masker = t instanceof e.Mask ? t : this.parent.mask().add(t), this.masker.targets.push(this), this.attr("mask", 'url("#' + this.masker.attr("id") + '")')
        }, unmask: function () {
            return delete this.masker, this.attr("mask", null)
        }
    }), e.Clip = e.invent({
        create: function () {
            this.constructor.call(this, e.create("clipPath")), this.targets = []
        }, inherit: e.Container, extend: {
            remove: function () {
                for (var e = this.targets.length - 1; e >= 0; e--)this.targets[e] && this.targets[e].unclip();
                return delete this.targets, this.parent.removeElement(this), this
            }
        }, construct: {
            clip: function () {
                return this.defs().put(new e.Clip)
            }
        }
    }), e.extend(e.Element, {
        clipWith: function (t) {
            return this.clipper = t instanceof e.Clip ? t : this.parent.clip().add(t), this.clipper.targets.push(this), this.attr("clip-path", 'url("#' + this.clipper.attr("id") + '")')
        }, unclip: function () {
            return delete this.clipper, this.attr("clip-path", null)
        }
    }), e.Gradient = e.invent({
        create: function (t) {
            this.constructor.call(this, e.create(t + "Gradient")), this.type = t
        }, inherit: e.Container, extend: {
            from: function (t, n) {
                return this.type == "radial" ? this.attr({
                    fx: new e.Number(t),
                    fy: new e.Number(n)
                }) : this.attr({x1: new e.Number(t), y1: new e.Number(n)})
            }, to: function (t, n) {
                return this.type == "radial" ? this.attr({
                    cx: new e.Number(t),
                    cy: new e.Number(n)
                }) : this.attr({x2: new e.Number(t), y2: new e.Number(n)})
            }, radius: function (t) {
                return this.type == "radial" ? this.attr({r: new e.Number(t)}) : this
            }, at: function (t, n, r) {
                return this.put(new e.Stop).update(t, n, r)
            }, update: function (e) {
                return this.clear(), typeof e == "function" && e.call(this, this), this
            }, fill: function () {
                return "url(#" + this.id() + ")"
            }, toString: function () {
                return this.fill()
            }
        }, construct: {
            gradient: function (e, t) {
                return this.defs().gradient(e, t)
            }
        }
    }), e.extend(e.Defs, {
        gradient: function (t, n) {
            return this.put(new e.Gradient(t)).update(n)
        }
    }), e.Stop = e.invent({
        create: "stop", inherit: e.Element, extend: {
            update: function (t) {
                if (typeof t == "number" || t instanceof e.Number)t = {
                    offset: arguments[0],
                    color: arguments[1],
                    opacity: arguments[2]
                };
                return t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new e.Number(t.offset)), this
            }
        }
    }), e.Pattern = e.invent({
        create: "pattern", inherit: e.Container, extend: {
            fill: function () {
                return "url(#" + this.id() + ")"
            }, update: function (e) {
                return this.clear(), typeof e == "function" && e.call(this, this), this
            }, toString: function () {
                return this.fill()
            }
        }, construct: {
            pattern: function (e, t, n) {
                return this.defs().pattern(e, t, n)
            }
        }
    }), e.extend(e.Defs, {
        pattern: function (t, n, r) {
            return this.put(new e.Pattern).update(r).attr({
                x: 0,
                y: 0,
                width: t,
                height: n,
                patternUnits: "userSpaceOnUse"
            })
        }
    }), e.Doc = e.invent({
        create: function (t) {
            this.parent = typeof t == "string" ? window.document.getElementById(t) : t, this.constructor.call(this, this.parent.nodeName == "svg" ? this.parent : e.create("svg")), this.attr({
                xmlns: e.ns,
                version: "1.1",
                width: "100%",
                height: "100%"
            }).attr("xmlns:xlink", e.xlink, e.xmlns), this._defs = new e.Defs, this._defs.parent = this, this.node.appendChild(this._defs.node), this.doSpof = !1, this.parent != this.node && this.stage()
        }, inherit: e.Container, extend: {
            stage: function () {
                var t = this;
                return this.parent.appendChild(this.node), t.spof(), e.on(window, "resize", function () {
                    t.spof()
                }), this
            }, defs: function () {
                return this._defs
            }, spof: function () {
                if (this.doSpof) {
                    var e = this.node.getScreenCTM();
                    e && this.style("left", -e.e % 1 + "px").style("top", -e.f % 1 + "px")
                }
                return this
            }, fixSubPixelOffset: function () {
                return this.doSpof = !0, this
            }
        }
    }), e.Shape = e.invent({
        create: function (e) {
            this.constructor.call(this, e)
        }, inherit: e.Element
    }), e.Symbol = e.invent({
        create: "symbol", inherit: e.Container, construct: {
            symbol: function () {
                return this.defs().put(new e.Symbol)
            }
        }
    }), e.Use = e.invent({
        create: "use", inherit: e.Shape, extend: {
            element: function (t) {
                return this.target = t, this.attr("href", "#" + t, e.xlink)
            }
        }, construct: {
            use: function (t) {
                return this.put(new e.Use).element(t)
            }
        }
    }), e.Rect = e.invent({
        create: "rect", inherit: e.Shape, construct: {
            rect: function (t, n) {
                return this.put((new e.Rect).size(t, n))
            }
        }
    }), e.Ellipse = e.invent({
        create: "ellipse", inherit: e.Shape, extend: {
            x: function (e) {
                return e == null ? this.cx() - this.attr("rx") : this.cx(e + this.attr("rx"))
            }, y: function (e) {
                return e ==
                null ? this.cy() - this.attr("ry") : this.cy(e + this.attr("ry"))
            }, cx: function (t) {
                return t == null ? this.attr("cx") : this.attr("cx", (new e.Number(t)).divide(this.trans.scaleX))
            }, cy: function (t) {
                return t == null ? this.attr("cy") : this.attr("cy", (new e.Number(t)).divide(this.trans.scaleY))
            }, width: function (t) {
                return t == null ? this.attr("rx") * 2 : this.attr("rx", (new e.Number(t)).divide(2))
            }, height: function (t) {
                return t == null ? this.attr("ry") * 2 : this.attr("ry", (new e.Number(t)).divide(2))
            }, size: function (t, n) {
                var r = o(this.bbox(), t, n);
                return this.attr({rx: (new e.Number(r.width)).divide(2), ry: (new e.Number(r.height)).divide(2)})
            }
        }, construct: {
            circle: function (e) {
                return this.ellipse(e, e)
            }, ellipse: function (t, n) {
                return this.put(new e.Ellipse).size(t, n).move(0, 0)
            }
        }
    }), e.Line = e.invent({
        create: "line", inherit: e.Shape, extend: {
            x: function (e) {
                var t = this.bbox();
                return e == null ? t.x : this.attr({x1: this.attr("x1") - t.x + e, x2: this.attr("x2") - t.x + e})
            }, y: function (e) {
                var t = this.bbox();
                return e == null ? t.y : this.attr({y1: this.attr("y1") - t.y + e, y2: this.attr("y2") - t.y + e})
            }, cx: function (e) {
                var t = this.bbox().width / 2;
                return e == null ? this.x() + t : this.x(e - t)
            }, cy: function (e) {
                var t = this.bbox().height / 2;
                return e == null ? this.y() + t : this.y(e - t)
            }, width: function (e) {
                var t = this.bbox();
                return e == null ? t.width : this.attr(this.attr("x1") < this.attr("x2") ? "x2" : "x1", t.x + e)
            }, height: function (e) {
                var t = this.bbox();
                return e == null ? t.height : this.attr(this.attr("y1") < this.attr("y2") ? "y2" : "y1", t.y + e)
            }, size: function (e, t) {
                var n = o(this.bbox(), e, t);
                return this.width(n.width).height(n.height)
            }, plot: function (e, t, n, r) {
                return this.attr({x1: e, y1: t, x2: n, y2: r})
            }
        }, construct: {
            line: function (t, n, r, i) {
                return this.put((new e.Line).plot(t, n, r, i))
            }
        }
    }), e.Polyline = e.invent({
        create: "polyline", inherit: e.Shape, construct: {
            polyline: function (t) {
                return this.put(new e.Polyline).plot(t)
            }
        }
    }), e.Polygon = e.invent({
        create: "polygon", inherit: e.Shape, construct: {
            polygon: function (t) {
                return this.put(new e.Polygon).plot(t)
            }
        }
    }), e.extend(e.Polyline, e.Polygon, {
        morphArray: e.PointArray, plot: function (t) {
            return this.attr("points", this.array = new e.PointArray(t, [[0, 0]]))
        }, move: function (e, t) {
            return this.attr("points", this.array.move(e, t))
        }, x: function (e) {
            return e == null ? this.bbox().x : this.move(e, this.bbox().y)
        }, y: function (e) {
            return e == null ? this.bbox().y : this.move(this.bbox().x, e)
        }, width: function (e) {
            var t = this.bbox();
            return e == null ? t.width : this.size(e, t.height)
        }, height: function (e) {
            var t = this.bbox();
            return e == null ? t.height : this.size(t.width, e)
        }, size: function (e, t) {
            var n = o(this.bbox(), e, t);
            return this.attr("points", this.array.size(n.width, n.height))
        }
    }), e.Path = e.invent({
        create: "path", inherit: e.Shape, extend: {
            plot: function (t) {
                return this.attr("d", this.array = new e.PathArray(t, [["M", 0, 0]]))
            }, move: function (e, t) {
                return this.attr("d", this.array.move(e, t))
            }, x: function (e) {
                return e == null ? this.bbox().x : this.move(e, this.bbox().y)
            }, y: function (e) {
                return e == null ? this.bbox().y : this.move(this.bbox().x, e)
            }, size: function (e, t) {
                var n = o(this.bbox(), e, t);
                return this.attr("d", this.array.size(n.width, n.height))
            }, width: function (e) {
                return e == null ? this.bbox().width : this.size(e, this.bbox().height)
            }, height: function (e) {
                return e == null ? this.bbox().height : this.size(this.bbox().width, e)
            }
        }, construct: {
            path: function (t) {
                return this.put(new e.Path).plot(t)
            }
        }
    }), e.Image = e.invent({
        create: "image", inherit: e.Shape, extend: {
            load: function (t) {
                if (!t)return this;
                var n = this, r = window.document.createElement("img");
                return r.onload = function () {
                    var i = n.doc(e.Pattern);
                    n.width() == 0 && n.height() == 0 && n.size(r.width, r.height), i && i.width() == 0 && i.height() == 0 && i.size(n.width(), n.height()), typeof n._loaded == "function" && n._loaded.call(n, {
                        width: r.width,
                        height: r.height,
                        ratio: r.width / r.height,
                        url: t
                    })
                }, this.attr("href", r.src = this.src = t, e.xlink)
            }, loaded: function (e) {
                return this._loaded = e, this
            }
        }, construct: {
            image: function (t, n, r) {
                return this.put(new e.Image).load(t).size(n || 0, r || n || 0)
            }
        }
    }), e.Text = e.invent({
        create: function () {
            this.constructor.call(this, e.create("text")), this._leading = new e.Number(1.3), this._rebuild = !0, this._build = !1, this.attr("font-family", e.defaults.attrs["font-family"])
        }, inherit: e.Shape, extend: {
            x: function (e) {
                return e == null ? this.attr("x") : (this.textPath || this.lines.each(function () {
                    this.newLined && this.x(e)
                }), this.attr("x", e))
            }, y: function (e) {
                var t = this.attr("y"), n = typeof t == "number" ? t - this.bbox().y : 0;
                return e == null ? typeof t == "number" ? t - n : t : this.attr("y", typeof e == "number" ? e + n : e)
            }, cx: function (e) {
                return e == null ? this.bbox().cx : this.x(e - this.bbox().width / 2)
            }, cy: function (e) {
                return e == null ? this.bbox().cy : this.y(e - this.bbox().height / 2)
            }, text: function (e) {
                if (typeof e == "undefined")return this.content;
                this.clear().build(!0);
                if (typeof e == "function")e.call(this, this); else {
                    e = (this.content = e).split("\n");
                    for (var t = 0, n = e.length; t < n; t++)this.tspan(e[t]).newLine()
                }
                return this.build(!1).rebuild()
            }, size: function (e) {
                return this.attr("font-size", e).rebuild()
            }, leading: function (t) {
                return t == null ? this._leading : (this._leading = new e.Number(t), this.rebuild())
            }, rebuild: function (t) {
                typeof t == "boolean" && (this._rebuild = t);
                if (this._rebuild) {
                    var n = this;
                    this.lines.each(function () {
                        this.newLined && (this.textPath || this.attr("x", n.attr("x")), this.attr("dy", n._leading * new e.Number(n.attr("font-size"))))
                    }), this.fire("rebuild")
                }
                return this
            }, build: function (e) {
                return this._build = !!e, this
            }
        }, construct: {
            text: function (t) {
                return this.put(new e.Text).text(t)
            }, plain: function (t) {
                return this.put(new e.Text).plain(t)
            }
        }
    }), e.TSpan = e.invent({
        create: "tspan", inherit: e.Shape, extend: {
            text: function (e) {
                return typeof e == "function" ? e.call(this, this) : this.plain(e), this
            }, dx: function (e) {
                return this.attr("dx", e)
            }, dy: function (e) {
                return this.attr("dy", e)
            }, newLine: function () {
                var t = this.doc(e.Text);
                return this.newLined = !0, this.dy(t._leading * t.attr("font-size")).attr("x", t.x())
            }
        }
    }), e.extend(e.Text, e.TSpan, {
        plain: function (e) {
            return this._build === !1 && this.clear(), this.node.appendChild(window.document.createTextNode(this.content = e)), this
        }, tspan: function (t) {
            var n = (this.textPath || this).node, r = new e.TSpan;
            return this._build === !1 && this.clear(), n.appendChild(r.node), r.parent = this, this instanceof e.Text && this.lines.add(r), r.text(t)
        }, clear: function () {
            var t = (this.textPath || this).node;
            while (t.hasChildNodes())t.removeChild(t.lastChild);
            return this instanceof e.Text && (delete this.lines, this.lines = new e.Set, this.content = ""), this
        }, length: function () {
            return this.node.getComputedTextLength()
        }
    }), e.registerEvent("rebuild"), e.TextPath = e.invent({
        create: "textPath",
        inherit: e.Element,
        parent: e.Text,
        construct: {
            path: function (t) {
                this.textPath = new e.TextPath;
                while (this.node.hasChildNodes())this.textPath.node.appendChild(this.node.firstChild);
                return this.node.appendChild(this.textPath.node), this.track = this.doc().defs().path(t), this.textPath.parent = this, this.textPath.attr("href", "#" + this.track, e.xlink), this
            }, plot: function (e) {
                return this.track && this.track.plot(e), this
            }
        }
    }), e.Nested = e.invent({
        create: function () {
            this.constructor.call(this, e.create("svg")), this.style("overflow", "visible")
        }, inherit: e.Container, construct: {
            nested: function () {
                return this.put(new e.Nested)
            }
        }
    }), e.A = e.invent({
        create: "a", inherit: e.Container, extend: {
            to: function (t) {
                return this.attr("href", t, e.xlink)
            }, show: function (t) {
                return this.attr("show", t, e.xlink)
            }, target: function (e) {
                return this.attr("target", e)
            }
        }, construct: {
            link: function (t) {
                return this.put(new e.A).to(t)
            }
        }
    }), e.extend(e.Element, {
        linkTo: function (t) {
            var n = new e.A;
            return typeof t == "function" ? t.call(n, n) : n.to(t), this.parent.put(n).put(this)
        }
    }), e.Marker = e.invent({
        create: "marker", inherit: e.Container, extend: {
            width: function (e) {
                return this.attr("markerWidth", e)
            }, height: function (e) {
                return this.attr("markerHeight", e)
            }, ref: function (e, t) {
                return this.attr("refX", e).attr("refY", t)
            }, update: function (e) {
                return this.clear(), typeof e == "function" && e.call(this, this), this
            }, toString: function () {
                return "url(#" + this.id() + ")"
            }
        }, construct: {
            marker: function (e, t, n) {
                return this.defs().marker(e, t, n)
            }
        }
    }), e.extend(e.Defs, {
        marker: function (t, n, r) {
            return this.put(new e.Marker).size(t, n).ref(t / 2, n / 2).viewbox(0, 0, t, n).attr("orient", "auto").update(r)
        }
    }), e.extend(e.Line, e.Polyline, e.Polygon, e.Path, {
        marker: function (t, n, r, i) {
            var s = ["marker"];
            return t != "all" && s.push(t), s = s.join("-"), t = arguments[1]instanceof e.Marker ? arguments[1] : this.doc().marker(n, r, i), this.attr(s, t)
        }
    });
    var n = {
        stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
        fill: ["color", "opacity", "rule"],
        prefix: function (e, t) {
            return t == "color" ? e : e + "-" + t
        }
    };
    return ["fill", "stroke"].forEach(function (t) {
        var r, i = {};
        i[t] = function (i) {
            if (typeof i == "string" || e.Color.isRgb(i) || i && typeof i.fill == "function")this.attr(t, i); else for (r = n[t].length - 1; r >= 0; r--)i[n[t][r]] != null && this.attr(n.prefix(t, n[t][r]), i[n[t][r]]);
            return this
        }, e.extend(e.Element, e.FX, i)
    }), e.extend(e.Element, e.FX, {
        rotate: function (e, t, n) {
            return this.transform({rotation: e || 0, cx: t, cy: n})
        }, skew: function (e, t) {
            return this.transform({skewX: e || 0, skewY: t || 0})
        }, scale: function (e, t) {
            return this.transform({scaleX: e, scaleY: t == null ? e : t})
        }, translate: function (e, t) {
            return this.transform({x: e, y: t})
        }, matrix: function (e) {
            return this.transform({matrix: e})
        }, opacity: function (e) {
            return this.attr("opacity", e)
        }
    }), e.extend(e.Rect, e.Ellipse, e.FX, {
        radius: function (e, t) {
            return this.attr({rx: e, ry: t || e})
        }
    }), e.extend(e.Path, {
        length: function () {
            return this.node.getTotalLength()
        }, pointAt: function (e) {
            return this.node.getPointAtLength(e)
        }
    }), e.extend(e.Parent, e.Text, e.FX, {
        font: function (e) {
            for (var t in e)t == "leading" ? this.leading(e[t]) : t == "anchor" ? this.attr("text-anchor", e[t]) : t == "size" || t == "family" || t == "weight" || t == "stretch" || t == "variant" || t == "style" ? this.attr("font-" + t, e[t]) : this.attr(t, e[t]);
            return this
        }
    }), e.Set = e.invent({
        create: function () {
            this.clear()
        }, extend: {
            add: function () {
                var e, t, n = [].slice.call(arguments);
                for (e = 0, t = n.length; e < t; e++)this.members.push(n[e]);
                return this
            }, remove: function (e) {
                var t = this.index(e);
                return t > -1 && this.members.splice(t, 1), this
            }, each: function (e) {
                for (var t = 0, n = this.members.length; t < n; t++)e.apply(this.members[t], [t, this.members]);
                return this
            }, clear: function () {
                return this.members = [], this
            }, has: function (e) {
                return this.index(e) >= 0
            }, index: function (e) {
                return this.members.indexOf(e)
            }, get: function (e) {
                return this.members[e]
            }, first: function () {
                return this.get(0)
            }, last: function () {
                return this.get(this.members.length - 1)
            }, valueOf: function () {
                return this.members
            }, bbox: function () {
                var t = new e.BBox;
                if (this.members.length == 0)return t;
                var n = this.members[0].rbox();
                return t.x = n.x, t.y = n.y, t.width = n.width, t.height = n.height, this.each(function () {
                    t = t.merge(this.rbox())
                }), t
            }
        }, construct: {
            set: function () {
                return new e.Set
            }
        }
    }), e.SetFX = e.invent({
        create: function (e) {
            this.set = e
        }
    }), e.Set.inherit = function () {
        var t, n = [];
        for (var t in e.Shape.prototype)typeof e.Shape.prototype[t] == "function" && typeof e.Set.prototype[t] != "function" && n.push(t);
        n.forEach(function (t) {
            e.Set.prototype[t] = function () {
                for (var n = 0, r = this.members.length; n < r; n++)this.members[n] && typeof this.members[n][t] == "function" && this.members[n][t].apply(this.members[n], arguments);
                return t == "animate" ? this.fx || (this.fx = new e.SetFX(this)) : this
            }
        }), n = [];
        for (var t in e.FX.prototype)typeof e.FX.prototype[t] == "function" && typeof e.SetFX.prototype[t] != "function" && n.push(t);
        n.forEach(function (t) {
            e.SetFX.prototype[t] = function () {
                for (var e = 0, n = this.set.members.length; e < n; e++)this.set.members[e].fx[t].apply(this.set.members[e].fx, arguments);
                return this
            }
        })
    }, e.extend(e.Element, {
        data: function (e, t, n) {
            if (typeof e == "object")for (t in e)this.data(t, e[t]); else if (arguments.length < 2)try {
                return JSON.parse(this.attr("data-" + e))
            } catch (r) {
                return this.attr("data-" + e)
            } else this.attr("data-" + e, t === null ? null : n === !0 || typeof t == "string" || typeof t == "number" ? t : JSON.stringify(t));
            return this
        }
    }), e.extend(e.Element, {
        remember: function (e, t) {
            if (typeof arguments[0] == "object")for (var t in e)this.remember(t, e[t]); else {
                if (arguments.length == 1)return this.memory()[e];
                this.memory()[e] = t
            }
            return this
        }, forget: function () {
            if (arguments.length == 0)this._memory = {}; else for (var e = arguments.length - 1; e >= 0; e--)delete this.memory()[arguments[e]];
            return this
        }, memory: function () {
            return this._memory || (this._memory = {})
        }
    }), typeof define == "function" && define.amd ? define(function () {
        return e
    }) : typeof exports != "undefined" && (exports.SVG = e), window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
                window.setTimeout(e, 1e3 / 60)
            }
    }(), e
});