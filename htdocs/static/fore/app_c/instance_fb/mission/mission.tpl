
{{let mission = it1.instance_drop[Math.floor(it1.guard_id/5+1)][it1.guard_id%5?it1.guard_id%5-1:4] }}
{{let star = it1.instance_record[Math.floor((it1.guard_id-1)/5)][(it1.guard_id-1)%5]}}
{{let career_id = it1.player.career_id}}
{{let Pi = it1.Pi}}

<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2;">
    <div w-class="s8" style="height:710px;margin-top:-370px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{mission.guard_name}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
                    <app_b-widget-star-star style="position:relative;top:9px;white-space: nowrap;transform: scale(1.4);">
                        {"star_light":{{star}},"star_dark":{{3-star}} }
                    </app_b-widget-star-star>  
                </div>
                <div class="shadow7" w-class="s39">
                    {{let list = it1.instance_base}}
                    <div style="width:180px;">3
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        通关时间≤{{list["3"].time}}秒
                    </div>
                    <div style="width:180px;">2
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        通关时间≤{{list["2"].time}}秒
                    </div>
                    <div style="width:180px;">1
                        <app_b-widget-star-star w-class="s40">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
                        成功通关
                    </div>
                </div>
                <div  style="position:absolute;left: 0;top: 0;width:450px;height:386px;">
                    <app-scene-base-scene>
                        {
                            "name":"uiscene",
                            "type":"monster",
                            "module":{
                                "module":{{it.module}},
                                "position":[0,-3,0],
                                "scale":{{it.scale*2.2}},
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
                    {"padding":10,"type":9,"text":"道具掉落","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                <div data-desc="物品"  w-class="s41">
                    <widget w-class="s31" w-tag="app_a-widget-bg_frame-bg" >
                        {"bgName":"bg_frame32"} 
                    </widget>
                   
                    <div w-class="s42">
                        <div data-desc="首通奖励" style="position:absolute;top:16px;left:0;font-size:12px;width: 140px;">
                            <div w-class="s45">
                                <widget w-class="s46" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"other_1"} 
                                </widget>
                                <span w-class="s47" class="shadow8">首通奖励</span>
                                <widget w-class="s46" w-tag="app_a-widget-pic_other-pic_other">{"icon":"other_1"} 
                                </widget>
                            </div>
                            <div style="overflow:hidden;box-sizing: border-box;position:relative;left:-5px;top:30px;text-align:center">
                                <div style="width: 100%;overflow-x: auto;overflow-y: hidden;white-space:nowrap">
                                    {{for i, v of mission.first_award}}
                                    {{let id = v[0] === "money" ? 100001 : v[0] === "diamond" ? 100002 : v[0]}}
                                    {{let prop = Pi.sample[id]}}
                                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                    {{let url = Pi.pictures[icon]}}
                                    <div data-desc="物品" on-tap='propInfoShow({{id}})' style="position:relative;display:inline-block;margin:10px 5px 0;height:60px;width:60px;">
                                        <app_a-widget-prop-base >
                                            {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count": "none","name":"none","bg":0}
                                        </app_a-widget-prop-base>
                                    </div>
                                   
                                    {{end}}
                                </div>
                            </div>
                        </div>
                        <div data-desc="概率掉落" style="position:absolute;top:16px;left:209px;font-size:12px;width:180px;">
                            <div w-class="s45">
                                <widget w-class="s46" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"other_1"} 
                                </widget>
                                <span w-class="s47" class="shadow8">概率掉落</span>
                                <widget w-class="s46" w-tag="app_a-widget-pic_other-pic_other">{"icon":"other_1"} 
                                </widget>
                            </div>
                            <div style="overflow:hidden;position: absolute;width: 100%; white-space: nowrap; bottom: 90px;left:-5px;top:30px;height:70px">
                                <div style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 88px;text-align:center">
                                    {{for i, v of mission.show_drop}}
                                    {{let prop = Pi.sample[v]}}
                                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                    {{let url = Pi.pictures[icon]}}
                                    <div data-desc="物品" on-tap='propInfoShow({{v}})' style="position:relative;display:inline-block;margin:10px 5px 0;height:60px;width:60px;">
                                        <app_a-widget-prop-base >
                                            {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count": "none","name":"none","bg":0}
                                        </app_a-widget-prop-base>
                                    </div>
                                    {{end}}
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                {{let count = it1.vip_advantage[it1.player.vip].instance_times + it1.vip_buy_times - it1.use_times }}
                <widget on-tap="sweep({{it1.chapter_id}},{{it1.guard_id}})" w-class="s37" w-tag="app_a-widget-btn-rect" >
                    {"class":{{(star >= 3 && count > 0) ? "hl" : "disabled" }},"fontsize":24,"color":"","text":"扫 荡","width":116,"height":45} 
                </widget>
        
                <widget  on-tap='challenge({{it1.chapter_id}},{{it1.guard_id}})' w-class="s38" w-tag="app_a-widget-btn-rect" >
                    {"guide":"instance_ch","class":{{count > 0 ? "default" : "disabled" }},"fontsize":24,"color":"","text":"挑 战","width":116,"height":45} 
                </widget>
            </div>
        </div>
        
        
            
        <widget style="bottom: -14px;position: absolute;left: 3%;width: 94%;" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>