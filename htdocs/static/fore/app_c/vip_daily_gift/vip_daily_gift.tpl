<div style="position:absolute;width:100%;top:0;height:auto;bottom: 0px">
    <div class="bg_1" style="position:absolute;width:492px;height:auto;left:50%;margin-left:-246px;top: 0;bottom: 0px;"></div>
    <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-14px;left:0px;">
        {"line":"line_7"} 
    </widget>
    <widget w-tag="app_a-widget-rank-rank_title" style="position:absolute;width:490px;height:67px;left:25px;">
        {"height":67} 
    </widget>

    <div style="position:absolute;height:24px;width:256px;left:160px;top:20px;color:rgb(253, 237, 215);">
        <app_a-widget-pic_other-pic_other style="position:absolute;left:-13px;">
            {"icon":"remind"}
        </app_a-widget-pic_other-pic_other>
        
        <app_a-widget-pic_text-pic_text style="font-family:mnjsh;font-size:16px;font-family:mnjsh;line-height:24px;">
            {"icon":"little_tips_bg","textCfg":"","width":300,"height":24,"fontSize":20,"text":"每天可领取一次当前VIP等级礼包","marginLeft":8}
        </app_a-widget-pic_text-pic_text>
    </div>

    <div data-desc="奖励列表" scroller="1" style="position: absolute;width: 490px;height:auto;left:50%;margin-left:-245px;z-index:1;top:75px;overflow:hidden;bottom: 4px;">
        <div style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
            {{let arr = it1.dailyData.slice(it1.vip,it1.vip-0+3)}}
            {{for i,v of arr}}
                {{if v}}
                <div style="width:448px;height:127px;position:relative;display:flex;align-items:center;margin:0 0 10px 21px;">
                    <app_a-widget-img_stitch-stitch style="position: absolute;width: 448px;height: 127px;">
                        {"type":2,"height":20,"width":30}
                    </app_a-widget-img_stitch-stitch>
                
                    <app-widget-text-text style="position:absolute;top:16px;left:18px;">
                        {"text":{{v.name}},"fontSize":16.49,"textCfg":"iconCircle" }
                    </app-widget-text-text>

                    <div data-desc="奖励" style="position: absolute;top:44px;left:10px;height:60px;width:290px;">
                        {{for i, n of v.goods}}
                        {{let prop_id = (n[0] == "money" ? 100001 : (n[0] == "diamond" ? 100002 : n[0]))}}
                        {{let p = it1.Pi.sample[prop_id]}}
                        {{let url = it1.Pi.pictures[p.icon]}}
                        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;font-size:12px;">
                            <widget w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{prop_id}})">
                                {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1,"top":22,"right":6} 
                            </widget>
                        </div>
                        {{end}}							
                    </div>

                    {{if !it1.vip_state && it1.vip == v.level}}
                    <widget style=" position: absolute;right:15px;top: 44px;" w-tag="app_a-widget-btn-rect" on-tap="getDailyGift">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"领 取","width":116,"height":45,"show_anim":1} 
                    </widget>
                    {{elseif v.level > it1.vip}}
                    <widget style=" position: absolute;right:15px;top: 44px;" w-tag="app_a-widget-btn-rect" on-tap="gotoRecharge">
                        {"class":"default","fontsize":24,"color":"#fdedd7;","text":"去充值","width":116,"height":45} 
                    </widget>
                    {{else}}
                    <app_a-widget-pic_text-pic_text style="right:27px;top: 30px;position: absolute;">
                        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"top":0,"left":0}
                    </app_a-widget-pic_text-pic_text>
                    {{end}}
                </div>
                {{end}}
            {{end}}
        </div>
    </div>
</div>