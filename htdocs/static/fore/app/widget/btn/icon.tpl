
<div on-tap="{{if !it.guide}}tap{{end}}">
    <app-widget-image-quality class="center_hv" style="width:100%;position:absolute;z-index:1">
        {"isGray":{{it.isGray||0}},"icon":{{it.icon}} }
    </app-widget-image-quality>
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
    
        <app-widget-text-text style="position: absolute;display:inline-block;bottom:{{it.bottom || 0}}px;z-index:1;left: 50%;transform: translateX(-50%);">{{cfg}}</app-widget-text-text>

    {{end}}
</div>