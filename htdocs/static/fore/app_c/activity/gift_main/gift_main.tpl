{{let Common = _get("app/mod/common").exports.Common}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let dt= _get("app/mod/db").exports.data}}

<div style="position:absolute;width: 100%;top:0;bottom:0;z-index: 2">

    <div style="position: absolute;top: 4px;left: 50%;transform: translateX(-50%);width:100%;text-align:center;color: rgb(253,237,215);font-size: 15px;">每日可领取一次当前VIP等级的礼包</div>
    <div data-desc="奖励列表" list scroller="1" style="position: absolute;width: 105%;overflow-y: auto;overflow-x: hidden;z-index: 1;top:22px;bottom: 0;">
    {{let arr = [0,1,2]}}
    {{for i,o of arr}}
        {{if !o || it1.vipUpNeed[dt.player.vip+o] }}
        <div style="position:relative;width:420px;height:96px;left:0;margin-bottom:10px;">
            <app-widget-text-text style="position:absolute;top:5px;left:25px;;">{"text":"VIP{{dt.player.vip+o}}每日专属礼包","textCfg":"actName","fontSize":16.49}</app-widget-text-text>
            
            <div style="position:absolute;top:33px;left:32px;height:54px;width:270px;overflow:hidden;">
                <div scroller="1" style="position:absolute;top: 0;height:75px;width:100%;overflow-y:hidden;overflow-x:auto;white-space:nowrap;">
                    {{for k,v of it1.dailyData[dt.player.vip+o].goods}}
                    {{if k==0}}
                    <div on-tap="propInfoShow(100001)" style="width:52px;height:52px;display:inline-block;font-size:16px;margin:0 17px 0 0;position:relative;z-index:2;">
                        {{Pi.sample["100001"]}}
                    </div>
                    {{end}}
                    <div style="width:52px;height:52px;position:relative;margin:0 17px 0 0;display:inline-block" on-tap="propInfoShow({{v[0]}})">
                        {{Pi.sample[v[0]]}}
                    </div>
                    {{end}}
                </div>
            </div>
            {{if !it1.vip_state && !o}}
            <app-widget-btn-vein style="width:85px;height:35px;right:25px;top:30px;font-size:19px;" on-tap="getDailyGift">{"class":2,"text":"领取"}</app-widget-btn-vein>
            {{elseif o}}
            <app-widget-btn-vein style="width:85px;height:35px;right:25px;top:30px;font-size:19px;" on-tap="gotoRecharge">{"text":"充值"}</app-widget-btn-vein>
            {{else}}
            <div class="blue_bed" style="right:25px;top:30px;font-size:19px;">已领取</div>
            {{end}}
        </div>
        {{end}}
    {{end}}
    </div>
    <div class="shadow" style="position: absolute;top: 431px;width: 100%; text-align: center;color: rgb(253,237,215);font-size: 15px;">每日可领取一次当前VIP等级的礼包</div>
</div>