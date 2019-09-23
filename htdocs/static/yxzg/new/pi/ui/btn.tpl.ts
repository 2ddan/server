
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

const _path = 'pi/ui/btn.tpl';

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

pi_modules['pi/ui/btn.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{"cfg":{"clazz":"","text":"1"}};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["eS"] = 1;$n["aH"] = 2857356896;{let attrvalue = "";attrvalue = it.cfg.clazz;$n["wc"]=attrvalue;}$n["e"]["pointerclick"]="tap";
        $n["eH"]=_j($n["eH"],3386634953);if(it.cfg.text){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"imgtext$","si":2};$n.cs = false;$n.ch = null;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$t=$n;{let $p = $t;	$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["text"]=it.cfg.text;
			//jpair suf
			//jpair pre
			
				{
					let jvalue = "";
					jvalue = "20px 宋体";
			//jpair suf
			
				$n["font"]=jvalue;
				}
				//jpair pre
			
				{
					let jvalue = "";
					jvalue = "#636363";
			//jpair suf
			
				$n["color"]=jvalue;
				}
				$p[textCfg]= $n;}
			//jpair suf
			
				}_e($n, $p);}_i($n);_h($n);$p["cd"].push($n);}}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
