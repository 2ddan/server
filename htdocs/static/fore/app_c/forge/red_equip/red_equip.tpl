<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;-webkit-text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let equip_evolution = _get("cfg/c/equip_evolution").exports.equip_evolution}}
    {{let attribute_config = _get("cfg/c/attribute_config").exports.attribute_config}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let redId = it1.redId}}
    {{let career_id = player.career_id}}
    {{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
    {{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}

    {{for i, v of it1.redId}}
    {{let prop = it1.redEquipPos[v]?it1.redEquipPos[v].prop:""}}
    {{let icon = prop ? prop.module[prop.career_id.indexOf(career_id)][0] : ""}}
    {{let img = prop ? Pi.pictures[icon] : ""}}
    {{let level = it1.redEquipPos[v] ? (prop.level) : it1.equip_lv}}
    <div style="width:88px;height:88px;position:absolute;top:{{i%5  * 119 + 75}}px;{{i<5?'left:18':'right:18'}}px;z-index:1">
        <app_a-widget-prop-equip on-tap='selectRedEquip("{{i+','+v}}")' style="width:52px;height:52px;position: absolute;">
            {"prop":{{prop}},"url":{{img}},"width":88,"height":88,"type":"equip","solt":{{i-0+1}},"level":{{level}},"tip_keys":[{{"equip.red."+v}}],"quality":{{prop ? '' : 6}},"text":"未锻造","bottom":22,"bg":1}
        </app_a-widget-prop-equip>
        {{if prop && it1.level_up_arr[i] == 1}}
        <div class="successAnim" style="position: absolute;z-index: 2;transform: scale(0.92);left: -21px;top: -23px;pointer-events: none;"></div>
        {{end}}
        {{if i == it1.redIndex}}
        <div w-class="equip_select" style="left: -3px;top: -6px;z-index: 2;pointer-events: none;width: 95px;height: 95px;"></div>
        {{end}}

        {{if prop}}
            {{let totalDiam = 0}}
            {{: totalDiam = (friend_battle.equip_diam[i][0][1] || 0) + (friend_battle.equip_diam[i][1][1] || 0) + (friend_battle.equip_diam[i][2][1] || 0) + (friend_battle.equip_diam[i][3][1] || 0)}}
            {{if totalDiam >= equip_level_limit[i-0+1].gem_effects}}
            <div class="equipBgAnim" style="position: absolute;z-index: 3;pointer-events: none;left: -20px;top: -24px;transform: scale(0.9);"></div>
            {{end}}
            {{if friend_battle.equip_star[i] >= equip_level_limit[i-0+1].star_effects}}
            <div class="equipBorderAnim" style="position: absolute;z-index: 3;pointer-events: none;left: -20px;top: -24px;transform: scale(0.9);"></div>
        {{end}}
    {{end}}
    </div>
    {{end}}

    {{let prop_next = ''}}
    <div style="line-height:normal;position:relative;width:310px;height:470px;left:0;top:70px;bottom:0;right:0;margin:auto;margin-top:0;padding:10px;color:#FFF;">
        <div w-class="forge_equip_bg" style="top: 0px;z-index: 1;left: 22px;"></div>
        <div w-class="forge_stage" style="bottom:185px;left:0px;right:0px;margin:0 auto"></div>

        {{let obj = it1.redEquipPos[it1.red_id]}}
        {{let prop_1 = obj?obj.prop:Pi.sample[it1.red_id]}}
        {{let lev = obj ? prop_1.level : prop_1.level[1]}}
        {{let icon_1 = prop_1.module[prop_1.career_id.indexOf(career_id)][0]}}
        {{let img_1 = Pi.pictures[icon_1]}}

        {{let next_level = equip_evolution[prop_1.id][lev].next_level}}
        
        {{let level1 = obj ? next_level : it1.equip_lv}}
        <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 101px;left: 129px;">
            {"prop":{{ prop_1 }},"url":{{img_1}},"solt":{{ prop_1.slot}},"type":"equip","width":88,"height":88,"type":"equip","bottom":22,"level":{{level1}},"bg":1}
        </app_a-widget-prop-equip>

       {{:prop_next = equip_evolution[prop_1.id][next_level]}}
       {{if !!prop_next}}    
        <divs class="little_tips_bg" style="position:absolute;top:670px;left:15px;right:0px;margin:0 auto;font-size:18px;color:{{player.level >= level1 ? '#51e650' : '#ff0f0f'}};font-family:mnjsh;width: 145px;line-height: 24px;padding-left: 25px;">
            <div class="remind" style="position:absolute;top:2px;left:0px;"></div>
            {{level1+"级可锻造神装"}}
        </div> 
        {{end}}
        {{if !obj}}
            {{let p_2 = Pi.sample[it1.forge_cost.cost[0]]}}
            {{let img_2 = Pi.pictures[p_2.icon]}}
            {{let flag_0 = (it1.forge_cost["total"] >= it1.forge_cost.cost[1])}}

            <div class="cost_bg" style="position:absolute;top: 532px;left: 0px;right:0px;margin:0 auto">
                
                <img src={{img_2}} on-tap='gotoGetWay("{{it1.forge_cost.cost[0]}}")' style="position: absolute;z-index: 2;top:4px;width: 42px;left: 0;right: 0;margin: 0 auto;"/>
                <div style="width: 100%;height: 18px;position: absolute;bottom: 18px;left: -5px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;z-index:2"><span style="{{if !flag_0}}color:red;{{end}}">{{it1.forge_cost["total"]}}</span>/{{it1.forge_cost.cost[1]}}</div>
            </div>

            <app_a-widget-btn-rect on-tap='forgeRed()' style="position: absolute;top: 614px;left: 0;right: 0;margin: 0 auto;">{"text":"锻 造","class":{{flag_0 ? "hl" : "disabled"}},"fontSize":24,"tip_keys":[{{"equip.red."+it1.red_id}}],"width":113,"height":46}</app_a-widget-btn-rect>
        {{elseif !it1.forge_cost.cost[0]}}  
            <div style="width:100%;height:30px;position:absolute;bottom:-96px;left:0;text-align:center;line-height:30px;font-size:18px;color: #e42121;font-family: mnjsh;">
                已到最高等级
            </div>
        
        {{else}}
 
        {{let p_3 = Pi.sample[it1.forge_cost.cost[0]]}}
        {{let img_3 = Pi.pictures[p_3.icon]}}
        <div class="cost_bg" style="position:absolute;top: 532px;left: 0px;right:0px;margin:0 auto">
            <img src={{img_3}} on-tap='gotoGetWay("{{it1.forge_cost.cost[0]}}")' style="position: absolute;z-index: 2;top:4px;width: 42px;left: 0;right: 0;margin: 0 auto;"/>
                
            {{let flag = (it1.forge_cost['total'] > it1.forge_cost.cost[1])}}
            <div style="width:100%;height: 18px;position: absolute;bottom: 18px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;z-index:2"><span style="{{if !flag}}color:red;{{end}}">{{it1.forge_cost["total"]}}</span>/{{it1.forge_cost.cost[1]}}</div>
        </div>

        

        <app_a-widget-btn-rect on-tap='gradeUpRed()' style="position: absolute;top: 614px;left: 0;right: 0;margin: 0 auto;">{"text":"锻 造","class":"hl","fontSize":24,"tip_keys":[{{"equip.red."+it1.red_id}}],"width":113,"height":46}</app_a-widget-btn-rect>
        {{end}}

        <div style="height: 191px;position: absolute;bottom: 10px;left: 15px;right: 10px;">
            <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
            <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
            <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

            {{let redEquip = Pi.sample[it1.red_id]}}
            <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">进阶效果</div>
            {{let p = equip_evolution[prop_1.id][prop_1.level]}}
            <div style="position:absolute;width:100%;height:90%;top:20px;font-size:16px;color:#dfd6ab;text-align:left;">
                <div style="width:100%;height:30%;top:0px;position:absolute;">
                    <app_a-widget-title-single style="position:relative;left: 105px;width: 95px;">{"text":"基础属性","wear":1,"type":9}</app_a-widget-title-single>
                    {{if obj}}
                        {{for m_base, n_base of prop_1.base_attr}}
                        {{if m_base !== "erl_type" && !!prop_next}}
                        {{let next_base = Math.round(n_base[1]/p.base_attr[n_base[0]]*prop_next.base_attr[n_base[0]])}}
                        <div style="position:absolute;width:100%;height:20px;line-height:20px;bottom: 8px;">
                            <span style="line-height:20px;position:absolute;left:30px;font-size:16px;color:#ffd8a6;top:0px;text-align: left;padding-left: 15px;">
                                {{attribute_config[n_base[0]]}}+{{Math.round(n_base[1])}}
                            </span>
                            <div class="attr_arrow" style="top: -5px;left: 29px;right: 0px;margin: 0 auto;"></div>
                            <span style="width:40%;line-height:20px;position:absolute;left:194px;font-size:16px;color:#51e650;top:0px;text-align:left;">
                                {{next_base}}
                                <img src="../images/up_up.png" style="margin-left: 3px;"/>
                            </span>
                        </div>
                        {{else}}
                        <div style="position:absolute;width:100%;height:20px;line-height:20px;bottom: 8px;justify-content: center;display:flex;">
                            <span style="line-height:20px;font-size:16px;color:#ffd8a6;top:0px;text-align:center;">
                                {{attribute_config[n_base[0]]}}+{{Math.round(n_base[1])}}
                            </span>
                        </div>                        
                        {{end}}
                        {{end}}
                    {{else}}
                        <div style="position:absolute;width:100%;height:20px;line-height:20px;bottom: 8px;">
                            <span style="line-height:20px;position:absolute;left:30px;font-size:16px;color:rgb(81, 230, 80);top:0px;text-align: left;padding-left:15px">
                                {{attribute_config[redEquip.base_num[0]]}}+{{Math.round(redEquip.base_num[1] * redEquip.base_float[0])}}
                            </span>
                        </div>
                    {{end}}
                </div>
                
                <div style="width:100%;height:70%;top:26%;position:absolute;">
                    <app_a-widget-title-single style="position:relative;left: 105px;width: 95px;margin-bottom: 3px;">{"text":"附加属性","wear":1,"type":9}</app_a-widget-title-single>
                    {{if obj}}
                        {{for m_add, n_add of prop_1.addition_attr}}
                        {{if m_add !== "erl_type" && !!prop_next}}
                        {{let next_add = Math.round(n_add[1]/p.addition_attr[n_add[0]]*prop_next.addition_attr[n_add[0]])}}
                        <div style="position:relative;display:inline-block;width:100%;height:20px;line-height:20px;">
                            <span style="line-height:20px;position:absolute;left:30px;font-size:16px;color:#ffd8a6;top:0px;text-align: left;padding-left: 15px;">
                                {{attribute_config[n_add[0]]}}+{{n_add[1]}}
                            </span>
                            <div class="attr_arrow" style="top: -5px;left: 29px;right: 0px;margin: 0 auto;"></div>
                            <span style="width:40%;line-height:20px;position:absolute;left:194px;font-size:16px;color:#51e650;top:0px;text-align:left;">
                                {{next_add}}
                                <img src="../images/up_up.png" style="margin-left: 3px;"/>
                            </span>
                        </div>
                        {{else}}
                        <div style="position:relative;display:flex;width:100%;height:20px;line-height:20px;justify-content: center;">
                            <span style="line-height:20px;font-size:16px;color:#ffd8a6;top:0px;text-align:center;">
                                {{attribute_config[n_add[0]]}}+{{n_add[1]}}
                            </span>
                        </div>                        
                        {{end}}
                        {{end}}
                    {{else}}
                        {{for m, n of redEquip.addition_num}}
                        {{if m !== "erl_type"}}
                        <div style="position:relative;display:inline-block;width:100%;height:20px;line-height:20px;">
                            <span style="line-height:20px;position:absolute;left:30px;font-size:16px;color:rgb(81, 230, 80);top:0px;text-align: left;padding-left: 15px;">
                                {{attribute_config[n[0]]+"+???" + "("+Math.floor(n[1] * redEquip.addition_float[0])+"-"+Math.floor(n[1] * redEquip.addition_float[1]) + ")"}}
                            </span>
                        </div>
                        {{end}}
                        {{end}}
                    {{end}}
                </div>
            </div> 
        </div>
    </div>

    <div w-class="star_soul" on-tap="openChange" style="position:absolute;right:112px;top:60px;z-index:1">
        <app-widget-text-text style="position:absolute;bottom:0px;left:6px;">
            {"text":"材料转化","fontSize":18,"textCfg":"iconCircle","space":-4}
        </app-widget-text-text>
    </div>
</div>