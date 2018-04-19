
import { Vector3 } from "./vector3"
import { Matrix4 } from "./matrix4"

import { Sphere } from "./sphere"
import { Plane } from "./plane"
import { AABB } from "./aabb"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v1: Vector3;
let _v2: Vector3;

/**
 * @description 视锥体
 */
export class Frustum {

	/**
	 * @description 六个面
	 */
	planes: [Plane, Plane, Plane, Plane, Plane, Plane];

	/**
	 * @description 构造
	 */
	constructor(p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane, p6?: Plane) {
		this.planes = [
			(p1 !== undefined) ? p1 : new Plane(),
			(p2 !== undefined) ? p2 : new Plane(),
			(p3 !== undefined) ? p3 : new Plane(),
			(p4 !== undefined) ? p4 : new Plane(),
			(p5 !== undefined) ? p5 : new Plane(),
			(p6 !== undefined) ? p6 : new Plane()
		]
	}

	/**
	 * @description 设置
	 */
	set(p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane, p6: Plane) {
		let planes = this.planes;
		planes[0].copy(p1);
		planes[1].copy(p2);
		planes[2].copy(p3);
		planes[3].copy(p4);
		planes[4].copy(p5);
		planes[5].copy(p6);
		return this;
	}

	/**
	 * @description 克隆
	 */
	clone() {
		return new Frustum().copy(this);
	}

	/**
	 * @description 拷贝 
	 */
	copy(frustum: Frustum) {
		let planes = this.planes;
		for (let i = 0; i < 6; i++) {
			planes[i].copy(frustum.planes[i]);
		}
		return this;
	}

	/**
	 * @description 从矩阵中设置
	 */
	setFromMatrix(m: Matrix4) {
		let planes = this.planes;
		let me = m.elements;
		let me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
		let me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
		let me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
		let me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

		planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
		planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
		planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
		planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
		planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
		planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
		return this;
	}

	/**
	 * @description 与球相交
	 */
	intersectsSphere(sphere: Sphere) {
		let planes = this.planes;
		let center = sphere.center;
		let negRadius = - sphere.radius;
		for (let i = 0; i < 6; i++) {
			let distance = planes[i].distanceToPoint(center);
			if (distance < negRadius) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @description 与AABB相交
	 */
	intersectsAABB(aabb: AABB) {
		if (_v1 === undefined) _v1 = new Vector3();
		if (_v2 === undefined) _v2 = new Vector3();

		let planes = this.planes;
		for (let i = 0; i < 6; i++) {
			let plane = planes[i];

			_v1.x = plane.normal.x > 0 ? aabb.min.x : aabb.max.x;
			_v2.x = plane.normal.x > 0 ? aabb.max.x : aabb.min.x;
			_v1.y = plane.normal.y > 0 ? aabb.min.y : aabb.max.y;
			_v2.y = plane.normal.y > 0 ? aabb.max.y : aabb.min.y;
			_v1.z = plane.normal.z > 0 ? aabb.min.z : aabb.max.z;
			_v2.z = plane.normal.z > 0 ? aabb.max.z : aabb.min.z;

			let d1 = plane.distanceToPoint(_v1);
			let d2 = plane.distanceToPoint(_v2);

			// if both outside plane, no intersection
			if (d1 < 0 && d2 < 0) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @description 是否包含点
	 */
	containsPoint(point: Vector3) {
		let planes = this.planes;
		for (let i = 0; i < 6; i++) {
			if (planes[i].distanceToPoint(point) < 0) {
				return false;
			}
		}
		return true;
	}

}