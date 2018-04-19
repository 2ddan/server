{{let equip_fb_data = it1.equip_fb_data}}
{{let Pi = it1.Pi}}
{{let mission = equip_fb_data[it1.index][(it1.mission_id-1)%5]}}
{{let equip_fb_star = it1.equip_fb_star}}
{{let star = equip_fb_star[it1.index-1][(it1.mission_id-1)%5]}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let career_id = it1.player.career_id}}


<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2;">
    <div w-class="s8" style="height:710px;margin-top:-355px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{mission.name.replace(/,/g,"/")}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>

        

        <div w-class="s13" style="height:676px;opacity:1">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame26"} 
            </widget>
            <div w-class="s34" class="shadow7">
                <widget w-class="s35" w-tag="app_a-widget-line-line" >
                    {"line":"line_13"} 
                </widget>
                <widget w-class="s36" w-tag="app_a-widget-line-line" >
                    {"line":"line_13"} 
                </widget>
                <img src="../images/role_bg.png" style="position:absolute;left:0;top: 2px;width: 100%;"/>
                <div data-desc="星星" style="width: 110px;height: 32px;text-align: center;position: absolute;right:-1px;top:10px;">
                    <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;">
                        {"icon":"little_tips_bg","text":" ","width":110,"height":32,"top":2} 
                    </widget>
                    <app_b-widget-star-star style="position:relative;top:9px;white-space: nowrap;transform: scale(1.4);">
                        {"star_light":{{star}},"star_dark":{{3-star}} }
                    </app_b-widget-star-star>  
                </div>
                <div class="shadow7" w-class="s39">
                    {{let list = it1.equip_fb_base}}
                    <div style="width:180px;">1
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        成功通关
                    </div>
                    <div style="width:180px;">2
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        通关时间≤{{list["2"].time}}秒
                    </div>
                    <div style="width:180px;">3
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        通关时间≤{{list["3"].time}}秒
                    </div>
                </div>
                <div  style="position:absolute;left: 0;top: 0;width:450px;height:386px;">
                    <app-scene-base-scene>
                        {
                            "name":"uiscene",
                            "type":"monster",
                            "module":{
                                "module":{{it}},
                                "position":[-0.5,-3,0],
                                "scale":0.7,
                                "rotate":[0,0,0]
                            },
                            "width":450,
                            "height": 386
                        }
                    </app-scene-base-scene> 
                </div>
            </div>
            <div style="position: absolute;top: 416px;width: 100%;height: 258px;">
                <widget w-class="s4" w-tag="app_a-widget-title-single" style="top:10px;">
                    {"padding":10,"type":9,"width":124,"text":"装备掉落","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                <div data-desc="物品"  w-class="s41">
                    <widget w-class="s31" w-tag="app_a-widget-bg_frame-bg" >
                        {"bgName":"bg_frame32"} 
                    </widget>
                    <div w-class="s42">
                        {{for i, v of mission.show_drop}}
                        {{let prop = Pi.sample[v]}}
                        {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                        {{let url = Pi.pictures[icon]}}
                        {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                        <div data-desc="物品" on-tap='propInfoShow({{v}})' style="position:relative;display:inline-block;margin:10px 10px 0;height:76px;width:76px;">
                            <app_a-widget-prop-base >
                                {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count": "none","name":"none","bg":1}
                            </app_a-widget-prop-base>
        
                            {{if prop.type == "equip"}}
                            <div data-desc="装备等级" w-class="s21" style="bottom:7px;" >{{"Lv"+prop.level[1] || 20}}</div>
                            {{end}}
        
                            <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                                {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                            </app_a-widget-text-text>
                        </div>
                        
                        {{end}}
                    </div>
                    

                </div>

                {{let count = it1.vip_advantage[it1.player.vip].equip_instance_times + it1.vip_buy_times - it1.use_times }}
                {{let first = it1.equip_fb_star[it1.index-1][(it1.mission_id-1)%5]}}      
                <widget on-tap="sweep({{mission.level_limit}}" w-class="s37" w-tag="app_a-widget-btn-rect" >
                    {"class":{{(star >= 3 && count > 0) ? "hl" : "disabled" }},"fontsize":24,"color":"","text":"扫 荡","width":116,"height":45} 
                </widget>
        
                <widget  on-tap='challenge({{mission.level_limit}})' w-class="s38" w-tag="app_a-widget-btn-rect" >
                    {"guide":"equip_ch","class":{{(count > 0 || first === 0) ? "default" : "disabled" }},"fontsize":24,"color":"","text":"挑 战","width":116,"height":45} 
                </widget>
            </div>
        </div>
        
        
            
        <widget style="bottom: -14px;position: absolute;left: 3%;width: 94%;" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>