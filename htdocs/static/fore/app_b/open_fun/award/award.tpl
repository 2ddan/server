
<div maxId="64" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    <div style="position:absolute;width:450px;height:332px;left:50%;margin-left:-225px;top:283px;">
        <widget w-class="3" w-tag="app_a-widget-bg_frame-bg" w-sid="3">
            {"bgName":"bg_frame33"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
            {"icon":"tips_top"} 
        </widget>
        
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">
            {"icon":"tips_bottom"} 
        </widget>
        {{let icon=it1.next_fun.icon}}
        {{let name=it1.fly_fun.name}}
        {{let key=it1.next_fun.key.slice(0,5)}}
        {{if key=="skill"}}
            {{let id=it1.skill[it1.next_fun.key.slice(-1)-1][0]}}
            {{:icon=it1.skill_describe[id]["skill_icon"]}}
            {{:name=it1.skill_describe[id]["skill_name"]}}
            {{let url = it1.Pi.pictures[icon]}}
        {{end}}
        <widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" w-sid="7">
            {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"{{name}}","textCfg":"funName","space":0,"fontSize":22,"top":0,"left":0} 
        </widget>
        <widget w-class="8" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" on-tap="goback">
            {"icon":"close_light"} 
        </widget>
        <widget w-class="33" w-tag="app_a-widget-pic_other-pic_other" w-sid="33">
            {"icon":"pendant"} 
        </widget>

        <div w-class="bg_4">
            <div w-class="bg_5"></div>
            {{if key=="skill"}}
                {{let url = it1.Pi.pictures[icon]}}
                <img src="../images/bg_6.png" w-class="bg_6"/>
                <img src="../images/bg_7.png" w-class="bg_7"/>
                <widget w-tag="app_a-widget-prop-base" style="position:relative;top:48px;margin:0 auto;">
                    {"width":80,"height":80,"prop":0 ,"url":{{url}},"name":" ","count":"none"} 
                </widget>
            {{else}}
                <app-widget-btn-menu style="position: absolute;top: 50px;left: 50%;transform: translateX(-50%);width: 90px;height: 90px;">
                    {"guide":0,"width":75,"height":75,"isGray":0,"icon":{{icon}},"text":" ","space":0,"fontSize":0,"textCfg":"iconCircle"}
                </app-widget-btn-menu>
            {{end}}
        </div>

        <widget w-class="36" w-tag="app_a-widget-pic_text-pic_text" w-sid="36">
            {"width":450,"height":30,"align":"center","marginLeft":3,"text":{{it1.fly_fun.desc}},"textCfg":"activity","space":-4,"fontSize":22,"top":0,"left":0} 
        </widget>

        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame34"} 
            </widget>
            <div style="position:absolute;left:33px;top:-8px;">
                <widget w-tag="app_a-widget-pic_text-pic_text">
                    {"icon":"text_bg","width":30,"height":79,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"top":0,"left":0} 
                </widget>
                <div class="center_h" style="font-size:14px;width:15px;top:39px;transform:translateY(-50%);font-family:mnjsh;color:#72614f">开启奖励</div>
            </div>
            {{let award = it1.fly_fun.award}}
            <div style="position:absolute;width:450px;height:80px;left:0px;top:10px;text-align:center">
                {{for i, n of award}}
                {{if n[1] > 0}}
                {{let p = it1.Pi.sample[n[0]]}}
                {{let icon = p.icon ? p.icon : p.module[p.career_id.indexOf(it1.player.career_id)][0]}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = checkTypeof(p.name,"Array") ? p.name[p.career_id.indexOf(it1.player.career_id)] : p.name}}
                <div style="position:relative;width:60px;height:60px;display:inline-block;color:#ffffff;font-family:mnjsh;margin:0 16px;font-size:14px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p.sid || p.id}})">
                        {"width":60,"height":60,"prop":{{p}} ,"url":{{url}},"count":{{n[1]}},"name":{{name}},"bg":""}
                    </widget>
                    <widget w-tag="app_a-widget-bg_frame-bg" w-sid="3" style="position:absolute;top:57px;left:-10px;width:85px;height:18px">
                        {"bgName":"bg_frame1"} 
                    </widget>
                </div>
                {{end}}
                {{end}}
            </div>
        </div>
        
        {{if it1.funIsFinish(it1.fly_fun.key)}}
        <widget w-class="43 " w-tag="app_a-widget-btn-rect" w-sid="43" on-tap="getAward">
            {"guide":"fun_open_active","class":"hl","fontsize":20,"color":"#fdedd7;","text":"领取开启","width":112,"height":40} 
        </widget>
        {{else}}
        <widget w-class="43 " w-tag="app_a-widget-btn-rect" w-sid="43">
            {"class":"disabled","fontsize":20,"color":"#fdedd7;","text":{{"条件不足"}},"width":112,"height":40} 
        </widget>
        {{end}}
    </div>
</div>