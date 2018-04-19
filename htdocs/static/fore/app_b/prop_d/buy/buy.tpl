<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 5;" w-sid="2">
    {{let common = _get("app/mod/common").exports.Common}}
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
                {"icon":"tips_top_1"} 
			</widget>
			<widget on-tap='cancel' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">
                {"icon":"close"} 
			</widget>
			<widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">
                {"icon":"pendant"} 
			</widget>
			<widget w-class="6" w-tag="app_a-widget-pic_text-pic_text" w-sid="6">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{it1.title}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
            {{let prop = it1.Pi.sample[it1.id]}}
			<app_a-widget-prop-base w-class="12" w-sid="12" style="left: 86px;top: 67px;">
                {"prop":{{prop}},"url":{{it1.Pi.pictures[ prop.icon]}},"width":78,"height":78,"count":"none","name":"none","bg":0}
            </app_a-widget-prop-base>
			<div  w-class="19" w-sid="19">
                    
                <app_a-widget-text-text style="vertical-align: middle;">
                {"textCfg":"heroEquip","fontSize":22,"text":{{prop.name}} }
                </app_a-widget-text-text>

                <div w-class="20" w-sid="20">
                    拥有:<span style="padding:0 5px;">{{common.numberCarry(it1.have,10000)}}</span>
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
                    {"icon":"resource_bar","width":136,"height":37,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"text": {{it1.num}}}
                </app_a-widget-pic_text-pic_text>

                <div w-class="14" w-sid="14" on-tap="add(1)">
                    +1
                </div>
                <div w-class="14" w-sid="14" on-tap="add(10)">
                    +10
                </div>
            </div>

            <widget w-class="16" w-tag="app_a-widget-coin-coin" w-sid="16">
                {"icon":{{it1.coin}},"width":25,"height":21,"left":3,"text":[{{it1.cost}}],"color":"#ffd8a6"} 
            </widget>
			<widget on-tap="ok" w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
				{"class":  "hl" ,"fontsize":24,"color":"#fdedd7;","text":{{it1.btn_name}}} 
			</widget>
			
		</div>
		<widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
		</widget>
	</div>
</div>