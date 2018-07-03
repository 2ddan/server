/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';
import { PSSimulationSpace } from './util';

export class ForceOverLifetimeModule {

	public randomized: boolean;
	public space: PSSimulationSpace;
	public x: IMinMaxCurve;
	public xMultiplier: number;
	public y: IMinMaxCurve;
	public yMultiplier: number;
	public z: IMinMaxCurve;
	public zMultiplier: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.randomized = config.randomized;
		this.space = config.space;  // 只实现World
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
}