{{let appCfg = _get("app/mod/db").exports.data}}
{{let player = appCfg.player}}
{{let friend_battle = appCfg.friend_battle}}
{{let Common = _get("app/mod/common").exports.Common}}
{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let rank_base = cfg.rank_base.rank_base}}
<div class="rank" group="secondary" style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
	<app_b-widget-title-title style="top:0;z-index:9;position:absolute">{"text":"排行榜","coin":["money","diamond"],"left":33,"top":11}</app_b-widget-title-title>
	
	<div style="width:492px;position:absolute;left:50%;top:72px;bottom:34px;margin-left:-245px;">
		<app_a-widget-line-line style="position: absolute;left: -23px;top: 33px;z-index: 3;pointer-events: none;">
			{"line":"line_7"} 
		</app_a-widget-line-line>
		<app_a-widget-bg_frame-bg style="position: absolute;left: 0px;top: 45px;width: 100%;height: 666px;">				{"bgName":"bg_frame21"} 
		</app_a-widget-bg_frame-bg>
		
		<app-widget-tab-navtab style="position:absolute;width:100%;height:89%;top:0;bottom:0;left:0px;top: 0;line-height:45px;" ev-change = "changeTab">
			{"cur":0,
			"btn_box":"btnBag",
			"left":0,
			"top":"6",
			"margin":2,
			"btn_width":96,
			"btn_height":42,
			"arr":[
				{"tab":"app_c-rank-main-main", "tip_keys":["rank.base"], "btn":{"text":"战力榜","type_m":"fight_power_rank","type":"border","fontSize":24}},
				{"tab":"app_c-rank-main-main", "tip_keys":["rank.base"], "btn":{"text":"等级榜","type_m":"level_rank","type":"border","fontSize":24}},
				{"tab":"app_c-rank-main-main", "tip_keys":["rank.base"], "btn":{"text":"神装榜","type_m":"equip_rank","type":"border","fontSize":24}},
				{"tab":"app_c-rank-main-main", "tip_keys":["rank.base"], "btn":{"text":"神兵榜","type_m":"treasure_rank","type":"border","fontSize":24}},
				{"tab":"app_c-rank-main-main", "tip_keys":["rank.base"], "btn":{"text":"灵宠榜","type_m":"pet_rank","type":"border","fontSize":24}}
			],
			"type":1}
		</app-widget-tab-navtab>

		<div class="shadow" style="width: 155px;height: 24px;position: absolute;left: -5px;bottom: 50px;font-family: mnjsh;color: #fde7ca;text-align: center;line-height: 24px;font-size: 20px;z-index:2;">我的排名:
			<span style="position: relative;display: inline-block;top: 1px;color: #fff;">
				{{if it1.baseData[it1.tabSwitch][2]}}
					{{it1.baseData[it1.tabSwitch][2]}}
				{{else}}
					未上榜
				{{end}}
			</span>
			<app_a-widget-pic_text-pic_text style="position: absolute;bottom: -2px;left: 5px;z-index: -1;right: 0;margin: 0 auto;">
				{"icon":"little_tips_bg","width":138,"height":27,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":16,"top":0,"left":0} 
			</app_a-widget-pic_text-pic_text>
		</div>

		<div class="shadow" style="width: 155px;height: 24px;position: absolute;left: 170px;bottom: 50px;font-family: mnjsh;color: #fde7ca;text-align: center;line-height: 24px;font-size: 20px;z-index:2;">赠送次数:
			<span style="position: relative;display: inline-block;top: 1px;color: #fff;">
				{{(rank_base.limit - player.rank_count)}}
			</span>
			<app_a-widget-pic_text-pic_text style="position: absolute;bottom: -2px;left: 5px;z-index: -1;right: 0;margin: 0 auto;">
				{"icon":"little_tips_bg","width":138,"height":27,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":16,"top":0,"left":0} 
			</app_a-widget-pic_text-pic_text>
		</div>
		<div class="shadow" style="width: 155px;height: 24px;position: absolute;left: 344px;bottom: 50px;font-family: mnjsh;color: #fde7ca;text-align: center;line-height: 24px;font-size: 20px;z-index:2;">数据刷新有延迟
			
			<app_a-widget-pic_text-pic_text style="position: absolute;bottom: -2px;left: 5px;z-index: -1;right: 0;margin: 0 auto;">
				{"icon":"little_tips_bg","width":138,"height":27,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":16,"top":0,"left":0} 
			</app_a-widget-pic_text-pic_text>
		</div>
	
		
	</div>
</div>
