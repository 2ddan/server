<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
				{"icon":"tips_top"} 
			</widget>
			<widget w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" on-tap='goback'>
				{"icon":"close"} 
			</widget>
			<widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">
				{"icon":"pendant"} 
			</widget>
			<widget w-class="33" w-tag="app_a-widget-pic_text-pic_text" w-sid="33">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"详 情","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7"></widget>
		<div w-class="10" w-sid="10">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="69" w-tag="app_a-widget-title-single" w-sid="69">
                {"padding":5,"type":9,"width":124,"text":"详情内容","textCfg":"","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
            </widget>

			<div class="center_h" style="position: absolute;width:100%;height:380px;overflow: hidden;top: 60px;bottom:15px;z-index: 1;">
                <div scroller="1" style="position: absolute;width: 110%;height:100%;overflow-y: auto;overflow-x: hidden;text-align: justify;">
                    <div style="position:relative;width:430px;color:{{it.color || '#b27d5c'}};font-size:{{it.fontSize || 15}}px;font-family:{{it.fontFamily}};font-weight:{{it.fontWeight}};padding-left:9px;text-align:left">
                        <pi-ui-html>{{it.content}}</pi-ui-html>
                    </div>
                </div>
            </div>
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>

