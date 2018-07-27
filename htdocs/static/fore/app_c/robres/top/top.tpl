<div>
    <div data-desc="左边介绍"  w-class="7" class="shadow7">
        <app_a-widget-img_stitch-stitch  w-class="12">
            {"type":1,"height":15,"width":15}
        </app_a-widget-img_stitch-stitch>
        <div  w-class="11">
            {{let t = it1.getEndTime()}}
            <div>距离结束:
                <app-widget-cdtime ev-countdownend="closeRobres" style="display:inline-block;vertical-align: middle;color:#12ff00">
                    {"cd_time":{{t[1]}},"now_time":{{t[0]}}}
                </app-widget-cdtime>
            </div>
            <div>个人水晶:{{it1.info.own_total_forage}}</div>
            <div>抢夺水晶:{{it1.info.achieve_record && it1.info.achieve_record["plunder"] || 0}}</div>
        </div>
    </div>
    
    <div data-desc="menu" w-class="9" >
        {{for i,v in it1.menu}}
        <div style="position: relative;display: inline-block;width: 80px;height: 80px;">
            <app-widget-btn-menu on-tap="{{v[2]}}">
                {"icon":{{v[1]}},"text":{{v[0]}},"width":80,"height":80,"bottom":0,"fontSize":20,"bg":4,"space":-4,"top":-2}
            </app-widget-btn-menu>
            {{if v[3]}}
            <app-widget-tip-tip style="right:3px;top:5px;">
                {"tip_keys":[{{v[3]}}]}
            </app-widget-tip-tip>
            {{end}}
        </div>
        {{end}}
    </div>
</div>