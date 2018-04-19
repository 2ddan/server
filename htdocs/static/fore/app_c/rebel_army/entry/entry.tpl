<div class="popups_bg" style="width:420px;height:460px;position:absolute;top:108px;left:50%;margin-left:-210px;">
    <div class="popups_close" style="top:-23px;right: 15px" on-tap="goback"></div>
    <div class="title_light" style="left: 55px;top: 10px;position: absolute;width: 74%;"></div>

    <div w-class="light_bg" style="top:30px;"></div>
    <app-widget-text-text style="position:absolute;left:0px;right:0px;margin:0 auto;top: 58px;">{"text":"妖物入侵来犯，还望少侠出手相助!","textCfg":"rebelInfo"}</app-widget-text-text>
    <div style="position:absolute;width:300px;height:20px;line-height:20px;font-size:14px;left:60;text-align:center;top:96px;color:#fff;left:60px;">开启时间: {{it1.kill_monster_base.reminder_word}}</div>

    <div w-class="award_bg" style="top: 150px;">
        <div style="position:absolute;width:100%;height:100%;font-size:14px;color:#f4f1f2;">
            {{for i, v of it1.kill_monster_base.show_award}}
            {{let prop = it1.Pi.sample[v]}}
            {{let url = it1.Pi.pictures[prop.icon]}}
            <div style="position:relative;width:52px;height:76px;display:inline-block;margin-top:20px;margin-left:15px;">
                <app-widget-prop-base_prop-base_prop style="width:52px;height:52px;top: 0px;position:relative">
                    {"prop":{{prop}},"url":{{url}} }
                </app-widget-prop-base_prop-base_prop>
                <div style="position:absolute;bottom:0px;width:140px;left:50%;margin-left:-70px;line-height:18px;height:18px;">{{prop.name}}</div>
            </div>
            {{end}}
        </div>
    </div>

    <app-widget-btn-button style="width:70px;height:30px;bottom:28px;left:50%;margin-left:-35px;z-index:1" on-tap='openRebel'>
        {"text":"进入挑战","left":-15}
    </app-widget-btn-button>

</div>