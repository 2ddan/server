
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

const _path = 'pi/gui_ui/combineImage/img.tpl';

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

pi_modules['pi/gui_ui/combineImage/img.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"img","si":0};$n.cd=[];$n["aS"] = 2;$n["aH"] = 3938285257;{let attrvalue = "";attrvalue += it.src;attrvalue += "";$n["a"]["src"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["src"]));{let attrvalue = "";attrvalue += it.imageClip;attrvalue += "";$n["a"]["imageClip"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["imageClip"]));_i($n);_h($n);return $n;} });
