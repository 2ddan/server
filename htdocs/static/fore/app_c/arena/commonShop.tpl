<div maxId="71" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
	{{let list = it1.shopList}}
	{{let Common = _get("app/mod/common").exports.Common}}
	{{let cfg_base = it1.cfg_base[it1.shopType]}}
	{{let cfg_price = it1.cfg_price[it1.shopType]}}
	{{let appCfg = _get("app/mod/db").exports.data}}
	{{let player = appCfg.player}}
	{{let jjc_score  = Common.getBagPropById(cfg_base.prop_id)?Common.getBagPropById(cfg_base.prop_id)[1].count:0}}
	{{let root = _get("pi/ui/root").exports}}
	{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}

    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
		{"text":"竞技场","coin":["money","diamond", 150004],"left":0,"top":15,"width":540,"type":"jjc_score","width":{{root.getWidth()}}}
    </widget>
	<div w-class="58" w-sid="58">
        <img src="./image/vein_2.png" style="position:absolute;left: 425px;top: 14px;z-index: 1;" />
		<widget w-class="57" w-tag="app_a-widget-bg_frame-bg" w-sid="57">{"bgName":"bg_frame25"} 
		</widget>
		<widget w-class="59" w-tag="app_a-widget-pic_other-pic_other" w-sid="59">{"icon":"tips_top"} 
		</widget>
		<widget w-class="60" w-tag="app_a-widget-pic_other-pic_other" w-sid="60">{"icon":"tips_bottom"} 
		</widget>
		<widget w-class="68" w-tag="app_a-widget-pic_other-pic_other" w-sid="68">{"icon":"butterfly"} 
		</widget>
		<div w-class="69" w-sid="69">
			<div w-class="70" w-sid="70">
			{{let len = list.length}}
			{{let i = 0}}
			{{while i < len}}
				{{let v = list[i]}}
				{{let cfg = cfg_price[v[0]]}}
				{{let prop = it1.pi.sample[cfg.prop[0]]}}
				<div w-class="22" w-sid="22">
					<widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">
						{"bgName":"bg_frame19"} 
					</widget>
					{{%cfg_price[v[0]].prop[1]}}
					{{let icon = prop.module ? prop.module[prop.career_id.indexOf(player.career_id)][0] : prop.icon}}
					{{let img = it1.pi.pictures[icon]}}
					{{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(player.career_id)] : prop.name}}
					<widget class="shadow" on-tap="propInfoShow({{cfg.prop[0]}})" w-class="16" w-tag="app_a-widget-prop-base" w-sid="16">
						{"prop":{{prop}},"url":{{img}},"color":"#ffeee2","count":{{cfg_price[v[0]].prop[1]}},"width":80,"height":80,"name":{{name}} }
					</widget>

					{{if cfg.discount}}
						<widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19">
						{"icon":"sale_bg"} 
						</widget>
						<div class="shadow" w-class="c151098945976741 ">{{cfg.discount}}折</div>
					{{end}}

					{{if v[1] === 0}}
						{{let bol = 1}}
						{{if cfg.diamond}}
						{{let col = player.diamond >= cfg.diamond ? '#FFD7A8' : 'red'}}
						{{:bol = player.diamond >= cfg.diamond ?  1: 0}}
						<widget w-class="18" w-tag="app_a-widget-coin-coin" w-sid="18" style="color:{{col}}">
							{"icon":"diamond","width":25,"height":21,"left":3,"text":[{{cfg.diamond}}],"color":"#FFD7A8"} 
						</widget>
						{{end}}
						{{if cfg.money}}
						{{let col1 = player.money >= cfg.money ? '#FFD7A8' : 'red'}}
						{{:bol = player.money >= cfg.money ?  1: 0}}
						<widget w-class="18" w-tag="app_a-widget-coin-coin" w-sid="18" style="color:{{col1}}">
							{"icon":"money","width":25,"height":21,"left":3,"text":[{{cfg.money}}],"color":"#FFD7A8"} 
						</widget>
						{{end}}
                        {{if cfg.coin}}
						{{let cp = it1.pi.sample[cfg_base.prop_id]}}
						{{:bol = jjc_score >= cfg.coin[1]?  1: 0}}
						<widget w-class="18" w-tag="app_a-widget-coin-coin" w-sid="18" style="color:{{jjc_score < cfg.coin[1] ?'#f00' : '#FFD7A8'}};">
							{"icon":{{cp.icon_normal}},"width":25,"height":21,"left":3,"text":[{{cfg.coin[1]}}],"color":"#FFD7A8"} 
						</widget>
						{{end}}
						<widget on-tap='buy({{v[0]}},{{i}})' w-class="17" w-tag="app_a-widget-btn-rect" w-sid="17">
							{"class":{{bol ? "hl" :"disabled"}},"fontsize":24,"color":"#fdedd7;","text":"购  买","width":116,"height":45} 
						</widget>
					{{else}}
					<widget style="left:24px;top:115px;position:absolute;" w-tag="app_a-widget-pic_text-pic_text">
						{"icon":"sell_over","width":93,"height":60}
					</widget>

					{{end}}
				</div>
				{{: i = i+1}}
                {{end}}
			</div>
		</div>
	</div>
	<div w-class="61" w-sid="61">
		{{let tap = "refresh("+(it1.cost?JSON.stringify(it1.cost):0)+")"}}
		<widget w-class="65" on-tap={{tap}} w-tag="app_a-widget-btn-rect" w-sid="65">
			{"class":"default","fontsize":24,"color":"#fdedd7;","text":"刷   新","width":116,"height":45} 
		</widget>

		<div style="position: absolute;font-size: 18px;left: 291px;top: 48px;z-index:1;line-height:10px;color:#e7e09e;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;width:30%;text-align:center">
			
			
		{{if !it1.cost}}
			<div style="text-align:center;color:#ffd8a6;">免费刷新
                <span style="color:{{it1.free - appCfg.shop.all_refresh_times[it1.shopType-1] == 0 ?'#f00' : ''}}">{{it1.free - appCfg.shop.all_refresh_times[it1.shopType-1]}}</span>/{{it1.free}}
            </div>
			{{else}}
				{{if it1.cost[0] === "money" || it1.cost[0] === "diamond"}}
				{{let has = player[it1.cost[0]]}}
				<div w-class="67" w-sid="67">
					<widget w-class="66" w-tag="app_a-widget-coin-coin" w-sid="66">
						{"icon":{{it1.cost[0]}},"width":25,"height":21,"left":3,"text":[{{it1.cost[1]}}],"color":{{has>=it1.cost[1]?'#fdedd7':'#f00'}}} 
					</widget>
				</div>
				{{else}}
				{{: prop = it1.cost[0]>0?it1.pi.sample[it1.cost[0]]:it1.cost[0]}}
				<img src={{it1.pi.pictures[prop.icon]}} style="position:relative;display:inline-block;width:18px;height:18px;top:2px;"/>
				<div style="display:inline-block;color:#{{jjc_score >=it1.cost[1]?'fdedd7':'f00'}};">  {{it1.cost[1]}}</div>
				{{end}}
			{{end}}
		</div>

		
	</div>
</div>