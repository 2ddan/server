{{let root = _get("pi/ui/root").exports}}

<div style="width:100%;height:100%;position:absolute;z-index:2;">
    <div w-class="bg"></div>
	<widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
		{"text":"节日活动","coin":["money","diamond"],"left":13,"top":14,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
	</widget>
    <div w-class="f1">
        <img on-tap="toExchange" data-desc="兑换" w-class="f2" src="./images/light.png"/>
        <div style="top:103px;left:22px;position: absolute;width:32px;height:105px;">
            <app_a-widget-pic_text-pic_text style="top:0;left:0;position: absolute;">
                {"icon":"text_bg_8","width":32,"height":105,"align":"center","marginLeft":3,"textCfg":""}
            </app_a-widget-pic_text-pic_text>
            <div class="center_h" w-class="f10">节日兑换</div>
           
        </div>
        
        <app_a-widget-text-text w-class="f3" >
            {"text":{{"活动"+it1.actIndex}},"fontSize":40,"textCfg":"activity","space":-4 }
        </app_a-widget-text-text>
        <app_a-widget-btn_pic-btn_pic style="position:absolute;right:12px;top:124px;" on-tap="getHelp">
            {"icon":"look_info"}
        </app_a-widget-btn_pic-btn_pic>
        <div w-class="f5">
            <img w-class="f6" src="./images/bg_2.png" />
            <app_a-widget-text-text style="position: relative;">
                {"text":{{it1.fa_base.per_act_name[it1.actIndex-1]}},"fontSize":50,"textCfg":"fesTitle","space":-4 }
            </app_a-widget-text-text>
            {{if it1.actIndex-1 !=0}}
            <widget w-class="f7"  on-tap="changePage({{it1.actIndex-1}})" w-tag="app_a-widget-btn_pic-btn_pic">
                {"icon":"light_arraw","width":20} 
            </widget>
            {{end}}

            {{if it1.todayAct[it1.actIndex-0]}}
            <widget w-class="f8"  on-tap="changePage({{it1.actIndex-0+1}})" w-tag="app_a-widget-btn_pic-btn_pic">
                {"icon":"light_arraw","width":20} 
            </widget>           
             {{end}}
            
            
        </div>
        {{let currAct = it1.func.getActByIndex(it1.actIndex)}}
        {{let time_open = it1.Common_m.changeTimeToDate(currAct[0]["open_date"],currAct[0]["time_type"])}}
        {{let time_close = it1.Common_m.changeTimeToDate(currAct[0]["close_date"],currAct[0]["time_type"])}}
        <div class="shadow6" w-class="f9">活动时间：{{time_open[1]}}月{{time_open[2]}}日00:00-{{time_close[1]}}月{{time_close[2]}}日24:00</div>
        <div  style="position:absolute;top:310px;left:0;width:100%;height:520px;z-index: 2;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:458px;left:50%;margin-left:-246px;top:49px;">
                {"bgName":"bg_frame21"} 
            </widget>
            <app_a-widget-pic_other-pic_other style="position:absolute;left:-5px;top:49px;">
                {"icon":"lantern_1"}
            </app_a-widget-pic_other-pic_other>
            <app_a-widget-pic_other-pic_other style="position:absolute;right:0px;top:49px;">
                {"icon":"lantern_1"}
            </app_a-widget-pic_other-pic_other>
        
            <widget w-tag="app_a-widget-line-line" style="position:absolute;top:34px;left:0px;">
                {"line":"line_7"} 
            </widget>
                
            <app-widget-tab-navtab data-desc="tab内容">
                {"cur":0,
                "btn_box":"btnBag",            
                "margin":4,
                "left":22,
                "top":0,
                "arr":[
                    {"tab":"app_c-activity-festivalactivity-main","btn":{"text":"{{it1.fa_acttype[it1.fa_base.total_count].name}}","type":"border","type_m":"recharge"},"tip_keys":[{{"fest." + it1.actIndex + ".0"}}]},
                    {"tab":"app_c-activity-festivalactivity-main","btn":{"text":"{{it1.fa_acttype[it1.fa_base.total_count * 2].name}}","type":"border","type_m":"task"},"tip_keys":[{{"fest." + it1.actIndex + ".1"}}]},
                    {"tab":"app_c-activity-festivalactivity-main","btn":{"text":"{{it1.fa_acttype[it1.fa_base.total_count * 3].name}}","type":"border","type_m":"sale"},"tip_keys":[{{"fest." + it1.actIndex + ".2"}}]}
                ],
                "type":0 }
            </app-widget-tab-navtab>
        </div>
    </div>
   
    <app_b-widget-bg-goback on-tap="goback"></app_b-widget-bg-goback>    
</div>  
