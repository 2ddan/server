/**
 * 
 */

import { buildMinMaxCurve, IMinMaxCurve } from './curve';
import { PSSimulationSpace } from './util';

export class VelocityOverLifetimeModule {
	public space: PSSimulationSpace;  // 不实现localspace
	public x: IMinMaxCurve;
	public xMultiplier: number;
	public y: IMinMaxCurve;
	public yMultiplier: number;
	public z: IMinMaxCurve;
	public zMultiplier: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.space = config.space;
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
}