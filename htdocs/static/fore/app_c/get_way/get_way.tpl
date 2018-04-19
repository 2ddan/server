<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
	{{let career_id = it1.player.career_id}}
	<div w-class="3" w-sid="3">
		<div w-class="4" w-sid="4">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
				{"icon":"tips_top_1"} 
			</widget>
			<widget w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" on-tap='cancel'>
				{"icon":"close"} 
			</widget>
			<widget w-class="13" w-tag="app_a-widget-pic_other-pic_other" w-sid="13">
				{"icon":"pendant"} 
			</widget>
		</div>
		<div w-class="10" w-sid="10">
			<widget w-class="17" w-tag="app_a-widget-bg_frame-bg" w-sid="17">
				{"bgName":"bg_frame26"} 
			</widget>

			{{let prop = it1.Pi.sample[it]}}
			{{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
			{{let url = it1.Pi.pictures[icon]}}
			{{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}

			<div w-class="16" w-sid="16">
				<app_a-widget-prop-base  style="position:relative">
					{"prop":{{prop}},"url":{{url}},"width":78,"height":78,"count":"none","name":"none","bg":0}
				</app_a-widget-prop-base>
				<div  w-class="18" w-sid="18">

					<app_a-widget-text-text style="vertical-align: middle;">
					{"textCfg":"heroEquip","fontSize":22,"text":{{name}} }
					</app_a-widget-text-text>

					{{let c = it1.count || 0}}
					<div w-class="20" w-sid="20">
						拥有:<span style="color:#{{c?'':'b92f2d'}};padding:0 5px">{{c}}</span>
					</div>
				</div>
				
			</div>

			<div  w-class="21" w-sid="21">
					{{prop.describe}}
			</div>
			<div  w-class="22" w-sid="22">
				<widget w-class="23" w-tag="app_a-widget-bg_frame-bg" w-sid="23">
					{"bgName":"bg_frame32"} 
				</widget>
				<widget w-class="24" w-tag="app_a-widget-pic_text-pic_text" w-sid="24">
					{"icon":"skill_name_bg","width":124,"height":25,"align":"center","marginLeft":3,"text":"获取途径","textCfg":"","space":0,"fontSize":20} 
				</widget>
				<div  w-class="25" w-sid="25">
					{{for i,v in it1.dropData}}
					<widget w-class="31" w-tag="app_a-widget-btn-rect" w-sid="31"  on-tap="gotoFun({{JSON.stringify(v)}})" style="margin:0 8px;">
						{"class":"default","fontsize":24,"color":"#fdedd7;","text":{{v.name}},"width":110,"height":40} 
					</widget>
					{{end}}
				</div>
			</div>
			
		</div>
		<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
			{"icon":"tips_bottom"} 
		</widget>
	</div>
</div>

	