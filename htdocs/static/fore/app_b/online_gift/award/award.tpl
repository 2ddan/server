<div maxId="33" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    <div style="position:absolute;width:450px;height:270px;left:50%;margin-left:-225px;top:240px;">
        <widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
            {"bgName":"bg_frame33"} 
        </widget>
        
        {{let award = it1.online_gift_base[it1.id][it1.index]}}
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame34"} 
            </widget>
            <div style="position:absolute;width:90px;height:60px;left:60px;top:25px;">
                <span w-class="13" w-sid="13">即将领取</span>
                {{let nowTime = it1.Util.serverTime()}}
                {{if it1.end_time*1000 > nowTime}}
                <widget style="position:absolute;left:50%;transform:translate(-50%);top:28px;" w-tag="app_a-widget-pic_text-pic_text">
                    {"icon":"equip_level_bg","width":65,"height":21,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
                </widget>
                <app-widget-cdtime w-class="32" w-sid="32">
                    {"cd_time":{{it1.end_time*1000}},"now_time":{{nowTime}},"by_minute":1 }
                </app-widget-cdtime>

                {{end}}
            </div>

            <div style="position:absolute;width:230px;height:80px;left:190px;top:12px;">
                {{for i, n of award.prop}}
                {{if n[1] > 0}}
                {{let p = it1.Pi.sample[n[0]]}}
                {{let icon = p.icon ? p.icon : p.module[p.career_id.indexOf(it1.career_id)][0]}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = checkTypeof(p.name,"Array") ? p.name[p.career_id.indexOf(it1.career_id)] : p.name}}
                <div style="position:relative;width:60px;height:60px;display:inline-block;color:#ffffff;font-family:mnjsh;margin-right:10px;font-size:14px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                        {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"name":{{name}},"bg":""} 
                    </widget>
                </div>
                {{end}}
                {{end}}
            </div>

        </div>

        {{let next_award = it1.online_gift_base[it1.id][it1.index+1]}}
        {{if next_award}}
        <div w-class="9" w-sid="9" style="top:150px;">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame34"} 
            </widget>
            <div style="position:absolute;width:90px;height:60px;left:60px;top:25px;">
                <div w-class="13" w-sid="13" style="top:50%;transform:translateY(-50%)">下档奖励</div>
            </div>

            <div style="position:absolute;width:230px;height:80px;left:190px;top:12px;">
                {{for i, n of next_award.prop}}
                {{if n[1] > 0}}
                {{let p = it1.Pi.sample[n[0]]}}
                {{let icon = p.icon ? p.icon : p.module[p.career_id.indexOf(it1.career_id)][0]}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = checkTypeof(p.name,"Array") ? p.name[p.career_id.indexOf(it1.career_id)] : p.name}}
                <div style="position:relative;width:60px;height:60px;display:inline-block;color:#ffffff;font-family:mnjsh;margin-right:10px;font-size:14px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                        {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"name":{{name}},"bg":""} 
                    </widget>
                </div>
                {{end}}
                {{end}}
            </div>
        </div>
        {{else}}
        <widget w-tag="app_a-widget-title-single" w-class="28" w-sid="28">
            {"padding":5,"type":9,"width":124,"text":"更多大礼,请明天登录领取","textCfg":"singleTitle","fontSize":16,"space":-2,"color":"#de8459","wear":1}
        </widget>
        {{end}}

        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
            {"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">
            {"icon":"tips_bottom"} 
        </widget>
        <widget w-class="8" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" on-tap="goback">
            {"icon":"close_light"} 
        </widget>
        <div w-class="title_light"></div>
        <div w-class="title"></div>
        <div w-class="hd_1"></div>
        <div w-class="hd_2"></div>
        <div w-class="dl_1"></div>
        <div w-class="dl_2"></div>
    </div>
</div>