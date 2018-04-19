{{let Common = _get("app/mod/common").exports.Common}}
<div style="position:absolute">
    <img src="./images/power_{{it.type ? it.type : ''}}.png"/>
    <app-widget-text-text style="position: absolute;top: {{it.top || 55}}px;left: 132px;line-height: 25px;height: 25px">
        {"text":"{{Common.numberCarry(parseInt(it.power || 0),1000000)}}","textCfg":{{it.textCfg || "powerNum"}},"fontSize":{{it.fontSize || 26}}}
    </app-widget-text-text>
</div>