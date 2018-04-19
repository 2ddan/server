{{:it = it || _cfg.it }}
{{let type=(it.class=="hl"?"hl":"default") }}
<div style="width:{{it.width||55}}px;height:{{it.height||52}}px;" >
    <filter$$ style="position:absolute;left:0;top:0;width:100%;height:100%;">{"url":"app_a/widget/btn/images/sq_{{type}}.png","filter":{{it.class=="hl"?"default":it.class}} }</filter$$>
    <div style="position:absolute;width:100%;height:100%;font-family:'mnjsh';display:flex;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;color:{{it.color||'#fdedd7'}};">
        {{for i,v of (""+(it.text||"")).split("") }}
            {{if !it.textCfg}}
                <span style="font-size:{{it.fontsize||16}}px;{{if v==' '}}width:4px{{end}};height:{{it.fontsize||16}}px;line-height:{{it.fontsize||16}}px;">{{v}}</span>
            {{else}}
                <app_a-widget-text-text style="display:inline-block;pointer-events:none;position: relative;">
                 {"text":{{v}},"textCfg":{{it.textCfg || "singleTitle"}},"fontSize":{{it.fontSize || 0}},"space":{{it.space || -2}} }
                </app_a-widget-text-text>
            {{end}}
        {{end}}
    </div>
</div>