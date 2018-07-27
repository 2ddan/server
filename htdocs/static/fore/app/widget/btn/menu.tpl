
<div style="position:{{it.position || 'relative'}};display:inline-block;width:{{it.width ? it.width : 60}}px;height:{{it.height ? it.height : 60}}px;text-align:center;">
    {{if it.select}}
        <img src="./images/menu_select.png" style="position:absolute;left:0px;right: 0px;margin: 0 auto;z-index:1;width: 100%;"/>
    {{end}}

    <app-widget-image-quality style="width:{{it.imgWidth || 100}}%;position:absolute;left:0px;right: 0px;margin: 0 auto;z-index:1;top:{{it.top || ''}}px">{"isGray":{{it.isGray||0}},"icon":{{it.icon}}}</app-widget-image-quality>
    
    {{if it.bg}}
        {{if it.bg == 3}}
        <div w-class="icon_bg_3" style="width:{{it.width || 60}}px;height:{{it.height || 60}}px;" class="center_t"></div>
        {{else}}
        <div w-class={{"icon_bg_"+it.bg}} class="center_t"></div>
        {{end}}
    {{end}}
    
    {{if it.type&&/img/g.test(it.type)}}
        <app-widget-image-quality class="center_h" style="position: absolute;display:inline-block;bottom:{{it.bottom || 0}}px;z-index:1;transform: scale(0.7);">
        {"isGray":{{it.isGray||0}},"url":{{"app/widget/btn/text/" + it.text + ".png"}} }
        </app-widget-image-quality>
    {{else}}
        <app-widget-text-text class="center_t" style="display:inline-block;bottom:{{it.bottom || 0}}px;z-index:1;"> {"textCfg":{{it.isGray?'menu_main_gray':(it.textCfg ? it.textCfg : 'menu_main')}},"fontSize":{{it.fontSize?it.fontSize:16}},"text":{{it.text}},"space":{{it.space || 0}} }</app-widget-text-text>
    {{end}}
    {{if it.anima}}
        {{if it.anima == "anim_ling"}}
    
            <div style="transform: translate(-51.5%,-49.5%) scale(0.7);width:170px;height:170px;position: absolute;overflow:hidden;left: 50%;top: 50%;z-index: 1;">
                <div class="anim_ling" style="position: absolute;"></div>
            </div>
        {{else}}
            <div style="transform: translate(-51%,-51%) scale(0.9);width:126px;height:126px;position: absolute;overflow:hidden;left: 50%;top: 50%;">
                <div class="{{it.anima}}" style="position: absolute;"></div>
            </div>
        {{end}}
    
    {{end}}

    {{if it.guide}}
    <app_a-widget-guide-guide>
        {{it.guide}}
    </app_a-widget-guide-guide>
    {{else}}
    <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    {{end}}
    
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:3px;top:5px;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
    
</div>