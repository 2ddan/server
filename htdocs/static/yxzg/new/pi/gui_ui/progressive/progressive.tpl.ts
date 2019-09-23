
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../gui_compile/style';
import * as _hash from '../../util/hash';
import { VirtualStyle } from '../../gui_virtual/virtual_style';
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
} from '../../util/gui_tpl';

const _path = 'pi/gui_ui/progressive/progressive.tpl';

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

pi_modules['pi/gui_ui/progressive/progressive.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{"orientation":2,"arr":[],"min":12,"addCount":5,"checkPixel":0.5,"scrollEnd":false};let _path=it.orientation===2?'y':'x';let _autoHeight=it.orientation===2?'auto':'100%';let _autoWidth=it.orientation===2?'100%':'auto';let _autoWrap=it.orientation===2?'wrap':'no-wrap';$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aS"] = 3;$n["eS"] = 1;$n["aH"] = 3578340050;{$n["s"]={"c5":1,"e8":[1,100],"y":[1,100],"b9":true};$n["sH"]=3337196601;$n["sS"]=4;}{let attrvalue = "";attrvalue += _path;attrvalue += "";$n["a"]["scroll_path"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["scroll_path"]));$n["a"]["scroll_type"] = "none";$n["e"]["pointermove"]="scroll(e)";
        $n["eH"]=_j($n["eH"],877993680);$n["a"]["layout"] = "scroll";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["aH"] = 516944947;{let attrvalue = "";attrvalue += "position: absolute; width:";attrvalue += _autoWidth;attrvalue += ";height:";attrvalue += _autoHeight;attrvalue += ";flex-wrap:";attrvalue += _autoWrap;attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}let arr=it.arr.slice(it.showStart,it.showEnd);{let _$i = 0;
				for(let v of arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":2};$n.cs = false;$n.ch = null;$n["aH"] = 782767477;{let attrvalue = "";attrvalue = v&&v.widget?v.widget:it.widget;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["i"]=i;
			//jpair suf
			//jpair pre
			
				$n["v"]=v;
			//jpair suf
			_e($n, $p);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
