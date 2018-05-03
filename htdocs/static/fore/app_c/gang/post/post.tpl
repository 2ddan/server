<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let player = appCfg.player}}
	<div w-class="3" w-sid="3">

		{{let v = it1.gang_member[it1.role_index]}}
		
		{{let img = ''}}
		{{let post = v.post==1?"会长":(v.post==2?"副会长":"成员")}}
		{{if v.head && v.head.indexOf("undefined") < 0}}
		{{: img = v.head}}
		{{else}}
		{{: img = (Pi.pictures['playerhead'+v.career_id])}}
		{{end}}
		<div w-class="7" w-sid="7">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
			</widget>
			<widget on-tap='closeCover' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
			</widget>
			<widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
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
		<div w-class="16">
			<widget w-class="17" w-tag="app_a-widget-head-friend" w-sid="17">
				{"url":{{img}},"quality":{{v.role_quality}},"type":"player","prop":{{v?v:0}},"level":{{v.level}}}
			</widget>

			<div w-class="86" w-sid="86">
				<span w-class="87" w-sid="87">{{Common.fromCharCode(v.name) || v.role_id + "(" + post +")"}}</span>
				<div w-class="89" w-sid="89">
					<img style="vertical-align: middle;margin-top: -6px;margin-right: 8px;" src="../images/mem_{{v.post || 3}}.png"/>
					<widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
						{"icon":{{"vip_lv_" + (it1.vip_advantage[v.vip].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP" + v.vip}},"top":0,"left":0} 
					</widget>
				</div>
				<widget w-class="91" w-tag="app_a-widget-power-power" w-sid="91">
					{"type":2,"top":16,"left":52,"power":{{v.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
				</widget>
			</div>

		</div>
		
		<div w-class="12" w-sid="12" style="width: 400px;height: 40px;left: 50%;margin-left: -200px;">
			<widget on-tap="appoint(1)" w-class="18" w-tag="app_a-widget-btn-rect" w-sid="18">
				{"class":"hl","fontsize":18,"color":"#fdedd7;","text":"任命会长","width":110,"height":39} 
			</widget>

			<widget on-tap='appoint(2)' w-class="19" w-tag="app_a-widget-btn-rect" w-sid="19" style="left: 50%;margin-left: -55px;">
				{"class":{{it1.gang_member[it1.role_index].post == 2 ? "default" :"hl"}},"fontsize":16,"color":"","text":"任命副会长","width":110,"height":39} 
			</widget>
			
			<widget on-tap='appoint(3)' w-class="20" w-tag="app_a-widget-btn-rect" w-sid="20">
				{"class":{{it1.gang_member[it1.role_index].post == 3 ? "default" :"hl"}},"fontsize":18,"color":"","text":"任命成员","width":110,"height":39} 
			</widget>	
		</div>
		<widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>