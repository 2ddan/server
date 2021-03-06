<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">    
    <div w-class="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" style="top: -25px;">{"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7" style="z-index:1">{"icon":"pendant"} 
        </widget>
        
        <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" style="z-index: 1;">
            {"icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"攻城奖励","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>

        <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 386px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
            {{for i, v of it1.battle_reward}}
            <div style="width:464px;height:144px;position:relative;margin-bottom:18px">
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:144px">
                    {"bgName":"bg_frame23"}
                </widget>
                <app_a-widget-pic_other-pic_other style="position: absolute;bottom: -4px;left: 0px;right: 0px;margin: auto;">
                    {"icon":"light_bottom"}
                </app_a-widget-pic_other-pic_other>
                <app_a-widget-text-text style="position:absolute;top: 15px;left: 32px;">
                    {"text":{{v.desc}},"textCfg":"heroEquip","fontSize":26}
                </app_a-widget-text-text>
                <div data-desc="奖励" style="position: absolute;top:54px;left:28px;height:60px;width:295px;">
                    {{for m, n of v.award}}
                    {{if n[1] > 0}}
                    {{let p = it1.Pi.sample[n[0]]}}
                    {{let url = it1.Pi.pictures[p.icon]}}
                    <div style="position:relative;width:60px;height:60px;margin:0px 8px 0px 0px;display:inline-block;color:#ffffff;">
                        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                            {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"name":{{p.name}},"top":22,"right":6} 
                        </widget>
                    </div>
                    {{end}}
                    {{end}}
                </div>
                {{if v.flag == 1}}
                <div style="position: absolute;width: 116px;height: 65px;right: 24px;top: 34px;">
                    <div style="width: 136px;left: -10px;line-height: 20px;text-align: center;color: #f3d6af;">进度: 0/2</div>
                    <app_a-widget-btn-rect on-tap="getAward({{v.index}})" style="top:20px;position:absolute;;">
                        {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
                    </app_a-widget-btn-rect>
                </div>
                {{elseif v.flag == 2}}
                <div style="position: absolute;width: 116px;height: 65px;right: 24px;top: 34px;">
                    <div style="position: absolute;width: 136px;left: -10px;line-height: 20px;text-align: center;color: #f3d6af;">进度: 0/2</div>
                    <app_a-widget-btn-rect style="top:20px;position:absolute;;">
                        {"text":"领 取","class":"disabled","fontsize":24,"width":116,"height":45}
                    </app_a-widget-btn-rect>
                </div>
                {{else}}
                <app_a-widget-pic_text-pic_text style="top:48px;right:32px;position: absolute;">
                    {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
                </app_a-widget-pic_text-pic_text>
                {{end}}
            </div>
            {{end}}
        </div>
    </div>
</div>