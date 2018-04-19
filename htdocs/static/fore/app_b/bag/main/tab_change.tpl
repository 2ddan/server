
<div  on-tap="tap" style="position:relative;width:102px;height:60px;margin-bottom:20px;left:20px;{{if it.select}}left:0px;z-index:1;width: 132px;{{end}}">
	<app-widget-btn-button style="pointer-events: none;">
		{"class":"{{it.select?"btn1":"btn3"}}","width":{{it.select?132:88}}}
	</app-widget-btn-button>
	<div class="font_1_text1" style="pointer-events: none;">{{it.cfg.text}}</div>
</div>

