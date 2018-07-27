<div maxId="29" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    {{let player = it1.player}}
    {{let daily_fb_base =it1.daily_fb_base}}
    {{let vip_advantage = it1.vip_advantage}}
    {{let daily_fb_act = it1.daily_fb_act}}
    {{let career_id = player.career_id}}
    {{let root = _get("pi/ui/root").exports}}
    {{let common = _get("app/mod/common").exports.Common}}

    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"材料副本","coin":["money","diamond"],"left":12,"top":16,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
    </widget>
    
    <app_a-widget-text-text style="position: absolute;top:72px;left: 22px;line-height: 25px;height: 25px;z-index:2">
        {"text":"{{'我的战力:'+common.numberCarry(parseInt(player.power || 0),1000000)}}","textCfg":"powerNum","fontSize":22}
    </app_a-widget-text-text>
    {{let initial_count = vip_advantage[player.vip].daily_instance_times }}
    {{let has_count = initial_count + it1.vip_daily_times[it1.fb_id-1] - it1.use_times[it1.fb_id-1] }}
    <div w-class="6" w-sid="6" style="left:50%;margin-left: -246px;">
        <widget w-class="5" w-tag="app_a-widget-bg_frame-bg" w-sid="5">
            {"bgName":"bg_frame21"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-line-line" w-sid="7">
            {"line":"line_7"} 
        </widget>
        <widget w-class="8" w-tag="app_a-widget-rank-rank_title" w-sid="8">
            {"keys":["难度","奖励","星数"],"padding":10,"fontSize":19,"va":""} 
        </widget> 
        
        <div w-class="9" w-sid="9" style="overflow: hidden;">
            <div w-class="10" w-sid="10" style="overflow-x: hidden;overflow-y: auto;">

                {{for i, v of daily_fb_act[it1.fb_id]}}
                {{let prop = it1.Pi.sample[v.fall_down1]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                <div w-class="11" w-sid="11">
                    <widget w-class="12" w-tag="app_a-widget-bg_frame-bg" w-sid="12">
                        {"bgName":"bg_frame29"} 
                    </widget>

                    <app_c-daily_fb-diffcult_level style="top: 9px;left: 50px;z-index:2">
                        {"level":{{v.desc}} }
                    </app_c-daily_fb-diffcult_level> 

                    <div w-class="16" w-sid="16">
                        <app_a-widget-prop-base on-tap='showPropInfo("{{v.fall_down1}}")' style="position:relative">
                            {"prop":{{prop}},"url":{{url}},"width":55,"height":55,"count":"none","name":"none","bg":0}
                        </app_a-widget-prop-base>
                        <div w-class="18" w-sid="18">{{common.numberCarry(v.fall_range[0],10000) + "-" + common.numberCarry(v.fall_range[1],10000)}}</div>
                    </div>
                    

                    {{if it1.wild_max_mission >=  v.open_level}}
                    <div w-class="17" w-sid="17">
                        {{let star = it1.star_total[v.chapter_id-1]}}
                        <app_b-widget-star-star style="position: relative;text-align:center">
                            {"star_light":{{star}},"star_dark":{{3-star}} }
                        </app_b-widget-star-star>
                        {{if star < 3}}
                        <widget on-tap='challenge("{{v.chapter_id+','+v.open_level}}")' w-class="14" w-tag="app_a-widget-btn-rect" w-sid="14">
                            {"guide":{{i==0?"daily_ch":""}},"class":{{!has_count ? "disabled" : "default"}},"fontsize":24,"color":"#fdedd7;","text":"挑 战","width":116,"height":45} 
                        </widget>
                        {{else}}
                        <widget  on-tap='sweep({{v.chapter_id}})' w-class="14" w-tag="app_a-widget-btn-rect" w-sid="14">
                            {"class":{{!has_count ? "disabled" : "hl"}},"fontsize":24,"color":"#fdedd7;","text":"扫 荡","width":116,"height":45} 
                        </widget>
                        {{end}}
                    </div>
                    <app_a-widget-text-text style="position: absolute;top:76px;right: 35px;height: 25px;white-space: nowrap;">
                        {"text":"{{'推荐战力:'+common.numberCarry(v.power,10000)}}","textCfg":"powerNum","fontSize":18,"space":-1}
                    </app_a-widget-text-text>
                    {{else}}
                    <widget w-class="15" w-tag="app_a-widget-text-text" w-sid="15" style="right:32px;">
                        {"text":{{"通过野外"+it1.getWildName(v.open_level)+"可开启"}},"show":"","space":-2,"fontSize":18,"lineHeight":20,"color":"","textCfg":"lvOpenRed"} 
                    </widget>
                    {{end}}
                </div>
                {{end}}
            </div>
        </div>
        
    </div>
    <div w-class="19" w-sid="19"  style="transform: translateX(-50%);left:50%">
        <span style="font-family:mnjsh;">挑战次数：</span> <span style="color:{{!has_count ? '#f00' : ''}}">{{has_count}}</span>{{"/"+ initial_count}} 
        <widget w-class="20" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="20" on-tap="buyCount">
            {"icon":"add_btn"} 
        </widget> 
    </div>
</div>