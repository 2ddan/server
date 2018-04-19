<div class={{it.type}} style="width:{{it.width|| 72}}px;height:{{it.height|| 33}}px;">
    <div class="center_v" style="width:100%;height:20px;text-align:center;">
        {{for i,v of it.text.toString().split("")}}
            <img src="../../../app_b/style/number/{{v-0}}.png" style="width:9px;height:11px;position:relative;display:inline-block;vertical-align: super;" />
        {{end}}
        <img src="../../../app_b/style/number/level.png" class="center_v" style="position:relative;display:inline-block;vertical-align: super;" />
    </div>
</div>