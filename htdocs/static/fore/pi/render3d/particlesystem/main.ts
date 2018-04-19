
import { IMinMaxCurve, buildMinMaxCurve } from "./curve"
import { IMinMaxGradient, buildMinMaxGradient } from "./gradient"
import { PSSimulationSpace } from "./util"

export enum PSScalingMode {
	Hierarchy = 0,
	Local = 1,
	Shape = 2
};

export class MainModule {
	duration: number;
	loop: boolean;
	prewarm: boolean;

	startDelay: IMinMaxCurve;
	startDelayMultiplier: number;

	startLifetime: IMinMaxCurve;
	startLifetimeMultiplier: number;

	startSpeed: IMinMaxCurve;
	startSpeedMultiplier: number;

	startSize3D: boolean;
	startSize: IMinMaxCurve;
	startSizeMultiplier: number;
	startSizeX: IMinMaxCurve;
	startSizeXMultiplier: number;
	startSizeY: IMinMaxCurve;
	startSizeYMultiplier: number;
	startSizeZ: IMinMaxCurve;
	startSizeZMultiplier: number;

	startRotation3D: boolean;
	startRotation: IMinMaxCurve;
	startRotationMultiplier: number;
	startRotationX: IMinMaxCurve;
	startRotationXMultiplier: number;
	startRotationY: IMinMaxCurve;
	startRotationYMultiplier: number;
	startRotationZ: IMinMaxCurve;
	startRotationZMultiplier: number;

	randomizeRotationDirection: number;

	startColor: IMinMaxGradient;

	gravityModifier: IMinMaxCurve;
	gravityModifierMultiplier: number;

	simulationSpace: PSSimulationSpace;
	// customSimulationSpace: Transform;

	simulationSpeed: number;

	scalingMode: PSScalingMode;
	playOnAwake: boolean;

	maxParticles: number;

	constructor(config) {
		this.duration = config.duration;
		this.loop = config.loop;
		this.prewarm = config.prewarm;

		this.startDelay = buildMinMaxCurve(config.startDelay);
		this.startDelayMultiplier = config.startDelayMultiplier;

		this.startLifetime = buildMinMaxCurve(config.startLifetime);
		this.startLifetimeMultiplier = config.startLifetimeMultiplier;

		this.startSpeed = buildMinMaxCurve(config.startSpeed);
		this.startSpeedMultiplier = config.startSpeedMultiplier;

		this.startSize3D = config.startSize3D;
		this.startSize = buildMinMaxCurve(config.startSize);
		this.startSizeMultiplier = config.startSizeMultiplier;
		this.startSizeX = buildMinMaxCurve(config.startSizeX);
		this.startSizeXMultiplier = config.startSizeXMultiplier;
		this.startSizeY = buildMinMaxCurve(config.startSizeY);
		this.startSizeYMultiplier = config.startSizeYMultiplier;
		this.startSizeZ = buildMinMaxCurve(config.startSizeZ);
		this.startSizeZMultiplier = config.startSizeZMultiplier;

		this.startRotation3D = config.startRotation3D;
		this.startRotation = buildMinMaxCurve(config.startRotation);
		this.startRotationMultiplier = config.startRotationMultiplier;
		this.startRotationX = buildMinMaxCurve(config.startRotationX);
		this.startRotationXMultiplier = config.startRotationXMultiplier;
		this.startRotationY = buildMinMaxCurve(config.startRotationY);
		this.startRotationYMultiplier = config.startRotationYMultiplier;
		this.startRotationZ = buildMinMaxCurve(config.startRotationZ);
		this.startRotationZMultiplier = config.startRotationZMultiplier;

		this.randomizeRotationDirection = config.randomizeRotationDirection;

		this.startColor = buildMinMaxGradient(config.startColor);

		this.gravityModifier = buildMinMaxCurve(config.gravityModifier);
		this.gravityModifierMultiplier = config.gravityModifierMultiplier;

		this.simulationSpace = config.simulationSpace;
		// this.customSimulationSpace = config.customSimulationSpace;

		this.simulationSpeed = config.simulationSpeed;
 
		this.scalingMode = config.scalingMode;
		this.playOnAwake = config.playOnAwake;

		this.maxParticles = config.maxParticles;
	}
};