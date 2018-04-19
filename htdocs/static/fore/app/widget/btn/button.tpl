{{% 
    {'type':'min' || 'ling' || 'border' || 'orange' || 'gray'} //传参形式
    class='min' || 'ling' || 'border' || 'orange' || 'gray  //class声明形式
    'active' //选中状态
    width&&height //取消style声明形式使用it传： {width:'20px',height:'20px'}
    text为文本
}}
<div class="btn {{it.type||''}}">
    <span class="grain">
        <span class="grain_" style="width: {{it.width1 || 0}}%;height: {{it.height1 || 0}}%;">
            {{if it.border}}
            <img style="position:absolute;top:-3px;left:-3px" src="app/widget/btn/images_btn/btn-ling-border-blue.png"/>
            <img style="position:absolute;bottom:-3px;left:-3px;transform:rotate(-90deg)" src="app/widget/btn/images_btn/btn-ling-border-blue.png"/>
            <img style="position:absolute;top:-3px;right:-3px;transform:rotate(90deg)" src="app/widget/btn/images_btn/btn-ling-border-blue.png"/>
            <img style="position:absolute;bottom:-3px;right:-3px;transform:rotate(180deg)" src="app/widget/btn/images_btn/btn-ling-border-blue.png"/>
            {{end}}
            {{if it.type&&/img/g.test(it.type)}}
                <img style="pointer-events:none;margin-top:{{it.top || 0}}px;margin-left:{{it.left || 0}}px" src="./text/{{it.text||""}}.png"/>
            {{else}}
                <span class={{it.shadow || 'shadow'}} style="position:absolute; width:100%; left:0; text-align:center;pointer-events: none;font-family:mnjsh;font-size:{{it.fontSize}}px;margin-left:{{it.marginLeft || ''}}px">{{it.text||""}}</span>
            {{end}}
        </span>
    </span>
    
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:0;top:0;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
</div>