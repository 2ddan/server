<div >
    {{let icons = {"folder":"&#xf115;","mp3":"&#xf001;","png":"&#xf03e;","jgp":"&#xf03e;","gif":"&#xf03e;","other":"&#xf016;"} }}
    <div style="position: relative;overflow: hidden;width: 100%;color:#bbbbbb;font-size: 14px;background-color:{{it.select?'#1874CD':'transparent'}};" on-mousedown="select">
        {{if it.type=="folder"}}
        <tools-icon$$ style="height:20px;width:20px;line-height:20px;text-align:center;cursor: default;">{"icon":{{it.open?"&#xf0d7;":"&#xf0da;"}} }</tools-icon$$>
        {{else}}
        <tools-icon$$ style="height:20px;width:20px;line-height:20px;text-align:center;cursor: default;">{"icon":{{icons[it.type]||'&#xf016;'}}}</tools-icon$$>
        {{end}}
        <div style="display:inline-block;cursor: default;">{{it.name}}</div>
    </div>

    {{if it.children && it.open}}
    <div style="position: relative;left:16px;;">
    {{for i in it.children}}
        <restree$ >{{it.children[i]}}</restree$>
    {{end}}
    </div>
    {{end}}
</div>