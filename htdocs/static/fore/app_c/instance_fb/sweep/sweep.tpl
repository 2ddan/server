{{let Pi = it1.Pi}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let common = _get("app/mod/common").exports.Common}}
{{let career_id = it1.player.career_id}}

<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"扫荡结果","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div style="width: 450px;height: auto;position: absolute; top: 26px;left: 45px;padding-bottom: 87px;padding-top: 27px;">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="s20" class="shadow6" style="top:0;height:auto;position:relative;padding: 13px 0 10px;">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame23"} 
                </widget>
                {{for i, v of it1.sweep_award}}                    
                {{let prop = it1.Pi.sample[v.id]}}
                {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                {{let url = it1.Pi.pictures[icon]}}
                {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                <div data-desc="物品" on-tap='propInfoShow({{v.id}})' style="position:relative;display:inline-block;margin:10px 10px 0;height:76px;width:76px;opacity:0;{{if it1.opacity}}opacity:1;transition:opacity 0.2s {{i/5}}s;{{end}}">
                    {{let bol = prop.type !== "equip" ? 1 : 0}}
                    <app_a-widget-prop-base >
                        {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count":{{bol ? v.count : "none"}},"name":"none","bg":1}
                    </app_a-widget-prop-base>

                    {{if !bol}}
                    <div data-desc="装备等级" w-class="s21" >{{"Lv"+prop.level[1] || 20}}</div>
                    {{end}}

                    <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                        {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                    </app_a-widget-text-text>
                </div>
                
                {{end}}
            </div>
            {{let count = it1.vip_advantage[it1.player.vip].instance_times + it1.vip_buy_times - it1.use_times }}
            <widget on-tap="sweep({{it1.chapter_id}},{{it1.guard_id}})" w-tag="app_a-widget-btn-rect" style="position: absolute;left: 50%;bottom: 24px; margin-left: -58px;">
                {"class":{{count>0 ? "hl" : "disabled"  }},"fontsize":24,"color":"","text":"扫 荡","width":116,"height":45} 
            </widget>
                
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>