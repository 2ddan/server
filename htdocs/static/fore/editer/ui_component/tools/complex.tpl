<div w-class="outbox"{{if it.readOnly}} title="style样式此处不可更改" style="cursor: not-allowed;"{{else}}on-tap="pickColor"{{end}}>
    <input w-class="input" readonly="true" value="{{it.value}}" style="{{if it.readOnly}}cursor: not-allowed;{{end}}" />
    <icon$ w-class="icon" style="{{if it.readOnly}}cursor: not-allowed;{{end}}color:{{it.allSame?it.value:'rgb(134, 134, 134)'}};">{"icon":"&#xf0e4;" }</icon$>
</div>