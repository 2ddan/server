
export enum PSCurveMode {
	Constant = 0,
	Curve = 1,
	TwoCurves = 2,
	TwoConstants = 3
};

class Keyframe {
	inTangent: number;
	outTangent: number;
	time: number;
	value: number;

	constructor(config) {
		this.inTangent = config.inTangent;
		this.outTangent = config.outTangent;
		this.time = config.time;
		this.value = config.value;
	}
};

class AnimationCurve {
	keys: Keyframe[];

	constructor(config) {
		this.keys = [];
		for (let i = 0; i < config.keys.length; ++i) {
			this.keys[i] = new Keyframe(config.keys[i]);
		}
	}

	getValue(time: number) {

		let i = 0;
		for (i = 0; i < this.keys.length; ++i) {
			let k = this.keys[i];
			if (k.time >= time) break;
		}

		if (i === 0) {
			return this.keys.length > 0 ? this.keys[0].value : 0.0;
		} else if (i === this.keys.length) {
			return this.keys.length > 0 ? this.keys[this.keys.length - 1].value : 0.0;
		}

		let { time: t0, value: v0, outTangent: m0 } = this.keys[i - 1];
		
		let { time: t1, value: v1, inTangent: m1 } = this.keys[i];
		
		// 有一个是inf或者-inf，都要按阶梯函数处理
		if (m0 === Infinity || m0 === -Infinity || m1 === Infinity || m1 === -Infinity) {
			return v0;
		}

		let dt = t1 - t0;
		let x = (time - t0) / dt;
		let x2 = x * x;
		let x3 = x * x2;

		let h1 = 2 * x3 - 3 * x2 + 1;
		let h2 = x3 - 2 * x2 + x;
		let h3 = -2 * x3 + 3 * x2;
		let h4 = x3 - x2;

		let result = h1 * v0 + dt * h2 * m0 + h3 * v1 + dt * h4 * m1;
		
		return result;
	}	
};

class ConstantImpl implements IMinMaxCurve {
	constant: number;

	constructor(constant: number) {
		this.constant = constant;
	}

	getValue(time: number, random?: number) {
		return this.constant;
	}
};

class TwoConstantsImpl implements IMinMaxCurve {
	min: number;
	max: number;
	
	constructor(min: number, max: number) {
		this.min = min;
		this.max = max;
	}

	getValue(time: number, random?: number) {
		if (random === undefined) {
			random = Math.random();
		}
		return this.min + random * (this.max - this.min);
	}
};

class CurveImpl implements IMinMaxCurve {
	curve: AnimationCurve;

	constructor(config) {
		this.curve = new AnimationCurve(config);
	}

	getValue(time: number, random?: number) {
		return this.curve.getValue(time);
	}
};

class TwoCurvesImpl implements IMinMaxCurve {
	curveMin: AnimationCurve;
	curveMax: AnimationCurve;

	constructor(minConfig, maxConfig) {
		this.curveMin = new AnimationCurve(minConfig);
		this.curveMax = new AnimationCurve(maxConfig);
	}

	getValue(time: number, random?: number) {
		let min = this.curveMin.getValue(time);
		let max = this.curveMax.getValue(time);
		if (random === undefined) {
			random = Math.random();
		}
		return min + random * (max - min);
	}
};

/**
 * 曲线取值
 */
export interface IMinMaxCurve {
	getValue(time: number, random?: number): number;
};

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
		case PSCurveMode.Curve:
			result = new TwoCurvesImpl(config.curveMin, config.curveMax);
			break;
		default:
			break;
	}
	return result;
}