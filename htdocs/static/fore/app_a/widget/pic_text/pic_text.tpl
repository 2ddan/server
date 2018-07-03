{{% type : 必须 根据type判断所需的样式}}
{{% icon : 必须 图标名称}}
{{% width : 可选 图片的宽度}}
{{% height : 可选 图片的高度}}
{{% text : 可选 可以只展示图片 也可展示图片以及文字}}

{{:it = it||_cfg.it}}


<div style="width:{{it.width || 0}}px;height:{{it.height || 0}}px;text-align:{{it.align || 'center'}};">
    {{if it.icon}}
    <img src="app_a/widget/pic_text/images/{{it.icon}}.png" style="position:absolute;left:0;top:0;width:100%;height:100%;" />
    {{end}}
    {{if it.textCfg}}
    
    <app_a-widget-text-text style="position:absolute;left:{{it.left || 0}}px;right:0px;margin:0 auto;top:{{it.top || 0 }}px">{"text":{{it.text}},"textCfg":{{it.textCfg || ''}},"space":{{it.space || 0}},"fontSize":{{it.fontSize || 12}}}</app_a-widget-text-text>
    {{else}}
    <span style="margin-left:{{it.marginLeft || 0}}px;position: absolute;width: 100%;height: 100%;left: 0px;line-height:{{it.height}}px">{{it.text === 0 ? 0 : (it.text ? it.text : '')}}</span>
    {{end}}
</div>