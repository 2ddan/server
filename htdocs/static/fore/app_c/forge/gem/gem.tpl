<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
    {{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let equip_diam = appCfg.friend_battle.equip_diam}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let type = friend_battle.equip_set}}
    {{let player = appCfg.player}}
    {{let career_id = player.career_id}}
    {{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}
    {{for i, v of type}}
        {{if i !== "erl_type"}}
        {{let module = v ? (v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0]): ''}}
        {{let img = v?Pi.pictures[module]:""}}
        <div style="width:98px;height:98px;position:absolute;top:{{i%5  * 119 + 75}}px;{{i<5?'left:18':'right:18'}}px;z-index:1">
            <app_a-widget-prop-equip {{if v}}on-tap="diamEquip([{{i}}])"{{end}} style="z-index:2;">
                {"prop":{{v?v:0}},"url":{{img}},"solt":{{i-0+1}},"width":98,"height":98,"type":"equip","bg":{{!v ? 1 : ''}},"lock":{{player.level >= equip_level_limit[i-0+1].open_level ? 0 : equip_level_limit[i-0+1].open_level}},"tip_keys":[{{"equip.diam."+i}}],"bottom":{{!v ? 18 : ''}} }
            </app_a-widget-prop-equip>
            {{if type[i]}}
            
                <div style="height: 20px;position: absolute;z-index: 3;bottom: 12px;right: 10px;width:50px;">
                    <div style="font-size: 20px;text-align: right;height:20px;position: absolute;top:0px;right: 20px;color: #ffffff;letter-spacing: -1px;line-height:20px;">{{(equip_diam[i][0] ? equip_diam[i][0][1]-0 : 0)+(equip_diam[i][1] ? equip_diam[i][1][1]-0 : 0)+(equip_diam[i][2] ? equip_diam[i][2][1]-0 : 0)+(equip_diam[i][3] ? equip_diam[i][3][1]-0 : 0)}}</div>
                    <app_a-widget-pic_other-pic_other style="position: absolute;width:20px;height:20px;right:0px;">
                        {"icon":"gem"}
                    </app_a-widget-pic_other-pic_other>
                </div>


                {{let totalDiam = 0}}
                {{: totalDiam = (friend_battle.equip_diam[i][0][1] || 0) + (friend_battle.equip_diam[i][1][1] || 0) + (friend_battle.equip_diam[i][2][1] || 0) + (friend_battle.equip_diam[i][3][1] || 0)}}
                {{if totalDiam >= equip_level_limit[i-0+1].gem_effects}}
                <div class="equipBgAnim" style="position: absolute;z-index: 3;pointer-events: none;left: -16px;top: -19px;"></div>
                {{end}}
                {{if friend_battle.equip_star[i] >= equip_level_limit[i-0+1].star_effects}}
                <div class="equipBorderAnim" style="position: absolute;left: -16px;top: -19px;z-index: 3;transform: scale(1);pointer-events: none;"></div>
                {{end}}
            {{end}}
            {{if it1.diamarr[1] == i}}
                <div w-class="equip_select" style="left: -4px;top: -6px;z-index: 2;pointer-events: none;"></div>
            {{end}}
        </div>
        {{end}}
    {{end}}
    <div class="cost_bg" style="position:absolute;top: 600px;left: 0px;right:0px;margin:0 auto"></div>
    
    <app_c-forge-gem-equip_gem></app_c-forge-gem-equip_gem>
</div>
