
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"
import { THREE } from "../three"

export class SizeBySpeedModule {
	range: THREE.Vector2;
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
		this.range = new THREE.Vector2(config.range.x, config.range.y);
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
