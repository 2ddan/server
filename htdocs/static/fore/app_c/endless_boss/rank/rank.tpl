<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" style="height:560px;margin-top: -280px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"奖励排行","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div style="width:100%;position:absolute;left:0;top:0px;bottom:6px">
            
            <div style="width: 450px;position: relative; top: 26px;left: 45px;height: 515px;">
                <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                    {"bgName":"bg_frame26"} 
                </widget>
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="left: 11px;top: 65px;height:428px;width:428px;opacity:0.85">
                    {"bgName":"bg_frame32"} 
                </widget>
                <widget w-tag="app_a-widget-line-line" style="width:100%;height:;position: absolute; top: 63px; z-index: 4;">
                    {"line":"line_12"} 
                </widget>
                <app-widget-tab-navtab ev-change='changeColumns' style="position:absolute;width:100%;top:19px;bottom:5px;left:0px;">
                    {
                    "cur":{{it1.rank_index ? it1.rank_index : 0}},					
                    "btn_box":"btnBag",
                    "btn_width":98,
                    "btn_height":44,
                    "left":16,
                    "top":"2",
                    "margin":10,
                    "arr":[
                        {"tab":"app_c-endless_boss-rank-score_frame","btn":{"text":"积分排名","type":"border","type_m":"0","fontSize":24} },
                        {"tab":"app_c-endless_boss-rank-rank_frame","btn":{"text":"奖励预览","type":"border","type_m":"1","fontSize":24} }
                        
                    ],
                    "type":0}
                </app-widget-tab-navtab>
                {{let rank = it1.getMyRank()}}
                <div style="font-size:22px;font-family: mnjsh;color:#ffba00;position: absolute;top: 414px;width: 100%;text-align: center;">
                    <div style="display: inline-block;margin:0 10px;">我的排名:<span style="color:#ffd8a6">{{rank[0] || "未上榜"}}</span></div> 
                    <div style="display: inline-block;margin:0 10px;">我的积分:<span style="color:#ffd8a6">{{rank[1]}}</span></div> 
                </div>
                <div style="font-size:18px;font-family: mnjsh;color:#ffd8a6;position: absolute;top: 453px;text-align: left;left: 95px;">
                    <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 270px;left: 0;">
                        {"icon":"little_tips_bg","text":"奖励在活动完成后通过邮件发放","width":270,"height":23,"top":2,"marginLeft":7} 
                    </widget>
                    <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                        {"icon":"remind"} 
                    </widget>
                </div>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                    {"icon":"tips_bottom"} 
                </widget>
            </div>
        </div>
    </div>
</div>