/**
 * 
 */
export enum PSCurveMode {
	Constant = 0,
	Curve = 1,
	TwoCurves = 2,
	TwoConstants = 3
}

class Keyframe {
	public inTangent: number;
	public outTangent: number;
	public time: number;
	public value: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.inTangent = config.inTangent;
		this.outTangent = config.outTangent;
		this.time = config.time;
		this.value = config.value;
	}
}

class AnimationCurve {
	public keys: Keyframe[];

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.keys = [];
		for (let i = 0; i < config.keys.length; ++i) {
			this.keys[i] = new Keyframe(config.keys[i]);
		}
	}

	public getValue(time: number) {

		let i = 0;
		for (i = 0; i < this.keys.length; ++i) {
			const k = this.keys[i];
			if (k.time >= time) break;
		}

		if (i === 0) {
			return this.keys.length > 0 ? this.keys[0].value : 0.0;
		} else if (i === this.keys.length) {
			return this.keys.length > 0 ? this.keys[this.keys.length - 1].value : 0.0;
		}

		const { time: t0, value: v0, outTangent: m0 } = this.keys[i - 1];

		const { time: t1, value: v1, inTangent: m1 } = this.keys[i];

		// 有一个是inf或者-inf，都要按阶梯函数处理
		if (m0 === Infinity || m0 === -Infinity || m1 === Infinity || m1 === -Infinity) {
			return v0;
		}

		const dt = t1 - t0;
		const x = (time - t0) / dt;
		const x2 = x * x;
		const x3 = x * x2;

		const h1 = x3 * 2 - x2 * 3 + 1;
		const h2 = x3 - x2 * 2 + x;
		const h3 =  x3 * -2 +  x2 * 3;
		const h4 = x3 - x2;

		const result = h1 * v0 + dt * h2 * m0 + h3 * v1 + dt * h4 * m1;

		return result;
	}
}

class ConstantImpl implements IMinMaxCurve {
	public constant: number;

	constructor(constant: number) {
		this.constant = constant;
	}

	public getValue(time: number, random?: number) {
		return this.constant;
	}
}

// tslint:disable:max-classes-per-file
class TwoConstantsImpl implements IMinMaxCurve {
	public min: number;
	public max: number;

	constructor(min: number, max: number) {
		this.min = min;
		this.max = max;
	}

	public getValue(time: number, random?: number) {
		if (random === undefined) {
			random = Math.random();
		}

		return this.min + random * (this.max - this.min);
	}
}

class CurveImpl implements IMinMaxCurve {
	public curve: AnimationCurve;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.curve = new AnimationCurve(config);
	}

	public getValue(time: number, random?: number) {
		return this.curve.getValue(time);
	}
}

class TwoCurvesImpl implements IMinMaxCurve {
	public curveMin: AnimationCurve;
	public curveMax: AnimationCurve;

	// tslint:disable-next-line:typedef
	constructor(minConfig, maxConfig) {
		this.curveMin = new AnimationCurve(minConfig);
		this.curveMax = new AnimationCurve(maxConfig);
	}

	public getValue(time: number, random?: number) {
		const min = this.curveMin.getValue(time);
		const max = this.curveMax.getValue(time);
		if (random === undefined) {
			random = Math.random();
		}

		return min + random * (max - min);
	}
}

/**
 * 曲线取值
 */
// tslint:disable-next-line:interface-name
export interface IMinMaxCurve {
	getValue(time: number, random?: number): number;
}

/**
 * 构建曲线取值
 */
export const buildMinMaxCurve = config => {
	let result: IMinMaxCurve;
	switch (config.mode) {
		case PSCurveMode.Constant:
			result = new ConstantImpl(config.constant);
			break;
		case PSCurveMode.TwoConstants:
			result = new TwoConstantsImpl(config.constantMin, config.constantMax);
			break;
		case PSCurveMode.Curve:
			result = new CurveImpl(config.curve);
			break;
		// tslint:disable-next-line:no-duplicate-switch-case
		case PSCurveMode.Curve:
			result = new TwoCurvesImpl(config.curveMin, config.curveMax);
			break;
		default:
	}

	return result;
};