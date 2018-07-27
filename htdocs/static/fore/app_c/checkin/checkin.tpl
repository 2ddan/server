<div style="position:absolute;width:492px;left:50%;margin-left:-246px;top: 0px;bottom: 70px;">
    <div class="bg_1" style="position:absolute;width:492px;height: auto;;left:0px;top:0;bottom: 0px;"></div>
    <div w-class="bg"></div>
    <app_a-widget-pic_other-pic_other style="position:absolute;left:-26px;top:4px;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    <app_a-widget-pic_other-pic_other style="position:absolute;right:-26px;top:4px;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>

    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-11px;left:-20px;">
        {"line":"line_7"} 
    </widget>
    
    <app_a-widget-pic_other-pic_other style="position:absolute;left:0px;top:-20px;">
        {"icon":"butterfly"}
    </app_a-widget-pic_other-pic_other>

    <app_a-widget-pic_text-pic_text style="top:20px;position:absolute;left:50%;margin-left: -125px;color: #ffb675;font-family:mnjsh;width: 250px;height: 34px;font-size:18px">
        {"icon":"title_bg","width":251,"height":34,"align":"center","marginLeft":3,"text":"每签到3天有豪礼相赠","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
    </app_a-widget-pic_text-pic_text>


    <widget w-tag="app_a-widget-line-line" style="top:67px;left:28px;width:440px">
        {"line":"line_10"}
    </widget>
    <div data-desc="内容" style="position:absolute;width:100%;top:73px;overflow:hidden;bottom:10px;left:0;">
        {{let award = it1.checkinCfg.slice(0,it1.checkinCfg.length/2)}}
        {{if it1.checkInData.boxday >= it1.cyclic_day }}
        {{let award = it1.checkinCfg.slice(it1.checkinCfg.length/2)}}
        {{end}}

        <app-widget-step style="position: absolute;width:105%;height: inherit;top:0;bottom: 10px;">
            {"widget":"app_c-checkin-frame","arr":{{award}},"initCount":31,"addCount":8,"needIndex":1 }
        </app-widget-step>
    </div>
    {{let checkDay = it1.checkInData.boxday}}
    <div style="position:absolute;left:120px;bottom:-74px;width:309px;height:68px;">
        <div w-class="bar_bg"></div>
        {{for e, t of [1,2,3]}}
        <div style="display:inline-block;position:relative;margin-right:40px;width:50px;height:60px;">
            <app_a-widget-text-text style="position:absolute;left:-10px;top:3px">
                {"text":{{"第"+t+"天"}},"fontSize":18,"textCfg":{{checkDay >= t?"checkinDay":"gray"}},"space":-4 }
            </app_a-widget-text-text>
            {{if (t == 2) && (checkDay >= 2) }}
            <div w-class="bar_progress" style="width:90px;"></div>
            {{end}}

            {{if (t == 3) && (checkDay == 3)}}
            <div w-class="bar_progress" style="width:145px;"></div>
            {{end}}

            {{if checkDay >= t}}
            <div w-class="bar_point" style="top:28px;z-index:3"></div>
            {{end}}
        </div>
        {{end}}
        <div w-class="box_bg" on-tap="openGemBox">
            {{if checkDay < 3}}
            <app_a-widget-box-box style="-9px;">
                {"type":"1"}
            </app_a-widget-box-box>
            {{else}}
            <app_a-widget-box-box style="-9px;">
                {"type":"1","state":"open","tip_keys":["daily_act.checkin.box"]}
            </app_a-widget-box-box>
            {{end}}
        </div>

    </div>
</div>