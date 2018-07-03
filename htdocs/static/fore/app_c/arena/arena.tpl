<div maxId="57" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let robot_cfg = cfg.robot.robot_base}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let tatol = it1.getData}}
    {{let fight_times = cfg.vip_advantage.vip_advantage[player.vip].jjc_free_times + appCfg.arena.buy_fight_times}}
    {{let jjc_score  = Common.getBagPropById(150004)?Common.getBagPropById(150004)[1].count:0}}
    {{let root = _get("pi/ui/root").exports}}
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">{"text":"竞技场","coin":["money","diamond", 150004],"left":0,"top":15,"width":540,"type":"jjc_score","width":{{root.getWidth()}}}
    </widget>
    
    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">{"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame21"} 
        </widget>
        <div w-class="9" w-sid="9">
            <div w-class="15" w-sid="15">
                {{let data = tatol.arenaRead.jjc_rival }}
                {{let rank_me = 0}}
                {{let index = 0}}
                {{for k, v of data}}
                {{if k !== "erl"}}

                {{if v.sid === player.role_id}}
                {{let rank_me = v}}
                {{end}}
                <div w-class="10" w-sid="10">
                    <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">{"bgName":"bg_frame19"} 
                    </widget>
                    {{let name = ""}}
                    {{if v.role_type == "player"}}
                        {{:name = checkTypeof(v.detail.name,"Array") ? Common.fromCharCode(v.detail.name) : v.detail.name}}
                    {{else}}
                        {{:name = checkTypeof(v.detail.name,"Array") ? Common.fromCharCode(v.detail.name) : v.detail.name}}
                    {{end}}
                    <widget w-class="44" w-tag="app_a-widget-text-text" w-sid="44">{"text":{{name}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                    </widget>

                    {{if v.role_rank <= 3}}
                    <widget w-class="46" w-tag="app_a-widget-rank-rank_num" w-sid="46">{"num":{{v.role_rank}} }</widget>
                    {{else}}
                    <div style="width: 100px;height: 20px;font-size: 35px;text-align: center;color: rgb(174, 140, 100);text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: 20px;top: 57px;line-height: 20px;font-family:mnjsh">{{v.role_rank}}</div>
                    {{end}}

                    <widget w-class="47" w-tag="app_a-widget-line-line" w-sid="47">{"line":"line_9"} 
                    </widget>
                    {{let imgX= ''}}
                    {{if v.role_type == "player"}}
                    {{: imgX = Pi.pictures['playerhead'+(v.detail.head || v.detail.career_id)]}}
                    {{else}}
                    {{: imgX = Pi.pictures[robot_cfg[v.sid].head]}}
                    {{end}}
                    {{let id = v.detail.role_id || null}}
                    <widget w-class="48" w-tag="app_a-widget-head-friend" w-sid="48" on-tap="seeOther({{id}})">
                        {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
                    </widget>

                    <span class="shadow" w-class="49" w-sid="49">战斗力：</span>
                    {{let _power = v.role_type == "robot" ? v.detail.fight_power : v.detail.fight_power }}
                    {{let power = Common.numberCarry(_power,1000000)}}
                    <span class="shadow" w-class="50" w-sid="50">{{power}}</span>

                    <span class="shadow" w-class="17" w-sid="17">门派：</span>
                    <span class="shadow" w-class="51" w-sid="51">{{v.detail.gang_name?Common.fromCharCode(v.detail.gang_name) : "无"}}</span>

                    {{if v.sid == player.role_id}}
                    <app_a-widget-pic_text-pic_text style="right: 30px;top: 35px;position: absolute;">
                        {"icon":"my_rank","width":113,"height":65,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"top":0,"left":0,"text":" "}
                    </app_a-widget-pic_text-pic_text>

                    <app_a-widget-pic_other-pic_other style="position: absolute;left: 21px;width: 452px;">{"icon":"my_rank_bg"}</app_a-widget-pic_other-pic_other>
                    
                    {{else}}
                    <widget w-class="42" on-tap='toFight("{{0+','+k}}")' w-tag="app_a-widget-btn-rect" w-sid="42" style="right: 30px;">
                        {"guide":{{index == 0?"arena_open":""}},"class":"default","fontsize":24,"color":"#fdedd7;","text":"挑 战","width":116,"height":45} 
                    </widget>
                    {{end}}
                </div>
                {{end}}
                {{:index++}}
                {{end}}
            </div>
        </div>
        <widget w-class="45" w-tag="app_a-widget-rank-rank_title" w-sid="45">{"keys":["排名","玩家信息"],"split":[30,60],"padding":5,"fontSize":20,"va":"","space":0} 
        </widget>
    </div>
    <div w-class="52" w-sid="52">
        <widget w-class="53" w-tag="app_a-widget-line-line" w-sid="53">{"line":"line_9"} 
        </widget>

        {{let times = fight_times - it1.getData.arenaRead.fight_times}}
        {{let all_times = cfg.vip_advantage.vip_advantage[player.vip].jjc_free_times}}
        <widget w-class="54" w-tag="app_a-widget-pic_text-pic_text" w-sid="54">{"icon":"resource_bar","width":152,"height":28,"align":"center","marginLeft":3,"text":{{"挑战次数：" + times + "/" + all_times}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
        </widget>

        <widget w-class="55" on-tap="buyCount" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="55"></widget>
        
        <widget w-class="56" on-tap={{it1.delay ? "refresh" : "" }} w-tag="app_a-widget-btn-rect" w-sid="56">
            {"class":{{ it1.delay ? "default" : "disabled"  }},"fontsize":24,"color":"#fdedd7;","text":"刷 新","width":116,"height":45}
        </widget>
        {{if it1.referTime <= 5 && !it1.delay}}
        <div style="width:65px;height:15px;position:absolute;right: 0;top: 58px;font-size:18px;color:#e7e09e;line-height:15px;text-align:left;text-shadow: 1px 1px 0px #000000, -1px -1px 0px #000000, -1px 1px 0px #000000, 1px -1px 0px #000000;">{{it1.referTime}}S</div>
        {{end}}
    </div>

    <div style="left: 50%;position: absolute;top: 770px;margin-left: -220px;">
        {{for i, v of it1.other}}
        {{if it1.widget === "app_b-arena-arena" || (it1.widget === "app_b-arena-warcraft-arena_warcrft" && i != 0)}}
        <app-widget-btn-icon on-tap="{{v.func}}" style="width:70px;height:70px;position:relative;margin-right:15px;display: inline-block;">
            {"icon":{{v.icon}},"text":{{v.title}},"bottom":-10,"fontSize":18, "tip_keys": [{{v.tip_keys}}]}
        </app-widget-btn-icon>

        {{end}}
        {{end}}
    </div>
</div>