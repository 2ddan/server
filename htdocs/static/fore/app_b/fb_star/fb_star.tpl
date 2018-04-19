{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let time = cfg.instance_base.instance_base}}

{{if it.type == "equip_mission"}}
{{:time = cfg.equip_fb_base.equip_fb_base}}
{{end}}

{{let Util = _get("app/mod/util").exports.Util}}       

{{let obj = {"1":"成功通关","2":"通关时间≤"+time["2"].time+"秒","3":"通关时间≤"+time["3"].time+"秒"}  }}
<div style="width:189px;height:76px;position: absolute;left:0;top:79px;text-align:left;">
    <div class="shadow7" w-class="s1">
        <widget  w-tag="app_a-widget-bg_frame-bg" w-class="s3" >
            {"bgName":"fb_time_bg"} 
        </widget>
        {{for i,v in obj}}
        <div style="width:180px;position:relative;">
            {{i}}
            <app_b-widget-star-star w-class="s2">{"star_light":1,"star_dark":0}</app_b-widget-star-star>
            {{v}}
        </div>
        {{end}}       
    </div>

    <div class="shadow7" style="position: absolute;color:#66cb02;text-align:center;left: 4px;bottom: 147px;font-size:19px;">
        <app_a-widget-pic_text-pic_text style="top:0px;position:absolute;left:10px;">
            {"icon":"fight_time_bg","width":139,"height":65,"align":"center","text":"战斗时间","textCfg":"lingBtn","space":-3,"fontSize":22,"top":9,"left":0} 
        </app_a-widget-pic_text-pic_text>
        <div style="position:absolute;top:33px;left:23px;width:112px;">
            {{it1.str}}
        </div>
    </div>
</div>