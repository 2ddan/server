import { THREE } from "./three"

export interface Dimension {
	size: [number, number];
	offset: [number, number];
};

export class FlyControl {

	dimension: Dimension;
	target: any;

	movementSpeed: number;
	rollSpeed: number;

	tmpQuaternion: THREE.Quaternion;

	state: any;
	
	moveVector: THREE.Vector3;
	rotationVector: THREE.Vector3;

	lastMouseX: number;
	lastMouseY: number;

	constructor(target: any, movementSpeed = 80.0, rollSpeed = 0.1, dimension: Dimension = {size: [1, 1], offset: [0, 0]}) {
		
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

	setRollSpeed(rollSpeed){
		this.rollSpeed = rollSpeed;
	};

	setMovementSpeed(movementSpeed){
		this.movementSpeed = movementSpeed;
	};

	onMouseLDown(event) {
		if (event.which === 1) {
			this.updateLastPos(event.clientX, event.clientY);
		}
	}

	onMouseMDown(event) {
		if (event.which === 2) {
			this.updateLastPos(event.clientX, event.clientY);
		}
	}

	onMouseLMove(event) {
		if(event.which !== 1)
			return;
		let xc = event.clientX - this.lastMouseX;
		let yc = event.clientY - this.lastMouseY;
		this.state.ry = xc;
		this.state.rx = yc;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	onMouseMMove(event) {
		if (event.which !== 2) {
			return;
		}

		let xc = event.clientX - this.lastMouseX;
    	let yc = event.clientY - this.lastMouseY;

		this.state.x = xc;
		this.state.y = yc;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	onMouseWheel(event) {
		let dy = event.deltaY;

		this.state.z = dy;

		this.update();
		this.updateLastPos(event.clientX, event.clientY);
		this.restoreState();
	}

	update(delta = 0.02) {
		var moveMult = delta * this.movementSpeed;
		var rotMult = delta * this.rollSpeed;

		this.target.translateX(-this.state.x * moveMult);
		this.target.translateY(this.state.y * moveMult);
		this.target.translateZ(this.state.z * moveMult);

		this.target.rotation._x += this.state.rx * rotMult;
		this.target.rotation._y += this.state.ry * rotMult;
		//this.target.rotation._z += this.state.z * rotMult;

		this.target.quaternion.setFromEuler(this.target.rotation);
	}

	updateLastPos(x: number, y: number) {
		this.lastMouseX = x;
		this.lastMouseY = y;
	}

	restoreState() {
		this.state.x = 0;
		this.state.y = 0;
		this.state.z = 0;
		this.state.rx = 0;
		this.state.ry = 0;
	}
};