<div style="width:166px;height:47px;line-height:47px;position:relative;font-size:19px;">
    <widget w-tag="app_a-widget-bg_frame-bg">
        {"bgName":"bg_frame51"} 
    </widget>
    <img style="position: relative;left: 5px;vertical-align: middle;width:40px;" src="app_b/widget/icons/card_icon{{it.type}}.png" />
    <div style="position: absolute;left: 47px;top: 0px;">
        {{if it.add}}
        <span class="shadow7" style="color:#78f300;">收益+{{it.add*100+"%"}}</span>
        {{else}}
        <span style="color:#b9b9b9;">未激活</span>
        {{end}}
    </div>
   {{if 0 }}
   <div data-desc="动画" style="position: absolute;top:0;left:0;">
        <img style="opacity: 1;animation: opacityAnim 2000ms infinite;position: absolute;top: -7px;left: -8px;" src="../image/card_active.png"/>
    </div>
   {{end}}
   
</div>