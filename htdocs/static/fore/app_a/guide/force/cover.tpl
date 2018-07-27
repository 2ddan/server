<div style="position:absolute;left:0;top:0;width:100%;height:100%;">

    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let guide = appCfg.guide}}
    {{let curr = guide.curr}}
    {{let start = guide.start}}
    {{if (curr==12)|| curr && start}}
    <div w-class="guide_bg" style="width:{{it.w}}px;height:{{it.h}}px;left:{{it.x}}px;top: {{it.y}}px;"></div>
    <div data-desc="上" w-class = "outer_cover" style="top:0px;height: {{it.y+1}}px;width: {{it.gw}}px;z-index:11;"></div>
    <div data-desc="左" w-class = "outer_cover" style="top: {{it.y+1}}px; left:0px;height:{{it.h - 2}}px;width: {{it.x+1}}px;z-index:11;"></div>
    <div data-desc="右" w-class = "outer_cover" style="top: {{it.y+1}}px; left: {{it.x+it.w - 1}}px;height:{{it.h-2}}px;width: {{it.gw - it.x - it.w+1}}px;z-index:11;"></div>
    <div data-desc="下" w-class = "outer_cover" style="top: {{it.y+it.h - 1}}px;width: {{it.gw}}px;left: 0px;height:{{it.gh - it.y - it.h+1}}px;z-index:11;"></div>
    {{end}}

    <div data-desc="手" w-class="hand" style="width:80px;animation: guide_hand 0.8s infinite;left:{{it.x+it.w/2-15}}px;top: {{it.y+it.h/2-20}}px;z-index: 11"></div>
    <div data-desc="圈" w-class="halo" style="left:{{it.x+it.w/2-53}}px;top: {{it.y+it.h/2-68}}px;">
        <img style="animation: guide_halo 0.8s infinite;left:50%;top: 50%;margin-left:-50%;margin-top:-50%;position:absolute;" src="../images/halo.png" />        
    </div>
    
</div>