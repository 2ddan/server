<div maxId="45" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
        {"text":"藏宝阁","coin":["money","diamond",150005],"type":"contribute","left":30,"top":15,"width":540,"width":{{root.getWidth()}}} 
    </widget>

    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">{"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame21"} 
        </widget>
        <div style="position: absolute;width: 490px;left: 50%;margin-left: -245px;top:705px;height: 60px;font-family: mnjsh;">
            <div style="position: absolute;width: 180px;display: flex;justify-content:space-between;top: 0px;left: 50%;margin-left: -90px;text-align: center;">
                <div style="width:85px;line-height: 30px;color:#ffd8a6;">我的贡献:</div>
                <app_a-widget-coin-coin style="width:90px;text-align: left;color:#51e650;">
                    {"icon":"contribute","text":{{[it1.gang_contribute]}},"height":30,"width":30}
                </app_a-widget-coin-coin>
            </div>
            <div style="position: absolute;text-align:left;width:150px;height: 23px;bottom: 0px;color:#ffd8a6;left: 50%;margin-left: -75px;">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 200px;left: 0;">
                    {"icon":"little_tips_bg","text":"每天0点刷新商店","width":162,"height":23,"top":2} 
                </widget>
                <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
        </div>

        
        <div w-class="9" w-sid="9">
            <div w-class="15" w-sid="15">
                {{let list = it.shopSort()}}
                {{for k, v of list}}
                {{if (v.type !=2) || !it1.gangData.gang_reward_record[v.id]}}
                <div w-class="10" w-sid="10" style="text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
                    <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">{"bgName":"bg_frame19"} 
                    </widget>

                    <div w-class="41" w-sid="41">
                        {{if v.cost.spend_contribute}}
                        <widget w-class="40" w-tag="app_a-widget-coin-coin" w-sid="40">
                            {"icon":"contribute","width":25,"height":21,"left":3,"text":{{[v.cost.spend_contribute[1]]}},"color":"#f0f0f0"} 
                        </widget>
                        {{elseif v.cost.spend_diamond}}
                        <widget w-class="40" w-tag="app_a-widget-coin-coin" w-sid="40">
                            {"icon":"diamond","width":25,"height":21,"left":3,"text":{{[v.cost.spend_diamond]}},"color":"#f0f0f0"} 
                        </widget>
                        {{end}}
                    </div>
                    {{let prop = it1.Pi.sample[v.prop[0]]}}
                    {{if prop.type !== "equip"}}
                    
                        {{let img = it1.Pi.pictures[prop.icon]}}
                        <widget w-class="30" on-tap='showPropInfo("{{v.prop[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":76,"height":76,"prop":{{prop}},"url":{{img}},"count":{{v.prop[1]}},"name":"none","bg":0} 
                        </widget>
                        <widget w-class="44" w-tag="app_a-widget-text-text" w-sid="44">{"text":{{prop.name}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                        </widget>

                    {{else}}
    
                        {{let module = prop.module[prop.career_id.indexOf(career_id)][0] }}
                        {{let img = it1.Pi.pictures[module] }}
                        <widget w-class="30" on-tap='showPropInfo("{{v.prop[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":76,"height":76,"prop":{{prop}},"url":{{img}},"count":{{v.prop[1]}},"name":"none","bg":0} 
                        </widget>
                        <widget w-class="44" w-tag="app_a-widget-text-text" w-sid="44">{"text":{{prop.name[prop.career_id.indexOf(career_id)]}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                        </widget>

                    {{end}}

                    <span w-class="17" w-sid="17">{{prop.describe}}</span>

                    {{%%藏宝阁等级限制}}
                    {{if it1.gangExpandData.build_level_info[1] < v.limit.build_level}}
                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;right: 36px;top:50%;margin-top:-15px;">
                        {"width":128,"height":30,"align":"center","marginLeft":3,"text":{{"商店"+v.limit.build_level+"级解锁"}},"textCfg":"levelLimit","space":-5,"fontSize":20,"top":0,"left":0} 
                    </widget>
                    {{elseif (it1.gangData.gang_reward_record[v.id] || 0) >= v.limit.daily_limit}}
                    <app_a-widget-pic_text-pic_text style="position:absolute;right: 55px;top: 32px;">
                        {"icon":"sell_over","width":93,"height":60,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"top":0,"left":0}
                    </app_a-widget-pic_text-pic_text>
                    {{else}}
                    <div w-class="43" w-sid="43" style="right: 30px;">
                        <span w-class="18" w-sid="18">限购({{(it1.gangData.gang_reward_record[v.id] || 0) + "/" + v.limit.daily_limit}})</span>
                    </div>
                    <widget w-class="42" w-tag="app_a-widget-btn-rect" w-sid="42" on-tap="buyProp({{v.id}})" style="right: 40px;">
                        {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"购 买","width":116,"height":45} 
                    </widget>
                    {{end}}
                    
                    {{if (v.type == 2)}}
                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;right: 36px;bottom: 12px;margin-top:-15px;">
                        {"width":128,"height":30,"align":"center","marginLeft":3,"text":{{"[" + "限购一次]"}},"textCfg":"levelLimit","space":-5,"fontSize":20,"top":0,"left":0} 
                    </widget>
                    {{end}}
                </div>
                {{end}}
                {{end}}
            </div>
        </div>
    </div>
</div>