{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let activity_list = _get("cfg/c/activity_list").exports.activity_list}}
{{let player = _get("app/mod/db").exports.data.player}}
{{let career_id = player.career_id}}

{{let activity = activity_list[101]}} 
{{let time = Common_m.changeTimeToDate(activity["delay_date"],activity["time_type"])}}
<div maxId="57" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"宝石迷阵","coin":["money","diamond"],"left":12,"top":16,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}}
    </widget>
    
    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">
            {"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="7">
            <widget  w-tag="app_a-widget-rank-rank_title" style="position: absolute;width: 100%;height: 68px;">
                {"keys":"","height":68}
            </widget>
            <div  w-class="19">活动截止时间：{{time[0]}}年{{time[1]}}月{{time[2]}}日24:00</div>
            <div w-class="20">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;margin-left: -92px;">
                    {"icon":"name_bg_2","width":184,"height":32} 
                </widget>
                <span style="position: relative;">我的积分:</span><span style="color:#35e04d;position: relative;">{{Math.ceil(it1.gemData.score)}}</span>
            </div>
            <app_a-widget-btn_pic-btn_pic style="position:absolute;right:12px;top:17px;" on-tap="getHelp">
                {"icon":"look_info"}
            </app_a-widget-btn_pic-btn_pic>
        </div>
        
        <div w-class="9" w-sid="9">
            <div w-class="24" >
                <img style="vertical-align: middle;margin-top: -4px;margin-right: 5px;" src="./images/gem_num.png" />
                数量：{{it1.gemData.gem}}
            </div>
            {{let arr = [[0,0],[126,0],[252,0],[378,0],[0,122],[378,122],[0,244],[378,244],[0,366],[126,366],[252,366],[378,366]] }}
            
            <div data-desc="连线周围物品" w-class="25">
                {{for j, g of it1.gemData.goods}}
                {{if j!="erl_type"}}
                {{let id = (g[0][0] == "money" ? 100001 : g[0][0])}}
                {{let prop = Pi.sample[id]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = Pi.pictures[icon]}}
                <div w-class="28" style="left:{{arr[j][0]}}px;top:{{arr[j][1]}}px">
                    <widget w-class="26" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{id}})">
                        {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":"none","bg":0,"name":"none"} 
                    </widget>
                    <div w-class="27">
                        <app_a-widget-text-text>
                            {"text":"积分:{{Math.ceil(g[1]*g[0][1])}}","textCfg":"heroEquip","fontSize":18,"space":1}
                        </app_a-widget-text-text>
                    </div>
                    {{if it1.gemData.use_goods[1][j]}}
                    <app_a-widget-pic_text-pic_text style="position: absolute;left: -5px;top: 7px;z-index: 2;">
                        {"icon":"text_get_1","width":93,"height":63,"top":0,"left":0}
                    </app_a-widget-pic_text-pic_text>
                    {{end}}
                </div>
                {{end}} 
                {{end}} 

                {{if it1.state == "gem_line_success"}}
                {{for j, g of it1.rewardAnim_pos}}
                {{if j!="erl_type"}}
                <div w-class="gem_prop_p{{g}}" style="position: absolute;width: 74px;height: 74px;z-index: 3;">
                    <div w="app-widget-anim-class" style="position: absolute;left: -97px; top: -97px;transform: scale(0.3);">
                    </div>
                </div>
                {{end}}
                {{end}}
                {{end}}
            </div>

            <div data-desc="宝石连线" w-class="49">
                {{let arr1 = [[124,86],[236,86],[71,132],[181,132],[291,132],[124,179],[236,179],[71,225],[181,225],[291,225],[124,271],[236,271]] }}                    
                {{for j, g of it1.gemData.gem_pos}} 
                {{if j!="erl_type"}}
                <div w-class="50 {{59-0+j}}"  on-tap="{{if !g}} turnClick({{j}}) {{end}}">
                    {{if g}}
                    <img w-class="51" src="./images/gem_light.png"/>
                    {{end}}
                </div> 
                
                {{if it1.gemData.gem_stack[j]}}
                <div data-desc="围起来的物品" style="width:24px;height:24px;position:absolute;left:{{arr1[j][0]}}px;top:{{arr1[j][1]}}px">
                    <img src="./images/gem.png"/>
                </div>
                {{end}}
                {{end}}
                {{end}}

                {{for i, v of it1.gemData.use_goods[0]}}
                <div data-desc="线" w-class="{{if v}}73{{else}}72{{end}} {{53-0+i}}  52"></div>
                {{end}}    


                {{if it1.state == "gem_line_success"}}
                {{for m, n  of it1.gemAnim_pos}}
                <div w-class="gem_p{{n}}" style="position: absolute;">
                    <div w="app-widget-anim-class" ev-anim_in="animBack" style="transform: scale(0.75)">
                    </div>
                </div>
                {{end}}
                {{end}}
            </div>

            {{if it1.gemAddState == 'gem_add'}}
            <div w="app-widget-anim-class" ev-anim_in="animBack" style="display: inline-block;width: 0px;height: 0px;">
            </div>
            {{end}}


        </div>  
    </div>

    <div w-class="21">
        <div  w-class="22" on-tap="openAward" >
            <img src="app_b/widget/icons/menu_shop_icon.png"/>
            <widget w-class="23" w-tag="app_a-widget-text-text" >
                {"text":"领 奖","textCfg":"gangCoverTitle","space":0,"fontSize":20} 
            </widget>
        </div>
        <div  w-class="22" on-tap="rankClick" style="left:87px" >
            <img src="app_b/widget/icons/menu_shop_icon.png"/>
            <widget w-class="23" w-tag="app_a-widget-text-text" >
                {"text":"排行榜","textCfg":"gangCoverTitle","space":0,"fontSize":20} 
            </widget>
        </div>

        <app_a-widget-btn-rect  on-tap="resetClick" style="position:relative;left: 315px;top: 19px;">
            {"text":"重 置","class":"hl","fontSize":24,"width":116,"height":45}
        </app_a-widget-btn-rect>
        
    </div>
</div>