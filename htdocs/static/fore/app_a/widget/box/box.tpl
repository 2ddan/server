{{:it = it||_cfg.it}}

<div style="width:{{it.width || 80}}px;height:{{it.height || 80}}px;position:absolute;">
    {{if it.bglight}}
    <img class="center_hv" src="./images/aniam.png" style="height:140%;" />
    {{end}}

    {{if it.state}}
    <img class="center_hv" style="position:absolute;z-index:2;width:90%;height:90%" src="./images/treasure_{{it.type}}_{{it.state}}.png" />
    {{else}}
    <img class="center_hv" style="position:absolute;z-index:2;width:90%;height:90%" src="./images/treasure_{{it.type}}.png" />
    {{end}}
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:5px;top:3px;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
</div>