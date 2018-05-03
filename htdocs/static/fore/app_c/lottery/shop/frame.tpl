<div style="position:relative;width:98px;height:146px;display:inline-block;margin:10px 0px 0px 20px;">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let career_id = it1.player.career_id}}
    <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:98px;height:146px;left:0px;top:0px;">
        {"type":2,"height":20,"width":30}
    </widget>


    {{let prop = it1.Pi.sample[ it.prop[0] ]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = it1.Pi.pictures[icon]}}
    <widget w-tag="app_a-widget-prop-base" class="shadow" style="position:absolute;width:76px;height:76px;left:10px;top:20px;color:#fff;" on-tap="propInfoShow({{it.prop[0]}})">
        {"width":76,"height":76,"prop":{{prop}} ,"url":{{url}},"count": {{it.prop[1]}},"name":"none","top":23,"right":7}
    </widget>
    {{if prop.type == "rune" && (it1.rune.indexOf(it.prop[0]+"")!==-1 || it1.getCount(it.prop[0]))}}
    <widget data-desc="已拥有" w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:27px;z-index:3;">
        {"icon":"text_get_1","width":94,"height":60}
    </widget>
    {{end}}
    <app_a-widget-btn-rect style="top:97px;position:absolute;left:7px;z-index:3;" on-tap="buyBook({{it.id}})">
        {"text":"购 买","class":{{it.cost[1]>it1.score_num ? "disabled":"hl"}},"fontsize":20,"width":83,"height":31}
    </app_a-widget-btn-rect>
    <widget  w-tag="app_a-widget-coin-coin" style="position: absolute;    top: 123px;left: 16px;z-index: 2;">
        {"icon":{{it.cost[0]}},"width":23,"height":18,"left":4,"text":[{{it.cost[1]}}],"color":"#FFD7A8"} 
    </widget>
</div>