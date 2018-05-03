<div style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:2">
    {{let root = _get("pi/ui/root").exports}}
    <app_b-widget-title-title style="top:0;z-index:9;position:absolute">
        {"text":"藏经阁","coin":["money","diamond",150005],"left":30,"top":11,"type":"contribute","width":{{root.getWidth()}}}
    </app_b-widget-title-title>

    {{let selectLevel = it1.gangData.role_gang_skill[it1.other.skill_id - 1]}}
    {{let selectSk = it1.guild_skill[it1.other.skill_id]}}
    {{let selectSkUrl = it1.Pi.pictures[selectSk[selectLevel].skill_icon]}}
    <div style="position:absolute;width:540px;height:706px;top:112px;left:50%;margin-left:-270px;">
        <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0;width:492px;height: 701px;">
            {"bgName":"bg_frame21"} 
        </app_a-widget-bg_frame-bg>

        <div style="position: absolute;width: 492px;height: 350px;top:0px;left:50%;overflow-x: hidden;margin-left: -246px;">
            <img src="../images/skill_bg_1.png" alt="" style="position: absolute;width: 540px;height: 315px;top:0px;left:50%;margin-left: -270px;" />
            <img src="../images/skill_bg_2.png" alt="" style="position: absolute;width: 362px;height: 269px;top:0px;left: 50%;margin-left: -181px;" />
            <app_a-widget-prop-base style="position: absolute;width: 104px;height: 104px;left: 50%;margin-left: -50px;top:85px;">
                {"prop":"","url":"{{selectSkUrl}}","width":104,"height":104,"count":"none","name":"none","bg":0}
            </app_a-widget-prop-base>

            <div style="position: absolute;width: 188px;height:60px;left:50%;margin-left:-94px;top:248px;font-family: mnjsh;font-size: 18px;">
                <app_a-widget-pic_text-pic_text style="top:0px;position:absolute;left: 0px;">
                    {"icon":"fight_time_bg","width":188,"height":60,"text":" "} 
                </app_a-widget-pic_text-pic_text>
                <div style="position: absolute;width:188px;height:24px;color:#ffd8a6;text-align:center;line-height:24px;top:7px;">{{selectSk[selectLevel].skill_name}} <span style="color:#51e650;">({{"LV"+selectLevel}})</span></div>
                <div style="position: absolute;width:188px;height:24px;color:#ffd8a6;text-align:center;line-height:24px;bottom: 7px;">修炼上限:LV{{selectSk.length - 1}}</div>
            </div>

        </div>

        <app_a-widget-line-line style="position: absolute;left: 0;top: -15px;z-index:3;">
            {"line":"line_7"} 
        </app_a-widget-line-line>

        <div style="position:absolute;width: 440px;height: 130px;left: 50%;margin-left: -220px;top:326px;font-family: mnjsh;">
            <widget  w-tag="app_a-widget-bg_frame-bg">
                {"bgName":"bg_frame50"} 
            </widget>
            <app_a-widget-pic_other-pic_other style="position:absolute;top:-11px;left: 11px;">
                {"icon":"title_arrow"}
            </app_a-widget-pic_other-pic_other>

            {{%% 有无下一级 判断是否为最高级}}
            {{if !selectSk[selectLevel + 1]}}
            <div style="position:absolute;width:240px;height:40px;text-align:center;line-height:40px;color:#51e650;top: 50%;margin-top: -20px;left: 50%;margin-left: -120px;font-size: 24px;">已修炼至大圆满境界</div>
            {{else}}
            <div class="shadow" style="position:absolute;width:120px;height:90px;top:26px;left: 50px;">
                <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:#ffffff;">当前属性</div>
                {{if selectLevel == 0}}
                <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:red;">{{(it1.gangExpandData.build_level_info[0] >= selectSk[0].limit.guild_level) ? "未学习" : "藏经阁" + selectSk[0].limit.guild_level + "级开放"}}</div>
                {{else}}
                    {{let attr = selectSk[selectLevel].attr}}
                    <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:#ffb675;">{{it1.attribute_config[attr[0]]}}: +{{attr[1] < 1 ? (attr[1] * 100 + '%') : attr[1]}}</div>

                    {{%%%当玩家从高等级门派去往低等级门派时, 技能保留}}
                    {{let limit_lv = selectSk[selectLevel].limit.guild_level}}
                    {{if limit_lv > it1.gangExpandData.build_level_info[0]}}
                    <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:red;">{{"藏经阁" + limit_lv + "级开放"}}</div>
                    {{end}}
                {{end}}
            </div>

            <app_a-widget-btn_pic-btn_pic style="position:absolute;top:33px;left:200px;">
                {"icon":"light_arraw","width":40}
            </app_a-widget-btn_pic-btn_pic>

            <div style="position:absolute;width:120px;height:90px;top:26px;right: 50px;">
                <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:#ffffff;">下级属性</div>
                {{let attr_next = selectSk[selectLevel + 1].attr}}
                <div style="position:relative;width:120px;height:30px;text-align:center;line-height:30px;color:#ffb675;">{{it1.attribute_config[attr_next[0]]}}: +{{attr_next[1] < 1 ? (attr_next[1] * 100 + '%') : attr_next[1]}}</div>
            </div>
            {{end}}
        </div>

        <div style="position:absolute;width:540px;height:80px;top:456px;z-index:4;">
            <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0px;width: 492px;height: 92px;">
                {"bgName":"bg_frame30"} 
            </app_a-widget-bg_frame-bg>

            <div data-desc="活动滚动box" style="position:absolute;z-index:3;width:402px;top:8px;height:76px;overflow:hidden;left:50%;white-space: nowrap;margin-left:-201px;">
                <div style="position:absolute;top:0px;width:100%;height:128%;overflow-y:hidden;overflow-x:auto;z-index:3;top:-2px" scroller="1">
                {{for i, v of it1.gangData.role_gang_skill}}
                {{let sk = it1.guild_skill[i + 1][v]}}
                {{let url = it1.Pi.pictures[sk.skill_icon]}}
                <div style="position: relative;;width: 80px;height:80px;display: inline-block;margin-top: 3px;" on-tap="changeTab({{i + 1}})">
                    {{if (!it1.guild_skill[i + 1][v + 1]) || (it1.gangExpandData.build_level_info[0] >= sk.limit.guild_level)}}
                    <app_a-widget-prop-base style="z-index:2;position:absolute;">
                        {"prop":0,"url":{{url}},"width":80,"height":80,"hidden_name":1,"count":"none"}
                    </app_a-widget-prop-base>
                    {{else}}
                    <app_a-widget-prop-base style="z-index:2;position:absolute;">
                        {"prop":0,"url":"","width":80,"height":80,"hidden_name":1,"count":"none","lock":1}
                    </app_a-widget-prop-base>                    
                    {{end}}

                    {{if (it1.other.skill_id - 1) == i}}
                    <app_a-widget-select-select style="position: absolute;top:-4px;z-index: 2;">
                        {"select":"equip_select","width":80,"height":80}
                    </app_a-widget-select-select>
                    {{end}}
                </div>
                
                {{end}}
                    
                </div>
            </div>
        </div>
        {{if selectSk[selectLevel + 1]}}
        {{let cost = selectSk[selectLevel].cost}}
        <div class="cost_bg" style="position: absolute;width: 460px;height:90px;left: 50%;margin-left: -230px;top:556px;">
            <div style="position: absolute;width: 390px;height:30px;left: 50%;margin-left: -185px;top:24px;display:flex;justify-content:space-between;font-size:18px;text-align: center;">
                <div style="line-height: 30px;color: #ffd8a6;">升级消耗:</div>
                {{let bool_1 = it1.gangExpandData.gang_contribute >= cost.cost_contribute}}
                {{let bool_2 = it1.player.money >= cost.cost_money}}
                <app_a-widget-coin-coin style="color: {{bool_1 ? '#ffd8a6' : '#ff0000'}}">
                    {"icon":"contribute","text":{{[it1.Common.numberCarry(it1.gangExpandData.gang_contribute, 10000), cost.cost_contribute]}},"height":30,"width":30, "color": "#ffd8a6"}
                </app_a-widget-coin-coin>
                <app_a-widget-coin-coin style="color: {{bool_2 ? '#ffd8a6' : '#ff0000'}}">
                    {"icon":"money","text":{{[it1.Common.numberCarry(it1.player.money, 10000), cost.cost_money]}},"height":30,"width":30,"color": "#ffd8a6"}
                </app_a-widget-coin-coin>
            </div>
        </div>
        <app_a-widget-btn-rect style="top:644px;position:absolute;left: 0px;right:0px;margin: auto;" on-tap="studySkill">
            {"text":"修 炼","class":"hl","fontsize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
        {{end}}
    </div>
</div>