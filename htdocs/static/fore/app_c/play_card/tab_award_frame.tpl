<div w-class="40" style="margin-bottom: 10px;">
    {{let Pi = _get("app/mod/pi").exports.Pi}}           
    {{let prop = Pi.sample[it.award[0] || it.award]}}   
    {{let url = Pi.pictures[prop.icon]}}
    <app_a-widget-img_stitch-stitch style="position: absolute;width: 450px;height: 138px;z-index:0;left: 0;">
        {"type":2,"height":20,"width":30}
    </app_a-widget-img_stitch-stitch>
    <widget w-class="42" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{it.award[0] || it.award}})">
        {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":"none","bg":0,"name":"none"} 
    </widget>
    <div w-class="43">
        <app_a-widget-text-text style="vertical-align: middle;margin-top: -3px;">
                {"text":"积分达到{{it.need}}可领取","textCfg":"heroEquip","fontSize":20,"space":0}
        </app_a-widget-text-text>
        <div w-class="44">(<span style="{{if it.need > it.have}}color:#f00{{end}}">{{it.have}}</span>/{{it.need}})</div>
    </div>
    

    {{if it.num==1 }}
    <widget w-class="45" w-tag="app_a-widget-btn-rect" on-tap="{{if 2-it.num}}getScoreAward({{it.i-0+1}}){{end}}">
        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"领取","width":118,"height":46} 
    </widget>
    {{elseif it.num==2 }}
    <widget w-class="45" w-tag="app_a-widget-btn-rect" on-tap="{{if 2-it.num}}getScoreAward({{it.i-0+1}}){{end}}">
        {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"领取","width":118,"height":46} 
    </widget>
    {{else}}
    <widget w-class="45" w-tag="app_a-widget-btn-rect">
        {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"已领取","width":118,"height":46} 
    </widget>
    {{end}}
        
</div>
