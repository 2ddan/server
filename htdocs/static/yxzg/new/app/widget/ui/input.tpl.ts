
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../../pi/gui_compile/style';
import * as _hash from '../../../pi/util/hash';
import { VirtualStyle } from '../../../pi/gui_virtual/virtual_style';
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
} from '../../../pi/util/gui_tpl';

const _path = 'app/widget/ui/input.tpl';

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

pi_modules['app/widget/ui/input.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 1916091123;{$n["s"]={"b2":[0,40],"b1":[0,20]};$n["sH"]=4269036518;$n["sS"]=2;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":1};$n.cd=[];$n["aS"] = 4;$n["eS"] = 5;$n["aH"] = 3382326611;$n["e"]["on-keydown"]="keydown";
        $n["eH"]=_j($n["eH"],889758252);$n["e"]["on-input"]="onInput";
        $n["eH"]=_j($n["eH"],3900038931);$n["e"]["blur"]="onBlur";
        $n["eH"]=_j($n["eH"],1217686590);$n["a"]["type"] = "text";$n["e"]["on-focus"]="onFocus";
        $n["eH"]=_j($n["eH"],3494538966);$n["e"]["change"]="onChange";
        $n["eH"]=_j($n["eH"],678136916);{let attrvalue = "";attrvalue = it.readOnly;$n["a"]["readonly"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["readonly"]));{let attrvalue = "";attrvalue += it.placeholder||'';attrvalue += "";$n["a"]["placeholder"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["placeholder"]));{let attrvalue = "";attrvalue += (it.text+'')||'';attrvalue += "";$n["a"]["value"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["value"]));{let attrvalue = "";attrvalue += "position:absolute;font-family:kaiti;font-size:";attrvalue += it.fontSize||16;attrvalue += "px;width:100%;height:100%;left:7px;top:1px;padding:0;justify-content:";attrvalue += it.textAlign=='left'?'flex-start':(it.textAlign=='right'?'flex-end':'center');attrvalue += ";border:none;outline:none;color:";attrvalue += it.color||'#fff';attrvalue += "";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
