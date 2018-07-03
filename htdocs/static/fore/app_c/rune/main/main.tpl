
<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
	{{let root = _get("pi/ui/root").exports}}
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
		{"text":"秘 籍","coin":["money","diamond"],"left":33,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
	</widget>
	<div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">

		<div style="width:100%;position:absolute;left:0;top:108px;bottom:15px">
			<div class="line_6" style="position: absolute; top: 26px; z-index: 4;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change = 'changeColumns'>
			{{let tab = it1.tabSwtich=="books" ? 0 : it1.tabSwtich=="state" ? 1 : 2}}   
			{"cur":{{tab}},
			"btn_box":"btnBag",
			"left":26,
			"top":"-1",
			"margin":2,
			"arr":[
				{"tab":"app_c-rune-books-books","btn":{"text":"秘 籍","type":"border","type_m":"books","fontSize":24},"tip_keys":["role.rune.book"]},
				{"tab":"app_c-rune-state-state","btn":{"text":"修 行","type":"border","type_m":"state","fontSize":24},"tip_keys":["role.rune.state"]},
				{"tab":"app_c-rune-practice-practice","btn":{"text":"经 脉","type":"border","type_m":"practice","fontSize":24},"tip_keys":["role.rune.practice"]}
			],
			"type":0}
			</app-widget-tab-navtab>
		</div>
		
	</div>
</div>
