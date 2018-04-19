
import { Vector3 } from "./vector3"
import { Matrix4 } from "./matrix4"
import { Line3 } from "./line3"
import { AABB } from "./aabb"
import { Sphere } from "./sphere"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v1: Vector3;
let _v2: Vector3;
let _m: Matrix4;

/**
 * @description 平面
 */
export class Plane {
    normal: Vector3;
    constant: number;

    /**
     * @description 构造
     */
    constructor(normal?: Vector3, constant?: number) {
        this.normal = (normal !== undefined) ? normal : new Vector3(1, 0, 0);
        this.constant = (constant !== undefined) ? constant : 0;
    }

    /**
     * @description 设置
     */
    set(normal?: Vector3, constant?: number) {
        this.normal.copy(normal);
        this.constant = constant;
        return this;
    }

    /**
     * @description 分量设置
     */
    setComponents(x: number, y: number, z: number, w: number) {
        this.normal.set(x, y, z);
        this.constant = w;
        return this;
    }

    /**
     * @description 从法线和点设置
     */
    setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3) {
        this.normal.copy(normal);
        this.constant = - point.dot(this.normal);	// must be this.normal, not normal, as this.normal is normalized
        return this;
    }

    /**
     * @description 从三个点设置
     */
    setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3) {
        if (_v1 === undefined) _v1 = new Vector3();
        if (_v2 === undefined) _v2 = new Vector3();
        let normal = _v1.subVectors(c, b).cross(_v2.subVectors(a, b)).normalize();

        // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
        this.setFromNormalAndCoplanarPoint(normal, a);
        return this;
    }

    /**
     * @description 克隆
     */
    clone() {
        return new Plane().copy(this);
    }

    /**
     * @description 拷贝
     */
    copy(plane: Plane) {
        this.normal.copy(plane.normal);
        this.constant = plane.constant;
        return this;
    }

    /**
     * @description 单位化
     */
    normalize() {
        // Note: will lead to a divide by zero if the plane is invalid.
        let inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }

    /**
     * @description 取反
     */
    negate() {
        this.constant *= - 1;
        this.normal.negate();
        return this;
    }

    /**
     * @description 点距离
     */
    distanceToPoint(point: Vector3) {
        return this.normal.dot(point) + this.constant;
    }

    /**
     * @description 球距离
     */
    distanceToSphere(sphere: Sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }

    /**
     * @description 点投影
     */
    projectPoint(point: Vector3, optionalTarget?: Vector3) {
        return this.orthoPoint(point, optionalTarget).sub(point).negate();
    }

    /**
     * @description 点正交
     */
    orthoPoint(point: Vector3, optionalTarget?: Vector3) {
        let perpendicularMagnitude = this.distanceToPoint(point);
        let result = optionalTarget || new Vector3();
        return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);
    }

    /**
     * @description 与线段相交的点
     */
    intersectLine(line: Line3, optionalTarget?: Vector3) {
        if (_v1 === undefined) _v1 = new Vector3();
        
        let result = optionalTarget || new Vector3();
        let direction = line.delta(_v1);
        let denominator = this.normal.dot(direction);
        if (denominator === 0) {
            // line is coplanar, return origin
            if (this.distanceToPoint(line.start) === 0) {
                return result.copy(line.start);
            }
            // Unsure if this is the correct method to handle this case.
            return undefined;
        }
        
        let t = - (line.start.dot(this.normal) + this.constant) / denominator;
        if (t < 0 || t > 1) {
            return undefined;
        }
        return result.copy(direction).multiplyScalar(t).add(line.start);
    }

    /**
     * @description 是否与线段相交
     */
    intersectsLine(line: Line3) {
        // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
        let startSign = this.distanceToPoint(line.start);
        let endSign = this.distanceToPoint(line.end);
        return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
    }

    /**
     * @description 是否与aabb相交
     */
    intersectsAABB(aabb: AABB) {
        return aabb.intersectsPlane(this);
    }

    /**
     * @description 是否与球相交
     */
    intersectsSphere(sphere: Sphere) {
        return sphere.intersectsPlane(this);
    }

    /**
     * @description 平面点
     */
    coplanarPoint(optionalTarget?: Vector3) {
        let result = optionalTarget || new Vector3();
        return result.copy(this.normal).multiplyScalar(- this.constant);
    }

    /**
     * @description 应用矩阵
     */
    applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix4) {
        
        if (_v1 === undefined) _v1 = new Vector3();
        if (_m === undefined) _m = new Matrix4();
        
        let referencePoint = this.coplanarPoint(_v1).applyPoint(matrix);

        // transform normal based on theory here:
        // http://www.songho.ca/opengl/gl_normaltransform.html
        let normalMatrix = optionalNormalMatrix || _m.getNormalMatrix(matrix);
        let normal = this.normal.applyVector(normalMatrix).normalize();

        // recalculate constant (like in setFromNormalAndCoplanarPoint)
        this.constant = - referencePoint.dot(normal);

        return this;
    }

    /**
     * @description 平移
     */
    translate(offset: Vector3) {
        this.constant = this.constant - offset.dot(this.normal);
        return this;
    }

    /**
     * @description 是否相等
     */
    equal(plane: Plane) {
        return plane.normal.equals(this.normal) && (plane.constant === this.constant);
    }

}