<div maxId="59" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}				
	<app_b-widget-title-title style="z-index:2;position: absolute;left: 0px;top: 0px;">
		{"text":"门派BOSS","coin":["money","diamond",150005],"type":"contribute","left":4,"top":12,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
    </app_b-widget-title-title>
    
    <div style="position:absolute;width:100%;top:112px;height:700px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:700px;left:50%;margin-left:-246px;">
            {"bgName":"bg_frame21"}
        </widget>
        <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-14px;left:0px;right: 0px;margin: auto;">
            {"line":"line_7"} 
        </widget>
        {{let boss = it1.gangBoss.boss_info[it1.index]}}
        {{let monster = it1.monster_base[boss[0]]}}
        <img src="../images/gang_boss_bg.png" alt="" srcset="" style="left: 50%;position: absolute;width: 488px;height: 450px;top: 2px;margin-left: -244px;"/>
        <div style="position:absolute;margin-left: -242px;top: 0;width:485px;height:450px;font-family: mnjsh;font-size: 22px;left: 50%;">
            <app-scene-base-scene>
                {
                    "name":"uiscene",
                    "type":"monster",
                    "module":{
                        "module": {{monster.module}},
                        "position": [0, -2.8, 0],
                        "scale": 1,
                        "rotate": [0,0,0]
                    },
                    "width": 485,
                    "height": 450
                }
            </app-scene-base-scene>
            <div style="position: absolute;left: 20px;top: 10px;width: 138px;height: 70px;">
                <img src="../images/point_bg.png" alt="" style="position: absolute;" />
                <div style="position: absolute;height: 30px;line-height: 30px;text-align: center;color: #fde7ca;width: 138px;top:18px;">第{{(it1.index + 1)}}关</div>
            </div>

            <widget class="shadow8" w-tag="app_a-widget-pic_text-pic_text" style="left: 0px;right: 0px;margin: auto;bottom: 37px;position: absolute;color: #fde7ca;line-height: 40px;text-align:center;">
                {"icon":"name_bg_2","width":184,"height":40,"text":{{monster.des + "LV" + boss[1]}}} 
            </widget>
            {{let progress = ((boss[2] / it1.boss_max_hp) * 100).toFixed(2) - 0}}
            <div style="position: absolute;width: 492px;height: 36px;bottom: 0px;left: 50%;margin-left: -246px;">
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:36px;left:50%;margin-left:-246px;">
                    {"bgName":"bg_frame47"} 
                </widget>
                <app_a-widget-bar-bar2 style="position: absolute;width: 430px;height: 18px;left: 33px;top:10px;">
                    {"progress":{{progress}},"text":{{(boss[2] == 0) ? "已击杀" : progress + "%"}},"lineHeight":18,"fontSize":14,"split":[]} 
                </app_a-widget-bar-bar2>
            </div>

            <app_a-widget-btn_pic-btn_pic on-tap="bossTab(-1)" style="left: 10px;top:230px;transform: rotate(180deg)">
                {"icon":"light_arraw","width":40}
            </app_a-widget-btn_pic-btn_pic>
            <app_a-widget-btn_pic-btn_pic on-tap="bossTab(1)" style="right: 10px;top:230px;">
                {"icon":"light_arraw","width":40}
            </app_a-widget-btn_pic-btn_pic>

            <div class="shadow" style="position: absolute;width: 170px;height: 160px;right: 14px;top: 14px;">
                <app_a-widget-img_stitch-stitch style="position: absolute;left: 0px;width: 100%;height: 100%;">
                    {"type":1,"height":15,"width":15}
                </app_a-widget-img_stitch-stitch>
                <div style="width: 170px;height: 40px;line-height: 40px;text-align: center;">
                    <app_a-widget-text-text style="position:absolute;top:8px;left:40px;">
                        {"text":"进度排名","fontSize":22,"textCfg":"livenessList","space":-2}
                    </app_a-widget-text-text>
                </div>
                {{let rank_info = it1.gang_rank.rank_info[1]}}
                {{let arr = [1, 2, 3]}}
                {{for i, v of arr}}
                {{let rank = rank_info[i]}}
                {{if rank}}
                <div style="width: 170px;height: 30px;line-height: 30px;text-align: center;position: relative;color: #fde7ca;">
                    <div style="width: 170px;height: 30px;line-height: 30px;text-align: center;display: flex;justify-content: space-between;text-align: center;">
                        <div style="width: 40px;">{{v}}</div>
                        <div style="width: 88px;">{{rank.gang_name}}</div>
                        <div style="width: 40px;">{{rank.record[0]}}关</div>
                    </div>
                    <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;bottom: 0px;left: 0px;height: 2px;">
                        {"line":"line_1"} 
                    </widget>
                </div>
                {{end}}
                {{end}}
                <div on-tap="lookRank" style="position: absolute;width: 170px;height: 30px;line-height: 30px;text-align: center;color: #51e650;bottom: 0px;">查看排名</div>
            </div>
        </div>

        <div style="width:492px;height:220px;position: absolute;top: 472px;left: 50%;margin-left: -246px;">
            <app_a-widget-title-single style="position: absolute;top: -10px;left: 0px;right: 0px;margin: auto;width: 84px;">
                {"padding":10,"type":12,"width":175,"text":"奖励预览","textCfg":"singleTitle","fontSize":22,"space":-4,"color":"#b27d5c","wear":0,"class":0} 
            </app_a-widget-title-single>
            {{let award = it1.guild_boss[it1.index].show_drop}}
            <div style="position: absolute;width: 492px;height: 90px;top: 30px;text-align: center;">
                {{for i, v of award}} 
                {{let prop = it1.Pi.sample[v]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(it1.career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = it1.checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.career_id)] : prop.name}}
                <div style="position:relative;width:90px;height:90px;display:inline-block;color:#ffffff;font-family:mnjsh;margin:0px 10px;font-size:18px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{v}})">
                        {"width":90,"height":90,"prop":{{prop}} ,"url":{{url}},"count":"none","name":{{name}} } 
                    </widget>
                </div>
                {{end}}

            </div>

            <div style="width: 116px;height: 70px;top:148px;position:absolute;left: 0px;right:0px;margin: auto;">
                {{if it1.gangBoss.role_boss_award[it1.index]}}
                <app_a-widget-pic_text-pic_text on-tap="gotoBox" style="position: absolute;left: 11px;top: 11px;">
                    {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
                </app_a-widget-pic_text-pic_text>            
                {{elseif it1.gangBoss.boss_award_info[it1.index]}}
                <app_a-widget-btn-rect style="top:0px;position:absolute;left: 0px;" on-tap="gotoBox">
                    {"text":"领取奖励","class":"hl","fontsize":24,"width":116,"height":45}
                </app_a-widget-btn-rect>                
                {{else}}
                <app_a-widget-btn-rect style="top:0px;position:absolute;left: 0px;" on-tap="fightBoss">
                    {"text":"挑  战","class":"hl","fontsize":24,"width":116,"height":45}
                </app_a-widget-btn-rect>
                <div style="position: absolute;width: 130px;left: 50%;margin-left: -65px;top: 50px;height: 20px;line-height: 20px;color: #ffd8a6;font-size: 16px;text-align:center;">剩余次数:{{it1.guild_base.init_count - it1.gangBoss.fight_count}}次</div>
                {{end}}
            </div>


        </div>

    </div>

</div>