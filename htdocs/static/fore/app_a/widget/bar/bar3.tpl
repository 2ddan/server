{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div>
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_bg_3_left.png"/>
    <img style="position:absolute;right:0;z-index:1" src="./images/bar_bg_3_right.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - 29px);height: 17px;background-repeat: repeat-x;left: 14px;" src="./images/bar_bg_3_middle.png"/>
    <img style="position:absolute;left:0;z-index:2;transform: scale(-1);" src="./images/bar_head_3.png"/>
    <img style="position:absolute;right:0;filter: fliph;z-index:2;" src="./images/bar_head_3.png"/>
    <div style="position:absolute;width:100%;height:100%;text-align:center;color:rgb(255,255,255);font-size:{{it.fontSize || 14}}px;line-height:{{it.lineHeight?it.lineHeight:26}}px;z-index: 2;">{{it.text||""}}</div>
    <div style="position:absolute;width: calc({{it.progress}}% - 2px);height:14px;top:1px;left:2px;overflow:hidden;z-index: 1;">
        <img style="position:absolute;right:0px;top: 2px;z-index: 1;" src="./images/bar_light_3.png"/>
        <div style="width:{{it.width-4}}px;height:100%;position:absolute;left:0px;top:0px;">
            <img style="position:absolute;left:0;top:2px" src="./images/bar_fg_3_left.png"/>
            <img style="position:absolute;right:-8px;top:2px" src="./images/bar_fg_3_right.png"/>
            <div style="position:absolute;left:10px;right:-2px;height:10px;">
                <img style="position:absolute;top:2px;width:100%;height:10px;left:-1px" src="./images/bar_fg_3_middle.png"/>
            </div>
        </div>
    </div>
</div>