<div style="width:469;height:113px;position:relative;display:flex;align-items:center;height:113px;margin:0 0 0px 10px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:469px;height:113px;">
        {"bgName":"bg_frame34"} 
    </widget>
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    <div class="shadow7" style="position:absolute;width:300px;height:26px;font-size:16px;font-family:mnjsh;color:#f3d6af;line-height:26px;top:12px;left:26px;">{{it.desc}}<span style="color:{{it.progress[1] - it.condition >= 0 ? '#68f428' : '#f3d6af'}}">({{it.progress[1] - it.condition >= 0 ? it.condition + "/" + it.condition : it.progress[1] + "/" + it.condition}})</span></div>

    <div data-desc="奖励" style="position: absolute;top:40px;left:16px;height:60px;width:260px;">
        {{for i, n of it.prop}}
        {{let prop_id = n[0]}}
        {{let p = Pi.sample[prop_id]}}
        {{let url = Pi.pictures[p.icon]}}
        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;">
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{prop_id}})">
                {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1,"top":22,"right":6} 
            </widget>
        </div>
        {{end}}							
    </div>
    
    {{if it.type == 1}}
    <app_a-widget-btn-rect on-tap ='getAward({"act_id":{{it.id}}})' style="top:30px;position:absolute;right: 83px;">
        {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45}
    </app_a-widget-btn-rect>

    {{elseif it.type == 2}}
    <app_a-widget-btn-rect on-tap ="goto({{it.id}})" style="top:30px;position:absolute;right: 83px;">
        {"text":"前 往","class":"default","fontsize":24,"width":116,"height":45}
    </app_a-widget-btn-rect>
    {{elseif it.type == 3}}
    <app_a-widget-pic_text-pic_text style="top:30px;right:92px;position: absolute;">
        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
    </app_a-widget-pic_text-pic_text>
    {{end}}
</div>