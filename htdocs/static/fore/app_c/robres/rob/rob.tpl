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
        {{let len = it1.gangInfo.length}}
        {{let count = it1.getCount()}}
        <div w-class="6" style="background-image:url(../images/bg2.jpg);">
            <app_c-robres-top-top></app_c-robres-top-top>

            {{if len > 4}}
                {{if it1.page}}
                <widget on-tap="nextPage(-1)" w-tag="app_a-widget-btn_pic-btn_pic" style="position:absolute;top:50%;left:5px;transform:translateY(-50%) rotate(180deg);z-index: 4;">
                    {"icon":"light_arraw",width:44} 
                </widget>
                {{end}}
                {{if (it1.page+1)*4 < len}}
                <widget on-tap="nextPage(1)" w-tag="app_a-widget-btn_pic-btn_pic" style=" position:absolute; top:50%;right:5px;transform:translateY(-50%);z-index: 4; ">
                    {"icon":"light_arraw",width:44} 
                </widget>
                {{end}}
            {{end}}   
            {{let position = [[251,97],[49,5],[1,305],[256,300]]}}
            <div data-desc="帮会列表" w-class="13" style="top:100px;">
                {{for i,v of it1.gangInfo.slice(0).splice((it1.page*4),4)}}
                {{if v}}
                {{let name1 = it1.checkTypeof(v[2],"Array") ? it1.Common.fromCharCode(v[2]) : v[2]}}

                <div on-tap="gotoRob({{v[0]}},{{count[0]}},'{{name1}}')"  w-class="16" style="top:{{position[i][0]}}px;left:{{position[i][1]}}px;">
                    <div style="height:127px;line-height: 127px;">
                        <img style="vertical-align: middle" src="../images/d{{i+1}}.png" />
                    </div>
                    <div w-class="15" style="top:95px;">
                        <app_a-widget-pic_text-pic_text w-class="14">
                            {"icon":"equip_level_bg","text":" ","width":145,"height":48}
                        </app_a-widget-pic_text-pic_text>
                        {{if v[0] === it1.player.role_id}}
                        <div w-class="17" style="color:#12ff00">自己</div>
                        {{else}}
                        <div w-class="17" >{{name1}}</div>
                        {{end}}
                        <div w-class="17">战力:{{it1.Common.numberCarry(v[3],10000)}}</div>
                    </div>
                    <div class="shadow7" style="position:absolute;top:0;left:0;font-size:18px;color:#ffd8a6;line-height: 35px;">
                        <app_a-widget-pic_text-pic_text style="position:absolute;top:0px;left: 50%;margin-left: -90px;">
                            {"icon":"now_attr_bg","width":180,"height":34,"text":" "}
                        </app_a-widget-pic_text-pic_text>
                        <div style="position:relative;white-space: nowrap;">战胜可抢夺<span style="color:#12ff00">{{v[1]}}</span>水晶</div>
                    </div>
                </div>
                {{end}}
                {{end}}
            </div>
           
            <div w-class="19" class="shadow7" style="left:172px;">
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
                        <app-widget-cdtime ev-countdownend="timeEnd" style="display:inline-block;vertical-align: middle;color:#12ff00">
                            {"cd_time":{{count[1][1]}},"now_time":{{count[1][0]}}}
                        </app-widget-cdtime>
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