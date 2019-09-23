
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

const _path = 'pi/ui/selectnumber.tpl';

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

pi_modules['pi/ui/selectnumber.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 2895707610;{$n["s"]={"e8":[0,220],"c5":1,"y":[0,30]};$n["sH"]=2982036396;$n["sS"]=3;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ansi$","si":1};$n.cs = false;$n.ch = null;$n.cH =1778491827;$n["eS"] = 2;$n["aH"] = 3771008677;{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$n["e"]["pointerdown"]="down(-10, e)";
        $n["eH"]=_j($n["eH"],2900832330);$n["e"]["pointerup"]="up";
        $n["eH"]=_j($n["eH"],2140875212);$t=$n;{let $p = $t;let $n = _f("-10", 3780527279, $p);;
				$p["ch"] = $n["t"];$p["cs"] = true;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = _f("&nbsp; &nbsp;", 1615921924, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ansi$","si":2};$n.cs = false;$n.ch = null;$n.cH =714772028;$n["eS"] = 2;$n["aH"] = 1435153060;{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$n["e"]["pointerdown"]="down(-1)";
        $n["eH"]=_j($n["eH"],1435892990);$n["e"]["pointerup"]="up";
        $n["eH"]=_j($n["eH"],2140875212);$t=$n;{let $p = $t;let $n = _f("-1", 3933121590, $p);;
				$p["ch"] = $n["t"];$p["cs"] = true;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = _f("&nbsp; &nbsp;", 1615921924, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":3};$n.cd=[];$n["aS"] = 1;$n["aH"] = 2553073316;{$n["s"]={"n":0,"e8":[0,60]};$n["sH"]=2960489041;$n["sS"]=2;}{let attrvalue = "";attrvalue = it.count;$n["a"]["value"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["value"]));_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = _f("&nbsp; &nbsp;", 1615921924, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ansi$","si":4};$n.cs = false;$n.ch = null;$n.cH =3757521880;$n["eS"] = 2;$n["aH"] = 1578896188;{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$n["e"]["pointerdown"]="down(1)";
        $n["eH"]=_j($n["eH"],434398867);$n["e"]["pointerup"]="up";
        $n["eH"]=_j($n["eH"],2140875212);$t=$n;{let $p = $t;let $n = _f("+1", 137696112, $p);;
				$p["ch"] = $n["t"];$p["cs"] = true;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = _f("&nbsp; &nbsp;", 1615921924, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"ansi$","si":5};$n.cs = false;$n.ch = null;$n.cH =3441213389;$n["eS"] = 2;$n["aH"] = 3414628697;{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$n["e"]["pointerdown"]="down(10)";
        $n["eH"]=_j($n["eH"],1329752488);$n["e"]["pointerup"]="up";
        $n["eH"]=_j($n["eH"],2140875212);$t=$n;{let $p = $t;let $n = _f("+10", 3455166649, $p);;
				$p["ch"] = $n["t"];$p["cs"] = true;}_i($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
