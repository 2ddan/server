{{let Common = _get("app/mod/common").exports.Common}}
<div>
    <app-widget-prop-base_prop-base_prop style="pointer-events:none;position:relative;width:100%;height:100%">
        {"isGray":{{!!it.isGray}},"prop":{{it.prop}},"url":{{it.url}},"color":"{{it.color?it.color:0}}","level":{{it.prop.level?it.prop.level:1}}}
    </app-widget-prop-base_prop-base_prop>
    {{if it.isHaveCost || it.name || it.prop.name}}
    <div  style="position:relative;left:50%;margin-left:-35px;top:3px;width:70px;text-align: center;pointer-events: none;font-size:14px;line-height:14px;">
        {{if it.isHaveCost}}
        <div style="position: absolute;top: -20px">
            <span class="gold_icon" style="left: 15px;height: 30px;width: 30px;top: 5px;"></span>
            <span style="line-height:38px;margin-left: 50px">{{it.arena_score}}</span>
        </div>
        {{else}}
        <div style="width:100%;font-size:12px;line-height:12px;color:rgb(255,255,255);">
            {{it.name || it.prop.name}}
        </div>
        {{end}}
    </div> 
    {{end}}

    {{% 物品数量显示}}
    {{if it.prop.count>0 || it.count}}
    <div style="position:absolute;right:3px;bottom:2px;pointer-events: none;max-width:52px;overflow:hidden;z-index:3;font-size:12px;color:rgb(255,255,255)">
        {{Common.numberCarry(parseInt(it.count),10000) || Common.numberCarry(parseInt(it.prop.count),10000)}}
    </div>
    {{end}}
</div>