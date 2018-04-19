<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
        {{let Pi = _get("app/mod/pi").exports.Pi}}
        {{let Common = _get("app/mod/common").exports.Common}}
        {{let player = _get("app/mod/db").exports.data}}
        {{let career_id = player.player.career_id}}
        {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
        {{let cfg = _get("app/mod/pi").exports.cfg}}
        {{let publicboss_base = cfg.publicboss_base.publicboss_base}}
        {{let Util = _get("app/mod/util").exports.Util}}        
        {{let lineFlag = player.publicboss.lineFlag}}
        {{let nextLineFlag = player.publicboss.nextLineFlag}}
        <div w-class="3" w-sid="3" style="height:350px;margin-top:-200px">
            <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4" style="height:355px">{"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">{"icon":"pendant"} 
            </widget>
            <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8">
                {"guide":"returnTo","icon":"close"} 
            </widget>
    
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top: 30px;width: 100%;height: 110px;">
                {"bgName":"bg_frame23"}
            </widget>
            {{let boss_id = 0}}
            {{let _index = 0}}
            {{let __index = 0}}
            {{for i,v of it1.initData.boss_info}}
                {{if v[4] == it1.kill_info_index}}
                    {{: boss_id = v[0]}}
                    {{: _index = v[4]}}
                {{end}}
                {{if nextLineFlag == v[0]}}
                    {{: __index = v[4]}}
                {{end}}
            {{end}}
            {{let flag = nextLineFlag && lineFlag && nextLineFlag != lineFlag}}

            {{let line_up = JSON.parse(JSON.stringify(it1.initData.line_up_info[it1.kill_info_index]))}}
            {{let time = (publicboss_base[boss_id].challenge_time - 0) / 5 + (line_up.length+1) / 2 + 10}}
            <span style="width:300px;height:55px;position:absolute;left:0;right:0px;margin: 0 auto;text-align:center;color:#ffd8a6;font-family:mnjsh;font-size:20px;top: 60px;">
                {{if nextLineFlag && lineFlag && nextLineFlag != lineFlag}}
                    <span style="width:100%;position:relative;display: inline-block;margin-bottom: 5px;">检测到您已经处于<span style="color:red">{{" " + it1.boss_base[_index].name + " "}}</span>的挑战排队中,</span>
                    <span style="width:100%;position:relative;display: inline-block;">是否放弃排队来挑战<span style="color:red">{{" " +it1.boss_base[__index].name + " "}}</span>？</span>
                {{elseif !it1.un_line_flag}}
                    <span style="width:100%;position:relative;display: inline-block;margin-bottom: 5px;">挑战人数已满</span>
                    <span style="width:100%;position:relative;display: inline-block;">是否通过排队通道进入?</span>
                {{else}}
                    <span style="width:100%;position:relative;line-height:55px">是否取消挑战<span style="color:red">{{it1.boss_base[_index].name}}</span></span>
                {{end}}
            </span>
            
            {{if nextLineFlag && lineFlag && nextLineFlag != lineFlag}}
                {{let _line_up = JSON.parse(JSON.stringify(it1.initData.line_up_info[__index])) }}
                {{let _time = (publicboss_base[nextLineFlag].challenge_time - 0) / 5 + (_line_up.length+1) / 2 + 10}}
                <span style="position: absolute;width: 100%;height: 20px;color: #ffd8a6;text-align: center;top: 175px;font-size: 18px;">【目标BOSS】排队信息</span>
                <span style="position: absolute;width: 100%;height: 20px;color: #ffd8a6;text-align: center;top: 200px;font-size: 18px;">排队人数:<span style="color:#78f300"> {{" " + (_line_up.length <= 1 ? 1 : _line_up.length + 1)}}</span></span>
                <span style="position: absolute;width: 100%;height: 20px;color: #ffd8a6;text-align: center;top: 225px;font-size: 18px;">预计等待时间:<span style="color:#78f300"> {{" " + parseInt(_time)+"秒"}}</span></span>
            {{else}}
                <span style="position: absolute;width: 100%;height: 20px;color: #ffd8a6;text-align: center;top: 175px;font-size: 18px;">排队人数:<span style="color:#78f300"> {{" " +(line_up.length <= 1 ? 1 : line_up.length + 1)}}</span></span>
                <span style="position: absolute;width: 100%;height: 20px;color: #ffd8a6;text-align: center;top: 200px;font-size: 18px;">预计等待时间:<span style="color:#78f300"> {{" "+parseInt(time)+"秒"}}</span></span>
            {{end}}

            {{if nextLineFlag && lineFlag && nextLineFlag != lineFlag}}
                <app_a-widget-btn-rect style="position:absolute;left:100px;bottom:50px;" on-tap="line([{{nextLineFlag}},{{__index}}])">
                    {"class":"default","fontsize":21,"color":"#fdedd7;","text":"放弃排队","width":98,"height":40,"marginLeft":0} 
                </app_a-widget-btn-rect>
            {{else}}
                <app_a-widget-btn-rect style="position:absolute;left:100px;bottom:50px;" on-tap="{{if !it1.un_line_flag}}unlineUp{{else}}goOnUnlineUp{{end}}">
                    {"class":"default","fontsize":21,"color":"#fdedd7;","text":"放  弃","width":98,"height":40,"marginLeft":0} 
                </app_a-widget-btn-rect>
            {{end}}
            

            {{if time*1000 + Util.serverTime() >= Util.serverTime() && it1.line_flag}}
            <app-widget-cdtime ev-countdownend="exitFight" style="position: absolute;top:35px;font-size: 16px;width: 100%;left: 0px;text-align:center;color:#78f300;">{cd_time:{{time*1000 + Util.serverTime()}},"now_time":{{Util.serverTime()}} }</app-widget-cdtime>
            {{end}}
    
            {{if !lineFlag}}
            <app_a-widget-btn-rect style="position:absolute;right:100px;bottom:50px;" on-tap="line([{{boss_id}},{{_index}}])">
                {"class":"hl","fontsize":21,"color":"#fdedd7;","text":"排  队","width":98,"height":40,"marginLeft":0} 
            </app_a-widget-btn-rect>
            {{else}}
                {{if nextLineFlag && lineFlag && nextLineFlag != lineFlag}}
                    <app_a-widget-btn-rect style="position:absolute;right:100px;bottom:50px;" on-tap="goOnLineUp">
                        {"class":"hl","fontsize":21,"color":"#fdedd7;","text":"继续排队","width":98,"height":40,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                {{elseif !it1.un_line_flag}}
                    <app_a-widget-btn-rect style="position:absolute;right:100px;bottom:50px;">
                        {"class":"hl","fontsize":21,"color":"#fdedd7;","text":"排队中.","width":98,"height":40,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                {{else}}
                    <app_a-widget-btn-rect style="position:absolute;right:100px;bottom:50px;" on-tap="goOnLineUp">
                        {"class":"hl","fontsize":21,"color":"#fdedd7;","text":"继  续","width":98,"height":40,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                {{end}}
            {{end}}
            
        </div>
    </div>