{{let flag = it.is_over}}
<div style="position:absolute;width:180px;height:44px;">
    <div w-class="text_bg" style="left:18px;top:0;">
        {{if flag == -1}}
        <div style="position:absolute;top:1px;left:25px;color:rgb(184,184,184);text-shadow: 1px 0px 0px rgb(69,73,70), -1px 0px 0px rgb(69,73,70), 0px 1px 0px rgb(69,73,70), 0px -1px 0px rgb(69,73,70);font-size:16px;font-family:mnjsh">奖励领取完毕</div>
        {{else}}
        <app-widget-text-text style="position:absolute;top:1px;left:25px">{"text":{{it.text}},"textCfg":"rebelScenetext"}</app-widget-text-text>
        
        {{end}}
    </div>
    {{let propgress = 0}}
    {{if flag == -1}}
    {{:progress = 120}}
    {{else}}
    {{:progress = it.now*120/it.aim}}
    {{:progress = (progress >= 120?120:progress)}}
    {{end}}
    <div w-class="progress_bg" style="bottom:4px;left:30px;color:#f5f5f5;">
        <div w-class="progress" style="width:{{progress}}px;top:4px;">
            <div w-class="progress_light" style="top:-2px;"></div>
        </div>
        <div w-class="figure" style="right:0px;top:-2px;"></div>
        {{if flag !== -1}}
        <div style="position:absolute;width:120px;height:18px;line-height:18px;text-align:center;font-size:12.5px;">{{it1.Common.numberCarry(parseInt(it.aim),10000)}}</div>
        {{end}}
    </div>

    {{let opened = flag == -1 ? "_gray" : "" }}
    {{let bglight = it.now >= it.aim ? 1 : 0}}
    

</div>