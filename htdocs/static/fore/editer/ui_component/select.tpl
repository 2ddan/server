{{: it1 = it1 || {} }}
<div w-class="select" style="left:{{it.boxWidth}}px;top:{{it.boxWidth}}px;">

    {{if it1.box}}
    <div w-class="border" style="width:{{it1.box.width}}px;height:{{it1.box.height}}px;left:{{it1.box.left-1}}px;top:{{it1.box.top-1}}px;"></div>
    {{end}}

    {{if it1.selects}}
    {{for k, v of it1.selects}}

    <div w-class="border" style="width:{{v.width}}px;height:{{v.height}}px;left:{{v.left-1}}px;top:{{v.top-1}}px;"></div>
    {{let points = [
        [v.left, v.top], [v.left + v.width / 2, v.top], [v.left + v.width, v.top],
        [v.left, v.top + v.height / 2 ], [v.left + v.width, v.top + v.height / 2],
        [v.left, v.top + v.height], [v.left + v.width / 2, v.top + v.height], [v.left + v.width, v.top + v.height]
    ]
    }}
    {{for i ,v of points}}
    <div w-class="pointer p{{i}}" style="left:{{v[0]-4}}px;top:{{v[1]-4}}px;" data-point="{{i}}" on-mousedown="down(e,'p{{i}}')" on-mouseup="up" ></div>
    {{end}}
    
    {{end}}
    {{end}}
</div>