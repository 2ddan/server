<div maxId="46" test="test" style="position: absolute;width: 100%;height: 100%;top:46px" w-sid="2">
	<widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
		{"bgName":"bg_frame21"} 
	</widget>
	<div w-class="3" w-sid="3" style="color:#fff">
		<div style="width:100%;height:300px;position:absolute;top:0px;left:0;">
			<div style="width:100%;height:20px;background:rgna(0,0,0,0.6);text-align:center">
				高级天书
			</div>
			<div style="position:absolute;top:0;right:30px;background:rgna(0,0,0,0.6);">
				奖券：{{it1.cost_num}}
			</div>
			<div style="position:absolute;top:30px;right:30px;background:rgna(0,0,0,0.6);">
				当前积分：{{it1.score_num}}
			</div>
			<widget on-tap="seeAward" style="position:absolute;top:0;left:0;" w-tag="app_a-widget-btn-rect" >
				{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"奖励预览","width":116,"height":45} 
			</widget>

			<div w-class="12" w-sid="12">
				{{let end_time = it1.free_time[0]+it1.luck_draw_set.prop_cd}}
				{{for i,v of it1.luck_draw[1]}}
				<div w-class="13" style="text-align: center;">
					{{let text = v.count == 1 ? "抽一次":"抽十次"}}
					{{let prop_id = v.cost[0]}}
					{{let bol = it1.canGetAward(1,i) || it1.now_time >= end_time&&!i}}
					<widget on-tap="getAward({{prop_id}},{{bol ? v.id:-1}})" w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
						{"class":{{bol ? "hl" : "disabled"}},"fontsize":20,"color":"#fdedd7;","text":{{text}},"width":85,"height":35} 
					</widget>
					{{if it1.now_time >= end_time && !i}}
					免费抽一次
					{{else}}
					<widget  w-tag="app_a-widget-coin-coin" style="position: relative;top:10px;display:inline-block;">
					{"icon":{{prop_id}},"width":23,"height":18,"left":4,"text":[{{v.cost[1]}}],"color":"#FFD7A8"} 
					</widget>
					{{end}}
					{{if end_time > it1.now_time && !i}}
					<div style="bottom: 50px;position: absolute;left: 50%;transform: translateX(-50%);color:#ffd8a6">
						<app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block;color:#51e650">
							{ "cd_time":{{end_time*1000}},"now_time":{{it1.now_time*1000}} }
						</app-widget-cdtime>
						后可以免费抽一次 
					</div>
					{{end}}
				</div>
				{{end}}
			</div>
		</div>
		<div style="width:100%;height:300px;position:absolute;top:310px;left:0;">
			<div style="width:100%;height:20px;background:rgna(0,0,0,0.6);text-align:center">
				低级天书
			</div>
			<widget on-tap="seeAward" style="position:absolute;top:0;left:0;" w-tag="app_a-widget-btn-rect" >
				{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"奖励预览","width":116,"height":45} 
			</widget>


			<div w-class="12" w-sid="12">
				{{let end_time = it1.free_time[1]+it1.luck_draw_set.diamond_cd}}
				{{for i,v of it1.luck_draw[2]}}
				<div w-class="13" style="text-align: center;">
					{{let text = v.count == 1 ? "抽一次":"抽十次"}}
					{{let prop_id = v.cost[0]}}
					{{let bol = it1.canGetAward(2,i) || it1.now_time >= end_time && !i}}
					<widget on-tap="getAward({{prop_id}},{{bol ? v.id:-1}})" w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
						{"class":{{bol ? "hl" : "disabled"}},"fontsize":20,"color":"#fdedd7;","text":{{text}},"width":85,"height":35} 
					</widget>
					{{if it1.now_time >= end_time && !i}}
					免费抽一次
					{{else}}
					<widget  w-tag="app_a-widget-coin-coin" style="position: relative;top:10px;display:inline-block;">
						{"icon":{{prop_id}},"width":23,"height":18,"left":4,"text":[{{v.cost[1]}}],"color":"#FFD7A8"} 
					</widget>
					{{end}}
					{{if end_time > it1.now_time && !i}}
					<div style="bottom: 50px;position: absolute;left: 50%;transform: translateX(-50%);color:#ffd8a6">
						<app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block;color:#51e650">
							{ "cd_time":{{end_time*1000}},"now_time":{{it1.now_time*1000}} }
						</app-widget-cdtime>
						后可以免费抽一次 
					</div>
					{{end}}
				</div>
				{{end}}
			</div>
		</div>
	</div>

</div>