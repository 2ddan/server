<div w-class="7" w-sid="7">
    {{let Pi = it1.Pi}}
    {{let career_id =it1.career_id}}
    {{let piSample = _get("app/mod/sample").exports.decode}}
    <img w-class="8" w-sid="8" src="./images/bg_top.png"/>
    <div w-class="12" w-sid="12">
        {{let time = it1.Util.getIntervalDate(it.time/1000 + 3600*24*(!it.receive ? 7 : 3) - it1.Util.serverTime(true))}}
        {{let txt = time[0] ? time[0]+"天"  : time[1] ? time[1]+"时" :  time[2] ?time[2]+"分" : '' }}
        <div style="width: 24px;height: 76px;text-align: center; position: absolute;top: 28px;left: 2px;"> {{"剩余" + txt}}</div>
    </div>
    <div w-class="9" w-sid="9">
        <widget w-class="11" w-tag="app_a-widget-title-single" w-sid="11">
            {"padding":8,"type":9,"width":124,"text":{{it.title}},"textCfg":"","fontSize":18,"space":-2,"color":"#523017","wear":1,"class":1} 
        </widget>
        {{if !it.receive}}
        <img w-class="6" w-sid="6" src="app/widget/tip/images/new.png" />
        {{end}}
        <pi-ui-html w-class="13" w-sid="13">{{it.detail}}</pi-ui-html>
        {{if it.prop}}
        <div w-class="15" w-sid="15">
            <div style="overflow:hidden;position: absolute;width: 277px;white-space: nowrap;bottom: 90px;left: 32px;top: 9px; height: 70px;">
                <div style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 88px;">
                    {{for k ,v of it.prop}}
                        {{if v[0] != "exp" && v[0] != "rmb"}}
                            {{let id = ( v[0] == "money" ? 100001 : v[0] == "diamond" ? 100002 : v[0] )}}
                            {{let prop = Pi.sample[id]}}
                            {{if prop.type == "equip"}}
                                {{: prop = piSample(v,Pi.sample)}}
                            {{end}}
                            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                            {{let url = Pi.pictures[icon]}}
                                <app_a-widget-prop-base on-tap='showPropInfo("{{id}}")' style="position:relative;margin:0 5px;display:inline-block;color:#fff">
                                    {"prop":{{prop}},"url":{{url}},"width":60,"height":60,"count":{{prop.type =="equip" ? "Lv"+prop.level :v[1]}},"name":"none","bg":0}
                                </app_a-widget-prop-base>
                            {{elseif v[0] == "exp"}}
                            {{: url = "app/scene_res/res/Item/res_100003.png"}}
                                <app_a-widget-prop-base style="position:relative;margin:0 5px;display:inline-block;color:#fff">
                                    {"prop":"","url":{{url}},"quality":5,"width":60,"height":60,"count":{{v[1]}},"name":"none","bg":0}
                                </app_a-widget-prop-base>
                            {{elseif v[0] == "rmb"}}
                            {{: url = "app/scene_res/res/Item/res_100002.png"}}
                                <app_a-widget-prop-base style="position:relative;margin:0 5px;display:inline-block;color:#fff">
                                    {"prop":"","url":{{url}},"quality":5,"width":60,"height":60,"count":{{v[1]}},"name":"none","bg":0}
                                </app_a-widget-prop-base>
                        {{end}}
                    {{end}}

                </div>
            </div>
           
            {{if  it.receive == 2}}
            <app_a-widget-pic_text-pic_text style="left: 345px;top: -1px;position: absolute;">
                {"icon":"text_get","width":94,"height":77,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"top":0,"left":0}
            </app_a-widget-pic_text-pic_text>
            {{else}}
            <widget w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17" on-tap="receiveAward({{it.index}})">
                {"class":"hl","fontsize":18,"color":"#fdedd7;","text":"领 取","width":90,"height":36} 
            </widget>
            {{end}}                            
           
        </div>
        {{end}} 
        
    </div>
    {{let list = it1.Util.arrDate(it.time) }}
    <div w-class="16" w-sid="16">{{list[1]}} 月 {{list[2]}} 日</div>
    <img w-class="10" w-sid="10" src="./images/bg_bottom.png"/>
</div>