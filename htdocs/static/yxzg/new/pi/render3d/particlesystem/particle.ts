/**
 * 
 */
import { THREE } from '../three';
import { ParticleSystem } from './ps';
import { PSAnimationType } from './texture_sheet_animation';
import { PSSimulationSpace } from './util';

let tmpVec: THREE.Vector4;

let tmpVec1: THREE.Vector3;
let tmpVec2: THREE.Vector3;
let tmpVec3: THREE.Vector3;
let tmpVec4: THREE.Vector3;

let tmpColor: THREE.Color;

let tmpMatrix: THREE.Matrix4;

export class Particle {

	public mesh: THREE.Mesh;
	public material: THREE.MeshParticlesMaterial;

	public createTime: number;
	public lifeTime: number;

	public uvRow: number;
	public startUVFrame: number;

	public startTintColor: THREE.Color;
	public startColor: THREE.Color;
	public startSize: THREE.Vector3;
	public startForce: THREE.Vector3;
	public startVelocity: THREE.Vector3;

	public vRand: THREE.Vector3;
	public fRand: THREE.Vector3;
	public limitVRand: number;
	public sizeTimeRand: THREE.Vector3;
	public sizeSpeedRand: THREE.Vector3;
	public rTimeRand: THREE.Vector3;
	public rSpeedRand: THREE.Vector3;
	public fTimeRand: number;
	public cTimeRand: number[];
	public cSpeedRand: number[];

	public ps: ParticleSystem;

	// tslint:disable-next-line:typedef
	constructor(ps) {

		if (tmpVec1 === undefined) {
			tmpVec = new THREE.Vector4();
			tmpVec1 = new THREE.Vector3();
			tmpVec2 = new THREE.Vector3();
			tmpVec3 = new THREE.Vector3();
			tmpVec4 = new THREE.Vector3();
			tmpColor = new THREE.Color(0);
			tmpMatrix = new THREE.Matrix4();
		}

		this.ps = ps;
		this.lifeTime = 0;
		this.createTime = 0;
		this.uvRow = -1;
		this.startUVFrame = 0;
		this.startTintColor = new THREE.Color(0);
		this.startColor = new THREE.Color(0);
		this.startVelocity = new THREE.Vector3();
	}

	/**
	 * 释放
	 */
	public dispose() {
		this.material.dispose();
	}

	/**
	 * @description 初始化
	 */
	// tslint:disable-next-line:cyclomatic-complexity
	public init(time: number) {
		const ps = this.ps;
		const playTime = time % ps.main.duration;

		this.mesh.visible = false;

		if (ps.velocityOverLifetime) {
			if (!this.vRand) {
				this.vRand = new THREE.Vector3();
			}
			this.vRand.set(Math.random(), Math.random(), Math.random());
		}
		if (ps.forceOverLifetime) {
			if (!this.fRand) {
				this.fRand = new THREE.Vector3();
			}
			this.fRand.set(Math.random(), Math.random(), Math.random());
		}
		if (ps.limitVelocityOverLifetime) {
			this.limitVRand = Math.random();
		}
		if (ps.sizeOverLifetime) {
			if (!this.sizeTimeRand) {
				this.sizeTimeRand = new THREE.Vector3();
			}
			this.sizeTimeRand.x = Math.random();
			if (ps.sizeOverLifetime.separateAxes) {
				this.sizeTimeRand.y = Math.random();
				this.sizeTimeRand.z = Math.random();
			}
		}
		if (ps.sizeBySpeed) {
			if (!this.sizeSpeedRand) {
				this.sizeSpeedRand = new THREE.Vector3();
			}
			this.sizeSpeedRand.x = Math.random();
			if (ps.sizeBySpeed.separateAxes) {
				this.sizeSpeedRand.y = Math.random();
				this.sizeSpeedRand.z = Math.random();
			}
		}
		if (ps.rotationOverLifetime) {
			if (!this.rTimeRand) {
				this.rTimeRand = new THREE.Vector3();
			}
			this.rTimeRand.x = Math.random();
			if (ps.rotationOverLifetime.separateAxes) {
				this.rTimeRand.y = Math.random();
				this.rTimeRand.z = Math.random();
			}
		}
		if (ps.rotationBySpeed) {
			if (!this.rSpeedRand) {
				this.rSpeedRand = new THREE.Vector3();
			}
			this.rSpeedRand.x = Math.random();
			if (ps.rotationBySpeed.separateAxes) {
				this.rSpeedRand.y = Math.random();
				this.rSpeedRand.z = Math.random();
			}
		}
		if (ps.textureSheetAnimation) {
			this.fTimeRand = Math.random();
		}
		if (ps.colorOverLifetime) {
			if (!this.cTimeRand) {
				this.cTimeRand = [];
			}
			this.cTimeRand[0] = Math.random();
			this.cTimeRand[1] = Math.random();
			this.cTimeRand[2] = Math.random();
			this.cTimeRand[3] = Math.random();
		}
		if (ps.colorBySpeed) {
			if (!this.cSpeedRand) {
				this.cSpeedRand = [];
			}
			this.cSpeedRand[0] = Math.random();
			this.cSpeedRand[1] = Math.random();
			this.cSpeedRand[2] = Math.random();
			this.cSpeedRand[3] = Math.random();
		}

		const speed = ps.main.startSpeed.getValue(playTime);
		if (ps.shape) {
			ps.shape.get(this.mesh.position, this.startVelocity);
		} else {
			this.startVelocity.set(0, 0, 1);
			this.mesh.position.set(0, 0, 0);
		}
		this.startVelocity.multiplyScalar(speed);

		const g = ps.main.gravityModifier.getValue(playTime) * 9.8;
		this.startForce = new THREE.Vector3(0, -g, 0);

		this.createTime = time;
		this.lifeTime = ps.main.startLifetime.getValue(playTime);

		this.startSize = new THREE.Vector3();
		if (ps.main.startSize3D) {
			this.startSize.set(
				ps.main.startSizeX.getValue(playTime),
				ps.main.startSizeY.getValue(playTime),
				ps.main.startSizeZ.getValue(playTime));
		} else {
			const s = ps.main.startSize.getValue(playTime);
			this.startSize.set(s, s, s);
		}

		if (ps.main.startRotation3D) {
			this.mesh.rotation.set(
				ps.main.startRotationX.getValue(playTime),
				ps.main.startRotationY.getValue(playTime),
				ps.main.startRotationZ.getValue(playTime));
		} else {
			const r = ps.main.startRotation.getValue(playTime);
			this.mesh.rotation.set(0, 0, r);
		}

		ps.main.startColor.getValue(this.startColor, playTime);
		this.startColor.r *= this.startTintColor.r;
		this.startColor.g *= this.startTintColor.g;
		this.startColor.b *= this.startTintColor.b;
		this.startColor.a *= this.startTintColor.a;

		this.uvRow = -1;

		this.startUVFrame = 0;
		const uvAnim = ps.textureSheetAnimation;
		if (uvAnim) {
			this.startUVFrame = uvAnim.startFrame.getValue(playTime);
			if (uvAnim.animation === PSAnimationType.SingleRow) {
				this.uvRow = (!uvAnim.useRandomRow) ? uvAnim.rowIndex : Math.floor(uvAnim.numTilesY * Math.random());
				this.uvRow *= uvAnim.numTilesX;
			}
		}
	}

	// tslint:disable-next-line:typedef
	public updatePosition(time, deltaTime, factor) {

		// 速度
		const v = tmpVec1;
		const vMod = this.ps.velocityOverLifetime;

		v.set(
			vMod ? vMod.x.getValue(factor, this.vRand.x) : 0.0,
			vMod ? vMod.y.getValue(factor, this.vRand.y) : 0.0,
			vMod ? vMod.z.getValue(factor, this.vRand.z) : 0.0
		);

		if (vMod && vMod.space === PSSimulationSpace.World) {
			// 转局部坐标系
			tmpVec.set(v.x, v.y, v.z, 0);
			tmpMatrix.getInverse(this.ps.matrixWorld);
			tmpVec.applyMatrix4(tmpMatrix);
			v.set(tmpVec.x, tmpVec.y, tmpVec.z);
		}

		v.add(this.startVelocity);

		// 力
		const force = tmpVec2;
		const fMod = this.ps.forceOverLifetime;
		force.set(
			fMod ? fMod.x.getValue(factor, this.fRand.x) : 0.0,
			fMod ? fMod.y.getValue(factor, this.fRand.y) : 0.0,
			fMod ? fMod.z.getValue(factor, this.fRand.z) : 0.0
		);

		if (fMod && fMod.space === PSSimulationSpace.World) {
			// 转局部坐标系
			tmpVec.set(force.x, force.y, force.z, 0);
			tmpMatrix.getInverse(this.ps.matrixWorld);
			tmpVec.applyMatrix4(tmpMatrix);
			force.set(tmpVec.x, tmpVec.y, tmpVec.z);
		}

		force.add(this.startForce);

		// v = v0 + a * t
		force.multiplyScalar(time);
		v.add(force);

		let dampen = 0; // 阻力系数
		let limit = v.length();
		let speed = limit;

		const lMod = this.ps.limitVelocityOverLifetime;
		if (lMod) {
			dampen = lMod.dampen;
			if (!lMod.separateAxes) {
				limit = lMod.limit.getValue(factor, this.limitVRand);
			}
		}

		if (limit < speed) {
			tmpVec3.copy(v);
			tmpVec3.normalize();
			tmpVec3.multiplyScalar(limit);
			tmpVec4.lerpVectors(v, tmpVec3, dampen);
			v.copy(tmpVec4);
		}

		speed = v.length();
		v.multiplyScalar(deltaTime);
		this.mesh.position.add(v);

		return speed;
	}

	public updateColor(time: number, factor: number, speed: number) {

		const mat = <THREE.MeshParticlesMaterial>this.mesh.material;

		tmpColor.setRGBA(1, 1, 1, 1);

		const modC = this.ps.colorOverLifetime;
		if (modC) {
			modC.color.getValue(tmpColor, factor, this.cTimeRand);
		}

		tmpColor.r *= this.startColor.r;
		tmpColor.g *= this.startColor.g;
		tmpColor.b *= this.startColor.b;
		tmpColor.a *= this.startColor.a;

		const modCS = this.ps.colorBySpeed;
		if (modCS) {
			let f = (speed - modCS.range.x) / (modCS.range.y - modCS.range.x);
			if (f < 0) f = 0.0;
			if (f > 1) f = 1.0;
			modCS.color.getValue(mat.tintColor, f, this.cSpeedRand);

			tmpColor.r *= mat.tintColor.r;
			tmpColor.g *= mat.tintColor.g;
			tmpColor.b *= mat.tintColor.b;
			tmpColor.a *= mat.tintColor.a;
		}

		mat.tintColor.setRGBA(tmpColor.r, tmpColor.g, tmpColor.b, tmpColor.a);
		mat.tintOpacity = tmpColor.a;
	}

	public updateSize(time: number, factor: number, speed: number) {
		let x = 1.0;
		let y = 1.0;
		let z = 1.0;

		const modS = this.ps.sizeOverLifetime;
		if (modS) {
			if (!modS.separateAxes) {
				x = y = modS.size.getValue(factor, this.sizeTimeRand.x);
			} else {
				x = modS.x.getValue(factor, this.sizeTimeRand.x);
				y = modS.y.getValue(factor, this.sizeTimeRand.y);
				z = modS.z.getValue(factor, this.sizeTimeRand.z);
			}
		}

		const modSS = this.ps.sizeBySpeed;
		if (modSS) {
			let f = (speed - modSS.range.x) / (modSS.range.y - modSS.range.x);
			if (f < 0) f = 0.0;
			if (f > 1) f = 1.0;

			if (!modSS.separateAxes) {
				const s = modSS.size.getValue(f, this.sizeSpeedRand.x);
				x *= s; y *= s; z *= s;
			} else {
				x *= modSS.x.getValue(f, this.sizeSpeedRand.x);
				y *= modSS.y.getValue(f, this.sizeSpeedRand.y);
				z *= modSS.z.getValue(f, this.sizeSpeedRand.z);
			}
		}

		this.mesh.scale.x = x * this.startSize.x;
		this.mesh.scale.y = y * this.startSize.y;
		this.mesh.scale.z = z * this.startSize.z;

		if (this.mesh.scale.x === 0.0) {
			this.mesh.scale.x = 0.001;
		}
		if (this.mesh.scale.y === 0.0) {
			this.mesh.scale.y = 0.001;
		}
		if (this.mesh.scale.z === 0.0) {
			this.mesh.scale.z = 0.001;
		}
	}

	public updateRotate(time: number, deltaTime: number, factor: number, speed: number) {
		let x = 0;
		let y = 0;
		let z = 0;

		const modR = this.ps.rotationOverLifetime;
		if (modR) {
			if (!modR.separateAxes) {
				z += deltaTime * modR.z.getValue(factor, this.rTimeRand.x);
			} else {
				x += deltaTime * modR.x.getValue(factor, this.rTimeRand.x);
				y += deltaTime * modR.y.getValue(factor, this.rTimeRand.y);
				z += deltaTime * modR.z.getValue(factor, this.rTimeRand.z);
			}
		}

		const modRS = this.ps.rotationBySpeed;
		if (modRS) {
			let f = (speed - modRS.range.x) / (modRS.range.y - modRS.range.x);
			if (f < 0) f = 0.0;
			if (f > 1) f = 1.0;

			if (modRS.separateAxes) {
				z += deltaTime * modRS.z.getValue(f, this.rSpeedRand.x);
			} else {
				x += deltaTime * modRS.x.getValue(f, this.rSpeedRand.x);
				y += deltaTime * modRS.y.getValue(f, this.rSpeedRand.y);
				z += deltaTime * modRS.z.getValue(f, this.rSpeedRand.z);
			}
		}
		const r = this.mesh.rotation;
		this.mesh.rotation.set(r.x + x, r.y + y, r.z + z);
	}

	public updateTextureAnimation(playTime: number, factor: number) {
		const anim = this.ps.textureSheetAnimation;
		if (!anim) return;

		let num = 0;
		switch (anim.animation) {
			case PSAnimationType.WholeSheet:
				num = anim.numTilesX * anim.numTilesY;
				break;
			case PSAnimationType.SingleRow:
				num = anim.numTilesX;
				break;
			default:
		}

		factor = factor * anim.cycleCount % 1;
		let frame = Math.floor(num * anim.frameOverTime.getValue(factor, this.fTimeRand));
		if (frame < 0) frame = 0;
		frame = (this.startUVFrame + frame) % num;

		if (anim.animation === PSAnimationType.SingleRow) {
			frame += this.uvRow;
		}

		const tx = 1 / anim.numTilesX;
		const ty = 1 / anim.numTilesY;
		let ox = frame % anim.numTilesX;
		let oy = Math.floor(frame / anim.numTilesX);
		ox /= anim.numTilesX;
		oy /= anim.numTilesY;

		this.mesh.material.mapst.set(tx, ty, ox, (1 - ty) - oy);
	}

	/**
	 * 更新粒子状态，返回该粒子是否存活
	 * @param time 总时间，单位：秒
	 */
	public update(time: number, deltaTime: number) {

		if (!this.mesh.visible) {
			this.mesh.visible = true;
		}

		const playTime = time - this.createTime;
		if (playTime > this.lifeTime) {
			// 超出生命周期
			return false;
		}

		// 声明周期的比例关系
		const factor = playTime / this.lifeTime;

		const speed = this.updatePosition(playTime, deltaTime, factor);

		this.updateColor(playTime, factor, speed);

		this.updateSize(playTime, factor, speed);

		this.updateRotate(playTime, deltaTime, factor, speed);

		this.updateTextureAnimation(playTime, factor);

		return true;

	}

}