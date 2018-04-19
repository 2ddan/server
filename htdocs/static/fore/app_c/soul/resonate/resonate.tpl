<div w-class="bg_1" style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:2">
    <app_b-widget-title-title style="top:0;z-index:9;position:absolute">
        {"text":"龙魂","coin":["money","diamond"],"left":56,"top":11}
    </app_b-widget-title-title>
    
    <div style="position:absolute;width:410px;height:136px;left:50%;margin-left:-205px;top:130px;">
        {{for i, v of it1.soul_seat}}
        <div on-tap="selectAcupoint({{v.id}})" style="position:absolute;width:36px;height:36px;left:{{i*49}}px;top:{{(i%2==0)?0:100}}px">
            <div style="position:absolute;top:8px;left:17px;transform-origin:0px 6px 0px;width:{{v.id == 9 ? 0 : 100}}px;transform: rotate({{i%2==0?65:-65}}deg)">
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

            <app_a-widget-pic_text-pic_text style="color:#ffd8a6;position:absolute;left:50%;margin-left:-43px;top:{{i%2==0?-40:40}}px;font-family:mnjsh;">
                {"icon":"text_bg_4","width":86,"height":31,"text":{{it1.player_level >= v.open_level ? (v.name + 'Lv' + it1.resonate_level[i]) : (v.open_level + '级开放')}} }
            </app_a-widget-pic_text-pic_text>
        </div>
        {{end}}
    </div>
    <app-scene-base-scene style="pointer-events: none;width: 540px;position: absolute;top: 10px;left: 50%;margin-left: -270px;height:500px">
        {"name":"uiscene","type":"effect","module":"" }
    </app-scene-base-scene>


    <app_a-widget-line-line style="position: absolute;left:50%;top: 325px;margin-left:-269px;">
        {"line":"line_7"} 
    </app_a-widget-line-line>

    <div style="position:absolute;width:540px;height:470px;left:50%;margin-left:-270px;top:370px;">
        <widget w-tag="app_a-widget-title-single" style="position:absolute;left:50%;margin-left:-40px;top:-18px;line-height:40px;">
            {"padding":10,"type":9,"width":120,"text":{{it1.soul_seat[it1.acupoint - 1].name}},"textCfg":"singleTitle","fontSize":28,"space":-2,"color":"","wear":0} 
        </widget>

        <div style="position:absolute;width:526px;height:212px;top:25px;left:50%;margin-left:-263px;">
            {{for i, v of it1.soulArr}}
            <div style="position:relative;width:228px;height:96px;margin:0 17px 18px 17px;display:inline-block;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 228px;height: 96px;">
                    {"type":2,"height":20,"width":30}
                </app_a-widget-img_stitch-stitch>

                {{let pic = it1.soulIcon[i]}}
                {{let img_3 = 'app_c/soul/images/' + pic + '.png'}}
                {{let s = it1.soul_info[it1.acupoint - 1][i]}}
                {{let lev = s[1]}}
                <div style="position:absolute;width:70px;height:70px;left:6px;top:14px;">
                    <app_a-widget-prop-base style="z-index:2;position:absolute;">
                        {"prop":0,"url":"","width":70,"height":70,"quality":"gray","hidden_name":1,"count":"none"}
                    </app_a-widget-prop-base>
                    <img src={{img_3}} style="position: absolute;top:4px;left:6px;width:56px;z-index:3;"/>
                    <div style="position: absolute;z-index:3;bottom:6px;left:8px;font-size:16px;font-family:mnjsh;color:#ffd8a6;width:70px;height:20px;line-height:20px;">{{'Lv'+lev}}</div>
                </div>
                {{let text = it1.soul_type_name[it1.soulArr[i]].name}}
                <app_a-widget-text-text style="position: absolute;top: 20px;left:97px;">
                    {"text":{{text}},"fontSize":22,"textCfg":"iconCircle" }
                </app_a-widget-text-text>
                {{let progress = lev / it1.soul_resonance_need[s[0]].length * 100}}
                <app_a-widget-bar-bar2 style="position:absolute;width:134px;height:14px;left:77px;top:57px;">
                    {"progress":{{progress}} }
                </app_a-widget-bar-bar2>
            </div>
            {{end}}
        </div>
        {{let arr = it1.soul_info[it1.acupoint - 1]}}
        {{let level_arr = []}}
        {{for m, n of arr}}
            {{:level_arr.push(n[1])}}
        {{end}}
        {{let min_level = Math.min.apply(null,level_arr)}}
        {{let all_attr = it1.soul_resonance[it1.acupoint]}}
        <div style="position:absolute;width:230px;height:180px;left:20px;top:260px;font-size:18px;font-family:mnjsh;">
            <app_a-widget-bg_frame-bg style="position: absolute;width:230px;height:180px;">
                {"bgName":"att_bg_2"} 
            </app_a-widget-bg_frame-bg>
            <app_a-widget-pic_text-pic_text style="top:20px;position:absolute;left:50%;margin-left: -75px;color: #ffb675;font-family:mnjsh;width: 150px;height: 36px;font-size:18px">
                {"icon":"title_bg","width":150,"height":36,"align":"center","marginLeft":3,"text":{{min_level + '阶共鸣'}},"textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
            </app_a-widget-pic_text-pic_text>
            {{if min_level == 0}}
            <div style="position:absolute;width:230px;height:40px;text-align:center;line-height:40px;color:#51e650;top:90px;">暂未有共鸣属性</div>            
            {{else}}
            <div style="position:absolute;width:230px;height:60px;top:86px;">
                {{for i, v of all_attr[min_level]}}
                <div style="position:relative;width:230px;height:30px;text-align:center;line-height:30px;color:#ffb675;">{{it1.attribute_config[v[0]]}}: +{{v[1] < 1 ? (v[1] * 100 + '%') : v[1]}}</div>
                {{end}}
            </div>
            {{end}}
        </div>

        <app_a-widget-btn_pic-btn_pic style="position:absolute;top:335px;left:245px;">
            {"icon":"light_arraw"}
        </app_a-widget-btn_pic-btn_pic>
        
        {{let length = it1.soul_resonance_need[it1.acupoint].length}}
        <div style="position:absolute;width:230px;height:180px;right:23px;top:260px;font-size:18px;font-family:mnjsh;">
            <app_a-widget-bg_frame-bg style="position: absolute;width:230px;height:180px;">
                {"bgName":"att_bg_2"} 
            </app_a-widget-bg_frame-bg>
            <app_a-widget-pic_text-pic_text style="top:20px;position:absolute;left:50%;margin-left: -75px;color: #ffb675;font-family:mnjsh;width: 150px;height: 36px;font-size:18px">
                {"icon":"title_bg","width":150,"height":36,"align":"center","marginLeft":3,"text":{{min_level >= length ? '共鸣已满' : ((min_level + 1) + '阶共鸣')}},"textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
            </app_a-widget-pic_text-pic_text>
            {{if (min_level) >= length}}
            <div style="position:absolute;width:230px;height:40px;text-align:center;line-height:40px;color:#51e650;top:90px;">已达最高共鸣</div>
            {{else}}
            <div style="position:absolute;width:230px;height:90px;top:56px;">
                <div style="position:relative;width:230px;height:30px;text-align:center;line-height:30px;color:#ffb675;">所有龙魂到达{{min_level + 1}}级</div>
                {{for i, v of all_attr[min_level + 1]}}
                <div style="position:relative;width:230px;height:30px;text-align:center;line-height:30px;color:#ffb675;">{{it1.attribute_config[v[0]]}}: +{{v[1] < 1 ? (v[1] * 100 + '%') : v[1]}}</div>
                {{end}}
            </div>
            {{end}}
        </div>
    </div>
    <app_a-widget-pic_other-pic_other style="position:absolute;bottom:0px;width:100%;">
        {"icon":"bg_bottom"}
    </app_a-widget-pic_other-pic_other>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback"></div>
</div>