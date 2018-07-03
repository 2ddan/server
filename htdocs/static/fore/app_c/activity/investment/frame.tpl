<div style="position:relative;width:469px;height:113px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:469px;height:113px;left:13px">
        {"bgName":"bg_frame34"} 
    </widget>
    <div>
        <app-widget-text-text style="position:absolute;top:16px;left:34px;">{"text":{{it.level_limit + "级可领取"}},"textCfg":"actName","fontSize":16.49}</app-widget-text-text>
        <div style="position:absolute;top:40px;left:30px">
            {{for m,n of it.award}}
                {{let prop=it1.Pi.sample[n[0]]}}
                {{let url=it1.Pi.pictures[prop.icon]}}
                <app_a-widget-prop-base on-tap='showPropInfo("{{n[0]}}")' style="position:relative;margin:0 2px;display:inline-block;width:51px;height:51px">
                    {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count":{{n[1]}},"name":"none","bg":0,"effect":{{prop.effect}}}
                </app_a-widget-prop-base>
            {{end}}   
        </div>
        {{if it1.baseData.buy_record[0] == it1.investment_base.id }}
            {{if it1.baseData.award_record[it.id - 1]}}
                <app_a-widget-pic_text-pic_text style=" position: absolute;right:10px;top: 24px;">
                    {"icon":"text_get_1","width":104,"height":70,"top":0,"left":0}
                </app_a-widget-pic_text-pic_text>
            {{else}}
                {{let bol = it1.player.level >= it.level_limit ? 1 : 0}}
                <app_a-widget-btn-rect style="top:36px;right:10px;position:absolute" on-tap="getAward(2,{{bol ? it.id : null}})">
                    {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"tip_keys":[{{"activities.104."+it.id}}],"show_anim":1}
                </app_a-widget-btn-rect>
            {{end}}
        {{else}}
            <widget style=" position: absolute;right:10px;top: 45px;" w-tag="app_a-widget-btn-rect" on-tap="buy({{it1.investment_base.id}},{{it1.investment_base.rechargeID}})">
                {"text":"去购买","class":"default","fontsize":24,"width":116,"height":45} 
            </widget>
        {{end}}
    </div>
</div>