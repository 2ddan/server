
<div class="new_auto" group="cover_top" style="position: absolute;left:0;top:0;width:100%;height:100%;z-index: 4;">
	{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let Pi = it1.Pi}}
	{{let player = _get("app/mod/db").exports.data}}
	{{let career_id = player.player.career_id}}
	{{let bol = it.resolve_equip[1]}}

	<div  data-desc="bag_move" style="position: absolute;width:538px;height: auto;left: 50%;top: 80px;margin-left: -269px;overflow: hidden;">
		<div style="position: absolute;top: -35px;width: 100%;height: 238px;z-index: 2;">
			<div w-class="new_auto_title"></div>
		</div>
		
		<div w-class="new_auto_bg" style="padding-bottom:{{!bol ? 100:190}}px;">
			
			<div scroller="1" style="position: relative;height: auto;width: 100%;min-height: 110px;text-align: center;max-height: 420px;overflow-y: auto;overflow-x: hidden;z-index:2">
				<div style="position: relative;height: auto; width: 100%;padding: 0 10px;box-sizing: border-box;margin-top:10px;">
					

					{{if it.bag}}
					{{for index, cnt of it.bag}}
					{{if cnt.sid != 100057 && cnt.sid != 100058}}
					{{let icon = cnt.module ? cnt.module[cnt.career_id.indexOf(career_id)][0] : cnt.icon}}
					{{let name11 = checkTypeof(cnt.name,"Array") ? cnt.name[cnt.career_id.indexOf(career_id)] : cnt.name}}
					<div style="position: relative;display: inline-block;width: 82px;height: 82px;margin:0 10px 25px;text-align: center;">
						{{let img = Pi.pictures[icon]}}
						<widget w-tag="app_a-widget-prop-base" >
							{"prop":{{cnt}},"url":{{img}},"color":"#ffeee2","count":{{cnt.count?cnt.count:1}},"width":80,"height":80,"name":{{name11}} }
						</widget>
						{{if cnt.type == "rune" && 1}}
						<widget data-desc="已拥有" w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: -12px;z-index: 3;left: 20px;">
							{"icon":"text_has","width":80,"height":61}
						</widget>
						{{end}}
					</div>
					{{end}}
					{{end}}
					{{end}}

					{{let special = {"money":100001,"diamond":100002,"add_exp":100003,"rmb":100002,"exp":100003,"spirit":100004,"gest_coin":100019,"treasure_coin":100016,"partner_coin":100013,"weapon_coin":100009,"soul_coin":100008,"equip_coin":100005, "diamond_gest_coin":100020,"vip_exp":100255,"gang_contribute":150005} }}
					
					{{if it.player}}
					{{for i in it.player}}
					{{let _prop = Pi.sample[special[i]]}}
					<div style="position: relative;display: inline-block;width: 82px;height: 82px;margin:0 10px 25px;text-align: center;">
						{{let img1 = Pi.pictures[_prop.icon]}}
						<widget  w-tag="app_a-widget-prop-base" >
							{"prop":{{_prop}},"url":{{img1}},"color":"#ffeee2","count":{{it.player[i]}},"width":80,"height":80,"name":{{_prop.name}} }
						</widget>
					</div>
					{{end}}
					{{end}}
				</div>
			</div>
		</div>
		{{if it.resolve_equip[1]}}
		<div class="cost_bg" style="position: absolute;width: 460px;height:90px;left: 50%;margin-left: -230px;bottom:70px;line-height: 82px;font-size:18ppx;color:#e4c093;z-index: 1;">
			<span style="padding-left:30px;">背包已满，溢出装备转换 </span>	
			{{for i,v of it.resolve_equip[0]}}
			{{let prop = Pi.sample[v[0]]}}
			{{let _icon = prop.icon ? prop.icon : prop.module[prop.career_id.indexOf(career_id)][0]}}
			{{let img1 = Pi.pictures[_icon]}}
			<div style="position:relative;color:#51e650;font-size:18px;display:inline-block">
				<widget  w-tag="app_a-widget-prop-base" style="position:relative;display: inline-block;vertical-align: middle;">
					{"prop":{{prop}},"url":{{img1}},"color":"#ffeee2","count":"none","width":52,"height":52,"name":"none"}
				</widget>
				<span>x{{Math.floor(v[1] * it.resolve_equip[1])}}</span>
			</div>
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

