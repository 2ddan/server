<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let gang = appCfg.gang.data}}
	{{let Common = _get("app/mod/common").exports.Common}}
	<div w-class="3" w-sid="3">
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
		{{let v = it1.gang_member[it1.role_index]}}
		
		{{let img = ''}}
		{{let post = v.post==1?"会长":(v.post==2?"副会长":"成员")}}
		{{if v.head && v.head.indexOf("undefined") < 0}}
		{{: img = v.head}}
		{{else}}
		{{: img = (Pi.pictures['playerhead'+v.career_id])}}
		{{end}}
		<div w-class="16">
			
			<widget w-class="17" w-tag="app_a-widget-head-friend" w-sid="17">
				{"url":{{img}},"quality":{{v.role_quality}},"type":"player","prop":{{v?v:0}},"level":{{v.level}}}
			</widget>

			<div w-class="86" w-sid="86">
				<span w-class="87" w-sid="87">{{Common.fromCharCode(v.name) || v.role_id + "(" + post +")"}}</span>
				<div w-class="89" w-sid="89">
					
					<img style="vertical-align: middle;margin-top: -6px;margin-right: 8px;" src="../images/mem_{{v.post || 3}}.png"/>
					<widget w-class="88" w-tag="app_a-widget-text-text" w-sid="88">{"text":{{"VIP"+v.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
					</widget>
				</div>
				<widget w-class="91" w-tag="app_a-widget-power-power" w-sid="91">
					{"type":2,"top":16,"left":52,"power":{{v.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
				</widget>
			</div>

		</div>
		
		<div w-class="12" w-sid="12">
			{{if gang.post == 1}}
			<widget on-tap='gotoPostClick' w-class="19" w-tag="app_a-widget-btn-rect" w-sid="20">
				{"class":"default","fontsize":18,"color":"","text":"管理职位","width":84,"height":32} 
			</widget>
			<widget on-tap='kickMember("{{v.role_id}}")' w-class="20" w-tag="app_a-widget-btn-rect" w-sid="21">
				{"class":"default","fontsize":18,"color":"","text":"请离公会","width":84,"height":32} 
			</widget>
			<widget on-tap='lineupClick' w-class="18" w-tag="app_a-widget-btn-rect" w-sid="19" on-tap="seeOther({{v.role_id}})">
				{"class":"default","fontsize":18,"color":"","text":"查看装备","width":84,"height":32} 
			</widget>

			{{elseif gang.post == 2}}
				{{if it1.gang_member[it1.role_index].post == 3}}
				<widget on-tap='kickMember("{{v.role_id}}")' w-class="20" w-tag="app_a-widget-btn-rect" w-sid="21" style="right:0;">
					{"class":"default","fontsize":18,"color":"","text":"请离公会","width":84,"height":32} 
				</widget>
				{{end}}
				<widget on-tap='lineupClick' w-class="18" w-tag="app_a-widget-btn-rect" w-sid="19" on-tap="seeOther({{v.role_id}})" style="left:{{it1.gang_member[it1.role_index].post == 3 ? 0 : 104}}px">
					{"class":"default","fontsize":18,"color":"","text":"查看装备","width":84,"height":32} 
				</widget>
			{{else}}

			<widget on-tap='lineupClick' w-class="19" w-tag="app_a-widget-btn-rect" w-sid="19" on-tap="seeOther({{v.role_id}})">
				{"class":"default","fontsize":18,"color":"","text":"查看装备","width":84,"height":32} 
			</widget>
			{{end}}
			
			
			

			
			
		</div>
		<widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>