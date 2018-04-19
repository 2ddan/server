
export enum PSSimulationSpace {
	Local = 0,
	World = 1,
	Custom = 2
};

// 线性插值 (1 - k) * n1 + k * n2
export const lerp = (n1: number, n2: number, k: number) => n1 + k * (n2 - n1);