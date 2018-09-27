

// 组件 组件名-组件json 堆
export let _FrameTemplateMap: Map<string, any>   = new Map;


/**
 * UI 组件 原始配置管理器
 */
export class FrameTemplateManage {
    static record = ( name: string, json: any )=>{
        return _FrameTemplateMap.set( name, json );
    }
    static read = ( name: string )=>{
        return _FrameTemplateMap.get( name );
    }
    static clear = ()=>{
        _FrameTemplateMap.clear();
    }
} 