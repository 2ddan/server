<div w-class="outbox" {{if it.readOnly}} title="style样式此处不可更改" style="cursor: not-allowed;"{{end}}>
    <pi-ui-input w-class="input" readonly={{(it.content[2]||it.readOnly)?true:false}} on-change="changeNum" on-keydown="keydown" style="{{if !it.content[1]}}width:128px;{{end}};{{if it.readOnly}}cursor: not-allowed;{{end}}">{"text":{{it.content[0]}},"sign":{{it.sign}} }</pi-ui-input>
    {{if it.content[1]}}
    <div w-class="util" on-tap="switch" style="{{if it.readOnly}}cursor: not-allowed;{{end}}">{{it.content[1]}}</div>
    {{end}}
</div>