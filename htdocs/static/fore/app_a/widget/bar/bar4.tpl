{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div>
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_bg_4_left.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - 20px);background-repeat: repeat-x;left: 10px;z-index: 1;height: 16px;" src="./images/bar_bg_4_middle.png"/>
    <img style="position:absolute;right:0;z-index:1" src="./images/bar_bg_4_right.png"/>
    <div style="position:absolute;width:100%;height:70%;text-align:center;color:{{it.color || '#fff'}};font-size:{{it.fontSize || 16}}px;line-height:{{it.lineHeight || 14}}px;z-index: 3;white-space:nowrap">
        {{if it.textCfg}}
        <app_a-widget-text-text style="position:absolute;left:{{it.left || 133}}px;right:0px;margin:0 auto;top:{{it.top || -2 }}px">
            {"text":{{it.text}},"textCfg":{{it.textCfg || ''}},"space":{{it.space || 0}},"fontSize":{{it.fontSize || 16}}}
        </app_a-widget-text-text>
        {{else}}
        {{it.text||""}}        
        {{end}}
    </div>
    <div style="position:absolute;width: calc({{it.progress}}% - 3px);height:14px;top:0;left:2px;overflow:hidden;z-index: 1;">
        <img style="position:absolute;right:0px;top: 2px;z-index: 1;" src="./images/bar_light_4.png"/>
        <div style="width:{{it.width-4}}px;height:100%;position:absolute;left:0px;top:0px;">
            <img style="position:absolute;left:0;top:2px" src="./images/bar_fg_4.png"/>
            <img style="position:absolute;right:0px;top:2px" src="./images/bar_fg_4.png"/>
            <div style="position:absolute;left:7px;right:7px;height:12px;">
                <img style="position:absolute;top:2px;width:100%;height:12px;left:-1px" src="./images/bar_fg_4.png"/>
            </div>
        </div>
    </div>
    
</div>
