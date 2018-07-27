{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let bag = appCfg.bag}}
{{let Common = _get("app/mod/common").exports.Common}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}
{{let type = friend_battle.equip_set}}
{{let lineHeight = 85}}
{{let lineWidth = 95}}
{{let player = appCfg.player}}
{{let career_id = player.career_id}}
<div style="width:100%;height:100%;position:relative;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
    <div class="cost_bg" style="position:absolute;top: 600px;left: 0px;right:0px;margin:0 auto"></div>
    
    {{for i, v of type}}
        {{let module = v ? (v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0]): ""}}
        {{let img3 = v?Pi.pictures[module]:""}}
        <div style="width:98px;height:98px;position:absolute;top:{{i%5  * 119 + 75}}px;{{i<5?'left:18':'right:18'}}px">
            <app_a-widget-prop-equip {{if v}}on-tap="select('{{i-0+1}}')"{{end}} style="z-index:2;">
                {"select":1,
                "guide":1,
                "prop":{{v?v:0}},
                "width":98,
                "height":98,
                "bg":{{!v ? 1 : '' }},
                "url":{{img3}},
                "solt":{{i-0+1}},
                "type":"equip",
                "lock":{{player.level >= equip_level_limit[i-0+1].open_level ? 0 : equip_level_limit[i-0+1].open_level}},
                "tip_keys":[{{"equip.star."+i}}],
                "bottom":{{!v ? 18 : ''}}
                }
            </app_a-widget-prop-equip>
            {{if v}}
                <div style="font-size: 18px;z-index:3;pointer-events:none;height: 20px;position: absolute;z-index: 3;bottom: 12px;right: 10px;width:50px;">
                    <div style="font-size: 20px;text-align: right;height:20px;position: absolute;top:0px;right: 20px;color:#fbce35;letter-spacing: -1px;line-height:20px;">{{friend_battle.equip_star[i]}}</div>
                    <div class="star_{{Math.floor(friend_battle.equip_star[i]/3) + 1 >= 5 ? 5 : Math.floor(friend_battle.equip_star[i]/3) + 1}}" style="position: absolute;;width:20px;height:20px;right:0px;"></div>
                </div>

                {{if (it1.index-0-1) == i}}
                    <div w-class="equip_select" style="left: -4px;top: -6px;z-index: 2;pointer-events: none;"></div>
                {{end}}
                {{if (it1.index-0-1) == i && it1.isOkStar}}
                <div class="successAnim" style="position: absolute;z-index: 2;transform: scale(1);left: -15px;top: -18px;pointer-events: none;"></div>
                {{end}}

                {{let totalDiam = 0}}
                {{: totalDiam = (friend_battle.equip_diam[i][0][1] || 0) + (friend_battle.equip_diam[i][1][1] || 0) + (friend_battle.equip_diam[i][2][1] || 0) + (friend_battle.equip_diam[i][3][1] || 0)}}
                {{if totalDiam >= equip_level_limit[i-0+1].gem_effects}}
                <div class="equipBgAnim" style="position: absolute;z-index: 3;pointer-events: none;left: -16px;top: -19px;"></div>
                {{end}}
                {{if friend_battle.equip_star[i] >= equip_level_limit[i-0+1].star_effects}}
                <div class="equipBorderAnim" style="position: absolute;left: -16px;top: -19px;z-index: 3;transform: scale(1);pointer-events: none;"></div>
                {{end}}
            {{end}}
        </div>
    {{end}}

    {{let eq = type[it1.index-1]}}
    <div style="line-height:normal;position:relative;width:310px;height:470px;left:0;top:70px;bottom:0;right:0;margin:auto;margin-top:0;padding:10px;color:#FFF;">
        <div w-class="forge_equip_bg" style="top: 27px;z-index: 1;left: 15px;right: 0;margin: 0 auto;"></div>
        <div w-class="forge_stage" style="bottom:140px;left:0px;right:0px;margin:0 auto"></div>
        {{let equipic = eq ? (eq.module[eq.career_id.indexOf(career_id)][0] ? eq.module[eq.career_id.indexOf(career_id)][0] : eq.module[eq.career_id.indexOf(career_id)][0]): ""}}
        <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 124px;left: 120px;">
            {"select":1,
            "guide":1,
            "width":98,
            "height":98,
            "bg":{{eq ? '' : 1}}
            "prop":{{eq?eq:0}},
            "url":{{eq?Pi.pictures[equipic]:""}},
            "solt":{{it1.index}},
            "type":"equip"}
        </app_a-widget-prop-equip>
        
        <div w-class="star_soul" on-tap="stars" style="position:absolute;right:10px;top:0;z-index:1">
            <app-widget-text-text style="position:absolute;bottom:0px;left:6px;">
                {"text":"星宿加成","fontSize":18,"textCfg":"iconCircle","space":-4}
            </app-widget-text-text>
            <app-widget-tip-tip style="right:0px">
                {"tip_keys":["equip.star.xx"]}
            </app-widget-tip-tip>
        </div>

        <div w-class="pic_equipstar_effect" on-tap="starsAchieve" style="position:absolute;left:10px;top:0;z-index:1">
            <app-widget-text-text style="position:absolute;bottom:0px;left:6px;">
                {"text":"星宿成就","fontSize":18,"textCfg":"iconCircle","space":-4}
            </app-widget-text-text>
        </div>

        {{let attrOBJ = it1.star[it1.starGrade].attr}}
        <div style="height: 191px;position: absolute;top:335px;left: 15px;right: 10px;">
            <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
            <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
            <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

            <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">装备升星</div>

            <div style="width:100%;height:15%;position:absolute;text-align:center;top:35px;">
                <app_c-forge-star-star_anim>{"star":{{it1.getStar}},"effect":{{equip_level_limit[it1.index].stars_effects}},"center":1}</app_c-forge-star-star_anim>
            </div>

            <span style="width:40%;height:40px;line-height:20px;position:absolute;left:13px;font-size:15px;color:#ffd8a6;top:79px;text-align:center;">
                {{if attrOBJ}}
                    {{for k, v in attrOBJ}}
                    <div style="text-align: left;padding-left: 5px;white-space: nowrap;">{{"装备"+it1.attriCfg[k]}}+{{Common.numberCarry(v,10000)}}</div>
                    <div style="text-align: left;padding-left: 5px;white-space: nowrap;">{{"装备全属性"}}+{{Math.floor(it1.star[it1.starGrade].attr_ratio* 100)}}%</div>
                    {{end}}
                {{else}}
                    <div style="text-align: center;line-height:40px">当前无任何属性</div>
                {{end}}
            </span>

            <div class="attr_arrow" style="top: 86px;left: 0px;right: 0px;margin: 0 auto;"></div>

            <span style="width:40%;height:40px;line-height:20px;position:absolute;right:13px;font-size:15px;color:#51e650;top:79px;text-align:center;">
                {{if it1.star[it1.starGrade-0+1]}}
                    {{let attrOBJAdd = it1.star[it1.starGrade-0+1].attr}}
                    {{if eq }}
                        {{for j, o in attrOBJAdd}}
                            {{if it1.attriCfg[j]}}
                                <div style="text-align: left;padding-left: 5px;white-space: nowrap;">{{"装备"+it1.attriCfg[j]}}+{{Common.numberCarry(o,10000)}}</div>
                                <div style="text-align: left;padding-left: 5px;white-space: nowrap;">{{"装备全属性"}}+{{Math.floor(it1.star[it1.starGrade-0+1].attr_ratio* 100)}}%</div>
                            {{end}}
                        {{end}}
                    {{end}}
                {{else}}
                <div style="text-align:center;line-height:40px">已升星到最高等级</div>
                {{end}}

            </span>
            {{if it1.star[it1.starGrade].soul}}
            <div class="shadow6 little_tips_bg" style="left:0px;right:0px;margin:0 auto;top: 148px;color: #ffd8a6;font-family: mnjsh;font-size: 18px;line-height:24px;text-align:center;">
                <span class="remind" style="left:-5px;top:1px"></span>
                升星成功可获得{{it1.star[it1.starGrade].soul}}起灵点
            </div>
            {{end}}
        </div>
    </div>
    {{if eq && it1.star[it1.starGrade].cost.length > 0}}
    {{let flag = 1}}
        {{let lack_id = -1}}
        <div style="position: absolute;width: 100%;height: 56px;top: 607px;text-align: center;">
            {{let cost = it1.star[it1.starGrade].cost}}
            {{for i, v of cost}}
                {{let p = Common.getBagPropById(v[0])}}
                {{if !p}}
                    {{: flag = 0}}
                    {{: p = Pi.sample[v[0]]}}
                    {{: lack_id = v[0]}}
                {{end}}
                {{let img2 = checkTypeof(p,"Array") ? Pi.pictures[p[1].icon] : Pi.pictures[p.icon] }}
                {{let sid = checkTypeof(p,"Array") ? p[1].sid : p.sid}}
                <div style="width:120px;height:100%;position:relative;display:inline-block;white-space: nowrap;">
                    
                    <img src={{img2}} on-tap='gotoGetWay("{{sid}}")' style="position: absolute;z-index: 2;top: 0px;width: 42px;left: 0;right: 0;margin: 0 auto;"/>
                    
                    {{let color = v[1] > ( checkTypeof(p,"Array") ? bag[p[0]].count : 0) ? "#ff0000" : ""}}
                    <div style="width: 100%;height: 18px;position: absolute;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;bottom: -5px;z-index:2">
                        <span style="color:{{color}}">{{checkTypeof(p,"Array") ? Common.numberCarry(bag[p[0]].count,10000) : 0}}</span>/{{v[1]}}</div>
                    {{if v[1] > (checkTypeof(p,"Array") ? bag[p[0]].count : 0)}}
                    {{: flag = 0}}
                    {{: lack_id = v[0]}}
                    {{end}}
                </div>
            {{end}}
        </div>


        {{if flag && it1.star[it1.starGrade].money <= player.money}}
        <app_a-widget-btn-rect on-tap="star([1])" style="position: absolute;top: 682px;left: 0;right: 0;margin: 0 auto;">{"text":"升 星","class":"hl","fontSize":24,"tip_keys":[{{"equip.star."+(it1.index-1)}}],"width":113,"height":46}</app_a-widget-btn-rect>
        {{else}}
        <app_a-widget-btn-rect on-tap="star([0,{{lack_id}}])" style="position: absolute;top: 682px;left: 0;right: 0;margin: 0 auto;">{"text":"升 星","class":"disabled","fontSize":24,"tip_keys":[{{"equip.star."+(it1.index-1)}}],"width":113,"height":46,"color":"#cfcfcf"}</app_a-widget-btn-rect>
        {{end}}

        {{ let color1 = it1.star[it1.starGrade].money > player.money  ? "#f00" : "#fff"}}
        <div style="width: 100%;height: 18px;position: absolute;top: 732px;left: -5px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;">
            <app_a-widget-coin-coin style="left:3px;display:inline-block;color:{{color1}}">{"icon":"money","text":[{{it1.star[it1.starGrade].money || 0}}] }</app_a-widget-coin-coin>
        </div>
    {{elseif eq}}
    <div style="width:100%;height:30px;position:absolute;bottom:35px;left:0;text-align:center;line-height:30px;font-size:18px;color: #e42121;font-family: mnjsh;">已升星到最高等级</div>
    {{end}}
</div>
