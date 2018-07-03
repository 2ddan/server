<div maxId="56" style="position:absolute;width:100%;height:100%;z-index:2" class="ui_bg" test="test" w-sid="2">
	{{let root = _get("pi/ui/root").exports}}
	{{let common = _get("app/mod/common").exports.Common}}
	<widget w-class="55" w-tag="app_b-widget-title-title" w-sid="55">
		{"text":"技 能","coin":["money","diamond"],"left":40,"top":15,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"width":{{root.getWidth()}} }
	</widget>
	<widget w-class="3" w-tag="app_a-widget-line-line" w-sid="3">
		{"line":"line_7"} 
	</widget>
	<widget w-class="31" w-tag="app_a-widget-title-single" w-sid="31">
		{"padding":10,"type":9,"width":124,"text":"核心技能","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
	</widget>
	{{let len = it1.skill.length}}	
	{{let data = it1.skill[len-1]}}
	<div w-class="25" style="{{if data.level}} height:140px;{{end}}">
		<widget  w-tag="app_a-widget-bg_frame-bg" style="width:100%;height:95%;left:0;top:4px;">
			{"bgName":"bg_frame31"} 
		</widget>
		<app_a-widget-line-line style="position:absolute;top:0px;left:0px;right:0px;margin:0 auto;width:100%">
			{"line":"line_16"}
		</app_a-widget-line-line>
		<app_a-widget-line-line style="position:absolute;bottom:0px;left:0px;right:0px;margin:0 auto;width:100%">
			{"line":"line_17"}
		</app_a-widget-line-line>
		<div w-class="5" w-sid="5" style="height:159px;top: 5px;z-index:2">
			<app_a-widget-guide-guide>
				{{"skill_big"}}
			</app_a-widget-guide-guide>
			<widget w-class="12" w-tag="app_a-widget-pic_text-pic_text" w-sid="12" style="left:112px;">
				{"icon":"skill_name_bg","width":122,"height":25,"align":"center","marginLeft":3,"text":{{data.name}},"textCfg":"","space":0,"fontSize":12} 
			</widget>

			<app_a-widget-prop-base w-class="13" style="left:11px;" >
                {"prop":"","url":{{it1.Pi.pictures[data.icon]}},"width":91,"height":91,"count":"none","name":"none","bg":0}
            </app_a-widget-prop-base>
			
			<div w-class="17" w-sid="17" style="left:113px;">{{data.describe}}</div>
			<div w-class="21" w-sid="21" style="left:241px;">Lv.{{data.level}}</div>

			{{if data.level}}
				{{let bol = (data.level !== data.full_level && it1.playerLevel>=data.up[data.level].level_limit) ?len:false}}
				{{let num = data.up[data.level].number}}

				{{if data.level === data.full_level}}
				<widget w-class="51" w-tag="app_a-widget-pic_text-pic_text" w-sid="51" style="left:342px;">
					{"icon":"max_level","width":102,"height":60,"align":"center","marginLeft":3,"text":"","textCfg":"","space":0,"fontSize":12} 
				</widget>
				{{else}}

					<widget on-tap="up({{bol}},{{num}})" w-class="48" w-tag="app_a-widget-btn-rect" style="left:331px;">
						{"class":{{ (bol &&  it1.skill_coin >= num) ? "hl" : "disabled" }},"fontsize":24,"color":"#fdedd7;","text":"升 级","width":116,"height":45,"tip_keys":["role.skill.5"]} 
					</widget>

					{{if bol}}
					<widget w-class="20" w-tag="app_a-widget-coin-coin" w-sid="20" style='color:{{it1.skill_coin >= num ? "#f0f0f0" : "#f00"}}' style="left:363px;">
						{"icon":"skill_points","width":25,"height":21,"left":3,"text":[{{num}}],"color": "#f0f0f0"  } 
					</widget>
					{{else}}
					<widget w-class="52" w-tag="app_a-widget-text-text" w-sid="52" style="left:349px;">
						{"text":{{data.up[data.level].level_limit+"级可提升"}},"show":"","space":-2,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquipGray"} 
					</widget>
					{{end}}
				{{end}}
			
			{{else}}
				{{let bol = true}}
				<div w-class="26" style="left:26px;">
					激活条件:
					<div w-class="27">
						{{let arr = it1.strokes()}}
						{{for i,v of data.activate_other }}
						{{if !arr[i]}}
						{{: bol = false}}
						{{end}}
						<div style="width:50%;display:inline-block;color:{{if arr[i]}} #fff {{end}}"> {{it1.skill_describe[v[0]].skill_name}}达到{{v[1]}} 级</div>
						{{end}}
					</div>
				</div>
				{{if bol && (it1.playerLevel >= data.activate)}}
				<widget w-class="48" w-tag="app_a-widget-btn-rect" w-sid="48" on-tap="activate" style="left:331px;">
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"激 活","width":116,"height":45,"tip_keys":["role.skill.active"]} 
				</widget>
				{{else}}
				<widget w-class="48" w-tag="app_a-widget-btn-rect" w-sid="48" style="left:331px;">
					{"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"未激活","width":116,"height":45} 
				</widget>
				{{end}}
				<widget w-class="53" w-tag="app_a-widget-text-text" w-sid="53" style="left:349px;">
					{"text":{{data.activate+"级可开启"}},"show":"","space":-2,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquipGreen"} 
				</widget>
				
			{{end}}
		</div>
	</div>
	<widget w-class="31" w-tag="app_a-widget-title-single" w-sid="31" style="top:{{data.level ? 327 : 347}}px;left:112px">
		{"padding":10,"type":9,"width":124,"text":"基础技能","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
	</widget>
	<div style="position: absolute;box-sizing: border-box;width: 100%;height:{{data.level ? 470 : 455}}px;top: {{data.level ? 343 : 360}}px;padding: 20px 0;overflow:hidden;left: 50%;margin-left: -270px;">
		<div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:100%;">
		{{for i,v of it1.skill}}
		{{if i < len-1 }}	
		<div w-class="5" w-sid="5" style="{{if i == len-2}}margin:0;{{end}}">
			<widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame19"}
			</widget>
			<widget w-class="12" w-tag="app_a-widget-pic_text-pic_text" w-sid="12">
				{"icon":"skill_name_bg","width":122,"height":25,"align":"center","marginLeft":3,"text":{{v.name}},"textCfg":"","space":0,"fontSize":12} 
			</widget>

			<app_a-widget-prop-base w-class="13" >
                {"prop":"","url":{{it1.Pi.pictures[v.icon]}},"width":91,"height":91,"count":"none","name":"none","bg":0}
            </app_a-widget-prop-base>
			
			<div w-class="17" w-sid="17">{{v.describe}}</div>
			<div w-class="21" w-sid="21">Lv.{{v.level}}</div>

			{{if v.level}}
				{{let bol = (v.level !== v.full_level && it1.playerLevel>=v.up[v.level].level_limit) ?i-0+1:false}}
				{{let num = v.up[v.level].number}}

				{{if v.level === v.full_level}}
					<widget w-class="51" w-tag="app_a-widget-pic_text-pic_text" w-sid="51">
						{"icon":"max_level","width":102,"height":60,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":12} 
					</widget>
				{{else}}

					<widget on-tap="up({{bol}},{{num}})" w-class="48" w-tag="app_a-widget-btn-rect">
						{"guide":{{i == 0 ? "skill_up" : ""}},"class":{{ (bol &&  it1.skill_coin >= num) ? "hl" : "disabled" }},"fontsize":24,"color":"#fdedd7;","text":"升 级","width":116,"height":45,"tip_keys":[{{"role.skill."+(i+1)}}]} 
					</widget>

					{{if bol}}
					<widget w-class="20" w-tag="app_a-widget-coin-coin" w-sid="20" style='color:{{it1.skill_coin >= num ? "#f0f0f0" : "#f00"}}'>
						{"icon":"skill_points","width":25,"height":21,"left":3,"text":[{{num}}],"color": "#f0f0f0"  } 
					</widget>
					{{else}}
					<widget w-class="52" w-tag="app_a-widget-text-text" w-sid="52">
						{"text":{{v.up[v.level].level_limit+"级可提升"}},"show":"","space":-2,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquipGray"} 
					</widget>
					{{end}}
				{{end}}
			
			{{else}}
				<widget w-class="48" on-tap="openTip({{i+1}})" w-tag="app_a-widget-btn-rect" w-sid="48">
					{"class":"disabled","fontsize":24,"color":"#fdedd7;","text":" 未激活","width":116,"height":45} 
				</widget>
				<widget w-class="53" w-tag="app_a-widget-text-text" w-sid="53">
					{"text":{{v.activate+"级可开启"}},"show":"","space":-2,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquipGreen"} 
				</widget>
			{{end}}
		</div>
		{{end}}
		{{end}}
		</div>
	</div>

	<widget w-class="18" w-tag="app_a-widget-bg_frame-bg" w-sid="18">
		{"bgName":"bg_frame21"} 
	</widget>
	<widget w-class="22" w-tag="app_a-widget-pic_text-pic_text" w-sid="22">
		{"icon":"resource_bar","width":96,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
	</widget>
	<widget on-tap = "gotoGetWay" w-class="23" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="23"></widget>

	<widget w-class="24" w-tag="app_a-widget-coin-coin" w-sid="24">
		{"icon":"skill_points","width":25,"height":21,"left":3,"text":[{{common.numberCarry(it1.skill_coin,10000)}}],"color":"#f0f0f0"} 
	</widget>


	
	
</div>