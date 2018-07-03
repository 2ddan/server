<div maxId="48" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2"  on-tap="cancel">
    {{let career_id = it.career_id}}
    {{let equip_level_limit =it.equip_level_limit}}
    <div w-class="4" w-sid="4" style="width: 284px;height: auto;left: 50%;top: 50%;margin-left: -142px;margin-top: -240px;">
        
        <app_a-widget-img_stitch-stitch style="position: absolute;width: 284px;height: 100%;">
            {"type":1,"height":15,"width":15}
        </app_a-widget-img_stitch-stitch>

        <widget w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">
            {"icon":"close"} 
        </widget>
        <div w-class="41" w-sid="41">
            <widget w-class="5" w-tag="app_a-widget-prop-base" w-sid="5">
                {"width":68,"height":68,"prop":{{it.prop}} ,"url":{{it.url}},"count":"none","name":"none","bg":0} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-text-text" w-sid="7">
                {"text":{{it.prop.name[it.prop.career_id.indexOf(career_id)]}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"}
            </widget>
            <widget w-class="8" w-tag="app_a-widget-text-text" w-sid="8">
                {"text":{{"+" + it.equipLevel || 0}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
            </widget>
            <widget w-class="9" w-tag="app_a-widget-text-text" w-sid="9">
                {"text":{{it.prop.level+"级"}},"show":"","space":2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
            </widget>
            <widget w-class="11" w-tag="app_a-widget-pic_text-pic_text" w-sid="11">
                {"icon":"fire_bg","width":121,"height":50,"align":"center","marginLeft":0,"text":{{"评分"+it.prop.grade}},"textCfg":"scoring","space":0,"fontSize":20,"top":19} 
            </widget>
            {{if it.star}}
            <div style="width:100%;height:15%;position:absolute;top: 65px;left: 17px;">
                <app_c-forge-star-star_anim>
                    {"star":[{{it.star}},15],"effect":{{it1.equip_level_limit[it.prop.slot].stars_effects}},"center":0}
                </app_c-forge-star-star_anim>
            </div>
            {{end}}
        </div>
        <div w-class="36" w-sid="36">
            <widget w-class="13" w-tag="app_a-widget-line-line" w-sid="13">{"line":"line_8"} 
            </widget>
            <div w-class="12" w-sid="12">基础属性</div>
            <div w-class="42" w-sid="42">
                {{for i,v of it.attr}}
                {{if i == 0}}
                    {{v.attr}}&nbsp;+{{v.val}}&nbsp;{{if Math.ceil(it.bonus*v.val) !== 0}}(+{{Math.ceil(it.bonus*v.val)}}){{end}}
                {{end}}
                {{end}}
            </div>
        </div>
        <div w-class="37" w-sid="37">
            <div w-class="14" w-sid="14">附加属性</div>
            <widget w-class="15" w-tag="app_a-widget-line-line" w-sid="15">{"line":"line_8"} 
            </widget>
            <div style="width:247px;position:relative;bottom:0px;left:19px;top: -4px;">
                {{for i,v of it.attr}}
                {{if i != 0}}
                <div w-class="43" w-sid="43">
                    {{v.attr}}&nbsp;+{{v.val}}&nbsp;{{if Math.ceil(it.bonus*v.val) !== 0}}(+{{Math.ceil(it.bonus*v.val)}}){{end}}
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
                {{if it.equipLevel}}
                    {{for i,v of it.attr}}
                    {{if i == 0}}
                        {{let val = v.val*it.equipLevelAttr[0]-0+it.equipLevelAttr[1]}}
                        {{v.attr}}&nbsp;+{{Math.ceil(val)}}&nbsp;{{if Math.ceil(val * it.bonus) !== 0}}(+{{Math.ceil(val * it.bonus)}}){{end}}
                    {{end}}
                    {{end}}
                {{else}}
                <span style="color:#f00">暂无属性</span>
                {{end}}
            </div>
        </div>
        <div w-class="39" w-sid="39">
            <div w-class="18" w-sid="18">升星属性</div>
            <widget w-class="19" w-tag="app_a-widget-line-line" w-sid="19">{"line":"line_8"} 
            </widget>
            {{if it.bonus}}
            <div w-class="46" w-sid="46">
                装备属性+{{Math.round(it.bonus*100)}}%
            </div>
            <div w-class="46">
            {{if it.starAttr}}
                {{for i,v in it.starAttr}}
                {{it.attribute_config[i]}}&nbsp;+{{v}}&nbsp;(+{{Math.ceil(v * it.bonus)}})
                {{end}}
            {{end}}
            </div>
            {{else}}
            <div w-class="46" w-sid="46" style="position:relative;color:#fff">
                暂无属性
            </div>
            {{end}}
        </div>
        <div w-class="40" w-sid="40">
            <div w-class="33" w-sid="33">宝石属性</div>
            <widget w-class="34" w-tag="app_a-widget-line-line" w-sid="34">
                {"line":"line_8"} 
            </widget>
            <div style="width:247px;position:absolute;top:25px;bottom:0px;left:19px;">
            {{for i,v of it.geteDiam}}
                <div class="shadow" style="color:{{v.lv?'#fff':'#8e93bc'}};height:20px;line-height: 20px;">
                    <div style="width:17px;height:17px;background-image:url(app_b/style/image/baoshikong.png);background-size:cover;display: inline-block;vertical-align: middle;">
                        <img style="height:16px;margin-top:-6px;margin-left:-0px;vertical-align:middle;" src="{{v.url}}"/>
                    </div>
                    {{if v.lv}}
                    &nbsp; {{v.lv}}级&nbsp;{{v.attr}}+{{v.val}}&nbsp;{{if Math.ceil(v.val* it.bonus) !== 0}}(+{{Math.ceil(v.val* it.bonus)}}){{end}}                    
                    {{else}}
                    &nbsp; {{v.lv}}级&nbsp;{{v.attr}}&nbsp;未激活
                    {{end}}
                </div>
            {{end}}
            </div>
        </div>
    </div>
</div>