{{let tab = {"cur":0, "btn":"editer-ui_component-base-tabbtn", "old":{}, "type":2, "arr":[] } }}
{{for k, v of it}}
    {{: tab.arr.push({"tab":v.name, "btn":{"text":v.title}, "cfg":{} }) }}
{{end}}
<div style="width: 100%; height: 100%;">
    <base-ed_navtab$>{{tab}}</base-ed_navtab$>
</div>
