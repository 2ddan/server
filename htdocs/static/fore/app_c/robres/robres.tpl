<div maxId="97" style="position:absolute;width:100%;height:100%;z-index:2"  test="test" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}		
    <widget w-tag="app_b-widget-title-title"  w-class="3">
        {"text":"掠夺水晶","coin":["money","diamond"],"left":8,"top":17,"width":540,"width":{{root.getWidth()}} } 
    </widget>
    <widget w-tag="app_a-widget-line-line" w-class="4">
        {"line":"line_7"} 
    </widget>
    {{let info = it1.info}}
    <div w-class="5">
		<widget w-tag="app_a-widget-bg_frame-bg" w-class="10">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="6">
            <app_c-robres-top-top></app_c-robres-top-top>
            
            {{let position = [[137,13],[15,158],[95,317],[251,154]]}}
            <div data-desc="帮会列表" w-class="13">
                {{for i,v of info.match_info}}
                {{if v}}
                <div on-tap="gotoGangPage({{v[0]}})"  w-class="16" style="top:{{position[i][0]}}px;left:{{position[i][1]}}px;">
                    <img src="./images/{{i+1}}.png" />
                    <div w-class="15">
                        <app_a-widget-pic_text-pic_text w-class="14">
                            {"icon":"equip_level_bg","text":" ","width":145,"height":48}
                        </app_a-widget-pic_text-pic_text>
                        {{let name = it1.checkTypeof(v[3],"Array") ? it1.Common.fromCharCode(v[3]) : v[3]}}
                        <div w-class="17">{{name}}<span style="color:#12ff00">(S{{v[2]}})</span></div>

                        {{let name1 = it1.checkTypeof(v[1],"Array") ? it1.Common.fromCharCode(v[1]) : v[1]}}
                        <div w-class="17" style="color:#ff5400;font-size:16px;">{{name1}}&nbsp;LV{{v[4]}}</div>
                    </div>
                </div>
                {{end}}
                {{end}}
                <div on-tap="gotoGangPage({{it1.myGang[0]}})"  w-class="16" style="top:{{position[3][0]}}px;left:{{position[3][1]}}px;">
                    <img src="./images/{{4}}.png" />
                    <div w-class="15">
                        <app_a-widget-pic_text-pic_text w-class="14">
                            {"icon":"equip_level_bg","text":" ","width":145,"height":48}
                        </app_a-widget-pic_text-pic_text>
                        <div w-class="17">{{it1.myGang[2][0]}}<span style="color:#12ff00">(S{{it1.myGang[2][1]}})</span></div>
                        <div w-class="17" style="color:#ff5400;font-size:16px;">{{it1.myGang[1][0]}}&nbsp;LV{{it1.myGang[1][1]}}</div>
                        <div w-class="21">
                            <app_a-widget-pic_text-pic_text>
                                {"icon":"flag_green","text":" ","width":32,"height":43}
                            </app_a-widget-pic_text-pic_text>
                            <div  w-class="22">己方</div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div w-class="18"  on-tap="refresh"> 
                <widget w-tag="app_a-widget-btn-rect" style="position: absolute;">
                    {"class":{{it1.refresh_time ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":{{it1.refresh_time ? " " : "刷  新"}},"width":116,"height":45} 
                </widget>
                {{if it1.refresh_time}}
                <div class="shadow1" style="width:116px;height:45px;position:absolute;left: 0px;top: 0px;font-size:24px;color:#e7e09e;line-height:45px;text-align:center;">
                    刷 新
                    <app-widget-cdTime1 ev-countdownend="timeEnd2" style="display:inline-block;vertical-align: middle;margin-top:-5px;">
                      {"cd_time":{{it1.refresh_time[1]}},"now_time":{{it1.refresh_time[0]}},"cd_type":"x" }
                    </app-widget-cdTime1>
                    s
                </div>
                {{end}}
            </div>
           
            <div w-class="19" class="shadow7">
                {{let count = it1.getCount()}}
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":143,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">可攻打次数: <span style="color:{{!count[0] ? '#f00' : ''}}">{{count[0]}}</span></span> 
                <widget style="position:absolute;top:0;left:124px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount(0,1)">
                    {"icon":"add_btn"} 
                </widget> 
                <div w-class="20">
                    <app_a-widget-pic_text-pic_text class="shadow8"  >
                        {"icon":"equip_level_bg","text":"","width":160,"height":28}
                    </app_a-widget-pic_text-pic_text>
                    <div  w-class="23">
                        (
                        <app-widget-cdTime1 ev-countdownend="timeEnd" style="display:inline-block;vertical-align: middle;color:#12ff00">
                            {"cd_time":{{count[1][1]}},"now_time":{{count[1][0]}}}
                        </app-widget-cdTime1>
                        后增长1次)
                    </div>

                </div>
                
            </div>
        </div>

    </div>
    <widget w-class="8" w-tag="app_a-widget-pic_text-pic_text" class="shadow8">
        {"icon":"name_bg_2","width":220,"height":40,"text":{{"当前战力:" + it1.Common.numberCarry(it1.player.power,10000)}}} 
    </widget>
</div>