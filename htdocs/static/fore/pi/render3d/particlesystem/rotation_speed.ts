
import {THREE} from "../three";
import { IMinMaxCurve, buildMinMaxCurve } from "./curve";

export class RotationBySpeedModule {
	range: THREE.Vector2;
	separateAxes: boolean;
	x: IMinMaxCurve;
	xMultiplier: number;
	y: IMinMaxCurve;
	yMultiplier: number;
	z: IMinMaxCurve;
	zMultiplier: number;

	constructor(config) {
		this.range = new THREE.Vector2(config.range.x, config.range.y);
		this.separateAxes = config.separateAxes;
		this.x = buildMinMaxCurve(config.x);
		this.xMultiplier = config.xMultiplier;
		this.y = buildMinMaxCurve(config.y);
		this.yMultiplier = config.yMultiplier;
		this.z = buildMinMaxCurve(config.z);
		this.zMultiplier = config.zMultiplier;
	}
};