{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let desc = ''}}
{{let buy = ''}}
{{let get = 0}}
{{let sum = 0}}
{{if it.progress.length > 1 }}
{{:buy = "进度"}}
{{:desc = "累计充值 " + it.condition + " 元" }}
{{:get = it.progress[1] }}
{{:sum = it.condition}}
{{else}}
{{:buy = "已领取"}}
{{:desc = "单次充值" + it.condition + "元" }}
{{:get = it.get }}
{{:sum = it.init_count}}
{{end}}

<div style="width:469;height:113px;position:relative;display:flex;align-items:center;height:113px;margin:0 0 0px 10px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:469px;height:113px;">
        {"bgName":"bg_frame34"} 
    </widget>
    <app_a-widget-text-text style="position:absolute;top:15px;left:25px;">
        {"text":{{desc}},"fontSize":16.49,"textCfg":"iconCircle" }
    </app_a-widget-text-text>

    <div data-desc="奖励" style="position: absolute;top:40px;left:16px;height:60px;width:295px;">
        {{for i, n of it.prop}}
        {{let prop_id = (n[0] == "money" ? 100001 : (n[0] == "diamond" ? 100002 : n[0]))}}
        {{let p = Pi.sample[prop_id]}}
        {{let url = Pi.pictures[p.icon]}}
        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;">
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1,"top":22,"right":6,"effect":{{p.effect}}} 
            </widget>
        </div>
        {{end}}							
    </div>
    
    {{if it.type == 1}}
    <div style="position:absolute;top:20px;right:83px;font-size:16px;height:61px;width:83px;text-align:center;">
        <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;color:#f2e6bb;font-family:mnjsh;">{{buy}}: <span style="color:rgb(255,255,255);">{{get>=sum?sum:get}}/{{sum}}</span></div>
        <app_a-widget-btn-rect on-tap='getAward({"cmd":{{it.index}},"act_id":{{it.id}} })' style="top:30px;position:absolute;left: -17px;">
            {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
        </app_a-widget-btn-rect>
    </div>

    {{elseif it.type == 2}}
    <div style="position:absolute;top:20px;right:83px;font-size:16px;height:61px;width:83px;text-align:center;">
        <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;color:#f2e6bb;font-family:mnjsh;">{{buy}}: <span style="color:rgb(255,255,255);">{{get>=sum?sum:get}}/{{sum}}</span></div>
        <app_a-widget-btn-rect on-tap='toRecharge({"cmd":{{it.id}} })' style="top:30px;position:absolute;left: -17px;">
            {"text":"去 充 值","class":"default","fontsize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
    </div>
    {{elseif it.type == 3}}
    <app_a-widget-pic_text-pic_text style="top:30px;right:76px;position: absolute;">
        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
    </app_a-widget-pic_text-pic_text>
    {{end}}
</div>