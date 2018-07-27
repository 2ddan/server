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
        <div w-class="6" style="background-image:url(app_c/robres/images/bg1.jpg);">
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

            {{let gang_list = it1.base_data.match_gang_info}}
            {{let position = [[137,13],[15,158],[95,317],[251,154]]}}
            <div data-desc="帮会列表" w-class="13">
                {{for i,v of gang_list}}
                {{if v}}
                <div on-tap="openEgang({{v[0]}})"  w-class="16" style="top:{{position[i][0]}}px;left:{{position[i][1]}}px;">
                    <img src="app_c/robres/images/{{i+1}}.png" />
                    <div w-class="15">
                        <app_a-widget-pic_text-pic_text w-class="14">
                            {"icon":"equip_level_bg","text":" ","width":145,"height":48}
                        </app_a-widget-pic_text-pic_text>
                        <div w-class="17" style="color:#ffd8a6;font-size:16px;">{{it1.area[v[1][2]].name}}&nbsp;<span style="color:#12ff00">(S{{v[1][2]}})</span></div>
                        <div w-class="17" style="color:#ff5400;font-size:16px;">{{v[1][0]}}&nbsp;(LV{{v[1][1]}})</div>
                    </div>
                </div>
                {{end}}
                {{end}}
                <div w-class="16" style="top:{{position[3][0]}}px;left:{{position[3][1]}}px;">
                    <img src="app_c/robres/images/{{4}}.png" />
                    <div w-class="15">
                        <app_a-widget-pic_text-pic_text w-class="14">
                            {"icon":"equip_level_bg","text":" ","width":145,"height":48}
                        </app_a-widget-pic_text-pic_text>
                        <div w-class="17">{{it1.player.area_name}}<span style="color:#12ff00">(S{{it1.player.area}})</span></div>
                        <div w-class="17" style="color:#ff5400;font-size:16px;">{{it1.my_gang_name}}&nbsp;LV{{it1.my_gang_level}}</div>
                        <div w-class="21">
                            <app_a-widget-pic_text-pic_text>
                                {"icon":"flag_green","text":" ","width":32,"height":43}
                            </app_a-widget-pic_text-pic_text>
                            <div  w-class="22">己方</div>
                        </div>
                    </div>
                </div>
            </div>
            <div w-class="18" style="bottom:77px;"> 
                {{let arr = ["二", "三", "四", "五", "六", "日"]}}
                {{for i, v of arr}}
                {{let type = (i + 1) < it1.day ? "disabled" : (i + 1 == it1.day ? "hl" : "default")}}
                {{let text_type = (i + 1) < it1.day ? "livenessList" : "lingBtn"}}
                <div style="position: relative;text-align: center;display: inline-block;width:64px;height:64px;margin:0 5px;">
                    <widget w-tag="app_a-widget-btn-ling" >
                        {"class":{{type}},"fontSize":32,"color":"#49312E","text":{{i+1}},"width":64,"height":64,"textCfg":{{text_type}} } 
                    </widget>
                    <app_a-widget-text-text style="display:inline-block;pointer-events:none;position: relative;">
                        {"text":{{"周"+v}},"textCfg":{{text_type}},"fontSize":24,"space":-4 }
                    </app_a-widget-text-text>
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

            <app-widget-btn-menu on-tap="openTarget" style="width:70px;height:70px;bottom: 12px;right: 16px;">
                {"icon":"menu_fire", "text":"集火目标", "width":70,"height":70,"bottom":0,"fontSize":20,"bg":4,"space":-6,"top":-2,"position":"absolute"}
            </app-widget-btn-menu>
        </div>

    </div>
    <widget w-class="8" w-tag="app_a-widget-pic_text-pic_text" class="shadow8">
        {"icon":"name_bg_2","width":220,"height":40,"text":{{"当前战力:" + it1.Common.numberCarry(it1.player.power,10000)}}} 
    </widget>
</div>