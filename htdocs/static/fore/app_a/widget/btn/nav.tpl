{{:it = it || _cfg.it }}

<div style="width:{{it.width||110}}px;height:{{it.height||40}}px;" >
    <img src="app_a/widget/btn/images/{{it.class=='hl'?'nav':'rect'}}.png" style="position:absolute;left:0;top:0;width:100%;height:100%;"/>
    <img src="app_a/widget/btn/images/{{it.class=='hl'?'nav':'rect'}}_bg.png" style="position:absolute;top:0;left:50%;margin-left:-62px;"/>
    <div style="position:absolute;width:100%;height:100%;font-family:'mnjsh';display:flex;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;color:{{it.color||'#fdedd7'}};">
        {{for i,v of (""+(it.text||"")).split("") }}
        <span style="font-size:{{it.fontsize||16}}px;{{if v==' '}}width:4px{{end}};height:{{it.fontsize||16}}px;line-height:{{it.fontsize||16}}px">{{v}}</span>
        {{end}}
    </div>
</div>