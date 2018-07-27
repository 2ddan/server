{{let Common = _get("app/mod/common").exports.Common }}
{{let player = _get("app/mod/db").exports.data}}
{{let career_id = player.player.career_id}}
{{let nextExp = it1.player_exp[it1.player_level].exp || it1._player_exp}}
<div style="position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;background-image:url(./images/main_bg.jpg);background-size:100% 100%;background-repeat:no-repeat">
    <div style="position: absolute;width: 100%;height: 100%;background-image: url(./images/offLine_bg.jpg);background-size: 100% 100%;background-repeat: no-repeat;"></div>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback"></div>
    <app_b-widget-title-title style="z-index:2;top:0;left:0">
        {"text":"经验宝库","coin":["money","diamond"],"top":"15","left":"22" }
    </app_b-widget-title-title>

    <div style="width:540px;position:absolute;left:50%;top:50%;margin-left:-270px;margin-top:-350px;">
    <div class="line_6" style="position: absolute; top: -15px; z-index: 4;left: -4px;width: 545px;"></div>
    <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0px;width: 490px;height: 701px;">
        {"bgName":"bg_frame21"} 
    </app_a-widget-bg_frame-bg>
    
    <div style="width:488px;height:701px;margin:0 auto;position:relative;background:url(./images/bg_1.png) no-repeat">    
        <div style="display:inline-block;width:226px;height:637px;margin-top:55px;position:relative;background:url(./images/bg_2.png) no-repeat;z-index: 1;">
            <app_a-widget-pic_text-pic_text style="position:absolute;top:-12px;left:48px;width:118px;height:31px">
                {"icon":"off_line_bg","text":"","width":118,"height":31}
            </app_a-widget-pic_text-pic_text>
            <div style="position:absolute;top:-12px;left:46px;width:118px;height:31px;font-family: mnjsh;font-size:17px;color:#f3d6af;line-height:31px;text-align:center">已累计 <span style="color:#86f741">{{(it1.leave_time).toFixed(1)}}</span> 时</div>
                
            <app_a-widget-pic_other-pic_other style="position:absolute;top:25px;left:33px;width:30px;height:127px">
                {"icon":"pendant1" }
            </app_a-widget-pic_other-pic_other>
            <app_a-widget-pic_text-pic_text style="position:absolute;top:30px;left:30px;width:30px;height:78px">
                {"icon":"text_bg","text":"","width":30,"height":78}
            </app_a-widget-pic_text-pic_text>
            <div style="position:absolute;top:40px;left:38px;width:20px;height:70px;font-family: mnjsh;font-size:15px;color:rgb(83, 67, 58)">收益时间</div>



            {{let progress = it1.leave_time / it1.treasury_base.vip_limit_time * 100}}
            
            <div style="position:absolute;height:16px;top:270px;left:-108px;width:435px;transform: rotateZ(-90deg);">
                <widget w-tag="app_a-widget-bar-bar4" style="width:435px;height:16px;position:absolute;">
                    {"progress":{{progress}},"width":435,"height":16}
                </widget>
                <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;right:8px;bottom:2px;width:12px;height:12px;z-index:2">
                    {"icon":"other_1"} 
                </widget>
                <div style="position:absolute;right:-3px;top:27px;font-family: mnjsh;font-size:17px;color:#f3d6af;transform: rotateZ(90deg);">16时</div>
                <app_a-widget-pic_text-pic_text style="position:absolute;right:-3px;top:46px;transform: rotateZ(90deg);">
                        {"icon":"text_bg6","text":{{it1.player_vip <= it1.treasury_base.need_vip ? "v" +it1.treasury_base.need_vip + "开启":"已开启"}},"textCfg":"activity","width":84,"height":30,"fontSize":18,"top":4,"left":10}
                </app_a-widget-pic_text-pic_text>
                <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;right:210px;bottom:2px;width:12px;height:12px;z-index:2">
                    {"icon":"other_1"} 
                </widget>
                <div style="position:absolute;right:204px;top:27px;font-family: mnjsh;font-size:17px;color:#f3d6af;transform: rotateZ(90deg);">8时</div>
            </div>    
        </div>

        <div style="display: inline-block;width: 275px;height: 530px;margin-left: -15px;position: relative;top: -120px;z-index:2">
            {{let _progress = it1.showExp[1]}}
            <div style="position: absolute;width: 254px;height: 447px;top: 0px;">
                <app_a-widget-bg_frame-bg style="position: absolute;top: 0px;width: 254px;height: 447px;">
                    {"bgName":"bg_frame45"} 
                </app_a-widget-bg_frame-bg>
                
                <app_a-widget-text-text data-desc="名字" style="position: absolute;font-size: 20px;left: 0px;right: 0px;margin: 0 auto;top: 10px;">
                    {"text":{{"Lv"+it1.showExp[0]}},"textCfg":"gangCoverTitle","fontSize":30,"space":-4}
                </app_a-widget-text-text>
                <widget w-tag="app_a-widget-bar-bar2" style="position: relative;width: 215px;height: 18px;margin-top:50px;left: 25px;font-family:mnjsh;">
                    {"progress":{{_progress}},"text":{{_progress + "%"}},"lineHeight":18,"fontSize":14,"width":270,"height":18} 
                </widget>
                <widget style="position:absolute;left: 10px;top: 43px;z-index:2;" w-tag="app_a-widget-pic_other-pic_other">
                    {"icon":"exp"} 
                </widget>
                <div class="anim_off_line_bar" style="position: absolute;top: 6px;left: -25px;display:{{it1.level_exp_flag ? '' : 'none'}}"></div>
                
                {{let _add = 0}}
                <div style="width:100%;height:47px;position:absolute;top:66px;">
                    <span class="shadow" style="color:#f3d6af;font-size:20px;top:20px;left:14px;position:absolute;font-family: mnjsh;">
                        经验加成
                        <span style="color:#38d11e">
                            
                            {{for i in it1.gain_bonus}}
                                {{:_add = _add + it1.gain_bonus[i][0]*100}}
                            {{end}}
                            {{:_add = _add/100}}

                            {{" +"+Math.floor(_add*100) + "%"}}
                        </span>
                    </span>
                    
                    <widget w-tag="app_a-widget-btn-rect" on-tap="details" style="top:20px;right:16px;position:absolute;z-index:1">
                        {"class":"hl","fontsize":15,"color":"#f7f2ef;","text":"详  细","width":54,"height":20}
                    </widget>
                </div>

                <div style="position:relative;width:260px;height:100px;background:url(./images/bg_4.png) no-repeat center 35px;top: -47px;"></div>
                <div  style="position:absolute;width:225px;top:120px;left:18px;height:3px;background:url(./images/bg_3.png) no-repeat center"></div>  


                <div style="position:relative;width:260px;height:106px;background:url(./images/bg_4.png) no-repeat center 40px;top:22px">
                    <widget w-tag="app_a-widget-title-single" style="position: absolute;top:-55px;left:50%;transform:translateX(-50%);">
                        {"padding":5,"type":9,"width":80,"text":"收益奖励","textCfg":"gangCoverTitle","fontSize":22,"space":-4,"color":"#b27d5c","wear":0}
                    </widget>

                    <div style="width: 50px;height: 50px;position: absolute;top: 35px;left: 2px;font-size: 18px;color: #f3d6af;font-family: mnjsh;text-align: center;line-height: 22px;">
                        <span>收益</span>
                        <span>加成</span>
                    </div>

                    <div style="width: 203px;height: 92%;position: absolute;right: 7px;top: -20px;">
                        {{for i,v of it1.award_list}}
                            {{if i <= 2}}
                            <div style="position: relative;display: inline-block;height: 100%;width: 65px;text-align: center;vertical-align: top;margin-right: 2px;font-family:mnjsh;">

                                {{let prop = it1.Pi.sample[v]}}
                                {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(career_id)][0]}}
                                {{let icon = it1.Pi.pictures[_icon]}}

                                <app_a-widget-prop-base on-tap='showPropInfo("{{v}}")' style="position:absolute;display:inline-block;top:0px;left: 0px;right:0;margin:0 auto">
                                    {"prop":{{prop}},"url":{{icon}},"count":"none","width":58,"height":58,"name":"none","bottom":27}
                                </app_a-widget-prop-base>
        
                                <div style="position: absolute;height: 20px;font-size: 16px;color: rgb(243, 214, 175);top: 58px;text-align: left;width: 100%;left:15px">
                                    {{Common.numberCarry(Math.floor(it1.all_bonus[i]*it1.leave_time),10000)}}
                                </div>
                                
                                <div style="font-size: 16px;color: rgb(56, 209, 30);position: absolute;top: 81px;text-align: left;width: 100%;left:3px">
                                    {{let _add1 = 0}}
                                    {{if i == 0}}
                                        +{{Common.numberCarry(Math.floor(it1.leave_time * it1.all_bonus[i] * _add),10000)}}
                                    {{else}}
                                        {{: _add1 = (it1.player_vip >= it1.treasury_base.need_vip || it1.get_num[1]) ? it1.gain_bonus["元  宝:"][2] : 0}}
                                        +{{Common.numberCarry(Math.floor(it1.leave_time * it1.all_bonus[i] * _add1),10000)}}
                                    {{end}}
                                </div>
                            </div>
                            {{end}}
                        {{end}}
                    </div>
                    
                </div>
                <div  style="position:absolute;width:225px;top:295px;left:18px;height:3px;background:url(./images/bg_3.png) no-repeat center"></div>

                <div style="position:relative;width:260px;height:100px;background:url(./images/bg_4.png) no-repeat center 35px;top: 71px;">
                    <div style="width: 50px;height: 50px;position: absolute;top: 30px;left: 2px;font-size: 18px;color: #f3d6af;font-family: mnjsh;text-align: center;line-height: 22px">
                        <span>收益</span>
                        <span>加成</span>
                    </div>
                    <div style="width: 203px;height: 92%;position: absolute;right: 7px;top: -25px;">
                        {{for i,v of it1.award_list}}
                            {{if i > 2}}
                            <div style="position: relative;display: inline-block;height: 100%;width: 65px;text-align: center;vertical-align: top;margin-right: 2px;font-family:mnjsh;">

                                {{let prop = it1.Pi.sample[v]}}
                                {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(career_id)][0]}}
                                {{let icon = it1.Pi.pictures[_icon]}}
                                
                                <app_a-widget-prop-base on-tap='showPropInfo("{{v}}")' style="position:absolute;display:inline-block;top:0px;left: 0px;right:0;margin:0 auto">
                                    {"prop":{{prop}},"url":{{icon}},"count":"none","width":58,"height":58,"name":"none","bottom":27}
                                </app_a-widget-prop-base>
        
                                <div style="position: absolute;height: 20px;font-size: 16px;color: rgb(243, 214, 175);top: 58px;text-align: left;width: 100%;left: 15px;">
                                    {{Common.numberCarry(Math.floor(it1.all_bonus[i]*it1.leave_time),10000)}}
                                </div>
                                
                                <div style="font-size: 16px;color: rgb(56, 209, 30);position: absolute;top: 81px;text-align: left;width: 100%;left: 3px;">
                                    {{let _add2 = 0}}
                                    {{if i == 0}}
                                        +{{Common.numberCarry(Math.floor(it1.leave_time * it1.all_bonus[i] * _add),10000)}}
                                    {{else}}
                                        {{: _add2 = (it1.player_vip >= it1.treasury_base.need_vip || it1.get_num[1]) ? it1.gain_bonus["元  宝:"][2] : 0}}
                                        +{{Common.numberCarry(Math.floor(it1.leave_time * it1.all_bonus[i] * _add2),10000)}}
                                    {{end}}
                                </div>
                            </div>
                            {{end}}
                        {{end}}
                    </div>
                    
                </div>
            </div>
            <div style="width:317px;height:194px;position:absolute;top:450px;left:-30px;background:url(./images/bg_5.png) no-repeat center">

                {{if it1.player_vip < it1.treasury_base.need_vip}}
                    <app_a-widget-pic_text-pic_text style="position:absolute;top:15px;left:25px;width:267px;height:17px">
                        {"icon":"off_line_bg2","text":"","width":267,"height":17}
                    </app_a-widget-pic_text-pic_text>
                    <div style="position:absolute;top:10px;left:43px;width:267px;height:17px;font-family: mnjsh;font-size:17px;color:#d18054;line-height:17px;text-align:left">每次只能选择一个档次获取</div>
                    <div  style="position:absolute;top:40px;left:25px;width:290px;height:34px">
                        <div style="position:relative;width:140px;margin-top:5px;height:34px;display:inline-block;" on-tap="selectTimes(0)">
                            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
                                {"icon":"text_bg_1","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
                            </widget>
                            <widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;top:2px">
                                {"index":1,"index1":{{it1.get_num[0]}}}
                            </widget>
                            <div style="position:absolute;left:40px;height:34px;width:120px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">1倍收益</div>                        
                        </div>
                        <div style="position:relative;width:140px;margin-top:5px;height:34px;display:inline-block;" on-tap="selectTimes(1)">
                            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
                                {"icon":"text_bg_5","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
                            </widget>
                            <widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;;top:2px">
                                {"index":1,"index1":{{it1.get_num[1]}}}
                            </widget>
                            <div style="position:absolute;left:40px;height:34px;width:120px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">超值收益</div>
                            
                        </div>
                        <div  style="position:absolute;top:45px;right:45px;width:100px;height:25px;line-height:25px;text-align:center;font-family:mnjsh;color:#f3d6af;font-size:16px;">
                            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:-2px;top:-2px">
                                {"icon":"gest_star","width":128,"height":26,"text":" "} 
                            </widget>
                            <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:0px;">
                                {"icon":"remind","width":128,"height":34} 
                            </widget>
                            v{{it1.treasury_base.need_vip}}免费  
                        </div>                          
                    </div>
                {{else}}
                    <app_a-widget-pic_text-pic_text style="position:absolute;top:80px;left:25px;width:267px;height:17px">
                        {"icon":"off_line_bg2","text":"","width":267,"height":17}
                    </app_a-widget-pic_text-pic_text>
                    <div style="position:absolute;top:64px;left:25px;width:267px;height:17px;font-family: mnjsh;font-size:26px;color: rgb(56, 209, 30);line-height:17px;text-align:center">+{{it1.treasury_base.diamond_rate * 100 + "%"}}额外收益</div>
                    <app-widget-text-text style="position:absolute;top:20px;left:65px;width:160px">
                        {"text":{{"v"+it1.treasury_base.need_vip+"特权已开启"}},"fontSize":30,"textCfg":"singleTitle","width":160,"space":-4}
                    </app-widget-text-text>
                {{end}}
                
                {{if it1.leave_time==0}}
                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:120px;left:82px;">
                        {"icon":"text_get_1","width":128,"height":70,"text":""} 
                    </widget>
                {{else}}
                    <widget w-tag="app_a-widget-btn-rect" on-tap="getAward" style="top:120px;left:90px;position:absolute">
                        {"class":"hl","fontsize":23,"color":"#f7f2ef;","text":"领    取","heiht":45}
                    </widget>
                    {{if it1.player_vip < it1.treasury_base.need_vip && it1.get_num[1]}}
                        {{let color = player.player.diamond < it1.treasury_base.diamond ? '#ff1212' : 'rgb(56, 209, 30)' }}    
                        <widget w-tag="app_a-widget-coin-coin"  style="top:165px;left:118px;position:absolute;color:{{color}}">
                            {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.treasury_base.diamond}}],"color":"#ff1212"} 
                        </widget>
                    {{end}} 
                {{end}}             
                        
            </div>           
        </div>
    </div>
</div>
</div>