
import { Vector3 } from "./vector3"
import { Matrix4 } from "./matrix4"
import { clamp } from "../util/math"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v1: Vector3;
let _v2: Vector3;

/**
 * @description 线段
 */
export class Line3 {
    start: Vector3;
    end: Vector3;

    /**
     * @description 构造
     */
    constructor(start?: Vector3, end?: Vector3) {
        this.start = (start !== undefined) ? start : new Vector3();
        this.end = (end !== undefined) ? end : new Vector3();
    }

    /**
     * @description 设置
     */
    set(start: Vector3, end: Vector3) {
        this.start.copy(start);
        this.end.copy(end);
        return this;
    }

    /**
     * @description 克隆
     */
    clone() {
        return new Line3().copy(this);
    }

    /**
     * @description 拷贝
     */
    copy(line: Line3) {
        this.start.copy(line.start);
        this.end.copy(line.end);
        return this;
    }

    /**
     * @description 取中心点
     */
    center(optionalTarget?: Vector3) {
        let result = optionalTarget || new Vector3();
        return result.addVectors(this.start, this.end).multiplyScalar(0.5);
    }

    /**
     * @description 多长
     */
    delta(optionalTarget?: Vector3) {
        let result = optionalTarget || new Vector3();
        return result.subVectors(this.end, this.start);
    }

    /**
     * @description 距离平方
     */
    distanceSq() {
        return this.start.distanceToSq(this.end);
    }

    /**
     * @description 距离
     */
    distance() {
        return this.start.distanceTo(this.end);
    }

    /**
     * @description 伸缩
     */
    at(t: number, optionalTarget?: Vector3) {
        let result = optionalTarget || new Vector3();
        return this.delta(result).multiplyScalar(t).add(this.start);
    }

    /**
     * @description 最近距离
     */
    closestPointToPointParameter(point: Vector3, clampToLine: boolean) {
        if (_v1 === undefined) _v1 = new Vector3();
        if (_v2 === undefined) _v2 = new Vector3();

        let startP = _v1;
        let startEnd = _v2;

        startP.subVectors(point, this.start);
        startEnd.subVectors(this.end, this.start);

        let startEnd2 = startEnd.dot(startEnd);
        let startEnd_startP = startEnd.dot(startP);
        let t = startEnd_startP / startEnd2;

        if (clampToLine) {
            t = clamp(t, 0, 1);
        }
        return t;
    }

    /**
     * @description 最近距离
     */
    closestPointToPoint(point: Vector3, clampToLine: boolean, optionalTarget?: Vector3) {
        let t = this.closestPointToPointParameter(point, clampToLine);
        let result = optionalTarget || new Vector3();
        return this.delta(result).multiplyScalar(t).add(this.start);
    }

    /**
     * @description 矩阵应用
     */
    applyMatrix4(matrix: Matrix4) {
        this.start.applyPoint(matrix);
        this.end.applyPoint(matrix);
        return this;
    }

    /**
     * @description 是否相等
     */
    equal(line: Line3) {
        return line.start.equals(this.start) && line.end.equals(this.end);
    }

}