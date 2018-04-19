<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2" on-tap='cancel'>
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
				{"icon":"tips_top"} 
			</widget>
			<widget w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" >
				{"icon":"close"} 
			</widget>
			<widget w-class="11" w-tag="app_a-widget-pic_other-pic_other" w-sid="11">
				{"icon":"pendant"} 
			</widget>
			<widget w-class="12" w-tag="app_a-widget-pic_text-pic_text" w-sid="12">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"下阶效果","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">
				{"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="22" w-sid="22">
                <div w-class="23" w-sid="23"  class="shadow6">
						{{it1.skill.table[it1.TreasurePhase.skill_id].name }}
                </div>
                <div style="overflow:hidden;width: 100%;height: 80px;"> 技能：{{it.describe}}</div>
            </div>
            <div w-class="18" w-sid="18">
                <widget w-class="15" w-tag="app_a-widget-title-single" w-sid="15" class="shadow6">
                    {"padding":15,"type":9,"width":124,"text":"下阶属性","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                
                <div w-class="16" w-sid="16">
                    <widget w-class="21" w-tag="app_a-widget-bg_frame-bg" w-sid="21">
                        {"bgName":"bg_frame31"} 
                    </widget>

                    {{for i,v in it.attr}}
                    <div w-class="17" w-sid="17"> {{it1.attribute_config[ i ]}}&nbsp;+{{v}} </div>
                    {{end}}

                </div>
            </div>
            
		</div>
		<widget w-class="14" w-tag="app_a-widget-pic_other-pic_other" w-sid="14">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>