{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div>
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_bg_2_left.png"/>
    <img style="position:absolute;right:0;z-index:1" src="./images/bar_bg_2_right.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - 48px);height: 19px;background-repeat: repeat-x;left: 24px;" src="./images/bar_bg_2_middle.png"/>
    <div style="position:absolute;width:100%;height:100%;text-align:center;color:rgb(255,255,255);font-size:{{it.fontSize || 14}}px;line-height:{{it.lineHeight?it.lineHeight:18}}px;z-index: 2;">{{it.text||""}}</div>
    <div style="position:absolute;width: calc({{it.progress}}% - 2px);height:15px;top:1px;left:2px;overflow:hidden;z-index: 1;">
        <img style="position:absolute;right:0px;top: 2px;z-index: 1;" src="./images/bar_light_2.png"/>
        <div style="width:{{it.width-4}}px;height:100%;position:absolute;left:0px;top:0px;">
            <img style="position:absolute;left:0;top:0px" src="./images/bar_fg_2_left.png"/>
            <img style="position:absolute;right:0px;top:0px" src="./images/bar_fg_2_right.png"/>
            <div style="position:absolute;left:10px;right:18px;height:15px;">
                <img style="position:absolute;top:-1px;width:100%;height:17px;left:4px" src="./images/bar_fg_2_middle.png"/>
            </div>
        </div>
    </div>
</div>