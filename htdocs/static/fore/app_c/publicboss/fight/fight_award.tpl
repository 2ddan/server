<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6)" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Cfg = _get("app/mod/pi").exports.cfg}}
    {{let Util = _get("app/mod/util").exports.Util}}    
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let time = Util.serverTime()}}
    <div w-sid="3" style="position: absolute;width: 520px;height: 590px;left: 50%;top: 50%;margin-left: -260px;margin-top: -360px;">
        {{let _height = 378}}
        {{let boss_id = 0}}
        {{for q,p of it1.initData.boss_info}}
            {{if p[4] == it1.kill_info_index}}
            {{: boss_id = p[0]}}
            {{end}}
            {{if p[4] == it1.kill_info_index && p[2] <=0}}
            {{: _height = 525}}
            {{end}}
        {{end}}

        {{let publicboss_award = Cfg.publicboss_award.publicboss_award}}
        {{let ___award = publicboss_award[boss_id].distribute_showaward}}
        <img src='app_b/fight/images/win_{{_height == 525 ? "text" : "end"}}.png' style="position:absolute;left: 20px;right: 0px;margin: 0 auto;"/>

        <div style="width:520px;height:{{_height}}px;position:absolute;top:{{_height == 525 ? 180 : 200}}px;">
            <img src="app_b/fight/images/win_top.png" style="position:absolute;top:0px;"/>
            <img src="app_b/fight/images/win_bottom.png" style="position:absolute;bottom:0px;"/>
            
            {{if _height == 525}}
                <div style="width:100%;height:320px;position:absolute;top:0px">
                    <app_a-widget-line-line style="position:absolute;top:65px;left:0px;right:0px;margin:0 auto;">{"line":"line_16"}</app_a-widget-line-line>

                    <app_a-widget-line-line style="transform:scale(-1,-1);position:absolute;bottom:15px;left:0px;right:0px;margin:0 auto;">{"line":"line_16"}</app_a-widget-line-line>

                    <app_a-widget-title-single style="position:absolute;left: 200px;top: 25px;">
                        {"padding":5,"type":15,"text":"可分配奖励","textCfg":"dist_award","fontSize":24,"space":-2,"wear":0}
                    </app_a-widget-title-single>

                    <span class="shadow13" style="font-size:20px;color:#fde7ca;width:100%;position:absolute;text-align:center;top: 85px;font-family: mnjsh;">归属者:玩家姓名</span>

                    <div style="width: 100%; height: 105px; position: absolute; left: 0px; top: 120px; overflow: hidden;">
                        <div style="width: 100%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; height: 105px;text-align:center;color:#fff">
                            {{for i,v of ___award}}
                                {{let prop = Pi.sample[v[0]]}}
                                {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(it1.player.career_id)][0]}}
                                {{let icon = Pi.pictures[_icon]}}
                                {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                                <app_a-widget-prop-base style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                    {"prop":{{v}},"url":{{icon}},"width":84,"height":84,"count":{{v[1]}},"name":{{name}},"bg":1}
                                </app_a-widget-prop-base>
                            {{end}}
                        </div>
                    </div>

                    <app_a-widget-btn-rect on-tap="gotoAward" style="position:absolute;left:0px;right:0px;margin:0 auto;bottom:40px;">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"前往索要","width":116,"height":45,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                </div>

                <div style="width:100%;height:205px;position:absolute;bottom:0px">
                    <span style="position: absolute;width: 100%;height: 30px;text-align: center;top: 35px;">
                        <span class="shadow13" style="position:relative;font-size: 23px;color: #fde7ca;font-family: mnjsh;display: inline-block;">{{"我的排名:" + it1.fight_award.own_rank}}</span>

                        <a on-tap="lookRank" style="position: relative;color: rgb(81, 230, 80);font-size: 18px;z-index: 1;border-bottom: 2px solid rgb(81, 230, 80);display: inline-block;margin-left: 10px;" >查看详细</a>
                    </span>

                    <app_a-widget-title-single style="position:absolute;left: 210px;top: 0px;">
                        {"padding":5,"type":15,"text":"个人奖励","textCfg":"dist_award","fontSize":24,"space":-2,"wear":0}
                    </app_a-widget-title-single>

                    <div style="width: 100%; height: 105px; position: absolute; left: 0px; top: 70px; overflow: hidden;">
                        <div style="width: 100%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; height: 105px;text-align:center;color:#fff">
                            {{for i,v of it1.fight_award.bag}}
                                {{let _icon = v.icon ? v.icon : v.module[v.career_id.indexOf(it1.player.career_id)][0]}}
                                {{let icon = Pi.pictures[_icon]}}
                                {{let name = checkTypeof(v.name,"Array") ? v.name[v.career_id.indexOf(it1.player.career_id)] : v.name}}
                                <app_a-widget-prop-base style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                    {"prop":{{v}},"url":{{icon}},"width":80,"height":80,"count":{{v.count}},"name":{{name}},"bg":1}
                                </app_a-widget-prop-base>
                            {{end}}
                        </div>
                    </div>
                </div>

                <a on-tap="closeFightAward" style="position: absolute;left: 0px;right: 0px;margin: 0px auto;bottom: -30px;color: rgb(253, 231, 202);font-size: 20px;z-index: 1;border-bottom: 2px solid rgb(253, 231, 202);width: 125px;font-family: mnjsh;" >点击这里退出</a>
            {{else}}
                <span style="position: absolute;left: 95px;top: 35px;font-size: 23px;color: #fde7ca;font-family: mnjsh;">{{"我的排名: " + it1.fight_award.own_rank}}</span>

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
                            <app_a-widget-prop-base style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;margin-bottom:20px">
                                {"prop":{{v}},"url":{{icon}},"width":84,"height":84,"count":{{v.count}},"name":{{name}},"bg":1}
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
                {{if time >= Util.serverTime()}}
                    <span style="position: absolute;left: 0px;right: 0px;margin: 0px auto;bottom: -135px;color: rgb(253, 231, 202);font-size: 20px;z-index: 1;border-bottom: 2px solid rgb(253, 231, 202);width: 105px;font-family: mnjsh;">
                        <app-widget-cdTime1 style="position: relative;display: inline-block;margin-left: 2px;">
                            { "cd_time":{{time}},"now_time":{{Util.serverTime()}},"cd_type":"x","full":"0"}
                        </app-widget-cdTime1>
                        <span style="display: inline-block;">秒后退出</span>
                    </span>
                {{end}}
            {{end}}
        </div>

    </div>
</div>