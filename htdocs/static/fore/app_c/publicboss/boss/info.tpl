{{let Common = _get("app/mod/common").exports.Common}}
{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let Cfg= _get("app/mod/pi").exports.cfg}}
{{let Util = _get("app/mod/util").exports.Util}}

{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let publicboss_base = cfg.publicboss_base.publicboss_base}}
{{let publicboss_config = cfg.publicboss_config.publicboss_config}}
{{let show_award = Cfg.publicboss_award.publicboss_award}}
<div style="position: absolute;width: 100%;height: 100%;z-index:2;left: 50%;margin-left: -270px;">
    {{let allCount = Cfg.publicboss_config.publicboss_config.fight_times + it1.initData.buy_count }}
    {{let Count = allCount - it1.initData.count }}
    <div w-class="4" w-sid="4" style="bottom:10px;height:55px;">
		<div w-class="5" w-sid="5">

            <app_a-widget-pic_text-pic_text style="width:143px;height:28px;position: absolute;color: #ffd8a6;font-size: 16px;">{"icon":"resource_bar","width":143,"height":28,"align":"left","marginLeft":"10","text":{{"挑战次数:" + it1.total_count + "/" + Cfg.publicboss_config.publicboss_config.fight_times}}} 
            </app_a-widget-pic_text-pic_text>
            <widget on-tap="buyCount" w-tag="app_a-widget-btn_pic-btn_pic" style="left: 125px;"></widget>

            <span style="position: absolute;left: 160px;top: -7px;font-size: 16px;white-space: nowrap;color: rgb(81, 230, 80);">
                {{if it1.end_time}}
                (
                    <app-widget-cdTime1 ev-countdownend="refershCount" style="display:inline-block;">
                        { "cd_time":{{it1.end_time}},"now_time":{{Util.serverTime()}},"cd_type":"x:x:x","full":"0"}
                    </app-widget-cdTime1>
                后恢复一次)
                {{end}}
            </span>
		</div>
		<app_a-widget-btn-rect w-class="8" w-sid="8" style="left: 345px;top: 0px;" on-tap="openTips">
			{"class":"default","fontsize":24,"color":"#fdedd7;","text":"提醒设置","width":116,"height":45,"marginLeft":0} 
		</app_a-widget-btn-rect>
    </div>
    <div on-tap="seeDamage" class="shadow7" style="position: absolute; top: 5px;right: 14px;font-size: 18px; color: #ffd8a6;font-family: mnjsh;">
        <widget  w-tag="app_a-widget-pic_text-pic_text">
            {"icon":"little_tips_bg","text":"挑战人数伤害加成","width":182,"height":24,"top":2} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
            {"icon":"remind"} 
        </widget>
    </div>
    <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 492px;height: 630px;left: 50%;top: 65px;color: #fff;margin-left: -247px;">
        {{for i,v of it1.initData.boss_info}}
            {{let boss_id = it1.initData.boss_info[i][0]}}
            <div style="width: 448px;height: 127px;position: relative;left: 0;right: 0;margin: 0 auto;margin-bottom: 20px;">
                {{if publicboss_base[v[0]].best_boss}}
                    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:448px;height: 127px;left:0px;top:0px;">
                        {"bgName":"bg_frame49"} 
                    </widget>

                    <app_a-widget-pic_other-pic_other style="position:absolute;bottom: 3px;left:0px;right:0px;margin:0 auto;">
                        {"icon":"bg_frame49_bottom"}
                    </app_a-widget-pic_other-pic_other>

                    <app_a-widget-line-line style="position:absolute;top:-4px;left:0px;right:0px;margin:0 auto;z-index:2;width:100%">{"line":"line_16"}</app_a-widget-line-line>
                    <app_a-widget-line-line style="transform:scale(-1,-1);position:absolute;bottom:-4px;left:0px;right:0px;margin:0 auto;z-index:2;width:100%">{"line":"line_16"}</app_a-widget-line-line>

                    <app_a-widget-pic_other-pic_other style="position:absolute;top: 1px;left:0px;right:0px;margin:0 auto;">
                        {"icon":"best_top"}
                    </app_a-widget-pic_other-pic_other>
                    <app_a-widget-pic_other-pic_other style="position:absolute;bottom: 1px;left:0px;right:0px;margin:0 auto;">
                        {"icon":"best_bottom"}
                    </app_a-widget-pic_other-pic_other>

                {{else}}
                <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:448px;height:127px;left:0px;top:0px;">
                    {"type":2,"height":20,"width":30}
                </widget>
                {{end}}
                <img src="../images/boss_head_{{publicboss_base[v[0]].boss_head - 1}}.png" style="position:absolute;left:3px;top:0px;z-index:1" />

                <app_a-widget-pic_text-pic_text style="top:65px;position:absolute;left:-5px;color: #ffffff;font-family:mnjsh;    z-index: 2;">
                    {"icon":"boss_leve_bg","width":39,"height":39,"align":"center","marginLeft":0,"text":{{v[1]}},"textCfg":"","space":2,"fontSize":18,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>

                <app_a-widget-pic_text-pic_text style="top:71px;position:absolute;left:13px;color: #fde7ca;font-family:mnjsh;z-index: 1;">
                    {"icon":"boss_name_bg","width":108,"height":27,"align":"center","marginLeft":0,"text":{{it1.boss_base[v[4]].name}},"textCfg":"","space":2,"fontSize":18,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>
                {{let percent = it1.initData.boss_info[i][2] / it1.boss_base[v[4]].maxHp}}
                <div style="width:97px;height:14px;position:absolute;top:101px;left:10px;z-index:1">
                    <img src="../images/boss_blood_bg.png" style="position:absolute;"/>
                    <div style="width:{{93 * percent}}px;height:10px;position:absolute;overflow:hidden;top: 2px;left: 2px;">
                        <img src="../images/boss_blood.png" style="position:absolute;"/>
                    </div>
                    <span class="shadow" style="position: absolute;width: 100%;text-align: center;font-size: 18px;top: -5px;">{{(percent*100).toFixed(1) + "%"}}</span>
                </div>

                <span style="position: absolute;left: 130px;top: 2px;color:#fde7ca;font-size:18px;z-index:2">
                    掉落: 
                    <app_a-widget-pic_other-pic_other style="position:absolute;width:21px;height:21px;position:absolute;top: 3px;left: 50px;"  on-tap='openAwardInfo("{{boss_id}}")'>
                        {"icon":"remind"}
                    </app_a-widget-pic_other-pic_other>
                </span>

                {{let _award = show_award[boss_id].show_award}}
                <div style="width: 219px;height: 95px;position: absolute;left: 125px;top: 30px;overflow: hidden;">
                    <div style="width: 98%;height: 117px;overflow-x: auto;overflow-y: hidden;position: absolute;white-space: nowrap;">
                        {{for m,n of _award}}
                            {{let prop = Pi.sample[_award[m]]}}
                            {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(it1.player.career_id)][0]}}
                            {{let icon = Pi.pictures[_icon]}}
                            {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                            <div style="position:relative;display:inline-block;margin-right:5px;width:68px;height:68px">
                                <app_a-widget-prop-base on-tap="showPropInfo({{_award[m]}})" style="position:absolute;font-size: 18px;">
                                    {"prop":{{prop}},"url":{{icon}},"width":68,"height":68,"count":"none","name":{{name}},"bg":1,"effect":{{prop.effect}} }
                                </app_a-widget-prop-base>
                            </div>
                        {{end}}
                    </div>
                </div>

                {{if it1.player.level >= v[1] && v[2] > 0 && it1.initData.fight_info[v[4]] < publicboss_base[v[0]].map_player}}
                    {{let add = it1.damageAdd(it1.initData.fight_info[v[4]])}}
                    <span style="position: absolute;right: 8px;top:{{ add && add[0][1] ? 5 : 18}}px;z-index: 1;width: 100px;text-align: center;font-size: 18px;color: #fde7ca;">
                        {{it1.initData.fight_info[v[4]] + "人挑战中"}}
                    </span>
                    {{if add && add[0][1]}}
                    <span style="position: absolute;right: 8px;top: 30px;z-index: 1;width: 100px;text-align: center;font-size: 14px;color: #fde7ca;white-space: nowrap;">
                        {{it1.attribute_config[add[0][0]]}}+{{add[0][1] < 1 ? add[0][1]*100+"%" : add[0][1]}}
                    </span>
                    {{end}}
                    <app_a-widget-btn-rect style="position: absolute;right: 10px;top: 50px;" on-tap='startFight("{{[boss_id,it1.initData.boss_info[i][4],v[4]]}}")'>
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"挑  战","width":95,"height":41,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                {{elseif it1.initData.fight_info[v[4]] >= publicboss_base[v[0]].map_player}}
                    {{let add = it1.damageAdd(publicboss_base[v[0]].map_player)}}

                    <span style="position: absolute;right: 8px;top:{{ add && add[0][1] ? 5 : 18}}px;z-index: 1;width: 100px;text-align: center;font-size: 18px;color: #fde7ca;">
                        {{publicboss_base[v[0]].map_player + "人挑战中"}}
                    </span>
                    {{if add && add[0][1]}}
                    <span style="position: absolute;right: 8px;top: 30px;z-index: 1;width: 100px;text-align: center;font-size: 14px;color: #fde7ca;white-space: nowrap;">
                        {{it1.attribute_config[add[0][0]]}}+{{add[0][1] < 1 ? add[0][1]*100+"%" : add[0][1]}}
                    </span>
                    {{end}}
                    <app_a-widget-btn-rect style="position: absolute;right: 10px;top: 50px;" on-tap="lineUp({{v[4]}})">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"挑  战","width":95,"height":41,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                {{elseif it1.player.level < v[1]}}
                    <app_a-widget-text-text style="position:absolute;top: 55px;left: 360px;">
                        {"text":{{v[1]+"级开放"}},"textCfg":"heroEquipGray","fontSize":20}
                    </app_a-widget-text-text>
                {{elseif v[2] <= 0}}
                    <a style="position: absolute;right: 25px;top: 10px;color: rgb(81, 230, 80);font-size: 18px;z-index: 1;border-bottom: 2px solid rgb(81, 230, 80);" on-tap='killInfo({{v[4]}})'>击杀记录</a>
                    {{let time = publicboss_base[v[0]].revive_time * 60 + v[3]}}
                    {{if time *1000 >= (it1.dead_time[v[0]] = Util.serverTime())}}
                        <span style="width: 90px;height: auto;position: absolute;right: 16px;top: 55px;word-break: break-all;text-align: center;color: rgb(81, 230, 80);font-size: 18px;">
                            <app-widget-cdTime1 ev-countdownend="refershBoss({{v[0]}})">
                                { "cd_time":{{time * 1000}},"now_time":{{it1.dead_time[v[0]]}},"cd_type":"x:x:x","full":"0"}
                            </app-widget-cdTime1>
                            后重生 
                        </span>
                    {{end}}
                {{end}}
            </div>
        {{end}}
    </div>
</div>