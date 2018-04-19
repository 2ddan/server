{{let Common = _get("app/mod/common").exports.Common}}
{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let Util = _get("app/mod/util").exports.Util}}

<div style="position: absolute;width: 100%;height: 100%;z-index:2;left: 50%;margin-left: -270px;">
    {{let root = _get("pi/ui/root").exports}}

    <div style="position: absolute;width: 330px;height: 23px;bottom: 30px;left: 105px;">
        <widget  w-tag="app_a-widget-pic_text-pic_text" style="text-align: center;position: absolute;top: 0px;left: 0px;font-size: 18px;color: #ffd8a6;font-family: mnjsh;">
            {"icon":"little_tips_bg","text":"每天3:00将未分配的装备返回给归属者","width":345,"height":23,"top":2} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
            {"icon":"remind"} 
        </widget>
    </div>
    
    <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 492px;height: 630px;left: 50%;top: 65px;color: #fff;margin-left: -247px;">
        {{for i,v of it1.initData.distribute_award_info}}
            {{if !v[6]}}
            <div style="width: 448px;height: 127px;position: relative;left: 0;right: 0;margin: 0 auto;margin-bottom: 10px;">
                <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:448px;height:127px;left:0px;top:0px;">
                    {"type":2,"height":20,"width":30}
                </widget>
                {{let kill_time = Util.arrDate(v[1][1]*1000)}}
                {{let today_time = Util.arrDate(Util.serverTime())}}
                {{let dayFlag = undefined}}
                {{if kill_time[2] < today_time[2]}}
                    {{: dayFlag = "昨天"}}
                {{elseif kill_time[2] == today_time[2]}}
                    {{: dayFlag = "今天"}}
                {{end}}
                <span style="position: absolute;left: 125px;font-size: 18px;color: #fde7ca;top: 3px;">击杀时间:{{kill_time[3]}}:{{if (kill_time[4]+"").length == 1}}0{{kill_time[4]}}{{else}}{{kill_time[4]}}{{end}}({{dayFlag}})</span>

                {{let killName = null}}
                {{for m,n of it1.initData.role_info_list}}
                    {{if v[3] == n[0]}}
                    {{: killName = n[1].name}}
                    {{end}}
                    {{if v[3] == appCfg.player.role_id}}
                    {{: killName = "我"}}
                    {{end}}
                {{end}}
                <span style="position: absolute;left: 315px;z-index: 1;top: 3px;font-size: 18px;color: #fde7ca;">归属:{{checkTypeof(killName,"Array") ? Common.fromCharCode(killName) : killName}}</span>

                {{let boss_level = 0}}
                {{let boss_name = undefined}}
                {{let boss_index = 0}}
                {{for h,k of it1.initData.boss_info}}
                    {{if v[1][0] == k[0]}}
                        {{: boss_level = k[1]}}
                        {{: boos_name = it1.boss_base[k[4]].name}}
                        {{: boss_index = k[4]}}
                    {{end}}
                {{end}}
                <img src="../images/boss_head_{{boss_index - 0 + 1}}.png" style="position:absolute;left:0px;top:0px;z-index:1" />
                <app_a-widget-pic_text-pic_text style="top:65px;position:absolute;left:-5px;color: #ffffff;font-family:mnjsh;    z-index: 2;">
                    {"icon":"boss_leve_bg","width":39,"height":39,"align":"center","marginLeft":0,"text":{{boss_level}},"textCfg":"","space":2,"fontSize":18,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>

                <app_a-widget-pic_text-pic_text style="top:71px;position:absolute;left:13px;color: #fde7ca;font-family:mnjsh;z-index: 1;">
                    {"icon":"boss_name_bg","width":108,"height":27,"align":"center","marginLeft":0,"text":{{boos_name}},"textCfg":"","space":2,"fontSize":18,"top":0,"left":0} 
                </app_a-widget-pic_text-pic_text>

                {{let prop = v[2][1]}}
                {{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(it1.player.career_id)][0]}}
                {{let icon = Pi.pictures[_icon]}}
                {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                <app_a-widget-prop-base style="position:absolute;margin-right:10px;font-size: 18px;left: 125px;top: 30px;">
                    {"prop":{{prop}},"url":{{icon}},"width":68,"height":68,"count":"none","name":{{name}},"bg":1}
                </app_a-widget-prop-base>
                
                {{let apply_flag = 0}}
                {{for m,n of v[5]}}
                    {{if n == it1.player.role_id}}
                    {{: apply_flag = 1}}
                    {{end}}
                {{end}}


                {{if v[3] == it1.player.role_id}}
                    {{if v[6]}}
                    <span style="position:absolute;right: 25px;top: 10px;">已分配</span>
                    {{else}}
                    <app_a-widget-btn-rect style="position:absolute;right: 20px;top: 40px;" on-tap="sendList({{v[0]}})">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"分  配","width":116,"height":45,"marginLeft":0} 
                    </app_a-widget-btn-rect>
                    {{end}}
                {{else}}
                    {{if !v[6]}}
                        {{if apply_flag}}
                        <app_a-widget-btn-rect style="position:absolute;right: 20px;top: 40px;">
                            {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已申请","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{else}}
                        <app_a-widget-btn-rect style="position:absolute;right: 20px;top: 40px;" on-tap="apply({{v[0]}})">
                            {"class":"default","fontsize":24,"color":"#fdedd7;","text":"索  要","width":116,"height":45,"marginLeft":0} 
                        </app_a-widget-btn-rect>
                        {{end}}
                    {{else}}
                        <span style="position:absolute;right: 25px;top: 10px;">已分配</span>
                    {{end}}
                {{end}}
            </div>
            {{end}}
        {{end}}
    </div>
</div>