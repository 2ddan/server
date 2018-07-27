<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="7" w-sid="7">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
            </widget>
            <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
            </widget>
            <widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"BOSS战报","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>
            
            <div scoller="1" data-desc="事件列表" w-class="11">
                <div class="shadow7" w-class="12">
                    {{let data = it1.sortEvent()}}

                    {{if data}}
                    {{for i,v in data}}
                    {{let monster = it1.monster_base[v[0][4][0]]}}

                    <div style="position: relative;margin:15px 0;width: 450px;height:auto;left: 0px;">
                        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:100%;height:100%;opacity:0.95">
                            {"bgName":"bg_frame23"} 
                        </widget>
                        <app_a-widget-pic_other-pic_other style="position:absolute;bottom: 0px;left:0px;right:0px;margin:0 auto;">
                            {"icon":"light_bottom"}
                        </app_a-widget-pic_other-pic_other>
                        
                        <app_a-widget-text-text style="position:relative;top:10px;left:13px;">
                            {"text":{{monster.des + "(LV" + v[0][4][1]+")"}},"fontSize":26,"textCfg":"heroEquip" }
                        </app_a-widget-text-text>

                        <div data-desc="事件" style="margin-top: 10px;padding-bottom: 15px;">
                            {{for o,p of v}}
                            {{let timeArr = it1.Util.arrDate(p[5]*1000)}}
                            {{let name = it1.checkTypeof(p[1],"Array") ? it1.Common.fromCharCode(p[1]) : p[1]}}
                            <div  style="position:relative;padding: 10px 15px;">
                                <widget w-tag="app_a-widget-line-line" style="position:absolute;top:0px;left:0px;width:100%;height:3px;">
                                    {"line":"line_1"}
                                </widget>
                                <div>
                                    {{(timeArr[3]<10?"0"+timeArr[3]:timeArr[3]) +":" + (timeArr[4]<10?"0"+timeArr[4]:timeArr[4])}}&nbsp; <span style="color:#51e650">{{name}}</span>
                                    对BOSS造成{{p[3]=="luck_award" ? "幸运一击" : "终结一击"}},意外获得<span style="color:#ffc000">{{it1.news(p[2])}}</span>
                                </div>
                            </div>	
                            {{end}}
				
                        </div>
                    </div>
                    {{end}}

                    {{else}}
                    <div w-class="13">暂无战报</div>

                    {{end}}
                    
                </div>   
            </div>  
        </div>      
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15" >{"icon":"tips_bottom"} </widget>
    </div>
</div>
