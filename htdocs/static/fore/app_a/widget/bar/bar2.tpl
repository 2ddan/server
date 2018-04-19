{{:it = it||_cfg.it}}

{{if it.progress > 100}}
{{:it.progress = 100}}
{{end}}

<div>
    <img style="position:absolute;left:0;z-index:1" src="./images/bar_bg_left_0.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - 20px);height: 18px;background-repeat: repeat-x;left: 10px;z-index: 1;" src="./images/bar_bg_middle_0.png"/>
    <img style="position:absolute;right:0;z-index:1" src="./images/bar_bg_right_0.png"/>
    <div style="width:100%;height:100%;position:absolute;left:0px;z-index:3">
        {{if it.split}}
        {{for k,v of it.split}}
        <img style="position:absolute;top:0;left:{{v}}%;margin-left:-7px" src="./images/bar_point.png" />
        {{end}}
        {{end}}
    </div>
    <div style="position:absolute;width:100%;height:70%;text-align:center;color:rgb(255,255,255);font-size:{{it.fontSize || 14}}px;line-height:{{it.lineHeight?it.lineHeight:18}}px;z-index: 3;">
        {{it.text||""}}
    </div>
    <div style="position:absolute;width:100%;height:14px;top:1px;left:0;padding:0 6px;box-sizing: border-box;">
        <div style="position:relative;width: {{it.progress}}%;height:100%;overflow:hidden;z-index: 1;transform:skewX(-28deg);">
            <img style="position:absolute;right:-2px;top: 2px;transform:skewX(28deg);z-index: 1;display:none" src="./images/bar_light_0.png"/>
            <div style="height:100%;position:absolute;left:-3px;top:0px;width: 100%;transform:skewX(28deg)">
                <img style="position:absolute;left:0;top:2px;" src="./images/bar_fg_left_0.png"/>
                <img style="position:absolute;right:-5px;top:2px;" src="./images/bar_fg_right_0.png"/>
                <div style="position:absolute;left:10px;right:3px;height:13px;">
                    <img style="position:absolute;top:2px;width:100%;height:13px;left:-1px" src="./images/bar_fg_middle_0.png"/>
                </div>
            </div>
            {{if it.anima}}
            <div class="bar_ing" style="transform:skewX(28deg);top: 50%;position: absolute;left: 50%;margin-left: -202px;margin-top: -15px;"></div>
            {{if it.progress>=100}}
            <div class="bar_end" style="transform:skewX(28deg);top: 50%; position: absolute;left: 50%; margin-left: -211px;margin-top: -20px;"></div>
            {{end}}
            {{end}}
        </div>
    </div>
</div>
