import { Vector3 } from "./vector3"
import { Plane } from "./plane"
import { Line3 } from "./line3"

/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
let _v1: Vector3;
let _v2: Vector3;
let _v3: Vector3;

let _plane: Plane;
let _edgeList: [Line3, Line3, Line3];

/**
 * @description 三角形
 */
export class Triangle {
	a: Vector3;
	b: Vector3;
	c: Vector3;

	/**
	 * @description
	 */
	constructor(a?: Vector3, b?: Vector3, c?: Vector3) {
		this.a = (a !== undefined) ? a : new Vector3();
		this.b = (b !== undefined) ? b : new Vector3();
		this.c = (c !== undefined) ? c : new Vector3();
	};

	/**
	 * @description
	 */
	static normal(a: Vector3, b: Vector3, c: Vector3, optionalTarget?: Vector3) {
		if (_v1 === undefined) _v1 = new Vector3();

		let result = optionalTarget || new Vector3();
		result.subVectors(c, b);
		_v1.subVectors(a, b);
		result.cross(_v1);

		let resultLengthSq = result.lengthSq();
		if (resultLengthSq > 0) {
			return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
		}
		return result.set(0, 0, 0);
	}

	/**
	 * @description
	 */
	static barycoordFromPoint(point, a, b, c, optionalTarget) {
		// static/instance method to calculate barycentric coordinates
		// based on: http://www.blackpawn.com/texts/pointinpoly/default.html

		if (_v1 === undefined) _v1 = new Vector3();
		if (_v2 === undefined) _v2 = new Vector3();
		if (_v3 === undefined) _v3 = new Vector3();

		_v1.subVectors(c, a);
		_v2.subVectors(b, a);
		_v3.subVectors(point, a);

		let dot00 = _v1.dot(_v1);
		let dot01 = _v1.dot(_v2);
		let dot02 = _v1.dot(_v3);
		let dot11 = _v2.dot(_v2);
		let dot12 = _v2.dot(_v3);

		let denom = (dot00 * dot11 - dot01 * dot01);
		let result = optionalTarget || new Vector3();
		// collinear or singular triangle
		if (denom === 0) {
			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return result.set(- 2, - 1, - 1);
		}

		let invDenom = 1 / denom;
		let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		let v = (dot00 * dot12 - dot01 * dot02) * invDenom;
		// barycentric coordinates must always sum to 1
		return result.set(1 - u - v, v, u);
	}

	/**
	 * @description
	 */
	static containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3) {
		if (_v1 === undefined) _v1 = new Vector3();
		let result = Triangle.barycoordFromPoint(point, a, b, c, _v1);
		return (result.x >= 0) && (result.y >= 0) && ((result.x + result.y) <= 1);
	}

	/**
	 * @description
	 */
	set(a: Vector3, b: Vector3, c: Vector3) {
		this.a.copy(a);
		this.b.copy(b);
		this.c.copy(c);
		return this;
	}

	/**
	 * @description
	 */
	setFromPointsAndIndices(points: Vector3[], i0: number, i1: number, i2: number) {
		this.a.copy(points[i0]);
		this.b.copy(points[i1]);
		this.c.copy(points[i2]);
		return this;
	}

	/**
	 * @description
	 */
	clone() {
		return new Triangle().copy(this);
	}

	/**
	 * @description
	 */
	copy(triangle: Triangle) {
		this.a.copy(triangle.a);
		this.b.copy(triangle.b);
		this.c.copy(triangle.c);
		return this;
	}

	/**
	 * @description
	 */
	area() {
		if (_v1 === undefined) _v1 = new Vector3();
		if (_v2 === undefined) _v2 = new Vector3();
		_v1.subVectors(this.c, this.b);
		_v2.subVectors(this.a, this.b);
		return _v1.cross(_v2).length() * 0.5;
	}

	/**
	 * @description
	 */
	midpoint(optionalTarget?: Vector3) {
		let result = optionalTarget || new Vector3();
		return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}

	/**
	 * @description
	 */
	normal(optionalTarget?: Vector3) {
		return Triangle.normal(this.a, this.b, this.c, optionalTarget);
	}

	/**
	 * @description
	 */
	plane(optionalTarget?: Plane) {
		let result = optionalTarget || new Plane();
		return result.setFromCoplanarPoints(this.a, this.b, this.c);
	}

	/**
	 * @description
	 */
	barycoordFromPoint(point: Vector3, optionalTarget?: Vector3) {
		return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
	}

	/**
	 * @description
	 */
	containsPoint(point: Vector3) {
		return Triangle.containsPoint(point, this.a, this.b, this.c);
	}

	/**
	 * @description
	 */
	closestPointToPoint(point: Vector3, optionalTarget?: Vector3) {

		if (_v1 === undefined) _v1 = new Vector3();
		if (_v2 === undefined) _v2 = new Vector3();
		if (_plane === undefined) _plane = new Plane();
		if (_edgeList === undefined) _edgeList = [new Line3(), new Line3(), new Line3()];
		
		let projectedPoint = _v1, closestPoint = _v2;
		
		let result = optionalTarget || new Vector3();
		let minDistance = Infinity;

		// project the point onto the plane of the triangle
		_plane.setFromCoplanarPoints(this.a, this.b, this.c);
		_plane.projectPoint(point, projectedPoint);

		// check if the projection lies within the triangle
		if (this.containsPoint(projectedPoint) === true) {
			// if so, this is the closest point
			result.copy(projectedPoint);
		} else {
			// if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices
			_edgeList[0].set(this.a, this.b);
			_edgeList[1].set(this.b, this.c);
			_edgeList[2].set(this.c, this.a);
			for (let i = 0; i < _edgeList.length; i++) {
				_edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);

				let distance = projectedPoint.distanceToSq(closestPoint);
				if (distance < minDistance) {
					minDistance = distance;
					result.copy(closestPoint);
				}
			}
		}
		return result;
	}

	/**
	 * @description
	 */
	equals(triangle: Triangle) {
		return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
	}

}