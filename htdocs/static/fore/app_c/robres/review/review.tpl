{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"战况回顾","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div style="width: 450px;position: relative; top:15px;left: 45px;height: 576px;">
            <div style="position:relative;left:72px;top:20px;width:310px;height: 25px;font-family:mnjsh;color:#51e650;z-index:2;font-size: 22px;">
                <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;left: 0;">
                    {"icon":"little_tips_bg","text":{{"成功复仇"+it1.info.revenge_record[0]+"次，夺回"+it1.info.revenge_record[1]+"水晶"}},"width":310,"height":25,"top":2,"align":"left","marginLeft":18} 
                </widget>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="s20" class="shadow6">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame56"} 
                </widget>
                <div class="shadow7" data-desc="战况列表" style="width:105%;height:auto;max-height: 455px;overflow-y: auto;overflow-x: hidden;font-family: mnjsh;">
                {{if it1.info.revenge_info_list}}

                    {{for i,v of it1.info.revenge_info_list}}
                    {{let data = v[1]}}
                    <div style="width:450px;height:150px;position: relative;">
                        <div data-desc="头像" style="position:absolute;top:10px;left:10px;">
                            <widget style="height:100px;width:100px;position: relative;" w-tag="app_a-widget-head-friend">
                                {"url":{{"app/scene_res/res/playerhead/playerhead"+(data[1][7][1] || 700001)+".png"}},"top":11.5,"level":{{data[1][4][1]}},"color":"#b5e8ff"}    
                            </widget>
                            <div style="font-size:20px;color:#fde7ca;width: 150px; text-align: center;position: absolute;top: 94px;left: 50%;margin-left: -75px;">战力:{{it1.Common.numberCarry(data[1][5][1],10000)}}</div>
                        </div>
                        <div data-desc="事件" style="width:220px;position:absolute;top:10px;left:123px;">
                            <div style="font-size:22px;color:#fde7ca;"><span style="color:#ff4800">{{"["}}敌人{{"]"}}</span>{{it1.checkTypeof(data[1][2][1],"Array") ? it1.Common.fromCharCode(data[1][2][1]) : data[1][2][1]}}</div>
                            <div style="position:absolute;width:210px;height:86px;overflow: hidden;margin-top: 8px;">
                                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                                    {"bgName":"bg_frame55"} 
                                </widget>
                                <div style="text-align: justify;color:#885840;font-size: 15px;position: relative;margin: 5px 10px;line-height: 20px">
                                    偷袭水晶矿,掠夺了{{data[2]}}水晶.
                                    {{if data[4] === 2 }}
                                    <div>{{"["}}复仇{{"]"}}经过艰苦战斗,成功夺回{{data[3]}}水晶</div>
                                    {{elseif data[4] !== 0 && data[4] !== 1 && data[4] !== 2}}
                                    <div>{{"["}}复仇{{"]"}}通过{{"["+ it1.checkTypeof(data[4],"Array") ? it1.Common.fromCharCode(data[4]) : data[4] +"]"}}大侠的协助,成功夺回{{data[3]}}水晶</div>
                                    {{end}}
                                </div>
                            </div>
                        </div>
                        <div data-desc="按钮" style="width:84px;position:absolute;top:34px;right:15px;">
                            {{if data[4] === 0 || data[4] === 1}}
                                <widget style="position:absolute;" w-tag="app_a-widget-btn-rect" on-tap="openRevenge({{JSON.stringify(v)}})">
                                    {"class":"hl","fontsize":20,"color":"#fdedd7;","text":"复  仇","width":84,"height":34} 
                                </widget>
                                {{if data[4] === 0}}
                                <widget style="position:absolute;top:50px;" w-tag="app_a-widget-btn-rect" on-tap="getHelp({{v[0]}})">
                                    {"class":"default","fontsize":20,"color":"#fdedd7;","text":"请求帮助","width":84,"height":34} 
                                </widget>
                                {{else}}
                                <widget style="position:absolute;top:50px;" w-tag="app_a-widget-btn-rect">
                                    {"class":"disabled","fontsize":20,"color":"#fdedd7;","text":"请求中…","width":84,"height":34} 
                                </widget>
                                {{end}}
                            {{else}}
                            <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 6px;left: 0;">
                                {"icon":"revenge","text":" ","width":93,"height":60} 
                            </widget>
                            {{end}}
                        </div>

                        <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:0px;width:100%;height:2px;">
                            {"line":"line_10"}
                        </widget>
                    </div>
                   {{end}}

                {{else}}

                <div style="width:450px;position: relative;font-family: mnjsh; font-size: 26px; color: rgb(255, 0, 0); text-align: center; line-height: 480px;">太厉害了,没有人掠夺您!</div>

                {{end}}
                </div>
            </div>
            <div w-class="s21" class="shadow7">

                {{let count = it1.robres_base.init_revenge_times + it1.info.revenge_buy_count - it1.info.revenge_count}}
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":156,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">剩余复仇次数: <span style="color:{{!count ? '#f00' : ''}}">{{count}}</span></span> 
                <widget style="position:absolute;top:0;left:138px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount(1,1)">
                    {"icon":"add_btn"} 
                </widget> 
            </div>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>