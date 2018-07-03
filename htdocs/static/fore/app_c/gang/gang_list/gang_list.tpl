<div maxId="29" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
	{{let root = _get("pi/ui/root").exports}}
	
	<widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
		{"text":"门派列表","coin":["money","diamond"],"left":6,"top":15,"width":540,"width":{{root.getWidth()}} } 
	</widget>
	<div w-class="6" w-sid="6">
		<widget w-class="5" w-tag="app_a-widget-bg_frame-bg" w-sid="5">{"bgName":"bg_frame21"} 
		</widget>
		<widget w-class="7" w-tag="app_a-widget-line-line" w-sid="7">{"line":"line_7"} 
		</widget>
		<widget w-class="8" w-tag="app_a-widget-rank-rank_title" w-sid="8">{"keys":["排名","门派信息"],"split":[40,45],"padding":5,"fontSize":17,"va":""} 
		</widget> 
		<div w-class="9" w-sid="9" style="overflow: hidden;">
			<div w-class="10" w-sid="10" style="overflow-x: hidden;overflow-y: auto;">
				{{for i, v of it1.gang_list}}
				{{if i!="erl_type"}}
				<div w-class="11" w-sid="11" style="position: relative;margin-bottom: 10px">
					<widget w-class="12" w-tag="app_a-widget-bg_frame-bg" w-sid="12">{"bgName":"bg_frame19"} 
					</widget>

					{{if i-0+1 <= 3}}
					<widget w-class="13" w-tag="app_a-widget-rank-rank_num" w-sid="13">{"num":{{i-0+1}} }</widget>
					{{else}}
					<div style="width: 72px;height: 20px;z-index: 2;font-size: 34px;text-align: center;color:#f3d6af;text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: 57px;top: 46px;line-height: 20px;font-family:mnjsh">{{i-0+1}}</div>
					{{end}}
					
					{{let img = it1.Pi.pictures[it1.guild_upgrade[v.gang_level].icon_id]}}
					<div w-class="14" w-sid="14">
						<img src="{{img}}" />
					</div>
					<widget w-class="15" w-tag="app_a-widget-pic_text-pic_text" w-sid="15">{"icon":"equip_txt_bg","width":97,"height":27,"align":"center","marginLeft":3,"text":{{"Lv"+v.gang_level}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":-28} 
					</widget>

					<widget w-class="16" w-tag="app_a-widget-line-line" w-sid="16">{"line":"line_9"} 
					</widget>

					<div style="width:auto;height:25px;position:absolute;left:254px;top:10px;">
						<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19" style="position:relative;display:inline-block;z-index: 2;margin-right: 5px;"></widget>
						<span w-class="18" w-sid="18" style="position:relative;display:inline-block">{{it1.Common.fromCharCode(v.gang_name)}}</span>
						<widget w-class="20" w-tag="app_a-widget-pic_other-pic_other" w-sid="20" style="position:relative;display:inline-block;z-index: 2;margin-left: 5px;"></widget>
					</div>

					<span w-class="21" w-sid="21">会 长</span>
					<span w-class="22" w-sid="22">成员数</span>
					<div style="width:auto;height:30px;position:absolute;left:317px;top:43px;display: flex;">
						<span w-class="23" w-sid="23" style="position:relative;display:inline-block;margin-right:9px;line-height: 30px;">{{it1.Common.fromCharCode(v.leader_info.name)}}</span>

						<widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 3px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
							{"icon":{{"vip_lv_" + (it1.vip_advantage[v.leader_info.vip].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP" + v.leader_info.vip}},"top":0,"left":0} 
						</widget>
					</div>

					<span w-class="24" w-sid="24">{{v.gang_count}}/{{it1.guild_upgrade[v.gang_level].max_person}}</span>
					
				</div>
				{{end}}
				{{end}}
			</div>
		</div>
	</div>
</div>