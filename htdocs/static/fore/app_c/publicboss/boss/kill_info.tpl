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
        <widget w-class="8" on-tap="{{it1.open_type == 'rank_info' ? 'gobackrank' : 'goback'}}" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" style="z-index: 1;">
            {"guide":"returnTo","icon":"close"} 
        </widget>

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":{{it1.rank_bang ? "伤害排行" : "击杀记录"}},"textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
        </widget>
        {{if it1.rank_bang}}
            <app_a-widget-rank-rank_title style="position: absolute;top: 0px;left: -8px;width: 102%;height: 50px;">{"keys":["排名","玩家","伤害"],"split": [40, 25,30],"fontSize":20}</app_a-widget-rank-rank_title>
        {{else}}
            <app_a-widget-rank-rank_title style="position: absolute;top: 0px;left: -8px;width: 102%;height: 50px;">{"keys":["击杀时间","姓名","战力"],"split": [40, 25,30],"fontSize":20}</app_a-widget-rank-rank_title>
        {{end}}

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
                {{if it1.open_type == "rank_info"}}
                    {{for q,p of it1.rank_bang[it1.kill_info_index]}}
                    <div style="width:100%;height:50px;position:relative;">
                        {{if p.role_id == it1.player.role_id && it1.aaaaaaa}}
                            <app_a-widget-pic_other-pic_other style="position: absolute;left: 21px;width: 452px;">{"icon":"my_rank_bg"}</app_a-widget-pic_other-pic_other>
                        {{end}}
                        <span style="width:33%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;position: relative;display: inline-block;">
                            {{q + 1}}
                        </span>
                        
                        <span style="width:38%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{p.name}}</span>

                        <span style="width:22%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{Common.numberCarry(p.damage,1000000)}}</span>
                        
                        <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 0px;width: 100%;left: 0;">
                            {"line":"line_1"} 
                        </widget>
                    </div>
                    {{end}}
                {{else}}
                    {{for i,v of it1.initData.kill_info[it1.kill_info_index]}}
                        <div style="width:100%;height:50px;position:relative;">
                            {{for n in role_list}}
                                {{if n == v[0]}}

                                {{let time = Util.arrDate(v[1]*1000)}}
                                <span style="width:33%;height:100%;line-height:50px;color:#51e650;font-size:18px;text-align:center;position: relative;display: inline-block;">
                                    {{time[3]}}:{{if (time[4]+"").length == 1}}0{{time[4]}}{{else}}{{time[4]}}{{end}}:{{if (time[5]+"").length == 1}}0{{time[5]}}{{else}}{{time[5]}}{{end}}
                                </span>

                                {{let name = role_list[n].name}}
                                {{:name = checkTypeof(name,"Array") ? Common.fromCharCode(name) : name}}
                                <span style="width:38%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{name}}</span>

                                <span style="width:22%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{Common.numberCarry(role_list[n].fight_power,1000000)}}</span>
                                
                                <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 0px;width: 100%;left: 0;">
                                    {"line":"line_1"} 
                                </widget> 
                                {{end}}
                            {{end}}
                        </div>
                    {{end}}
                {{end}}
                
            </div>
        </div>
    </div>
</div>