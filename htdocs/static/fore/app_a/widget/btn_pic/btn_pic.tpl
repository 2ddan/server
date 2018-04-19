{{:it = it||_cfg.it}}
<div style="position:absolute;">
    <img style="width:{{it.width || ''}}px" src="./images/{{it.icon ||'add_btn'}}.png" /> 
    {{if it.guide}}
    <app_a-widget-guide-guide>
        {{it.guide}}
    </app_a-widget-guide-guide>
    {{else}}
    <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
    {{end}}       
</div>
