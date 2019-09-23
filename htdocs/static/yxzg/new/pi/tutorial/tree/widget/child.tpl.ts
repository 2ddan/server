
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

const _path = 'pi/tutorial/tree/widget/child.tpl';

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

pi_modules['pi/tutorial/tree/widget/child.tpl'] = exports;



const W = {};
export { W as wcss };
let V=VirtualStyle;
W["show"] = new V(["n",0]);
W["hide"] = new V(["n",1]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"li","si":1};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["eS"] = 1;$n["aH"] = 1158478877;$n["e"]["on-click"]="slideDown";
        $n["eH"]=_j($n["eH"],2551393376);{$n["s"]={"x":800};$n["sH"]=2087092920;$n["sS"]=1;}$t=$n;{let $p = $t;_addText(it.data.name, $p);}if(it.open){$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":3};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;_addText("[－]", $p);}_i($n);_h($n);$p["cd"].push($n);}}else{$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":4};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;_addText("[＋]", $p);}_i($n);_h($n);$p["cd"].push($n);}}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ul","si":5};$n.cd=[];$n["aH"] = 2255571891;{let attrvalue = "";if(it.open){attrvalue += "show";}else{attrvalue += "hide";}attrvalue += "";$n["wc"]=attrvalue;}{let _$i = 0;
				for(let v of it.data.children){let i = _$i++;if(v.children){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"li","si":6};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"child$","si":7};$n.cs = false;$n.ch = null;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["data"]=v;
			//jpair suf
			//jpair pre
			
				$n["open"]=it.folderOpen;
			//jpair suf
			_e($n, $p);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}else{$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"li","si":8};$n.cd=[];$n["eS"] = 1;$n["aH"] = 5499052;{let attrvalue = "";attrvalue += "addFolder(";attrvalue += i;attrvalue += ")";$n["e"]["on-dblclick"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(1115411947, _calTextHash(attrvalue)));
}$t=$n;{let $p = $t;_addText(v.name, $p);}_i($n);_h($n);$p["cd"].push($n);}}}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"li","si":9};$n.cd=[];$n.cH =3969934395;$n["eS"] = 1;$n["aH"] = 3312734778;$n["e"]["on-click"]="addChild";
        $n["eH"]=_j($n["eH"],2782146872);$t=$n;{let $p = $t;let $n = _f("+", 3807426999, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
