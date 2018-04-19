<div class="popups_bg" style="width:420px;height:520px;position:absolute;top:55px;">
    
    <div class="popups_close" style="top:-23px;right: 15px" on-tap="goback"></div>

    <div class="line_5" style="position:absolute;top:23px;left:-4px;z-index:1"></div>
    {{let a = ""}}
    {{let b = ""}}
    {{if it1.tabSwitch === "rank"}}
    {{:a = "border orange"}}
    {{:b = "border"}}
    {{else}}
    {{:a = "border"}}
    {{:b = "border orange"}}
    {{end}}
    <div style="position:absolute;height:30px;width:150px;top:32px;left:60px;">
        <app-widget-btn-button style="width:70px;height:30px;top:0px;" on-tap='tabChange("rank")'>
            {"type":{{a}},"text":"输出排行","left":-15}
        </app-widget-btn-button>
    
        <app-widget-btn-button style="width:70px;height:30px;top:0px;left:72px;" on-tap='tabChange("award")'>
            {"type":{{b}},"text":"排行奖励","left":-15}
        </app-widget-btn-button>
    </div>

    <div style="position:absolute;height:30px;top:66px;width:100%;">
        <div class="title_light" style="left: 45px;top: -15px;position: absolute;width: 74%;"></div>
        <div class="title_light" style="left: 45px;top: 15px;position: absolute;width: 74%;"></div>
    </div>
    {{if it1.tabSwitch === "rank"}}
    <app_a-widget-rank-rank_title style="top:62px;z-index: 1;left:-10px;">{"keys":["排名","姓名","总输出"],"split": [30, 30,28],"fontSize":17}</app_a-widget-rank-rank_title>
    {{else}}
    <app_a-widget-rank-rank_title style="top:62px;z-index: 1;left:-27px;">{"keys":["排名","奖励"],"split": [30, 50],"fontSize":17}</app_a-widget-rank-rank_title>
    {{end}}
    {{if it1.tabSwitch === "award"}}
    <div style="position:absolute;width:360px;height:376px;left:50%;margin-left:-180px;top:96px;">
        {{for i, v of it1.kill_monster_rank_award}}
        <div class="attr_bg" style="width:100%;position:relative;display:flex;align-items:center;height:70px;margin:5px 0 0 0;">
            {{if (i < 3) && (v.rank.length == 1)}}
            <app_a-widget-rank-num style="left: 46px;top:50%;margin-top:-33px;z-index:1">
                {"num":{{v.rank[0]}} }
            </app_a-widget-rank-num>
            {{else}}
            <div style="width: 72px;height: 30px;font-size: 24px;text-align: center;color: rgb(174, 140, 100);text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: 10px;top: 20px;line-height: 30px;">{{v.rank[0]}} ~ {{v.rank[1]}}</div>
            {{end}}

            <div style="position:absolute;width:240px;height:52px;left:124px;">
                {{for m, n of v.award}}
                {{if n[0] === "money"}}
                {{let url = "app_c/style/images/Item/res_100001.png"}}
                <div style="position:relative;width:52px;height:52px;display:inline-block;margin-left:3px;">
                    <app-widget-prop-base_prop-base_prop style="width:52px;height:52px;">
                        {"prop":{"quality":1},"url":{{url}} }
                    </app-widget-prop-base_prop-base_prop>
                    <div style="position:absolute;width:50px;text-align:right;bottom:0px;right:0px;font-size:12px;color:white;z-index:3">x{{n[1]}}</div>
                </div>                
                {{elseif n[0] === "diamond"}}
                {{let url = "app_c/style/images/Item/res_100002.png"}}
                <div style="position:relative;width:52px;height:52px;display:inline-block;margin-left:3px;">
                    <app-widget-prop-base_prop-base_prop style="width:52px;height:52px;">
                        {"prop":{"quality":5},"url":{{url}} }
                    </app-widget-prop-base_prop-base_prop>
                    <div style="position:absolute;width:50px;text-align:right;bottom:0px;right:0px;font-size:12px;color:white;z-index:3">x{{n[1]}}</div>
                </div>   
                {{else}}
                {{let p = it1.Pi.sample[n[0]]}}
                {{let url = it1.Pi.pictures[p.icon]}}
                <div style="position:relative;width:52px;height:52px;display:inline-block;margin-left:3px;">
                    <app-widget-prop-base_prop-base_prop style="width:52px;height:52px;">
                        {"prop":{{p}},"url":{{url}} }
                    </app-widget-prop-base_prop-base_prop>
                    <div style="position:absolute;width:50px;text-align:right;bottom:0px;right:0px;font-size:12px;color:white;z-index:3">x{{n[1]}}</div>
                </div>
                {{end}}
                {{end}}
            </div>
        </div>
        {{end}}
        <div w-class="text_shadow" style="position:absolute;height:20px;line-height:20px;width:100%;font-size:12.3px;text-align:center;bottom:-34px;color:#ffa657;z-index:2;">排行奖励将在活动结束后通过邮件发放</div>
    </div>
    {{else}}
    <div style="position:absolute;width:360px;height:415px;left:50%;margin-left:-180px;top:101px;overflow:hidden;">
        <div scroll="1" style="position:absolute;width:360px;height:304px;left:50%;margin-left:-180px;overflow-x:hidden;overflow-y:auto;">
            {{for i, v of it1.rank_info}}
            <div class="attr_bg" style="width:100%;position:relative;display:flex;align-items:center;height:70px;margin:5px 0 0 0;">
                {{if (i < 3)}}
                <app_a-widget-rank-num style="left: 46px;top:50%;margin-top:-33px;z-index:1">
                    {"num":{{i-0+1}} }
                </app_a-widget-rank-num>
                {{else}}
                <div style="width: 72px;height: 30px;font-size: 30px;text-align: center;color: rgb(174, 140, 100);text-shadow: 1px 0px 0px rgb(6, 8, 54), -1px 0px 0px rgb(6, 8, 54), 0px 1px 0px rgb(6, 8, 54), 0px -1px 0px rgb(6, 8, 54);position: absolute;left: 10px;top: 20px;line-height: 30px;">{{i-0+1}}</div>
                {{end}}
                {{let url = "app/scene_res/res/playerhead/playerhead"+v.sex+".png"}}
                
                <div w-class="text_shadow" style="position:absolute;width:100px;height:20px;font-size:13px;line-height:20px;color:#e8dfb2;left:170px;text-align:left;">{{v.name}}</div>

                <div w-class="text_shadow" style="position:absolute;width:100px;height:20px;font-size:15px;line-height:20px;color:#fd730e;left:270px;text-align:left;">{{it1.Common.numberCarry(parseInt(v.damage),10000)}}</div>
            </div>
            {{end}}
        </div>
        <div style="bottom:4px;display:flex;align-items:center; position: absolute;width: 370px;height: 100px;">
            
            <app_a-widget-pic_other-pic_other style="position:absolute;left: 0px;">{"icon":"my_rank_bg"}</app_a-widget-pic_other-pic_other>

            {{if it1.my_rank}}
            {{let myURL = "app/scene_res/res/playerhead/playerhead"+it1.my_rank.sex+".png"}}
            
            <div w-class="text_shadow" style="position:absolute;width:100px;height:20px;font-size:13px;line-height:20px;color:#e8dfb2;left:170px;text-align:left;">{{it1.my_rank.name}}</div>

            <div w-class="text_shadow" style="position:absolute;width:100px;height:20px;font-size:15px;line-height:20px;color:#fd730e;left:270px;text-align:left;">{{it1.Common.numberCarry(parseInt(it1.my_rank.damage),10000)}}</div>
            {{end}}

            <div w-class="text_shadow" style="position:absolute;height:20px;line-height:20px;width:100%;font-size:12.3px;text-align:center;bottom:3px;color:#ffa657;z-index:2;">排行奖励将在活动结束后通过邮件发放</div>
        </div>
    </div>
    {{end}}
</div>