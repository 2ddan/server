
import * as UIEnum      from "./uiNodeEnum";
import { UINode }       from "./uiNodeBase";

/**
 * 工具方法库
 */
export class UIToolFunc {
    // 通过点连接字符串 表示的 属性路径 获得指定属性值
    // eg： obj = { a: { b: 20 } },  longKey: "a.b"
    static readDataWithLongKey = ( obj: any, longKey: string )=>{
        let data: any, keyArr: Array<string>;
        
        data    = obj;
        keyArr  = longKey.split( "." );
    
        keyArr.forEach( ele =>{
            data = data[ele];
        });
    
        return data;
    }
    // 返回 合并两个对象属性 的新对象
    static mergeJson = ( src, json )=>{
        let res: any = {};

        for ( let key in src ){
            res[key]    = src[key];
        }

        if (json === undefined){
            return res;
        }else{
            for ( let key in json ){
                res[key]    = json[key];
            }
            return res;
        }

    }
    static computePosition = ( node: UINode )=>{
        let x, y, z;

        [ x, y, z ]     = [ node.x, node.y, node.z ];
        
        if (x === undefined || y === undefined || z === undefined) return;

        if ( node._parent !== undefined &&  node._parent.nodeType !== UIEnum.UITypes[3] ){
            x = x - node._parent.width / 2;
            y = y - node._parent.height / 2;
        }

        if ( node.nodeType === UIEnum.UITypes[3] || node.nodeType === UIEnum.UITypes[2] ){
            return [-(x), -(y), (z)];
        }else{
            return [-(x+node.width/2), -(y+node.height/2), (z)];
        }

    }
    static computeRotate = ( node: UINode )=>{
        let x, y, z;

        [ x, y, z ]     = [ node.x_rotate, node.y_rotate, node.z_rotate ];
        
        if (x === undefined || y === undefined || z === undefined) return;

        return [ x, y, z ];

    }
    static computeScale = ( node: UINode )=>{
        let x, y, z;

        [ x, y, z ]     = [ node.x_scale, node.y_scale, node.z_scale ];
        
        if (x === undefined || y === undefined || z === undefined) return;

        return [ x, y, z ];

    }
}
