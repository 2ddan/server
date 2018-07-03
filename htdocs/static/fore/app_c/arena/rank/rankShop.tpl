<div maxId="40" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let career_id = player.career_id}}
    {{let robot_cfg = cfg.robot.robot_base}}

    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">{"text":"竞技场","coin":["money","diamond"],"top":"13","left":10}</widget>
    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">{"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame21"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-rank-rank_title" w-sid="7">{"keys":["排名","玩家信息","奖励"],"split":[30,40,30],"padding":5,"fontSize":20,"va":"","space":0} 
        </widget>
        <div w-class="9" w-sid="9">
            <div w-class="15" w-sid="15">
                {{let target = it1.arena_rank_award}}
                {{let rank = it1.base.jjc_rank}}
                {{for i,v of rank}}
                <div w-class="10" w-sid="10">
                    <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">{"bgName":"bg_frame19"} 
                    </widget>

                    {{if i-0+1 <= 3}}
                    <widget w-class="12" w-tag="app_a-widget-rank-rank_num" w-sid="12">{"num":{{i-0+1}} }</widget>
                    {{else}}
                    <div style="width: 100px;height: 20px;font-size: 35px;text-align: center;color: rgb(174, 140, 100);text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: 20px;top: 57px;line-height: 20px;font-family:mnjsh">{{i-0+1}}</div>
                    {{end}}

                    <widget w-class="13" w-tag="app_a-widget-line-line" w-sid="13">{"line":"line_9"} 
                    </widget>
                    {{let id = v.detail.role_id || null}}
                    {{let imgX= ''}}
                    {{if v.role_type == "robot"}}
                        {{: imgX = Pi.pictures[robot_cfg[v.sid].head]}}
                    {{else}} 
                        {{: imgX = Pi.pictures['playerhead'+(v.detail.head || v.career_id)]}}
                    {{end}}
                    
                    <widget on-tap="seeOther({{id}})" w-class="14" w-tag="app_a-widget-head-friend" w-sid="14">
                        {"width":107,"height":108,"url":{{imgX}},"top":23.5,"level":0} 
                    </widget>
                    <span w-class="16" w-sid="16">{{Common.fromCharCode( v.name ? v.name : v.detail.name) || "玩家现在名字为空"}}</span>
                    <span class="shadow" w-class="17" w-sid="17">门派：</span>

                    <span class="shadow" w-class="18" w-sid="18">{{v.detail.gang_name?Common.fromCharCode(v.detail.gang_name) : "无"}}</span>
                    
                    <span class="shadow" w-class="19" w-sid="19">战斗力：</span>

                    {{let _power = v.role_type == "robot" ? v.detail.fight_power : player.power }}
                    {{let power = Common.numberCarry(_power,1000000)}}
                    <span class="shadow" w-class="20" w-sid="20">{{_power}}</span>
                
                    {{let prop = it1.detailAward(i - 0 + 1) }}
                    <div style="position:absolute;height:50px;top:40px;left:360px;display: inline-block;">
                    {{for a,b of prop}}
                    {{let prop1 = Pi.sample[b[0]]}}
                        {{if prop1.type !== "equip"}}
                            {{let img = Pi.pictures[Pi.sample[b[0]].icon]}}
                            <widget class="shadow" w-class="30" on-tap='showPropInfo("{{b[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":50,"height":50,"prop":{{prop1}},"url":{{img}},"count":{{b[1]}},"name":"none","bg":0,"top":20,"right":5} 
                            </widget>
                        {{else}}
                            {{let module = prop1.module[prop1.career_id.indexOf(career_id)][0] }}
                            {{let img = Pi.pictures[module] }}
                            <widget class="shadow" w-class="30" on-tap='showPropInfo("{{b[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":50,"height":50,"prop":{{prop1}},"url":{{img}},"count":{{b[1]}},"name":"none","bg":0,"top":20,"right":5} 
                            </widget>
                        {{end}}
                    
                    {{end}}
                    </div>
                </div>
                {{end}}
            </div>
        </div>
    </div>
    {{let target = it1.avgLevel()}}
    <div class="shadow" w-class="21" w-sid="21">
        <span  w-class="23" w-sid="23">我的排名：</span>
        <span w-class="24" w-sid="24">我的奖励：{{if it1.base.role_jjc_rank === 5001}}无{{end}}</span>
        <span w-class="26" w-sid="26">{{it1.base.role_jjc_rank || 5001}}</span>

        {{if it1.base.role_jjc_rank && it1.base.role_jjc_rank != 5001}}
        <div  style="position: absolute;height: 50px;top: 35px;left: 90px;display: inline-block;">
        {{for j, p of it1.detailAward(it1.base.role_jjc_rank - 0)}}
        {{let prop2 = Pi.sample[p[0]]}}
            {{if prop2.type !== "equip"}}
            
                {{let img = Pi.pictures[Pi.sample[p[0]].icon]}}
                <widget w-class="30" on-tap='showPropInfo("{{p[0]}}")' w-tag="app_a-widget-prop-base" w-sid="32">{"width":50,"height":50,"prop":{{prop2}},"url":{{img}},"count":{{p[1]}},"name":"none","bg":0,"top":20,"right":5} 
                </widget>

            {{else}}

                {{let module = prop2.module[prop2.career_id.indexOf(career_id)][0] }}
                {{let img = Pi.pictures[module] }}
                <widget w-class="30" w-tag="app_a-widget-prop-base" w-sid="33">{"width":50,"height":50,"prop":{{prop2}} ,"url":{{img}},"count":{{p[1]}},"name":"none","bg":0,"top":20,"right":5} 
                </widget>
                
            {{end}}
        {{end}}
        </div>
        {{end}}
    </div>
    {{if target.goal.award}}
    <div class="shadow" w-class="22" w-sid="22">
        <span w-class="27" w-sid="27">目标排名：</span>
        <span w-class="28" w-sid="28">目标奖励：{{if !target.goal.award}}无{{end}}</span>
        <span w-class="29" w-sid="29">{{target.goal.index}}</span>
        
        {{if target.goal.award}}
        <div style="position: absolute;height: 50px;top: 35px;left: 90px;display: inline-block;">
        {{for d, f of target.goal.award}}
        {{let prop3 = Pi.sample[f[0]]}}
            {{if prop3.type !== "equip"}}
            
                {{let img = Pi.pictures[Pi.sample[f[0]].icon]}}
                <widget w-class="30" on-tap='showPropInfo("{{f[0]}}")' w-tag="app_a-widget-prop-base" w-sid="34">{"width":50,"height":50,"prop":{{prop3}},"url":{{img}},"count":{{f[1]}},"name":"none","bg":0,"top":20,"right":5} 
                </widget>

            {{else}}

                {{let module = prop3.module[prop3.career_id.indexOf(career_id)][0] }}
                {{let img = Pi.pictures[module] }}
                <widget w-class="30" w-tag="app_a-widget-prop-base" w-sid="35">{"width":50,"height":50,"prop":{{prop3}},"url":{{img}},"count":{{f[1]}},"name":"none","bg":0,"top":20,"right":5} 
                </widget>
            {{end}}
        {{end}}
        </div>
        {{end}}
    </div>
    {{else}}
    <div class="shadow" style="font-size: 19px;color: rgb(232, 172, 102);position: relative;top: 770px;left: 290px;width: 210px;text-align: center;">无敌是多么寂寞!!</div>
    {{end}}
    <div w-class="36" w-sid="36">
        <widget w-class="37" w-tag="app_a-widget-pic_text-pic_text" w-sid="37">{"icon":"little_tips_bg","width":248,"height":24,"align":"center","marginLeft":3,"text":"这是什么","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
        </widget>
        <widget w-class="38" w-tag="app_a-widget-pic_other-pic_other" w-sid="38">{"icon":"remind"} 
        </widget>
        <span class="shadow" w-class="39" w-sid="39">每日排行奖励将通过邮件发放</span>
    </div>
</div>