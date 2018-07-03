/** 
 * 
 */
export class ExternalForcesModule {
	public multiplier: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.multiplier = config.multiplier;
	}
}