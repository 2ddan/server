
<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,0.5);" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="4" w-sid="4">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">{"icon":"close"} 
            </widget>
            <widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">{"icon":"lantern_2"} 
            </widget>
            <widget w-class="14" w-tag="app_a-widget-pic_other-pic_other" w-sid="14">{"icon":"pendant"} 
            </widget>
            <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"flower_2"} 
            </widget>
            <widget w-class="33" w-tag="app_a-widget-pic_text-pic_text" w-sid="33">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"仙侠通知","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":-5} 
            </widget>
        </div>
        <div w-class="10" w-sid="10">
            <widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
                {"bgName":"bg_frame26"} 
            </widget>
            <div w-class="6">
                <widget  w-tag="app_a-widget-bg_frame-bg" style="position: absolute;top:0;left:0;width:100%;height:100%">
                    {"bgName":"select_map_bg"} 
                </widget>
                <div w-class="7">
                    <widget w-class="7" w-tag="app_a-widget-line-line"style="width:100%;height:100%">
                        {"line":"line_18"} 
                    </widget>
                    <widget w-class="16" w-tag="app_a-widget-pic_other-pic_other" w-sid="16">{"icon":"pattern"} </widget>
                    <widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">{"icon":"pattern"} </widget>
                </div>
                
                <div style="width:105%;height:540px;position:absolute;top:20px;left:13px;overflow-x: hidden;overflow-y: auto;text-align: left;">
                    {{for i,v in it1.base}}
                    {{if v.show}}
                    <app-widget-tab-tab_btn on-tap="selectTab('{{i}}')" style="width: 97px;height:43px;margin:5px 0px;display:inline-block">
                        {"layout":0,"bType":1,"cfg":{"text":{{v.name}},"type":"border","type_m":"normal","fontSize":24},"select":{{i == it1.index}},"type":{{i == it1.index ? "border active":"border"}} }
                    </app-widget-tab-tab_btn>
                    {{end}}
                    {{end}}
                </div>
            </div>
            <div w-class="8">
                <widget  w-tag="app_a-widget-bg_frame-bg" style="position: absolute;top:13px;left:5px;width:347px;height:535px">
                    {"bgName":"notice"} 
                </widget>
                
                <div w-class="11">
                    <widget w-class="20"  w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":"skill_name_bg","width":122,"height":25,"align":"center","text":{{it1.base[it1.index].name}},"textCfg":"","space":0,"fontSize":12} 
                    </widget>
                    <div w-class="12">
                        {{for i,v of it1.detail}}
                        <div style="width:320px;margin-bottom:10px;padding: 0 10px;">
                            {{if v.title !== "undefined"}}
                            <widget w-class="21" w-tag="app_a-widget-title-single" >
                                {"padding":10,"type":9,"text":{{v.title}},"fontSize":20,"color":"#ffd8a6","wear":1} 
                            </widget>
                            {{end}}
                            <div>
                                <pi-ui-html>{{v.content}}</pi-ui-html>
                            </div>
                        </div>
                        {{end}}
                    </div>
                </div>

                <app_a-widget-btn-rect  on-tap='cancel' style="position:absolute;bottom:20px;left: 50%;margin-left: -58px;">
                    {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"本仙已阅","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>
            </div>
               
            
           
        </div>
        <widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">{"icon":"tips_bottom"} </widget>
    </div>
</div>