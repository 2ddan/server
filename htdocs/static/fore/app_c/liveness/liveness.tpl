
{{let arr = it1.mySort()}}
<div style="width:540px;position:absolute;max-height:720px;left:0px;top:-10px;bottom:0;overflow:hidden;z-index:2;">
    <div class="line_6" style="position: absolute; top: 0px; z-index: 4;left: -4px;width: 545px;"></div>			
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:645px;top:15px;left:25px">
        {"bgName":"bg_frame21"} 
    </widget>
    <div data-desc="活跃度宝箱" style="position:absolute;top:13px;left:50px;height:195px;width:82%;text-align:center">        
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:494px;height:181px;top:15px;left:-28px">
            {"bgName":"bg_frame40"} 
        </widget>
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:345px;height:39px;top:30px;left:-10px">
            {"bgName":"bg_frame42"} 
        </widget>
        <div style="position:absolute;width:345px;text-align:left;height:39px;top:30px;left:-10px;font-family: mnjsh;font-size:25px;line-height:39px;color:#f4833f">我的活跃
            <app_a-widget-text-text style="position:absolute;top:3px;left: 110px;line-height: 25px;height: 25px">
                {"text":"{{it1.liveness_value}}","textCfg":"powerNum","fontSize":35}
            </app_a-widget-text-text>
        </div>
        {{let progress = (it1.liveness_value/it1.liveness_condition.max) * 100}}

        <widget w-tag="app_a-widget-bar-bar2" style="position:relative;top: 140px;left: 10px;height:14px;width:405px;">                
            {"progress":{{progress}},"split":{{it1.liveness_condition.progress}}}
        </widget>
        <div style="position:relative;width:410px;height:182px">
            {{for i, v of it1.liveness_condition.limit}}
            <div style="z-index:1;width:70px;height:70px;font-size:12px;position:absolute;left:{{it1.liveness_condition.progress[i]-6+'%'}};bottom:50px;">
                {{let get = it1.liveness_value >= v?1:0}}
                {{let open = (get && it1.value_award[i] )?1:0}}
                {{let opend = it1.value_award[i]}}          
                {{let state = open ? 0 : (get ? 1 : 2)}}
                {{let type = (i <=1 ? 2 : (i <= 3 ? 3 : 1))}}
                <div style="width:60px;height:70px" on-tap='openBox({{i}})'>
                    {{if state == 1 }}
                    <app_a-widget-box-box style="position:absolute;z-index:5;left:10px">
                        {"type":{{type}},"width":60,"height":60,"state":"open","bglight":1}
                    </app_a-widget-box-box>
                    {{elseif opend==1}}
                    <app_a-widget-box-box style="position:absolute;z-index:5;left:10px">
                        {"type":{{type}},"width":60,"height":60,"state":"opened","bglight":0}
                    </app_a-widget-box-box>
                    {{else}}
                    <app_a-widget-box-box style="position:absolute;z-index:5;left:10px">
                        {"type":{{type}},"width":60,"height":60}
                    </app_a-widget-box-box>
                    {{end}}
                </div>

                <div style="position:absolute;bottom:-35px;font-size:17px;text-align:center;width:100%;color:#d5d5d5">{{v}}</div>
            </div>
            {{end}}
        </div>     
    </div>

    <div data-desc="列表" scroller="1" style="position:relative;top:210px;box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:448px;">
        {{for i,v of arr}}
        {{let task = v.task}}
        {{if !task.fun_key || it1.fun_id >= it1.function_open[task.fun_key].id}}
        <div style="width:100%;position:relative;display:flex;align-items:center;height:112px;margin:10px 0 0 -10px;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="width:447px;height:112px;left:57px">
                {"bgName":"bg_frame19"}
            </widget>
            <app_a-widget-text-text style="position:absolute;top:16px;left:155px;">
                {"text":{{task.desc}},"fontSize":23,"textCfg":"livenessList" }
            </app_a-widget-text-text>
        
            <div data-desc="奖励" style="position: absolute;top:18px;left:65px;height: 76px;width: 260px;overflow: hidden">
                {{for m, n in task.award}}
                
                {{if n[1]}}
                {{let id  = ( n[0]=="money"?100001:n[0]=="diamond"?100002:n[0])}}
                    {{let prop = it1.Pi.sample[id]}}                    
                    {{let url = it1.Pi.pictures[prop.icon]}}
                    <div style="position:relative;width:85px;height:85px;display:inline-block;margin-left:3px;" on-tap='showPropInfo("{{id}}")'>
                        <app_a-widget-prop-base style="width:85px;height:85px;">
                            {"prop":{{prop}},"url":{{url}} ,"hidden_name":1,"count":"none"}
                        </app_a-widget-prop-base>
                        <div style="position:absolute;width:50px;text-align:right;bottom:10px;right:10px;font-size:16px;color:#ebc79a;z-index:3">x{{n[1]}}</div>
                    </div>
                {{end}}
                {{end}}	
                <div style="position:relative;width:130px;height:30px;display:inline-block;margin-left:-5px;top:-10px;color:#fff">
                    <app_a-widget-pic_text-pic_text>
                        {"icon":"name_bg_2","text":"活跃度","width":120,"height":30,"textCfg":"menu_main","fontSize":18,"left":-35,"top":4,"space":-4}
                    </app_a-widget-pic_text-pic_text>
                    <app_a-widget-text-text style="position:absolute;top:5px;left:75px;width:70px">
                        {"text":"+{{task.liveness}}","fontSize":20,"textCfg":"powerNum","width":70}
                    </app_a-widget-text-text>

                </div>						
            </div>
            {{if v.flag != 3}}
            <div class="shadow" style="position:absolute;top:15px;right:60px;font-size:16px;width:140px;text-align:center;color:#e2cdb3;">
                进度:&nbsp;&nbsp;<span style="color:rgb(255,255,255);">{{v.value[1]+"/"+task.condition_value}}</span>
            </div>
            {{end}}
            {{if v.flag == 1}}
                <app_a-widget-btn-rect on-tap ='openTask({{JSON.stringify(v)}})' style="position:absolute;right:75px;top: 40px;">
                    {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
                </app_a-widget-btn-rect>
            {{elseif v.flag == 2}}
                <app_a-widget-btn-rect on-tap ='openTask({{JSON.stringify(v)}})' style="position:absolute;right:75px;top: 40px;">
                    {"text":"前 往","class":"default","fontsize":24,"width":116,"height":45}
                </app_a-widget-btn-rect>
            {{else}}
        
                <app_a-widget-pic_text-pic_text style="position:absolute;right:75px;top: 20px">
                    {"icon":"text_get_1","width":115,"height":76,"text":""}
                </app_a-widget-pic_text-pic_text>
            {{end}}
        </div>
        {{end}}
        {{end}}
    </div>
</div>
