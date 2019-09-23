
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

const _path = 'pi/render_three/scene/scene.tpl';

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

pi_modules['pi/render_three/scene/scene.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =2946814719;$n["eS"] = 1;$n["aH"] = 4171162151;{$n["s"]={"c5":1,"d8":[0,0]};$n["sH"]=3881066879;$n["sS"]=2;}$n["e"]["pointerclick"]="onRayCast";
        $n["eH"]=_j($n["eH"],1764101749);_i($n);return $n;} });
