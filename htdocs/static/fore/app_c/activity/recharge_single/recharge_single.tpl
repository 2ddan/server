
{{let Common = _get("app/mod/common").exports.Common}}
<div data-desc={{it1.act_name}} style="position:absolute;width:100%;top:0px;bottom:0;z-index: 2;overflow: hidden;">

    <div w-class="light_bg">
        <app-widget-text-text style="position:absolute;top:5px;left:79px;">
            {"text":"活动期间单次充值指定金额","fontSize":16.49,"textCfg":"activity" }
        </app-widget-text-text>
        <app-widget-text-text style="position:absolute;top:23px;left:92px;">
            {"text":"可以领取对应的超值好礼","fontSize":16.49,"textCfg":"activity" }
        </app-widget-text-text>
    </div>
    <div data-desc="奖励列表" scroller="1" style="position: absolute;width: 105%;height:366px;z-index: 1;top:46px;">
        <app-widget-step style="width: 100%;height:366px">
            {"widget":"app_c-activity-recharge_total-frame","arr":{{it1.act_info}},"initCount":5,"addCount":4 }
        </app-widget-step>
    </div>

    <div class="shadow" style="position: absolute;top: 431px;width: 100%; text-align: center;color: #aec5ff;font-size: 13.7px;">截止时间：{{it1.time[0]}}年{{it1.time[1]}}月{{it1.time[2]}}日24:00</div>
    
    <div class="bottom_line_light" style="position: absolute; bottom: 5px; left: -3px;"></div>
</div>