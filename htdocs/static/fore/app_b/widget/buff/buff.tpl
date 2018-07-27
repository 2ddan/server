<div data-desc="buff" style="width:{{it.width + 'px' || 'auto'}};height:{{it.height}}px;text-align:center">
	{{if it.type != "weapon_soul"}}
	<app_a-widget-pic_text-pic_text style="position:absolute;top:0;left:0;">
		{"icon":"buff_bg","width":65,"height":296,"text":" "} 
	</app_a-widget-pic_text-pic_text>
	{{end}}
	<div style="position: relative;top:{{it.top || 0}}px;left:0;width:100%;height:100%;">
		{{for i,v of it1.buffInfo}}
			{{let curr = it1.buffCfg[v[0]]}}
			<app_a-widget-prop-base on-tap="detail({{v[0]}},{{v[1]}})" style="position: relative;margin:-1px 0px;display: inline-block;{{if !v[1]}}filter: grayscale(100%);{{end}}">
				{"prop":{"quality":4},"url":{{it1.Pi.pictures[curr.icon]}},"width":{{it.base_width || 58}},"height":{{it.base_width || 58}},"count": "none","name":"none","bg":0}
			</app_a-widget-prop-base>
		{{end}}
	</div>
</div>
