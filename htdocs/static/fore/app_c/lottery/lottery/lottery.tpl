<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>

	<div w-class="3" w-sid="3" style="padding: 22px;box-sizing:border-box;">
		<div data-desc="高级抽奖" w-class="5">
			<img data-desc="边框" style="position:absolute;top:0;left:0;" src="../images/border.png" />
			<widget w-tag="app_a-widget-pic_other-pic_other" style=" position:absolute;bottom: -12px;left: -18px;" >
				{"icon":"flower_1"} 
			</widget>
			
			<widget w-tag="app_a-widget-pic_other-pic_other" style=" position:absolute;bottom: 45px;left: 19px;" >
				{"icon":"butterfly_1"} 
			</widget>
			<div data-desc="内容">
				<widget w-class="6" w-tag="app_a-widget-btn-ling" w-sid="6" on-tap="seeAward(1)">
					{"class":"default","fontsize":20,"color":"#fdedd7;","text":" 奖励 预览","width":77,"height":77,"textCfg":"lingBtn"} 
				</widget>
				<widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" >
					{"icon":"lottery_bg_1","text":"传世天书","width":167,"height":34,"top":2} 
				</widget>
				<div style="position: absolute;top: 76px;left: 303px;">
					{{for i,v of ["text_top","text_middle","text_bottom"]}}
					<div style="position: absolute;top:{{i*42}}px;left:0">
						<widget w-tag="app_a-widget-pic_text-pic_text">
							{"icon":{{v}},"text":" ","width":125,"height":34,"top":2} 
						</widget>
						<img style="position: absolute;top: 1px;left: 0;" src="../images/high_{{i+1}}.png"/>
					</div>
					{{end}}
				</div>
				<div style="pointer-events: none;animation:lottery_float 2.4s infinite;top: -11px;left: 50%;margin-left: -134px;position: absolute;">
					<div class="anim_lottery" ></div>
				</div>
				<div w-class="9" class="shadow6">
					{{let end_time = it1.free_time[0]+it1.luck_draw_set.prop_cd}}
					{{for i,v of it1.luck_draw[1]}}
					<div w-class="10" >
						{{let text = v.count == 1 ? "抽一次":"十连抽"}}
						{{let prop_id = v.cost[0][0]}}
						{{let bol = it1.canGetAward(1,i) || it1.now_time >= end_time&&!i}}
						<div style="bottom: 44px;position: absolute;width:100%;color:#fde7ca;font-size:18px;white-space: nowrap;">+{{v.score[0][1]}}积分</div>

						<widget on-tap="getAward({{prop_id}},{{bol ? v.id:-1}})"  w-tag="app_a-widget-btn-rect">
							{"class":{{!bol ? "disabled" : !i ? "default" :"hl"}},"fontsize":24,"color":"#fdedd7;","text":{{text}},"width":116,"height":45,"marginLeft":20} 
						</widget>
						{{if i == 0}}
						<app-widget-tip-tip style="right: 0;top: 0">
							{"tip_keys":["lottery.book.0"]}
						</app-widget-tip-tip>
						{{end}}
						<div class="shadow" w-class="11">
							{{if it1.now_time >= end_time && !i}}
							免费
							{{else}}
							<widget  w-tag="app_a-widget-coin-coin" w-class="13" style="left:0px;">
								{"icon":{{prop_id}},"width":27,"height":27,"left":-10,top:7,"text":[{{v.cost[0][1]}}],"color":"#FFD7A8"} 
							</widget>
							{{end}}
						</div>
						{{if end_time > it1.now_time && !i}}
						<div w-class="12">
							<app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block;color:#51e650">
								{ "cd_time":{{end_time*1000}},"now_time":{{it1.now_time*1000}} }
							</app-widget-cdtime>
							后可免费抽1次 
						</div>
						{{end}}
					</div>
					{{end}}
				</div>
			</div>	
		</div>
		
		<div data-desc="低级抽奖" w-class="5">
			<div data-desc="内容">
				<widget w-class="6" w-tag="app_a-widget-btn-ling" w-sid="6" on-tap="seeAward(0)">
					{"class":"default","fontsize":20,"color":"#fdedd7;","text":" 奖励 预览","width":77,"height":77,"textCfg":"lingBtn"} 
				</widget>
				<widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" style="color:#acd8fc;width:127px;margin-left: -63px;">
					{"icon":"lottery_bg_2","text":"凡世仙书","width":127,"height":34,"top":2} 
				</widget>
				<div style="position: absolute;top: 76px;left: 303px;">
					{{for i,v of ["text_top","text_middle"]}}
					<div style="position: absolute;top:{{i*42}}px;left:0">
						<widget w-tag="app_a-widget-pic_text-pic_text">
							{"icon":{{v}},"text":" ","width":125,"height":34,"top":2} 
						</widget>
						<img style="position: absolute;top: 1px;left: 0;" src="../images/text_{{i+1}}.png"/>
					</div>
					{{end}}
				</div>
				<img w-class="8" src="../images/book_2.png" style="animation:lottery_float 2.4s infinite;"/>
				<div w-class="9" class="shadow6">
					{{let end_time = it1.free_time[1]+it1.luck_draw_set.diamond_cd}}
					{{for i,v of it1.luck_draw[2]}}
					<div w-class="10" >
						{{let text = v.count == 1 ? "抽一次":"十连抽"}}
						{{let prop_id = v.cost[0][0]}}
						{{let bol = it1.canGetAward(2,i) || it1.now_time >= end_time && !i}}
						<widget on-tap="getAward({{prop_id}},{{bol ? v.id:-1}})"  w-tag="app_a-widget-btn-rect">
							{"class":{{!bol ? "disabled" : !i ? "default" :"hl"}},"fontsize":24,"color":"#fdedd7;","text":{{text}},"width":116,"height":45,"marginLeft":20} 
						</widget>
						{{if i == 0}}
						<app-widget-tip-tip style="right: 0;top: 0">
							{"tip_keys":["lottery.book.1"]}
						</app-widget-tip-tip>
						{{end}}
						<div class="shadow" w-class="11">
							{{if it1.now_time >= end_time && !i}}
							免费
							{{else}}
							<widget  w-tag="app_a-widget-coin-coin" w-class="13">
								{"icon":{{prop_id}},"width":30,"height":30,"left":-12,top:7,"text":[{{v.cost[0][1]}}],"color":"#FFD7A8"} 
							</widget>
							{{end}}
						</div>
						{{if end_time > it1.now_time && !i}}
						<div w-class="12">
							<app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block;color:#51e650">
								{ "cd_time":{{end_time*1000}},"now_time":{{it1.now_time*1000}} }
							</app-widget-cdtime>
							后可免费抽1次 
						</div>
						{{end}}
					</div>
					{{end}}
				</div>
			</div>	
		</div>
	</div>
	<div on-tap="scoreTip" w-class="14">
		<widget class="shadow7"  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width:150px;left: 0;">
			{"icon":"little_tips_bg","text":"当前积分：{{it1.score_num}}","width":150,"height":23,"top":2,"align":"left","marginLeft":18} 
		</widget>
		<widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
			{"icon":"remind"} 
		</widget>
	</div>
</div>