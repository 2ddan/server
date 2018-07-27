

<div style="position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;background-image:url(./images/main_bg.jpg);background-size:100% 100%;background-repeat:no-repeat">
    <app_b-widget-title-title style="z-index:2;top:0;left:0">
        {"text":"九幽幻境","coin":["money","diamond"],"top":"15","left":"22" }
    </app_b-widget-title-title>
  
    <div style="pointer-events: none;width: 540px;height: 860px;position: absolute;top: 40px;left: 50%;margin-left: -270px;">
        <app-scene-base-scene style="width: 100%;height: 100%;">
            {"name":"uiscene","type":"effect","module":"" ,"width":540,"height":900 }
        </app-scene-base-scene>
    </div>
   
    <div style="width:540px;position:absolute;left:50%;top:0;bottom:0;margin-left:-270px;">
        <widget w-class="s4" w-tag="app_a-widget-title-single" >
            {"padding":10,"type":9,"width":124,"text":{{ it1.instance_drop[it1.chapter_id][0].chapter_name }},"textCfg":"gangCoverTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
        </widget>
       
        {{if it1.chapter_id > 1}}
        <widget w-class="s5"  on-tap="switch_chapter(-1)" w-tag="app_a-widget-btn_pic-btn_pic">
            {"icon":"light_arraw"} 
        </widget>
        {{end}}   

        {{if it1.chapter_id < it1.instance_record.length}}
        <widget w-class="s6"  on-tap="switch_chapter(1)" w-tag="app_a-widget-btn_pic-btn_pic">
            {"icon":"light_arraw"} 
        </widget>
        {{end}}

        <div data-desc="图标" style="position:absolute;left: 17px;top: 107px;">
           
            <app-widget-btn-menu on-tap="openWelfare" style="left: 0;top: 0;width:68px;height:68px;">
                {"icon":"pic_instance_boss","text":{{it1.instance_welfare[it1.boss_id].name.replace(/等级/g,"Lv")}},"width":80,"height":80,"space":-5,"bottom":0,"fontSize":20,"position":"absolute","tip_keys":["explore.instance.welfare"] }
            </app-widget-btn-menu>
            <app-widget-btn-menu on-tap="openStarArr" style="left: 0;top: 90px;width:68px;height:68px;">
                {"icon":"pic_instance_scroll","text":"星阵图谱","width":80,"height":80,"bottom":0,"fontSize":20,"space":-5,"position":"absolute","tip_keys":["explore.instance.star"]}
            </app-widget-btn-menu>
           
        </div>

        {{for i, v in it1.instance_drop[it1.chapter_id]}}
        {{let star_num = it1.instance_record[it1.chapter_id-1][i]}}
        {{let point = it1.instance_point}}
        {{let index = parseInt(point/5)+1}}
        {{let id = point%5 }}
        {{let fight = (it1.chapter_id === index && i == id) ? 1 : 0 }}

        <div w-class="index_{{i}}" on-tap="openMission({{v.guard_id}})" style="position:absolute;width: 160px;height: 160px;">

            {{if fight}}
            <div class="fightStateAnim" style="transform: scale(0.5);position: absolute;top: -75px;left: 30px;pointer-events: none;"></div>
            <app_a-widget-guide-guide>
                {{"instance_curr"}}
            </app_a-widget-guide-guide>
            {{end}}
            <app_b-widget-star-star style="position: absolute;bottom: -27px;left: 50%;transform: translateX(-50%);white-space: nowrap;">
                {"star_light":{{star_num}},"star_dark":{{3-star_num}} }
            </app_b-widget-star-star>    

            <app_a-widget-pic_text-pic_text  data-desc="章节名字" style="position: absolute;left: 50%;transform: translateX(-50%);bottom: -3px;">
                {"icon":"fb_name","width":109,"height":33,"align":"center","marginLeft":3,"text": {{v.guard_name}},"textCfg":"fbName","fontSize":18,"top":5,"left":0} 
            </app_a-widget-pic_text-pic_text>
        </div>
        {{end}}
    </div>

    <div w-class="s1" class="shadow7">
        {{let initial_count = it1.vip_advantage[it1.player.vip].instance_times  }}
        {{let has_count = initial_count + it1.vip_buy_times  - it1.use_times }}
        <span style="font-family:mnjsh;">剩余次数：</span> <span style="color:{{!has_count ? '#f00' : ''}}">{{has_count}}</span>{{"/"+ initial_count}} 
        <widget w-class="s2" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount">
            {"icon":"add_btn"} 
        </widget> 
    </div>
    <div w-class="s3" class="shadow7">
        <widget  w-tag="app_a-widget-pic_text-pic_text">
            {"icon":"little_tips_bg","text":"通关章节可获得迎战魔王","width":230,"height":24,"top":2} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
            {"icon":"remind"} 
        </widget>
    </div>
      
</div>