<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;overflow:hidden;">
	{{let root = _get("pi/ui/root").exports}}		
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;z-index:3">
		{"text":"神 兵","coin":["money","diamond"],"left":33,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
	</widget>
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let player = appCfg.player}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
	<div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">
		
		
		<div style="width:100%;position:absolute;left:0;top:108px;bottom:15px">
			<div class="line_6" style="position: absolute; top: 26px; z-index: 4;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change='changeColumns'>
				{
				"cur":{{it1.index ? it1.index : 0}},					
				"btn_box":"btnBag",
				"left":26,
				"top":"-1",
				"margin":2,
				"arr":[
					{"tab":"app_b-magic-treasure-treasure","btn":{"text":"铸 魂","type":"border","type_m":"treasure","fontSize":19},"tip_keys":{{["role.magic_activate.bg"]}} },
					{"tab":"app_b-magic-magic","btn":{"text":"进 阶","type":"border","type_m":"magic","fontSize":19},"tip_keys":{{["role.magic_activate.gm"]}} }
					
				],
				"type":0}
			</app-widget-tab-navtab>
		</div>
	</div>	
	<app_b-widget-bg-goback on-tap="goback"></app_b-widget-bg-goback>
</div>
