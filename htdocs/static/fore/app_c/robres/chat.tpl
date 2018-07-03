<div {{if it[1] && it[2]}}on-tap="gotoFun('{{it[2]}}')"{{end}}>
    {{if it[1]}}
    <div data-desc="内容">{{it[1]}}</div>
    {{else}}
    <div data-desc="内容">我被坏人抢夺了水晶,各位大侠快来帮我报仇!<u style="color:#f00" {{if !it[1] && it[2]}}on-tap="gotoFun('{{it[2]}}')"{{end}}><i>点击前往</i></u> </div>
    {{end}}
</div>