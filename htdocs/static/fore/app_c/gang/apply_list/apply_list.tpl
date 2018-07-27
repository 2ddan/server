<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">    
    <div w-class="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" style="top: -25px;">{"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7" style="z-index:1">{"icon":"pendant"} 
        </widget>
        
        <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" style="z-index: 1;">
            {"icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"申请列表","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>

        <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 506px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
                {{let Common = _get("app/mod/common").exports.Common}}
                {{let Pi = _get("app/mod/pi").exports.Pi}}
                {{for i, v of it1.apply_list}}
                {{if v}}
    
    
                {{let img = ''}}

                {{: img = (Pi.pictures['playerhead'+(v.head || v.career_id)])}}
                <div w-class="81" w-sid="81">
                    <widget w-class="82" w-tag="app_a-widget-bg_frame-bg" w-sid="82">
                        {"bgName":"bg_frame19"} 
                    </widget>
    
                    <widget w-class="84" w-tag="app_a-widget-head-friend" w-sid="84">
                        {"url":{{img}},"quality":{{v.role_quality}},"type":"player","prop":{{v?v:0}},"level":{{v.level}},"color":" #b5e8ff"}
                    </widget>
                    
                    <div w-class="86" w-sid="86">
                        <span w-class="87" w-sid="87">{{Common.fromCharCode(v.name)|| v.role_id}}</span>
                        <widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                            {"icon":{{"vip_lv_" + (it1.vip_advantage[v.vip].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP" + v.vip}},"top":0,"left":0} 
                        </widget>

                        <widget w-class="91" w-tag="app_a-widget-power-power" w-sid="91">
                            {"type":2,"top":16,"left":52,"power":{{v.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
                        </widget>
                    </div>
    
    
                    <div w-class="93" w-sid="93">
                        <widget {{if it1.gangData.post < 3}} on-tap='disposeApplyClick("{{1+","+v.role_id+","+i}}")' {{end}} w-class="94" w-tag="app_a-widget-btn-rect" w-sid="94">
                            {"class":"hl","fontsize":18,"color":"#fdedd7;","text":"同 意","width":84,"height":32} 
                        </widget>
    
                        <widget {{if it1.gangData.post < 3}} on-tap='disposeApplyClick("{{2+","+v.role_id+","+i}}")' {{end}} w-class="95" w-tag="app_a-widget-btn-rect" w-sid="95">
                            {"class":"default","fontsize":18,"color":"#fdedd7;","text":"忽 略","width":84,"height":32} 
                        </widget>
                    </div>
                </div>
                {{end}}
                {{end}}
            </div>

            {{if it1.gangData.post == 1}}
            <div style="position:absolute;width:130px;height:34px;bottom:17px;right: 30px;">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
                    {"icon":"text_bg_1","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
                </widget>
                <widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;">
                    {"index":"true","index1":{{it1.gangExpandData.is_auto}}}
                </widget>
                <div style="position:absolute;left:40px;height:34px;width:90px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">自动通过</div>
                <div style="position:absolute;width:130px;height:34px;left:0;top:0;" on-tap="openAutoJoin"></div>
            </div>
            <app_a-widget-pic_other-pic_other on-tap="funInfo" style="position: absolute;right: 6px;bottom: 24px;">
                {"icon":"help"}
            </app_a-widget-pic_other-pic_other>
            {{end}}
        </div>

    </div>