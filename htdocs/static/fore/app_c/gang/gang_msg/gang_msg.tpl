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
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{it.flag ? "修改公告" : "修改宣言" }},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"} 
			</widget>
			<div w-class="20" w-sid="20">
				<div w-class="24" w-sid="24"></div>
				<widget data-desc="text" w-class="21" w-tag="app_a-widget-input-textarea" w-sid="21" length="{{it.flag ? 64 :32 }}"  ev-input-text="getFocusInput" ev-input-blur="upDataInputValue">
					{"type":"text","placeholder":"请输正确信息_","color":"#885840","length":{{it.flag ? 64 :32 }},"text":{{it1.gangData.gang_notice}},"id":{{it.flag ? "gangnotice" : "gangenounce"}}} 
				</widget>
			</div>
			<widget w-class="31" w-tag="app_a-widget-btn-rect" w-sid="31"  on-tap="clearText" style="left: 55px;">
				{"class":"hl","fontsize":18,"color":"#fdedd7;","text":"清 空","width":110,"height":40} 
			</widget>
			<widget w-class="31" w-tag="app_a-widget-btn-rect" w-sid="31"  on-tap={{it.flag ? "sureNoticeClick" : "sureMsgClick"}} style="right: 55px;">
				{"class":"hl","fontsize":18,"color":"#fdedd7;","text":"确 定","width":110,"height":40} 
			</widget>
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>

