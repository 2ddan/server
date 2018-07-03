<div style="position:absolute;color:#fff;text-align: left;font-size: 16px;width: 21px;height: 210px;text-align: center;">
    {{if it1}}
    {{if it1.anima}}
        <div class="anim_exp_bar" style="position: absolute;left: -31px;top: -18px;transform: scaleX(1.6);"></div>
    {{end}}
    <span style="position: absolute;top: -15px;left: -10px;width: 40px;">Exp</span>
    <span style="position: absolute;top: 100px;left: -11px;width: 40px;font-size: 12px;z-index:1">{{it1.progress + "%"}}</span>
    <widget w-tag="app_a-widget-bar-bar2" style="position: absolute;top: 95px;left: -90px;transform: rotate(-90deg) scaleY(1.6);width: 200px;height: 21px;">
        {"progress":{{it1.progress}},"text":" ","width":200} 
    </widget>
    <span class="shadow7" style="background-image:url(app_a/widget/head/images/head_level.png);background-size:100% 100%;height:40px;width:40px;white-space:nowrap;color:#b5e8ff;font-size:15px;top: 194px;position: absolute;left: -12px;line-height: 40px;font-family: mnjsh;">Lv{{it1.level}}</span>
    
    {{end}}
    <div id="tips" style="position:absolute;bottom:48%;width:100px;height:100px;left:5px;color:#96ff00;font-size:18px;text-align:right"></div>
</div>