{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let appCfg = _get("app/mod/db").exports.data}} 
{{let player = appCfg.player}} 
<div style="width:469;height:113px;position:relative;display:flex;align-items:center;height:113px;margin:0 0 0px 10px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:469px;height:113px;">
        {"bgName":"bg_frame34"} 
    </widget>
    {{if it.type == 3}}
    <app_a-widget-pic_text-pic_text style="top:30px;right:76px;position: absolute;">
        {"icon":"sell_over","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
    </app_a-widget-pic_text-pic_text>
    {{else}}
    <div style="position:absolute;top:20px;right:83px;font-size:16px;height:61px;width:83px;text-align:center;">
        <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;color:#f2e6bb;font-family:mnjsh;">今日已购: <span style="color:rgb(255,255,255);">{{it.get}}/{{it.init_count}}</span></div>
        <app_a-widget-btn-rect on-tap='getAward({"cmd":{{it.index}},"act_id":{{it.id}},"price":{{it.condition}}})' style="top:30px;position:absolute;left: -17px;">
            {"text":"购 买","class":{{it.condition>player.diamond ? "disabled" :"hl"}},"fontsize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
    </div>
    {{end}}

    {{let p = Pi.sample[it.prop[0][0]] }}
    {{let url = Pi.pictures[p.icon]}}
    <div style="position:absolute;width:60px;height:80px;color:#ffffff;left:30px;top:16px">
        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})" style="position:absolute">
            {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{it.prop[0][1]}},"hidden_name":1,"top":22,"right":6,"effect":{{it.prop[0][2] ? 1 : 0}}} 
        </widget>
        <div data-desc="元宝" style="font-size:14px;position: absolute;bottom: 0px;color:{{it.condition>player.diamond ?'#f00' : '#f3d6af'}};width:80px;left:-10px;text-align:center;">
            <app_a-widget-coin-coin>
                {"icon":"diamond","text":[{{it.condition}}],"left":3}
            </app_a-widget-coin-coin>
        </div>
    </div>

    <app_a-widget-text-text style="position:absolute;top:16px;left:103px;">
        {"text":{{p.name}},"fontSize":20,"textCfg":"iconCircle"}
    </app_a-widget-text-text>

    <div class="shadow" style="position:absolute;width:200px;height:52px;left:103px;top:43px;font-size:16px;color:#f3d6af;font-family:mnjsh;">{{p.describe}}</div>	

</div>
