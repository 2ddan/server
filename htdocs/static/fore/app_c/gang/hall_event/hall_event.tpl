<div maxId="97" style="position:absolute;width:100%;height:100%;top: 44px;"  test="test" w-sid="2">
    <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
        {"bgName":"bg_frame21"} 
    </widget>
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}} 
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Util = _get("app/mod/util").exports.Util}}
    <div w-class="79" w-sid="79">
        <div  scroller="1" w-class="80" w-sid="80">

            {{for i, v of it1.gangData.gang_event_record}}
            {{if i!="erl_type"}}
            <div style="position: relative;line-height:20px;font-size:16px;width:490px;height:100px;box-sizing:border-box;padding:28px;">
                {{let time = Util.arrDate(v.time*1000)}}
                <div w-class="81"  w-sid="81">
                    {{time[1]}}月{{time[2]}}日&nbsp;{{time[3]}}:{{if (time[4]+"").length == 1}}0{{time[4]}}{{else}}{{time[4]}}{{end}}
                </div>
                <div style="position:relative;top:-2px;overflow:hidden;padding-left: 160px;line-height: 20px;color:#b27d5c;text-align: left;font-size:15px;">{{v.text}}</div>

                <widget w-class="63" w-tag="app_a-widget-line-line" w-sid="63">
                    {"line":"line_1"} 
                </widget>
            </div>            
            {{end}}
            {{end}}
        </div>
    </div>
</div>