<div class={{it.type}} style="width:{{it.width|| 72}}px;height:{{it.height|| 33}}px;">
    <img style="transform:scale(0.7);margin-top:{{it.top || 0}}px;margin-left:{{it.left || 0}}px;" src="./text/{{it.text||""}}.png"/>
    {{if it.tip_keys && it.tip_keys.length}}
    <app-widget-tip-tip style="right:3px;top:5px;">
        {"tip_keys":{{it.tip_keys}} }
    </app-widget-tip-tip>
    {{end}}
</div>