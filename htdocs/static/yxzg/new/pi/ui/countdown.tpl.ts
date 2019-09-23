
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

const _path = 'pi/ui/countdown.tpl';

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

pi_modules['pi/ui/countdown.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":0};$n.cd=[];$n["aH"] = 0;if(it.cdInfo){let show=it.cdInfo.date+"天 "+it.cdInfo.hour+"时 "+it.cdInfo.minute+"分 "+it.cdInfo.second+"秒 ";$t=$n;{let $p = $t;_addText(show, $p);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"imgtext$","si":1};$n.cs = false;$n.ch = null;$n["aH"] = 0;$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$t=$n;{let $p = $t;	$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["text"]=show;
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
			
				}_e($n, $p);}_i($n);_h($n);$p["cd"].push($n);}}_i($n);_h($n);return $n;} });
