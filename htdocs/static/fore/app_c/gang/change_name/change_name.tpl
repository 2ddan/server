{{let player = _get("app/mod/db").exports.data.player}}
<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
				{"icon":"tips_top"} 
			</widget>
			<widget w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" on-tap='closeCover'>
				{"icon":"close"} 
			</widget>
			<widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">
				{"icon":"pendant"} 
			</widget>
			<widget w-class="33" w-tag="app_a-widget-pic_text-pic_text" w-sid="33">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"修改公会名","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"} 
			</widget>
			<widget w-class="18" w-tag="app_a-widget-bg_frame-bg" w-sid="18">
				{"bgName":"bg_frame23"} 
			</widget>
			<div w-class="20" w-sid="20">
				<widget w-class="8" w-tag="app_a-widget-pic_other-pic_other" w-sid="8"></widget>
				<span w-class="22" w-sid="22">公会名称</span>
				<div w-class="24" w-sid="24"></div>
				<widget w-class="21" w-tag="app_a-widget-input-input" w-sid="21"  ev-input-text="getFocusInput" ev-input-blur="upDataInputValue" length="10">
					{"type":"text","placeholder":"请输入公会名_","length":10,"text":"","id":"gangname"} 
				</widget>
			</div>
			{{let b = it1.guild_base.rename > player.diamond ? 1: 0}}
			<widget w-class="31" w-tag="app_a-widget-btn-rect" w-sid="31"  on-tap="changNameClick({{b}})">
				{"class":{{ b ? "disabled" : "hl"}},"fontsize":18,"color":"#fdedd7;","text":"确 定","width":110,"height":40} 
			</widget>
			<widget w-class="32" w-tag="app_a-widget-coin-coin" w-sid="32" style="color:{{b ? '#fe3636' : '#ffd8a6'}}">
				{"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.guild_base.rename}}],"color":"#f0f0f0"} 
			</widget>
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>