{{let Common = _get("app/mod/common").exports.Common}}
<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	<div w-class="3" w-sid="3" >
		<div w-class="39" w-sid="39">
			{{let state = it1.rune_data.rune_state}}
			{{let n1 = state[1] >= 10 ? state[0]+1 : state[0]}}
			{{let n2 = state[1]>= 10 ? 1 : state[1]+1 }}
			{{let curr = it1.rune_state[state[0]][state[1]]}}
			<img w-class="40" src="app_c/rune/images/state_bg.jpg" w-sid="40"/>
			{{if it1.anima && state[1] == 9 }}
				<div class="anim_state_up" style="position: absolute;top: -51px;left: -22px;"></div>
			{{end}}
			<img w-class="42" src="app_c/rune/images/state_2.png" w-sid="42"/>
			<div class="shadow8" w-class="6">
				<widget  w-tag="app_a-widget-pic_text-pic_text">
					{"icon":"state_level","width":78,"height":72,"text":" "} 
				</widget>
				<div w-class="7">{{curr.name}}</div>
			</div>
			
			<div style="width:100%;height:417px;position:absolute;top:0;left:0;">
				{{for i,v in it1.rune_state[1]}}
				{{if v.id}}
				<div w-class="43 index_{{i}}" w-sid="43">
					{{if i == n2}}
					<app_a-widget-select-select w-class="46" w-sid="46">
						{"select":"double_circle"} 
					</app_a-widget-select-select>
					{{if it1.anima }}
					<div class="anim_state_light" style="position: absolute;top: -55px;left: -53px;"></div>
					{{end}}
					{{end}}
					{{if (n2 > i || !curr.cost_prop)}}
						<div  w-class="45">
							<img style="vertical-align:middle;" src="app_c/rune/images/state_1.png"/>
						</div>
						{{if i>1}}
						<img w-class="line_{{i-1}}" src="../images/line_{{i<6 ? i-1 : 11-i}}.png" />
						{{end}}
					{{else}}
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

			<div style="position:absolute;width: 495px;height: 252px;left: -3px;top:382px;">
				<widget  w-tag="app_a-widget-bg_frame-bg" style="width:100%;">
					{"bgName":"bg_frame50"} 
				</widget>
				<app_a-widget-pic_other-pic_other style="position:absolute;top:-11px;left: 38px;">
					{"icon":"title_arrow"}
				</app_a-widget-pic_other-pic_other>
				<div style="text-align: center;position: absolute;width: 100%;top: 0;height: 252px;">
					{{if curr.cost_prop}}
						{{let bol = 0}}
						<div  w-class="8">
							{{for i,v of it1.rune_state[n1][n2].attr}}
							<div>
								<span style="color:#fde7ca">{{it1.attribute_config[v[0]]+": "}} </span>
								{{if curr.attr}}
								{{curr.attr[i][1]<1?Math.floor(curr.attr[i][1]*100)+"%":curr.attr[i][1]}}
								{{else}} 
								0%
								{{end}}
								<app_a-widget-pic_other-pic_other style="position:relative;vertical-align:middle;padding: 0 5px;">
									{"icon":"attr_arrow"}
								</app_a-widget-pic_other-pic_other>
								{{v[1]<1?Math.floor(v[1]*100)+"%":v[1]}}
							</div>
							{{end}}
							<div style="font-size: 16px;margin-top:5px;line-height: 24px;">{{it1.buff[it1.rune_state[n1][n2].buff_id].desc}}</div>
						</div>
						<div class="cost_bg" style="position: relative;width: 460px;height:90px;left: 50%;margin-left: -230px;margin-top: 1px;line-height: 16px;">
							{{let url = it1.Pi.pictures[it1.Pi.sample[curr.cost_prop[0]].icon]}}
							<img on-tap="gotoGetWay({{curr.cost_prop[0]}})" style="width:42px;vertical-align:middle;margin-top: 8px;" src="{{url}}" />
							{{if curr.cost_prop[1] > it1.state_count}}
								{{:bol = 1}}
							{{end}}
							<div style="color:#FFD7A8">
								<span style="color:{{bol==1 ? '#f00':'#FFD7A8'}}">{{it1.state_count}}</span>/{{curr.cost_prop[1]}}
							</div>
						</div>
						<div style="width:116px;height:45px;top: -9px;left: 50%;margin-left: -58px;position: relative;">
							{{if curr.cost_money > it1.player.money}}
								{{:bol = 2}}
							{{end}}
							<widget  w-tag="app_a-widget-coin-coin" style="color:{{bol==2 ? '#f00':'#FFD7A8'}};white-space: nowrap;position: absolute;top:46px;left:50%;transform:translateX(-50%);text-align:center">
								{"icon":{{100001 || "money"}},"width":23,"height":18,"left":4,"text":[{{Common.numberCarry(curr.cost_money,10000)}}],"color":"#FFD7A8"} 
							</widget>
							<widget w-tag="app_a-widget-btn-rect" on-tap="stateUp({{bol}})" style="position:relative;display:inline-block">
								{"class":{{bol ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7","text":"修 行","width":116,"height":45,"tip_keys":["role.rune.state"]} 
							</widget>
						</div>
					{{else}}
						<div w-class="8">
							{{for i,v of it1.rune_state[state[0]][state[1]].attr}}
							<div>
								<span style="color:#fde7ca">{{it1.attribute_config[v[0]]+"："}} </span>
								{{v[1]<1?Math.floor(v[1]*100)+"%":v[1]}}(已满级)
							</div>
							{{end}}
							<div style="font-size: 18px;margin-top:5px;line-height: 24px;">{{it1.buff[it1.rune_state[state[0]][state[1]].buff_id].desc}}</div>
						</div>
						<div class="cost_bg shadow7"  w-class="11" style="margin-top: 10px;position: relative;left: 50%;margin-left: -230px;" >已达到最高等级</div>
					{{end}}

					
				</div>	
			</div>
		</div>
		
	</div>

</div>