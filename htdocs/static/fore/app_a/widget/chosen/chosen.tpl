{{:it = it||_cfg.it}}
<div style="position:absolute;width:{{it.width || 32}}px;height:{{it.height || 30}}px;">
    <div w-class="chosen_bg">
    </div>
    {{if it.index == it.index1}}
    <div w-class="chosen"></div>
    {{end}}
</div>