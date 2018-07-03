{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let attriCfg = cfg.attribute_config.attribute_config}}
{{let player = _get("app/mod/db").exports.data.player}}
{{let weapon_soul = _get("app/mod/db").exports.data.weapon_soul}}
{{let achieve = _get("app/mod/db").exports.data.achieve}}
{{let cloth = _get("app/mod/db").exports.data.cloth}}
{{let all_star = achieve.record.all_equipment_star}}
{{let root = _get("pi/ui/root").exports}}
{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
{{let index = it1.stars_achieve[it1.achieve_index].career_id.indexOf(player.career_id)}}
<div style="position:absolute;left:0;width:100%;height:100%;z-index:2;">
    <div w-class="role_fg" style="width:100%;height:100%;"></div>
    <div on-tap="goback" class="btn_back" style="bottom: 10px;right: 50%;margin-right: -{{root.getWidth() / 2 - 5}}px;z-index: 1;"></div>
    <div w-class="model_bottom" style="top:522px;width:100%"></div>
    <div w-class="role_bottom" style="width:100%;bottom:0px;"></div>

    <div style="position:absolute;left:0;right:0;top:75px;margin-top:-75px;bottom:0;">

    {{let module = it1.role_base[player.career_id].module}}
    {{let weapon= null}}
    {{let _index = 0}}
    {{let weapon_m = null}}
    {{let w_eff = null}}
    {{let m = null}}
    {{if cloth.wear_skin}}
        {{: _index = cfg.clothes_module.clothes_module[cloth.wear_skin].career_id.indexOf(player.career_id)}}
        {{: module = cfg.clothes_module.clothes_module[cloth.wear_skin].module[_index]}}
    {{else}}
        {{:weapon= friend_battle.equip_set[0]}}
        {{:_index = weapon?weapon.career_id.indexOf(player.career_id):null}}
        {{: m = weapon?weapon.module[_index]:null}}
        
        {{if weapon}}
                {{: weapon_m = m[1]}}
        {{end}}
        {{if m && m.length > 2}}
                {{: w_eff = m.slice(2)}}
        {{end}}
    {{end}}

    {{let s_eff = null}}
    {{if weapon_soul.class > 0}}
          {{let _c = cfg.weapon_soul_base?cfg.weapon_soul_base.weapon_soul_base:null}}
          {{if _c}}
                {{: _c = _c[weapon_soul.class]}}
                {{let idx = _c.career_id.indexOf(player.career_id)}}
                {{: s_eff = _c.effect[idx]}}
          {{end}}
    {{end}}

    {{let w = root.getWidth() }}    
    <app_b-widget-title-title style="z-index:9;">
    {"text":"星级成就","coin":["money","diamond"],"left":"10","top":"10","width":{{w}}}
    </app_b-widget-title-title>
    <div style="width:100%;position:absolute;left:0px;top:78px;bottom:0">
        <div style="width:100%;height:100%;z-index:2">
            <div style="position:absolute;left: 0;top: 0;width: 100%;height: 822px;">
                <app-scene-base-scene>
                    {"name":"uiscene","type":"fighter","module":{"module":{{module}},"weapond":{{weapon_m}},"w_eff":{{w_eff}},"position":[0,-0.5,-1.2],"s_eff":{{s_eff}},"body_eff":{{it1.stars_achieve[it1.achieve_index].effect[index]}},"scale":2,"rotate":[0,0,0],"scene_bg":"sce_ui_jszb"},"width":{{w}},"height":822}
                </app-scene-base-scene>
            </div>
        </div>
    </div>
    <div style="position: absolute;left: 50%;width: 139px;height: 162px;margin-left: -250px;top: 137px;">
        <app_a-widget-img_stitch-stitch style="position: absolute;left: 0;width: 139px;height: 162px;top: 0;">{"type":1,"height":15,"width":15}</app_a-widget-img_stitch-stitch>

        <div style="width:100%;height:20px;position:absolute;top:10px;text-align:center;font-size:20px;color:#ed8c43;font-family:mnjsh;">
            {{it1.stars_achieve[it1.achieve_index].title}}
        </div>
        <app_a-widget-line-line style="width: 85%;top: 37px;height: 2px;left: 10px;">{"line":"line_11"}</app_a-widget-line-line>
        <div style="width:100%;height:110px;position:absolute;top:47px;text-align:center;">
            {{for i,v in it1.stars_achieve[it1.achieve_index].attr}}
                <div class="shadow" style="width:100%;height:20px;position:relative;margin-bottom:5px;text-align:center;font-size:18px;color:{{it1.allstar >= it1.stars_achieve[it1.achieve_index].star ? '#00ff00' : '#b0adad'}};">
                    {{attriCfg[v[0]] + "+" + Math.floor(v[1] * 100) + "%"}}
                </div>
            {{end}}
        </div>
    </div>

    {{if it1.achieve_index == 1}}
    <div w-class="big_arrow" on-tap="nextAttr" style="right:50%;margin-right:-267px;top:365px;"></div>
    {{else}}
    <div w-class="big_arrow" on-tap="nextAttr" style="left:50%;margin-left:-267px;top:365px;transform: scale(-1,1);"></div>
    {{end}}
    

    <div style=" position: absolute;width: 248px;height: 24px;left: 50%;top: 805px;line-height: 24px;margin-left: -130px;text-align: center;color: rgb(255, 215, 168);font-family: mnjsh;font-size: 18px;">
        {{"当前总星数  " + it1.allstar}}
    </div>

    <div style=" position: absolute;width: 248px;height: 24px;left: 50%;top: 837px;line-height: 24px;margin-left: -130px;">
        <app_a-widget-pic_text-pic_text style="position: absolute;left: 0px;top: 0px;">{"icon":"little_tips_bg","width":290,"height":24,"align":"center","marginLeft":3,"text":"","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
        </app_a-widget-pic_text-pic_text>

        <app_a-widget-pic_other-pic_other style="position: absolute;left: -7px;top: 1px;">{"icon":"remind"} 
        </app_a-widget-pic_other-pic_other>

        <span class="shadow" style="position: absolute;color: #FFD7A8;font-family: mnjsh;font-size: 18px;left: 15px;width: 115%;">{{it1.stars_achieve[it1.achieve_index].desc[index]}}</span>
    </div>

    </div>
</div>