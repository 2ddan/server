
<div data-desc="月卡" style="position:absolute;width:100%;top:0;height:642px;">
    <widget w-tag="app_a-widget-bg_frame-bg" w-class="c1">
        {"bgName":"bg_frame21"} 
    </widget>
    <widget w-tag="app_a-widget-line-line" w-class="c2">
        {"line":"line_7"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -3px;top: 0;z-index: 3;">
        {"icon":"lantern_1"} 
    </widget>
    
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: 482px;top:0;z-index: 3;">
        {"icon":"lantern_1"} 
    </widget>
    <div w-class="c3">
        <div w-class="c4">
            {{let hasTime = it1.player.annual_card_due_time }}
            <img src="./images/card_bg1.jpg" style="position:absolute;top:1px;left:-20px;width:533px;height:284px"/>        
            <img w-class="c5" src="./images/bg_1.png" />
            <img w-class="c6" src="./images/week_bottom.png" />
            <div w-class="c7">
                <div style="width:240px;height:191px;position:absolute;top:0px;left:-14px;">
                        <div style="width: 91%;height: 77%;background: rgba(0, 0, 0, 0.4);position: absolute;top:14px;left: 11px;"></div>
                        <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
                        <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
                        <div class="attr_bg_right" style="right:0px;bottom:0px"></div>
                    </div>   
                <div w-class="c8">
                    <div style="position:absolute;top:-2px;left: 50%;margin-left: -60px;">
                        <img src="./images/week_title.png"/>
                        <widget w-tag="app_a-widget-pic_other-pic_other"  w-class="c9">
                            {"icon":"butterfly"} 
                        </widget>
                    </div>
                    <div  w-class="c10" style="color:#f00">永久特权</div>
                    <div style="position: absolute;top: 75px;left: 50%;transform: translateX(-50%);white-space: nowrap;text-align: left;">
                        <div>
                            <widget w-tag="app_a-widget-text-text" w-class="c11">
                                {"text":"立即获得","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{it1.vipcard[1].diamond_count}}</span>
                            <widget w-tag="app_a-widget-text-text" w-class="c11">
                                {"text":"元宝","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"每日领取","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{it1.vipcard[1].per_diamond}}</span>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"元宝","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"挂机收益","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{"+" + parseInt(it1.vipcard[1].exp_add*100) + "%"}}</span>
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"宝库收益","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{"+" + parseInt(it1.vipcard[1].exp_add*100) + "%"}}</span>
                        </div>
                    </div>

                </div>
                
                {{if hasTime>0}}
                {{let _gget = it1.recharge["annual_card_receive_diamond"]}}
                <widget w-tag="app_a-widget-btn-rect"  style="position:absolute;bottom:-15px;left:62px;" on-tap="receiveCard(1)"> 
                    {"class":{{_gget ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":"领 取","width":116,"height":44,"tip_keys":["activities.103.week"],"show_anim":{{_gget ? 0 : 1}} } 
                </widget>
                {{else}}
                <widget w-tag="app_a-widget-btn-rect" style="position:absolute;bottom:-15px;left:62px;" on-tap='buy_vipcard(1)'>
                    {"class":"default","fontsize":24,"color":"#fdedd7;","text":{{it1.vipcard[1].price + "元购买"}},"width":113,"height":44} 
                </widget>
                {{end}}
            </div>
            <div style="position: absolute;left: 270px; bottom: 12px;z-index:2">
                
                <app_a-widget-pic_other-pic_other style="position: absolute;bottom: 25px;left: 5px;">
                    {"icon":"week_card"}
                </app_a-widget-pic_other-pic_other>
                <img src="./images/card_bottom.png"/>
                <div class="card_month_anima" style="top: -140px;left: 21px;position: absolute;"></div>
               
            </div>
        </div>
        <div w-class="c4" style="top:319px;z-index:1">
            {{let hasTime = it1.player.month_card_due_time}}
            <img src="./images/card_bg2.jpg" style="position:absolute;left:-30px;top:-10px;width:542px;height:300px"/>                            
            <img w-class="c6" style="bottom:0;" src="./images/month_bottom.png" />
            <div w-class="c7" style="left: 245px;">
                <div style="width:240px;height:191px;position:absolute;top:0px;left:-14px;">
                    <div style="width: 91%;height: 77%;background: rgba(0, 0, 0, 0.4);position: absolute;top:14px;left: 11px;"></div>
                    <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
                    <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
                    <div class="attr_bg_right" style="right:0px;bottom:0px"></div>
                </div>   
                <div w-class="c8">
                    <div style="position:absolute;top:-2px;left: 50%;transform: translateX(-50%)">
                        <img src="./images/month_title.png"/>
                        <widget w-tag="app_a-widget-pic_other-pic_other" style=" position: absolute;left: -5px;top: -16px;z-index: -1;">
                            {"icon":"butterfly_1"} 
                        </widget>
                    </div>
                    <div  w-class="c10" style="color:#f00">永久特权</div>
                    <div style="position: absolute;top: 75px;left: 50%;transform: translateX(-50%);white-space: nowrap;text-align: left;">
                        <div>
                            <widget w-tag="app_a-widget-text-text" w-class="c11">
                                {"text":"立即获得","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{it1.vipcard[0].diamond_count}}</span>
                            <widget w-tag="app_a-widget-text-text" w-class="c11">
                                {"text":"元宝","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"每日领取","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{it1.vipcard[0].per_diamond}}</span>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"元宝","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"挂机收益","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{"+" + parseInt(it1.vipcard[0].exp_add*100) + "%"}}</span>
                        </div>
                        <div>
                            <widget w-tag="app_a-widget-text-text"  w-class="c11">
                                {"text":"宝库收益","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                            <span>{{"+" + parseInt(it1.vipcard[0].exp_add*100) + "%"}}</span>
                        </div>
                    </div>
                </div>
                
                {{if hasTime>0}}
                {{let _gget = it1.recharge["month_card_receive_diamond"]}}
                <widget w-tag="app_a-widget-btn-rect"  style="position:absolute;bottom:-15px;left:62px;" on-tap="receiveCard(0)">
                    {"class":{{_gget ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":"领 取","width":116,"height":44,"tip_keys":["activities.103.month"],"show_anim":{{_gget ? 0 : 1}} } 
                </widget>
                {{else}}
                <widget w-tag="app_a-widget-btn-rect"  style="position:absolute;bottom:-15px;left:62px;" on-tap='buy_vipcard(0)'>
                    {"class":"default","fontsize":24,"color":"#fdedd7;","text":{{it1.vipcard[0].price + "元购买"}},"width":113,"height":44} 
                </widget>
                {{end}}
            </div>
            <div style="position: absolute;left:50px; bottom: 10px;z-index:2">
                <app_a-widget-pic_other-pic_other style="position: absolute;bottom: 25px;left: 5px;">
                    {"icon":"month_card"}
                </app_a-widget-pic_other-pic_other>
                <div class="card_month_anima" style="top: -143px;left: 18px;position: absolute;"></div>
                <img src="./images/card_bottom.png"/>
            </div>
        </div>
    </div>
    
</div>