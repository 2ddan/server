{{let q = {"0":0,"1":[["hsl",158,2,1.15]]}
}}
<div on-tap="tap">
    <img src="app_a/widget/btn/images/help_2.png" style="pointer-events:none;width:100%;height:100%;position: absolute;" />

    <div class="shadow" style="color:rgb(210,209,222);width: 100%;height: 100%;font-size: {{it.fontSize ? it.fontSize : 18}}px;text-align: center;line-height: {{it.height || 30}}px;position: absolute;font-family:mnjsh">{{it.text || ''}}</div>
</div>