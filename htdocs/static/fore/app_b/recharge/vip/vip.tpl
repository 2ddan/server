
<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2;">
    {{let common = _get("app/mod/common").exports.Common}}     
    {{let Pi = it1.Pi}}        
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    
    <div w-class="s8" style="height:676px;margin-top:-355px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"充值特权","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>

        

        <div w-class="s13">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame26"} 
            </widget>
            {{if it1.vipNum < 15}}
            <widget w-class="s25"  on-tap="changeVip()" w-tag="app_a-widget-btn_pic-btn_pic">
                {"icon":"light_arraw"} 
            </widget>
            {{end}}
            {{if it1.vipNum > 0}}
            <widget w-class="s24" on-tap="changeVip('-')" w-tag="app_a-widget-btn_pic-btn_pic">
                {"icon":"light_arraw"} 
            </widget>
            {{end}}
            <div w-class="s15">
                <widget  w-tag="app_a-widget-bg_frame-bg" style="width:100%;height:95%;left:0;top:4px;">
                    {"bgName":"bg_frame31"} 
                </widget>
                <app_a-widget-line-line style="position:absolute;top:0px;left:0px;right:0px;margin:0 auto;width:100%">
                    {"line":"line_16"}
                </app_a-widget-line-line>
                <app_a-widget-line-line style="position:absolute;bottom:0px;left:0px;right:0px;margin:0 auto;width:100%">
                    {"line":"line_17"}
                </app_a-widget-line-line>
                {{let now = it1.vip_exp}}
                {{let next = it1.vipUpNeed[it1.vip_level].exp}}
                {{let percent = (now/next)*100}}
                <div w-class="s16" data-desc="vip等级">
                    <app_a-widget-pic_text-pic_text style="left: 0;top: -10px;position: absolute;">
                        {"icon":"vip_bg","width":82,"height":37,"text":{{"VIP"+it1.vip_level}},"textCfg":"activity","fontSize":20,"top":7,"left":0}
                    </app_a-widget-pic_text-pic_text>
                
                    <app_a-widget-bar-bar2  class="shadow6" style="height: 20px;width: 220px;left: 82px;top:0;position:absolute;font-family:'黑体'">
                        {"progress":{{percent}},"text":{{now+"/"+next}},"lineHeight":20,"fontSize":18}
                    </app_a-widget-bar-bar2>
                    <img style="height: 16px;width: 218px;left: 83px;top: 1px;position: absolute;z-index: 2;" src="../images/bar_border.png" />
                    <app_a-widget-pic_text-pic_text style="right: 0;top: -10px;position: absolute;">
                        {"icon":"vip_bg","width":82,"height":37,"text":{{"VIP"+(it1.vip_level-0+1)}},"textCfg":"activity","fontSize":20,"top":7,"left":0}
                    </app_a-widget-pic_text-pic_text>
                </div>
                <div w-class="s18" class="shadow6" data-desc="充钱">
                    再充值
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":{{(next-now)/10}},"textCfg":"rechargeGreen"} 
                    </widget>
                    元,即可成为
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":{{"VIP"+(it1.vip_level-0+1)}},"fontSize":20,"textCfg":"activity"} 
                    </widget>
                    <app_a-widget-btn-help on-tap='gotoRecharge' class="shadow4" style="position: relative;display: inline-block;margin-bottom: -15px;margin-left: 10px;">
                        {"text":"充点小钱","width":130,"height":44,"fontSize":22}
                    </app_a-widget-btn-help>
                    
                </div>
            </div>
            <div w-class="s34" class="shadow7">
                <div w-class="s19">
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":{{"VIP"+it1.vipNum +" 特权"}},"fontSize":20,"textCfg":"activity","space":0} 
                    </widget>
                </div>
                <div  w-class="s20">
                    <div scroller="1" style="position: absolute;width:110%;top: 0; bottom: 5px;overflow-y: auto; overflow-x: hidden;">
                        {{let index = 1}}
                        {{for i,v in it1.vip_advantage[it1.vipNum]}}
                        {{if _cfg[i]}}
                        <div>{{index + "、"+_cfg[i]+"提升至"+v+"次"}}</div>
                        {{end}}
                        {{:index++}}
                        {{end}}
                    </div>
                </div>
            


                <widget w-class="s36" w-tag="app_a-widget-line-line" >
                    {"line":"line_10"} 
                </widget> 
            </div>
            <div w-class="s22" >
                <div style="position:absolute;top:7px;left:153px;">
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":{{"VIP"+it1.vipNum}},"fontSize":30,"textCfg":"activity"} 
                    </widget>
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":"专属礼包","fontSize":24,"textCfg":"activity","space":-2} 
                    </widget>
                </div>
                <div style="position:absolute;top:42px;left:193px;">
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":"助","fontSize":24,"textCfg":"activity","space":-3} 
                    </widget>
                    <widget w-class="13" w-tag="app_a-widget-text-text" style="margin-top: -7px;">
                        {"text":"战力","fontSize":30,"textCfg":"vipPower","space":-3} 
                    </widget>
                    <widget w-class="13" w-tag="app_a-widget-text-text">
                        {"text":"疯狂飙升","fontSize":24,"textCfg":"activity","space":-3} 
                    </widget>
                </div>

                <div data-desc="物品"  w-class="s41" class="shadow">
                    <widget  w-tag="app_a-widget-bg_frame-bg" style="width: 100%;height: 67px;left: 0;top: 5px;">
                        {"bgName":"bg_frame30"} 
                    </widget>
                    <div w-class="s42">
                        {{for i,v in it1.superData[it1.vipNum]['goods'] }}
                        {{let prop = Pi.sample[v[0]]}}
                        {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                        {{let url = Pi.pictures[icon]}}
                        <div data-desc="物品" on-tap='propInfoShow({{v[0]}})' style="position:relative;display:inline-block;margin:11px 4px 0;height:56px;width:56px;">
                            <app_a-widget-prop-base >
                                {"prop":{{prop}},"url":{{url}},"width":56"height":56,"count": {{prop.type != "equip" ? v[1] : "none"}},"name":"none","bg":0,"right":8,"top":22}
                            </app_a-widget-prop-base>
        
                            {{if prop.type == "equip"}}
                            <div data-desc="装备等级" w-class="s21" style="bottom:7px;" >{{"Lv"+prop.level[1] || 20}}</div>
                            {{end}}
                        </div>
                        
                        {{end}}
                        {{if it1.superData[it1.vipNum]["money"]}}
                        {{let prop = it1.Pi.sample[100001]}}
                        <div data-desc="物品" on-tap='propInfoShow(100001)' style="position:relative;display:inline-block;margin:11px 4px 0;height:56px;width:56px;">
                            <app_a-widget-prop-base >
                                {"prop":{{prop}},"url":{{it1.Pi.pictures[ prop.icon ]}},"width":56"height":56,"count": {{it1.superData[it1.vipNum]["money"]}},"name":"none","bg":0,"right":8,"top":22}
                            </app_a-widget-prop-base>
                        </div>
                        {{end}}
                    </div>
                    

                </div>

                {{ let cost = it1.superData[it1.vipNum]["cost"] }}                
                <widget  on-tap="superBuy({{it1.vipNum}})" w-class="s38" w-tag="app_a-widget-btn-rect" >
                    {"class":{{(it1.vipNum>it1.vip_level || cost>it1.diamond || !it1.canBuy(it1.vipNum)) ? "disabled" : "hl" }},"fontsize":24,"color":"","text":"购 买","width":116,"height":45} 
                </widget>
                {{let col = cost>it1.diamond ? "#f00" :"#ffd8a6"}}
                <widget w-class="s23" w-tag="app_a-widget-coin-coin" w-sid="23" style="color:{{col}}">
                    {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{cost}}]} 
                </widget>
            </div>
        </div>
        
        
            
        <widget style="bottom: -14px;position: absolute;left: 3%;width: 94%;" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>