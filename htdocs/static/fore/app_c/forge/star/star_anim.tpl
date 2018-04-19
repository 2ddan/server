{{let num = 0 }}
<div style="height:20px;text-align:{{it.center ? 'center' : 'left'}};display:inline-block;width:{{it.star[0] * 18}}px;">
    
    {{while num < it.star[1] }}
    <div style="width: 18px;height: 18px;margin:0px -1px;position:relative;display:{{it.star[0] > num?'inline-block':'none'}};">
        <star class="{{it.star[0] > num?'star_'+ ((Math.floor(it.star[0] / 3) + 1) == 6 ? 5 : (Math.floor(it.star[0] / 3) + 1)):''}}" style="width: 18px;height: 18px;"></star>
        {{if it.star[0] > num && it.star[0] >= it.effect}}
        <div class="starLightlingAnim" style="position:absolute;transform: scale(0.6);left: -29px;top: -27px;"></div>
        {{end}}
        {{:num++}}
    </div>
    {{end}}
</div> 