<div style="width:100%;height:100%;">
    <div on-tap="goback" style="width:100%;height:100%;position:absolute;"></div>
    <div w-class="child_box" style="{{it.style}}">
        {{for k, v of it.keys}}
        <div w-class="child" class="hover2" on-tap="clickFun(e, '{{v}}')">{{v}}</div>
        {{end}}
    </div>
</div>