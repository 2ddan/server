{{let appCfg = _get("app/mod/db").exports.data}}
{{let player = appCfg.player}}
{{let Common = _get("app/mod/common").exports.Common}}
{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
<div class="bag_m" group="secondary" style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:80px;">
	<app_b-widget-title-title style="top:0;">{"text":"背 包","coin":["money","diamond"],"left":33,"top":11}</app_b-widget-title-title>
	<div style="width: 448px;position: absolute;left: 50%;top: 100px;bottom: 15px;margin-left: -245px;">
		<app-widget-tab-navtab style="position:absolute;width:100%;top:0;bottom:0;left:0px;top: 0;line-height:45px;" ev-change = "changeColumns">
			{"cur":0,
			"btn_box":"btnBag",
			"left":0,
			"top":"0",
			"margin":5,
			"arr":[
				{"tab":"app_b-bag-main-prop_equip", "btn":{"text":"装 备","type_m":"equip","type":"border","fontSize":24}},
				{"tab":"app_b-bag-main-prop_other", "btn":{"text":"道 具","type_m":"other","type":"border","fontSize":24}}
			],
			"type":0}
		</app-widget-tab-navtab>
	</div>

	<div class="line_6" style="position:absolute;top: 131px;left: 50%;width:538px;z-index: 3;margin-left: -270px;"></div>
</div>
