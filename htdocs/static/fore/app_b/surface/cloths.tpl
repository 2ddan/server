<div maxId="105" style="position:absolute;width:100%;height:100%;z-index:2" w-class="2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}	
    <app_b-widget-title-title w-class="3" w-sid="3" style="z-index: 2;">
        {"text":"时  装","coin":["money","diamond"],"left":10,"top":12,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
    </app_b-widget-title-title>

    <img src="app_b/role/image/role_bottom.png" style="width:100%;position:absolute;bottom:0px;z-index: 2;height: 39px;"/>
    
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let cloth_info = appCfg.cloth}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let player = it1.player}}
    {{let id = it1.cloth_id - 0}}
    {{let currCloth = it1.Pi.sample[it1.cloth_id]}}
    {{let has = it1.cloth.own_clothes.indexOf(it1.cloth_id)<0 ? false : true }}

    {{let module  = null}}
    {{let weapon= null}}
    {{let weapon_m = null}}
    {{let w_eff = null}}
    {{let m = null}}

    {{if id ==1}}
        {{:module = it1.roleCfg[player.career_id].module}}
    {{else}}
        {{let _index = it1.clothes_module[id].career_id.indexOf(player.career_id)}}
        {{:module = it1.clothes_module[id].module[_index]}}
    {{end}}
    

    {{if weapon}}
        {{: weapon_m = m[1]}}
    {{end}}
    {{if m && m.length > 2}}
        {{: w_eff = m.slice(2)}}
    {{end}}

    {{let s_eff = null}}
    {{if appCfg.weapon_soul.class > 0}}
            {{let _c = cfg.weapon_soul_base?cfg.weapon_soul_base.weapon_soul_base:null}}
            {{if _c}}
                {{: _c = _c[appCfg.weapon_soul.class]}}
                {{let idx = _c.career_id.indexOf(appCfg.player.career_id)}}
                {{: s_eff = _c.effect[idx]}}
            {{end}}
    {{end}}
    {{let body_eff = null}}
    {{if appCfg.friend_battle.soul_level}}
            {{let _cc = cfg.equip_star_achieve?cfg.equip_star_achieve.equip_star_achieve:null}}
            {{if _cc}}
                {{: _cc = _cc[appCfg.friend_battle.soul_level]}}
                {{let idex = _cc.career_id.indexOf(appCfg.player.career_id)}}
                {{: body_eff = _cc.effect[idex]}}
            {{end}}
    {{end}}
    <div style="position:absolute;left: 0;top: 73px;width: 540px;height: 745px;z-index:1;right: 0;margin: 0 auto;overflow: hidden;">
        <app-scene-base-scene>
            {"name":"uiscene","type":"fighter","module":{"module":{{module}},"weapond":{{weapon_m}},"w_eff":{{w_eff}},"body_eff":{{body_eff}},"s_eff":{{s_eff}},"position":[0,1.7,-0.1],"scale":0.8,"rotate":[0,0,0],"scene_bg":"sce_ui_szjm"},"width":540,"height":910}
        </app-scene-base-scene>
    </div>

    <div w-class="4" w-sid="4" style="left: 50%;margin-left: -270px;">
        <div w-class="5" w-sid="5">

            <div w-class="6" w-sid="6">
                <app_a-widget-line-line w-class="8" w-sid="8" style="z-index:1">
                    {"line":"line_7"} 
                </app_a-widget-line-line>

                <div w-class="11" w-sid="11" style="z-index:1">
                    <app_a-widget-btn-ling w-class="59" w-sid="59" on-tap="gotoRecovery">
                        {"class":"default","fontsize":12,"color":"#fdedd7;","text":"","width":70,"height":70,"tip_keys":["role.cloth.clear"]} 
                    </app_a-widget-btn-ling>
                    <app_a-widget-text-text w-class="60" w-sid="60" style="pointer-events: none;">
                        {"text":"一键","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>
                    <app_a-widget-text-text w-class="61" w-sid="61" style="pointer-events: none;">
                        {"text":"回收","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>
                </div>

                <div w-class="95" w-sid="95" on-tap="lookClothesAttr" style="z-index:1">
                    <app_a-widget-btn-ling w-class="96" w-sid="96">
                        {"class":"default","fontsize":12,"color":"#fdedd7;","text":"","width":70,"height":70} 
                    </app_a-widget-btn-ling>
                    <app_a-widget-text-text w-class="97" w-sid="97">
                        {"text":"属性","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>
                    <app_a-widget-text-text w-class="98" w-sid="98">
                        {"text":"总览","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>
                </div>

                <app_a-widget-pic_text-pic_text w-class="13" class="shadow" w-sid="13" style="z-index: 1;">
                    {"icon":"name_bg_2","width":184,"height":32,"align":"center","marginLeft":3,"text":{{id==1?"默认外观" : it1.clothes_module[id].name[it1.clothes_module[id].career_id.indexOf(player.career_id)]}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>

                <div style="width:40px;position: absolute;top:400px;left:70px; color: #FFD7A8; font-size: 18px;z-index:2">属性加成</div>
                <span w-class="64" w-sid="64" class="scroll_box_h" layout="scroll" style="position: absolute;color: rgb(255, 250, 0);top: 400px;z-index: 2;width: 330px;text-align: left;font-size: 18px;white-space: inherit;left: 140px;">
                    {{if currCloth}}
                        {{if currCloth.attr}}
                            {{for j,k of currCloth.attr}}
                            {{if (j+1)%2}}
                            <span style="width:50%;height:20px;position:relative;display: inline-block;">
                                {{it1.attribute_config[k[0]]+"+"+(k[1]<1?Math.floor(k[1]*100)+"%":k[1])}}
                            </span>
                            {{end}}
                            {{end}}
                            {{for j,k of currCloth.attr}}
                            {{if j%2}}
                            <span style="width:50%;height:20px;position:relative;display: inline-block;">
                                {{it1.attribute_config[k[0]]+"+"+(k[1]<1?Math.floor(k[1]*100)+"%":k[1])}}
                            </span>
                            {{end}}
                            {{end}}
                        {{end}}
                    {{else}}
                    <span style="width:50%;height:20px;position:relative;display: inline-block;line-height: 50px;">
                        无附加属性
                    </span>
                    
                    {{end}}
                </span>

                <app_a-widget-bg_frame-bg w-class="63" w-sid="63" style="bottom:-20px;z-index: 1;">
                    {"bgName":"bg_frame44"} 
                </app_a-widget-bg_frame-bg>

            </div>
            
            <div w-class="15" w-sid="15" style="z-index:1;top:450px">
                <div w-class="67" class="scroll_box_h" layout="scroll" w-sid="67">
                    <div on-tap="clothChange(0,1)" w-class="75" w-sid="75">
                        <app_a-widget-prop-base w-class="69" w-sid="69">
                            {"width":80,"height":80,"prop":{"quality":1},"url":"app_b/widget/icons/menu_cloth_icon.png","count":"none","name":"默认外观","bg":1,"bottom":20,"top":25,"right":25}
                        </app_a-widget-prop-base>
                        {{if id  == 1}}
                        <img w-class="85" src="app_c/forge/images/equip_select.png" w-sid="85"/>
                        {{end}}
                        
                        {{if !cloth_info.wear_skin}}
                        <app_a-widget-pic_text-pic_text w-class="84" w-sid="84">
                            {"icon":"wear","width":80,"height":50,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                        </app_a-widget-pic_text-pic_text>
                        {{end}}
                    </div>
                    {{for m, n in it1.cloth_skin }}
                    {{let prop = it1.Pi.sample[n]}}
                    {{let index = it1.clothes_module[n].career_id.indexOf(player.career_id)}}
                    {{let icon = it1.clothes_module[n].icon[index] }}
                    {{let name = it1.clothes_module[n].name[index]}}
                    
                    {{let url = "app_b/surface/image/"+icon+".png"}}
                    <div on-tap="clothChange(0,{{n}})" w-class="75" w-sid="75">
                        <app_a-widget-prop-base w-class="69" w-sid="69">
                            {"width":80,"height":80,"prop":{{prop}},"url":{{url}},"count":"none","name":{{name}},"bg":1,"quality":{{prop.quality}},"bottom":20,"top":25,"right":25,"tip_keys":[{{'role.cloth.'+n}}]}
                        </app_a-widget-prop-base>

                        {{if cloth_info.wear_skin - 0 === n - 0}}
                        <app_a-widget-pic_text-pic_text w-class="84" w-sid="84">
                            {"icon":"wear","width":80,"height":50,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                        </app_a-widget-pic_text-pic_text>
                        {{end}}

                        {{if id - 0 === n - 0}}
                        <img w-class="85" src="app_c/forge/images/equip_select.png" w-sid="85"/>
                        {{end}}

                    </div>
                    {{end}}
                    {{for k,v of [1,1,1] }}                    
                    {{let url = "app_b/widget/icons/menu_cloth_icon.png"}}
                    <div w-class="75" w-sid="75">
                        <app_a-widget-prop-base w-class="69" w-sid="69" style="filter: grayscale(100%);">
                            {"width":80,"height":80,"prop":{"quality":6},"url":{{url}},"count":"none","name":"未开放","bg":1,"quality":6,"bottom":20,"top":25,"right":25}
                        </app_a-widget-prop-base>
                    </div>
                    {{end}}
                </div>
                {{if id != 1}}
                    {{if !has && currCloth.act_condition}}
                    {{let prop = it1.Pi.sample[currCloth.act_condition[0]]}}
                    {{let url = it1.Pi.pictures[prop.icon]}}
                    
                    <div w-class="102" w-sid="102" style="top: 140px;">
                        <app_a-widget-prop-base w-class="103" w-sid="103" on-tap="showPropInfo({{currCloth.act_condition[0]}})">
                                {"width":80,"height":80,"prop":{{prop}},"url":{{url}},"count":"none","name":"none","bg":"","quality":1,"bottom":20,"top":25,"right":25} 
                        </app_a-widget-prop-base>
                        <app_a-widget-pic_text-pic_text w-class="104" w-sid="104">
                                {"icon":"equip_txt_bg","width":73,"height":22,"align":"center","marginLeft":3,"text":{{it1.getFragCount(id)+"/"+currCloth["act_condition"][1]}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                        </app_a-widget-pic_text-pic_text>
                    </div>
                    <app_a-widget-btn-rect w-class="92" w-sid="92" on-tap="change({{id}})" style="top: 165px;">
                        {"class":"default","fontsize":24,"color":"#fdedd7;","text":"兑    换","width":112,"height":41,"marginLeft":0}
                    </app_a-widget-btn-rect>
                    {{else}}
                        {{let obj = it1.cloth}}
            
                        {{if obj.wear_skin - 0 !== id - 0}}
                        <app_a-widget-btn-rect on-tap="wear" w-class="92" w-sid="92" style="left:195px;top: 165px;">
                            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"穿    戴","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{else}}
                        <app_a-widget-btn-rect on-tap="wearTip" w-class="92" w-sid="92" style="left:195px;top: 165px;">
                            {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已穿戴","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{end}}
                    {{end}}
                {{else}}
                    {{if it1.cloth.wear_skin}}
                        <app_a-widget-btn-rect on-tap="down" w-class="92" w-sid="92" style="left:195px;top: 165px;">
                            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"穿    戴","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                    {{else}}
                    <app_a-widget-btn-rect on-tap="wearTip" w-class="92" w-sid="92" style="left:195px;top: 165px;">
                        {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已穿戴","width":116,"height":45,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                    {{end}}
                {{end}}
            </div>
        </div>
        <span w-class="101" class="shadow" w-sid="101" style="top: 720px;z-index:1">更换外观不影响属性效果</span>
    </div>


    <app_b-widget-bg-goback on-tap="clothgoback"></app_b-widget-bg-goback>
</div>