/**
 * 
 */
import { buildMinMaxGradient, IMinMaxGradient } from './gradient';

export class ColorOverLifetimeModule {
	public color: IMinMaxGradient;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.color = buildMinMaxGradient(config.color);
	}
}