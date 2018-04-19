<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
        {{let Pi = _get("app/mod/pi").exports.Pi}}
        {{let Common = _get("app/mod/common").exports.Common}}
        {{let player = _get("app/mod/db").exports.data}}
        {{let career_id = player.player.career_id}}
        {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
        {{let role_list = it1.initData.role_info_list}}
        {{let Util = _get("app/mod/util").exports.Util}}
        <div w-class="3" w-sid="3">
            <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" style="top: -25px;">{"icon":"tips_top"} 
            </widget>
            <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7" style="z-index:2">{"icon":"pendant"} 
            </widget>
            <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" style="z-index: 1;">
                {"guide":"returnTo","icon":"close"} 
            </widget>
    
            <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"BOSS提醒","textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
            </widget>
    
            <app_a-widget-rank-rank_title style="position: absolute;top: 0px;left: -8px;width: 102%;height: 50px;">{"keys":["BOSS","等级","提醒状态"],"split": [30, 33,34],"fontSize":20}</app_a-widget-rank-rank_title>
    
            <div style="position: absolute;width: 461px;height: 75%;left: -8px;top: 70px;color: rgb(255, 255, 255);overflow: hidden;">
                <widget w-tag="app_a-widget-line-line" style="position: absolute;top: 1px;left: -14px;z-index: 1;width: 104%;">
                    {"line":"line_13"} 
                </widget>
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top: -12px;width: 464px;height: 336px;">
                    {"bgName":"bg_frame23"}
                </widget>
                <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: -1px;left: -14px;z-index: 1;width: 104%;">
                    {"line":"line_13"} 
                </widget>
                <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 97%;color: rgb(255, 255, 255);top: 6px;">
                    {{for i,v of it1.initData.boss_info}}
                        {{let boss_id = it1.initData.boss_info[i][0]}}
                        <div style="width:100%;height:50px;position:relative;">
                            {{let name = it1.boss_base[i].name}}
                            {{let level = v[1]}}
                            {{let index = player.publicboss.tip_arr[v[0]] ? player.publicboss.tip_arr[v[0]] : 0}}

                            <span style="width:30%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;position: relative;display: inline-block;vertical-align: top;">{{name}}</span>

                            <span style="width:34%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;vertical-align: top;">{{level}}</span>

                            {{if it1.player.level >= level}}
                            <span style="width:35%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">
                                <widget on-tap="setTips({{v[0]}})" w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;top:10px">
                                    {"index":1,"index1":{{index}}}
                                </widget>
                                复活时提醒
                            </span>
                            {{else}}
                            <span style="width:34%;height:100%;position: relative;display: inline-block">
                                <app_a-widget-text-text style="position:absolute;top: 15px;left: -10px;right: 0;margin: 0 auto;">
                                    {"text":"等级不足","textCfg":"heroEquipGray","fontSize":20}
                                </app_a-widget-text-text>
                            </span>
                            {{end}}
                            
                            <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 0px;width: 100%;left: 0;">
                                {"line":"line_1"} 
                            </widget> 
                        </div>
                    {{end}}
                </div>
            </div>
        </div>
    </div>