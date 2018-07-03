{{let Common = _get("app/mod/common").exports.Common}}
<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	
	<div w-class="3" w-sid="3" >
		<widget w-class="4" w-tag="app_a-widget-btn-ling" w-sid="4" on-tap="practiceAttr" >
			{"class":"default","fontsize":20,"color":"#49312E","text":" 属性 总览","width":77,"height":77,"textCfg":"lingBtn"} 
		</widget>
		<div w-class="39" w-sid="39">
			<img w-class="40" src="app_c/rune/images/practice_bg.jpg" w-sid="40"/>
			<img w-class="42" src="app_c/rune/images/practice_2.png" w-sid="42"/>
			{{let practice = it1.rune_data.rune_practice}}
			{{let n1 = practice[1] >= 8 ? practice[0]+1 : practice[0]}}
			{{let n2 = practice[1]>= 8 ? 1 : practice[1]+1 }}
			{{let curr = it1.rune_practice[practice[0]][ practice[1] ]}}
			<widget class="shadow8" w-tag="app_a-widget-pic_text-pic_text"  w-class="6">
				{"icon":"name_bg_2","width":150,"height":50,"text":{{(curr.cost_prop ? n1 :n1-1)+"阶"}}} 
			</widget>
			
			<div style="width:100%;height:363px;position:absolute;top:0;left:0;">
				{{for i,v in it1.rune_practice[1]}}
				{{if v.id}}
				<div w-class="43 index_{{i}}" w-sid="43">
					{{if (n2 > i || !curr.cost_prop)}}
						<img w-class="45" src="app_c/rune/images/practice_1.png" w-sid="45"/>
						<div w-class="line line_{{i}}"></div>
					{{else}}
						{{if n2 == i}}
							<app_a-widget-select-select w-class="47" w-sid="47">
								{"select":"double_circle","width":60} 
							</app_a-widget-select-select>
							{{if it1.anima }}
							<div class="anim_practice_light" style="position: absolute;top: -33px;left: -26px;"></div>
							{{end}}
						{{end}}
						{{if !it1.anima || it1.anima && i != n2 }}
						<app_a-widget-pic_other-pic_other  w-class="46">
							{"icon":"closed"}
						</app_a-widget-pic_other-pic_other>
						{{end}}
					{{end}}
				</div>
				{{end}}
				{{end}}
			</div>

			<div style="position:absolute;width: 440px;height: 302px;left: 50%;margin-left: -220px;top:355px;">
				<widget  w-tag="app_a-widget-bg_frame-bg">
					{"bgName":"bg_frame50"} 
				</widget>
				<app_a-widget-pic_other-pic_other style="position:absolute;top:-11px;left: 11px;">
					{"icon":"title_arrow"}
				</app_a-widget-pic_other-pic_other>
				<div style="text-align: center;position: absolute;width: 100%;top: 0;height: 252px;">
					{{if curr.cost_prop}}
					{{let bol = 0}}
					<div w-class="18"  w-sid="18">
						<div w-class="19" w-sid="19">
							<div w-class="20">当前经脉属性</div>
							<div w-class="31" w-sid="31">
								<div w-class="32" class="scroll_box_v" layout="scroll" w-sid="32">
									{{if !curr.attr}}
									<div style="color:#f00;margin-top:28px;">未获得属性</div>	
									{{else}}
									{{for n,h of curr.attr}}
									<div style="white-space:nowrap">
										{{it1.attribute_config[h[0]]+"+"+(h[1]<1?Math.floor(h[1]*100)+"%":h[1])}}
									</div>
									{{end}}
									{{end}}
								</div>
							</div>
						</div>
						<div style="position: relative;margin: 0px 40px -16px;display: inline-block;vertical-align: middle;width: 40px;">
							<app_a-widget-btn_pic-btn_pic >
								{"icon":"light_arraw","width":40}
							</app_a-widget-btn_pic-btn_pic>
						</div>
					
						<div w-class="19" w-sid="19">
							<div w-class="20">下级经脉属性</div>
							<div w-class="31" w-sid="31">
								<div w-class="32" class="scroll_box_v" layout="scroll" w-sid="32">
									{{for o,p of it1.rune_practice[n1][n2].attr}}
									<div style="white-space:nowrap">{{it1.attribute_config[p[0]]+"+"+(p[1]<1?Math.floor(p[1]*100)+"%":p[1])}}</div>
									{{end}}
								</div>
							</div>
						</div>
		
						
					</div>
					
					<div class="cost_bg" style="position: absolute;width: 460px;height:90px;left: 50%;margin-left: -230px;top:145px;line-height: 16px;">
						{{let url = it1.Pi.pictures[it1.Pi.sample[curr.cost_prop[0]].icon]}}
						<img on-tap="gotoGetWay({{curr.cost_prop[0]}})"  style="width:42px;vertical-align:middle;margin-top: 8px;" src="{{url}}" />
						{{if curr.cost_prop[1] > it1.practice_count}}
							{{:bol = 1}}
						{{end}}
						<div style="color:#FFD7A8">
							<span style="color:{{bol==1 ? '#f00':'#FFD7A8'}}">{{it1.practice_count}}</span>/{{curr.cost_prop[1]}}
						</div>
					</div>
					<div style="width:116px;height:45px;top: 226px;left: 50%;margin-left: -58px;position: absolute;">
						{{if curr.cost_money > it1.player.money}}
							{{:bol = 2}}
						{{end}}
						<widget  w-tag="app_a-widget-coin-coin" style="color:{{bol==2 ? '#f00':'#FFD7A8'}};white-space: nowrap;position: absolute;top:46px;left:50%;transform:translateX(-50%);text-align:center">
							{"icon":{{100001 || "money"}},"width":23,"height":18,"left":4,"text":[{{Common.numberCarry(curr.cost_money,10000)}}],"color":"#FFD7A8"} 
						</widget>
						<widget w-tag="app_a-widget-btn-rect" on-tap="practiceUp({{bol}})" style="position:relative;display:inline-block">
							{"class":{{bol ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7","text":"打 通","width":116,"height":45,"tip_keys":["role.rune.practice"]} 
						</widget>
					</div>
					
					{{else}}
					<div w-class="18"  w-sid="18" style="font-size:20px;top:16px;position: relative;text-align: left;width: auto;display: inline-block;">
						<div w-class="20">满级经脉属性</div>
						<div w-class="31" w-sid="31">
							<div w-class="32" class="scroll_box_v" layout="scroll" w-sid="32">
								{{for n,h of curr.attr}}
								<div>
									{{it1.attribute_config[h[0]]+"+"+(h[1]<1?Math.floor(h[1]*100)+"%":h[1])}}
								</div>
								{{end}}
							</div>
						</div>
					</div>
					<div class="cost_bg shadow7" w-class="7" style="left:-10px;">已达到最高等级</div>
					{{end}}
				</div>	
			</div>
		</div>
	</div>
</div>