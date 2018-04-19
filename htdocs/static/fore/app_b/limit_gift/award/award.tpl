<div w-class="bg_1">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    <widget w-class="close" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic">
        {"icon":"close_1"} 
    </widget>
    {{let gift = it1.time_limit_gift[it1.limit_gift_record[0]]}}
    <div style="position:absolute;height:60px;top:123px;left:255px;">
        <widget w-tag="app_a-widget-pic_text-pic_text" style="display:inline-block;position:relative;    vertical-align: middle;">
            {"width":60,"height":60,"align":"center","marginLeft":3,"text":{{gift.rmb+""}},"textCfg":"rechargeNum","space":0,"fontSize":60,"top":0,"left":0} 
        </widget>  
        <widget w-tag="app_a-widget-pic_text-pic_text" style="display:inline-block;position:relative;vertical-align: middle;">
            {"width":130,"height":34,"align":"center","marginLeft":3,"text":{{gift.name}},"textCfg":"levelLimit","space":0,"fontSize":30,"top":0,"left":0} 
        </widget>
    </div>

    <widget w-tag="app_a-widget-text-text" style="position:absolute;left:270px;top:174px;">
        {"text":{{gift.desc[0]}},"show":"","space":-2,"fontSize":25,"lineHeight":20,"color":"","textCfg":"singleTitle"} 
    </widget>
    <div style="position:absolute;width:250px;top:217px;left:242px;text-align:center;">
        {{for i, n of gift.award}}
        {{if n[1] > 0}}
        {{let p = it1.Pi.sample[n[0]]}}
        {{let icon = p.icon ? p.icon : p.module[p.career_id.indexOf(it1.player.career_id)][0]}}
        {{let url = it1.Pi.pictures[icon]}}
        <div style="position:relative;width:50px;height:50px;margin:0px 5px;display:inline-block;color:#ffffff;font-family:mnjsh;">
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                {"width":50,"height":50,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1} 
            </widget>
        </div>
        {{end}}
        {{end}}
    </div>

    {{if it1.recharge_record && it1.recharge_record[it1.recharge_record.length-1][1] > it1.limit_gift_record[1]}}
    <div w-class="get_award" on-tap="getAward">
        <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    </div>
    {{else}}
    <div w-class="recharge" on-tap="recharge">
        <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    </div>
    {{end}}
</div>