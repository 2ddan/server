<div maxId="25" style="position:absolute;width:100%;height:100%;" test="test" w-sid="8" w-sid="8">
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let count = Common.getBagPropById(it.sid)}}
	<div w-class="3" w-sid="3" w-sid="3">
		<widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4" w-sid="4">
			{"icon":"tips_top"} 
		</widget>
		<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" w-sid="5">
			{"icon":"tips_bottom"} 
		</widget>
		<widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6" w-sid="6">
			{"bgName":"bg_frame26"} 
		</widget>
		<widget w-class="9" w-tag="app_a-widget-pic_text-pic_text" w-sid="9">{"icon":"cover_title","width":184,"height":33,"align":"center","marginLeft":3,"text":"物品详情","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":3,"left":0}
		</widget>
		<div w-class="10" w-sid="10">
			<widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">{"bgName":"bg_frame23"} 
			</widget>
			<div w-class="14" w-sid="14">
				{{let img = Pi.pictures[it.icon]}}
				<widget w-class="16" w-tag="app_a-widget-prop-base" w-sid="16">{"width":70,"height":70,"prop":{{it}} ,"url":{{img}},"count":"none","name":"none","bg":0,"quality":1,"bottom":16,"top":25,"right":25} 
				</widget>

				<div w-class="21" w-sid="21">
					<widget w-class="17" w-tag="app_a-widget-text-text" w-sid="17">{"text":{{it.name || ""}},"show":"","space":-2,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
					</widget>
					
					{{if count && count[1].count}}
					<span w-class="20" class="shadow" w-sid="20">拥有: {{count[1].count}}</span>
					{{end}}
				</div>
				<span w-class="22" class="shadow" w-sid="22">{{it.describe ||it.description || ""}}</span>
			</div>

			{{if it.use_mode != "recharge"}}
			{{let _obj = {"default":1,"step":[1,10],"minCount":1,"maxCount":( count ? count[1].count : 0)} }}
			<widget w-class="23" w-tag="app_a-widget-number-number" w-sid="23" on-tap="selectcount">{{_obj}}</widget>
			{{end}}
			<widget w-class="24" w-tag="app_a-widget-btn-rect" w-sid="24" on-tap="usePropx({{count[0]}})">{"class":"default","fontsize":24,"color":"#fdedd7;","text":"使  用","width":110,"height":40,"marginLeft":0} 
			</widget>
		</div>
		<widget w-class="11" w-tag="app_a-widget-pic_other-pic_other" w-sid="11">{"icon":"pendant"} 
		</widget>
		<widget w-class="12" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback" w-sid="12">{"icon":"close"} 
		</widget>
	</div>
</div>