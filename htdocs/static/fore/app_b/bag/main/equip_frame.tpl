{{let player = _get("app/mod/db").exports.data.player}}
{{let career_id = player.career_id}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let module = it.module[it.career_id.indexOf(career_id)][0]}}
{{let img = Pi.pictures[module]}}
<div style="position:relative;display:inline-block;width:76px;height:108px;margin-right:17px">
	<app_a-widget-prop-equip  on-tap="objectInfoShow({{it.index}})" style="position:absolute;display:inline-block;top:0px;">
		{"prop":{{it.quality?it:0}},"width":76,"height":76,"url":{{img}},"level":{{it.level}},"bottom":27,"bg":1}
	</app_a-widget-prop-equip>
</div>
