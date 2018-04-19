<div maxId="97" style="position:absolute;width:100%;height:100%;top: 44px;"  test="test" w-sid="2">
    <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
        {"bgName":"bg_frame21"} 
    </widget>
    <div w-class="79" w-sid="79">
        <div  scroller="1" w-class="80" w-sid="80">


            {{let Common = _get("app/mod/common").exports.Common}}
            {{let Pi = _get("app/mod/pi").exports.Pi}}
            {{for i, v of it1.apply_list}}
            {{if v}}


            {{let img = ''}}
            {{if v.head && v.head.indexOf("undefined") < 0}}
            {{: img = v.head}}
            {{else}}
            {{: img = (Pi.pictures['playerhead'+v.career_id])}}
            {{end}}
            <div w-class="81" w-sid="81">
                <widget w-class="82" w-tag="app_a-widget-bg_frame-bg" w-sid="82">
                    {"bgName":"bg_frame19"} 
                </widget>

                <widget w-class="84" w-tag="app_a-widget-head-friend" w-sid="84">
                    {"url":{{img}},"quality":{{v.role_quality}},"type":"player","prop":{{v?v:0}},"level":{{v.level}},"color":" #b5e8ff"}
                </widget>
                
                <div w-class="86" w-sid="86">
                    <span w-class="87" w-sid="87">{{Common.fromCharCode(v.name)|| v.role_id}}</span>
                    <widget w-class="88" w-tag="app_a-widget-text-text" w-sid="88">{"text":{{"VIP"+v.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
                    </widget>

                    <widget w-class="91" w-tag="app_a-widget-power-power" w-sid="91">
                        {"type":2,"top":16,"left":52,"power":{{v.fight_power}},"fontSize":22,"textCfg":"powerNum","left":54} 
                    </widget>
                </div>


                <div w-class="93" w-sid="93">
                    <widget {{if it1.gangData.post < 3}} on-tap='disposeApplyClick("{{1+","+v.role_id+","+i}}")' {{end}} w-class="94" w-tag="app_a-widget-btn-rect" w-sid="94">
                        {"class":"hl","fontsize":18,"color":"#fdedd7;","text":"同 意","width":84,"height":32} 
                    </widget>

                    <widget {{if it1.gangData.post < 3}} on-tap='disposeApplyClick("{{2+","+v.role_id+","+i}}")' {{end}} w-class="95" w-tag="app_a-widget-btn-rect" w-sid="95">
                        {"class":"default","fontsize":18,"color":"#fdedd7;","text":"忽 略","width":84,"height":32} 
                    </widget>
                </div>
            </div>
        

            {{end}}
            {{end}}
        </div>
    </div>
</div>    