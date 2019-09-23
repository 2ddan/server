
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

const _path = 'pi/gui_ui/html.tpl';

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

pi_modules['pi/gui_ui/html.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it1=it1||{};it=it||{};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 1996889236;{$n["s"]={"n":0};$n["sH"]=34336634;$n["sS"]=1;}for(let i in it.innerhtml){let v = it.innerhtml[i];if(v.dType==='text'){let divstyle='';for(let i1 in it1.divStyles){let v1 = it1.divStyles[i1];if(v[v1]){divstyle=divstyle+v1+':'+v[v1]+';';}}let txtstyle='';for(let i2 in it1.textStyles){let v2 = it1.textStyles[i2];if(v[v2]){txtstyle=txtstyle+v2+':'+v[v2]+';';}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["eS"] = 1;$n["aH"] = 1737518437;{let attrvalue = "";attrvalue += v['on-tap'];attrvalue += "";$n["e"]["pointerclick"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(2533094024, _calTextHash(attrvalue)));
}{let attrvalue = "";attrvalue += "flex-direction: row;";attrvalue += divstyle;attrvalue += "width:auto;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":2};$n.cd=[];$n["aH"] = 1979317745;{let attrvalue = "";attrvalue += txtstyle;attrvalue += "";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}$t=$n;{let $p = $t;_addText(v['text'], $p);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}else{let imgstyle='';for(let i1 in it1.imgStyles){let v1 = it1.imgStyles[i1];if(v[v1]){imgstyle=imgstyle+v1+':'+v[v1]+';';}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"img","si":3};$n.cd=[];$n["aS"] = 1;$n["aH"] = 1483984180;{let attrvalue = "";attrvalue += v['src'];attrvalue += "";$n["a"]["src"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["src"]));{let attrvalue = "";attrvalue += imgstyle;attrvalue += "";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);return $n;} });
