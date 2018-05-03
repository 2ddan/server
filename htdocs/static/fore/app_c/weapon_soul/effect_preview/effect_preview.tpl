<div style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:2">
        <app_b-widget-title-title style="top:0;z-index:9;position:absolute">
            {"text":"赋灵","coin":["money","diamond"],"left":56,"top":11}
        </app_b-widget-title-title>
        <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goclose"></div>
        {{let text = ["火灵","风灵","水灵","雷灵"]}}
        <div style="position:absolute;width:540px;height:706px;top:112px;left:50%;margin-left:-270px;">
            <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0;width:492px;height: 701px;">
                {"bgName":"bg_frame21"} 
            </app_a-widget-bg_frame-bg>
            <app_a-widget-line-line style="position: absolute;left: 0;top: -15px;z-index:3">
                {"line":"line_7"} 
            </app_a-widget-line-line>
            <div w-class="bg_1">
                
                <app_c-weapon_soul-weapon_module-weapon_module style="top:95px;">
                    {"effect":{{it1.weapon_soul_base[it1.eff_index].effect}}}
                </app_c-weapon_soul-weapon_module-weapon_module>
    
                {{let pos = [[26,104],[361,104],[26,331],[361,331]]}}
                {{for i, v of it1.level_record}}
                <div w-class="element_bg" style="left:{{pos[i][0]}}px;top:{{pos[i][1]}}px;">
                    <div w-class="element_{{i}}" style="position:absolute;width:91px;height:91px;"></div>

                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:50%;margin-left:-28px;bottom:-35px;">
                        {"icon":"text_bg_2","width":58,"height":27,"text":{{text[i]}},"align":"center","marginLeft":3,"textCfg":"activityBorRed","space":0,"fontSize":18,"top":3,"left":0}
                    </widget>
                </div>
                {{end}}
            </div>
            <div style="position:absolute;width:184px;height:32px;left:50%;margin-left:-92px;top:24px;">
                <widget w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":"name_bg_2","width":184,"height":32,"text":" ","align":"center","marginLeft":3}
                    </widget>
                <div class="shadow" style="position:absolute;width:100%;height:32px;line-height:32px;text-align:center;font-family:mnjsh;font-size:20px;left:0;top:0;color:#fde7ca;">{{it1.weapon_soul_base[it1.eff_index].name}}</div>
            </div>
            <div style="position:absolute;left:24px;top:498px;color:rgb(253, 237, 215);">
                <app_a-widget-bg_frame-bg style="position: absolute;width:492px;height: 191px;">
                    {"bgName":"bg_frame28"} 
                </app_a-widget-bg_frame-bg>
                <widget w-tag="app_a-widget-title-single" style="position:absolute;left:50%;left:186px;top:-18px;line-height:26px;">
                    {"padding":10,"type":9,"width":124,"text":"效果预览","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"","wear":0} 
                </widget>

                <app_a-widget-bg_frame-bg style="position: absolute;left: 2px;top: 114px;width: 492px;height: 65px;">
                    {"bgName":"bg_frame30"} 
                </app_a-widget-bg_frame-bg>

                <div style="position:absolute;height:24px;width:300px;left:100px;top:33px;">
                    <app_a-widget-pic_other-pic_other style="position:absolute;left:-13px;">
                        {"icon":"remind"}
                    </app_a-widget-pic_other-pic_other>
                    <app_a-widget-pic_text-pic_text style="font-family:mnjsh;font-size:16px;font-family:mnjsh;line-height:24px;">
                        {"icon":"little_tips_bg","textCfg":"","width":300,"height":24,"fontSize":20,"text":{{"注灵至"+it1.weapon_soul_base[it1.eff_index].name+"阶段可使武器获得此效果"}},"marginLeft":8}
                    </app_a-widget-pic_text-pic_text>
                </div>
                <div style="position:absolute;height:24px;width:330px;left:80px;top:70px;">
                    <app_a-widget-pic_other-pic_other style="position:absolute;left:-13px;">
                        {"icon":"remind"}
                    </app_a-widget-pic_other-pic_other>
                    <app_a-widget-pic_text-pic_text style="font-family:mnjsh;font-size:16px;font-family:mnjsh;line-height:24px;">
                        {"icon":"little_tips_bg","textCfg":"","width":330,"height":24,"fontSize":20,"text":"当前阶段中所有赋灵星升满即可进入下一阶段","marginLeft":8}
                    </app_a-widget-pic_text-pic_text>
                </div>

                <div style="position:absolute;z-index:3;width:440px;top:104px;height:80px;overflow:hidden;left:26px;">
                    <div style="position:absolute;top:0px;width:100%;height:124%;overflow-y:hidden;overflow-x:auto;white-space:nowrap;z-index:3;top:0px" scroller="1">
                        {{for k, v of it1.weapon_soul_base}}
                        {{if v.class > 0}}
                        <div style="width:70px;height:70px;position:relative;display:inline-block;margin: 0 8.5px;" on-tap="sellectEff({{v.class}})">
                            <app_a-widget-btn-ling style="position:absolute;">
                                {"text":"","width":78,"height":78,"bottom":0,"fontSize":20,"textCfg":"","class":{{it1.eff_index == v.class ? "hl" : "default"}},"fontsize":18}
                            </app_a-widget-btn-ling>
                            <div style="font-size:20px;position:absolute;left:18px;top:18px;font-family:mnjsh;width:44px;white-space:normal">{{v.name}}</div>
                        </div>
                        {{end}}
                        {{end}}
                    </div>
                </div>

                <widget w-tag="app_a-widget-line-line" style="top:187px;left:-5px;">
                    {"line":"line_10"}
                </widget>
            </div>
    
        </div>
    </div>