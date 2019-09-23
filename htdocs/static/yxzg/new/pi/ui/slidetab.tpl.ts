
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

const _path = 'pi/ui/slidetab.tpl';

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

pi_modules['pi/ui/slidetab.tpl'] = exports;

export const cfg = {
    "btn":"ui-btn",
    "arr":[{
        "tab":"ui-xbtn",
        "btn":{
            "clazz":"111",
            "text":"111"
        },
        "color":"red"
    },{
        "tab":"ui-xbtn",
        "btn":{
            "clazz":"222",
            "text":"222"
        },
        "color":"yellow"
    },{
        "tab":"ui-btn",
        "btn":{
            "clazz":"333",
            "text":"333"
        },
         "color":"green"
   }]
};

const W = {};
export { W as wcss };
let V=VirtualStyle;
W["tabs"] = new V(["c5",1,"a0",[0,0],"d8",[0,0],"j",[0,40],"a6",[0,0],"a8",[0,0],"e8",[1,100]]);
W["btns"] = new V([null,"url(./btnl.png), url(./btnr.png)","c5",1,"b9",true,"a0",[0,0],"j",[0,0],"a6",[0,0],"a8",[0,0],"e8",[1,100],"y",[0,60],"e",[0,0,0,0]]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = _f("}", 4122649163, $p);;
				return $n;}it=it||{cur:0};$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 263893721;{$n["s"]={"e8":[1,100],"y":[1,100]};$n["sH"]=1263185136;$n["sS"]=2;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":1};$n.cd=[];$n["eS"] = 3;$n["aH"] = 573763041;$n["wc"]="tabs";$n["e"]["pointermove"]="moveTab";
        $n["eH"]=_j($n["eH"],2599241910);$n["e"]["on-touchstart"]="poiseStart";
        $n["eH"]=_j($n["eH"],3405887700);$n["e"]["on-touchend"]="poiseEnd";
        $n["eH"]=_j($n["eH"],3365880347);$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aS"] = 1;$n["aH"] = 583283217;$n["a"]["container"] = "";{let attrvalue = "";attrvalue += "width:100%;height:100%;transform:translateX(";attrvalue += -100*it.cur;attrvalue += "%);";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}{let _$i = 0;
				for(let v of _cfg.arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":3};$n.cs = false;$n.ch = null;$n["aH"] = 1773846051;{let attrvalue = "";attrvalue = v.tab;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{let attrvalue = "";attrvalue += "position: absolute;left:";attrvalue += 100*i;attrvalue += "%;width:100%;height:100%;background-color: ";attrvalue += v.color;attrvalue += ";";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}_i($n);_h($n);$p["cd"].push($n);}}}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n["aS"] = 1;$n["eS"] = 1;$n["aH"] = 1339349161;$n["a"]["btns"] = "";$n["wc"]="btns";$n["e"]["ev-btn"]="change";
        $n["eH"]=_j($n["eH"],1980873737);{let _$i = 0;
				for(let v of _cfg.arr){let i = _$i++;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"widget","si":5};$n.cs = false;$n.ch = null;$n["aH"] = 513035889;{let attrvalue = "";attrvalue = _cfg.btn;$n["a"]["w-tag"] = attrvalue;}$n["aH"] = _j($n["aH"], _c($n["a"]["w-tag"]));$n["tg"] = $n["a"]["w-tag"];{$n["s"]={"n":0};$n["sH"]=2322793901;$n["sS"]=1;}$t=$n;{let $p = $t;let $n = {};//jpair pre
			
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
