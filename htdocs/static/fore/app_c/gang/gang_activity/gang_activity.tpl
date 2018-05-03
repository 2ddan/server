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
            {"icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"门派任务","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
        </widget>
   
        <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 386px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
            {{for i,v of it.taskSort()}}
                <div style="width:464px;height:112px;position:relative;margin-bottom:18px">
                    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:112px">
                        {"bgName":"bg_frame23"}
                    </widget>
                    <app_a-widget-pic_other-pic_other style="position: absolute;bottom: -4px;left: 0px;right: 0px;margin: auto;">
                        {"icon":"light_bottom"}
                    </app_a-widget-pic_other-pic_other>

                    <app_a-widget-text-text style="position:absolute;top: 27px;left: 106px;">
                        {"text":{{v[0].desc}},"textCfg":"heroEquip","fontSize":22}
                    </app_a-widget-text-text>
                    <img src="../images/gang_task_icon.png" alt="" srcset="" style="position: absolute;left: 20px;top:20px;"/>
                    <div class="shadow" style="position: absolute;width: 200px;height:30px;top:60px;display:flex;justify-content:space-between;font-size:16px;left: 102px;">
                        <div style="line-height: 30px;width:50px;text-align: center;color: #ffd8a6;">奖励:</div>
                        <app_a-widget-coin-coin style="width: 90px;text-align: left;color:#51e650;">
                            {"icon":"contribute","text":{{[v[0].award.gain_contribute]}},"height":24,"width":24}
                        </app_a-widget-coin-coin>
                        <app_a-widget-coin-coin style="width: 90px;text-align: left;color:#51e650;">
                            {"icon":"gang_money","text":{{[v[0].award.gain_guild_money]}},"height":24,"width":24}
                        </app_a-widget-coin-coin>
                    </div>

                    {{if v[1] == 1}}
                    <div style="position:absolute;width:116px;line-height: 24px;text-align: center;right: 24px;top: 20px;color:#f3d6af;">{{v[2] + "/" + v[0].param}}</div>
                    <app_a-widget-btn-rect on-tap='getAward({{v[0].id}})' style="top:47px;position:absolute;right: 24px;">
                        {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
                    </app_a-widget-btn-rect>
                    {{elseif v[1] == 2}}
                    <div style="position:absolute;width:116px;line-height: 24px;text-align: center;right: 24px;top: 20px;color:#f3d6af;">{{v[2] + "/" + v[0].param}}</div>
                    <app_a-widget-btn-rect style="top:47px;position:absolute;right: 24px;">
                        {"text":"领 取","class":"disabled","fontsize":24,"width":116,"height":45}
                    </app_a-widget-btn-rect>
                    {{elseif v[1] == 3}}
                    <app_a-widget-pic_text-pic_text style="top:29px;right:32px;position: absolute;">
                        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
                    </app_a-widget-pic_text-pic_text>
                    {{end}}

                </div>
            {{end}}
        </div>
    </div>
</div>