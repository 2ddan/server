{{let quality_m = it.prop.quality}}
{{if quality_m[1]}}
{{: quality_m = quality_m[1]}}
{{end}}


{{let Common = _get("app/mod/common").exports.Common}}
<div>
    {{if it.type}}
    <app-widget-image-quality style="width:100%;height:100%;background-size: 100% 100%;position:absolute;left: 0;">
        {"url":"app/widget/prop/base_prop/images/quality_1.png","quality":{{quality_m}}}
    </app-widget-image-quality>
    {{else}}
    <img src="app/widget/prop/base_prop/images/quality_2.png" style="width:100%;height:100%;background-size: 100% 100%;position:absolute;left: 0;"/> 
    {{end}}

    
    {{if quality_m === 6}}
    <div style="position:absolute;width:100%;height:100%;background-size: 100% 100%;z-index:2;left: 0;background-image:url(app/widget/prop/base_prop/images/red_equip_box.png);" >
    </div>   
    {{else}}
    <app-widget-image-quality style="position:absolute;width:100%;height:100%;background-size: 100% 100%;z-index:3;left: 0;" >
        {"url":"app/widget/prop/base_prop/images/goods_boer.png","quality":{{quality_m}} }
    </app-widget-image-quality>
    {{end}}

    {{% 图片}}
    <app-widget-image-quality style="width:96%;height:96%;position:absolute;pointer-events: none;z-index:2;left: 2%;top:2%;" >
        {"url":{{it.url}},"isGray":{{it.isGray||0}} }
    </app-widget-image-quality>

    {{% 装备等级显示}}
    {{if it.prop.level-0>=0 && it.level}}
    <div w-class="font_light_white">Lv{{it.level || it.level == 0 ? it.level : it.prop.level }}</div>
    {{end}}
</div>