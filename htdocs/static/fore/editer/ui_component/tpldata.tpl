{{: it = it || {} }}
<div style="position:absolute;width:100%;height:100%;text-align:left;">
    <div w-class="data_box">

        {{if it.it1Parse}}
        {{:console.log(it.it1)}}
        <div w-class="title">it1数据</div>
        <base-datatree$ style="position:relative;">{"updataFun":{{it.updataState}},"arr":{{it.it1Parse}} }</base-datatree$>
        {{end}}
        
        {{let _it = it.it||it.defaultIt}}
        {{if _it}}
        <div w-class="title">it数据</div>
        {{if typeof(_it) === "object"}}
        {{let info = it.defaultIt.params || it.defaultIt}}
        {{for k in info}}
        {{if k!= "params"}}
        {{let v = info[k]}}
        <div w-class="attr_box">
            <div w-class="attr_key">{{k}}</div>

            {{let cb = it.updataProps.bind(it.updataProps,k) }}

            {{let value = it.it===null?it.defaultIt===null?null:it.defaultIt[k]:it.it[k] }}

            {{if typeof(value)==="string"&&value.indexOf("{{")!==-1}}
            <input w-class="attr_value" style="height:22px;line-height:22px;" spellcheck="false" data-key="{{k}}" value={{typeof(value)==='string'?value:JSON.stringify(value)}} on-change="changeValue(e,'{{k}}')" />
            {{elseif v.type=="enum"}}
            <tools-select$ w-class="attr_value">{"arr":{{v.arr}},"select":{{v.arr.indexOf(value)}},"cb":{{cb}} }</tools-select$>
            {{elseif v.type=="color"}}
            <tools-complex$ w-class="attr_value">{"value":{{value}},"cb":{{cb}} }</tools-complex$>
            {{elseif v.type=="number" || typeof(v) === "number" }}
            <tools-number$ w-class="attr_value">{"value":{{value}},"limit":{{v.limit||null}},"cb":{{cb}} }</tools-number$>
            {{elseif v.type=="src"}}
            <input w-class="attr_value" spellcheck="false" data-key="{{k}}" value={{value}}  />
            {{elseif v.type=="rich"||!v.type}}
            <input w-class="attr_value" style="height:22px;line-height:22px;" spellcheck="false" data-key="{{k}}" value={{typeof(value)==='string'?value:JSON.stringify(value)}} on-change="changeValue(e,'{{k}}')" />
            {{else}}
            <input w-class="attr_value" style="height:22px;line-height:22px;" spellcheck="false" data-key="{{k}}" value={{typeof(value)==='string'?value:JSON.stringify(value)}} on-change="changeValue(e,'{{k}}')" />       
            {{end}}
        </div>
        {{end}}
        {{end}}
        {{else}}
        <div w-class="attr_box">
            <div w-class="attr_key" style="width:100%;">{{_it}}</div>
        </div>
        {{end}}
        {{end}}

        
        {{if it.content!==null && it.content!==undefined }}
        <div w-class="title">包含内容</div>
        <base-textarea$>{"text":{{it.content||''}},"cb":{{it.updataConten}} }</base-textarea$>
        {{end}}
    </div>
</div>