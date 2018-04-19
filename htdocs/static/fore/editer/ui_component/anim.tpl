{{: it = it || {} }}
<div style="position: absolute;width: 100%;top:0;bottom: 0;background-color:rgb(27, 27, 41);color:#b4b4b7;font-size: 14px;">
	<div style="position: absolute;width: 100%;height: 30px;background-color: rgb(36, 36, 49);text-align:center;line-height:27px;">动画</div>

	<div style="position: absolute; width:100%;top:30px;bottom:40%;overflow:hidden;">
        <div style="width:100%;height:calc(100% - 8px);position:relative;overflow-x:hidden;overflow-y:auto;padding: 4px 0;padding-right:20px;">
            {{for k in it.params }}
            {{let v = it.params[k]}}
            <div w-class="attr_box">
                <div w-class="attr_key">{{v.desc}}</div>
    
                {{let cb = it.updataCss.bind(it.updataCss,k) }}
                {{let value = v.value||null }}
    
                {{if v.type=="enum"}}
                <tools-select$ w-class="attr_value">{"arr":{{v.arr}},"select":{{v.arr.indexOf(value)}},"cb":{{cb}} }</tools-select$>
                {{elseif v.type=="number" || typeof(v) === "number" }}
                <tools-number$ w-class="attr_value">{"value":{{value}},"util":{{v.util||null}},"limit":{{v.limit||null}},"cb":{{cb}} }</tools-number$>
                {{elseif v.type=="rich"||!v.type}}
                <input w-class="attr_value" style="height:22px;line-height:22px;" spellcheck="false" data-key="{{k}}" value={{typeof(value)==='string'?value:JSON.stringify(value)}} on-change="changeValue(e,'{{k}}')" />
                {{else}}
                <input w-class="attr_value" style="height:22px;line-height:22px;" spellcheck="false" data-key="{{k}}" value={{typeof(value)==='string'?value:JSON.stringify(value)}} on-change="changeValue(e,'{{k}}')" />       
                {{end}}
            </div>
            {{end}}
        </div>
	</div>
	<div style="position: absolute;width:100%;top:60%; bottom:0;text-align:center;">
		<div style="position: absolute;width: 100%;height: 30px;background-color: rgb(36, 36, 49);line-height:30px;">预览</div>
		<div style="position:absolute;width:100%;top:30px;bottom:0;">
            <div style="position:relative;width:100%;height:50px;"></div>
            <div class="{{it.params.name.value}}" style="display:inline-block;position:relative;{{if it.bg}}background-image:{{it.bg}}{{end}}"></div>
        </div>
        <div on-tap="saveAnim" style="position:absolute;width:100px;height:40px;bottom:50px;line-height:40px;background-color: rgb(36, 36, 49);left:50%;margin-left:-50px;">保存</div>
    </div>
</div>