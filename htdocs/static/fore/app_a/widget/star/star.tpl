{{:it = it||_cfg.it}}
{{let i = 0}}
{{let j = 0}}
{{let light = "stars_"}}
{{let dark = "stars"}}
{{if it.big}}
{{:light = "star_b"}}
{{:dark = "star_b_"}}
{{end}}
<div>
{{while i < it.star_light}}
{{:i++}}
<div style="display:inline-block;width:{{it.width || 19}}px;height:{{it.height || 18}}px;position:relative;">
    <span style="display:inline-block;width:{{it.width || 19}}px;height:{{it.height || 18}}px;background-image:url(./images/{{light}}.png);background-repeat:no-repeat;background-size:100%;"></span>
    {{if it.new_star == i}}
    <div class="star_anim" style="position:absolute;left:-28px;top:-28px"></div>
    {{end}}
</div>
{{end}}
{{while j < it.star_dark}}
{{:j++}}
<span style="background-image:url(./images/{{dark}}.png);background-repeat:no-repeat;background-size:100%;display:inline-block;width:{{it.width || 19}}px;height:{{it.height || 18}}px;"></span>
{{end}}
</div>
