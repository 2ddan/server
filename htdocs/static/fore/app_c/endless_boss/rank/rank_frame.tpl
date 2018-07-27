<div  style="position: absolute;width: 414px;height: 322px;left: 18px;top:56px;overflow: hidden;z-index: 2;">
    {{let Pi = it1.Pi}}
    {{let career_id = it1.player.career_id}}    
    <div style="position: relative; width: 110%; height: 310px;overflow-x: hidden;overflow-y: auto;">
    {{for k,v of it1.endless_boss_rank}}
        <div style="position: relative; width: 414px; height: 100px;margin-bottom:12px;">
            <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 100px;z-index:0;left: 0;">
                {"type":2,"height":20,"width":30}
            </app_a-widget-img_stitch-stitch>
            
            <widget w-tag="app_a-widget-text-text" style="position: absolute;top: 40px;left: 5px;">
                {"text":{{"第" + v.rank.join("-") + "名"}},"show":"","space":0,"fontSize":24,"lineHeight":20,"textCfg":"heroEquip"} 
            </widget>
            <div class="shadow" style="width: 270px;overflow: hidden;height:64px;position: absolute;top: 22px;left:132px;">
                <div style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 70px;color:#fff">
                    {{for j,p of v.award}}
                    {{if p[1]}}
                    {{let prop = Pi.sample[p[0]]}}
                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                    {{let url = Pi.pictures[icon]}}                
                    <widget style="display:inline-block;position:relative" w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{p[0]}})">
                        {"width":60,"height":60,"prop":{{prop}},"url":{{url}},"count":{{p[1]}},"bg":0,"name":"none","right":7,"top":21,"effect":{{prop.effect}}} 
                    </widget>
                    {{end}}
                    {{end}}
                </div>
            </div>                              
        </div>  
    {{end}} 
    </div> 
</div>