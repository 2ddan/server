<div maxId="67" test="test" style="position: absolute;width: 60px;height: 60px;right:20px;top:222px" w-sid="2">
    {{if it1}}
    {{let root = _get("pi/ui/root").exports}}
    {{if it1.next_fun}}
    {{let key = it1.next_fun.key.slice(0,5)}}
        <div w-class="bg_1"></div>
        <div w-class="bg_2"></div>
        {{if it1.funIsFinish(it1.next_fun.key)}}
        <app_a-widget-pic_other-pic_other style="position: absolute;width: 135px;height: 131px;transform: translate(-50%,-50%);left: 50%;top: 50%;">
            {"icon":"bg_light"}
        </app_a-widget-pic_other-pic_other>
        {{end}}

        
        {{let icon=it1.next_fun.icon}}
        {{let name=it1.next_fun.name}}
        {{if key=="skill"}}
            {{let id=it1.skill[it1.next_fun.key.slice(-1)-1][0]}}
            {{:icon=it1.skill_describe[id]["skill_icon"]}}
            {{:name=it1.skill_describe[id]["skill_name"]}}
            {{let url = it1.Pi.pictures[icon]}}
            <img src="./images/bg_7.png" w-class="bg_7"/>
            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{id}})" style="position:relative;top:-3px;left:-4px">
                {"width":70,"height":70,"prop":0 ,"url":{{url}},"name":" ","count":"none"} 
            </widget>
        {{else}}
            <app-widget-btn-menu style="position: absolute;left: -10px;top: -10px;width: 80px;height: 80px;">
                {"guide":0,"width":80,"height":80,"isGray":0,"icon":{{icon}},"text":" ","space":0,"fontSize":0,"textCfg":"iconCircle"}
            </app-widget-btn-menu>
        {{end}}
        {{if !it1.funIsFinish(it1.next_fun.key)}}
        {{let text = it1.next_fun.stage_id ? "通过"+it1.getWildName(it1.next_fun.stage_id) : it1.next_fun.level_limit+"级"}}
        <widget w-class="66" w-tag="app_a-widget-pic_text-pic_text" w-sid="66" style="left:-93px;">
            {"width":78,"height":27,"align":"center","marginLeft":3,"text":{{text+"开放"}},"textCfg":"levelLimit","space":-5,"fontSize":16,"top":0,"left":0} 
        </widget>
        {{else}}
            {{if key=="skill"}}
                <img src="./images/bg_6.png" w-class="bg_6"/>
            {{end}}
        <widget w-class="66" w-tag="app_a-widget-pic_text-pic_text" w-sid="66">
            {"width":78,"height":27,"align":"center","marginLeft":3,"text":"点击开启","textCfg":"activity","space":-4,"fontSize":20,"top":0,"left":0} 
        </widget>
        {{end}}
        <widget w-class="66" w-tag="app_a-widget-pic_text-pic_text" w-sid="66" style="color:red;top:28px;">
            {"width":78,"height":27,"align":"center","marginLeft":3,"text":{{name}},"textCfg":"funName","space":0,"fontSize":18,"top":0,"left":0} 
        </widget>
        <div on-tap="openAward" style="position:absolute;width:184px;height:60px;top:0;right:-27px;">
            <app_a-widget-guide-guide>
                {{"function_open"}}
            </app_a-widget-guide-guide>
        </div>
    {{end}}
    {{let right = 0}}
    {{let top = 0}}
    {{if it1.player.level >= it1.fly_fun.level_limit}}
        {{if it1.fly_fun.target_point[0] == 0}}
            {{:right = (root.getWidth() - 480) / 2 + (5 - it1.fly_fun.target_point[1]) * 80 - 15}}
            {{:top = root.getHeight() - 315}}
        {{elseif it1.fly_fun.target_point[0] == 1}}
            {{:right = (root.getWidth() - 335 + (3 - it1.fly_fun.target_point[1]) * 63)}}
            {{:top = -118}}
        {{elseif it1.fly_fun.target_point[0] == 2}}
            {{:right = root.getWidth() - (it1.fly_fun.target_point[1] + 1) * 66 - 23}}
            {{:top = -52}}
        {{elseif it1.fly_fun.target_point[0] == 3}}
            {{:right = root.getWidth() - (it1.fly_fun.target_point[1] + 1) * 66 - 23}}
            {{:top = 8}}
        {{end}}

        {{let key = it1.fly_fun.key.slice(0,5)}}
        {{if key == "skill"}}
        {{let id = it1.skill[it1.fly_fun.key.slice(-1)-1][0]}}
        {{:icon = it1.skill_describe[id]["skill_icon"]}}
        {{:name = it1.skill_describe[id]["skill_name"]}}
        {{let url = it1.Pi.pictures[icon]}}
        <div style="pointer-events:none;width:80px;height:80px;position:absolute;top:-10px;right:-10px;z-index:4;{{if it1.move}}width:80px;height:80px;opacity:0;right:{{right}}px;top:{{top}}px;transition:right 1s,top 1s,width 1s,height 1s,opacity 0.5s 1s;{{end}}">
            <app_a-widget-prop-base>
                {"guide":0,"width":80,"height":80,"prop":0 ,"url":{{url}},"name":" ","count":"none"}
            </app_a-widget-prop-base>
        </div>
        {{else}}
        <div style="pointer-events:none;width:80px;height:80px;position:absolute;top:-10px;right:-10px;z-index:4;{{if it1.move}}width:80px;height:80px;opacity:0;right:{{right}}px;top:{{top}}px;transition:right 1s,top 1s,width 1s,height 1s,opacity 0.5s 1s;{{end}}">
            <app-widget-btn-menu>
                {,"width":80,"height":80,"isGray":0,"icon":{{it1.fly_fun.icon}},"text":" ","space":0,"fontSize":0,"textCfg":"iconCircle"}
            </app-widget-btn-menu>
        </div>
        {{end}}
    {{end}}
    {{if it1.skill_anima}}
    {{let id = it1.skill[it1.fly_fun.key.slice(-1)-1][0]}}
    {{let icon = it1.skill_describe[id]["skill_icon"]}}
    {{let url = it1.Pi.pictures[icon]}}
    {{let right = root.getWidth()*0.5 - 55 }}
    {{let top = root.getHeight()*0.5 - 220}}
    <widget  w-tag="app_a-widget-prop-base" style="position:absolute;top:{{top}}px;right:{{right}}px;animation:skill_anim 1s infinite;">
        {"width":70,"height":70,"prop":0 ,"url":{{url}},"name":" ","count":"none"} 
    </widget>
    {{end}}
    {{end}}
</div>