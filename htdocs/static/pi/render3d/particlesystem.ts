/** 
 * 
 */
enum TangentMode {
	Free = 0,
	Auto = 1,
	Linear = 2,
	Constant = 3,
	ClampedAuto = 4
}

interface Keyframe {
	inTangent: number;
	outTangent: number;
	tangentMode: TangentMode;
	time: number;
	value: number;
}

interface AnimationCurve {
	keys: Keyframe[];
}

interface Vector2 {
	x: number;
	y: number;
}

interface Vector3 {
	x: number;
	y: number;
	z: number;
}

interface Color32 {
	rgba: number;
}

interface Color {
	a: number;
	r: number;
	g: number;
	b: number;
}

interface Burst {
	maxCount: number;
	minCount: number;
	time: number;
}

enum ParticleSystemCollisionMode {
	Collision3D = 0,
	Collision2D = 1
}

enum ParticleSystemCollisionQuality {
	High = 0,
	Medium = 1,
	Low = 2
}

enum ParticleSystemCollisionType {
	Planes = 0,
	World = 1
}

enum ParticleSystemSimulationSpace {
	Local = 0,
	World = 1,
	Custom = 2
}

interface CollisionModule {
	bounce: MinMaxCurve;
	bounceMultiplier: number;
	collidesWith: number;
	dampen: MinMaxCurve;
	dampenMultiplier: number;
	enabled: boolean;
	enableDynamicColliders: boolean;
	enablenumbereriorCollisions: boolean;
	lifetimeLoss: MinMaxCurve;
	lifetimeLossMultiplier: number;
	maxCollisionShapes: number;
	maxKillSpeed: number;
	maxPlaneCount: number;
	minKillSpeed: number;
	mode: ParticleSystemCollisionMode;
	quality: ParticleSystemCollisionQuality;
	radiusScale: number;
	sendCollisionMessages: boolean;
	// tslint:disable-next-line:no-reserved-keywords
	type: ParticleSystemCollisionType;
	voxelSize: number;
}

interface ColorBySpeedModule {
	color: MinMaxGradient;
	enabled: boolean;
	range: Vector2;
}

interface ColorOverLifetimeModule {
	color: MinMaxGradient;
	enabled: boolean;
}

interface EmissionModule {
	burstCount: number;
	enabled: boolean;
	rateOverDistance: MinMaxCurve;
	rateOverDistanceMultiplier: number;
	rateOverTime: MinMaxCurve;
	rateOverTimeMultiplier: number;
}

interface EmitParams {
	angularVelocity: number;
	angularVelocity3D: Vector3;
	applyShapeToPosition: boolean;
	axisOfRotation: Vector3;
	position: Vector3;
	randomSeed: number;
	rotation: number;
	rotation3D: Vector3;
	startColor: Color32;
	startLifetime: number;
	startSize: number;
	startSize3D: Vector3;
	velocity: Vector3;
}

interface ExternalForcesModule {
	enabled: boolean;
	multiplier: number;
}

interface ForceOverLifetimeModule {
	enabled: boolean;
	randomized: boolean;
	space: ParticleSystemSimulationSpace;
	x: MinMaxCurve;
	xMultiplier: number;
	y: MinMaxCurve;
	yMultiplier: number;
	z: MinMaxCurve;
	zMultiplier: number;
}

enum ParticleSystemInheritVelocityMode {
	Initial = 0,
	Current = 1
}

interface InheritVelocityModule {
	curve: MinMaxCurve;
	curveMultiplier: number;
	enabled: boolean;
	mode: ParticleSystemInheritVelocityMode;
}

interface LightsModule {
	alphaAffectsnumberensity: boolean;
	enabled: boolean;
	numberensity: MinMaxCurve;
	numberensityMultiplier: number;
	// light: Light;
	maxLights: number;
	range: MinMaxCurve;
	rangeMultiplier: number;
	ratio: number;
	sizeAffectsRange: boolean;
	useParticleColor: boolean;
	useRandomDistribution: boolean;
}

interface LimitVelocityOverLifetimeModule {
	dampen: number;
	enabled: boolean;
	limit: MinMaxCurve;
	limitMultiplier: number;
	limitX: MinMaxCurve;
	limitXMultiplier: number;
	limitY: MinMaxCurve;
	limitYMultiplier: number;
	limitZ: MinMaxCurve;
	limitZMultiplier: number;
	separateAxes: boolean;
	space: ParticleSystemSimulationSpace;
}

enum ParticleSystemScalingMode {
	Hierarchy = 0,
	Local = 1,
	Shape = 2
}

interface Transform {
	position: Vector3;
	rotation: Vector3;
	scale: Vector3;
}

interface MainModule {
	customSimulationSpace: Transform;
	duration: number;
	gravityModifier: MinMaxCurve;
	gravityModifierMultiplier: number;
	loop: boolean;
	maxParticles: number;
	playOnAwake: boolean;
	prewarm: boolean;
	randomizeRotationDirection: number;
	scalingMode: ParticleSystemScalingMode;
	simulationSpace: ParticleSystemSimulationSpace;
	simulationSpeed: number;
	startColor: MinMaxGradient;
	startDelay: MinMaxCurve;
	startDelayMultiplier: number;
	startLifetime: MinMaxCurve;
	startLifetimeMultiplier: number;
	startRotation: MinMaxCurve;
	startRotation3D: boolean;
	startRotationMultiplier: number;
	startRotationX: MinMaxCurve;
	startRotationXMultiplier: number;
	startRotationY: MinMaxCurve;
	startRotationYMultiplier: number;
	startRotationZ: MinMaxCurve;
	startRotationZMultiplier: number;
	startSize: MinMaxCurve;
	startSize3D: boolean;
	startSizeMultiplier: number;
	startSizeX: MinMaxCurve;
	startSizeXMultiplier: number;
	startSizeY: MinMaxCurve;
	startSizeYMultiplier: number;
	startSizeZ: MinMaxCurve;
	startSizeZMultiplier: number;
	startSpeed: MinMaxCurve;
	startSpeedMultiplier: number;
}

enum ParticleSystemGradientMode {
	Color = 0,
	Gradient = 1,
	TwoColors = 2,
	TwoGradients = 3,
	RandomColor = 4
}

interface Gradient {
	alphaKeys: GradientAlphaKey[];
	colorKeys: GradientColorKey[];
	mode: GradientMode;
}

enum GradientMode {
	Blend = 0,
	Fixed = 1
}

interface GradientColorKey {
	color: Color;
	time: number;
}

interface GradientAlphaKey {
	alpha: number;
	time: number;
}

interface MinMaxGradient {
	color: Color;
	colorMax: Color;
	colorMin: Color;
	gradient: Gradient;
	gradientMax: Gradient;
	gradientMin: Gradient;
	mode: ParticleSystemGradientMode;
}

enum ParticleSystemNoiseQuality {
	Low = 0,
	Medium = 1,
	High = 2
}

interface NoiseModule {
	damping: boolean;
	enabled: boolean;
	frequency: number;
	octaveCount: number;
	octaveMultiplier: number;
	octaveScale: number;
	quality: ParticleSystemNoiseQuality;
	remap: MinMaxCurve;
	remapEnabled: boolean;
	remapMultiplier: number;
	remapX: MinMaxCurve;
	remapXMultiplier: number;
	remapY: MinMaxCurve;
	remapYMultiplier: number;
	remapZ: MinMaxCurve;
	remapZMultiplier: number;
	scrollSpeed: MinMaxCurve;
	scrollSpeedMultiplier: number;
	separateAxes: boolean;
	strength: MinMaxCurve;
	strengthMultiplier: number;
	strengthX: MinMaxCurve;
	strengthXMultiplier: number;
	strengthY: MinMaxCurve;
	strengthYMultiplier: number;
	strengthZ: MinMaxCurve;
	strengthZMultiplier: number;
}

interface Particle {
	angularVelocity: number;
	angularVelocity3D: Vector3;
	axisOfRotation: Vector3;
	position: Vector3;
	randomSeed: number;
	remainingLifetime: number;
	rotation: number;
	rotation3D: Vector3;
	startColor: Color32;
	startLifetime: number;
	startSize: number;
	startSize3D: Vector3;
	velocity: Vector3;
}

interface RotationBySpeedModule {
	enabled: boolean;
	range: Vector2;
	separateAxes: boolean;
	x: MinMaxCurve;
	xMultiplier: number;
	y: MinMaxCurve;
	yMultiplier: number;
	z: MinMaxCurve;
	zMultiplier: number;
}

interface RotationOverLifetimeModule {
	enabled: boolean;
	separateAxes: boolean;
	x: MinMaxCurve;
	xMultiplier: number;
	y: MinMaxCurve;
	yMultiplier: number;
	z: MinMaxCurve;
	zMultiplier: number;
}

enum ParticleSystemShapeType {
	Sphere = 0,
	SphereShell = 1,
	Hemisphere = 2,
	HemisphereShell = 3,
	Cone = 4,
	Box = 5,
	Mesh = 6,
	ConeShell = 7,
	ConeVolume = 8,
	ConeVolumeShell = 9,
	Circle = 10,
	CircleEdge = 11,
	SingleSidedEdge = 12,
	MeshRenderer = 13,
	SkinnedMeshRenderer = 14,
	BoxShell = 15,
	BoxEdge = 16
}

enum ParticleSystemMeshShapeType {
	Vertex = 0,
	Edge = 1,
	Triangle = 2
}

interface ShapeModule {
	alignToDirection: boolean;
	angle: number;
	arc: number;
	box: Vector3;
	enabled: boolean;
	length: number;
	// mesh: Mesh;
	// meshRenderer: MeshRenderer;
	// meshMaterialIndex: number;
	meshScale: number;
	meshShapeType: ParticleSystemMeshShapeType;
	normalOffset: number;
	radius: number;
	randomDirectionAmount: number;
	shapeType: ParticleSystemShapeType;
	// skinnedMeshRenderer: SkinnedMeshRenderer;
	sphericalDirectionAmount: number;
	useMeshColors: boolean;
	useMeshMaterialIndex: boolean;
}

interface SizeOverLifetimeModule {
	enabled: boolean;
	separateAxes: boolean;
	size: MinMaxCurve;
	sizeMultiplier: number;
	x: MinMaxCurve;
	xMultiplier: number;
	y: MinMaxCurve;
	yMultiplier: number;
	z: MinMaxCurve;
	zMultiplier: number;
}

interface SubEmittersModule {
	enabled: boolean;
	subEmittersCount: number;
}

enum UVChannelFlags {
	UV0 = 1,
	UV1 = 2,
	UV2 = 4,
	UV3 = 8
}

enum ParticleSystemAnimationType {
	WholeSheet = 0,
	SingleRow = 1
}

interface TextureSheetAnimationModule {
	animation: ParticleSystemAnimationType;
	cycleCount: number;
	enabled: boolean;
	flipU: number;
	flipV: number;
	frameOverTime: MinMaxCurve;
	frameOverTimeMultiplier: number;
	numTilesX: number;
	numTilesY: number;
	rowIndex: number;
	startFrame: MinMaxCurve;
	startFrameMultiplier: number;
	useRandomRow: boolean;
	uvChannelMask: UVChannelFlags;
}

enum ParticleSystemTrailTextureMode {
	Stretch = 0,
	Tile = 1
}

interface TrailModule {
	colorOverLifetime: MinMaxGradient;
	colorOverTrail: MinMaxGradient;
	dieWithParticles: boolean;
	enabled: boolean;
	inheritParticleColor: boolean;
	lifetime: MinMaxCurve;
	lifetimeMultiplier: number;
	minVertexDistance: number;
	ratio: number;
	sizeAffectsLifetime: boolean;
	sizeAffectsWidth: boolean;
	textureMode: ParticleSystemTrailTextureMode;
	widthOverTrail: MinMaxCurve;
	widthOverTrailMultiplier: number;
	worldSpace: boolean;
}

enum ParticleSystemOverlapAction {
	Ignore = 0,
	Kill = 1,
	Callback = 2
}

interface TriggerModule {
	enabled: boolean;
	enter: ParticleSystemOverlapAction;
	exit: ParticleSystemOverlapAction;
	inside: ParticleSystemOverlapAction;
	maxColliderCount: number;
	outside: ParticleSystemOverlapAction;
	radiusScale: number;
}

interface VelocityOverLifetimeModule {
	enabled: boolean;
	space: ParticleSystemSimulationSpace;
	x: MinMaxCurve;
	xMultiplier: number;
	y: MinMaxCurve;
	yMultiplier: number;
	z: MinMaxCurve;
	zMultiplier: number;
}

interface ParticleSystemConfig {
	main: MainModule;
	emission?: EmissionModule;
	shape?: ShapeModule;
	
	externalForces?: ExternalForcesModule;
	textureSheetAnimation?: TextureSheetAnimationModule;
	
	velocityOverLifetime?: VelocityOverLifetimeModule;
	rotationOverLifetime?: RotationOverLifetimeModule;
	sizeOverLifetime?: SizeOverLifetimeModule;
	colorOverLifetime?: ColorOverLifetimeModule;
	forceOverLifetime?: ForceOverLifetimeModule;
	
	inheritVelocity?: InheritVelocityModule;
	limitVelocityOverLifetime?: LimitVelocityOverLifetimeModule;

	colorBySpeed?: ColorBySpeedModule;
	rotationBySpeed?: RotationBySpeedModule;
	sizeBySpeed?: any;

	noise?: NoiseModule;
	collision?: CollisionModule;
	subEmitters?: SubEmittersModule;
	lights?: LightsModule;
	trails?: TrailModule;
	trigger?: TriggerModule;
	randomSeed?: number;
	useAutoRandomSeed: boolean;
}

interface MinMaxCurve {
	constant: number;
	constantMax: number;
	constantMin: number;
	curve: AnimationCurve;
	curveMax: AnimationCurve;
	curveMin: AnimationCurve;
	curveMultiplier: number;
	mode: ParticleSystemCurveMode;
}

enum ParticleSystemCurveMode {
	Constant = 0,
	Curve = 1,
	TwoCurves = 2,
	TwoConstants = 3
}

/**
 * @description 取值器
 */
const getValue = (param: MinMaxCurve) => {
	let func;
	switch (param.mode) {
	case ParticleSystemCurveMode.Constant:
		// tslint:disable:typedef only-arrow-functions no-function-expression
		func = (function (value) {
			return () => value;
		}(param.constant));
		break;
	case ParticleSystemCurveMode.TwoConstants:
		const v = param.constantMin + Math.random() * (param.constantMax - param.constantMin);
		func = (function (value) {
			return () => value;
		}(v));
		break;
	case ParticleSystemCurveMode.Curve:
		break;
	case ParticleSystemCurveMode.TwoCurves:
		break;
	default:
	}

	return func;
};

class Particle {
	public time: number;
	public spin: number;
	public velocity: Vector3;
	public position: Vector3;
}

class ParticleSystem {
	public startTime: number;
	public playTime: number;
	public particles: Particle[];
	public config: ParticleSystemConfig;

	constructor(config: ParticleSystemConfig) {
		this.startTime = 0;
		this.config = config;
	}

	public play(time: number) {
		const main = this.config.main;
		this.playTime = time;
		if (this.startTime === 0) {
			this.startTime = time;
		}

		// tslint:disable-next-line:no-empty
		if (this.particles.length > main.maxParticles) {

		}
	}
}