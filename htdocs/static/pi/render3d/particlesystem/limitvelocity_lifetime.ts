/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';
import { PSSimulationSpace } from './util';

/**
 * TODO: 因为没法理解分轴计算时候的限速行为，所以暂时不提供分轴计算
 */
export class LimitVelocityOverLifetimeModule {
	public dampen: number;

	public limit: IMinMaxCurve;
	public limitMultiplier: number;

	/**  
	 * 暂时不实现 
	 */
	
	public limitX: IMinMaxCurve;
	public limitXMultiplier: number;
	public limitY: IMinMaxCurve;
	public limitYMultiplier: number;
	public limitZ: IMinMaxCurve;
	public limitZMultiplier: number;
	public separateAxes: boolean;
	public space: PSSimulationSpace;  // 只实现World

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.dampen = config.dampen;
		this.limit = buildMinMaxCurve(config.limit);
		this.limitMultiplier = config.limitMultiplier;
		this.limitX = buildMinMaxCurve(config.limitX);
		this.limitXMultiplier = config.limitXMultiplier;
		this.limitY = buildMinMaxCurve(config.limitY);
		this.limitYMultiplier = config.limitYMultiplier;
		this.limitZ = buildMinMaxCurve(config.limitZ);
		this.limitZMultiplier = config.limitZMultiplier;
		this.separateAxes = config.separateAxes;
		this.space = config.space;
	}
}
