<div style="position:relative;">
    {{if it.key }}
    <div style="position:relative;font-size:16px;height:30px;line-height:30px;">
        <span style="color:#e7c9a4">{{it.key}}:</span>
        {{if it.value!==undefined}}
        <input style="background-color:#212125;color:#bbbbbb;width:200px;height:24px;line-height:24px;border:none;outline:none;text-overflow:ellipsis;left:5px;" spellcheck="false" value="{{it.value}}" on-change="updata(e,'{{it.updataKey}}','{{typeof(it.value)}}')" />       
        {{end}}
    </div>
    {{end}}
    {{if it.arr && it.arr.length}}
    <div style="position: relative;left:16px;">
        {{for i,v of it.arr}}
        <datatree$>{{v}}</datatree$>
        {{end}}
    </div>
    {{end}}
</div>