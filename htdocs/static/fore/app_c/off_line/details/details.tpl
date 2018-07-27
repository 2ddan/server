<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.7);" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let player = _get("app/mod/db").exports.data}}
    {{let career_id = player.player.career_id}}
    <div w-class="3" w-sid="3" style="font-family:mnjsh;">
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

        <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"经验加成","textCfg":"gangCoverTitle","space":0,"fontSize":21,"top":4,"left":0} 
        </widget>

        <div style="position: absolute;width: 424px;height: 296px;left: 13px;top: 29px;color: rgb(255, 255, 255);">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width: 424px;height: 296px;">
                {"bgName":"bg_frame32"}
            </widget>

            <span class="shadow" style="position:absolute;width:100%;height:46px;line-height:48px;font-size:18px;color:#fde7ca;padding-left: 25px;">经验=基础经验X(1+经验加成)</span>
            <app_a-widget-line-line style="position:absolute;top:46px;left:0px;right:0px;margin:0 auto">
                {"line":"line_1"} 
            </app_a-widget-line-line>

            <span class="shadow" style="position:absolute;width:100%;height:73px;font-size:17px;color:#fde7ca;top:49px;line-height: 43px;padding-left: 25px;">
                基础经验:
                <span style="color:#51e650;position: absolute;top: 23px;width: 100%;left: 25px;">由等级, 关卡进度决定</span>
            </span>
            <app_a-widget-line-line style="position:absolute;top:122px;left:0px;right:0px;margin:0 auto">
                {"line":"line_1"} 
            </app_a-widget-line-line>

            <span class="shadow" style="width:100%;height:40px;position:absolute;top:126px;font-size:17px;color:#fde7ca;padding-left: 25px;line-height: 40px;">经验加成:</span>
            <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 424px;height: 125px;color: rgb(255, 255, 255);top: 166px;padding-left: 25px;">
                {{for k in it1.gain_bonus}}
                {{let _color = it1.gain_bonus[k][0] == 0 ? "#919191" : "#51e650"}}
                <div style="width:100%;height:25%;position:relative;font-size:17px;color:{{_color}};">
                    <pre style="height:100%;position:relative;display:inline-block;font-family: mnjsh;margin: 0;">
                        {{ k + " +" + (Math.floor(it1.gain_bonus[k][0] * 100) + "% ")}}
                    </pre>

                    {{if it1.gain_bonus[k][0] == 0}}
                        <span style="height:100%;position:relative;display:inline-block">({{"上限:"+it1.gain_bonus[k][2] * 100 + "%," +it1.gain_bonus[k][1]}})</span>
                    {{elseif it1.gain_bonus[k][0] > 0 && it1.gain_bonus[k][0] < it1.gain_bonus[k][2]}}
                        <span style="height:100%;position:relative;display:inline-block">({{"上限:"+it1.gain_bonus[k][2] * 100 + "%"}})</span>
                    {{end}}

                    {{let func = (k == "元  宝:" ? "diamondAward" : "gotoFunction('"+it1.gain_bonus[k][3]+"')")}}
                    {{if it1.gain_bonus[k][0] == 0 || (it1.gain_bonus[k][0] >= 0 && it1.gain_bonus[k][0] < it1.gain_bonus[k][2])}}
                    <widget w-tag="app_a-widget-btn-rect" on-tap={{func}} style="position: absolute;right: 44px;top: 3px;">
                        {"class":"hl","fontsize":15,"color":"#f7f2ef;","text":"前  往","width":54,"height":20}
                    </widget>
                    {{else}}
                        <div w-class="chose_1" style="position: absolute;top: 5px;right: 59px;"></div>
                    {{end}}
                </div>

                {{end}}
            </div>
        </div>
    </div>
</div>