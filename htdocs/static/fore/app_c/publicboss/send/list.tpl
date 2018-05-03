<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,0.6);" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let award = it1.initData.distribute_award_info}}
    {{let _award = null }}
    {{for i,v of award}}
        {{if v[0] == it1.award_index}}
            {{: _award = v}}
        {{end}}
    {{end}}

    <div w-class="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">{"icon":"pendant"} 
        </widget>
        <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8">
            {"guide":"returnTo","icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"分配奖励","textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
        </widget>
        
        <div style="position: absolute;width: 450px;height: 75%;left: 0px;top: 30px;color: rgb(255, 255, 255);overflow: hidden;">
            <widget w-tag="app_a-widget-line-line" style="position: absolute;top: 1px;z-index: 1;width: 104%;">
                {"line":"line_13"} 
            </widget>
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top: -12px;width: 450px;height: 410px;">
                {"bgName":"bg_frame23"}
            </widget>
            <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 1px;left: -14px;z-index: 1;width: 104%;">
                {"line":"line_13"} 
            </widget>
            <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 450px;height: 97%;color: rgb(255, 255, 255);top: 6px;">
                {{let _index = 0}}
                {{let list_info = it1.initData.role_info_list}}
                {{for m,n of _award[4]}}
                
                    {{for k in list_info}}
                        {{let kill_gang_name = undefined}}
                        {{if _award[3] == n}}
                            {{: kill_gang_name = checkTypeof(list_info[k].gang_name,"Array") ? Common.fromCharCode(list_info[k].gang_name) : list_info[k].gang_name}}
                        {{end}}
                        
                        {{if k == n && n != _award[3]}}
                            {{: _index = _index + 1}}
                            {{let info = list_info[k]}}
                            <div style="width:100%;height:123px;position:relative;">
                                {{let imgX= Pi.pictures['playerhead'+info.career_id]}}
                                {{let name = checkTypeof(info.name,"Array") ? Common.fromCharCode(info.name) : info.name}}
                                {{let gangName = checkTypeof(info.gang_name,"Array") ? Common.fromCharCode(info.gang_name) : info.gang_name}}
                                <widget w-tag="app_a-widget-head-friend" style="position: absolute;width: 107px;height: 108px;top: 6px;left: 15px;">
                                    {"url":{{imgX}},"top":18.5,"level":{{info.level}},"width":107,"height":108}    
                                </widget>

                                <span style="font-family:mnjsh;font-size:22px;color:#fde7ca;position:absolute;left: 135px;top: 25px;">{{"S"+info.area+" "+name}}</span>
                                
                                <span style="width:auto;height:24px;position:absolute;left:126px;top:64px;">
                                    {{if _award[5].indexOf(k) > -1}}
                                        <app_a-widget-pic_text-pic_text style="position:relative;color: #fff;font-family:mnjsh;width: 67px;height: 24px;display:inline-block;margin-right: 8px;">
                                            {"icon":"want_bg","width":67,"height":24,"align":"center","marginLeft":3,"text":"想 要","textCfg":"","space":2,"fontSize":22,"top":0,"left":0} 
                                        </app_a-widget-pic_text-pic_text>
                                    {{end}}
                                    {{if player.gang.data && player.gang.data.gang_name == gangName}}
                                        <span style="color:#51e650;font-size:18px;position:relative;display:inline-block;vertical-align: top;">同一门派</span>
                                    {{end}}
                                </span>

                                {{if !_award[6]}}
                                <app_a-widget-btn-rect style="position:absolute;right: 20px;top: 35px;" on-tap='sendAward("{{_award[0]}},2,{{n}}")'>
                                    {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"赠  送","width":116,"height":45,"marginLeft":0} 
                                </app_a-widget-btn-rect>
                                {{elseif _award[6] == k}}
                                <span style="width:100px;height:20px;right:20px;text-align:center;">已赠送</span>
                                {{end}}

                                <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 0px;width: 100%;left: 0;">
                                    {"line":"line_1"} 
                                </widget> 
                            </div>
                        {{end}}
                    
                    {{end}}
                {{end}}

                {{if _index == 0}}
                <span style="width:100%;height:50px;position:absolute;top:50px;left:0px;text-align:center;color:#fff;font-size:22px;">暂无可分配人员</span>
                {{end}}
            </div>
        </div>

        <app_a-widget-btn-rect style="position:absolute;left: 60px;bottom: 30px;" on-tap='sendAward("{{_award[0]}},1")'>
            {"class":"default","fontsize":24,"color":"#fdedd7;","text":"自己收下","width":116,"height":45,"marginLeft":0} 
        </app_a-widget-btn-rect>

        {{if _award[5]}}
        <app_a-widget-btn-rect style="position:absolute;right: 60px;bottom: 30px;" on-tap='sendAward("{{_award[0]}},0")'>
            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"快速分配","width":116,"height":45,"marginLeft":0} 
        </app_a-widget-btn-rect>
        {{else}}
        <app_a-widget-btn-rect style="position:absolute;right: 60px;bottom: 30px;">
            {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"快速分配","width":116,"height":45,"marginLeft":0} 
        </app_a-widget-btn-rect>
        {{end}}
    </div>
</div>