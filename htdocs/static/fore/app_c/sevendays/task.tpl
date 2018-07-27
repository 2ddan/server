<div style="position: absolute; top: 47px; bottom: 0px; width: 492px;left:24px; z-index: 2;">
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
    {{let common = _get("app/mod/common").exports.Common}}    
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let act_progress = _get("app_b/mod/act_progress").exports.act_progress}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let career_id = player.career_id}}
    {{let act = it1.list[it.btn.act_type][it1.currDay-1] }}
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:450px;left:0;top:0;">
        {"bgName":"bg_frame21"} 
    </widget>
    <app_a-widget-pic_other-pic_other style="position:absolute;left:-30px;top:0;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    <app_a-widget-pic_other-pic_other style="position:absolute;right:-25px;top:0;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    {{let time_close = Common_m.changeTimeToDate(act[0]["end_time"],act[0]["open_type"])}}    
    <div class="shadow6" w-class="s1">
        活动截止时间：{{time_close[0]}}年{{time_close[1]}}月{{time_close[2]}}日24:00
    </div>
    <div data-desc="领取列表" w-class="s2">
        <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y:auto;overflow-x:hidden">

            {{for k,v of act.slice(0).sort(it1.mySort)}}                
            <div style="position:relative;width:492px;height:113px;">
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:469px;height:113px;left:12px">
                    {"bgName":"bg_frame34"} 
                </widget>
                <div>
                    <div class="shadow7" w-class="s3">
                        {{v.desc}}
                    </div>
                    
                    <div w-class="s4">
                        {{for i, v of v.goods}}
                        {{let prop = Pi.sample[v[0]]}}
                        {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                        {{let url = Pi.pictures[icon]}}
                        {{let count = prop.type !== "equip" ? v[1] : "none"}}
                        <div class="shadow1" w-class="s5">
                            <app_a-widget-prop-base  on-tap='propInfoShow({{v[0]}})'>
                                {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count":{{count}},"name":"none","bg":0,"right":7,"top":22,"effect":{{prop.effect}}}
                            </app_a-widget-prop-base>
                            {{if count == "none"}}
                            <div  w-class="s9">{{"Lv"+prop.level[1] || 20}}</div>
                            {{end}}
                        </div>
                        {{end}}
                    </div>
                    {{let progress = act_progress.sevenday(v.type,v.params)}}
                    {{if v.type !== "login" && !it1.record[v.act_id]}}
                    <div w-class="s6">
                        进度:
                        <span style="color:#fff;padding-left:8px;">
                            {{common.numberCarry(parseInt(progress[1] || 0),10000)+""}}/{{v.type == "jjc_rank"? 1 :common.numberCarry(parseInt(v.params || 0),10000)}}
                        </span>
                    </div>
                    {{end}}

                    {{if it1.record[v.act_id]}}
                        <app_a-widget-pic_text-pic_text w-class="s7">
                            {"icon":"text_get_1","width":94,"height":60,"top":0,"left":0}
                        </app_a-widget-pic_text-pic_text>
                    {{elseif v.start_time > it1.roleDay}}
                        <widget w-tag="app_a-widget-btn-rect" w-class="s8">
                            {"class":"disabled","fontsize":24,"text":"未开启","width":116,"height":45} 
                        </widget>
                    {{elseif !progress[0]}}
                        <widget w-tag="app_a-widget-btn-rect" w-class="s8" on-tap ='goto("{{v.send_fun}}")'>
                        {{if v.type == "level" || v.type == "player_power"}}
                            {"class":"disabled","fontsize":24,"text":"未达成","width":116,"height":45} 
                        {{elseif v.type == "recharge_total"}}
                            {"class":"default","fontsize":24,"text":"去充值","width":116,"height":45} 
                        {{else}}
                            {"class":"default","fontsize":24,"text":"前 往","width":116,"height":45} 
                        {{end}}
                        </widget>
                    {{else}}
                        <widget w-tag="app_a-widget-btn-rect" w-class="s8" on-tap ='getAward({{JSON.stringify(v)}})'>
                            {"guide":{{v.act_id<=7 ? "seven_btn" : 0}},"class":"hl","fontsize":24,"text":"领 取","width":116,"height":45,"show_anim":1} 
                        </widget>
                    {{end}}
                </div>
            </div>
            {{end}}

        </div>
    </div>
</div>   