{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}
{{let player = _get("app/mod/db").exports.data.player}}
{{let career_id = player.career_id}}
<div style="position:absolute;top:{{it.top || 0}}px;width:100%;left:50%;margin-left:-270px;">
	<div style="position:absolute;width:540px;z-index:1;">
        {{let equip_type = ["武器","护肩","戒指","手镯","项链","鞋子","下装","上衣","护手","头盔"]}}
        {{let type = friend_battle.equip_set}}
        {{for i, v of type}}
            {{let module = v ? v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0] : ''}}
            {{let img3 = v?Pi.pictures[module]:""}}
            <div  style="position:absolute;z-index:2;top:{{i%5  * 118}}px;{{i<5?'left:18':'right:18'}}px;width: 98px;height: 98px;">
                <app_a-widget-prop-equip on-tap='lookEquip({{i}})'>
                    {"prop":{{v?v:0}},"url":{{img3}},"solt":{{i-0+1}},"type":"equip","level":{{v ? v.level : ''}},"width":98,"height":98,"lock":{{ player.level >= equip_level_limit[i-0+1].open_level ? 0 : equip_level_limit[i-0+1].open_level}},"bg":1,"fontFamily":"黑体","bottom":18 }
                </app_a-widget-prop-equip>

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
    </div>
</div>+