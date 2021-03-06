{{if window._gui}}
<div style="min-width:0px;min-height:0px;border-width:{{it.split}};border-image-source:url({{it.src}});border-image-slice: {{it.split}} fill;"></div>
{{else}}
{{:it=it||_cfg.it}}

{{let split = it.split.split(" ") }}
{{let arr = []}}
{{let inner = []}}
{{for i,v of split}}
{{:inner.push(+v)}}
{{:arr.push(v==0?0:+v+1)}}
{{end}}

<div style="min-width:4px;min-height:4px;">
    <div style="position:absolute;left:0;top:0;border-style:solid;border-color:transparent;border-width:{{arr.join('px ') + 'px'}};border-image:url({{it.src}}) {{arr.join(' ')}} fill round;width:calc(100% - {{arr[1] + arr[3]}}px);height:calc(100% - {{arr[0] + arr[2]}}px);box-sizing: content-box;"></div>
    <div style="position:absolute;left:0;top:0;border-style:solid;border-color:transparent;border-width:{{inner.join('px ') + 'px'}};border-image:url({{it.src}}) {{inner.join(' ')}} fill round;width:calc(100% - {{inner[1] + inner[3]}}px);height:calc(100% - {{inner[0]+inner[2]}}px);box-sizing: content-box;"></div>
</div>
{{end}}