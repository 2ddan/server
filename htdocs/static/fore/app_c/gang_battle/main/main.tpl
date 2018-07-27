<div maxId="97" style="position:absolute;width:100%;height:100%;z-index:2"  test="test" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}		
    <widget w-tag="app_b-widget-title-title"  w-class="3">
        {"text":"门派战","coin":["money","diamond"],"left":33,"top":16,"width":540,"width":{{root.getWidth()}} } 
    </widget>
    
    <widget w-tag="app_a-widget-line-line" w-class="4">
        {"line":"line_7"} 
    </widget>
    
    {{let time = it1.Util.serverTime()}}
    {{let date = new Date(time)}}
    {{let day = date.getDay()}}
    {{let hours = date.getHours()}}
    {{let minutes = date.getMinutes()}}
    {{let seconds = date.getSeconds()}}
    {{let total_seconds = (hours * 60 + minutes) * 60 + seconds}}
    {{let cd_time = 0}}
    {{if day == 1}}
    {{: cd_time = time + (24 * 3600 - total_seconds) * 1000 + it1.guild_battle_base.fight_time[0] * 60 * 1000}}
    {{elseif day == 2}}
    {{: cd_time = time + (it1.guild_battle_base.fight_time[0] * 60 - total_seconds) * 1000}}
    {{end}}
    <div w-class="5">
		<widget w-tag="app_a-widget-bg_frame-bg" w-class="10">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="6">
            <div>
                <div data-desc="左边介绍" w-class="7" class="shadow7">
                    <app_a-widget-img_stitch-stitch  w-class="12">
                        {"type":1,"height":15,"width":15}
                    </app_a-widget-img_stitch-stitch>
                    <div  w-class="11">
                        <div>距离开始:
                            <app-widget-cdTime1 ev-countdownend="" style="margin-left: 2px;display: inline-block;color:#12ff00">
                                { "cd_time":{{cd_time}},"now_time":{{time}},"cd_type":"x:x:x","full":"0"}
                            </app-widget-cdTime1>
                        </div>
                    </div>
                </div>
                <app_c-gang_battle-share-share  w-class="9"></app_c-gang_battle-share-share>
            </div>
            {{let position = [[118,69],[118,357],[293,198],[115,228]]}}
            <div data-desc="结界" w-class="13">
                {{% =======左右主内==对应==天地人中心=======}}
                {{for i,v of it1.gate_name}}
                {{let img = i < 3 ? 1 : 3}}
                <div on-tap="openArrange({{i}})"  w-class="16" style="top:{{position[i][0]}}px;left:{{position[i][1]}}px;">
                    <img src="../images/{{img}}.png" />
                    <div  style="font-family:mnjsh;position:absolute;top:-18px;left:{{i==1?40:(i==3 ?-42:-30)}}px;width:57px;height:120px;">
                        <widget w-tag="app_a-widget-pic_text-pic_text">
                            {"icon":"fun_name_bg","width":57,"height":120,"text":""}
                        </widget>
                        <div class="center_h" style="font-size:18px;width:15px;top:60px;transform:translateY(-50%);color:#583730">结界
                            {{if i<3}}
                            <div style="text-align: center;font-size: 24px;width: 15px;height: 15px;line-height: 3px;">.</div>
                            {{end}}
                            {{v.name}}
                        </div>
                    </div>
                    {{let has = it1.base_data.city_lineup[i].length}}
                    {{let total_p = it1.guild_battle_guard[it1.gate_name[i].flag][it1.my_gang_level].config_person_num}}
                    <div style="position: absolute;width: 125px;height: 50px;left: 50%;margin-left: -62px;bottom: 0px;">
                        <div style="position: absolute;width: 125px;height: 23px;display: flex;justify-content: center;">
                            <img src="../images/person.png" alt="" srcset="" />
                            <div class="shadow" style="line-height: 23px;color: #f3d6af;margin-left: 8px;">{{has}}/{{total_p}}人</div>
                        </div>
                    </div>
                </div>
                {{end}}
            </div>
            <div w-class="18"> 
                {{let arr = ["一","二", "三", "四", "五", "六"]}}
                {{for i, v of arr}}
                {{let type = (i + 1) < it1.day ? "disabled" : (i + 1 == it1.day ? "hl" : "default")}}
                {{let text_type = (i + 1) < it1.day ? "livenessList" : "lingBtn"}}
                <div style="position: relative;text-align: center;display: inline-block;width:64px;height:64px;margin:0 5px;" on-tap="" >
                    <widget w-tag="app_a-widget-btn-ling" >
                        {"class":{{type}},"fontSize":32,"color":"#49312E","text":{{i+1}},"width":64,"height":64,"textCfg":{{text_type}} } 
                    </widget>
                    <app_a-widget-text-text style="display:inline-block;pointer-events:none;position: relative;">
                        {"text":{{"周"+v}},"textCfg":{{text_type}},"fontSize":24,"space":-4 }
                    </app_a-widget-text-text>
                </div>
                {{end}}
            </div>
        </div>
    </div>
    <widget w-class="8" w-tag="app_a-widget-pic_text-pic_text" class="shadow8">
        {"icon":"name_bg_2","width":220,"height":40,"text":{{"当前战力:" + it1.Common.numberCarry(it1.player.power,10000)}}} 
    </widget>
</div>