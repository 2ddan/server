<div w-class="40" style="margin-bottom: 10px;">
    {{let Pi = _get("app/mod/pi").exports.Pi}}  
    <app_a-widget-img_stitch-stitch style="position: absolute;width: 450px;height: 138px;z-index:0;left: 0;">
        {"type":2,"height":20,"width":30}
    </app_a-widget-img_stitch-stitch>
    
    <div style="position: absolute;width: 200px;height: 90px;left: 10px;top: 42px;">
        {{for i, v of it.award}}
        {{let prop = Pi.sample[v[0]]}}   
        {{let url = Pi.pictures[prop.icon]}}
        <div style="position: relative;width: 84px;height: 84px;margin-right: 10px;display: inline-block;color: #ffffff;">
            <widget w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{v[0]}})">
                {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":{{v[1]}},"bg":0,"name":"none"} 
            </widget>
        </div>
        {{end}}
    </div>


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
