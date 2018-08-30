/**
 * @description 符合规定帧率且没有等待队列就直接执行，否则等待during的时间再执行
 */

export class Queue {
    constructor(during){
        if(during !== undefined)
            this.during = during;
    }
    /**
     * @description 事件驱动时间间隔
     */
    during : number
    /**
     * @description 追加时间
     */
    chase = 5
    /**
     * @description 事件列表
     */
    table = []
    /**
     * @description 定时器
     */
    timer = null
    /**
     * @description 添加事件
     */
    add (handle,param){
        let t = Date.now(),
            dif = t-this.timer;
        this.timer = t;
        if(dif >= this.during && !this.table.length){
            return handle(param);
        }
        if(!this.table.length){
            setTimeout(()=>{
                this.run();
            },this.chase);
        }
        this.table.push([handle,param]);
    }
    run (){
        let e = this.table.shift();
        this.timer = Date.now();
        e[0](e[1]);
        if(this.table.length){
            setTimeout(()=>{
                this.run();
            },this.chase);
        }
    }
};
