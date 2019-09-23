
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

const _path = 'pi/ui/input.tpl';

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

pi_modules['pi/ui/input.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{sign:1,text:"",readOnly:true,focus:true,id:1};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":0};$n.cd=[];$n.cH =0;$n["aS"] = 1;$n["eS"] = 3;$n["aH"] = 428539163;$n["e"]["on-input"]="onInput";
        $n["eH"]=_j($n["eH"],3900038931);$n["e"]["blur"]="onBlur";
        $n["eH"]=_j($n["eH"],1217686590);$n["e"]["on-focus"]="onFocus";
        $n["eH"]=_j($n["eH"],3494538966);$n["a"]["value"] = "";_i($n);return $n;} });
