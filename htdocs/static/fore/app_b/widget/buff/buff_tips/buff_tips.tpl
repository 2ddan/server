<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
				{"icon":"tips_top_1"} 
			</widget>
			<widget w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" on-tap='cancel'>
				{"icon":"close"} 
			</widget>
			<widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">
				{"icon":"pendant"} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"} 
			</widget>
            <widget class="shadow6" w-class="24" w-tag="app_a-widget-pic_text-pic_text" w-sid="24">
                {"icon":"skill_name_bg","width":124,"height":25,"align":"center","marginLeft":3,"text":"已激活效果","textCfg":"","space":0,"fontSize":20} 
            </widget>

			{{let prop = it1.buffCfg[it]}}
			{{let url = it1.Pi.pictures[prop.icon]}}
			<div w-class="16" w-sid="16">
                <app_a-widget-prop-base  style="position:relative">
                    {"prop":{{prop}},"url":{{url}},"width":84,"height":84,"count":"none","name":"none","bg":0}
                </app_a-widget-prop-base>
                <app_a-widget-text-text style="vertical-align: middle;position: relative;left: 50%;transform: translateX(-50%);">
                    {"textCfg":"heroEquip","fontSize":22,"text":{{prop.name}} }
                </app_a-widget-text-text>
            </div>
            
			<div  w-class="22" w-sid="22">
				<widget w-class="23" w-tag="app_a-widget-bg_frame-bg" w-sid="23">
					{"bgName":"bg_frame32"} 
				</widget>
				<div class="shadow6" w-class="21" w-sid="21">
                    效果描述：{{prop.desc}}
                </div>
            </div>
            
			<widget w-class="25" w-tag="app_a-widget-btn-rect" w-sid="25" on-tap='cancel'>
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"确 定","width":116,"height":45} 
            </widget>
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>

	