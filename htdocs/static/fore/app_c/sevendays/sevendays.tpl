
<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
	{{let root = _get("pi/ui/root").exports}}
	{{let data = it1.sevenday_title[it1.currDay]}}
	{{let act = it1.list[1] }}
	
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
		{"text":"七日活动","coin":["money","diamond"],"left":33,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
	</widget>
	<div style="width:540px;height:276px;position: absolute;top:40px;left:50%;margin-left:-270px;text-align:center;z-index: 1;">
		<img style="position: absolute;top:-34px;left:0;" src="./images/bg.png"/>

		{{for i, v of [1, 2, 3, 4, 5, 6, 7]}}
		<app_c-sevendays-day_title style="top:{{i%2?-22:0}}px;left:{{i*72 + 23}}px">
			{"index":{{i+1}},"curr":1,"bag":{{v== 2 ?[act[1][0].goods,it1.record["2"]]:v==7?[act[6][0].goods,it1.record["7"]]:0 }} }
		</app_c-sevendays-day_title>		
		{{end}}

		<div style="position:absolute;top:220px;left:147px;width:241px;height:41px;background-image:url(./images/title_bg_3.png);text-align:center;line-height: 74px;">
			<app_a-widget-text-text style="position:relative;display:inline-block;">
				{"text":"新服狂欢七天乐","fontSize":30,"textCfg":"rebelInfo","space":0 }
			</app_a-widget-text-text>
			<img style="position:absolute;top:1px;left:35px;" src="./images/light.png"/>
			<img style="position:absolute;bottom:1px;right:14px;" src="./images/light.png"/>
		</div>
	</div>
	<div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">
			
		

		<div style="width:100%;position:absolute;left:0;top:320px;bottom:15px">
			<div class="line_6" style="position: absolute; top: 26px; z-index: 4;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change = 'changeColumns'>
				{"cur":{{it1.curr||0}},
				"margin":2,
				"left":25,
				"top":-2,
				"arr":[
					{"tab":"app_c-sevendays-task","btn":{"text":"{{data[0]}}","act_type":"1","type":"border"},"tip_keys":[{{"sevendays."+it1.currDay+".1"}}]},
					{"tab":"app_c-sevendays-task","btn":{"text":"{{data[1]}}","act_type":"2","type":"border"},"tip_keys":[{{"sevendays."+it1.currDay+".2"}}]},
					{"tab":"app_c-sevendays-task","btn":{"text":"{{data[2]}}","act_type":"3","type":"border"},"tip_keys":[{{"sevendays."+it1.currDay+".3"}}]},
					{"tab":"app_c-sevendays-buy","btn":{"text":"{{data[3]}}","act_type":"4","type":"border"},"tip_keys":[{{"sevendays."+it1.currDay+".4"}}]}
				],
				"type":1 }
			</app-widget-tab-navtab>
		</div>
		
	</div>
</div>
