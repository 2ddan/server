/**
 * 
 */
import { THREE } from '../three';
import { PSScalingMode } from './main';

let tmp1: THREE.Vector3;
let tmp2: THREE.Vector3;

enum PSShapeType {
	Sphere = 0,
	SphereShell = 1,
	Hemisphere = 2,
	HemisphereShell = 3,
	Cone = 4,            // 圆锥底圆的内部
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

// tslint:disable-next-line:interface-name
interface IShape {
	get(pos: THREE.Vector3, dir: THREE.Vector3);
}

class BoxImpl implements IShape {
	public box: THREE.Vector3;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.box = new THREE.Vector3(config.box.x, config.box.y, config.box.z);
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const x = this.box.x * (Math.random() - 0.5);
		const y = this.box.y * (Math.random() - 0.5);
		const z = this.box.z * (Math.random() - 0.5);
		pos.set(x, y, z);
	}
}

class BoxShellImpl implements IShape {
	public box: THREE.Vector3;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.box = new THREE.Vector3(config.box.x, config.box.y, config.box.z);
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		let x = 0;
		let y = 0;
		let z = 0;
		const v1 = Math.random() - 0.5;
		const v2 = Math.random() - 0.5;
		const plane = Math.floor(Math.random() * 6);
		switch (plane) {
			case 0:   // x正面
				x = this.box.x * 0.5;
				y = this.box.y * v1;
				z = this.box.z * v2;
				break;
			case 1:   // x反面
				x = this.box.x * -0.5;
				y = this.box.y * v1;
				z = this.box.z * v2;
				break;
			case 2:   // y正面
				x = this.box.x * v1;
				y = this.box.y * 0.5;
				z = this.box.z * v2;
				break;
			case 3:   // y反面
				x = this.box.x * v1;
				y = this.box.y * -0.5;
				z = this.box.z * v2;
				break;
			case 4:   // z正面
				x = this.box.x * v1;
				y = this.box.y * v2;
				z = this.box.z * 0.5;
				break;
			case 5:   // z反面
				x = this.box.x * v1;
				y = this.box.y * v2;
				z = this.box.z * -0.5;
				break;
			default:
		}
		pos.set(x, y, z);
	}
}

class BoxEdgeImpl implements IShape {
	public box: THREE.Vector3;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.box = new THREE.Vector3(config.box.x, config.box.y, config.box.z);
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		let x = 0;
		let y = 0;
		let z = 0;
		const v = Math.random() - 0.5;
		const edge = Math.floor(Math.random() * 12);
		switch (edge) {
			case 0:
				x = this.box.x * 0.5;
				y = this.box.y * 0.5;
				z = this.box.z * v;
				break;
			case 1:
				x = -this.box.x * 0.5;
				y = this.box.y * 0.5;
				z = this.box.z * v;
				break;
			case 2:
				x = this.box.x * 0.5;
				y = -this.box.y * 0.5;
				z = this.box.z * v;
				break;
			case 3:
				x = -this.box.x * 0.5;
				y = -this.box.y * 0.5;
				z = this.box.z * v;
				break;
			case 4:
				x = this.box.x * v;
				y = this.box.y * 0.5;
				z = this.box.z * 0.5;
				break;
			case 5:
				x = this.box.x * v;
				y = -this.box.y * 0.5;
				z = this.box.z * 0.5;
				break;
			case 6:
				x = this.box.x * v;
				y = this.box.y * 0.5;
				z = -this.box.z * 0.5;
				break;
			case 7:
				x = this.box.x * v;
				y = -this.box.y * 0.5;
				z = -this.box.z * 0.5;
				break;
			case 8:
				x = this.box.x * 0.5;
				y = this.box.y * v;
				z = this.box.z * 0.5;
				break;
			case 9:
				x = -this.box.x * 0.5;
				y = this.box.y * v;
				z = this.box.z * 0.5;
				break;
			case 10:
				x = this.box.x * 0.5;
				y = this.box.y * v;
				z = -this.box.z * 0.5;
				break;
			case 11:
				x = -this.box.x * 0.5;
				y = this.box.y * v;
				z = -this.box.z * 0.5;
				break;
			default:
		}
		pos.set(x, y, z);
	}
}

// tslint:disable:max-classes-per-file
class SphereImpl implements IShape {
	public radius: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const r = this.radius * Math.random();
		const a = Math.PI * Math.random();
		const b = Math.PI * Math.random() * 2;
		const sa = r * Math.sin(a);
		const ca = r * Math.cos(a);
		const sb = Math.sin(b);
		const cb = Math.cos(b);
		pos.set(sa * cb, ca, sa * sb);
	}
}

class SphereShellImpl implements IShape {
	public radius: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const a = Math.PI * Math.random();
		const b = Math.PI * Math.random() * 2;
		const sa = this.radius * Math.sin(a);
		const ca = this.radius * Math.cos(a);
		const sb = Math.sin(b);
		const cb = Math.cos(b);
		pos.set(sa * cb, ca, sa * sb);
	}
}

class HemisphereImpl implements IShape {
	public radius: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const r = this.radius * Math.random();
		const a = Math.PI * Math.random() * 0.5;
		const b = Math.PI * Math.random() * 2;
		const sa = r * Math.sin(a);
		const ca = r * Math.cos(a);
		const sb = Math.sin(b);
		const cb = Math.cos(b);

		pos.set(sa * cb, ca, sa * sb);
	}
}

class HemisphereShellImpl implements IShape {
	public radius: number;

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const a = Math.PI * Math.random() * 0.5;
		const b = Math.PI * Math.random() * 2;
		const sa = this.radius * Math.sin(a);
		const ca = this.radius * Math.cos(a);
		const sb = Math.sin(b);
		const cb = Math.cos(b);
		pos.set(sa * cb, ca, sa * sb);
	}
}

/**
 * 圆柱底部的圆内
 */
class CylinderImpl implements IShape {
	public radius: number;  // 底部的半径
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();
		const r = this.radius * Math.random();

		pos.set(r * Math.cos(phi), 0, r * Math.sin(phi));
		dir.set(0, 1, 0);
	}
}

/**
 * 圆柱底部的圆周
 */
class CylinderShellImpl implements IShape {
	public radius: number;  // 底部的半径
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();

		pos.set(this.radius * Math.cos(phi), 0, this.radius * Math.sin(phi));
		dir.set(0, 1, 0);
	}
}

/**
 * 圆柱体内部
 */
class CylinderVolumeImpl implements IShape {
	public radius: number;  // 底部的半径
	public length: number;  // y轴到原点的长度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.length = config.length;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();
		const r = this.radius * Math.random();
		const len = this.length * Math.random();

		pos.set(r * Math.cos(phi), len, r * Math.sin(phi));
		dir.set(0, 1, 0);
	}
}

/**
 * 圆柱体表面
 */
class CylinderVolumeShellImpl implements IShape {
	public radius: number;  // 圆锥底部的半径
	public length: number;  // y轴到原点的长度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.length = config.length;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();
		const len = this.length * Math.random();

		pos.set(this.radius * Math.cos(phi), len, this.radius * Math.sin(phi));
		dir.set(0, 1, 0);
	}
}

/**
 * 圆锥底圆内部
 */
class ConeImpl implements IShape {
	public radius: number;  // 圆锥底部的半径
	public angle: number;   // 圆锥面和y轴正向的角度，单位：度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.angle = config.angle * Math.PI / 180;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();
		const r = this.radius * Math.random();

		pos.set(r * Math.cos(phi), 0, r * Math.sin(phi));

		dir.set(pos.x, pos.y + this.radius / Math.tan(this.angle), pos.z);
		dir.normalize();
	}
}

/**
 * 圆锥底圆周
 */
class ConeShellImpl implements IShape {
	public radius: number;  // 圆锥底部的半径
	public angle: number;   // 圆锥面和y轴正向的角度，单位：度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.angle = config.angle * Math.PI / 180;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();

		pos.set(this.radius * Math.cos(phi), 0, this.radius * Math.sin(phi));

		dir.set(pos.x, pos.y + this.radius / Math.tan(this.angle), pos.z);
		dir.normalize();
	}
}

/**
 * 圆锥体内部
 */
class ConeVolumeImpl implements IShape {
	public radius: number;  // 圆锥底部的半径
	public length: number;  // y轴到原点的长度

	public angle: number;   // 圆锥面和y轴正向的角度，单位：度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.length = config.length;
		this.angle = config.angle * Math.PI / 180;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();

		const offset = this.radius / Math.tan(this.angle);
		const y = offset + this.length * Math.random();

		const tmp = y * Math.tan(this.angle) * Math.random();
		pos.set(tmp * Math.cos(phi), y - offset, tmp * Math.sin(phi));

		dir.set(pos.x, pos.y + offset, pos.z);
		dir.normalize();
	}
}

/**
 * 圆锥面
 */
class ConeVolumeShellImpl implements IShape {
	public radius: number;  // 圆锥底部的半径
	public length: number;  // y轴到原点的长度

	public angle: number;   // 圆锥面和y轴正向的角度，单位：度
	public arc: number;     // 只支持Random模式，在xz投影离x正向的角度，单位：度

	// tslint:disable-next-line:typedef
	constructor(config) {
		this.radius = config.radius;
		this.length = config.length;

		this.angle = config.angle * Math.PI / 180;
		this.arc = config.arc * Math.PI / 180;
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		const phi = this.arc * Math.random();

		const offset = this.radius / Math.tan(this.angle);
		const y = offset + this.length * Math.random();

		const tmp = y * Math.tan(this.angle);
		pos.set(tmp * Math.cos(phi), y - offset, tmp * Math.sin(phi));

		dir.set(pos.x, pos.y + offset, pos.z);
		dir.normalize();
	}
}

export class ShapeModule {
	public impl: IShape;
	public shapeType: PSShapeType;

	public alignToDirection: boolean;
	public randomDirectionAmount: number;
	public sphericalDirectionAmount: number;

	// tslint:disable-next-line:typedef
	constructor(config) {

		if (!tmp1) {
			tmp1 = new THREE.Vector3();
			tmp2 = new THREE.Vector3();
		}

		this.alignToDirection = config.alignToDirection;
		this.randomDirectionAmount = config.randomDirectionAmount;
		this.sphericalDirectionAmount = config.sphericalDirectionAmount;

		this.shapeType = config.shapeType;
		switch (this.shapeType) {
			case PSShapeType.Box:
				this.impl = new BoxImpl(config);
				break;
			case PSShapeType.BoxEdge:
				this.impl = new BoxEdgeImpl(config);
				break;
			case PSShapeType.BoxShell:
				this.impl = new BoxShellImpl(config);
				break;
			case PSShapeType.Sphere:
				this.sphericalDirectionAmount = 1;
				this.impl = new SphereImpl(config);
				break;
			case PSShapeType.SphereShell:
				this.sphericalDirectionAmount = 1;
				this.impl = new SphereShellImpl(config);
				break;
			case PSShapeType.Hemisphere:
				this.sphericalDirectionAmount = 1;
				this.impl = new HemisphereImpl(config);
				break;
			case PSShapeType.HemisphereShell:
				this.sphericalDirectionAmount = 1;
				this.impl = new HemisphereShellImpl(config);
				break;
			case PSShapeType.Cone:
				if (Math.abs(config.angle) < 0.001) {
					this.impl = new CylinderImpl(config);
				} else {
					this.impl = new ConeImpl(config);
				}
				break;
			case PSShapeType.ConeShell:
				if (Math.abs(config.angle) < 0.001) {
					this.impl = new CylinderShellImpl(config);
				} else {
					this.impl = new ConeShellImpl(config);
				}
				break;
			case PSShapeType.ConeVolume:
				if (Math.abs(config.angle) < 0.001) {
					this.impl = new CylinderVolumeImpl(config);
				} else {
					this.impl = new ConeVolumeImpl(config);
				}
				break;
			case PSShapeType.ConeVolumeShell:
				if (Math.abs(config.angle) < 0.001) {
					this.impl = new CylinderVolumeShellImpl(config);
				} else {
					this.impl = new ConeVolumeShellImpl(config);
				}
				break;
			default:
				throw new Error('Not Implementation !');
		}
	}

	// tslint:disable-next-line:no-reserved-keywords
	public get(pos: THREE.Vector3, dir: THREE.Vector3) {
		this.impl && this.impl.get(pos, dir);

		dir.set(0, 0, 1);

		if (this.randomDirectionAmount > 0) {
			tmp1.copy(dir);

			tmp2.set(Math.random(), Math.random(), Math.random());
			tmp2.normalize();

			dir.lerpVectors(tmp1, tmp2, this.randomDirectionAmount);
			dir.normalize();
		}

		if (this.sphericalDirectionAmount > 0) {
			tmp1.copy(dir);

			tmp2.copy(pos);
			tmp2.normalize();

			dir.lerpVectors(tmp1, tmp2, this.sphericalDirectionAmount);
			dir.normalize();
		}
	}
}
