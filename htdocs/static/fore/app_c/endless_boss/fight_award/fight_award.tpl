<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6)" w-sid="2">
    {{let Util = _get("app/mod/util").exports.Util}}   
    {{let len = it1.fight_award.length}}
    <div style="position: absolute;width: 520px;height: 590px;left: 50%;top: 50%;margin-left: -260px;margin-top: -{{len ? 400 :300}}px;">

        <img src='app_b/fight/images/win_end.png' style="position:absolute;left: 20px;right: 0px;margin: 0 auto;"/>

        <div class="shadow13" style="width:520px;height:{{len ? 378 : 125}}px;position:absolute;top:200px;color: #f3d6af;font-family: mnjsh;">
            <img src="app_b/fight/images/win_top.png" style="position:absolute;top:0px;"/>
            <img src="app_b/fight/images/win_bottom.png" style="position:absolute;bottom:0px;"/>

            <div style="position: absolute;left: 50%;margin-left: -104px;top: 28px;width: 300px;text-align: left;font-size: 24px;line-height: 32px;">
                <div>造成伤害: <span style="color:#ff4800">{{it1.Common.numberCarry(it1.curr_damage_info[0], 1000000)}}</span></div>
                <div>获得积分: <span style="color:#51e650">{{it1.Common.numberCarry(it1.curr_damage_info[1], 1000000)}}</span></div>
            </div>
            {{if it1.fight_award.length}}
            <app_a-widget-line-line style="position:absolute;top:108px;left:0px;right:0px;margin:0 auto;">{"line":"line_3"}</app_a-widget-line-line>
            <widget style="position:absolute;top:127px;left:50%;transform:translateX(-50%)" w-tag="app_a-widget-title-single" >
                    {"padding":10,"type":10,"text":"收益统计","textCfg":"singleTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
                </widget>
            {{let obj = {"dead_award":"终结一击","luck_award":"幸运一击"} }}
            <div style="position:absolute;top:195px;left:132px;font-size:22px;line-height: 67px;">
                {{for i,v of it1.fight_award}}
                <div>
                    {{obj[v[0]]}}奖励：
                    {{for o,p of v[1]}}
                    {{let prop = it1.Pi.sample[100002]}}
                    {{let url = it1.Pi.pictures[prop.icon]}}
                    <div on-tap="showPropInfo(100002)"  style="position:relative;display:inline-block;margin-right:20px;">
                        <widget  w-tag="app_a-widget-prop-base" style="position:relative;display: inline-block;vertical-align: middle;">
                            {"prop":{{prop}},"url":{{url}},"color":"#ffeee2","count":"none","width":52,"height":52,"name":"none"}
                        </widget>
                        <span style="font-family: '黑体'">x{{p[1]}}</span>
                    </div>
                    {{end}}
                </div>
                {{end}}
            </div>
            {{end}}

            <div on-tap="closeFightAward" style="line-height: 50px;position: absolute;text-align: center;width: 100%;height: 100px;font-size: 20px;color:#a88971;font-family:mnjsh;bottom: -180px;">
                <u>点击这里退出</u>  
                {{let now = Util.serverTime()}}
                <div style="text-decoration: underline;">
                    <app-widget-cdTime1 ev-countdownend="closeFightAward" style="position: relative;display: inline-block;margin-left: 2px;">
                        { "cd_time":{{now + 15*1000+50}},"now_time":{{now}},"cd_type":"x","full":"0"}
                    </app-widget-cdTime1>
                    <span style="display: inline-block;">秒后退出</span>
                </div>
            </div>
            
        </div>

    </div>
</div>