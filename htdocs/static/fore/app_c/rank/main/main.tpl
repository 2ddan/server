<div style="position:absolute;width:100%;top:50px;height: 659px;">
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let friend_battle = appCfg.friend_battle}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let treasure_up = cfg.treasure_up.treasure_up}}
    {{let clothes_module = cfg.clothes_module.clothes_module}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let rank_base = cfg.rank_base.rank_base}}
    {{let treasure_break = cfg.treasure_break.treasure_break}}
    {{let TreasurePhase = cfg.TreasurePhase.TreasurePhase}}
    
    {{let rankData = it1.baseData[it1.tabSwitch][1]}}
    {{let treasureNum = ["一","二","三","四","五","六","七","八","九","十"]}}
    
    {{if rankData.length}}
    
    <div style="width:490px;height:400px;position:absolute;left:0px;top:0px;">
        {{let module = it1.role_base[rankData[0].career_id].module}}
        {{let weapon= null}}
        {{let _index = 0}}
        {{let weapon_m = null}}
        {{let w_eff = null}}
        {{let m = null}}
        {{let type = "fighter"}}
        {{let position = [0.6,1.5,-0.5]}}
        {{let rotate = [0,0,0]}}

        {{if rankData[0].clothes}}
            {{: _index = clothes_module[rankData[0].clothes].career_id.indexOf(rankData[0].career_id)}}
            {{: module = clothes_module[rankData[0].clothes].module[_index]}}
        {{else}}
            {{: weapon= rankData[0].equip_info}}
            {{: _index = weapon?weapon.career_id.indexOf(rankData[0].career_id):null}}
            {{: m = weapon?weapon.module[_index]:null}}
            
            {{if weapon}}
                {{: weapon_m = m[1]}}
            {{end}}
            {{if m && m.length > 2}}
                    {{: w_eff = m.slice(2)}}
            {{end}}
        {{end}}

        {{let s_eff = null}}
        {{if rankData[0].ensoul_class > 0}}
              {{let _c = cfg.weapon_soul_base?cfg.weapon_soul_base.weapon_soul_base:null}}
              {{if _c}}
                    {{: _c = _c[rankData[0].ensoul_class]}}
                    {{let idx = _c.career_id.indexOf(rankData[0].career_id)}}
                    {{: s_eff = _c.effect[idx]}}
              {{end}}
        {{end}}
        {{let body_eff = null}}
        {{if rankData[0].soul_level}}
              {{let _cc = cfg.equip_star_achieve?cfg.equip_star_achieve.equip_star_achieve:null}}
              {{if _cc}}
                    {{: _cc = _cc[rankData[0].soul_level]}}
                    {{let idex = _cc.career_id.indexOf(rankData[0].career_id)}}
                    {{: body_eff = _cc.effect[idex]}}
              {{end}}
              
        {{end}}

        {{let pet = ""}}
        {{let treasure1 = ""}}
        {{let module_info = ""}}
        {{let double = false}}
        {{if it1.tabSwitch == "treasure_rank"}}
            {{let magic = rankData[0]}}
            {{let treasureId = magic.treasure.treasure[0]}}
            {{let weaponCfg = _get("app/scene/plan_cfg/parts_config").exports.parts_cfg}}
            {{: module = weaponCfg[treasureId].module[0][0]}}
            {{let info = TreasurePhase[treasureId][magic.treasure.treasure[1]]}}
            {{let index = info.career_id.indexOf(rankData[0].career_id)}}
            {{let w_eff1 = info.magic_show ? info.magic_show[index] : null}}
            {{let w_eff2 = info.magic_show ? info.magic_show[index] : null}}
            {{:w_eff = [w_eff1,w_eff2]}}
            {{let career_id = rankData[0].career_id}}
            {{:double = career_id == "700002" ? true : false}}
            {{:position =  career_id == "700001" ? [0.85,2.5,0] : career_id == "700002" ? [0.9,2.5,0] : [1.2,2.1,0]}}

            {{:type = "weapon"}}
            {{:rotate = [-3.7,1.57,0]}}
        {{elseif it1.tabSwitch == "pet_rank"}}
            {{: module_info = it1.pet_module[it1.pet_upgrade[rankData[0].pet_class].module]}}
            {{if  rankData[0].pet && rankData[0].pet.own_skin[0]}}
                {{: module = it1.pet_module[rankData[0].pet.own_skin[0]].module}}
            {{else}}
                {{: module = module_info.module}}
            {{end}}
            {{:type = "pet"}}
            {{:rotate = [0,0.7,0]}}

        {{end}}

        <div style="position: absolute;left: 50%;top: 115px;width: 401px;height: 370px;margin-left: -199px;z-index: 1;">
            <app-scene-base-scene>
                {
                    "name":"uiscene",
                    "type":{{type}},
                    "module":{
                        "type":{{it.type}},
                        "module":{{module}},
                        "weapond":{{weapon_m}},
                        "w_eff":{{w_eff}},
                        "s_eff":{{s_eff}},
                        "body_eff":{{body_eff}},
                        "double":{{double}},
                        "position":{{position}},
                        "scale":{{it1.tabSwitch == "treasure_rank" ? [0.9,0.9,0.9] : 1}},
                        "rotate":{{rotate}},
                        "sid":{{player.role_id}},
                        "scene_bg":"sce_ui_phb"
                    },
                    "width":540,
                    "height":900
                }
            </app-scene-base-scene>
        </div>

        {{let topData = rankData[0]}}
        {{let text1 = ''}}
        {{if it1.tabSwitch == "fight_power_rank"}}
            {{:text1 = Common.numberCarry(parseInt(topData.fight_power || 3155689),10000)}}
        {{elseif it1.tabSwitch == "level_rank"}}
            {{:text1 = topData.level + "级"}}
        {{elseif it1.tabSwitch == "equip_rank"}}
            {{:text1 = topData.equip_garde}}
        {{elseif it1.tabSwitch == "treasure_rank"}}
            {{if topData.treasure_level - 10 <= 0}}
            {{:text1 =( treasureNum[topData.treasure_level - 1] || "零" )+ "阶"}}
            {{else}}
            {{:text1 = treasureNum[9] + treasureNum[topData.treasure_level%10 - 1] + "阶"}}
            {{end}}
        {{elseif it1.tabSwitch == "pet_rank"}}
            {{:text1 = topData.pet_class + "阶" + topData.pet_star + "星"}}
        {{end}}

        <img src="../images/rank_one_bg.png" style="position:absolute;" />

        <app_a-widget-rank-rank_num style="width: 74px;height: 66px;position: absolute;top: 4px;left: 17px;z-index:1">{"num":1}</app_a-widget-rank-rank_num>

        <div style="width:220px;height:299px;position:absolute;right:0;top:45px;z-index:2">
            <img src="../images/rank_one_info.png" style="position:absolute" />

            {{let imgX= ''}}

                {{: imgX = Pi.pictures['playerhead'+(topData.head || topData.career_id)]}}
            <img src="../images/rank_head_bg.png" style="position: absolute;left: 4px;right: 0px;margin: 0 auto;top: 24px;" />
            <app_a-widget-head-friend on-tap="seeOther({{topData.role_id}})" style="position: absolute;left: 69px;top: 31px;width: 90px;height: 90px;">
                {"url":{{imgX}},"top":3.5,"level":{{topData.level}},"width":60,"height":60}    
            </app_a-widget-head-friend>

            <div style="width: 100%;height: 29px;position: absolute;font-size: 18px;color: #fde7ca;top: 118px;line-height: 30px;text-align: center;font-family: mnjsh;">{{Common.fromCharCode(topData.name)}}</div>

            {{let vip_lv = topData.vip || 0}}
            {{if vip_lv}}
            <widget class="shadow7" style="position: absolute;left: 5px;top: 96px;right: 0;margin: 0 auto;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":{{"vip_lv_"+(it1.vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","text":{{"VIP"+vip_lv}},"top":0,"left":0} 
            </widget>
            {{end}}
          

            <img src="../images/{{it1.tabSwitch}}.png" style="position: absolute;left: 4px;right: 0px;margin: 0 auto;top: 160px;" />

            <app_a-widget-text-text style="position: absolute;left: 8px;top: 228px;right: 0;margin: 0 auto;">{"text":{{text1 + ""}},"textCfg":"rankInfo","fontSize":30,"space":-6}</app_a-widget-text-text>
        </div>
        <div style="width: 200px;height: 41px;position: absolute;left: 285px;bottom: 18px;z-index: 2;">
            <div on-tap='isTags("{{[topData.role_id,0]}}")' style="width: 89px;height: 41px;position: relative;display: inline-block;">
                <img src="../images/flowers.png" style="position:absolute;z-index:1" />
                <app_a-widget-pic_text-pic_text style="position: absolute;top: 23px; left: 24px;color: #fff;font-size: 15px;line-height: 19px;">
                    {"icon":"equip_level_bg","width":63,"height":19,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":15,"top":0,"left":0,"text":{{"X" + topData.praise_count}}}
                </app_a-widget-pic_text-pic_text>
            </div>
            <div on-tap='isTags("{{[topData.role_id,1]}}")' style="width: 89px;height: 41px;position: relative;display: inline-block;margin-left: 10px;">
                <img src="../images/eggs.png" style="position:absolute;z-index:1" />
                <app_a-widget-pic_text-pic_text style="position: absolute;top: 22px; left: 24px;color: #fffbf6;font-size: 15px;line-height: 19px;">
                    {"icon":"equip_level_bg","width":63,"height":19,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":15,"top":0,"left":0,"text":{{"X" + topData.trample_count}}}
                </app_a-widget-pic_text-pic_text>
            </div>
        </div>

        <app_a-widget-line-line style="left: 1px;bottom: 10px;z-index: 1;width: 100%;">
            {"line":"line_12"} 
        </app_a-widget-line-line>
    </div>

    <div data-desc="人物详情" style="width: 100%;overflow: hidden;position:absolute;top: 400px;bottom: 0;z-index:1">       
        <div scroller="1" style="width: 105%;overflow-y:auto;overflow-x:hidden;z-index:1;position:absolute;top:0;bottom:10px;">
            {{for i,v of rankData}}
                {{let text = ''}}
                {{if it1.tabSwitch == "fight_power_rank"}}
                    {{:text = Common.numberCarry(parseInt(v.fight_power || 3155689),10000)}}
                {{elseif it1.tabSwitch == "level_rank"}}
                    {{:text = v.level}}
                {{elseif it1.tabSwitch == "equip_rank"}}
                    {{:text = v.equip_garde}}
                {{elseif it1.tabSwitch == "treasure_rank"}}
                    {{if v.treasure_level - 10 <= 0}}
                    {{:text = (treasureNum[v.treasure_level - 1] || "零") + "阶"}}
                    {{else}} 
                    {{:text = treasureNum[9] + treasureNum[v.treasure_level%10 - 1] + "阶"}}
                    {{end}}
                {{elseif it1.tabSwitch == "pet_rank"}}
                    {{:text = v.pet_class + "阶" + v.pet_star + "星"}}
                {{end}} 

                {{if i > 0}}
                    <div style="width:95%;height:88px;position:relative;left: 9px;margin-bottom: 10px;">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 475px;height: 87px;z-index:-1;left: 0;">{"type":2,"height":20,"width":30}</app_a-widget-img_stitch-stitch>
                        
                        {{if player.role_id == v.role_id}}
                        <app_a-widget-pic_other-pic_other style="position: absolute;left: 0px;width: 475px;height:87px">{"icon":"my_rank_bg"}</app_a-widget-pic_other-pic_other>
                        {{end}}

                        {{if i<=2}}
                        <app_a-widget-rank-rank_num style="position:absolute;width: 74px;height: 66px;left: 15px;top: 10px;">{"num":{{i+1}}}</app_a-widget-rank-rank_num>
                        {{else}}
                        <div class="shadow6" style="position: absolute;width: 93px;height: 66px;left: 8px;top: 10px;font-size:45px;font-family:mnjsh;color:#ffd8a6;text-align:center;line-height:66px">{{i+1}}</div>
                        {{end}}

                        <app_a-widget-line-line style="position: absolute;left: 100px;top: 0;z-index:1;height:100%;width: 3px;">
                            {"line":"line_9"} 
                        </app_a-widget-line-line>

                        {{let img= ''}}

                            {{: img = Pi.pictures['playerhead'+(v.head || v.career_id)]}}
                        <app_a-widget-head-friend on-tap="seeOther({{v.role_id}})" style="position: absolute;left: 114px;top: 3px;width: 85px;height: 85px;">
                            {"url":{{img}},"top":2.5,"level":{{v.level}},"width":60,"height":60}    
                        </app_a-widget-head-friend>

                        <div class="shadow7" style="width:165px;height:20px;position:absolute;font-size:18px;color:#f3d6af;top:10px;line-height: 20px;left: 200px;font-family:mnjsh">
                            <span style="position:relative;display:inline-block">{{Common.fromCharCode(v.name)}}</span>

                            {{let vip_lv = v.vip || 0}}
                            {{if vip_lv}}
                            <widget class="shadow7" style="position:relative;display:inline-block;margin-left: 10px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                                {"icon":{{"vip_lv_"+(it1.vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","text":{{"VIP"+vip_lv}},"top":0,"left":0} 
                            </widget>
                            {{end}}
                           
                        </div>

                        <div style="position: absolute;left: 190px;top: 31px;height: 53px;width: auto;">
                            <img src="../images/{{it1.tabSwitch + '1'}}.png" style="position: relative;display: inline-block;"/>
                            <app_a-widget-text-text style="position: absolute;top: 15px;left: 70px;">{"text":{{text + ""}},"textCfg":"rankInfo","fontSize":22,"space":0,"shadow":{"offsetX": 0,"offsetY": 0,"blur": 0,"color": ""}}</app_a-widget-text-text>
                        </div>

                        {{if i<=2}}
                        <div style="width: 95px;height: 70px;position: absolute;left: 380px;bottom: 18px;">
                            <div on-tap='isTags("{{[v.role_id,0]}}")' style="width: 89px;height: 41px;position: relative;display: inline-block;">
                                <img src="../images/flowers.png" style="position:absolute;z-index:1" />
                                <app_a-widget-pic_text-pic_text style="position: absolute;top: 23px; left: 24px;color: #fff;font-size: 15px;line-height: 19px;">
                                    {"icon":"equip_level_bg","width":63,"height":19,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":15,"top":0,"left":0,"text":{{"X" + v.praise_count}}}
                                </app_a-widget-pic_text-pic_text>
                            </div>
                            <div on-tap='isTags("{{[v.role_id,1]}}")' style="width: 89px;height: 41px;position: relative;display: inline-block;top: -15px;">
                                <img src="../images/eggs.png" style="position:absolute;z-index:1" />
                                <app_a-widget-pic_text-pic_text style="position: absolute;top: 22px; left: 24px;color: #fffbf6;font-size: 15px;line-height: 19px;">
                                    {"icon":"equip_level_bg","width":63,"height":19,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":15,"top":0,"left":0,"text":{{"X" + v.trample_count}}}
                                </app_a-widget-pic_text-pic_text>
                            </div>
                        </div>
                        {{end}}
                    </div>
                {{end}}
            {{end}}
        </div>
    </div>
    {{else}}
    <div style="width:100%;font-size: 23px;font-family: mnjsh;color: #fff;text-align: center;top: 270px;position: absolute;">暂无数据</div>
    {{end}}
</div>