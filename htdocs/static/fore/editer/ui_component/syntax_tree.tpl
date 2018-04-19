{{: it = it || {} }}
{{let tree = it.tree}}
<div style="position:absolute;overflow:hidden;width:100%;height:100%;background-color:rgb(27, 27, 41);" ev-tm-select="select" on-dbltap="toDataTab" ev-tm-downr="downr(e,'widget')">
    <div style="position: absolute;width: 100%;height: 30px;background-color: rgb(36, 36, 49);text-align:center;line-height:30px;color:#b4b4b7;font-size: 14px;">DOM树</div>
    <div style="position: absolute;width: 100%;height: calc(100% - 40px);top:30px;padding-right:20px;overflow-x:hidden;overflow-y:aotu;">
        {{if tree}}
        <base-treememu$ style="position:relative;left:0px;top:0;">{{tree.arr[0]}}</base-treememu$>
        {{end}}
    </div>
</div>
