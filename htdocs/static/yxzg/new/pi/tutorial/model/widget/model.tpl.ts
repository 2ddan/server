
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

const _path = 'pi/tutorial/model/widget/model.tpl';

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

pi_modules['pi/tutorial/model/widget/model.tpl'] = exports;



const W = {};
export { W as wcss };
let V=VirtualStyle;
W["container"] = new V([null,"border-box","e8",[0,350],"y",[0,350],"c0",[[0,0],null,null,null,null],"a4",[[0,0],null,null,null,null],"d","#f5f5f5"]);
W["btn"] = new V(["e8",[0,75],"y",[0,15],"a3",[0,10],"u",10]);
W["alert"] = new V(["e8",[0,190],"y",[0,86],"c0",[null,[0,20],[0,30],[0,20],[0,30]],"h",5,"d","#fff"]);
W["custom"] = new V(["a4",[[0,0],null,null,null,null],"l",[0.26,0.73,0.51,1]]);
W["default"] = new V(["a4",[null,[0,10],[0,0],[0,10],[0,0]]]);
W["check"] = new V(["c5",0,"d8",[0,-20],"a0",[0,180],"c0",[[0,0],null,null,null,null],"a4",[[0,0],null,null,null,null],"e8",[0,25],"y",[0,15],"d1",2,"u",8]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 2812074640;$n["wc"]="container";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"button","si":1};$n.cd=[];$n.cH =3820502975;$n["eS"] = 1;$n["aH"] = 2300076757;$n["e"]["on-click"]="showModel";
        $n["eH"]=_j($n["eH"],3036587683);$n["wc"]="btn";$t=$n;{let $p = $t;let $n = _f("Show Model", 3472271557, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 1165266313;{let attrvalue = "";attrvalue += "box ";attrvalue += it.show?'active':'hide';attrvalue += "";$n["class"]=attrvalue;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =197828837;$n["aH"] = 1849617969;$n["wc"]="alert";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"h3","si":4};$n.cd=[];$n.cH =236011507;$n["aH"] = 2701377019;$n["wc"]="custom";$t=$n;{let $p = $t;let $n = _f("custom header", 2461414779, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":5};$n.cd=[];$n.cH =969726780;$n["aH"] = 3470242910;$n["wc"]="default";$t=$n;{let $p = $t;let $n = _f("default header", 2331608957, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n.cH =1864737741;$n["aH"] = 3470242910;$n["wc"]="default";$t=$n;{let $p = $t;let $n = _f("default footer", 9817108, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"button","si":7};$n.cd=[];$n.cH =3303225991;$n["eS"] = 1;$n["aH"] = 2964386493;$n["e"]["on-click"]="closeModel";
        $n["eH"]=_j($n["eH"],2132107742);$n["wc"]="check";$t=$n;{let $p = $t;let $n = _f("OK", 3234671645, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
