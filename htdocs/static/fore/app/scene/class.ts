/**
 * 场景对象
 */

 // ================================ 导入

/**
 * @description 2d相机
 */
export class Camera2d{
    constructor(width: number, height: number){
        this.camera.ortho = [-width / 2, width / 2, height / 2, -height / 2, -10000, 10000];
    }
    public transform = {
        scale: [1, 1, -1],
        rotate: [0, 3.14159265, 0],
        position: [1, 1, 1]
    }
    public camera = {
        "ortho":[]
    }
}
/**
 * @description 3d相机
 */
export class Camera3d{
    constructor(obj){
        for(let k in obj){
            const t = typeof obj[k];
            if(t === null || t !== "object"){
                this[k] = obj[k];
            }else{
                for(let i =0,leng = obj[k].length;i<leng;i++){
                    this[k][i] = obj[k][i];
                }
            }
            if(k == "rotate"){
                this.fixto = obj[k][1];
            }
        }
    }
    public x:number = 0
    public y:number = 0
    public z:number = 0
    public fixto:number = 0
    public rotate: Array<number> = [0.2,3.14,0]
    public perspective: Array<number> = [38, 0.6, 0.3, 10000]
    public position: Array<number> = [0,1.67,5.8]
}
/**
 * @description mesh
 */
export class Mesh{
    constructor(public x:number, public y:number, public z:number){

    }
    public cdSpeed = 0
    public time = 0
}
/**
 * @description damage
 */
export class Damage{
    constructor(obj){
        for(let k in obj){
            this[k] = obj[k];
        }
    }
    public x:number = 0
    public y:number = 0
    public z:number = 0
    public scale: number
    public transp: number
    public r
    public text_type
    public type
    public isCrits
    public goal
    public value
    public scene
}
/**
 * @description effect
 */
export class Effect{
    constructor(public effect: string,public id: number, public isOnce: boolean){}
    public x:number
    public y:number
    public z:number = 0
}

 // ================================ 本地

 