{{:it = it||_cfg.it }}
{{let Common = _get("app/mod/common").exports.Common}}
<div style="position:absolute">
    <img src="./images/power_{{it.type ? it.type : 0}}.png"/>
    <app_a-widget-text-text style="position: absolute;top: {{it.top || 55}}px;left: {{it.left || 132}}px;line-height: 25px;height: 25px;white-space: nowrap;">
        {"text":"{{Common.numberCarry(parseInt(it.power || 0),1000000)}}","textCfg":{{it.textCfg || "powerNum"}},"fontSize":{{it.fontSize || 26}}}
    </app_a-widget-text-text>
</div>