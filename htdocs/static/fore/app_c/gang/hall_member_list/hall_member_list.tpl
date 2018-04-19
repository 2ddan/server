<div maxId="97" style="position:absolute;width:100%;height:100%;top: 44px;"  test="test" w-sid="2">
	<widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
		{"bgName":"bg_frame21"} 
	</widget>
	{{let Common = _get("app/mod/common").exports.Common}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let gang = appCfg.gang.data}}
    {{let Util = _get("app/mod/util").exports.Util}}
	<div w-class="79" w-sid="79">
		<div  scroller="1" w-class="80" w-sid="80">
			{{for i, v of it1.gang_member}}
			{{if v}}
			<div w-class="81" w-sid="81">
				<widget w-class="82" w-tag="app_a-widget-bg_frame-bg" w-sid="82">
					{"bgName":"bg_frame19"} 
				</widget>

				{{let img = ""}}
				{{if v.head && v.head.indexOf("undefined") < 0}}
				{{: img = v.head}}
				{{else}}
				{{: img = (Pi.pictures['playerhead'+v.career_id])}}
				{{end}}
				<widget on-tap="{{if v.role_id!=player.role_id}}roleInfoClick({{i}}){{end}}" w-class="84" w-tag="app_a-widget-head-friend" w-sid="84">
					{"url":{{img}},"quality":{{v.role_quality}},"type":"player","prop":{{v?v:0}},"level":{{v.level}},"color":"#b5e8ff"}
				</widget>
				<div w-class="85" w-sid="85">
					{{let time = Util.getIntervalDate(Util.serverTime(true)-v.time)}}
					{{let txt = time[0] ? time[0]+"天"  : time[1] ? time[1]+"小时" :  time[2] ?time[2]+"分钟" : '' }}
					{{if v.stat}}
					在线
					{{else}}
					<span style="color:#946f61;">{{"离线"+txt}}</span>
					{{end}}
				</div>
				<div w-class="86" w-sid="86">
					<span w-class="87" w-sid="87"> {{Common.fromCharCode(v.name)|| v.role_id}}</span>
					<div w-class="89" w-sid="89">
						<img style="vertical-align: middle;margin-top: -6px;margin-right: 8px;" src="../images/mem_{{v.post || 3}}.png"/>
						<widget w-class="88" w-tag="app_a-widget-text-text" w-sid="88">{"text":{{"VIP"+v.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
						</widget>
					</div>
					<widget w-class="91" w-tag="app_a-widget-power-power" w-sid="91">
						{"type":2,"top":16,"left":52,"power":{{v.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
					</widget>
				</div>
				<widget w-class="92" w-tag="app_a-widget-line-line" w-sid="92">{"line":"line_9"} 
				</widget>
				<div w-class="93" w-sid="93">
					<div w-class="32" w-sid="32">
						<widget w-class="62" w-tag="app_a-widget-pic_text-pic_text" w-sid="62">
							{"icon":"little_tips_bg","width":126,"height":27,"align":"center","marginLeft":0,"text":"门派贡献","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
						</widget>
						<span w-class="34" w-sid="34">1000</span>
					</div>
				</div>
			</div>
			{{end}}
			{{end}}
		</div>
	</div>
	{{if it1.gangData.post == 1}}
	<widget on-tap="DisbandClick"  w-tag="app_a-widget-btn-rect" style="position:absolute;top:672px;left:45px;">
		{"class":"default","fontsize":24,"color":"#fdedd7","text":"解散公会","width":116,"height":45} 
	</widget>
	{{else}}
	<widget on-tap='exitClick'  w-tag="app_a-widget-btn-rect" style="position:absolute;top:672px;left:45px;">
		{"class":"default","fontsize":24,"color":"#fdedd7","text":"退出公会","width":116,"height":45} 
	</widget>
	{{end}}
	<div style="position:absolute;top:678px;left:376px;font-size:20px;color:#fde7ca;font-family:mnjsh;">
		成员:{{it1.gangData.gang_count+"/"+it1.guild_upgrade[gang.gang_level].max_person}}
	</div>
</div>