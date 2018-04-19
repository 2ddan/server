{{let Pi = _get("app/mod/pi").exports.Pi}}
<div style="width:448px;height:127px;position:relative;display:flex;align-items:center;margin:0 0 10px 21px;">
    <app_a-widget-img_stitch-stitch style="position: absolute;width: 448px;height: 127px;">
        {"type":2,"height":20,"width":30}
    </app_a-widget-img_stitch-stitch>

    <app-widget-text-text style="position:absolute;top:16px;left:18px;">
        {"text":"累计登录{{it.condition}}天","fontSize":16.49,"textCfg":"iconCircle" }
    </app-widget-text-text>

    <div data-desc="奖励" style="position: absolute;top:44px;left:16px;height:60px;width:260px;">
        {{for i, n of it.prop}}
        {{let prop_id = (n[0] == "money" ? 100001 : (n[0] == "diamond" ? 100002 : n[0]))}}
        {{let p = Pi.sample[prop_id]}}
        {{let url = Pi.pictures[p.icon]}}
        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;font-family:mnjsh;">
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1,"top":22,"right":6,"effect":{{n[2] ? 1 : 0}}} 
            </widget>
        </div>
        {{end}}							
    </div>

    {{if it.type == 1}}
    <div style="position:absolute;top:20px;right:42px;font-size:16px;height:75px;width:116px;text-align:center;">
        <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;font-family:mnjsh;"><span style="color:#f2e6bb;">进度:</span><span style="color:rgb(255,255,255);">{{it.progress[1]>=it.condition?it.condition:it.progress[1]}}/{{it.condition}}</span></div>
        <app_a-widget-btn-rect on-tap='getAward({"cmd":{{it.index}} })' style="top:30px;position:absolute">
            {"text":"领 取","class":"hl","fontsize":20,"width":116,"height":45,"show_anim":1}
        </app_a-widget-btn-rect>
    </div>

    {{elseif it.type == 2}}
    <div style="position:absolute;top:20px;right:42px;font-size:16px;height:75px;width:116px;text-align:center;">
        <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;font-family:mnjsh;"><span style="color:#838383;">进度:</span><span style="color:rgb(255,255,255);">{{it.progress[1]>=it.condition?it.condition:it.progress[1]}}/{{it.condition}}</span></div>
        <app_a-widget-btn-rect style="top: 30px;position:absolute">
            {"text":"领 取","class":"disabled","fontsize":20,"width":116,"height":45}
        </app_a-widget-btn-rect>
    </div>
    {{elseif it.type == 3}}
    <app_a-widget-pic_text-pic_text style="top:40px;right:52px;position: absolute;">
        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
    </app_a-widget-pic_text-pic_text>
    {{end}}

</div>