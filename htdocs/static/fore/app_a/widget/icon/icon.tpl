{{:it = it||_cfg.it}}
<div on-tap="{{if !it.guide}}tap{{end}}" style="position:relative;display: inline-block;width:{{ it && it.width || 60}}px;height:{{it && it.height || 60}}px;">
    <filter$$ class="center_hv" style="width:100%;position:absolute;z-index:1">{"url":"app_a/widget/icon/images/{{it.icon}}.png","filter":{{it.isGray ? "disabled" : "default"}} }</filter$$>
    
    {{if it.text}}
    <div w-class={{"icon_bg_"+it.bg}} class="center_h"></div>
    {{let cfg = {"text":it.text,"space":it.space || 0 } }}  
    {{if it.fontSize}}
    {{: cfg.fontSize = it.fontSize}}
    {{end}}
    {{if it.isGray}} 
        {{: cfg.textCfg = "iconGray"}}
    {{else}}
        {{: cfg.textCfg = it.textCfg ||'iconCircle'}}
    {{end}}  
    <app-widget-text-text class="center_h" style="position: absolute;display:inline-block;bottom:{{it.bottom || 0}}px;z-index:1;">{{cfg}}</app-widget-text-text>
    {{end}}
    
</div>