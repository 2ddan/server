<div style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:2">
    <app_b-widget-title-title style="top:0;z-index:9;position:absolute">
        {"text":"赋灵","coin":["money","diamond"],"left":56,"top":11}
    </app_b-widget-title-title>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback"></div>
    {{let text = ["火灵","风灵","水灵","雷灵"]}}
    <div style="position:absolute;width:540px;height:706px;top:112px;left:50%;margin-left:-270px;">
        <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0;width:492px;height: 701px;">
            {"bgName":"bg_frame21"} 
        </app_a-widget-bg_frame-bg>
        <app_a-widget-line-line style="position: absolute;left: 0;top: -15px;z-index:3;">
            {"line":"line_7"} 
        </app_a-widget-line-line>
        <div w-class="bg_1">
            <app_c-weapon_soul-weapon_module-weapon_module style="top:95px;">
                {"effect":[]}
            </app_c-weapon_soul-weapon_module-weapon_module>

            {{let pos = [[26,104],[361,104],[26,331],[361,331]]}}
            {{for i, v of it1.level_record}}
            <div on-tap="selectType({{i}})" w-class="element_bg" style="left:{{pos[i][0]}}px;top:{{pos[i][1]}}px;">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:50%;margin-left:-28px;bottom:-35px;">
                    {"icon":"text_bg_2","width":58,"height":27,"text":{{text[i]}},"align":"center","marginLeft":3,"textCfg":"activityBorRed","space":0,"fontSize":18,"top":3,"left":0}
                </widget>
                <app-widget-tip-tip style="right:3px;top:5px;">
                    {"tip_keys":[{{"role.weapon_soul."+i}}] }
                </app-widget-tip-tip>
            </div>
            {{end}}
        </div>

        <app_a-widget-btn-sq style="top:0px;position:absolute;right:100px;" on-tap="lookAllAttr">
            {"text":"  属 性   详 情 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
        <app_a-widget-btn-sq style="top:0px;position:absolute;right:40px;" on-tap="lookEff">
            {"text":"  赋 灵   预 览 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>

        <div style="position:absolute;width:184px;height:32px;left:50%;margin-left:-92px;top:24px;">
            <widget w-tag="app_a-widget-pic_text-pic_text">
                    {"icon":"name_bg_2","width":184,"height":32,"text":" ","align":"center","marginLeft":3}
                </widget>
            <div class="shadow" style="position:absolute;width:100%;height:32px;line-height:32px;text-align:center;font-family:mnjsh;font-size:20px;left:0;top:0;color:#fde7ca;">{{it1.weapon_soul_base[it1.class].name}}</div>
        </div>

        {{if it1.is_break}}
        {{%%突破}}
        <div style="position: absolute;width:489px;height: 191px;left:24px;top:498px;">
            <app_a-widget-bg_frame-bg style="position: absolute;width:492px;height: 191px;">
                {"bgName":"bg_frame28"} 
            </app_a-widget-bg_frame-bg>
            {{let grade = it1.class}}
            {{if !it1.is_full}}
            <div style="position:absolute;width:100%;height:72px;top:30px;font-family:mnjsh;font-size:18px;">
                <div style="position: absolute;width:153px;height:72px;left:70px;color:#ffd8a6;">
                    <app_a-widget-bg_frame-bg style="position: absolute;width:153px;height:72px;">
                        {"bgName":"att_bg_2"} 
                    </app_a-widget-bg_frame-bg>
                    {{if grade == 0}}
                    <div style="position:absolute;width:153px;height:72px;line-height:72px;text-align:center;">当前暂无属性</div>
                    {{else}}
                    {{for k, v of it1.weapon_soul_base[grade].attr}}
                    <div style="position:relative;width:153px;height:36px;text-align:center;line-height:36px;">{{it1.attribute_config[v[0]]}}: +{{v[1] < 1 ? (v[1] * 100 + '%') : v[1]}}</div>
                    {{end}}
                    {{end}}
                </div>
        
                <app_a-widget-pic_other-pic_other style="position:absolute;left:234px;top:21px;">
                    {"icon":"attr_arrow"}
                </app_a-widget-pic_other-pic_other>
        
                <div style="position: absolute;width:153px;height:72px;right:70px;">
                    <app_a-widget-bg_frame-bg style="position: absolute;width:153px;height:72px;">
                        {"bgName":"att_bg_2"} 
                    </app_a-widget-bg_frame-bg>
                    {{for k, v of it1.weapon_soul_base[grade + 1].attr}}
                    <div style="position:relative;width:153px;height:36px;text-align:center;line-height:36px;color:#51e650;">{{it1.attribute_config[v[0]]}}: +{{v[1] < 1 ? (v[1] * 100 + '%') : v[1]}}</div>
                    {{end}}
                </div>
            </div>
            {{let cost = it1.weapon_soul_base[grade].cost}}
            {{let len = cost.length}}
            {{let bol = it1.money >= cost[len - 1][1]}}
            <div style="position:absolute;width:200px;height:54px;text-align:center;top:112px;left:40px;">
                {{for m, n of cost}}
                {{if m < (len - 1)}}
                {{let p = it1.Pi.sample[n[0]]}}
                {{let url = it1.Pi.pictures[p.icon]}}
                {{let prop = it1.Common.getBagPropById(n[0]) || [-1, {"count":0}]}}
                <div style="width:54px;height:54px;position:relative;display:inline-block;margin:0px 20px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="gotoGetWay({{p.sid || p.id}})" style="position:absolute">
                        {"width":54,"height":54,"prop":{{p}} ,"url":{{url}},"hidden_name":1,"count":"none"} 
                    </widget>
                    <div style="position:absolute;width:100px;left:-23px;height:20px;text-align:center;line-height:20px;font-size:18px;font-family:mnjsh;color:white;z-index:2;top:50px;">{{prop[1].count}}/{{n[1]}}</div>
                </div>
                {{:bol = bol && prop[1].count>=n[1]}}
                {{end}}
                {{end}}
            </div>
        
            <div style="position:absolute;top:112px;right:103px;font-size:16px;height:60px;width:116px;text-align:center;color:#ffd8a6;">
                <app_a-widget-btn-rect style="top:0px;position:absolute" on-tap="weaponBreak">
                    {"text":"赋 灵","class":{{bol ? "hl" :"disabled"}},"fontsize":24,"width":116,"height":45,"tip_keys":["role.weapon_soul.break"]}
                </app_a-widget-btn-rect>
                <app_a-widget-coin-coin style="position:relative;top:47px;color:{{it1.money >= cost[len - 1][1] ? '' : '#f00'}}">
                    {"icon":"money","text":[{{cost[len - 1][1]}}],"left":3}
                </app_a-widget-coin-coin>
            </div>
            {{else}}
            <div style="position:absolute;width:100%;height:50px;top:50px;font-family:mnjsh;font-size:18px;color:#ffd8a6;">
                <div style="position:absolute;width:100%;height:30px;line-height:30px;text-align:center;">已升到最高阶</div>
            </div>    
            {{end}}
            {{let lev = it1.class + 1}}
            {{:lev = lev < (it1.weapon_soul_base.length - 1) ? lev : (it1.weapon_soul_base.length - 1)}}
            <widget w-tag="app_a-widget-title-single" style="position:absolute;left:50%;margin-left:-48px;top:-18px;line-height:26px;">
                {"padding":10,"type":9,"width":124,"text":{{it1.weapon_soul_base[lev].name}},"textCfg":"singleTitle","fontSize":20,"space":-2,"color":"","wear":0} 
            </widget>
            <widget w-tag="app_a-widget-line-line" style="top:187px;left:-5px;">
                {"line":"line_10"}
            </widget>
        </div>
        {{elseif !it1.is_break}}
        {{%%赋灵}}
        <div style="position: absolute;width:489px;height: 191px;left:24px;top:498px;">
            <app_a-widget-bg_frame-bg style="position: absolute;width:492px;height: 191px;">
                {"bgName":"bg_frame28"} 
            </app_a-widget-bg_frame-bg>
            {{let level = it1.level_record[it1.type]}}
            {{let obj = it1.weapon_soul_grade[it1.class][it1.type + 1]}}
            <app_a-widget-star-star style="position:absolute;left:50%;transform:translate(-50%);top:14px;">
                {"star_light":{{level}},"star_dark":{{(obj.length - 1) - level}},"height":22,"width":22}
            </app_a-widget-star-star>
        
            {{if level < obj.length - 1}}
            <div style="position:absolute;width:100%;height:50px;top:50px;font-family:mnjsh;font-size:18px;">
                <div style="position: absolute;width:153px;height:50px;left:70px;color:#ffd8a6;">
                    <app_a-widget-bg_frame-bg style="position: absolute;width:153px;height:50px;">
                        {"bgName":"att_bg_2"} 
                    </app_a-widget-bg_frame-bg>
                    {{if level == 0 && it1.class == 0}}
                    <div style="position:absolute;width:153px;height:50px;line-height:50px;text-align:center;">当前暂无属性</div>
                    {{else}}
                    {{for k, v of obj[level].attr}}
                    <div style="position:relative;width:153px;height:50px;text-align:center;line-height:50px;">{{it1.attribute_config[v[0]]}}: +{{v[1]}}</div>
                    {{end}}
                    {{end}}
                </div>
        
                <app_a-widget-pic_other-pic_other style="position:absolute;left:234px;top:10px;">
                    {"icon":"attr_arrow"}
                </app_a-widget-pic_other-pic_other>
        
                <div style="position: absolute;width:153px;height:50px;right:70px;">
                    <app_a-widget-bg_frame-bg style="position: absolute;width:153px;height:50px;">
                        {"bgName":"att_bg_2"} 
                    </app_a-widget-bg_frame-bg>
                    {{for k, v of obj[level + 1].attr}}
                    <div style="position:relative;width:153px;height:50px;text-align:center;line-height:50px;color:#51e650;">{{it1.attribute_config[v[0]]}}: +{{v[1]}}</div>
                    {{end}}
                </div>
            </div>
            {{let cost = obj[level].cost}}
            {{let p = it1.Pi.sample[cost[0][0]]}}
            {{let url = it1.Pi.pictures[p.icon]}}
            {{let prop = it1.Common.getBagPropById(cost[0][0]) || [-1, {"count":0}]}}
            <div style="position:absolute;width:54px;height:54px;left:130px;top:112px;">
                <widget w-tag="app_a-widget-prop-base" on-tap="gotoGetWay({{p.sid || p.id}})" style="position:absolute">
                    {"width":54,"height":54,"prop":{{p}} ,"url":{{url}},"hidden_name":1,"count":"none"} 
                </widget>
                <div style="position:absolute;width:100px;left:-23px;height:20px;text-align:center;line-height:20px;font-size:18px;font-family:mnjsh;color:white;z-index:2;top:50px;">{{prop[1].count}}/{{cost[0][1]}}</div>
            </div>
            {{let _bol = prop[1].count>=cost[0][1] && it1.money >= cost[1][1]}}
            <div style="position:absolute;top:112px;right:103px;font-size:16px;height:60px;width:116px;text-align:center;color:#ffd8a6;">
                <app_a-widget-btn-rect style="top:0px;position:absolute" on-tap="giveSoul">
                    {"text":"赋 灵","class":{{_bol ? "hl" :"disabled"}},"fontsize":24,"width":116,"height":45,"tip_keys":[{{"role.weapon_soul."+it1.type}}]}
                </app_a-widget-btn-rect>
                <app_a-widget-coin-coin style="position:relative;top:47px;color:{{it1.money >= cost[1][1] ? '' : '#f00'}}">
                    {"icon":"money","text":[{{cost[1][1]}}],"left":3}
                </app_a-widget-coin-coin>
            </div>
            {{else}}
            <div style="position:absolute;width:100%;height:50px;top:50px;font-family:mnjsh;font-size:18px;">
                <div style="position: absolute;width:153px;height:50px;left:168px;color:#ffd8a6;">
                    <app_a-widget-bg_frame-bg style="position: absolute;width:153px;height:50px;">
                        {"bgName":"att_bg_2"} 
                    </app_a-widget-bg_frame-bg>
                    {{for k, v of obj[level].attr}}
                    <div style="width:153px;height:50px;text-align:center;line-height:50px;color:#51e650;">{{it1.attribute_config[v[0]]}}: +{{v[1]}}</div>
                    {{end}}
                    <div style="position:absolute;width:153px;height:30px;line-height:30px;text-align:center;bottom:-40px;">已升到最高星</div>
                </div>
            </div>    
            {{end}}
            <widget w-tag="app_a-widget-title-single" style="position:absolute;left:50%;margin-left:-33px;top:-18px;line-height:26px;">
                {"padding":10,"type":9,"width":124,"text":{{text[it1.type]}},"textCfg":"singleTitle","fontSize":20,"space":-2,"color":"","wear":0} 
            </widget>
            <widget w-tag="app_a-widget-line-line" style="top:187px;left:-5px;">
                {"line":"line_10"}
            </widget>
        </div>
        {{end}}

    </div>
</div>