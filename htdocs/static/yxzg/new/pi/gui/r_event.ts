
/**
 * R gui 事件管理器
 */

import { gui } from './gui';
import { RDocument } from './r_document';
import { RElement } from './r_element';
import { PointerRecord, REventData, REventResult, REventTypes } from './r_event_base';

export class REventManager {
    /**
     * down - move 空间间隔 限制 click 响应
     */
    public static CilickEffectiveDistancwDiff: number = 30;
    /**
     * down - up 时间间隔 限制限制时间内 click 响应
     */
    public static ClickEffectiveTimeDiff: number    = 600;

    /**
     * 两次点击时间间隔 限制时间内的 两次click 为 dbclick 响应
     */
    public static DBClickEffectiveTimeDiff: number = 800;
    /**
     * down 之后 longTap 响应延时时间
     */
    public static LongTapEffectiveTimeDiff: number = 1000;
    /**
     * move 移动事件的启动距离
     */
    public static MoveEffectiveDistanceDiff: number = 30;
    /**
     * 根据事件 ID 记录事件执行数据
     * * up 事件结束后 清除所有非主事件，清除非当前主事件，仅保留当前主事件以供下一个事件使用
     */
    // public readonly pointerRecordMap:     Map<number, PointerRecord> = new Map();
    public readonly pointerRecordList:     PointerRecord[] = [];
    /**
     * 当前 主事件 ID
     */
    private pointerPrimaryID: number;
    /**
     * 使用 path 时需注意其中元素是否已销毁
     */
    private downResult: REventResult;
    /**
     * 使用 path 时需注意其中元素是否已销毁
     */
    private moveResult: REventResult;
    /**
     * 使用 path 时需注意其中元素是否已销毁
     */
    private clickResult: REventResult;
    /**
     * 使用 path 时需注意其中元素是否已销毁
     */
    private wheelResult: REventResult;
    /**
     * 管理的 上下文目标
     */
    private vdocument: RDocument;
    private currPick: RElement;
    
    constructor(vdocument: RDocument) {
        this.vdocument = vdocument;
    }
    
    /**
     * 寻找两条节点路径中的第一个共同节点
     * @param firstPath 第一条节点路径
     * @param secondPath 第二条节点路径
     * @returns [samePart, firstHead, secondHead]
     */
    public static comparePath(_firstPath: RElement[], _secondPath: RElement[]) {
        let firstEle: RElement, secondEle: RElement, firstIndex: number, secondIndex: number, isLoop: boolean = true;

        const firstPath: RElement[]     = [];
        const secondPath: RElement[]    = [];
        const samePart: RElement[]      = [];
        const firstHead: RElement[]     = [];
        const secondHead: RElement[]    = [];

        _firstPath.forEach(ele => {
            if (!ele.isDestroy) {
                firstPath.push(ele);
            }
        });
        _secondPath.forEach(ele => {
            if (!ele.isDestroy) {
                secondPath.push(ele);
            }
        });

        firstIndex  = 0;
        secondIndex = 0;

        // 从路径源头节点向上遍历
        while (isLoop) {
            firstEle    = firstPath[firstIndex];
            secondEle   = secondPath[secondIndex];

            if (firstEle && secondEle) {
                if (firstEle.level > secondEle.level) {
                    firstIndex++;
                    firstHead.push(firstEle);
                } else if (firstEle.level < secondEle.level) {
                    secondIndex++;
                    secondHead.push(secondEle);
                } else {
                    firstIndex++;
                    secondIndex++;

                    if (firstEle === secondEle) {
                        samePart.push(secondEle);
                        isLoop = false;
                    } else {
                        firstHead.push(firstEle);
                        secondHead.push(secondEle);
                    }
                }
            } else {
                isLoop = false;
            }
        }
        
        if (firstEle === undefined) {
            for (let i = secondIndex, len = secondPath.length - 1; i <= len; i++) {
                secondHead.push(secondPath[i]);
            }
        }

        if (secondEle === undefined) {
            for (let i = firstIndex, len = firstPath.length - 1; i <= len; i++) {
                firstPath.push(firstPath[i]);
            }
        }

        return [samePart, firstHead, secondHead];
    }
    /**
     * 获取节点事件信息
     * @param e 原生事件信息
     */
    public getEventData(e: PointerEvent) {
        let evt: REventData;
        evt = <any>{};
        Object.keys(e).forEach(key => {
            evt[key] = e[key];
        });
        evt.x               = e.clientX;
        evt.y               = e.clientY;
        evt.type            = e.type;
        evt.pointerType     = <REventTypes>e.pointerType;
        evt.pointerID       = e.pointerId;
        evt.stopPropagation = false;
        evt.preventDefault  = () => { e.preventDefault(); };
        evt.timeStamp       = Date.now();
        evt.pointers        = [];
        evt.path            = [];
        evt.timeNow         = evt.timeStamp;
        evt.isPrimary       = e.isPrimary; // || this.pointerPrimaryID === undefined || e.pointerId === this.pointerPrimaryID;

        if (evt.isPrimary) {
            this.pointerPrimaryID = evt.pointerID;
        }

        return evt;
    }
    /**
     * 获取节点事件信息
     * @param e 原生事件信息
     */
    public getEventDataWheel(e: WheelEvent) {
        let evt: REventData;

        if (e.deltaMode === 0x00) {
            evt = <any>{};
            Object.keys(e).forEach(key => {
                evt[key] = e[key];
            });
            evt.x               = e.clientX;
            evt.y               = e.clientY;
            evt.lastX           = evt.x;
            evt.lastY           = evt.y;
            evt.deltaX          = e.deltaX || e.deltaY; // ***
            evt.deltaY          = e.deltaY;
            evt.type            = e.type;
            evt.pointerType     = REventTypes.wheel;
            evt.pointerID       = -1;
            evt.stopPropagation = false;
            evt.preventDefault  = () => { e.preventDefault(); };
            evt.timeStamp       = Date.now();
            evt.pointers        = [];
            evt.path            = [];
            evt.timeNow         = evt.timeStamp;
            evt.isPrimary       = true;
        }

        return evt;
    }
    /**
     * 获取节点事件信息
     * @param e 原生事件信息
     */
    public createPointerRecord(evt: REventData): PointerRecord {
        let pointerRecord: PointerRecord;
        // pointerRecord = this.pointerRecordMap.get(evt.pointerID);
        const index = this.pointerRecordList.findIndex(v => v.pointerID === evt.pointerID);

        // if (pointerRecord === undefined) {
        //     pointerRecord = new PointerRecord(evt.pointerID, evt.isPrimary);
        //     this.pointerRecordMap.set(evt.pointerID, pointerRecord);
        // }
        
        if (index < 0) {
            pointerRecord = new PointerRecord(evt.pointerID, evt.isPrimary);
            this.pointerRecordList.push(pointerRecord);
        } else {
            pointerRecord = this.pointerRecordList[index];
        }

        return pointerRecord;
    }
    /**
     * down 事件发生时，目标 id 为 primary 则忽略该次事件前的所有事件
     * * 某些设备上有系统级操作，最终没有返回事件到应用<三指截屏><浏览器debug断点>
     */
    public clearPointerRecord() {
        this.pointerRecordList.length = 0;
    }
    public readPointerRecord(id: number) {
        return this.pointerRecordList.find(v => v.pointerID === id);
    }
    public removePointerRecord(evt: PointerRecord) {
        const index = this.pointerRecordList.findIndex(v => v.pointerID === evt.pointerID);
        if (index >= 0) {
            this.pointerRecordList.splice(index, 1);
        }
    }
    public removePointerRecordID(id: number) {
        const index = this.pointerRecordList.findIndex(v => v.pointerID === id);
        if (index >= 0) {
            this.pointerRecordList.splice(index, 1);
        }
    }
    /**
     * 检测移动事件有效性
     * @param pointerRecord 事件记录 - 已 pointerId 为标识的 事件记录，记录执行情况
     * @param evt 事件数据
     */
    public checkMoveEffective(pointerRecord: PointerRecord, evt: REventData) {
        if (pointerRecord.isMove !== true) {
            if (Math.pow((pointerRecord.moveStartX - evt.x), 2) + Math.pow((pointerRecord.moveStartY - evt.y), 2) > Math.pow(REventManager.MoveEffectiveDistanceDiff, 2)) {
                pointerRecord.moveStartX  = evt.x;
                pointerRecord.moveStartY  = evt.y;
                pointerRecord.isMove  = true;
            }
        }
    }

    /**
     * 检测点击事件有效性
     * @param pointerRecord 事件记录 - 已 pointerId 为标识的 事件记录，记录执行情况
     * @param evt 事件数据
     */
    public checkClickEffective(pointerRecord: PointerRecord, evt: REventData) {
        pointerRecord.isClickEffective = false;

        // 时间检查 && 空间检查
        if (evt.timeNow - this.downResult.time < REventManager.ClickEffectiveTimeDiff
            && Math.pow((this.downResult.x - evt.x), 2) + Math.pow((this.downResult.y - evt.y), 2) < Math.pow(REventManager.CilickEffectiveDistancwDiff, 2)
        ) {
            pointerRecord.isClickEffective    = true;
        }
    }
    /**
     * down 事件
     * * 创建指针事件记录数据
     * * 为非主事件 - 清除长按句柄
     * * 为主事件 - 创建长按句柄 - 创建 down 结果记录
     */
    public downFire = (e: PointerEvent) => {
        let pointerRecord: PointerRecord, source: RElement, evt: REventData;

        evt         = this.getEventData(e);
        source      = this.pickResult(evt);
        evt.source  = source;

        if (evt.isPrimary) {
            this.clearPointerRecord();
        }

        if (!source) return;

        // 事件触发前
        pointerRecord = this.createPointerRecord(evt);
        pointerRecord.isLongTap     = false;
        pointerRecord.isMove        = false;
        pointerRecord.moveStartX    = evt.x;
        pointerRecord.moveStartY    = evt.y;

        pointerRecord.currX         = evt.x;
        pointerRecord.currY         = evt.y;
        
        pointerRecord.isDown        = true;
        
        if (pointerRecord.isPrimary !== true) {
            this.clearLongTapHandler();
        } else {
            pointerRecord.longTapHandler = setTimeout(() => { this.longTapFire(e); }, REventManager.LongTapEffectiveTimeDiff);

            // 事件起点
            if (source !== undefined) {
                evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
                source.down(evt);

                if (this.downResult && this.downResult.path[0] && !this.downResult.path[0].isDestroy) {
                    if (this.downResult.path[0] !== source) {
                        this.downResult.path[0].blur(evt);
                        source.focus(evt);
                    }
                } else {
                    source.focus(evt);
                }
            }

            this.downResult = new REventResult(evt);
        }
    }
    /**
     * up 事件
     * * 未获得指针事件记录数据 - 不响应
     * * 清除长按句柄
     * * 非主事件 - 不响应
     * * 响应后 - 后处理
     * * 清除非当前主事件指针记录
     */
    public upFire = (e: PointerEvent) => {
        let source: RElement, evt: REventData;
        
        // alert(`no ${e.pointerId}`);
        
        // 清理 move 记录
        this.moveResult = undefined;

        // const pointerRecord = this.pointerRecordMap.get(e.pointerId);
        const pointerRecord = this.readPointerRecord(e.pointerId);

        if (!pointerRecord) {

            return;
        }

        evt         = this.getEventData(e);
        source      = this.pickResult(evt);
        evt.source  = source;

        if (source) {
            this.clearLongTapHandler();
            pointerRecord.currX = evt.x;
            pointerRecord.currY = evt.y;
    
            if (!pointerRecord.isPrimary) {
                //
            } else {
                // 事件起点
                // evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
                evt.isSendNextLayer = true;
                source.up(evt);
    
                this.upPostprocess(e, evt);
            }
        } else {
            evt.isSendNextLayer = true;
            evt.isPostprocess   = true;

            // 之前down 事件路径上可能有节点已经被销毁
            for (let i = 0, len = this.downResult.path.length - 1; i <= len; i++) {
                source = this.downResult.path[i];
                if (!source.isDestroy) {
                    source.up(evt);
                    break;
                }
            }
        }
        
        // 事件触发后
        pointerRecord.isMove      = false;
        pointerRecord.isDown      = false;
        pointerRecord.isLongTap   = false;
        this.removePointerRecordID(e.pointerId);

        if (evt.pointerID === this.pointerPrimaryID) {
            this.pointerPrimaryID = undefined;
        }
    }
    /**
     * 移动事件
     * * 未获取到指针事件记录数据 - 不响应
     * * 未到达 move 有效距离 - 不响应
     * * 非主事件 - 不响应 - 响应多点事件
     * * 成功响应 - 清除长按句柄
     */
    public moveFire = (e: PointerEvent) => {
        let source: RElement, evt: REventData;
        // 清理 wheel 
        this.wheelResult = undefined;

        // const pointerRecord = this.pointerRecordMap.get(e.pointerId);
        const pointerRecord = this.readPointerRecord(e.pointerId);

        if (!pointerRecord || !pointerRecord.isDown) {
            return;
        }

        evt         = this.getEventData(e);
        // source      = this.pickResult(evt);
        // source      = this.downResult.path[0];
        // this.downResult.path.forEach(v => {
        //     if (!source && v.isDestroy === false) {
        //         source = v;
        //     }
        // });

        for (let i = 0, len = this.downResult.path.length - 1; i <= len; i++) {
            if (this.downResult.path[i].isDestroy === false) {
                source = this.downResult.path[i];
                break;
            }
        }

        evt.source  = source;
        
        if (!source) return;

        this.checkMoveEffective(pointerRecord, evt);
        
        if (!pointerRecord.isMove) {
            return;
        } else {
            this.clearLongTapHandler();
        }

        pointerRecord.currX = evt.x;
        pointerRecord.currY = evt.y;

        if (this.pointerRecordList.length > 1) {
            // 清理 move 记录， 多点操作生效后，主 move 失效
            this.moveResult = undefined;
            this.multiPointerFire(e, source);
        } else {
            
            const wheelEvt      = this.getEventData(e);
            wheelEvt.source     = source;

            if (this.moveResult) {
                evt.lastX = this.moveResult.x;
                evt.lastY = this.moveResult.y;
                evt.deltaX = evt.lastX - evt.x;
                evt.deltaY = evt.lastY - evt.y;

                wheelEvt.lastX = this.moveResult.x;
                wheelEvt.lastY = this.moveResult.y;
                wheelEvt.deltaX = evt.lastX - evt.x;
                wheelEvt.deltaY = evt.lastY - evt.y;
            } else {
                evt.lastX = evt.x;
                evt.lastY = evt.y;
                evt.deltaX = 0;
                evt.deltaY = 0;

                wheelEvt.lastX = evt.x;
                wheelEvt.lastY = evt.x;
                wheelEvt.deltaX = 0;
                wheelEvt.deltaY = 0;
            }

            // 事件起点
            if (source !== undefined) {
                evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
                source.move(evt);
                source.wheel(wheelEvt);
            }

            this.moveResult = undefined;
            this.moveResult = new REventResult(evt);
        }
    }

    /**
     * 单击事件响应
     * @param e 事件数据
     * @param source 事件起点
     * * 响应单击 - 尝试合成双击
     */
    public clickFire = (e: PointerEvent, source: RElement) => {
        let evt: REventData;

        evt             = this.getEventData(e);
        evt.type        = REventTypes.click;
        evt.pointerType = REventTypes.click;
        evt.source      = source;
        
        // 事件起点
        if (source !== undefined) {
            evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
            source.click(evt);
            this.clickPostprocess(e, evt);
        }
    }
    
    /**
     * 双击事件响应
     * @param e 事件数据
     * @param source 事件起点
     */
    public dbclickFire = (e: PointerEvent, source: RElement) => {
        let evt: REventData;

        evt             = this.getEventData(e);
        evt.type        = REventTypes.dbclick;
        evt.pointerType = REventTypes.dbclick;
        evt.source      = source;

        // 事件起点
        if (source !== undefined) {
            evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
            source.dbclick(evt);
        }
    }
    /**
     * 长按事件
     * * 句柄被清除 - 不响应
     * * 当前指针已产生移动 - 不响应
     */
    public longTapFire = (e: PointerEvent) => {
        let source: RElement, evt: REventData, result: boolean = true;
        const currPath: RElement[] = [];
        // const pointerRecord = this.pointerRecordMap.get(e.pointerId);
        const pointerRecord = this.readPointerRecord(e.pointerId);
        
        if (!pointerRecord) {
            return;
        }

        evt             = this.getEventData(e);
        evt.type        = REventTypes.longTap;
        evt.pointerType = REventTypes.longTap;

        pointerRecord.longTapHandler && clearTimeout(pointerRecord.longTapHandler);
        pointerRecord.longTapHandler = undefined;
        if (pointerRecord.isMove) {
            return;
        }

        pointerRecord.isLongTap = true;

        source          = this.pickResult(evt); 
        
        if (!source) return;
        
        // 从事件源节点 向上遍历节点至根节点 - 记录这些节点为 longTap 响应节点
        while (result) {
            currPath.push(source);
            if (source.parentNode && source.level >= 0) {
                source = source.parentNode;
            } else {
                result = false;
            }
        }

        const [sames, firstDiffs, secondDiffs] = REventManager.comparePath(this.downResult.path, currPath);
    
        source = undefined;
        sames.forEach(v => {
            if (!source && v.isDestroy === false) {
                source = v;
            }
        });

        if (source) {
            evt.source  = source;
            evt.isSendNextLayer = <boolean>evt.source.attributes.isSendNextLayer;
            source.longTap(evt);
        }
    }
    /**
     * 多点操作
     * * TODO - 确定节点响应接口
     * * TODO - 确定是否只在全局监听
     */
    public multiPointerFire = (e: PointerEvent, source: RElement) => {
        let evt: REventData;

        evt             = this.getEventData(e);
        evt.type        = REventTypes.multiPointer;
        evt.pointerType = REventTypes.multiPointer;

        // 放入当前 主事件信息
        // const primary   = this.pointerRecordMap.get(this.pointerPrimaryID);
        // const primary   = this.readPointerRecord(this.pointerPrimaryID);
        // evt.pointers.push({ x: primary.currX, y: primary.currY });

        // 放入当前 所有非主事件信息
        // this.pointerRecordMap.forEach((v, k) => {
        //     if (v.isPrimary !== true) {
        //         evt.pointers.push({ x: v.currX, y: v.currY });
        //     }
        // });
        this.pointerRecordList.forEach((v, k) => {
            // if (v.isPrimary !== true) {
            evt.pointers.push({ x: v.currX, y: v.currY, id: v.pointerID });
            // }
        });

        if (source === undefined) {
            evt.pointers.push({ x: 0, y: 0, id: 0 });
        } else {
            evt.pointers.push({ x: 1, y: 1, id: source.uniqueID });
        }

        // 事件触发
        evt.source  = source;

        // 事件起点
        if (source !== undefined) {
            evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
            source.multipointer(evt);
        }
        
        // evt.pointers.push({ x: 1, y: 1, id: source.uniqueID, len: evt.path.length, Postprocess: evt.isPostprocess, stopPropagation: evt.stopPropagation  });

        // log(evt.pointers);
    }
    /**
     * 
     * @param e .
     * 1. 命中的元素,
     * 2. 响应-冒泡
     * 3. 有 pointer 事件时 忽略wheel
     */
    public wheelFire(e: WheelEvent) {
        let source: RElement, evt: REventData;

        if (this.pointerPrimaryID !== undefined) {
            return;
        }

        evt             = this.getEventDataWheel(e);
        if (evt) {
            source      = this.pickResult(evt);
            evt.source  = source;
            
            if (!source) return;
    
            if (this.wheelResult) {
                evt.lastX = this.wheelResult.x;
                evt.lastY = this.wheelResult.y;
            }
    
            evt.isSendNextLayer = <boolean>source.attributes.isSendNextLayer;
            source.wheel(evt);
    
            this.wheelResult = undefined;
            this.wheelResult = new REventResult(evt);
        } else {
            this.wheelResult = undefined;
        }
    }
    public pickResult(evt: REventData): RElement {
        let resultEle: RElement;

        const id    = gui._iter_query(this.vdocument.uniqueID, evt.x, evt.y);
        resultEle   = this.vdocument.elementMap.get(id);

        if (this.vdocument.debug) {
            if (resultEle && this.currPick !== resultEle) {
                evt.source = resultEle;
                resultEle.debugFocus();
                this.currPick = resultEle;
            }

            if (resultEle === undefined && this.currPick !== undefined) {
                this.currPick.debugBlur();
            }

            resultEle = undefined;
        }
        
        return resultEle;
    }
    
    public debugFocus(ele: RElement) {
        if (ele && this.currPick !== ele) {
            ele.debugFocus();
            this.currPick = ele;
        }

        if (ele === undefined && this.currPick !== undefined) {
            this.currPick.debugBlur();
        }
    }
    /**
     * up 事件响应后处理
     * @param e up 事件源数据
     * @param evt up 事件模拟数据
     * @param pointerRecord up 事件记录数据
     */
    private upPostprocess(e: PointerEvent, evt: REventData) {
        // const pointerRecord = this.pointerRecordMap.get(evt.pointerID);
        const pointerRecord = this.readPointerRecord(evt.pointerID);

        if (!pointerRecord) {
            return;
        }
        
        evt.isPostprocess       = true;

        const [sames, firstDiffs, secondDiffs] = REventManager.comparePath(this.downResult.path, evt.path);
        
        firstDiffs.forEach(ele => {
            ele.up(evt);
        });

        // 检查 点击的有效性
        this.checkClickEffective(pointerRecord, evt);

        // up 与 down 时间间隔不符合 click 判定
        if (!pointerRecord.isClickEffective || pointerRecord.isLongTap) {
            return;
        }

        sames[0] && this.clickFire(e, sames[0]);

    }
    
    /**
     * click 事件响应后处理
     * @param e click 事件源数据
     * @param evt click 事件模拟数据
     * @param pointerRecord click 事件记录数据
     */
    private clickPostprocess(e: PointerEvent, evt: REventData) {
        // 没有前一次点击的记录
        if (!this.clickResult) {
            this.clickResult = new REventResult(evt);

            return;
        }

        // 两次 click 时间间隔不符合 click 判定
        if (evt.timeNow - this.clickResult.time > REventManager.DBClickEffectiveTimeDiff) {
            this.clickResult = new REventResult(evt);

            return;
        }
        
        evt.isPostprocess       = true;

        const [sames, firstDiffs, secondDiffs] = REventManager.comparePath(this.clickResult.path, evt.path);

        // if (sames.length > 0) {
        //     this.dbclickFire(e, sames[0]);
        // }
        for (let i = 0, len = sames.length - 1; i <= len; i++) {
            if (sames[i].isDestroy === false) {
                this.dbclickFire(e, sames[i]);
                break;
            }
        }

        // 双击后 清除 click 记录 - 避免一直响应双击
        this.clickResult = undefined;
    }

    private downPostprocess(evt: REventData, pointerRecord: PointerRecord) {
        // 
    }
    /** 
     * 清除 长按延时句柄
     */
    private clearLongTapHandler() {
        // this.pointerRecordMap.forEach(data => {
        //     if (data.longTapHandler) { 
        //         clearTimeout(data.longTapHandler);
        //         data.longTapHandler = undefined;
        //     }
        // });
        
        this.pointerRecordList.forEach(data => {
            if (data.longTapHandler) {
                clearTimeout(data.longTapHandler);
                data.longTapHandler = undefined;
            }
        });
    }
}
// let div: HTMLDivElement;
// const log  = (arg) => {
//     if (!div) {
//         div = document.createElement('div');
//         document.body.appendChild(div);
//         div.style.cssText = 'position:absolute;color:#f00;';
//     }

//     div.innerText = typeof arg === 'string' ? arg :  JSON.stringify(arg);
// };
