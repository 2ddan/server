<div maxId="45" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let arena = appCfg.arena}}
    {{let career_id = player.career_id}}
    {{let root = _get("pi/ui/root").exports}}
    <widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">{"text":"竞技场","coin":["money","diamond"],"left":0,"top":15,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"width":{{root.getWidth()}}} 
    </widget>
    <div w-class="8" w-sid="8">
        <widget w-class="5" w-tag="app_a-widget-line-line" w-sid="5">{"line":"line_7"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">{"bgName":"bg_frame21"} 
        </widget>
        <div w-class="9" w-sid="9">
            <div w-class="15" w-sid="15">
                {{let cfg_list = it1.shopData.arena_award_shop}}
                {{let list = cfg_list.sort(it1.shopData.sort_shop)}}
                {{for k,v of list}}
                <div w-class="10" w-sid="10" style="text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
                    <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">{"bgName":"bg_frame19"} 
                    </widget>

                    <div w-class="41" w-sid="41">
                        <widget w-class="40" w-tag="app_a-widget-coin-coin" w-sid="40">{"icon":"money","width":25,"height":21,"left":3,"text":{{[v.money]}},"color":"#f0f0f0"} 
                        </widget>
                    </div>
                    {{let prop = Pi.sample[v.prop[0]]}}
                    {{if prop.type !== "equip"}}
                    
                        {{let img = Pi.pictures[Pi.sample[v.prop[0]].icon]}}
                        <widget w-class="30" on-tap='showPropInfo("{{v.prop[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":76,"height":76,"prop":{{prop}},"url":{{img}},"count":{{v.prop[1]}},"name":"none","bg":0} 
                        </widget>
                        <widget w-class="44" w-tag="app_a-widget-text-text" w-sid="44">{"text":{{prop.name}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                        </widget>

                    {{else}}
    
                        {{let module = prop.module[prop.career_id.indexOf(career_id)][0] }}
                        {{let img = Pi.pictures[module] }}
                        <widget w-class="30" on-tap='showPropInfo("{{v.prop[0]}}")' w-tag="app_a-widget-prop-base" w-sid="30">{"width":76,"height":76,"prop":{{prop}},"url":{{img}},"count":{{v.prop[1]}},"name":"none","bg":0} 
                        </widget>
                        <widget w-class="44" w-tag="app_a-widget-text-text" w-sid="44">{"text":{{prop.name[prop.career_id.indexOf(career_id)]}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                        </widget>

                    {{end}}

                    <span w-class="17" w-sid="17">{{prop.describe}}</span>

                    <div w-class="43" w-sid="43">
                        <span w-class="18" w-sid="18">排名前{{v.buy_rank_limit}}可购买</span>
                    </div>

                    {{if v.buy_count_limit <= it1.shopData.arenaRead.life_store[v.index] || v.buy_count_limit <= it1.getData.arenaRead.life_store[v.index]}}
                        <app_a-widget-pic_text-pic_text style="position:absolute;right: 60px;top: 45px;">
                            {"icon":"sell_over","width":93,"height":60,"align":"center","marginLeft":3,"textCfg":"","space":0,"fontSize":12,"top":0,"left":0}
                        </app_a-widget-pic_text-pic_text>
                    {{else}}
                        {{if it1.getData.arenaRead.jjc_top_rank <= v.buy_rank_limit && it1.getData.arenaRead.jjc_top_rank>0}}
                        <widget w-class="42" on-tap='limitBuy("{{v.index+","+k}}")' w-tag="app_a-widget-btn-rect" w-sid="42">{"class":"hl","fontsize":24,"color":"#fdedd7;","text":"购 买","width":116,"height":45} 
                        </widget>
                        {{else}}
                        <widget w-class="42" w-tag="app_a-widget-btn-rect" w-sid="42">
                            {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"购 买","width":116,"height":45} 
                        </widget>
                        {{end}}

                    {{end}}

                </div>
                {{end}}
            </div>
        </div>
    </div>
</div>