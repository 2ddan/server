
/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';

export class SizeOverLifetimeModule {
	public separateAxes: boolean;
	public size: IMinMaxCurve;
	public sizeMultiplier: number;
	public x: IMinMaxCurve;
	public xMultiplier: number;
	public y: IMinMaxCurve;
	public yMultiplier: number;
	public z: IMinMaxCurve;
	public zMultiplier: number;

	// tslint:disable-next-line:typedef
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
}
