<div class="guide_plot" style="position:absolute;left: 0px;top: 0px;">
{{let root = _get("pi/ui/root").exports}}

<div style="position: absolute;top:-1px;left:-1px;width:{{root.getWidth()+2}}px;height:{{root.getHeight()+2}}px;visibility:{{it?'visible':'hidden'}};pointer-events:{{it?'all':'none'}};" >
    <div on-tap='go_next' style="position:absolute;width:100%;height:100%;bottom:0;color:#fff;">
        <div style="position:absolute;left:0;bottom:0;width:100%;height:120px;z-index:1;background-color:#01011a;">
            <div w-class="plot_bg" style="position:absolute;left:0;bottom:119px;"></div>
        </div>
        
        <div style="position: absolute;width: 420px;height:auto;left:50%;margin-left:-210px;bottom: 0px;z-index:2;">
            <div w-class="cloud" style="position:absolute;z-index:0;left:60px;top:0;"></div>
            <app-widget-bg-level style="z-index:-1;">{"top_line":1}</app-widget-bg-level>
            <div class="{{it.list[it.cur].head}} {{it.list[it.cur].head == 'npc_shangcheng' ? ' base_mirror_r':''}}" style="transform: rotateY(180deg);bottom: 0px;right:-30px;width:148px;height:214px;background-size: contain;background-repeat:no-repeat;background-position:center bottom;z-index:2;"></div>
            <div class="tower_text_bg" style="position:absolute;width:127px;right:80px;top:8px;height:18px;line-height:18px;text-align:center;font-size:16px;color:#e3d8bb;z-index:3;">{{it.list[it.cur].name}}</div>
            <div style="margin-left:60px;padding:30px 0;width:240px;height:72px;color: #f7ebd5;font-size: 14px;line-height:24px;z-index:3;">{{it.list[it.cur].first_text}}</div>
        </div>

    </div>
</div>

</div>
