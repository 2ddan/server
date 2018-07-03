{{let Pi = _get("app/mod/pi").exports.Pi}}

<div w-class="bg_3" style="height:320px;font-size:24px;">
    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-15px;left:-8px;">
        {"line":"line_7"} 
    </widget>

    <app_a-widget-pic_text-pic_text style="top:-18px;position:absolute;left:50%;margin-left: -125px;color: #ffb675;font-family:mnjsh;width: 250px;height: 34px;">
        {"icon":"title_bg","width":251,"height":34,"align":"center","marginLeft":3,"text":"选择服务器","textCfg":"getAward","space":2,"fontSize":22,"top":0,"left":0} 
    </app_a-widget-pic_text-pic_text>

    <widget on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" style="position:absolute;right:-4px;top:-21px;">
        {"icon":"close"} 
    </widget>
    {{let len = it1.country.areas.length - 1}}
    {{let totle = Math.ceil(len / 10)}}
    {{let num = 1}}
    <div style="position:absolute;width:100px;height:260px;overflow:hidden;top:50%;margin-top:-130px;left:17px;">
        <div scroller="1" style="position:absolute;width:115%;height:100%;overflow-x:hidden;overflow-y:auto;">
            <div on-tap="select(0)" style="display:inline-block;width:96px;height:42px;position:relative;margin-left:2px;">
                <widget w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;">
                    {"class":{{it1.country.index == 0 ? "select" : "not_select"}},"fontsize":22,"color":{{it1.country.index == 0 ? "#554137" : "#ad8e7c"}},"text":"最 近","width":96,"height":42,"no_shadow":1} 
                </widget>
            </div>            
            {{while num <= totle}}
            <div on-tap="select({{num}})" style="display:inline-block;width:96px;height:42px;position:relative;margin-left:2px;">
                {{let text = ((num - 1) * 10 + 1) + "—" + (num * 10) + "服"}}
                
                <widget w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;">
                    {"class":{{it1.country.index == num ? "select" : "not_select"}},"fontsize":22,"color":{{it1.country.index == num ? "#554137" : "#ad8e7c"}},"text":{{text}},"width":96,"height":42,"no_shadow":1} 
                </widget>

            </div>
            {{:num = num + 1}}
            {{end}}
        </div>
    </div>

    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:23px;left:125px;width:4px;height:276px;">
        {"line":"line_9"}
    </widget>
    {{let end_time = it1.country.areas[len].area_start_time}}
    {{let arr = it1.country.hasRoleServer}}
    <div style="position:absolute;width:365px;height:260px;overflow:hidden;top:50%;margin-top:-130px;left:140px;">
        <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-x:hidden;overflow-y:auto;">
            
            {{for i, v of arr}}
            {{if v}}
            <div on-tap="selectArea({{v.area}})" style="display:inline-block;width:360px;height:42px;position:relative;margin-left:2px;color:#ffd8a6;font-size:24px;font-family:mnjsh;">
                {{let time = v.area_start_time}}
                <app_a-widget-pic_text-pic_text style="height:42px;line-height:42px;text-align:center;position:absolute;width:70px;left:0;width: 360px;height: 42px;">
                    {"icon":"area_bg","width":360,"height":42,"align":"center","marginLeft":3,"text":{{v.name}},"fontSize":24,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>
                <div style="height:42px;line-height:42px;text-align:center;position:absolute;width:70px;left:25px;">{{v.index}}服</div>
                {{if (end_time < (time + 24 * 3600) || end_time == time)}}
                <img src="app/widget/tip/images/new.png" alt="" style="position: absolute;right: 24px;top: -5px;"/>
                {{end}}
            </div>
            {{end}}
            {{end}}
        </div>
    </div>
</div>