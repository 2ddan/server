{{:it = it || {"value":"1", leaf:false, open:false} }}
<div style="display: inline-block;height:20px;cursor: default;">
    {{if it.path}}
    <tools-icon$$ style="height:20px;width:20px;line-height:20px;cursor: default;" draggable="false">{"icon":{{it.leaf?"&#xf016;":"&#xf115;"}}}</tools-icon$$>
    {{end}}
    <div style="display: inline-block;height:20px;line-height:20px;">{{it.value}}</div>
</div>
