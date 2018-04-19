
// ============================== 导入
import { getCache, Widget, setCache, lookup } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';


/**修改数据
 * @param name:widget名称， param：修改的的数据
 */
export const modifyTplData = (name: string, param: Json): void => {
    let w = lookup(name);
    w.config = w.config || {}
    for(let k in param){
        w.config[k] = param[k];
    }

    let path = name.replace(/\-/g, "/");
    let cache = getCache( path+ ".cfg") || {};
    for(let k in param){
        w.config[k] = param[k];
    }
    setCache(path+ ".cfg", cache);
}