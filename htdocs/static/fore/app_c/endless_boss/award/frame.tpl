{{let Pi = it1.Pi}}
<div>
    {{let str = ""}}
    <div  style="position: absolute;width: 414px;height: 382px;left: 18px;top:56px;overflow: hidden;z-index: 2;">
        {{let Pi = it1.Pi}}
        {{let career_id = it1.player.career_id}}    
        <div style="position: relative; width: 110%; height: 380px;overflow-x: hidden;overflow-y: auto;">
        {{for k,v of it1.mySort()}}
            <div style="position: relative; width: 414px; height: 124px;margin-bottom:12px;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 124px;z-index:0;left: 0;">
                    {"type":2,"height":20,"width":30}
                </app_a-widget-img_stitch-stitch>
                {{let text = "积分达到"+v.condition}}
                {{if v.type == "kill_num"}}
                {{:text = "全服击杀BOSS"+v.condition+"次"}}
                {{end}}
                <app_a-widget-text-text style="position:absolute;top:15px;left:15px;">
                    {"text":{{text}},"fontSize":24,"textCfg":"heroEquip" }
                </app_a-widget-text-text>

                <div data-desc="奖励" style="position: absolute;top:53px;left:11px;height:60px;width:260px;">
                    {{for i, n of v.award}}
                    {{if n[1]}}
                    {{let prop = Pi.sample[n[0]]}}
                    {{let url = Pi.pictures[prop.icon]}}
                    <div style="position:relative;width:62px;height:62px;display:inline-block;color:#ffffff;">
                        <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{n[0]}})">
                            {"width":62,"height":62,"prop":{{prop}} ,"url":{{url}},"count":{{n[1]}},"name":"none","effect":{{prop.effect}}} 
                        </widget>
                    </div>
                    {{end}}
                    {{end}}							
                </div>   

                <div style="position:absolute;top:20px;right:26px;font-size:16px;height:61px;width:83px;text-align:center;">
                {{if v.get == 1}}
                    {{: str = str ? str + "," + v.id : v.id}}
                    <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;color:#f2e6bb;font-family:mnjsh;">进度: <span >{{v.condition}}/{{v.condition}}</span></div>
                    <app_a-widget-btn-rect on-tap='award({{v.id}})' style="top:30px;position:absolute;left: -17px;">
                        {"text":"领 取","class":"hl","fontsize":24,"width":116,"height":45,"show_anim":1}
                    </app_a-widget-btn-rect>

                {{elseif v.get == 2}}
                    <div style="width:140px;text-align:center;height:30px;line-height:30px;position:absolute;left:50%;margin-left:-70px;color:#f2e6bb;font-family:mnjsh;">进度: <span >{{v.progress}}/{{v.condition}}</span></div>
                    <app_a-widget-btn-rect style="top:30px;position:absolute;left: -17px;">
                        {"text":"未达成","class":"default","fontsize":24,"width":116,"height":45}
                    </app_a-widget-btn-rect>
                {{elseif v.get == 3}}
                    <app_a-widget-pic_text-pic_text style="top:30px;right:76px;position: absolute;">
                        {"icon":"text_get_1","width":94,"height":60,"align":"center","marginLeft":3,"textCfg":""}
                    </app_a-widget-pic_text-pic_text>
                {{end}}
                </div>
            </div> 
        {{end}} 
        </div> 
    </div>


    <div style="font-size:22px;font-family: mnjsh;color:#ffba00;position: absolute;top: 462px;width: 100%;text-align: center;">
        <app_a-widget-btn-rect on-tap='award({{str}})' style="position:relative;display: inline-block;">
            {"text":"一键领取","class":{{str ? "hl" : "disabled"}},"fontsize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
    </div>
</div>