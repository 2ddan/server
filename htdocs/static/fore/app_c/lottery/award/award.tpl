
<div class="new_auto" group="cover_top" style="position: absolute;left:0;top:0;width:100%;height:100%;{{if it1.lock}} pointer-events: none;{{end}}" >
	<div  data-desc="bag_move" w-class="s1">
		<div  w-class="s2">
			<div w-class="new_auto_title"></div>
		</div>
		{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
		{{let Common = _get("app/mod/common").exports.Common}}
		{{let Pi = it1.Pi}}
		{{let career_id = it1.player.career_id}}
		{{let change = [100057,100058]}}
		{{let bol = it1.resolve_prop}}
		{{let extra =it.extra.length}}
		{{let coin = [0,0]}}

		{{let bottom = 170}}
		{{if bol && extra}}
			{{:bottom = 220}}
		{{elseif !bol && !extra}}
			{{:bottom = 100}}
		{{end}}
		<div w-class="new_auto_bg" style="padding-top:35px;padding-bottom:{{bottom}}px;">
			
			<div scroller="1" w-class="s3">
				<div w-class="s4">
					{{let index = -1}}
					{{for i,v of it.show}}
					{{if v }}
						{{let id = v[0][0] == "money" ? 100001 : v[0][0] == "diamond" ? 100002 : v[0][0]}}
						{{if id == change[0]}}
							{{:coin[0] += v[0][1]}}
						{{elseif id == change[1]}}
							{{:coin[1] += v[0][1]}}
						{{end}}

						{{let prop = Pi.sample[id]}}
						{{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
						{{let url = Pi.pictures[icon]}}
						{{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
						{{:index = index+1}}
						<div w-class="s5 anima_{{it.show.length == 1 ? 2 : i}}" style="pointer-events: none;overflow:hidden;position: absolute;{{if it1.opacity}}opacity:1;transition:opacity 0.2s {{index/5}}s;{{end}}">
							<div class="anim_lottery_award" style="animation-iteration-count: {{index+1}};position: absolute;top:-42px;left:-44px;"></div>
						</div>
						{{:index = index+1}}
						<div on-tap="showPropInfo({{id}})" w-class="s5" style="margin:0 10px 25px;{{if it1.opacity}}opacity:1;transition:opacity 0.2s {{index/5}}s;{{end}}">
							<widget w-tag="app_a-widget-prop-base">
								{"prop":{{prop}},"url":{{url}},"color":"#ffeee2","count":{{v[0][1]}},"width":80,"height":80,"name":{{name}} }
							</widget>
							{{if prop.type == "rune" && v[0][2]}}
							<widget data-desc="已拥有" w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: -12px;z-index: 3;left: 20px;">
								{"icon":"text_has","width":80,"height":61}
							</widget>
							{{end}}
						</div>
					{{end}}
					{{end}}
				</div>
			</div>
		</div>
		{{if extra}}
		<div style="position: absolute;color:#51e650;font-size:18px;width: 400px;height:90px;left: 50%;margin-left: -200px;bottom:{{!bol ? 67 : 43}}px;z-index:2">
			<span style="font-family:mnjsh;">额外奖励：</span>	
			{{for i,v of it.extra}}
			{{if v[0] == change[0]}}
				{{:coin[0] += v[1]}}
			{{elseif v[0] == change[1]}}
				{{:coin[1] += v[1]}}
			{{end}}
			{{let prop = Pi.sample[v[0]]}}
			{{let url = Pi.pictures[prop.icon]}}
			<div on-tap="showPropInfo({{v[0]}})"  style="position:relative;display:inline-block;margin-right:20px;">
				<widget  w-tag="app_a-widget-prop-base" style="position:relative;display: inline-block;vertical-align: middle;">
					{"prop":{{v}},"url":{{url}},"color":"#ffeee2","count":"none","width":52,"height":52,"name":"none"}
				</widget>
				<span>x{{v[1]}}</span>
			</div>
			{{end}}
		</div>
		{{end}}

		{{if bol}}
		<div class="cost_bg" style="position: absolute;width: 460px;height:90px;left: 50%;margin-left: -230px;bottom:{{!extra ? 77 : 130}}px;line-height: 82px;font-size:18ppx;color:#e4c093;z-index: 1;">
			<span style="padding-left:30px;font-family:mnjsh;font-size:18px;">自动转换：</span>	
			{{for i,v of it.bag}}
			{{if v.sid == change[0] || v.sid == change[1]}}
			{{let img1 = Pi.pictures[v.icon]}}
			<div on-tap="showPropInfo({{v.sid}})" style="position:relative;color:#51e650;font-size:18px;display:inline-block;margin-right:20px;">
				<widget  w-tag="app_a-widget-prop-base" style="position:relative;display: inline-block;vertical-align: middle;">
					{"prop":{{v}},"url":{{img1}},"color":"#ffeee2","count":"none","width":52,"height":52,"name":"none"}
				</widget>
				<span>x{{v.count - (v.sid == change[0] ? coin[0] : coin[1]) }}</span>
			</div>
			{{end}}
			{{end}}
		</div>
		{{end}}

		
		<widget on-tap="goback"  w-tag="app_a-widget-btn-rect" style="position: absolute;left:50%;margin-left:-58px;bottom:20px;z-index:2">
			{"class":"default","fontsize":24,"color":"#fdedd7;","text":"确 定","width":116,"height":45} 
		</widget>
		<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;bottom:0;width:100%;height:2px;z-index:2">
			{"line":"line_11"} 
		</widget>
	</div>
</div>

