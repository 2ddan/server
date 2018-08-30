
let AnimFinishCallMap: Map<string, Function> = new Map;

export class SceneAnim {
    static setCall = ( key: string, f: Function )=>{
        AnimFinishCallMap.set( key, f );
    }
    static delCall = ( key: string )=>{
        AnimFinishCallMap.delete( key );
    }
    static AnimFinishFunc = ( obj: any )=>{
        AnimFinishCallMap.forEach( f =>{
            f && f( obj );
        } )
    }
}

( window as any ).AnimFinishCB = SceneAnim.AnimFinishFunc;