<div maxId="48" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 1;top:0;" w-sid="2"  on-tap="colse">
        {{let appCfg = _get("app/mod/db").exports.data}}
        {{let player = appCfg.player}}
        {{let career_id = player.career_id}}
        {{let cfg = _get("app/mod/pi").exports.cfg}}
        {{let equip_level_limit = cfg.equip_level_limit.equip_level_limit}}
        <div w-class="4" w-sid="4" style="width: 284px;height: auto;left: 50%;top: 50%;margin-left: -142px;margin-top: -355px;">
            
            <app_a-widget-img_stitch-stitch style="position: absolute;width: 284px;height: 100%;">{"type":1,"height":15,"width":15}</app_a-widget-img_stitch-stitch>

            <widget w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">
                {"icon":"close"}  
            </widget>
            <div w-class="41" w-sid="41">
                <widget w-class="5" w-tag="app_a-widget-prop-base" w-sid="5">{"width":68,"height":68,"prop":{{it1.prop}} ,"url":{{it1.url}},"count":"none","name":"none","bg":0} 
                </widget>
                <widget w-class="7" w-tag="app_a-widget-text-text" w-sid="7">{"text":{{it1.prop.name[it1.prop.career_id.indexOf(career_id)]}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"}
                </widget>
                <widget w-class="8" w-tag="app_a-widget-text-text" w-sid="8">{"text":{{"+" + it1.equipLevel||0}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                </widget>
                <widget w-class="9" w-tag="app_a-widget-text-text" w-sid="9">{"text":{{it1.prop.level+"级"}},"show":"","space":2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                </widget>

                <widget w-class="11" w-tag="app_a-widget-pic_text-pic_text" w-sid="11">{"icon":"fire_bg","width":121,"height":50,"align":"center","marginLeft":0,"text":{{"评分"+it1.prop.grade}},"textCfg":"scoring","space":0,"fontSize":20,"top":19} 
                </widget>
 
                <div style="width:100%;height:15%;position:absolute;top: 65px;left: 17px;">
                    <app_c-forge-star-star_anim>{"star":{{it1.getStar}},"effect":{{equip_level_limit[it1.prop.slot].stars_effects}},"center":0}</app_c-forge-star-star_anim>
                </div>
            </div>
            <div w-class="36" w-sid="36">
                <widget w-class="13" w-tag="app_a-widget-line-line" w-sid="13">{"line":"line_8"} 
                </widget>  
                <div w-class="12" w-sid="12">基础属性</div>
                <div w-class="42" w-sid="42">
                    {{for i,v of it1.attr}}
                    {{if i == 0}}
                        {{v.attr}}&nbsp;+{{v.val}}&nbsp;{{if Math.ceil(it1.bonus*v.val) !== 0}}(+{{Math.ceil(it1.bonus*v.val)}}){{end}}
                    {{end}}
                    {{end}}
                </div>
            </div>
            <div w-class="37" w-sid="37">
                <div w-class="14" w-sid="14">附加属性</div>
                <widget w-class="15" w-tag="app_a-widget-line-line" w-sid="15">{"line":"line_8"} 
                </widget>
                <div style="width:247px;position:relative;bottom:0px;left:19px;top: -4px;">
                    {{for i,v of it1.attr}}
                    {{if i != 0}}
                    <div w-class="43" w-sid="43">
                        {{v.attr}}&nbsp;+{{v.val}}&nbsp;{{if Math.ceil(it1.bonus*v.val) !== 0}}(+{{Math.ceil(it1.bonus*v.val)}}){{end}}
                    </div>
                    {{end}}
                    {{end}}
                </div>
            </div>
            <div w-class="38" w-sid="38">
                <div w-class="16" w-sid="16">强化属性</div>
                <widget w-class="17" w-tag="app_a-widget-line-line" w-sid="17">{"line":"line_8"} 
                </widget>
                <div w-class="44" w-sid="44">
                    {{if it1.reinforcement.equip.val}}
                        {{let val = it1.reinforcement.equip.val || 0}}
                        {{it1.reinforcement.equip.attr}}&nbsp;+{{val}}&nbsp;{{if Math.ceil(val * it1.bonus) !== 0}}(+{{Math.ceil(val * it1.bonus)}}){{end}}
                    {{else}}
                        暂无属性
                    {{end}}
                </div>
            </div>
            <div w-class="39" w-sid="39" style="height:auto;">
                <div w-class="18" w-sid="18" style="position:relative;">升星属性</div>
                <widget w-class="19" w-tag="app_a-widget-line-line" w-sid="19">{"line":"line_8"} 
                </widget>
                {{if it1.reinforcement.star.val}}
                <div w-class="46" w-sid="46" style="position:relative;">
                    装备属性+{{Math.round(it1.bonus*100)}}%
                </div>
                <div w-class="47" w-sid="47" style="position:relative;">
                    {{let _val = it1.reinforcement.star.val || 0}}
                    {{it1.reinforcement.star.attr}}&nbsp;+{{_val}}&nbsp;{{if Math.ceil(_val * it1.bonus) !== 0}}(+{{Math.ceil(_val * it1.bonus)}}){{end}}
                </div>
                {{else}}
                <div w-class="46" w-sid="46" style="position:relative;">
                    暂无属性
                </div>
                {{end}}
            </div>
            <div w-class="40" w-sid="40">
                <div w-class="33" w-sid="33">宝石属性</div>
                <widget w-class="34" w-tag="app_a-widget-line-line" w-sid="34">{"line":"line_8"} 
                </widget>
                <div style="width:247px;position:absolute;top:25px;bottom:0px;left:19px;">
                {{for i,v of it1.geteDiam}}
                    <div class="shadow" style="color:{{v.lv?'#fff':'#8e93bc'}};height:20px;line-height: 20px;">
                        <div style="width:17px;height:17px;background-image:url(app_b/style/image/baoshikong.png);background-size:cover;display: inline-block;vertical-align: middle;margin-top: -3px;">
                            <img style="height:16px;margin-top:-6px;margin-left:-0px;vertical-align:middle;" src="{{v.url}}"/>
                        </div>
                        {{if v.lv}}
                        &nbsp; {{v.lv}}级&nbsp;{{v.attr}}+{{v.val}}&nbsp;{{if Math.ceil(v.val* it1.bonus) !== 0}}(+{{Math.ceil(v.val* it1.bonus)}}){{end}}
                        {{else}}
                        &nbsp; {{v.lv}}级&nbsp;{{v.attr}}&nbsp;未激活
                        {{end}}
                    </div>
                {{end}}
                </div>
            </div>
        </div>
    </div>