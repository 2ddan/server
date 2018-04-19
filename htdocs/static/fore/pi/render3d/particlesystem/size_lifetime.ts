

import { IMinMaxCurve, buildMinMaxCurve } from "./curve"

export class SizeOverLifetimeModule {
	separateAxes: boolean;
	size: IMinMaxCurve;
	sizeMultiplier: number;
	x: IMinMaxCurve;
	xMultiplier: number;
	y: IMinMaxCurve;
	yMultiplier: number;
	z: IMinMaxCurve;
	zMultiplier: number;

	constructor(config) {
		this.separateAxes = config.separateAxes;
		this.size = buildMinMaxCurve(config.size);
		this.sizeMultiplier = config.sizeMultiplier;
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
};
