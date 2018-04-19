{{:it = it||_cfg.it }}

{{let Common = _get("app/mod/common").exports.Common }}
{{let filter = (it.prop.quality&&it.prop.quality[1]) || it.prop.quality || it.quality || "gray" }}

<div style="width:{{it.width||80}}px;height:{{it.height||80}}px;">
    <div style="width:100%;height:100%;position:absolute;z-index:2">
        {{if filter !== "gray"}}
        <img src="app_a/widget/prop/images/prop_border_{{filter}}.png" style="position:absolute;top:0;left:0;width:100%;;height:100%;z-index:1"/>
            {{if it.prop}}
            <img src="app_a/widget/prop/images/prop_bg_{{filter}}.png" style="position:absolute;top:0;left:0;width:100%;;height:100%;" />
            {{else}}
            <img src="app_a/widget/prop/images/prop_bg_no.png" style="position:absolute;top:0;left:0;width:100%;;height:100%;" />
            {{end}}
        {{else}}
        <img src="app_a/widget/prop/images/prop_{{filter}}.png" style="position:absolute;top:0;left:0;width:100%;;height:100%;" />
        {{end}}

        <img src={{it.url}} style="position:absolute;left:9%;top:5%;width:83%;height:83%;"/>
        
        
        {{let top = (it.top || 25) + "px"}}
        <div style="position:absolute;width:100%;line-height:12px;text-align:right;top:calc(100% - {{top}});right:{{it.right || 10}}px;">
            {{it.count==="none"?"":Common.numberCarry(parseInt(it.count||it.prop.count),10000)}}
        </div>
        {{if !it.hidden_name}}
        <div style="color: rgb(255, 255, 255);position: absolute;bottom: -{{it.bottom || 16}}px;width: 120%;line-height: 19px;text-align: center;font-family: mnjsh;z-index: 4;left:50%;transform:translate(-50%);">
            {{it.name==="none"?"":(it.name||it.prop.name)}}
        </div>
        {{end}}
        {{if it.bg}}
        <img src="./images/equip_level_bg.png" style="bottom: -{{it.bottom || 16}}px; position:absolute;width:{{it.nWidth||73}}px;height:{{it.nHeight||22}}px;z-index:3;left:0;right:0;margin:0 auto" />
        {{end}}
    </div>
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:0;top:0;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
    <app_a-widget-btn_sound-btn_sound style="z-index:3"></app_a-widget-btn_sound-btn_sound>
    {{if it.guide}}
    <app_a-widget-guide-guide>
        {{it.guide}}
    </app_a-widget-guide-guide>
    {{end}}
    {{if it.effect}}
    {{let scale = (it.width||80)/98}}
    <div class="equipBorderAnim" style="position: absolute; left: 50%; top: 47%; z-index: 2; transform:translate(-50%,-50%) scale({{scale}}) ; pointer-events: none;"></div>
    {{end}}
</div>