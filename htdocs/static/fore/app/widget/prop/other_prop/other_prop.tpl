{{let Common = _get("app/mod/common").exports.Common}}
<div style="font-size: {{it.fontSize || 15}}px;">
    <app-widget-prop-base_prop-base_prop style="width:100%;height:100%;pointer-events:none;position:relative" >
        {"prop":{{it.prop}},"url":{{it.url}},"color":{{it.color?it.color:0}},"isGray":{{it.isGray?it.isGray:0}},"level":{{it.level?1:0}} }
    </app-widget-prop-base_prop-base_prop>
    {{if it.name}}
    <div style="position:relative;top:0px;left:50%;margin-left:-35px;top:2px;width:70px;text-align: center;pointer-events: none;font-size:{{it.fontSize || 14}}px">
        {{it.prop.name}}
    </div>
    {{end}}
    <div style="width:100%;height:100%px;height:20px;line-height:20px;position:absolute;bottom:0;left:0px;pointer-events: none;z-index: 4;">
        {{if it.cost_count >=0}}
        {{let text = it.count>=it.cost_count?"rgb(99, 219, 81)":"rgb(255, 18, 57)"}}
        <a style="text-align: center;color:{{text}};position:absolute;right:-30px;left:-30px;bottom:0px;font-size:{{it.fontSize || 15}}px">{{Common.numberCarry(parseInt(it.count),10000)}}/{{it.cost_count}}</a>
        {{elseif it.count>=0}}
        <div class="shadow" style="right:3px;position:absolute;color:#fff;font-size:{{it.fontSize || 15}}px;display:inline-block;">{{Common.numberCarry(parseInt(it.count),10000)}}</div>
        {{end}}
    </div> 
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-btn-tips style="right:0;top:0;">
        {"tip_keys":{{it.tip_keys}}}
    </app-widget-btn-tips>
    {{end}}
</div>