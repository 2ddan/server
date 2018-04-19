<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let bag = appCfg.bag}}
	{{let magic = appCfg.magic}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let player = appCfg.player}}
	{{let treasureId = appCfg.magic.treasure[0]}}
	
	
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	<widget w-class="6" w-tag="app_a-widget-pic_text-pic_text">
		{"icon":"name_bg_2","width":184,"height":32,"text":{{it1.treasur + "阶神兵" }}} 
	</widget>
	<img w-class="9" src="app_b/magic/images/magic_bg.png" w-sid="9"/>
	<img w-class="8" src="app_b/magic/images/magic_light.png" w-sid="8"/>
	{{let bol = true}}
	<div w-class="10" w-sid="10">
		<widget w-class="11" w-tag="app_a-widget-title-single" w-sid="11">
			{"padding":10,"type":9,"width":124,"text":"神兵进阶","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"","wear":0} 
		</widget>
		<div w-class="12" w-sid="12">
			<div w-class="13" w-sid="13">
				<widget w-class="14" w-tag="app_a-widget-pic_other-pic_other" w-sid="14"></widget>
				<span style="padding:0 5px">{{it1.skill.table[it1.TreasurePhase.skill_id].name }}</span>
				<widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15"></widget>
			</div>
			<div w-class="17" w-sid="17">
				{{it1.TreasurePhase.describe || "请先进阶神兵"}}
			</div>
		</div>
		<widget w-class="16" w-tag="app_a-widget-line-line" w-sid="16">
			{"line":"line_9"} 
		</widget>
		<div w-class="18" w-sid="18">
			<div w-class="19" w-sid="19">
				<div w-class="20" w-sid="20">
					<span style="text-align:center;width:20px;height:18px;position:absolute;left:6px;top:7px;">{{it1.treasur}}</span>
				</div>
				<div w-class="21" w-sid="21">
					{{if JSON.stringify(it1.TreasurePhase.attr_add) !== "{}"}}
						{{for j, e in it1.TreasurePhase.attr_add}}
						<div w-class="23" w-sid="23">
							{{it1.attribute_config[j] + "+" + e}}
						</div>
						{{end}}
					{{else}}
						<span style="color:#f00">进阶神兵将获得属性</span>
					{{end}}
					
				</div>
				<div w-class="28" w-sid="28"></div>
			</div>

			<div w-class="34" w-sid="34">
				{{for k,o of it1.getAttr}}
					<div w-class="35" w-sid="35"  style="color:{{ o.progress>=o.val ?'' : '#8E8E8E'}};">
						{{o.text}} ({{Common.numberCarry(parseInt(o.progress || 0),10000)}} /{{Common.numberCarry(parseInt(o.val || 0),10000)}})
						{{if o.progress>=o.val}}
						<img w-class="42" src="app_a/widget/chosen/images/chosen.png" w-sid="42"/>
						{{else}}
						{{: bol = false}}
						<widget w-class="36" w-tag="app_a-widget-btn-rect" w-sid="36" on-tap='gotoFunc("{{o.fun}}")'>
							{"class":"default","fontsize":15,"color":"#fdedd7;","text":"前 往","width":54,"height":20} 
						</widget>
						{{end}}
					</div>
				{{end}}
			</div>
		</div>
		<widget w-class="44" w-tag="app_a-widget-line-line" w-sid="44">
			{"line":"line_10"}
		</widget>
	</div>
	{{if it1.allTreasurePhase[it1.treasur].resonance.length}}
	<widget w-class="43" w-tag="app_a-widget-btn-rect" w-sid="43" on-tap="up({{bol}})">
		{"class":{{bol ? "hl" : "disabled"}},"fontsize":24,"color":"#fdedd7;","text":"进 阶","width":116,"height":45,"tip_keys":["role.magic_activate.gm"]} 
	</widget>

	{{else}}
	
	<widget w-class="43" w-tag="app_a-widget-pic_text-pic_text"  w-sid="43">
		{"icon":"max_level","width":94,"height":60}
	</widget>
	{{end}}
	{{if it1.allTreasurePhase[it1.treasur].resonance.length}}
	<widget w-class="45" w-tag="app_a-widget-btn-ling" w-sid="45" on-tap="nextAttr()" >
		{"class":"default","fontsize":20,"color":"#49312E","text":" 下阶 属性","width":77,"height":77,"textCfg":"lingBtn"} 
	</widget>
	{{end}}



	{{let weapon = _get("app/scene/plan_cfg/parts_config").exports.parts_cfg}}
	{{let module = weapon[treasureId].module[0][0]}}

	{{let career_id = player.career_id}}	
	{{let info = it1.treasure_break[it1.break_info[0]-1<1 ? 1 : (it1.break_info[0]-1)]}}
	{{let index = info.career_id.indexOf(career_id)}}
	{{let w_eff1 = info.magic_show ? info.magic_show[index] : null}}
	{{let w_eff2 = it1.TreasurePhase.magic_show ? it1.TreasurePhase.magic_show[index] : null}}
	{{let double =  player.career_id == "700002" ? true : false}}
	{{let scene_bg = it1.tabswitch == "magic" ?"sce_ui_sbjj":"sce_ui_sbzh"}}
	{{let position = career_id == "700001" ? [0,2.3,0] : career_id == "700002" ? [0.3,2.3,0] : [0.25,2.0,0]}}
	<div style="position:absolute;left: 0;top: 115px;width: 540px;height: 380px;z-index:1;">
		<app-scene-base-scene>
			{
				"name":"uiscene",
				"type":"weapon",
				"module":{
					"module":{{module}},
					"position":{{position}},
					"scale":[0.9,0.9,0.9],
					"rotate":[-3.7,1.57,0],
					"w_eff":{{[w_eff1,w_eff2]}},
					"double":{{double}},
					"scene_bg":"sce_ui_sbjj"
				},
				"width":540,
				"height":900
			}
		</app-scene-base-scene>
	</div>
</div>