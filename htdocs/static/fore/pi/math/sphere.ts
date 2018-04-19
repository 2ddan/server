
import { Vector3 } from "./vector3"
import { Matrix4 } from "./matrix4"

import { AABB } from "./aabb"
import { Plane } from "./plane"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _aabb: AABB;

/**
 * @description 球
 */
export class Sphere {
    center: Vector3; // 圆心
    radius: number;  // 半径

    /**
     * @description 构造
     */
    constructor(center?: Vector3, radius?: number) {
        this.center = (center !== undefined) ? center : new Vector3();
        this.radius = (radius !== undefined) ? radius : 0;
    }

    /**
     * @description 设置
     */
    set(center: Vector3, radius: number) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }

    /**
     * @description 从点中设置
     */
    setFromPoints(points: Vector3[], optionalCenter?: Vector3) {
        if (_aabb === undefined) _aabb = new AABB();

        let center = this.center;
        if (optionalCenter !== undefined) {
            center.copy(optionalCenter);
        } else {
            _aabb.setFromPoints(points).center(center);
        }

        let maxRadiusSq = 0;
        for (let i = 0, il = points.length; i < il; i++) {
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSq(points[i]));
        }
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }

    /**
     * @description 克隆
     */
    clone() {
        return new Sphere().copy(this);
    }

    /**
     * @description 拷贝
     */
    copy(sphere: Sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }

    /**
     * @description 是否为空
     */
    empty() {
        return (this.radius <= 0);
    }

    /**
     * @description 是否包含点
     */
    containsPoint(point: Vector3) {
        return (point.distanceToSq(this.center) <= (this.radius * this.radius));
    }

    /**
     * @description 到点的距离
     */
    distanceToPoint(point: Vector3) {
        return (point.distanceTo(this.center) - this.radius);
    }

    /**
     * @description 是否和球相交
     */
    intersectsSphere(sphere: Sphere) {
        let radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSq(this.center) <= (radiusSum * radiusSum);
    }

    /**
     * @description AABB相交
     */
    intersectsAABB(aabb: AABB) {
        return aabb.intersectsSphere(this);
    }

    /**
     * @description 平面相交
     */
    intersectsPlane(plane: Plane) {
        // We use the following equation to compute the signed distance from
        // the center of the sphere to the plane.
        //
        // distance = q * n - d
        //
        // If this distance is greater than the radius of the sphere,
        // then there is no intersection.
        return Math.abs(this.center.dot(plane.normal) - plane.constant) <= this.radius;
    }

    /**
     * @description 裁剪点
     */
    clampPoint(point: Vector3, optionalTarget?: Vector3) {
        let deltaLengthSq = this.center.distanceToSq(point);
        let result = optionalTarget || new Vector3();
        result.copy(point);
        if (deltaLengthSq > (this.radius * this.radius)) {
            result.sub(this.center).normalize();
            result.multiplyScalar(this.radius).add(this.center);
        }
        return result;
    }

    /**
     * @description 取AABB
     */
    getBoundingBox(optionalTarget?: AABB) {
        let box = optionalTarget || new AABB();
        box.set(this.center, this.center);
        box.expandByScalar(this.radius);
        return box;
    }

    /**
     * @description 矩阵应用
     */
    applyMatrix4(matrix: Matrix4) {
        this.center.applyPoint(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }

    /**
     * @description 平移
     */
    translate(offset: Vector3) {
        this.center.add(offset);
        return this;
    }

    /**
     * @description 相等
     */
    equal(sphere: Sphere) {
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
    }

}