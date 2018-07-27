
<div w-class="frame_1">
    <widget w-tag="app_a-widget-bg_frame-bg" w-class="frame_2">
        {"bgName":"bg_frame34"} 
    </widget>
    {{let career_id = it1.player.career_id}}
    {{let prop_id = (it.prop[0][0] == "money" ? 100001 : (it.prop[0][0] == "diamond" ? 100002 : it.prop[0][0]))}}
    {{let prop = it1.Pi.sample[prop_id]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}        
    {{let url = it1.Pi.pictures[icon]}}
    <div style="position:absolute;width:60px;height:80px;color:#fff;left:20px;top:16px">
        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{prop_id}})" style="position:absolute">
            {"width":60,"height":60,"prop":{{prop}} ,"url":{{url}},"count":{{it.prop[0][1]}},"hidden_name":1,"top":22,"right":6} 
        </widget>
        
        <div data-desc="元宝" style="font-size:14px;position: absolute;bottom: 0px;color:{{it.condition>it1.player.diamond ?'#f00' : '#f3d6af'}};width:80px;left:-10px;text-align:center;">
            <app_a-widget-coin-coin>
                {"icon":"diamond","text":[{{it.condition}}],"left":3}
            </app_a-widget-coin-coin>
        </div>
    </div>

    <app_a-widget-text-text style="position:absolute;top:16px;left:93px;">
        {"text":{{prop.name}},"fontSize":20,"textCfg":"iconCircle"}
    </app_a-widget-text-text>

    <div class="shadow" style="position:absolute;width:200px;height:52px;left:93px;top:43px;font-size:16px;color:#f3d6af;font-family:mnjsh;">{{prop.describe}}</div>	



    <div  w-class="frame_4">

        {{if it.type !== 3}}
        <div w-class="frame_5">已购买: <span style="color:rgb(255,255,255);">{{it.get}}/{{it.init_count}}</span></div>
        {{end}}
    
        {{if it.type == 1}}
            <app_a-widget-btn-rect on-tap='getAward({"index":{{it.index}},"act_id":{{it.act_id}} })' style="top:30px;position:absolute;left: -17px;">
                {"text":"购 买","class":"default","fontsize":24,"width":116,"height":45}
            </app_a-widget-btn-rect>

        {{elseif it.type == 2}}
            <app_a-widget-btn-rect on-tap='goto({"index":{{it.index}},"act_id":{{it.act_id}} })' style="top:30px;position:absolute;left: -17px;">
                {"text":"去 充 值","class":"default","fontsize":24,"width":116,"height":45}
            </app_a-widget-btn-rect>
        {{elseif it.type == 3}}
            <app_a-widget-pic_text-pic_text style="top:1px;right:-20px;position: absolute;">
                {"icon":"sell_over","width":120,"height":77,"align":"center","marginLeft":3,"textCfg":""}
            </app_a-widget-pic_text-pic_text>
        {{end}}
    </div>
</div>