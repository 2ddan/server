
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../gui_compile/style';
import * as _hash from '../util/hash';
import { VirtualStyle } from '../gui_virtual/virtual_style';
import {
    toString as _stringify,
    convertEntity as _convertEntity,
    calAttrHash as _calAttrHash,
    calTextHash as _calTextHash,
    addJson as _addJson,
    installText as _installText,
    addText as _addText,
    chFunc as _chFunc,
    calNodeHash as _calNodeHash,
    calJsonHash as _calJsonHash,
    getFunc as _get
} from '../util/gui_tpl';

const _path = 'pi/ui/treememu.tpl';

const _a  = _convertEntity;
const _b    = _calAttrHash;
const _c    = _calTextHash;
const _e        = _addJson;
const _f    = _installText;
const _g        = _addText;
const _h         = _chFunc;
const _i    = _calNodeHash;
const _d    = _calJsonHash;
const _j       = _hash.nextHash;
const _s  = _styleStr2Json;

pi_modules['pi/ui/treememu.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{tag:"btn",show:{"cfg":{"clazz":"","text":"1",leaf:false},select:false},cmd:"",arr:[]};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 0;if(it.tag){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":1};$n.cs = false;$n.ch = null;$n["eS"] = 1;$n["aH"] = 2967864307;{let attrvalue = "";attrvalue = it.tag;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];$n["wc"]="item";{let attrvalue = "";attrvalue += "change('";attrvalue += it.cmd;attrvalue += "')";$n["e"]["pointerclick"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(2533094024, _calTextHash(attrvalue)));
}$t=$n;{let $p = $t;_addJson(it.show, $p);}_i($n);_h($n);$p["cd"].push($n);}}if(it.arr&&it.show.select){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 2044962327;$n["wc"]="tree";{let _$i = 0;
				for(let v of it.arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"treememu$","si":3};$n.cs = false;$n.ch = null;$n["aH"] = 0;$t=$n;{let $p = $t;_addJson(parseInt(i), $p);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);$p["cd"].push($n);}}_i($n);_h($n);return $n;} });
