{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let common = _get("app/mod/common").exports.Common}}
{{let career_id = it1.player.career_id}}
<div w-class="bg_1">
    <div style="position:absolute;width:540px;height:900px;left:50%;margin-left:-270px;top:0px;">
        {{let curr = it1.first_pay_gift[it1.index]}}
        {{let weapon = _get("app/scene/plan_cfg/parts_config").exports.parts_cfg}}
        {{let equip = it1.Pi.sample[curr.goods[0][0]]}}
        {{let module_info = equip.module[equip.career_id.indexOf(career_id)]}}
        {{let module = weapon[module_info[1]].module[0][0]}}	
        {{let double = career_id == "700002" ? true : false}}
        {{let position = career_id == "700001" ? [0,2.3,0] : career_id == "700002" ? [0.3,2.3,0] : [0.25,2.0,0]}}
        
        <div style="position:absolute;top:0px;width:540px;height:900px;left:50%;transform:translate(-50%);">
            <app-scene-base-scene style="position:absolute;width:100%;height:100%;">
                {
                    "name":"uiscene",
                    "type":"weapon",
                    "module":{
                        "module":{{module}},
                        "position":{{position}},
                        "scale":[1,1,1],
                        "rotate":[-3.7,1.57,0],
                        "w_eff":{{[module_info[2]]}},
                        "double":{{double}},
                        "scene_bg": "sce_ui_sclb"
                    },
                    "width":540,
                    "height":900
                }    
            </app-scene-base-scene> 
        </div>
        <div w-class="bg_4"></div>
        <div w-class="title_text"></div>

        <img src="./images/flower.png" alt="" style="position: absolute;width: 169px;height: 143px;right: -70px;top: 50px;" />

        <div style="position: absolute;width:50px;height: 500px;right: 8px;top: 104px;z-index: 2;">
            {{for m, n in it1.first_pay_gift}}
            <div on-tap='selectLevel({{n.id}})' style="position: relative;width: 44px;height: 120px;margin-left: 3px;">
                {{if n.id == it1.index}}
                <app_a-widget-pic_text-pic_text>
                    {"icon":"sign_bg_2"}
                </app_a-widget-pic_text-pic_text>
                {{else}}
                <app_a-widget-pic_text-pic_text>
                    {"icon":"sign_bg_1"}
                </app_a-widget-pic_text-pic_text>
                {{end}}
                <img src="./images/{{n.rmb_level}}.png" alt="" srcset="" style="position: absolute;left: 0;right: 0;margin: auto;top: 42px;"/>
                <img src="./images/yuan.png" alt="" style="position: absolute;left: 0;right: 0;margin: auto;top: 72px;" />
                <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
            </div>
            {{end}}
            <app_a-widget-pic_other-pic_other style="position: relative;margin-left: 7px;">
                {"icon":"pendant2"}
            </app_a-widget-pic_other-pic_other>
        </div>

        <widget w-class="close" on-tap="goback()" w-tag="app_a-widget-btn_pic-btn_pic">
            {"icon":"close_1"} 
        </widget>
        <div style="position:absolute;width:500px;height:50px;top:150px;left:30px;">
            <app_a-widget-pic_other-pic_other style="position:absolute;top:30px;left:5px;">{"icon":"line_light"}</app_a-widget-pic_other-pic_other>
            <app_a-widget-pic_other-pic_other style="position:absolute;top:30px;left:233px;">{"icon":"line_light"}</app_a-widget-pic_other-pic_other>
            <div w-class="text_1"></div>
            <app_a-widget-pic_other-pic_other style="position:absolute;top:-10px;left:13px;">{"icon":"line_star"}</app_a-widget-pic_other-pic_other>
            <app_a-widget-pic_other-pic_other style="position:absolute;left:248px;">{"icon":"line_star"}</app_a-widget-pic_other-pic_other>
        </div>

        <div style="position:absolute;width:330px;height:50px;top:220px;right:60px;">
            <app_a-widget-pic_other-pic_other style="position:absolute;top:27px;left:110px;">{"icon":"line_light"}</app_a-widget-pic_other-pic_other>
            <div w-class="text_2"></div>
            <app_a-widget-pic_other-pic_other style="position:absolute;left:147px;">{"icon":"line_star"}</app_a-widget-pic_other-pic_other>
        </div>

        <div w-class="bg_3">
            <div class="center_h" style="font-size:30px;width:30px;font-family:mnjsh;color:#b09bd5;position:absolute;left:-20px;top:20px;">首充只可选择一档</div>
        </div>

        <div w-class="bg_2" style="z-index:2">
            <div w-class="award_title"></div>
            <div style="position:absolute;width:540px;height:90px;text-align:center;top:55px;">
                {{for i, k of curr.goods}} 
                {{let prop = it1.Pi.sample[k[0]]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                <div style="position:relative;width:90px;height:90px;display:inline-block;color:#ffffff;font-family:mnjsh;margin:0px 10px;font-size:20px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{k[0]}})">
                        {"guide":{{i==0?"weapon_click":""}},"width":90,"height":90,"prop":{{prop}} ,"url":{{url}},"count":{{k[1]}},"name":{{name}},"bg":""} 
                    </widget>
                </div>
                {{end}}
            </div>
        </div>
        {{let state = it1.recharge.first_pay_gift_state}}
        {{if (state.length > 0) && (state[0][0] == curr.id)}}
        <div w-class="get_award" on-tap="getAward({{it1.index}})">
            <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
        </div>
        {{else}}
        <div w-class="recharge" on-tap="firstRecharge({{it1.index}})">
            <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
        </div>
        {{end}}
    </div>
</div>