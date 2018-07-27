{{let wild = it1.wild}}
{{let cur = wild.wild_task_num }}
{{let Common = _get("app/mod/common").exports.Common}}
{{let root = _get("pi/ui/root").exports}}
{{let curMission = it1.wild_mission[wild.wild_history]}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let player = appCfg.player}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let chatShow = appCfg.chat.show}}
{{let scenename = _get("app/scene/scene").exports.mgr_data.name}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let Util = _get("app/mod/util").exports.Util}}        


<div style="visibility:{{it1.visible ? 'hidden' : 'visible'}};position:absolute;width:100%;height:100%;left:0;top:0;">
        {{let un_defence = player.allAttr ? player.allAttr.un_defence : 0}}
        {{let a =  (it1.wild_mission[wild.wild_boss_order].A/(it1.attackCount + 0.25*un_defence )) }}
        
        {{let exp_info = Math.ceil(5500/a*it1.wild_mission[wild.wild_boss_order].B + player.power/100 + it1.treasury_act[wild.wild_max_mission].exp*2)}}
        
        {{if wild.wild_task_num > wild.wild_boss[wild.wild_boss_order].task_num}}
        {{: cur = wild.wild_boss[wild.wild_boss_order].task_num}}
        {{end}}
    <app-scene-base-scene style="visibility:visible">{"name":"wild","newscene":{{it1.wild_map[curMission.map_id].res}}}</app-scene-base-scene>   
    <div on-tap="gotoBug(0)" class="resource_bar" style="top:5px;left:174px;z-index:1">
        <widget w-tag="app_a-widget-coin-coin" style="height: 20px;position: absolute;left: 5px;color: #e3d8bb;">
            {"icon":"money", "text":[{{Common.numberCarry(player.money,10000)}}]} 
        </widget>
        <span  class="add_btn" style="right:-12px;"></span>
        <div class="resource_light" style="bottom: -7px;left: 13px;"></div>
    </div>

    <div on-tap="gotoBug(1)" class="resource_bar" style="top:5px;left:318px;z-index:1">
        <widget w-tag="app_a-widget-coin-coin" style="height: 20px;position: absolute;left: 5px;color: #e3d8bb;">
            {"icon":"diamond", "text":[{{Common.numberCarry(player.diamond,10000)}}]} 
        </widget>        
        <span class="add_btn" style="right:-12px;"></span>
        <div class="resource_light" style="bottom: -7px;left: 13px;"></div>
    </div>
    {{if wild&&wild.task}}
    <div>
        {{if it1.flagHitBoss && wild.wild_history == wild.wild_max_mission}}
            {{if it1.openFlagHitBoss.icon}}
            <div class="chanllengeBossAnim" style="position: absolute;left: 50%;margin-left: -53px;bottom: 160px;z-index:1;display: block;animation:chanllengeBossAnim_1 0.3s forwards;display:{{ chatShow ? 'block' : 'none'}}" on-tap="fightBoss">
                <app_a-widget-guide-guide>
                    {{"boss_01"}}
                </app_a-widget-guide-guide>
            </div>
            {{end}}
            {{if it1.openFlagHitBoss.inhert && it1.openFlagHitBoss.icon}}
            <div class="chanllengeBossAnim" style="position: absolute;left: 50%;margin-left: -53px;bottom: 160px;z-index:1;display: block;pointer-events: none;display:{{ chatShow ? 'block' : 'none'}}"></div>                
            {{end}}
        {{end}}
        <div on-tap="selectMap" w-class="wild_map_info"  style="right: 50%;z-index: 1; top: 45px;padding-left: 12px;color:white;font-size:8px;margin-right:-{{root.getWidth() / 2 - 3}}px">
            <app_a-widget-pic_text-pic_text style="top:0px;position:absolute;left:-1px;">
                {"icon":"fight_time_bg","width":167,"height":65,"text":" "} 
            </app_a-widget-pic_text-pic_text>
            <div class="shadow" style="position: absolute;width: 100%;top: 13px;text-align: left;">
                <app-widget-text-text style="position: relative;display:inline-block;left:2px;margin-right: 2px;">{"text":"{{curMission.guard_name.split(",")[1]}}","textCfg":"wildMission","fontSize":19,"space":0}</app-widget-text-text>
                <app-widget-text-text style="position: relative;display:inline-block;">{"text":"{{curMission.guard_name.split(",")[0]}}","textCfg":"wildMission","fontSize":19}</app-widget-text-text>
            </div>
            <div class="shadow" style="position: absolute;width: 100%;text-align: left;top: 32px;font-size:18px;color:#57ff3b;font-family: mnjsh;">
                <span style="font-size: 19px;position: relative;display: inline-block;margin-right: 3px;">经验 </span>
                {{let exp_info_min = Math.ceil(exp_info /60) || 1000}}
                <span style="position: relative;display: inline-block;font-size: 16px;">{{Common.numberCarry(exp_info_min,10000)+"/"}}</span>
                <span style="font-size: 19px;position: relative;display: inline-block;">分钟</span>
            </div>
        </div>
        <div data-desc="月卡" class="shadow" on-tap="gotoCard" style="position: absolute;width: 155px;right:50%;text-align: left;top: 111px;font-size:18px;color:#fff;font-family: mnjsh;margin-right:-{{root.getWidth() / 2 - 3}}px">
            {{let now = Util.serverTime(true)}}
            {{let week = player.annual_card_due_time > now ? it1.vipcard[1].exp_add : 0}}
            {{let month = player.month_card_due_time > now ? it1.vipcard[0].exp_add : 0}}
            <app_b-wild-card-card>{"type":"","add":{{month}}}</app_b-wild-card-card>
            <app_b-wild-card-card style="margin-top:5px;">{"type":"_1","add":{{week}}}</app_b-wild-card-card>
        </div>

        {{let prop_id = it1.bossMisson ? it1.wild_boss[curMission.skip_boss].show_award :  wild.task.guide ? curMission.guide_drop_id : curMission.drop_id[wild.task.award_index]}}
        {{let propName = Pi.sample[prop_id] }}
        <div {{if it1.task_anima.border_opacity}}class="taskInOut"{{else}}{{end}} style="width:207px;height:127px;background:rgba(0,0,0,0.6);border-radius: 5px;right: 50%;margin-right: -{{root.getWidth() / 2 - 10}}px;bottom: 140px;padding-top: 5px;position: absolute;display:{{ chatShow ? 'block' : 'none'}};">
           
            {{let wild_task_num = wild.wild_task_num + (wild.task.killNum >= wild.task.needKillNum ? 1:0)}}
            {{if wild_task_num > wild.wild_boss[wild.wild_boss_order].task_num}}
            {{: wild_task_num = wild.wild_boss[wild.wild_boss_order].task_num}}
            {{end}}

            {{let complete = wild_task_num + wild.guide_num}}
            {{let total = wild.wild_boss[wild.wild_boss_order].task_num + wild.wild_boss[wild.wild_boss_order].guide_num}}
            {{let bol = wild.task.killNum >= wild.task.needKillNum}}
            <div style="position:absolute;top: 13px;left: 7px;overflow:hidden;height:26px;width:191px;">
                <div class="shadow" w-class="mission_title" style="position:absolute;top: 0;left: 0;">
                    修行任务<span style="color:{{bol ? '#51e650' :'#fad731'}}"> ({{ (it1.bossMisson ? it1.bossNum : bol) ? "已完成" : "进行中" }})</span>  
                    {{if !it1.bossMisson}}
                    <img src="app_b/wild/image/task_{{wild.task.taskQuality}}.png" style="position:absolute;left: 17px;top: 1px;height: 24px;"/>
                    {{end}}
                </div>

            </div>
           
            

            <div style="height:64px;position: absolute;top:40px;left:0;overflow:hidden;width:100%;">
                <div style="width:200px;height:26px;color:#fde7ca;font-size:18px;position: absolute;top: 0px;left: 0;font-family:mnjsh;">
                    <img src="./image/exp_award_img.png" style="transform: scale(0.9);position:absolute;left: 2px;top: 0;"/>
                    {{if !it1.bossMisson}}
                    <div class="shadow" style="position: absolute;top: 5px;left: 60px;">
                        {{if wild.task.guide}}
                        {{it1.guide_cfg[wild.task.guide[0]].guide_text}}
                        {{else}}
                        {{Common.fromCharCode(wild.task.bossName)+(wild.task.killNum >= wild.task.needKillNum ? wild.task.needKillNum : wild.task.killNum)+"/"+wild.task.needKillNum}}
                        {{end}}
                    </div>
                    {{else}}
                    <div class="shadow" style="position: absolute;top: 5px;left: 65px;">击杀首领:
                        <span style="color:#fff;margin-left: 3px;">{{it1.bossNum+"/"+1}}</span>
                    </div>
                    {{end}}
                </div>
                <div class="shadow" style="color:#ffc13b;font-size:12px;width:200px;height:41px;position: absolute;top: 25px;left: 0;z-index:0">
                    <img src="./image/prop_award_img.png" alt="" style="transform: scale(0.9);position:absolute;left: 6px;top: 5px;"/>
                    <app-widget-prop-base_prop-base_prop on-tap="propInfoShow(100003)" style="width:37px;height:37px;position:absolute;top: 2px;left: 60px;">
                        {{let _prop = Pi.sample[100003]}}
                        {"prop":{{_prop}},"url":{{Pi.pictures[_prop.icon]}}}
                    </app-widget-prop-base_prop-base_prop>
                    {{let icon = propName.module ? propName.module[propName.career_id.indexOf(player.career_id)][0] : propName.icon}}                
                    <app-widget-prop-base_prop-base_prop on-tap="propInfoShow({{prop_id}})" style="width:37px;height:37px;position:absolute;top: 2px;left: 100px;">
                        {"prop":{{propName}},"url":{{Pi.pictures[icon]}}}
                    </app-widget-prop-base_prop-base_prop>
                </div>
            </div>

            <div style="position: absolute;left: -18px;top: -25px;z-index: 1;width: 232px;height: 183px;pointer-events: none;overflow:hidden">
                <div {{if it1.bossMisson && it1.bossNum || bol}}class="wild_task_complete"{{else}}{{end}} style="position: absolute;width: 1856px;height:183px;"></div>
            </div>
            {{if wild.wild_history == wild.wild_max_mission}}
                {{let percent = complete / total * 100}}
                {{let add = wild.task.killNum >= wild.task.needKillNum ? 1:0}}
                <widget class="shadow" w-tag="app_a-widget-bar-bar4" style="width:148px;height:16px;position:absolute;bottom: 8px;left:8px;font-family:mnjsh;">
                    {"progress":{{percent}},"text":{{complete>=total ?"首领出现" : "任务进度"+complete+"/"+total}},"color":"#fde7ca","lineHeight":16,"fontSize":16,"width":148,"height":16} 
                </widget>
                {{if complete>=total}}
                <img style="position:absolute;left:150px;top:101px;" src="./image/boss_hot.png" />
                {{else}}
                <app_a-widget-text-text style="position:absolute;left:156px;top:105px;">
                    {"text":"BOSS","textCfg":"menu_main","space":-4,"fontSize":16}
                </app_a-widget-text-text>
                {{end}}
            {{end}}
        </div>
    </div>
    {{end}}

    {{if !it1.fightBossFlag}}

    <app_b-menu-menu_top-menu_top style="width: 240px;height: 100px;top: 115px;position: absolute;left: 50%;margin-left:-{{root.getWidth() / 2}}px;display:{{it1.show_top_menu}}"></app_b-menu-menu_top-menu_top>
    
    <div w-class="arrow_btn_roundBig" style="left: 50%;top: 120px;z-index:1;margin-left:-{{root.getWidth() / 2}}px;transform:{{it1.arrow_btn_scale}}" on-tap="changeMenuMove">
        <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    </div>
    {{end}}

    {{if scenename == "wild"}}
    <app_b-chat-chat></app_b-chat-chat>
    {{end}}
    <app_b-open_fun-open_fun></app_b-open_fun-open_fun>

    <app_b-player-top style="width:{{root.getWidth()}}px;top:0px"></app_b-player-top>
    <app_b-wild_pk-wild_pk style="position: absolute;bottom: 340px;left: 0px;"></app_b-wild_pk-wild_pk>

    <app_b-menu-parent style="bottom:5px;width:{{root.getWidth()}}px;z-index:2"></app_b-menu-parent>
    <app_b-random_boss-random_boss></app_b-random_boss-random_boss>
    <app_c-gang-hall_gang_build-collect-collect></app_c-gang-hall_gang_build-collect-collect>
    <app_b-player-exp style="left:0;bottom:0;width:{{root.getWidth()}}px;"></app_b-player-exp>

    <app_b-magic-skill style="position:absolute;right:0;bottom:280px;display:{{ chatShow ? 'block' : 'none'}}"></app_b-magic-skill>


    <app_b-playermission-playermission style="display:{{ chatShow ? 'block' : 'none'}}"></app_b-playermission-playermission>
    

    <app_b-online_gift-online_gift style="left: 15px;bottom: 230px;display:{{ chatShow ? 'block' : 'none'}}"></app_b-online_gift-online_gift>

    <app_b-limit_gift-limit_gift style="left: 120px;bottom: 230px;display:{{ chatShow ? 'block' : 'none'}}"></app_b-limit_gift-limit_gift>

    {{if it1.publicboss_obj && it1.publicboss_obj.type == "revive"}}
    <div style="width: 244px;height: 120px;position: absolute;left: 50%;bottom: 265px;margin-left: -125px;">
        <img src="./image/boss_tip_bg.png" style="position: absolute;left: 10px;"/>

        <img src="./image/boss_tip_icon.png" style="position: absolute;left: -8px;top: -20px;width: 103px;height: 120px;"/>
        
        <app_a-widget-btn-rect style="position:absolute;left: 100px;bottom: 30px;" on-tap='gotoPublicboss("{{[it1.publicboss_obj.boss_id,it1.publicboss_obj.index,it1.publicboss_obj.index]}}")'>
            {"class":"hl","fontsize":18,"color":"#fdedd7;","text":"前往挑战","width":83,"height":31,"marginLeft":0}
        </app_a-widget-btn-rect>

        <app_a-widget-text-text style="position:absolute;left: 100px;top: 3px;">
            {"text":{{it1.publicboss_obj.name}},"textCfg":"dist_award","space":-4,"fontSize":24}
        </app_a-widget-text-text>

        <app_a-widget-btn_pic-btn_pic on-tap="closeBossReviveTip" style="position: absolute;right: -5px;top: -18px;">
            {"icon":"close","width":40}
        </app_a-widget-btn_pic-btn_pic>

        <span style="color: rgb(81, 230, 80);position: absolute;font-size: 18px;font-family: mnjsh;left: 110px;top: 36px;">已复活</span>
    </div>
    {{elseif it1.publicboss_obj && it1.publicboss_obj.type == "line_up"}}
        <div style="width: 227px;height: 107px;position: absolute;left: 50%;bottom: 250px;margin-left: -125px;">
            <app_a-widget-text-text style="position: absolute;left: 100px;top: 2px">
                {"text":{{it1.publicboss_obj.name}},"textCfg":"dist_award","space":-4,"fontSize":24}
            </app_a-widget-text-text>

            <div on-tap="closeBossReviveTip" style="position: absolute;right: -7px;top: -20px;width: 35px;height: 35px;"></div>

            <span style="color: #ffd8a6;position: absolute;font-size: 18px;font-family: mnjsh;left: 105px;top: 30px;">已等待:</span>
            <span style="color: #40ea40;position: absolute;font-size: 18px;font-family: mnjsh;left: 105px;top: 49px;">预计:{{it1.publicboss_obj.line_up_time + "s"}}</span>
        </div> 
    {{end}}

    

</div>