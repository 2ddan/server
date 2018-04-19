
import {Vector3} from "./vector3"
import {Quaternion} from "./quaternion"
import {Matrix4} from "./matrix4"

/**
 * @description 空间属性
 */
export class Spatial {
	private position: Vector3;
	private quaternion: Quaternion;
	private scale: Vector3;
	private matrix: Matrix4;

	private needUpdate: boolean;

	/**
	 * @description 构造
	 */
	constructor() {
		this.needUpdate = false;
		this.position = new Vector3();
		this.quaternion = new Quaternion();
		this.scale = new Vector3();
		this.matrix = new Matrix4();
	}

	/**
	 * @description 设置位置
	 */
	setPostion(x, y, z) {
		this.position.set(x, y, z);
		this.needUpdate = true;
		return this;
	}

	/**
	 * @description 设置方位
	 */
	setQuaternion(x, y, z, w) {
		this.quaternion.set(x, y, z, w);
		this.needUpdate = true;
		return this;
	}

	/**
	 * @description 设置缩放
	 */
	setScale(x, y, z) {
		this.scale.set(x, y, z);
		this.needUpdate = true;
		return this;
	}

	set(postion: Vector3, quaternion: Quaternion, scale: Vector3) {
		this.needUpdate = true;
		this.position.copy(postion);
		this.quaternion.copy(quaternion);
		this.scale.copy(scale);
		return this;
	}

	/**
	 * @description 克隆
	 */
	clone(spatial: Spatial) {
		return new Spatial().copy(this);
	}

	/**
	 * @description 拷贝
	 */
	copy(spatial: Spatial) {
		this.position.copy(spatial.position);
		this.quaternion.copy(spatial.quaternion);
		this.scale.copy(spatial.scale);
		this.needUpdate = true;
	}

	/**
	 * @description 更新矩阵
	 */
	update() {
		if(this.needUpdate) {
			this.needUpdate = false;
			this.matrix.compose(this.position, this.quaternion, this.scale);
		}
	}
}