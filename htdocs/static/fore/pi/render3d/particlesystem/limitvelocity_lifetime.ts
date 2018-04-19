
import { PSSimulationSpace } from "./util"
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"


/**
 * TODO: 因为没法理解分轴计算时候的限速行为，所以暂时不提供分轴计算
 */
export class LimitVelocityOverLifetimeModule {
	dampen: number;

	limit: IMinMaxCurve;
	limitMultiplier: number;

	/** 暂时不实现 */
	
	limitX: IMinMaxCurve;
	limitXMultiplier: number;
	limitY: IMinMaxCurve;
	limitYMultiplier: number;
	limitZ: IMinMaxCurve;
	limitZMultiplier: number;
	separateAxes: boolean;
	space: PSSimulationSpace;  // 只实现World

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
};

