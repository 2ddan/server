<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    
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
            {"guide":"returnTo","icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"奖励详情","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>

        <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 94%;left: -8px;top: 10px;color: rgb(255, 255, 255);">
            
            {{for i,v of it1.award_info}}
                <div style="width:464px;height:144px;position:relative;margin-bottom:30px">
                    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:144px">
                        {"bgName":"bg_frame23"}
                    </widget>
                    <img src="../images/light_bottom.png"  style="position:absolute;bottom:-3px;left:0;right:0px;margin:0 auto"/>
                    <app_a-widget-text-text style="position:absolute;top: 15px;left: 25px">
                        {"text":{{v[1]}},"textCfg":"heroEquip","fontSize":26}
                    </app_a-widget-text-text>
                    <div style="width: 95%;height: 100px;overflow-x: hidden;overflow-y: auto;position: absolute;top: 53px;left: 20px;">
                        {{for m,n of v[0]}}
                            {{let prop = Pi.sample[n[0]]}}
                            {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(it1.player.career_id)][0]}}
                            {{let icon = Pi.pictures[_icon]}}
                            {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                            <app_a-widget-prop-base style="position:relative;display:inline-block;margin-right:10px;font-size: 18px;">
                                {"prop":{{prop}},"url":{{icon}},"width":68,"height":68,"count":{{n[1]}},"name":{{name}},"bg":1}
                            </app_a-widget-prop-base> 
                        {{end}}
                    </div>
                </div>
            {{end}}
        </div>
    </div>
</div>