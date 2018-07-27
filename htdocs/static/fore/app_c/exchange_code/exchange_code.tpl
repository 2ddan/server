<div style="position:absolute;width:100%;top:0;height:auto;bottom: 0px">
    <widget  w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:637px;left:50%;margin-left:-246px;top: 0;">
        {"bgName":"bg_frame21"} 
    </widget>
    <img src="./images/bg.png" style="position:absolute;width:488px;height:auto;left:50%;margin-left:-244px;top:1px;"/>
    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-14px;left:0px;">
        {"line":"line_7"} 
    </widget>
    <div style="position:absolute;width:492px;height:637px;left:50%;margin-left:-246px;top: 0;">

        <widget  w-tag="app_a-widget-text-text" style="position: absolute; z-index: 2;left: 174px;top: 205px;">
            {"text":"输入礼包码","fontSize":38,"textCfg":"activity","space":-3} 
        </widget>
        <widget  w-tag="app_a-widget-text-text" style="position: absolute; z-index: 2;left: 212px;top: 269px;">
            {"text":"领取超值礼包","fontSize":44,"textCfg":"activity","space":-3} 
        </widget>
        <div style="position: absolute; width: 490px;top: 480px;bottom: 0px;z-index: 2;left: 50%;margin-left: -245px;text-align:center;">
            <div style="top:0px;left:50%;margin-left:-138px;width:275px;height:40px;position:absolute;">
                <app_a-widget-pic_text-pic_text style="position: absolute;">
                    {"icon":"resource_bar","width":275,"height":40,"align":"center","fontSize":18,"text": " "}
                </app_a-widget-pic_text-pic_text>
                <input  id="input1" autocomplete="off" type="text"  placeholder="点击输入兑换码" style="position: absolute;z-index: 2;top:0;left:0;width: 100%;height: 100%;background: transparent;border: none;text-align: center;font-size: 18px;color: #a08175;outline: none;"/>
            </div>
            <app_a-widget-btn-rect  on-tap='cancel' style="position:absolute;top:68px;left: 50%;margin-left: -58px;" on-tap="getAward">
                {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"兑  换","width":116,"height":45,"marginLeft":0} 
            </app_a-widget-btn-rect>
        </div>
    </div>
</div>