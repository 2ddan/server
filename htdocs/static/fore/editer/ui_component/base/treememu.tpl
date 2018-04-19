{{:it = it || {select: false,show:{leaf:false, value:"", open: true}, sid:0, arr:[]} }}
<div dragFlag="1" style="border:2px solid transparent;">
    {{if it.show.value}}
    <div dragFlag="2" on-down="down(e,'{{it.show.value}}')" on-dbltap="open" style="position: relative;overflow: hidden;color:#bbbbbb;font-size:14px;background:{{it.show.select?'#1874CD':'transparent'}};">
        {{if it.show.leaf }}
        <tools-icon$$ style="height:20px;width:20px;line-height:20px;text-align:center;cursor: default;">{"icon":"&#xf016;" }</tools-icon$$>
        {{else}}
        <tools-icon$$ style="height:20px;width:20px;line-height:20px;text-align:center;cursor: default;">{"icon":{{it.show.open?"&#xf0d7;":"&#xf0da;"}} }</tools-icon$$>
        {{end}}
        <div style="display:inline-block;cursor: default;">{{it.show.value}}</div>
    </div>
    {{end}}

    {{if it.arr && it.arr.length && it.show.open}}
    <div dragFlag="3" style="position: relative;left:16px;;">
        {{for i, v of it.arr}}
        <div dragFlag="4" dragIndex="{{i}}" style="position:relative;margin-top: -4px;margin-bottom:-4px;;left:-5px;height:2px;border:5px solid transparent;background-color:transparent;background-clip:content-box;"></div>
        <treememu$ currIndex={{i}} >{{v}}</treememu$>
        {{end}}
        <div dragFlag="4" dragIndex="{{it.arr.length}}" style="position:relative;margin-top: -4px;margin-bottom:-4px;;left:-5px;height:2px;border:5px solid transparent;background-color:transparent;background-clip:content-box;"></div>
    </div>
    {{end}}
</div>
