<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;font-family:'黑体';-webkit-text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;">
    {{let dataCfg = _get("app/mod/db").exports.data}}
    {{let player = dataCfg.player}}
    {{let friend_battle = dataCfg.friend_battle}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let equip_evolution = _get("cfg/c/equip_evolution").exports.equip_evolution}}
    {{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}

    {{let attribute = _get("cfg/c/attribute").exports.attribute}}
    {{let equip_wash_cost = _get("cfg/c/equip_wash_cost").exports.equip_wash_cost}}
    {{let vip_advantage = _get("cfg/c/vip_advantage").exports.vip_advantage}}
    {{let attr_add = _get("cfg/c/attr_add").exports.attr_add}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}

    {{let career_id = player.career_id}}
    {{for i, v of it1.redId}}
    {{let prop = it1.redEquipPos[v]?it1.redEquipPos[v].prop:''}}
    {{let icon = prop ? prop.module[prop.career_id.indexOf(career_id)][0] : ''}}
    {{let img = prop ? Pi.pictures[icon] : ''}}
    {{let level = it1.redEquipPos[v] ? (prop.level) : it1.equip_lv}}
    
    <div style="width:88px;height:88px;position:absolute;top:{{i%5  * 119 + 75}}px;{{i<5?'left:18':'right:18'}}px;z-index:1">
        <app_a-widget-prop-equip on-tap='selectRedEquip("{{i+','+v}}")' style="width:52px;height:52px;position: absolute;">
            {"prop":{{prop}},"url":{{img}},"width":88,"height":88,"type":"equip","solt":{{i-0+1}},"level":{{level}},"tip_keys":[{{"equip.wash."+v}}],"quality":{{prop ? '' : 6}},"bottom":22,"text":"未锻造","bg":1}
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

    {{let thisProp = Pi.sample[it1.red_id]}}
    {{let obj = it1.redEquipPos[it1.red_id]}}

    {{let icon_1 = thisProp.module[thisProp.career_id.indexOf(career_id)][0]}}
    {{let img_1 = Pi.pictures[icon_1]}} 

    {{let prop_1 = ''}}
    {{let addArr = ''}}
    {{let evolution = ''}}


    {{if obj}}
    {{:prop_1 = obj.prop}}
    {{:addArr = attr_add[prop_1.id]}}
    {{:evolution = equip_evolution[prop_1.id][prop_1.level]}}
    {{end}}
    <div style="line-height:normal;position:relative;width:310px;height:470px;left:0;top:70px;bottom:0;right:0;margin:auto;margin-top:0;padding:10px;color:#FFF;">
        <div w-class="forge_equip_bg" style="top: 0px;z-index: 1;left: 22px;"></div>
        <div w-class="forge_stage" style="bottom:185px;left:0px;right:0px;margin:0 auto"></div>

        {{if obj}}
        <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 101px;left: 129px;">
            {"prop":{{ thisProp }},"url":{{img_1}},"solt":{{thisProp.slot}},"type":"equip","width":88,"height":88,"type":"equip","level":{{evolution.next_level}}}
        </app_a-widget-prop-equip>

        
        <div class="little_tips_bg" style="position:absolute;left:0px;right:0px;margin:0 auto;line-height:24px;font-family: mnjsh;top: 250px;z-index: 1;">
            <div style="width:50px;height:20px;position:absolute;top:2px;background-color:#ccad6b;border-radius:3px;text-align:center;line-height:20px;color:#7a3900;font-size: 16px;">
                天命
            </div>
            <div style="font-size:16px;color:#ffd8a6;padding-left: 57px;">{{attribute[addArr[0]].name}}额外加成{{addArr[1]*100}}%</div>
            <div class="the_fire" style="right: 10px;top: -4px;"></div>
        </div>
        {{else}}
            <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 101px;left: 129px;">
                {"prop":"","url":"","width":88,"height":88,"type":"equip","solt":{{thisProp.slot}},"level":0,"quality":6,"bottom":22,"text":""}
            </app_a-widget-prop-equip>
            <img src="../images/red_lock.png" style="position:absolute;top: 116px;left: 132px;z-index: 2;" />
        {{end}}
        <div style="height: 191px;position: absolute;bottom: 10px;left: 0px;right: 0px;">
            <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
            <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
            <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

            <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">神装洗练</div>
            {{if obj}}
            <app_a-widget-title-single style="position:relative;left: 105px;width: 95px;top: 22px;">{"text":"属性详情","wear":1,"type":9}</app_a-widget-title-single>

            
            <div style="position:absolute;bottom:-3px;width:100%;height:80%;font-size:15.98px;color:#e8dfb2;">
                <div class="hl_attr_bg" style="width:290px;left:50%;margin-bottom:2px;margin-left:-145px;z-index:3;top:0;transform: translateY({{it1.attr_distance}}px);transition: all 0.3s cubic-bezier(0.7, -0.02, 0.15, 1.38);"></div>

                {{for m_add, n_add of prop_1.addition_attr}}
                {{if m_add !== "erl_type"}}
                {{let lev = it1.equip_wash_num[prop_1.id][m_add - 0 + 1]}}
                {{let open = prop_1.level < lev}}
                <div on-tap="{{if !open}}selectAttr({{m_add}}){{end}}" style="position:relative;width:300px;height:30px;left:0px;right:0px;line-height:32px;margin-bottom:2px;z-index:3;margin:0 auto;">
                    {{%%let add = 0}}
                    {{if addArr[0] == n_add[0]}}
                    {{%%:add = n_add[1] - Math.ceil(n_add[1]/(1+addArr[1]))}}

                    <div class="the_fire" style="left: 0px;top: -2px;z-index: 3;"></div>
                    {{end}}
                    {{let max = Math.ceil(evolution.addition_attr[n_add[0]] * it1.equip_wash[prop_1.id][it1.equip_wash[prop_1.id].length-1][1])}}
                    <div style="position: relative;line-height: 32px;width: 140px;text-align: left;display: inline-block;margin-left: 20px;color:{{addArr[0] == n_add[0] ? '#51e650' : '#e8dfb2'}}">{{attribute[n_add[0]].name}}+{{n_add[1]}}</div>
                    {{if !open}}
                    <div style="position: relative;line-height: 32px;width: 135px;right: 0px;text-align: left;display:inline-block;color:{{addArr[0] == n_add[0] ? '#51e650' : '#e8dfb2'}}">最大值:{{addArr[0] == n_add[0] ? Math.ceil(max * (1+addArr[1])) : max}}</div>
                    {{else}}
                    <app_a-widget-text-text style="position: relative;line-height: 32px;width: 105px;right: 0px;text-align: left;display:inline-block;top:0px">{"text":{{"("+ lev + "级可洗练)"}},"textCfg":"heroEquipGray","fontSize":16,"fontFamily":"MNNNNN","space":"0"}</app_a-widget-text-text>
                    {{end}}
                </div>
                {{end}}
                {{end}}
            </div>
            {{else}}
            <div style="width:100%;font-size:20px;color:#ffd8a6;position:absolute;top:100px;font-family:mnjsh;text-align: center;">请先锻造这件神装</div>
            {{end}}
        </div>
    
        {{if obj}}
        <div style="position:absolute;width:100%;height:62px;top:485px;">
            <app_a-widget-title-single style="position:relative;left: 105px;width: 95px;top: -10px;">{"text":"本次洗练","wear":1,"type":9}</app_a-widget-title-single>

            <div style="position:absolute;width:100%;height:40px;top:8px">
                {{let arr = prop_1.addition_attr[it1.attr_index]}}
                <div style="position:absolute;width:44%;height:40px;line-height:40px;text-align:center;font-size:16px;color:#ffd8a6;">{{attribute[arr[0]].name}} +{{arr[1]}}</div>

                <div class="attr_arrow" style="top: 8px;left: -15px;right: 0px;margin: 0 auto;"></div>

                {{let wash_attr = 0}}
                <div style="position:absolute;width:44%;height:40px;right:15px;">    
                    {{for k, val of prop_1.wash}}
                    {{if (it1.attr_index+1) == val[0]}}
                    {{:wash_attr = val[1]}}
                    {{end}}
                    {{end}}
                    {{%%计算当前属性的评分}}
                    {{let a = prop_1.addition_attr[it1.attr_index]}}
                    {{let grade = Math.ceil(a[1] * attribute[a[0]].prower_ratio * evolution.grade_rate)}}
                    {{if wash_attr !== 0}}
                    <div style="position:absolute;width:100%;height:40px;line-height:20px;text-align:left;left: 30px;color:{{if grade > wash_attr[1]}}#f00{{else}}#51e650{{end}}">
                        <div style="width:100%;height:20px;font-size:16px;">{{attribute[wash_attr[0][0]].name}} +{{wash_attr[0][1]}}</div>
                        <div style="width:100%;height:20px;font-size:16px;color:{{if grade > wash_attr[1]}}#f00{{end}}">评分{{(wash_attr[1] > grade)?"+"+(wash_attr[1] - grade):(wash_attr[1] - grade)}}</div>
                    </div>
                    {{else}}
                    <div style="position:absolute;width:100%;height:40px;top:0px;line-height:40px;text-align:center;font-size:16px;color:#ffd8a6;">还未洗练</div>
                    {{end}}
                </div>
            </div>
        </div>
        {{end}}
    </div>

    {{if obj}}
    <app_a-widget-btn-rect on-tap='washRed(1)' style="position: absolute;top: 682px;left: -220px;right: 0;margin: 0 auto;">{"text":"替 换","class":"hl","fontSize":24,"width":116,"height":45}</app_a-widget-btn-rect>

    {{let num = friend_battle.wash_times - vip_advantage[dataCfg.player.vip].equip_wash_times}}
    {{:num =  (num < equip_wash_cost.cost_money.length)?num:(equip_wash_cost.cost_money.length-1)}}
    {{let bol = true}}
    <div class="cost_bg" style="position:absolute;top: 600px;left: 0px;right:0px;margin:0 auto">
        {{if num < 0}}
        <div style="width: 113px;position: absolute;bottom: -60px;right: 3px;font-size: 16px;text-align: center;color: rgb(255, 216, 166);">免费次数:{{-num}}</div>
        {{else}}
        {{let color = equip_wash_cost.cost_money[num] > player.money ? "#ff0f0f" : "#ffd8a6"}}
        <app_a-widget-coin-coin style="width: 113px;text-align: center;bottom: -60px;right: 3px;position: absolute; white-space: nowrap;font-size: 16px;color: {{color}};">
            {"icon":"money","text":[{{equip_wash_cost.cost_money[num]}}] }
        </app_a-widget-coin-coin>

        {{let prop = Common.getBagPropById(equip_wash_cost.cost_prop_id)}}
        {{if !prop}}
        {{: prop = Pi.sample[equip_wash_cost.cost_prop_id]}}
        {{end}}
        {{let img2 = checkTypeof(prop,"Array") ? Pi.pictures[prop[1].icon] : Pi.pictures[prop.icon]}}
        {{let count = checkTypeof(prop,'Array') ? prop[1].count : 0}}
        {{:bol =  count >= equip_wash_cost.prop_cost_num[num] && player.money >= equip_wash_cost.cost_money[num]}}
        <div style="width:34px;height:54px;position:absolute;right:159px;top:2px;">
            <img src={{img2}} on-tap='gotoGetWay("{{equip_wash_cost.cost_prop_id}}")' style="position: absolute;z-index: 2;top: 4px;width: 42px;left: 0;right: 0;margin: 0 auto;"/>
                
            <span style="position: absolute;bottom: -12px;width: 100px;left: -29px;text-align: center;z-index:2;font-size: 19px;color: #ffd8a6;"><span style="color:{{count  < equip_wash_cost.prop_cost_num[num] ? '#ff0f0f' : ''}}">{{count}}</span>/{{equip_wash_cost.prop_cost_num[num]}}</span>
        </div>

        {{end}}
    </div>

    <app_a-widget-btn-rect on-tap='washRed(0)' style="position: absolute;top: 682px;left: 0;right: -220px;margin: 0 auto;">{"text":"洗 炼","class":{{bol ?"default":"disabled"}},"fontSize":24,"width":116,"height":45,"tip_keys":[{{"equip.wash."+it1.red_id}}]}</app_a-widget-btn-rect>
    {{end}}
</div>