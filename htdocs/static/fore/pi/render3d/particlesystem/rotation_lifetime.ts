
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"

export class RotationOverLifetimeModule {
	separateAxes: boolean;
	x: IMinMaxCurve;
	xMultiplier: number;
	y: IMinMaxCurve;
	yMultiplier: number;
	z: IMinMaxCurve;
	zMultiplier: number;

	constructor(config) {
		this.separateAxes = config.separateAxes;
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
};
