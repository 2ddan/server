{{let appCfg = _get("app/mod/db").exports.data}}
{{let vip_advantage = _get("cfg/c/vip_advantage").exports.vip_advantage}}


<div  class="bg_1" style="width:448px;padding:20px;height:auto;bottom:2px;position:absolute;left:0;top: 45px;z-index:1;">
	<div style="width:103%;height:100%;overflow:hidden;">
		{{if it1.allProp[1]}}
		<app-widget-step style="position: absolute;width:105%;height: initial;top:20px;left: 20px; bottom: 20px;line-height: 22px;">
			{"widget":"app_b-bag-main-equip_frame","arr":{{it1.allProp[1]}},"initCount":32,"addCount":10,"needIndex":0 }
		</app-widget-step>
		{{end}}
	</div>
	{{let space = "0"}}
	{{if it1.allProp[1]}}
	{{:space = it1.allProp[1].length}}
	{{end}}
	<div style="width:100%;height:55px;line-height:initial;position:absolute;bottom:-55px;left:0;display:flex;align-items:center;">
		<div style="display:inline-block;height:25px;color:#d4ce91;font-size:15px;text-indent:20px;line-height:26px;margin-top:10px">
			容量：<span class="resource_bar" style="display:inline-block;text-align:center;text-indent:0;width:98px">
				{{space}}/{{vip_advantage[appCfg.player.vip].equip_count}}
			</span>
		</div>
		<div class="add_btn" style="width: 25px;height: 25px;position: absolute;margin-left: 5px;z-index: 1;left: 144px;top:20px;" on-tap="extensionBag"></div>
		<app_a-widget-btn-rect on-tap="openRL" style="position:relative;left: 170px;top: 10px;">
			{"guide":"reclaim","text":"熔 炼","class":"hl","fontSize":24,"tip_keys":["bag.reclaim"],"width":116,"height":45}
		</app_a-widget-btn-rect>
	</div>
</div>


