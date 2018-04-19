
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"
import { PSSimulationSpace } from "./util"

export class ForceOverLifetimeModule {

	randomized: boolean;
	space: PSSimulationSpace;
	x: IMinMaxCurve;
	xMultiplier: number;
	y: IMinMaxCurve;
	yMultiplier: number;
	z: IMinMaxCurve;
	zMultiplier: number;

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
};