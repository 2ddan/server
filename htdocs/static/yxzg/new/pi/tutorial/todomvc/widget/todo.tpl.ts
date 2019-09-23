
import { styleStr2Json as _styleStr2Json, styleStr2JsonName } from '../../../gui_compile/style';
import * as _hash from '../../../util/hash';
import { VirtualStyle } from '../../../gui_virtual/virtual_style';
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
} from '../../../util/gui_tpl';

const _path = 'pi/tutorial/todomvc/widget/todo.tpl';

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

pi_modules['pi/tutorial/todomvc/widget/todo.tpl'] = exports;



const W = {};
export { W as wcss };
let V=VirtualStyle;
W["container"] = new V([null,"border-box","e8",[1,100],"b1",[1,100],"a4",[null,[0,-50],[0,0],[0,0],[0,0]],"c0",[[0,0],null,null,null,null],"d","#f5f5f5","l",[0.3,0.3,0.3,1]]);
W["boxcompleted"] = new V(["l",[0.36,0.76,0.69,1],"f",[0.74,0.85,0.84,1]]);
W["boxactive"] = new V(["l",[0,0,0,0],"f",[0.6,0.6,0.6,1]]);
W["itemcompleted"] = new V(["d3",4,"b3",0.3,null,"all .3s"]);
W["title"] = new V(["a5",[0,10],"d1",2,"u",70,"x",400,"l",[0.69,0.18,0.18,0.15]]);
W["wrapper"] = new V(["e8",[1,75],"a4",[null,[0,0],[2,0],[0,0],[2,0]],"c0",[null,[0,0],[0,5],[0,0],[0,5]],null,"1px solid #eee",null,"none","k",null]);
W["search"] = new V(["n",0,"z",0,"c0",[null,[0,5],[0,0],[0,5],[0,0]]]);
W["arrow"] = new V(["a7",[0,5],"b3",0.2,null,"default"]);
W["active"] = new V(["b3",0.8]);
W["inner"] = new V(["d1",0,null,"none","v",1,"l",[0.3,0.3,0.3,1],"b3",0.3]);
W["content"] = new V([null,"1px solid #eee"]);
W["options"] = new V(["c5",0,"a4",[null,[0,0],[2,0],[0,0],[2,0]],"c0",[[0,5],null,null,null,null],"u",8,"l",[0.47,0.47,0.47,1],null,"pointer"]);
W["tab-2"] = new V(["n",0,"z",1,"a8",[0,-11]]);
W["tab-3"] = new V(["c5",1,"c7",[0,0],"a8",[0,-11]]);
W["item"] = new V(["a7",[0,8]]);
W["remove"] = new V([null,"right","x",400,null,"pointer"]);
W["select"] = new V(["c0",[null,[0,0],[0,3],[0,0],[0,3]],null,".2px solid rgb(197, 197, 197)","h",2]);
W["footer-1"] = new V(["e8",[1,76],"y",[0,4],"a4",[null,[0,0],[2,0],[0,0],[2,0]],null,".5px solid rgba(0, 0, 0, .1)",null,"none","k",null,"d","#f5f5f5"]);
W["footer-2"] = new V(["e8",[1,74],"y",[0,3],"a4",[null,[0,0],[2,0],[0,0],[2,0]],null,".5px solid rgba(0, 0, 0, .1)","k",null,"d","#f5f5f5"]);
W["circle"] = new V(["n",0,"e8",[0,18],"y",[0,18],"a7",[0,5],null,".5px solid #bddad5","h",50,"d1",2,"a3",[0,18],"x",400,"l",[0.36,0.76,0.69,1],null,"default"]);


export const tpl = (function(_cfg,it,it1){let $t, $n;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":0};$n.cd=[];$n["aH"] = 2812074640;$n["wc"]="container";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"h1","si":1};$n.cd=[];$n.cH =263007429;$n["aH"] = 1019047777;$n["wc"]="title";$t=$n;{let $p = $t;let $n = _f("todos", 4072103290, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":2};$n.cd=[];$n["aH"] = 2408077471;$n["wc"]="wrapper";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":3};$n.cd=[];$n["aH"] = 3711094086;$n["wc"]="search";if(it.items.length>0){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"sapn","si":4};$n.cd=[];$n["eS"] = 1;$n["aH"] = 450391807;{let attrvalue = "";attrvalue += "arrow ";attrvalue += it.isAllCompleted?'active':'';attrvalue += "";$n["wc"]=attrvalue;}$n["e"]["on-click"]="toggleCompleteAll";
        $n["eH"]=_j($n["eH"],3648862350);$t=$n;{let $p = $t;let $n = _f("∨", 3463083409, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"input","si":5};$n.cd=[];$n.cH =0;$n["aS"] = 2;$n["eS"] = 1;$n["aH"] = 2813661565;$n["a"]["type"] = "text";$n["wc"]="inner";{$n["s"]={"undefined":"none"};$n["sH"]=3300415009;$n["sS"]=1;}$n["a"]["placeholder"] = "有哪些事情需要做的?";$n["e"]["change"]="add";
        $n["eH"]=_j($n["eH"],2012083883);_i($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":6};$n.cd=[];$n["aH"] = 0;{let _$i = 0;
				for(let item of it.items){let index = _$i++;if(it.filter(item)){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":7};$n.cd=[];$n["aH"] = 175068531;$n["wc"]="content";$n["class"]="content";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":8};$n.cd=[];$n["eS"] = 1;$n["aH"] = 3696730281;{let attrvalue = "";attrvalue += "circle ";attrvalue += item.isCompleted?'boxcompleted':'boxactive';attrvalue += "";$n["wc"]=attrvalue;}{let attrvalue = "";attrvalue += "toggleComplete(";attrvalue += index;attrvalue += ")";$n["e"]["on-click"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(487324508, _calTextHash(attrvalue)));
}$t=$n;{let $p = $t;let $n = _f("√", 4250526368, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":9};$n.cd=[];$n["aH"] = 2255571891;{let attrvalue = "";attrvalue += item.isCompleted?'itemcompleted':'';attrvalue += "";$n["wc"]=attrvalue;}$t=$n;{let $p = $t;_addText(item.name, $p);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"t": "","a":{},"e":{},"eH":0,"tg":"span","si":10};$n.cd=[];$n["eS"] = 1;$n["aH"] = 4198300379;$n["wc"]="remove";$n["class"]="remove";{let attrvalue = "";attrvalue += "remove(";attrvalue += index;attrvalue += ")";$n["e"]["on-click"]=attrvalue;
        $n["eH"]=_j($n["eH"], _j(487324508, _calTextHash(attrvalue)));
}$t=$n;{let $p = $t;let $n = _f("×", 2269959231, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}}}_i($n);_h($n);$p["cd"].push($n);}if(it.items.length>0){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":11};$n.cd=[];$n["aH"] = 4031910890;$n["wc"]="options";let count=it.leftCount;$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":12};$n.cd=[];$n["aH"] = 0;$t=$n;{let $p = $t;_addText(count, $p);}$t=$n;{let $p = $t;let $n = _f("&nbsp;", 1553561131, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}$t=$n;{let $p = $t;_addText(count>1?'items':'item', $p);}$t=$n;{let $p = $t;let $n = _f("&nbsp;left", 3714977700, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":13};$n.cd=[];$n["aH"] = 1918322073;$n["wc"]="tab-2";$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":14};$n.cd=[];$n["eS"] = 1;$n["aH"] = 3468683403;{let attrvalue = "";attrvalue += "item ";attrvalue += it.state==='all'?'select':'';attrvalue += "";$n["wc"]=attrvalue;}$n["e"]["on-click"]="showAll";
        $n["eH"]=_j($n["eH"],2111515296);$t=$n;{let $p = $t;let $n = _f("所有", 2026241539, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":15};$n.cd=[];$n["eS"] = 1;$n["aH"] = 2857049928;{let attrvalue = "";attrvalue += "item ";attrvalue += it.state==='active'?'select':'';attrvalue += "";$n["wc"]=attrvalue;}$n["e"]["on-click"]="showActive";
        $n["eH"]=_j($n["eH"],1368369082);$t=$n;{let $p = $t;let $n = _f("还没完成", 1987459582, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":16};$n.cd=[];$n["eS"] = 1;$n["aH"] = 2442812676;{let attrvalue = "";attrvalue += "item ";attrvalue += it.state==='completed'?'select':'';attrvalue += "";$n["wc"]=attrvalue;}$n["e"]["on-click"]="showCompleted";
        $n["eH"]=_j($n["eH"],3868192291);$t=$n;{let $p = $t;let $n = _f("已完成", 2704516170, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":17};$n.cd=[];$n["aH"] = 1723282244;$n["wc"]="tab-3";if(count!==it.items.length){$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":18};$n.cd=[];$n.cH =4166466634;$n["eS"] = 1;$n["aH"] = 2881598671;$n["class"]="underline";$n["e"]["on-click"]="clearCompleted";
        $n["eH"]=_j($n["eH"],492532088);$t=$n;{let $p = $t;let $n = _f("清除已完成的选项", 837401814, $p);;
				if ($p["tg"] !== 'span') $p["cd"].push($n);}_i($n);$p["cd"].push($n);}}_i($n);_h($n);$p["cd"].push($n);}_i($n);_h($n);$p["cd"].push($n);}}_i($n);_h($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":19};$n.cd=[];$n.cH =2946814719;$n["aH"] = 854433186;$n["wc"]="footer-1";_i($n);$p["cd"].push($n);}$t=$n;{let $p = $t;let $n = {"a":{},"e":{},"eH":0,"tg":"div","si":20};$n.cd=[];$n.cH =2946814719;$n["aH"] = 1428952107;$n["wc"]="footer-2";_i($n);$p["cd"].push($n);}_i($n);_h($n);return $n;} });
