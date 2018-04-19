import { THREE } from "../three"
import { ResTab } from "../../util/res_mgr"
import { Renderer } from "../renderer"

import { Particle } from "./particle"

import { PSSimulationSpace } from "./util"

import { MainModule } from "./main"
import { EmissionModule } from "./emission"
import { RendererModule } from "./renderer"

import { ShapeModule } from "./shape"
import { TextureSheetAnimationModule } from "./texture_sheet_animation"

import { VelocityOverLifetimeModule } from "./velocity_lifetime"
import { SizeOverLifetimeModule } from "./size_lifetime"
import { ColorOverLifetimeModule } from "./color_lifetime"
import { RotationOverLifetimeModule } from "./rotation_lifetime"

import { ForceOverLifetimeModule } from "./force_lifetime"
import { ExternalForcesModule } from "./force"

import { InheritVelocityModule } from "./inherit_velocity"
import { LimitVelocityOverLifetimeModule } from "./limitvelocity_lifetime"

import { ColorBySpeedModule } from "./color_speed"
import { RotationBySpeedModule } from "./rotation_speed"
import { SizeBySpeedModule } from "./size_speed"

/**
 * 注：目前的粒子系统 不 支 持 以下模块
 *   inherit
 *   External Force 外部力
 *   Noise      噪音
 *   SubEmitter 子发射器
 *   Collision  碰撞
 *   Triggers
 *   Lights     光照
 *   Trails     拖尾
 *   Custom Data 用户数据
 */
export class ParticleSystem extends THREE.Object3D {

	isStop: boolean;
	resTab: ResTab;
	psScene: THREE.Scene;
	camera: THREE.Camera;

	totalTime: number;    // 总时间

	frees: Particle[];
	particles: Particle[];

	randomSeed: number;
	useAutoRandomSeed: boolean;

	main: MainModule;
	emission: EmissionModule;
	renderer: RendererModule;

	velocityOverLifetime: VelocityOverLifetimeModule;
	rotationOverLifetime: RotationOverLifetimeModule;
	sizeOverLifetime: SizeOverLifetimeModule;
	colorOverLifetime: ColorOverLifetimeModule;
	forceOverLifetime: ForceOverLifetimeModule;
	limitVelocityOverLifetime: LimitVelocityOverLifetimeModule;

	colorBySpeed: ColorBySpeedModule;
	rotationBySpeed: RotationBySpeedModule;
	sizeBySpeed: SizeBySpeedModule;

	textureSheetAnimation: TextureSheetAnimationModule;
	shape: ShapeModule;

	// 以下模块目前不实现

	externalForces: ExternalForcesModule;
	inheritVelocity: InheritVelocityModule;

	constructor(config: any, scene: THREE.Scene, renderer: Renderer, resTab: ResTab) {

		super();

		let main = new MainModule(config.main);
		if (main.simulationSpace !== PSSimulationSpace.Local) {
			throw new Error("main.simulationSpace isn't PSSimulationSpace.Local");
		}
		this.main = main;
		this.psScene = scene;
		this.resTab = resTab;

		this.isStop = false;
		this.totalTime = 0;

		this.frees = [];
		this.particles = [];
		this.useAutoRandomSeed = config.useAutoRandomSeed;
		this.randomSeed = this.useAutoRandomSeed ? 0 : config.randomSeed;

		if (config.renderer)
			this.renderer = new RendererModule(config.renderer, renderer, resTab);
		if (config.shape)
			this.shape = new ShapeModule(config.shape);
		if (config.emission)
			this.emission = new EmissionModule(config.emission);
		if (config.externalForces)
			this.externalForces = new ExternalForcesModule(config.externalForces);
		if (config.textureSheetAnimation)
			this.textureSheetAnimation = new TextureSheetAnimationModule(config.textureSheetAnimation);
		if (config.velocityOverLifetime)
			this.velocityOverLifetime = new VelocityOverLifetimeModule(config.velocityOverLifetime);
		if (config.rotationOverLifetime)
			this.rotationOverLifetime = new RotationOverLifetimeModule(config.rotationOverLifetime);
		if (config.sizeOverLifetime)
			this.sizeOverLifetime = new SizeOverLifetimeModule(config.sizeOverLifetime);
		if (config.colorOverLifetime)
			this.colorOverLifetime = new ColorOverLifetimeModule(config.colorOverLifetime);
		if (config.forceOverLifetime)
			this.forceOverLifetime = new ForceOverLifetimeModule(config.forceOverLifetime);
		if (config.inheritVelocity)
			this.inheritVelocity = new InheritVelocityModule(config.inheritVelocity);
		if (config.limitVelocityOverLifetime)
			this.limitVelocityOverLifetime = new LimitVelocityOverLifetimeModule(config.limitVelocityOverLifetime);
		if (config.colorBySpeed)
			this.colorBySpeed = new ColorBySpeedModule(config.colorBySpeed);
		if (config.rotationBySpeed)
			this.rotationBySpeed = new RotationBySpeedModule(config.rotationBySpeed);
		if (config.sizeBySpeed)
			this.sizeBySpeed = new SizeBySpeedModule(config.sizeBySpeed);
	}

	public dispose() {

		super.dispose();
		// this.geometry.dispose();
		for (let p of this.particles) {
			p.dispose();
		}
		for (let p of this.frees) {
			p.dispose();
		}
	}

	private createParticle(count: number, time: number) {
		let p: Particle = undefined;
		for (let i = 0; i < count; ++i) {
			if (this.frees.length > 0) {
				p = this.frees.pop();
				this.particles.push(p);
			} else {
				p = new Particle(this);
				p.material = new THREE.MeshParticlesMaterial({ map: this.renderer.map });
				let mat = <THREE.MeshParticlesMaterial>this.renderer.mesh.material;
				if (Array.isArray(mat)) {
					mat = mat[0];
				}
				p.startTintColor.setRGBA(mat.tintColor.r, mat.tintColor.g, mat.tintColor.b, mat.tintOpacity);
				p.material.copy(mat);
				p.mesh = new THREE.Mesh(this.renderer.geometry, p.material);

				this.particles.push(p);
			}
			this.add(p.mesh);
			p.init(time);
		}
	}

	private removePar(i: number) {
		let p = this.particles[i];
		this.frees.push(p);
		this.remove(p.mesh);

		this.particles[i] = this.particles[this.particles.length - 1];
		--this.particles.length;
		return i - 1;
	}

	// deltaTime的单位：秒
	update(deltaTime: number) {

		let emission = this.emission;
		if (!emission || !this.renderer || this.isStop) {
			return;
		}

		if (!this.renderer.update()) {
			return;
		}

		deltaTime *= this.main.simulationSpeed;

		this.totalTime += deltaTime;

		// 更新
		let playTime = this.totalTime % this.main.duration;
		for (let i = 0; i < this.particles.length; ++i) {
			if (!this.particles[i].update(this.totalTime, deltaTime)) {
				i = this.removePar(i);
			}
		}

		let delayTime = this.main.startDelay.getValue(playTime);
		if (this.totalTime < delayTime) {
			return;
		}

		if (this.main.loop || this.totalTime < delayTime + this.main.duration) {
			let maxCount = this.main.maxParticles - this.particles.length;
			if (maxCount < 0) maxCount = 0;
			let count = emission.update(this.totalTime, playTime, maxCount);
			this.createParticle(count, this.totalTime);
		} else {
			// 如果已经超出了发射器的生命周期，而且没有存活的粒子了，该粒子系统就可以停止播放了。
			if (this.particles.length === 0) {
				this.isStop = true;
			}
		}
	}

	addSuccess() {
		this.scene.animObjectMap.set(this.uuid, this);
	}
}