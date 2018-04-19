{{% HSL(色相,饱和度,亮度) 默认值 [0,100%,100%] }}
{{% 1-6 对应 品质：灰绿蓝紫橙红}}
{{let q = {
    "1":["hsl",0,0.25,1],
    "2":["hsl",-99,0.5,1],
    "3":0,
    "4":["hsl",43,0.8,1],
    "5":["hsl",174,0.9,1],
    "6":["hsl",148,1.2,1]
    }
}}
{{let arr = [] }}
{{if it.isGray}}
{{:arr.push(["gray"])}}
{{end}}
{{if q[it.quality]}}
{{:arr.push(q[it.quality])}}
{{end}}
<pi-ui-imgfilter style="pointer-events:none;" >
    {"path":"","img":{{it.url}},"arr":{{arr}} }
</pi-ui-imgfilter>