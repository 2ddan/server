<div style="position:absolute;width:494px;height:487px;">
    {{let module = ""}}
    {{let module_id = 0}}
    {{let equip = it1.equip}}
    {{let obj = it1.weapon_soul_base[it1.class]}}
    {{let index = 0}}

    {{%%如果穿戴了时装}}
    {{if it1.wear_skin}}
        {{:index = it1.clothes_module[it1.wear_skin].career_id.indexOf(it1.career_id)}}
        {{:module_id = it1.clothes_module[it1.wear_skin].module[index]}}
        {{:module = it1.module_cfg[module_id].init_weapon[0][0]}}
    {{else}}
        {{:index = obj.career_id.indexOf(it1.career_id)}}
        {{:module_id = equip.module[equip.career_id.indexOf(it1.career_id)][1]}}
        {{:module = it1.parts_cfg[module_id].module[0][0]}}
    {{end}}

    {{%%特效}}
    {{let w_eff = it.effect[index] || obj.effect[index]}}
    {{let double = it1.career_id == "700002" ? true : false}}
    {{let position = it1.career_id == "700001" ? [0,2.3,0] : it1.career_id == "700002" ? [0.3,2.7,0] : [0.25,2.0,0]}}
    
    <app-scene-base-scene style="position:absolute;width:100%;height:100%;">
        {
            "name":"uiscene",
            "type":"weapon",
            "module":{
                "module":{{module}},
                "position":{{position}},
                "scale":[0.9,0.9,0.9],
                "rotate":[-3.7,1.57,0],
                "w_eff":{{[w_eff]}},
                "double":{{double}},
                "scene_bg":"sce_ui_sbfl"
            },
            "width":540,
            "height":900
        }    
    </app-scene-base-scene> 
</div>