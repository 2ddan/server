{{% 要求it.widget 可选, 默认的数据组件名}}
{{% 要求it.arr 必须, el元素数据，如果el.widget则使用it.widget作为组件名}}
{{% 要求it.orientation 可选,提供滚动的方向，1为x方向，2为y方向，默认为2}}
{{% 要求it.initCount 可选, 初始显示多少数据，默认为10}}
{{% 要求it.addCount 可选, 滚动到头后增加多少数据，默认5}}
{{% 要求it.checkPixel 可选, 滚动差多少像素到头，如果为小数，表示使用宽高的百分比，默认0.5}}

{{% it.needIndex 可选, 是否需要返回遍历的index。 默认不需要,直接返回值。需要的时候返回对象{index:i,value,v}  }}

{{:it = it || {orientation:2, arr:[], min:10, addCount:5, checkPixel:0.5,scrollEnd:false } }}

<div style="z-index: 4;overflow-x: {{it.orientation === 2 ? 'hidden' : 'auto'}}; overflow-y: {{it.orientation === 2 ? 'auto' : 'hidden'}};" on-scroll="scroll">
{{let arr = it.arr.slice(it.showStart, it.showEnd)}}
{{for i, v of arr}}
{{let r = it.needIndex ? {"index":i,"value":v,"length":it.arr.length } : v }}
<widget w-tag={{v.widget||it.widget}}>{{r}}</widget>
{{end}}
<div style="width: 50%;height: 10px;"></div>

</div>
