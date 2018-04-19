{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let Common = _get("app/mod/common").exports.Common}}
{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}

<div class="hero_wear" group="cover" style="position:absolute;width: 100%;height: 100%;z-index:3">
	<div on-tap="goback" style="position:absolute;left:0;top:0;width:100%;height:100%;"></div>
	
	<div style="position: absolute;top: 75px;bottom: 80px;width: 420px;left: 50%;margin-left: -210px;height:540px">
		<div style="position: absolute;top: 4px;left: 20px;right: 20px;bottom: 15px;overflow: hidden;">
			<div scroller="1" style="position: absolute;top: 0px;width: 105%;bottom: 0px;overflow-y: auto;overflow-x: hidden;z-index: 1;">
				{{if friend_battle.equip_set[it1.equip_index-1]}}
				<div class="wear_bg" style="width: 341px;height: 72px;position: relative;left:50%;margin: 20px 0;margin-left: -180px;">
					{{let heroEquip = friend_battle.equip_set[it1.equip_index - 1]}}
					{{: heroEquip.level = heroEquip.level || 0}}
					<div style="position:absolute;width:160px;line-height:26px;font-size:18px;left: 84px;top: 40px;color: rgb(255,255,255)">
						{{heroEquip.name}}+++{{heroEquip.grade}}++{{heroEquip.index}}-{{heroEquip.slot}}
					</div>
					<app-widget-btn-inset style="width:88px;height:38px;position:absolute;top: 18px;right: 2px;" on-tap='chage({"cmd":"0-{{heroEquip.slot}}"})'>
						{"class":2,"text":"卸下"}
					</app-widget-btn-inset>
				</div>
				{{end}}
				{{let list = it1.bag.filter(function(x){return x})}}
                
				{{% :console.log("equip++++++++++",list.sort(Common.equipSort))}}
				{{for i, v of list.sort(Common.equipSort)}}
				<div class="wear_bg" style="width: 341px;height: 72px;position: relative;left:50%;margin: 20px 0;margin-left: -180px;">
					<div style="position:absolute;width:160px;line-height:26px;font-size:18px;left: 84px;top: 40px;color: rgb(255,255,255)">
						{{v.name}}+++{{v.grade}}++{{v.index}}-{{v.slot}}
					</div>
					<app-widget-btn-inset style="width:88px;height:38px;position:absolute;top: 18px;right: 2px;" on-tap='chage({"cmd":"{{v.index + 1}}-{{v.slot}}"})'>
						{"class":2,"text":{{friend_battle.equip_set[it1.equip_index-1] ? "更换" : "装备"}}}
					</app-widget-btn-inset>
				</div>
				{{end}}
			</div>
		</div>
		
		
	</div>
</div>
