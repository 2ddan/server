<div maxId="23" test="test" style="position: absolute;width:50px;height:70px;" w-sid="2">
    {{if it1 && it1.has_gift}}
    <div style="position:absolute;width:100%;height:100%;" on-tap="lookAward">
        {{let nowTime = it1.Util.serverTime()}}
        {{let start_time = it1.limit_gift_record[1]}}
        {{let gift = it1.time_limit_gift[it1.limit_gift_record[0]]}}
        {{let limit_time = gift.limit_time}}
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:55px;left:50%;transform:translate(-50%;)">
            {"icon":"equip_level_bg","width":65,"height":19,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
        </widget>
        {{if it1.recharge_record && it1.recharge_record[0][1] > start_time}}
        <widget style="position: absolute;left: 50%;transform: translate(-50%);z-index: 3;pointer-events: none;top: 55px;" w-tag="app_a-widget-text-text">
            {"text":"点击领取","show":"","space":-4,"fontSize":16,"lineHeight":20,"color":"","textCfg":"onlineGift"} 
        </widget>
        <img style="position: absolute;left: -7px;top: -7px;pointer-events: none" src="app_b/online_gift/image/out_light.png"/>
        {{else}}
        <app-widget-cdtime ev-countdownend="timeEnd" style="position:absolute;top:55px;font-size:15px;width:78px;line-height:19px;color:#ff4830;text-align:center;left:50%;transform:translate(-50%;)">
            {"cd_time":{{(start_time + limit_time)*1000}},"now_time":{{nowTime}},"by_minute":1 }
        </app-widget-cdtime>
        {{end}}
        <widget style="position:absolute;left:50%;transform:translate(-50%);top:35px;z-index:2;" w-tag="app_a-widget-text-text">
            {"text":{{gift.name}},"show":"","space":-4,"fontSize":16,"lineHeight":20,"color":"","textCfg":"onlineGift"} 
        </widget>
        <img src="app_b/online_gift/image/online_gift.png"/>
    </div>
    {{end}}
</div>