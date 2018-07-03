/**
 * 
 */
import { THREE } from '../three';
import { buildMinMaxGradient, IMinMaxGradient } from './gradient';

export class ColorBySpeedModule {
	public range: THREE.Vector2;

	public color: IMinMaxGradient;

	// tslint:disable-next-line:typedef
	constructor(config) {

		this.range = new THREE.Vector2(config.range.x, config.range.y);

		this.color = buildMinMaxGradient(config.color);

	}

}