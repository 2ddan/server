{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let function_open = cfg.function_open.function_open}}
{{let player = _get("app/mod/db").exports.data.player}}
{{let root = _get("pi/ui/root").exports}}
{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
<div style="position:absolute;left:0;width:100%;height:100%;z-index:2;">
      <div on-tap="goback" class="btn_back" style="bottom: 10px;right: 50%;margin-right: -{{root.getWidth() / 2 - 5}}px;z-index: 3;"></div>
      <div w-class="role_bottom" style="width:100%;bottom:0px;z-index: 2"></div>
    <div style="position:absolute;left:0;right:0;top:75px;margin-top:-75px;bottom:0;">
      {{let player = it1.localDB.player}}
      {{let module = it1.roleCfg[it1.localDB.player.career_id].module}}
      {{let weapon= null}}
      {{let _index = 0}}
      {{let weapon_m = null}}
      {{let w_eff = null}}
      {{let m = null}}
      {{if it1.localDB.cloth.wear_skin}}
            {{: _index = it1.clothes_module[it1.localDB.cloth.wear_skin].career_id.indexOf(it1.localDB.player.career_id)}}
            {{: module = it1.clothes_module[it1.localDB.cloth.wear_skin].module[_index]}}
      {{else}}
            {{:weapon= it1.localDB.friend_battle.equip_set[0]}}
            {{:_index = weapon?weapon.career_id.indexOf(it1.localDB.player.career_id):null}}
            {{: m = weapon?weapon.module[_index]:null}}
            
            {{if weapon}}
                  {{: weapon_m = m[1]}}
            {{end}}
            {{if m && m.length > 2}}
                  {{: w_eff = m.slice(2)}}
            {{end}}
      {{end}}
      {{let s_eff = null}}
      {{if it1.localDB.weapon_soul.class > 0}}
            {{let _c = cfg.weapon_soul_base?cfg.weapon_soul_base.weapon_soul_base:null}}
            {{if _c}}
                  {{: _c = _c[it1.localDB.weapon_soul.class]}}
                  {{let idx = _c.career_id.indexOf(it1.localDB.player.career_id)}}
                  {{: s_eff = _c.effect[idx]}}
            {{end}}
      {{end}}
      {{let body_eff = null}}
      {{if it1.localDB.friend_battle.soul_level}}
            {{let _cc = cfg.equip_star_achieve?cfg.equip_star_achieve.equip_star_achieve:null}}
            {{if _cc}}
                  {{: _cc = _cc[it1.localDB.friend_battle.soul_level]}}
                  {{let idex = _cc.career_id.indexOf(it1.localDB.player.career_id)}}
                  {{: body_eff = _cc.effect[idex]}}
            {{end}}
            
      {{end}}
      {{let w = root.getWidth() }}
      {{let h = root.getHeight()}}
      <app_b-widget-title-title style="z-index:9;position:absolute;">
      {"text":"角 色","coin":["money","diamond"],"left":"35","top":"12","width":{{w}}}
      </app_b-widget-title-title>
      <div style="position:absolute;left: 0;top: 15px;width: 100%;height: 100%;z-index:1">
            <app-scene-base-scene>
                  {"name":"uiscene","type":"fighter","module":{"module":{{module}},"weapond":{{weapon_m}},"w_eff":{{w_eff}},"s_eff":{{s_eff}},"body_eff":{{body_eff}},"position":[0,-0.1,-0.5],"scale":2,"rotate":[0,0,0],"scene_bg":"sce_ui_jszb"},"width":{{w}},"height":{{h}} }
            </app-scene-base-scene>
      </div>
      <div style="width:100%;position:absolute;left:0px;top:78px;bottom:0">
         <div style="width:100%;height:100%;z-index:2">
            
            
            <app-widget-power-power style="left: 50%;top:-11px;margin-left: -150px;z-index: 1;">
                  {"type":1,"power":{{player.power}},"fontSize":24}
            </app-widget-power-power>
            <app_b-role-equip-user_equip style="top: 20px;width: 100%;left: 50%;margin-left: -270px;">{"top":30}</app_b-role-equip-user_equip>

            {{if friend_battle.showInfo}}
            <app_b-popups-popups style="top: 20px;width: 100%;z-index: 1;"></app_b-popups-popups>
            {{end}}

            <app-widget-btn-help style="width:141px;height:52px;bottom: 145px;left: 50%;margin-left: -67.5px;z-index:2;font-size:13px;position: absolute;">{"text":""}</app-widget-btn-help>

            <app-widget-text-text on-tap="gotoAttr" style="position: absolute;bottom: 155px;left: 10px;;right: 0;margin: 0 auto;z-index: 2;">
                  {"text":"查看属性","fontSize":22,"textCfg":"lookDetails"}
            </app-widget-text-text>
         </div>
      </div>
      <div style="position:absolute;margin-left:0px;width:100%;bottom:35px;padding:10px 0;text-align:center;height:45px;z-index: 1;">
            <div style="position:absolute;top:7px;width:100%;text-align:center">
                  {{for i,v of it1.menu}}
                  {{let guide_btn = v.func=="gotoSkill" ? "skill_btn" : v.func=="gotoMagic" ? "magic_btn" :  v.func=="gotoInherit" ? "gest_btn" :  v.func=="gotoSoul" ? "soul_btn" :  v.func=="gotoSurface,0" ? "cloth_btn" : v.func=="gotoSurface,1" ? "pet_btn" :  "weapon_soul_btn"}}
                  {{if (!v.fun_key) || (v.text != "时装" && v.text != "灵宠" && function_open[v.fun_key].id <= it1.localDB.open_fun.id) }}
                  <app-widget-btn-menu on-tap='gotoMenu("{{v.func}}")' style="position:relative;display:inline-block;margin:0 3px;">
                        {"guide":{{guide_btn}},"icon":{{v.icon}},"text":{{v.text}},"width":{{v.text == "神兵"?65:60}},"height":{{v.text == "神兵"?65:60}},"bottom":-2,"fontSize":20,"tip_keys":{{v.tip_keys}} }
                  </app-widget-btn-menu>
                  {{end}}
                  {{if v.text == "时装" }}
                        <app_a-widget-btn-ling style="width: 60px;height: 60px;position: absolute;bottom: 110px;left: 110px;">{"class": "default","fontsize": 12,"color": "#fdedd7;","text": "","width":90,"height":90}</app_a-widget-btn-ling>
                        <app-widget-btn-menu on-tap='gotoSurface(0)' style="position: absolute;display: inline-block;width: 52px;height: 52px;text-align: center;left: 120px;bottom: 120px;">
                              {"guide":{{guide_btn}},"icon":"menu_cloth_icon","text":"时装","width":68,"height":68,"bottom":-2,"fontSize":20,"position":"absolute","tip_keys":{{v.tip_keys}} }
                        </app-widget-btn-menu>
                  {{end}}
                  {{if v.text == "灵宠" && (function_open[v.fun_key].id <= it1.localDB.open_fun.id)}}
                        <app_a-widget-btn-ling style="width: 60px;height: 60px;position: absolute;bottom: 110px;right: 105px;">{"class": "default","fontsize": 12,"color": "#fdedd7;","text": "","width":90,"height":90}</app_a-widget-btn-ling>
                        <app-widget-btn-menu on-tap='gotoSurface(1)' style="position: absolute;display: inline-block;width: 52px;height: 52px;text-align: center;right: 115px;bottom: 120px;">
                              {"guide":{{guide_btn}},"icon":"menu_pet_icon","text":"宠物","width":68,"height":68,"bottom":-2,"fontSize":20,"position":"absolute","tip_keys":{{v.tip_keys}} }
                        </app-widget-btn-menu>
                  {{end}}
                  {{end}}
            </div>
      </div>
    </div>
</div>