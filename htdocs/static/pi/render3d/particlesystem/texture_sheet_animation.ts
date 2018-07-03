/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';

export enum PSAnimationType {
	WholeSheet = 0,
	SingleRow = 1
}

enum UVChannelFlags {
	UV0 = 1,
	UV1 = 2,
	UV2 = 4,
	UV3 = 8
}

export class TextureSheetAnimationModule {
	public animation: PSAnimationType;
	public cycleCount: number;

	public flipU: number;
	public flipV: number;
	public frameOverTime: IMinMaxCurve;
	public frameOverTimeMultiplier: number;
	public numTilesX: number;
	public numTilesY: number;
	public rowIndex: number;
	public startFrame: IMinMaxCurve;
	public startFrameMultiplier: number;
	public useRandomRow: boolean;
	public uvChannelMask: UVChannelFlags;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.animation = config.animation;
		this.cycleCount = config.cycleCount;

		this.flipU = config.flipU;
		this.flipV = config.flipV;
		this.frameOverTime = buildMinMaxCurve(config.frameOverTime);
		this.frameOverTimeMultiplier = config.frameOverTimeMultiplier;
		this.numTilesX = config.numTilesX;
		this.numTilesY = config.numTilesY;
		this.rowIndex = config.rowIndex;
		this.startFrame = buildMinMaxCurve(config.startFrame);
		this.startFrameMultiplier = config.startFrameMultiplier;
		this.useRandomRow = config.useRandomRow;
		this.uvChannelMask = config.uvChannelMask;
	}
}
