<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2">
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
                {"icon":"tips_top"} 
			</widget>
			<widget on-tap='cancel' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">
                {"icon":"close"} 
			</widget>
			<widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">
                {"icon":"pendant"} 
			</widget>
			<widget w-class="6" w-tag="app_a-widget-pic_text-pic_text" w-sid="6">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"购买次数","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
        </div>
        
		<div w-class="8" w-sid="8">
			<div style="opacity:0.95">
				<widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
					{"bgName":"bg_frame26"} 
				</widget> 
				<widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
					{"bgName":"bg_frame23"} 
				</widget>
            </div>
			<div w-class="12" w-sid="12">
                <div style="font-family:mnjsh;font-size:24px;">{{it1.type+"挑战次数"}}</div>
                <div style="position:relative;width:200px;text-align:left;left: 170px;margin-top: 20px;line-height: 28px;">
                    <div>当前次数：{{it1.has_count}}</div>
                    <div>还可购买：{{it1.max_buy ? it1.max_buy-it1.already_buy :"无限制"}}</div>
                </div>
            </div>
			
            <div w-class="13" w-sid="13">
                <div w-class="14" w-sid="14" on-tap="add(-10)">
                    -10
                </div>
                <div w-class="14" w-sid="14" on-tap="add(-1)">
                    -1
                </div>
               
                <app_a-widget-pic_text-pic_text w-class="15" w-sid="15">
                    {"icon":"resource_bar","width":136,"height":37,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"text": {{it1.buy_count}}}
                </app_a-widget-pic_text-pic_text>

                <div w-class="14" w-sid="14" on-tap="add(1)">
                    +1
                </div>
                <div w-class="14" w-sid="14" on-tap="add(10)">
                    +10
                </div>
            </div>

            <widget w-class="16" w-tag="app_a-widget-coin-coin" w-sid="16">
                {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it1.cost}}],"color":"#ffd8a6"} 
            </widget>
			<widget on-tap="ok" w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
				{"class": "default" ,"fontsize":24,"color":"#fdedd7;","text":"购 买"} 
			</widget>
			
		</div>
		<widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
		</widget>
	</div>
</div>