<div maxId="57" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let appCfg = _get("app/mod/db").exports.data}} 
    {{let player = appCfg.player}} 
    {{let career_id = player.career_id}}    
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
    {{let own_index = it1.rankData[it1.tabSwitch].ownRank.index}}
    {{let award_level = it1.award_fun(own_index-1)}}
    {{let next = it1.next_fun(own_index,it1.rankData[it1.tabSwitch].list.length)}}

    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"排行榜","coin":["money","diamond"],"left":0,"top":15,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}}
    </widget>
   
    <div w-class="8" w-sid="8" style="top:147px;">
        {{let obj = {"normal":"普通榜","plush":"精英榜"} }}
        <div data-desc="tab_btn" style="position:absolute;top:-48px;">
            {{for j, h in obj}} 
            <app-widget-tab-tab_btn style="width: 103px;height:48px;margin:0 1px;display:inline-block" on-tap='tabChange("{{j}}")'>
                {"layout":0,"bType":1,"cfg":{"text":{{h}},"type":"border","type_m":"normal","fontSize":24},"select":{{j == it1.tabSwitch}},"type":{{j == it1.tabSwitch? "border active":"border"}} }
            </app-widget-tab-tab_btn>
            {{end}}
        </div>


        <widget  w-tag="app_a-widget-pic_text-pic_text" w-class="48" style="top:-34px;left:260px;margin:0;">
            {"icon":"little_tips_bg","text":"积分{{it1.flush_min_score}}可进入精英榜","width":228,"height":24} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:-34px;left:252px;">
            {"icon":"remind"} 
        </widget>




        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">
            {"line":"line_7"} 
        </widget>


        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6" style="height:532px">
            {"bgName":"bg_frame21"} 
        </widget>
        <widget  w-class="7" w-tag="app_a-widget-rank-rank_title">
            {"keys":["排名","姓名","积分","奖励"],"split":[22,22,22,34],"padding":5,"fontSize":20,"va":"","space":0}
        </widget>
        
        <div style="position:absolute;padding:15px 0 10px;top:50px;left:3px;height:450px;">
            <div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:100%;padding-left: 4px;">
                {{let data = it1.rankData[it1.tabSwitch].list}}
                {{if data.length}}
                {{for k,v of data}}
                    {{if it1.tabSwitch=="normal" || (it1.tabSwitch=="plush" && v.score >= it1.flush_min_score)}}
                    <div style="position: relative; width: 478px; height: 110px;margin-bottom:10px;">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 478px;height: 110px;z-index:0;left: 0;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch>

                        {{if player.role_id == v.detail.role_id}}
                        <app_a-widget-pic_other-pic_other style="position: absolute;left: 0px;width: 478px;height:110px">
                            {"icon":"my_rank_bg"}
                        </app_a-widget-pic_other-pic_other>
                        {{end}}

                        {{if k <3}}
                        <widget w-class="14" w-tag="app_a-widget-rank-rank_num" >
                            {"num":{{k-0+1}} }
                        </widget>
                        {{else}}
                        <div w-class="74">
                           {{k-0+1}}
                        </div>
                        {{end}}
                        
    
                        <widget w-class="15" w-tag="app_a-widget-line-line" >
                            {"line":"line_9"} 
                        </widget>

                        {{let img = ""}}
                        {{if player.head && player.head.indexOf("undefined") < 0 }}
                        {{:img = player.head}}
                        {{else}}
                        {{:img = Pi.pictures['playerhead'+player.sex] }}
                        {{end}}

                        <widget w-class="16" w-tag="app_a-widget-head-friend">
                            {"url":"app/scene_res/res/playerhead/playerhead700001.png","top":23.5,"level":0,"width":100,"height":100,"level":{{v.detail.level}}}    
                        </widget>
                        <div w-class="13">
                            <widget w-tag="app_a-widget-text-text" >
                                {"text":{{typeof(v.detail.name)=="string" ? v.detail.name : Common.fromCharCode(v.detail.name)}},"show":"","space":0,"fontSize":18,"lineHeight":20,"textCfg":"heroEquip"} 
                            </widget>
                        </div>
                        <span w-class="17">{{Math.ceil(v.score)}}</span>
                        
                        <div class="shadow" w-class="18">
                            <div style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 70px;">
                                {{for j,p of it1.award[it1.tabSwitch][it1.currLevel].rank[it1.award_fun(k)]}}
                                {{let prop = Pi.sample[p[0]]}}
                                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                {{let url = Pi.pictures[icon]}}                
                                <widget style="display:inline-block;position:relative" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{p[0]}})">
                                    {"width":54,"height":54,"prop":{{prop}},"url":{{url}},"count":{{p[1]}},"bg":0,"name":"none","right":7,"top":21} 
                                </widget>
                                {{end}}
                            </div>
                        </div>                              
                    </div>
                    {{end}}   
                {{end}}  
                {{else}} 
                <div style="line-height:450px;text-align:center;width: 450px;color: #fff;font-size: 18px;">
                    暂无排名信息
                </div>
                {{end}}
            </div>
        </div>
        <div w-class="46">
            <div style="position:absolute;left:0;top:0;">
                <div>我的积分: <span w-class="47">{{Math.ceil(it1.rankData[it1.tabSwitch].ownRank.score)}}</span></div>
                <div>我的排名: <span w-class="47">{{own_index ? own_index: '无'}}</span></div>
                <div style="position:relative">
                    我的奖励:<span w-class="47">{{own_index ? "": '无'}}</span>
                    {{if own_index}}
                    <div class="shadow" w-class="18" style="top:30px;left:0;">
                        <div w-class="47"  style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 70px;">
                            {{for j,p of it1.award[it1.tabSwitch][it1.currLevel].rank[award_level]}}
                            {{let prop = Pi.sample[p[0]]}}
                            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                            {{let url = Pi.pictures[icon]}}
            
                            <widget style="display:inline-block;position:relative" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{p[0]}})">
                                {"width":60,"height":60,"prop":{{prop}},"url":{{url}},"count":{{p[1]}},"bg":0,"name":"none","right":7,"top":21} 
                            </widget>
                            {{end}}
                        </div>
                    </div>
                    {{end}}
                </div>
            </div>

            <div style="position:absolute;left:252px;top:0;">
                {{if next == 0 && (it1.tabSwitch==="normal" || (it1.tabSwitch=="plush" && it1.rankData[it1.tabSwitch].ownRank.score >= it1.flush_min_score)) }}
                <widget w-tag="app_a-widget-text-text" >
                    {"text":"无敌是多么寂寞","show":"","space":-3,"fontSize":20,"lineHeight":20,"textCfg":"onlineGift"} 
                </widget> 
                {{elseif next != 0 }}
               
                    {{let _data = it1.rankData[it1.tabSwitch].list}}
                    {{let score = _data[next-1]? (_data[next-1].score+1) : 1}}
                    {{if it1.tabSwitch=="plush" && it1.rankData[it1.tabSwitch].ownRank.score < it1.flush_min_score}}
                        {{: score = it1.flush_min_score}}
                    {{end}}
                    {{:console.log(next,_data)}}
                    {{:console.log(score)}}
                    <div>目标积分: <span w-class="47">{{Math.ceil(score)}}</span></div>
                    <div>目标排名: <span w-class="47">{{next}}</span></div>
                    <div style="position:relative">
                        目标奖励:
                        <div class="shadow" w-class="18" style="top:30px;left:0;">
                            <div w-class="47" style="width: 100%;overflow-x: auto;overflow-y: hidden;position: absolute;height: 70px;">
                                {{for j,p of it1.award[it1.tabSwitch][it1.currLevel].rank[it1.award_fun(next - 1)]}}
                                {{let prop = Pi.sample[p[0]]}}
                                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                                {{let url = Pi.pictures[icon]}}
                
                                <widget style="display:inline-block;position:relative" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{p[0]}})">
                                    {"width":60,"height":60,"prop":{{prop}},"url":{{url}},"count":{{p[1]}},"bg":0,"name":"none","right":7,"top":21} 
                                </widget>
                                {{end}}
                            </div>
                        </div>
                    </div>
                {{end}}
            </div>
        </div>   
        <widget  w-tag="app_a-widget-pic_text-pic_text" w-class="48">
            {"icon":"little_tips_bg","text":"每日排行奖励将通过邮件发放","width":258,"height":24} 
        </widget>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:702px;left:121px;">
            {"icon":"remind"} 
        </widget>
    </div>
    

    
</div>