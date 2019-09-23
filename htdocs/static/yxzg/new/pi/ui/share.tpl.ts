
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

const _path = 'pi/ui/share.tpl';

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

pi_modules['pi/ui/share.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =3854526513;$n["eS"] = 1;$n["aH"] = 3424747121;{$n["s"]={"c5":1,"e8":[1,100],"y":[1,100],"b9":true};$n["sH"]=3337196601;$n["sS"]=4;}$n["e"]["pointerclick"]='loginWX';
        $n["eH"]=_j($n["eH"],1561873941);$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n.cH =3635892817;$n["eS"] = 1;$n["aH"] = 759496513;{$n["s"]={"c5":undefined,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1622718910;$n["sS"]=4;}$n["e"]["pointerclick"]='shareTargetTimeLine()';
        $n["eH"]=_j($n["eH"],2746343178);$t=$n;{let $p = $t;let $n = _f("分享到朋友圈", 3117812310, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n.cH =1847912510;$n["eS"] = 1;$n["aH"] = 3697493059;{$n["s"]={"c5":0,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1605678882;$n["sS"]=4;}$n["e"]["pointerclick"]='shareTargetSession()';
        $n["eH"]=_j($n["eH"],3742673981);$t=$n;{let $p = $t;let $n = _f("分享给微信好友", 1538304832, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =835702886;$n["eS"] = 1;$n["aH"] = 1078742436;{$n["s"]={"c5":0,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1605678882;$n["sS"]=4;}$n["e"]["pointerclick"]='shareQQ()';
        $n["eH"]=_j($n["eH"],3762218490);$t=$n;{let $p = $t;let $n = _f("分享到qq", 2940269846, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n.cH =183028410;$n["eS"] = 1;$n["aH"] = 3069046265;{$n["s"]={"c5":0,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1605678882;$n["sS"]=4;}$n["e"]["pointerclick"]='shareWB()';
        $n["eH"]=_j($n["eH"],3103860368);$t=$n;{let $p = $t;let $n = _f("分享到微博", 536666808, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
