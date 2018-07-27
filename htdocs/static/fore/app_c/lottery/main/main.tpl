
<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
	{{let root = _get("pi/ui/root").exports}}
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
		{"text":"天 书","coin":["money","diamond",{{it1.tabSwtich=="book" ? it1.cost_coin : it1.score_coin}}],"left":33,"top":16,"width":540,"type":{{it1.tabSwtich=="book"?"lottery_token":"lottery_coin"}},"width":{{root.getWidth()}} } 
	</widget>
	{{if it1.lock && it1.lock<3}}
		<div data-desc="抽奖动画" style="width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:4;pointer-events: none;position: absolute;">		
			<div style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(2);z-index:3" class="anim_lottery_{{it1.lock==1 ? 'prop' : 'diamond'}}"></div>
		</div>
	{{end}}
	
	<div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">

		<div style="width:100%;position:absolute;left:0;top:108px;bottom:15px">
			<div class="line_6" style="position: absolute; top: 26px; z-index: 3;"></div>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change = 'changeColumns'>
			{{let tab = it1.tabSwtich=="book" ? 0 : 1}}   
			{"cur":{{tab}},
			"btn_box":"btnBag",
			"left":26,
			"top":"-1",
			"margin":2,
			"arr":[
				{"tab":"app_c-lottery-lottery-lottery","btn":{"text":"天 书","type":"border","type_m":"book","fontSize":24},"tip_keys":["lottery.book"]},
				{"tab":"app_c-lottery-shop-shop","btn":{"text":"积分商城","type":"border","type_m":"shop","fontSize":24} }
			],
			"type":0}
			</app-widget-tab-navtab>
		</div>
		
	</div>
</div>
