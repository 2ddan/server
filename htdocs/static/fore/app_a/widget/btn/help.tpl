{{:it = it || _cfg.it }}

<div style="width:{{it.width||82}}px;height:{{it.height||24}}px;" >
    <img src="app_a/widget/btn/images/help_2.png"  style="position:absolute;left:0;top:0;width:100%;height:100%;" />
    <div style="position:absolute;width:100%;height:100%;font-family:'mnjsh';display:flex;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;color:{{it.color||'#fdedd7'}};">
        {{for i,v of (""+(it.text||"")).split("") }}
        <span style="font-size:{{it.fontSize||16}}px;{{if v==' '}}width:4px{{end}};height:{{it.fontSize||16}}px;line-height:{{it.fontSize||16}}px">{{v}}</span>
        {{end}}
    </div>
</div>