<div maxId="48" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2" on-tap="colse">
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let career_id = player.career_id}}
    <div w-class="4" w-sid="4" style="width: 284px;height: auto;left: 50%;top: 50%;margin-left: -260px;transform:translateY(-50%)">

        <app_a-widget-img_stitch-stitch style="position: absolute;left: 108px;width: 284px;height: 100%;">{"type":1,"height":15,"width":15}</app_a-widget-img_stitch-stitch>

        <widget w-class="6"  w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
        </widget>
        <div w-class="41" w-sid="41">
            <widget w-class="5" w-tag="app_a-widget-prop-base" w-sid="5">{"width":68,"height":68,"prop":{{it.prop}} ,"url":{{it.url}},"count":"none","name":"none","bg":0} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-text-text" w-sid="7">{"text":{{it.prop.name[it.prop.career_id.indexOf(career_id)]}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"}
            </widget>
            <widget w-class="9" w-tag="app_a-widget-text-text" w-sid="9">{"text":{{it.prop.level+"级"}},"show":"","space":2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
            </widget>
            <widget w-class="11" w-tag="app_a-widget-pic_text-pic_text" w-sid="11">{"icon":"fire_bg","width":121,"height":50,"align":"center","marginLeft":0,"text":{{"评分"+it.prop.grade}},"textCfg":"scoring","space":0,"fontSize":20,"top":19,"left":"-35"} 
            </widget>

        </div>
        <div w-class="36" w-sid="36">
            <widget w-class="13" w-tag="app_a-widget-line-line" w-sid="13">{"line":"line_8"} 
            </widget>
            <div w-class="12" w-sid="12">基础属性</div>
            <div w-class="42" w-sid="42">
                {{for i,v of it.attr}}
                {{if i == 0}}
                    {{v.attr}}&nbsp;+{{v.val}}
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
                {{if v.attr}}
                <div w-class="43" w-sid="43">
                    {{v.attr}}&nbsp;+{{v.val}}
                </div>
                {{end}}
                {{end}}
                {{end}}
            </div>
        </div>
    </div>
</div>