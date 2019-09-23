
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../../gui_compile/style';
import * as _hash from '../../../util/hash';
import { VirtualStyle } from '../../../gui_virtual/virtual_style';
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
} from '../../../util/gui_tpl';

const _path = 'pi/tutorial/tree/widget/tree.tpl';

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

pi_modules['pi/tutorial/tree/widget/tree.tpl'] = exports;



const W = {};
export { W as wcss };
let V=VirtualStyle;
W["container"] = new V(["b1",[0,0],"d","#f5f5f5","l",[0.13,0.13,0.13,1]]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =2947293900;$n["aH"] = 2812074640;$n["wc"]="container";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"p","si":1};$n.cd=[];$n.cH =1167017078;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = _f("(You can double click on an item to turn it into a folder.)", 186211006, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ul","si":2};$n.cd=[];$n.cH =122172209;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"child$","si":3};$n.cs = false;$n.ch = null;$n.cH =2946814719;$n["aH"] = 0;_i($n);$p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
