
import { Quaternion } from "./quaternion"
import { Matrix4 } from "./matrix4"
import { Euler } from "./euler"
import { Spherical } from "./spherical"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v: Vector3;

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _q: Quaternion;

export class Vector3 {

	/**
	 * @description x, y, z
	 */
	x: number;
	y: number;
	z: number;

    /**
     * @description 构造函数
     * @note 这里为了性能考虑，不用默认参数
     */
	constructor(x?: number, y?: number, z?: number) {
		this.x = x || 0.0;
		this.y = y || 0.0;
		this.z = z || 0.0;
	}

    /**
     * @description 设置函数
     */
	set(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

    /**
     * @description 设置标量
     */
	setScalar(scalar: number) {
		this.x = this.y = this.z = scalar;
		return this;
	}

    /**
     * @description 取x
     */
	getX() {
		return this.x;
	}

    /**
     * @description 取y
     */
	getY() {
		return this.y;
	}

    /**
     * @description 取z
     */
	getZ() {
		return this.z;
	}

	/**
	 * 判断v和this是否相等
	 */
	equals(v: Vector3) {
		return (
			Math.abs(v.x - this.x) < 0.0001 &&
			Math.abs(v.y - this.y) < 0.0001 &&
			Math.abs(v.z - this.z) < 0.0001
		);
	}

	/**
	 * 从数组array的offset中取值
	 */
	fromArray(array: number[] | Float32Array, offset?: number) {
		offset = offset || 0;
		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];
		return this;
	}

	/**
	 * 赋值到array去
	 */
	toArray(array?: number[], offset?: number) {
		if (array === undefined) array = [];
		if (offset === undefined) offset = 0;
		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;
		return array;
	}

    /**
     * @description 拷贝
     */
	copy(src: Vector3) {
		this.x = src.x;
		this.y = src.y;
		this.z = src.z;
		return this;
	}

	/**
     * @description 克隆
     */
	clone() {
		return new Vector3(this.x, this.y, this.z);
	}

    /**
     * @description this += src
     */
	add(src: Vector3) {
		this.x += src.x;
		this.y += src.y;
		this.z += src.z;
		return this;
	}

    /**
     * @description this += new Vector3(scalar, scalar, scalar)
     */
	addScalar(scalar: number) {
		this.x += scalar;
		this.y += scalar;
		this.z += scalar;
		return this;
	}

    /**
     * @description this = src1 + src2;
     */
	addVectors(src1: Vector3, src2: Vector3) {
		this.x = src1.x + src2.x;
		this.y = src1.y + src2.y;
		this.z = src1.z + src2.z;
		return this;
	}

    /**
     * @description this += scalar * src;
     */
	addScaledVector(src: Vector3, scalar: number) {
		this.x += scalar * src.x;
		this.y += scalar * src.y;
		this.z += scalar * src.z;
		return this;
	}

    /**
     * @description this -= src;
     */
	sub(src: Vector3) {
		this.x -= src.x;
		this.y -= src.y;
		this.z -= src.z;
		return this;
	}

    /**
     * @description this -= new Vector3(scalar, scalar, scalar)
     */
	subScalar(scalar: number) {
		this.x -= scalar;
		this.y -= scalar;
		this.z -= scalar;
		return this;
	}

    /**
     * @description this = src1 - src2;
     */
	subVectors(src1: Vector3, src2: Vector3) {
		this.x = src1.x - src2.x;
		this.y = src1.y - src2.y;
		this.z = src1.z - src2.z;
		return this;
	}

    /**
     * @description this *= src;
     */
	multiply(src: Vector3) {
		this.x *= src.x;
		this.y *= src.y;
		this.z *= src.z;
		return this;
	}

    /**
     * @description this *= new Vector3(scaler, scaler, scaler);
     */
	multiplyScalar(scalar: number) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}

    /**
     * @description this = src1 * src2;
     */
	multiplyVectors(src1: Vector3, src2: Vector3) {
		this.x = src1.x * src2.x;
		this.y = src1.y * src2.y;
		this.z = src1.z * src2.z;
		return this;
	}

	/**
	 * @description this /= src;
	 */
	divide(src: Vector3) {
		this.x /= src.x;
		this.y /= src.y;
		this.z /= src.z;
		return this;
	}

	/**
	 * @description this /= new Vector3(scalar, scalar, scalar)
	 */
	divideScalar(scalar: number) {
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}

	/**
	 * @description this = this, src对应分量的最小值
	 */
	min(src: Vector3) {
		this.x = this.x < src.x ? this.x : src.x;
		this.y = this.y < src.y ? this.y : src.y;
		this.z = this.z < src.z ? this.z : src.z;
		return this;
	}

	/**
	 * @description this = this, src对应分量的最大值
	 */
	max(src: Vector3) {
		this.x = this.x > src.x ? this.x : src.x;
		this.y = this.y > src.y ? this.y : src.y;
		this.z = this.z > src.z ? this.z : src.z;
		return this;
	}

	/**
	 * @description this 的对应分量截取在min到max之间
	 * @note 假设 min < max
	 */
	clamp(min: Vector3, max: Vector3) {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
		return this;
	}

	/**
	 * @description this 的对应分量截取在min到max之间
	 * @note 假设 min < max
	 */
	clampScalar(min: number, max: number) {
		this.x = Math.max(min, Math.min(max, this.x));
		this.y = Math.max(min, Math.min(max, this.y));
		this.z = Math.max(min, Math.min(max, this.z));
		return this;
	}

	/**
	 * @description 取相反数
	 */
	negate() {
		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		return this;
	}

	/**
	 * @description 点积
	 */
	dot(src: Vector3) {
		return this.x * src.x + this.y * src.y + this.z * src.z;
	}

	/**
	 * @description 长度的平方
	 */
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	/**
	 * @description 长度
	 */
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	/**
	 * @description 曼哈顿长度
	 */
	lengthManhattan() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}

	/**
	 * @description 单位化
	 */
	normalize() {
		return this.divideScalar(this.length());
	}

	/**
	 * @description 将向量的长度改为length
	 */
	setLength(length: number) {
		return this.multiplyScalar(length / this.length());
	}

	/**
	 * @description 线性插值 this = v * alpha + this * (1 - alpha)
	 */
	lerp(v: Vector3, alpha: number) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;
		return this;
	}

	/**
	 * @description 线性插值 this = v2 * alpha + v1 * (1 - alpha)
	 */
	lerpVectors(v1: Vector3, v2: Vector3, alpha: number) {
		this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
		return this;
	}

	/**
	 * @description 叉乘 this = this * v
	 */
	cross(v: Vector3) {
		let x = this.x, y = this.y, z = this.z;
		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;
		return this;
	}

	/**
	 * @description 叉乘 this = a * b
	 */
	crossVectors(a: Vector3, b: Vector3) {
		// 注：全部取出来放到临时变量是因为有可能this和a或者b是同一个对象
		let ax = a.x, ay = a.y, az = a.z;
		let bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
		return this;
	}

	/**
	 * @description 计算this在v的投影向量
	 */
	projectOnVector(v: Vector3) {
		if (_v === undefined) {
			_v = new Vector3();
		}
		_v.copy(v).normalize();
		let dot = this.dot(_v);
		return this.copy(_v).multiplyScalar(dot);
	}

	/**
	 * @description 计算this在平面的投影向量
	 */
	projectOnPlane(planeNormal: Vector3) {
		if (_v === undefined) {
			_v = new Vector3();
		}
		_v.copy(this).projectOnVector(planeNormal);
		return this.sub(_v);
	}

	/**
	 * @description 计算this在normal的反射向量
	 */
	reflect(normal: Vector3) {
		if (_v === undefined) {
			_v = new Vector3();
		}
		return this.sub(_v.copy(normal).multiplyScalar(2 * this.dot(normal)));
	};

	/**
	 * @description 计算this和v之间的夹角
	 */
	angleTo(v: Vector3) {
		let theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));

		// acos的定义域在 [-1, 1]
		theta = theta < -1 ? -1 : theta;
		theta = theta > 1 ? 1 : theta;

		return Math.acos(theta);
	}

	/**
	 * @description 计算this到v的距离的平方
	 */
	distanceToSq(v: Vector3) {
		let dx = this.x - v.x;
		let dy = this.y - v.y;
		let dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	}

	/**
	 * @description 计算this到v的距离
	 */
	distanceTo(v: Vector3) {
		return Math.sqrt(this.distanceToSq(v));
	}

	/**
	 * @description 应用欧拉角 旋转到本向量
	 */
	applyEuler(euler: Euler) {
		if (_q === undefined) {
			_q = new Quaternion();
		}
		this.applyQuaternion(_q.setFromEuler(euler));
		return this;
	}

	/**
	 * @description 应用轴-角度 旋转到本向量
	 * @param angleRed 单位弧度
	 */
	applyAxisAngle(axis: Vector3, angleRad: number) {
		if (_q === undefined) {
			_q = new Quaternion();
		}
		this.applyQuaternion(_q.setFromAxisAngle(axis, angleRad));
		return this;
	}

	/**
	 * @description 应用矩阵到向量
	 */
	applyVector(m: Matrix4) {
		let x = this.x, y = this.y, z = this.z;
		let e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8] * z;
		this.y = e[1] * x + e[5] * y + e[9] * z;
		this.z = e[2] * x + e[6] * y + e[10] * z;
		return this;
	}

	/**
	 * @description 应用矩阵到点
	 * @param m 仿射矩阵
	 */
	applyPoint(m: Matrix4) {
		let x = this.x, y = this.y, z = this.z;
		let e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
		return this;
	}

	/**
	 * @description 应用矩阵到点
	 * @param m 投影矩阵
	 */
	applyProjection(m: Matrix4) {
		let x = this.x, y = this.y, z = this.z;
		let e = m.elements;
		let d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide

		this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
		this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
		this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
		return this;
	}

	/**
	 * @description 应用四元数 旋转到本向量
	 */
	applyQuaternion(q: Quaternion) {
		let x = this.x, y = this.y, z = this.z;

		let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		let ix = qw * x + qy * z - qz * y;
		let iy = qw * y + qz * x - qx * z;
		let iz = qw * z + qx * y - qy * x;
		let iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;
	}

	/**
	 * @description 球面坐标转直角坐标
	 */
	setFromSpherical(s: Spherical) {
		let sinPhiRadius = Math.sin(s.phi) * s.radius;
		this.x = sinPhiRadius * Math.sin(s.theta);
		this.y = Math.cos(s.phi) * s.radius;
		this.z = sinPhiRadius * Math.cos(s.theta);
		return this;
	}

	/**
	 * @description 从矩阵中取出位置分量
	 */
	setFromMatrixPosition(m: Matrix4) {
		return this.setFromMatrixColumn(m, 3);
	}

	/**
	 * @description 从矩阵中取出缩放分量
	 */
	setFromMatrixScale(m: Matrix4) {
		let sx = this.setFromMatrixColumn(m, 0).length();
		let sy = this.setFromMatrixColumn(m, 1).length();
		let sz = this.setFromMatrixColumn(m, 2).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;
		return this;
	}

	/**
	 * @description 取矩阵的第index列
	 */
	setFromMatrixColumn(m: Matrix4, index: number) {
		return this.fromArray(m.elements, 4 * index);
	}

}