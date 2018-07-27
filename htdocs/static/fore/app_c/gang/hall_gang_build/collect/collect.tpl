<div style="position:absolute;left:0;top:0;right:0;bottom:0;z-index:3;pointer-events: {{it1 && it1.forbid ?'all' : 'none'}}">
	{{if it1 }}
	{{if it1.process}}
	<div style="position:absolute;width:100%;height:100%;pointer-events:all;">
		<div style="position:absolute;width: 280px;height:189px;left:50%;top:50%;margin-top:22px;margin-left:-140px;transform: scale(0.8);z-index:1">
			<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;top:0;width:100%;height:2px;z-index:2">
				{"line":"line_11"} 
			</widget>
			
			<widget  w-tag="app_a-widget-bg_frame-bg"  w-class="6" >
				{"bgName":"bg_frame54"} 
			</widget>
			<widget w-class="8" w-tag="app_a-widget-bar-bar2" w-sid="8">
				{"progress":100,"text":"{{it1.process}}/100","fontsize":15,collect:1}
			</widget>	
				
			<div w-class="10">
				<img src="../../images/collect_prop.png" />
				<widget w-tag="app_a-widget-text-text" style="position: absolute;top:36px;left:6px;">
					{"text":"采集中…","show":"","space":-4,"fontSize":20,"lineHeight":20,"color":"","textCfg":"singleTitle"} 
				</widget>
				<img style="position: absolute;top: -58px;left: 29px;transform-origin: bottom right;animation:collect_anim 1s infinite" src="../../images/collect_used.png" />
			</div>
			<widget w-tag="app_a-widget-line-line"  style="position: absolute;left:0;bottom:0;width:100%;height:2px;z-index:2">
				{"line":"line_11"} 
			</widget>
		</div>
	</div>
	{{elseif it1.forbid}}
	<div style="text-align:center;font-size:20px;position: absolute;top:50%;width:100%;color:#fff">采集寻路中……</div>
	{{end}}
	{{end}}
</div>