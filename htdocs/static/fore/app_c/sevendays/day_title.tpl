<div style="width:55px;height:224px;position:absolute;"  on-tap="changeDay({{it.index}})">
    {{if it1.currDay == it.index}}
    <img style="width:62px;height:138px;position:absolute;left: -3px;top: 49px;z-index:2" src="./images/selected.png"/>
    {{end}}
    <img style="position:absolute;top:0;left:0;" src="./images/title_bg_{{it.index-1 > it1.roleDay ? 0 : 1}}.png" />
    <div style="position: absolute;top: 55px;left: 4px;font-size: 20px;color: rgb(124, 56, 40);font-family: mnjsh;width: 18px;height: 68px;padding:{{it.bag ? '20px 14px 28px' : '28px 14px'}};">
        第
        <div>{{it.index}}</div>
        天
    </div>

    {{if it1.clearFun(it.index-1)}}    
    <img style="position:absolute;top:0;left:0;z-index:2" src="./images/title_bg_2.png"/>
    <app_a-widget-pic_text-pic_text style="position: absolute;left: -11px;top: 91px;z-index:2">
        {"icon":"text_finish","width":79,"height":51,"top":0,"left":0}
    </app_a-widget-pic_text-pic_text>
    {{end}}
    
    {{if it.bag}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let career_id = player.career_id}}

    {{let prop = Pi.sample[it.bag[0][0]]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = Pi.pictures[icon]}}
    <div style="position:absolute;top:132px;left:3px; " on-tap='propInfoShow({{it.bag[0][0]}})'>
        <div class="sevenday_equip" style="z-index:2;position:absolute;top:0px;left:0;"></div>
        <app_a-widget-prop-base  style="position:absolute;top:6px;left:4px;z-index:1">
            {"prop":{{prop}},"url":{{url}},"width":44,"height":44,"count":"none","name":"none","bg":0}
        </app_a-widget-prop-base>
        {{if it.bag[1]}}
        <app_a-widget-pic_text-pic_text style="position: absolute;left: -10px;top: 3px;z-index: 1;">
            {"icon":"text_get_2","width":73,"height":47,"top":0,"left":0}
        </app_a-widget-pic_text-pic_text>
        {{end}}
    </div>
    {{end}}


    {{let tip = "sevendays."+it.index}}
    <app-widget-tip-tip style="position:absolute;top: 55px;left: 34px;">{"tip_keys":[{{tip}}]}</app-widget-tip-tip>
</div>
       