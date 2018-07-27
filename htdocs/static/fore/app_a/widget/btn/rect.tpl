{{:it = it || _cfg.it }}
{{let style = it.class}}
{{let shadow = it.class == "disabled" ? "shadow5" : "shadow4"}}
<div style="width:{{it.width||116}}px;height:{{it.height||45}}px;">
    {{if style != "disabled"}}
    <img src="app_a/widget/btn/images/rect_{{style}}.png" style="position:absolute;left:0;top:0;width:100%;height:100%;" />
    {{else}}
    <filter$$ style="position:absolute;left:0;top:0;width:100%;height:100%;">{"url":"app_a/widget/btn/images/rect_default.png","filter":{{it.class||"default"}} }</filter$$>
    {{end}}
    <div style="position:absolute;width:100%;height:100%;font-family:'mnjsh';display:flex;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;color:{{it.color||'#ffffff'}};margin-left:{{it.marginLeft || 0}}px">
        {{for i,v of (""+(it.text||"")).split("") }}
        <span class={{it.no_shadow?'':shadow}} style="font-size:{{it.fontsize || 24}}px;{{if v==' '}}width:4px{{end}};height:{{it.fontsize|| 24}}px;line-height:{{it.fontsize || 24}}px">{{v}}</span>
        {{end}}
    </div>
    {{if it.show_anim}}
    <div class="petBtnAnim" style="position: absolute;transform: scale(0.8);left: 50%;margin-left: -85px;top:-61px;pointer-events: none;"></div>
    {{end}}
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:0;top:0;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
    {{if it.guide}}
    <app_a-widget-guide-guide>
        {{it.guide}}
    </app_a-widget-guide-guide>
    {{else}}
    <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    {{end}}
    
</div>