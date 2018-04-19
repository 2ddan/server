{{let Pi = it1.Pi}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let career_id  = it1.player.career_id}}
{{let welfare = it1.instance_welfare[it1.boss_id]}}
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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{welfare.name.replace(/等级/g,"Lv")}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
                <img src="app_c/equip_fb/images/role_bg.png" style="position:absolute;left:0;top: 2px;width: 100%;"/>
                <div data-desc="星星" style="width: 110px;height: 32px;text-align: center;position: absolute;left:50%;top:37px;margin-left:-55px;">
                    <widget class="shadow8" w-class="s44" w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":"name_bg_2","width":184,"height":32,"text":{{it.name}}} 
                    </widget>
                </div>

                <div  style="position:absolute;left: 0;top: 0;width:450px;height:386px;">
                    <app-scene-base-scene>
                        {
                            "name":"uiscene",
                            "type":"monster",
                            "module":{
                                "module":{{it.module}},
                                "position":[-0.5,-3,0],
                                "scale":1,
                                "rotate":[0,0,0],
                                "scene_eff":"eff_fb01"
                            },
                            "width":450,
                            "height": 386
                        }
                    </app-scene-base-scene> 
                </div>
            </div>
            <div style="position: absolute;top: 416px;width: 100%;height: 258px;">
                <widget w-class="s4" w-tag="app_a-widget-title-single" style="top:10px;">
                    {"padding":10,"type":9,"text":"魔王奖励","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                <div data-desc="物品"  w-class="s41">
                    <widget w-class="s31" w-tag="app_a-widget-bg_frame-bg" >
                        {"bgName":"bg_frame32"} 
                    </widget>
                   
                    <div w-class="s42" data-desc="奖励">
                        <div style="overflow:hidden;box-sizing: border-box;position:relative;left:-5px;top:12px;text-align:center">
                            <div style="width: 100%;overflow-x: auto;overflow-y: hidden;white-space:nowrap">
                                {{let data = welfare.show_drop}}
                                {{for i, v of data}}
                                    {{let id = v === "money" ? 100001 : v === "diamond" ? 100002 : v}}
                                    {{let prop = Pi.sample[id]}}
                                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                    {{let url = Pi.pictures[icon]}}
                                    {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                                    <div data-desc="物品" on-tap='propInfoShow({{id}})' style="position:relative;display:inline-block;margin:10px 5px 0;height:76px;width:76px;">
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
                    </div>
                </div>
                
                <widget  on-tap='challengeBoss' w-class="s38" w-tag="app_a-widget-btn-rect" style="right:50%;margin-right:-58px;">
                    {"class":{{it1.instance_welfare[it1.boss_id].limit_guard > it1.instance_point ? "disabled" : "default" }},"fontsize":24,"color":"","text":"挑 战","width":116,"height":45} 
                </widget>
            </div>
        </div>
        
        
            
        <widget style="bottom: -14px;position: absolute;left: 3%;width: 94%;" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>