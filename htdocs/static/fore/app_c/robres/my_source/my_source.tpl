<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"我的资源","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div style="width: 450px;position: relative; top: 26px;left: 45px;height: 365px;">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="s20" class="shadow6">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame56"} 
                </widget>
                <div  w-class="s13">
                    {{let t = it1.getFixTime()}}
                    <div>个人水晶:{{it1.info.own_total_forage}}</div>
                    <div>
                        <app-widget-cdTime1 ev-countdownend="timeEnd1" style="display:inline-block;vertical-align: middle;color:#12ff00">
                            {"cd_time":{{t[1]}},"now_time":{{t[0]}}}
                        </app-widget-cdTime1>
                        后可获得<span style="color:#12ff00">{{it1.robres_base.spell_get_fixed_provender[1]}}</span>固定水晶
                    </div>

                    <widget w-class="s18" w-tag="app_a-widget-btn-ling" style="right:100px" on-tap="helpOther">
                        {"class":"default","fontsize":20,"color":"#fdedd7;","text":" 协助 伙伴","width":77,"height":77,"textCfg":"lingBtn","tip_keys":["new_fun.robres.event.assist"]} 
                    </widget>
                    <widget w-class="s18" w-tag="app_a-widget-btn-ling"  on-tap="review">
                        {"class":"default","fontsize":20,"color":"#fdedd7;","text":" 战况 回顾","width":77,"height":77,"textCfg":"lingBtn","tip_keys":["new_fun.robres.event.revenge"]} 
                    </widget>
                    <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:0px;width:100%;height:2px;">
                        {"line":"line_10"}
                    </widget>
                </div>
                {{let arr = it1.getPropCount()}}
                <div style="position: absolute;top: 40px;left: 20px;">
                    <img src="../images/girl.png" />
                    <div class="shadow7" w-class="s16">
                        你已被入侵<span style="color:#f00">{{arr[0]}}</span>次总共被抢夺了{{arr[1]}}水晶
                    </div>
                </div>
            </div>
                
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>