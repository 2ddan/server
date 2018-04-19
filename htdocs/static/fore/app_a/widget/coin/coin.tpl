{{:it = it||_cfg.it}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let icon = it.icon}}
{{if !isNaN(icon)}}
{{:icon = Pi.pictures[Pi.sample[icon].icon]}}
{{else}}
{{:icon = "app_a/widget/coin/images/"+icon+".png"}}
{{end}}
<div style="text-shadow: 1px 0px 0px rgb(8,8,8), -1px 0px 0px rgb(8,8,8), 0px 1px 0px rgb(8,8,8), 0px -1px 0px rgb(8,8,8);
">
    <img src="{{icon}}" style="position: relative;height:{{it && it.height ? it.height : 18}}px;width: {{it && it.width ? it.width : 24}}px;background-position: left center;background-repeat: no-repeat;display: inline-block;vertical-align: middle;"/>
    <span style="position: relative;display: inline-block;vertical-align: middle;left:{{it && it.left ? it.left : 0}}px;vertical-align: middle;" w-class="text_player_coin_num">{{it.text[0]}}
        {{if it.text[1] || it.text[1]==0}}
        /<span style="color:{{it.color || ''}}">{{it.text[1] || 0}}</span>
        {{end}}
    </span>
</div>