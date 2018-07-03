<div data-desc="摇钱树" id="money_tree" style="position: absolute;width: 540px;height: 642px;left: 50%;margin-left: -270px;z-index: 2">
    {{let Util = _get("app/mod/util").exports.Util}}
    {{let info = it1.moneyTreeInfo}}
    {{let price = it1.MoneyTreeBuyPrice.price}}
    {{let cfg = it1.MoneyTreeBoxAward.cfg}}
    {{let _curr = cfg[it1.dayTime%cfg.length]}}
    <app_a-widget-bg_frame-bg style="position: absolute;left: 24px;top: 0px;width: 496px;height: 642px;">
        {"bgName":"bg_frame21"} 
    </app_a-widget-bg_frame-bg>

    {{let can_buy = it1.vip_advantage[it1.player.vip].daily_money_treeTimes}}
    {{%%let color = (info.buy_count>=can_buy && it1.moneyTreeInfo.free_config[0] == it1.surplus) ?"disabled":"hl"}}
    <app_a-widget-btn-rect on-tap="toShake" style="position: absolute;left: 214px;top: 554px;">
        {"class":"hl","fontsize":23,"color":"#fdedd7;","text":"摇一摇","width":116,"height":45,"marginLeft":0} 
    </app_a-widget-btn-rect>
        
    <app_a-widget-rank-rank_title style="position: absolute;left: 25px;top: 0px;width: 495px;height: 68px;">
        {"height":68} 
    </app_a-widget-rank-rank_title>

    <div style="position: absolute;left: 25px;top: 0px;width: 495px;height: 68px;">
        <img src="./images/money_tree_title.png" style="position:absolute;left: -21px;top: -36px;pointer-events: none;" />
        <app_a-widget-text-text style="position: absolute;left: 0px;right: 0px;margin: 0 auto;top: 22px;">
            {"text":"本次最低获得{{it1.MoneyTree_Award[it1.player.level-1].money}}银两","fontSize":21,"textCfg":"activityBorRed","space":-4 }
        </app_a-widget-text-text>
    </div>

    {{let scale = (info.count/_curr.limit_count[2]) * 100}}
    <app_a-widget-bar-bar2  style="top: 501px;height: 18px;width: 418px;left: 0px;right: 0px;margin: 0 auto;position:absolute;">
        {"progress":{{scale}},"text":"","lineHeight":18,"fontSize":14,"split":[25,50,95]}
    </app_a-widget-bar-bar2>

    {{if it1.move}}
    {{let i = 0}}
    {{let str = it1.move + ""}}
    <div id = "crit" data-desc="暴击" class="center_h" style="white-space:nowrap;top:138px;text-align:center;z-index: 1;width:100%;white-space:nowrap;animation:goodsTip 2s forwards;">
        <img src="app_c/activity/images/money_tree/money_tree_crit.png"/>
        {{while i < str.length}}
            <img src="app_c/activity/images/money_tree/money_tree_{{str[i]}}.png"/>
            {{: i++}}
        {{end}}
        
        <img src="app_c/activity/images/money_tree/money_tree_bei.png"/>
    </div>
    {{end}}
    <app-scene-base-scene style="pointer-events: none;pointer-events: none;width: 100%;position: absolute;top: 340px;left: 50%;margin-left: -270px;">{"name":"uiscene","type":"effect","module":"" }</app-scene-base-scene>
    
    <div data-desc="摇钱树宝箱" style="position:absolute;bottom:90px;height:80px;width:415px;text-align:center;left: 50%;margin-left: -207px;">
        {{for i, v of [0,1,2]}}
        <div w-class="mis_gem_box{{v+1}}" style="z-index:1;width:80px;height:80px;font-size:12px;top:-23px;">
            {{let get = info.count >= _curr.limit_count[v] ? 1 : 0}}

            {{let state = info.box[v] ? "open" : (get ? "opened" : "")}}
            <app_a-widget-box-box on-tap='showBox("{{v}},{{state}}")' style="position:absolute;top: -20px;left: 2px;">
                {"type":1,"state":{{state}},"bglight":{{(state == 'open') ? 1 :0}},"width":80,"height":80,"tip_keys":[{{"daily_act.money_tree.box_"+i}}]}
            </app_a-widget-box-box>

            <div class="shadow7" style="position:absolute;bottom:-22px;text-align:center;width:100%;color:#f3d6af;font-size: 18px">{{_curr.limit_count[v]}}</div>
        </div>
        {{end}}
     </div>

    <div style="position: absolute;bottom: 22px;;width: 100%;z-index: 5;text-align: center;">
        <div style="font-size:14px;color:#fff;height:20px;">
            {{let len = price.length-1}}
            {{let p = price[info.buy_count>len?len:info.buy_count]}}
            <div style="width:100%;margin-top: -2px;">
                {{if ( Util.serverTime(true) < it1.end_time && info.free_config[0] >info.surplus) || (info.free_config[0] <= info.surplus) }}
                <div style="display:inline-block;">
                    <span style="color:#fde7ca">消耗</span>
                    {{let url = it1.Pi.pictures[it1.Pi.sample[100002].icon]}}
                    <img style="width: 18px;vertical-align: middle; margin-top: -3px;" src={{url}}/>
                    {{p}}({{can_buy-info.buy_count}}/{{can_buy}})
                </div>
                {{else}}
                    {{let c = info.free_config[0]-info.surplus}}
                    <span style="color:#fde7ca">免费:</span><span style="padding:0 3px;color:#fff">{{c}}/{{info.free_config[0]}}</span>
                {{end}}
            </div>
            {{if Util.serverTime(true) < it1.end_time && info.surplus < info.free_config[0]}}
            <div style="width:100%;position:absolute;bottom:-17px;">
                <app-widget-cdtime ev-countdownend="cdEnd" style="display:inline-block">
                     {"cd_time":{{it1.end_time * 1000}},"now_time":{{Util.serverTime()}} }
                </app-widget-cdtime>
                &nbsp;后免费
            </div>
            {{end}}
        </div> 
    </div> 
    <div style="position: absolute;bottom: 210px;;left:0;white-space:nowrap;font-size:18px;font-family:mnjsh;color:#fde7ca;width: 100%;text-align: center;">
        已摇次数：{{info.count || 0}}
    </div>  
</div>