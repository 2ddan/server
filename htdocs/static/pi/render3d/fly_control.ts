/**
 * 
 */
import { THREE } from './three';

export interface Dimension {
	size: [number, number];
	offset: [number, number];
}

export class FlyControl {

	public dimension: Dimension;
	public target: any;

	public movementSpeed: number;
	public rollSpeed: number;

	public tmpQuaternion: THREE.Quaternion;

	public state: any;

	public moveVector: THREE.Vector3;
	public rotationVector: THREE.Vector3;

	public lastMouseX: number;
	public lastMouseY: number;

	constructor(target: any, movementSpeed: number = 80.0, rollSpeed: number = 0.1, dimension: Dimension = { size: [1, 1], offset: [0, 0] }) {

		this.target = target;
		this.dimension = dimension;

		this.movementSpeed = movementSpeed;
		this.rollSpeed = rollSpeed;

		this.tmpQuaternion = new THREE.Quaternion();

		this.state = {
			x: 0,  // 左右
			y: 0,  // 上下
			z: 0,  // 前后
			rx: 0,
			ry: 0
		};

		this.moveVector = new THREE.Vector3(0, 0, 0);
		this.rotationVector = new THREE.Vector3(0, 0, 0);
	}

	public setRollSpeed(rollSpeed: number) {
		this.rollSpeed = rollSpeed;
	}

	public setMovementSpeed(movementSpeed: number) {
		this.movementSpeed = movementSpeed;
	}

	public onMouseLDown(event: any) {
		if (event.which === 1) {
			this.updateLastPos(event.clientX, event.clientY);
		}
	}

	public onMouseMDown(event: any) {
		if (event.which === 2) {
			this.updateLastPos(event.clientX, event.clientY);
		}
	}

	public onMouseLMove(event: any) {
		if (event.which !== 1) {
			return;
		}
		const xc = event.clientX - this.lastMouseX;
		const yc = event.clientY - this.lastMouseY;
		this.state.ry = xc;
		this.state.rx = yc;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	public onMouseMMove(event: any) {
		if (event.which !== 2) {
			return;
		}

		const xc = event.clientX - this.lastMouseX;
		const yc = event.clientY - this.lastMouseY;

		this.state.x = xc;
		this.state.y = yc;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	public onMouseWheel(event: any) {
		const dy = event.deltaY;

		this.state.z = dy;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	public update(delta: number = 0.02) {
		const moveMult = delta * this.movementSpeed;
		const rotMult = delta * this.rollSpeed;

		this.target.translateX(-this.state.x * moveMult);
		this.target.translateY(this.state.y * moveMult);
		this.target.translateZ(this.state.z * moveMult);

		this.target.rotation._x += this.state.rx * rotMult;
		this.target.rotation._y += this.state.ry * rotMult;
		// this.target.rotation._z += this.state.z * rotMult;

		this.target.quaternion.setFromEuler(this.target.rotation);
	}

	public updateLastPos(x: number, y: number) {
		this.lastMouseX = x;
		this.lastMouseY = y;
	}

	public restoreState() {
		this.state.x = 0;
		this.state.y = 0;
		this.state.z = 0;
		this.state.rx = 0;
		this.state.ry = 0;
	}
}