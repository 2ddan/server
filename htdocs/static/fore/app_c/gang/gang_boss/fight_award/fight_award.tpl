<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6)" w-sid="2">
    {{let Util = _get("app/mod/util").exports.Util}}    
    {{let player = _get("app/mod/db").exports.data}}
    <div w-sid="3" style="position: absolute;width: 520px;height: 590px;left: 50%;top: 50%;margin-left: -260px;margin-top: -400px;">

        <img src='app_b/fight/images/win_end.png' style="position:absolute;left: 20px;right: 0px;margin: 0 auto;"/>

        <div style="width:520px;height:378px;position:absolute;top:200px;">
            <img src="app_b/fight/images/win_top.png" style="position:absolute;top:0px;"/>
            <img src="app_b/fight/images/win_bottom.png" style="position:absolute;bottom:0px;"/>

                <div style="position: absolute;left: 50%;margin-left: -150px;top: 35px;font-size: 23px;color: #fde7ca;font-family: mnjsh;width: 300px;text-align: center;">我的伤害: {{it1.Common.numberCarry(it1.my_damage, 10000)}}</div>
                <app_a-widget-line-line style="position:absolute;top:80px;left:0px;right:0px;margin:0 auto;">{"line":"line_3"}</app_a-widget-line-line>

                <div style="width: 80%;height: 220px;position: absolute;left: 55px;top: 120px;overflow: hidden;color: #fff;text-align: center;">
                    {{let award = it1.guild_base.fight_award}}
                    {{let p = it1.Pi.sample[award[0]]}}
                    {{let url = it1.Pi.pictures[p.icon]}}
                    <div style="position:relative;width:60px;height:60px;margin:0px 10px;display:inline-block;color:#ffffff;">
                        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                            {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{award[1]}},"name":{{p.name}},"top":22,"right":6} 
                        </widget>
                    </div>
                </div>

                <app_a-widget-btn-rect style="position:absolute;left: 50%;margin-left: -58px;bottom: -65px;" on-tap="closeFightAward">
                    {"class":"default","fontsize":24,"color":"#fdedd7;","text":"退 出","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>

                {{let time = 15 * 1000 + Util.serverTime()}}
                <span style="position: absolute;left: 0px;right: 0px;margin: 0px auto;bottom: -135px;color: rgb(253, 231, 202);font-size: 20px;z-index: 1;border-bottom: 2px solid rgb(253, 231, 202);width: 105px;font-family: mnjsh;">
                    <app-widget-cdTime1 ev-countdownend="closeFightAward" style="position: relative;display: inline-block;margin-left: 2px;">
                        { "cd_time":{{time}},"now_time":{{Util.serverTime()}},"cd_type":"x","full":"0"}
                    </app-widget-cdTime1>
                    <span style="display: inline-block;">秒后退出</span>
                </span>
        </div>

    </div>
</div>