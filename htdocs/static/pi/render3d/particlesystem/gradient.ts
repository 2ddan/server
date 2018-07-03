/**
 * 
 */
import { randomFloat } from '../../util/math';
import { THREE } from '../three';

/**
 * alpha 在0，1之间
 */
interface GradientAlphaKey {
	alpha: number;
	time: number;
}

export enum GradientMode {
	Blend = 0,
	Fixed = 1
}

export enum PSGradientMode {
	Color = 0,
	Gradient = 1,
	TwoColors = 2,
	TwoGradients = 3,
	RandomColor = 4
}

/**
 * r, g, b 在0，1之间
 */
class GradientColorKey {
	public time: number;
	public color: {
		r: number;
		g: number;
		b: number;
	};
}

const lerpNum = (n1: number, n2: number, k: number) => {
	return k * n2 + (1 - k) * n1;
};

const lerpColor = (c: THREE.Color, c1: GradientColorKey, c2: GradientColorKey, k: number) => {
	c.r = k * c2.color.r + (1 - k) * c1.color.r;
	c.g = k * c2.color.g + (1 - k) * c1.color.g;
	c.b = k * c2.color.b + (1 - k) * c1.color.b;
};

const getAlpha = (time: number, keys: GradientAlphaKey[]) => {
	let i;
	let result;
	for (i = 0; i < keys.length; ++i) {
		if (keys[i].time > time) {
			break;
		}
	}

	if (i === 0) {
		result = keys[0].alpha;
	} else if (i === keys.length) {
		result = keys[keys.length - 1].alpha;
	} else {
		// 数组至少有两个元素，而且i肯定有前一个元素
		const k = (time - keys[i - 1].time) / (keys[i].time - keys[i - 1].time);
		result = lerpNum(keys[i - 1].alpha, keys[i].alpha, k);
	}

	return result;
};

const getColor = (color: THREE.Color, time: number, keys: GradientColorKey[]) => {
	let i;
	for (i = 0; i < keys.length; ++i) {
		if (keys[i].time > time) {
			break;
		}
	}

	if (i === 0) {
		color.r = keys[0].color.r;
		color.g = keys[0].color.g;
		color.b = keys[0].color.b;
	} else if (i === keys.length) {
		color.r = keys[keys.length - 1].color.r;
		color.g = keys[keys.length - 1].color.g;
		color.b = keys[keys.length - 1].color.b;
	} else {
		// 数组至少有两个元素，而且i肯定有前一个元素
		const k = (time - keys[i - 1].time) / (keys[i].time - keys[i - 1].time);
		lerpColor(color, keys[i - 1], keys[i], k);
	}
};

class Gradient {
	public mode: GradientMode;
	public alphaKeys: GradientAlphaKey[];
	public colorKeys: GradientColorKey[];

	constructor(config: any) {
		this.mode = config.mode;

		this.alphaKeys = [];
		for (let i = 0; i < config.alphaKeys.length; ++i) {
			this.alphaKeys.push(config.alphaKeys[i]);
		}

		this.colorKeys = [];
		for (let i = 0; i < config.colorKeys.length; ++i) {

			this.colorKeys.push(config.colorKeys[i]);
		}
	}

	public getValue(c: THREE.Color, time: number) {
		getColor(c, time, this.colorKeys);
		c.a = getAlpha(time, this.alphaKeys);
	}
}

// tslint:disable-next-line:interface-name
export interface IMinMaxGradient {

	getValue(c: THREE.Color, time: number, randoms?: number[]): void;

}

class ColorImpl implements IMinMaxGradient {

	public color: THREE.Color;

	constructor(color: any) {

		this.color = new THREE.Color(0);

		this.color.setRGBA(color.r, color.g, color.b, color.a);

	}

	public getValue(c: THREE.Color, time: number, randoms?: number[]) {

		c.setRGBA(this.color.r, this.color.g, this.color.b, this.color.a);

	}

}

// tslint:disable:max-classes-per-file
class TwoColorImpl implements IMinMaxGradient {

	public colorMin: THREE.Color;

	public colorMax: THREE.Color;

	constructor(min: any, max: any) {

		this.colorMin = new THREE.Color(0);

		this.colorMax = new THREE.Color(0);

		this.colorMin.setRGBA(min.r, min.g, min.b, min.a);

		this.colorMax.setRGBA(max.r, max.g, max.b, max.a);

	}

	public getValue(c: THREE.Color, time: number, randoms?: number[]) {

		if (randoms === undefined) {

			randoms = [Math.random(), Math.random(), Math.random(), Math.random()];

		}

		c.setRGBA(

			this.colorMin.r + randoms[0] * (this.colorMax.r - this.colorMin.r),

			this.colorMin.g + randoms[1] * (this.colorMax.g - this.colorMin.g),

			this.colorMin.b + randoms[2] * (this.colorMax.b - this.colorMin.b),

			this.colorMin.a + randoms[3] * (this.colorMax.a - this.colorMin.a));

	}

}

class RandomColorImpl implements IMinMaxGradient {

	public getValue(c: THREE.Color, time: number, randoms?: number[]) {

		if (randoms === undefined) {

			randoms = [Math.random(), Math.random(), Math.random(), Math.random()];

		}

		c.a = randoms[0];

		c.r = randoms[1];

		c.g = randoms[2];

		c.b = randoms[3];

	}

}

class GradientImpl implements IMinMaxGradient {

	public gradient: Gradient;

	// tslint:disable-next-line:typedef
	constructor(config) {

		this.gradient = new Gradient(config);

	}

	public getValue(c: THREE.Color, time: number, randoms?: number[]) {

		this.gradient.getValue(c, time);

	}

}

class TwoGradientImpl implements IMinMaxGradient {
	// tslint:disable-next-line:typedef
	public static min = new THREE.Color(0);

	// tslint:disable-next-line:typedef
	public static max = new THREE.Color(0);

	public gradientMax: Gradient;

	public gradientMin: Gradient;

	// tslint:disable-next-line:typedef
	constructor(min, max) {

		this.gradientMin = new Gradient(min);

		this.gradientMax = new Gradient(max);

	}

	public getValue(c: THREE.Color, time: number, randoms?: number[]) {

		const min = TwoGradientImpl.min;

		const max = TwoGradientImpl.max;

		this.gradientMin.getValue(min, time);

		this.gradientMax.getValue(max, time);

		if (randoms === undefined) {

			randoms = [Math.random(), Math.random(), Math.random(), Math.random()];

		}

		c.setRGBA(

			min.r + randoms[0] * (max.r - min.r),

			min.g + randoms[1] * (max.g - min.g),

			min.b + randoms[2] * (max.b - min.b),

			min.a + randoms[3] * (max.a - min.a));

	}

}

export const buildMinMaxGradient = config => {

	let result: IMinMaxGradient;

	switch (config.mode) {

		case PSGradientMode.Color:

			result = new ColorImpl(config.color);

			break;

		case PSGradientMode.TwoColors:

			result = new TwoColorImpl(config.colorMin, config.colorMax);

			break;

		case PSGradientMode.RandomColor:

			result = new RandomColorImpl();

			break;

		case PSGradientMode.Gradient:

			result = new GradientImpl(config.gradient);

			break;

		case PSGradientMode.TwoGradients:

			result = new TwoGradientImpl(config.gradientMin, config.gradientMax);

			break;

		default:
	}

	return result;

};