<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6)" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Cfg = _get("app/mod/pi").exports.cfg}}
    {{let Util = _get("app/mod/util").exports.Util}}    
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let time = Util.serverTime()}}
    {{let publicboss_config = Cfg.publicboss_config.publicboss_config}}
    <div w-sid="3" style="position: absolute;width: 520px;height: 590px;left: 50%;top: 50%;margin-left: -260px;margin-top: -400px;">
        {{let _height = 378}}
        {{let boss_id = 0}}
        {{for q,p of it1.initData.boss_info}}
            {{if p[4] == it1.kill_info_index}}
            {{: boss_id = p[0]}}
            {{end}}
            {{if p[4] == it1.kill_info_index && p[2] <= 0}}
            {{: _height = 455}}
            {{end}}
        {{end}}
        {{let publicboss_award = Cfg.publicboss_award.publicboss_award}}
        {{let ___award = publicboss_award[boss_id].distribute_showaward}}
        <img src='app_b/fight/images/win_{{_height == 455 ? "text" : "end"}}.png' style="position:absolute;left: 20px;right: 0px;margin: 0 auto;"/>

        <div style="width:520px;height:{{_height}}px;position:absolute;top:{{_height == 455 ? 180 : 200}}px;">
            <img src="app_b/fight/images/win_top.png" style="position:absolute;top:0px;"/>
            <img src="app_b/fight/images/win_bottom.png" style="position:absolute;bottom:0px;"/>
            
            {{if _height == 455}}
                <div style="width:100%;height:320px;position:absolute;top:0px">
                    <app_a-widget-line-line style="position:absolute;top:65px;left:0px;right:0px;margin:0 auto;">{"line":"line_16"}</app_a-widget-line-line>

                    <app_a-widget-line-line style="transform:scale(-1,-1);position:absolute;bottom:15px;left:0px;right:0px;margin:0 auto;">{"line":"line_16"}</app_a-widget-line-line>

                    <app_a-widget-title-single style="position:absolute;left: 200px;top: 80px;">
                        {"padding":5,"type":15,"text":"可分配奖励","textCfg":"dist_award","fontSize":24,"space":-2,"wear":0}
                    </app_a-widget-title-single>

                    <span class="shadow13" style="font-size:20px;color:#fde7ca;width:100%;position:absolute;text-align:left;top: 30px;font-family: mnjsh;padding-left: 65px;">归属者:{{it1.rank_bang[it1.kill_info_index][0].name}}</span>

                    <div style="width: 87%; height: 105px; position: absolute; left: 35px; top: 120px; overflow: hidden;">
                        <div style="width: 100%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; height: 105px;text-align:center;color:#fff">
                            {{for i,v of ___award}}
                                {{let prop = Pi.sample[v]}}
                                {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(it1.player.career_id)][0]}}
                                {{let icon = Pi.pictures[_icon]}}
                                {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                                <app_a-widget-prop-base on-tap="showPropInfo({{v}})" style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                    {"prop":{{prop}},"url":{{icon}},"width":84,"height":84,"count":"none","name":{{name}},"bg":1,"effect":{{prop.effect}} }
                                </app_a-widget-prop-base>
                            {{end}}
                        </div>
                    </div>

                    {{if it1.rank_bang[it1.kill_info_index][0].role_id == it1.player.role_id }}
                    <app_a-widget-btn-rect on-tap="gotoAward" style="position:absolute;left:0px;right:0px;margin:0 auto;bottom:40px;">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"前往分配","width":116,"height":45,"marginLeft":0} 
                    </app_a-widget-btn-rect> 
                    {{else}}
                    <app_a-widget-btn-rect on-tap="gotoAward" style="position:absolute;left:0px;right:0px;margin:0 auto;bottom:40px;">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"前往索要","width":116,"height":45,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                    {{end}}
                </div>

                <div style="width:100%;height:205px;position:absolute;bottom:-65px">
                    <span style="position: absolute;width: 100%;height: 30px;text-align: left;top: 140px;padding-left: 60px;">
                        <span class="shadow13" style="position:relative;font-size: 23px;color: #fde7ca;font-family: mnjsh;display: inline-block;">{{"我的排名:" + it1.fight_award.own_rank}}</span>

                        <a on-tap="lookRank" style="position: relative;color: rgb(81, 230, 80);font-size: 18px;z-index: 1;border-bottom: 2px solid rgb(81, 230, 80);display: inline-block;margin-left: 10px;" >查看详细</a>
                    </span>

                    <span style="width:100%;height:30px;position:absolute;text-align: left;top: 175px;padding-left: 50px;font-size: 23px;color: #fde7ca;font-family: mnjsh;">
                        【排名奖励已通过邮件发放】
                    </span>

                    <app_a-widget-title-single style="position:absolute;left: 210px;top: 0px;">
                        {"padding":5,"type":15,"text":"参与奖励","textCfg":"dist_award","fontSize":24,"space":-2,"wear":0}
                    </app_a-widget-title-single>

                    <div style="width: 87%; height: 105px; position: absolute; left: 35px; top: 35px; overflow: hidden;">
                        <div style="width: 100%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; height: 105px;text-align:center;color:#fff">
                            {{for i,v of it1.fight_award.bag}}
                                {{let _icon = v.icon ? v.icon : v.module[v.career_id.indexOf(it1.player.career_id)][0]}}
                                {{let icon = Pi.pictures[_icon]}}
                                {{let name = checkTypeof(v.name,"Array") ? v.name[v.career_id.indexOf(it1.player.career_id)] : v.name}}
                                <app_a-widget-prop-base on-tap="showPropInfo({{v.sid ? v.sid : v.id}})" style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                    {"prop":{{v}},"url":{{icon}},"width":80,"height":80,"count":{{v.count}},"name":{{name}},"bg":1,"effect":{{v.effect}} }
                                </app_a-widget-prop-base>
                            {{end}}
                            {{for k ,m in it1.fight_award.player}}
                                {{let id = ( k == "money" ? 100001 : k == "diamond" ? 100002 : k )}}
                                {{let prop = Pi.sample[id]}}
                                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                {{let url = Pi.pictures[icon]}}
                                <app_a-widget-prop-base on-tap='showPropInfo("{{id}}")' style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                    {"prop":{{prop}},"url":{{url}},"width":84,"height":84,"count":{{it1.fight_award.player[k]}},"name":"none","bg":0,"effect":{{prop.effect}} }
                                </app_a-widget-prop-base>
                            {{end}}
                        </div>
                    </div>
                </div>

                <a on-tap="closeFightAward" style="position: absolute;left: 0px;right: 0px;margin: 0px auto;bottom: -115px;color: rgb(253, 231, 202);font-size: 20px;z-index: 1;border-bottom: 2px solid rgb(253, 231, 202);width: 125px;font-family: mnjsh;" >点击这里退出</a>
            {{else}}
                <span style="position: absolute;left: 95px;top: 35px;font-size: 23px;color: #fde7ca;font-family: mnjsh;">{{"我的排名: " + (checkTypeof(it1.fight_award.own_rank,"Number") ? it1.fight_award.own_rank : "无")}}</span>

                <a on-tap="lookRank" style="position: absolute;left: 245px;top: 31px;color: rgb(81, 230, 80);font-size: 18px;z-index: 1;border-bottom: 2px solid rgb(81, 230, 80);" >查看详细</a>

                <app_a-widget-line-line style="position:absolute;top:80px;left:0px;right:0px;margin:0 auto;">{"line":"line_3"}</app_a-widget-line-line>

                <img src="../images/text_tip.png" style="position:absolute;right: 60px;top: -25px;" />

                <span style="position: absolute;right: 74px;bottom: -92px;font-size: 18px;color: #ffd8a6;width: 165px;text-align: center;">{{"剩余次数" + it1.total_count}}</span>

                <div style="width: 80%;height: 220px;position: absolute;left: 55px;top: 120px;overflow: hidden;color: #fff;">
                    <div style="width: 100%;overflow-y: auto;overflow-x: hidden;height: 100%;text-align: center;">
                        {{for i,v of it1.fight_award.bag}}
                            {{let _icon = v.icon ? v.icon : v.module[v.career_id.indexOf(it1.player.career_id)][0]}}
                            {{let icon = Pi.pictures[_icon]}}
                            {{let name = checkTypeof(v.name,"Array") ? v.name[v.career_id.indexOf(it1.player.career_id)] : v.name}}
                            <app_a-widget-prop-base on-tap="showPropInfo({{v.sid ? v.sid : v.id}})" style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;margin-bottom:20px">
                                {"prop":{{v}},"url":{{icon}},"width":84,"height":84,"count":{{v.count}},"name":{{name}},"bg":1,"effect":{{v.effect}} }
                            </app_a-widget-prop-base>
                        {{end}}
                        {{for k ,m in it1.fight_award.player}}
                            {{let id = ( k == "money" ? 100001 : k == "diamond" ? 100002 : k )}}
                            {{let prop = Pi.sample[id]}}
                            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                            {{let url = Pi.pictures[icon]}}
                            <app_a-widget-prop-base on-tap='showPropInfo("{{id}}")' style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;margin-bottom:20px">
                                {"prop":{{prop}},"url":{{url}},"width":84,"height":84,"count":{{it1.fight_award.player[k]}},"name":"none","bg":0,"effect":{{prop.effect}} }
                            </app_a-widget-prop-base>
                        {{end}}
                    </div>
                </div>

                <app_a-widget-btn-rect style="position:absolute;left: 100px;bottom: -65px;" on-tap="closeFightAward">
                    {"class":"default","fontsize":24,"color":"#fdedd7;","text":"退  出","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>
        
                {{if it1.total_count>0}}
                <app_a-widget-btn-rect style="position:absolute;right: 100px;bottom: -65px;" on-tap="againFight">
                    {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"再次挑战","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>
                {{else}}
                <app_a-widget-btn-rect style="position:absolute;right: 100px;bottom: -65px;">
                    {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"再次挑战","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>
                {{end}}

                {{let time = 10 * 1000 + Util.serverTime()}}
                {{if time >= Util.serverTime() && it1.aaaaaa}}
                    <span style="position: absolute;left: 0px;right: 0px;margin: 0px auto;bottom: -135px;color: rgb(253, 231, 202);font-size: 20px;z-index: 1;border-bottom: 2px solid rgb(253, 231, 202);width: 105px;font-family: mnjsh;">
                        <app-widget-cdTime1 ev-countdownend="closeFightAward" style="position: relative;display: inline-block;margin-left: 2px;">
                            { "cd_time":{{time}},"now_time":{{Util.serverTime()}},"cd_type":"x","full":"0"}
                        </app-widget-cdTime1>
                        <span style="display: inline-block;">秒后退出</span>
                    </span>
                {{end}}
            {{end}}
        </div>

    </div>
</div>