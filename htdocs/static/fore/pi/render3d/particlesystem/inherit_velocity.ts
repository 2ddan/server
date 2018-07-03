/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';

enum PSInheritVelocityMode {
	Initial = 0,
	Current = 1
}

export class InheritVelocityModule {
	public curve: IMinMaxCurve;
	public curveMultiplier: number;

	public mode: PSInheritVelocityMode;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.mode = config.mode;
		this.curve = buildMinMaxCurve(config.curve);
		this.curveMultiplier = config.curveMultiplier;
	}
}
