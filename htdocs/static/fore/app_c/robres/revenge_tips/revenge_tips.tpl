<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;" w-sid="2">
	<div w-class="3" w-sid="3">
		<div w-class="7" w-sid="7">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
			</widget>
			<widget on-tap='goback' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
			</widget>
			<widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
			</widget>
			<widget w-class="1" w-tag="app_a-widget-pic_text-pic_text">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"复  仇","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		
		<div w-class="9" w-sid="9">
			<widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
				{"bgName":"bg_frame26"} 
			</widget>
			<widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
				{"bgName":"bg_frame23"} 
			</widget>
		</div>
		

		{{let img = it1.Pi.pictures['playerhead'+ (it.data[1][1][7][1] || it.data[1][1][8][1])]}}
		<div w-class="16">
			
			<widget w-class="17" w-tag="app_a-widget-head-friend" w-sid="17">
				{"url":{{img}},"type":"player","level":{{it.data[1][1][4][1]}},"fontSize":18}
			</widget>
			<widget w-class="15" w-tag="app_a-widget-line-line" >
				{"line":"line_9"} 
			</widget>
			<div w-class="13" w-sid="13">
				<div >S{{it.data[1][1][1][1]}}{{it1.checkTypeof(it.data[1][1][2][1],"Array") ? it1.Common.fromCharCode(it.data[1][1][2][1]) : it.data[1][1][2][1]}}</div>
				<div >门派:{{it1.checkTypeof(it.data[1][1][9][1],"Array") ? it1.Common.fromCharCode(it.data[1][1][9][1]) : it.data[1][1][9][1]}}</div>
				<div >等级:S{{it.data[1][1][4][1]}}</div>
				<div >战力:{{it1.Common.numberCarry(it.data[1][1][5][1],10000)}}</div>
			</div>

			<div style="position:relative;left:110px;top:153px;width:240px;height: 25px;font-family:mnjsh;color:#51e650;z-index:2;font-size: 22px;">
				<widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;left: 0;">
					{"icon":"little_tips_bg","text":{{"战胜可获得"+it.flow+"水晶"}},"width":240,"height":25,"top":2,"align":"left","marginLeft":18} 
				</widget>
				<widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
					{"icon":"remind"} 
				</widget>
			</div>
		</div>
		
		
		<div w-class="12" w-sid="12" >

			<widget w-class="18" on-tap='goback' w-tag="app_a-widget-btn-rect" style="left:0px">
				{"class":"default","fontsize":24,"color":"","text":"取  消","width":116,"height":45} 
			</widget>
			<widget w-tag="app_a-widget-btn-rect" w-sid="18" on-tap="revenge({{it.data[0]}})" style="right:0;position: absolute;">
				{"class":"hl","fontsize":24,"color":"","text":"开始复仇","width":116,"height":45} 
			</widget>
		</div>
		<widget w-class="20" w-tag="app_a-widget-pic_other-pic_other" w-sid="20">{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>