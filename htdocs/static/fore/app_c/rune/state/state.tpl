{{let Common = _get("app/mod/common").exports.Common}}
<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	
	<div w-class="3" w-sid="3" >
		<widget w-class="4" w-tag="app_a-widget-btn-ling" w-sid="4" on-tap="stateAttr" >
			{"class":"default","fontsize":20,"color":"#49312E","text":" 属性 总览","width":77,"height":77,"textCfg":"lingBtn"} 
		</widget>
		<div w-class="39" w-sid="39">
			<img w-class="40" src="app_c/rune/images/state_bg.jpg" w-sid="40"/>
			<img w-class="42" src="app_c/rune/images/state_2.png" w-sid="42"/>
			{{let state = it1.rune_data.rune_state}}
			{{let n1 = state[1] >= 10 ? state[0]+1 : state[0]}}
			{{let n2 = state[1]>= 10 ? 1 : state[1]+1 }}
			{{let curr = it1.rune_state[state[0]][state[1]]}}
			<div class="shadow8" w-class="6">
				<widget  w-tag="app_a-widget-pic_text-pic_text">
					{"icon":"state_level","width":78,"height":72,"text":" "} 
				</widget>
				<div w-class="7">{{"第"+ (curr.cost_prop ? n1 :n1-1) + "重" }}</div>
			</div>
			
			<div style="width:100%;height:417px;position:absolute;top:0;left:0;">
				{{for i,v in it1.rune_state[1]}}
				{{if v.id}}
				<div w-class="43 index_{{i}}" w-sid="43" on-tap="selectState({{i}})">
					{{if i == it1.index_state}}
					<app_a-widget-select-select w-class="46" w-sid="46">
						{"select":"double_circle"} 
					</app_a-widget-select-select>
					{{end}}
					{{if (n2 > i || !curr.cost_prop)}}
						<img w-class="45" src="app_c/rune/images/state_1.png" w-sid="45"/>
						{{if i>1}}
						<img w-class="line_{{i-1}}" src="../images/line_{{i<6 ? i-1 : 11-i}}.png" />
						{{end}}
					{{else}}
						<app_a-widget-pic_other-pic_other  w-class="46">
							{"icon":"closed"}
						</app_a-widget-pic_other-pic_other>
					{{end}}
				</div>
				{{end}}
				{{end}}
			</div>

			<div style="position:absolute;width: 440px;height: 252px;left: 50%;margin-left: -220px;top:405px;">
				<widget  w-tag="app_a-widget-bg_frame-bg">
					{"bgName":"bg_frame50"} 
				</widget>
				<app_a-widget-pic_other-pic_other style="position:absolute;top:-11px;left: 11px;">
					{"icon":"title_arrow"}
				</app_a-widget-pic_other-pic_other>
				<div style="text-align: center;position: absolute;width: 100%;top: 0;height: 252px;">
					{{if curr.cost_prop}}
						{{if it1.index_state == n2}}
						{{let bol = 0}}
						<div  w-class="8">
							{{for i,v of it1.rune_state[n1][n2].attr}}
							<div w-class="{{9+i}}">{{it1.attribute_config[v[0]]+"+"+(v[1]<1?Math.floor(v[1]*100)+"%":v[1])}}</div>
							{{end}}
							<div>{{it1.buff[it1.rune_state[n1][n2].buff_id]}}</div>
						</div>
						<div class="cost_bg" style="position: absolute;width: 460px;height:90px;left: 50%;margin-left: -230px;top:91px;line-height: 16px;">
							{{let url = it1.Pi.pictures[it1.Pi.sample[curr.cost_prop[0]].icon]}}
							<img on-tap="gotoGetWay({{curr.cost_prop[0]}})" style="width:42px;vertical-align:middle;margin-top: 8px;" src="{{url}}" />
							{{if curr.cost_prop[1] > it1.state_count}}
								{{:bol = 1}}
							{{end}}
							<div style="color:#FFD7A8">
								<span style="color:{{bol==1 ? '#f00':'#FFD7A8'}}">{{it1.state_count}}</span>/{{curr.cost_prop[1]}}
							</div>
						</div>
						<div style="width:116px;height:45px;top: 175px;left: 50%;margin-left: -58px;position: absolute;">
							{{if curr.cost_money > it1.player.money}}
								{{:bol = 2}}
							{{end}}
							<widget  w-tag="app_a-widget-coin-coin" style="color:{{bol==2 ? '#f00':'#FFD7A8'}};white-space: nowrap;position: absolute;top:46px;left:50%;transform:translateX(-50%);text-align:center">
								{"icon":{{100001 || "money"}},"width":23,"height":18,"left":4,"text":[{{Common.numberCarry(curr.cost_money,10000)}}],"color":"#FFD7A8"} 
							</widget>
							<widget w-tag="app_a-widget-btn-rect" on-tap="stateUp({{bol}})" style="position:relative;display:inline-block">
								{"class":{{bol ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7","text":"修 行","width":116,"height":45} 
							</widget>
						</div>
						{{elseif it1.index_state < n2}}
						<div w-class="8">
							{{for i,v of it1.rune_state[state[0]][it1.index_state].attr}}
							<div w-class="{{9+i}}">{{it1.attribute_config[v[0]]+"+"+(v[1]<1?Math.floor(v[1]*100)+"%":v[1])}}</div>
							{{end}}
							<div>{{it1.buff[it1.rune_state[state[0]][it1.index_state].buff_id]}}</div>
						</div>
						<widget w-tag="app_a-widget-btn-rect" style="width:116px;height:45px;top: 175px;left: 50%;margin-left: -58px;position: absolute;">
							{"class":"disabled","fontsize":24,"color":"#fdedd7","text":"已修行","width":116,"height":45} 
						</widget>
						{{end}}
					{{else}}
					<div w-class="8">
						{{for i,v of it1.rune_state[state[0]][it1.index_state].attr}}
						<div w-class="{{9+i}}">{{it1.attribute_config[v[0]]+"+"+(v[1]<1?Math.floor(v[1]*100)+"%":v[1])}}</div>
						{{end}}
						<div>{{it1.buff[it1.rune_state[state[0]][it1.index_state].buff_id]}}</div>
					</div>
					<div class="cost_bg shadow7"  w-class="11" >已达到最高等级</div>
					{{end}}

					
				</div>	
			</div>
		</div>
		
	</div>

</div>