
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"

enum PSInheritVelocityMode {
	Initial = 0,
	Current = 1
};

export class InheritVelocityModule {
	curve: IMinMaxCurve;
	curveMultiplier: number;

	mode: PSInheritVelocityMode;

	constructor(config) {
		this.mode = config.mode;
		this.curve = buildMinMaxCurve(config.curve);
		this.curveMultiplier = config.curveMultiplier;
	}
};
