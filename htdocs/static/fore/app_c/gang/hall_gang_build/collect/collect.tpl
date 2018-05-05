
<div style="position:absolute;left:0;top:0;right:0;bottom:0;z-index:3;pointer-events: {{it1 && it1.forbid ?'all' : 'none'}}">
	{{if it1}}
	{{if it1.process}}
	<div style="position:absolute;left:-13%;top:0;width:126%;z-index:3;bottom:0;overflow:hidden;background-color:rgba(0,0,0,.5);pointer-events:all;" w-sid="3">
		<div style="position:absolute;width: 492px;height:195px;left:92px;z-index:4">
			<widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame31"} 
			</widget>
			<widget w-class="7" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"att_bg_2"} 
			</widget>
			<widget w-class="8" w-tag="app_a-widget-bar-bar2" w-sid="8">
				{"progress":{{it1.process}},"text":"{{it1.process}}/100","fontsize":15}
			</widget>	
				
			
			<widget w-class="10" w-tag="app_a-widget-text-text" w-sid="10">
				{"text":"采集中……","show":"","space":-4,"fontSize":20,"lineHeight":20,"color":"","textCfg":"singleTitle"} 
			</widget>
			<div style="width:119px;height:116px;position:absolute;top: 358px;left: 50%;margin-left:-63px;background:url(app_b/random_boss/image/box_bg1.png) no-repeat center"></div>
			<app_a-widget-box-box style="top: 385px;left: 50%;margin-left:-40px;">
				{"state":"","type":3,"width":80,"height":68}
			</app_a-widget-box-box>	
		</div>
	</div>
	{{elseif it1.forbid}}
	<div style="text-align:center;font-size:20px;position: absolute;top:50%;width:100%;color:#fff">采集寻路中……</div>
	{{end}}
	{{end}}
</div>