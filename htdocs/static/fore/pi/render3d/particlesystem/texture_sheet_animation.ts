
import { IMinMaxCurve, buildMinMaxCurve } from "./curve";

export enum PSAnimationType {
	WholeSheet = 0,
	SingleRow = 1
};

enum UVChannelFlags {
	UV0 = 1,
	UV1 = 2,
	UV2 = 4,
	UV3 = 8
};

export class TextureSheetAnimationModule {
	animation: PSAnimationType;
	cycleCount: number;

	flipU: number;
	flipV: number;
	frameOverTime: IMinMaxCurve;
	frameOverTimeMultiplier: number;
	numTilesX: number;
	numTilesY: number;
	rowIndex: number;
	startFrame: IMinMaxCurve;
	startFrameMultiplier: number;
	useRandomRow: boolean;
	uvChannelMask: UVChannelFlags;

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
};
