<div style="position:absolute;width:100%;top:44px;height:652px;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:652px;left:50%;margin-left:-246px;">
        {"bgName":"bg_frame21"}
    </widget>

    <div style="position:absolute;left: 26px;top: 0;width:487px;height:322px;font-family: mnjsh;font-size: 22px;overflow: hidden;">
        <img src="../images/gang_build_bg.png" alt="" style="position: absolute;width: 540px;height: 322px;top: 2px;left: 50%;margin-left: -270px;" />
        {{if it1.gangData.gang_level < 5}}
        <img src="../images/flag_one.png" alt="" style="position: absolute;left: 50%;margin-left: -101px;top: 23px;" />
        {{else}}
        <img src="../images/flag_two.png" alt="" style="position: absolute;left: 50%;margin-left: -101px;top: 23px;" />
        {{end}}
        <div style="position: absolute;width: 492px;height: 36px;bottom: 0px;left: 50%;margin-left: -246px;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:36px;left:50%;margin-left:-246px;">
                {"bgName":"bg_frame47"} 
            </widget>
            {{let obj = it1.guild_upgrade[it1.gangData.gang_level]}}
            {{if obj.guild_money}}
            {{let progress = ((it1.gangExpandData.gang_money / obj.guild_money) * 100).toFixed(0) - 0}}
            <app_a-widget-bar-bar2 style="position: absolute;width: 430px;height: 18px;left: 33px;top:10px;">
                {"progress":{{progress}},"text":{{it1.gangExpandData.gang_money + "/" + obj.guild_money}},"lineHeight":18,"fontSize":14,"split":[]} 
            </app_a-widget-bar-bar2>
            {{else}}
            <div style="position:absolute;width:240px;height:40px;text-align:center;line-height:40px;color:#51e650;top: 50%;margin-top: -20px;left: 50%;margin-left: -120px;font-size: 24px;">门派已升至最高级</div>
            {{end}}
        </div>
        <app-widget-btn-menu on-tap="openFlag" style="left: 6px;top: 15px;width:80px;height:80px;">
            {"icon":"gang_flag_icon","text":"旗帜属性","width":80,"height":80,"top":-8,"bottom":5,"fontSize":18,"space":-6,"position":"absolute","bg":4}
        </app-widget-btn-menu>

        <app-widget-btn-menu on-tap="openBuild" style="left: 6px;top: 95px;width:80px;height:80px;">
            {"icon":"build_icon","text":"建筑升级","width":80,"height":80,"top":-8,"bottom":5,"fontSize":18,"space":-6,"position":"absolute","bg":4,"tip_keys":["gang.build.building"]}
        </app-widget-btn-menu>

        <app-widget-btn-menu on-tap="openSacrifice" style="right: 6px;top: 15px;width:80px;height:80px;">
            {"icon":"sacrifice_icon","text":"祈福","width":80,"height":80,"top":-8,"bottom":5,"fontSize":18,"space":-6,"position":"absolute","bg":4,"tip_keys":["gang.build.pray"]}
        </app-widget-btn-menu>
    </div>

    {{let donate_record = it1.gangExpandData.donate_record}}
    {{let text = ["零", "一", "二", "三", "四", "五", "六"]}}
    <div style="width:492px;height:320px;position: absolute;top: 334px;left: 50%;margin-left: -246px;">
        <div style="height: 200px;position: absolute;top:0px;left: 15px;right: 10px;">
            <div class="attr_bg_left" style="left:0px;bottom:0px;"></div>
            <div class="attr_bg_middle" style="left:95px;right:95px;bottom:0px;background-repeat:repeat-x;"></div>
            <div class="attr_bg_right" style="right:0px;bottom:0px"></div>

            <div class="cover_title shadow6" style="left:0px;right:0px;margin:0 auto;top:-9px;text-align:center;font-family:mnjsh;font-size:17px;color:#ffd8a6;line-height:27px;">第{{text[donate_record[0]]}}轮</div>
        </div>
        <app_a-widget-pic_other-pic_other style="position: absolute;left: 280px;top: -8px;" on-tap="funInfo_one">
            {"icon":"help"}
        </app_a-widget-pic_other-pic_other>
        {{let wp = it1.guild_contribution[donate_record[0]]}}
        <div style="position: absolute;width: 440px;height: 190px;left: 50%;margin-left: -214px;top: 38px;overflow: hidden;">
            <div scroller="1" style="position: absolute;width: 440px;height: 220px;left: 50%;margin-left: -214px;overflow-x: auto;overflow-y: hidden;white-space: nowrap;">
                {{for i, v of wp}}
                <div style="width: 138px;height: 184px;position:relative;display: inline-block;margin-right: 8px;">
                    <app_a-widget-img_stitch-stitch style="position: absolute;width: 134px;height: 180px;">
                        {"type":2,"height":20,"width":30}
                    </app_a-widget-img_stitch-stitch>

                    {{let prop = it1.Pi.sample[v.id]}}
                    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(it1.player.career_id)][0] : prop.icon}}
                    {{let url = it1.Pi.pictures[icon]}}
                    {{let name = it1.checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.player.career_id)] : prop.name}}
                    <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{v.id}})" style="top: 4px;left: 50%;margin-left:-40px;position:absolute;">
                        {"width":80,"height":80,"prop":{{prop}} ,"url":{{url}},"count":"none","name":"none"} 
                    </widget>
                    
                    {{let pro = ((donate_record[1][i] / v.max_count) * 100).toFixed(1) - 0}}
                    <widget class="shadow" w-tag="app_a-widget-bar-bar4" style="position: absolute;width: 116px;height: 16px;top:89px;left: 9px;">
                        {"progress":{{pro}},"text":{{donate_record[1][i] + "/" + v.max_count}},"color":"#ffffff","lineHeight":16,"fontSize":16,"width":116,"height":16} 
                    </widget>

                    {{if donate_record[1][i] >= v.max_count}}
                        <app_a-widget-btn-rect style="top:116px;position:absolute;left: 50%;margin-left: -45px;">
                            {"text":"本轮已满","class":"disabled","fontsize":20,"width":90,"height":34}
                        </app_a-widget-btn-rect>
                    {{else}}
                        <app_a-widget-btn-rect on-tap='donateProp({{i}})' style="top:116px;position:absolute;left: 50%;margin-left: -45px;">
                            {"text":"捐 献","class":"hl","fontsize":20,"width":90,"height":34}
                        </app_a-widget-btn-rect>
                    {{end}}
                    {{let arr = it1.Common.getBagPropById(v.id) || [-1, {"count": 0}]}}
                    <div style="position: absolute;width: 130px;left: 50%;margin-left: -65px;top: 150px;height: 26px;line-height: 26px;color: #ffd8a6;font-size: 16px;text-align:center;z-index: 2;">当前:{{arr[1].count}}</div>
                </div>
                {{end}}
            </div>
        </div>

        <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;top: 250px;left: 0px;">
            {"line":"line_1"} 
        </widget>

        {{let collect_info = it1.gangExpandData.collect_info}}
        <div style="position: absolute;width: 430px;height: 23px;top: 274px;left: 50%;margin-left: -215px;display: flex;justify-content: space-evenly;">
            {{let collect = it1.guild_collect[collect_info[0]]}}
            {{if collect.count}}
            <app_a-widget-pic_other-pic_other on-tap="funInfo_two">
                {"icon":"help"}
            </app_a-widget-pic_other-pic_other>
            <div style="top: 150px;height: 23px;line-height: 23px;color: #ffd8a6;font-size: 18px;text-align:center;z-index: 2;font-family: MNJSH;">搜索等级(LV{{collect_info[0]}})</div>
            {{let p = ((collect_info[1] / collect.count) * 100).toFixed(0) - 0}}
            <app_a-widget-bar-bar2 style="width: 256px;height: 18px;position: relative;">
                {"progress":{{p}},"text":{{collect_info[1] + "/" + collect.count}},"lineHeight":18,"fontSize":14,"split":[]} 
            </app_a-widget-bar-bar2>
            {{else}}
            <div style="position:absolute;width:430px;height:40px;text-align:center;line-height:40px;color:#51e650;top: 50%;margin-top: -20px;left: 50%;margin-left: -120px;font-size: 24px;">采集已升至最高级</div>
            {{end}}
        </div>

        <div on-tap="openSalaryRank" class="shadow12" style="right:-17px;top:8px;text-align:center;color:#542724;font-family:mnjsh;position: absolute;">
            <app_a-widget-pic_text-pic_text>
                {"icon":"shop_discount_bg","width":41,"height":154,"align":"center","text":" "} 
            </app_a-widget-pic_text-pic_text>
            <div class="center_h" style="font-size:18px;top: 28px;width: 16px;">贡献排行</div>
        </div>
        <app_a-widget-pic_other-pic_other style="position: absolute;right:-24px;top:-24px;">
            {"icon": "flower"}
        </app_a-widget-pic_other-pic_other>
    </div>
</div>
