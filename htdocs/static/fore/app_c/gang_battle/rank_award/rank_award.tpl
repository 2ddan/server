<div style="position: absolute;width: 460px;height: 580px;left: 50%;margin-left: -230px;top: 50%;margin-top: -280px;">
    <widget style="position: absolute;left: -38px;top: -25px;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"tips_top"}
    </widget>
    <widget  style="position: absolute;left: -2px;top: 0px;width: 464px;height: 580px;opacity: 0.95;" w-tag="app_a-widget-bg_frame-bg">
        {"bgName":"bg_frame26"}
    </widget>
    <widget style="position: absolute;left: -38px;bottom: -15px;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"tips_bottom"}
    </widget>
    
    <widget style="position: absolute;left: 421px;top: -35px;z-index: 1;" on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic">
        {"icon":"close"}
    </widget>
    <widget style="position: absolute;left: -14px;top: 0px;z-index: 1;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"}
    </widget>

    <widget style="width: 187px;height: 33px;text-align: center;position: absolute;left: 132px;top: -29px;" w-tag="app_a-widget-pic_text-pic_text">
        {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"排行榜","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
    </widget>

    {{let arr = ["门派排名", "个人排名", "门派奖励", "个人奖励"]}}
    <div style="position: absolute;width: 100%;height: 44px;top: 20px;">
        {{for i, v of arr}}
        <div style="position: relative;display: inline-block;width: 96px;height: 42px;margin-left: 14px;" on-tap="rankTab({{i}})">
            <widget w-tag="app_a-widget-btn-rect" style="position:absolute;width:96px;height:42px;">
                {"class":{{it1.rank_index == i ? "select" : "not_select"}},"fontsize":22,"color":{{it1.rank_index == i ? "#554137" : "#ad8e7c"}},"text":{{v}},"width":96,"height":42,"no_shadow":1} 
            </widget>
        </div>
        {{end}}
    </div>
    <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 456px;top: 60px;">
        {"line":"line_12"} 
    </widget>
    {{if it1.rank_index < 2}}
    <app_c-gang_battle-rank_award-rank></app_c-gang_battle-rank_award-rank>
    {{else}}
    <app_c-gang_battle-rank_award-award></app_c-gang_battle-rank_award-award>
    {{end}}
</div>