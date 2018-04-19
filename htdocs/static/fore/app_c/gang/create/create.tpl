<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let player = _get("app/mod/db").exports.data.player}}		
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
			</widget>
			<widget on-tap='closeCover' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">{"icon":"close"} 
			</widget>
			<widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">{"icon":"pendant"} 
			</widget>
			<widget w-class="33" w-tag="app_a-widget-pic_text-pic_text" w-sid="33">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"创建公会","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<div style="opacity:0.95">
				<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
					{"bgName":"bg_frame26"} 
				</widget>
				<widget w-class="18" w-tag="app_a-widget-bg_frame-bg" w-sid="18">
					{"bgName":"bg_frame23"} 
				</widget>
			</div>
			
			
			<div w-class="20" w-sid="20">
				<widget w-class="8" w-tag="app_a-widget-pic_other-pic_other" w-sid="8"></widget>
				<span w-class="22" w-sid="22">公会名称</span>
				<div w-class="24" w-sid="24"></div>
				<widget id="gangname" w-class="21" w-tag="app_a-widget-input-input" w-sid="21" length="10"  ev-input-text="getFocusInput" ev-input-blur="upDataInputValue">
					{"type":"text","placeholder":"请输入公会名_","length":10,"text":"","id":"gangname"} 
				</widget>
			</div>
			<div w-class="25" w-sid="25">
				<widget w-class="27" w-tag="app_a-widget-pic_other-pic_other" w-sid="27"></widget>
				<span w-class="28" w-sid="28">公会宣言</span>
				<div w-class="29" w-sid="29"></div>
				<widget w-class="30" w-tag="app_a-widget-input-textarea" w-sid="30" length="32" ev-input-text="getFocusInput" ev-input-blur="upDataInputValue">
					{"type":"text","length":32,"placeholder":"请输入公会宣言_","text":"","id":"gangenounce","color":"#875840"} 
				</widget>
			</div>
			{{let b =  it1.guild_base.create_spend > player.diamond ? 1 : 0}}
			<widget on-tap="createClick({{b}})" w-class="31" w-tag="app_a-widget-btn-rect" w-sid="31">
				{"class": {{ b ? "disabled" : "hl" }},"fontsize":18,"color":"#fdedd7;","text":"创 建","width":110,"height":40} 
			</widget>
			<widget w-class="32" w-tag="app_a-widget-coin-coin" w-sid="32" style="{{if b}} color:#fe3636;{{end}}">
				{"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.guild_base.create_spend}}],"color":"#f0f0f0"} 
			</widget>
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>