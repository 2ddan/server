{{let player = it1.player}}
{{let vip_advantage = it1.vip_advantage}}
{{let equip_fb_data = it1.equip_fb_data}}
{{let equip_fb_star = it1.equip_fb_star}}
{{let equip_fb_star_1 = it1.equip_fb_star_1}}
{{let equip_fb_welfare_box = it1.equip_fb_welfare_box}}
<div style="position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;background-image:url(./images/equip_fb_bg.jpg);background-size:100% 100%;background-repeat:no-repeat">
    <app_b-widget-title-title style="z-index:2;top:0;left:0">
        {"text":"装备副本","coin":["money","diamond"],"top":"15","left":"22" }
    </app_b-widget-title-title>
  
    <div  style="pointer-events: none;width: 540px;height: 860px;position: absolute;top: 40px;left: 50%;margin-left: -270px;">
        <app-scene-base-scene  style="width: 100%;height: 100%;">
            {"name":"uiscene","type":"effect","module":"","width":540,"height":900 }
        </app-scene-base-scene>
    </div>
   
    <div style="width:540px;position:absolute;left:50%;top:0;bottom:0;margin-left:-270px;">
        <widget w-class="s7" class="shadow7" w-tag="app_a-widget-btn-ling" on-tap="openSelect" >
            {"class":"default","fontsize":20,"color":"#49312E","text":"    未满    三星","width":77,"height":77,"color":"#fde7ca"} 
        </widget>
        <widget w-class="s4" w-tag="app_a-widget-title-single" >
            {"padding":10,"type":9,"width":124,"text":{{equip_fb_data[it1.index][0].chapter_name +"级装备副本"}},"textCfg":"singleTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
        </widget>
        {{if it1.index > 1}}
        <widget w-class="s5" on-tap="switch_chapter(-1)" w-tag="app_a-widget-btn_pic-btn_pic">
            {"icon":"light_arraw"} 
        </widget>
        {{end}}   

        {{if it1.index < equip_fb_star.length}}
        <widget w-class="s6"  on-tap="switch_chapter(1)" w-tag="app_a-widget-btn_pic-btn_pic">
            {"icon":"light_arraw"} 
        </widget>
        {{end}}
        <div data-desc="宝箱进度条" style="position:absolute;left: 17px;top: 110px;width:80px;height:83px;">
                
            {{let total = it1.star_total_award_record }}
            {{let b = total[total.length-1] == 0 ?1:0}}
            {{let nowStar = it1.totalStar}}
            {{let needStar = equip_fb_star_1[it1.allBoxId].total_star}}
            {{let state = b ? ( nowStar >=needStar ? "open" : '') :'opened'}}
            <app_a-widget-box-box on-tap="{{b?'openBoxAward':''}}" style="position:absolute;left: 2px;top: 0px;z-index:2">
                {"state":{{state}},"type":1,"width":80,"height":80,"bglight":{{state=="open" ? 1 : 0}}}
            </app_a-widget-box-box>

            <app-widget-tip-tip style="right:5px;top:14px;">
                {"tip_keys":["explore.equipFb.box_award"]}
            </app-widget-tip-tip>

            <app_b-widget-star-star style="position: absolute;bottom: 0px;left: -6px;transform: scale(1.3);z-index: 2;">
                {"star_light":1,"star_dark":0 }
            </app_b-widget-star-star>   
            <app_a-widget-bar-bar2  class="shadow6" style="height: 20px;width: 95px;left: 0px;bottom:0px;position:absolute;">
                {"progress":{{nowStar/needStar*100}},"text":{{nowStar + "/" + needStar}},"lineHeight":20,"fontSize":14}
            </app_a-widget-bar-bar2>
        </div>


        {{for i, v of equip_fb_data[it1.index]}}
        {{let star_num = it1.equip_fb_star[it1.index-1][i]}}
        {{let point = it1.mission_point}}
        {{let index = parseInt(point/5)+1}}
        {{let id = point%5 }}
        {{let fight = (it1.index === index && i == id) ? 1 : 0 }}

        <div w-class="index_{{i}}" on-tap="openMission({{v.mission_id}})" style="position:absolute;width: 160px;height: 160px;">
            {{%===关卡宝箱=====}}
            {{if it1.equip_fb_star[it1.index-1][i] > 0}}
            {{let flag = equip_fb_welfare_box[v.mission_id]}}
            {{if (flag && (it1.box_award_record[flag-1] == 0))}}
            <app_a-widget-box-box on-tap="getMissionBoxAward({{flag}})" style="position:absolute;bottom: -2px;left: -70px;">
                {"type":1,"state":"open","width":80,"height":80,"tip_keys":[{{"explore.equipFb."+flag}}]}
            </app_a-widget-box-box>

            {{end}}
            {{end}}
            {{let r = (v.level_limit>player.level ? v.level_limit : 0)? 100 : 0}}
            {{if fight}}
            <div class="fightStateAnim" style="transform: scale(0.5);position: absolute;top: -75px;left: 30px;pointer-events: none;z-index: 3;"></div>
            <app_a-widget-guide-guide>
                {{"equip_curr"}}
            </app_a-widget-guide-guide>
            {{end}}
            {{if !r}}
            <app_b-widget-star-star style="position: absolute;bottom: -26px;left: 50%;transform: translateX(-50%);white-space: nowrap;">
                {"star_light":{{star_num}},"star_dark":{{3-star_num}} }
            </app_b-widget-star-star>    

            <app_a-widget-pic_text-pic_text  data-desc="章节名字" style="position: absolute;left: 50%;transform: translateX(-50%);bottom: -3px;">
                {"icon":"fb_name","width":109,"height":33,"align":"center","marginLeft":3,"text":{{v.name.split(",").join("/")}},"textCfg":"fbName","fontSize":18,"top":5,"left":0} 
            </app_a-widget-pic_text-pic_text>
            {{else}}
            <app_a-widget-pic_text-pic_text  data-desc="X级开放" style="position: absolute;left: 50%;transform: translateX(-50%);bottom: -3px;">
                {"icon":"fb_name","width":109,"height":33,"align":"center","marginLeft":3,"text":{{v.level_limit + "级开放"}},"textCfg":"fbName","fontSize":18,"top":5,"left":0} 
            </app_a-widget-pic_text-pic_text>

            {{end}}
        </div>
        {{end}}
    </div>

    <div w-class="s1" class="shadow7">
        {{let initial_count = vip_advantage[player.vip].equip_instance_times   }}
        {{let has_count = initial_count + it1.vip_buy_times - it1.use_times }}
        <span style="font-family:mnjsh;">剩余次数：</span> <span style="color:{{!has_count ? '#f00' : ''}}">{{has_count}}</span>{{"/"+ initial_count}} 
        <widget w-class="s2" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount">
            {"icon":"add_btn"} 
        </widget> 
    </div>
    <div w-class="s3" class="shadow7">
        <widget  w-tag="app_a-widget-pic_text-pic_text">
            {"icon":"little_tips_bg","text":"首次通关不消耗挑战次数","width":230,"height":24,"top":2} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
            {"icon":"remind"} 
        </widget>
    </div>
      
</div>