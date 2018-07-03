{{let root = _get("pi/ui/root").exports}}
{{let scenename = _get("app/scene/scene").exports.mgr_data.name}}
<div class="playermission"  group="main" animate="show_v" animate_time="10" style="z-index: 1;position: absolute;bottom:200px;width: 420px;left: 50%;margin-left: -{{root.getWidth() / 2}}px;">
	{{if it1 && !!(it1.currTask - 0)}}
	
	<div style="width:206px;height:54px;position:absolute;left:0px;top:0;font-family: mnjsh;" {{if it1.currList.type !== 'jjc_rank'}}{{if it1.progress < it1.currList.arg}}on-tap="gotoMission('{{it1.currList.func}}')"{{else}}on-tap="getAward"{{end}}{{else}}{{if it1.progress <= it1.currList.arg}}on-tap="getAward"{{else}}on-tap="gotoMission('{{it1.currList.func}}')"{{end}}{{end}}>
		<app_a-widget-guide-guide>
			{{"mission"}}
		</app_a-widget-guide-guide>
		{{if it1.currList.type !== 'jjc_rank'}}
			{{if it1.progress >= it1.currList.arg}}
				<div class="playermission_border" style="position: absolute;top: -16px;z-index: 1;"></div>
				<div class="playermission_left" style="position: absolute;top: -73px;left: -4px;z-index: 1;"></div>
			{{else}}
				<div class="mission_icon" style="top: -17px;z-index: 1;"></div>
			{{end}}
		{{else}}
			{{if it1.progress <= it1.currList.arg}}
				<div class="playermission_border" style="position: absolute;top: -16px;z-index: 1;"></div>
				<div class="playermission_left" style="position: absolute;top: -73px;left: -4px;z-index: 1;"></div>
			{{else}}
				<div class="mission_icon" style="top: -17px;z-index: 1;"></div>

			{{end}}
		{{end}}
		<div class="playermission_bg" style="left: 0px;top: 0px;pointer-events:none;">
			<div style="white-space: nowrap;margin-left:50px;position:relative;text-align: left;width: auto;height: 16px;line-height: 16px;font-size: 16px;color:#fff;top: 10px;">
				{{it1.currList.des}}
			</div>
			<div w-clazz="prop_num_text" style="margin-left:48px;position:relative;right: 0px;text-align: left;height: 16px;line-height: 16px; margin-top: -4px;top: 16px;">
 
				{{let process = it1.progress}}
				{{let _arr = ["wild_mission","wild_boss","role_level","skill_level","treasure","treasure_skill","treasure_phase","reclam","ep_levelup","ep_level","jjc_rank","mission","wild_randomboss","mystic_box","ep_diamond","dailyFB","guild","tower_point","instance","ep_star","gestFB","rebel","gest","soul","treasure_hexagram"]}}

				{{if _arr.indexOf(it1.currList.type) == -1 }}
					{{: process = process >= it1.currList.arg ? 1 : 0}}
				{{end}}

				{{let limit = 1}}
				{{if _arr.indexOf(it1.currList.type) >= 0}}
				{{: limit = it1.currList.arg}}
				{{end}}

				{{if (it1.currList.type == "jjc_rank") && (it1.progress <= it1.currList.arg[1] || it1.progress <= it1.currList.arg)}}
					<span style="color: #03fe03;font-size: 16px;">已完成</span>
					
				{{elseif (it1.currList.type != "jjc_rank") && (it1.progress >= it1.currList.arg[1] || it1.progress >= it1.currList.arg) }}
					<span style="color: #03fe03;font-size: 16px;">已完成</span>

				{{: process = limit}}
				{{else}}
					<span style="color:#ff4830;font-size: 16px;">({{process == -1 ? 0 : process}}/{{process == -1 ? 1 : limit }})</span>
				{{end}}
				
			</div>
		</div>
	</div>
	{{end}}

</div>
