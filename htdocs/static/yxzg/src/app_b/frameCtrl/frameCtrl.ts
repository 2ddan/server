import { create, getGlobal, setInterval }           from "pi/widget/frame_mgr";

class CallData {
    flag: boolean;
    func: Function;
}

let frame: any, 
    frameWorkFlag: boolean,
    funcMap: Map<string, CallData>;



// 中止帧循环
export const puaseAll = ()=>{
    frameWorkFlag = false;
}

// 激活帧循环
export const activeAll = ()=>{
    frameWorkFlag = true;
}


// 设置帧调用
export const setPermanent = ( key: string, f: Function )=>{
    let temp: CallData;

    temp    = new CallData;
    temp.flag   = true;
    temp.func   = f;

    funcMap.set( key, temp );
    
    activeAll();
}

// 移除帧调用
export const removePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    funcMap.delete( key );

    if ( temp !== undefined ){
        delete temp.func;
        delete temp.flag;
    }
}

// 暂停 指定帧调用
export const puasePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    temp.flag   = false;
}
// 激活 指定帧调用
export const activePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    temp.flag   = true;
}

const init = ()=>{ 

    frame           = create();
    frameWorkFlag   = false;
    funcMap         = new Map;

    setInterval( frame );
    frame.setPermanent( frameRun );
}

const frameRun = ()=>{
    if ( frameWorkFlag === true ){
        funcMap.forEach( callData => {
            if ( callData.flag  === true ){
                callData.func();
            }
        } );
    }
}

init();