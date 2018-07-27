<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let player = _get("app/mod/db").exports.data.player}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	<div w-class="3" w-sid="3">
		<div w-class="7" w-sid="7">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
			</widget>
			<widget on-tap='closeCover' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
			</widget>
			
			<widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
			</widget>
			<widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"搜索门派","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<div w-class="8" w-sid="8">
			<div w-class="9" w-sid="9">
				<widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">{"bgName":"bg_frame26"} 
				</widget>
				<widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">{"bgName":"bg_frame23"} 
				</widget>
			</div>
			<div w-class="13" w-sid="13">
				<div w-class="16" w-sid="16"></div>
				<widget w-class="14" w-tag="app_a-widget-input-input" w-sid="14" ev-input-text="getFocusInput" ev-input-blur="upDataInputValue" >
					{"type":"text","placeholder":"请输入门派ID或名字_","length":65,"text":"","length":12,"text":"","id":"gangname"} 
				</widget>
				<widget on-tap="findClick" w-class="15" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="15">{"icon":"search"} 
				</widget>
			</div>
		</div>
		{{if it1.find_list.length}}
		{{for i, v of it1.find_list}}
		<div  style="position:absolute;top: 115px;left: 32px;width: 468px;height:212px;">
			<div w-class="17" w-sid="17">
				<div w-class="20" w-sid="20">
					<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19"></widget>
					<widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18"></widget>
					<span w-class="21" w-sid="21">{{Common.fromCharCode(v.gang_name)}}</span>
				</div>
				<div w-class="22" w-sid="22">
					{{let img = Pi.pictures[it1.guild_upgrade[v.gang_level].icon_id]}}							
					<img src={{img}} style="vertical-align:middle"/>
					<span w-class="24" w-sid="24">Lv.15</span>
				</div>
				<widget w-class="25" w-tag="app_a-widget-line-line" w-sid="25">{"line":"line_9"} 
				</widget>
			</div>
			<div w-class="26" w-sid="26">
				<div w-class="27" w-sid="27">
					<span w-class="28" w-sid="28">会 长</span>
					<span w-class="29" w-sid="29">{{Common.fromCharCode(v.leader_info.name)}}</span>
					<widget w-class="31" w-tag="app_a-widget-text-text" w-sid="31">
						{"text":{{"VIP"+v.leader_info.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
					</widget>
				</div>
				<div w-class="52" w-sid="52">
					<span w-class="53" w-sid="53">成员数</span>
					<span w-class="54" w-sid="54">{{v.gang_count+"/"+it1.guild_upgrade[v.gang_level].max_person}}</span>
				</div>
				<div w-class="56" w-sid="56">
					<span w-class="57" w-sid="57">宣 言</span>
					<div w-class="58" w-sid="58">{{Common.fromCharCode(v.gang_bulletin)}}</div>
				</div>
			
				{{if !v.is_apply}}
				<widget on-tap='applyGangClick("{{v.gang_id+","+v.index}}")' w-class="60" w-tag="app_a-widget-btn-rect" w-sid="60">
					{"class":"hl","fontsize":18,"color":"#fdedd7;","text":"申 请","width":84,"height":32} 
				</widget>
				{{elseif v.gang_count - 0 == it1.guild_upgrade[v.gang_level].max_person-0}}
				<widget w-class="60" w-tag="app_a-widget-btn-rect" w-sid="60">
					{"class":"hl","fontsize":18,"color":"","text":"满 员","width":84,"height":32} 
				</widget>
				{{else}}
				<img  w-class="61" src="app_a/widget/pic_text/images/text_invite.png" w-sid="61"/>					
				{{end}}
			</div>
		</div>
		{{end}}
		{{end}}
		<widget w-class="12" w-tag="app_a-widget-pic_other-pic_other" w-sid="12">{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>