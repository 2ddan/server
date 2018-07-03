<div>
{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
{{let Common = _get("app/mod/common").exports.Common}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let diam_promote = _get("cfg/c/equip_diam_promote").exports.equip_diam_promote}}
{{let bag = appCfg.bag}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let equip_diam = appCfg.friend_battle.equip_diam}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let type = friend_battle.equip_set}}
{{let player = appCfg.player}}
{{let equipIcon = cfg.equip_diam_icon.equip_diam_icon}}
{{let equip_diam_equip = cfg.equip_diam_equip.equip_diam_equip}}
{{let career_id = player.career_id}}
{{let index = it1.diamarr[0] ? [it1.diamarr[1],it1.diamarr[2]] : [0,0]}}
{{let posi = [[82,63],[217,63],[82,214],[217,214]]}}
{{let equipic = type[index[0]] ? type[index[0]].module[type[index[0]].career_id.indexOf(career_id)][0] ? type[index[0]].module[type[index[0]].career_id.indexOf(career_id)][0] : type[index[0]].module[type[index[0]].career_id.indexOf(career_id)][0] : ''}}

{{let img1 = type[index[0]] ? Pi.pictures[equipic] : '' }}
{{let eq = type[index[0]]}}
{{let diam_icon = ''}}
<div style="line-height:normal;position:relative;width:310px;height:470px;left:0;top:70px;bottom:0;right:0;margin:auto;margin-top:0;padding:10px;color:#FFF;">
    <div w-class="forge_equip_bg" style="top: 27px;z-index: 1;left: 15px;right: 0;margin: 0 auto;"></div>

    <app_a-widget-prop-equip style="margin:10px auto;position:relative;top: 124px;left: 120px;">
        {"prop":{{ type[index[0]] ?  type[index[0]] : 0 }},"url":{{img1}},"solt":{{ type[index[0]].slot || index[0] - 0 + 1}},"type":"equip","width":98,"height":98,"type":"equip","bg":{{ type[index[0]] ?  '' : 1 }}}
    </app_a-widget-prop-equip>
    
    {{for i,v of equip_diam[index[0]]}}
        {{if i != "erl_type"}}
        {{if type[index[0]]}}
        <div w-class="diam_bg" style="top:{{posi[i][0]}}px;left:{{posi[i][1]}}px;z-index:1" {{if it1.levelarr[i] >= it1.levelarr1[i]}}on-tap="clickdiam([{{type[index[0]].slot}},{{i}},{{index[1]}}])"{{else}}on-tap="clickTip({{i}})"{{end}}>
            {{if index[1] == i}}
                <div class="circle_select" style="top: -7px;left: -5px;"></div>
                {{if it1.gem_up_ok}}
                <div class="gemUpAnim" style="position: absolute;z-index: 2;transform: scale(0.7);left: -28px;top: -37px;pointer-events: none;"></div>
                {{end}}
            {{end}}
            {{if it1.levelarr[i] >= it1.levelarr1[i]}}
                {{: diam_icon = Pi.pictures[equipIcon[equip_diam[index[0]][i][0]][0]]}}
                <img src={{diam_icon}} style="position:absolute;top: 4px;left: 6px;width: 45px;height: 45px;"/>
            {{else}}
                <img  src="app_a/widget/prop/images/lock_icon.png" style="width:23px;height:28px;position:absolute;top:15px;left:17px;z-index:3"/>
            {{end}}
            <div class="border_bg1" style="line-height:21px;text-align:center;color:#fff;font-size:13px;bottom:-25px;left: 0px;position: absolute;">
                <app-widget-text-text style="margin-top: 3px;">
                    {"text":{{equipIcon[equip_diam_equip[index[0]+1][i][0]][1]}},"textCfg":"equipDiamType","fontSize":18}
                </app-widget-text-text>
            </div>
            {{if v && it1.levelarr[i] >= it1.levelarr1[i]}}
                <app-widget-text-text style="position:absolute;top:78px;left: 0;right: 0;margin: 0 auto;">
                    {"text":{{"Lv"+v[1]}},"textCfg":"equipDiamType","fontSize":18}
                </app-widget-text-text>
            {{end}}
            <app-widget-tip-tip style="left:42px;top:5px;">
                {"tip_keys":[{{"equip.diam."+index[0]+"."+i}}]}
            </app-widget-tip-tip>
        </div>
        {{end}}
        {{end}}
    {{end}}

    <div style="height: 191px;position: absolute;top:335px;left: 15px;right: 10px;">
        <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
        <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
        <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

        <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">宝石强化</div>
        <div style="width:100%;height:90%;position:absolute;top:20px">
            {{if type[index[0]]}}
            {{for m,n of equip_diam[index[0]]}}
            {{if m!="erl_type"}}
            {{let attr = n ? diam_promote[n[0]][n[1]] : 0}}
            <div class="{{if index[1] == m}}now_attr_bg{{end}}" style="width: 255px;height: 32px;position: relative;font-size: 16px;line-height: 32px;color: {{it1.levelarr[m] >= it1.levelarr1[m] ? '#00ff00' : '#919191'}};text-align:left;left: 25px;">

                <div w-class="diam_info_bg" style="position:relative;display:inline-block;top: 4px;left: -4px;">
                    {{if it1.levelarr[m] >= it1.levelarr1[m]}}
                    {{let equipiconmin = Pi.pictures[equipIcon[n[0]][0]]}}
                        <img src={{equipiconmin}} style="position:absolute;top: 1px;left: 1px;width: 23px;height: 23px;"/>
                    {{else}}
                        <div w-class="diam_gray" style="top: 1px;left: 1px;width: 23px;height: 23px;"></div>
                    {{end}}
                </div>

                <span style="margin-left: -5px;position:relative;display:inline-block;vertical-align:top;">{{it1.levelarr[m] >= it1.levelarr1[m] ? "【"+equipIcon[equip_diam_equip[index[0]+1][m][0]][1]+n[1]+"级】" : ''}}</span> 

                {{if it1.levelarr[m] >= it1.levelarr1[m]}}
                <span style="position:relative;display:inline-block;vertical-align:top;">
                    {{if n[1]}}
                    {{ it1.attriCfg[attr[1][0]] + "+" + attr[1][1] }}
                    {{else}}
                    未获得任何属性 
                    {{end}}
                </span>
                {{else}}
                <span style="margin-left: 0px;position:relative;display:inline-block;vertical-align:top">{{"【"+equipIcon[equip_diam_equip[index[0]+1][m][0]][1]+"宝石】"+"(总等级" + it1.levelarr1[m]+"级开放)"}}</span>
                {{end}}
            </div>
            {{end}}
            {{end}}
            
            <div style="width:100%;height:30px;position:absolute;bottom:0px;">
                {{if diam_promote[equip_diam[index[0]][index[1]][0]] }}
                {{let nowA = diam_promote[equip_diam[index[0]][index[1]][0]][equip_diam[index[0]][index[1]][1]] || 0}}
                {{let nextA = diam_promote[equip_diam[index[0]][index[1]][0]][equip_diam[index[0]][index[1]][1] + 1] || 0}}
                <span style="width:40%;line-height:30px;position:absolute;left:13px;font-size:16px;color:#ffd8a6;text-align:center;">
                    {{if nowA[1]}}
                        {{ it1.attriCfg[nowA[1][0]] + "+" + nowA[1][1] }}
                    {{else}}
                        未获得任何属性
                    {{end}}
                </span>
    
                <div class="attr_arrow" style="left: 0px;right: 0px;margin: 0 auto;top:3px;"></div>
    
                <span style="width:40%;line-height:30px;position:absolute;right:13px;font-size:16px;color:#51e650;text-align:left;padding-left:5px;">
                    {{if nextA[1]}}
                        {{ it1.attriCfg[nextA[1][0]] + "+" + nextA[1][1] }}
                    {{else}}
                        满级
                    {{end}}
                </span>
                {{else}}
                    <span style="width:100%;line-height:30px;position:absolute;right:13px;font-size:16px;color:#51e650;text-align:center;">
                        请先激活
                    </span>
                {{end}}
            </div>
            {{end}}
        </div>
        <div class="line_1" style="position:absolute;bottom: 35px;width: 90%;left: 22px;background-size: 100% 100%;"></div>
    </div>
</div>

{{if type[index[0]]}}
    {{if !it1.diamarr[3] && it1.diampropcount != undefined}}
        {{let p = Common.getBagPropById(it1.diamprop)}}
        {{if !p}}
        {{: p = Pi.sample[it1.diamprop]}}
        {{end}}
       
        {{if equip_diam[type[index[0]].slot - 1][index[1]]}}
        {{if p}}
            {{let img2 = checkTypeof(p,"Array") ? Pi.pictures[p[1].icon] : Pi.pictures[p.icon]}}
            {{let sid = checkTypeof(p,"Array") ? p[1].sid : p.sid}}
            
            <img src={{img2}} on-tap='gotoGetWay("{{sid}}")' style="position: absolute;z-index: 2;top: 607px;width: 42px;left: 0;right: 0;margin: 0 auto;"/>
            
            {{let color = it1.diampropcount > (checkTypeof(p,"Array") ? bag[p[0]].count : 0)  ? "#ff0000" : ""}}
            <div style="width: 100%;height: 18px;position: absolute;top: 650px;text-align: center;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e;z-index:2"><span style="color:{{color}}">{{(checkTypeof(p,"Array") ? bag[p[0]].count : 0)}}</span>/{{!equip_diam[type[index[0]].slot - 1][index[1]] ? 0 : it1.diampropcount}}</div>
        {{end}}
        {{end}}
        
        {{let notUp = it1.diammoney > appCfg.player.money ? 1 : 0}}
        {{let color1 = notUp  ? "#ff0000" : ""}}
        <div style="width: 100%;height: 18px;position: absolute;top: 732px;left: -5px;text-align: center;line-height: 15px;font-size: 18px;color:#e7e09e">
            <app_a-widget-coin-coin style="left:3px;color:{{color1}};display: inline-block;">{"icon":"money","text":[{{!equip_diam[type[index[0]].slot - 1][index[1]] ? 0 : it1.diammoney}}] }</app_a-widget-coin-coin>
        </div>
        {{if !equip_diam[type[index[0]].slot - 1][index[1]]}}
            <app_a-widget-btn-rect on-tap='diamActiv([{{type[index[0]].slot}},{{index[1]}}])' style="position: absolute;top: 682px;left: 0;right: 0;margin: 0 auto;">{"text":"激 活","class":"hl","fontSize":24,"tip_keys":[{{"equip.diam."+index[0]+"."+index[1]}}],"width":113,"height":46}</app_a-widget-btn-rect>
        {{else}}
            {{if it1.diampropcount <= (checkTypeof(p,"Array") ? bag[p[0]].count : 0) && it1.diammoney <= appCfg.player.money }}
                <app_a-widget-btn-rect on-tap='diamlevelup([{{type[index[0]].slot}},{{index[1]}}])' style="position: absolute;top: 682px;left: 0;right: 0;margin: 0 auto;">{"guide":"gem_up","text":"升 级","class":"hl","fontSize":24,"tip_keys":[{{"equip.diam."+index[0]+"."+index[1]}}],"width":116,"height":45}</app_a-widget-btn-rect>
            {{else}}
                <app_a-widget-btn-rect on-tap='diamlevelup([{{type[index[0]].slot}},{{index[1]}},{{it1.diampropcount > (checkTypeof(p,"Array") ? bag[p[0]].count : 0) ?it1.diamprop:0}},{{notUp}}])' style="position: absolute;top: 682px;left: 0;right: 0;margin: 0 auto;">{"guide":"gem_up","text":"升 级","class":"disabled","fontSize":24,"tip_keys":[{{"equip.diam."+index[0]+"."+index[1]}}],"width":113,"height":46,"color":"#cfcfcf"}</app_a-widget-btn-rect>
            {{end}}
        {{end}}
    {{else}}
        <div style="width:100%;height:30px;position:absolute;bottom:75px;left:0;text-align:center;line-height:30px;font-size:18px;color: #e42121;font-family: mnjsh;">已升级到最高等级</div>
    {{end}}
{{end}}
</div>