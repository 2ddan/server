<div maxId="24" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let list = it1.shopList}}
    {{let cfg_base = it1.cfg_base[it1.shopType]}}
    {{let cfg_price = it1.cfg_price[it1.shopType]}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let career_id = player.career_id}}
    <div w-class="bg"></div>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback('app_c-shop-type_1')"></div>
	<widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
		{"text":"商 店","coin":["money","diamond"],"left":15,"top":10,"r":[["money",0],["dimond",0],["dimond",0]],"type":""} 
    </widget>
    
    <div style="position:absolute;width:540px;height:100%;left:50%;transform:translate(-50%)">
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
            {"icon":"tips_top"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">
            {"icon":"tips_bottom"} 
        </widget>
        <widget w-class="8" w-tag="app_a-widget-bg_frame-bg" w-sid="8">
            {"bgName":"bg_frame25"} 
        </widget>
        <app_a-widget-pic_other-pic_other w-class="11" w-sid="11">
            {"icon":"lantern"}
        </app_a-widget-pic_other-pic_other>
        <div class="shadow12" w-class="11" style="left:8px;top:120px;text-align:center;color:#542724;font-family:mnjsh;" on-tap="openVipDiscount">
            <app_a-widget-pic_text-pic_text>
                {"icon":"shop_discount_bg","width":41,"height":154,"align":"center","text":" "} 
            </app_a-widget-pic_text-pic_text>
            <div class="center_h" style="font-size:21.23px;top: 31px;left: 3px;">VIP</div>
            <div class="center_h" style="font-size:20px;top: 52px;width: 16px;">折扣</div>
        </div>
        

        <app_a-widget-pic_other-pic_other w-class="12" w-sid="12">
            {"icon":"lamp"}
        </app_a-widget-pic_other-pic_other>

        <widget w-class="20" w-tag="app_a-widget-pic_other-pic_other" w-sid="20">
            {"icon":"butterfly"} 
        </widget>
        
        <div w-class="23" w-sid="23">
            {{let len = list.length}}
            {{let i = 0}}
            {{while i < len}}
                {{let v = list[i]}}
                {{let cfg = cfg_price[v[0]]}}
                {{let prop = it1.pi.sample[cfg.prop[0]]}}
                {{let vip_discount = it1.vip_advantage[player.vip].discount}}
                <div w-class="22" w-sid="22">
                    {{if vip_discount && vip_discount!=100}}
                    <div style="position: absolute;right: -1px;top: -5px;z-index: 3;">
                        <app_a-widget-pic_text-pic_text>
                            {"icon":"shop_vip_discount","width":64,"height":77,"align":"center","text":" "} 
                        </app_a-widget-pic_text-pic_text>
                        <div class="shadow7" style="color:#fff;font-size:16px;font-family:mnjsh;transform:rotate(45deg);position: absolute;top: 20px;right: -7px;">VIP-{{100-vip_discount}}%</div>
                    </div>
                    
                    {{end}}
                    <app_a-widget-img_stitch-stitch style="position: absolute;width: 138px;height: 186px;">{"type":2,"height":20,"width":30}</app_a-widget-img_stitch-stitch>
                    <img src="./images/shop_bg1.png" style="position: absolute;width: 145px;height: 194px;top:-5px;left:-5px;z-index:2"/>
                    {{if prop.type !== "equip"}}
                    <widget on-tap="propInfoShow({{prop.sid}})" w-class="16" w-tag="app_a-widget-prop-base" w-sid="16">
                        {"prop":{{prop}},"url":{{it1.pi.pictures[prop.icon]}},"color":"#ffeee2","count":{{cfg.prop[1]}},"width":91,"height":92,"name":{{prop.name}}}
                    </widget>
                    {{else}}

                    {{let module = prop ? (prop.module[prop.career_id.indexOf(career_id)][0] ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.module[prop.career_id.indexOf(career_id)][0]): ''}}
                    {{let img = prop?Pi.pictures[module]:""}}
                    <widget on-tap="propInfoShow({{prop.id}})" w-class="16" w-tag="app_a-widget-prop-base" w-sid="16">
                        {"prop":{{prop}},"url":{{img}},"color":"#ffeee2","count":"none","width":91,"height":92,"name":{{prop.name[prop.career_id.indexOf(career_id)]}} }
                    </widget>
                    <div w-class="25" >{{"Lv"+prop.level[1] || 20}}</div>
                    {{end}}

                    {{if cfg.discount}}
                        <widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
                        {"icon":"discount_bg"} 
                        </widget>
                        <div w-class="c151098945976741 ">{{cfg.discount}}折</div>
                    {{end}}
                    {{let icon = "diamond",coin = cfg.diamond}}
                    {{if cfg.diamond}}
                    {{:icon = "diamond"}}{{:coin = cfg.diamond}}
                    {{end}}
                    {{if cfg.money}}
                    {{:icon = "money"}}{{:coin = cfg.money}}
                    {{end}}
                    {{if cfg.coin}}
                    代币：{{cfg.coin}}
                    {{end}}
                    {{if v[1] === 0}}
                        {{if vip_discount && vip_discount!=100 }}
                        <div style="width:85px;height:35px;" on-tap="buy({{v[0]}},{{i}})">
                            <widget  w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
                                {"class":"hl","fontsize":20,"color":"#fdedd7;","text":" ","width":85,"height":35} 
                            </widget>
                            <widget w-class="18" w-tag="app_a-widget-coin-coin" w-sid="18" style="top:131px;z-index:3;">
                                {"icon":{{icon}},"width":23,"height":18,"left":4,"text":[{{Math.ceil(coin*vip_discount/100)}}],"color":"#FFD7A8"} 
                            </widget>
                        </div>
                        <div class="shadow7" style="z-index:3;overflow: hidden;position: absolute;bottom: 7px; width: 100%;height: 20px;text-align: center;"> 
                            <span style="font-family:mnjsh;color:#ffd8a6;font-size:18px;">原价:</span>
                            <div style="display:inline-block;position: relative;padding: 0 5px 0 4px;">
                                <widget class="shadow1" w-tag="app_a-widget-coin-coin" style="top: 0px;color: rgb(255, 215, 168);width: auto; height: 23px;position: relative;">
                                    {"icon":{{icon}},"width":23,"height":18,"text":[{{cfg.discount ? coin*10/cfg.discount : coin}}],"color":"#FFD7A8"} 
                                </widget>
                                <widget w-tag="app_a-widget-line-line" style="position:absolute;top: 12px;left:0px;height:3px;width:100%;">
                                    {"line":"line_15"} 
                                </widget>
                            </div>
                        </div>
                        
                        {{else}}
                        <widget on-tap="buy({{v[0]}},{{i}})" w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
                            {"class":"hl","fontsize":20,"color":"#fdedd7;","text":"购  买","width":85,"height":35} 
                        </widget>
                        <widget w-class="18" w-tag="app_a-widget-coin-coin" w-sid="18">
                            {"icon":{{icon}},"width":23,"height":18,"left":4,"text":[{{coin}}],"color":"#FFD7A8"} 
                        </widget>
                        {{end}}
                    {{else}}
                    <widget style="left:24px;top:115px;position:absolute" w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":"sell_over","width":93,"height":60}
                    </widget>

                {{end}}
                </div>
                {{: i = i+1}}
            {{end}}
        </div>

        <div style="position:absolute;left:339px;top:802px;width:110px;height:60px;">
            <widget w-class="14" w-sid="14" w-tag="app_a-widget-btn-rect" on-tap="refresh({{JSON.stringify(it1.cost ? it1.cost : 0)}})">
                {"class":"default","fontsize":24,"color":"#f7f2ef;","text":"刷    新","width":116,"height":45}</widget>
            {{if !it1.cost}}
                <div w-class="c1510990486152158 ">免 费</div>
            {{else}}
                {{if it1.cost[0] === "money" || it1.cost[0] === "diamond"}}
                {{let has = player[it1.cost[0]]}}
                <widget w-class="24" w-tag="app_a-widget-coin-coin" w-sid="24">
                    {"icon":"{{it1.cost[0]}}","width":25,"height":21,"left":3,"text":[{{it1.cost[1]}}],"color":{{has >= it1.cost[1] ? '#00ffff' : '#ff0000'}} } 
                </widget>
                {{else}}
                    {{ prop = it1.cost[0] > 0 ? it1.pi.sample[it1.cost[0]] : it1.cost[0]}}
                    {{let has = prop.count || 0}}
                    <div style="position:absolute;width:110px;height:24px;top:45px;">
                        <app-widget-prop-base_prop-base_prop style="position:relative;display:inline-block;width:24px;height:24px;top:21px;">
                            {"prop":{{prop}},"url":{{it1.pi.pictures[prop.icon]}},"color":"#ffffff","level":1}
                        </app-widget-prop-base_prop-base_prop>
                        <div style="display:inline-block;color:#{{has>=it1.cost[1]?'0ff':'f00'}};">{{it1.cost[1]}}</div>
                    </div>
                {{end}}
            {{end}}
        </div>

        <div w-class="text" style="top:802px;">今日免费刷新次数：
        <span style="color:#51e650;">{{it1.free - appCfg.shop.all_refresh_times[it1.shopType-1] <= 0 ? 0 : it1.free - appCfg.shop.all_refresh_times[it1.shopType-1]}}/{{it1.free}}</span>
        </div>
        <div w-class="text" style="top:828px;">下次自动刷新时间：{{it1.refresh_time}}点</div>
    </div>
</div>