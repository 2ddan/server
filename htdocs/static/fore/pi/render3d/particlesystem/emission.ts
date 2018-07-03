/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';

class Burst {
	public time: number;
	public maxCount: number;
	public minCount: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.time = config.time;
		this.minCount = config.minCount;
		this.maxCount = config.maxCount;
	}
}

export class EmissionModule {
	public bursts: Burst[];
	public rateOverDistance: IMinMaxCurve;
	public rateOverDistanceMultiplier: number;
	public rateOverTime: IMinMaxCurve;
	public rateOverTimeMultiplier: number;

	public lastTime: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.lastTime = 0;
		this.rateOverDistance = buildMinMaxCurve(config.rateOverDistance);
		this.rateOverDistanceMultiplier = config.rateOverDistanceMultiplier;

		this.rateOverTime = buildMinMaxCurve(config.rateOverTime);
		this.rateOverTimeMultiplier = config.rateOverTimeMultiplier;

		this.bursts = [];
		for (let i = 0; i < config.bursts.length; ++i) {
			this.bursts.push(new Burst(config.bursts[i]));
		}
	}

	// 返回这次新创建的粒子的数量
	public update(time: number, playTime: number, maxCount: number) {
		let count = 0;
		for (let i = 0; i < this.bursts.length; ++i) {
			if (Math.abs(this.bursts[i].time - playTime) < 0.01) {
				count = this.bursts[i].minCount + Math.random() * (this.bursts[i].maxCount - this.bursts[i].minCount);
				count = Math.floor(count);
				break;
			}
		}
		
		if (this.lastTime === 0) {
			this.lastTime = time;
		}

		if (count === 0) {
			const v = this.rateOverTime.getValue(playTime);
			const delta = time - this.lastTime;
			count = Math.floor(v * delta);
			if (count >= 1) {
				this.lastTime = time;
			}
		}

		return count < maxCount ? count : maxCount;
	}
}