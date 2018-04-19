<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    <div w-class="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">{"icon":"pendant"} 
        </widget>
        <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8">
            {"guide":"returnTo","icon":"close"} 
        </widget>
        <widget w-class="9" on-tap='propResolved' w-tag="app_a-widget-btn-rect" w-sid="9" style="left:265px">
            {"guide":{{!it1.reclaim_flag ? "reclaim_1" : ""}},"class":"hl","fontsize":24,"color":"#fdedd7;","text":"熔  炼","width":112,"height":40} 
        </widget>
        <widget w-class="9" on-tap='propResolveds' w-tag="app_a-widget-btn-rect" w-sid="9" style="left:80px">
            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"一键熔炼","width":112,"height":40} 
        </widget>
        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"装备熔炼","textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
        </widget>
        <widget w-class="11 " w-tag="app_a-widget-pic_text-pic_text" class="shadow" w-sid="11">{"icon":"little_tips_bg","width":226,"height":24,"align":"right","marginLeft":0,"text":"保留各部位评分最高的装备","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
        </widget>
        <widget w-class="12" w-tag="app_a-widget-pic_other-pic_other" w-sid="12">{"icon":"remind"} 
        </widget>
        <div w-class="13" w-sid="13">
            <img w-class="14" src="app_c/reclaim_share/images/reclaim_bg.png" w-sid="14"/>
            <div w-class="16" w-sid="16">
                {{for i,v of [1,2,3,4,5,6]}}
                <div w-class="15" w-sid="15">
                    {{if it1.selectList[i]}}
                        {{let module = it1.selectList[i] ? (it1.selectList[i].module[it1.selectList[i].career_id.indexOf(career_id)][0] ? it1.selectList[i].module[it1.selectList[i].career_id.indexOf(career_id)][0] : it1.selectList[i].module[it1.selectList[i].career_id.indexOf(career_id)][0]): ''}}
                        {{let img = it1.selectList[i] ? Pi.pictures[module] : "" }}
                        {{let level = it1.selectList[i] ? it1.selectList[i].level : "" }}
                        <app_a-widget-prop-equip on-tap="getChoose({{i}})" style="position:absolute;">
                            {"prop":{{it1.selectList[i] ? it1.selectList[i] : 0}},"url":{{img}},"level":{{level}},"width":80,"height":80,"solt":{{it1.selectList[i] ? it1.selectList[i].solt : 0}},"bg":1}
                        </app_a-widget-prop-equip>
                    {{else}}
                    <img on-tap="getChoose({{i}})" src="app_c/reclaim_share/images/no_equip.png" w-sid="15" style="position: absolute;"/>
                    {{end}}
                    {{if it1.selectList[i] && it1.reclaim_ok}}
                    <div class="successAnim" style="position: absolute;z-index: 2;transform: scale(0.8);left: -24px;top: -27px;pointer-events: none;"></div>
                    {{end}}
                </div>
                {{end}}
            </div>
        </div>
    </div>
</div>