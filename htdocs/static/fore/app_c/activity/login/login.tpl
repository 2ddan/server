
<div data-desc={{it1.act_name}} style="position:absolute;width:100%;top:0;height:642px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:642px;left:50%;margin-left:-246px;">
        {"bgName":"bg_frame21"} 
    </widget>
    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-14px;left:0px;">
        {"line":"line_7"} 
    </widget>
    <widget w-tag="app_a-widget-rank-rank_title" style="position:absolute;width:490px;height:67px;left:25px;">
        {"height":67} 
    </widget>

    <div class="shadow" style="position:absolute;top:7px;width:100%; text-align: center;color: #e46d33;font-size: 18px;font-family:mnjsh;height:25px;line-height:25px;">截止时间：{{it1.time[0]}}年{{it1.time[1]}}月{{it1.time[2]}}日24:00</div>

    <div w-class="bg" style="top:32px;">
        <app_a-widget-pic_other-pic_other style="position:absolute;left:-17px;">
            {"icon":"remind"}
        </app_a-widget-pic_other-pic_other>
        <div class="shadow" style="position:absolute;width:100%;text-align:center;color:#ffd8a6;font-size: 18px;font-family:mnjsh;height:24px;line-height:24px;left:5px;">每天登录可以领取福利</div>
    </div>
    
    <div data-desc="奖励列表" scroller="1" style="position: absolute;width: 490px;height:560px;left:50%;margin-left:-245px;z-index:1;top:75px;overflow:hidden;">
        <div style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
            {{for k,v of it1.act_info}}
            <app_c-activity-login-frame>{{v}}</app_c-activity-login-frame>
            {{end}}
        </div>
    </div>
</div>