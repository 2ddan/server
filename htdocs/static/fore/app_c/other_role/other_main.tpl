<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;background:rgba(0,0,0,0.6);z-index:2" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="7" w-sid="7">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='closeCover' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
            </widget>
            <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
            </widget>
            <widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"查看玩家","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        {{let base = it1.role.base_info}}
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
                {"bgName":"bg_frame23"} 
            </widget>
            <div w-class="11" style="opacity:1">
                <div w-class="12">
                    <div w-class="13">{{base.level}}</div>
                    <span style="margin:0 5px 0 15px;">{{"S"+base.area + " " +base.name}}</span>
                    {{if base.vip}}
                    <widget class="shadow7" style="position:absolute;right: -50px;top: 0px;font-size:16px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":{{"vip_lv_" + (it1.vip_advantage[base.vip].lv_frame || 1)}},"width":52,"height":25,"text":{{"VIP" + base.vip}},"top":0,"left":0} 
                    </widget>
                    {{end}}
                </div>
                <widget w-class="14" w-tag="app_a-widget-power-power" w-sid="14">
                    {"type":2,"top":14,"left":49,"power":{{base.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
                </widget>
                {{let a = 0}}
                {{for i,v of it1.tab}}
                {{if i !== it1.cur}}
                {{:a++}}
                <div  w-class="16" on-tap="goto({{v[1]}})"  style="{{if a>1}}left:370px;{{end}}" >
                    <img style="{{if !i}}width: 76px;margin-top: 5px;{{end}}" src="app_b/widget/icons/{{v[2]}}.png"/>
                    <widget w-class="23" w-tag="app_a-widget-text-text" >
                        {"text":{{v[0]}},"textCfg":"gangCoverTitle","space":0,"fontSize":20} 
                    </widget>
                </div>
                {{end}}
                {{end}}
            </div>
            <div w-class="17">
                {{let arr = ["app_c-other_role-other_role","app_c-other_role-other_magic","app_c-other_role-other_pet"]}}
                <widget w-tag="{{arr[it1.cur]}}"></widget>


                {{let career_id = it1.role.base_info.career_id}}
                {{let type = null}}                
                {{let module = null}}
                {{let weapon_m = null}}
                {{let w_eff = null}}
                {{let double = false}}
                {{let position = [0,0,2]}}
                {{let scale = 1}}
                {{let rotate = [0,0,0]}}
                {{let s_eff = null}}                
                {{let body_eff = null}}
                {{let scene_bg = null}}
                {{let pet_module = null}}
                
            {{if it1.cur == 0}}
                
            {{let weapon= null}}
            {{let _index = 0}}
            {{let m = null}}

                {{:module = it1.roleCfg[career_id].module }}

                {{if it1.role.clothes}}
                    {{: _index = it1.clothes_module[it1.role.clothes].career_id.indexOf(career_id)}}
                    {{: module = it1.clothes_module[it1.role.clothes].module[_index]}}
                {{else}}
                    {{: weapon= it1.role.equip_set[0]}}
                    {{: _index = weapon?weapon.career_id.indexOf(career_id):null}}
                    {{: m = weapon?weapon.module[_index]:null}}
                    
                    {{if weapon && !it1.cur}}
                        {{: weapon_m = m[1]}}
                    {{end}}
                    {{if m && m.length > 2 && !it1.cur}}
                            {{: w_eff = m.slice(2)}}
                    {{end}}
                {{end}}

                {{:type = "fighter" }}
                {{:position = [0,0.35,0]}}
                {{:scale = 1.4}}
                {{:scene_bg = "sce_ui_cksx"}}

                {{if it1.role.equip_info.ensoul_class > 0}}
                    {{let _c = it1.weapon_soul_base?it1.weapon_soul_base:null}}
                    {{if _c}}
                        {{: _c = _c[it1.role.equip_info.ensoul_class]}}
                        {{let idx = _c.career_id.indexOf(career_id)}}
                        {{: s_eff = _c.effect[idx]}}
                    {{end}}
                {{end}}
                {{if it1.soul_level}}
                    {{let _cc = it1.equip_star_achieve?it1.equip_star_achieve:null}}
                    {{: _cc = _cc[it1.soul_level]}}
                    {{let idex = _cc.career_id.indexOf(career_id)}}
                    {{: body_eff = _cc.effect[idex]}}
                {{end}}

            {{elseif it1.cur==1}}
                {{let magic = it1.role.treasure_info}}
                {{let weapon = _get("app/scene/plan_cfg/parts_config").exports.parts_cfg}}
                {{let info = it1.treasure_break[magic.treasure_break_info[0]]}}
                {{let index = info.career_id.indexOf(career_id)}}
                {{let w_eff1 = info.magic_show ? info.magic_show[index] : null}}
                {{let w_eff2 = it1.TreasurePhase[magic.treasure[0]][1].magic_show ? it1.TreasurePhase[magic.treasure[0]][1].magic_show[index] : null}}
                {{:module = weapon[magic.treasure[0]].module[0][0]}}                
                {{:w_eff =  [w_eff1,w_eff2]}}                
                {{:double =  career_id == "700002" ? true : false}}                
                {{:type = "weapon"}}
                {{:position = career_id == "700001" ? [0,2.3,0] : career_id == "700002" ? [0.3,2.3,0] : [0.25,2.0,0]}}

                {{:scale = [0.8,0.8,0.8]}}
                {{:rotate = [-0.55,1.57,3.14]}}
                {{:scene_bg = "sce_ui_sbzh"}}
                {{:s_eff = null}}                
                {{:body_eff = null}}
            {{else}}
                {{if it1.role.pet.own_skin[0]}}
                    {{: pet_module = it1.pet_module[it1.role.pet.own_skin[0]].module}}
                {{else}}
                    {{: pet_module = it1.pet_module[it1.pet_upgrade[it1.role.pet.pet_info[0]].module].module}}
                {{end}}
                {{:type = "pet"}}
                {{:position = [0,1.9,-0.1]}}
                {{:scale = 1.6}}
                {{:rotate = [0,0.7,0]}}
                {{:s_eff = null}}                
                {{:body_eff = null}}
                {{:scene_bg = null}}
            {{end}}
            <div data-desc="激活时文字显示" w-class="30">
                <div id="scene" style="position:absolute;left: 0;top: -367px;width: 100%;height: 518px;z-index:3;">
                    <app-scene-base-scene>
                        {
                            "name":"uiscene",
                            "type":{{type}},
                            "module":{
                                "module":{{type == "pet" ? pet_module : module}},
                                "weapond":{{weapon_m}},
                                "state":{{type == "pet" ? it1.pose : ""}},
                                "w_eff":{{w_eff}},
                                "position":{{position}},
                                "scale":{{scale}},
                                "rotate":{{rotate}},
                                "double":{{double}},
                                "scene_bg":{{scene_bg}},
                                "s_eff":{{s_eff}},
                                "body_eff":{{body_eff}}
                            },
                            "width":540,
                            "height": 900
                        }
                    </app-scene-base-scene> 
                </div>
                
            </div>
           
        </div>    
        </div>    
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>