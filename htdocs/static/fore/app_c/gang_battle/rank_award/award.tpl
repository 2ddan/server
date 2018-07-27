<div style="left: 16px;top: 65px;height:490px;width:430px;position: absolute;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="left: 0px;top: 0px;height:490px;width:430px;opacity:0.85">
        {"bgName":"bg_frame32"} 
    </widget>
    
    {{let rank_award = it1.rank_index == 2 ? it1.guild_battle_guild_rank : it1.guild_battle_person_rank}}
    <div class="scroll_box_v" layout="scroll" style="position: absolute;width: 100%;height: 380px;top: 10px;">
        {{for i, v of rank_award}}
        <div style="position: relative; width: 414px; height: 100px;margin-bottom:12px;margin-left: 8px;">
            <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 100px;z-index:0;left: 0;">
                {"type":2,"height":20,"width":30}
            </app_a-widget-img_stitch-stitch>
            
            <widget w-tag="app_a-widget-text-text" style="position: absolute;top: 40px;left: 5px;">
                {"text":{{"第" + v.rank.join("-") + "名"}},"show":"","space":0,"fontSize":24,"lineHeight":20,"textCfg":"heroEquip"} 
            </widget>

            <div class="shadow" style="width: 270px;overflow: hidden;height:64px;position: absolute;top: 22px;left:132px;">
                <div style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 70px;color:#fff">
                    {{for j, p of v.award}}
                    {{let prop = it1.Pi.sample[p[0]]}}
                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                    {{let url = it1.Pi.pictures[icon]}}                
                    <widget style="display:inline-block;position:relative" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{p[0]}})">
                        {"width":60,"height":60,"prop":{{prop}},"url":{{url}},"count":{{p[1]}},"bg":0,"name":"none","right":7,"top":21} 
                    </widget>
                    {{end}}
                </div>
            </div>  
        </div>  
        {{end}}
    </div>

    <div style="position: absolute;width: 100%;height: 82px;bottom: 0px;color: #f3d6af;font-family: mnjsh;">
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;left: 10px"><span style="color: #ffba00;">我的排名:</span> 未上榜</div>
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;right: 10px"><span style="color: #ffba00;">我的战绩:</span> 666</div>
        <div style="font-size:18px;position: absolute;top: 42px;text-align: left;left: 95px;">
            <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 270px;left: 8px;">
                {"icon":"little_tips_bg","text":"奖励在活动完成后通过邮件发放","width":270,"height":23,"top":2,"left":7} 
            </widget>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>
    </div>

</div>