{{:it = it || {"value":{"":""}, leaf:false, select:false, valueType: "base"} }}
{{let value = it.value }}
{{let keys = Object.keys(value) }}
{{let key = keys[0] }}
{{let v = value[key] }}
<div style="display: inline-block;">
    <div style="display: inline-block;">{{key}}</div>
    {{if(it.valueType === "color")}}
    <color$ style="display: inline-block;">{{it.value}}</color$>
    {{else}}
    <div style="display: inline-block;">{{v}}</div>
    {{end}}
</div>

