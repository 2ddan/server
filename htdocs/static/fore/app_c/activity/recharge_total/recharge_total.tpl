
<div data-desc={{it1.act_name}} style="position:absolute;width:100%;top:0;bottom:0;z-index: 2;">
    <div w-class="bg_1"></div>
    <app_a-widget-text-text style="position:absolute;top:37px;left:210px;">
        {"text":"活动期间","fontSize":26,"textCfg":"activity","space":-4 }
    </app_a-widget-text-text>
    <app_a-widget-text-text style="position:absolute;top:33px;left:306px;">
        {"text":"累计充值","fontSize":32,"textCfg":"activity","space":-6 }
    </app_a-widget-text-text>
    <app_a-widget-text-text style="position:absolute;top:37px;left:422px;">
        {"text":"指定金额","fontSize":26,"textCfg":"activity","space":-4 }
    </app_a-widget-text-text>
    <app_a-widget-text-text style="position:absolute;top:77px;left:159px;">
        {"text":"可以领取对应的","fontSize":26,"textCfg":"activity","space":-4 }
    </app_a-widget-text-text>
    <app_a-widget-text-text style="position:absolute;top:73px;left:327px;">
        {"text":"超值","fontSize":32,"textCfg":"activity","space":-6 }
    </app_a-widget-text-text>
    
    <app_a-widget-text-text style="position:absolute;top:77px;left:387px;">
        {"text":"好礼","fontSize":26,"textCfg":"activity","space":-4 }
    </app_a-widget-text-text>

    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:458px;left:50%;margin-left:-246px;top:186px;">
        {"bgName":"bg_frame21"} 
    </widget>
    <app_a-widget-pic_other-pic_other style="position:absolute;left:0px;top:183px;">
        {"icon":"lantern"}
    </app_a-widget-pic_other-pic_other>
    <app_a-widget-pic_other-pic_other style="position:absolute;right:0px;top:183px;">
        {"icon":"lantern"}
    </app_a-widget-pic_other-pic_other>

    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:170px;left:0px;">
        {"line":"line_7"} 
    </widget>

    <div data-desc="奖励列表" style="position:absolute;width:492px;height:454px;left:50%;margin-left:-246px;top:190px;overflow:hidden;">
        <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
            <app-widget-step style="width: 100%;height:100%">
                {"widget":"app_c-activity-recharge_total-frame","arr":{{it1.act_info}},"initCount":5,"addCount":4 }
            </app-widget-step>
        </div>
    </div>

    <div class="shadow" style="position:absolute;top:160px;width:300px;text-align:center;color:#ffbd2e;font-size: 18px;font-family:mnjsh;left:230px;">截止时间：{{it1.time[0]}}年{{it1.time[1]}}月{{it1.time[2]}}日24:00</div>
</div>