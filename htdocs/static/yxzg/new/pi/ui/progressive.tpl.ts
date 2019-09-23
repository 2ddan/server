
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

const _path = 'pi/ui/progressive.tpl';

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

pi_modules['pi/ui/progressive.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{"orientation":2,"arr":[],"min":10,"addCount":5,"checkPixel":0.5,"scrollEnd":false};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["eS"] = 1;$n["aH"] = 3457349418;{let attrvalue = "";attrvalue += "position: absolute; width:100%;height:100%;overflow-x: ";if(it.orientation===2){attrvalue += "hidden ";}else{attrvalue += "auto ";}attrvalue += "; overflow-y: ";if(it.orientation===2){attrvalue += "hidden ";}else{attrvalue += "auto ";}attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}$n["e"]["on-scroll"]="scroll";
        $n["eH"]=_j($n["eH"],1906181762);let arr=it.arr.slice(it.showStart,it.showEnd);{let _$i = 0;
				for(let v of arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":1};$n.cs = false;$n.ch = null;$n["aH"] = 782767477;{let attrvalue = "";attrvalue = v.widget||it.widget;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];$t=$n;{let $p = $t;_addJson(v, $p);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);return $n;} });
