
<div maxId="97" style="position:absolute;width:100%;height:100%;z-index:2"  test="test" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}		
    <widget w-tag="app_b-widget-title-title"  w-class="3">
        {"text":"门派战","coin":["money","diamond"],"left":33,"top":16,"width":540,"width":{{root.getWidth()}} } 
    </widget>
    
    <widget w-tag="app_a-widget-line-line" w-class="4">
        {"line":"line_7"} 
    </widget>
    <div w-class="5">
        <widget w-tag="app_a-widget-bg_frame-bg" w-class="10">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="6">
            <div>
                <div data-desc="左边介绍"  w-class="7" class="shadow7">
                    <app_a-widget-img_stitch-stitch  w-class="12">
                        {"type":1,"height":15,"width":15}
                    </app_a-widget-img_stitch-stitch>
                    <div  w-class="24">
                        <div>门派总战绩:<span style="color:#12ff00">{{it1.base_data.gangl_total_integration[1]}}(第x名)</span></div>
                        <div style="white-space: nowrap;">个人总战绩:{{it1.base_data.personal_total_integration[1]}}(第xx名)</div>
                        <div>个人今日战绩:{{it1.base_data.combat_record[1]}}</div>
                    </div>
                </div>
                <app_c-gang_battle-share-share  w-class="9"></app_c-gang_battle-share-share>
            </div>
            <div style="position: absolute;width: 216px;height: 81px;left: 8px;top: 110px;">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;">
                    {"icon":"name_bg_2","width":216,"height":81,"text":{{it1.fight_gang[1][0]}},"textCfg":"livenessList","fontSize":24,"top":15} 
                </widget>
                {{let level = it1.fight_gang[1][1]}}
                {{let left_hp = it1.guild_battle_guard["left"][level].city_gate_hp}}
                {{let right_hp = it1.guild_battle_guard["right"][level].city_gate_hp}}
                {{let before_hp = it1.guild_battle_guard["before"][level].city_gate_hp}}
                {{let center_hp = it1.guild_battle_guard["center"][level].city_gate_hp}}
                {{let total_hp = left_hp + right_hp + before_hp + center_hp}}
                {{let progress = ((it1.fight_gang[2] / total_hp * 100)).toFixed(0)}}
                <widget class="shadow" w-tag="app_a-widget-bar-bar5" style="width:190px;height:24px;position:absolute;top: 41px;left: 10px;font-family:mnjsh;">
                    {"progress":{{progress}},"text":{{it1.fight_gang[2] + "/" + total_hp}},"color":"#fde7ca","lineHeight":24,"fontSize":18,"width":190,"height":24} 
                </widget>
            </div>

            {{let position = [[118,69],[118,340],[293,198],[115,228]]}}
            <div data-desc="结界" w-class="13">
                <img src="../images/field.png" style="position: absolute;left: 50%;margin-left: -209px;top: 63px;" />
                {{% =======左右主内==对应==天地人中心=======}}
                {{for i,v of it1.mirror_city_detail }}
                {{let img = v[0] <= 3 ? (v[3] == 0 ? '1' : '2') : '3'}}
                <div on-tap="openCityGate({{i}})" w-class="16" style="top:{{position[i][0]}}px;left:{{position[i][1]}}px;">
                    <img src="../images/{{img}}.png" />
                    <div style="font-family:mnjsh;position:absolute;top:-18px;left:{{i==1?40:(i==3 ?-42:-30)}}px;width:57px;height:120px;">
                        <widget w-tag="app_a-widget-pic_text-pic_text">
                            {"icon":"fun_name_bg","width":57,"height":120,"text":""}
                        </widget>
                        <div class="center_h" style="font-size:18px;width:15px;top:60px;transform:translateY(-50%);color:#583730">结界
                            {{if i<3}}
                            <div style="text-align: center;font-size: 24px;width: 15px;height: 15px;line-height: 3px;">.</div>
                            {{end}}
                            {{it1.gate_name[v[0] - 1].name}}
                        </div>
                    </div>
                    {{let total_p = it1.guild_battle_guard[it1.gate_name[v[0] - 1].flag][it1.my_gang_level].config_person_num}}
                    <div style="position: absolute;width: 125px;height: 50px;left: 50%;margin-left: -62px;bottom: 0px;">
                        <div style="position: absolute;width: 125px;height: 23px;display: flex;justify-content: center;">
                            <img src="../images/person.png" alt="" srcset="" />
                            <div class="shadow" style="line-height: 23px;color: #f3d6af;margin-left: 8px;">{{v[2].length}}/{{total_p}}人</div>
                        </div>
                    </div>
                </div>
                {{end}}
            </div>
            {{let count = it1.guild_battle_base.everyday_fight_num + it1.base_data.buy_record - it1.base_data.combat_record[0]}}
            <div w-class="19" class="shadow7">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":143,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">可攻打次数: {{count}}</span> 
                <widget style="position:absolute;top:0;left:124px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount">
                    {"icon":"add_btn"} 
                </widget> 
                {{let time = it1.Util.serverTime()}}
                {{let date = new Date(time)}}
                {{let day = date.getDay()}}
                {{let hours = date.getHours()}}
                {{let minutes = date.getMinutes()}}
                {{let seconds = date.getSeconds()}}
                {{let total_seconds = (hours * 60 + minutes) * 60 + seconds}}
                {{let cd_time = time + (it1.guild_battle_base.fight_time[1] * 60 - total_seconds) * 1000}}
                <div w-class="20">
                    <app_a-widget-pic_text-pic_text class="shadow8"  >
                        {"icon":"equip_level_bg","text":"","width":320,"height":28}
                    </app_a-widget-pic_text-pic_text>
                    <div  w-class="23">门派攻防第2轮进行中,
                        <app-widget-cdTime1 ev-countdownend="" style="margin-left: 2px;display: inline-block;color:#12ff00">
                        { "cd_time":{{cd_time}},"now_time":{{time}},"cd_type":"x:x:x","full":"0"}
                        </app-widget-cdTime1>后结束
                    </div>
                </div>
            </div>
            {{if it1.fight_gang[4]}}
            <app-widget-btn-menu on-tap="openTarget" style="width:70px;height:70px;bottom: 12px;right: 16px;">
                {"icon":"menu_fire", "text":"集火目标", "width":70,"height":70,"bottom":0,"fontSize":20,"bg":4,"space":-6,"top":-2,"position":"absolute"}
            </app-widget-btn-menu>
            {{end}}
        </div>
    </div>
    <widget w-class="8" w-tag="app_a-widget-pic_text-pic_text" class="shadow8">
        {"icon":"name_bg_2","width":220,"height":40,"text":{{"当前战力:" + it1.Common.numberCarry(it1.player.power,10000)}}} 
    </widget>
</div>

