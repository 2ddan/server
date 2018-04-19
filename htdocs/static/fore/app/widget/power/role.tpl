{{% 角色/伙伴信息}}
<div style="position: absolute;top:0px;left: 50%;margin-left:-94px;height:60px">
    <div w-class="name_bg" style="position:relative;top:2px;left:27px;height:21px;line-height:21px;font-size:16px;">{{it.name}}<a>(突破+{{it["break"]}})</a></div> 
    <app-widget-power-power style="position:absolute;top:3px;">
        {"power":"{{it.power}}","textCfg":"power1"}
    </app-widget-power-power>
    <app-widget-other-star-star style="top:45px;left:60px;height:15px;width:85px">
        {"total":{{it.total || 5}},"count":{{it.count|| 0 }},"split":2}
    </app-widget-other-star-star>
</div>