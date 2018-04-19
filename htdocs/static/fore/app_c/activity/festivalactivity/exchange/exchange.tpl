
<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}  
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let info = it1.func['getExAct']()}}
    {{let currAct = it1.func.getActByIndex(it1.actIndex)}}
    {{let time_delay = it1.Common_m.changeTimeToDate(currAct[0]["delay_date"],currAct[0]["time_type"])}}  
    <div w-class="30">
        <div w-class="34">
            <widget w-class="32" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="33" w-tag="app_a-widget-btn_pic-btn_pic">{"icon":"close"} 
            </widget>
            <widget w-class="31" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="29" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"节日兑换","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <widget w-class="35" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
        <div w-class="36">
            <widget w-class="37" w-tag="app_a-widget-bg_frame-bg">
                {"bgName":"bg_frame26"} 
            </widget>
            <div w-class="38" class="shadow7">
                活动截止时间: {{time_delay[1]}}月{{time_delay[2]}}日24:00
            </div>
            
            <div data-desc = "拥有物品" class="shadow7" w-class="40">
                <widget  w-tag="app_a-widget-bg_frame-bg" style="left: 0;top: 0;">{"bgName":"bg_frame46"} </widget>
                
                {{for k, v of it1.fa_base.actTools}}
                {{let prop = it1.Pi.sample[v]}}
                {{if prop}}
                <div style="display:inline-block;width:50%;text-align:left">
                    <span  w-class="41">拥有</span>
                    <img w-class="42" src="{{it1.Pi.pictures[prop.icon]}}" on-tap="propInfoShow({{prop.sid}})" />
                    ：
                    {{let have = Common.getBagPropById(v)}}
                    {{let count = (have && have[1].count) || 0}}
                    <span w-class="41" style="color:{{count?'#35e04d':'#f00'}}">{{count}}</span>
                </div>

                {{end}}
                {{end}}

            </div>
            <div w-class="39">
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:425px;height:530px;left:50%;margin-left:-213px;top:0;">
                    {"bgName":"bg_frame21"} 
                </widget>
                <div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:100%;padding: 7px 0;">
                    <app-widget-step style="width: 100%;height:98%;position: absolute;left: 20px;">
                        {"widget":"app_c-activity-festivalactivity-exchange-frame_exchange","arr":{{info.slice(0).sort(it1.func.mySort)}},"initCount":5,"addCount":4 }
                    </app-widget-step>
                </div>
            </div>
            
        </div>
    </div>
</div>