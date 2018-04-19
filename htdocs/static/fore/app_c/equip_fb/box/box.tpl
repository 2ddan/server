{{let Pi = it1.Pi}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let equip_fb_star = it1.equip_fb_star_1}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let player = appCfg.player}}
{{let career_id = player.career_id}}

<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%">
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"星级宝箱","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>

        <div w-class="s3" class="shadow7" style="top:46px;">
            <widget  w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"little_tips_bg","text":{{"总星数达到" + equip_fb_star[it1.allBoxId].total_star + "可领取"}},"width":189,"height":24,"top":2} 
            </widget>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>
        <div w-class="s13" >
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg">
                {"bgName":"bg_frame23"} 
            </widget>
        </div>
        <div w-class="s20" class="shadow6">
            {{for i, v of it1.boxData(equip_fb_star[it1.allBoxId])}}
            {{let prop = Pi.sample[v[0]]}}
            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
            {{let url = Pi.pictures[icon]}}
            {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
            <div on-tap='propInfoShow({{v[0]}})' style="position:relative;display:inline-block;margin:0 3px;margin-top: 20px;height:76px;width:76px;">
                {{let bol = prop.type !== "equip" ? 1 : 0}}
                <app_a-widget-prop-base >
                    {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count":{{bol ? v[1] : "none"}},"name":"none","bg":1}
                </app_a-widget-prop-base>

                {{if !bol}}
                <div data-desc="装备等级" w-class="s21" >{{"Lv"+prop.level[1] || 20}}</div>
                {{end}}

                <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                    {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                </app_a-widget-text-text>
            </div>
            
            {{end}}
        </div>
        {{let c = equip_fb_star[it1.allBoxId].total_star > it1.totalStar ? 1 : 0}}            
        <widget on-tap="getBoxAward({{c}})" w-class="s16" w-tag="app_a-widget-btn-rect" >
            {"class":{{c ? "disabled" : "hl" }},"fontsize":24,"color":"","text":"领 取","width":116,"height":45} 
        </widget>
            
        <widget w-class="s19" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>