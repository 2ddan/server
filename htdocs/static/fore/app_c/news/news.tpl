<div maxId="10" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}		
	<widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
		{"text":"邮 件","coin":["money","diamond"],"left":40,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
	</widget>
	<div style="width:100%;position:absolute;left:50%;top:110px;bottom:83px;margin-left: -270px;">
        <widget w-class="3" w-tag="app_a-widget-line-line" w-sid="3">
            {"line":"line_7"} 
        </widget>
		<widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">
			{"bgName":"bg_frame21"} 
		</widget>
		
		<div w-class="5" w-sid="5">
			{{if it1.list && it1.list.length}}
            <app-widget-step style="position: absolute;width:105%;height: inherit;top:20px;bottom:0;left:0;line-height:18px;">
                    {"widget":"app_c-news-news_frame","arr":{{it1.list}},"initCount":4,"addCount":4 }
			</app-widget-step>
			{{else}}
			<div style="font-family:mnjsh;font-size:26px;color:#f00;text-align:center;line-height:480px;">邮箱内空空如也</div>
			{{end}}
		</div>

		<widget w-class="18" w-tag="app_a-widget-btn-rect" w-sid="18" on-tap="receiveAllAward({{it1.oneKey ? 1 : 0}})">
			{"class":{{it1.oneKey ? "hl" : "disabled"}},"fontsize":18,"color":"#fdedd7;","text":"一键领取","width":110,"height":44} 
		</widget>
	</div>	
</div>