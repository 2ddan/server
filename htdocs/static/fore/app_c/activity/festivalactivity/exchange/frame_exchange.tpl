
<div w-class="47" style="margin-bottom: 10px;">
    <app_a-widget-img_stitch-stitch style="position: absolute;width: 410px;height: 110px;z-index:0;left: 0;">
        {"type":2,"height":20,"width":30}
    </app_a-widget-img_stitch-stitch>
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let Common = _get("app/mod/common").exports.Common}}


    {{let career_id = player.career_id}}
    {{let Pi = _get("app/mod/pi").exports.Pi}} 
    {{let prop_id = (it.award[0][0] == "money" ? 100001 : (it.award[0][0] == "diamond" ? 100002 : it.award[0][0]))}}
    {{let prop = Pi.sample[prop_id]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = Pi.pictures[icon]}}
    <widget w-class="46" w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{prop_id}})">
        {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":{{it.award[0][1]}},"bg":0,"name":"none"} 
    </widget>
   
    <app_a-widget-text-text style="position:absolute;top:16px;left:93px;">
        {"text":{{prop.name}},"fontSize":20,"textCfg":"iconCircle"}
    </app_a-widget-text-text>

    <div class="shadow" style="position:absolute;width:176px;height:52px;left:93px;top:49px;font-size:16px;color:#f3d6af;font-family:mnjsh;line-height:20px;text-align: justify;">{{prop.describe}}</div>	
    
   
   

    {{let count = it.init_count -it1.festActRead[it.id]}}
    {{if count}}
    <div w-class="45">
        <span w-class="48">
            可兑：<span style="color:#fff">{{count}}/{{it.init_count}}</span>   
        </span>
        <widget style="position: absolute;"  w-tag="app_a-widget-btn-rect" on-tap='getAward({"index":{{it.index}},"act_id":{{it.act_id}} })'>
            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"兑 换","width":118,"height":46} 
        </widget>
        {{let need = it.award_condition[0]}}
        {{let have = Common.getBagPropById(need[0])}}
        {{let c = (have && have[1].count) || 0}}
        <widget on-tap="propInfoShow({{need[0]}})" w-class="44" w-tag="app_a-widget-coin-coin"  style=" color:{{c>=need[1] ? '#ffd8a6':'#fe3636'}};">
            {"icon":{{need[0]}},"width":25,"height":21,"left":3,"text":[{{need[1]}}],"color":"#ffd8a6"} 
        </widget>
    </div>
    

    {{else}}
    <widget  w-class="45" w-tag="app_a-widget-pic_text-pic_text" style="top:23px;right:9px;">
        {"icon":"text_get_4","width":120,"height":77}
    </widget>
    {{end}}
        
</div>
    