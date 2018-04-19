<div maxId="97" style="position:absolute;width:100%;height:100%;background-image:url(./images/bg_2.png);background-position:center 108px;z-index:2"  test="test" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    {{let Util = _get("app/mod/util").exports.Util}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let career_id = player.career_id}}
    
    <widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
        {"text":"试炼副本","coin":["money","diamond"],"left":15,"top":22,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
    </widget>
    <img style="position:absolute;top:0;left:0;width:100%" src="./images/bg_1.png"/>
    {{let arr = it1.task()}} 
    {{if arr.length}}  
    <widget data-desc="获取次数" w-class="13" w-tag="app_a-widget-btn-ling" w-sid="45" on-tap="getCount" >
        {"class":"default","fontsize":20,"color":"#49312E","text":" 获取 次数","width":77,"height":77,"textCfg":"lingBtn","tip_keys":["explore.exp_fb.task"]} 
    </widget>
    {{end}}
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
            <app_a-widget-prop-base on-tap='propInfoShow("{{v}}")' style="position:relative;display:inline-block;margin-top:19px;">
                {"prop":{{prop}},"url":{{url}},"count":"none""width":76,"height":76,"name":"none","bottom":0}
            </app_a-widget-prop-base>
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
                    月卡玩家每{{(it1.exp_fb_base["card_cd"]/3600)}}小时增加1次闯关次数   
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
                    <div w-class="12">次数：<span style="color:{{if !it1.count}}#f00;{{end}}">{{it1.count}}</span>/{{init_count}}</div>
                </div>
                
                <div w-class="2">
                    <widget on-tap='challenge(1,{{it1.prop_count > 0}})'style="position:absolute;top:0;left:0;" w-tag="app_a-widget-btn-rect" >
                        {"guide":{{btn_guide == 2 ? "exp_fb_open" : ""}},"class":{{it1.prop_count > 0 ? "default" : "disabled"}},"fontsize":24,"color":"#fdedd7;","text":"令牌闯关","width":116,"height":45,"tip_keys":["explore.exp_fb.token"]} 
                    </widget>
                    <div w-class="12" >剩余令牌：<span style="color:{{if !it1.prop_count}}#f00;{{end}}">{{it1.prop_count}}</span> </div>
                </div>
               
            </div>
        </div>
    </div>
</div>