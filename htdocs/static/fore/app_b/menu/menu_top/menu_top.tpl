
<div style="width:335px;bottom:0px;height:100px;">
	{{if it1.show}}
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let sevendays = appCfg.sevendays}}
	{{let cfg = _get("app/mod/pi").exports.cfg}}
	{{let fa_base = cfg.fa_base.fa_base}}
	{{let activity_list = cfg.activity_list.activity_list}}
	{{let Util = _get("app/mod/util").exports.Util}}
	{{let player = appCfg.player}}
	<div style="position: absolute;left: 0px;bottom: 0px;z-index: 1;width: 100%;height:100%;">
		<div style="position: absolute;height: 100px;width: 100%;">
			{{let now = Util.serverTime()}}
			<div style="position: absolute;height: 100%;width: 100%;text-align: left;">
				{{if it1}}

				{{let open_fun = appCfg.open_fun}}
				{{for k, v of it1.menu_top}}
				{{if (v.key != "recharge_all" || (v.key == "recharge_all" && !it1.state)) && it1.fun_open_id >= v.fun_id}}

					{{if k == 0}}
					<div style="margin:0 3px;display: inline-block;width:48px;height:46px;">
						
					</div>
					{{end}}
					{{if v.interface != "undefined" &&  v.name != "七日活动" &&  v.name != "节日活动" &&  v.name != "宝石迷阵" &&  v.name != "翻翻乐"}}
					{{let first_recharge = v.name == "首充"}}
					<div style="margin:0 3px;display: inline-block">
						{{let new_tip = 0}}
						{{if v.tips =="daily_act" && open_fun && open_fun.tips && (open_fun.tips["daily_act-money_tree"] || open_fun.tips["daily_act-off_line"])}}
						{{:new_tip = 1}}
						{{elseif v.tips =="activities" && open_fun && open_fun.tips && open_fun.tips["activities-104"]}}
						{{:new_tip = 1}}
						{{elseif v.tips =="lottery"}}
						{{:new_tip = 1}}
						{{end}}
						<app-widget-btn-menu style="overflow: hidden;" on-tap={{'gotoMenu("'+v.interface+'",true)'}}>
							{"guide":{{v.interface}},"anima":{{first_recharge? "anim_ling": new_tip ? "menu_seven_avtive":""}},"icon":{{v.icon}},"text":{{v.name}},"width":60,"height":60,"bottom":"-3","bg":3,"fontSize":16,"space":-6,"tip_keys":{{v.tips}} }
						</app-widget-btn-menu>
					</div>
					{{end}}
					{{if v.name == "七日活动" && sevendays && sevendays.nowDay <= 7}}
					<div style="margin:0 3px;display: inline-block">
						{{let new_tip = (open_fun && open_fun.tips && open_fun.tips.sevendays) || 0}}

						<app-widget-btn-menu on-tap={{'gotoMenu("'+v.interface+'",true)'}}>
							{"guide":"gotoSevendaysAct","icon":{{v.icon}},"text":{{v.name}},"width":60,"height":60,"bottom":"-3","bg":3,"fontSize":16,"space":-6,"tip_keys":{{v.tips}},"anima":{{new_tip?"menu_seven_avtive":""}} }
						</app-widget-btn-menu>
					</div>
					{{end}}
					{{if v.name == "节日活动" && now <= fa_base.delay_date && sevendays.nowDay >= fa_base.servertime_limit}}
					<div style="margin:0 3px;display: inline-block">
						<app-widget-btn-menu on-tap={{'gotoMenu("'+v.interface+'",true)'}}>
								{"icon":{{v.icon}},"text":{{v.name}},"width":60,"height":60,"bottom":"-3","bg":3,"fontSize":16,"space":-6,"tip_keys":{{v.tips}} }
						</app-widget-btn-menu>
					</div>
					{{end}}
					{{if v.name == "宝石迷阵" && now <= activity_list[101].delay_date}}
					<div style="margin:0 3px;display: inline-block">
						<app-widget-btn-menu on-tap={{'gotoMenu("'+v.interface+'",true)'}}>
								{"icon":{{v.icon}},"text":{{v.name}},"width":60,"height":60,"bottom":"-3","bg":3,"fontSize":16,"space":-6,"tip_keys":{{v.tips}} }
						</app-widget-btn-menu>
					</div>
					{{end}}
					{{if v.name == "翻翻乐" && now <= activity_list[102].delay_date}}
					<div style="margin:0 3px;display: inline-block">
						<app-widget-btn-menu on-tap={{'gotoMenu("'+v.interface+'",true)'}}>
								{"icon":{{v.icon}},"text":{{v.name}},"width":60,"height":60,"bottom":"-3","bg":3,"fontSize":16,"space":-6,"tip_keys":{{v.tips}} }
						</app-widget-btn-menu>
					</div>
					{{end}}
				{{end}}
				{{end}}
				{{end}}
			</div>
		</div>
	</div>
	{{end}}
</div>

