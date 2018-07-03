<div maxId="97" style="position:absolute;width:100%;height:100%;background-image:url(./images/bg_2.png);background-position:center 108px;z-index:2"  test="test" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    {{let Util = _get("app/mod/util").exports.Util}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let career_id = player.career_id}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}

    <widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
        {"text":"试炼副本","coin":["money","diamond"],"left":15,"top":22,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
    </widget>
    <img style="position:absolute;top:0;left:0;width:100%" src="./images/bg_1.png"/>
    <div  w-class="3">
        <app_a-widget-text-text style="position:absolute;top:0;left:50%;transform:translateX(-50%)">
            {"text":{{it1.exp_fb_mission.instance_name}},"fontSize":26,"textCfg":"gangCoverTitle","space":-2 }
        </app_a-widget-text-text>
        <div w-class="4">
            <widget style="top:0;left:0;width:100%;height:110px" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame44"} 
            </widget>
            {{for i,v of it1.exp_fb_mission.show_award}}
            {{let prop = Pi.sample[v]}}
            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
            {{let url = Pi.pictures[icon]}}
            {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
            <div data-desc="物品" on-tap='propInfoShow("{{v}}")' style="position:relative;display:inline-block;margin:11px 10px 0;height:76px;width:76px;">
                <app_a-widget-prop-base >
                    {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count": "none","name":{{name}},"bg":1}
                </app_a-widget-prop-base>

                {{if prop.type == "equip"}}
                <div data-desc="装备等级"  style="bottom:7px;color:#fff; position: absolute;right: 10px;z-index: 2;" >{{"Lv"+prop.level[1] || 20}}</div>
                {{end}}
            </div>
            {{end}}
        </div>
       
        <div w-class="8">
            <widget w-class="9" w-tag="app_a-widget-title-single" >
                {"padding":30,"type":9,"text":"闯 关","textCfg":"singleTitle","fontSize":27.45,"space":-2,"color":"#b27d5c","wear":0} 
            </widget>
            <div w-class="10">
                {{let month_card = player.month_card_due_time}}
                <div style="font-size:22px;" class="shadow7">
                    <span style="font-family:mnjsh;">每{{(it1.exp_fb_base[month_card ? "card_cd" : "normal_cd"]/3600)}}小时可增加1次闯关次数</span>  
                    {{if it1.end_time}}
                    <app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block;color:#51e650">
                        { "cd_time":{{it1.end_time}},"now_time":{{Util.serverTime()}} }
                    </app-widget-cdtime>
                    {{end}}
                </div>
                {{if !month_card}}
                <div style="color:#ffd8a6;position:relative;margin-top: 10px;" class="shadow6">
                    铂金卡玩家每{{(it1.exp_fb_base["card_cd"]/3600)}}小时增加1次闯关次数   
                    <widget w-class="11" w-tag="app_a-widget-btn-rect" on-tap="buyCard">
                        {"class":"default","fontsize":15,"color":"#fdedd7;","text":"前 往","width":54,"height":20} 
                    </widget>
                </div>
                {{end}}
            </div>
            {{let btn_guide = it1.count>0 ? "1" : it1.prop_count>0 ? 2 : 0}}
            <div style="position:absolute;top:168px;left:0;width:100%;height:45px">
                <div  w-class="1">
                    <widget on-tap='challenge(0,{{it1.count > 0}})' style="position:absolute;top:0;left:0;" w-tag="app_a-widget-btn-rect" >
                        {"guide":{{btn_guide == 1 ? "exp_fb_open" : ""}},"class":{{it1.count > 0 ? "default" : "disabled"}},"fontsize":24,"color":"#fdedd7;","text":"次数闯关","width":116,"height":45,"tip_keys":["explore.exp_fb.count"]} 
                    </widget>
                    {{let init_count = it1.exp_fb_base.init_count}}
                    <div class="resource_bar" w-class="12 14" w-sid="14"  style="transform: translateX(-50%);left:50%">
                        <span >挑战次数:</span> <span style="color:{{if !it1.count}}#f00;{{end}}">{{it1.count}}</span>/{{init_count}} 
                        <widget w-class="20" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="20" on-tap="getCount">
                            {"icon":"add_btn"} 
                        </widget>
                        <app-widget-tip-tip style="position: absolute;right: -10px;top: -12px;">
                            {"tip_keys":["explore.exp_fb.task"]}
                        </app-widget-tip-tip>
                    </div>
                   
                </div>
                
                <div w-class="2">
                    <widget on-tap='challenge(1,{{it1.prop_count > 0}})'style="position:absolute;top:0;left:0;" w-tag="app_a-widget-btn-rect" >
                        {"guide":{{btn_guide == 2 ? "exp_fb_open" : ""}},"class":{{it1.prop_count > 0 ? "default" : "disabled"}},"fontsize":24,"color":"#fdedd7;","text":"令牌闯关","width":116,"height":45,"tip_keys":["explore.exp_fb.token"]} 
                    </widget>
                    <div w-class="12" >剩余令牌：<span style="color:{{if !it1.prop_count}}#f00;{{end}}">{{it1.prop_count}}</span> </div>
                </div>

                <div style="position:absolute;top:108px;left:50%;margin-left:-125px;line-height: 23px;font-size:16px;color:#ffd8a6;font-family:mnjsh;" >
                    <widget class="shadow7"  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;left: 0;">
                        {"icon":"little_tips_bg","text":"试炼副本中神兵恢复速度加快","width":250,"height":23,"top":2,"align":"left","marginLeft":18} 
                    </widget>
                    <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                        {"icon":"remind"} 
                    </widget>
                </div>
            </div>
        </div>
    </div>
</div>