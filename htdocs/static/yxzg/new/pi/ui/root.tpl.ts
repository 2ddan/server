
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

const _path = 'pi/ui/root.tpl';

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

pi_modules['pi/ui/root.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =3131596359;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1041517288;$n["a"]["group"] = "background";{$n["s"]={"c5":1,"a0":[0,0],"c7":[0,0],"d8":[0,0],"j":[0,0],"b9":true,"f0":1};$n["sH"]=2061224682;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2136583890;$n["a"]["group"] = "scene";{$n["s"]={"c5":1,"a0":[0,0],"c7":[0,0],"d8":[0,0],"j":[0,0],"b9":true,"f0":3};$n["sH"]=2616456876;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2537756994;$n["a"]["group"] = "main";{$n["s"]={"c5":1,"a0":[0,0],"c7":[0,0],"d8":[0,0],"j":[0,0],"b9":true,"f0":4};$n["sH"]=3948992635;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1664016745;$n["a"]["group"] = "secondary";{$n["s"]={"c5":1,"a0":[0,0],"c7":[0,0],"d8":[0,0],"j":[0,0],"b9":true,"f0":5};$n["sH"]=2328106205;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":5};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 3268499416;$n["a"]["group"] = "top";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[1,100],"y":[1,100],"f0":6};$n["sH"]=3965673224;$n["sS"]=6;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 705472822;$n["a"]["group"] = "cover";{$n["s"]={"c5":1,"a0":[0,0],"c7":[0,0],"d8":[0,0],"j":[0,0],"b9":true,"f0":8};$n["sH"]=3960479918;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":7};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1765514644;$n["a"]["group"] = "guide";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"f0":12};$n["sH"]=2733018008;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":8};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2452836308;$n["a"]["group"] = "pop_tip";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[1,100],"y":[1,100],"f3":1,"f0":14};$n["sH"]=3849106485;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":9};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1082278717;$n["a"]["group"] = "download";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[0,0],"y":[0,0],"f0":16};$n["sH"]=476988081;$n["sS"]=6;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":10};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 3695499326;$n["a"]["group"] = "connect";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[0,0],"y":[0,0],"f3":1,"f0":22};$n["sH"]=3983090451;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":11};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 715095738;$n["a"]["group"] = "touch";{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[0,0],"y":[0,0],"f3":1,"f0":24};$n["sH"]=1775048242;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"pre","si":12};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2895345406;$n["a"]["group"] = "log";{$n["s"]={"l":[0,0,0,0],"c5":1,"a0":[0,0],"d8":[0,0],"e8":[1,100],"y":[2,0],"f3":1,"f0":100,"e":[0,0,0,0.6]};$n["sH"]=3753002838;$n["sS"]=9;}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
