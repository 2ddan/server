{{let desc = it1.investment_base.desc}}
<div style="position:absolute;top:0;bottom:0;width:100%;z-index:2">
    <div w-class="bg_1"></div>
    <div w-class="bg_container" style="position:absolute">
        <app_a-widget-text-text style="position:absolute;top:-19px;right:114px;">
            {"text":"成长基金","fontSize":42,"textCfg":"activity","space":-6 }
        </app_a-widget-text-text>
        <app_a-widget-text-text style="position:absolute;top:30px;right:96px;">
            {"text":{{desc[0]}},"fontSize":18,"textCfg":"activity","space":-2 }
        </app_a-widget-text-text>
        <app_a-widget-text-text style="position:absolute;top:50px;right:64px;">
            {"text":{{desc[1]}},"fontSize":18,"textCfg":"activity","space":-2 }
        </app_a-widget-text-text>
        <div w-class="buy_gifts" style="position:absolute">
            <div class="center_h" style="font-size: 16px; width: 16px; font-family: mnjsh; color: #f7d4c2; position: absolute; left: 18px; top: 73px;">购买即赠</div>
            <div w-class="award_list" style="position:absolute;height:54px;width:270px;overflow:hidden;top:77px;left:38px">
                <div scroller="1" style="position:absolute;top:0;height:75px;overflow-y:hidden;overflow-x:auto;white-space:nowrap">
                    {{for m,n of it1.investment_base.award}}
                        {{if n[1]}}
                        {{let prop=it1.Pi.sample[n[0]]}}
                        
                        {{let icon = prop.module ? prop.module[prop.career_id.indexOf(it1.player.career_id)][0] : prop.icon}}
                        {{let url = it1.Pi.pictures[icon]}}
                        <app_a-widget-prop-base on-tap='showPropInfo("{{n[0]}}")' style="position:relative;margin:0 2px;display:inline-block;width:51px;height:51px">
                            {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count":{{n[1]}},"name":"none","bg":0,"effect":{{prop.effect}}}
                        </app_a-widget-prop-base>
                        {{end}}
                    {{end}}
                </div>               
            </div>
        </div>
        {{if it1.baseData.buy_record[0] == it1.investment_base.id }}
            {{if !it1.baseData.buy_record[1]}}
                <div style=" position: absolute;width:84px;height:30px;right:96px;bottom: 26px;background: url(./images/02.png)" on-tap="getAward(1,null)">
                    <app-widget-tip-tip style="right:3px;top:5px;">
                        {"tip_keys":["activities.104.award"] }
                    </app-widget-tip-tip>
                </div>
            {{else}}
                <div style=" position: absolute;width:84px;height:30px;right:96px;bottom: 26px;background: url(./images/03.png)" >
                </div>
            {{end}}           
        {{else}}
            <div style=" position: absolute;width:84px;height:30px;right:96px;bottom: 26px;background: url(./images/01.png)" on-tap='buy({{it1.investment_base.id}})'>                
            </div>
        {{end}}
        <widget w-tag="app_a-widget-line-line" style="position:absolute;top:166px;right:-17px;">
            {"line":"line_7"} 
        </widget>
        
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:462px;left:50%;margin-left:-347px;top:183px;">
                {"bgName":"bg_frame21"} 
        </widget>
        <app_a-widget-pic_other-pic_other style="position:absolute;left:-228px;top:183px;">
            {"icon":"lantern_1"}
        </app_a-widget-pic_other-pic_other>
        <app_a-widget-pic_other-pic_other style="position:absolute;right:-20px;top:183px;">
            {"icon":"lantern_1"}
        </app_a-widget-pic_other-pic_other>
        <div data-desc="领取列表" style="position:absolute;margin-left:-349px;width:492px;height:449px;left:50%;top:190px;overflow:hidden">
            <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y:auto;overflow-x:hidden">
                <app-widget-step style="width: 100%;height: 100%;">
                    {"widget":"app_c-activity-investment-frame","arr":{{it1.investment_list}}}
                </app-widget-step>
            </div>
        </div>
    </div>
    
    
</div>