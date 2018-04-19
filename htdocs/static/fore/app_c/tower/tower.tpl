<div class="ui_bg" style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;overflow:hidden;">
	{{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}    
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
    {{let tower_base = cfg.tower_base.tower_base}}
    {{let random_award = tower_base.random_award}}
    {{let vipInfo = cfg.vip_advantage.vip_advantage[player.vip]}}
    {{let place = [[10,147],[110,295],[205,120]]}}
	<app_b-widget-title-title style="z-index:1">{"text":"天庭秘境","coin":["money","diamond"],"left":17,"top":12}</app_b-widget-title-title>
    
    <div style="position:absolute;width:540px;height:900px;left:50%;margin-left:-270px;">
        <div class="line_6" style="position: absolute; top: 97px; z-index: 4;left: 0;width: 540px;"></div>			
        <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
            {"bgName":"bg_frame21"} 
        </widget>

        <div w-class="tower_bg" style="left:50%;margin-left:-243px;top:113px;">
            <div style="width:100%;height:399px;position:absolute;top:0px;left:0px;overflow:hidden;">
                {{for i,v of it1.floorsNum}}
                <div style="width:28px;height:65px;position:absolute;left:{{place[i][1]}}px;top:{{place[i][0]}}px">
                    <app_a-widget-pic_text-pic_text w-class="tower_num">
                        {"icon":"fun_name_bg","width":62,"height":124,"text":""}
                    </app_a-widget-pic_text-pic_text>
                    {{:v = v < 10 ? " " + v + " " : v}}
                    <div class="center_h" style="font-family: mnjsh;color:rgb(86, 72, 66);font-size:20px;top: 60px;left: 16px;width: 30px;transform:translateY(-50%);text-align:center">第{{v}}层</div>
                    {{if it1.floor_point + 1 == v}}
                    <div class="towerNowPosAnim" style="position: absolute;top: -3px;left: 6px;"></div>
                    {{end}}
                </div>
                {{end}}
            </div>
            {{let open = it1.floor_point >= it1.specificNum[0] && !it1.buy_record[it1.specificNum[1]] ? "open" : "" }}
            {{let bglight = it1.floor_point >= it1.specificNum[0] && !it1.buy_record[it1.specificNum[1]] ? 1:0}}
            <app_a-widget-box-box on-tap="getAward" style="width: 90px;height: 90px;position: absolute;left: 50%;margin-left: 152px;bottom: 23px;">
                {"state":{{open}},"bglight":0,"tip_keys":["explore.tower.box"],"type":1,"width":90,"height":90}
            </app_a-widget-box-box>
            <div class="shadow" style="width:112px;height:28px;line-height:28px;font-family: mnjsh;letter-spacing:1px;font-weight:600;text-align:center;font-size:15px;color:#ffd8a6;position:absolute;right:-3px;bottom:8px;background:url(./images/attr_bg2.png)">{{it1.specificNum[0]}}层奖励</div>

            <app_a-widget-btn-sq on-tap="awardDetails" style="top:6px;position:absolute;right:10px;" on-tap="awardDetails">
                {"text":"  奖 励   详 情 ","class":"hl","fontsize":16}
            </app_a-widget-btn-sq>
        </div>

        <div style="width: 100%;height: 165px;position: absolute;top: 560px;background:url(./images/attr_bg3.png) no-repeat center">
            
            <widget w-tag="app_a-widget-title-single" style="height:17px;position:absolute;left:50%;margin-left:-56px;top:-18px;">
                {"padding":12,"type":12,"width":124,"text":"可能获得","textCfg":"singleTitle","fontSize":20,"space":-4,"color":"#b27d5c","wear":0} 
            </widget>

            <div style="width:100%;height:80px;position:absolute;top:35px;z-index:1;text-align: center;">
                {{for i,v of random_award}}
                    {{let prop = Pi.sample[v]}}
                    {{let url = Pi.pictures[prop.icon]}}
                    <div style="position:relative;width:70px;height:76px;display:inline-block;margin: 0 10px;">
                        <app-widget-prop-base_prop-base_prop on-tap='showPropInfo("{{v}}")' style="position: relative;display:inline-block;width: 70px;height: 70px">
                            {"prop":{{prop}},"url":{{url}} }
                        </app-widget-prop-base_prop-base_prop>
                        <div style="position:absolute;top:75px;left:-15px;background:url(./images/attr_bg4.png);width:94px;height:23px"></div>
                        <div style="position:absolute;font-family: mnjsh;color:#dedbdb;bottom:-20px;font-size:16px;width:140px;left:50%;margin-left:-70px;line-height:18px;height:18px;">{{prop.name}}</div>
                    </div>
                {{end}}
            </div>

        </div>

        <div style="width:100%;height:88px;position:absolute;top:735px;left:0px;">
            <app_a-widget-btn-rect on-tap="startSweep" style="width:65px;height:28px;position:absolute;left:105px;top:0px;line-height: 24px;">
                {"text":"扫   荡","class":"hl","type":{{it1.floor_point < 10 || (it1.use_sweep_count >= vipInfo.tower_sweep_times + vipInfo.tower_diamond_sweep_times) ? "gray" : "orange"}},"tip_keys":["explore.tower.sweep"]}
            </app_a-widget-btn-rect>
            <div class="shadow" style="width:150px;height:20px;position:absolute;color:#e7e09e;font-size:12px;text-align:center;top: 45px;left: 87px;">
                {{if it1.use_sweep_count < vipInfo.tower_sweep_times}}
                    免费扫荡次数:{{vipInfo.tower_sweep_times - it1.use_sweep_count}}
                {{elseif it1.use_sweep_count >= vipInfo.tower_sweep_times && it1.use_sweep_count <= vipInfo.tower_sweep_times + vipInfo.tower_diamond_sweep_times}}
                    <app_a-widget-coin-coin style="left: 20px;bottom:5px;position: absolute;font-size: 16px;width: 100px;">{"icon":"diamond","text":{{[tower_base.sweep_spend[it1.use_sweep_count-vipInfo.tower_sweep_times >= 3 ? 3 : it1.use_sweep_count-vipInfo.tower_sweep_times]]}},"color":"#e92525","left":7}</app_a-widget-coin-coin>
                {{else}}
                    今日扫荡次数:0
                {{end}}
                {{if it1.start_sweep_time}}
                    <span style="position: absolute;top: 14px;width: 100%;left: 0;">扫荡中...</span>
                {{end}}
            </div>

            <app_a-widget-btn-rect on-tap="startFight" style="width:61px;height:27px;position:absolute;right:97px;top:0px;line-height: 24px;">
                {"guide":"tower_ch","text":"挑   战","class":"default","tip_keys":["explore.tower.fight"]}
            </app_a-widget-btn-rect>            
        </div>
	</div>
</div>
