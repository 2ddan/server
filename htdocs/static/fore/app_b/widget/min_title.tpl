<div w-class="tab" style="{{it.title?'margin-top:-9px':''}}">
    {{if it.title}}
        <div w-class="tab-c"><p class="popups_head" w-class="rotatRight"><i></i></p></div>
        <div w-class="tab-c" style="width:{{it.titleWidth||auto}}px;">
            <span style="margin:0 -15px;color:rgb(232,223,178);font-weight:bold;">
            {{if it.textType=="img"}}
            <img src="./title/text/{{it.title}}.png"/>
            {{else}}
                {{it.title}}
            {{end}}
            </span>
        </div>
    {{end}}
    <div w-class="tab-c"><p class="popups_head"><i></i></p></div>
</div>