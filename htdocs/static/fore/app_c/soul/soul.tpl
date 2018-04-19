<div w-class="bg_1" style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:2">
    <app_b-widget-title-title style="top:0;z-index:9;position:absolute">
        {"text":"龙魂","coin":["money","diamond"],"left":56,"top":11}
    </app_b-widget-title-title>

    <div style="position:absolute;width:540px;height:500px;top:40px;left:50%;margin-left:-270px;">    
        <div w-class="long">
            {{for i, v of it1.soul_seat}}
            <div on-tap="selectAcupoint({{v.id}})" style="position:absolute;width:64px;height:64px;" w-class="{{'element_'+v.id}}">
                <div style="position:absolute;top:30px;left:30px;transform-origin:0px 4px 0px;" w-class="{{'line_'+v.id}}">
                    {{if (it1.player_level >= v.open_level)}}
                    <div w-class="line_open"></div>
                    {{else}}
                    <div w-class="line_close"></div>
                    {{end}}
                </div>
                {{if (it1.player_level < v.open_level)}}
                <div w-class="closed"></div>
                {{end}}
    
                {{if it1.acupoint == v.id}}
                <div w-class="selected"></div>
                {{end}}
                <app-widget-tip-tip style="top:5px;right:3px;">
                    {"tip_keys":[{{'role.soul.' + v.id}}] }
                </app-widget-tip-tip>
                <app_a-widget-pic_text-pic_text style="color:#ffd8a6;position:absolute;left:50%;margin-left:-43px;top:50px;font-family:mnjsh;">
                    {"icon":"text_bg_4","width":86,"height":31,"text":{{it1.player_level >= v.open_level ? (v.name + 'Lv' + it1.resonate_level[i]) : (v.open_level + '级开放')}} }
                </app_a-widget-pic_text-pic_text>
            </div>
            {{end}}
        </div>

        <app-widget-btn-menu style="position:absolute;left:25px;top:50px;" on-tap="openSoulBag">
            {"icon":"pic_common_bag","text":"龙魂背包","width":78,"height":78,"bottom":0,"fontSize":20,"textCfg":"iconCircle","bg":4,"top":-7}
        </app-widget-btn-menu>

        <app_a-widget-btn-sq style="top:60px;position:absolute;right:10px;" on-tap="lookAttr">
            {"text":"  属 性   详 情 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>

        <app_a-widget-btn-sq style="top:125px;position:absolute;right:10px;" on-tap="openResonate">
            {"text":" 共 鸣 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
    </div>
    
    <div w-class="bg_2">
        <div style="position:absolute;width:540px;height:319px;left:50%;margin-left:-270px;">
            {{for i, v of it1.soulArr}}
            <div on-tap="selectSoul({{i}})" style="position:absolute;width:98px;height:98px;" w-class="{{'soul_'+i}}">
                <div w-class="soul_bg"></div>
                {{if it1.soul_index == i}}
                <div w-class="soul_selected"></div>
                {{end}}
                {{let lev = it1.soul_info[it1.acupoint - 1][i][1]}}
                <app_a-widget-text-text style="position: absolute;top: -10px;left: 50%;transform: translate(-50%)">
                    {"text":{{'Lv'+lev}},"fontSize":20,"textCfg":"iconCircle" }
                </app_a-widget-text-text>

                {{let pic = it1.soulIcon[i]}}
                {{let img_3 = 'app_c/soul/images/' + pic + '.png'}}
                <img src={{img_3}} style="position: absolute;top:4px;left:12px;"/>

                {{let text = it1.soul_type_name[it1.soulArr[i]].name}}
                <app_a-widget-text-text style="position: absolute;top: 104px;left: 50%;transform: translate(-50%)">
                    {"text":{{text}},"fontSize":22,"textCfg":"iconCircle" }
                </app_a-widget-text-text>
                <app-widget-tip-tip style="top:0px;right:0px;">
                    {"tip_keys":[{{'role.soul.' + it1.acupoint + "." + i}}] }
                </app-widget-tip-tip>
            </div>
            {{end}}
        </div>
    </div>

    <div style="pointer-events: none;width: 540px;position: absolute;top: 10px;left: 50%;margin-left: -270px;height:500px">
        <app-scene-base-scene>
            {"name":"uiscene","type":"effect","module":"" }
        </app-scene-base-scene>
    </div>

    <div style="position:absolute;width:540px;height:130px;top:715px;left:50%;margin-left:-270px;">
        <widget w-tag="app_a-widget-title-single" style="position:absolute;left:50%;margin-left:-75px;top:-18px;line-height:40px;">
            {"padding":10,"type":9,"width":150,"text":{{it1.soul_type_name[it1.soulArr[it1.soul_index]].name}},"textCfg":"singleTitle","fontSize":30,"space":-2,"color":"","wear":0} 
        </widget>
        {{let level = it1.soul_info[it1.acupoint - 1][it1.soul_index][1]}}
        {{let soul_obj = it1.soul_level_up[it1.soulArr[it1.soul_index]]}}

        {{if level < (soul_obj.length - 1)}}
            {{let cost = soul_obj[level].cost}}
            {{let prop = it1.Pi.sample[cost[0][0]]}}
            {{let url = it1.Pi.pictures[prop.icon]}}
            <div style="position:absolute;width:70px;height:70px;left:100px;top:28px;">
                <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{cost[0][0]}})">
                    {"width":70,"height":70,"prop":{{prop}} ,"url":{{url}},"name":{{prop.name}},"count":"none","bg":1} 
                </widget>
                <div style="position:absolute;width:100px;left:-15px;height:20px;text-align:center;line-height:20px;font-size:18px;font-family:mnjsh;color:white;z-index:2;top:50px;top:51px;">{{it1.my_prop.count + '/'+ cost[0][1]}}</div>
            </div>
            {{let now_attr = soul_obj[level].attr}}
            {{let next_attr = soul_obj[level - 0 + 1].attr}}
            <div style="position: absolute;width:205px;height:106px;top:28px;left:50%;margin-left:-102px;">
                <app_a-widget-bg_frame-bg style="position: absolute;width:205px;height:106px;">
                    {"bgName":"att_bg_2"} 
                </app_a-widget-bg_frame-bg>
                
                <div style="position:absolute;width:205px;height:25px;text-align:center;line-height:25px;color:#51e650;top:10px;">{{it1.attribute_config[now_attr[0]]}}: +{{now_attr[1]}}</div>

                <app_a-widget-pic_other-pic_other style="position: absolute;left: 90px;top: 38px;transform: rotate(90deg);">
                    {"icon":"attr_arrow"}
                </app_a-widget-pic_other-pic_other>

                <div style="position:absolute;width:205px;height:25px;text-align:center;line-height:25px;color:#51e650;bottom:10px;">{{it1.attribute_config[next_attr[0]]}}: +{{next_attr[1]}}</div>
            </div>
            {{let bol = it1.my_prop.count >= cost[0][1] && it1.player_money >= cost[1][1]}}
            <div style="position:absolute;top:50px;right:60px;font-size:16px;height:60px;width:110px;text-align:center;color:#ffd8a6;">
                <app_a-widget-btn-rect style="top:0px;position:absolute" on-tap="soulUp">
                    {"text":"升 级","class":{{bol ? "hl" :"disabled"}},"fontsize":24,"width":116,"height":45}
                </app_a-widget-btn-rect>
                <app_a-widget-coin-coin style="position:absolute;top:44px;width:110px;color:{{it1.player_money >= cost[1][1] ? '':'#f00'}}">
                    {"icon":"money","text":[{{cost[1][1]}}] }
                </app_a-widget-coin-coin>
            </div>
        {{else}}
        {{let max_attr = soul_obj[level].attr}}
        <div style="position: absolute;width:205px;height:46px;left:50%;top:40px;margin-left:-102px;">
            <app_a-widget-bg_frame-bg style="position: absolute;width:205px;height:46px;">
                {"bgName":"att_bg_2"} 
            </app_a-widget-bg_frame-bg>
            <div style="position:absolute;width:205px;height:46px;text-align:center;line-height:46px;color:#51e650;">{{it1.attribute_config[max_attr[0]]}}: +{{max_attr[1]}}</div>
        </div>
        <div style="position:absolute;width:540px;height:30px;line-height:30px;font-size:24px;color:#ffd8a6;font-family:mnjsh;text-align:center;top:98px;">已达到最高等级</div>
        {{end}}
    </div>
    <app_a-widget-pic_other-pic_other style="position:absolute;bottom:0px;width:100%;">
        {"icon":"bg_bottom"}
    </app_a-widget-pic_other-pic_other>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback"></div>
</div>