{{:it = it || {btn:"treebtn", select: false, "switch":"treeswitch",show:{leaf:false, value:"", open: true}, sid:0, cmd:"", arr:[]} }}
<div>
    {{if it.show && it.show.value}}
    <div style="position: relative;overflow: hidden;color:#bbbbbb;font-size: 14px;white-space: nowrap;" on-down="down(e)" on-tap="select(e)">
        <widget w-tag={{it["switch"] || "treeswitch$"}} on-tap="switch">{{it.show}}</widget>
        <widget w-tag={{it.btn || "treebtn$"}} style="width:100%;{{it.show.select?'background-color:#1874CD':''}};">{{it.show}}</widget>
    </div>
    {{end}}

    {{if it.arr && it.show.open}}
        <div style="position: relative;left:16px;right: 0px;">
        {{for i, v of it.arr}}
            <treememu_a$ >{{parseInt(i)}}</treememu_a$>
        {{end}}
        </div>
    {{end}}
</div>
