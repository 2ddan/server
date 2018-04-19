<div maxId="57" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}    
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"翻翻乐","coin":["money","diamond"],"left":30,"top":15,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}}
    </widget>
   

    <div style="position:absolute;width:540px;height:868px;left:50%;margin-left:-270px">		
		<div style="width:100%;position:absolute;left:0;top:108px;bottom:15px">
            <div class="line_6" style="position: absolute; top: 26px; z-index: 4;"></div>
            <widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
                {"bgName":"bg_frame21"} 
            </widget>
			<app-widget-tab-navtab style="position:absolute;width:100%;top:-6px;bottom:0;left:0px;" ev-change='changeColumns'>
				{
				"cur":0,					
				"btn_box":"btnBag",
				"left":26,
				"top":"-1",
				"margin":2,
				"arr":[
                    {"tab":"app_c-play_card-tab_award", "btn":{"text":"积分奖励","type_m":"award"}},
                    {"tab":"app_c-play_card-tab_view", "btn":{"text":"物品查询","type_m":"view"}}
				],
				"type":0}
			</app-widget-tab-navtab>
		</div>
	</div>	
</div>