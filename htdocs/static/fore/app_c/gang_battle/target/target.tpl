<div test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">   
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

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"集火目标","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>
        {{let gang_list = it1.base_data.match_gang_info}}
        <div w-class="13" w-sid="13" style="position: absolute;width: 461px;height: 386px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
            {{for i,v of gang_list}}
                <div style="width:464px;height:112px;position:relative;margin-bottom:18px">
                    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:112px">
                        {"bgName":"bg_frame23"}
                    </widget>
                    <app_a-widget-pic_other-pic_other style="position: absolute;bottom: -4px;left: 0px;right: 0px;margin: auto;">
                        {"icon":"light_bottom"}
                    </app_a-widget-pic_other-pic_other>

                    {{let img = it1.Pi.pictures[it1.guild_upgrade[v[1][1]].icon_id]}}
                    <img src="{{img}}" alt="" srcset="" style="position: absolute;left: 20px;top:20px;"/>
                    <app_a-widget-text-text style="position:absolute;top: 27px;left: 122px;">
                        {"text":{{v[1][0]}},"textCfg":"heroEquip","fontSize":22}
                    </app_a-widget-text-text>
                    {{let left_hp = it1.guild_battle_guard["left"][v[1][1]].city_gate_hp}}
                    {{let right_hp = it1.guild_battle_guard["right"][v[1][1]].city_gate_hp}}
                    {{let before_hp = it1.guild_battle_guard["before"][v[1][1]].city_gate_hp}}
                    {{let center_hp = it1.guild_battle_guard["center"][v[1][1]].city_gate_hp}}
                    {{let total_hp = left_hp + right_hp + before_hp + center_hp}}
                    {{let progress = ((v[2] / total_hp * 100)).toFixed(2)}}
                    <widget class="shadow" w-tag="app_a-widget-bar-bar5" style="width:250px;height:24px;position:absolute;top: 64px;left: 113px;font-family:mnjsh;">
                        {"progress":{{progress}},"text":{{v[2] + "/" + total_hp}},"color":"#fde7ca","lineHeight":24,"fontSize":18,"width":250,"height":24} 
                    </widget>

                    <widget on-tap="chooseTarget({{v[0]}})" w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;top: 36px;right: 30px;">
                        {"index":{{v[0]}},"index1":{{it1.target_id}}}
                    </widget>
                </div>
            {{end}}
        </div>

        <div class="shadow" style="color: #f3d6af;line-height: 30px;height: 30px;font-family: mnjsh;font-size: 22px;text-align: center;width: 100%;position: absolute;top: 410px;">请选择优先攻击目标</div>

        <app_a-widget-btn-rect style="position:absolute;left:50%;margin-left:-55px;top: 450px" on-tap="sureTarget">
            {"text":"确 定","class":"default","fontsize":24,"width":110,"height":39}
        </app_a-widget-btn-rect>
    </div>
</div>