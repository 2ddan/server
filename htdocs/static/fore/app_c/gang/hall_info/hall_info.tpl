<div maxId="77" style="position:absolute;width:100%;height:100%;top: 55px;" w-class="2 " test="test" w-sid="2">
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let gang = appCfg.gang.data}}
	<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
	</widget>
	<widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
	</widget>
	<widget w-class="8" w-tag="app_a-widget-bg_frame-bg" w-sid="8">{"bgName":"bg_frame25"} 
	</widget>
	<div w-class="9" w-sid="9">
		{{let img = Pi.pictures[it1.guild_upgrade[gang.gang_level].icon_id]}}
		{{:console.log(11111,img)}}
		<div w-class="10" w-sid="10">
			<img w-class="73" src="app_c/gang/images/flag.png" w-sid="73"/>
			<img w-class="74" src="app_a/widget/prop/images/equip_level_bg.png" w-sid="74"/>
			<img w-class="75" src={{img}} w-sid="75"/>
			<span w-class="76" w-sid="76">{{"Lv" + gang.gang_level}}</span>
		</div>
		<div w-class="13" w-sid="13">
			<div w-class="14" w-sid="14">
				<span w-class="15" w-sid="15">{{gang.gang_name+" (ID:"+it1.gangData.gang_id+")"}}</span>

				{{if it1.gangData.post !== 3}}
				<widget on-tap="gotoChangNameClick" w-class="26" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="26">
					{"icon":"change"} 
				</widget>
				{{end}}
				
			</div>
			<div w-class="16" w-sid="16">
				<span w-class="18" w-sid="18">会 长</span>
				<span w-class="19" w-sid="19">{{Common.fromCharCode(it1.gangData.leader_info.name)}}</span>
				<widget w-class="20" w-tag="app_a-widget-text-text" w-sid="88">
					{"text":{{"VIP"+it1.gangData.leader_info.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
				</widget>
			</div>
			<div w-class="21" w-sid="21">
				<span w-class="22" w-sid="22">成员数</span>
				<span w-class="23" w-sid="23">{{it1.gangData.gang_count + "/" + it1.guild_upgrade[gang.gang_level].max_person}}</span>
			</div>
			<div w-class="27" w-sid="27">
				<app-widget-text-text  w-class="28" w-sid="28">
					{"text":{{"等级"+gang.gang_level}},"fontSize":18,"textCfg":"nextAward"}
				</app-widget-text-text>
					
				{{let percent = (gang.gang_exp/it1.guild_upgrade[gang.gang_level].exp)*100}}
				{{let text = gang.gang_exp+"/"+it1.guild_upgrade[gang.gang_level].exp}}
				<widget w-class="29" w-tag="app_a-widget-bar-bar3" w-sid="29">
					{"progress":{{percent}},"text":""}
				</widget>
				<widget on-tap='getHelp("guild")' w-class="30" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="30">{"icon":"look_info"} 
				</widget>
			</div>
			<div w-class="31" w-sid="31">
				<div w-class="32" w-sid="32">
					<widget w-class="62" w-tag="app_a-widget-pic_text-pic_text" w-sid="62">
						{"icon":"little_tips_bg","width":126,"height":27,"align":"center","marginLeft":0,"text":"历史贡献","textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
					</widget>
					<span w-class="34" w-sid="34">1000</span>
				</div>
			</div>
			<widget w-class="63" w-tag="app_a-widget-line-line" w-sid="63">{"line":"line_1"} 
			</widget>
		</div>
		<div w-class="38" w-sid="38">
			<div w-class="43" w-sid="43">
				<widget w-class="39" w-tag="app_a-widget-bg_frame-bg" w-sid="39">{"bgName":"bg_frame22"} 
				</widget>
				{{if it1.gangExpandData.gang_salary}}
				<div style="position: absolute;width: 50px;height:30px;color:red;" on-tap="openDailySalary">已领取</div>
				{{else}}
				<div style="position: absolute;width: 50px;height:30px;color:red;" on-tap="openDailySalary">领取俸禄</div>
				{{end}}
			</div>
			<div w-class="44" w-sid="44">
				<widget w-class="40" w-tag="app_a-widget-bg_frame-bg" w-sid="40">{"bgName":"bg_frame22"} 
				</widget>
				<widget w-class="42" w-tag="app_a-widget-pic_other-pic_other" w-sid="42">{"icon":"title_vein"} 
				</widget>
				{{if it1.gangData.post !== 3}}
				<widget on-tap="changeInfo(1)" w-class="49" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="49">
					{"icon":"change"} 
				</widget>
				{{end}}
				
				<div w-class="56" w-sid="56">
					<widget w-class="57" w-tag="app_a-widget-bg_frame-bg" w-sid="57">{"bgName":"bg_frame24"} 
					</widget>
					<div w-class="58" w-sid="58">
						<widget w-class="59" w-tag="app_a-widget-pic_other-pic_other" w-sid="59">{"icon":"other_1"} 
						</widget>
						<span w-class="60" w-sid="60">公会公告</span>
						<widget w-class="61" w-tag="app_a-widget-pic_other-pic_other" w-sid="61">{"icon":"other_1"} 
						</widget>
					</div>
				</div>
				<div w-class="68" w-sid="68"> 
					{{it1.gangData.gang_notice}}
				</div>
			</div>
		</div>
		<widget w-class="69" w-tag="app_a-widget-title-single" w-sid="69">
			{"padding":5,"type":9,"width":124,"text":"公会功能","textCfg":"singleTitle","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
		</widget>
		<img on-tap="gotoRankClick" w-class="72" src="app_c/gang/images/rank.png" w-sid="72"/>
		<div w-class="70" w-sid="70">
			{{let text = [["hall_skill","公会绝学"],["hall_shop","公会商店","openGangShop"],["hall_fuben","公会副本"],["hall_boss","公会Boss"],["hall_fight","公会战"]]}}
			{{for i,v of text}}
			<div on-tap="{{v[2]}}" style="position:relative;display:inline-block;width:86px;height:124px;margin-right: 4px;background-image:url(../images/{{v[0]}}.png);">
				<div style="overflow: hidden;width:80px;height:124px;margin:0 auto;position: relative;">
					<div style="text-align: center;width:206px;position:absolute;background:url(app_a/widget/pic_text/images/now_attr_bg.png);top: 81px;height: 32px;line-height: 31px;margin-left: -103px;left: 50%;">
						<app-widget-text-text  w-class="28" w-sid="28" style="vertical-align: middle;">
							{"text":{{v[1]}},"fontSize":18,"textCfg":"lookDetails"}
						</app-widget-text-text>
					</div>
				</div>
			</div>
			{{end}}
		</div>
		
	</div>
</div>