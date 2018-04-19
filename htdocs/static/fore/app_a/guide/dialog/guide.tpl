<div style="position: absolute;top:0;left:0;width:100%;height:100%;">
    {{let player = app.mod.db.get("player")}}
    <div first_dialog style="position: absolute;{{if it.dialog.left === 'major'}}left: 0px;bottom: 340px;{{else}}right: 0px;bottom: 190px;{{end}}height: 120px;width: 500px;">
        <guide_item$>{"dialog":{{it.dialog}},"first_text":"{{it.first_text?it.first_text:''}}" }</guide_item$>
    </div>
    <div style="position: absolute;{{if it.dialog.left === 'major'}}right: 0px;bottom: 190px;{{else}}left: 0px;bottom: 340px;{{end}}height: 120px;width: 460px;">
        {{if it.last}}
        <guide_item$>{"dialog":{{it.last.dialog}} }</guide_item$>
        {{end}}
    </div>
</div>