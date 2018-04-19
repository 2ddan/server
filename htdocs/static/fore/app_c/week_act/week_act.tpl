<div style="position:absolute;width:100%;top:0;bottom:0;z-index: 2;">    
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:628px;left:50%;margin-left:-246px;top:12px;">
        {"bgName":"bg_frame21"} 
    </widget>

    <div w-class="bg">
        <img src="./images/role.png" alt="" style="position: absolute;;height:130px;right:0px;" />
    </div>
    <app_a-widget-pic_other-pic_other style="position:absolute;left:-5px;top:13px;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>
    <app_a-widget-pic_other-pic_other style="position:absolute;right:0px;top:13px;">
        {"icon":"lantern_1"}
    </app_a-widget-pic_other-pic_other>

    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:0px;left:0px;">
        {"line":"line_7"} 
    </widget>

    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:249px;height:28px;left:75px;top:70px;">
        {"bgName":"bg_frame47"} 
    </widget>

    {{let day_list = {"1":"一","2":"二","3":"三","4":"四","5":"五","6":"六","7":"日"} }}
    {{let text = "活动时间:周" + day_list[it1.currAct.open_date]}}
    <app_a-widget-text-text style="position:absolute;top:72px;left:115px;">
        {"text":{{text}},"fontSize":24,"textCfg":"activity","space":-4 }
    </app_a-widget-text-text>

    <div class="shadow11" style="position:absolute;width:300px;height:26px;font-size:16px;font-family:mnjsh;color:#ffe7b0;line-height:26px;top:120px;left:85px;">活动期间完成指定任务可领取对应奖励</div>

    <div data-desc="奖励列表" style="position:absolute;width:492px;height:454px;left:50%;margin-left:-246px;top:170px;overflow:hidden;">
        <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
        {{for k, v in it1.weekAct}}
            <app_c-week_act-frame style="height: 96px;margin:0px 0px 11px 0px;">{{v}}</app_c-week_act-frame>
        {{end}}
        </div>
    </div>
</div>