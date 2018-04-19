import {equal} from "../util/math"
import { Vector3 } from "./vector3"
import { Matrix4 } from "./matrix4"
import { Euler, RotationOrder } from "./euler"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v: Vector3;

/**
 * @description 四元数
 */
export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    /**
     * @description 构造
     */
    constructor(x?: number, y?: number, z?: number, w?: number) {
        this.x = x !== undefined ? x : 0.0;
        this.y = y !== undefined ? y : 0.0;
        this.z = z !== undefined ? z : 0.0;
        this.w = w !== undefined ? w : 1.0;
    }

    /**
     * @description 设置
     */
    set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    /**
     * @description 克隆
     */
    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    /**
     * @description 拷贝
     */
    copy(quaternion: Quaternion) {
        this.x = quaternion.x;
        this.y = quaternion.y;
        this.z = quaternion.z;
        this.w = quaternion.w;
        return this;
    }

    /**
     * @description 从欧拉角设置
     */
    setFromEuler(euler: Euler) {

        // http://www.mathworks.com/matlabcentral/fileexchange/
        // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //	content/SpinCalc.m

        let c1 = Math.cos(euler.x / 2);
        let c2 = Math.cos(euler.y / 2);
        let c3 = Math.cos(euler.z / 2);
        let s1 = Math.sin(euler.x / 2);
        let s2 = Math.sin(euler.y / 2);
        let s3 = Math.sin(euler.z / 2);

        let order = euler.order;

        if (order === RotationOrder.XYZ) {
            this.x = s1 * c2 * c3 + c1 * s2 * s3;
            this.y = c1 * s2 * c3 - s1 * c2 * s3;
            this.z = c1 * c2 * s3 + s1 * s2 * c3;
            this.w = c1 * c2 * c3 - s1 * s2 * s3;
        } else if (order === RotationOrder.YXZ) {
            this.x = s1 * c2 * c3 + c1 * s2 * s3;
            this.y = c1 * s2 * c3 - s1 * c2 * s3;
            this.z = c1 * c2 * s3 - s1 * s2 * c3;
            this.w = c1 * c2 * c3 + s1 * s2 * s3;
        } else if (order === RotationOrder.ZXY) {
            this.x = s1 * c2 * c3 - c1 * s2 * s3;
            this.y = c1 * s2 * c3 + s1 * c2 * s3;
            this.z = c1 * c2 * s3 + s1 * s2 * c3;
            this.w = c1 * c2 * c3 - s1 * s2 * s3;
        } else if (order === RotationOrder.ZYX) {
            this.x = s1 * c2 * c3 - c1 * s2 * s3;
            this.y = c1 * s2 * c3 + s1 * c2 * s3;
            this.z = c1 * c2 * s3 - s1 * s2 * c3;
            this.w = c1 * c2 * c3 + s1 * s2 * s3;
        } else if (order === RotationOrder.YZX) {
            this.x = s1 * c2 * c3 + c1 * s2 * s3;
            this.y = c1 * s2 * c3 + s1 * c2 * s3;
            this.z = c1 * c2 * s3 - s1 * s2 * c3;
            this.w = c1 * c2 * c3 - s1 * s2 * s3;
        } else if (order === RotationOrder.XZY) {
            this.x = s1 * c2 * c3 - c1 * s2 * s3;
            this.y = c1 * s2 * c3 - s1 * c2 * s3;
            this.z = c1 * c2 * s3 + s1 * s2 * c3;
            this.w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        return this;
    }

    /**
     * @description 从轴和角度构建
     * @param axis 轴，必须是单位向量
     * @param angleRad 角度，单位：弧度
     */
    setFromAxisAngle(axis: Vector3, angleRad: number) {
        let halfAngle = angleRad / 2, s = Math.sin(halfAngle);
        this.x = axis.x * s;
        this.y = axis.y * s;
        this.z = axis.z * s;
        this.w = Math.cos(halfAngle);
        return this;
    }

    /**
     * @description 从旋转矩阵设置四元数
     * @param m 纯旋转矩阵，不含缩放分量
     */
    setFromRotationMatrix(m: Matrix4) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        let te = m.elements;

        let m11 = te[0], m12 = te[4], m13 = te[8];
        let m21 = te[1], m22 = te[5], m23 = te[9];
        let m31 = te[2], m32 = te[6], m33 = te[10];

        let trace = m11 + m22 + m33;
        if (trace > 0) {
            let s = 0.5 / Math.sqrt(trace + 1.0);
            this.w = 0.25 / s;
            this.x = (m32 - m23) * s;
            this.y = (m13 - m31) * s;
            this.z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            let s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this.w = (m32 - m23) / s;
            this.x = 0.25 * s;
            this.y = (m12 + m21) / s;
            this.z = (m13 + m31) / s;
        } else if (m22 > m33) {
            let s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this.w = (m13 - m31) / s;
            this.x = (m12 + m21) / s;
            this.y = 0.25 * s;
            this.z = (m23 + m32) / s;
        } else {
            let s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this.w = (m21 - m12) / s;
            this.x = (m13 + m31) / s;
            this.y = (m23 + m32) / s;
            this.z = 0.25 * s;
        }
        return this;
    }

    /**
     * @description 单位向量中获取四元数
     * @param vFrom 单位向量
     * @param vTo   单位向量
     */
    setFromUnitVectors(vFrom: Vector3, vTo: Vector3) {
        // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
        let EPS = 0.0001;

        if (_v === undefined) _v = new Vector3();
        let r = vFrom.dot(vTo) + 1;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                _v.set(- vFrom.y, vFrom.x, 0);
            } else {
                _v.set(0, - vFrom.z, vFrom.y);
            }
        } else {
            _v.crossVectors(vFrom, vTo);
        }

        this.x = _v.x;
        this.y = _v.y;
        this.z = _v.z;
        this.w = r;
        this.normalize();

        return this;
    }

    /**
     * @description 逆
     */
    inverse() {
        this.conjugate().normalize();
        return this;
    }

    /**
     * @description 共轭 
     */
    conjugate() {
        this.x *= - 1;
        this.y *= - 1;
        this.z *= - 1;
        return this;
    }

    /**
     * @description 点积
     */
    dot(v: Quaternion) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    /**
     * @description 长度平方
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    /**
     * @description 长度
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    /**
     * @description 单位化
     */
    normalize() {
        let l = this.length();
        if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        } else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;
        }
        return this;
    }

    /**
     * @description 相乘 this *= q
     */
    multiply(q: Quaternion) {
        return this.multiplyQuaternions(this, q);
    }

    /**
     * @description 相乘 this = a * b
     */
    multiplyQuaternions(a: Quaternion, b: Quaternion) {

        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

        let qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        let qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return this;
    }

    /**
     * @description 球面插值
     */
    slerp(qb: Quaternion, t: number) {

        if (t === 0) return this;
        if (t === 1) return this.copy(qb);

        let x = this.x, y = this.y, z = this.z, w = this.w;

        // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

        let cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;
        if (cosHalfTheta < 0) {
            this.w = - qb.w;
            this.x = - qb.x;
            this.y = - qb.y;
            this.z = - qb.z;
            cosHalfTheta = - cosHalfTheta;
        } else {
            this.copy(qb);
        }
        if (cosHalfTheta >= 1.0) {
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }

        let sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
            this.w = 0.5 * (w + this.w);
            this.x = 0.5 * (x + this.x);
            this.y = 0.5 * (y + this.y);
            this.z = 0.5 * (z + this.z);
            return this;
        }

        let halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        let ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

        this.w = (w * ratioA + this.w * ratioB);
        this.x = (x * ratioA + this.x * ratioB);
        this.y = (y * ratioA + this.y * ratioB);
        this.z = (z * ratioA + this.z * ratioB);

        return this;
    }

    /**
     * @description 相等
     */
    equal(q: Quaternion) {
        return equal(q.x, this.x) && equal(q.y, this.y) && equal(q.z, this.z) && equal(q.w, this.w);
    }

    /**
     * @description 从数组中构造
     */
    fromArray(array: number[], offset: number) {
        if (offset === undefined) offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }

    /**
     * @description 将值放到数组
     */
    toArray(array: number[], offset: number) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    /**
     * @description 平面插值
     */
    slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

        // fuzz-free, array-based Quaternion SLERP operation
        let x0 = src0[srcOffset0 + 0],
            y0 = src0[srcOffset0 + 1],
            z0 = src0[srcOffset0 + 2],
            w0 = src0[srcOffset0 + 3],

            x1 = src1[srcOffset1 + 0],
            y1 = src1[srcOffset1 + 1],
            z1 = src1[srcOffset1 + 2],
            w1 = src1[srcOffset1 + 3];

        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

            let s = 1 - t,

                cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

                dir = (cos >= 0 ? 1 : - 1),
                sqrSin = 1 - cos * cos;

            // Skip the Slerp for tiny steps to avoid numeric problems:
            if (sqrSin > Number.EPSILON) {

                let sin = Math.sqrt(sqrSin),
                    len = Math.atan2(sin, cos * dir);

                s = Math.sin(s * len) / sin;
                t = Math.sin(t * len) / sin;

            }

            let tDir = t * dir;

            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;

            // Normalize in case we just did a lerp:
            if (s === 1 - t) {

                let f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;

            }

        }

        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    }

}