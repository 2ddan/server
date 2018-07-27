
<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,0.5);" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="4" w-sid="4">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">{"icon":"close"} 
            </widget>
            <widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">{"icon":"pendant"} 
            </widget>
            <widget w-class="33" w-tag="app_a-widget-pic_text-pic_text" w-sid="33">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"野外地图","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        <div w-class="10" w-sid="10">
            <widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
                {"bgName":"bg_frame26"} 
            </widget>
            {{let curr = it1.wild_mission_key.slice(0,it1.wild.wild_max_mission)}}
            <div w-class="6">
                <widget  w-tag="app_a-widget-bg_frame-bg" style="position: absolute;top:0;left:0;width:100%;height:100%">
                    {"bgName":"select_map_bg"} 
                </widget>
                <widget w-class="7" w-tag="app_a-widget-line-line" >
                    {"line":"line_14"} 
                </widget>
                <div style="width:105%;height:625px;position:absolute;top:12px;left:9px;overflow-x: hidden;overflow-y: auto;text-align: left;">
                    {{let i = 0}}
                    {{let len = Math.ceil(curr.length/10)}}
                    {{while i < len}}
                    <app-widget-tab-tab_btn on-tap="selectMission({{i}})" style="width: 103px;height:43px;margin:5px 0px;display:inline-block">
                        {"layout":0,"bType":1,"cfg":{"text":{{i*10+1 + "-" + (i+1)*10}},"type":"border","type_m":"normal","fontSize":24},"select":{{i == it1.tabSwitch}},"type":{{i == it1.tabSwitch ? "border active":"border"}} }
                    </app-widget-tab-tab_btn>
                    {{:i++}}
                    {{end}}
                </div>
            </div>
            <div w-class="8">
                {{let miss = curr.slice(it1.tabSwitch*10,(it1.tabSwitch+1)*10)}}
                {{let guide_id = curr.length<10 ? curr[curr.length - 2] : curr[Math.floor((curr.length-1)/10)*10-1 ]}}
                {{for i,v of miss}}
                {{let guide = it1.wild_mission[v]}}
                
                <div w-class="11" on-tap="selectGuide({{v}})">
                    {{if v == guide_id}}
                    <app_a-widget-text-text style="position:absolute;left:5px;top:12px;z-index: 1;">
                        {"text":"推荐","textCfg":"rechargeGreen","space":0,"fontSize":18}
                    </app_a-widget-text-text>
                    {{end}}
                    {{if v == it1.wild.wild_max_mission}}
                    <app_a-widget-text-text style="position:absolute;left:7px;top:12px;z-index: 1;">
                        {"text":"Boss","textCfg":"missionHot","space":-3,"fontSize":18}
                    </app_a-widget-text-text>
                    {{end}}
                    <widget style="position:absolute;top:0;left:0;" w-tag="app_a-widget-pic_text-pic_text" >
                        {"icon":{{it1.mission == v ? "area_bg" : "area_bg_1"}},"width":338,"height":42,"top":12,"left":-44,"text":" ","textCfg":"wildMission","space":-2,"fontSize":18} 
                    </widget>
                    <app_a-widget-text-text style="position:absolute;left:56px;top:12px;">
                        {"text":{{"第"+ v +"关"+" " + guide.guard_name.replace(",","")}},"textCfg":"wildMission","space":-2,"fontSize":18}
                    </app_a-widget-text-text>
                    {{if it1.wild.wild_history == v}}
                    <widget style="position:absolute;top:50%;left: 258px;margin-top: -12.5px;" w-tag="app_a-widget-pic_text-pic_text" >
                        {"icon":"hang_up","width":68,"height":25,"top":12,"text":" "} 
                    </widget>
                    {{else}}
                    <div class="shadow10" style="position:absolute;top:0;left: 257px;font-size:17px;color:#ffd8a6;font-family:mnjsh;line-height: 43px;">
                        怪物{{guide.random_boss_level}}级
                    </div>
                    {{end}}
                </div>
                
                {{end}}
                <app_a-widget-btn-rect on-tap="gotoGuide" style="position:absolute;bottom:20px;right:7px;">
                    {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"传 送","width":116,"height":45,"marginLeft":0} 
                </app_a-widget-btn-rect>
            </div>
               
            
           
        </div>
        <widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">{"icon":"tips_bottom"} </widget>
    </div>
</div>