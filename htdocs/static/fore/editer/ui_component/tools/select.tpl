<div w-class="outbox" style="{{it.focus?'height:auto;z-index:3':'height:24px;z-index:2'}};">
    <div w-class="inbox" {{if it.readOnly}} title="style样式此处不可更改" style="cursor: not-allowed;"{{end}}>
        <pi-ui-input w-class="input" readonly=true {{if !it.readOnly}}on-focus="editFocus" on-blur="editBlur"{{end}} style="{{if it.readOnly}}cursor: not-allowed;{{end}}">{"text":{{it.showArr[it.select]||''}},"sign":{{it.sign}} }</pi-ui-input>
        <icon$ w-class="icon">{"icon":{{it.focus?"&#xf0d8;":"&#xf0d7;"}} }</icon$>
    </div>

    <div w-class="enum_box">
        {{for k,v of it.showArr}}
        <div w-class="enum_item" on-mousedown="choose('{{k}}')">{{v}}</div>
        {{end}}
    </div>
</div>