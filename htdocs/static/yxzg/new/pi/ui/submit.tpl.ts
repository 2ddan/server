
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

const _path = 'pi/ui/submit.tpl';

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

pi_modules['pi/ui/submit.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{sign:1,text:"",readOnly:true,focus:true,id:1};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =581038365;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":1};$n.cd=[];$n.cH =0;$n["aS"] = 1;$n["eS"] = 2;$n["aH"] = 2006365122;$n["e"]["blur"]="onBlur";
        $n["eH"]=_j($n["eH"],1217686590);$n["e"]["on-focus"]="onFocus";
        $n["eH"]=_j($n["eH"],3494538966);$n["a"]["value"] = "";_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n.cH =1160562856;$n["eS"] = 1;$n["aH"] = 2608450120;$n["e"]["pointerclick"]="submit";
        $n["eH"]=_j($n["eH"],672827909);$t=$n;{let $p = $t;let $n = _f("提交", 3184954967, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
