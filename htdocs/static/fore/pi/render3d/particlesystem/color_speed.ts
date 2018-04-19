
import { THREE } from "../three";
import { IMinMaxGradient, buildMinMaxGradient } from "./gradient";

export class ColorBySpeedModule {
	range: THREE.Vector2;
	color: IMinMaxGradient;

	constructor(config) {
		this.range = new THREE.Vector2(config.range.x, config.range.y);
		this.color = buildMinMaxGradient(config.color);
	}
}