<div style="position:relative;width:98px;height:146px;display:inline-block;margin:10px 0px 0px 20px;">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let day = it1.checkInData.day % it.length}}
    {{let career_id = it1.player.career_id}}
    {{if (it.index < day)}}
    <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:98px;height:146px;left:0px;top:0px;">
        {"type":3,"height":20,"width":30}
    </widget>
    {{else}}
    <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:98px;height:146px;left:0px;top:0px;">
        {"type":2,"height":20,"width":30}
    </widget>
    {{end}}

    {{if it.value.vip}}

    <div w-class="discount_bg">
        <app_a-widget-pic_text-pic_text style="transform: scale(-1,1);">
            {"icon":"shop_vip_discount","width":42,"height":51,"align":"center","text":" "} 
        </app_a-widget-pic_text-pic_text>
        <div class="shadow" w-class="text">vip{{it.value.vip}}双倍</div>
    </div>
    {{end}}

    {{let g = it.value.prop}}
    {{let sid = (g[0] == "diamond" ? 100002 : g[0] == "money" ? 100001 : g[0])}}
    {{let prop = it1.Pi.sample[ sid ]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = it1.Pi.pictures[icon]}}
    {{%% let fun = (it.index-0 == day && it1.checkInData.checkin_state==0)?'checkIn':'propInfoShow('+sid+')'}}
    <widget w-tag="app_a-widget-prop-base" class="shadow" style="position:absolute;width:76px;height:76px;left:10px;top:20px;color:#fff;" on-tap="propInfoShow({{sid}})">
        {"width":76,"height":76,"prop":{{prop}} ,"url":{{url}},"count":{{g[1]}},"hidden_name":1,"top":23,"right":7,"effect":{{prop.effect}}}
    </widget>
    
    {{if (it.index < day)}}
    {{%=========已签到=========}}
    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:27px;z-index:3;">
        {"icon":"text_get_1","width":94,"height":60}
    </widget>
    <div style="position:absolute;width:100%;height:30px;line-height:30px;font-size:18px;font-family:mnjsh;text-align:center;color:#cfb9a5;top:100px;">第{{it.index % it1.cyclic_day + 1}}天</div>
    {{elseif (it.index == day && it1.checkInData.checkin_state == 0)}}
    {{%============今天未签到===========}}
    <app_a-widget-btn-rect style="top:97px;position:absolute;left:7px;z-index:3;" on-tap="checkIn">
        {"text":"签 到","class":"hl","fontsize":20,"width":83,"height":31}
    </app_a-widget-btn-rect>
    {{else}}
    <div style="position:absolute;width:100%;height:30px;line-height:30px;font-size:18px;font-family:mnjsh;text-align:center;color:#ffb675;top:100px;">第{{it.index % it1.cyclic_day + 1}}天</div>
    {{end}}
</div>