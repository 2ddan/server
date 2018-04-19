<div w-class="40" style="margin-bottom: 10px;">
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let career_id = player.career_id}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}        
    {{let prop = Pi.sample[it.sid]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = Pi.pictures[icon]}}
    <app_a-widget-img_stitch-stitch style="position: absolute;width: 424px;height: 112px;z-index:0;left: 0;">
        {"type":2,"height":20,"width":30}
    </app_a-widget-img_stitch-stitch>
    <widget w-class="42" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{it.sid}})">
        {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":"none","bg":0,"name":"none"} 
    </widget>
    <app_a-widget-text-text  w-class="43">
            {"text":"积分达到{{it.need}}可领取","textCfg":"heroEquip","fontSize":20,"space":0}
    </app_a-widget-text-text>
    <div w-class="44">({{Math.ceil(it.have)}}/{{it.need}})</div>

    {{if it.num==1 }}
    <widget w-class="45" w-tag="app_a-widget-btn-rect" on-tap="{{if 2-it.num}}getScoreAward({{it.i - 0 + 1}}){{end}}">
        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"领取","width":118,"height":46} 
    </widget>
    {{elseif it.num==2 }}
    <widget w-class="45" w-tag="app_a-widget-btn-rect" on-tap="{{if 2-it.num}}getScoreAward({{it.i - 0 + 1}}){{end}}">
        {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"领取","width":118,"height":46} 
    </widget>
    {{else}}
    <widget  w-class="45" w-tag="app_a-widget-pic_text-pic_text" style="top:30px;right:18px;">
        {"icon":"text_get_1","width":94,"height":60}
    </widget>
    {{end}}
        
</div>
