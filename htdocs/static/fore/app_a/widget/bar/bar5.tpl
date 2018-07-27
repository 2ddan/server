{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div>
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_bg_5_left.png"/>
    <img style="position:absolute;right:0;z-index:1" src="./images/bar_bg_5_right.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - 20px);height: 22px;background-repeat: repeat-x;left: 11px;" src="./images/bar_bg_5_middle.png"/>
    <div style="position:absolute;width:100%;height:100%;text-align:center;color:rgb(255,255,255);font-size:{{it.fontSize || 18}}px;line-height:{{it.lineHeight || 22}}px;z-index: 2;">{{it.text||""}}</div>
    <div style="position:absolute;border-radius: 5px;width: calc({{it.progress}}% - 5px);height:18px;top:1px;left:2px;overflow:hidden;z-index: 1;">
        <img style="position:absolute;right:0px;top: 1px;z-index: 1;" src="./images/bar_light_5.png"/>
        <div style="width:{{it.width-5}}px;height:100%;position:absolute;left:0px;top:0px;">
            <img style="position:absolute;left:1px;top:1px" src="./images/bar_fg_5_left.png"/>
            <img style="position:absolute;right:-8px;top:1px" src="./images/bar_fg_5_right.png"/>
            <div style="position:absolute;left:10px;right:-2px;height:18px;">
                <img style="position:absolute;top:1px;width:100%;height:18px;left:-1px" src="./images/bar_fg_5_middle.png"/>
            </div>
        </div>
    </div>
    
</div>
