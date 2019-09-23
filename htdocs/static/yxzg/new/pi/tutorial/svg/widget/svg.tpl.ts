
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

const _path = 'pi/tutorial/svg/widget/svg.tpl';

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

pi_modules['pi/tutorial/svg/widget/svg.tpl'] = exports;



const W = {};
export { W as wcss };
let V=VirtualStyle;
W["svgGraph"] = new V(["e8",[1,50],"e",[0.93,0.93,0.93,1],"a4",[null,[0,0],[2,0],[0,0],[2,0]],"c0",[null,[0,50],[0,30],[0,50],[0,30]]]);
W["lable"] = new V(["c0",[null,[0,0],[0,10],[0,0],[0,10]],"e5",1]);
W["number"] = new V(["n",0,"a6",[0,10],"e5",1]);
W["close"] = new V(["a4",[null,[0,0],[0,10],[0,0],[0,10]],"e5",1]);
W["add"] = new V(["n",0,"a7",[0,10]]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 1028642714;$n["wc"]="svgGraph";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":1};$n.cs = false;$n.ch = null;$n["aH"] = 2047049699;$n["a"]["w-tag"] = "ui-html";$n["tg"] = $n["a"]["w-tag"];$t=$n;{let $p = $t;_addJson(it.innerHTML, $p);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 4252679546;$n["wc"]="body";{let _$i = 0;
				for(let item of it.data){let index = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"label","si":4};$n.cd=[];$n["aH"] = 303221915;$n["wc"]="lable";$t=$n;{let $p = $t;_addText(item.label, $p);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":5};$n.cd=[];$n["aS"] = 4;$n["eS"] = 1;$n["aH"] = 1371179696;$n["a"]["type"] = "range";$n["a"]["max"] = "100";$n["a"]["min"] = "0";{let attrvalue = "";attrvalue += item.value;attrvalue += "";$n["a"]["value"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["value"]));{let attrvalue = "";attrvalue += "change(e,";attrvalue += index;attrvalue += ")";$n["e"]["on-input"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(1675340146, _calTextHash(attrvalue)));
}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":6};$n.cd=[];$n["aH"] = 444911005;$n["wc"]="number";$t=$n;{let $p = $t;_addText(item.value, $p);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"button","si":7};$n.cd=[];$n["eS"] = 1;$n["aH"] = 3781782263;$n["wc"]="close";{let attrvalue = "";attrvalue += "delete(";attrvalue += index;attrvalue += ")";$n["e"]["on-click"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(487324508, _calTextHash(attrvalue)));
}$t=$n;{let $p = $t;let $n = _f("X", 1963782327, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":8};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":9};$n.cd=[];$n["aS"] = 2;$n["eS"] = 1;$n["aH"] = 467278196;$n["a"]["type"] = "text";$n["wc"]="add";{let attrvalue = "";attrvalue += it.newLab;attrvalue += "";$n["a"]["value"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["value"]));$n["e"]["on-keyup"]="inputChange";
        $n["eH"]=_j($n["eH"],360856050);_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"button","si":10};$n.cd=[];$n.cH =3434034066;$n["eS"] = 1;$n["aH"] = 1508461356;$n["e"]["on-click"]="add";
        $n["eH"]=_j($n["eH"],349153738);$t=$n;{let $p = $t;let $n = _f("Add a Stat", 4065840338, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
