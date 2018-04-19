
<div maxId="11" test="test" style="position:absolute;width:50px;height:68px" w-sid="2">
    {{if it1}}
        <div style="position:absolute;width:50px;height:68px;{{if it1.index == -1}}display:none;{{end}}" on-tap="getAward" >
            <app_a-widget-guide-guide>
                {{"online_gift"}}
            </app_a-widget-guide-guide>
                    
            {{let nowTime = it1.Util.serverTime()}}
            {{if it1.end_time*1000 > nowTime}}
            <img   src="app_b/online_gift/image/online_gift.png"/>
            <img style="position: absolute;left: -7px;top: -7px;pointer-events: none" src="app_b/online_gift/image/out_light.png"/>    
            <widget style="position:absolute;left:50%;transform:translate(-50%);bottom:-10px;" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"equip_level_bg","width":65,"height":19,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
            </widget>
            <app-widget-cdtime ev-countdownend="timeEnd" style="position: absolute;bottom:-10px;font-size:15px;width: 78px;line-height:17px;color:#ff4830;text-align:center;left:-14px;">
                {"cd_time":{{it1.end_time*1000}},"now_time":{{nowTime}},"by_minute":1 }
            </app-widget-cdtime>
            <widget style="position: absolute;left: 50%;transform: translate(-50%);pointer-events: none;top: 40px;" w-tag="app_a-widget-text-text">
                {"text":"在线礼包","show":"","space":-4,"fontSize":16,"lineHeight":20,"color":"","textCfg":"onlineGift"} 
            </widget>
            {{else}}
            <div class="online_award" style="position: absolute;top: 50%;left: 50%;margin-left: -58px;margin-top: -65px;"></div>                        
            <widget style="position: absolute;left: 50%;transform: translate(-50%);pointer-events: none;top: 40px;" w-tag="app_a-widget-text-text">
                {"text":"点击领取","show":"","space":-4,"fontSize":16,"lineHeight":20,"color":"","textCfg":"onlineGift"} 
            </widget>
            {{end}}
        </div>
    {{end}}
</div>