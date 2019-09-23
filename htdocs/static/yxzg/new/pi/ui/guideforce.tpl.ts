
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

const _path = 'pi/ui/guideforce.tpl';

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

pi_modules['pi/ui/guideforce.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 3789815720;{$n["s"]={"c5":1,"a0":[0,0],"d8":[0,0],"e8":[0,0],"y":[0,0]};$n["sH"]=3254116660;$n["sS"]=5;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["aH"] = 4100453815;{let attrvalue = "";attrvalue += "position:absolute;left:0;top:0;width:100%;height:";attrvalue += it.y;attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 2332425630;{let attrvalue = "";attrvalue += "position:absolute;left:0;top:";attrvalue += it.y;attrvalue += ";width:";attrvalue += it.x;attrvalue += ";height:";attrvalue += it.h;attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n["aH"] = 3570800883;{let attrvalue = "";attrvalue += "position:absolute;left:";attrvalue += it.x+it.w;attrvalue += ";top:";attrvalue += it.y;attrvalue += ";width:100%;height:";attrvalue += it.h;attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n["aH"] = 4292176628;{let attrvalue = "";attrvalue += "position:absolute;left:0;top:";attrvalue += it.y+it.h;attrvalue += ";width:100%;height:100%;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":5};$n.cd=[];$n["aH"] = 3401059780;{let attrvalue = "";attrvalue += "position:absolute;left:";attrvalue += it.x;attrvalue += ";top:";attrvalue += it.y;attrvalue += ";width:";attrvalue += it.w;attrvalue += ";height:";attrvalue += it.h;attrvalue += ";pointer-events:none;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
