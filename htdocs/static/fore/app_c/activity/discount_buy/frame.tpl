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
        {{let _bol = it.condition>player.diamond}}
        <div on-tap='getAward({"cmd":{{it.index}},"act_id":{{it.id}},"price":{{it.condition}}})' >
            <app_a-widget-btn-rect style="top:30px;position:absolute;left: -17px;">
                {"text":" ","class":{{ _bol ? "disabled" :"hl"}},"fontsize":24,"width":116,"height":45}
            </app_a-widget-btn-rect>
            <app_a-widget-coin-coin data-desc="元宝" style="font-size:18px;position: absolute;bottom: -4px;color:{{_bol ?'#f00' : '#f3d6af'}};width:116px;left:-18px;text-align:center;">
                {"icon":"diamond","text":[{{it.condition}}],"left":3}
            </app_a-widget-coin-coin>
        </div>
       
    </div>
    {{end}}
    {{if it.discount}}
    <div style=" position: absolute;left: 14px;top: 4px;z-index: 3;width: 33px;height:80px;">
        <widget w-tag="app_a-widget-pic_other-pic_other" style=" position: absolute;left:0;top:0;width: 100%;height:100%;">
        {"icon":"discount_bg"} 
        </widget>
        <div style="position: absolute;width: 20px;height: 50px;z-index: 3;left: 6px;top: 7px;text-align: center;color: #FFF;font-family: mnjsh;font-size: 20px;">{{it.discount*10}}折</div>
    </div>
    {{end}}
    {{let p = Pi.sample[it.prop[0][0]] }}
    {{let url = Pi.pictures[p.icon]}}
    <div style="position:absolute;width:80px;height:80px;color:#ffffff;left:30px;top:16px">
        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})" style="position:absolute">
            {"width":80,"height":80,"prop":{{p}} ,"url":{{url}},"count":{{it.prop[0][1]}},"hidden_name":1,"top":24,"right":8,"effect":{{p.effect}}} 
        </widget>
        
    </div>

    <app_a-widget-text-text style="position:absolute;top:20px;left:109px;">
        {"text":{{p.name}},"fontSize":20,"textCfg":"iconCircle"}
    </app_a-widget-text-text>

    <div class="shadow" style="position:absolute;width:200px;height:52px;left:111px;top:48px;font-size:16px;color:#f3d6af;font-family:mnjsh;">{{p.describe}}</div>	

</div>
