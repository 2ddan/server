<div maxId="19" style="position:absolute;width:100%;height:100%;z-index: 2" w-class="2" w-sid="2">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let career_id = it1.player.career_id}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let gest = appCfg.gest}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let gest_act = cfg.gest_act.gest_act}}
    {{let boss_id = gest_act[gest.boss_index].boss_id}}
    {{let module_id = it1.monster_base[boss_id].module}}

    <app_b-widget-title-title w-class="3" w-sid="3">
        {"text":"心法副本","coin":["money","diamond"],"left":5,"top":15,"r":[["money",0],["dimond",0],["dimond",0]],"type":""} 
    </app_b-widget-title-title>
    <div w-class="4" w-sid="4">
        <app_a-widget-bg_frame-bg w-class="9" w-sid="9">
            {"bgName":"bg_frame21"} 
        </app_a-widget-bg_frame-bg>

        <div style="position: absolute;left: 50%;top: 115px;width: 401px;height: 370px;margin-left: -199px;z-index: 1;">
                <app-scene-base-scene>
                    {
                        "name":"uiscene",
                        "type":"monster",
                        "module":{
                            "module":{{module_id}},
                            "x":0
                            "y":0,
                            "z":0,
                            "scale":1.3,
                            "rotate":[0,0,0]
                        },
                        "width":540,
                        "height":500
                    }
                </app-scene-base-scene>
            </div>

        <app_a-widget-line-line w-class="6" w-sid="6">
            {"line":"line_7"} 
        </app_a-widget-line-line>
        <img w-class="8" src="app_c/gest/image/gest_fb_bg1.png" w-sid="8"/>
        <app_a-widget-pic_text-pic_text w-class="10" class="shadow8" w-sid="10" style="color: #fde7ca;font-family: mnjsh;font-size: 20px;">
            {"icon":"name_bg_2","width":"184","height":"32","align":"center","marginLeft":"3","text":{{it1.monster_base[it1.gest_act[it1.boss_index].boss_id]["des"]}},"textCfg":"","space":"0","fontSize":"12","top":"0","left":"0"} 
        </app_a-widget-pic_text-pic_text>

        <app_a-widget-btn-rect on-tap="refreshBoss()" w-class="11" w-sid="11">
            {"class":"default","fontsize":"24","color":"#fdedd7;","text":"刷  新","width":"116","height":45,"marginLeft":"0"} 
        </app_a-widget-btn-rect>
        {{if it1.freeRefresh}}
        <span w-class="16" w-sid="16" style="left: 347px;top: 65px;">
            免费次数:<span style="padding-left:5px;color:#{{it1.freeRefresh?'d5d5d5':'e02322'}}">{{it1.freeRefresh}}</span>
        </span>
        {{else}}
        <app_a-widget-coin-coin w-class="12" w-sid="12" style="color:{{it1.gest_base.fresh_price>it1.player.diamond?'#e02322':'#f0f0f0'}}">
            {"icon":"diamond","width":"25","height":"21","left":"3","text":[{{it1.gest_base.fresh_price}}] } 
        </app_a-widget-coin-coin>
        {{end}}

        <div w-class="5" w-sid="5">
            <app_a-widget-title-single w-class="13" w-sid="13" style="top: -23px;line-height: 35px;">
                {"padding":20,"type":"11","width":"138","text":"奖励信息","textCfg":"singleTitle","fontSize":"20","space":"-2","color":"#b27d5c","wear":"0","class":"0"} 
            </app_a-widget-title-single>

            <div w-class="15" w-sid="15" style="top:15px">
                {{for i, v of it1.gest_act[it1.boss_index].show_award}}
                {{let prop = it1.Pi.sample[v[0]]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let n = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                <div style="width:90px;height:100px;position: relative;top: 11px;display: inline-block;">
                    <app_a-widget-prop-base w-class="17" w-sid="17">{"width":"84","height":84,"prop":{{prop}},"url":{{url}},"count":"none","name":"none","bg":"","quality":{{prop.quality}},"bottom":"16","top":"25","right":"25"}</app_a-widget-prop-base>
                    <app_a-widget-pic_text-pic_text w-class="16" w-sid="16" style="left: -3px;top: 91px;">
                        {"icon":"equip_level_bg","width":"90","height":"22","text":{{n}},"textCfg":"heroEquip","fontSize":18}  
                    </app_a-widget-pic_text-pic_text>
                </div>
                {{end}}
            </div>

            {{let count = it1.surplusFight }}
            <app_a-widget-btn-rect on-tap="fightBoss()" w-class="14" w-sid="14">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"挑  战","width":"116","height":"45","marginLeft":"0"} 
            </app_a-widget-btn-rect>
            <span w-class="16" w-sid="16">
                今日剩余次数:<span style="padding-left:5px;color:#{{count?'d5d5d5':'e02322'}}">{{count}}</span>
            </span>
            <app_a-widget-line-line w-class="18" w-sid="18">
                {"line":"line_10"} 
            </app_a-widget-line-line>

        </div>
    </div>
</div>