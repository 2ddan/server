
export let WIDTH  = 960;
export let HEIGHT = 540;


export let CURR_WIDTH  = 960;
export let CURR_HEIGHT = 540;

export const initCurrWidth = ( w: number )=>{
	CURR_WIDTH = w;
}
export const initCurrHeight = ( h: number )=>{
	CURR_HEIGHT = h;
}

export let defualCamera3D = {
	"name" : "Camera",
	"type" : "node",
	"transform" : {
		"position" : [
			0.0,
			3.79999995231628,
			4.80000019073486
		],
		"scale"    : [
			1.0,
			1.0,
			-1.0
		],
		"rotate"   : [
			0.488692134618759,
			3.14159297943115,
			0.0
		]
	},
	"camera"    : {
		"type" : "Camera",
		"perspective" : [
			60.0,
			// CURR_WIDTH / CURR_HEIGHT,
			WIDTH / HEIGHT,
			0.001,
			10000.0
		]
	}
};

export const getDefualtCamera = ()=>{
	return {
		"name" : "Camera",
		"type" : "node",
		"transform" : {
			"position" : [
				0.0,
				3.79999995231628,
				4.80000019073486
			],
			"scale"    : [
				1.0,
				1.0,
				-1.0
			],
			"rotate"   : [
				0.488692134618759,
				3.14159297943115,
				0.0
			]
		},
		"camera"    : {
			"type" : "Camera",
			"perspective" : [
				60.0,
				// CURR_WIDTH / CURR_HEIGHT,
				WIDTH / HEIGHT,
				0.001,
				10000.0
			]
		}
	};
}

export let defualCamera2D = {
	camera: {
		// ortho: [0, -CURR_WIDTH, 0, -CURR_HEIGHT, -100000, 100000]
		ortho: [0, -WIDTH, 0, -HEIGHT, -100000, 100000]
	},
	transform: {
		position: [-0, -0, 0],
		rotate: [0, 0, 0],
		scale: [1, 1, 1]
	}
};

export const getDefualtCamera2D = ()=>{
	return {
		camera: {
			ortho: [0, -CURR_WIDTH, 0, -CURR_HEIGHT, -100000, 100000]
		},
		transform: {
			position: [-0, -0, 0],
			rotate: [0, 0, 0],
			scale: [1, 1, 1]
		}
	};
}


export let defualCamera3DRT = {
	camera: {
		perspective: [30, 960 / 560, 0.001, 10000]
	},
	transform: {
		position: [0, 0, 12],
		rotate: [0, 3.14159265, 0],
		scale: [1, 1, -1]
	}
};

export const defualCamera2DRT = {
	camera: {
		ortho: [-960 / 2, 960 / 2, 560 / 2, -560 / 2, -10000, 10000]
	},
	transform: {
		position: [0, 0, 1],
		rotate: [0, 3.14159265, 0],
		scale: [1, 1, -1]
	}
};

