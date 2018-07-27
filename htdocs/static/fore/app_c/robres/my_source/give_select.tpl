<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;" w-sid="2">
        <div w-class="3" w-sid="3">
            <div w-class="7" w-sid="7">
                <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
                </widget>
                <widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
                </widget>
                <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
                </widget>
            </div>
            
            <div w-class="9" w-sid="9">
                <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                    {"bgName":"bg_frame26"} 
                </widget>
                <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
                    {"bgName":"bg_frame23"} 
                </widget>
            </div>
            {{let count = it1.info.forage_info[1] * it1.rate}}
            <div w-class="16">
                <div>赠送给门派成员{{"["}} <span style="color:#ff4800">{{it.name}}</span>{{"]"}}</div>
                <div><span style="color:#12ff00">{{Math.ceil(it1.info.forage_info[1] * it.rate/100)}}</span>水晶</div>
            </div>
            <div w-class="17" w-sid="13">
                <app_a-widget-btn-sq w-class="18" on-tap="selectcount({{-10}})">
                        {"text":" -10 ","class":"hl","fontsize":18}
                </app_a-widget-btn-sq>

                <app_a-widget-pic_text-pic_text w-class="19" w-sid="15">
                    {"icon":"resource_bar","width":136,"height":37,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"text": {{it.rate}}}
                </app_a-widget-pic_text-pic_text>
                <app_a-widget-btn-sq w-class="18" on-tap="selectcount({{10}})">
                        {"text":" +10 ","class":"hl","fontsize":18}
                </app_a-widget-btn-sq>
                <div style="position: absolute;width:100%;text-align: center;left: 0px;top: 50px;">(请调整赠送百分比)</div>

            </div>

            <div w-class="12" w-sid="12">
                
                <widget on-tap='cancel'  w-class="13" w-tag="app_a-widget-btn-rect">
                    {"class":"default","fontsize":24,"color":"","text":"取  消","width":116,"height":45} 
                </widget>

                <div w-class="13" style="text-align: center;">

                    <widget  on-tap="giveOther({{it.id}},{{it.rate}})" w-tag="app_a-widget-btn-rect" >
                        {"class":"default","fontsize":24,"color":"#fdedd7;","text":"确  定","width":116,"height":45} 
                    </widget>
                   
                </div>
            </div>
            <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>