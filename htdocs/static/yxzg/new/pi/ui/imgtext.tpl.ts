
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

const _path = 'pi/ui/imgtext.tpl';

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

pi_modules['pi/ui/imgtext.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;let textCfg=it.textCfg;let zoomfactor=textCfg.zoomfactor;if(textCfg.isCommon){if(!textCfg.charUV){$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":0};$n.cd=[];$n["aH"] = 0;_i($n);return $n;}}else{let arr=it.show.split("");let uv={};$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":1};$n.cd=[];$n["aH"] = 0;{let _$i = 0;
				for(let v of arr){let i = _$i++;uv=textCfg.charUV[v];$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":2};$n.cd=[];$n["aH"] = 2915635491;{let attrvalue = "";attrvalue += "display:inline-block;overflow:hidden;background-image:url(";attrvalue += textCfg.url;attrvalue += ");background-repeat:no-repeat;background-size:";attrvalue += textCfg.width/zoomfactor;attrvalue += "px ";attrvalue += textCfg.height/zoomfactor;attrvalue += "px;background-position:-";attrvalue += uv.u1/zoomfactor;attrvalue += "px -";attrvalue += uv.v1/zoomfactor;attrvalue += "px;width:";attrvalue += (uv.u2-uv.u1)/zoomfactor;attrvalue += "px;height:";attrvalue += (uv.v2-uv.v1)/zoomfactor;attrvalue += "px;";if(it.space){attrvalue += "margin:0px ";attrvalue += it.space;attrvalue += "px;";}attrvalue += "";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);return $n;}}}else{$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"img","si":3};$n.cd=[];$n["aS"] = 1;$n["aH"] = 1999824179;{let attrvalue = "";attrvalue += "width:";attrvalue += textCfg.width/zoomfactor;attrvalue += "px; height:";attrvalue += textCfg.height/zoomfactor;attrvalue += "px";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}{let attrvalue = "";attrvalue = textCfg.url||'';$n["a"]["src"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["src"]));_i($n);_h($n);return $n;}} });
