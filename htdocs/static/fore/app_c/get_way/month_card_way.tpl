<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 4;" w-sid="2">
	<div w-class="3" w-sid="3" style="height:390px;margin-top:-195px;">
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
		
		<div w-class="10" w-sid="10" style="height:214px">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"}  
			</widget>

			{{let prop = {} }}
			{{let url = "app_b/widget/icons/card_icon.png"}}

			<div style="position:absolute;width:78px;height:100px;left:50%;margin-left:-39px;top:24px;">
				<app_a-widget-prop-base  style="position:relative">
					{"prop":{{prop}},"url":{{url}},"quality":6,"width":78,"height":78,"count":"none","name":"none","bg":0}
				</app_a-widget-prop-base>
				<app_a-widget-text-text style="position: absolute;top:80px;left:18px;">
				{"textCfg":"heroEquip","fontSize":22,"text":"铂金卡" }
				</app_a-widget-text-text>	
			</div>

			<div style="position: absolute;width:250px;height:52px;color:#ffd8a6;top:146px;left:60px;">
				<div style="height:25px;line-height:25px;position:relative;">
					<app_a-widget-pic_other-pic_other style="position:absolute;left:-25px;top:2px;">
						{"icon":"remind"}
					</app_a-widget-pic_other-pic_other>
					<div style="height:25px;line-height:25px;">{{it.desc[0]}}</div>
				</div>

				<div style="height:25px;line-height:25px;position:relative;">
					<app_a-widget-pic_other-pic_other style="position:absolute;left:-25px;top:2px;">
						{"icon":"remind"}
					</app_a-widget-pic_other-pic_other>
					<div style="height:25px;line-height:25px;">{{it.desc[1]}}</div>
				</div>
			</div>

			<div style="position: absolute;width: 267px;height: 150px;top: 214px;left: 14px;">
				<widget w-class="23" w-tag="app_a-widget-bg_frame-bg" w-sid="23">
					{"bgName":"bg_frame32"} 
				</widget>
				<widget w-class="24" w-tag="app_a-widget-pic_text-pic_text" w-sid="24" style="top:34px;">
					{"icon":"skill_name_bg","width":124,"height":25,"align":"center","marginLeft":3,"text":"获取途径","textCfg":"","space":0,"fontSize":20} 
				</widget>
				<widget w-tag="app_a-widget-btn-rect" w-sid="31"  on-tap="gotoCard" style="position: absolute;;width: 110px;height: 41px;left:50%;margin-left:-55px;top:84px;">
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"前 往","width":110,"height":40} 
				</widget>
			</div>
			
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>