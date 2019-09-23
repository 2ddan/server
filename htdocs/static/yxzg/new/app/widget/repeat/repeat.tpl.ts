
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../../pi/gui_compile/style';
import * as _hash from '../../../pi/util/hash';
import { VirtualStyle } from '../../../pi/gui_virtual/virtual_style';
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
} from '../../../pi/util/gui_tpl';

const _path = 'app/widget/repeat/repeat.tpl';

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

pi_modules['app/widget/repeat/repeat.tpl'] = exports;

export const cfg = {
    
};



export const tpl = (function(_cfg,it,it1){let $t, $n;if(window._gui){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 3114071270;{let attrvalue = "";attrvalue += "min-width:0px;min-height:0px;border-width:";attrvalue += it.split;attrvalue += ";border-image-source:url(";attrvalue += it.src;attrvalue += ");border-image-slice: ";attrvalue += it.split;attrvalue += " fill;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);return $n;}}else{it=it||_cfg.it;let split=it.split.split(" ");let arr=[];let inner=[];{let _$i = 0;
				for(let v of split){let i = _$i++;inner.push(+v);arr.push(v==0?0:+v+1);}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["aH"] = 4144318504;{$n["s"]={"b2":[0,4],"b1":[0,4]};$n["sH"]=3133437332;$n["sS"]=2;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 1347567488;{let attrvalue = "";attrvalue += "position:absolute;left:0;top:0;border-style:solid;border-color:transparent;border-width:";attrvalue += arr.join('px ')+'px';attrvalue += ";border-image:url(";attrvalue += it.src;attrvalue += ") ";attrvalue += arr.join(' ');attrvalue += " fill round;width:calc(100% - ";attrvalue += arr[1]+arr[3];attrvalue += "px);height:calc(100% - ";attrvalue += arr[0]+arr[2];attrvalue += "px);box-sizing: content-box;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n["aH"] = 1347567488;{let attrvalue = "";attrvalue += "position:absolute;left:0;top:0;border-style:solid;border-color:transparent;border-width:";attrvalue += inner.join('px ')+'px';attrvalue += ";border-image:url(";attrvalue += it.src;attrvalue += ") ";attrvalue += inner.join(' ');attrvalue += " fill round;width:calc(100% - ";attrvalue += inner[1]+inner[3];attrvalue += "px);height:calc(100% - ";attrvalue += inner[0]+inner[2];attrvalue += "px);box-sizing: content-box;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;}} });
