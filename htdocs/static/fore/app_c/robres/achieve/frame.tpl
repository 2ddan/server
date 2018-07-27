{{let Pi = _get("app/mod/pi").exports.Pi}}
<div style="width:450px;height:148px;position:relative;margin-bottom: 27px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:100%;height:100%;opacity:0.95">
        {"bgName":"bg_frame23"} 
    </widget>
    <app_a-widget-pic_other-pic_other style="position:absolute;bottom: 0px;left:0px;right:0px;margin:0 auto;">
        {"icon":"light_bottom"}
    </app_a-widget-pic_other-pic_other>
    {{let text = "总水晶达到"+it.condition}}
    {{if it.type == "grab_time"}}
    {{:text = "掠夺水晶"+it.condition+"次"}}
    {{end}}
    
    <app_a-widget-text-text style="position:absolute;top:10px;left:18px;">
        {"text":{{text}},"fontSize":26,"textCfg":"heroEquip" }
    </app_a-widget-text-text>

    <div data-desc="奖励" style="position: absolute;top:55px;left:11px;height:60px;width:295px;">
        {{for i, n of it.award}}
        {{if n[1]}}
        {{let prop = Pi.sample[n[0]]}}
        {{let url = Pi.pictures[prop.icon]}}
        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;">
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{n[0]}})">
                {"width":60,"height":60,"prop":{{prop}} ,"url":{{url}},"count":{{n[1]}},"name":{{prop.name}},"top":22,"right":6,"bg":1,"effect":{{prop.effect}}} 
            </widget>
        </div>
        {{end}}
        {{end}}							
    </div>
    {{if !it.get}}
    <app_a-widget-pic_text-pic_text style="top:55px;right:23px;position: absolute;">
        {"icon":"text_get_1","width":94,"height":60,"marginLeft":3}
    </app_a-widget-pic_text-pic_text>
    {{elseif it.get == 2}}
    <div style="position:absolute;top:55px;right:23px;font-size:16px;height:45px;width:116px;text-align:center;">
        <app_a-widget-btn-rect on-tap='award({{it.id}})' style="position:absolute;">
            {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
        </app_a-widget-btn-rect>
    </div>  
    {{else}}
    <div style="position:absolute;top:55px;right:23px;font-size:16px;height:45px;width:116px;text-align:center;">
        <app_a-widget-btn-rect  style="position:absolute;">
            {"text":"未达成","class":"disabled","fontsize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
    </div>  
    {{end}}
</div>