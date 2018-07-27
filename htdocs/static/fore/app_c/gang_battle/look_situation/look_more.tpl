<div style="position: absolute;width: 100%;height: 100%;z-index: 4;" w-sid="2">   
    <div w-class="3" w-sid="3" style="height: 560px;">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4" style="height: 560px;">{"bgName":"bg_frame26"} 
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

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"查看战况","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>
        {{let arr = ["left", "right", "before", "center"]}}
        <div style="position: absolute;width: 461px;height: 524px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
            {{for i,v of it.list}}
                <div style="width:464px;height:112px;position:relative;margin-bottom:18px">
                    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:112px">
                        {"bgName":"bg_frame23"}
                    </widget>
                    <app_a-widget-pic_other-pic_other style="position: absolute;bottom: -4px;left: 0px;right: 0px;margin: auto;">
                        {"icon":"light_bottom"}
                    </app_a-widget-pic_other-pic_other>

                    <app_a-widget-text-text style="position:absolute;top: 27px;left: 16px;">
                        {"text":{{it1.gate_name[v[0] - 1].name}},"textCfg":"heroEquip","fontSize":22}
                    </app_a-widget-text-text>
                    {{let city_gate = it1.guild_battle_guard[arr[v[0] - 1]]}}
                    {{let total_p = it1.guild_battle_guard[arr[v[0] - 1]][it.gang_level].config_person_num}}
                    <div style="position: absolute;width: 80px;height: 23px;display: flex;top: 70px;left: 16px;justify-content: space-between;">
                        <img src="../images/person.png" alt="" srcset="" />
                        <div style="line-height: 23px;color: #f3d6af;">{{v[2].length}}/{{total_p}}人</div>
                    </div>
                    {{let has_count = 0}}
                    {{let total_count = city_gate[it.gang_level].everyone_guard_num * v[2].length}}
                    {{for m, n of v[2]}}
                        {{: has_count = has_count + n[1]}}
                    {{end}}
                    <div style="position: absolute;width: 200px;height: 23px;top: 70px;left: 132px;font-family: mnjsh;color: #f3d6af;font-size: 20px;line-height: 23px;text-align: center;">防守次数: {{has_count + "/" + total_count}}</div>

                    {{let total_hp = city_gate[it.gang_level].city_gate_hp}}
                    {{let progress = ((v[1] / total_hp * 100)).toFixed(0)}}
                    <widget class="shadow" w-tag="app_a-widget-bar-bar5" style="width:250px;height:24px;position:absolute;top: 30px;left: 113px;font-family:mnjsh;">
                        {"progress":{{progress}},"text":{{v[1] + "/" + total_hp}},"color":"#fde7ca","lineHeight":24,"fontSize":18,"width":250,"height":24} 
                    </widget>
                    <div style="position: absolute;width: 83px;height: 100px;right: 10px;top: 10px;">
                        {{if v[3]}}
                        <app_a-widget-pic_text-pic_text style="position: absolute;top: 23px;left: 3px;">
                            {"icon":"break_down","width":74,"height":52}
                        </app_a-widget-pic_text-pic_text>
                        {{else}}
                        <app_a-widget-pic_text-pic_text style="position: absolute;top: 23px;left: 3px;">
                            {"icon":"fail_break","width":74,"height":52}
                        </app_a-widget-pic_text-pic_text>                        
                        {{end}}
                    </div>

                </div>
            {{end}}
        </div>
    </div>
</div>