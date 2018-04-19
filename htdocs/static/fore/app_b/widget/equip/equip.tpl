<div w-class="tab" style="padding-left: 4px;">
{{let layout = it.scoring?"tab-c":""}}
    <div w-class={{layout}}>
        <app-widget-prop-base_prop-base_prop style="position:relative;width:65px;height:65px;">{"prop":{{it.prop}},"url":{{it.url}}}</app-widget-prop-base_prop-base_prop>
    </div>
    <div w-class="{{layout}}">
        <div style="width:77px;min-width:77px;height:20px;background-image:url(app_c/equip_fb/image/equip_name_box.png);background-size:100% 100%;text-align:center">
            <app-widget-text-text>
            {"textCfg":"4","fontSize":12,"text":{{it.prop.name[it.prop.career_id.indexOf(it.UID)]}} }
            </app-widget-text-text>
        </div>
        {{if it.scoring}}
        <div style="white-space:nowrap;height: 20px;margin-left: -3px;">
            <app-widget-text-text style="vertical-align:middle;">{"text":"评分","textCfg":"wildPower","fontSize":14}</app-widget-text-text>
            <app-widget-text-text style="vertical-align:middle;white-space: nowrap;position:relative;top: 3px;">{"text":"{{it.prop.grade}}","textCfg":"powerNum","fontSize":14}</app-widget-text-text>
        </div>
        {{end}}

        <div style="font-size:{{it.fontSize?it.fontSize:12}}px;color:#73ff0c">
            {{"LV."+it.prop.level}}
        </div>
    </div>
</div>
                    