
import { IMinMaxGradient, buildMinMaxGradient } from "./gradient"

export class ColorOverLifetimeModule {
	color: IMinMaxGradient;

	constructor(config) {
		this.color = buildMinMaxGradient(config.color);
	}
};