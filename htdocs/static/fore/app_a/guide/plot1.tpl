<div class="guide_plot" style="position:absolute;left: 0px;top: 0px;">
{{let root = _get("pi/ui/root").exports}}

<div style="position: absolute;top:-1px;left:-1px;width:{{root.getWidth()+2}}px;height:{{root.getHeight()+2}}px;visibility:{{it?'visible':'hidden'}};pointer-events:{{it?'all':'none'}};background-color:rgba(0,0,0,.2);" >
    <div style="position:absolute;width:100%;height:auto;bottom:0;" on-tap='go_next'>
    {{let x = 0}}
    {{while x <= it.cur}}
        <div style="width:100%;height:100px;background-color:rgba(0,0,0,.5);color:#fff;">
            {{if it.list[x]}}{{it.list[x].first_text}}{{end}}
        </div>   
        {{: x = x+1}}
    {{end}}
</div>
</div>

</div>
