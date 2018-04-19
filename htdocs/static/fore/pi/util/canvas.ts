declare var module: any;
/*
 * 画布工具库
 * 图像滤镜 imgfilter
 * 支持多种滤镜，可以连续滤镜处理，包括 灰度-色相饱和度亮度-亮度对比度-腐蚀-锐化-高斯模糊
 * [["gray"], ["hsl", 180?, 1?, 1?], ["brightnessContrast", 0.5, 0?], ["corrode", 3?], ["sharp", 3?], ["gaussBlur", 3?]]
 * 图像文字 imgtext
 * 只支持单行文字，不支持继承的font属性，不支持line-height属性
 * 	如果支持继承的font属性，则需要在div放入节点后，获取font属性
 * 	如果支持多行文本，需要支持line-height属性，并处理对齐问题
 * 要求参数为ImgTextCfg, 如果cfg中有show字段，表示按字符显示，渐变也是单字符计算的
 */

// ============================== 导入
import { isString } from './util';
import { getPngSize } from './img';
import { set as task } from './task_mgr';
import { request } from '../worker/client';
import { nextPowerOfTwo, isPowerOfTwo } from '../util/math';
import { RES_TYPE_BLOB, Res, ResTab, BlobType, register, loadOK, loadError } from '../util/res_mgr';
import { butil } from '../lang/mod';

// ============================== 导出
// imgtext的资源类型
export const RES_TYPE_IMGTEXT = "imgtext";
// imgfliter的资源类型
export const RES_TYPE_IMGFILTER = "imgfilter";

// 字体配置
export interface FontCfg {
	style: "normal" | "italic" | "oblique",
	weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
	size: number,
	face: string,
	font: string;
};
// 渐变配置， x1y1x2y2可以使用百分数，表示图像宽高度的百分比
export interface GradientCfg {
	x1: number, y1: number, r1?: number, // 渐变的起始位置及半径，不定义半径或半径为0，表示为线性渐变
	x2: number, y2: number, r2?: number, // 渐变的起始和结束位置，径向渐变
	steps: Array<number | string>; // steps为2个元素一组，第一个为0-1之间的数，第二个为颜色。比如：[0, "rgba(0,0,0,0.5)", 1, "#636363"]
};
// 图像文本配置
export interface ImgTextCfg {
	text: string,
	font: string,
	color: string | GradientCfg,// 颜色 或渐变颜色
	shadow: { // 阴影
		offsetX: number, offsetY: number, //偏移量
		blur: number, // 模糊值，一般为5
		color: string // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
	},
	strokeWidth: number, // 描边宽度
	strokeColor: string | GradientCfg, // 描边颜色
	background: string | GradientCfg, // 背景
	show?: string;
	isCommon?: boolean;
	space?:number;//字间距
	lineHeight?:number;//行高
	textAlign?:string;//对齐方式
	isPowerOfTwo?:boolean;//画布宽高是否算成2的幂
	factor?: number;//倾斜因子(用measureText方法取到的字体宽度未考虑字体的倾斜)
	hfactor?: number;//某些字体存在bug，高度总是比其它字体的size大，因此应乘以一个比1大的数
	zoomfactor?: number; //缩放因子， 在手机上出现字体模糊的情况，可以通过放大后再缩小来解决
	width?: number;//canvas宽度，默认512
	height?: number;
	key?: string;
	fontCfg?: FontCfg;
	textWidth?:number;
	textHeight?:number;
	offsetX?: number;
	offsetY?: number;
	offsetWidth?: number;
	offsetHeight?: number;
	chars?: Array<string>;
	charUV?: any;
	totalW?: number;
	maxBlur?: number;
}

// 图像滤镜配置
export interface ImgFilterCfg {
	img: string,
	path: string,
	file?: string,
	url?: string,
	arr: Array<Array<any>>; // 滤镜数组
}

// 销毁图片文字
export const destroyImgText = (cfg: ImgTextCfg) => {
	cfg.key = "";
	cfg.chars = cfg.charUV = null;
	cfg.width = cfg.height = cfg.textWidth = cfg.textHeight = cfg.offsetX = cfg.offsetY = cfg.textWidth = cfg.offsetHeight = cfg.offsetY = cfg.offsetY = 0;
}

// 获得对应的字符串键
export const getImgTextKey = (cfg: ImgTextCfg, type?:string): string => {
	//let key = cfg.key;
	let key;
	type = type || RES_TYPE_IMGTEXT;
	//if (key)
	//	return type + ":" +key;
	if (!cfg.fontCfg)
		cfg.fontCfg = parseFont(cfg.font);
	cfg.key = key = cfg.text + "| " + cfg.fontCfg.font + "| " + colorString(cfg.color) + "| " + shadowString(cfg.shadow) + "| " + (cfg.strokeWidth || 1) + "| " + colorString(cfg.strokeColor) + "| " + colorString(cfg.background) + "|" + (cfg.isPowerOfTwo?true:false);
	return type + ":" +key;
}

/**
 * @description 解析字体配置，同css font的字体简写， 字体字符串中必须有size和family属性
 * @example
 */
export const parseFont = (str: string): FontCfg => {
	let arr = str.split(" "), i = arr.length - 1;
	let cfg = {
		style: "normal",
		weight: 400,
		size: 24,
		face: "arial,serif",
		font: ""
	};
	if (i >= 0)
		cfg.face = arr[i--];
	if (i >= 0) {
		let size = parseInt(arr[i--]);
		if (size){
			cfg.size = size;
		}
	}
	if (i >= 0) {
		let s = arr[i--];
		let weight = parseInt(s);
		if (!weight)
			weight = WeightNumber[s];
		if (weight)
			cfg.weight = weight;
	}
	if (i >= 0)
		cfg.style = arr[i];
	cfg.font = cfg.style + " " + cfg.weight + " " + cfg.size + "px " + cfg.face;
	return cfg as FontCfg;
}

/**
 * @description 计算绘制文字的参数，宽度、偏移量
 * @example
 */
export const calcText = (cfg: ImgTextCfg): void => {
	if(cfg.isPowerOfTwo === true && cfg.width !== undefined && !isPowerOfTwo(cfg.width)){
		throw new Error("Not a power of 2, width: "+cfg.width);
	}

	let ctx = initWidth(cfg), arr = cfg.text.split(""), v = cfg.lineHeight, u, h, uv = {}, totalW = 0, currW = 0, halfSpace = cfg.space ;
	calcOffset(cfg); //计算描边阴影的像素

	
	for(let v of arr){		
		totalW += (ctx.measureText(v).width * cfg.factor + cfg.offsetWidth + cfg.space);
	}

	totalW -= cfg.space; 

	if(cfg.width === undefined){
		let tw = cfg.isPowerOfTwo?nextPowerOfTwo(Math.ceil(totalW)):Math.ceil (totalW);
		cfg.width = Math.min(tw, imgLimitWidth);
	}

	//每次换行时，重置u
	let resetStart = () => {
		if(cfg.isCommon || totalW - currW >= cfg.width || !cfg.textAlign || cfg.textAlign === "left"){
			u = 0;
		}else if(cfg.textAlign === "center"){
			u = (cfg.width-(totalW - currW))/2;
		}else if(cfg.textAlign === "right"){
			u = (cfg.width-(totalW - currW)) - 1;
		}
		v += h;
	}

	resetStart();

	//计算uv
	let calc = () => {
		let w, index = 0;
		h = (cfg.fontCfg.size + cfg.offsetHeight) * cfg.hfactor + cfg.lineHeight, v = 0;
		for (let c of arr) {
			w = ctx.measureText(c).width * cfg.factor + cfg.offsetWidth + cfg.space;
			if (u + w - halfSpace > cfg.width) {
				resetStart();
			}
			if(cfg.isCommon){
				if(uv[c])
					continue;
				uv[c] = { u1: u, v1: v, u2: u + w, v2: v + h };
			}
			else
				uv[index] = { u1: u, v1: v, u2: u + w, v2: v + h };
			u += w;
			currW += w;
			index ++;
		}
	}

	calc();	

	cfg.textHeight = Math.ceil(v + h - cfg.lineHeight);
	cfg.textWidth = v ? cfg.width : totalW;
	cfg.totalW = totalW;

	if(isErgodicDraw(cfg)){
		cfg.chars = arr;
		cfg.charUV = uv;
	}

	if(cfg.isPowerOfTwo){
		cfg.height = nextPowerOfTwo(cfg.textHeight);
		return;
	}
	cfg.height = Math.ceil(cfg.textHeight);
}

/**
 * @description 计算勾边宽度和阴影设置所影响的偏移量和宽高
 * @example
 */
 export const calcOffset = (cfg: ImgTextCfg): void => {
	cfg.offsetX = 0;
	cfg.offsetY = 0;
	cfg.offsetWidth = 0;
	cfg.offsetHeight = 0;
	if (cfg.strokeColor) {
		let width = cfg.strokeWidth;
		cfg.offsetX += width;
		cfg.offsetWidth += width + width;
		cfg.offsetY += width;
		cfg.offsetHeight += width + width;
	}
	let shadow = cfg.shadow;
	if (shadow) {
		let blur = shadow.blur > cfg.maxBlur ? cfg.maxBlur : shadow.blur;
		cfg.offsetX += Math.max(0, blur - shadow.offsetX);
		cfg.offsetWidth += 2 * blur;
		cfg.offsetY += Math.max(0, blur - shadow.offsetY);
		cfg.offsetHeight += 2 * blur;
	}
}

/**
 * @description 初始化字体配置
 * @example
 */
 export const initTextCfg = (cfg: ImgTextCfg): ImgTextCfg => {
	let zoomfactor = cfg.zoomfactor? cfg.zoomfactor : 1;
	let arr = cfg.font.split(" "), i = arr.length - 2;
	if (i >= 0) {
		let size = parseInt(arr[i]);
		if (arr[i]){
			arr[i] = (size * zoomfactor).toString() + "px";
		}
	}

	let font = arr.join(" ");
	let shadow = cfg.shadow;
	
	let textcfg = {
		text: cfg.text,
		font: font,
		color: cfg.color,
		shadow: shadow?{ // 阴影
			offsetX: cfg.shadow.offsetX? cfg.shadow.offsetX * zoomfactor : cfg.shadow.offsetX,
			offsetY: cfg.shadow.offsetY? cfg.shadow.offsetY * zoomfactor : cfg.shadow.offsetY,
			blur: cfg.shadow.blur? cfg.shadow.blur * zoomfactor : cfg.shadow.blur,
			color: cfg.shadow.color,
		}:undefined,
		strokeWidth: cfg.strokeWidth? cfg.strokeWidth * zoomfactor : 1,
		strokeColor: cfg.strokeColor,
		background: cfg.background,
		isCommon: cfg.isCommon,
		space: cfg.space? cfg.space * zoomfactor : 0,
		lineHeight: cfg.lineHeight? cfg.lineHeight * zoomfactor : 0,
		textAlign: cfg.textAlign,
		isPowerOfTwo: cfg.isPowerOfTwo,
		factor: cfg.factor?cfg.factor : 1,
		hfactor: cfg.hfactor? cfg.hfactor : 1,
		zoomfactor: zoomfactor,
		width: cfg.width ? cfg.width * zoomfactor : cfg.width,
		maxBlur: 10 * zoomfactor,
		key: cfg.key
	}

	imgLimitWidth = 512 * zoomfactor;

	return textcfg as ImgTextCfg;
}

/**
 * @description 绘制文字
 * @example
 */
 export const drawText = (textcfg: ImgTextCfg): any => {
	let cfg:ImgTextCfg = initTextCfg(textcfg);

	var canvas = document.createElement('canvas');
	calcText(cfg);

	canvas.width = cfg.width;
	canvas.height = cfg.height;
	let ctx = canvas.getContext('2d');
	ctx.font = cfg.fontCfg.font;
	ctx.textBaseline = "top";
	if (cfg.background) {
		ctx.fillStyle = getStyle(ctx, cfg.background, 0, 0, cfg.width, cfg.height);
		ctx.fillRect(0, 0, cfg.width, cfg.height);
	}
	if (cfg.strokeColor) {
		ctx.save();
		setShadow(ctx, cfg.shadow);
		ctx.lineWidth = cfg.strokeWidth;
		ctx.strokeStyle = getStyle(ctx, cfg.strokeColor, 0, 0, cfg.width, cfg.height);
		if (isErgodicDraw(cfg)) {
			let arr = cfg.chars;
			if (isString(ctx.strokeStyle)) {
				for (let i = 0; i < arr.length; i++) {
					let uv = cfg.charUV[ cfg.isCommon?arr[i]:i ];
					ctx.strokeText(arr[i], cfg.offsetX + uv.u1, cfg.offsetY + uv.v1);
				}
			} else {
				for (let i = 0; i < arr.length; i++) {
					let uv = cfg.charUV[ cfg.isCommon?arr[i]:i ];
					ctx.strokeStyle = getStyle(ctx, cfg.strokeColor, uv.u1, uv.v1, uv.u2 - uv.u1, uv.v2 - uv.v1);
					ctx.strokeText(arr[i], cfg.offsetX + uv.u1, cfg.offsetY + uv.v1);
				}
			}
		} else
			ctx.strokeText(cfg.text, cfg.offsetX, cfg.offsetY);
	}
	if (cfg.color) {
		if (!cfg.strokeColor)
			setShadow(ctx, cfg.shadow);
		else
			ctx.restore();
		ctx.fillStyle = getStyle(ctx, cfg.color, 0, 0, cfg.width, cfg.height);
		if (isErgodicDraw(cfg)) {
			let arr = cfg.chars;
			if (isString(ctx.fillStyle)) {
				for (let i = 0; i < arr.length; i++) {
					let uv = cfg.charUV[ cfg.isCommon?arr[i]:i ];
					ctx.fillText(arr[i], cfg.offsetX + uv.u1, cfg.offsetY + uv.v1);
				}
			} else {
				for (let i = 0; i < arr.length; i++) {
					let uv = cfg.charUV[ cfg.isCommon?arr[i]:i ];
					ctx.fillStyle = getStyle(ctx, cfg.color, uv.u1, uv.v1, uv.u2 - uv.u1, uv.v2 - uv.v1);
					ctx.fillText(arr[i], cfg.offsetX + uv.u1, cfg.offsetY + uv.v1);
				}
			}
		} else
			ctx.fillText(cfg.text, cfg.offsetX, cfg.offsetY);
	}
	return [canvas, ctx.getImageData(0, 0, cfg.width, cfg.height).data.buffer, cfg];
}

// 获得对应的图像键
export const getImgFilterKey = (cfg: ImgFilterCfg): string => {
	if(!cfg.file)
		cfg.file = butil.relativePath(cfg.img, cfg.path);
	let key = RES_TYPE_IMGFILTER + ":" + cfg.file;
	for(let f of cfg.arr)
		key += "| " + f.join(":");
	return key;
}

/**
 * @description 绘制图片
 * @example
 */
export const drawImg = (img:HTMLImageElement): ArrayBuffer => {
	var canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	let ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	return ctx.getImageData(0, 0, img.width, img.height).data.buffer;
}
// ============================== 本地
// 图像最大宽度
let imgLimitWidth = 512;

// 字体粗细的数值
const WeightNumber = {
	lighter: 100,
	normal: 400,
	bold: 700,
	bolder: 900
};

/**
 * @description ImgTextRes资源
 * @example
 */
class ImgRes extends Res {
	/**
	 * @description 创建
	 * @example
	 */
	create(data: any): void {
		let blob = new Blob([data], { type: BlobType["png"] });
		this.link = URL.createObjectURL(blob);
	}
	/**
	 * @description 销毁，需要子类重载
	 * @example
	 */
	destroy(): void {
		URL.revokeObjectURL(this.link);
	}
}
// canvas
let canvas: HTMLCanvasElement;

// 图像模块的名称
let imgModName = butil.relativePath("./img", module.id);

const isErgodicDraw = (cfg: ImgTextCfg) => {
	if(cfg.isCommon || cfg.space !== undefined || (!cfg.textAlign && cfg.textAlign !== "left") || cfg.totalW > cfg.width)
		return true;
	else
		return false;
}

// 初始化canvas方法
const init = (): CanvasRenderingContext2D => {
	if (!canvas) {
		canvas = document.createElement('canvas');
		canvas.width = 16;
		canvas.height = 16;
	}
	return canvas.getContext('2d');
}

// 获得颜色的字符串键
const colorString = (color: string | GradientCfg): string => {
	if (!color)
		return "";
	if (isString(color))
		return color as string;
	let cfg = color as GradientCfg;
	return cfg.x1 + "x" + cfg.y1 + "x" + (cfg.r1 ? cfg.r1 : "") + " " + cfg.x2 + "x" + cfg.y2 + "x" + (cfg.r2 ? cfg.r1 : "") + " [" + cfg.steps.join() + "]";
}
// 获得阴影的字符串键
const shadowString = (shadow: any): string => {
	if (!shadow)
		return "";
	return shadow.offsetX + "x" + shadow.offsetY + "x" + shadow.blur + "x" + shadow.color;
}

// 初始化计算宽度方法
const initWidth = (cfg: ImgTextCfg): CanvasRenderingContext2D => {
	let ctx = init();
	if (!cfg.fontCfg)
		cfg.fontCfg = parseFont(cfg.font);
	ctx.font = cfg.fontCfg.font;
	return ctx;
}

// 获取颜色或渐变颜色
const getStyle = (ctx: CanvasRenderingContext2D, cfg: any, x: number, y: number, width, height): CanvasGradient | string => {
	if (isString(cfg))
		return cfg;
	let x1 = cfg.x1;
	if (!Number.isInteger(x1))
		x1 = parseFloat(x1) * width / 100;
	let y1 = cfg.y1;
	if (!Number.isInteger(y1))
		y1 = parseFloat(y1) * height / 100;
	let x2 = cfg.x2;
	if (!Number.isInteger(x2))
		x2 = parseFloat(x2) * width / 100;
	let y2 = cfg.y2;
	if (!Number.isInteger(y2))
		y2 = parseFloat(y2) * height / 100;
	let g = cfg.r1 ? ctx.createRadialGradient(x + x1, y + y1, cfg.r1, x + x2, y + y2, x + cfg.r2) : ctx.createLinearGradient(x + x1, y + y1, x + x2, y + y2);
	for (let i = 0, arr = cfg.steps, n = arr.length; i < n; i += 2)
		g.addColorStop(arr[i] as number, arr[i + 1] as string);
	return g;
}
// 设置阴影
const setShadow = (ctx: CanvasRenderingContext2D, cfg: any): void => {
	if (!cfg)
		return;
	ctx.shadowOffsetX = cfg.offsetX;
	ctx.shadowOffsetY = cfg.offsetY;
	ctx.shadowBlur = cfg.blur;
	ctx.shadowColor = cfg.color;
}

// 创建ImgTextRes资源
const createImgTextRes = (name: string, type: string, args: ImgTextCfg, funcArgs: any) => {
	task(() => {
		let text = drawText(args);
		let ab = text[1];
		let cfg = text[2];

		request("calc", imgModName, "png", [ab, cfg.width, cfg.height], [ab], 900, 0, (r) => {
			loadOK(name, type, cfg, ImgRes, r);
		}, (err) => {
			loadError(name, err);
		});
	}, undefined, 900, 0);
}
// 创建ImgFilterRes资源
const createImgFilterRes = (name: string, type: string, args: ImgFilterCfg, resTab: ResTab) => {
	let file = args.file || butil.relativePath(args.img, args.path);
	resTab.load(RES_TYPE_BLOB+":"+file, RES_TYPE_BLOB, file, undefined, (r)=>{
		let img = new Image();
		img.onload = () => {
			if(img.width < 1 || img.height < 1)
				return loadError(name, {
					error: "INVALID_IMAGE",
					reason: "createImgFilterRes fail: " + file
				});
			task(() => {
				let ab = drawImg(img);
				request("calc", imgModName, "filter", [ab, img.width, img.height, args.arr], [ab], 900, 0, (r) => {
					loadOK(name, type, args, ImgRes, r);
				}, (err) => {
					loadError(name, err);
				});
			}, undefined, 900, 0);
		};
		img.src = r.link;
	});
}
// ============================== 立即执行
register(RES_TYPE_IMGTEXT, createImgTextRes);
register(RES_TYPE_IMGFILTER, createImgFilterRes);
