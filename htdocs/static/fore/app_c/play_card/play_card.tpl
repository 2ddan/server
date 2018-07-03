{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let activity_list = _get("cfg/c/activity_list").exports.activity_list}}

{{let activity = activity_list[102]}}
{{let time = Common_m.changeTimeToDate(activity["delay_date"],activity["time_type"])}}
<div maxId="57" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"翻翻乐","coin":["money","diamond"],"left":30,"top":15,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}}
    </widget>
    
    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">
            {"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="7">
            <widget  w-tag="app_a-widget-rank-rank_title" style="position: absolute;width: 100%;height: 68px;">
                {"keys":"","height":68}
            </widget>
            <div  w-class="19">活动截止时间：{{time[0]}}年{{time[1]}}月{{time[2]}}日24:00</div>
            <div w-class="20">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;margin-left: -92px;">
                    {"icon":"name_bg_2","width":184,"height":32} 
                </widget>
                <span style="position: relative;">我的积分:</span><span style="position: relative;">{{it1.cardData.score}}</span>
            </div>
            <app_a-widget-btn_pic-btn_pic style="position:absolute;right:12px;top:17px;" on-tap="getHelp">
                {"icon":"look_info"}
            </app_a-widget-btn_pic-btn_pic>
        </div>
        
        <div w-class="9" w-sid="9">
            <div style="position:absolute;top:12px;left:6px;width: 100%;">
                <div data-desc="当前倍数" w-class="10">
                    <widget style="vertical-align:middle;" w-tag="app_a-widget-text-text" >
                        {"text":"当前倍数","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
                    </widget>
                    <widget w-class="11" w-tag="app_a-widget-text-text" >
                        {"text":{{it1.cardData.num + ""}},"textCfg":"powerNum","space":0,"fontSize":30} 
                    </widget>
                </div>
                <div w-class="49">
                    下次翻牌：
                    <widget w-class="50" w-tag="app_a-widget-coin-coin">
                        {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.costCfg[it1.cardData.use_count] || it1.costCfg[it1.costCfg.length-1]}}],"color":"#ffd8a6"} 
                    </widget>
                </div>
            </div>
            <div  data-desc="卡牌" w-class="51">
                {{let list = it1.cardData.record}}
                {{%%console.log(list)}}
                {{%%console.log(it1.cardList)}}
                {{for i, v of list}}
                {{if i < 16}}
                {{let _v = it1.cardList[i]}}
                <div data-desc="每个卡牌" w-class="52">
                    
                    {{if v}}
                    
                        {{if v.length == 2}}
                            {{if v[0] == "+" || v[0]=="numadd"}}
                                {{: v[0]  = "+"}}
                            {{elseif v[0] == "x" || v[0]=="nummul"}}
                                {{: v[0]  = "x"}}
                            {{end}}
                            <div style="text-align:center;width:70px;height:84px;position:absolute;">
                                <img  w-class="53" src="./images/card_2.png"/>
                                <widget style="position: relative;text-align: center; line-height: 138px;" w-tag="app_a-widget-text-text" >
                                    {"text":{{v[0]+v[1]}},"textCfg":"powerNum","space":-2,"fontSize":48} 
                                </widget>   
                            </div>
            
                        {{else}}
                            <div style="text-align:center;width:70px;height:84px;position:absolute;"  on-tap="showPropInfo({{v[0]}})">
                                <img  w-class="53" src="./images/card_2.png"/>
                                {{let prop = Pi.sample[v[0]]}}
                                <app-widget-image-quality style="position:absolute;width:68px;height:68px;top:8px;left: 2px;">
                                    {"url":{{Pi.pictures[prop.icon]}}}
                                </app-widget-image-quality>
                                <div style="position: absolute;width: 50px;height: 20px;line-height: 20px;text-align: right;color: #ffffff;bottom: 4px;right: 8px;">{{v[1]}}</div>
                            </div>
                        {{end}}
                    {{else}}  
                        <img data-desc="未翻牌" on-tap="turnClick({'cmd':'{{i}}'})" w-class="53" src="./images/card_0.png"/>
                    {{end}}
                </div>
                {{end}}
                {{end}}
            </div>
            <div w-class="54">
                {{if it1.cardData.type == "plush"}}
                    <widget w-class="55" w-tag="app_a-widget-title-single">
                        {"padding":10,"type":9,"width":124,"text":"立即使当前倍数翻倍","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
                    </widget>
                   {{if it1.cardData.use_double == 1}}
                   <app_a-widget-btn-rect style="position:absolute;left: 50%;margin-left: -58px;top: 19px;">
                        {"text":"已翻倍","class":"disabled","fontSize":24,"width":116,"height":45}
                    </app_a-widget-btn-rect>
                   {{else}}
                    <app_a-widget-btn-rect on-tap="doubleClick" style="position:absolute;left: 50%;margin-left: -58px;top: 19px;">
                        {"text":"翻 倍","class":"hl","fontSize":24,"width":116,"height":45}
                    </app_a-widget-btn-rect>
                    {{end}}
                {{else}}
                    <widget w-class="55" w-tag="app_a-widget-title-single">
                        {"padding":10,"type":9,"width":124,"text":"幸运值数","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
                    </widget>
                    <widget w-class="56" w-tag="app_a-widget-bg_frame-bg" >
                        {"bgName":"bg_frame28"} 
                    </widget>
                    {{let pl_exp = it1.plush_exp[it1.cardData.count-1] || it1.plush_exp[it1.plush_exp.length-1]}}
                    {{let progress = (it1.cardData.ex/pl_exp)*100}}
                    <widget class="shadow" w-class="57" w-tag="app_a-widget-bar-bar2" >
                        {"progress":{{progress}},"text":{{it1.cardData.ex+"/"+pl_exp}},"lineHeight":14,"fontSize":18,"width":400,"height":18,"lineHeight":"19"} 
                    </widget>


                    <widget  w-tag="app_a-widget-pic_text-pic_text" w-class="58">
                        {"icon":"little_tips_bg","text":"幸运值满后下一局自动开启福利局！","width":317,"height":24} 
                    </widget>
                    <widget  w-tag="app_a-widget-pic_other-pic_other"   style="position:absolute;top: 60px;left: 85px;">
                        {"icon":"remind"} 
                    </widget>
                {{end}}
                <widget w-tag="app_a-widget-line-line"   w-class="59">
                    {"line":"line_11"} 
                </widget>
            </div>
            
        </div>  
    </div>

    <div w-class="21" style="height: 90px;">
        <div  w-class="22" on-tap="openAward" >
            <app_a-widget-box-box style="-9px;">
                {"type":"1","tip_keys":["play_card.award"]}
            </app_a-widget-box-box>
            <widget w-tag="app_a-widget-text-text" style="position: absolute;bottom: 0;z-index: 2;left: 8px;">
                {"text":"领 奖","textCfg":"gangCoverTitle","space":0,"fontSize":20} 
            </widget>
        </div>
        <div  w-class="22" on-tap="rankClick" style="left:87px" >
            <app-widget-btn-menu style="position: absolute;left: 0;top: 11px;">
                {"icon":"pic_ranking","text":"排行榜","width":70,"height":70,"top":-8,"bottom":0,"fontSize":20,"space":-6,"position":"absolute","bg":4}
            </app-widget-btn-menu>
        </div>

        <app_a-widget-btn-rect  on-tap="resetClick" style="position:relative;left: 315px;top: 19px;">
            {"text":"重 置","class":"hl","fontSize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
        
    </div>
</div>