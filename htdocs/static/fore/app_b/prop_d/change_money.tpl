<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2">
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let Common = _get("app/mod/common").exports.Common}}
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
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"购买银两","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
            {{let prop = Pi.sample[100001]}}
			<app_a-widget-prop-base w-class="12" w-sid="12">
                {"prop":{{prop}},"url":{{Pi.pictures[prop.icon]}},"width":78,"height":78,"count":{{it.config_buy_money.money}},"name":"none","bg":0}
            </app_a-widget-prop-base>
			<div class="shadow6" w-class="21">获得银两:{{Common.numberCarry(it.config_buy_money.money*it.count,10000)}}</div>

            {{let _obj = {"default":1,"step":[1,10],"minCount":1,"maxCount":it.maxCount} }}
            <app_a-widget-number-number ev-selectcount="selectcount" style="position: absolute;left: 0;top: 194px;height: 42px;padding:0 5px;">
                {{_obj}}
            </app_a-widget-number-number>


            {{let b = (it.count > it.maxCount) ? 1 : 0}}
            {{if it.cost}}
            <widget w-class="16" w-tag="app_a-widget-coin-coin" w-sid="16" style="{{if b}} color:#fe3636;{{end}}">
                {"icon":"diamond","width":25,"height":21,"left":3,"text":[{{it.cost}}],"color":"#ffd8a6"} 
            </widget>
            {{end}}
			<widget on-tap='submitBuy' w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
				{"class": {{ b ? "disabled" : "hl" }},"fontsize":24,"color":"#fdedd7;","text":"购 买"} 
			</widget>
			
		</div>
		<widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
		</widget>
	</div>
</div>