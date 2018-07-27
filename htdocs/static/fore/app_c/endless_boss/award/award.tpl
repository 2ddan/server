<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" style="height: 602px;margin-top: -301px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"奖 励","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>

        <div style="width: 450px;position: relative; top: 26px;left: 45px;height: 564px;">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="left: 11px;top: 65px;height:482px;width:428px;opacity:0.85">
                {"bgName":"bg_frame32"} 
            </widget>
            <widget w-tag="app_a-widget-line-line" style="width:100%;height:;position: absolute; top: 63px; z-index: 4;">
                {"line":"line_12"} 
            </widget>
            <app-widget-tab-navtab ev-change='changeColumns1' style="position:absolute;width:100%;top:19px;bottom:5px;left:0px;">
                {
                "cur":{{it1.award_type == "point" ? 0 : 1}},					
                "btn_box":"btnBag",
                "btn_width":98,
                "btn_height":44,
                "left":16,
                "top":"2",
                "margin":10,
                "arr":[
                    {"tab":"app_c-endless_boss-award-frame","btn":{"text":"积分奖励","type":"border","type_m":"point","fontSize":24} },
                    {"tab":"app_c-endless_boss-award-frame","btn":{"text":"击杀奖励","type":"border","type_m":"kill_num","fontSize":24} }
                    
                ],
                "type":0}
            </app-widget-tab-navtab>
            
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>