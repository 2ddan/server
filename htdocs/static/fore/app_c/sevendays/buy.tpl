<div style="position: absolute; top: 47px; bottom: 0px; width: 492px;left:24px; z-index: 2;">
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let act_progress = _get("app_b/mod/act_progress").exports.act_progress}}
    {{let act = it1.list[it.btn.act_type][it1.currDay-1] }}    
    <widget w-tag="app_a-widget-bg_frame-bg" w-class="s10">
        {"bgName":"bg_frame21"} 
    </widget>
    <app_a-widget-pic_other-pic_other style="position:absolute;left:-30px;top:0;z-index: 1;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    <app_a-widget-pic_other-pic_other style="position:absolute;right:-25px;top:0;z-index: 1;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    
    <div w-class="s11">
        {{let time_close = Common_m.changeTimeToDate(act[0]["end_time"],act[0]["open_type"])}}
        <div class="shadow6" w-class="s1">
            活动截止时间：{{time_close[0]}}年{{time_close[1]}}月{{time_close[2]}}日24:00
        </div>
        <div w-class="change_map_bg ">
            <div w-class="map_tips_left" style="position:absolute;left:0px;top:-15px"></div>
            <div w-class="map_tips_left" style="position:absolute;right:0px;transform:scale(-1,1);top:-15px"></div>
            {{let arr = act[0].goods[0]}}
            {{let prop = Pi.sample[arr[0]]}}
            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(player.career_id)][0] : prop.icon}}
            {{let url = Pi.pictures[icon]}}
            {{let count = prop.type !== "equip" ? arr[1] : "none"}}
            <div class="shadow1 center_h" style="width:84px;height:84px;position:absolute;top:20px;color: #fff;">
                <app_a-widget-prop-base  on-tap="propInfoShow({{arr[0]}})">
                    {"prop":{{prop}},"url":{{url}},"width":84,"height":84,"count":{{count}},"name":"none","bg":0}
                </app_a-widget-prop-base>
                {{if count == "none"}}
                <div  w-class="s9">{{"Lv"+prop.level[1] || 20}}</div>
                {{end}}
            </div>
            <div class="shadow6 center_h"  w-class="s12">
                <div style="position:relative;margin: 2px 0 5px;">
                    原&nbsp;&nbsp;价：
                    <span style="width:40px;display:inline-block">{{act[0].old_price}}</span>
                    <img w-class="s13" src="app_a/widget/coin/images/diamond.png" />
                    <widget w-tag="app_a-widget-line-line" style="position:absolute;top: 8px;left: 17px;">
                        {"line":"line_15"} 
                    </widget>
                </div>
                <div>
                    折扣价：
                    <span style="width:40px;display:inline-block">{{act[0].params}}</span>
                    <img w-class="s13" src="app_a/widget/coin/images/diamond.png" />                    
                </div>
            </div>
        </div>

        {{let progress = act_progress[act[0].condition](act[0].type, Common_m.getDatesTo(act[0].start_time, act[0].open_type), Common_m.getDatesTo(act[0].end_time, act[0].open_type), act[0].params)}}
        {{if it1.record[act[0].act_id]}}
        <app_a-widget-pic_text-pic_text class="center_h"  w-class="s14" style="top:300px">
            {"icon":"sell_over","width":93,"height":60,"top":0,"left":0}
        </app_a-widget-pic_text-pic_text>
        {{elseif it1.roleDay < act[0].start_time}}

        <widget class="center_h" w-tag="app_a-widget-btn-rect" w-class="s14" >
            {"class":"disabled","fontsize":24,"text":"未开启","width":116,"height":45} 
        </widget>
        {{else}}
        <widget class="center_h" w-tag="app_a-widget-btn-rect" w-class="s14" on-tap='getAward({{JSON.stringify(act[0]) }})'>
            {"class":{{(it1.roleDay > act[0].start_time  || !progress[0]) ? "disabled" : "hl"}},"fontsize":24,"text":"购 买","width":116,"height":45} 
        </widget>
        {{end}}
    </div>
</div>   