<div maxId="59" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
	{{let root = _get("pi/ui/root").exports}}				
	<app_b-widget-title-title w-class="3" w-sid="3" style="z-index:2">
		{"text":"灵 宠","coin":["money","diamond"],"left":30,"top":12,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}} 
	</app_b-widget-title-title>

	{{let Common = _get("app/mod/common").exports.Common}}
	{{let module_info = it1.pet_module[it1.pet_upgrade[it1.pet.pet_star_info[0]].module]}}
	
	{{let w = root.getWidth()}}
	{{let h = root.getHeight()}}
	<div style="position:absolute;left: 0;top: 109px;width: 540px;height: 680px;z-index:1;right: 0;margin: 0 auto;overflow: hidden;">
		<app-scene-base-scene>
			{"name":"uiscene","type":"pet","module":{"module":{{module_info.module}},"position":[0,1.9,-0.1],"scale":{{module_info.scale}},"state":{{it1.pose}},"rotate":[0,{{it1.player.pet_rotate ? it1.player.pet_rotate : 0.7}},0],"parent":{"hiddle":1},"scene_bg":"sce_ui_cwjm","type":"pet"},"width":540,"height":900}
		</app-scene-base-scene>
	</div>

	<div w-class="4" w-sid="4" style="left: 50%;margin-left: -270px;">
		{{let bol = it1.pet.pet_star_info.length}}
		{{let n1 = !bol ? 0 : it1.pet.pet_star_info[1] > 9 ? 0 : it1.pet.pet_star_info[1]-0+1 }}
		{{let n2 = !bol ? 0 : it1.pet.pet_star_info[1] > 9 ? it1.pet.pet_star_info[0]-0 +1 : it1.pet.pet_star_info[0] }}
		<div w-class="5" w-sid="5">

			<div w-class="6" w-sid="6">
				<app_a-widget-line-line w-class="8" w-sid="8" style="z-index: 1;">
					{"line":"line_7"} 
				</app_a-widget-line-line>
				<app_b-widget-buff-buff style="position: absolute;top:103px;right:18px;width:70px;height:auto;z-index:2;">
					{"width":60,"height":296,"type":"pet","level":{{it1.pet.pet_star_info[0]}},"top":25}
				</app_b-widget-buff-buff>
				<div on-tap="openPetShow" w-class="11" w-sid="11" style="z-index: 1;">
					<img w-class="10" src="app_b/surface/image/pet_show.png" w-sid="10"/>
					<app_a-widget-text-text w-class="12" w-sid="12">
						{"text":"更换外观","show":"","space":-4,"fontSize":20,"lineHeight":20,"color":"","textCfg":"menu_main"} 
					</app_a-widget-text-text>
					<app-widget-tip-tip style="right:5px;top:3px;">
						{"tip_keys":["role.pet.skin"]}
					</app-widget-tip-tip>
				</div>
				<app_a-widget-pic_text-pic_text w-class="13" class="shadow" w-sid="13" style="z-index: 1;">
					{"icon":"name_bg_2","width":184,"height":32,"align":"center","marginLeft":3,"text":{{module_info.name}},"textCfg":"","space":0,"fontSize":12,"top":0,"left":0} 
				</app_a-widget-pic_text-pic_text>

				<app_a-widget-title-single w-class="14" w-sid="14" style="z-index: 1;">
					{"padding":4,"type":11,"width":94,"text":{{it1.pet.pet_star_info[0]+"阶"+it1.pet.pet_star_info[1]+"星"}},"textCfg":"singleTitle","fontSize":20,"space":-4,"color":"#b27d5c","wear":0,"class":0} 
				</app_a-widget-title-single>

				<div w-class="95" w-sid="95" on-tap="lookPetAttr" style="position:absolute;z-index:1;left:409px;top:16px;">
					<app_a-widget-btn-ling w-class="96" w-sid="96">
						{"class":"default","fontsize":12,"color":"#fdedd7;","text":"","width":70,"height":70} 
					</app_a-widget-btn-ling>
					<app_a-widget-text-text w-class="97" w-sid="97">
						{"text":"属性","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
					</app_a-widget-text-text>
					<app_a-widget-text-text w-class="98" w-sid="98">
						{"text":"总览","show":"","space":-2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"lingBtn"} 
					</app_a-widget-text-text>
				</div>
			</div>

			
			<div w-class="15" w-sid="15">
				<app_a-widget-title-single w-class="16" w-sid="16">
					{"padding":10,"type":12,"width":175,"text":"灵宠进阶","textCfg":"singleTitle","fontSize":20,"space":-4,"color":"#b27d5c","wear":0,"class":0} 
				</app_a-widget-title-single>
				<div w-class="18" class="flex_box" layout="flex" w-sid="18">
					<div w-class="19" w-sid="19">
						<img w-class="22" src="app_b/magic/images/att_bg2.png" w-sid="22"/>
						<img w-class="25" src="app_b/magic/images/att_bg1.png" w-sid="25"/>
						<app_a-widget-title-single w-class="28" class="shadow" w-sid="28" style="top:-2px;line-height: 32px;">
							{"padding":4,"type":13,"width":11,"text":{{it1.pet.pet_star_info[1]+"星"}},"textCfg":"","fontSize":20,"space":-4,"color":"#b27d5c","wear":0,"class":0} 
						</app_a-widget-title-single>
						<div w-class="31" w-sid="31">
							<div w-class="32" class="scroll_box_v" layout="scroll" w-sid="32">
								{{if it1.pet.pet_star_info.length}}
									{{for n,h of it1.pet_upgrade[it1.pet.pet_star_info[0]][it1.pet.pet_star_info[1]].attr}}
									<span w-class="34" w-sid="34">
											{{it1.attribute_config[h[0]]+"+"+(h[1]<1?Math.floor(h[1]*100)+"%":h[1])}}
									</span>
									{{end}}
								{{else}}
									未激活
								{{end}}
							</div>
						</div>
					</div>

					{{if it1.pet_upgrade[n2] && it1.pet_upgrade[n2][n1]}}
					<app_a-widget-pic_other-pic_other w-class="21" w-sid="21">
						{"icon":"attr_arrow"} 
					</app_a-widget-pic_other-pic_other>

					<div w-class="20" w-sid="20">
						<img w-class="23" src="app_b/magic/images/att_bg2.png" w-sid="23"/>
						<img w-class="27" src="app_b/magic/images/att_bg1.png" w-sid="27"/>
						{{let text = it1.pet.pet_star_info[1]+1 == 11 ? "下一阶" : it1.pet.pet_star_info[1]+1 + "星"}}
						<app_a-widget-title-single w-class="30" class="shadow" w-sid="30"  style="top:-2px;line-height: 32px;">
							{"padding":4,"type":13,"width":11,"text":{{text}},"textCfg":"","fontSize":20,"space":-4,"color":"#b27d5c","wear":0,"class":0} 
						</app_a-widget-title-single>
						<div w-class="39" w-sid="39">
							<div w-class="40" class="scroll_box_v" layout="scroll" w-sid="40">
								{{for o,p of it1.pet_upgrade[n2][n1].attr}}
								<span w-class="41" w-sid="41">{{it1.attribute_config[p[0]]+"+"+(p[1]<1?Math.floor(p[1]*100)+"%":p[1])}}</span>
								{{end}}
							</div>
						</div>
					</div>
					{{end}}
				</div>
				<app_a-widget-line-line w-class="45" w-sid="45">
					{"line":"line_1"} 
				</app_a-widget-line-line>

				{{let now = it1.pet.pet_star_exp}}
				{{let need = it1.pet_upgrade[it1.pet.pet_star_info[0]][it1.pet.pet_star_info[1]].exp}}
				{{let percent = (now/need)*100}}
				{{if it1.pet.pet_star_info[1]==10}}
					{{:percent = 100}}
				{{end}}
				{{let text = now+"/"+need}}
				{{let exar = percent>=100 ? 1 : 0}}
				<app_a-widget-star-star style="pointer-events: none;white-space: nowrap;text-align: center;position: absolute;left: 0px;top: 165px;z-index: 1;right: 0;margin: 0 auto;">
					{"star_light":{{it1.pet.pet_star_info[1]+exar}},"star_dark":{{10-it1.pet.pet_star_info[1]-exar}},"width":26,"height":23,"new_star":{{it1.new_star}}}
				</app_a-widget-star-star>
				<div style="position: absolute;left: 35px;top: 174px;width: 419px;height: 40px;">
					{{if it1.s_exp}}
					<div style="height:20px;position: absolute;color:#3cff00;width: 100%;text-align:center;top: 10px;z-index:3;{{if it1.move}}transition:top 0.6s;top:-40px;{{end}}">+{{it1.s_exp}}</div>
					{{end}}
					<app_a-widget-bar-bar2 style="position: absolute;width: 400px;height: 18px;left: 10px;top:22px;">
						{"anima":{{it1.bar_anim}},"progress":{{percent}},"text":{{text=="0/0" ? "": text}},"lineHeight":18,"fontSize":14,"split":[]} 
					</app_a-widget-bar-bar2>

				</div>
			</div>
		</div>
		<div w-class="48" w-sid="48" style="z-index:2">
			
			{{if it1.pet.pet_star_info.length}}
			{{if it1.pet.pet_star_info[1] < 10 }}
				<div style="position:absolute;width:130px;height:34px;bottom:0;left:50%;margin-left:-65px;">
					<widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
						{"icon":"text_bg_1","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
					</widget>
					<widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;">
						{"index":"one_key","index1":{{it1.one_key}}}
					</widget>
					<div style="position:absolute;left:40px;height:34px;width:90px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">一键升星</div>
					<div style="position:absolute;width:130px;height:34px;left:0;top:0;" on-tap="openOneKey"></div>
				</div>
				{{let num = 1}}
				{{let obj = it1.pet_upgrade[it1.pet.pet_star_info[0]][it1.pet.pet_star_info[1]]}}
				
				{{let b = it1.player.money < num * obj.money[1]}}
				<app_a-widget-btn-rect on-tap="petStarUp('money',{{num}})" w-class="55" w-sid="55" style="left:50px">
					{"guide":{{it1.pet_ok ? "pet_up" : ""}},"class":{{b ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":{{it1.uping == "money" ? "停止升星" : "金币升星"}},"width":116,"height":45,"marginLeft":0} 
				</app_a-widget-btn-rect>
				<app_a-widget-coin-coin w-class="56" w-sid="56" style="color:{{ b ?'#f00':'#fff'}};left:30px">
					{"icon":"money","width":25,"height":21,"left":5,"text":[{{num * obj.money[1] }}],"color":"#FFFFFF"} 
				</app_a-widget-coin-coin>

				{{if it1.prop_count >=  num * obj.prop[1]}}
				<app_a-widget-btn-rect on-tap="petStarUp('prop',{{num}})" w-class="55" w-sid="55" style="left:315px;">
					{"guide":{{it1.pet_ok ? "pet_up" : ""}},"class":"hl","fontsize":24,"color":"#fdedd7;","text":{{it1.uping == "prop" ? "停止升星" : "内丹升星"}},"width":116,"height":45,"marginLeft":0,"tip_keys":["role.pet.upgrade"]} 
				</app_a-widget-btn-rect>
				<app_a-widget-coin-coin w-class="56" w-sid="56" style="left:290px;">
					{"icon":{{obj.prop[0]}},"width":25,"height":21,"left":5,"text":[{{it1.prop_count}}],"color":"#FFFFFF"} 
				</app_a-widget-coin-coin>
				{{else}}
				{{let _b = it1.player.diamond < num * obj.diamond[1]}}
				<app_a-widget-btn-rect on-tap="petStarUp('diamond',{{num}})" w-class="55" w-sid="55" style="left:315px">
					{"class":{{_b ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":{{it1.uping == "diamond" ? "停止升星" : "元宝升星"}},"width":116,"height":45,"marginLeft":0} 
				</app_a-widget-btn-rect>
				<app_a-widget-coin-coin w-class="56" w-sid="56" style="color:{{it1.player.diamond < num * obj.diamond[1] ?'#f00':'#fff'}};left:290px">
					{"icon":"diamond","width":25,"height":21,"left":5,"text":[{{num * obj.diamond[1] }}],"color":"#FFFFFF"} 
				</app_a-widget-coin-coin>
				{{end}}
			{{else}}
				{{if !it1.pet_upgrade[n2]  }}
				<widget w-class="55" w-tag="app_a-widget-pic_text-pic_text" >
					{"icon":"max_level","width":94,"height":60}
				</widget>
				{{else}}
				<app_a-widget-btn-rect on-tap="petBreak" w-class="55" w-sid="55">
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"突    破","width":116,"height":45,"marginLeft":0,"show_anim":1} 
				</app_a-widget-btn-rect>	
				{{end}}
			
			{{end}}
			{{else}}
				<app_a-widget-btn-rect on-tap="petActive" w-class="55" w-sid="55">
					{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"激    活","width":116,"height":45,"marginLeft":0} 
				</app_a-widget-btn-rect>
			{{end}}
		</div>
	</div>
	<img src="app_b/role/image/role_bottom.png" style="width:100%;position:absolute;bottom:0px;z-index: 1;height: 39px;"/>
	<app_b-widget-bg-goback on-tap="petgoback"></app_b-widget-bg-goback>
</div>