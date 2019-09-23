
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../gui_compile/style';
import * as _hash from '../../util/hash';
import { VirtualStyle } from '../../gui_virtual/virtual_style';
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
} from '../../util/gui_tpl';

const _path = 'pi/net/ui/con_mgr.tpl';

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

pi_modules['pi/net/ui/con_mgr.tpl'] = exports;





export const tpl = (function(_cfg,it,it1){let $t, $n;let con=["连接初始化...","连接中...","已连接","连接已断开"];let login=["登录初始化...","登录中...","已登录","重登中...","登出中...","已登出","登录错误"];$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 1991980283;{let attrvalue = "";attrvalue += "display:";attrvalue += it.login!=2||it.con!=2?'block':'none';attrvalue += ";position:absolute;top:0;left:0;width: 100%;height: 100%;font-size: 20px;color: #fff;z-index:200;";attrvalue=_s(attrvalue);$n["s"]=attrvalue;$n["sS"]=Object.keys(attrvalue).length;$n["sH"]=_d(attrvalue);}if(false){if(it.con!=2){$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":1};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;_addText(con[it.con], $p);}_i($n);_h($n);$p["cd"].push($n);}}else{$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":2};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;_addText(login[it.login], $p);}_i($n);_h($n);$p["cd"].push($n);}}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n.cH =2946814719;$n["aH"] = 4259106361;{$n["s"]={"c5":1,"d8":[0,0],"a0":[0,0],"e8":[1,100],"y":[1,100],"d":"#000","b3":0.3};$n["sH"]=270925723;$n["sS"]=7;}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":4};$n.cd=[];$n.cH =1489217895;$n["aH"] = 1518794529;{$n["s"]={"e8":[0,80],"y":[0,40],"c5":1,"d8":[0,0],"j":[0,0],"a0":[0,0],"c7":[0,0],"a4":[[2,0],null,null,null,null]};$n["sH"]=2416787269;$n["sS"]=8;}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":5};$n.cd=[];$n.cH =3809073328;$n["aH"] = 1761107261;{$n["s"]={"e8":[0,80],"y":[0,30],"d1":2};$n["sH"]=2009041930;$n["sS"]=3;}$t=$n;{let $p = $t;let $n = _f("连接中", 1680043109, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n.cH =2946814719;$n["aH"] = 728915604;{$n["s"]={"e8":[0,40],"y":[0,20],"undefined":"no-repeat","a4":[null,[0,0],[2,0],[0,0],[2,0]]};$n["sH"]=1974736433;$n["sS"]=4;}_i($n);$p["cd"].push($n);}_i($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
