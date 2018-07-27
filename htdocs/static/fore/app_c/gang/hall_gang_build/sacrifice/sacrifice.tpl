<div style="position:absolute;width:450px;height:380px;left:50%;margin-left:-225px;top:230px;color:white;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:385px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"祈福","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
    </widget>
    
    <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
        {"icon":"close_light"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div style="position:absolute;width:443px;height:330px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:330px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
        </widget>

        <div style="position: absolute;width: 440px;height: 280px;left: 50%;margin-left: -218px;display: flex;justify-content: space-evenly;top: 38px;">
            {{for i, v of it1.gangExpandData.pray_info}}
            {{let obj = it1.guild_charge[i]}}
            <div style="width: 138px;height: 280px;position:relative;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 134px;height: 180px;">
                    {"type":2,"height":20,"width":30}
                </app_a-widget-img_stitch-stitch>
                {{let txt = it1.guild_charge[i].name}}
                <app_a-widget-text-text style="width: 138px;height: 30px;position: absolute;left: 0;right: 0;margin: auto;z-index: 3;">
                    {"text":{{txt}},"textCfg":"singleTitle","space":0,"fontSize":22} 
                </app_a-widget-text-text>

                {{%%此处取充值界面的图片资源}}
                {{let url = ""}}
                {{if i == 0}}
                {{:url = it1.Pi.pictures['res_100001']}}
                {{else}}
                {{:url = (i == 1) ? 'app_b/recharge/images/item_3.png' : 'app_b/recharge/images/item_5.png'}}
                {{end}}
                <app_a-widget-pic_other-pic_other style="position: absolute;width: 130px;height: 130px;left: 4px;top:-6px;">
                    {"icon":"bg_light"}
                </app_a-widget-pic_other-pic_other>
                <img src={{url}} alt="" style="position:absolute;width: 90px;height: 90px;left: 24px;top: 20px;" />
                <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;top: 100px;left: 0px;">
                    {"line":"line_1"} 
                </widget>

                <div style="position: absolute;width: 138px;height: 44px;line-height: 22px;top: 110px;">
                    <div style="height: 22px;line-height: 22px;color: #ffd8a6;font-size: 16px;text-align:center;">门派资金 +{{obj.award.gain_money}}</div>
                    <div style="height: 22px;line-height: 22px;color: #ffd8a6;font-size: 16px;text-align:center;">门派贡献 +{{obj.award.gain_contribute[1]}}</div> 
                </div>

                <div on-tap='sacrifice({{i}})' style="width: 110px;height: 40px; left: 50%;margin-left: -55px;position: absolute;top: 206px;">
                    <widget w-tag="app_a-widget-btn-rect" style="width: 110px;height: 39px;">
                        {"class":"hl","color":"#fdedd7;","text":" ","width":110,"height":39} 
                    </widget>
                    <app_a-widget-coin-coin style="position: absolute;width: 110px;height: 24px;line-height: 24px;text-align: center;top: 7px;">
                        {"icon":{{i == 0 ? "money" : "diamond"}},"text":[{{i == 0 ? obj.cost.money : obj.cost.diamond}}],"height":24,"width":24}
                    </app_a-widget-coin-coin>
                </div>
                {{if obj.limit >= 0}}
                <div style="position: absolute;width: 130px;left: 50%;margin-left: -65px;top: 248px;height: 26px;line-height: 26px;color: #ffd8a6;font-size: 16px;text-align:center;z-index: 2;">({{v + "/" + obj.limit}})</div>
                {{end}}
            </div>
            {{end}}
        </div>
    </div>

</div>