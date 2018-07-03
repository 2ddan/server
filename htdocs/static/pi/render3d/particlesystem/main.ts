/**
 * 
 */
import { buildMinMaxCurve, IMinMaxCurve } from './curve';
import { buildMinMaxGradient, IMinMaxGradient } from './gradient';
import { PSSimulationSpace } from './util';

export enum PSScalingMode {
	Hierarchy = 0,
	Local = 1,
	Shape = 2
}

export class MainModule {
	public duration: number;
	public loop: boolean;
	public prewarm: boolean;

	public startDelay: IMinMaxCurve;
	public startDelayMultiplier: number;

	public startLifetime: IMinMaxCurve;
	public startLifetimeMultiplier: number;

	public startSpeed: IMinMaxCurve;
	public startSpeedMultiplier: number;

	public startSize3D: boolean;
	public startSize: IMinMaxCurve;
	public startSizeMultiplier: number;
	public startSizeX: IMinMaxCurve;
	public startSizeXMultiplier: number;
	public startSizeY: IMinMaxCurve;
	public startSizeYMultiplier: number;
	public startSizeZ: IMinMaxCurve;
	public startSizeZMultiplier: number;

	public startRotation3D: boolean;
	public startRotation: IMinMaxCurve;
	public startRotationMultiplier: number;
	public startRotationX: IMinMaxCurve;
	public startRotationXMultiplier: number;
	public startRotationY: IMinMaxCurve;
	public startRotationYMultiplier: number;

	public startRotationZ: IMinMaxCurve;

	public startRotationZMultiplier: number;

	public randomizeRotationDirection: number;

	public startColor: IMinMaxGradient;

	public gravityModifier: IMinMaxCurve;

	public gravityModifierMultiplier: number;

	public simulationSpace: PSSimulationSpace;

	// customSimulationSpace: Transform;

	public simulationSpeed: number;

	public scalingMode: PSScalingMode;

	public playOnAwake: boolean;

	public maxParticles: number;

	// tslint:disable-next-line:typedef
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

}