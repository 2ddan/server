{{% 可选: select:Boolean 选中状态，默认未选中}}
{{% 可选: layout:Number 排列方向，0 为水平，1 为纵向。默认水平。}}
{{let style = it.select ? 1 : 0}}
{{let color = it.select ? '#554137' : '#ac8e7c'}}
<div data-desc="navtab-btn" style="position:relative;" >
    <div style="width:100%;height:100%;overflow:hidden;pointer-events: none;" >
        <img src="app/widget/tab/images/button_{{it.bType ? it.bType : 1}}_{{style}}.png" style="position:absolute;left:0;top:0;width:100%;height:100%;" />
        <div style="position:absolute;width:100%;height:100%;font-family:'mnjsh';display:flex;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;color:{{color}};">
            {{for i,v of (""+(it.cfg.text||"")).split("") }}
            <span style="font-size:{{it.cfg.fontSize || 24}}px;{{if v==' '}}width:4px{{end}};height:{{it.cfg.fontSize ||24}}px;line-height:{{it.cfg.fontSize || 24}}px">{{v}}</span>
            {{end}}
        </div>
    </div>
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:0;top:0;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
    {{if it.cfg.guide}}
    <app_a-widget-guide-guide>
        {{it.cfg.guide}}
    </app_a-widget-guide-guide>
    {{end}}
    <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
</div>


