	function q(b) {
		throw b;
	}
	var t = void 0, u = !0;
	var A = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;

	function E(b, a) {
		this.index = "number" === typeof a ? a : 0;
		this.m = 0;
		this.buffer = b instanceof(A ? Uint8Array : Array) ? b : new (A ? Uint8Array : Array)(32768);
		2 * this.buffer.length <= this.index && q(Error("invalid index"));
		this.buffer.length <= this.index && this.f()
	}

	E.prototype.f = function () {
		var b = this.buffer, a, c = b.length, d:any = new (A ? Uint8Array : Array)(c << 1);
		if (A)d.set(b); else for (a = 0; a < c; ++a)d[a] = b[a];
		return this.buffer = d
	};
	E.prototype.d = function (b, a, c) {
		var d = this.buffer, f = this.index, e = this.m, g = d[f], k;
		c && 1 < a && (b = 8 < a ? (G[b & 255] << 24 | G[b >>> 8 & 255] << 16 | G[b >>> 16 & 255] << 8 | G[b >>> 24 & 255]) >> 32 - a : G[b] >> 8 - a);
		if (8 > a + e)g = g << a | b, e += a; else for (k = 0; k < a; ++k)g = g << 1 | b >> a - k - 1 & 1, 8 === ++e && (e = 0, d[f++] = G[g], g = 0, f === d.length && (d = this.f()));
		d[f] = g;
		this.buffer = d;
		this.m = e;
		this.index = f
	};
	E.prototype.finish = function () {
		var b = this.buffer, a = this.index, c;
		0 < this.m && (b[a] <<= 8 - this.m, b[a] = G[b[a]], a++);
		A ? c = b.subarray(0, a) : (b.length = a, c = b);
		return c
	};
	var aa = new (A ? Uint8Array : Array)(256), J;
	for (J = 0; 256 > J; ++J) {
		for (var N:number = J, Q = N, ba = 7, N = N >>> 1; N; N >>>= 1)Q <<= 1, Q |= N & 1, --ba;
		aa[J] = (Q << ba & 255) >>> 0
	}
	var G = aa;

	function R(b, a, c) {
		var d, f = "number" === typeof a ? a : a = 0, e = "number" === typeof c ? c : b.length;
		d = -1;
		for (f = e & 7; f--; ++a)d = d >>> 8 ^ S[(d ^ b[a]) & 255];
		for (f = e >> 3; f--; a += 8)d = d >>> 8 ^ S[(d ^ b[a]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 1]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 2]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 3]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 4]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 5]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 6]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 7]) & 255];
		return(d ^ 4294967295) >>> 0
	}

	var ga = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759,
		2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977,
		2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755,
		2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956,
		3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
		936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117], S = A ? new Uint32Array(ga) : ga;

	function ha() {
	};
	function ia(b) {
		this.buffer = new (A ? Uint16Array : Array)(2 * b);
		this.length = 0
	}

	ia.prototype.getParent = function (b) {
		return 2 * ((b - 2) / 4 | 0)
	};
	ia.prototype.push = function (b, a) {
		var c, d, f = this.buffer, e;
		c = this.length;
		f[this.length++] = a;
		for (f[this.length++] = b; 0 < c;)if (d = this.getParent(c), f[c] > f[d])e = f[c], f[c] = f[d], f[d] = e, e = f[c + 1], f[c + 1] = f[d + 1], f[d + 1] = e, c = d; else break;
		return this.length
	};
	ia.prototype.pop = function () {
		var b, a, c = this.buffer, d, f, e;
		a = c[0];
		b = c[1];
		this.length -= 2;
		c[0] = c[this.length];
		c[1] = c[this.length + 1];
		for (e = 0; ;) {
			f = 2 * e + 2;
			if (f >= this.length)break;
			f + 2 < this.length && c[f + 2] > c[f] && (f += 2);
			if (c[f] > c[e])d = c[e], c[e] = c[f], c[f] = d, d = c[e + 1], c[e + 1] = c[f + 1], c[f + 1] = d; else break;
			e = f
		}
		return{index: b, value: a, length: this.length}
	};
	function ja(b) {
		var a = b.length, c = 0, d = Number.POSITIVE_INFINITY, f, e, g, k, h, l, s, n, m;
		for (n = 0; n < a; ++n)b[n] > c && (c = b[n]), b[n] < d && (d = b[n]);
		f = 1 << c;
		e = new (A ? Uint32Array : Array)(f);
		g = 1;
		k = 0;
		for (h = 2; g <= c;) {
			for (n = 0; n < a; ++n)if (b[n] === g) {
				l = 0;
				s = k;
				for (m = 0; m < g; ++m)l = l << 1 | s & 1, s >>= 1;
				for (m = l; m < f; m += h)e[m] = g << 16 | n;
				++k
			}
			++g;
			k <<= 1;
			h <<= 1
		}
		return[e, c, d]
	};
	function ma(b, a) {
		this.k = na;
		this.F = 0;
		this.input = A && b instanceof Array ? new Uint8Array(b) : b;
		this.b = 0;
		a && (a.lazy && (this.F = a.lazy), "number" === typeof a.compressionType && (this.k = a.compressionType), a.outputBuffer && (this.a = A && a.outputBuffer instanceof Array ? new Uint8Array(a.outputBuffer) : a.outputBuffer), "number" === typeof a.outputIndex && (this.b = a.outputIndex));
		this.a || (this.a = new (A ? Uint8Array : Array)(32768))
	}

	var na = 2, oa = {NONE: 0, L: 1, t: na, X: 3}, pa = [], T;
	for (T = 0; 288 > T; T++)switch (u) {
		case 143 >= T:
			pa.push([T + 48, 8]);
			break;
		case 255 >= T:
			pa.push([T - 144 + 400, 9]);
			break;
		case 279 >= T:
			pa.push([T - 256 + 0, 7]);
			break;
		case 287 >= T:
			pa.push([T - 280 + 192, 8]);
			break;
		default:
			q("invalid literal: " + T)
	}
	ma.prototype.h = function () {
		var b, a, c, d, f = this.input;
		switch (this.k) {
			case 0:
				c = 0;
				for (d = f.length; c < d;) {
					a = A ? f.subarray(c, c + 65535) : f.slice(c, c + 65535);
					c += a.length;
					var e = a, g = c === d, k = t, h = t, l = t, s = t, n = t, m = this.a, p = this.b;
					if (A) {
						for (m = new Uint8Array(this.a.buffer); m.length <= p + e.length + 5;)m = new Uint8Array(m.length << 1);
						m.set(this.a)
					}
					k = g ? 1 : 0;
					m[p++] = k | 0;
					h = e.length;
					l = ~h + 65536 & 65535;
					m[p++] = h & 255;
					m[p++] = h >>> 8 & 255;
					m[p++] = l & 255;
					m[p++] = l >>> 8 & 255;
					if (A)m.set(e, p), p += e.length, m = m.subarray(0, p); else {
						s = 0;
						for (n = e.length; s < n; ++s)m[p++] =
							e[s];
						m.length = p
					}
					this.b = p;
					this.a = m
				}
				break;
			case 1:
				var r = new E(A ? new Uint8Array(this.a.buffer) : this.a, this.b);
				r.d(1, 1, u);
				r.d(1, 2, u);
				var v = qa(this, f), x, O, y;
				x = 0;
				for (O = v.length; x < O; x++)if (y = v[x], E.prototype.d.apply(r, pa[y]), 256 < y)r.d(v[++x], v[++x], u), r.d(v[++x], 5), r.d(v[++x], v[++x], u); else if (256 === y)break;
				this.a = r.finish();
				this.b = this.a.length;
				break;
			case na:
				var D = new E(A ? new Uint8Array(this.a.buffer) : this.a, this.b), Da, P, U, V, W, qb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], ca, Ea, da, Fa, ka, sa = Array(19),
					Ga, X, la, B, Ha;
				Da = na;
				D.d(1, 1, u);
				D.d(Da, 2, u);
				P = qa(this, f);
				ca = ra(this.U, 15);
				Ea = ta(ca);
				da = ra(this.T, 7);
				Fa = ta(da);
				for (U = 286; 257 < U && 0 === ca[U - 1]; U--);
				for (V = 30; 1 < V && 0 === da[V - 1]; V--);
				var Ia = U, Ja = V, I = new (A ? Uint32Array : Array)(Ia + Ja), w, K, z, ea, H:any = new (A ? Uint32Array : Array)(316), F, C, L = new (A ? Uint8Array : Array)(19);
				for (w = K = 0; w < Ia; w++)I[K++] = ca[w];
				for (w = 0; w < Ja; w++)I[K++] = da[w];
				if (!A) {
					w = 0;
					for (ea = L.length; w < ea; ++w)L[w] = 0
				}
				w = F = 0;
				for (ea = I.length; w < ea; w += K) {
					for (K = 1; w + K < ea && I[w + K] === I[w]; ++K);
					z = K;
					if (0 === I[w])if (3 > z)for (; 0 <
														z--;)H[F++] = 0, L[0]++; else for (; 0 < z;)C = 138 > z ? z : 138, C > z - 3 && C < z && (C = z - 3), 10 >= C ? (H[F++] = 17, H[F++] = C - 3, L[17]++) : (H[F++] = 18, H[F++] = C - 11, L[18]++), z -= C; else if (H[F++] = I[w], L[I[w]]++, z--, 3 > z)for (; 0 < z--;)H[F++] = I[w], L[I[w]]++; else for (; 0 < z;)C = 6 > z ? z : 6, C > z - 3 && C < z && (C = z - 3), H[F++] = 16, H[F++] = C - 3, L[16]++, z -= C
				}
				b = A ? H.subarray(0, F) : H.slice(0, F);
				ka = ra(L, 7);
				for (B = 0; 19 > B; B++)sa[B] = ka[qb[B]];
				for (W = 19; 4 < W && 0 === sa[W - 1]; W--);
				Ga = ta(ka);
				D.d(U - 257, 5, u);
				D.d(V - 1, 5, u);
				D.d(W - 4, 4, u);
				for (B = 0; B < W; B++)D.d(sa[B], 3, u);
				B = 0;
				for (Ha = b.length; B <
					Ha; B++)if (X = b[B], D.d(Ga[X], ka[X], u), 16 <= X) {
					B++;
					switch (X) {
						case 16:
							la = 2;
							break;
						case 17:
							la = 3;
							break;
						case 18:
							la = 7;
							break;
						default:
							q("invalid code: " + X)
					}
					D.d(b[B], la, u)
				}
				var Ka = [Ea, ca], La = [Fa, da], M, Ma, fa, va, Na, Oa, Pa, Qa;
				Na = Ka[0];
				Oa = Ka[1];
				Pa = La[0];
				Qa = La[1];
				M = 0;
				for (Ma = P.length; M < Ma; ++M)if (fa = P[M], D.d(Na[fa], Oa[fa], u), 256 < fa)D.d(P[++M], P[++M], u), va = P[++M], D.d(Pa[va], Qa[va], u), D.d(P[++M], P[++M], u); else if (256 === fa)break;
				this.a = D.finish();
				this.b = this.a.length;
				break;
			default:
				q("invalid compression type")
		}
		return this.a
	};
	function ua(b, a) {
		this.length = b;
		this.N = a
	}

	var wa = function () {
		function b(a) {
			switch (u) {
				case 3 === a:
					return[257, a - 3, 0];
				case 4 === a:
					return[258, a - 4, 0];
				case 5 === a:
					return[259, a - 5, 0];
				case 6 === a:
					return[260, a - 6, 0];
				case 7 === a:
					return[261, a - 7, 0];
				case 8 === a:
					return[262, a - 8, 0];
				case 9 === a:
					return[263, a - 9, 0];
				case 10 === a:
					return[264, a - 10, 0];
				case 12 >= a:
					return[265, a - 11, 1];
				case 14 >= a:
					return[266, a - 13, 1];
				case 16 >= a:
					return[267, a - 15, 1];
				case 18 >= a:
					return[268, a - 17, 1];
				case 22 >= a:
					return[269, a - 19, 2];
				case 26 >= a:
					return[270, a - 23, 2];
				case 30 >= a:
					return[271, a - 27, 2];
				case 34 >= a:
					return[272,
						a - 31, 2];
				case 42 >= a:
					return[273, a - 35, 3];
				case 50 >= a:
					return[274, a - 43, 3];
				case 58 >= a:
					return[275, a - 51, 3];
				case 66 >= a:
					return[276, a - 59, 3];
				case 82 >= a:
					return[277, a - 67, 4];
				case 98 >= a:
					return[278, a - 83, 4];
				case 114 >= a:
					return[279, a - 99, 4];
				case 130 >= a:
					return[280, a - 115, 4];
				case 162 >= a:
					return[281, a - 131, 5];
				case 194 >= a:
					return[282, a - 163, 5];
				case 226 >= a:
					return[283, a - 195, 5];
				case 257 >= a:
					return[284, a - 227, 5];
				case 258 === a:
					return[285, a - 258, 0];
				default:
					q("invalid length: " + a)
			}
		}

		var a = [], c, d;
		for (c = 3; 258 >= c; c++)d = b(c), a[c] = d[2] << 24 | d[1] <<
			16 | d[0];
		return a
	}(), xa = A ? new Uint32Array(wa) : wa;

	function qa(b, a) {
		function c(a, c) {
			var b = a.N, d = [], e = 0, f;
			f = xa[a.length];
			d[e++] = f & 65535;
			d[e++] = f >> 16 & 255;
			d[e++] = f >> 24;
			var g;
			switch (u) {
				case 1 === b:
					g = [0, b - 1, 0];
					break;
				case 2 === b:
					g = [1, b - 2, 0];
					break;
				case 3 === b:
					g = [2, b - 3, 0];
					break;
				case 4 === b:
					g = [3, b - 4, 0];
					break;
				case 6 >= b:
					g = [4, b - 5, 1];
					break;
				case 8 >= b:
					g = [5, b - 7, 1];
					break;
				case 12 >= b:
					g = [6, b - 9, 2];
					break;
				case 16 >= b:
					g = [7, b - 13, 2];
					break;
				case 24 >= b:
					g = [8, b - 17, 3];
					break;
				case 32 >= b:
					g = [9, b - 25, 3];
					break;
				case 48 >= b:
					g = [10, b - 33, 4];
					break;
				case 64 >= b:
					g = [11, b - 49, 4];
					break;
				case 96 >= b:
					g = [12, b -
						65, 5];
					break;
				case 128 >= b:
					g = [13, b - 97, 5];
					break;
				case 192 >= b:
					g = [14, b - 129, 6];
					break;
				case 256 >= b:
					g = [15, b - 193, 6];
					break;
				case 384 >= b:
					g = [16, b - 257, 7];
					break;
				case 512 >= b:
					g = [17, b - 385, 7];
					break;
				case 768 >= b:
					g = [18, b - 513, 8];
					break;
				case 1024 >= b:
					g = [19, b - 769, 8];
					break;
				case 1536 >= b:
					g = [20, b - 1025, 9];
					break;
				case 2048 >= b:
					g = [21, b - 1537, 9];
					break;
				case 3072 >= b:
					g = [22, b - 2049, 10];
					break;
				case 4096 >= b:
					g = [23, b - 3073, 10];
					break;
				case 6144 >= b:
					g = [24, b - 4097, 11];
					break;
				case 8192 >= b:
					g = [25, b - 6145, 11];
					break;
				case 12288 >= b:
					g = [26, b - 8193, 12];
					break;
				case 16384 >=
					b:
					g = [27, b - 12289, 12];
					break;
				case 24576 >= b:
					g = [28, b - 16385, 13];
					break;
				case 32768 >= b:
					g = [29, b - 24577, 13];
					break;
				default:
					q("invalid distance")
			}
			f = g;
			d[e++] = f[0];
			d[e++] = f[1];
			d[e++] = f[2];
			var h, k;
			h = 0;
			for (k = d.length; h < k; ++h)m[p++] = d[h];
			v[d[0]]++;
			x[d[3]]++;
			r = a.length + c - 1;
			n = null
		}

		var d, f, e, g, k, h = {}, l, s, n, m:any = A ? new Uint16Array(2 * a.length) : [], p = 0, r = 0, v = new (A ? Uint32Array : Array)(286), x = new (A ? Uint32Array : Array)(30), O = b.F, y;
		if (!A) {
			for (e = 0; 285 >= e;)v[e++] = 0;
			for (e = 0; 29 >= e;)x[e++] = 0
		}
		v[256] = 1;
		d = 0;
		for (f = a.length; d < f; ++d) {
			e = k = 0;
			for (g = 3; e < g && d + e !== f; ++e)k = k << 8 | a[d + e];
			h[k] === t && (h[k] = []);
			l = h[k];
			if (!(0 < r--)) {
				for (; 0 < l.length && 32768 < d - l[0];)l.shift();
				if (d + 3 >= f) {
					n && c(n, -1);
					e = 0;
					for (g = f - d; e < g; ++e)y = a[d + e], m[p++] = y, ++v[y];
					break
				}
				0 < l.length ? (s = ya(a, d, l), n ? n.length < s.length ? (y = a[d - 1], m[p++] = y, ++v[y], c(s, 0)) : c(n, -1) : s.length < O ? n = s : c(s, 0)) : n ? c(n, -1) : (y = a[d], m[p++] = y, ++v[y])
			}
			l.push(d)
		}
		m[p++] = 256;
		v[256]++;
		b.U = v;
		b.T = x;
		return A ? m.subarray(0, p) : m
	}

	function ya(b, a, c) {
		var d, f, e = 0, g, k, h, l, s = b.length;
		k = 0;
		l = c.length;
		a:for (; k < l; k++) {
			d = c[l - k - 1];
			g = 3;
			if (3 < e) {
				for (h = e; 3 < h; h--)if (b[d + h - 1] !== b[a + h - 1])continue a;
				g = e
			}
			for (; 258 > g && a + g < s && b[d + g] === b[a + g];)++g;
			g > e && (f = d, e = g);
			if (258 === g)break
		}
		return new ua(e, a - f)
	}

	function ra(b, a) {
		var c = b.length, d = new ia(572), f = new (A ? Uint8Array : Array)(c), e, g, k, h, l;
		if (!A)for (h = 0; h < c; h++)f[h] = 0;
		for (h = 0; h < c; ++h)0 < b[h] && d.push(h, b[h]);
		e = Array(d.length / 2);
		g = new (A ? Uint32Array : Array)(d.length / 2);
		if (1 === e.length)return f[d.pop().index] = 1, f;
		h = 0;
		for (l = d.length / 2; h < l; ++h)e[h] = d.pop(), g[h] = e[h].value;
		k = za(g, g.length, a);
		h = 0;
		for (l = e.length; h < l; ++h)f[e[h].index] = k[h];
		return f
	}

	function za(b, a, c) {
		function d(b) {
			var c = h[b][l[b]];
			c === a ? (d(b + 1), d(b + 1)) : --g[c];
			++l[b]
		}

		var f = new (A ? Uint16Array : Array)(c), e = new (A ? Uint8Array : Array)(c), g = new (A ? Uint8Array : Array)(a), k = Array(c), h = Array(c), l = Array(c), s = (1 << c) - a, n = 1 << c - 1, m, p, r, v, x;
		f[c - 1] = a;
		for (p = 0; p < c; ++p)s < n ? e[p] = 0 : (e[p] = 1, s -= n), s <<= 1, f[c - 2 - p] = (f[c - 1 - p] / 2 | 0) + a;
		f[0] = e[0];
		k[0] = Array(f[0]);
		h[0] = Array(f[0]);
		for (p = 1; p < c; ++p)f[p] > 2 * f[p - 1] + e[p] && (f[p] = 2 * f[p - 1] + e[p]), k[p] = Array(f[p]), h[p] = Array(f[p]);
		for (m = 0; m < a; ++m)g[m] = c;
		for (r = 0; r < f[c - 1]; ++r)k[c -
			1][r] = b[r], h[c - 1][r] = r;
		for (m = 0; m < c; ++m)l[m] = 0;
		1 === e[c - 1] && (--g[0], ++l[c - 1]);
		for (p = c - 2; 0 <= p; --p) {
			v = m = 0;
			x = l[p + 1];
			for (r = 0; r < f[p]; r++)v = k[p + 1][x] + k[p + 1][x + 1], v > b[m] ? (k[p][r] = v, h[p][r] = a, x += 2) : (k[p][r] = b[m], h[p][r] = m, ++m);
			l[p] = 0;
			1 === e[p] && d(p)
		}
		return g
	}

	function ta(b) {
		var a = new (A ? Uint16Array : Array)(b.length), c = [], d = [], f = 0, e, g, k, h;
		e = 0;
		for (g = b.length; e < g; e++)c[b[e]] = (c[b[e]] | 0) + 1;
		e = 1;
		for (g = 16; e <= g; e++)d[e] = f, f += c[e] | 0, f <<= 1;
		e = 0;
		for (g = b.length; e < g; e++) {
			f = d[b[e]];
			d[b[e]] += 1;
			k = a[e] = 0;
			for (h = b[e]; k < h; k++)a[e] = a[e] << 1 | f & 1, f >>>= 1
		}
		return a
	};
	function Aa(b, a?) {
		this.input = b;
		this.b = this.c = 0;
		this.g = {};
		a && (a.flags && (this.g = a.flags), "string" === typeof a.filename && (this.filename = a.filename), "string" === typeof a.comment && (this.w = a.comment), a.deflateOptions && (this.l = a.deflateOptions));
		this.l || (this.l = {})
	}

	Aa.prototype.h = function () {
		var b, a, c, d, f, e, g, k, h:any = new (A ? Uint8Array : Array)(32768), l = 0, s = this.input, n = this.c, m = this.filename, p = this.w;
		h[l++] = 31;
		h[l++] = 139;
		h[l++] = 8;
		b = 0;
		this.g.fname && (b |= Ba);
		this.g.fcomment && (b |= Ca);
		this.g.fhcrc && (b |= Ra);
		h[l++] = b;
		a = (Date.now ? Date.now() : +new Date) / 1E3 | 0;
		h[l++] = a & 255;
		h[l++] = a >>> 8 & 255;
		h[l++] = a >>> 16 & 255;
		h[l++] = a >>> 24 & 255;
		h[l++] = 0;
		h[l++] = Sa;
		if (this.g.fname !== t) {
			g = 0;
			for (k = m.length; g < k; ++g)e = m.charCodeAt(g), 255 < e && (h[l++] = e >>> 8 & 255), h[l++] = e & 255;
			h[l++] = 0
		}
		if (this.g.comment) {
			g =
				0;
			for (k = p.length; g < k; ++g)e = p.charCodeAt(g), 255 < e && (h[l++] = e >>> 8 & 255), h[l++] = e & 255;
			h[l++] = 0
		}
		this.g.fhcrc && (c = R(h, 0, l) & 65535, h[l++] = c & 255, h[l++] = c >>> 8 & 255);
		this.l.outputBuffer = h;
		this.l.outputIndex = l;
		f = new ma(s, this.l);
		h = f.h();
		l = f.b;
		A && (l + 8 > h.buffer.byteLength ? (this.a = new Uint8Array(l + 8), this.a.set(new Uint8Array(h.buffer)), h = this.a) : h = new Uint8Array(h.buffer));
		d = R(s, t, t);
		h[l++] = d & 255;
		h[l++] = d >>> 8 & 255;
		h[l++] = d >>> 16 & 255;
		h[l++] = d >>> 24 & 255;
		k = s.length;
		h[l++] = k & 255;
		h[l++] = k >>> 8 & 255;
		h[l++] = k >>> 16 & 255;
		h[l++] =
			k >>> 24 & 255;
		this.c = n;
		A && l < h.length && (this.a = h = h.subarray(0, l));
		return h
	};
	var Sa = 255, Ra = 2, Ba = 8, Ca = 16;

	function Y(b, a) {
		this.o = [];
		this.p = 32768;
		this.e = this.j = this.c = this.s = 0;
		this.input = A ? new Uint8Array(b) : b;
		this.u = !1;
		this.q = Ta;
		this.K = !1;
		if (a || !(a = {}))a.index && (this.c = a.index), a.bufferSize && (this.p = a.bufferSize), a.bufferType && (this.q = a.bufferType), a.resize && (this.K = a.resize);
		switch (this.q) {
			case Ua:
				this.b = 32768;
				this.a = new (A ? Uint8Array : Array)(32768 + this.p + 258);
				break;
			case Ta:
				this.b = 0;
				this.a = new (A ? Uint8Array : Array)(this.p);
				this.f = this.S;
				this.z = this.O;
				this.r = this.Q;
				break;
			default:
				q(Error("invalid inflate mode"))
		}
	}

	var Ua = 0, Ta = 1;
	Y.prototype.i = function () {
		for (; !this.u;) {
			var b = Z(this, 3);
			b & 1 && (this.u = u);
			b >>>= 1;
			switch (b) {
				case 0:
					var a = this.input, c = this.c, d = this.a, f = this.b, e = t, g = t, k = t, h = d.length, l = t;
					this.e = this.j = 0;
					e = a[c++];
					e === t && q(Error("invalid uncompressed block header: LEN (first byte)"));
					g = e;
					e = a[c++];
					e === t && q(Error("invalid uncompressed block header: LEN (second byte)"));
					g |= e << 8;
					e = a[c++];
					e === t && q(Error("invalid uncompressed block header: NLEN (first byte)"));
					k = e;
					e = a[c++];
					e === t && q(Error("invalid uncompressed block header: NLEN (second byte)"));
					k |=
						e << 8;
					g === ~k && q(Error("invalid uncompressed block header: length verify"));
					c + g > a.length && q(Error("input buffer is broken"));
					switch (this.q) {
						case Ua:
							for (; f + g > d.length;) {
								l = h - f;
								g -= l;
								if (A)d.set(a.subarray(c, c + l), f), f += l, c += l; else for (; l--;)d[f++] = a[c++];
								this.b = f;
								d = this.f();
								f = this.b
							}
							break;
						case Ta:
							for (; f + g > d.length;)d = this.f({B: 2});
							break;
						default:
							q(Error("invalid inflate mode"))
					}
					if (A)d.set(a.subarray(c, c + g), f), f += g, c += g; else for (; g--;)d[f++] = a[c++];
					this.c = c;
					this.b = f;
					this.a = d;
					break;
				case 1:
					this.r(Va, Wa);
					break;
				case 2:
					Xa(this);
					break;
				default:
					q(Error("unknown BTYPE: " + b))
			}
		}
		return this.z()
	};
	var Ya = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Za = A ? new Uint16Array(Ya) : Ya, $a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258], ab = A ? new Uint16Array($a) : $a, bb = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0], cb = A ? new Uint8Array(bb) : bb, db = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], eb = A ? new Uint16Array(db) : db, fb = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
		10, 11, 11, 12, 12, 13, 13], gb = A ? new Uint8Array(fb) : fb, hb = new (A ? Uint8Array : Array)(288), $, ib;
	$ = 0;
	for (ib = hb.length; $ < ib; ++$)hb[$] = 143 >= $ ? 8 : 255 >= $ ? 9 : 279 >= $ ? 7 : 8;
	var Va = ja(hb), jb = new (A ? Uint8Array : Array)(30), kb, lb;
	kb = 0;
	for (lb = jb.length; kb < lb; ++kb)jb[kb] = 5;
	var Wa = ja(jb);

	function Z(b, a) {
		for (var c = b.j, d = b.e, f = b.input, e = b.c, g; d < a;)g = f[e++], g === t && q(Error("input buffer is broken")), c |= g << d, d += 8;
		g = c & (1 << a) - 1;
		b.j = c >>> a;
		b.e = d - a;
		b.c = e;
		return g
	}

	function mb(b, a) {
		for (var c = b.j, d = b.e, f = b.input, e = b.c, g = a[0], k = a[1], h, l, s; d < k;) {
			h = f[e++];
			if (h === t)break;
			c |= h << d;
			d += 8
		}
		l = g[c & (1 << k) - 1];
		s = l >>> 16;
		b.j = c >> s;
		b.e = d - s;
		b.c = e;
		return l & 65535
	}

	function Xa(b) {
		function a(a, b, c) {
			var d, e, f, g;
			for (g = 0; g < a;)switch (d = mb(this, b), d) {
				case 16:
					for (f = 3 + Z(this, 2); f--;)c[g++] = e;
					break;
				case 17:
					for (f = 3 + Z(this, 3); f--;)c[g++] = 0;
					e = 0;
					break;
				case 18:
					for (f = 11 + Z(this, 7); f--;)c[g++] = 0;
					e = 0;
					break;
				default:
					e = c[g++] = d
			}
			return c
		}

		var c = Z(b, 5) + 257, d = Z(b, 5) + 1, f = Z(b, 4) + 4, e = new (A ? Uint8Array : Array)(Za.length), g, k, h, l;
		for (l = 0; l < f; ++l)e[Za[l]] = Z(b, 3);
		g = ja(e);
		k = new (A ? Uint8Array : Array)(c);
		h = new (A ? Uint8Array : Array)(d);
		b.r(ja(a.call(b, c, g, k)), ja(a.call(b, d, g, h)))
	}

	Y.prototype.r = function (b, a) {
		var c = this.a, d = this.b;
		this.A = b;
		for (var f = c.length - 258, e, g, k, h; 256 !== (e = mb(this, b));)if (256 > e)d >= f && (this.b = d, c = this.f(), d = this.b), c[d++] = e; else {
			g = e - 257;
			h = ab[g];
			0 < cb[g] && (h += Z(this, cb[g]));
			e = mb(this, a);
			k = eb[e];
			0 < gb[e] && (k += Z(this, gb[e]));
			d >= f && (this.b = d, c = this.f(), d = this.b);
			for (; h--;)c[d] = c[d++ - k]
		}
		for (; 8 <= this.e;)this.e -= 8, this.c--;
		this.b = d
	};
	Y.prototype.Q = function (b, a) {
		var c = this.a, d = this.b;
		this.A = b;
		for (var f = c.length, e, g, k, h; 256 !== (e = mb(this, b));)if (256 > e)d >= f && (c = this.f(), f = c.length), c[d++] = e; else {
			g = e - 257;
			h = ab[g];
			0 < cb[g] && (h += Z(this, cb[g]));
			e = mb(this, a);
			k = eb[e];
			0 < gb[e] && (k += Z(this, gb[e]));
			d + h > f && (c = this.f(), f = c.length);
			for (; h--;)c[d] = c[d++ - k]
		}
		for (; 8 <= this.e;)this.e -= 8, this.c--;
		this.b = d
	};
	Y.prototype.f = function () {
		var b:any = new (A ? Uint8Array : Array)(this.b - 32768), a = this.b - 32768, c, d, f = this.a;
		if (A)b.set(f.subarray(32768, b.length)); else {
			c = 0;
			for (d = b.length; c < d; ++c)b[c] = f[c + 32768]
		}
		this.o.push(b);
		this.s += b.length;
		if (A)f.set(f.subarray(a, a + 32768)); else for (c = 0; 32768 > c; ++c)f[c] = f[a + c];
		this.b = 32768;
		return f
	};
	Y.prototype.S = function (b) {
		var a, c = this.input.length / this.c + 1 | 0, d, f, e, g = this.input, k = this.a;
		b && ("number" === typeof b.B && (c = b.B), "number" === typeof b.M && (c += b.M));
		2 > c ? (d = (g.length - this.c) / this.A[2], e = 258 * (d / 2) | 0, f = e < k.length ? k.length + e : k.length << 1) : f = k.length * c;
		A ? (a = new Uint8Array(f), a.set(k)) : a = k;
		return this.a = a
	};
	Y.prototype.z = function () {
		var b = 0, a = this.a, c = this.o, d, f = new (A ? Uint8Array : Array)(this.s + (this.b - 32768)), e, g, k, h;
		if (0 === c.length)return A ? this.a.subarray(32768, this.b) : this.a.slice(32768, this.b);
		e = 0;
		for (g = c.length; e < g; ++e) {
			d = c[e];
			k = 0;
			for (h = d.length; k < h; ++k)f[b++] = d[k]
		}
		e = 32768;
		for (g = this.b; e < g; ++e)f[b++] = a[e];
		this.o = [];
		return this.buffer = f
	};
	Y.prototype.O = function () {
		var b, a = this.b;
		A ? this.K ? (b = new Uint8Array(a), b.set(this.a.subarray(0, a))) : b = this.a.subarray(0, a) : (this.a.length > a && (this.a.length = a), b = this.a);
		return this.buffer = b
	};
	function nb(b) {
		this.input = b;
		this.c = 0;
		this.G = [];
		this.R = !1
	}

	nb.prototype.i = function () {
		for (var b = this.input.length; this.c < b;) {
			var a = new ha, c = t, d = t, f = t, e = t, g = t, k = t, h = t, l = t, s = t, n = this.input, m = this.c;
			a.C = n[m++];
			a.D = n[m++];
			(31 !== a.C || 139 !== a.D) && q(Error("invalid file signature:" + a.C + "," + a.D));
			a.v = n[m++];
			switch (a.v) {
				case 8:
					break;
				default:
					q(Error("unknown compression method: " + a.v))
			}
			a.n = n[m++];
			l = n[m++] | n[m++] << 8 | n[m++] << 16 | n[m++] << 24;
			a.$ = new Date(1E3 * l);
			a.ba = n[m++];
			a.aa = n[m++];
			0 < (a.n & 4) && (a.W = n[m++] | n[m++] << 8, m += a.W);
			if (0 < (a.n & Ba)) {
				h = [];
				for (k = 0; 0 < (g = n[m++]);)h[k++] =
					String.fromCharCode(g);
				a.name = h.join("")
			}
			if (0 < (a.n & Ca)) {
				h = [];
				for (k = 0; 0 < (g = n[m++]);)h[k++] = String.fromCharCode(g);
				a.w = h.join("")
			}
			0 < (a.n & Ra) && (a.P = R(n, 0, m) & 65535, a.P !== (n[m++] | n[m++] << 8) && q(Error("invalid header crc16")));
			c = n[n.length - 4] | n[n.length - 3] << 8 | n[n.length - 2] << 16 | n[n.length - 1] << 24;
			n.length - m - 4 - 4 < 512 * c && (e = c);
			d = new Y(n, {index: m, bufferSize: e});
			a.data = f = d.i();
			m = d.c;
			a.Y = s = (n[m++] | n[m++] << 8 | n[m++] << 16 | n[m++] << 24) >>> 0;
			R(f, t, t) !== s && q(Error("invalid CRC-32 checksum: 0x" + R(f, t, t).toString(16) + " / 0x" +
				s.toString(16)));
			a.Z = c = (n[m++] | n[m++] << 8 | n[m++] << 16 | n[m++] << 24) >>> 0;
			(f.length & 4294967295) !== c && q(Error("invalid input size: " + (f.length & 4294967295) + " / " + c));
			this.G.push(a);
			this.c = m
		}
		this.R = u;
		var p = this.G, r, v, x = 0, O = 0, y;
		r = 0;
		for (v = p.length; r < v; ++r)O += p[r].data.length;
		if (A) {
			y = new Uint8Array(O);
			for (r = 0; r < v; ++r)y.set(p[r].data, x), x += p[r].data.length
		} else {
			y = [];
			for (r = 0; r < v; ++r)y[r] = p[r].data;
			y = Array.prototype.concat.apply([], y)
		}
		return y
	};
	function ob(b) {
		if ("string" === typeof b) {
			var a:Array<any> = b.split(""), c, d;
			c = 0;
			for (d = a.length; c < d; c++)a[c] = (a[c].charCodeAt(0) & 255) >>> 0;
			b = a
		}
		for (var f = 1, e = 0, g = b.length, k, h = 0; 0 < g;) {
			k = 1024 < g ? 1024 : g;
			g -= k;
			do f += b[h++], e += f; while (--k);
			f %= 65521;
			e %= 65521
		}
		return(e << 16 | f) >>> 0
	};
	function pb(b, a?) {
		var c, d;
		this.input = b;
		this.c = 0;
		if (a || !(a = {}))a.index && (this.c = a.index), a.verify && (this.V = a.verify);
		c = b[this.c++];
		d = b[this.c++];
		switch (c & 15) {
			case rb:
				this.method = rb;
				break;
			default:
				q(Error("unsupported compression method"))
		}
		0 !== ((c << 8) + d) % 31 && q(Error("invalid fcheck flag:" + ((c << 8) + d) % 31));
		d & 32 && q(Error("fdict flag is not supported"));
		this.J = new Y(b, {index: this.c, bufferSize: a.bufferSize, bufferType: a.bufferType, resize: a.resize})
	}

	pb.prototype.i = function () {
		var b = this.input, a, c;
		a = this.J.i();
		this.c = this.J.c;
		this.V && (c = (b[this.c++] << 24 | b[this.c++] << 16 | b[this.c++] << 8 | b[this.c++]) >>> 0, c !== ob(a) && q(Error("invalid adler-32 checksum")));
		return a
	};
	var rb = 8;

	function sb(b, a?) {
		this.input = b;
		this.a = new (A ? Uint8Array : Array)(32768);
		this.k = tb.t;
		var c:any = {}, d;
		if ((a || !(a = {})) && "number" === typeof a.compressionType)this.k = a.compressionType;
		for (d in a)c[d] = a[d];
		c.outputBuffer = this.a;
		this.I = new ma(this.input, c)
	}

	var tb = oa;
	sb.prototype.h = function () {
		var b, a, c, d, f, e, g, k = 0;
		g = this.a;
		b = rb;
		switch (b) {
			case rb:
				a = Math.LOG2E * Math.log(32768) - 8;
				break;
			default:
				q(Error("invalid compression method"))
		}
		c = a << 4 | b;
		g[k++] = c;
		switch (b) {
			case rb:
				switch (this.k) {
					case tb.NONE:
						f = 0;
						break;
					case tb.L:
						f = 1;
						break;
					case tb.t:
						f = 2;
						break;
					default:
						q(Error("unsupported compression type"))
				}
				break;
			default:
				q(Error("invalid compression method"))
		}
		d = f << 6 | 0;
		g[k++] = d | 31 - (256 * c + d) % 31;
		e = ob(this.input);
		this.I.b = k;
		g = this.I.h();
		k = g.length;
		A && (g = new Uint8Array(g.buffer), g.length <=
			k + 4 && (this.a = new Uint8Array(g.length + 4), this.a.set(g), g = this.a), g = g.subarray(0, k + 4));
		g[k++] = e >> 24 & 255;
		g[k++] = e >> 16 & 255;
		g[k++] = e >> 8 & 255;
		g[k++] = e & 255;
		return g
	};
	const deflateSync = function (b, a?) {
		var c;
		c = (new sb(b)).h();
		a || (a = {});
		return a.H ? c : Cb(c)
	};
	const inflateSync = function (b, a?) {
		var c;
		b.subarray = b.slice;
		c = (new pb(b)).i();
		a || (a = {});
		return a.noBuffer ? c : Cb(c)
	};
	const gzipSync = function (b, a?) {
		var c;
		b.subarray = b.slice;
		c = (new Aa(b)).h();
		a || (a = {});
		return a.H ? c : Cb(c)
	};
	const gunzipSync = function (b, a) {
		var c;
		b.subarray = b.slice;
		c = (new nb(b)).i();
		a || (a = {});
		return a.H ? c : Cb(c)
	};

	function Cb(b) {
		var buf = new ArrayBuffer(b.length), c, d,a;
		a = new Uint8Array(buf);
		c = 0;
		for (d = b.length; c < d; ++c)a[c] = b[c];
		return a;
	};
    
export {deflateSync, inflateSync, gzipSync, gunzipSync};