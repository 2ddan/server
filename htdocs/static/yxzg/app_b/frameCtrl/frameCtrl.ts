import { create, getGlobal, setInterval }           from "pi/widget/frame_mgr";

class CallData {
    flag: boolean;
    func: Function;
}

export let frame: any;
export let frameWorkFlag: boolean;
let funcMap: Map<string, CallData>;



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

export const puaseAll = ()=>{
    frameWorkFlag = false;
}

export const activeAll = ()=>{
    frameWorkFlag = true;
}

export const setPermanent = ( key: string, f: Function )=>{
    let temp: CallData;

    temp    = new CallData;
    temp.flag   = true;
    temp.func   = f;

    funcMap.set( key, temp );
    
    activeAll();
}

export const removePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    funcMap.delete( key );

    delete temp.func;
    delete temp.flag;
}

export const puasePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    temp.flag   = false;
}
export const activePermanent = ( key: string )=>{
    let temp: CallData;

    temp    = funcMap.get( key );
    temp.flag   = true;
}

init();