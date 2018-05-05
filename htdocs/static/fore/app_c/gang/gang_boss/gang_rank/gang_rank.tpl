<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
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

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"本周试炼排名","textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
        </widget>
        <app_a-widget-rank-rank_title style="position: absolute;top: 0px;left: -8px;width: 102%;height: 50px;">
            {"keys":["排名","门派","进度","奖励"],"split": [25, 25, 25, 25],"fontSize":20}
        </app_a-widget-rank-rank_title>


        <div style="position: absolute;width: 461px;height: 75%;left: -8px;top: 70px;color: rgb(255, 255, 255);overflow: hidden;">
            <widget w-tag="app_a-widget-line-line" style="position: absolute;top: 1px;left: -14px;z-index: 1;width: 104%;">
                {"line":"line_13"} 
            </widget>
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top: -12px;width: 464px;height: 400px;">
                {"bgName":"bg_frame23","height":400}
            </widget>
            <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: -1px;left: -14px;z-index: 1;width: 104%;">
                {"line":"line_13"} 
            </widget>
            {{let rank_info = it1.gang_rank.rank_info[1]}}
            <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 97%;color: rgb(255, 255, 255);top: 6px;">
                {{for q, p of rank_info}}
                <div style="width:100%;height:50px;position:relative;">
                    {{if p.record[0] == it1.gang_rank.own_rank}}
                        <app_a-widget-pic_other-pic_other style="position: absolute;left: 50%;margin-left: -190px;width: 380px;height: 50px;">{"icon":"my_rank_bg_1"}</app_a-widget-pic_other-pic_other>
                    {{end}}
                    <span style="width:20%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;position: relative;display: inline-block;margin-left: 6px;">
                        {{q + 1}}
                    </span>
                    
                    <span style="width:32%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{p.gang_name}}</span>

                    <span style="width:20%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">{{p.record[0]}}关</span>

                    <span style="width:24%;height:100%;line-height:50px;color:#fde7ca;font-size:18px;text-align:center;font-family:mnjsh;position: relative;display: inline-block;">
                        <app_a-widget-coin-coin style="width: 100%;text-align: center;">
                            {"icon":"contribute","text":[{{it1.Common.numberCarry(it1.guild_rank[q + 1].contribute, 10000)}}],"height":24,"width":24}
                        </app_a-widget-coin-coin>
                    </span>
                    
                    <widget w-tag="app_a-widget-line-line" style="position: absolute;bottom: 0px;width: 100%;left: 0;">
                        {"line":"line_1"} 
                    </widget>
                </div>
                {{end}}            
            </div>
        </div>
        <div style="position: absolute;text-align:left;width:190px;height: 23px;bottom: 20px;color:#ffd8a6;left: 50%;margin-left: -80px;">
            <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 200px;left: 9px;">
                {"icon":"little_tips_bg","text":"奖励每周一通过邮件发放","width":190,"height":23,"top":2} 
            </widget>
            <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>
    </div>
</div>