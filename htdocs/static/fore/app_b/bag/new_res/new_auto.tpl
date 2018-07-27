
<div class="new_auto" group="cover_top" style="position: absolute;left:0;top:0;width:100%;height:100%;z-index: 4;" on-tap="goback">
	<div  data-desc="bag_move" style="position: absolute;width:538px;height: auto;left: 50%;top:200px;margin-left: -269px;overflow: hidden;animation:showNewRes 2s forwards;">
		<div style="position: absolute;top: -35px;width: 100%;height: 238px;z-index: 2;">
			<div w-class="new_auto_title"></div>
		</div>
		
		<div w-class="new_auto_bg" >
			{{let appCfg = _get("app/mod/db").exports.data}}
			{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
			{{let player = appCfg.player}}
			{{let career_id = player.career_id}}
			{{let Common = _get("app/mod/common").exports.Common}}
			{{let Pi = _get("app/mod/pi").exports.Pi}}
			<div scroller="1" style="position: relative;height: auto;width: 100%;min-height: 110px;text-align: center;max-height: 420px;overflow-y: auto;overflow-x: hidden;z-index:2">
				<div style="position: relative;height: auto; width: 100%;padding: 0 10px;box-sizing: border-box;">
					
					{{if it.bag}}
					{{for index, cnt of it.bag}}
					{{let icon = cnt.module ? cnt.module[cnt.career_id.indexOf(career_id)][0] : cnt.icon}}
					{{let name11 = checkTypeof(cnt.name,"Array") ? cnt.name[cnt.career_id.indexOf(career_id)] : cnt.name}}
					<div style="position: relative;display: inline-block;width: 82px;height: 82px;margin:0 10px 25px;text-align: center;">
						{{let img = Pi.pictures[icon]}}
						<widget w-tag="app_a-widget-prop-base" >
							{"prop":{{cnt}},"url":{{img}},"color":"#ffeee2","count":{{cnt.count?cnt.count:1}},"width":80,"height":80,"name":{{name11}} }
						</widget>
					</div>
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
		<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;bottom:0;width:100%;height:2px;z-index:2">
			{"line":"line_11"} 
		</widget>
	</div>
</div>

