<div maxId="94" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    <app_b-widget-title-title w-class="3" w-sid="3" style="z-index:2">
        {"text":"灵宠外观","coin":["money","diamond"],"left":10,"top":12,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
    </app_b-widget-title-title>
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let pet_info = appCfg.pet}}
    {{let id = it1.pet_id }}
    {{let currCloth = it1.Pi.sample[it1.pet_id]}}
    {{let has = pet_info.own_skin.indexOf(it1.pet_id - 0) < 0 ?false:true}}

    <img src="app_b/role/image/role_bottom.png" style="width:100%;position:absolute;bottom:0px;z-index: 2;height: 39px;"/>
    {{let module  = null}}
    {{let scale  = null}}
    {{if id==1}}
        {{let module_info = it1.pet_module[it1.pet_upgrade[pet_info.pet_star_info[0]].module]}}
        {{:module = module_info.module}}
        {{:scale = module_info.scale}}
    {{else}}
        {{:module = it1.pet_module[currCloth.sid].module}}
        {{:scale = it1.pet_module[currCloth.sid].scale}}  
    {{end}}
    <div style="position:absolute;left: 0;top: 104px;width: 540px;height: 680px;z-index:1;right: 0;margin: 0 auto;overflow: hidden;">
        <app-scene-base-scene>
            {"name":"uiscene","type":"pet","module":{"module":{{module}},"position":[0,1.9,-0.1],"scale":{{scale}},"rotate":[0,{{it1.player.pet_show_rotate ? it1.player.pet_show_rotate : 0.7}},0],"state":{{it1.pose_show}},"parent":{"hiddle":1},"scene_bg":"sce_ui_cwjm","type":{{id==1 ? "pet" : "pet_show"}},"pet_eff":{{id==1 ? "" : "eff_pet_1"}}},"width":540,"height":900 }
        </app-scene-base-scene>
    </div>

    <div w-class="4" w-sid="4" style="left: 50%;margin-left: -270px;">
        <div w-class="5" w-sid="5">

            <div w-class="6" w-sid="6">
                <app_a-widget-line-line w-class="8" w-sid="8" style="z-index: 1;">
                    {"line":"line_7"} 
                </app_a-widget-line-line>

                <div w-class="11" w-sid="11" on-tap="gotoRecovery" style="z-index: 1;">
                    <app_a-widget-btn-ling w-class="59" w-sid="59">
                        {"class":"default","fontsize":12,"color":"#fdedd7;","text":"","width":70,"height":70,"tip_keys":["role.pet.skin.clear"]} 
                    </app_a-widget-btn-ling>
                    <app_a-widget-text-text w-class="60" w-sid="60">
                        {"text":"一键","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>
                    <app_a-widget-text-text w-class="61" w-sid="61">
                        {"text":"回收","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
                    </app_a-widget-text-text>

                </div>

                <app_a-widget-pic_text-pic_text w-class="13" class="shadow" w-sid="13" style="z-index:2">
                    {"icon":"name_bg_2","width":184,"height":32,"align":"center","marginLeft":3,"text":{{id==1?"默认外观":currCloth.name}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>
               
                <div style="width:40px;position: absolute;top:360px;left:70px; color: #FFD7A8; font-size: 18px;z-index:2">属性加成</div>
                <span w-class="64" w-sid="64" class="scroll_box_h" layout="scroll" style="z-index: 2;width: 330px;white-space: inherit;left: 140px;">
                    {{if currCloth}}
                        {{if currCloth.attr}}
                        {{for j,k of currCloth.attr}}
                        <span style="width:50%;height:20px;position:relative;display: inline-block;">
                            {{it1.attribute_config[k[0]]+"+"+(k[1]<1?Math.floor(k[1]*100)+"%":k[1])}}
                        </span>
                        {{end}}
                        {{end}}
                    {{else}}
                        <span style="width:50%;height:20px;position:relative;display: inline-block;line-height: 24px;">
                            无附加属性
                        </span>
                    
                    {{end}}
                </span>
                <app_a-widget-bg_frame-bg w-class="63" w-sid="63" style="z-index:1">
                    {"bgName":"bg_frame44"} 
                </app_a-widget-bg_frame-bg>
            </div>

            <div w-class="15" w-sid="15" style="z-index: 1;">
                <app_a-widget-bg_frame-bg w-class="58" w-sid="58">
                    {"bgName":"bg_frame43"} 
                </app_a-widget-bg_frame-bg>
                <div w-class="67" class="scroll_box_h" layout="scroll" w-sid="67">
                    <div on-tap="clothChange(1,1)" w-class="75" w-sid="75">
                        <app_a-widget-prop-base w-class="69" w-sid="69">
                            {"width":80,"height":80,"prop":{"quality":1},"url":"app_b/widget/icons/menu_pet_icon.png","count":"none","name":"默认外观","bg":1,"bottom":20,"top":25,"right":25}
                        </app_a-widget-prop-base>
                        {{if id  == 1}}
                        <img w-class="85" src="app_c/forge/images/equip_select.png" w-sid="85"/>
                        {{end}}
                        
                        {{if !pet_info.wear_skin}}
                        <app_a-widget-pic_text-pic_text w-class="84" w-sid="84">
                            {"icon":"wear","width":80,"height":50,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                        </app_a-widget-pic_text-pic_text>
                        {{end}}
                    </div>
                    {{for m, n in it1.pet_skin }}
                    {{let prop = it1.Pi.sample[n]}}
                    {{if prop.is_default}}
                    {{let url = "app_b/surface/image/"+prop.icon+".png"}}
                    <div w-class="75" w-sid="75" on-tap="clothChange(1,{{n - 0}})">
                        <app_a-widget-prop-base w-class="69"  w-sid="69">
                            {"width":80,"height":80,"prop":{{prop}},"url":{{url}},"count":"none","name":{{prop.name}},"bg":1,"quality":{{prop.quality}},"bottom":20,"top":25,"right":25,"tip_keys":[{{'role.pet.skin.'+n}}]} 
                        </app_a-widget-prop-base>
                        {{if pet_info.wear_skin - 0 === n - 0}}
                        <app_a-widget-pic_text-pic_text w-class="84" w-sid="84">
                            {"icon":"wear","width":80,"height":50,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                        </app_a-widget-pic_text-pic_text>
                        {{end}}

                        {{if id - 0 === n - 0}}
                        <img w-class="85" src="app_c/forge/images/equip_select.png" w-sid="85"/>
                        {{end}}
                    </div>
                    {{end}}
                    {{end}}
                    {{for k,v of [1,1,1] }}
                    {{let url = "app_b/surface/image/res_pet1.png"}}
                    <div w-class="75" w-sid="75">
                        <app_a-widget-prop-base w-class="69"  w-sid="69" style="filter: grayscale(100%);">
                            {"width":80,"height":80,"prop":{"quality":6},"url":{{url}},"count":"none","name":"未开放","quality":6,"bg":1,"bottom":20,"top":25,"right":25} 
                        </app_a-widget-prop-base>
                        
                    </div>
                    {{end}}
                </div>
                {{if id != 1}}

                    {{if !has && currCloth.act_condition}}
                        {{let prop = it1.Pi.sample[currCloth.act_condition[0]]}}
                        {{let url = it1.Pi.pictures[prop.icon]}}
                        <div w-class="68" w-sid="68">
                            <app_a-widget-prop-base w-class="90" w-sid="90" on-tap="showPropInfo({{currCloth.act_condition[0]}})">
                                {"width":80,"height":80,"prop":{{prop}},"url":{{url}},"count":"none","name":"none","bg":"","quality":1,"bottom":20,"top":25,"right":25} 
                            </app_a-widget-prop-base>

                            <app_a-widget-pic_text-pic_text w-class="93" w-sid="93">
                                {"icon":"equip_txt_bg","width":73,"height":22,"align":"center","marginLeft":3,"text":{{it1.getFragCount(id)+"/"+currCloth["act_condition"][1]}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
                            </app_a-widget-pic_text-pic_text>

                        </div>
                        {{let bol = it1.getFragCount(id) >= currCloth["act_condition"][1]}}
                        <app_a-widget-btn-rect w-class="92" w-sid="92" on-tap="change({{id}})">
                            {"class":{{bol ? "hl" : "disabled"}},"fontsize":24,"color":"#fdedd7;","text":"兑    换","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                    {{else}}
                        {{let obj = it1.pet}}
            
                        {{if obj.wear_skin - 0 !== id - 0}}
                        <app_a-widget-btn-rect on-tap="{{currCloth.is_default ? 'wear' : 'down'}}" w-class="92" w-sid="92" style="left:50%;margin-left:-55px;">
                            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"穿   戴","width":110,"height":39,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{else}}
                        <app_a-widget-btn-rect on-tap="wearTip" w-class="92" w-sid="92" style="left:195px;top: 165px;">
                            {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已穿戴","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{end}}
                    {{end}}
                {{else}}
                    {{if pet_info.wear_skin}}
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

    <app_b-widget-bg-goback on-tap="petgoback"></app_b-widget-bg-goback>
</div>