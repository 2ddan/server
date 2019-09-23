
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

const _path = 'pi/ui/login.tpl';

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

pi_modules['pi/ui/login.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n.cH =3562012056;$n["eS"] = 1;$n["aH"] = 3424747121;{$n["s"]={"c5":1,"e8":[1,100],"y":[1,100],"b9":true};$n["sH"]=3337196601;$n["sS"]=4;}$n["e"]["pointerclick"]='loginWX';
        $n["eH"]=_j($n["eH"],1561873941);$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n.cH =1649516738;$n["eS"] = 1;$n["aH"] = 2190861310;{$n["s"]={"c5":undefined,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1622718910;$n["sS"]=4;}$n["e"]["pointerclick"]='loginWX';
        $n["eH"]=_j($n["eH"],1561873941);$t=$n;{let $p = $t;let $n = _f("微信登录", 2867417030, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n.cH =3027014365;$n["eS"] = 1;$n["aH"] = 1414162023;{$n["s"]={"c5":0,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1605678882;$n["sS"]=4;}$n["e"]["pointerclick"]='loginQQ';
        $n["eH"]=_j($n["eH"],2837537112);$t=$n;{let $p = $t;let $n = _f("qq登录", 1325121774, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =4210647623;$n["eS"] = 1;$n["aH"] = 1154695254;{$n["s"]={"c5":0,"e8":[1,100],"y":[0,30],"b9":true};$n["sH"]=1605678882;$n["sS"]=4;}$n["e"]["pointerclick"]='loginWeiBo';
        $n["eH"]=_j($n["eH"],1563650689);$t=$n;{let $p = $t;let $n = _f("微博登录", 334242217, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);return $n;} });
