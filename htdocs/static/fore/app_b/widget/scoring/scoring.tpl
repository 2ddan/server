{{let Common = _get("app/mod/common").exports.Common}}
{{let scale = (it.fontSize || 16)/24}}
<div style="position:relative;margin-left:14px;white-space:nowrap;transform:scale({{scale}},{{scale}}">
    <app-widget-text-text style="vertical-align:middle">{"text":"战","textCfg":"wildPower","fontSize":28}</app-widget-text-text>
    <app-widget-text-text style="vertical-align:middle;margin-left:-8px;">{"text":"斗力","textCfg":"wildPower"}</app-widget-text-text>
    <app-widget-text-text style="vertical-align:middle;white-space: nowrap;position:relative;top: 6px;padding-right: 20px;">{"text":"{{Common.numberCarry(parseInt(it.num || 0),1000000)}}","textCfg":"powerNum"}</app-widget-text-text>
</div>
