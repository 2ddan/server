<div w-class="app_connect" style="position:absolute;top:0;left:0;">
	{{let root = _get("pi/ui/root").exports}}
	{{let b = it1 && it1.con == 2}}
	{{let text = ""}}
	{{if it1 && it1.con !== 2}}
		{{: text = _cfg.conStatus[it1.con == 3 ? 1 : it1.con]}}
	{{elseif it1}}
		{{: text = _cfg.loginStatus[it1.login]}}
	{{end}}
	
	<div style="position:absolute;visibility:{{!b?'visible':'hidden'}};pointer-events:{{!b?'all':'none'}};width:{{root.getWidth()}}px;height:{{root.getHeight()}}px;line-height:{{root.getHeight()}}px;" w-class="connectTxt">{{if it1 && text}}{{text}}{{end}}</div>
</div>
