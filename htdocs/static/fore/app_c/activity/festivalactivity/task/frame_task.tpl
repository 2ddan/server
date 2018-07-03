
<div w-class="frame_1">
    <widget w-tag="app_a-widget-bg_frame-bg" w-class="frame_2">
        {"bgName":"bg_frame34"} 
    </widget>
    <div class="shadow7" w-class="frame_3">
        {{let arr = it.desc.split("#")}}
        {{arr[0]}} <span style="color:#35e04d;padding:0 5px;">{{it.condition}}</span>{{arr[1]}}
    </div>
    {{let career_id = it1.player.career_id}}
    <div data-desc="奖励" style="position: absolute;top:40px;left:16px;height:60px;width:260px;">
        {{for i, n of it.prop}} 
        {{let prop_id = (n[0] == "money" ? 100001 : (n[0] == "diamond" ? 100002 : n[0]))}}
        {{let prop = it1.Pi.sample[prop_id]}}
        {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}        
        {{let url = it1.Pi.pictures[icon]}}
        {{let rate = !it1.getCard ? 0 : it1.fa_base.propList.join(",").indexOf(prop_id+"") !== -1 ? it1.getCard : 0}}
        <div style="position:relative;width:60px;height:60px;margin:0px 5px;display:inline-block;color:#ffffff;">
            {{if rate}}
            <div style="position: absolute;right: 20px;top: 1px;z-index: 3;">
                <app_a-widget-pic_text-pic_text style="transform: scale(-1,1);">
                    {"icon":"shop_vip_discount","width":39,"height":46,"align":"center","text":" "} 
                </app_a-widget-pic_text-pic_text>
                <div class="shadow7" style="color:#fff;font-size:14px;font-family:mnjsh;transform:rotate(-45deg);position: absolute;top:10px;right: 14px;">{{it1.fa_base.rate[rate-1]}}倍</div>
            </div>
                
            {{end}}
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{prop_id}})">
                {"width":60,"height":60,"prop":{{prop}} ,"url":{{url}},"count":{{n[1]}},"hidden_name":1,"top":22,"right":6} 
            </widget>
        </div>
        {{end}}							
    </div>
    <div  w-class="frame_4">

        {{if it.type !== 3}}
        <div  w-class="frame_5">进度: <span style="color:rgb(255,255,255);">{{it.progress[1]}}/{{it.condition}}</span></div>
        {{end}}
    
        {{if it.type == 1}}
            <app_a-widget-btn-rect on-tap='getAward({"index":{{it.index}},"act_id":{{it.act_id}} })' style="top:30px;position:absolute;left: -17px;">
                {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
            </app_a-widget-btn-rect>

        {{elseif it.type == 2}}
            <app_a-widget-btn-rect on-tap='goto({"index":{{it.index}},"act_id":{{it.act_id}} })' style="top:30px;position:absolute;left: -17px;">
                {"text":"前 往","class":"default","fontsize":24,"width":116,"height":45}
            </app_a-widget-btn-rect>
        {{elseif it.type == 3}}
            <app_a-widget-pic_text-pic_text style="top:1px;right:-20px;position: absolute;">
                {"icon":"text_get_1","width":120,"height":77,"align":"center","marginLeft":3,"textCfg":""}
            </app_a-widget-pic_text-pic_text>
        {{end}}
    </div>
</div>