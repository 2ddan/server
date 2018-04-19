{{:it = it||_cfg.it}}

<div style="padding:0 {{it.padding}}px">
    <img style="position:absolute;top:50%;left:0;transform:translate(-99%,-50%);pointer-events:none;" width="{{it.width}}px" src="./image/title_single_{{it.type||1}}.png" />
    <img style="position:absolute;top:50%;right:0;transform:scaleX(-1) translate(-99%,-50%);pointer-events:none;" width="{{it.width}}px" src="./image/title_single_{{it.type||1}}.png" />
    {{if !it.wear}}
    <app_a-widget-text-text style="display:inline-block;pointer-events:none;position: relative;vertical-align: middle;">
        {"text":{{it.text}},"textCfg":{{it.textCfg || "singleTitle"}},"fontSize":{{it.fontSize || 0}},"space":{{it.space || -2}} }
    </app_a-widget-text-text>
    {{else}}
    <div {{if !it.class}}class="shadow6"{{end}} style="width:100%;height:100%;text-align:center;color:{{it.color || '#b27d5c'}};font-size:{{it.fontSize || 19}}px;line-height:100%;font-family:mnjsh;display:inline-block;position: relative;pointer-events:none;">
        {{it.text}}
    </div>
    {{end}}
</div>