<div maxId="59" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}				
	<app_b-widget-title-title style="z-index:2;position: absolute;left: 0px;top: 0px;">
		{"text":"无尽之战","coin":["money","diamond"],"left":8,"top":17,"width":{{root.getWidth()}}} 
    </app_b-widget-title-title>
    
    <div w-class="3" class="shadow8" >
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:700px;left:50%;margin-left:-246px;">
            {"bgName":"bg_frame21"}
        </widget>
        <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-14px;left:0px;right: 0px;margin: auto;">
            {"line":"line_7"} 
        </widget>

        <div data-desc="menu" w-class="10" >
            {{for i,v in it1.menu}}
            <div style="position: relative;display: inline-block;width: 80px;height: 80px;">
                <app-widget-btn-menu on-tap="{{v[2]}}">
                    {"icon":{{v[1]}},"text":{{v[0]}},"width":80,"height":80,"bottom":0,"fontSize":20,"bg":4,"space":-4,"top":-2}
                </app-widget-btn-menu>
            </div>
            {{end}}
        </div>


        {{let boss = it1.info.boss_info}}
        {{let monster = it1.monster_base[boss[0]]}}
        {{let count = it1.getCount()}}
        {{let score = it1.Common.numberCarry(it1.info.damage_info[1],10000)}}
        {{let text = it1.own_rank[0] != 0 ? "第" + it1.own_rank[0] + "名" : "未上榜"}}
        <widget w-tag="app_a-widget-pic_text-pic_text" w-class="4" >
            {"icon":"name_bg_2","width":210,"height":35,"text":{{"我的积分:<span style='color:#12ff00;'>"+score +"(" + text + ")</span>"}}} 
        </widget>
        {{if boss[2] <= 0}}
        <widget class="shadow8" w-tag="app_a-widget-pic_text-pic_text" w-class="8" >
            {"icon":"name_bg_2","width":140,"height":45,"text":"已击杀"} 
        </widget>
        {{end}}
        <div  w-class="6" class="shadow8">
            <app-scene-base-scene>
                {
                    "name":"uiscene",
                    "type":"monster",
                    "module":{
                        "module": {{monster.module}},
                        "position": [-0.2, -0.5, 0],
                        "scale": {{monster.scale}},
                        "rotate": [0, 0.52, 0]
                    },
                    "width": 485,
                    "height": 450
                }
            </app-scene-base-scene>
            <div on-tap="gotoFightEvent" style="position: absolute;bottom: 40px;right: 8px;width: 77px;height: 77px;z-index: 1;">
                <widget  w-tag="app_a-widget-btn-ling"  style="position: absolute;">
                    {"class":"default","text":" ","width":77,"height":77,"textCfg":"lingBtn"} 
                </widget>
                <widget  w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;top: 9px;left: 9px;">
                    {"icon":"fight_log","text":" ","width":56,"height":49} 
                </widget>
            </div>

            <widget  w-tag="app_a-widget-pic_text-pic_text" style="font-family:mnjsh;left: 0px;right: 0px;margin: auto;bottom: 37px;position: absolute;color: #fde7ca;line-height: 40px;text-align:center;z-index: 1;">
                {"icon":"name_bg_2","width":184,"height":40,"text":{{monster.des + " LV" + boss[1]}}} 
            </widget>
            {{let progress = ((boss[2] / boss[3]) * 100).toFixed(2) - 0}}
            <div style="position: absolute;width: 492px;height: 36px;bottom: 0px;left: 50%;margin-left: -246px;">
                <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:36px;left:50%;margin-left:-246px;">
                    {"bgName":"bg_frame47"} 
                </widget>
                <app_a-widget-bar-bar2 style="position: absolute;width: 430px;height: 18px;left: 33px;top:10px;">
                    {"progress":{{progress}},"text":{{boss[2] <= 0 ? "已击杀" : (it1.Common.numberCarry(boss[2],1000000) + "/" + it1.Common.numberCarry(boss[3],1000000))}},"lineHeight":18,"fontSize":14} 
                </app_a-widget-bar-bar2>
            </div>
        </div>
        <div w-class="7">
            {{if boss[2] > 0}}
            <widget on-tap="fightBoss({{count[0]}})" w-tag="app_a-widget-btn-rect" style="position: absolute;left:186px;top:25px;">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"挑  战","width":116,"height":45} 
            </widget>
            {{let add = it1.damageAdd()}}
            {{let text = ""}}
            {{if add && add[0][1]}}
            {{:text ="  " + it1.attribute_config[add[0][0]] + (add[0][1] < 1 ? add[0][1]*100+"%" : add[0][1]) }}
            {{end}}
            <widget w-tag="app_a-widget-pic_text-pic_text" w-class="5" >
                {"icon":"name_bg_2","width":210,"height":35,"text":{{it1.info.role_count + "人挑战中" + "<span style='color:#12ff00;'>"+ text + "</span>"}}} 
            </widget>
            {{else}}

            {{let name = it1.checkTypeof(boss[6],"Array") ? it1.Common.fromCharCode(boss[6]) : boss[6]}}
            <div w-class="9">
                由&nbsp;{{"["}}{{name}}{{"]"}}&nbsp;击败
                <div>
                    <app-widget-cdTime1 style="display:inline-block;vertical-align: middle;">
                        {"cd_time":{{(boss[5]+it1.endless_boss_base.boss_cd)*1000}},"now_time":{{it1.Util.serverTime()}},"cd_type":"x" }
                    </app-widget-cdTime1>
                    秒后，更强的<span style="color:#ff4800">BOSS</span>来袭
                </div>
            </div>


            {{end}}
            <div data-desc="挑战次数" w-class="19" class="shadow8">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                    {"icon":"resource_bar","width":143,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                </widget>
                <span style="position:relative;top:0;left:0;">挑战次数: <span style="color:{{!count[0] ? '#f00' : ''}}">{{count[0]}}</span></span> 
                <widget style="position:absolute;top:0;left:124px;" w-tag="app_a-widget-btn_pic-btn_pic"  on-tap="buyCount(1)">
                    {"icon":"add_btn"} 
                </widget> 
                <div w-class="20">
                    <app_a-widget-pic_text-pic_text >
                        {"icon":"equip_level_bg","text":"","width":160,"height":28}
                    </app_a-widget-pic_text-pic_text>
                    <div  w-class="23">
                        (
                        <app-widget-cdtime ev-countdownend="timeEnd" style="display:inline-block;vertical-align: middle;color:#12ff00">
                            {"cd_time":{{count[1][1]}},"now_time":{{count[1][0]}}}
                        </app-widget-cdtime>
                        后增长1次)
                    </div>
                </div>
            </div>
        </div>
        

        

    </div>

</div>