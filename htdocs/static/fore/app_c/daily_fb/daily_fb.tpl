<div maxId="10" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
	{{let player = it1.player}}
	{{let Pi = it1.Pi}}
	{{let daily_fb_base =it1.daily_fb_base}}
	{{let vip_advantage = it1.vip_advantage}}
	{{let root = _get("pi/ui/root").exports}}
	
	<widget w-tag="app_b-widget-title-title" w-class="4" w-sid="4">
		{"text":"材料副本","coin":["money","diamond"],"left":12,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
	</widget>
	<div style="width:100%;position:absolute;left:50%;top:110px;bottom:83px;margin-left:-270px;">
		<div class="line_6" style="position: absolute; top: -14px; z-index: 4;left: 0;width: 540px;"></div>			
		<widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
			{"bgName":"bg_frame21"} 
		</widget>
		
		<div w-class="79" w-sid="79">
			<div  scroller="1" w-class="80" w-sid="80">
				{{let last = daily_fb_base.length-1}}
				{{let line = 0}}
				{{for i, v of daily_fb_base}}
				{{let prop = Pi.sample[v.fall_down1]}}
				{{let url = Pi.pictures[prop.icon]}}
				{{let initial_count = vip_advantage[player.vip].daily_instance_times }}
				{{let has_count = initial_count + it1.vip_daily_times[v.fb_id-1] - it1.use_times[v.fb_id-1] }}
				<div on-tap="openTask({{v.fb_id}})" w-class="3" w-sid="3" style="background-image:url(./image/bg_{{i%6+1}}.png);margin-bottom:{{i == last ? 0 : 45}}px">
					{{if i == 0}}
					<app_a-widget-guide-guide>
						{{"daily_task"}}
					</app_a-widget-guide-guide>
					{{end}}
					<app-widget-tip-tip style="top:-1px;right:2px;">
						{"tip_keys":[{{"explore.dailyFb."+v.fb_id}}]}
					</app-widget-tip-tip>

					<div w-class="5" w-sid="5">
						<img w-class="6" src="./image/name_{{i%6+1}}.png" w-sid="6"/>
					</div>
					{{if v.guard_limit > it1.wild_max_mission}}
					<widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" w-sid="7">
						{"icon":"name_bg_2","width":184,"height":32,"align":"center","marginLeft":0,"text":{{"通过野外"+it1.getWildName(v.guard_limit)+"开放"}},"textCfg":"gangCoverTitle","space":0,"fontSize":20,"top":4,"left":0} 
					</widget>
					{{end}}
					<div  w-class="8" w-sid="8">
						<widget w-tag="app_a-widget-text-text" >
							{"text":"奖励","textCfg":"gangCoverTitle","space":0,"fontSize":18} 
						</widget>
						<app_a-widget-prop-base on-tap='showPropInfo("{{v.fall_down1}}")' style="position:absolute;display:inline-block;top:0px;">
							{"prop":{{prop}},"url":{{url}},"width":45,"height":45,"count":"none","name":"none","bg":0}
						</app_a-widget-prop-base>
					</div>
					
					<div w-class="9" w-sid="9">
						<div style="position:absolute;left:10px;top:0;">剩余次数：</div>
						<div style="font-family:'黑体'"> 
							<span style="{{if !has_count}}color:#f00 ;{{end}}">{{has_count}}</span>{{ "/" + initial_count}}
						</div>
					</div>
					{{let state = v.open&&it1.wild_max_mission>=v.guard_limit ? "open" : "not_open"}}
					<img w-class="10" src="app_a/widget/pic_text/images/{{state}}.png" w-sid="10"/>
					<app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
				</div>
				{{if !line && (i !== last )  && (it1.wild_max_mission>=v.guard_limit && daily_fb_base[i+1].guard_limit > it1.wild_max_mission || v.open && !daily_fb_base[i+1].open)}}
				{{:line = 1}}
				<widget w-class="11" w-tag="app_a-widget-title-single" w-sid="11">
					{"padding":5,"type":9,"width":124,"text":"暂未开放","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
				</widget>
				{{end}}

				{{end}}
				
			</div>
		</div>
	</div>	




	
</div>