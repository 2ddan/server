<div maxId="22" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let career_id = it1.player.career_id}}
    <img w-class="3" src="app_c/gest/image/gest_fb_bg.png" w-sid="3" style="width:100%"/>
    <app_b-widget-title-title w-class="9" w-sid="9">
        {"text":"心法奇遇","coin":["money","diamond"],"left":5,"top":15,"r":[["money",0],["dimond",0],["dimond",0]],"type":""} 
    </app_b-widget-title-title>
    <div w-class="10" w-sid="10">
        <div on-tap="gotoFb('fb')" w-class="11" w-sid="11">
            <img w-class="14" src="app_c/gest/image/gest_text2.png" w-sid="14"/>
            <app_a-widget-pic_text-pic_text w-class="16" w-sid="16">
                {"icon":"gest_title_bg","width":"327","height":"104"}  
            </app_a-widget-pic_text-pic_text>
            <div style="width:180px;height:70px;position:absolute;left: 255px;top: 98px;font-size:16px;color:#9b9d8f;font-family:mnjsh;">{{it1.gest_base.fb_des}}</div>
            <app-widget-tip-tip style="left:200px;top:60px;">
                {"tip_keys":["explore.gest.fb"] }
            </app-widget-tip-tip>
        </div> 
        <div on-tap="gotoFb('inherit')" w-class="12" w-sid="12">
            <img w-class="15" src="app_c/gest/image/gest_text1.png" w-sid="15"/>
            <app_a-widget-pic_text-pic_text w-class="17" w-sid="17">
                {"icon":"gest_title_bg","width":"327","height":104} 
            </app_a-widget-pic_text-pic_text>
            <div style="width:180px;height:70px;position:absolute;left: 255px;top: 98px;font-size:16px;color:#9b9d8f;font-family:mnjsh;">{{it1.gest_base.ch_des}}</div>
            <app-widget-tip-tip style="left:200px;top:60px;">
                {"tip_keys":["explore.gest.inherit"] }
            </app-widget-tip-tip>
        </div>
        <div w-class="13" w-sid="13">
            <app_a-widget-title-single w-class="18" w-sid="18" style="line-height: 35px;">
                {"padding":16,"type":"11","width":"138","text":"可能获得","textCfg":"gangCoverTitle","fontSize":"22","space":"-2","color":"#b27d5c"} 
            </app_a-widget-title-single>

            <app_a-widget-pic_text-pic_text w-class="19" w-sid="19">
                {"icon":"maybe_bg","width":"424","height":"95","align":"center","marginLeft":"3","text":"","textCfg":"","space":"0","fontSize":"12","top":"0","left":"0"} 
            </app_a-widget-pic_text-pic_text>

            <div w-class="20" w-sid="20">
                {{for i, v of it1.gest_base.award}}
                {{let prop = it1.Pi.sample[v]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let n = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                <app_a-widget-prop-base w-class="21" w-sid="21">
                    {"width":"84","height":84,"prop":{{prop}},"url":{{url}},"count":"none","name":"none","bg":"","quality":{{prop.quality}},"bottom":"16","top":"25","right":"25"}
                </app_a-widget-prop-base>
                {{end}}
            </div>

        </div>
    </div>
    <app_a-widget-pic_other-pic_other style="position: absolute;width: 100%;bottom: 0px;">{"icon":"bg_bottom"}</app_a-widget-pic_other-pic_other>
    <app_a-widget-btn_pic-btn_pic on-tap="goback" style="position: absolute;right: 5px;bottom: 10px;">{"icon":"btn_back"}</app_a-widget-btn_pic-btn_pic>
</div>