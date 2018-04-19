<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;overflow:hidden;">
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let player = appCfg.player}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
	{{let arr = []}}
	{{%强化}}
	{{if it1.function_open["equip_level"].id <= appCfg.open_fun.id}}
	{{:arr.push({"tab":"app_c-forge-level_up-level_up", "btn":{"guide":"level_btn","text":"强 化","type":"border","type_m":"equip_level","fontSize":24},"tip_keys":["equip.level"]})}}
	{{end}}
	{{%宝石}}
	{{if it1.function_open["equip_gem"].id <= appCfg.open_fun.id}}
	{{:arr.push({"tab":"app_c-forge-gem-gem", "btn":{"guide":"gem_btn","text":"宝 石","type":"border","type_m":"equip_gem","fontSize":24},"tip_keys":["equip.diam"]})}}
	{{end}}
	{{%升星}}
	{{if it1.function_open["equip_star"].id <= appCfg.open_fun.id}}
	{{:arr.push({"tab":"app_c-forge-star-star", "btn":{"guide":"star_btn","text":"升 星","type":"border","type_m":"equip_star","fontSize":24},"tip_keys":["equip.star"]})}}
	{{end}}
	{{%锻造}}
	{{if it1.function_open["equip_red_forge"].id <= appCfg.open_fun.id}}
	{{:arr.push({"tab":"app_c-forge-red_equip-red_equip", "btn":{"guide":"red_btn","text":"锻 造","type":"border","type_m":"redEquip","fontSize":24},"tip_keys":["equip.red"]})}}
	{{end}}
	{{%洗练}}
	{{if it1.function_open["equip_red_wash"].id <= appCfg.open_fun.id}}
	{{:arr.push({"tab":"app_c-forge-equip_wash-equip_wash", "btn":{"guide":"wash_btn","text":"洗 炼","type":"border","type_m":"wash","fontSize":24},"tip_keys":["equip.wash"]})}}
	{{end}}
	<div style="position:absolute;width: 100%;height: 100%;">
		<app_b-widget-title-title>{"text":"装 备","coin":["money","diamond"],"left":35,"top":12}</app_b-widget-title-title>
		<div style="width: 540px;position: absolute;left: 50%;margin-left: -270px;top: 100px;bottom: 15px;">
			<div class="line_6" style="position:absolute;top: 26px;z-index: 4;pointer-events: none;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-5px;bottom:0;left:0px;" ev-change = 'changeColumns'>
				{"cur":{{it1.cur ? it1.cur : 0}},
				"btn_box":"btnBag",
				"btn_width":96,
				"btn_height":43,
				"left":25,
				"top":"3",
				"margin":2,
				"arr":{{arr}},
				"type":0}
			</app-widget-tab-navtab>
		</div>
	</div>	

</div>
