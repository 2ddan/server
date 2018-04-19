

import { IMinMaxCurve, buildMinMaxCurve } from "./curve"
import { PSSimulationSpace } from "./util"


export class VelocityOverLifetimeModule {
	space: PSSimulationSpace;  // 不实现localspace
	x: IMinMaxCurve;
	xMultiplier: number;
	y: IMinMaxCurve;
	yMultiplier: number;
	z: IMinMaxCurve;
	zMultiplier: number;

	constructor(config) {
		this.space = config.space;
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
};