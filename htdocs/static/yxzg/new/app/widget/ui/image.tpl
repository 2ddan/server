{{let arr = [] }}
{{if it.isGray}}
{{:arr.push(["gray"]) }}
{{end}}

{{let img = it.src.indexOf("app") >-1 ? it.src : (it.src && it.src.indexOf("Textures/RoleIcon/")>-1?("app/scene_res/res/images/"+it.src.split("Textures/RoleIcon/")[1]):("app/images/"+it.src))+".png"}}

{{if window._gui}}
<img src="{{img}}" alt="" />
{{else}}
<pi-ui-imgfilter>
    {"path":"","img":{{img}},"arr":{{arr}} }
</pi-ui-imgfilter>
{{end}}