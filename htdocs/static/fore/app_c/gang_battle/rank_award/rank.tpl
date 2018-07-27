<div style="left: 16px;top: 65px;height:490px;width:430px;position: absolute;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="left: 0px;top: 0px;height:490px;width:430px;opacity:0.85">
        {"bgName":"bg_frame32"} 
    </widget>
    {{let rank = it1.rank_index == 0 ? it1.gang_rank : it1.person_rank}}
    <div class="scroll_box_v" layout="scroll" style="position: absolute;width: 100%;height: 390px;top: 10px;">
        {{for i, v of rank}}
        <div style="position: relative; width: 414px; height: 122px;margin-bottom:10px;margin-left: 8px;">
            <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 122px;z-index:0;left: 0;">
                {"type":2,"height":20,"width":30}
            </app_a-widget-img_stitch-stitch>

            {{if i-0+1 <= 3}}
            <widget w-tag="app_a-widget-rank-rank_num" style="position: absolute;left: 30px;top: 46px;width: 34px;height: 29px;">
                {"num":{{i-0+1}} }
            </widget>
            {{else}}
            <div style="width: 100px;height: 30px;font-size: 35px;text-align: center;color: rgb(174, 140, 100);text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: -3px;top: 46px;line-height: 30px;font-family:mnjsh">{{i-0+1}}</div>
            {{end}}
            <widget w-tag="app_a-widget-line-line" style="left: 90px;top: 2px;position: absolute;">
                {"line":"line_9"} 
            </widget>

            {{let imgX= ''}}
            {{if it1.rank_index == 0}}
            {{imgX = it1.Pi.pictures[it1.guild_upgrade[v.gang_level].icon_id]}}
            <img src="{{imgX}}" alt="" srcset="" style="position: absolute;left: 110px;top:20px;"/>
            <div style="position: absolute;width: 200px;height: 80px;color: #f3d6af;font-size: 18px;font-family: mnjsh;left: 206px;top: 27px;">
                <widget w-tag="app_a-widget-text-text">
                    {"text":{{v.gang_name}},"show":"","space":2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                </widget>
                <div class="shadow" style="line-height: 24px;">等级: {{v.gang_level}}</div>
                <div class="shadow" style="line-height: 24px;">门派战绩: {{v.total_integration
                }}</div>                
            </div> 
            {{else}}
            {{: imgX = it1.Pi.pictures['playerhead'+(v.head || v.career_id)]}}
            {{let id = v.role_id || null}}
            <widget style="position: absolute;left: 106px;top: 16px;width: 97px;height: 97px;" w-tag="app_a-widget-head-friend" on-tap="seeOther({{id}})">
                {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
            </widget>
            <div style="position: absolute;width: 200px;height: 80px;color: #f3d6af;font-size: 18px;font-family: mnjsh;left: 206px;top: 27px;">
                <widget w-tag="app_a-widget-text-text">
                    {"text":{{v.name}},"show":"","space":2,"fontSize":20,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                </widget>
                <div class="shadow" style="line-height: 24px;">门派: {{v.gang_name}}</div>
                <div class="shadow" style="line-height: 24px;">个人战绩: {{v.total_integration}}</div>                
            </div> 
            {{end}}              
        </div>  
        {{end}}
    </div>

    <div style="position: absolute;width: 100%;height: 82px;bottom: 0px;color: #f3d6af;font-family: mnjsh;">    
        {{if it1.rank_index == 0}}
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;left: 10px"><span style="color: #ffba00;">门派排名:</span> {{it1.my_gang_rank > 0 ? "第" + it1.my_gang_rank + "名" : "未上榜"}}</div>
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;right: 10px"><span style="color: #ffba00;">门派战绩:</span> {{it1.base_data.gangl_total_integration[1]}}</div>
        {{else}}
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;left: 10px"><span style="color: #ffba00;">我的排名:</span> {{it1.my_rank > 0 ? "第" + it1.my_rank + "名" : "未上榜"}}</div>
        <div class="shadow" style="line-height: 30px;height: 30px;font-size: 20px;text-align: center;width: 200px;position: absolute;right: 10px"><span style="color: #ffba00;">我的战绩:</span> {{it1.base_data.personal_total_integration[1]}}</div>
        {{end}}
        {{let text = it1.rank_index == 0 ? "门派战绩为本期总战绩, 每期清空" : "个人战绩为本期总战绩, 每期清空"}}
        <div style="font-size:18px;position: absolute;top: 42px;text-align: left;left: 95px;">
            <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 270px;left: 8px;">
                {"icon":"little_tips_bg","text":{{text}},"width":270,"height":23,"top":2,"left":7} 
            </widget>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>
    </div>

</div>