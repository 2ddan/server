
<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
	{{let root = _get("pi/ui/root").exports}}
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
		{"text":"门 派","coin":["money","diamond", 150005],"left":33,"top":16,"width":540,"type":"contribute","width":{{root.getWidth()}} } 
	</widget>
	<div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">
		{{let appCfg = _get("app/mod/db").exports.data}}
		{{let player = appCfg.player}}
		{{let Common = _get("app/mod/common").exports.Common}}
		{{let Common_m = _get("app_b/mod/common").exports.Common_m}} 
		{{let Pi = _get("app/mod/pi").exports.Pi}}
		{{let gang = appCfg.gang.data}}
		
		<div style="width:100%;position:absolute;left:0;top:108px;bottom:15px">
			<div class="line_6" style="position: absolute; top: 26px; z-index: 4;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change = 'changeColumns'>
			{{let tab = it1.gang_tab=="info"?0:(it1.gang_tab=="member_list"?1:(it1.gang_tab=="build"?2:(it1.gang_tab=="event"?3:4)))}}   

			{"cur":{{tab}},
			"btn_box":"btnBag",
			"left":26,
			"top":"-1",
			"margin":2,
			"arr":[
				{"tab":"app_c-gang-hall_info-hall_info","btn":{"text":"门派信息","type":"border","type_m":"info","fontSize":24},"tip_keys":["gang.info"]},
				{"tab":"app_c-gang-hall_member_list-hall_member_list","btn":{"text":"门派成员","type":"border","type_m":"member_list","fontSize":24},"tip_keys":["gang.member"]},
				{"tab":"app_c-gang-hall_gang_build-hall_gang_build","btn":{"text":"门派建设","type":"border","type_m":"build","fontSize":24}, "tip_keys":["gang.build"]},
				{"tab":"app_c-gang-hall_event-hall_event","btn":{"text":"门派事件","type":"border","type_m":"event","fontSize":24} }
			],
			"type":0}
			</app-widget-tab-navtab>
		</div>
		
	</div>
</div>
