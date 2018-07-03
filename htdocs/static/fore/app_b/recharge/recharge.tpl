<div maxId="10" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2;" w-sid="2">
    {{let root = _get("pi/ui/root").exports}}
    
	<widget w-tag="app_b-widget-title-title" w-class="4" w-sid="4">
		{"text":"充 值","coin":["money","diamond"],"left":32,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
    </widget>
    <div  w-class="8">
        <div w-class="9" on-tap="vipDetail" >
            <img style=" position: absolute;top:0;left:0" src="./images/recharge_power.png"/>
            <div w-class="10">
                查看特权
            </div>
        </div>
        <div w-class="11">
            <div w-class="12" class="shadow6">
                再充值
                <widget w-class="13" w-tag="app_a-widget-text-text">
					{"text":{{(it1.vipUpNeed-it1.vip_exp)/10}},"textCfg":"rechargeGreen"} 
				</widget>
                元,即可成为
                <widget w-class="13" w-tag="app_a-widget-text-text">
					{"text":{{"VIP"+(it1.vip_level-0+1)}},"fontSize":20,"textCfg":"activity"} 
				</widget>
            </div>
            <div w-class="14">
                <app_a-widget-pic_text-pic_text style="left: 0;top: -10px;position: absolute;">
                    {"icon":"vip_bg","width":82,"height":37,"text":{{"VIP"+it1.vip_level}},"textCfg":"activity","fontSize":20,"top":7,"left":0}
                </app_a-widget-pic_text-pic_text>

                {{let percent = (it1.vip_exp/it1.vipUpNeed)*100}}
                {{let text = it1.vip_exp+"/"+it1.vipUpNeed}}
                <app_a-widget-bar-bar2  class="shadow6" style="height: 20px;width: 220px;left: 75px;top:0;position:absolute;font-family:'黑体'">
                    {"progress":{{percent}},"text":{{text}},"lineHeight":20,"fontSize":18}
                </app_a-widget-bar-bar2>
                <img style="height: 16px;width: 218px;left: 76px;top: 1px;position: absolute;z-index: 2;" src="./images/bar_border.png" />                
            </div>
        </div>
    </div>

	<div style="width:100%;position:absolute;left:50%;top:195px;bottom:83px;margin-left:-270px;">
		<div class="line_6" style="position: absolute; top: -14px; z-index: 4;left: 0;width: 540px;"></div>			
		<widget w-class="5" w-tag="app_a-widget-bg_frame-bg" >
			{"bgName":"bg_frame21"} 
		</widget>
		<div w-class="6" >
			<div  scroller="1" w-class="7" >
                {{for i,v of it1.card}}
                {{let str = i ? "month" : "week"}}
                {{let data = it1.vipcard[i?0:1]}}
                
                <div on-tap="gotoCard" w-class="15">
                    <app_a-widget-pic_other-pic_other style="position: absolute;width: 114px;height: 117px;left: 14px;top:14px;">
                        {"icon":"bg_light"}
                    </app_a-widget-pic_other-pic_other>
                    <img data-desc="边框" style="position:absolute;left:0;top:0;z-index:2" src="./images/{{str}}_bg.png"/>
                    <div style="position:absolute;left:-2px;top:-2px;z-index: 2;">
                        <app_a-widget-pic_text-pic_text style="left: 0;top: 0px;position: absolute;">
                            {"icon":"recharge_first","width":52,"height":52,"text":" "}
                        </app_a-widget-pic_text-pic_text>
                        <div class="shadow13" style="left: -2px;top: 4px;position: absolute;width: 52px;font-size: 18px;font-family: mnjsh;color: #ffd8a6;transform: rotate(-45deg);">永久</div>
                    </div>
                    <div data-desc="周卡" w-class="{{it1.detail[i] ? 21 : 18}}" >
                        {{if it1.detail[i]}}
                            <div>{{data.name}}</div>
                            <div>立即获得<span w-class="22">{{data.diamond_count}}元宝</span></div>
                            <div>每日领取<span w-class="22">{{data.per_diamond}}元宝</span></div>
                            <div>宝库收益<span w-class="22">+{{Math.ceil(data.exp_add*100)}}%</span></div>
                            <div>挂机收益<span w-class="22">+{{Math.ceil(data.exp_add*100)}}%</span></div>
                        {{else}}
                        <app_a-widget-pic_other-pic_other style="position: absolute;top: 14px;left: 3px;width:102px;">
                            {"icon":"{{str}}_card"}
                        </app_a-widget-pic_other-pic_other>
                        {{end}}
                    </div>
                    <div data-desc="查看详情" w-class="20" class="shadow6" on-tap="gotoDetail({{i}})">
                        查看详情
                    </div>
                    <div data-desc="￥XX" w-class="17" style="z-index:1">
                        {{if v}}
                        <div style="font-family:mnjsh;line-height: 25px;">
                            已购买
                        </div>
                        {{else}}
                        ￥&nbsp;{{data.price}}
                        {{end}}
                    </div>
                </div>
                {{end}}

                {{for i,v of it1.currency}}
                {{if v.is_show}}
                <div on-tap="buy_currency({{i}})" w-class="15">
                    {{if !it1.recharge.first_recharge[i]}}
                    <div style="position:absolute;left:-2px;top:-2px;z-index: 2;">
                        <app_a-widget-pic_text-pic_text style="left: 0;top: 0px;position: absolute;">
                            {"icon":"recharge_first","width":52,"height":52,"text":" "}
                        </app_a-widget-pic_text-pic_text>
                        <div class="shadow13" style="left: -2px;top: 4px;position: absolute;width: 52px;font-size: 18px;font-family: mnjsh;color: #ffd8a6;transform: rotate(-45deg);">首充</div>
                    </div>
                    {{end}}

                    <div data-desc="物品" w-class="18">
                        <app_a-widget-pic_other-pic_other style="position: absolute;width: 114px;height: 117px;left: 0px;top:0px;">
                            {"icon":"bg_light"}
                        </app_a-widget-pic_other-pic_other>
                        <img src="./images/item_{{i-0+1}}.png" style="position: absolute;z-index: 3;" />
                        
                    </div>
                    <div data-desc="XX元宝" w-class="16">
                        <img w-class="13" style="margin-top: -5px;margin-right: 5px;" src="./images/diamond.png" />
                        {{v.diamond_count}}
                    </div>
                    <div data-desc="￥XX" w-class="17">
                        ￥&nbsp;{{v.price}}
                    </div>
                    <div data-desc="额外赠送" w-class="19" class="shadow6">
                        <app_a-widget-pic_text-pic_text style="left: 0;top: 0px;position: absolute;">
                            {"icon":"recharge","width":142,"height":32,"text":" "}
                        </app_a-widget-pic_text-pic_text>
                        <div style="left: 0;top: 4px;width:100%;position: absolute;white-space: nowrap;text-align: left;z-index:1">
                            <span style="font-size:22px;">赠</span>
                            {{let award = (!it1.recharge.first_recharge[i]) ? v.first_extra_diamond : v.extra_diamond}}
                            {{if v.prop_info}}
                            {{let prop = it1.Pi.sample[v.prop_info[0]]}}
                            {{let url = it1.Pi.pictures[prop.icon]}}
                            <app_a-widget-text-text style="display: inline-block;margin-top: 6px;vertical-align: middle;">
                                {"text":{{v.prop_info[1]+""}},"textCfg":"powerNum","fontSize":20,"space":-1}
                            </app_a-widget-text-text>
                            <img w-class="13" style="width:20px;" src="{{url}}" />
                            <span style="font-size:18px;">和</span>
                            {{end}}
                            <app_a-widget-text-text style="display: inline-block;margin-top: 6px;vertical-align: middle;">
                                {"text":{{award+""}},"textCfg":"powerNum","fontSize":20,"space":-1}
                            </app_a-widget-text-text>
                            <img w-class="13" style="width:20px;" src="./images/diamond.png" />
                        </div>
                       
                    </div>
                </div>
                {{end}}
                {{end}}
			</div>
		</div>
	</div>	
</div>