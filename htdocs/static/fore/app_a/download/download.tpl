<div class="download_css" w-class="login_bg" group="download" style="top: 0px;visibility:{{it.display == 'none'?'hidden':'visible'}};pointer-events:{{it.display == 'none'?'none':'all'}};width:{{it.width}}px;height: {{it.height}}px;">
	<div w-class="bg_2"></div>
	<img src="app/style/images/logo.png" style="position:absolute;top: 40px;right: 25px;width: 259px;height: 140px;" />
	<div class="shadow9" w-class="tips_bg" style="position:absolute;bottom:60px;left:50%;margin-left:-121px;display:{{if it.pause}}none{{else}}block{{end}};font-family:'mnjsh';">{{it.state}}</div>
	{{let progress = (it.show*100).toFixed(2)}}
	<div style="position:absolute;bottom:26px;left:50%;margin-left: -243px;width: 487px;height: 41px;">
		<img style="position:absolute;left:10px;z-index:1;top: 10px;" src="./image/bar_bg.png"/>
		<img style="position:absolute;left:0;z-index:2;top: 10px;" src="./image/bar_head.png"/>
		<img style="position:absolute;right:0;filter: fliph;z-index:2;top: 10px;;transform: scale(-1)" src="./image/bar_head.png" />
		<div style="position:absolute;width: calc({{progress}}% - 20px);height:41px;left:10px;overflow:hidden;z-index: 1;">
			{{if progress < 97}}
			<img style="position:absolute;right:-5px;top: 2px;z-index: 1;top: -4px;" src="./image/bar_light_1.png"/>
			{{end}}
			{{if progress >= 7}}
			<img style="position:absolute;right:-5px;top: 2px;z-index: 1;top: 12px;" src="./image/bar_light_2.png"/>
			{{end}}
			<div style="width:460px;height:100%;position:absolute;left:0px;top:0px;">
				<img style="position:absolute;left:0;top:12px" src="./image/bar_fg_left.png"/>
				<img style="position:absolute;right:-8px;top:12px" src="./image/bar_fg_right.png"/>
				<div style="position:absolute;left:15px;right:1px;height:14px;top: 12px;">
					<img style="position:absolute;width:100%;height:14px;left:-1px" src="./image/bar_fg_middle.png"/>
				</div>
			</div>
		</div>
	</div>
</div>
