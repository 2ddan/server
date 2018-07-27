<div style="height:auto;position:relative;width:519px;left:50%;margin-left:-260px;top: 85px;padding-bottom: 24px;padding-top:14px;">
        {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
        {{let Pi = it1.Pi}}
        {{let career_id = it1.player.career_id}}
        {{let img = it1.account.outcome === "win" ? "win" : "lose"}}
        <img style="position:absolute;top:0;left:0;z-index:1;" src="./images/{{img}}_top.png"/>
        <img style="position:absolute;bottom:0;left:0;z-index:1;" src="./images/{{img}}_bottom.png"/>
        <div style="position:relative;top:9px;left:0;z-index:2;">
        {{if it1.account.outcome === "win"}}
            <div style="height:auto;width:100%;position:relative;text-align: center;">
                <div class="shadow13" style="font-family:mnjsh;font-size:22px;color:#f3d6af;line-height: 32px;padding: 6px 0 20px;">
                    <div>恭喜战胜玩家<span style="color:#ff4800">【{{it1.account.role_name[0]}}】</span></div>
                    {{if it1.account.role_name[1]}}
                        <div>成功帮助<span style="color:#12ff00">【{{it1.account.role_name[1]}}】</span>夺回{{it1.account.plunder_forage}}水晶</div>
                        {{if it1.account.fix_forage}}
                        <div>自己额外获得<span style="color:#12ff00">{{it1.account.fix_forage}}</span>水晶</div>
                        {{end}}
                    {{else}}
                        {{if it1.account.fix_forage}}
                        <div style="white-space: nowrap;">成功掠夺对方<span style="color:#12ff00">{{it1.account.plunder_forage}}</span>水晶,额外获得<span style="color:#12ff00">{{it1.account.fix_forage}}</span>水晶</div>
                        {{end}}
                    {{end}}
                    
                </div>
                <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:20px;width:479px;height:4px;">
                    {"line":"line_10"}
                </widget>
            </div>
            
            {{if it1.account.player || it1.account.bag}}
            <div style="position:relative;top:0;left:0;width:100%;height:100%;padding-top: 42px;max-height: 325px;">
                <widget style="position:absolute;top:14px;left:50%;transform:translateX(-50%)" w-tag="app_a-widget-title-single" >
                    {"padding":10,"type":10,"text":"挑战奖励","textCfg":"singleTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
                </widget>
                <div style="width:406px;min-height: 117px;text-align: center;max-height: 300px;position:relative;top:0;left:47.5%;margin-left:-203px;overflow: hidden;">
                    <div style="width:105%;max-height: 300px;overflow-x: hidden;overflow-y: auto;">
                        {{if it1.account.player}}
                        {{for i, v in it1.account.player}}
                            {{let id = i == "money" ?100001:i == "diamond" ?100002:i == "exp" ?100003: ""}} 
                            {{if id}}                  
                            {{let prop = Pi.sample[id]}}
                            {{let url = it1.Pi.pictures[prop.icon]}}
                            {{let name =  prop.name}}
                            <div data-desc="物品" on-tap='propInfoShow({{id}})' style="position:relative;display:inline-block;margin:10px 10px 0;height:76px;width:76px;color:#fff">
                                <app_a-widget-prop-base >
                                    {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count":{{v}},"name":"none","bg":1}
                                </app_a-widget-prop-base>
                                <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                                    {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                                </app_a-widget-text-text>
                            </div>
                            {{end}}
                        {{end}}
                        {{end}}

                        {{if it1.account.bag}}                        
                        {{for i,v of it1.account.bag}}
                            {{let prop = v}}
                            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
                            {{let url = it1.Pi.pictures[icon]}}
                            {{let name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name}}
                            <div data-desc="物品" on-tap='propInfoShow({{v.id || v.sid}})' style="position:relative;display:inline-block;margin:10px 10px 0;height:76px;width:76px;color:#fff;text-align: center;">
                                {{let bol = prop.type !== "equip" ? 1 : 0}}
                                <app_a-widget-prop-base >
                                    {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count":{{bol ? prop.count : "none"}},"name":"none","bg":1}
                                </app_a-widget-prop-base>
        
                                {{if !bol}}
                                <div data-desc="装备等级" w-class="s21" >{{"Lv"+prop.level || 20}}</div>
                                {{end}}
        
                                <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                                    {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                                </app_a-widget-text-text>
                            </div>
                        {{end}}
                        {{end}}
    
                    </div>
                </div>
            </div>
            {{end}}
        {{else}}
            <widget style="position:absolute;top:6px;left:50%;transform:translateX(-50%)" w-tag="app_a-widget-title-single" >
                {"padding":10,"type":14,"text":"我要变强","textCfg":"changeStrong","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
            </widget>
            <div class="shadow8" style="font-size:18px;font-family:mnjsh;color:#e6c8a1;text-align:center;padding-top: 42px;padding-bottom: 10px;">通过以下途径提升战斗力</div>
            <div style="position:relative;margin:0 auto;width:390px;height:auto;min-height:117px;">
                {{for i, v in it1.config_stronger}}
                {{if !v.fun_key || it1.fun_id >= it1.function_open[v.fun_key].id}}
                <app-widget-btn-menu on-tap='gotoMenu("{{v.goto}}")' style="position:relative;margin:0 1px">
                    {"icon":{{v.icon}},"text":{{v.name}},"width":95,"height":95,"bottom":6,"fontSize":20 ,"bg":5,"imgWidth":90,"space":{{v.name.length>2?-6:-4}}}
                </app-widget-btn-menu>
                {{end}}
                {{end}}
            </div>
        {{end}}   
        </div>
    </div>