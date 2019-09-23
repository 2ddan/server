
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

const _path = 'pi/gui_root/root.tpl';

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

pi_modules['pi/gui_root/root.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =2576956179;$n["aS"] = 1;$n["eS"] = 7;$n["aH"] = 3425673359;$n["a"]["isSendNextLayer"] = '1';$n["e"]["pointerdown"]="down(e)";
        $n["eH"]=_j($n["eH"],3508812620);$n["e"]["pointerup"]="up(e)";
        $n["eH"]=_j($n["eH"],126180397);$n["e"]["pointermove"]="move(e)";
        $n["eH"]=_j($n["eH"],2594484068);$n["e"]["pointerclick"]="click(e)";
        $n["eH"]=_j($n["eH"],1363209962);$n["e"]["multipointer"]='multipointer(e)';
        $n["eH"]=_j($n["eH"],740533614);$n["e"]["longTap"]='longtap(e)';
        $n["eH"]=_j($n["eH"],3448387871);$n["e"]["dbclick"]='dbclick(e)';
        $n["eH"]=_j($n["eH"],3731611838);{$n["s"]={"e8":[1,100],"y":[1,100]};$n["sH"]=1263185136;$n["sS"]=2;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2929678473;$n["a"]["group"] = "background";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":0};$n["sH"]=3060056506;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2301529140;$n["a"]["group"] = "scene";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":10};$n["sH"]=3782639064;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1134062880;$n["a"]["group"] = "main";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":20};$n["sH"]=1556912397;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 769888439;$n["a"]["group"] = "guide_scene";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":30};$n["sH"]=2208861813;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":5};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1757025711;$n["a"]["group"] = "secondary";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":40};$n["sH"]=2198341547;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1074290463;$n["a"]["group"] = "top";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":60};$n["sH"]=1859233234;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":7};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 3244577372;$n["a"]["group"] = "login";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":70};$n["sH"]=3580572720;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":8};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1623231567;$n["a"]["group"] = "scene_ui";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":80,"f3":1};$n["sH"]=3911830947;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":9};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1311268616;$n["a"]["group"] = "card";{$n["s"]={"c5":1,"y":[1,100],"e8":[0,0],"f0":85};$n["sH"]=1574371612;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":10};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2171781133;$n["a"]["group"] = "card_panel";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":90,"f3":1};$n["sH"]=1993437339;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":11};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 733584410;$n["a"]["group"] = "cover";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":100,"e":[0,0,0,0.7]};$n["sH"]=2206858688;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":12};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1309569511;$n["a"]["group"] = "cover_pop";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":110};$n["sH"]=2956451128;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":13};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 3362536993;$n["a"]["group"] = "top_tip";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":120};$n["sH"]=1422646;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":14};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 1873422296;$n["a"]["group"] = "guide";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":130};$n["sH"]=3158942908;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":15};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2927168549;$n["a"]["group"] = "pop_tip";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":140,"f3":1};$n["sH"]=2079680950;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":16};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2925500706;$n["a"]["group"] = "screen";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":150,"f3":1};$n["sH"]=604650313;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":17};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2533506035;$n["a"]["group"] = "download";{$n["s"]={"c5":1,"y":[1,100],"e8":[0,0],"f0":170};$n["sH"]=1942392517;$n["sS"]=4;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":18};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2597986370;$n["a"]["group"] = "connect";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":220,"f3":1};$n["sH"]=2647888982;$n["sS"]=5;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":19};$n.cd=[];$n.cH =2946814719;$n["aS"] = 1;$n["aH"] = 2905666899;$n["a"]["group"] = "offLine";{$n["s"]={"c5":1,"y":[1,100],"e8":[1,100],"f0":260};$n["sH"]=3474001376;$n["sS"]=4;}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
