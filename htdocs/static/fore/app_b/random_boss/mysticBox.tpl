{{let Util = _get("app/mod/util").exports.Util}}
{{let common = _get("app/mod/common").exports.Common}}
<div style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:2">
    <app_b-widget-title-title>{"text":"神秘宝箱","coin":["money","diamond"],"top":"16","left":22}</app_b-widget-title-title>
    <div style="width:540px;height:100%;position:absolute;top:0;left:50%;margin-left:-270px;">
        <app_a-widget-line-line style="position:absolute;top:95px;left:2px;">
            {"line":"line_7"}
        </app_a-widget-line-line>
        <app_a-widget-bg_frame-bg style="position:absolute;top:110px;left:24px;width:492px;height:670px">
            {"bgName":"bg_frame21"}
        </app_a-widget-bg_frame-bg>
        <div w-class="main_header">
            <app_a-widget-text-text style="position:absolute;top:54px;right:95px;">
                {"text":"野外挂机","fontSize":25,"textCfg":"activity","space":-4 }
            </app_a-widget-text-text>
            <app_a-widget-text-text style="position:absolute;top:86px;right:25px;">
                {"text":"有机会遇见游荡的宝物守卫哦！","fontSize":18,"textCfg":"activity","space":-4 }
            </app_a-widget-text-text>
            <app_a-widget-text-text style="position:absolute;top:122px;right:89px;">
                {"text":"今日全服共击杀守卫:","fontSize":18,"textCfg":"menu_main_gray","space":-6 }
            </app_a-widget-text-text>
            <div style="position:absolute;top:122px;left:372px;font-size:20px;color:#51e650;font-family:mnjsh;">{{it1.today_kill_boss_num}}个</div>
            <app_a-widget-text-text style="position:absolute;top:147px;right:115px;">
                {"text":"今日寻宝次数:","fontSize":18,"textCfg":"menu_main_gray","space":-6 }
            </app_a-widget-text-text>
            <div style="position:absolute;top:147px;left:346px;font-size:20px;color:#51e650;font-family:mnjsh;">{{it1.today_box_num}}个</div>

        </div>
        <div data-desc="宝箱列表" style="position:absolute;width:484px;height:445px;left:23px;top:325px;z-index:2;padding:6px 6px 0;overflow:hidden">
            <div scroller="1" style="box-sizing:border-box;width:108%;height:445px;overflow-y: auto; overflow-x: hidden;">
                {{let limit = it1.box_base.box_exsit_time*60*1000}}
                {{let now = Util.serverTime()}}
                {{for i,v in it1.mySort(it1.box_data)}}
                    {{if v.end_time > now && (now + limit - v.end_time > 5*60*1000)}}
                    {{let state = v.opened}}
                    <div w-class="box_item">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 138px;height: 186px;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch>

                        <div data-desc="倒计时" style="width:125px;height:22px;margin:0 auto;font-size:14px;color:#ebcaa1;position: absolute;background-image:url(app_b/tips/image/err_bg.png);background-repeat:no-repeat;background-size: 100% 100%;top: 12px;left:6px;z-index:2;text-align: center;line-height: 22px;">
                            <app_a-widget-pic_text-pic_text style="position:absolute;top:0;left:0px">
                                {"icon":"equip_level_bg","width":125,"height":22,"text":""}
                            </app_a-widget-pic_text-pic_text>
                            <div  style="display:inline-block;position:absolute;top:2;left:0;width:125px;height:22px;">
                                <app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block">
                                    { "cd_time":{{v.end_time}},"now_time":{{Util.serverTime()}} }
                                </app-widget-cdtime>
                                <span>后消失</span>    
                            </div>                      
                            
                        </div>
                        {{if state==0}}
                            <div style="width:119px;height:116px;position:absolute;top: 18px;left: 50%;margin-left:-60px;background:url(./image/box_bg1.png) no-repeat center"></div>
                        {{end}}
                        <app_a-widget-box-box style="top: 47px;left: 50%;margin-left:-40px;">
                            {"state":{{state?"opened":""}},"type":3,"width":80,"height":68}
                        </app_a-widget-box-box>

                        {{if !state}}
                            {{let cost = it1.box_base.open_box_cost[1]}}
                            <div  style="position: absolute;bottom: 30px;text-align: center;width: 85px;left: 42%;margin-left: -32px;">
                                <app_a-widget-btn-rect on-tap="openBox({{v.id}})" style="width:64px;height:28px;line-height:28px;position:relative">
                                    {"text":"寻 宝","class":{{it1.money>=cost ?"hl":"disabled"}},"width":85,"height":35,"fontsize":20}
                                </app_a-widget-btn-rect>
                                {{let id  = it1.coinId}}
                                {{let prop = it1.Pi.sample[id]}}
                                {{let url = it1.Pi.pictures[prop.icon]}}               
                                <div style="width:100%;font-size:15px;color:{{cost>it1.money?'#efcb9d':'#fff'}};top:30px;left:15px;height:30px;position:absolute;"  on-tap='showPropInfo("{{id}}")'>
                                    <img src={{url}} style="position: absolute;z-index: 2;top:4px;width: 25px;left: 0;right: 0"/>
                                    <div style="position:absolute;width:50px;text-align:left;bottom:5px;left:27px;font-size:17px;z-index:3">{{common.numberCarry(parseInt(cost),10000)}}</div>
                                </div>
                                
                            </div>
                        {{else}}
                            <app_a-widget-pic_text-pic_text style="position:absolute;top:110px;left:20px"> 
                                {"icon":"text_get_3","width":95,"height":62,"text":""}
                            </app_a-widget-pic_text-pic_text>
                        {{end}}
                    </div>                
                    {{end}}
                {{end}}
            </div>
        </div>
        {{let data1=it1.box_base.open_box_cost[0]}}
        <div class="resource_bar" style="left:208px;top:795px;font-size:15px;line-height:20px">
            {{let id  = it1.coinId}}
            {{let prop = it1.Pi.sample[id]}}
            {{let url = it1.Pi.pictures[prop.icon]}}               
            <img src={{url}} style="position: absolute;z-index: 2;width: 23px;left: 5px;top: 1px;"/>
                
            <div w-class="title_coin_count">{{common.numberCarry(parseInt(it1.money || 0),10000)}}</div>
            <div on-tap="gotoGetWay" class="add_btn" style="right: -13px;top: 0px;"></div>
        </div>
        {{if it1.opening}}
        <app_b-random_boss-open_box></app_b-random_boss-open_box>
        {{end}}
    </div>


</div>   