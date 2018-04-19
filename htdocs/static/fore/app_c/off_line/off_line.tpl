{{let Common = _get("app/mod/common").exports.Common }}
<div style="position: absolute;width: 540px;height: 642px;left: 50%;margin-left: -270px;z-index: 2">
    <div class="line_6" style="position: absolute; top: -15px; z-index: 4;left: -4px;width: 545px;"></div>
    <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0px;width: 490px;height: 636px;">
        {"bgName":"bg_frame21"} 
    </app_a-widget-bg_frame-bg>
    <div style="width:488px;height:634px;margin:0 auto;position:relative;background:url(./images/bg_1.png) no-repeat">    
        <div style="display:inline-block;width:171px;height:528px;margin-top:90px;margin-left:15px;position:relative;background:url(./images/bg_2.png) no-repeat">
            <app_a-widget-pic_text-pic_text style="position:absolute;top:-12px;left:25px;width:118px;height:31px">
                {"icon":"off_line_bg","text":"","width":118,"height":31}
            </app_a-widget-pic_text-pic_text>
            <div style="position:absolute;top:-12px;left:25px;width:118px;height:31px;font-family: mnjsh;font-size:17px;color:#f3d6af;line-height:31px;text-align:center">已累计 <span style="color:#86f741">{{(it1.leave_time/60).toFixed(1)}}</span> 时</div>
                
            <app_a-widget-pic_other-pic_other style="position:absolute;top:25px;left:8px;width:30px;height:127px">
                {"icon":"pendant1" }
            </app_a-widget-pic_other-pic_other>
            <app_a-widget-pic_text-pic_text style="position:absolute;top:30px;left:5px;width:30px;height:78px">
                {"icon":"text_bg","text":"","width":30,"height":78}
            </app_a-widget-pic_text-pic_text>
            <div style="position:absolute;top:40px;left:12px;width:20px;height:70px;font-family: mnjsh;font-size:15px;color:rgb(83, 67, 58)">离线经验</div>



            {{let progress = it1.leave_time / it1.master_off_line.vip_limit_time * 100}}
            
            <div style="position:absolute;height:16px;top:220px;left:-73px;width:325px;transform: rotateZ(-90deg);">
                <widget w-tag="app_a-widget-bar-bar4" style="width:325px;height:16px;position:absolute;">
                    {"progress":{{progress}},"width":325,"height":16}
                </widget>
                <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;right:3px;bottom:2px;width:12px;height:12px;z-index:2">
                    {"icon":"other_1"} 
                </widget>
                <div style="position:absolute;right:-7px;top:27px;font-family: mnjsh;font-size:17px;color:#f3d6af;transform: rotateZ(90deg);">16时</div>
                <app_a-widget-pic_text-pic_text style="position:absolute;right:-3px;top:46px;transform: rotateZ(90deg);">
                        {"icon":"text_bg6","text":{{it1.player_vip <= it1.master_off_line.free_vip?"v8开启":"已开启"}},"textCfg":"activity","width":84,"height":30,"fontSize":18,"top":4,"left":10}
                </app_a-widget-pic_text-pic_text>
                <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;right:155px;bottom:2px;width:12px;height:12px;z-index:2">
                    {"icon":"other_1"} 
                </widget>
                <div style="position:absolute;right:150px;top:27px;font-family: mnjsh;font-size:17px;color:#f3d6af;transform: rotateZ(90deg);">8时</div>
            </div>    
        </div>

        <div style="display:inline-block;width:268px;height:528px;margin-top:90px;margin-left:12px;position:relative;">
            <div style="position:absolute;width:260px;height:317px;top:-35px">
                <app_a-widget-bg_frame-bg style="position: absolute;top: 0px;width: 260px;height: 317px;">
                    {"bgName":"bg_frame45"} 
                </app_a-widget-bg_frame-bg>
                <div style="position:relative;width:260px;height:106px;background:url(./images/bg_4.png) no-repeat center 40px">
                    <widget w-tag="app_a-widget-title-single" style="position: absolute;top:20px;left:50%;transform:translateX(-50%);">
                        {"padding":5,"type":9,"width":80,"text":"离线经验","textCfg":"singleTitle","fontSize":26,"space":-4,"color":"#b27d5c","wear":0} 
                    </widget>
                    {{let id  = 100003}}
                    {{let prop = it1.Pi.sample[id]}}
                    {{let url = it1.Pi.pictures[prop.icon]}}               
                    <img src={{url}} style="position: absolute;z-index: 2;top:60px;width: 40px;left: 20px;"/>
                    <div style="position:absolute;height:30px;top:70px;;left:20px;width:250px;text-align:center">
                        <div style="display:inline-block;height:30px;top:70px;left:85px;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#f3d6af;">{{Common.numberCarry(parseInt(Math.ceil(it1.player_exp[it1.player_level].leave_exp * Math.floor(it1.leave_time))),10000)}}</div>
                        {{if it1.get_num[1] && it1.leave_time!=0}}
                            <div style="display:inline-block;margin-left:5px;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#38d11e;">+{{Common.numberCarry(parseInt(Math.ceil(it1.player_exp[it1.player_level].leave_exp * Math.floor(it1.leave_time) * (it1.times-1))),10000)}}</div>                        
                        {{end}}
                    </div>
                    
                </div>
                <div  style="position:absolute;width:225px;top:106px;left:18px;height:3px;background:url(./images/bg_3.png) no-repeat center"></div>
                <div style="position:relative;width:260px;height:100px;background:url(./images/bg_4.png) no-repeat center 35px">
                    <widget w-class="s4" w-tag="app_a-widget-title-single" style="position: absolute;top:10px;left:50%;transform:translateX(-50%);" >
                        {"padding":5,"type":9,"width":80,"text":"离线银两","textCfg":"singleTitle","fontSize":26,"space":-4,"color":"#b27d5c","wear":0} 
                    </widget>
                    {{let id  = 100001}}
                    {{let prop = it1.Pi.sample[id]}}
                    {{let url = it1.Pi.pictures[prop.icon]}}               
                    <img src={{url}} style="position: absolute;z-index: 2;top:55px;width: 40px;left: 20px;"/>
                    <div  style="position:absolute;height:30px;top:64px;left:20px;width:250px;text-align:center">
                        <div style="display:inline-block;height:30px;top:64px;left:85px;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#f3d6af;">{{Common.numberCarry(parseInt(Math.ceil(it1.player_exp[it1.player_level].leave_money * Math.floor(it1.leave_time))),10000)}}</div> 
                        {{if it1.get_num[1] && it1.leave_time!=0}}
                            <div style="display:inline-block;margin-left:5px;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#38d11e;">+{{Common.numberCarry(parseInt(Math.ceil(it1.player_exp[it1.player_level].leave_money * Math.floor(it1.leave_time) * (it1.times-1))),10000)}}</div>                        
                        {{end}}    
                    </div>
                    
                </div>
                <div  style="position:absolute;width:225px;top:206px;left:18px;height:3px;background:url(./images/bg_3.png) no-repeat center"></div>                
                <div style="position:relative;width:260px;height:106px;background:url(./images/bg_4.png) no-repeat center 40px">
                    <widget w-class="s4" w-tag="app_a-widget-title-single" style="position: absolute;top:10px;left:50%;transform:translateX(-50%);" >
                        {"padding":5,"type":9,"width":80,"text":"离线物品","textCfg":"singleTitle","fontSize":26,"space":-4,"color":"#b27d5c","wear":0} 
                    </widget>
                    {{let arr = it1.player_exp[it1.player_level].prop_id}}
                    {{let id  = arr[0]}}                        
                    {{let prop = it1.Pi.sample[id]}}
                    {{let url = it1.Pi.pictures[prop.icon]}}               
                    <img src={{url}} style="position: absolute;z-index: 2;top:55px;width: 40px;left: 20px;"/>
                    <div style="position:absolute;height:30px;top:65px;left:20px;width:250px;text-align:center">
                        <div style="display:inline-block;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#f3d6af;">{{Common.numberCarry(parseInt(Math.ceil(arr[1] * Math.floor(it1.leave_time))),10000)}}</div>
                        {{if it1.get_num[1] && it1.leave_time!=0}}
                            <div style="display:inline-block;margin-left:5px;font-family:mnjsh;font-size:24px;letter-spacing:1px;color:#38d11e;">+{{Common.numberCarry(parseInt(Math.ceil(arr[1] * Math.floor(it1.leave_time) * (it1.times-1))),10000)}}</div>                        
                        {{end}}
                    </div>
                </div>                    
            </div>
            <div style="width:317px;height:194px;position:absolute;top:310px;left:-30px;background:url(./images/bg_5.png) no-repeat center">
                <app_a-widget-pic_text-pic_text style="position:absolute;top:15px;left:25px;width:267px;height:17px">
                    {"icon":"off_line_bg2","text":"","width":267,"height":17}
                </app_a-widget-pic_text-pic_text>

                {{if it1.player_vip <= it1.master_off_line.free_vip}}
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
                        <div style="position:relative;width:140px;margin-top:5px;height:34px;display:inline-block;" on-tap="selectTimes({{it1.master_off_line.rate}})">
                            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
                                {"icon":"text_bg_5","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
                            </widget>
                            <widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;;top:2px">
                                {"index":1,"index1":{{it1.get_num[1]}}}
                            </widget>
                            <div style="position:absolute;left:40px;height:34px;width:120px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">1.5倍收益</div>
                            
                        </div>
                        <div  style="position:absolute;top:45px;right:45px;width:100px;height:25px;line-height:25px;text-align:center;font-family:mnjsh;color:#f3d6af;font-size:16px;">
                            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:-2px;top:-2px">
                                {"icon":"gest_star","width":128,"height":26,"text":" "} 
                            </widget>
                            <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:0px;">
                                {"icon":"remind","width":128,"height":34} 
                            </widget>
                            v8免费  
                        </div>                          
                    </div>
                {{else}}
                    <div style="position:absolute;top:10px;left:43px;width:267px;height:17px;font-family: mnjsh;font-size:17px;color:#d18054;line-height:17px;text-align:left">v8特权已开启</div>
                    <app-widget-text-text style="position:absolute;top:50px;left:80px;width:160px">
                        {"text":"1.5倍收益","fontSize":30,"textCfg":"singleTitle","width":160,"space":-4}
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
                    {{if it1.player_vip <= it1.master_off_line.free_vip && it1.get_num[1]}}                
                        <widget w-tag="app_a-widget-coin-coin"  style="top:165px;left:118px;position:absolute;color:#ff1212">
                            {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.master_off_line.spend_diamond}}],"color":"#ff1212"} 
                        </widget>
                    {{end}} 
                {{end}}             
                        
            </div>           
        </div>
    </div>
</div>