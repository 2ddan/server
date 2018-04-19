{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div style="width:366px;height:29px;position:absolute;">
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_head_1.png"/>
    <img style="position:absolute;right:0;transform:scaleX(-1);filter: fliph;z-index:1" src="./images/bar_head_1.png"/>
    <div style="position:absolute;left:15px;right:15px;height:15px;top:7px;border-radius: 3px;">
        <img style="position:absolute;top:0px;width:100%;height:15px;border-radius: 3px;" src="./images/bar_bg_0.png"/>
        <div w-class="bar_fg_0" style="position:absolute;width:{{it.progress}}%;background-image: url(app/widget/bar/images/bar_fg_0.png)">
            <img style="position:absolute;right:-20px;top:-18px;" src="./images/bar_light_1.png"/>
        </div>
        <div style="position:absolute;width:100%;height:100%;text-align:center;color:rgb(255,255,255);font-size:{{it.fontSize || 14}}px;line-height:{{it.lineHeight || 14}}px;z-index:1">{{it.text||""}}</div>
    </div>
</div>

