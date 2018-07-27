<div style="position: absolute;width: 460px;height: 580px;left: 50%;margin-left: -230px;top: 50%;margin-top: -280px;">
    <widget style="position: absolute;left: -38px;top: -25px;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"tips_top"}
    </widget>
    <widget  style="position: absolute;left: -2px;top: 0px;width: 464px;height: 580px;opacity: 0.95;" w-tag="app_a-widget-bg_frame-bg">
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

    <widget style="width: 187px;height: 33px;text-align: center;position: absolute;left: 132px;top: -29px;" w-tag="app_a-widget-pic_text-pic_text">
        {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"奖励排行","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
    </widget>

    <div style="position: absolute;width: 100%;height: 44px;top: 20px;">
        {{for i, v of it1.gate_name}}
        <div style="position: relative;display: inline-block;width: 96px;height: 42px;margin-left: 14px;" on-tap="cityTab({{i}})">
            <widget w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;">
                {"class":{{it1.arrange_index == i ? "select" : "not_select"}},"fontsize":22,"color":{{it1.arrange_index == i ? "#554137" : "#ad8e7c"}},"text":{{v.name}},"width":96,"height":42,"no_shadow":1} 
            </widget>
        </div>
        {{end}}
    </div>
    <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 456px;top: 60px;">
        {"line":"line_12"} 
    </widget>
    {{let config_p = 0}}
    <div style="left: 16px;top: 65px;height:490px;width:430px;position: absolute;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="left: 0px;top: 0px;height:490px;width:430px;opacity:0.85">
            {"bgName":"bg_frame32"} 
        </widget>
        <div class="scroll_box_v" layout="scroll" style="position: absolute;width: 100%;height: 360px;top: 10px;">
            {{for i, v of it1.arrange_arr}}
            <div style="position: relative; width: 414px; height: 100px;margin-bottom:12px;margin-left: 8px;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 100px;z-index:0;left: 0;">
                    {"type":2,"height":20,"width":30}
                </app_a-widget-img_stitch-stitch>
                {{let imgX= ''}}
                {{: imgX = it1.Pi.pictures['playerhead'+(v[1].head || v[1].career_id)]}}
                {{let id = v[1].role_id || null}}
                <widget style="position: absolute;left: 18px;top: 4px;width: 97px;height: 97px;" w-tag="app_a-widget-head-friend" on-tap="seeOther({{id}})">
                    {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
                </widget>
                <div style="position: absolute;width: 200px;height: 80px;color: #f3d6af;font-size: 18px;font-family: mnjsh;left: 120px;top: 14px;">
                    <widget w-tag="app_a-widget-text-text">
                        {"text":{{v[1].name}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                    </widget>
                    <div class="shadow" style="line-height: 24px;">等级: {{v[1].level}}</div>
                    {{let power = it1.Common.numberCarry(v[1].fight_power,1000000)}}
                    <div class="shadow" style="line-height: 24px;">战斗力: {{power}}</div>                
                </div>
                
                {{if v[2] == it1.arrange_index + 1}}
                {{: config_p = config_p + 1}}
                <widget on-tap="choose({{i}})" w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;top: 36px;right: 44px;">
                    {"index":1,"index1":1}
                </widget>
                {{elseif v[2] == 0}}
                <widget on-tap="choose({{i}})" w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;top: 36px;right: 44px;">
                    {"index":1,"index1":2}
                </widget>
                {{else}}
                <div class="shadow" style="color: #f3d6af;line-height: 30px;height: 30px;font-family: mnjsh;font-size: 20px;text-align: center;width: 60px;position: absolute;right: 30px;top: 34px;">{{it1.gate_name[v[2] - 1].name}}</div>  
                {{end}}          
            </div>  
            {{end}}
        </div>

        {{let total_p = it1.guild_battle_guard[it1.gate_name[it1.arrange_index].flag][it1.my_gang_level].config_person_num}}
        <div style="position: absolute;width: 100%;height: 106px;bottom: 0px;">
            <div class="shadow" style="color: #f3d6af;line-height: 30px;height: 30px;font-family: mnjsh;font-size: 20px;text-align: center;width: 100%;position: absolute;">驻守人员: {{config_p}}/{{total_p}}</div>
            <widget on-tap="oneKey" w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;top: 40px;left: 60px;">
                {"class":"hl","fontsize":22,"text":"一键防守","width":110,"height":39,"no_shadow":1} 
            </widget>
            <widget on-tap="sureArrange" w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;top: 40px;right: 60px;">
                {"class":"default","fontsize":22,"text":"保 存","width":110,"height":39,"no_shadow":1} 
            </widget>
        </div>

    </div>

</div>