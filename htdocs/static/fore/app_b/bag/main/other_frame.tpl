{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let img1 = Pi.pictures[it.icon]}}
<div style="position:relative;display:inline-block;width:76px;height:108px;margin-right:17px">
	<app_a-widget-prop-base on-tap='showPropInfo("{{it.sid}}")' style="position:absolute;display:inline-block;top:0px;color:#ffeee2;text-shadow: 1px 0px 0px #000, -1px 0px 0px #000, 0px 1px 0px #000, 0px -1px 0px #000;">
		{"prop":{{it.quality?it:0}},"url":{{img1}},"count":{{it.count}},"width":76,"height":76,"name":{{it.name}},"bottom":27}
	</app_a-widget-prop-base>
</div>