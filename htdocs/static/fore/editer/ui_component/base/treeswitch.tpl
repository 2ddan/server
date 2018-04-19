{{:it = it || {leaf:false, value:"", open: true} }}
{{if it.leaf && it.value != "div"}}
<div style="display: inline-block;width:20px;height:20px;vertical-align: bottom;"></div>
{{else}}
<div style="display: inline-block;">
    <tools-icon$$ style="height:20px;width:20px;line-height:20px;text-align:center;" draggable="false">{"icon":{{it.open?"&#xf0d7;":"&#xf0da;"}} }</tools-icon$$>
</div>
{{end}}
