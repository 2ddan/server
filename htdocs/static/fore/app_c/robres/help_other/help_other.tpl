
<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"协助同伴","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        {{let count = it1.robres_base.init_help_times + it1.info.assist_buy_count - it1.info.assist_count}}

        <div style="width: 450px;position: relative; top:15px;left: 45px;height: 576px;">
            <div style="position:relative;left:72px;top:20px;width:310px;height: 25px;font-family:mnjsh;color:#51e650;z-index:2;font-size: 22px;">
                <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;left: 0;">
                    {"icon":"little_tips_bg","text":{{"协助同伴"+it1.info.assist_count+"次，夺回"+it1.info.assist_record+"水晶"}},"width":310,"height":25,"top":2,"align":"left","marginLeft":18} 
                </widget>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           {{let role_id = it1.player.role_id}}
            <div w-class="s20" class="shadow6">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame56"} 
                </widget>
                <div class="shadow7" data-desc="战况列表" style="width:105%;height:auto;max-height: 455px;overflow-y: auto;overflow-x: hidden;font-family: mnjsh;">
                {{if it1.info.gang_assist_list && it1.info.gang_assist_list.length}}

                {{for i,v of it1.info.gang_assist_list}}
                {{if v[1][1] !== role_id && !v[1][4]}}
                <div style="width:450px;height:150px;position: relative;">
                    <div data-desc="头像" style="position:absolute;top:10px;left:10px;">
                        <widget style="height:100px;width:100px;position: relative;" w-tag="app_a-widget-head-friend"  on-tap="">
                            {"url":{{"app/scene_res/res/playerhead/playerhead"+(v[1][1][7][1] || 700001)+".png"}},"top":11.5,"level":{{v[1][1][4][1]}},"color":"#b5e8ff"}    
                        </widget>
                        <div style="font-size:20px;color:#fde7ca;width: 150px; text-align: center;position: absolute;top: 94px;left: 50%;margin-left: -75px;">战力:{{it1.Common.numberCarry(v[1][1][5][1],10000)}}</div>
                    </div>
                    {{let name = it1.checkTypeof(v[1][2],"Array") ? it1.Common.fromCharCode(v[1][2]) : v[1][2]}}
                    <div data-desc="事件" style="width:220px;position:absolute;top:10px;left:123px;">
                        <div style="font-size:22px;color:#fde7ca;"><span style="color:#ff4800">{{"["}}敌人{{"]"}}</span>{{it1.checkTypeof(v[1][1][2][1],"Array") ? it1.Common.fromCharCode(v[1][1][2][1]) : v[1][1][2][1]}}</div>
                        <div style="position:absolute;width:210px;height:86px;overflow: hidden;margin-top: 8px;">
                            <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                                {"bgName":"bg_frame55"} 
                            </widget>
                            <div style="text-align: justify;color:#885840;font-size: 15px;position: relative;margin: 5px 10px;line-height: 20px">
                                偷袭同伴{{"["+name+"]"}},掠夺了{{v[1][3]}}水晶。同伴{{"["+name+"]"}}向你发起求助.
                            </div>
                        </div>                        

                    </div>
                    <widget style="width:84px;position:absolute;top:56px;right:15px;" w-tag="app_a-widget-btn-rect" on-tap="helpRevenge({{v[0][0]}},{{v[0][1]}},'{{name}}',{{i}},{{count}})">
                        {"class":"hl","fontsize":20,"color":"#fdedd7;","text":"协助复仇","width":84,"height":34} 
                    </widget>

                    <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:0px;width:100%;height:2px;">
                        {"line":"line_10"}
                    </widget>
                </div>
                {{end}}
                {{end}}

                {{else}}

                <div style="width:450px;position: relative;font-family: mnjsh; font-size: 26px; color: rgb(255, 0, 0); text-align: center; line-height: 480px;">小伙伴们都很厉害,还未向您求助呢!</div>

                {{end}}
                </div>
            </div>
            <div w-class="s21" class="shadow7">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":156,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">剩余协助次数: <span style="color:{{!count ? '#f00' : ''}}">{{count}}</span></span> 
                <widget style="position:absolute;top:0;left:138px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount(2,1)">
                    {"icon":"add_btn"} 
                </widget> 
            </div>

            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>