<div style="position:absolute;width:100%;bottom:15px;top:0px;z-index:2;">
    <app_b-widget-title-title>
        {"text":"日常活动","coin":["money","diamond"],"top":13,"left":20}
    </app_b-widget-title-title>

    <div style="position:absolute;top:80px;left:0px;bottom:62px;width:540px;left:50%;margin-left:-270px; z-index:2;">
        <div w-class="tab_bg" style="z-index:4;"></div>
        <div style="position:absolute;width:540px;height:80px;top:-6px;z-index:4;">
            <app_a-widget-bg_frame-bg style="position: absolute;left: 2px;top: 0px;width: 535px;height: 65px;">
                {"bgName":"bg_frame30"} 
            </app_a-widget-bg_frame-bg>

            <div data-desc="活动滚动box" style="position:absolute;z-index:3;width:440px;top:-2px;height:80px;overflow:hidden;left:50px;">
                <div style="position:absolute;top:0px;width:100%;height:124%;overflow-y:hidden;overflow-x:auto;white-space:nowrap;z-index:3;top:-2px" scroller="1">
        
                    {{for k, v in it1.menu}}
                    {{if v.type == "week_act"}}
                        {{if it1.week_act_type && it1.level >= v.level_limit}}
                        <div style="width:70px;height:70px;position:relative;display:inline-block;margin: 0 8.5px;" on-tap="tabChange({{v.index}})">
                            <app-widget-btn-menu style="position:absolute;">
                                {"icon":{{v.icon}},"text":{{v.name}},"width":78,"height":78,"bottom":0,"fontSize":20,"tip_keys":{{v.tips}},"textCfg":{{it1.index == v.index?"selectAct":"iconCircle"}},"bg":3,"imgWidth":85,"top":4,"select":{{it1.index == v.index ? 1 : 0}}}
                            </app-widget-btn-menu>
                        </div>
                        {{end}}
                    {{elseif v.type == "undefined" || it1.fun_id >= it1.function_open[v.type].id}}
                    <div style="width:70px;height:70px;position:relative;display:inline-block;margin: 0 8.5px;" on-tap="tabChange({{v.index}})">
                        <app-widget-btn-menu style="position:absolute;">
                            {"icon":{{v.icon}},"text":{{v.name}},"width":78,"height":78,"bottom":0,"fontSize":20,"tip_keys":{{v.tips}},"textCfg":{{it1.index == v.index?"selectAct":"iconCircle"}},"bg":3,"imgWidth":85,"top":4,"select":{{it1.index == v.index ? 1 : 0}}}
                        </app-widget-btn-menu>
                    </div>
                    {{end}}
                    {{end}}
                </div>
            </div>
        </div>
        
        <div style="top:80px;width:540px;bottom:0;position: absolute;z-index:3;">
            <widget w-tag={{it1.menu[it1.index].path}}></widget>
        </div>
    </div>
   
</div>