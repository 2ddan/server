{{let bagInfo = _get("app/mod/db").exports.data.bag}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let Util = _get("app/mod/util").exports.Util}}
{{let player = _get("app/mod/db").exports.data.player}}
{{let bag = _get("app/mod/db").exports.data.bag}}
{{let career_id = player.career_id}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let root = _get("pi/ui/root").exports}}
<div group="top" style="position:absolute;width:{{root.getWidth()}}px;height: {{root.getHeight()}}px;left: 0px;top: 0px;z-index:2;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;pointer-events:none;">
    {{let module = it1.equip_info.module[it1.equip_info.career_id.indexOf(career_id)][0] ? it1.equip_info.module[it1.equip_info.career_id.indexOf(career_id)][0] : it1.equip_info.module[it1.equip_info.career_id.indexOf(career_id)][0]}}
    {{let img3 = Pi.pictures[module]}}
    <div w-class="equip_fast_bg" style="right: 10px;pointer-events: all;bottom: 428px;">
        {{let eprop = bagInfo[it1.equip_info.bag_pos-1]}}
        {{let name = checkTypeof(it1.equip_info.name,"Array") ? it1.equip_info.name[it1.equip_info.career_id.indexOf(career_id)] : it1.equip_info.name}}
        <app_a-widget-prop-base style="left: 0px;right: 0px;margin: 0 auto;top: 10px;position:absolute;font-size: 18px;">
            {"prop":{{eprop}},"url":{{img3}},"width":68,"height":68,"bg":1,"name":{{name}},"count":"none","bottom":20}
        </app_a-widget-prop-base>


        <app_a-widget-text-text style="position: absolute;left: 25px;top: 50px;color: #81d354;z-index: 10">
            {"text":{{"Lv."+it1.equip_info.level}},"show":"","space":0,"fontSize":16,"lineHeight":20,"textCfg":"equipFastLevel"} 
        </app_a-widget-text-text> 

        <div w-class="up_info" style="top: 15px;left: 24px;text-align:center;font-size:12px;color:#e9d6f9;line-height:16px;z-index:3"></div>

        <app_a-widget-btn-rect style="position:relative;top: 105px;left: 0px;right: 0;margin: 0 auto;" on-tap="fastWear('{{it1.equip_info.bag_pos+','+it1.equip_info.equip_pos}}')">{"text":"穿戴","class":"default","fontsize":18,"width":83,"height":31,"marginLeft":-12}</app_a-widget-btn-rect>
        
        {{let time = Util.serverTime()}}
        {{if time+11*1000 >= Util.serverTime() }}
        <div w-class="shadowm" style="width:auto;height:21px;pointer-events: none;color:#fdedd7;top:111.5px;left: 60px;font-family: mnjsh;line-height:21px;font-size:18px;position: absolute;">(
            <app-widget-cdTime1 ev-countdownend='fastWear("{{it1.equip_info.bag_pos}},{{it1.equip_info.equip_pos}}")' style="position:relative;display:inline-block">
                {"cd_time":{{ time+6*1000 }},"now_time":{{Util.serverTime()}},"cd_type":"x","full":1,"show_lastTime":0}
            </app-widget-cdTime1>
        )
        </div>
        {{end}}
    </div>
</div>