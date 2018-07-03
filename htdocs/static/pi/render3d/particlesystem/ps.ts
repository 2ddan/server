/**
 * 
 */
import { ResTab } from '../../util/res_mgr';
import { Renderer } from '../renderer';
import { THREE } from '../three';

import { Particle } from './particle';

import { PSSimulationSpace } from './util';

import { EmissionModule } from './emission';
import { MainModule } from './main';
import { RendererModule } from './renderer';

import { ShapeModule } from './shape';
import { TextureSheetAnimationModule } from './texture_sheet_animation';

import { ColorOverLifetimeModule } from './color_lifetime';
import { RotationOverLifetimeModule } from './rotation_lifetime';
import { SizeOverLifetimeModule } from './size_lifetime';
import { VelocityOverLifetimeModule } from './velocity_lifetime';

import { ExternalForcesModule } from './force';
import { ForceOverLifetimeModule } from './force_lifetime';

import { InheritVelocityModule } from './inherit_velocity';
import { LimitVelocityOverLifetimeModule } from './limitvelocity_lifetime';

import { ColorBySpeedModule } from './color_speed';
import { RotationBySpeedModule } from './rotation_speed';
import { SizeBySpeedModule } from './size_speed';

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

	public isStop: boolean;
	public resTab: ResTab;
	public psScene: THREE.Scene;
	public camera: THREE.Camera;

	public totalTime: number;    // 总时间

	public frees: Particle[];
	public particles: Particle[];

	public randomSeed: number;
	public useAutoRandomSeed: boolean;

	public main: MainModule;
	public emission: EmissionModule;
	public renderer: RendererModule;

	public velocityOverLifetime: VelocityOverLifetimeModule;
	public rotationOverLifetime: RotationOverLifetimeModule;
	public sizeOverLifetime: SizeOverLifetimeModule;
	public colorOverLifetime: ColorOverLifetimeModule;
	public forceOverLifetime: ForceOverLifetimeModule;
	public limitVelocityOverLifetime: LimitVelocityOverLifetimeModule;

	public colorBySpeed: ColorBySpeedModule;
	public rotationBySpeed: RotationBySpeedModule;
	public sizeBySpeed: SizeBySpeedModule;

	public textureSheetAnimation: TextureSheetAnimationModule;
	public shape: ShapeModule;

	// 以下模块目前不实现

	public externalForces: ExternalForcesModule;
	public inheritVelocity: InheritVelocityModule;

	constructor(config: any, scene: THREE.Scene, renderer: Renderer, resTab: ResTab) {

		super();

		const main = new MainModule(config.main);
		if (main.simulationSpace !== PSSimulationSpace.Local) {
			throw new Error('main.simulationSpace isn\'t PSSimulationSpace.Local');
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

		if (config.renderer) {
			this.renderer = new RendererModule(config.renderer, renderer, resTab);
		}
		if (config.shape) {
			this.shape = new ShapeModule(config.shape);
		}
		if (config.emission) {
			this.emission = new EmissionModule(config.emission);
		}
		if (config.externalForces) {
			this.externalForces = new ExternalForcesModule(config.externalForces);
		}
		if (config.textureSheetAnimation) {
			this.textureSheetAnimation = new TextureSheetAnimationModule(config.textureSheetAnimation);
		}
		if (config.velocityOverLifetime) {
			this.velocityOverLifetime = new VelocityOverLifetimeModule(config.velocityOverLifetime);
		}
		if (config.rotationOverLifetime) {
			this.rotationOverLifetime = new RotationOverLifetimeModule(config.rotationOverLifetime);
		}
		if (config.sizeOverLifetime) {
			this.sizeOverLifetime = new SizeOverLifetimeModule(config.sizeOverLifetime);
		}
		if (config.colorOverLifetime) {
			this.colorOverLifetime = new ColorOverLifetimeModule(config.colorOverLifetime);
		}
		if (config.forceOverLifetime) {
			this.forceOverLifetime = new ForceOverLifetimeModule(config.forceOverLifetime);
		}
		if (config.inheritVelocity) {
			this.inheritVelocity = new InheritVelocityModule(config.inheritVelocity);
		}
		if (config.limitVelocityOverLifetime) {
			this.limitVelocityOverLifetime = new LimitVelocityOverLifetimeModule(config.limitVelocityOverLifetime);
		}
		if (config.colorBySpeed) {
			this.colorBySpeed = new ColorBySpeedModule(config.colorBySpeed);
		}
		if (config.rotationBySpeed) {
			this.rotationBySpeed = new RotationBySpeedModule(config.rotationBySpeed);
		}
		if (config.sizeBySpeed) {
			this.sizeBySpeed = new SizeBySpeedModule(config.sizeBySpeed);
		}
	}

	public dispose() {

		super.dispose();
		// this.geometry.dispose();
		for (const p of this.particles) {
			p.dispose();
		}
		for (const p of this.frees) {
			p.dispose();
		}
	}

	// deltaTime的单位：秒
	public update(deltaTime: number) {

		const emission = this.emission;
		if (!emission || !this.renderer || this.isStop) {
			return;
		}

		if (!this.renderer.update()) {
			return;
		}

		deltaTime *= this.main.simulationSpeed;

		this.totalTime += deltaTime;

		// 更新
		const playTime = this.totalTime % this.main.duration;
		for (let i = 0; i < this.particles.length; ++i) {
			if (!this.particles[i].update(this.totalTime, deltaTime)) {
				i = this.removePar(i);
			}
		}

		const delayTime = this.main.startDelay.getValue(playTime);
		if (this.totalTime < delayTime) {
			return;
		}

		if (this.main.loop || this.totalTime < delayTime + this.main.duration) {
			let maxCount = this.main.maxParticles - this.particles.length;
			if (maxCount < 0) maxCount = 0;
			const count = emission.update(this.totalTime, playTime, maxCount);
			this.createParticle(count, this.totalTime);
		} else {
			// 如果已经超出了发射器的生命周期，而且没有存活的粒子了，该粒子系统就可以停止播放了。
			if (this.particles.length === 0) {
				this.isStop = true;
			}
		}
	}

	public addSuccess() {
		this.scene.animObjectMap.set(this.uuid, this);
	}

	private createParticle(count: number, time: number) {
		let p: Particle;
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
		const p = this.particles[i];
		this.frees.push(p);
		this.remove(p.mesh);

		this.particles[i] = this.particles[this.particles.length - 1];
		--this.particles.length;

		return i - 1;
	}

}