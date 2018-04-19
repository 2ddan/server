<div class="guide_plot" style="position:absolute;left: 0px;top: 0px;">
{{let root = _get("pi/ui/root").exports}}

<div style="position: absolute;top:-1px;left:-1px;width:{{root.getWidth()+2}}px;height:{{root.getHeight()+2}}px;visibility:{{it?'visible':'hidden'}};pointer-events:{{it?'all':'none'}};background-color:#000;" >
    <div on-tap='go_next' style="position:absolute;width:100%;height:100px;top:50%;margin-top:-50px;line-height:40px;text-align:center;font-size:24px;color:#fff;">
    {{if it.list[it.cur].first_text}}
    <div>{{it.list[it.cur].first_text.substring(0,15)}}</div>
    <div>{{it.list[it.cur].first_text.substring(15,33)}}</div>
    <div>{{it.list[it.cur].first_text.substring(33)}}</div>
    {{end}}
    </div>
</div>

</div>
