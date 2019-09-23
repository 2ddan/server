
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

const _path = 'app/widget/ui/color.tpl';

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

pi_modules['app/widget/ui/color.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;let colorArr=['#ccafa2','#8efe28','#66cefe','#e95bef','#fc9a36','#fb332b'];if(it.isGray){$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":0};$n.cd=[];$n["aH"] = 183460678;{$n["s"]={"l":[0.8,0.8,0.8,1]};$n["sH"]=2806547757;$n["sS"]=1;}$t=$n;{let $p = $t;_addText(it.text, $p);}_i($n);_h($n);return $n;}}else{$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":1};$n.cd=[];$n["aH"] = 3905014705;{let attrvalue = "";attrvalue += "color:";attrvalue += colorArr[it.quality||0];attrvalue += "";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}$t=$n;{let $p = $t;_addText(it.text, $p);}_i($n);_h($n);return $n;}} });
