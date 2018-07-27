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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"排行榜","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
                <widget w-tag="app_a-widget-line-line"style="width:100%;height:;position: absolute; top: 63px; z-index: 4;">
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
                        {"tab":"app_c-robres-rank-rank_detail","btn":{"text":"战区排行","type":"border","type_m":"detail","fontSize":24} },
                        {"tab":"app_c-robres-rank-rank_frame","btn":{"text":"本区奖励","type":"border","type_m":"area","fontSize":24} },
                        {"tab":"app_c-robres-rank-rank_frame","btn":{"text":"战区奖励","type":"border","type_m":"global","fontSize":24} }
                        
                    ],
                    "type":0}
                </app-widget-tab-navtab>
                {{if it1.rank_index}}
                <div style="font-size:22px;font-family: mnjsh;color:#ffba00;position: absolute;top: 414px;width: 100%;text-align: center;">
                    <div style="display: inline-block;margin:0 10px;">本区排名:<span style="color:#ffd8a6">{{it1.rank.area_forage_my_rank_info[0]}}</span></div> 
                    <div style="display: inline-block;margin:0 10px;">战区排名:<span style="color:#ffd8a6">{{it1.rank.dominate_forage_my_rank_info[0]}}</span></div> 
                </div>
                <div style="font-size:18px;font-family: mnjsh;color:#ffd8a6;position: absolute;top: 453px;text-align: left;left: 95px;">
                    <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 270px;left: 0;">
                        {"icon":"little_tips_bg","text":"奖励在活动完成后通过邮件发放","width":270,"height":23,"top":2,"left":7} 
                    </widget>
                    <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                        {"icon":"remind"} 
                    </widget>
                </div>
                {{else}}
                <div  class="shadow7" style=" position: absolute;bottom:37px;left:155px;font-size:18px;color:#ffd8a6;line-height: 26px;height: 29px;white-space: nowrap;padding-left: 7px;">
                    {{let count = it1.getCount()}}
                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                        {"icon":"resource_bar","width":143,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                    </widget>
                    <span style="position:relative;top:0;left:0;">可攻打次数: <span style="color:{{!count[0] ? '#f00' : ''}}">{{count[0]}}</span></span> 
                    <widget style="position:absolute;top:0;left:124px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount(0,1)">
                        {"icon":"add_btn"} 
                    </widget> 
                </div>
                {{end}}
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                    {"icon":"tips_bottom"} 
                </widget>
            </div>
        </div>
    </div>
</div>