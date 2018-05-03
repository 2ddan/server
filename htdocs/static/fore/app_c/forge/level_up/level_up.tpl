<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;-webkit-text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;">
    {{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let level_index = _get("cfg/c/equip_level_up").exports.equip_level_up}}
    {{let bag = appCfg.bag}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}
    {{let type = friend_battle.equip_set}}
    {{let levels = friend_battle.equip_level}}
    {{let player = appCfg.player}}
    {{let career_id = player.career_id}}

       
    {{for i, v of type}}
        {{if i !== "erl_type"}}
        {{let module = v ? (v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0]): ''}}
        {{let img = v?Pi.pictures[module]:""}} 
        {{let attr1 = type[i].base_attr}}
        <div style="width:98px;height:98px;position:absolute;top:{{i%5  * 119 + 75}}px;{{i<5?'left:18':'right:18'}}px;z-index:1">
            <app_a-widget-prop-equip on-tap="{{if player.level >= equip_level_limit[i-0+1].open_level && v}} lookEquip({{i}}) {{end}}" style="z-index:2;">
                {"prop":{{v?v:0}},"url":{{img}},"solt":{{i-0+1}},"width":98,"height":98,"type":"equip","bg":{{!v ? 1 : ''}},"lock":{{player.level >= equip_level_limit[i-0+1].open_level ? 0 : equip_level_limit[i-0+1].open_level}},"tip_keys":[{{"equip.level."+i}}],"bottom":{{!v ? 18 : ''}}}
            </app_a-widget-prop-equip>
            <div style="font-size: 20px;text-align: center;line-height: 20px;position: absolute;z-index: 3;bottom: 12px;right: 10px;color: #ffffff;letter-spacing: -1px;">{{type[i] ? "+"+levels[i]: ""}}</div>
            {{if it1.clickequipindex == i}}
                <div w-class="equip_select" style="left: -4px;top: -6px;z-index: 2;pointer-events: none;"></div>
            {{end}}
            {{if v && it1.level_up_arr[i] == 1}}
            <div class="successAnim" style="position: absolute;z-index: 2;transform: scale(1);left: -15px;top: -18px;pointer-events: none;"></div>
            {{end}}
            {{if v}}
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
    {{end}}

    {{let minarr = []}}
    {{if it1.minLevel}}
        {{for m,g of levels}}
            {{if levels[m] == it1.minLevel}}
                {{:minarr.push(m)}}
            {{end}} 
        {{end}}
    {{else}}
        {{:minarr = [0]}}
    {{end}}

    {{let index = it1.clickequipindex || it1.clickequipindex === 0? it1.clickequipindex : minarr[0]}}
    {{let equipic = type[index] ? type[index].module[type[index].career_id.indexOf(career_id)][0].indexOf(",") ? type[index].module[type[index].career_id.indexOf(career_id)][0].split(",")[0] : type[index].module[type[index].career_id.indexOf(career_id)][0] : ''}}
    {{let img1 = type[index] ? Pi.pictures[equipic] : '' }}
    <div style="line-height:normal;position:relative;width:310px;height:470px;left:0;top:70px;bottom:0;right:0;margin:auto;margin-top:0;padding:10px;color:#FFF;">
        <div w-class="forge_equip_bg" style="top: 27px;z-index: 1;left: 15px;right: 0;margin: 0 auto;"></div>
        <div w-class="forge_stage" style="bottom:140px;left:0px;right:0px;margin:0 auto"></div>
        <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 124px;left: 120px;">
            {"prop":{{ type[index] ?  type[index] : 0 }},"url":{{img1}},"solt":{{ type[index].slot || index - 0 + 1}},"type":"equip","width":98,"height":98,"type":"equip","bg":{{ type[index] ?  '' : 1 }} }
        </app_a-widget-prop-equip>

        {{let attr = type[index] ? type[index].base_attr : []}}
        <div style="height: 191px;position: absolute;top:335px;left: 15px;right: 10px;">
            <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
            <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
            <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

            <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">装备强化</div>

            <span style="width:40%;height:20px;line-height:20px;position:absolute;left:13px;font-size:16px;color:#ffd8a6;top:79px;text-align:center;">
                {{for n,h of attr}}
                    {{if n!=="erl_type"}}
                    {{it1.attriCfg[attr[n][0]] + "+" + (Math.ceil((attr[n][1]-0) * (level_index[levels[index]][2]-0))+level_index[levels[index]][3])}}
                    {{end}}
                {{end}}
            </span>

            {{if type[index]}}
            <div class="attr_arrow" style="top: 75px;left: 0px;right: 0px;margin: 0 auto;"></div>
            {{end}}

            <span style="width:40%;height:20px;line-height:20px;position:absolute;right:13px;font-size:16px;color:#51e650;top:79px;text-align:center;">
                {{if level_index[levels[index]+1]}}
                    {{for o,p of attr}}
                        {{if o!=="erl_type"}}
                        {{it1.attriCfg[attr[o][0]] + "+" + (Math.ceil((attr[o][1]-0) * (level_index[levels[index]+1][2]-0)) + level_index[levels[index]+1][3])}}
                        {{end}}
                    {{end}}
                {{end}}
            </span>
        </div>
    </div>

    <div class="cost_bg" style="position:absolute;top: 600px;left: 0px;right:0px;margin:0 auto"></div>
    
    {{let p = ''}}
    {{if type[index] && level_index[levels[index]+1]}}
        {{: p = Common.getBagPropById(level_index[0][0][0])}}
        {{if !p}}
        {{: p = Pi.sample[level_index[0][0][0]]}}
        {{end}}
        {{if p}}
        {{let img2 = checkTypeof(p,"Array") ? Pi.pictures[p[1].icon] : Pi.pictures[p.icon]}}
        {{let sid = checkTypeof(p,"Array") ? p[1].sid : p.sid}}

        <img src={{img2}} on-tap='gotoGetWay("{{sid}}")' style="position: absolute;z-index: 2;top: 607px;width: 42px;left:155px;"/>
        <img src={{img2}} on-tap='gotoGetWay("{{sid}}")' style="position: absolute;z-index: 2;top: 607px;width: 42px;right:155px;"/>
        {{end}}

        {{let bag_count = (checkTypeof(p,"Array") ? bag[p[0]].count : 0)}}

        {{let color_1 = it1.once_strong_cost[0][1] > bag_count  ? "#ff0000" : ""}}
        {{let color_2 = it1.levelUpCost > bag_count  ? "#ff0000" : ""}}
        <div style="width:110px;height: 18px;position: absolute;top: 650px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;z-index:2;left:120px;">
            <span style="color:{{color_1}}">{{bag_count}}</span>/{{it1.once_strong_cost[0][1]}}
        </div>
        <div style="width:110px;height: 18px;position: absolute;top: 650px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;z-index:2;right:120px;">
            <span style="color:{{color_2}}">{{bag_count}}</span>/{{it1.levelUpCost}}
        </div>
        
        {{ let color_3 = it1.once_strong_cost[1][1] > player.money  ? "#ff0000" : "#e7e09e"}}
        {{ let color_4 = it1.levelUpMoney > player.money  ? "#ff0000" : "#"}}
        <div style="width: 110px;height: 18px;position: absolute;top: 732px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;left:120px;">
            <app-widget-coin-coin style="left:3px;color:{{color_3}};display: inline-block;">{"icon":"money","text":{{it1.once_strong_cost[1][1] || 0}} }</app-widget-coin-coin>
        </div>
        <div style="width: 110px;height: 18px;position: absolute;top: 732px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;right:120px;">
            <app-widget-coin-coin style="left:3px;color:{{color_4}};display: inline-block;">{"icon":"money","text":{{it1.levelUpMoney || 0}} }</app-widget-coin-coin>
        </div>

        {{let cla = (bag_count >= it1.once_strong_cost[0][1] && player.money >= it1.once_strong_cost[1][1]) ? "hl" : "disabled"}}
        <app_a-widget-btn-rect on-tap='onceStrong({{bag_count + "," + player.money}})' style="position: absolute;top: 682px;left:120px;">
            {"guide":{{it1.level_ok ? "level_up" : ""}},"text":"强 化","class":{{cla}},"fontSize":24,"width":113,"height":46,"tip_keys":[{{"equip.level." + it1.clickequipindex}}]}
        </app_a-widget-btn-rect>


        {{if it1.levelUpCost <=  bag_count}}
            {{if it1.levelUpMoney <= player.money}}
            <app_a-widget-btn-rect on-tap="level_up(1)" style="position: absolute;top: 682px;right:120px;">
                {"text":"一键强化","class":"hl","fontSize":24,"tip_keys":["equip.level"],"width":113,"height":46}
            </app_a-widget-btn-rect>
            {{else}}
            <app_a-widget-btn-rect on-tap="level_up(0)" style="position: absolute;top: 682px;right:120px;">
                {"text":"一键强化","class":"disabled","fontSize":24,"tip_keys":["equip.level"],"width":113,"height":46}
            </app_a-widget-btn-rect>
            {{end}}
        {{else}}
            <app_a-widget-btn-rect on-tap="level_up(2)" style="position: absolute;top: 682px;right:120px;">
                {"text":"一键强化","class":"disabled","fontSize":24,"tip_keys":["equip.level"],"width":113,"height":46,"color":"#cfcfcf"}
            </app_a-widget-btn-rect>
        {{end}}
    {{end}}
    {{if type[index] && !level_index[levels[index]+1]}}
        <div style="width:100%;height:30px;position:absolute;bottom:75px;left:0;text-align:center;line-height:30px;font-size:18px;color: #e42121;font-family: mnjsh;">已强化到最高等级</div>
    {{end}}
  
</div>