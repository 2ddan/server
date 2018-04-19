{{% split：数组 存储标题名称}}
{{% key：表示每个标题的所占宽度百分比}}
{{% padding：表示标题与两边的菱形图标的间距}}
{{% va：表示标题的垂直对其方式}}
{{% fontSize：表示标题的字体大小}}

{{:it = it||_cfg.it}}
{{let height = it.height || 48}}
{{let width = 60 * height / 48}}
<div data-desc="面板标题" style="position:absolute;">
    <img style="position:absolute;left:0;height:{{height}}px" src="./images/rank_bg_left.png"/>
    <img style="position:absolute;right:0;height:{{height}}px" src="./images/rank_bg_right.png"/>
    <img style="position: absolute;top: 0px;width: calc(100% - {{2*width}}px);height: {{height}}px;background-repeat: repeat-x;left: {{width}}px;" src="./images/rank_bg_middle.png"/>
    {{if it.keys}}
    {{for k,v of it.keys}}
    <div style="position:relative;display:inline-block;text-align:center;vertical-align:middle;width:{{it.split?it.split[k]:100/it.keys.length}}%;top:50%;transform: translateY(-50%);z-index:1">
        <div style="display:inline-block;position:relative;padding:0 {{it.padding?it.padding[k]||0:0}}px;">
            <img src="./images/sq.png" style="position:absolute;left:0;top:50%;transform:translate(-100%,-50%);"/>
            <img src="./images/sq.png" style="position:absolute;right:0;top:50%;transform:translate(100%,-50%);"/>
            <app_a-widget-text-text style="vertical-align: {{it.va || 'middle'}};">{"textCfg":{{it.textCfg || "gangCoverTitle"}},"text":{{v}},"fontSize":{{it.fontSize||22}},"space":{{it.space || 0}} }</app_a-widget-text-text>
        </div>
    </div>
    {{end}}
    {{end}}
</div>