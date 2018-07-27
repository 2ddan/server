{{let career_id = it1.player.career_id}}
{{let Pi = it1.Pi}}
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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"自动转换","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div style="width: 450px;height: auto;position: absolute; top: 26px;left: 45px;padding-bottom: 87px;padding-top: 27px;">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="s20" class="shadow6" style="top:0;height:auto;position:relative;padding: 13px 0 10px;">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame23"} 
                </widget>
               
                <div style="position: relative;display: inline-block;vertical-align: middle;">
                    {{let prop = it1.Pi.sample[ it1.resolve_prop[0][0]]}}
                    {{let img = Pi.pictures[prop.icon]}}
                    <widget w-tag="app_a-widget-prop-base" >
                        {"prop":{{prop}},"url":{{img}},"color":"#ffeee2","count":"none","width":80,"height":80,"name":"none" }
                    </widget>
                    <widget data-desc="已拥有" w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: -12px;z-index: 3;left: 20px;">
                        {"icon":"text_has","width":80,"height":61}
                    </widget>
                </div>
                <div style="position: relative;margin: 0px 40px -16px;display: inline-block;vertical-align: middle;width: 40px;">
                    <app_a-widget-btn_pic-btn_pic style="top: -38px;">
                        {"icon":"light_arraw","width":40}
                    </app_a-widget-btn_pic-btn_pic>
                </div>
                <div style="position: relative;display: inline-block;width:80px;">
                    {{let prop = it}}
                    {{let img = Pi.pictures[prop.icon]}}
                    <div style="position:relative;color:#51e650;font-size:18px;display:inline-block;margin-right:20px;vertical-align: middle;">
                        <widget w-tag="app_a-widget-prop-base" style="position: relative;" >
                            {"prop":{{prop}},"url":{{img}},"color":"#ffeee2","count":"none","width":80,"height":80,"name":"none" }
                        </widget>
                        <span style="position: absolute;top:20px;left:80px;">x{{it.count || 1}}</span>
                    </div>
                </div>
            </div>
            <widget on-tap="cancel"  w-tag="app_a-widget-btn-rect" style="position: absolute;left:50%;margin-left:-58px;bottom:20px;z-index:2">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"确 定","width":116,"height":45} 
            </widget>    
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>