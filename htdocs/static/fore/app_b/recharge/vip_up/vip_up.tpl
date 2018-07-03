
<div on-tap="cancel" style="position: absolute;left:0;top:0;width:100%;height:100%;" >
	<div  style="position: absolute;width:538px;height: 356px;left: 50%;top: 50%;transform:translate(-50%,-50%);">
		<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;top:0;width:100%;height:2px;z-index:2">
			{"line":"line_11"} 
		</widget>
		<widget  w-tag="app_a-widget-bg_frame-bg" style="height:100%">
			{"bgName":"bg_frame54"} 
		</widget>
		<div data-desc="左边部分" style="position: absolute;left: 20px;top: 58px;width: 166px;height: 234px;text-align: center;">
			<img src="../images/vip_up_2.png" />
			<div style="position: absolute;width: 166px;height: 169px;line-height: 185px;margin-top: 10px;">
				<img style="position: absolute;left: 0;top: 0;" src="../images/vip_up_1.png" />
				<widget w-tag="app_a-widget-text-text" style="position: relative;vertical-align: middle;">
					{"text":{{it}},"fontSize":51,"textCfg":"activity","space":-3} 
				</widget>
			</div>
		</div>

		<div data-desc="右边部分" style="position: absolute;left: 195px;top: 21px;width: 322px;height: 318px;text-align: left;">
			<div data-desc="贵族VIP等级" style="position:absolute;left:0;top:0;width:100%;height:54px;line-height: 54px;">
				<widget  w-tag="app_a-widget-bg_frame-bg" style="width: 100%;height: 100%;left: 0;top: 0;">
					{"bgName":"bg_frame30"} 
				</widget>
				<div style="position: relative;padding-left: 30px;white-space: nowrap;font-size:20px;font-family:mnjsh;">
					<span class="shadow7" style="color:#fde7ca;">贵族VIP等级</span>
					<img style="vertical-align: middle;padding: 0 20px 0 40px;" src="../images/vip_up_arrow.png" />
					<widget class="shadow7" style="position:relative;display:inline-block;vertical-align: middle;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
						{"icon":{{"vip_lv_"+(it1.vip_advantage[it].lv_frame || 1)}},"width":82,"height":41,"align":"center","text":{{"VIP"+it}},"top":0,"left":0} 
					</widget>
				</div>
			</div>

			<div data-desc="贵族特权" style="position:absolute;left:0;top:56px;width:100%;height:68px;line-height: 74px;padding-left: 30px;box-sizing:border-box">
				<span class="shadow7" style="color:#fde7ca;font-size:20px;font-family:mnjsh;">贵族特权</span>
				<widget on-tap="goToVip"  w-tag="app_a-widget-btn-rect" style="position: absolute;right: 7px;top: 18px;">
					{"class":"default","fontsize":20,"color":"#fdedd7;","text":"点击查看","width":86,"height":35} 
				</widget>
				
				<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:9%;bottom:0;width:92%;height:2px;z-index:2">
					{"line":"line_10"} 
				</widget>
			</div>


			{{let Pi = it1.Pi}}
			{{let career_id = it1.career_id}}
			{{let diamond = it1.diamond}}
			{{let curr = it1.superData[it]}}
			<div data-desc="贵族礼包" style="position: absolute;left: 30px;top: 148px;width: 285px;height: 100px;text-align: left;">
				<span class="shadow7" style="color:#fde7ca;font-size:20px;font-family:mnjsh;">贵族礼包</span>
				<div data-desc="物品" class="shadow" style="position: absolute;top: 30px;left:0;height: 63px;width:100%;overflow: hidden;color: #fff ">
					<div style=" position: absolute;top: 0px;left: 0px;bottom: 0px;height: 80px;width: 285px;overflow-y: hidden;overflow-x: auto;text-align: center;white-space: nowrap;">
						{{for i,v in curr['goods'] }}
						{{let prop = Pi.sample[v[0]]}}
						{{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
						{{let url = Pi.pictures[icon]}}
						<div data-desc="物品" on-tap='propInfoShow({{v[0]}})' style="position:relative;display:inline-block;height:56px;width:56px;">
							<app_a-widget-prop-base >
								{"prop":{{prop}},"url":{{url}},"width":56"height":56,"count": {{prop.type != "equip" ? v[1] : "none"}},"name":"none","bg":0,"right":8,"top":22}
							</app_a-widget-prop-base>
		
							{{if prop.type == "equip"}}
							<div data-desc="装备等级"  style="bottom:7px;color:#fff;position: absolute;right: 10px;z-index: 2;" >{{"Lv"+prop.level[1] || 20}}</div>
							{{end}}
						</div>
						
						{{end}}
						{{if curr["money"]}}
						{{let prop = it1.Pi.sample[100001]}}
						<div data-desc="物品" on-tap='propInfoShow(100001)' style="position:relative;display:inline-block;margin:11px 4px 0;height:56px;width:56px;">
							<app_a-widget-prop-base >
								{"prop":{{prop}},"url":{{it1.Pi.pictures[ prop.icon ]}},"width":56"height":56,"count": {{it1.superData[it]["money"]}},"name":"none","bg":0,"right":8,"top":22}
							</app_a-widget-prop-base>
						</div>
						{{end}}
					</div>
				</div>
			</div>

		
			<div style="width:116px;height:45px;position: absolute;left:50%;margin-left:-58px;bottom:20px;z-index:2">
				{{let bol = curr.cost > diamond}}
				<widget on-tap="superBuy({{bol ? 0 : it}})"  w-tag="app_a-widget-btn-rect" style="position:relative;">
					{"class":{{bol ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7","text":"购 买","width":116,"height":45} 
				</widget>
				{{let col = bol ? "#f00" :"#ffd8a6"}}
				<widget  w-tag="app_a-widget-coin-coin" style="color:{{col}};white-space: nowrap;position: absolute;top:46px;left:50%;transform:translateX(-50%);text-align:center">
					{"icon":"diamond","width":23,"height":18,"left":4,"text":[{{curr.cost}}],"color":"#FFD7A8"} 
				</widget>
			
			</div>
		</div>
		<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;bottom:0;width:100%;height:2px;z-index:2">
			{"line":"line_11"} 
		</widget>
	</div>
</div>

