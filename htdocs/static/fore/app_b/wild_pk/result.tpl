<div style="width:291px;height:133px;top: 271px;left: 50%;margin-left: -145px;position: absolute;">
    <img src="./images/end.png"/>
    {{let head = it1.Pi.pictures['playerhead'+it[0]]}}
    <div style="width:64px;height:64px;position: absolute;border-radius: 50%;overflow: hidden;top:45px;left:3px;">
        <img style="width:65px;" src="{{head}}"/>
    </div>
    <app_a-widget-text-text style="position: absolute;z-index: 1;top: 58px;left: 50%;transform: translateX(-50%);">
        {"text":"击败","textCfg":"heroEquip","fontSize":38,"space":0}
    </app_a-widget-text-text>
    {{let head1 = it1.Pi.pictures['playerhead'+it[1]]}}
    <div style="width:64px;height:64px;position: absolute;border-radius: 50%;overflow: hidden;top:45px;right:3px;">
        <img style="width:65px;" src="{{head1}}"/>
    </div>
</div>