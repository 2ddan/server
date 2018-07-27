<div style="position: absolute;width: 460px;height: 640px;left: 50%;margin-left: -230px;top: 50%;margin-top: -280px;">
    <widget style="position: absolute;left: -38px;top: -25px;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"tips_top"}
    </widget>
    <widget  style="position: absolute;left: -2px;top: 0px;width: 464px;height: 640px;opacity: 0.95;" w-tag="app_a-widget-bg_frame-bg">
        {"bgName":"bg_frame26"}
    </widget>
    <widget style="position: absolute;left: -38px;bottom: -15px;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"tips_bottom"}
    </widget>
    <widget style="position: absolute;left: 421px;top: -35px;z-index: 1;" on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic">
        {"icon":"close"}
    </widget>
    
    <widget style="position: absolute;left: -14px;top: 0px;z-index: 1;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"}
    </widget>

    {{let city = it1.mirror_city_detail[it1.arrange_index]}}
    {{let city_gate = it1.guild_battle_guard[it1.gate_name[it1.arrange_index].flag]}}
    {{let name = it1.gate_name[it1.arrange_index].name}}
    <widget style="width: 187px;height: 33px;text-align: center;position: absolute;left: 132px;top: -29px;" w-tag="app_a-widget-pic_text-pic_text">
        {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{name}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
    </widget>
    {{let count = 0}}
    <div style="position: absolute;width: 390px;height: 164px;left: 50%;margin-left: -195px;text-align: center;">
        <div style="margin-top: 12px;height: 30px;line-height: 30px;color: #f3d6af;font-family: mnjsh;text-align: center;font-size: 20px">状态: <span style="color: red;">{{city[3] == 0 ? '攻打中' : '已击破'}}</span></div>
        {{let total_hp = city_gate[it1.fight_gang[1][1]].city_gate_hp}}
        {{let progress = ((city[1] / total_hp * 100)).toFixed(0)}}
        <widget class="shadow" w-tag="app_a-widget-bar-bar5" style="width:380px;height:24px;font-family:mnjsh;position: relative;margin: 10px auto;">
            {"progress":{{progress}},"text":{{city[1] + "/" + total_hp}},"color":"#fde7ca","lineHeight":24,"fontSize":18,"width":380,"height":24} 
        </widget>

        <div style="position: relative;height: 80px;display: flex;color: #fde7ca;">
            <div style="flex: 1;">
                <div style="font-family: mnjsh;font-size: 20px;">攻破奖励</div>
                <div style="line-height: 24px;margin-top: 6px;">{{city_gate[it1.fight_gang[1][1]].city_gate_money}}门派资金</div>
            </div>
            <div style="flex: 1;">
                <div style="font-family: mnjsh;font-size: 20px;">攻破条件</div>
                <div style="line-height: 24px;margin-top: 6px;">击杀所有守军</div>
                <div style="line-height: 24px">或城门血量为0</div>
            </div>
        </div>
    </div>

    <div style="left: 16px;top: 170px;height:448px;width:430px;position: absolute;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="left: 0px;top: 0px;height:448px;width:430px;opacity:0.85">
            {"bgName":"bg_frame32"} 
        </widget>
        <div class="scroll_box_v" layout="scroll" style="position: absolute;width: 100%;height: 330px;top: 10px;">
            {{let role = it1.role_info[it1.arrange_index]}}
            {{for i, v of role}}
            <div style="position: relative; width: 414px; height: 100px;margin-bottom:12px;margin-left: 8px;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 100px;z-index:0;left: 0;">
                    {"type":2,"height":20,"width":30}
                </app_a-widget-img_stitch-stitch>
                {{let imgX= ''}}
                {{: imgX = it1.Pi.pictures['playerhead'+(v.head || v.career_id)]}}
                {{let id = v.role_id || null}}
                <widget style="position: absolute;left: 18px;top: 4px;width: 97px;height: 97px;" w-tag="app_a-widget-head-friend" on-tap="seeOther({{id}})">
                    {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
                </widget>
                <div style="position: absolute;width: 200px;height: 80px;color: #f3d6af;font-size: 18px;font-family: mnjsh;left: 120px;top: 14px;">
                    <widget w-tag="app_a-widget-text-text">
                        {"text":{{v.name}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                    </widget>
                    <div class="shadow" style="line-height: 24px;">等级: {{v.level}}</div>
                    {{let power = it1.Common.numberCarry(v.fight_power,1000000)}}
                    <div class="shadow" style="line-height: 24px;">战斗力: {{power}}</div>                
                </div>

                <div style="color: #f3d6af;height: 60px;font-family: mnjsh;font-size: 20px;text-align: center;width: 110px;position: absolute;right: 20px;top: 20px;">
                    {{if city[3] == 0}}
                    {{:count = count + city[2][i][1]}}
                    <div style="position: absolute;line-height: 20px;height: 20px;text-align: center;font-size: 16px;top: 0px;width: 160px;left: -25px;">防守次数:{{city[2][i][1]}}/{{city_gate[it1.fight_gang[1][1]].everyone_guard_num}}</div>
                    <app_a-widget-btn-rect style="position:absolute;top: 20px" on-tap="challange({{[v.role_id, city[0], city[3]]}})">
                        {"text":"挑 战","class":"hl","fontsize":24,"width":110,"height":40}
                    </app_a-widget-btn-rect>
                    {{else}}
                    <app_a-widget-pic_text-pic_text style="position: absolute;top: 0px;left: 3px;">
                        {"icon":"break_down","width":94,"height":60}
                    </app_a-widget-pic_text-pic_text>
                    {{end}}
                </div>            
            </div>  
            {{end}}
        </div>

        <div style="position: absolute;width: 100%;height: 106px;bottom: 0px;color: #f3d6af;font-size: 18px;">
            <div class="shadow" style="line-height: 23px;height: 46px;font-family: mnjsh;width: 370px;position: absolute;left: 35px;top: 5px;">成功挑战守军,可降低400城门血量,守军的战斗力越高,获得战绩越高</div>
            <div style="position: absolute;line-height: 26px;height: 29px;white-space: nowrap;padding-left: 7px;bottom: 16px;left: 131px;" class="shadow7">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":156,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">可防守次数: {{count}}</span> 
            </div>
        </div>
    </div>
</div>