{{let root = _get("pi/ui/root").exports}}
{{let top = root.getHeight() -440}}
<div style="position: absolute;width:181px;height:201px;left:50%;margin-left:-90px;z-index:1;top:{{top}}px;opacity:1;{{if it1.close}}transition:opacity 0.7s;opacity:0;{{end}}">
    <img style="vertical-align:middle;" src="../image/overstep_main.png" />
    <img style="position: absolute;z-index:2;left:0;top:-28px;" src="../image/overstep_title.png"/>
    <img style="position: absolute;z-index:2;left: 59.5px;bottom: 4px;" src="../image/overstep_bottom.png"/>
    {{let text = it1.text}}
    {{let color = "#ff3d05"}}

    {{if text > 33 && text <= 66}}
    {{:color = "#ffd513"}}
    {{elseif text > 66}}
    {{:color = "#59ff06"}}
    {{end}}

    {{let rotate_left =  text*3.6}}
    {{let rotate_right =  0}}
    {{if text >= 45}}
    {{:rotate_right =  (text - 50)*3.6}}
    {{end}}
    <div style="position: absolute;top:31px;left:21px;overflow:hidden;width:140px;height:140px;">
        <div style="position: absolute;top:0;left:0;width:70px;height:140px;overflow:hidden">
            <div style="transform:rotate({{rotate_left}}deg);transform-origin: right center;width:100%;height:100%;{{if rotate_left >= 180}}display:none{{end}}">
                <img style="position: absolute;top:0;left:0;transform:rotate(-180deg)" src="../image/overstep_cir.png" />
            </div>
        </div>
        <div style="position: absolute;top:-2px;right:0;width:71px;height:140px;overflow:hidden">
            <img style="width:100%;transform-origin: left center;transform:rotate({{rotate_right || -1}}deg)" src="../image/overstep_cir.png" />
        </div>
    </div>
    <div style="position: absolute;top: 0;left: 0;width:100%;text-align:center;font-size:50px;line-height:205px;height:201px;font-family:mnjsh;color:{{color}}">
        <app_a-widget-text-text  style="position: absolute;top:47px;left:54px;">
            {"text":"已超越","textCfg":"funDesc","fontSize":14,"space":-2}
        </app_a-widget-text-text>

        {{text}}<span style="font-size:27px;">%</span>

        <app_a-widget-text-text  style="position: absolute;bottom:55px;right:46px;">
            {"text":"的玩家","textCfg":"funDesc","fontSize":14,"space":-2}
        </app_a-widget-text-text>
    </div>
</div>