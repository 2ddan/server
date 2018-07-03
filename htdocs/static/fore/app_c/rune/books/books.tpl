<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	
	<div w-class="3" w-sid="3" style="color:#fff">
		<widget w-class="4" w-tag="app_a-widget-btn-ling" w-sid="4" on-tap="booksAttr" >
			{"class":"default","fontsize":20,"color":"#49312E","text":" 效果 总览","width":77,"height":77,"textCfg":"lingBtn"} 
		</widget>
		<widget w-class="4" w-tag="app_a-widget-btn-ling" w-sid="4" on-tap="booksCollect"  style="left:7px;right: 0;">
			{"class":"default","fontsize":20,"color":"#49312E","text":" 符文 收集","width":77,"height":77,"textCfg":"lingBtn"} 
		</widget>
		<div class="shadow7" w-class="39" w-sid="39">
			<img w-class="40" src="app_c/rune/images/book_bg.jpg" w-sid="40"/>
			<div style="position: absolute;left: 102px;top: 38px;animation:lottery_float 2.5s infinite">
				<div class="anim_rune_flag"></div>
			</div>
			{{for i,v in it1.rune}}
			<div w-class="43 index_{{i-1}}" w-sid="43" on-tap="selectPore({{i}})">
				<div w-class="44" w-sid="44">
					{{v[0].name}}
				</div>
				{{let sid = it1.rune_data.rune_set[i-1]}}
				{{if sid}}
					{{let prop = it1.Pi.sample[sid]}}
					{{if prop.effect}}
					<div w-class="45">
						<img src="app_c/rune/images/book_1.png" w-sid="45"/>
						<div class="anim_rune_high" style="position: absolute;top:-15px;left:-14px;"></div>
					</div>
					{{else}}
					<img w-class="45" src="app_c/rune/images/state_1.png" w-sid="45"/>
					{{end}}
				{{else}}
				<app_a-widget-pic_other-pic_other  w-class="47">
					{"icon":"closed"}
				</app_a-widget-pic_other-pic_other>
				{{end}}
				{{if it1.index == i}}
				<app_a-widget-select-select w-class="46" w-sid="46">
					{"select":"double_circle"} 
				</app_a-widget-select-select>
				{{end}}
				<app-widget-tip-tip style="right: 0;">
					{"tip_keys":[{{"role.rune.book." + (i - 1)}}] }
				</app-widget-tip-tip>
			</div>
			{{end}}
		</div>
		<div w-class="73" w-sid="73">
			<div style="height: 191px;position: absolute;top:0;left: 0;right: 0;">
				<div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
				<div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
				<div class="attr_bg_right" style="right:0px;bottom:0px"></div>
	
				<div class="cover_title shadow6" w-class="74">符文选择</div>
			</div>
			<div style="position: absolute;top: 27px;;left:16px;height:134px;width:437px;overflow:hidden;">
				<div style="white-space:nowrap;overflow-y:hidden;overflow-x:auto;height:150px;">
					{{for i,v of it1.rune[it1.index]}}
					{{let prop = it1.Pi.sample[v.prop_id]}}
					{{let url = it1.Pi.pictures[prop.icon]}}
					{{let has = it1.rune_data.rune_set[v.solt_id-1] != v.prop_id && !it1.rune_arr[v.prop_id]}}
					<div w-class="75" w-sid="75" on-tap="selectBook({{i}})" >
						{{if it1.index_book == i}}
						<app_a-widget-select-select w-class="78" w-sid="78">
							{"select":"switch"} 
						</app_a-widget-select-select>
						{{end}}
						<div style="{{if has}}filter: grayscale(100%);{{end}}">
							<app_a-widget-img_stitch-stitch w-class="77" w-sid="77">
								{"type":2,"width":15,"height":15} 
							</app_a-widget-img_stitch-stitch>
							<app_a-widget-prop-base w-class="76" w-sid="76">
								{"effect":{{prop.effect}},"width":76,"height":76,"prop":{{prop}},"url":{{url}},"count":"none","name":{{prop.name}},"bg":1,"bottom":20,"top":25,"right":25} 
							</app_a-widget-prop-base>
							
							{{if it1.rune_data.rune_set[it1.index-1] == v.prop_id}}
							<div style="position: absolute;right: -1px;top: -5px;z-index: 2;">
								<app_a-widget-pic_text-pic_text>
									{"icon":"shop_vip_discount","width":64,"height":77,"align":"center","text":" "} 
								</app_a-widget-pic_text-pic_text>
								<div class="shadow7" style="color:#fff;font-size:16px;font-family:mnjsh;transform:rotate(45deg);position: absolute;top: 22px;right: -2px;">已装备</div>
							</div>
							{{end}}
						</div>
						{{if !has && i == 0}}
						<app-widget-tip-tip style="right: 0;top: 0">
							{"tip_keys":[{{"role.rune.book." + (it1.index - 1)}}] }
						</app-widget-tip-tip>
						{{end}}
					</div>
					{{end}}
				</div>
			</div>
			<div class="cost_bg" w-class="79" >
				{{let curr = it1.rune[it1.index][it1.index_book]}}
				<div w-class="81" style="{{if !curr.buff_id}}line-height:50px;{{end}}">
					{{if curr.add_exp}}
					<div>经验收益+{{curr.add_exp*100}}%</div>
					{{end}}
					{{if curr.attr[0] != "undefined"}}
					<div >{{it1.attribute_config[curr.attr[0]]}}+{{curr.attr[1]<1?(curr.attr[1]*100+"%"):curr.attr[1]}}</div>
					{{end}}
					{{if curr.buff_id}}
					<div>{{it1.buff[curr.buff_id].desc}}</div>
					{{end}}
				</div>
				

				{{if it1.rune_data.rune_set[it1.index-1] == curr.prop_id}}
				<widget w-class="82" w-tag="app_a-widget-btn-rect" >
					{"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已装备","width":116,"height":45} 
				</widget>
				{{elseif it1.rune_arr[curr.prop_id]}}
				<widget on-tap='booksIn({{curr.solt_id}},{{curr.prop_id}})' w-class="82" w-tag="app_a-widget-btn-rect" >
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"装 备","width":116,"height":45} 
				</widget>
				{{else}}
				<widget w-class="82" w-tag="app_a-widget-btn-rect" on-tap='gotoLottery'>
					{"class":"default","fontsize":24,"color":"#fdedd7;","text":"前往获取","width":116,"height":45} 
				</widget>
				{{end}}
			</div>
		</div>
	</div>

</div>