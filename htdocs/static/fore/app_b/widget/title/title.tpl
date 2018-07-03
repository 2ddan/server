{{:it = it||_cfg.it}}

{{let common = _get("app/mod/common").exports.Common}}
<div style="font-family:'黑体';width:{{it.width ? it.width + 'px' : '100%'}}">

    <div style="height:98px;position:absolute;left:0px;width:100%;pointer-events: none;">
        <div w-class="title_left" style="position:absolute;left:0px;top:0px;"></div>
        <div w-class="title_middle" style="position:absolute;left:264px;right:0px;top:0px;background-repeat:repeat-x;"></div>
        <div w-class="title_right" style="position:absolute;right:0px;top:0px;"></div>
    </div>

    <app_a-widget-text-text style="position:absolute;left:{{it.left || '30'}}px;top:{{it.top || 0}}px;display:inline-block;">
        {"text":{{it.text}},"textCfg":"gangCoverTitle","fontSize":30}
    </app_a-widget-text-text>

    <div on-tap="gotoBug(0)" class="resource_bar" style="left: 173px;top: 6px;font-size:16px;line-height:24px;z-index:2;width:96px">
        <widget w-tag="app_a-widget-coin-coin" style="left: 5px;top: 2px;color: #e3d8bb;">
			{"icon":"money", "text":[{{common.numberCarry(parseInt(it.r[0][1] || 0),10000)}}]} 
		</widget>
        <div  class="add_btn" style="right: -13px;top: 0px;"></div>
        <div class="resource_light" style="bottom: -7px;left: 13px;"></div>
    </div>
    <div on-tap="gotoBug(1)" class="resource_bar" style="left: 285px;top: 6px;font-size:16px;line-height:24px;z-index:2;width:96px">
        <widget w-tag="app_a-widget-coin-coin" style="left: 5px;top: 2px;color: #e3d8bb;">
			{"icon":"diamond", "text":[{{common.numberCarry(parseInt(it.r[1][1] || 0),10000)}}]} 
		</widget>
        <div class="add_btn" style="right: -13px;top: 0px;"></div>
        <div class="resource_light" style="bottom: -7px;left: 13px;"></div>
    </div>
    {{if it.type}}
    {{let s = it.r[2][0]}}
    <div on-tap='gotoGetWay("{{s}}")' class="resource_bar" style="left:398px;top:5px;font-size:16px;line-height:24px;z-index:4;width:80px">
        <widget w-tag="app_a-widget-coin-coin" style="left: -2px;top: 2px;color: #e3d8bb;">
			{"icon":{{it.type}}, "text":[{{common.numberCarry(parseInt(it.r[2][1] || 0),10000)}}]} 
		</widget>
        <div class="add_btn" style="right: -13px;top: 0px;"></div>
    </div>
    {{end}}
    <div on-tap='cancel_all' class="big_close" style="z-index:3;position:absolute;right: 12px;top: 15px;">
        <app_a-widget-guide-guide>
            {{"close_all"}}
        </app_a-widget-guide-guide>
        <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    </div>
</div>