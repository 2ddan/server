<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2" on-tap='cancel'>
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
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":{{it1.title}},"textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">
				{"bgName":"bg_frame26"} 
            </widget>
            <div w-class="18" w-sid="18">
                <widget w-class="15" w-tag="app_a-widget-title-single" w-sid="15">
                    {"padding":15,"type":9,"width":124,"text":"基础属性","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                
                <div w-class="16" w-sid="16">
                    <widget w-class="21" w-tag="app_a-widget-bg_frame-bg" w-sid="21">
                        {"bgName":"bg_frame31"} 
                    </widget>
                    {{if !!it1.base.length}}

                    {{for i,v of it1.base}}
                    <div w-class="17" w-sid="17"> {{v[0]}}&nbsp;+{{v[1]}} </div>
                    {{end}}

                    {{else}}
                    <div w-class="19" w-sid="19">暂未获得任何属性</div>
                    {{end}}
                </div>
            </div>
            <div w-class="18" w-sid="18">
                <widget w-class="15" w-tag="app_a-widget-title-single" w-sid="15">
                    {"padding":15,"type":9,"width":124,"text":"高级属性","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
                </widget>
                
                <div w-class="16" w-sid="16">
                    <widget w-class="21" w-tag="app_a-widget-bg_frame-bg" w-sid="21">
                        {"bgName":"bg_frame31"} 
                    </widget>
                    {{if !!it1.add.length}}

                    {{for j,k of it1.add}}
                    <div w-class="17" w-sid="17" style="color:{{if k[0] == '全属性'}}rgb(81, 230, 80){{end}}"> {{k[0]}}&nbsp;+{{k[1]}} </div>
                    {{end}}

                    {{else}}
                    <div w-class="19" w-sid="19">暂未获得任何属性</div>
                    {{end}}

                    {{if it1.describe}}
                    <div w-class="20" w-sid="20">{{it1.describe}}</div>
                    {{end}}
                </div>
            </div>
            
		</div>
		<widget w-class="14" w-tag="app_a-widget-pic_other-pic_other" w-sid="14">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>