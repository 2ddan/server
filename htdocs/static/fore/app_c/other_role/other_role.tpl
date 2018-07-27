
<div  style="position:absolute;top:10px;left:0;width:100%">
    {{let friend_battle = it1.role.equip_info}}                
    {{let type = it1.role.equip_set}}
    {{let levels = friend_battle.equip_level}}
    
    {{let equip_level_limit = it1.equip_level_limit}}
    
    {{let Pi = it1.Pi}}                            
    {{let career_id = it1.role.base_info.career_id}}
    {{let level = it1.role.base_info.level}}
    
    <div  w-class="20">
    {{let equip_diam = friend_battle.equip_diam}}            
    {{for i, v of type}}
        {{if i !== "erl_type"}}
        {{let module = v ? (v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0]): ''}}
        {{let img = v?Pi.pictures[module]:""}} 
        {{let attr1 = type[i].base_attr}}
        <div style="width:78px;height:78px;position:absolute;top:{{i%5  * 105 }}px;{{i<5?'left:18':'right:18'}}px;z-index:4">
            <app_a-widget-prop-equip on-tap="{{if level >= equip_level_limit[i-0+1].open_level && v}} lookEquip({{i}}) {{end}}" style="z-index:2;">
                {"prop":{{v?v:0}},"url":{{img}},"solt":{{i-0+1}},"width":78,"height":78,"level":{{v.level}},"type":"equip","bg":{{!v ? 0 : 1}},"lock":{{level >= equip_level_limit[i-0+1].open_level ? 0 : equip_level_limit[i-0+1].open_level}},"bottom":{{!v ? 18 : ''}}}
            </app_a-widget-prop-equip>
            {{if i === it1.position}}
            <div class="rect_select" style="left: 0;top:0;width: 77px;height: 76px;z-index: 2;pointer-events: none;"></div>
            {{end}}
            {{let totalDiam = 0}}
            {{: totalDiam = (equip_diam[i][0][1] || 0) + (equip_diam[i][1][1] || 0) + (equip_diam[i][2][1] || 0) + (equip_diam[i][3][1] || 0)}}
            {{if totalDiam >= equip_level_limit[i-0+1].gem_effects}}
            <div class="equipBgAnim" style="position: absolute;z-index: 3;pointer-events: none;left: -24px;top: -23px;transform: scale(0.75);"></div>
            {{end}}
            {{if friend_battle.equip_star_info[i] >= equip_level_limit[i-0+1].star_effects}}
            <div class="equipBorderAnim" style="position: absolute;left: -25px;top: -27px;z-index: 3;transform: scale(0.8);pointer-events: none;"></div>
            {{end}}
        </div>
        {{end}}
    {{end}}
    </div>
</div>
