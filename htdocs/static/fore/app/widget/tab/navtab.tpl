{{% 要求it.cur可选提供当前选中的卡片位置，默认为原值，没有原值为0}}
{{% 要求it提供卡片数组，type:惰性加载0-隐藏显示切换，切换采用加载1-销毁模式，一次性加载2-隐藏显示切换。}}

{{:it = it || {cur:0, btn:"btn$", arr:[{tab:"input$", btn:{"text":"Abc"} }], old:{}, type:0 } }}

<div style="width:100%;height:100%;">
    {{if it.type == 0}}
        {{for i,v of it.arr}}
            {{if i == it.cur}}
            <widget w-tag="{{v.tab}}" style="visibility:{{i==it.cur?'visible':'hidden'}};z-index:{{i==it.cur?2:1}};">{{v}}</widget>
            {{elseif it.old[i]}}
            <widget w-tag="{{v.tab}}" style="visibility:{{i==it.cur?'visible':'hidden'}};z-index:{{i==it.cur?2:1}};">{{v}}</widget>
            {{end}}
        {{end}}
    {{elseif it.type === 1}}
        <widget w-tag="{{it.arr[it.cur].tab}}" >{{it.arr[it.cur]}}</widget>
    {{else}}
        {{for m, n of it.arr}}
            <widget w-tag="{{n.tab}}" style="visibility:{{m==it.cur?'visible':'hidden'}}; z-index:{{m==it.cur?2:1}};">{{n}}</widget>
        {{end}}
    {{end}}

{{if it.hide !== "btn"}}
<div data-desc="tab_btn" style="position:absolute;z-index:2;{{it.top?'top:'+it.top+'px;':''}}{{it.left?'left:'+it.left+'px;':''}}{{it.layout?'width:'+(it.width||78)+'px;':'height:'+(it.height||38)+'px;'}}" >
    {{for j, h of it.arr}} 
    <app-widget-tab-tab_btn style="display:{{it.display ? '' : 'inline-block'}};width:{{it.btn_width|| 103}}px;height:{{it.btn_height|| 48}}px;margin:{{it.layout?(it.margin||0)/2+'px 0':'0 '+(it.margin||0)/2+'px'}};" on-tap='change({"cmd":"{{j}}","type_m":"{{h.btn.type_m}}"})'>
        {"layout":{{it.layout||0}},"bType":{{it.bType || 1}},"cfg":{{h.btn}},"select":{{j == it.cur}},"tip_keys":{{h.tip_keys||[]}},"type":{{it.cur-0==j?h.btn.type + " active":h.btn.type}} }
    </app-widget-tab-tab_btn>
    {{end}}
</div>
{{end}}
</div>
