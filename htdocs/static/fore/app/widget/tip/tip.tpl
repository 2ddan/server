{{let getTips = _get("app_b/open_fun/open_fun").exports.getTips}}
{{let tips = getTips()}}
{{let flag = 0}}
{{let url = ""}}
{{for k, v in tips}}
    {{if ((v === 1) && (k.replace("-",".").indexOf(it.tip_keys[0]) == 0))}}
    {{:flag = 1}}
    {{end}}
{{end}}

{{if flag}}
{{: url = "./images/new.png"}}
{{elseif it.tip_keys[0] == "bag"}}
{{: url = "./images/full.png"}}
{{else}}
{{: url = "./images/pic_tip.png"}}
{{end}}

<div style="position:absolute;width:20px;height:20px;display:{{if it.show || flag}}inline-block{{else}}none{{end}};">
    <img data-desc="{{it.tip_keys}},{{it.show}}" src="{{url}}" style="position:absolute;pointer-events:none;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%)"/>
</div>




