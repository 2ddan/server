
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

const _path = 'app/widget/ui/filter.tpl';

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

pi_modules['app/widget/ui/filter.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"img","si":0};$n.cd=[];$n["aS"] = 1;$n["aH"] = 1848122660;{let attrvalue = "";attrvalue += it.url||'app/widget/ui/images/filter.png';attrvalue += "";$n["a"]["src"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["src"]));_i($n);_h($n);return $n;} });
