{{let i = 0}}
{{let j = 0}}
<div>
{{while i < it.star_light}}
{{:i++}}
<span style="background-size:100%;display:inline-block;width:{{it.width || 19}}px;height:{{it.height || 18}}px;background-image:url(app_b/style/image/stars_.png);background-repeat:no-repeat;"></span>
{{end}}
{{while j < it.star_dark}}
{{:j++}}
<span style="background-size:100%;display:inline-block;width:{{it.width || 19}}px;height:{{it.height || 18}}px;background-image:url(app_b/style/image/stars.png);background-repeat:no-repeat;"></span>
{{end}}
</div>
