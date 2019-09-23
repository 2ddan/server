
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

const _path = 'pi/ui/navtab.tpl';

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

pi_modules['pi/ui/navtab.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;it=it||{cur:0,btn:"btn$",arr:[{tab:"selectnumber$",btn:{"text":"Abc1"},cfg:{}},{tab:"selectnumber$",btn:{"text":"Abc2"},cfg:{}}],old:{},type:0};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 263893721;{$n["s"]={"e8":[1,100],"y":[1,100]};$n["sH"]=1263185136;$n["sS"]=2;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["aH"] = 904429599;$n["wc"]="tabs";if(it.type===0){{let _$i = 0;
				for(let v of it.arr){let i = _$i++;if(i==it.cur){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":2};$n.cs = false;$n.ch = null;$n["aH"] = 1010165104;{let attrvalue = "";attrvalue = v.tab;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{$n["s"]={"e6":true,"f0":2,"c5":1,"e8":[1,100],"y":[1,100]};$n["sH"]=2161381543;$n["sS"]=5;}$t=$n;{let $p = $t;_addJson(v.cfg?v.cfg:i, $p);}_i($n);_h($n);$p["cd"].push($n);}}else if(it.old[i]){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":3};$n.cs = false;$n.ch = null;$n["aH"] = 1836112609;{let attrvalue = "";attrvalue = v.tab;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{$n["s"]={"e6":false,"f0":1,"c5":1,"e8":[1,100],"y":[1,100]};$n["sH"]=551484289;$n["sS"]=5;}$t=$n;{let $p = $t;_addJson(v.cfg?v.cfg:i, $p);}_i($n);_h($n);$p["cd"].push($n);}}}}}else if(it.type===1){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":4};$n.cs = false;$n.ch = null;$n["aH"] = 3518817415;{let attrvalue = "";attrvalue = it.arr[it.cur];$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{$n["s"]={"c5":1,"e8":[1,100],"y":[1,100]};$n["sH"]=2157671682;$n["sS"]=3;}$t=$n;{let $p = $t;_addJson(it.cur, $p);}_i($n);_h($n);$p["cd"].push($n);}}else{{let _$i = 0;
				for(let v of it.arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":5};$n.cs = false;$n.ch = null;$n["aH"] = 3770069693;{let attrvalue = "";attrvalue = v.tab;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{let attrvalue = "";attrvalue += "visibility: ";attrvalue += i==it.cur?'visible':'hidden';attrvalue += "; z-index:";attrvalue += i==it.cur?2:1;attrvalue += "; position:absolute; width:100%;height:100%;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}$t=$n;{let $p = $t;_addJson(v.cfg?v.cfg:i, $p);}_i($n);_h($n);$p["cd"].push($n);}}}}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n["aS"] = 1;$n["eS"] = 1;$n["aH"] = 1339349161;$n["a"]["btns"] = "";$n["wc"]="btns";$n["e"]["ev-btn"]="change";
        $n["eH"]=_j($n["eH"],1980873737);{let _$i = 0;
				for(let v of it.arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":7};$n.cs = false;$n.ch = null;$n["aH"] = 513035889;{let attrvalue = "";attrvalue = it.btn;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["cfg"]=v.btn;
			//jpair suf
			//jpair pre
			
				$t=$n;{let $p = $t;	$t=$n;{let $p = $t;let $n = {};//jpair pre
			
				$n["cmd"]=i;
			//jpair suf
			$p[e]= $n;}
			//jpair suf
			
				}//jpair pre
			
				$n["select"]=i==it.cur;
			//jpair suf
			_e($n, $p);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
