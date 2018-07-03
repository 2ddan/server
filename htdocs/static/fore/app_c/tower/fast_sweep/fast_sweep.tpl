
<div style="position:absolute;left:50%;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;background-color:rgba(0,0,0,.5);color:#FFF;margin-left:-50%;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
	<div style="width:455px;height:684px;top: 113px;position:relative;margin:0 auto">
        {{let appCfg = _get("app/mod/db").exports.data}}
        {{let Util = _get("app/mod/util").exports.Util}}
        {{let player = appCfg.player}}
        {{let Pi = _get("app/mod/pi").exports.Pi}}
        {{let cfg = _get("app/mod/pi").exports.cfg}}
        {{let Common = _get("app/mod/common").exports.Common}}
        {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
        {{let tower_fast_sweep = cfg.tower_fast_sweep.tower_fast_sweep}}
        {{let tower_base = cfg.tower_base.tower_base}}
        {{let flag = 0}}
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:455px;height:620px">
            {"bgName":"bg_frame38"}
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:610px;left:-28px;width:505px">
            {"icon":"tips_bottom"}
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:-18px;left:-23px;width:497px">
            {"icon":"tips_top"}
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:7px;left:-14px">
            {"icon":"pendant"}
        </widget>
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;transform: translate(-50%);top: -22px;width:181px;height:31px;font-family: mnjsh;font-size: 20px;">
            {"icon":"cover_title","width":181,"height":31,"textCfg":"gangCoverTitle","text":"扫 荡","fontSize":22} 
        </widget>
            
        <widget on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic" style="top:-26px;right: -22px;z-index: 2;">
            {"icon":"close"} 
        </widget>
		<div style="position: absolute;left:50%;width:450px;height:620px;margin-left: -225px;z-index:1; overflow:hidden">
			
            {{if it1.sweep_total_time >= Util.serverTime(1)}}
            <div style="position:absolute;top:35px;left:155px">
                <span style="position:relative;display:inline-block;font-family: mnjsh;font-size:18px;letter-spacing:1px;color:#f6e1c5">剩余总时间:</span>
                <app-widget-cdtime ev-countdownend="cdEnd" style="position:relative;display:inline-block;color:#2eeb9d;font-size:16px;font-weight:600">
                    {"cd_time":{{(it1.sweep_total_time - 0)*1000}},"now_time":{{Util.serverTime()}} }
                </app-widget-cdtime>
            </div>
            {{end}}

            <div w-class="faset_sweep_bg" style="position:absolute;top: 80px;left: -5px;">
                <div style="position:absolute;top:75px;left:-15px;height:71px;width:458px;background:url(../images/attr_bg5.png)"></div>
                <div style="position:absolute;top:210px;left:-15px;height:71px;width:458px;background:url(../images/attr_bg5.png)"></div>
                <div style="position: absolute;width: 450px;text-align:left;left: 5px;top: 30px;">
                    {{let thisFloor = 20}}
                    {{for i in tower_fast_sweep}}
                        {{if it1.floor_point>=tower_fast_sweep[i].florr[1]}}

                            {{let opened = ""}}
                            {{if it1.sweep_award[i-1]}}
                                {{: opened = 'opened'}}
                            {{elseif i > thisFloor}}
                                {{: opened = ''}}
                            {{elseif !it1.sweep_award[i-1] && Util.serverTime() - it1.start_sweep_time*1000 >= it1.fastSweepTime[i-1]*1000}}
                                {{: opened = "open"}}
                            {{elseif Util.serverTime() - it1.start_sweep_time*1000 < it1.fastSweepTime[i-1]*1000 || (Util.serverTime() - it1.start_sweep_time*1000 <= it1.fastSweepTime[i-2]*1000 && Util.serverTime() - it1.start_sweep_time*1000 >= it1.fastSweepTime[i-1]*1000)}}
                                {{: opened = ''}}
                                {{: thisFloor = i}}
                            {{end}}

                            {{let bglight = !it1.sweep_award[i-1] && Util.serverTime() - it1.start_sweep_time*1000 >= it1.fastSweepTime[i-1]*1000 ? 1 : 0}}
                            {{:flag = bglight ? bglight : flag}}
                            <div style="width:20%;height:126px;position:relative;display:inline-block;">
                                <span class="shadow" style="width:100%;height:15px;color:#f1cb9c;text-align:center;position:absolute;font-family: mnjsh;font-size:16px;letter-spacing:1px">{{tower_fast_sweep[i].florr[0] +"-"+ tower_fast_sweep[i].florr[1]}}层</span>
                                <app_a-widget-box-box style="position:absolute;width: 50px;height: 45px;top: 20px;left: 10px;">
                                    {"state":{{opened}},"bglight":{{bglight}},"type":1,"width":70,"height":70}
                                </app_a-widget-box-box>
                                {{if thisFloor==i && (it1.fastSweepTime[i-1]*1000 + it1.start_sweep_time*1000) > Util.serverTime()}}
                                
                                <div style="position:absolute;top:82px;left:-5px;width:94px;height:23px;background:url(../images/attr_bg4.png) no-repeat center"></div>
                                <app-widget-cdtime ev-countdownend="cdEnd" style="position: absolute;top: 82px;font-size: 17px;left: 20px;color:#d63d28">
                                    {"cd_time":{{ it1.fastSweepTime[i-1]*1000 + it1.start_sweep_time*1000 }},"now_time":{{Util.serverTime()}} }
                                </app-widget-cdtime>
                                {{end}}
                            </div>
                        {{end}}
                    {{end}}
                </div>
            </div>

           
            {{let limit = tower_base.free_sweep_limit > player.vip}}

            {{if limit || !limit && !it1.cost_diamond}}
            <app_a-widget-btn-rect {{if flag}}on-tap="getSweepAward"{{end}} style="width:115px;height:45px;position:absolute;right:{{ it1.cost_diamond ? 65 : 167}}px;bottom:40px;line-height: 24px;">
                {"text":{{it1.start_sweep_time ? "领 取" : "已领取"}},"class":{{flag ? "hl" : "disabled"}}}
            </app_a-widget-btn-rect>

            {{end}}
            
            {{if it1.cost_diamond}}
            <div data-desc="快速领取" style="width:116px;height:45px;position:absolute;left:{{limit ? 56 : 167}}px;bottom:40px;line-height: 24px;text-align:center">
                <div style="width:130px;height:20px;position:absolute;left:-7px;bottom:55px;">
                    <app-widget-text-text style="vertical-align: text-bottom;margin-left:2px;position:relative;display: inline-block;">{"text":{{"VIP"+tower_base.free_sweep_limit}},"textCfg":"leaderVip"}</app-widget-text-text>
                    <div style="display: inline-block;vertical-align: middle;position:relative;color:#f5ce9c;font-family:mnjsh;font-size:16px;">免费快速领取</div>
                </div>
                <app_a-widget-btn-rect on-tap="fastSweep" style="position:relative;left:0;top:0;line-height: 24px;">
                    {"text":{{it1.start_sweep_time ? "立即领取" : "已领取"}},"class":{{it1.start_sweep_time ? "hl" : "disabled"}}}
                </app_a-widget-btn-rect>
                {{if it1.cost_diamond}}
                <app_a-widget-coin-coin style="display:inline-block;margin-top: -3px;vertical-align: middle;">
                    {"icon":"diamond","text":[{{Math.ceil(it1.cost_diamond)}}],"color":"#e92525","left":7}
                </app_a-widget-coin-coin>

                {{if !limit}}
                <widget w-tag="app_a-widget-line-line" style="left: 0;top:57px;left: 8px;width:100px;height:3px;">
                    {"line":"line_15"} 
                </widget>
                {{end}}
                {{end}}
            </div>
            {{end}}
		</div>
	</div>
</div>