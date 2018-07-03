{{let Common = _get("app/mod/common").exports.Common }}
{{let arr = it1.task()}}
<div style="width:540px;position:absolute;max-height:720px;left:0px;top:-10px;bottom:0;overflow:hidden;z-index:2;">
    <div class="line_6" style="position: absolute; top: 0px; z-index: 4;left: -4px;width: 545px;"></div>			
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:645px;top:15px;left:25px">
        {"bgName":"bg_frame21"} 
    </widget>

    <div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:642px;position:relative;top:15px;">
        {{for i,v of arr}}
        {{let task = v.task}}
        {{if !task.fun_key || it1.fun_id >= it1.function_open[task.fun_key].id}}
        <div style="width:453px;height:107px;position:relative;display:flex;align-items:center;margin:8px 0 0 45px;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:453px;height:107px;top:0px;">
                {"bgName":"bg_frame29"} 
            </widget>
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:92px;height:92px;top:8px;left:10px">
                {"bgName":"bg_frame41"} 
            </widget>
            <app-widget-btn-menu style="position:absolute;display:inline-block;width:80px;height:80px;left:15.5px;top:-2px">
                {"icon":{{task.icon}},"bottom":-5,"fontSize":20,"width":80,"height":80,"space":-6,"text":" "}
            </app-widget-btn-menu>
            <div style="position:absolute;display:inline-block;width:80px;height:80px;left:15.5px;top:12px"></div>
            {{let length=task.descript.length}}
            {{if length<=10}}
                <app_a-widget-text-text style="position:absolute;top:15px;left:110px;">
                    {"text":{{task.descript}},"fontSize":20,"textCfg":"livenessList","space":-2}
                </app_a-widget-text-text>
            {{else}}
                <app_a-widget-text-text style="position:absolute;top:15px;left:110px;">
                    {"text":{{task.descript.slice(0,10)}},"fontSize":20,"textCfg":"livenessList","space":-2 }
                </app_a-widget-text-text>
                <app_a-widget-text-text style="position:absolute;top:38px;left:110px;">
                    {"text":{{task.descript.slice(10)}},"fontSize":20,"textCfg":"livenessList","space":-2 }
                </app_a-widget-text-text>
            {{end}}
            <div data-desc="奖励" style="position: absolute;top:65px;left:110px;height: 35px;width: 260px;overflow: hidden">
                <app_a-widget-text-text style="position:relative;top:-16px;left:-2px">
                    {"text":"奖励","fontSize":20,"textCfg":"iconCircle"}
                </app_a-widget-text-text>
                {{for m, n in task.award}} 
                {{if n[1]}}
                {{let id  = ( n[0]=="money"?100001:n[0]=="diamond"?100002:n[0])}}
                {{let prop = it1.Pi.sample[id]}}
                {{let url = it1.Pi.pictures[prop.icon]}}               
                <div style="position:relative;width:50px;height:47px;display:inline-block;margin-right:32px" on-tap='showPropInfo("{{id}}")'>
                    <img src={{url}} style="position: absolute;z-index: 2;top:4px;width: 30px;left: 0;right: 0"/>
                    <div style="position:absolute;width:50px;text-align:left;bottom:17px;right:-30px;font-size:18px;color:#efcb9d;z-index:3">{{Common.numberCarry(parseInt(n[1]),10000)}}</div>
                </div>
                {{end}}
                {{end}}							
            </div>
            <div class="shadow" style="position:absolute;top:15px;right:0px;font-size:16px;width:140px;text-align:center;color:#e2cdb3;white-space: nowrap;">
                进度:&nbsp;&nbsp;<span style="color:rgb(255,255,255);">{{Common.numberCarry(parseInt(v.value[1]),10000)+"/"+Common.numberCarry(parseInt(task.params),10000)}}</span>
            </div>
            {{if v.value[0]}}
            <div on-tap ='openTask({{JSON.stringify(v)}})' style="position:absolute;right:15px;top: 40px;width:116px;height:45px;">
                <app_a-widget-btn-rect style="position:absolute;">
                    {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
                </app_a-widget-btn-rect>
            </div>

            {{else}}
            <app_a-widget-btn-rect on-tap ='openTask({{JSON.stringify(v)}})' style="position:absolute;right:15px;top: 40px;">
                {"text":{{task.goto != "undefined"?"前 往":"未达成"}},"class":"default","fontsize":24,"width":116,"height":45}
            </app_a-widget-btn-rect>
            {{end}}
        </div>
        {{end}}
        {{end}}
    </div>
</div>
