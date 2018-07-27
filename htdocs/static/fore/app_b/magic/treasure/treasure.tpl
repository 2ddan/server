<div maxId="35" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let bag = appCfg.bag}}
	{{let magic = appCfg.magic}}
	{{let player = appCfg.player}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let cfg = _get("app/mod/pi").exports.cfg}}
	{{let attr_cfg = cfg.attribute_config.attribute_config}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let treasureId = appCfg.magic.treasure[0]}}
	
	{{let upInfo = it1.treasure_up[it1.levelSite]}}
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">{"bgName":"bg_frame21"} 
	</widget>
	<widget w-class="5" w-tag="app_a-widget-btn-ling" w-sid="5" on-tap="seeAttr()">
		{"class":"default","fontsize":20,"color":"#fdedd7;","text":" 属性 详情","width":77,"height":77,"textCfg":"lingBtn"} 
	</widget>
	
	<app_b-widget-buff-buff style="position: absolute;top: 5px;right: 40px;z-index:2;">
		{"width":60,"height":296,"type":"magic","level":{{it1.break_info[0]}},"top":25}
	</app_b-widget-buff-buff>
	
	{{let obj = upInfo[magic.hexagram_level[it1.levelSite-1]]}}
	{{let countInfo = obj.material_id && it1.TreasurePhase.getHave(obj.material_id)}}
	{{let max = it1.treasure_break[it1.break_info[0]].prop_max}}
	{{let _count = countInfo?countInfo.count:0}}
	<div class="shadow6" w-class="35" style="top: 498px;width: 494px;left: 23px;z-index:2;text-align:right;">
		<div style="position:relative;text-align:left;display:inline-block;width:205px;height: 23px;">
			<widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 270px;left: 0;">
				{"icon":"little_tips_bg","text":"击杀怪物可获得灵魂残片","width":210,"height":23,"top":2} 
			</widget>
			<widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
				{"icon":"remind"} 
			</widget>
		</div>
		
		<div style="color:#fffc00;display:inline-block;position: relative;margin-top: -15px;vertical-align: middle;margin-right: 10px;">
			魂器容量上限为<span style="color:#f13a16">{{Common.numberCarry(max,10000)}}</span>
			{{if _count>=max}}<span style="color:#fffc00">(已达上限)</span>{{end}}
		</div>
	</div>
	<widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" class="shadow6">
		{"icon":"name_bg_2","width":184,"height":32,"text":{{it1.treasure_break[it1.break_info[0]].name}}} 
	</widget>
	{{let bol = magic.hexagram_level[magic.hexagram_level.length - 1] !== it1.break_info[0]}}
	<div w-class="6" w-sid="6">
		<widget w-class="8" w-tag="app_a-widget-line-line" w-sid="8">
			{"line":"line_10"} 
		</widget>
		<widget w-class="9" w-tag="app_a-widget-line-line" w-sid="9">
			{"line":"line_10"} 
		</widget>
		
		{{if bol}}
		<div w-class="13" w-sid="13">
			<widget w-class="14" w-tag="app_a-widget-pic_other-pic_other" w-sid="14"></widget>
			<app_a-widget-text-text style="vertical-align: middle;padding: 0 3px;">
				{"textCfg":"gangCoverTitle","text":"铸魂进度","space":0 ,"fontSize":18}
			</app_a-widget-text-text>
			<widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15"></widget>
		</div>
		{{let total = it1.treasure_up[it1.levelSite][it1.break_info[0]-1].need_exp}}
		<widget w-class="16" w-tag="app_a-widget-bar-bar2" w-sid="16" class="shadow6">
			{"anima":{{it1.treasure_bar_anima}},"progress":{{Math.ceil(it1.hexagram_exp/total*100)}},"text":{{it1.hexagram_exp +'/'+ total}},"lineHeight":14,"fontSize":18,"width":400} 
		</widget>
		<div w-class="17" w-sid="17">
			{{let attr = upInfo[magic.hexagram_level[it1.levelSite-1]].attr}}
			<div w-class="18" w-sid="18">
				{{attr ? attr_cfg[attr[0]] + "+" + attr[1] : "无"}}
			</div>
			<app_a-widget-pic_other-pic_other style="vertical-align:middle">
				{"icon":"attr_arrow"} 
			</app_a-widget-pic_other-pic_other>
			<div w-class="19" w-sid="19">
				{{if upInfo[magic.hexagram_level[it1.levelSite-1] - 0 + 1]}}
				{{let attrNext = upInfo[magic.hexagram_level[it1.levelSite-1] - 0 + 1].attr}}
				{{attrNext ? attr_cfg[attrNext[0]] + "+" + attrNext[1] : "无"}}
				{{else}}
				已满级
				{{end}}
			</div>
		</div>
		{{if obj.material_id}}
		
		<div w-class="24" class="shadow6">铸魂消耗:<span style="color:{{obj.one_cost_times>_count ? '#f13a16':''}}">{{Common.numberCarry(_count,10000)}}</span>/{{obj.one_cost_times}}</div>
		{{end}}	  
		{{else}}
		
		{{let need_exp = it1.treasure_break[it1.break_info[0]].need_exp}}
		{{let percent = need_exp ? (it1.break_info[1]/need_exp)*100 : 100}}
		{{let text = it1.break_info[1]+"/"+need_exp}}
		<widget class="shadow6" w-class="36" w-tag="app_a-widget-bar-bar2" w-sid="36">
			{"anima":{{it1.treasure_bar_anima}},"progress":{{percent}},"text":{{text}},"lineHeight":14,"fontSize":14,"width":400,"height":18} 
		</widget>
		<div w-class="37" w-sid="37" class="shadow6">
			<div w-class="38" w-sid="38" style="left: 40px;">
				{{let break_attr = it1.treasure_break[it1.break_info[0]]}}
				<div w-class="39" w-sid="39">
					{{"全属性 +" +(break_attr.attr_rate * 100) + "%"}}
				</div>

				{{for i,v of break_attr.attr}}
				<div style="padding: 0 5px;">{{attr_cfg[v[0]] + " +" + v[1]}}</div>
				{{end}}
				
			</div>
			<app_a-widget-pic_other-pic_other style="position: absolute;top: 23px;left: 50%;margin-left: -15px;">
				{"icon":"attr_arrow"} 
			</app_a-widget-pic_other-pic_other>
			<div w-class="38" w-sid="38" style="color:#51e650;right:40px;">
				{{let next_attr = it1.treasure_break[it1.break_info[0]+1]}}
				{{if next_attr}}
				<div w-class="39" w-sid="39">
					全属性 {{"+" + (it1.treasure_break[it1.break_info[0]+1].attr_rate * 100) + "%"}}
				</div>
				{{for i,v of next_attr.attr}}
				<div style="padding: 0 5px;">{{attr_cfg[v[0]] + "+" + v[1]}}</div>
				{{end}}
				{{else}}
				<div w-class="39" w-sid="39">
					已满级
				</div>
				<div style="padding: 0 5px;">已满级</div>
				{{end}}
			</div>
		</div>

		{{end}}
	</div>
	
	{{if !bol&&it1.treasure_break[it1.break_info[0]+1] || bol&&it1.treasure_up[it1.levelSite][it1.break_info[0]]}}
		{{if bol}}
			<widget w-class="25" w-tag="app_a-widget-btn-rect" w-sid="25" on-tap="hexagramLevelUp(0)" style="left:200px">
				{"guide":{{it1.treasure_ok ? "treasure_up": ""}},"class":"hl","fontsize":24,"color":"#fdedd7;","text":"铸  魂","width":116,"height":45,"tip_keys":["role.magic_activate.bg.hexagram"]} 
			</widget>
			<div w-class="25" w-sid="25" style="left:345px">
				{{if it1.level_type}}
				<div  on-tap="hexagramLevelUp(1)" style="font-family: mnjsh;font-size:19px;color:#ffd8a6;width: 116px;height: 45px;text-align: center;padding-top: 4px;" class="shadow7">
					正在铸魂
					<div style="text-decoration: underline;color:#51e650">取消</div>
				</div>
				
				{{else}}
				{{let text = player.vip >= it1.TreasureBase[it1.magic_id].one_key_up_vip ? "快速铸魂" :"自动铸魂"}}
				<widget w-tag="app_a-widget-btn-rect" on-tap="hexagramLevelUp(1)">
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":{{text}},"width":116,"height":45} 
				</widget>
				{{end}}
				{{if player.level >= it1.config_shortcut["treasure_up"].type[1] || player.month_card_due_time}}
				<app-widget-tip-tip style="right: 0;top: 0;">
					{"tip_keys":["role.magic_activate.bg.hexagram"]}
				</app-widget-tip-tip>
				{{end}}
			</div>

		{{else}}
			{{let info = it1.treasure_break[it1.break_info[0]]}}
			{{if it1.treasure_type}}
			<div w-class="25" on-tap="canBreak(1)" style="font-family: mnjsh;font-size:19px;color:#ffd8a6;width: 116px;height: 45px;text-align: center;padding-top: 4px;" class="shadow7">
				正在淬炼
				<div style="text-decoration: underline;color:#51e650" >取消</div>
			</div>
			{{else}}

			{{let text = it1.break_info[1] >= info.need_exp ? "突  破" : it1.treasure_type ? '淬炼中' : '淬炼'}}
			<widget w-class="25" w-tag="app_a-widget-btn-rect" w-sid="25" on-tap="canBreak(1)" style="left:200px">
				{"class":"hl","fontsize":24,"color":"#fdedd7;","text":{{text}},"width":116,"height":45,"tip_keys":["role.magic_activate.bg.break"]} 
			</widget>
			{{let sid = info.prop}}
			{{let propInfo = it1.TreasurePhase.getHave(sid)}}
			{{let need_prop = info.need_exp / info.per_exp}}
		
			{{let color = (propInfo ? propInfo.count : 0) < need_prop-it1.break_info[1] ? "#ff3232" : "#e2bf93"}}      
			<widget w-class="40" w-tag="app_a-widget-coin-coin" w-sid="40" style="color:#e2bf93;z-index:2;margin-left:-42px">
				{"icon":"treasure_coin","width":20,"height":21,"left":3,"text":[{{propInfo ? propInfo.count : 0}}],"color":"#e2bf93"} 
			</widget>
			{{end}}
			
		{{end}}
	{{else}}
	<widget w-class="25" w-tag="app_a-widget-pic_text-pic_text"  w-sid="25">
		{"icon":"max_level","width":94,"height":60}
	</widget>
	{{end}}


	<div w-class="35" w-sid="35" >
		{{let mag = it1.TreasureBase[it1.magic_id]}}
		{{let text = "VIP" + (bol ? mag.one_key_up_vip : mag.one_key_break_vip) + "可以快速" + (bol ? "铸魂" : "淬炼")}}
		<widget class="shadow7"  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width:150px;left: 0;">
			{"icon":"little_tips_bg","text":{{text}},"width":150,"height":23,"top":2,"align":"left","marginLeft":18} 
		</widget>
		<widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
			{"icon":"remind"} 
		</widget>
	</div>
	
	{{let weapon = _get("app/scene/plan_cfg/parts_config").exports.parts_cfg}}
	{{let module = weapon[treasureId].module[0][0]}}

	{{let career_id = player.career_id}}	
	{{let info = it1.treasure_break[it1.break_info[0]-1<1 ? 1 : (it1.break_info[0]-1)]}}
	{{let index = info.career_id.indexOf(career_id)}}
	{{let w_eff1 = info.magic_show ? info.magic_show[index] : null}}
	{{let w_eff2 = it1.TreasurePhase.magic_show ? it1.TreasurePhase.magic_show[index] : null}}
	{{let double =  player.career_id == "700002" ? true : false}}
	{{let position = career_id == "700001" ? [0,2.3,0] : career_id == "700002" ? [0.3,2.3,0] : [0.25,2.0,0]}}
	
	<div data-desc="激活时文字显示" w-class="26" w-sid="26">
		<div style="position:absolute;left:0;top: -148px;width: 490px;height: 900px;z-index:1;">
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
							"scene_bg":"sce_ui_sbzh"
						},
						"width":540,
						"height":900
					}
			</app-scene-base-scene>
		</div>
	</div>
</div>