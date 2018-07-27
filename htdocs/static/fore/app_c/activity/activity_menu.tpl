<div style="position:absolute;top:80px;left:0px;bottom:62px;width:540px;left:50%;margin-left:-270px; z-index:2;">
    {{let player = _get("app/mod/db").exports.data.player}} 
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let checkTips = true }}
    <div w-class="tab_bg" style="z-index:4;"></div>
    <div style="position:absolute;width:540px;height:80px;top:-6px;z-index:4;">
        <div data-desc="活动滚动box" style="position:absolute;z-index:3;width:440px;top:4px;height:80px;overflow:hidden;left:50px;">
            <div style="position:absolute;top:0px;width:100%;height:124%;overflow-y:hidden;overflow-x:auto;white-space:nowrap;z-index:3;top:-2px" scroller="1">
                {{let activity = _get("cfg/c/activity_normal").exports.activity}}
                {{let activity_wanfa = _get("cfg/c/activity_special").exports.activity_wanfa}}
    
                {{for k, v of it1.todayActivity}}
                {{if v.id != 105}}
                {{let _type = ((v.id > 100 && v.id <= 111)?activity_wanfa[v.id].type:activity[v.id].type)}}
                {{let tip_path = "activities." + v.id}}
                {{if checkTips && player.level >=  v.level_limit }}
                <div style="width:70px;height:70px;position:relative;display:inline-block;margin: 0 8.5px;" on-tap="gotoActivity({{v.id}})">
                    <app-widget-btn-menu style="position:absolute;">
                        {"guide":{{v.img}},"icon":{{v.img}},"text":{{it1.getActivityName(v.id)}},"width":78,"height":78,"bottom":0,"fontSize":20,"tip_keys":[{{tip_path}}],"textCfg":{{it1.act_id == v.id?"selectAct":"iconCircle"}},"bg":3,"imgWidth":85,"top":4,"select":{{it1.act_id == v.id ? 1 : 0}}}
                    </app-widget-btn-menu>
                </div>
                {{end}}
                {{end}}
                {{end}}  
            </div>
        </div>
    </div>
    
    <div style="top:90px;width:540px;bottom:0;position: absolute;z-index:3;">
        <widget w-tag={{it1.act_path}}></widget>
    </div>
</div>
